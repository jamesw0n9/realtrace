// ========================================
// RealTrace · 创世链锚定队列（自动补传 + 签名防冒领）
//
// 职责:
//   1. 封章后无论在线/离线，先把锚定元数据写入本地队列
//   2. 检测到网络时自动逐条上报官方创世链（零内容上传）
//   3. Ed25519 签名防冒领：用创作链私钥对 chainId|rootHash 签名
//
// 合规: 仅上传链元数据（根哈希/公钥/签名/时间），不含正文；
//       可关闭自动同步；队列状态可视化；本机数据可清空。
// ========================================
window.RtAnchorQueue = (function() {
  "use strict";

  var QUEUE_KEY = 'rt_anchor_queue_v1';
  var AUTO_KEY = 'rt_anchor_auto_v1';
  var NOTIFIED_KEY = 'rt_anchor_notified_v1';
  var DROPPED_KEY = 'rt_anchor_dropped_v1';
  var MAX_QUEUE = 100;
  var MAX_RETRIES = 5;
  var FLUSH_INTERVAL = 60000;
  var _apiBase = '';
  var _flushTimer = null;
  var _onChange = null;

  function readQueue() { try { return JSON.parse(localStorage.getItem(QUEUE_KEY)) || []; } catch(e) { return []; } }
  function writeQueue(q) { try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); } catch(e) {} }
  function notify() { if (typeof _onChange === 'function') { try { _onChange(getStatus()); } catch(e) {} } }

  function configure(opts) {
    if (opts) {
      if (typeof opts.apiBase === 'string') _apiBase = opts.apiBase;
      if (typeof opts.onChange === 'function') _onChange = opts.onChange;
    }
  }

  function isAuto() { try { return localStorage.getItem(AUTO_KEY) !== '0'; } catch(e) { return true; } }
  function setAuto(v) { try { localStorage.setItem(AUTO_KEY, v ? '1' : '0'); } catch(e) {} notify(); }

  function wasNotified() { try { return !!localStorage.getItem(NOTIFIED_KEY); } catch(e) { return false; } }
  function markNotified() { try { localStorage.setItem(NOTIFIED_KEY, '1'); } catch(e) {} }
  function readDropped() { try { return parseInt(localStorage.getItem(DROPPED_KEY), 10) || 0; } catch(e) { return 0; } }
  function addDropped(n) {
    var v = readDropped() + n;
    try { localStorage.setItem(DROPPED_KEY, String(v)); } catch(e) {}
    return v;
  }

  // 封章后入队（无论在线离线；同 rootHash 只保留一条）
  function enqueue(entry) {
    if (!entry || !entry.rootHash) return null;
    var q = readQueue();
    var dup = q.some(function(i) { return i.rootHash === entry.rootHash; });
    if (dup) return q;
    q.push({
      chainId: entry.chainId || '',
      rootHash: entry.rootHash,
      publicKey: entry.publicKey || '',
      sessionId: entry.sessionId || '',
      stampCount: entry.stampCount || 0,
      rtVersion: entry.rtVersion || '2.0',
      sealedAt: entry.sealedAt || new Date().toISOString(),
      signature: entry.signature || '',
      status: 'pending',
      retries: 0,
      createdAt: new Date().toISOString(),
      syncedAt: '',
      error: ''
    });
    if (q.length > MAX_QUEUE) {
      var dropN = q.length - MAX_QUEUE;
      q = q.slice(dropN);
      var totalDropped = addDropped(dropN);
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('[RtAnchorQueue] 队列已满（>100），丢弃最早 ' + dropN + ' 条 pending；累计丢弃 ' + totalDropped + ' 条。请及时手动导出/清理。');
      }
    }
    writeQueue(q);
    notify();
    return q;
  }

  function getStatus() {
    var q = readQueue();
    return {
      total: q.length,
      pending: q.filter(function(i) { return i.status === 'pending'; }).length,
      synced: q.filter(function(i) { return i.status === 'synced'; }).length,
      failed: q.filter(function(i) { return i.status === 'failed'; }).length,
      dropped: readDropped()
    };
  }

  function getItems() { return readQueue(); }
  function clear() { writeQueue([]); notify(); }

  // 用创作链私钥对 chainId|rootHash 签名（Ed25519 detached）
  function sign(kp, msg) {
    try {
      if (!kp || !kp.secretKey) return '';
      var bytes = new TextEncoder().encode(msg);
      var sig = nacl.sign.detached(bytes, kp.secretKey);
      var hex = '';
      for (var i = 0; i < sig.length; i++) { hex += ('0' + sig[i].toString(16)).slice(-2); }
      return hex;
    } catch(e) { return ''; }
  }

  // 逐条同步 pending 队列
  async function flush() {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      return { synced: 0, pending: getStatus().pending, offline: true };
    }
    var q = readQueue();
    var pending = q.filter(function(i) { return i.status === 'pending'; });
    var synced = 0;
    for (var idx = 0; idx < pending.length; idx++) {
      var item = pending[idx];
      if (!item.signature || !item.publicKey) {
        item.status = 'failed';
        item.error = '缺少签名，无法上链';
        continue;
      }
      try {
        var base = _apiBase ? _apiBase.replace(/\/+$/, '') : '';
        var url = base + '/api/v1/genesis/anchor';
        var resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chainId: item.chainId,
            rootHash: item.rootHash,
            publicKey: item.publicKey,
            sessionId: item.sessionId,
            stampCount: item.stampCount,
            rtVersion: item.rtVersion,
            sealedAt: item.sealedAt,
            signature: item.signature
          })
        });
        var data = null;
        try { data = await resp.json(); } catch(e) { /* ignore */ }
        if (resp.ok && data && (data.success || data.duplicate)) {
          item.status = 'synced';
          item.syncedAt = new Date().toISOString();
          item.error = '';
          synced++;
        } else if (resp.status >= 400 && resp.status < 500 && resp.status !== 429) {
          item.status = 'failed';
          item.error = (data && data.error) || ('HTTP ' + resp.status);
        } else {
          item.retries++;
          item.retryAfter = (resp.headers && typeof resp.headers.get === 'function') ? (resp.headers.get('retry-after') || '') : '';
          item.error = (data && data.error) || ('HTTP ' + resp.status + (resp.status === 429 ? ' (rate limited)' : ''));
          if (item.retries >= MAX_RETRIES) item.status = 'failed';
        }
      } catch(e) {
        item.retries++;
        item.error = e.message;
        if (item.retries >= MAX_RETRIES) item.status = 'failed';
      }
    }
    writeQueue(q);
    notify();
    return { synced: synced, pending: getStatus().pending };
  }

  function startAuto() {
    if (_flushTimer) return;
    if (typeof window !== 'undefined') {
      window.addEventListener('online', function() {
        if (isAuto()) { flush().catch(function() {}); }
      });
    }
    _flushTimer = setInterval(function() {
      if (isAuto()) { flush().catch(function() {}); }
    }, FLUSH_INTERVAL);
    setTimeout(function() {
      if (isAuto()) { flush().catch(function() {}); }
    }, 2500);
  }

  return {
    configure: configure,
    enqueue: enqueue,
    flush: flush,
    sign: sign,
    getStatus: getStatus,
    getItems: getItems,
    clear: clear,
    isAuto: isAuto,
    setAuto: setAuto,
    wasNotified: wasNotified,
    markNotified: markNotified,
    startAuto: startAuto
  };
})();

if (typeof module !== 'undefined' && module.exports) { module.exports = window.RtAnchorQueue; }
