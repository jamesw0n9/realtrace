// ========================================
// RealTrace · 官方创世链锚定客户端（个人免费）
//
// 职责：把创作链的 stamp / 封章结果提交到官方锚定服务。
// 官方服务会把子链根哈希记录进官方创世链，形成可公开审计的溯源。
// 个人创作者上链免费；联合授权平台使用单独支链并另行授权。
//
// 用法（浏览器）:
//   <script src="../config.js"></script>
//   <script src="anchor-client.js"></script>
//   <script>
//     RtAnchor.configure({ apiBase: "https://rt.example.com" });
//     await RtAnchor.submitStamp(stamp);          // 增量打章上报（可选）
//     var res = await RtAnchor.seal(payload);     // 封章上链，返回 certificateId
//     var cert = await RtAnchor.query(id);        // 查询证书
//   </script>
//
// 离线模式：不调用任何网络 API，链仍可本地验证（见 core/rt-verifier.js）。
// 官方背书：配置 genesisPublicKey 后，query/genesisPath 的返回会做 Ed25519 签名校验
//           （契约：signature 覆盖 signedData 字符串的 UTF-8 字节，与 RtCrypto.verify 一致）。
// ========================================

window.RtAnchor = (() => {
  "use strict";

  var CONFIG = {
    apiBase: "",               // 官方锚定服务根地址，例: "https://rt.example.com"
    genesisPublicKey: "",      // 官方创世链根公钥（官方渠道公布）
    enabled: false             // false = 完全离线，不发起任何网络请求
  };

  function currentConfig() {
    var cfg = (typeof window !== "undefined" && window.RT_CONFIG && window.RT_CONFIG.anchor) || {};
    return {
      apiBase: cfg.apiBase || CONFIG.apiBase,
      genesisPublicKey: cfg.genesisPublicKey || CONFIG.genesisPublicKey,
      enabled: cfg.enabled !== undefined ? !!cfg.enabled : CONFIG.enabled
    };
  }

  function apiUrl(path) {
    var cfg = currentConfig();
    if (!cfg.enabled || !cfg.apiBase) return "";
    return cfg.apiBase.replace(/\/+$/, "") + path;
  }

  function hexToBytes(hex) {
    if (!hex) return new Uint8Array(0);
    if (hex.length % 2 !== 0) throw new Error('Odd length hex');
    var out = new Uint8Array(hex.length / 2);
    for (var i = 0; i < hex.length; i += 2) out[i / 2] = parseInt(hex.substring(i, i + 2), 16);
    return out;
  }

  async function post(path, body) {
    var url = apiUrl(path);
    if (!url) return { offline: true, error: "anchor disabled or apiBase not configured" };
    var resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    var text = await resp.text();
    var json = null;
    try { json = JSON.parse(text); } catch (e) { /* 非 JSON 响应 */ }
    if (!resp.ok) {
      throw new Error("anchor request failed: " + resp.status + " " + (json && json.error ? json.error : text.slice(0, 120)));
    }
    return json || { status: resp.status };
  }

  async function get(path) {
    var url = apiUrl(path);
    if (!url) return { offline: true, error: "anchor disabled or apiBase not configured" };
    var resp = await fetch(url);
    var text = await resp.text();
    var json = null;
    try { json = JSON.parse(text); } catch (e) { /* ignore */ }
    if (!resp.ok) {
      throw new Error("anchor query failed: " + resp.status + (json && json.error ? " " + json.error : ""));
    }
    return json || { status: resp.status };
  }

  // 官方创世签名校验（M-1）：
  // 响应体 { ..., signature: "<hex>", signedData: "<string>" }，signature 覆盖 signedData 的 UTF-8 字节。
  // 返回 { verified: true|false|null, reason }；null = 未配置 genesisPublicKey。
  async function verifyGenesisData(payload) {
    var cfg = currentConfig();
    if (!cfg.genesisPublicKey) return { verified: null, reason: "genesisPublicKey 未配置" };
    if (!payload || typeof payload !== "object") return { verified: false, reason: "响应无效" };
    var sig = payload.signature || "";
    var signedData = payload.signedData;
    if (typeof signedData !== "string" || signedData.length === 0 || !sig) {
      return { verified: false, reason: "缺少官方签名（signedData/signature）——该记录未被官方链背书" };
    }
    try {
      var verifier = (typeof window !== "undefined" && window.RtCrypto && typeof window.RtCrypto.verify === "function")
        ? window.RtCrypto.verify
        : null;
      var ok;
      if (verifier) {
        ok = await verifier(new TextEncoder().encode(signedData), sig, cfg.genesisPublicKey);
      } else if (typeof nacl !== "undefined" && nacl.sign && nacl.sign.detached) {
        ok = nacl.sign.detached.verify(new TextEncoder().encode(signedData), hexToBytes(sig), hexToBytes(cfg.genesisPublicKey));
      } else {
        return { verified: false, reason: "缺少验签模块（RtCrypto/tweetnacl）" };
      }
      return ok
        ? { verified: true, reason: "" }
        : { verified: false, reason: "官方签名无效——记录可能被篡改" };
    } catch (e) {
      return { verified: false, reason: "官方签名校验异常: " + e.message };
    }
  }

  async function enrichWithGenesisVerify(data) {
    if (!data || typeof data !== "object" || data.offline) return data;
    var v = await verifyGenesisData(data);
    return Object.assign({}, data, { genesisVerified: v.verified, genesisVerifyReason: v.reason });
  }

  // 上报单个 stamp（增量预验签，可选；失败不阻塞写作）
  async function submitStamp(stamp) {
    var url = apiUrl("/stamp");
    if (!url) return { offline: true };
    try {
      return await post("/stamp", stamp);
    } catch (e) {
      return { error: e.message };
    }
  }

  // 封章上链：服务端验链 → 生成证书 → 子链根哈希记入官方创世链
  async function seal(payload) {
    return await post("/seal", payload);
  }

  // 查询证书（官方创世链可审计记录）
  async function query(certificateId) {
    return await enrichWithGenesisVerify(await get("/certificate/" + encodeURIComponent(certificateId)));
  }

  // 查询从创世根到指定证书的完整路径（官方服务支持时）
  async function genesisPath(certificateId) {
    return await enrichWithGenesisVerify(await get("/genesis/path/" + encodeURIComponent(certificateId)));
  }

  // 程序化配置（优先级低于 window.RT_CONFIG.anchor）
  function configure(overrides) {
    if (overrides) {
      CONFIG = Object.assign({}, CONFIG, overrides);
    }
    return currentConfig();
  }

  return {
    configure: configure,
    submitStamp: submitStamp,
    seal: seal,
    query: query,
    genesisPath: genesisPath,
    verifyGenesisData: verifyGenesisData,
    isEnabled: function() { return currentConfig().enabled && !!currentConfig().apiBase; }
  };
})();

// Node 侧复用（可选）
if (typeof module !== "undefined" && module.exports) {
  module.exports = window.RtAnchor;
}
