// ========================================
// RealTrace · 密钥保险柜 V3.0（身份模块）
// 处理 tweetnacl Ed25519 64 字节 secretKey（与 rt-crypto.js 默认提供者同源）
// 所有持久化基于用户密码：PBKDF2-SHA256(600K) + AES-256-GCM
// 派生密钥每次由密码现场生成，绝不落 sessionStorage / IndexedDB
// 能力：密码加密身份导出(.rtkey) / 导入恢复 / 浏览器内崩溃恢复(IndexedDB)
// 依赖: tweetnacl（window.nacl）+ Web Crypto（通用能力）
// ========================================

window.RtKeyVault = (() => {
  "use strict";

  var KDF_ITER = 600000;
  var IDB_DB = "rt-kv";
  var IDB_ST = "identities";

  var b2h = (typeof window !== "undefined" && window.b2h) || function b2h(b) {
    return Array.from(new Uint8Array(b)).map(function(x) { return x.toString(16).padStart(2, '0'); }).join('');
  };
  var h2b = (typeof window !== "undefined" && window.h2b) || function h2b(hex) {
    if (!hex) return new Uint8Array(0);
    if (hex.length % 2 !== 0) throw new Error('Odd length hex');
    var bytes = new Uint8Array(hex.length / 2);
    for (var i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    return bytes;
  };

  function isValidSecretHex(hex) {
    return typeof hex === 'string' && /^[0-9a-f]{128}$/i.test(hex);
  }

  // ── IndexedDB ───────────────────────────────
  function openDB() {
    return new Promise(function(resolve, reject) {
      var q = indexedDB.open(IDB_DB, 1);
      q.onupgradeneeded = function(e) {
        var d = e.target.result;
        if (!d.objectStoreNames.contains(IDB_ST)) {
          d.createObjectStore(IDB_ST, { keyPath: "sessionId" });
        }
      };
      q.onsuccess = function(e) { resolve(e.target.result); };
      q.onerror = function(e) { reject(e.target.error); };
    });
  }

  // ── 密码派生 AES-256-GCM 密钥（PBKDF2-SHA256 600K）──
  async function deriveKeyFromPassword(password, saltBytes) {
    var base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
    return await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: saltBytes, iterations: KDF_ITER, hash: "SHA-256" },
      base,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  // ── 密码加密导出私钥（自包含 payload v2）──
  // 输入: tweetnacl 64 字节 secretKey（hex 或 Uint8Array）
  // 输出: { v:2, kdf:'PBKDF2-SHA256', iter, saltHex, ivHex, dataHex }
  async function exportEncryptedKey(secretKey, password) {
    if (!password || String(password).length < 6) throw new Error('Password must be at least 6 characters');
    var hex = typeof secretKey === 'string' ? secretKey : b2h(secretKey);
    if (!isValidSecretHex(hex)) throw new Error('Invalid Ed25519 secret key (expect 128-char hex)');
    var salt = crypto.getRandomValues(new Uint8Array(16));
    var iv = crypto.getRandomValues(new Uint8Array(12));
    var key = await deriveKeyFromPassword(password, salt);
    var ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, new TextEncoder().encode(hex));
    return { v: 2, kdf: 'PBKDF2-SHA256', iter: KDF_ITER, saltHex: b2h(salt), ivHex: b2h(iv), dataHex: b2h(new Uint8Array(ct)) };
  }

  // ── 密码解密导入私钥 → secretKeyHex ───────
  async function importEncryptedKey(payload, password) {
    if (!payload) throw new Error('Empty identity payload');
    if (payload.v === 2 && payload.dataHex && payload.saltHex && payload.ivHex) {
      var salt = h2b(payload.saltHex);
      var iv = h2b(payload.ivHex);
      var key = await deriveKeyFromPassword(password, salt);
      var pt;
      try {
        pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, h2b(payload.dataHex));
      } catch (e) {
        throw new Error('解密失败：密码错误或文件已损坏');
      }
      var hex = new TextDecoder().decode(pt);
      if (!isValidSecretHex(hex)) throw new Error('解密内容不是有效的 Ed25519 私钥');
      return hex;
    }
    if (payload.encryptedKeyHex || payload.v === 1) {
      throw new Error('旧版 pkcs8 加密身份不再支持，请用当前版本重新导出身份');
    }
    throw new Error('未知的身份文件格式');
  }

  // ── 由 secretKeyHex 恢复 tweetnacl 密钥对 ──
  function keyPairFromSecret(secretKeyHex) {
    if (!isValidSecretHex(secretKeyHex)) throw new Error('Invalid secret key hex');
    var naclMod = (typeof window !== 'undefined' && window.nacl) || (typeof globalThis !== 'undefined' && globalThis.nacl);
    if (!naclMod || !naclMod.sign) throw new Error('tweetnacl not loaded');
    return naclMod.sign.keyPair.fromSecretKey(h2b(secretKeyHex));
  }

  // ── 浏览器内保存身份（密码加密，私钥不落明文）──
  async function storeKey(sessionId, secretKeyHex, publicKeyHex, password) {
    if (!sessionId || !isValidSecretHex(secretKeyHex)) throw new Error('storeKey: invalid sessionId or secretKey');
    var payload = await exportEncryptedKey(secretKeyHex, password);
    var db = await openDB();
    return new Promise(function(resolve, reject) {
      var t = db.transaction(IDB_ST, "readwrite");
      t.objectStore(IDB_ST).put({
        sessionId: sessionId,
        publicKeyHex: publicKeyHex || '',
        createdAt: Date.now(),
        data: payload
      });
      t.oncomplete = function() { db.close(); resolve(true); };
      t.onerror = function(e) { db.close(); reject(e.target.error); };
    });
  }

  // ── 浏览器内恢复身份（需密码）──
  async function recoverKey(sessionId, password) {
    var db = await openDB();
    var row = await new Promise(function(resolve) {
      var t = db.transaction(IDB_ST, "readonly");
      var r = t.objectStore(IDB_ST).get(sessionId);
      r.onsuccess = function() { resolve(r.result || null); };
      r.onerror = function() { resolve(null); };
    });
    db.close();
    if (!row || !row.data) return null;
    var secretKeyHex = await importEncryptedKey(row.data, password);
    return { secretKeyHex: secretKeyHex, publicKeyHex: row.publicKeyHex || b2h(keyPairFromSecret(secretKeyHex).publicKey) };
  }

  // ── 删除身份 ───────────────────────────
  async function destroyKey(sessionId) {
    var db = await openDB();
    return new Promise(function(resolve, reject) {
      var t = db.transaction(IDB_ST, "readwrite");
      t.objectStore(IDB_ST).delete(sessionId);
      t.oncomplete = function() { db.close(); resolve(); };
      t.onerror = function(e) { db.close(); reject(e.target.error); };
    });
  }

  // ── 列出已保存身份（仅元数据，不解密）──
  async function listSessions() {
    var db = await openDB();
    var rows = await new Promise(function(resolve) {
      var t = db.transaction(IDB_ST, "readonly");
      var r = t.objectStore(IDB_ST).getAll();
      r.onsuccess = function() { resolve(r.result || []); };
      r.onerror = function() { resolve([]); };
    });
    db.close();
    return rows.map(function(row) {
      return { sessionId: row.sessionId, publicKeyHex: row.publicKeyHex || '', createdAt: row.createdAt || 0 };
    });
  }

  // 兼容旧 API 名（recoverKeyPairFromPayload 便捷入口）
  async function recoverKeyPairFromPayload(payload, password) {
    var secretKeyHex = await importEncryptedKey(payload, password);
    return { secretKeyHex: secretKeyHex, kp: keyPairFromSecret(secretKeyHex), publicKeyHex: b2h(keyPairFromSecret(secretKeyHex).publicKey) };
  }

  return {
    exportEncryptedKey: exportEncryptedKey,
    importEncryptedKey: importEncryptedKey,
    keyPairFromSecret: keyPairFromSecret,
    storeKey: storeKey,
    recoverKey: recoverKey,
    destroyKey: destroyKey,
    listSessions: listSessions,
    recoverKeyPairFromPayload: recoverKeyPairFromPayload,
    KDF_ITERATIONS: KDF_ITER
  };
})();


