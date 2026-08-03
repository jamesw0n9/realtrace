// ========================================
// 真迹 · 轻量续写头 (Light Head)
// 用于超大型 .rt 文件的快速续写
// 只读取头部 ~2KB 即可恢复创作身份和链位置
// 增量追加：仅上传新印章，不传全量
// ========================================

window.RtLightHead = (() => {
  "use strict"

  var HEAD_VERSION = "rt-light-v1"
  var HEAD_MAGIC = "RTLH"  // 魔数标识

  // ─── 工具 ──────────────────────────────
  function b2h(b) {
    return Array.from(new Uint8Array(b)).map(function(x) { return x.toString(16).padStart(2, "0") }).join("")
  }
  function h2b(hex) {
    if (!hex) return new Uint8Array(0)
    if (hex.length % 2 !== 0) throw new Error("Odd length hex")
    var bytes = new Uint8Array(hex.length / 2)
    for (var i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16)
    return bytes
  }

  // ─── 构建轻量头 ─────────────────────────
  // 从完整 .rt 包或已知链末状态构建
  function buildHead(pkg) {
    if (!pkg) return null

    // 如果传的是完整 .rt 包
    if (pkg.stamps && pkg.stamps.length > 0) {
      var last = pkg.stamps[pkg.stamps.length - 1]
      return {
        magic: HEAD_MAGIC,
        version: HEAD_VERSION,
        sessionId: pkg.sessionId,
        publicKey: pkg.publicKey,
        stampCount: pkg.stamps.length,
        lastStampHash: last.hash || last.chainHash || "",
        lastContentHash: last.contentHash || "",
        lastTimestamp: last.ts || last.timestamp || "",
        encryptedPrivateKey: pkg.encryptedPrivateKey || null,
        sealedAt: pkg.sealedAt || last.ts || last.timestamp || "",
        checksum: ""  // 稍后计算
      }
    }

    // 如果传的是锚点对象（从 API 返回）
    if (pkg.lastStampHash) {
      var head = {
        magic: HEAD_MAGIC,
        version: HEAD_VERSION,
        sessionId: pkg.sessionId || "",
        publicKey: pkg.publicKey || "",
        stampCount: pkg.stampCount || 0,
        lastStampHash: pkg.lastStampHash,
        lastContentHash: pkg.lastContentHash || "",
        lastTimestamp: pkg.lastTimestamp || "",
        encryptedPrivateKey: pkg.encryptedPrivateKey || null,
        sealedAt: pkg.sealedAt || ""
      }
      head.checksum = ""
      return head
    }

    return null
  }

  // ─── 计算头部校验和 ─────────────────────
  async function signHead(head, privateKey) {
    var data = JSON.stringify(head, Object.keys(head).sort())
    var buf = new TextEncoder().encode(data + head.magic + head.version)
    var sig = await crypto.subtle.sign({ name: "Ed25519" }, privateKey, buf)
    head.checksum = b2h(new Uint8Array(sig))
    return head
  }

  // ─── 验证头部校验和 ─────────────────────
  async function verifyHead(head, publicKey) {
    if (!head || !head.checksum) return false
    var sig = head.checksum
    head.checksum = ""
    var data = JSON.stringify(head, Object.keys(head).sort())
    var buf = new TextEncoder().encode(data + head.magic + head.version)
    head.checksum = sig
    try {
      var pk = typeof publicKey === "string"
        ? await crypto.subtle.importKey("raw", h2b(publicKey), { name: "Ed25519" }, false, ["verify"])
        : publicKey
      return await crypto.subtle.verify({ name: "Ed25519" }, pk, h2b(sig), buf)
    } catch(e) {
      return false
    }
  }

  // ─── 序列化轻量头为 JSON 字符串 ──────────
  function serializeHead(head) {
    if (!head) return null
    return JSON.stringify(head)
  }

  // ─── 反序列化轻量头 ─────────────────────
  function deserializeHead(json) {
    try {
      var head = typeof json === "string" ? JSON.parse(json) : json
      if (head.magic !== HEAD_MAGIC) return null
      return head
    } catch(e) {
      return null
    }
  }

  // ─── 从 .rt 文件提取轻量头（只读前几 KB）──
  // 适用于直接读取二进制文件头部
  async function extractHeadFromFile(file) {
    // 尝试读前 4096 字节
    var blob = file.slice(0, Math.min(file.size, 4096))
    var text = await blob.text()
    try {
      // 轻量头可能嵌入在文件开头注释中，也可能是一个独立 JSON 对象
      // 先尝试整体解析
      var data = JSON.parse(text)
      if (data.magic === HEAD_MAGIC) return data
    } catch(e) { /* 非 JSON 头，继续 */ }

    // 尝试在 JSON 中查找 lightHead 字段
    // 完整 .rt 文件是 JSON，头部可能包含 lightHead 域
    try {
      var fullText = typeof file === "string" ? file : await file.slice(0, Math.min(file.size, 65536)).text()
      // 尝试在 JSON 中定位
      var idx = fullText.indexOf('"lightHead"')
      if (idx >= 0) {
        // 找到 lightHead 字段，尝试解析其值
        var start = fullText.indexOf("{", idx)
        if (start >= 0) {
          var end = fullText.indexOf("}", start) + 1
          var headStr = fullText.substring(start, end)
          var parsed = JSON.parse(headStr)
          if (parsed.magic === HEAD_MAGIC) return parsed
        }
      }
    } catch(e) { /* ignore */ }

    return null
  }

  // ─── 增量续写锚点 ───────────────────────
  // 用户续写完成后，生成新的锚点
  function buildAppendAnchor(oldHead, newStamps) {
    if (!oldHead || !newStamps || newStamps.length === 0) return null
    var last = newStamps[newStamps.length - 1]
    return {
      magic: HEAD_MAGIC,
      version: HEAD_VERSION,
      sessionId: oldHead.sessionId,
      publicKey: oldHead.publicKey,
      stampCount: oldHead.stampCount + newStamps.length,
      lastStampHash: last.hash || last.chainHash || "",
      lastContentHash: last.contentHash || "",
      lastTimestamp: last.ts || last.timestamp || "",
      encryptedPrivateKey: oldHead.encryptedPrivateKey,
      sealedAt: new Date().toISOString(),
      checksum: ""
    }
  }

  // ─── 构建仅含新 stamp 的增量载荷 ─────────
  function buildIncrementalPayload(newStamps, oldHead) {
    if (!newStamps || newStamps.length === 0) return null
    return {
      _incremental: true,
      sessionId: oldHead.sessionId,
      publicKey: oldHead.publicKey,
      stamps: newStamps,
      fromStampIndex: oldHead.stampCount,
      fromStampHash: oldHead.lastStampHash,
      contentHash: oldHead.lastContentHash,
    }
  }

  return {
    buildHead: buildHead,
    signHead: signHead,
    verifyHead: verifyHead,
    serializeHead: serializeHead,
    deserializeHead: deserializeHead,
    extractHeadFromFile: extractHeadFromFile,
    buildAppendAnchor: buildAppendAnchor,
    buildIncrementalPayload: buildIncrementalPayload,
  }
})()

