// ========================================
// 真迹 · 前端密码学核心
// 封装 Web Crypto API，替代内嵌 tweetnacl
// standalone: 不依赖任何其他模块
// ========================================

window.RtCrypto = (() => {
  'use strict'

  var b2h = (typeof window !== "undefined" && window.b2h) || function b2h(b) {
    return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join('')
  }

  // h2b: hex string to Uint8Array
  var h2b = (typeof window !== "undefined" && window.h2b) || function h2b(hex) {
    if (!hex) return new Uint8Array(0);
    if (hex.length % 2 !== 0) throw new Error('Odd length hex');
    var bytes = new Uint8Array(hex.length / 2);
    for (var i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    return bytes;
  }

  // ── 提供者注册表 ──────────────────────────────────────
  // algo → provider 映射，支持可插拔
  var providers = {}

  // 注册密码学提供者
  function registerProvider(algo, provider) {
    providers[algo] = provider
  }

  // 获取提供者，默认 'ed25519'
  function getProvider(algo) {
    return providers[algo || 'ed25519']
  }

  // ── Ed25519 默认提供者 ────────────────────────────────

  // 使用 tweetnacl 的 Ed25519 提供者（兼容所有浏览器，不依赖 Web Crypto API）
  var ed25519Provider = {
    algorithm: 'ed25519',
    keySize: 32,

    // 生成 Ed25519 密钥对
    async generateKeyPair() {
      var kp = nacl.sign.keyPair()
      return { publicKey: kp.publicKey, secretKey: kp.secretKey }
    },

    // 导出公钥 → hex
    async exportPublicKey(publicKey) {
      if (typeof publicKey === 'string') return publicKey
      if (publicKey instanceof Uint8Array) return b2h(publicKey)
      try {
        var raw = await crypto.subtle.exportKey('raw', publicKey)
        return b2h(new Uint8Array(raw))
      } catch(e) {
        throw new Error('exportPublicKey: unsupported key type')
      }
    },

    // 导入公钥（hex → Uint8Array）
    async importPublicKey(publicKeyHex) {
      return h2b(publicKeyHex)
    },

    // 签名 → hex（使用 tweetnacl.detached）
    async sign(message, privateKey) {
      var msg = message instanceof Uint8Array ? message : new TextEncoder().encode(message)
      var sk = privateKey instanceof Uint8Array ? privateKey : h2b(privateKey)
      var sig = nacl.sign.detached(msg, sk)
      return b2h(sig)
    },

    // 验签（使用 tweetnacl）
    async verify(message, signatureHex, publicKey) {
      var msg = message instanceof Uint8Array ? message : new TextEncoder().encode(message)
      var sig = typeof signatureHex === 'string' ? h2b(signatureHex) : signatureHex
      var pk = publicKey instanceof Uint8Array ? publicKey : h2b(publicKey)
      return nacl.sign.detached.verify(msg, sig, pk)
    },

    // SHA-256 摘要（crypto.subtle.digest 通用性好，保留使用）
    async hash(data) {
      var input = typeof data === 'string' ? new TextEncoder().encode(data) : data
      var buf = await crypto.subtle.digest('SHA-256', input)
      return b2h(new Uint8Array(buf))
    },
  }

  // 注册为默认提供者
  registerProvider('ed25519', ed25519Provider)

  // ── SM2 提供者（动态加载 sm-crypto） ──────────────────────
  // sm-crypto npm 包提供 SM2/SM3 实现，浏览器端通过 dynamic import 加载
  // 安装: npm install sm-crypto
  // [来源: sm-crypto 官方文档 https://www.npmjs.com/package/sm-crypto]
  
  var sm2Provider = {
    algorithm: 'sm2',
    keySize: 32,
    _sm: null,

    async _load() {
      if (this._sm) return true;
      try {
        if (typeof window !== 'undefined' && window.sm2) {
          this._sm = { sm2: window.sm2, sm3: window.sm3 };
          return true;
        }
        var mod = await import('sm-crypto');
        this._sm = mod;
        return true;
      } catch (e) {
        console.warn('[SM2] sm-crypto not available:', e.message);
        return false;
      }
    },

    async generateKeyPair() {
      if (!(await this._load())) throw new Error('SM2: sm-crypto not loaded');
      var sm2 = this._sm.sm2;
      var keypair = sm2.generateKeyPairHex();
      // 切换密码学提供者
  // 保存偏好到 localStorage，返回新 provider 名称

  return {
        privateKey: { algo: 'sm2', hex: keypair.privateKey, publicKeyHex: keypair.publicKey },
        publicKey: { algo: 'sm2', hex: keypair.publicKey }
      };

    },

    async exportPublicKey(publicKey) {
      if (!publicKey) return '';
      return publicKey.hex || publicKey;
    },

    async importPublicKey(publicKeyHex) {
      // 切换密码学提供者
  // 保存偏好到 localStorage，返回新 provider 名称

  return { algo: 'sm2', hex: publicKeyHex };
    },

    async sign(message, privateKey) {
      if (!(await this._load())) throw new Error('SM2: sm-crypto not loaded');
      var sm2 = this._sm.sm2;
      var privHex = (privateKey && privateKey.hex) || privateKey;
      var msgHex = typeof message === 'string' ? message : b2h(message);
      return sm2.doSignature(msgHex, privHex, { hash: true });
    },

    async verify(message, signatureHex, publicKey) {
      if (!(await this._load())) throw new Error('SM2: sm-crypto not loaded');
      var sm2 = this._sm.sm2;
      var pubHex = (publicKey && publicKey.hex) || publicKey;
      var msgHex = typeof message === 'string' ? message : b2h(message);
      return sm2.doVerifySignature(msgHex, signatureHex, pubHex, { hash: true });
    },

    // SM3 摘要（由 sm-crypto 提供）
    async hash(data) {
      if (!(await this._load())) throw new Error('SM2: sm-crypto not loaded');
      var sm3 = this._sm.sm3;
      var inputStr = typeof data === 'string' ? data : b2h(data);
      return sm3(inputStr);
    }
  };

  // 注册 SM2 提供者（当 sm-crypto 可用时自动启用）
  registerProvider('sm2', sm2Provider)
  // ── 对外 API（按 algo 分发） ──────────────────────────

  // 生成密钥对（支持 algo 参数）
  async function generateKeyPair(algo) {
    var p = getProvider(algo)
    if (!p) throw new Error('Unsupported algorithm: ' + (algo || 'ed25519'))
    return await p.generateKeyPair()
  }

  // 导出公钥 → hex
  async function exportPublicKey(publicKey, algo) {
    var p = getProvider(algo)
    if (!p) return ed25519Provider.exportPublicKey(publicKey)
    return await p.exportPublicKey(publicKey)
  }

  // 导入公钥（hex → CryptoKey）
  async function importPublicKey(publicKeyHex, algo) {
    var p = getProvider(algo)
    if (!p) return ed25519Provider.importPublicKey(publicKeyHex)
    return await p.importPublicKey(publicKeyHex)
  }

  // 签名 → hex（支持 algo）
  async function sign(message, privateKey, algo) {
    var p = getProvider(algo)
    if (!p) throw new Error('Unsupported algorithm: ' + (algo || 'ed25519'))
    // 如果 privateKey 是 {privateKey, algo} 复合对象，提取真正的密钥
    var realKey = (privateKey && privateKey.privateKey) || privateKey
    return await p.sign(message, realKey)
  }

  // 验签（支持 algo）
  async function verify(message, signatureHex, publicKey, algo) {
    var p = getProvider(algo)
    if (!p) return ed25519Provider.verify(message, signatureHex, publicKey)
    return await p.verify(message, signatureHex, publicKey)
  }

  // SHA-256 摘要（支持 algo）
  async function hash(data, algo) {
    var p = getProvider(algo)
    if (!p) return ed25519Provider.hash(data)
    return await p.hash(data)
  }

  // HMAC-SHA256（供 StampChain 链哈希使用，Web Crypto 实现）
  async function hmac(key, data) {
    var keyBytes;
    if (typeof key === 'string') {
      var k = key || '00';
      // key 兼容两种语义: 64位hex链哈希 → 解码为字节; sessionId等非hex种子 → UTF-8字节
      var isHex = k.length % 2 === 0 && /^[0-9a-fA-F]+$/.test(k);
      keyBytes = isHex ? h2b(k) : new TextEncoder().encode(k);
    } else {
      keyBytes = key;
    }
    var input = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    var hmacKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    var sig = await crypto.subtle.sign('HMAC', hmacKey, input);
    return b2h(new Uint8Array(sig));
  }
  // AES-256-GCM 加密（密语功能，供 StampChain 使用）
  // key: Uint8Array 或 hex string；返回 { ciphertext: hex, nonce: hex }
  async function encrypt(plaintext, key) {
    var keyBytes = typeof key === 'string' ? h2b(key) : key;
    var iv = crypto.getRandomValues(new Uint8Array(12));
    var aesKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt']);
    var data = new TextEncoder().encode(plaintext);
    var enc = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, aesKey, data);
    return { ciphertext: b2h(new Uint8Array(enc)), nonce: b2h(iv) };
  }

  // AES-256-GCM 解密
  // payload: { ciphertext: hex, nonce: hex }；返回明文字符串
  async function decrypt(payload, key) {
    var keyBytes = typeof key === 'string' ? h2b(key) : key;
    var iv = h2b(payload.nonce);
    var data = h2b(payload.ciphertext);
    var aesKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['decrypt']);
    var dec = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: iv }, aesKey, data);
    return new TextDecoder().decode(dec);
  }

  // prevChainHash 计算
  async function computePrevHash(stamp) {
    if (!stamp) return ''
    return await hash((stamp.salt || '') + stamp.timestamp + stamp.nonce + stamp.signature)
  }

  // 标准化验签: 验证 stamp 的签名是否符合标准化输入格式
  // SHA-256(sessionId || index || timestamp || contentHash || prevChainHash || nonce)
  async function verifyStandardizedSignature(sessionId, index, timestamp, contentHash, prevChainHash, nonce, salt, signatureHex, publicKey, algo) {
    // 标准化消息: SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
    var signInput = sessionId + String(index) + (salt || '') + timestamp + (contentHash || '') + prevChainHash + nonce
    var msgBytes = new TextEncoder().encode(signInput)
    var hashBuf = await crypto.subtle.digest('SHA-256', msgBytes)
    var key = typeof publicKey === 'string' ? await importPublicKey(publicKey, algo) : publicKey
    return await verify(new Uint8Array(hashBuf), signatureHex, key, algo)
  }

  // 切换密码学提供者
  // 保存偏好到 localStorage，返回新 provider 名称

  // 切换密码学提供者
  // 保存偏好到 localStorage，返回新 provider 名称
  async function switchProvider(algo) {
    if (!algo || algo === "ed25519") {
      localStorage.setItem("rt_crypto_provider", "ed25519");
      return "ed25519";
    }
    var p = getProvider(algo);
    if (!p) throw new Error('Unsupported algorithm: ' + algo);
    localStorage.setItem("rt_crypto_provider", algo);
    return algo;
  }


  // ═══════════════════════════════════════════════════════════
  // TIC: 时序互锁链 (Temporal Interlock Chain)
  // λ-演算框架:
  //   signingKey_n = SHA-256(seed + chainHash_{n-1} + t_n + i_n + n_n + pubKey)
  //   chainHash_n  = SHA-256(chainHash_{n-1} + t_n + i_n + n_n + pubKey)
  //   验证: β-归约不可逆, 创作: η-展开态
  // ═══════════════════════════════════════════════════════════

  // 生成会话种子 (32 字节真随机)
  function generateSessionSeed() {
    var seed = new Uint8Array(32);
    crypto.getRandomValues(seed);
    return b2h(seed);
  }

  // 派生签名密钥 (共轭量: 知道种子←不知道时间, 知道时间←不知道种子)
  // 输入: seed(hex) + prevChainHash(hex) + timeStamp(ms·str) + interval(ms·str) + nonce(hex) + pubKey(hex)
  async function deriveSigningKey(sessionSeed, chainHashPrev, timeStamp, interval, nonce, salt, pubKey) {
    var input = sessionSeed + chainHashPrev + String(timeStamp) + String(interval) + nonce + (salt || '') + pubKey;
    return await hash(input);
  }

  // 计算链哈希 (链式自指, 类 Y-组合子)
  async function computeChainHash(chainHashPrev, timeStamp, interval, nonce, salt, pubKey) {
    var input = chainHashPrev + String(timeStamp) + String(interval) + nonce + (salt || '') + pubKey;
    return await hash(input);
  }

  // 创建一章带时序互锁的 stamp (不暴露 signingKey)
  async function createChainStamp(keypair, sessionSeed, chainHashPrev, timeStamp, interval, pubKey, salt) {
    var nonceArr = new Uint8Array(16);
    crypto.getRandomValues(nonceArr);
    var nonce = b2h(nonceArr);
    var signingKey = await deriveSigningKey(sessionSeed, chainHashPrev, timeStamp, interval, nonce, salt || '', pubKey);
    var newChainHash = await computeChainHash(chainHashPrev, timeStamp, interval, nonce, salt || '', pubKey);
    var msg = new TextEncoder().encode(newChainHash);
    var sig = await sign(msg, keypair.secretKey);
    return {
      index: 0,
      timeStamp: timeStamp,
      interval: interval,
      nonce: nonce,
      chainHash: newChainHash,
      chainHashPrev: chainHashPrev,
      signature: sig
    };
  }

  // 验证完整的时序互锁链
  // chainData: { sessionSeed, pubKey, stamps: [...], finalContentHash }
  async function verifyChain(chainData) {
    if (!chainData || !chainData.stamps || chainData.stamps.length === 0) {
      return { valid: false, breakAt: -1, reason: 'no stamps', stampCount: 0 };
    }
    for (var i = 0; i < chainData.stamps.length; i++) {
      var s = chainData.stamps[i];
      var prev = (i === 0 ? chainData.sessionSeed : chainData.stamps[i-1].chainHash);
      // 1. 验证 chainHash 连续性
      var expectedHash = await computeChainHash(prev, s.timeStamp, s.interval, s.nonce, s.salt || '', chainData.pubKey);
      if (expectedHash !== s.chainHash) {
        return { valid: false, breakAt: i, reason: 'chainHash mismatch at stamp ' + i, stampCount: i };
      }
      // 2. 验证签名
      if (chainData.pubKey && s.signature) {
        var msg = new TextEncoder().encode(s.chainHash);
        var pub = await importPublicKey(chainData.pubKey);
        var sigOk = await verify(msg, s.signature, pub);
        if (!sigOk) {
          return { valid: false, breakAt: i, reason: 'signature invalid at stamp ' + i, stampCount: i };
        }
      }
    }
    // 3. 验证最终 contentHash 绑定
    if (chainData.finalContentHash) {
      var lastStamp = chainData.stamps[chainData.stamps.length - 1];
      var boundHash = await hash(lastStamp.chainHash + chainData.finalContentHash);
      if (chainData.contentBindingHash && boundHash !== chainData.contentBindingHash) {
        return { valid: false, breakAt: 'final', reason: 'contentHash binding mismatch', stampCount: chainData.stamps.length };
      }
    }
    return { valid: true, breakAt: null, reason: '', stampCount: chainData.stamps.length };
  }
  return {
    registerProvider, getProvider, switchProvider,
    generateKeyPair, exportPublicKey, importPublicKey, sign, verify,
    verifyStandardizedSignature,
    hash, computePrevHash, hmac, encrypt, decrypt,

    // TIC 时序互锁链
    generateSessionSeed, deriveSigningKey, computeChainHash,
    createChainStamp, verifyChain,
    b2b: b2h, h2b: h2b,
  }
})()


