// ========================================
// Realtrace · 创作时间轴渲染模块 (rt-timeline)
// 零依赖、自包含样式，供写作页 / 离线验证页 / 自包含证书共用。
// 统一 .rt-tl-* 类名前缀，避免与宿主页面样式冲突。
// ========================================
window.RtTimeline = (function () {
  "use strict";

  var STYLE_ID = "rt-timeline-css";

  var DICT = {
    zh: { title: "创作时间轴", stampUnit: "个 stamp", start: "起点", end: "终点", duration: "创作时长", sec: "秒", min: "分", hour: "时", hash: "hash", words: "字", dash: "—" },
    en: { title: "Creation Timeline", stampUnit: "stamps", start: "Start", end: "End", duration: "Writing time", sec: "s", min: "min", hour: "h", hash: "hash", words: "words", dash: "—" },
    ja: { title: "執筆タイムライン", stampUnit: "スタンプ", start: "開始", end: "終了", duration: "執筆時間", sec: "秒", min: "分", hour: "時間", hash: "hash", words: "文字", dash: "—" },
    ko: { title: "창작 타임라인", stampUnit: "스탬프", start: "시작", end: "종료", duration: "창작 시간", sec: "초", min: "분", hour: "시간", hash: "hash", words: "자", dash: "—" },
    fr: { title: "Chronologie de cr\u00e9ation", stampUnit: "tampons", start: "D\u00e9but", end: "Fin", duration: "Dur\u00e9e", sec: "s", min: "min", hour: "h", hash: "hash", words: "mots", dash: "—" },
    de: { title: "Erstellungs-Timeline", stampUnit: "Stempel", start: "Start", end: "Ende", duration: "Dauer", sec: "s", min: "min", hour: "h", hash: "hash", words: "W\u00f6rter", dash: "—" }
  };

  var LANG = "zh";

  var CSS = [
    ".rt-tl-scroll{overflow-x:auto;overflow-y:hidden;white-space:nowrap;padding:8px 2px}",
    ".rt-tl-scroll::-webkit-scrollbar{height:4px}",
    ".rt-tl-scroll::-webkit-scrollbar-track{background:#0F172A}",
    ".rt-tl-scroll::-webkit-scrollbar-thumb{background:#334155;border-radius:2px}",
    ".rt-tl-track{display:inline-flex;align-items:center;gap:0;min-height:28px;padding:0 2px}",
    ".rt-tl-dot{width:10px;height:10px;border-radius:50%;background:#334155;flex-shrink:0;cursor:pointer;transition:all .2s;position:relative;border:1px solid #475569}",
    ".rt-tl-dot:hover{background:#D4A017;transform:scale(1.7);z-index:2}",
    ".rt-tl-dot.first{background:#F59E0B}",
    ".rt-tl-dot.latest{background:#D4A017;border-color:rgba(212,160,23,.6)}",
    ".rt-tl-dot.latest::after{content:\"\";position:absolute;top:-3px;left:-3px;width:14px;height:14px;border-radius:50%;border:1.5px solid rgba(212,160,23,.4);animation:rtTlPulse 2s infinite}",
    "@keyframes rtTlPulse{0%,100%{opacity:1}50%{opacity:.3}}",
    ".rt-tl-conn{width:6px;height:1px;background:#334155;flex-shrink:0}",
    ".rt-tl-stats{display:flex;align-items:center;gap:16px;padding:4px 0 0;border-top:1px solid #1E293B;margin-top:6px;font-size:10px;color:#64748B}",
    ".rt-tl-stats strong{color:#D4A017;font-family:\"JetBrains Mono\",Consolas,monospace;font-weight:600}",
    ".rt-tl-meta{display:flex;gap:20px;margin-top:12px;padding-top:10px;border-top:1px solid #1E293B;font-size:11px;color:#64748B;flex-wrap:wrap}",
    ".rt-tl-meta b{color:#D4A017;font-weight:600;margin-left:4px}",
    ".rt-tl-title{font-size:13px;color:#94A3B8;margin-bottom:12px;font-weight:600}"
  ].join("\n");

  function ensureStyle() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    var st = document.createElement("style");
    st.id = STYLE_ID;
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  function setLang(l) { if (DICT[l]) LANG = l; }
  function getLang() { return LANG; }

  function T(key, vars) {
    var s = (DICT[LANG] && DICT[LANG][key] !== undefined) ? DICT[LANG][key] : (DICT.zh[key] !== undefined ? DICT.zh[key] : key);
    if (vars) { for (var k in vars) { s = s.split("{" + k + "}").join(String(vars[k])); } }
    return s;
  }

  function escapeHtml(v) {
    return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function stampTs(s) {
    if (!s) return 0;
    if (s.ts) return s.ts;
    if (typeof s.timestamp === "string") { var t = Date.parse(s.timestamp); return isNaN(t) ? 0 : t; }
    if (typeof s.timestamp === "number") return s.timestamp;
    return 0;
  }

  function fmtTime(t) {
    if (!t) return T("dash");
    try { return new Date(t).toLocaleString(); } catch (e) { return String(t); }
  }

  function fmtDur(ms) {
    if (!ms || ms <= 0) return T("dash");
    var s = Math.floor(ms / 1000);
    if (s < 60) return s + " " + T("sec");
    var m = Math.floor(s / 60);
    if (m < 60) return m + " " + T("min") + " " + (s % 60) + " " + T("sec");
    var h = Math.floor(m / 60);
    return h + " " + T("hour") + " " + (m % 60) + " " + T("min");
  }

  // 点 + 连线轨道（写作页紧凑条 / 验证页卡片共用）
  function barHTML(stamps) {
    stamps = stamps || [];
    if (!stamps.length) return "";
    var dots = [];
    for (var i = 0; i < stamps.length; i++) {
      if (i > 0) dots.push('<span class="rt-tl-conn"></span>');
      var s = stamps[i];
      var t = stampTs(s);
      var cls = "rt-tl-dot" + (i === 0 ? " first" : "") + (i === stamps.length - 1 ? " latest" : "");
      var label = "#" + (i + 1);
      if (t) { try { label += " · " + new Date(t).toLocaleString(); } catch (e) {} }
      if (s.wordDelta !== undefined) label += " · +" + s.wordDelta + " " + T("words");
      if (s.hash) label += " · " + T("hash") + " " + s.hash.substring(0, 8);
      dots.push('<span class="' + cls + '" title="' + escapeHtml(label) + '"></span>');
    }
    return '<div class="rt-tl-scroll"><div class="rt-tl-track">' + dots.join("") + "</div></div>";
  }

  // 统计行：N stamps | 创作时长
  function statsHTML(stamps) {
    stamps = stamps || [];
    var dur = "";
    if (stamps.length >= 2) {
      var times = stamps.map(stampTs).filter(function (t) { return t > 0; });
      if (times.length >= 2 && times[times.length - 1] > times[0]) {
        dur = fmtDur(times[times.length - 1] - times[0]);
      }
    }
    return '<div class="rt-tl-stats"><strong>' + stamps.length + "</strong> " + T("stampUnit") + (dur ? " | " + T("duration") + " <strong>" + dur + "</strong>" : "") + "</div>";
  }

  // 起点 / 终点 / 时长元信息行
  function metaHTML(stamps) {
    var times = (stamps || []).map(stampTs).filter(function (t) { return t > 0; });
    var firstT = times.length ? times[0] : 0;
    var lastT = times.length ? times[times.length - 1] : 0;
    return '<div class="rt-tl-meta">' +
      "<span>" + T("start") + " <b>" + fmtTime(firstT) + "</b></span>" +
      "<span>" + T("end") + " <b>" + fmtTime(lastT) + "</b></span>" +
      "<span>" + T("duration") + " <b>" + fmtDur(lastT - firstT) + "</b></span>" +
      "</div>";
  }

  // 完整卡片（标题 + 轨道 + 元信息），供离线验证页 / 证书使用
  function cardHTML(stamps, opts) {
    stamps = stamps || [];
    if (!stamps.length) return "";
    opts = opts || {};
    var title = opts.title !== undefined ? opts.title : T("title") + " · " + stamps.length + " " + T("stampUnit");
    return (title ? '<div class="rt-tl-title">' + escapeHtml(title) + "</div>" : "") +
      barHTML(stamps) + metaHTML(stamps);
  }

  function mount(el, stamps, opts) {
    if (!el) return;
    ensureStyle();
    el.innerHTML = cardHTML(stamps, opts);
  }

  ensureStyle();
  return {
    setLang: setLang,
    getLang: getLang,
    barHTML: barHTML,
    statsHTML: statsHTML,
    metaHTML: metaHTML,
    cardHTML: cardHTML,
    mount: mount,
    formatDuration: fmtDur
  };
})();