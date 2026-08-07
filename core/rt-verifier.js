"use strict";

// ========================================
// RealTrace · 链验证器 V3.0
// 验证连续绑定链的完整性：链条串联、签名、内容摘要、锚点
// 纯前端运行，不依赖网络
// V3: 签名验证统一走 RtCrypto（tweetnacl），不再依赖 WebCrypto Ed25519，
//     兼容 Firefox 等不支持 WebCrypto Ed25519 的浏览器；
//     新增 v3 聚合链（aggregate）容器验证。
// ========================================

window.RtVerifier = (() => {
  'use strict';

  // 工具函数
  function b2h(b) {
    return Array.from(new Uint8Array(b)).map(function(x) { return x.toString(16).padStart(2, "0"); }).join("");
  }

  function h2b(hex) {
    if (!hex) return new Uint8Array(0);
    if (hex.length % 2 !== 0) throw new Error('Odd length hex');
    var bytes = new Uint8Array(hex.length / 2);
    for (var i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    return bytes;
  }

  // SHA-256 摘要（WebCrypto SHA-256 为所有现代浏览器通用能力）
  async function sha256Hex(data) {
    var input = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    var buf = await crypto.subtle.digest('SHA-256', input);
    return b2h(new Uint8Array(buf));
  }

  // Ed25519 验签：优先 RtCrypto（tweetnacl，跨浏览器一致，与签名端同源）；
  // RtCrypto 不可用时回退 WebCrypto Ed25519（能力探测）。
  async function verifyEd25519(messageBytes, signatureHex, publicKeyHex) {
    if (window.RtCrypto && typeof window.RtCrypto.verify === 'function') {
      return await window.RtCrypto.verify(messageBytes, signatureHex, publicKeyHex);
    }
    try {
      var pubKey = await crypto.subtle.importKey("raw", h2b(publicKeyHex), { name: "Ed25519" }, false, ["verify"]);
      return await crypto.subtle.verify({ name: "Ed25519" }, pubKey, h2b(signatureHex), messageBytes);
    } catch (e) {
      return false;
    }
  }

  // 验证单个 Stamp
  // 返回 { ok: bool, errors: string[] }
  async function verifyStamp(stamp, prevStamp) {
    var errors = [];

    // 1. 验链条串联：prevChainHash 必须等于前一个 stamp 的 chainHash
    if (prevStamp) {
      if (stamp.prevChainHash !== prevStamp.chainHash) {
        errors.push("链条断裂: stamp[" + stamp.index + "].prevChainHash (" + String(stamp.prevChainHash || "").substring(0,12) + "...) != prev.chainHash (" + String(prevStamp.chainHash || "").substring(0,12) + "...)");
      }
    } else {
      if (stamp.prevChainHash !== "") {
        errors.push("创世章 prevChainHash 不为空");
      }
    }

    // 2. 验 chainHash：由 sessionId + index + salt + ts + contentHash + prevChainHash + nonce 算出
    var signInput = String(stamp.sessionId || "") + String(stamp.index) + (stamp.salt || "") + (stamp.timestamp || "") + (stamp.contentHash || "") + (stamp.prevChainHash || "") + (stamp.nonce || "");
    var expectedHash = await sha256Hex(signInput);
    if (stamp.chainHash !== expectedHash) {
      errors.push("chainHash 不匹配: index=" + stamp.index + " 期望 " + expectedHash.substring(0,16) + "... 实际 " + String(stamp.chainHash || "").substring(0,16) + "...");
    }

    // 3. 验签名（tweetnacl 路径，跨浏览器一致）
    if (stamp.publicKey && stamp.signature) {
      try {
        var sigValid = await verifyEd25519(h2b(expectedHash), stamp.signature, stamp.publicKey);
        if (!sigValid) {
          errors.push("签名无效: stamp[" + stamp.index + "]");
        }
      } catch (sigErr) {
        errors.push("Ed25519 签名验证异常: " + sigErr.message);
      }
    } else if (stamp.publicKey && stamp.sig && !stamp.signature) {
      // 兼容旧格式：sig 签 chainHash 文本
      try {
        var sigOldValid = await verifyEd25519(new TextEncoder().encode(stamp.chainHash || expectedHash), stamp.sig, stamp.publicKey);
        if (!sigOldValid) errors.push("签名无效: stamp[" + stamp.index + "]");
      } catch (sigErr) {
        errors.push("Ed25519 签名验证异常: " + sigErr.message);
      }
    } else {
      // 无公钥/签名：跳过验签（兼容无签名链）
    }

    // 4. 验锚点串联
    if (prevStamp) {
      if (stamp.chainAnchor && prevStamp.chainAnchor && stamp.chainAnchor.prevId !== prevStamp.chainAnchor.id) {
        errors.push("锚点断裂: anchor.prevId 不指向前一个 anchor.id");
      }
    } else {
      if (stamp.chainAnchor && stamp.chainAnchor.prevId !== null) {
        errors.push("创世章 anchor.prevId 不为 null");
      }
    }

    // 5. 验锚点 id 与 chainHash 一致
    if (stamp.chainAnchor && stamp.chainAnchor.id && stamp.chainAnchor.id !== stamp.chainHash) {
      errors.push("锚点 id 与 chainHash 不一致");
    }

    return { ok: errors.length === 0, index: stamp.index, errors: errors };
  }

  // 验证整条链条
  // stamps: 排序后的 stamp 数组 (index 0..n-1)
  // finalContent: 最终内容（可选，验最后一个 stamp 的 contentHash）
  // 返回 { ok: bool, summary: string, details: object[] }
  async function verifyChain(stamps, finalContent) {
    var details = [];
    var totalErrors = 0;

    if (!stamps || stamps.length === 0) {
      return { ok: false, summary: "链条为空", details: [] };
    }

    // 检查 stamp 顺序
    for (var i = 0; i < stamps.length; i++) {
      if (stamps[i].index !== i) {
        return { ok: false, summary: "stamp 索引乱序: stamp[" + i + "].index = " + stamps[i].index, details: [] };
      }
    }

    // 逐节点验证
    for (var i = 0; i < stamps.length; i++) {
      var prev = i > 0 ? stamps[i - 1] : null;
      var result = await verifyStamp(stamps[i], prev);
      details.push(result);
      if (!result.ok) totalErrors += result.errors.length;
    }

    // 可选：验最后一个 stamp 的内容摘要是否匹配最终内容
    if (finalContent && finalContent.length > 0) {
      var last = stamps[stamps.length - 1];
      var finalDigest = await sha256Hex(finalContent);
      if (last.contentHash !== finalDigest) {
        details[details.length - 1].errors.push("最终内容摘要不匹配（contentHash）");
        totalErrors++;
      }
    }

    var ok = totalErrors === 0;
    var summary = ok
      ? "链条完整: " + stamps.length + " 个 stamp，全部验证通过"
      : "链条异常: " + stamps.length + " 个 stamp，" + totalErrors + " 个错误";

    return { ok: ok, summary: summary, details: details, totalStamps: stamps.length, errors: totalErrors };
  }

  // 验证 .rt 包（v3）：识别聚合链容器 / 连续合并链 / 普通链
  async function verifyPackage(pkg) {
    if (!pkg) return { ok: false, summary: "空包", details: [] };

    // v3 聚合链：多子链容器，逐子链验证（不要求跨子链连续性）
    if (pkg.format === 'aggregate' && Array.isArray(pkg.subChains)) {
      var subResults = [];
      var okAll = true;
      for (var i = 0; i < pkg.subChains.length; i++) {
        var sub = pkg.subChains[i];
        var subStamps = sub.stamps || [];
        var r = await verifyChain(subStamps);
        subResults.push({
          index: i,
          sessionId: sub.sessionId || '',
          publicKey: sub.publicKey || '',
          stampCount: subStamps.length,
          ok: r.ok,
          summary: r.summary,
          errors: r.errors
        });
        if (!r.ok) okAll = false;
      }
      return {
        ok: okAll,
        summary: okAll
          ? "聚合链完整: " + pkg.subChains.length + " 条子链全部验证通过（各自保持密码学连续性）"
          : "聚合链异常: 存在未通过验证的子链",
        details: [],
        subResults: subResults,
        format: 'aggregate',
        subChainCount: pkg.subChains.length
      };
    }

    // 普通链 / 连续合并链（merged-continuous 仍是单链，正常验证）
    if (pkg.stamps && Array.isArray(pkg.stamps)) {
      var chainResult = await verifyChain(pkg.stamps, pkg.finalContent);
      chainResult.format = pkg.format || 'chain';
      chainResult.mergeInfo = pkg._mergeInfo || null;
      return chainResult;
    }

    return { ok: false, summary: "未知的包格式", details: [] };
  }

  return {
    verifyStamp: verifyStamp,
    verifyChain: verifyChain,
    verifyPackage: verifyPackage
  };
})();
