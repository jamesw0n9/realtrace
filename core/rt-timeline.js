// ========================================
// RealTrace · 创作时间轴图表模块 (rt-timeline)
// 零依赖、自包含样式，Canvas 直方图：x=时间桶，y=每桶 stamp 数。
// 支持时间粒度缩放（秒 / 分钟 / 小时 / 每日 / 月度），供离线验证页 / 证书使用。
// 写作页不展示时间轴（仅离线 HTML 需要）。
// ========================================
window.RtTimeline = (function () {
  "use strict";

  var STYLE_ID = "rt-timeline-css";
  var mounted = [];

  var LVLS = ["mon", "day", "hr", "min", "sec"];
  var LVL_MS = { mon: 2592000000, day: 86400000, hr: 3600000, min: 60000, sec: 1000 };

  var DICT = {
    zh: { title: "创作时间轴", stampUnit: "个 stamp", start: "起点", end: "终点", duration: "创作时长", sec: "秒", min: "分", hour: "时", dash: "—", insufficient: "数据不足", zoomIn: "放大", zoomOut: "缩小", lvl: ["月度级", "每日级", "小时级", "分钟级", "秒级"] },
    en: { title: "Creation Timeline", stampUnit: "stamps", start: "Start", end: "End", duration: "Writing time", sec: "s", min: "min", hour: "h", dash: "—", insufficient: "Not enough data", zoomIn: "Zoom in", zoomOut: "Zoom out", lvl: ["Monthly", "Daily", "Hourly", "Minute", "Second"] },
    ja: { title: "執筆タイムライン", stampUnit: "スタンプ", start: "開始", end: "終了", duration: "執筆時間", sec: "秒", min: "分", hour: "時間", dash: "—", insufficient: "データ不足", zoomIn: "拡大", zoomOut: "縮小", lvl: ["月別", "日別", "時間", "分", "秒"] },
    ko: { title: "창작 타임라인", stampUnit: "스탬프", start: "시작", end: "종료", duration: "창작 시간", sec: "초", min: "분", hour: "시간", dash: "—", insufficient: "데이터 부족", zoomIn: "확대", zoomOut: "축소", lvl: ["월별", "일별", "시간", "분", "초"] },
    fr: { title: "Chronologie de cr\u00e9ation", stampUnit: "tampons", start: "D\u00e9but", end: "Fin", duration: "Dur\u00e9e", sec: "s", min: "min", hour: "h", dash: "—", insufficient: "Donn\u00e9es insuffisantes", zoomIn: "Zoom avant", zoomOut: "Zoom arri\u00e8re", lvl: ["Mensuel", "Quotidien", "Horaire", "Minute", "Seconde"] },
    de: { title: "Erstellungs-Timeline", stampUnit: "Stempel", start: "Start", end: "Ende", duration: "Dauer", sec: "s", min: "min", hour: "h", dash: "—", insufficient: "Zu wenige Daten", zoomIn: "Vergr\u00f6\u00dfern", zoomOut: "Verkleinern", lvl: ["Monatlich", "T\u00e4glich", "St\u00fcndlich", "Minute", "Sekunde"] }
  };

  var LANG = "zh";

  var CSS = [
    ".rt-tl-card{width:100%}",
    ".rt-tl-title{font-size:13px;color:#94A3B8;margin-bottom:12px;font-weight:600}",
    ".rt-tl-canvas-wrap{position:relative}",
    ".rt-tl-canvas{width:100%;height:auto;display:block;border-radius:4px;background:rgba(15,23,42,.35)}",
    ".rt-tl-zoom{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:10px}",
    ".rt-tl-zoom-btn{width:30px;height:28px;border:1px solid #334155;border-radius:4px;background:#1E293B;color:#94A3B8;font-size:15px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;font-family:inherit}",
    ".rt-tl-zoom-btn:hover{background:#334155;border-color:#A0780A;color:#F59E0B}",
    ".rt-tl-zoom-lvl{font-size:12px;color:#64748B;min-width:52px;text-align:center;font-weight:500}",
    ".rt-tl-zoom-lvl-text{color:#D4A017}",
    ".rt-tl-stats{display:flex;align-items:center;gap:16px;padding:8px 0 0;border-top:1px solid #1E293B;margin-top:10px;font-size:11px;color:#64748B;flex-wrap:wrap}",
    ".rt-tl-stats b{color:#D4A017;font-weight:600;margin-left:4px}"
  ].join("\n");

  function ensureStyle() {
    if (typeof document === "undefined") return;
    if (document.getElementById(STYLE_ID)) return;
    var st = document.createElement("style");
    st.id = STYLE_ID;
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  function setLang(l) {
    if (!DICT[l]) return;
    LANG = l;
    for (var i = 0; i < mounted.length; i++) {
      try { mounted[i].draw(); } catch (e) { /* 忽略单个实例重绘失败 */ }
    }
  }
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

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function roundRectPath(ctx, x, y, w, h, radii) {
    if (ctx.roundRect) { ctx.roundRect(x, y, w, h, radii); return; }
    var r = (radii && radii[0]) || 0;
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // Canvas 直方图：x=时间桶，y=桶内 stamp 数；li=粒度索引（0 月度 … 4 秒）
  function drawChart(canvas, stamps, li, lvlEl) {
    if (!canvas || !stamps || stamps.length < 2) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    var base = stampTs(stamps[0]);
    var td = [], i, t;
    for (i = 0; i < stamps.length; i++) {
      t = stampTs(stamps[i]) - base;
      td.push(t >= 0 ? t : 0);
    }

    ctx.fillStyle = "#64748B";
    ctx.font = "13px sans-serif";
    ctx.textAlign = "center";
    if (td.length < 2) { ctx.fillText(T("insufficient"), W / 2, H / 2); return; }

    var lv = LVLS[li];
    var ms = LVL_MS[lv];
    var tot = td[td.length - 1] || 1;
    var cnt = Math.ceil(tot / ms);
    cnt = Math.min(Math.max(cnt, 1), 500);
    ms = Math.max(tot / cnt, 1);

    var bins = [];
    for (i = 0; i < cnt; i++) bins.push(0);
    for (i = 0; i < td.length; i++) {
      var b = Math.floor(td[i] / ms);
      if (b >= 0 && b < cnt) bins[b]++;
    }
    var mx = 1;
    for (i = 0; i < bins.length; i++) if (bins[i] > mx) mx = bins[i];

    var pd = 20, pw = W - pd * 2, ph = H - pd - 24;
    var bw = Math.max(1.5, Math.min(6, pw / cnt - 0.5));

    ctx.strokeStyle = "rgba(51,65,85,0.6)";
    ctx.lineWidth = 0.5;
    for (var g = 0; g < 5; g++) {
      var gy = pd + (ph / 5) * g;
      ctx.beginPath(); ctx.moveTo(pd, gy); ctx.lineTo(W - pd, gy); ctx.stroke();
    }

    for (i = 0; i < bins.length; i++) {
      var bh = (bins[i] / mx) * ph;
      var bx = pd + (i / cnt) * pw;
      var g2 = ctx.createLinearGradient(0, pd + ph - bh, 0, pd + ph);
      g2.addColorStop(0, "rgba(212,160,23,0.85)");
      g2.addColorStop(1, "rgba(212,160,23,0.12)");
      ctx.fillStyle = g2;
      ctx.beginPath();
      roundRectPath(ctx, bx, pd + ph - bh, bw, bh, [2, 2, 0, 0]);
      ctx.fill();
    }

    ctx.fillStyle = "#94A3B8";
    ctx.font = "600 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(T("lvl")[li], W / 2, 13);

    ctx.fillStyle = "#64748B";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    var nlb = Math.min(6, cnt);
    var sp = Math.max(1, Math.floor(cnt / nlb));
    for (i = 0; i < cnt; i += sp) {
      var lx = pd + (i / cnt) * pw;
      var totalSec = Math.floor((i * ms) / 1000);
      var mins = Math.floor(totalSec / 60);
      var secs = totalSec % 60;
      var lb = lv === "mon" ? Math.floor(totalSec / 2592000) + "mo" : lv === "day" ? Math.floor(totalSec / 86400) + "d" : lv === "hr" ? Math.floor(totalSec / 3600) + "h" : mins + ":" + pad(secs);
      ctx.fillText(lb, lx - 8, pd + ph + 16);
    }

    if (lvlEl) lvlEl.textContent = T("lvl")[li];
  }

  // 完整卡片（标题 + 可缩放直方图 + 缩放控制 + 统计），供离线验证页 / 证书使用
  function cardHTML(stamps, opts) {
    stamps = stamps || [];
    if (!stamps.length) return "";
    opts = opts || {};
    var title = opts.title !== undefined ? opts.title : T("title") + " · " + stamps.length + " " + T("stampUnit");
    var times = stamps.map(stampTs).filter(function (t) { return t > 0; });
    var dur = "";
    if (times.length >= 2 && times[times.length - 1] > times[0]) {
      dur = fmtDur(times[times.length - 1] - times[0]);
    }
    return '<div class="rt-tl-card">' +
      (title ? '<div class="rt-tl-title">' + escapeHtml(title) + "</div>" : "") +
      '<div class="rt-tl-canvas-wrap">' +
      '<canvas class="rt-tl-canvas" width="680" height="200"></canvas>' +
      '<div class="rt-tl-zoom">' +
      '<button type="button" class="rt-tl-zoom-btn rt-tl-zoom-out" aria-label="' + escapeHtml(T("zoomOut")) + '" title="' + escapeHtml(T("zoomOut")) + '">−</button>' +
      '<div class="rt-tl-zoom-lvl"><span class="rt-tl-zoom-lvl-text"></span></div>' +
      '<button type="button" class="rt-tl-zoom-btn rt-tl-zoom-in" aria-label="' + escapeHtml(T("zoomIn")) + '" title="' + escapeHtml(T("zoomIn")) + '">+</button>' +
      "</div>" +
      "</div>" +
      '<div class="rt-tl-stats"><strong>' + stamps.length + "</strong> " + T("stampUnit") + (dur ? " | " + T("duration") + " <strong>" + dur + "</strong>" : "") + "</div>" +
      "</div>";
  }

  function mount(el, stamps, opts) {
    if (!el) return;
    ensureStyle();
    stamps = stamps || [];
    if (!stamps.length) return;
    el.innerHTML = cardHTML(stamps, opts);
    var canvas = el.querySelector(".rt-tl-canvas");
    if (!canvas || stamps.length < 2) return;
    var lvlEl = el.querySelector(".rt-tl-zoom-lvl-text");
    var li = 4; // 默认秒级
    function draw() { drawChart(canvas, stamps, li, lvlEl); }
    draw();
    var out = el.querySelector(".rt-tl-zoom-out");
    var inn = el.querySelector(".rt-tl-zoom-in");
    if (out) out.addEventListener("click", function () { li = Math.max(0, li - 1); draw(); });
    if (inn) inn.addEventListener("click", function () { li = Math.min(LVLS.length - 1, li + 1); draw(); });
    mounted.push({ draw: draw });
  }

  ensureStyle();
  return {
    setLang: setLang,
    getLang: getLang,
    cardHTML: cardHTML,
    mount: mount,
    formatDuration: fmtDur
  };
})();