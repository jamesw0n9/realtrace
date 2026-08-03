"use strict";

// ========================================
// 真迹 · 链验证器
// 验证连续绑定链的完整性：链条串联、签名、内容摘要、锚点
// 纯前端运行，不依赖网络
// ========================================

window.RtVerifier = (() => {

  // 工具函数
  function b2h(b) {
    return Array.from(new Uint8Array(b)).map(function(x) { return x.toString(16).padStart(2, "0"); }).join("");
  }

  // 验证单个 Stamp
  // 返回 { ok: bool, errors: string[] }
  async function verifyStamp(stamp, prevStamp, publicKey) {
    var errors = [];

    // 1. 验链条串联：prevChainHash 必须等于前一个 stamp 的 chainHash
    if (prevStamp) {
      if (stamp.prevChainHash !== prevStamp.chainHash) {
        errors.push("链条断裂: stamp[" + stamp.index + "].prevChainHash (" + stamp.prevChainHash.substring(0,12) + "...) != prev.chainHash (" + prevStamp.chainHash.substring(0,12) + "...)");
      }
    } else {
      // 第一个 stamp，prevChainHash 应该为空
      if (stamp.prevChainHash !== "") {
        errors.push("创世章 prevChainHash 不为空");
      }
    }

    // 2. 验 chainHash：由 sessionId + index + salt + ts + contentHash + prevChainHash + nonce 算出
    var signInput = stamp.sessionId + stamp.index + (stamp.salt || "") + stamp.timestamp + stamp.contentHash + stamp.prevChainHash + (stamp.nonce || "");
    var hashBytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(signInput));
    var expectedHash = b2h(new Uint8Array(hashBytes));
    if (stamp.chainHash !== expectedHash) {
      errors.push("chainHash 不匹配: index=" + stamp.index + " 期望 " + expectedHash.substring(0,16) + "... 实际 " + stamp.chainHash.substring(0,16) + "...");
    }

    // 3. 验签名
    try {
      var pubKey = await crypto.subtle.importKey("raw", hexToBytes(stamp.publicKey),
        { name: "Ed25519" }, false, ["verify"]);
      var sigValid = await crypto.subtle.verify({ name: "Ed25519" }, pubKey,
        hexToBytes(stamp.signature), new Uint8Array(hashBytes));
      if (!sigValid) {
        errors.push("签名无效: stamp[" + stamp.index + "]");
      }
    } catch(sigErr) {
      errors.push("Ed25519 签名验证异常: " + sigErr.message);
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
      var result = await verifyStamp(stamps[i], prev, stamps[i].publicKey);
      details.push(result);
      if (!result.ok) totalErrors += result.errors.length;
    }

    // 可选：验最后一个 stamp 的内容摘要是否匹配最终内容
    if (finalContent && finalContent.length > 0) {
      var last = stamps[stamps.length - 1];
      var finalDigest = b2h(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(finalContent)));
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

  // Hex 转 Uint8Array
  function hexToBytes(hex) {
    if (!hex) return new Uint8Array(0);
    var bytes = new Uint8Array(hex.length / 2);
    for (var i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    }
    return bytes;
  }

  return {
    verifyStamp: verifyStamp,
    verifyChain: verifyChain
  };
})();
