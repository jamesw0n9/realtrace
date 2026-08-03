// ========================================
// 真迹 · 密钥保险柜（Key Vault）
// 负责密钥加密存储、崩溃恢复、生命周期管理
// 依赖: 无（纯 IndexedDB + Web Crypto API）
// ========================================

window.RtKeyVault = (() => {
  "use strict";

  // 辅助函数（与 rt-crypto.js 保持一致的实现，独立运行）
  var b2h = (typeof window !== "undefined" && window.b2h) || function b2h(b) {
    return Array.from(new Uint8Array(b)).map(function(x) { return x.toString(16).padStart(2, '0') }).join('')
  }
  var h2b = (typeof window !== "undefined" && window.h2b) || function h2b(hex) {
    if (!hex) return new Uint8Array(0);
    if (hex.length % 2 !== 0) throw new Error('Odd length hex');
    var bytes = new Uint8Array(hex.length / 2);
    for (var i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    return bytes;
  }

  var DB = "rt-kv"
  var ST = "keys"

  function openDB() {
    return new Promise(function(resolve, reject) {
      var q = indexedDB.open(DB, 1)
      q.onupgradeneeded = function(e) {
        var d = e.target.result
        if (!d.objectStoreNames.contains(ST))
          d.createObjectStore(ST, { keyPath: "sessionId" })
      }
      q.onsuccess = function(e) { resolve(e.target.result) }
      q.onerror = function(e) { reject(e.target.error) }
    })
  }

  // AES-256-GCM ?????? XOR ???
  // ???? AES ?????? sessionStorage
  async function _getAesKey() {
    var cached = sessionStorage.getItem("_z_kv_aes")
    if (cached) {
      var raw = new Uint8Array(cached.split(",").map(function(x) { return parseInt(x) }))
      return await crypto.subtle.importKey("raw", raw, { name: "AES-GCM" }, false, ["encrypt", "decrypt"])
    }
    var key = await crypto.subtle.generateKey({ name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"])
    var raw = await crypto.subtle.exportKey("raw", key)
    var arr = new Uint8Array(raw)
    sessionStorage.setItem("_z_kv_aes", Array.from(arr).join(","))
    return key
  }

  async function encrypt(obj) {
    var s = JSON.stringify(obj)
    var data = new TextEncoder().encode(s)
    var key = await _getAesKey()
    var iv = crypto.getRandomValues(new Uint8Array(12))
    var encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, data)
    var combined = new Uint8Array(iv.length + new Uint8Array(encrypted).length)
    combined.set(iv)
    combined.set(new Uint8Array(encrypted), iv.length)
    return btoa(String.fromCharCode.apply(null, combined))
  }

  async function decrypt(enc) {
    try {
      var combined = new Uint8Array(atob(enc).split("").map(function(c) { return c.charCodeAt(0) }))
      var iv = combined.slice(0, 12)
      var data = combined.slice(12)
      var key = await _getAesKey()
      var decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, key, data)
      return JSON.parse(new TextDecoder().decode(decrypted))
    } catch(e) { return null }
  }

  // ── 密码加密导出私钥（PBKDF2 600K + AES-256-GCM）──────
  async function exportEncryptedKey(privateKey, password) {
    var salt = crypto.getRandomValues(new Uint8Array(16))
    var iv = crypto.getRandomValues(new Uint8Array(12))
    var pbkdf2Key = await crypto.subtle.importKey(
      "raw", new TextEncoder().encode(password),
      { name: "PBKDF2" }, false, ["deriveKey"]
    )
    var aesKey = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt: salt, iterations: 600000, hash: "SHA-256" },
      pbkdf2Key,
      { name: "AES-GCM", length: 256 },
      false,
      ["wrapKey"]
    )
    var rawPriv = await crypto.subtle.exportKey("pkcs8", privateKey)
    var encryptedKey = await crypto.subtle.wrapKey(
      "pkcs8", privateKey, aesKey,
      { name: "AES-GCM", iv: iv }
    )
    return {
      encryptedKeyHex: b2h(new Uint8Array(encryptedKey)),
      saltHex: b2h(salt),
      ivHex: b2h(iv)
    }
  }

    // ── 密码解密导入私钥（PBKDF2 600K + AES-256-GCM）──────
  async function importEncryptedKey(encryptedKeyHex, password, saltHex, ivHex) {
    var encryptedKey = h2b(encryptedKeyHex)
    var salt = h2b(saltHex)
    var iv = h2b(ivHex)
    var pbkdf2Key = await crypto.subtle.importKey(
      'raw', new TextEncoder().encode(password),
      { name: 'PBKDF2' }, false, ['deriveKey']
    )
    var aesKey = await crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: salt, iterations: 600000, hash: 'SHA-256' },
      pbkdf2Key,
      { name: 'AES-GCM', length: 256 },
      false,
      ['unwrapKey']
    )
    var privateKey = await crypto.subtle.unwrapKey(
      'pkcs8', encryptedKey, aesKey,
      { name: 'AES-GCM', iv: iv },
      { name: 'Ed25519' },
      false,
      ['sign']
    )
    return privateKey
  }

  // 存储密钥对（提取私钥原始字节 → 混淆后存 IDB）
  async function storeKey(sessionId, kp, publicKeyHex) {
    var kpReady = kp
    var privKey = kpReady.privateKey || kpReady
    var pubKey = kpReady.publicKey || null

    var rawPriv
    try {
      rawPriv = await crypto.subtle.exportKey("pkcs8", privKey)
      if (pubKey) {
        var rawPub = await crypto.subtle.exportKey("raw", pubKey)
      }
    } catch(e) {
      console.warn("[key-vault] 密钥不可导出:", e.message)
      return false
    }

    var record = {
      sessionId: sessionId,
      publicKeyHex: publicKeyHex || "",
      privateKeyRaw: Array.from(new Uint8Array(rawPriv)),
      publicKeyRaw: pubKey ? Array.from(new Uint8Array(rawPub)) : [],
      createdAt: Date.now()
    }

    var db = await openDB()
    var encrypted = await encrypt(record)
    return new Promise(function(resolve, reject) {
      var t = db.transaction(ST, "readwrite")
      t.objectStore(ST).put({ sessionId: sessionId, data: encrypted })
      t.oncomplete = function() { db.close(); resolve(true) }
      t.onerror = function(e) { db.close(); reject(e.target.error) }
    })
  }

  // 恢复密钥
  async function recoverKey(sessionId) {
    var db = await openDB()
    var data = await new Promise(async function(resolve) {
      var t = db.transaction(ST, "readonly")
      var r = t.objectStore(ST).get(sessionId)
      r.onsuccess = async function() { resolve(r.result) }
      r.onerror = function() { resolve(null) }
    })
    db.close()
    if (!data || !data.data) return null

    var record = await decrypt(data.data)
    if (!record || !record.privateKeyRaw) return null

    try {
      var privRaw = new Uint8Array(record.privateKeyRaw)
      var privateKey = await crypto.subtle.importKey("pkcs8", privRaw, { name: "Ed25519" }, false, ["sign"])

      var result = { kp: { privateKey: privateKey }, publicKeyHex: record.publicKeyHex }

      if (record.publicKeyRaw && record.publicKeyRaw.length > 0) {
        var pubRaw = new Uint8Array(record.publicKeyRaw)
        result.kp.publicKey = await crypto.subtle.importKey("raw", pubRaw, { name: "Ed25519" }, false, ["verify"])
      }

      return result
    } catch(e) {
      console.warn("[key-vault] 密钥恢复失败:", e.message)
      return null
    }
  }

  // 删除密钥
  async function destroyKey(sessionId) {
    var db = await openDB()
    return new Promise(function(resolve, reject) {
      var t = db.transaction(ST, "readwrite")
      t.objectStore(ST).delete(sessionId)
      t.oncomplete = function() { db.close(); resolve() }
      t.onerror = function(e) { db.close(); reject(e.target.error) }
    })
  }

  // 列出所有持久化的会话（用于崩溃恢复）
  async function listSessions() {
    var db = await openDB()
    var sessions = await new Promise(async function(resolve) {
      var t = db.transaction(ST, "readonly")
      var r = t.objectStore(ST).getAll()
      r.onsuccess = async function() {
        var list = []
        for (var i = 0; i < r.result.length; i++) {
          var item = r.result[i]
          var record = await decrypt(item.data)
          if (record) {
            list.push({ sessionId: item.sessionId, createdAt: record.createdAt })
          }
        }
        resolve(list)
      }
      r.onerror = function() { resolve([]) }
    })
    db.close()
    return sessions
  }

  return { storeKey, recoverKey, destroyKey, listSessions, exportEncryptedKey, importEncryptedKey }
})()








