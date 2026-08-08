// ========================================
// rt · Stamp 链引擎（核心模块）V3.0.0
// 纯逻辑层，零 DOM 依赖
// 通过 RtCrypto 提供者系统实现密码学操作
// chainHash = SHA-256(sessionId||index||salt||timestamp||contentHash||prevChainHash||nonce) (F2 标准)
// behaviorHash = HMAC-SHA256 行为特征链 (发明2)
// 并发安全锁
// ========================================

window.StampChain = (() => {
  'use strict';

  var VERSION = '3.0.0';

  // ── 内部工具 ──────────────────────────────────────
  var b2h = (typeof window !== 'undefined' && window.b2h) || function(arr) {
    return Array.from(new Uint8Array(arr)).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
  };
  var h2b = (typeof window !== 'undefined' && window.h2b) || function(hex) {
    if (!hex) return new Uint8Array(0);
    var len = hex.length;
    if (len % 2 !== 0) throw new Error('Odd length hex');
    var out = new Uint8Array(len / 2);
    for (var i = 0; i < len; i += 2) out[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    return out;
  };

  // ── 并发锁 ────────────────────────────────────────
  // 防止 append() 在快速输入时出现 race condition
  var _lock = Promise.resolve();

  function withLock(fn) {
    return function() {
      var args = arguments;
      var self = this;
      var run = _lock.then(function() { return fn.apply(self, args); });
      // M-4: 单次失败不污染锁——吞掉 rejection 并 reseed，后续调用照常执行
      _lock = run.then(function() { return undefined; }, function() { return undefined; });
      return run;
    };
  }

  // ── 获取密码学提供者 ──────────────────────────────
  function getCrypto() {
    if (typeof window !== 'undefined' && window.RtCrypto) {
      return window.RtCrypto;
    }
    throw new Error('RtCrypto provider required (load rt-crypto.js first)');
  }

  // ── SHA-256 摘要 ──────────────────────────────────
  async function sha256(data) {
    var input = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    return await getCrypto().hash(input);
  }

  // ── HMAC-SHA256（发明2核心） ──────────────────────
  // key: hex string, data: string 或 Uint8Array
  async function hmacSHA256(key, data) {
    var input = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    return await getCrypto().hmac(key || '00', input);
  }

  // ── 计算内容哈希 ──────────────────────────────────
  // 供 sealNow 等外部调用，替代直接 crypto.subtle.digest
  async function computeContentHash(content) {
    if (!content) return '';
    var input = typeof content === 'string' ? new TextEncoder().encode(content) : content;
    return await sha256(input);
  }

  // ── Ed25519 签名 ────────────────────────────────
  async function ed25519Sign(message, privateKey) {
    var input = typeof message === 'string' ? new TextEncoder().encode(message) : message;
    return await getCrypto().sign(input, privateKey);
  }

  // ── Ed25519 验签 ────────────────────────────────
  async function ed25519Verify(message, signatureHex, publicKey) {
    var input = typeof message === 'string' ? new TextEncoder().encode(message) : message;
    return await getCrypto().verify(input, signatureHex, publicKey);
  }

  // ── 导出公钥 hex ────────────────────────────────
  async function exportPubHex(publicKey) {
    if (typeof publicKey === 'string') return publicKey;
    return await getCrypto().exportPublicKey(publicKey);
  }

  // ── 创建新链 ──────────────────────────────────────
  async function createChain(sessionId, startTime) {
    return {
      sessionId: sessionId || ('chain-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8)),
      stamps: [],
      prevChainHash: '',
      hmacSeed: '',  // H0: session seed for HMAC chain
      startTime: startTime || 0,
      prevContentLen: 0,
      prevStampTs: 0,
      status: 'active'
    };
  }

  // ── 计算链哈希（F2 标准化） ──────────────────────
  // chainHash = SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
  // 与服务端 buildStandardizedSignMessage / 离线 rt-verifier 完全一致
  async function computeChainHash(sessionId, index, salt, timestamp, contentHash, prevChainHash, nonce) {
    var signInput = (sessionId || '') + String(index) + (salt || '') + (timestamp || '') + (contentHash || '') + (prevChainHash || '') + (nonce || '');
    return await sha256(signInput);
  }

  // ── 追加 Stamp（核心操作，带并发锁） ──────────────
  var append = withLock(async function(chain, params) {
    if (!chain) chain = await createChain(params && params.sessionId);
    var now = Date.now();
    var contentLen = (params && params.contentLen) || 0;
    var seq = chain.stamps.length + 1;

    // V2.0.0 字段计算
    var duration = chain.prevStampTs > 0 ? now - chain.prevStampTs : 0;
    var netChange = contentLen - chain.prevContentLen;
    var wordDelta = netChange > 0 ? netChange : 0;
    var deleteDelta = netChange < 0 ? Math.abs(netChange) : 0;
    var totalWords = contentLen;

    var ts = new Date(now).toISOString();
    var nonce = (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID)
      ? window.crypto.randomUUID().replace(/-/g, '').slice(0, 16)
      : Math.random().toString(36).slice(2, 18);

    // 导出公钥 hex
    var pubHex = '';
    if (params && params.keyPair) {
      pubHex = await exportPubHex(params.keyPair.publicKey);
    }

    // F2 标准化字段: salt(每章随机) / contentHash(内容绑定) / prevChainHash(前链摘要)
    var saltArr = new Uint8Array(16);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) crypto.getRandomValues(saltArr);
    var salt = b2h(saltArr);
    var contentHash = (params && params.contentHash) || '';
    var isBinding = !!(params && params.binding);
    var prevChainHash = chain.prevChainHash || '';
    var index = chain.stamps.length;

    // 标准化链哈希 (F2): SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
    // 与 rt-verifier / 服务端 verifyStandardizedChain 一致
    var signInput = chain.sessionId + String(index) + salt + ts + contentHash + prevChainHash + nonce;
    var chainHash = await sha256(signInput);

    // 行为特征链哈希 (发明2 HMAC): 保留 typing 节奏/删除量特征，供行为分析
    var behaviorHash = await hmacSHA256(
      prevChainHash || chain.sessionId,
      seq + '|' + now + '|' + duration + '|' + wordDelta + '|' + totalWords + '|' + deleteDelta + (nonce.slice(0, 8) ? '|' + nonce.slice(0, 8) : '')
    );

    // Ed25519 签名
    // sig: 签 chainHash 文本（前端 verifyChain）
    // signature: 签 SHA-256 摘要字节（服务端 / 离线验证器 F2 标准）
    var sig = '';
    var signature = '';
    if (params && params.keyPair) {
      sig = await ed25519Sign(chainHash, params.keyPair.secretKey);
      signature = await ed25519Sign(h2b(chainHash), params.keyPair.secretKey);
    }

    // 构建 stamp 对象
    var stamp = {
      sessionId: chain.sessionId,
      index: index,
      timestamp: ts,
      nonce: nonce,
      salt: salt,
      contentHash: contentHash,
      prevChainHash: prevChainHash,
      signature: signature,
      publicKey: pubHex,
      binding: isBinding,
      seq: seq,
      ts: now,
      duration: duration,
      wordDelta: wordDelta,
      totalWords: totalWords,
      deleteDelta: deleteDelta,
      hash: chainHash,
      chainHash: chainHash,
      behaviorHash: behaviorHash,
      sig: sig
    };

    // 更新链状态
    chain.prevChainHash = chainHash;
    chain.prevContentLen = contentLen;
    chain.prevStampTs = now;
    chain.stamps.push(stamp);

    return { stamp: stamp, chain: chain };
  });

  // ── 验证链完整性（F2 标准化） ────────────────────
  // 重算 chainHash 并验 Ed25519 签名（签名覆盖 SHA-256 摘要字节）
  // 与 rt-verifier / 服务端 verifyStandardizedChain 一致
  async function verifyChain(stamps, publicKey) {
    var errors = [];
    // v3 聚合链容器请使用 RtVerifier.verifyPackage 逐子链验证
    if (stamps && stamps.format === 'aggregate' && Array.isArray(stamps.subChains)) {
      return { valid: false, errors: ['Aggregate container: use RtVerifier.verifyPackage'], stampCount: 0 };
    }
    if (!stamps || stamps.length === 0) {
      return { valid: false, errors: ['No stamps'], stampCount: 0 };
    }
    for (var i = 0; i < stamps.length; i++) {
      var s = stamps[i];
      if (s.seq !== undefined && s.seq !== i + 1) {
        errors.push('Stamp ' + i + ': seq mismatch, expected ' + (i + 1) + ' got ' + s.seq);
      }
      if (s.index !== undefined && s.index !== i) {
        errors.push('Stamp ' + i + ': index mismatch, expected ' + i + ' got ' + s.index);
      }
      if (i > 0) {
        var prevTs = stamps[i - 1].ts || (typeof stamps[i - 1].timestamp === 'string' ? new Date(stamps[i - 1].timestamp).getTime() : 0);
        var curTs = s.ts || (typeof s.timestamp === 'string' ? new Date(s.timestamp).getTime() : 0);
        if (curTs > 0 && prevTs > 0 && curTs < prevTs) {
          errors.push('Stamp ' + i + ': timestamp not chronological');
        }
      }
      // F2: 重算 chainHash
      var signInput = (s.sessionId || '') + String(s.index !== undefined ? s.index : i) + (s.salt || '') + (s.timestamp || '') + (s.contentHash || '') + (s.prevChainHash || '') + (s.nonce || '');
      var expectedHash = await sha256(signInput);
      var actualHash = s.chainHash || s.hash || '';
      if (actualHash && expectedHash !== actualHash) {
        errors.push('Stamp ' + i + ': chain break - expected ' + expectedHash + ' got ' + actualHash);
      }
      // F2: 链条串联
      if (i === 0) {
        if (s.prevChainHash) {
          errors.push('Stamp ' + i + ': genesis prevChainHash must be empty');
        }
      } else {
        var prevHash = stamps[i - 1].chainHash || stamps[i - 1].hash || '';
        if (s.prevChainHash !== prevHash) {
          errors.push('Stamp ' + i + ': prevChainHash mismatch - expected ' + prevHash + ' got ' + (s.prevChainHash || ''));
        }
      }
      // F2: 验签（Ed25519 签名覆盖 chainHash 摘要字节）
      if (publicKey && s.signature) {
        var valid = await ed25519Verify(h2b(expectedHash), s.signature, publicKey);
        if (!valid) {
          errors.push('Stamp ' + i + ': invalid signature');
        }
      } else if (publicKey && s.sig && !s.signature) {
        // 兼容旧格式: sig 签 chainHash 文本
        var validOld = await ed25519Verify(actualHash || expectedHash, s.sig, publicKey);
        if (!validOld) {
          errors.push('Stamp ' + i + ': invalid signature');
        }
      }
    }
    return { valid: errors.length === 0, errors: errors, stampCount: stamps.length };
  }

  // ── 合并多条链（v3） ─────────────────────────────
  // mergeChains: 仅按时间排序的展示视图，不重写 index/seq/chainHash/签名，
  //              不具备密码学连续性（displayOnly）。可验证的合并请用：
  //              - mergeChainsVerified(chains, keyPair)  同私钥连续合并（重签，可验证）
  //              - aggregateChains(chains)               跨私钥/多创作者聚合容器
  function mergeChains(chains) {
    if (!chains || chains.length === 0) return { format: 'display', stamps: [], sessionId: 'merged', _mergeInfo: { displayOnly: true } };
    var all = [];
    chains.forEach(function(c) {
      if (c && c.stamps && Array.isArray(c.stamps)) {
        all = all.concat(c.stamps);
      }
    });
    all.sort(function(a, b) {
      var ta = a.ts || (a.timestamp ? new Date(a.timestamp).getTime() : 0);
      var tb = b.ts || (b.timestamp ? new Date(b.timestamp).getTime() : 0);
      return ta - tb;
    });
    return {
      format: 'display',
      stamps: all,
      sessionId: (chains[0] && chains[0].sessionId) || 'merged',
      _mergeInfo: { displayOnly: true, sorted: true, byTimestamp: true }
    };
  }

  // 同私钥连续合并：按时间重排后重算 chainHash 并重签，产出可验证的单链。
  // 每章保留 originalChainHash/originalSignature 作为"创作时刻"证据。
  async function mergeChainsVerified(chains, keyPair) {
    if (!chains || chains.length < 2) throw new Error('mergeChainsVerified requires at least 2 chains');
    var pubHex = await exportPubHex(keyPair.publicKey);
    for (var ci = 0; ci < chains.length; ci++) {
      var cpk = chains[ci].publicKey || (chains[ci].stamps && chains[ci].stamps[0] && chains[ci].stamps[0].publicKey) || '';
      if (cpk && cpk !== pubHex) throw new Error('mergeChainsVerified requires the same identity (public key mismatch)');
    }
    var all = [];
    chains.forEach(function(c) {
      if (c && c.stamps) {
        all = all.concat(c.stamps.map(function(st) { return { stamp: st, srcSession: c.sessionId }; }));
      }
    });
    all.sort(function(a, b) {
      var ta = a.stamp.ts || (a.stamp.timestamp ? new Date(a.stamp.timestamp).getTime() : 0);
      var tb = b.stamp.ts || (b.stamp.timestamp ? new Date(b.stamp.timestamp).getTime() : 0);
      return ta - tb;
    });
    var mergedSessionId = 'merged-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
    var stamps = [];
    var prevChainHash = '';
    for (var i = 0; i < all.length; i++) {
      var src = all[i].stamp;
      var salt = src.salt || '';
      var ts = src.timestamp || '';
      var contentHash = src.contentHash || '';
      var nonce = src.nonce || '';
      var signInput = mergedSessionId + String(i) + salt + ts + contentHash + prevChainHash + nonce;
      var chainHash = await sha256(signInput);
      var signature = '';
      var sig = '';
      if (keyPair) {
        signature = await ed25519Sign(h2b(chainHash), keyPair.secretKey);
        sig = await ed25519Sign(chainHash, keyPair.secretKey);
      }
      stamps.push({
        sessionId: mergedSessionId,
        index: i,
        seq: i + 1,
        timestamp: ts,
        nonce: nonce,
        salt: salt,
        contentHash: contentHash,
        prevChainHash: prevChainHash,
        chainHash: chainHash,
        hash: chainHash,
        signature: signature,
        sig: sig,
        publicKey: pubHex,
        ts: src.ts || (ts ? new Date(ts).getTime() : Date.now()),
        duration: src.duration || 0,
        wordDelta: src.wordDelta || 0,
        totalWords: src.totalWords || 0,
        deleteDelta: src.deleteDelta || 0,
        binding: src.binding || false,
        behaviorHash: src.behaviorHash || '',
        originalChainHash: src.chainHash || src.hash || '',
        originalSignature: src.signature || src.sig || '',
        originalIndex: src.index,
        originalSessionId: src.sessionId
      });
      prevChainHash = chainHash;
    }
    return {
      format: 'merged-continuous',
      sessionId: mergedSessionId,
      publicKey: pubHex,
      stamps: stamps,
      rootHash: prevChainHash,
      _mergeInfo: { type: 'continuous', chainCount: chains.length, sorted: true, byTimestamp: true, resealed: true }
    };
  }

  // 跨私钥/多创作者聚合：不重排不重签，容器引用各子链（各自保持连续性）。
  // 聚合根哈希 = SHA-256(各子链 rootHash 以 | 拼接)，供服务器锚定背书。
  async function aggregateChains(chains) {
    if (!chains || chains.length === 0) throw new Error('aggregateChains requires at least 1 chain');
    var subChains = chains.map(function(c) {
      var stamps = (c.stamps || []).map(function(st) { return JSON.parse(JSON.stringify(st)); });
      var last = stamps[stamps.length - 1] || null;
      return {
        sessionId: c.sessionId || (last && last.sessionId) || '',
        publicKey: c.publicKey || (last && last.publicKey) || '',
        stampCount: stamps.length,
        rootHash: last ? (last.chainHash || last.hash || '') : '',
        sealedAt: c.sealedAt || (last && last.timestamp) || '',
        firstTs: stamps[0] ? (stamps[0].ts || 0) : 0,
        lastTs: last ? (last.ts || 0) : 0,
        stamps: stamps
      };
    });
    var aggSessionId = 'agg-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
    var rootInput = subChains.map(function(sc) { return sc.rootHash || ''; }).join('|');
    var rootHash = await sha256(rootInput);
    return {
      format: 'aggregate',
      sessionId: aggSessionId,
      rootHash: rootHash,
      subChains: subChains,
      _mergeInfo: { type: 'aggregate', chainCount: chains.length }
    };
  }

  // ── 导出为元数据 ──────────────────────────
  function exportMeta(chain) {
    if (!chain || !chain.stamps) return [];
    return chain.stamps.map(function(s) {
      return {
        seq: s.seq, ts: s.ts, duration: s.duration,
        wordDelta: s.wordDelta, totalWords: s.totalWords,
        deleteDelta: s.deleteDelta, hash: s.hash || s.chainHash,
        sig: s.sig, publicKey: s.publicKey, nonce: s.nonce,
        timestamp: s.timestamp
      };
    });
  }

  // ── 从元数据导入 ──────────────────────────
  function importMeta(stampMetaArray) {
    var arr = (stampMetaArray || []).slice();
    return {
      sessionId: 'imported-' + Date.now().toString(36),
      stamps: arr,
      prevChainHash: arr.length > 0 ? (arr[arr.length - 1].hash || arr[arr.length - 1].chainHash || '') : '',
      startTime: arr.length > 0 ? arr[0].ts || 0 : 0,
      status: 'active'
    };
  }


  // ── 多阶差分分析（发明1：时序截面多阶特征） ──────
  // 对 stamps 数组进行 1阶(速度)/2阶(加速度)/3阶(动度) 分析
  // 输入: stamps[] (需要 ts/duration 字段)
  // 输出: { velocities, accelerations, jerks, stats }
  function analyzeChain(stamps) {
    if (!stamps || stamps.length < 3) {
      return { velocities: [], accelerations: [], jerks: [], stats: { message: 'insufficient stamps (need >=3)' } };
    }

    var durations = stamps.map(function(s) { return s.duration || 0; });
    var n = durations.length;

    // 1阶: 速度 v_i = 1 / duration_i (避免除零)
    var velocities = [];
    for (var i = 0; i < n; i++) {
      velocities.push(durations[i] > 0 ? 1 / durations[i] : 0);
    }

    // 2阶: 加速度 a_i = (v_{i+1} - v_i) / avg_dt
    // 其中 avg_dt 取相邻两个 duration 的平均值
    var accelerations = [];
    for (var i = 0; i < n - 1; i++) {
      var avgDt = (durations[i] + durations[i + 1]) / 2;
      accelerations.push(avgDt > 0 ? (velocities[i + 1] - velocities[i]) / avgDt : 0);
    }

    // 3阶: 动度 j_i = (a_{i+1} - a_i) / avg_dt
    var jerks = [];
    for (var i = 0; i < accelerations.length - 1; i++) {
      var avgDt = (durations[i] + durations[i + 1] + durations[i + 2]) / 3;
      jerks.push(avgDt > 0 ? (accelerations[i + 1] - accelerations[i]) / avgDt : 0);
    }

    // 统计量
    function stats(arr) {
      if (arr.length === 0) return { mean: 0, std: 0, min: 0, max: 0 };
      var sum = arr.reduce(function(a, b) { return a + b; }, 0);
      var mean = sum / arr.length;
      var sqDiff = arr.map(function(v) { return (v - mean) * (v - mean); });
      var std = Math.sqrt(sqDiff.reduce(function(a, b) { return a + b; }, 0) / arr.length);
      return {
        mean: mean,
        std: std,
        min: Math.min.apply(null, arr),
        max: Math.max.apply(null, arr),
        cv: mean !== 0 ? std / mean : 0
      };
    }

    return {
      velocities: velocities,
      accelerations: accelerations,
      jerks: jerks,
      stats: {
        velocity: stats(velocities),
        acceleration: stats(accelerations),
        jerk: stats(jerks),
        stampCount: stamps.length,
        totalDuration: durations.reduce(function(a, b) { return a + b; }, 0)
      }
    };
  }

  // ═══════════════════════════════════════════════════════════
  // 异步密语：链上下文密钥派生与交替密文嵌入
  // 新增标准原语：Ed25519（发送者认证）+ HKDF-SHA256（标准化派生）
  // 原有原语：AES-256-GCM + CSPRNG
  // ═══════════════════════════════════════════════════════════

  // ── 派生会话密语密钥（HKDF 风格） ────────────────
  async function deriveSecretKey(masterSecret, ctx) {
    var ms = typeof masterSecret === 'string' ? h2b(masterSecret) : masterSecret;
    var saltBytes = new TextEncoder().encode(ctx.sessionId || 'rt-secret-msg');
    var prkHex = await hmacSHA256(b2h(saltBytes), b2h(ms));
    var prk = h2b(prkHex);
    var info = (ctx.chainHash || '') + '|' + (ctx.seq || 0) + '|' + (ctx.salt || '') + '|secret-msg-key|01';
    var keyHex = await hmacSHA256(prk, info);
    return h2b(keyHex);
  }

  // ── AES-256-GCM 加密 ────────────────────────────
  async function encryptSecretMessage(plaintext, key) {
    return await getCrypto().encrypt(plaintext, key);
  }

  // ── AES-256-GCM 解密 ────────────────────────────
  async function decryptSecretMessage(payload, key) {
    // 兼容旧链文件密语格式 { c, n } 与 RtCrypto 标准格式 { ciphertext, nonce }
    return await getCrypto().decrypt({ ciphertext: payload.c || payload.ciphertext, nonce: payload.n || payload.nonce }, key);
  }

  // ── 在 Stamp 中嵌入密文（可选 Ed25519 签名） ─────
  async function prepareSecretMessage(stamp, message, masterSecret, fragIndex, totalFrags, keyPair) {
    var ctx = { sessionId: stamp.sessionId, chainHash: stamp.chainHash || stamp.hash || '', seq: stamp.seq || stamp.index, salt: stamp.salt || '' };
    var key = await deriveSecretKey(masterSecret, ctx);
    var enc = await encryptSecretMessage(message, key);
    var sm = { c: enc.ciphertext, n: enc.nonce, f: fragIndex || 0, t: totalFrags || 1 };
    if (keyPair && keyPair.secretKey) {
      var signInput = enc.ciphertext + '|' + enc.nonce + '|' + (fragIndex || 0);
      sm.s = await ed25519Sign(signInput, keyPair.secretKey);
      if (keyPair.publicKey) sm.pk = typeof keyPair.publicKey === 'string' ? keyPair.publicKey : b2h(keyPair.publicKey);
    }
    stamp.secretMsg = sm;
    return stamp;
  }

  // ── 从 Stamp 中提取密文（可选 Ed25519 验签） ─────
  async function extractSecretMessage(stamp, masterSecret, publicKey) {
    if (!stamp || !stamp.secretMsg) return null;
    var sm = stamp.secretMsg;
    if (publicKey && sm.s) {
      var signInput = sm.c + '|' + sm.n + '|' + (sm.f || 0);
      var pkHex = typeof publicKey === 'string' ? publicKey : b2h(publicKey);
      if (!(await ed25519Verify(signInput, sm.s, pkHex))) return null;
    }
    var ctx = { sessionId: stamp.sessionId, chainHash: stamp.chainHash || stamp.hash || '', seq: stamp.seq || stamp.index, salt: stamp.salt || '' };
    var key = await deriveSecretKey(masterSecret, ctx);
    try { return await decryptSecretMessage(sm, key); } catch(e) { return null; }
  }

  // ── 检测 Stamp 是否包含密文 ──────────────────
  function hasSecretMessage(stamp) {
    return !!(stamp && stamp.secretMsg);
  }


  return {
    VERSION: VERSION,
    createChain: createChain,
    append: append,
    verifyChain: verifyChain,
    mergeChains: mergeChains,
    mergeChainsVerified: mergeChainsVerified,
    aggregateChains: aggregateChains,
    exportMeta: exportMeta,
    importMeta: importMeta,
    computeContentHash: computeContentHash,
    computeChainHash: computeChainHash,
    analyzeChain: analyzeChain,
    hmacSHA256: hmacSHA256,
    deriveSecretKey: deriveSecretKey,
    encryptSecretMessage: encryptSecretMessage,
    decryptSecretMessage: decryptSecretMessage,
    prepareSecretMessage: prepareSecretMessage,
    extractSecretMessage: extractSecretMessage,
    hasSecretMessage: hasSecretMessage,
    exportPubHex: exportPubHex,
    sha256: sha256,
    b2h: b2h,
    h2b: h2b
  };
})();
