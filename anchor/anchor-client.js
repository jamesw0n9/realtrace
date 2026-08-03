// ========================================
// Realtrace · 官方创世链锚定客户端（个人免费）
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
    return await get("/certificate/" + encodeURIComponent(certificateId));
  }

  // 查询从创世根到指定证书的完整路径（官方服务支持时）
  async function genesisPath(certificateId) {
    return await get("/genesis/path/" + encodeURIComponent(certificateId));
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
    isEnabled: function() { return currentConfig().enabled && !!currentConfig().apiBase; }
  };
})();

// Node 侧复用（可选）
if (typeof module !== "undefined" && module.exports) {
  module.exports = window.RtAnchor;
}