// ========================================
// RealTrace · .rt 文件导出器 (V2.1)
// 格式: ZIP 容器内含 chain.json
// chain.json 遵循 V2.1 规范（完整可验证字段）
// .rt 不包含稿件内容，内容独立 .txt 下载
// ========================================

window.RtExport = (() => {
  "use strict";

  // ─── 工具函数 ────────────────────────────
  function sha256Hex(input) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(input || ""))).then(function(buf) {
      return Array.from(new Uint8Array(buf)).map(function(x) { return x.toString(16).padStart(2, "0"); }).join("");
    });
  }
  // 链 ID 密码学身份：cid = hex(SHA-256(pubkey || chainRootHash))[0:23]（BZ-007 第八章）
  async function deriveCid(publicKeyHex, chainRootHash) {
    var h = await sha256Hex(String(publicKeyHex || "") + String(chainRootHash || ""));
    return h.slice(0, 23);
  }
  async function deriveChainId(publicKeyHex, chainRootHash, source, owner) {
    var cid = await deriveCid(publicKeyHex, chainRootHash);
    return (source || "web") + "-" + (owner || "personal") + "-" + cid;
  }
  // 展示层兜底：历史中文身份段映射为英文（仅展示，不修改 .rt 文件内容）
  var CHAIN_OWNER_DISPLAY = { "个人": "personal" };
  function normalizeChainIdDisplay(chainId) {
    var parts = String(chainId || "").split("-");
    if (parts.length >= 3 && CHAIN_OWNER_DISPLAY[parts[1]]) parts[1] = CHAIN_OWNER_DISPLAY[parts[1]];
    return parts.join("-");
  }
  function cidOf(chainId) {
    var parts = String(chainId || '').split('-');
    return parts.length >= 3 ? parts[parts.length - 1] : '';
  }
  function b2h(b) {
    return Array.from(new Uint8Array(b)).map(function(x) { return x.toString(16).padStart(2, '0'); }).join('');
  }
  function h2b(hex) {
    if (!hex) return new Uint8Array(0);
    if (hex.length % 2 !== 0) throw new Error('Odd length hex');
    var bytes = new Uint8Array(hex.length / 2);
    for (var i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    return bytes;
  }

  // ─── stamps 转换为 V2.1 格式 ──────────────
  function normalizeStamps(stamps) {
    if (!stamps || stamps.length === 0) return [];
    // V2.1: .rt 链文件保存完整可验证字段（chain-spec §1 / BZ-007 2.1）
    // 离线验证需 index/sessionId/salt/timestamp/contentHash/prevChainHash/nonce/publicKey/signature/chainHash
    // 旧精简格式（仅 seq/ts/hash/sig）兼容解析：缺失字段补默认，但无法离线重算验证
    return stamps.map(function(s, i) {
      var o = {
        seq: s.seq !== undefined ? s.seq : (i + 1),
        index: s.index !== undefined ? s.index : i,
        ts: typeof s.ts === 'number' ? s.ts : (typeof s.timestamp === 'string' ? new Date(s.timestamp).getTime() : Date.now()),
        duration: s.duration || 0,
        wordDelta: s.wordDelta || 0,
        totalWords: s.totalWords === 0 ? 0 : (s.totalWords || 0),
        deleteDelta: s.deleteDelta || 0,
        hash: s.hash || s.chainHash || '',
        sig: s.sig || s.signature || ''
      };
      ['sessionId', 'salt', 'nonce', 'timestamp', 'contentHash', 'prevChainHash', 'publicKey', 'signature', 'chainHash', 'behaviorHash', 'chainAnchor', 'binding'].forEach(function(k) {
        if (s[k] !== undefined) o[k] = s[k];
      });
      return o;
    });
  }
  // ─── 构建 chain.json ────────────────────
  function buildChainJson(chainData) {
    var stamps = chainData.stamps || [];
    var v2Stamps = normalizeStamps(stamps);
    var lastStamp = v2Stamps.length > 0 ? v2Stamps[v2Stamps.length - 1] : null;
    var firstStamp = v2Stamps.length > 0 ? v2Stamps[0] : null;

    var chainJson = {
      version: "2.1",
      chainId: chainData.chainId || chainData.sessionId || ('RT-' + Date.now().toString(36).toUpperCase()),
      status: chainData.status || 'locked',
      pk: chainData.publicKey || chainData.pk || '',
      skEncrypted: null,
      hashChain: {
        algorithm: 'SHA256',
        seed: firstStamp ? firstStamp.hash : '',
        current: lastStamp ? lastStamp.hash : ''
      },
      signatureChain: {
        algorithm: 'Ed25519',
        count: v2Stamps.length
      },
      merkleRoot: chainData.merkleRoot || '',
      bindMode: chainData.bindMode || '',
      stamps: v2Stamps,
      ts: chainData.createdAt || (firstStamp ? firstStamp.ts : Date.now()),
      lockedAt: chainData.lockedAt || (chainData.status === 'locked' ? Date.now() : null)
    };

    // 嵌入加密私钥（用于身份恢复续写）
    var ek = chainData.encryptedPrivateKey;
    if (ek && ek.encryptedKeyHex) {
      chainJson.skEncrypted = ek.encryptedKeyHex;
      chainJson.kdf = {
        algorithm: 'PBKDF2-SHA256',
        salt: ek.saltHex || ek.salt || '',
        iterations: 100000
      };
      chainJson.cipher = {
        algorithm: 'AES-256-GCM',
        iv: ek.ivHex || ek.iv || '',
        tag: ek.tag || ''
      };
    }

    return chainJson;
  }

  // ─── 构建 .rt ZIP 包（返回 Blob）────────
  // sealResult: { stamps, sessionId, publicKey, ... }
  // mode: 'pure-chain' | 'with-content'（目前只支持 pure-chain）
  // contentRaw: 内容文本（仅限 with-content 模式，已废弃）
  // encryptedKey: 可选加密私钥
  async function buildRtPackage(sealResult, mode, contentRaw, encryptedKey) {
    if (!sealResult || !sealResult.stamps || sealResult.stamps.length === 0) {
      return null;
    }

    var v2Stamps = normalizeStamps(sealResult.stamps);
    var lastStamp = v2Stamps.length > 0 ? v2Stamps[v2Stamps.length - 1] : null;
    var pubKeyHex = sealResult.publicKeyHex || sealResult.publicKey || sealResult.pk || '';
    var chainId = sealResult.chainId || await deriveChainId(pubKeyHex, lastStamp ? lastStamp.hash : '', sealResult.source, sealResult.owner);

    var chainData = {
      stamps: sealResult.stamps,
      sessionId: sealResult.sessionId,
      chainId: chainId,
      publicKey: pubKeyHex,
      merkleRoot: sealResult.merkleRoot || '',
      bindMode: sealResult.bindMode || '',
      encryptedPrivateKey: encryptedKey || sealResult.encryptedPrivateKey || null,
      createdAt: sealResult.createdAt || sealResult.sealedAt || null,
      status: sealResult.status || 'locked',
      lockedAt: sealResult.lockedAt || null
    };

    var chainJson = buildChainJson(chainData);

    // 构建 meta.json（可选）
    var metaJson = {
      title: sealResult.title || '',
      author: sealResult.author || '',
      createdAt: chainJson.ts,
      platform: 'rt-writer',
      appVersion: '2.0.0'
    };

    // 创建 ZIP
    var zip = new JSZip();
    zip.file('chain.json', JSON.stringify(chainJson, null, 2));
    zip.file('meta.json', JSON.stringify(metaJson, null, 2));

    // 嵌入 cert.html（若有）
    if (sealResult.certHtml) {
      zip.file('cert.html', sealResult.certHtml);
    }

    var blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    return blob;
  }

  // ─── 下载 .rt ZIP 文件 ─────────────────
  async function downloadRtFile(sealResult, filename, mode, rawContent) {
    var blob = await buildRtPackage(sealResult, mode, rawContent);
    if (!blob) return;

    var idPart = cidOf(sealResult.chainId || '') || (sealResult.sessionId || 'cert');
    filename = filename || ('rt-' + idPart.substring(0, 23) + '.rt');

    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 10000);
    return filename;
  }

  // ─── 下载原始稿件 .txt 文件 ────────────
  function downloadTxtFile(content, filename) {
    if (!content || content.length === 0) return;
    filename = filename || ('draft-' + Date.now() + '.txt');

    var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 10000);
  }

  // ─── 加载 .rt ZIP 文件 — 返回 Promise ──
  function loadRtFile(file) {
    return new Promise(function(resolve, reject) {
      // 先尝试旧格式（纯 JSON，兼容）
      (function tryJson() {
        var reader = new FileReader();
        reader.onload = function(e) {
          try {
            var pkg = JSON.parse(e.target.result);
            if (pkg && pkg.stamps && pkg.sessionId) {
              resolve(pkg);
              return;
            }
          } catch(err) { /* not JSON, try ZIP */ }
          // JSON 失败，尝试 ZIP
          tryZip();
        };
        reader.onerror = function() { tryZip(); };
        reader.readAsText(file);
      })();

      function tryZip() {
        var reader = new FileReader();
        reader.onload = async function(e) {
          try {
            var zip = await JSZip.loadAsync(e.target.result);
            var chainFile = zip.file('chain.json');
            if (!chainFile) {
              reject(new Error('无效的 .rt 文件：缺少 chain.json'));
              return;
            }
            var chainStr = await chainFile.async('string');
            var chainJson = JSON.parse(chainStr);

            // 读取 meta.json（可选）
            var metaFile = zip.file('meta.json');
            var metaJson = null;
            if (metaFile) {
              try { metaJson = JSON.parse(await metaFile.async('string')); } catch(e) {}
            }

            // 读取 cert.html（可选）
            var certFile = zip.file('cert.html');
            var certHtml = null;
            if (certFile) {
              try { certHtml = await certFile.async('string'); } catch(e) {}
            }

            // 构造兼容数据对象
            var pkg = {
              rtVersion: chainJson.version,
              format: 'pure-chain',
              sessionId: chainJson.chainId,
              publicKey: chainJson.pk,
              stamps: chainJson.stamps,
              totalStamps: chainJson.stamps.length,
              sealedAt: new Date(chainJson.lockedAt || chainJson.ts).toISOString(),
              encryptedPrivateKey: chainJson.skEncrypted ? {
                encryptedKeyHex: chainJson.skEncrypted,
                saltHex: chainJson.kdf ? chainJson.kdf.salt : '',
                ivHex: chainJson.cipher ? chainJson.cipher.iv : '',
                tag: chainJson.cipher ? chainJson.cipher.tag : ''
              } : null,
              meta: metaJson,
              certHtml: certHtml,
              chainId: chainJson.chainId,
              status: chainJson.status,
              hashChain: chainJson.hashChain,
              signatureChain: chainJson.signatureChain,
              pk: chainJson.pk
            };

            // 计算内容长度（从 stamp 累计）
            var totalWords = 0;
            if (chainJson.stamps.length > 0) {
              totalWords = chainJson.stamps[chainJson.stamps.length - 1].totalWords || 0;
            }
            pkg.contentLength = totalWords;

            resolve(pkg);
          } catch(err) {
            reject(new Error('解析失败: ' + err.message));
          }
        };
        reader.onerror = function() { reject(new Error('读取失败')); };
        reader.readAsArrayBuffer(file);
      }
    });
  }

  // ─── 从 .rt 包提取续写内容 ─────────────
  function extractContent(pkg) {
    if (!pkg) return '';
    // V2.0.0 .rt 不含内容，返回空
    if (pkg.rtVersion && pkg.rtVersion !== '1.0' && pkg.rtVersion !== '1.1') return '';
    // 旧格式兼容
    if (pkg.contentRaw) return pkg.contentRaw;
    return '';
  }

  // ─── 获取创作时长（毫秒）───────────────
  function getDurationMs(pkg) {
    if (!pkg || !pkg.stamps || pkg.stamps.length < 2) return 0;
    var stamps = pkg.stamps;
    var first = stamps[0].ts || (typeof stamps[0].timestamp === 'string' ? new Date(stamps[0].timestamp).getTime() : 0);
    var last = stamps[stamps.length - 1].ts || (typeof stamps[stamps.length - 1].timestamp === 'string' ? new Date(stamps[stamps.length - 1].timestamp).getTime() : 0);
    return last - first;
  }

  // ─── 估算平均输入速度 ─────────────────
  function estimateSpeed(pkg) {
    if (!pkg || !pkg.stamps || pkg.stamps.length < 2) return 0;
    var durationMs = getDurationMs(pkg);
    if (durationMs <= 0) return 0;
    var minutes = durationMs / 60000;
    var charCount = pkg.contentLength || 0;
    return minutes > 0 ? Math.round(charCount / minutes) : 0;
  }

  // ── 构建带加密密钥的 .rt 包 ────────────
  async function buildRtPackageWithKey(sealResult, mode, rawContent, password) {
    if (!password || !sealResult || !sealResult.kp) {
      return buildRtPackage(sealResult, mode, rawContent);
    }
    try {
      var encryptedKey = await RtKeyVault.exportEncryptedKey(
        sealResult.kp.privateKey || sealResult.kp,
        password
      );
      return buildRtPackage(sealResult, mode, rawContent, encryptedKey);
    } catch(e) {
      console.warn('[rt-export] 密钥加密失败，导出不含身份:', e.message);
      return buildRtPackage(sealResult, mode, rawContent);
    }
  }

  // ── 检查 .rt 链是否包含加密私钥 ─────────
  function hasEncryptedKey(pkg) {
    if (!pkg) return false;
    // V2.0.0 格式：检查 skEncrypted
    if (pkg.skEncrypted) return true;
    // V2.0.0 chain.json 格式：检查 pk 非空（无 skEncrypted 表示匿名）
    if (pkg.pk && pkg.pk.length > 0 && pkg.skEncrypted === null) return false;
    // 旧格式兼容
    return !!(pkg.encryptedPrivateKey && pkg.encryptedPrivateKey.encryptedKeyHex);
  }

  // ── 从 .rt 链生成轻量续写头 ────────────
  function buildLightHead(pkg) {
    if (!pkg || !pkg.stamps || pkg.stamps.length === 0) return null;
    var last = pkg.stamps[pkg.stamps.length - 1];
    var head = {
      format: 'rt-light-v1',
      sessionId: pkg.sessionId || pkg.chainId,
      publicKey: pkg.publicKey || pkg.pk,
      stampCount: pkg.stamps.length,
      lastStampHash: last.hash || last.chainHash || '',
      lastTimestamp: last.ts || last.timestamp || '',
      encryptedPrivateKey: pkg.encryptedPrivateKey || null,
      sealedAt: pkg.sealedAt || ''
    };
    return head;
  }

  return {
    buildRtPackage: buildRtPackage,
    buildRtPackageWithKey: buildRtPackageWithKey,
    hasEncryptedKey: hasEncryptedKey,
    buildLightHead: buildLightHead,
    downloadRtFile: downloadRtFile,
    downloadTxtFile: downloadTxtFile,
    deriveCid: deriveCid,
    deriveChainId: deriveChainId,
    normalizeChainIdDisplay: normalizeChainIdDisplay,
    loadRtFile: loadRtFile,
    extractContent: extractContent,
    getDurationMs: getDurationMs,
    estimateSpeed: estimateSpeed
  };
})();
