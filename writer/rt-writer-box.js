// ========================================
// Realtrace · 写作框（Writer Box）
// 依赖: ../core/stamp.js (StampChain) · ../core/rt-crypto.js · ../core/key-vault.js
// 职责: 写作输入区 + 自动打章 + 封章导出（纯前端，零网络依赖）
// ========================================

// ========= RtWriter Core: 头模式核心数据追踪存档结构 =========
// 提供为后续追加数据追踪存档存储功能
// 最终注入到宿主页面 DOM 中
window.RtWriterBox = (function() {
  // ======== showToast fallback：宿主页面未定义时提供轻量 Toast ========
  if (typeof window.showToast !== 'function') {
    window.showToast = function(msg, type) {
      try {
        var t = document.getElementById('rtToast');
        if (!t) {
          t = document.createElement('div');
          t.id = 'rtToast';
          t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;padding:10px 18px;border-radius:8px;color:#fff;font-size:14px;background:#334155;box-shadow:0 4px 12px rgba(0,0,0,.3);transition:opacity .3s;';
          document.body.appendChild(t);
        }
        t.textContent = msg;
        t.style.background = (type === 'error') ? '#B91C1C' : (type === 'success') ? '#15803D' : '#334155';
        t.style.opacity = '1';
        clearTimeout(window.__rtToastTimer);
        window.__rtToastTimer = setTimeout(function(){ t.style.opacity = '0'; }, 2500);
      } catch(e) { console.log('[WB]', msg); }
    };
  }
  var C = window.RtWriter = window.RtWriter || {};

  // ======== 多语言字典（六语：zh/en/ja/ko/fr/de） ========
  var _WB_I18N = {
    zh: { placeholder:'在此输入创作内容...', sealBtn:'封章上链', stampLabel:'印章', charLabel:'字符', needContent:'请先输入内容', stampFail:'打章失败', sealing:'封章中...', sealSuccess:'封章成功', sealFailed:'封章失败', unknownError:'未知错误', sealSuccessOffline:'封章成功（离线）', pasteDetected:'检测到大量粘贴行为', noDragDrop:'不支持拖拽上传' },
    en: { placeholder:'Start writing here...', sealBtn:'Seal & Anchor', stampLabel:'stamps', charLabel:'chars', needContent:'Please enter content first', stampFail:'Stamping failed', sealing:'Sealing...', sealSuccess:'Sealed successfully', sealFailed:'Sealing failed', unknownError:'Unknown error', sealSuccessOffline:'Sealed successfully (offline)', pasteDetected:'Large paste detected', noDragDrop:'Drag & drop is not supported' },
    ja: { placeholder:'ここに創作内容を入力...', sealBtn:'封章してチェーンに記録', stampLabel:'スタンプ', charLabel:'文字', needContent:'先に内容を入力してください', stampFail:'スタンプ処理に失敗しました', sealing:'封章中...', sealSuccess:'封章成功', sealFailed:'封章失敗', unknownError:'不明なエラー', sealSuccessOffline:'封章成功（オフライン）', pasteDetected:'大量の貼り付けを検出しました', noDragDrop:'ドラッグ＆ドロップには対応していません' },
    ko: { placeholder:'여기에 창작 내용을 입력하세요...', sealBtn:'봉인 및 체인 기록', stampLabel:'스탬프', charLabel:'문자', needContent:'먼저 내용을 입력하세요', stampFail:'스탬프 생성 실패', sealing:'봉인 중...', sealSuccess:'봉인 성공', sealFailed:'봉인 실패', unknownError:'알 수 없는 오류', sealSuccessOffline:'봉인 성공 (오프라인)', pasteDetected:'대량 붙여넣기가 감지되었습니다', noDragDrop:'드래그 앤 드롭은 지원되지 않습니다' },
    fr: { placeholder:'Commencez à écrire ici...', sealBtn:'Sceller & ancrer', stampLabel:'tampons', charLabel:'caractères', needContent:'Veuillez d\'abord saisir du contenu', stampFail:'Échec du tamponnage', sealing:'Scellement...', sealSuccess:'Scellement réussi', sealFailed:'Échec du scellement', unknownError:'Erreur inconnue', sealSuccessOffline:'Scellé avec succès (hors ligne)', pasteDetected:'Collage massif détecté', noDragDrop:'Glisser-déposer non pris en charge' },
    de: { placeholder:'Beginnen Sie hier zu schreiben...', sealBtn:'Versiegeln & verankern', stampLabel:'Stempel', charLabel:'Zeichen', needContent:'Bitte zuerst Inhalt eingeben', stampFail:'Stempeln fehlgeschlagen', sealing:'Versiegele...', sealSuccess:'Erfolgreich versiegelt', sealFailed:'Versiegelung fehlgeschlagen', unknownError:'Unbekannter Fehler', sealSuccessOffline:'Erfolgreich versiegelt (offline)', pasteDetected:'Großes Einfügen erkannt', noDragDrop:'Drag & Drop wird nicht unterstützt' }
  };
  var _wbLang = 'zh';
  function _t(key) {
    var d = _WB_I18N[_wbLang] || _WB_I18N.zh;
    var v = d[key];
    if (v === undefined) v = _WB_I18N.zh[key];
    return v !== undefined ? v : key;
  }


  // ======== 作为数据追踪模块 ========
  
  // ======== createInstance: 全功能写作框创建 ========
  var instances = {};

  function createInstance(containerId, options) {
    options = options || {};
    var el = document.getElementById(containerId);
    if (!el) { console.error('[WB] container not found:', containerId); return null; }
    var area = el.querySelector('textarea');
    if (!area) {
      area = document.createElement('textarea');
      area.id = 'rtTextarea';
      area.placeholder = _t('placeholder');
      area.style.cssText = 'width:100%;min-height:300px;background:#1E293B;color:#F1F5F9;border:1px solid #334155;border-radius:8px;padding:16px;font-size:15px;line-height:1.8;resize:vertical;';
      el.insertBefore(area, el.firstChild);
    }
    var btn = document.getElementById('sealBtn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'sealBtn';
      btn.textContent = _t('sealBtn');
      btn.style.cssText = 'padding:10px 24px;border-radius:8px;border:none;background:#D4A017;color:#0F172A;font-weight:700;cursor:pointer;margin-top:12px;font-size:14px;';
      el.appendChild(btn);
    }
    var timerEl = document.getElementById('stampTimer');
    var state = {
      stamps: [], _chain: null,
      sessionId: 'web-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2,6),
      kp: null, startTime: 0, timerInterval: null, prevChainHash: '',
      maxChars: options.maxChars || 999999, apiBase: options.apiBase || '',
      onSeal: options.onSeal || null,
      pasteCount: 0, pasteCharTotal: 0, maxBurstPaste: 0, pasteWarned: false
    };
    function ensureKey() {
      if (state.kp) return Promise.resolve(state.kp);
      state.kp = nacl.sign.keyPair();
      return Promise.resolve(state.kp);
    }
    function updateStats() {
      var el = document.getElementById('writerStats');
      if (el) el.innerHTML = '<span style="color:#D4A017;font-weight:700;">' + _t('stampLabel') + ': ' + state.stamps.length + '</span> | <span style="color:#94A3B8;">' + _t('charLabel') + ': ' + (area.value || '').replace(/\s/g,'').length + '</span>';
    }
    async function doStamp_impl() {
      await ensureKey();
      var contentLen = area.value.length;
      try {
        var result = await window.StampChain.append(state._chain || null, { contentLen, keyPair: state.kp, sessionId: state.sessionId });
        var stamp = result.stamp;
        state._chain = result.chain; state.sessionId = stamp.sessionId;
        state.prevChainHash = stamp.hash || stamp.chainHash || '';
        state.stamps.push(stamp); updateStats();
        if (state.apiBase) { await fetch(state.apiBase + '/stamp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: stamp.sessionId, index: stamp.index, timestamp: stamp.timestamp, nonce: stamp.nonce, salt: stamp.salt, contentHash: stamp.contentHash || '', prevChainHash: stamp.prevChainHash || '', signature: stamp.signature, publicKey: stamp.publicKey }) }).catch(()=>{}); }
      } catch(e) { console.error('[WB] doStamp error:', e); }
    }
    async function sealNow() {
      if (area.value.trim().length === 0) { showToast(_t('needContent'), 'error'); return; }
      try {
        if (state.stamps.length < 1) await doStamp_impl();
        if (state.stamps.length < 1) { showToast(_t('stampFail'), 'error'); return; }
        clearInterval(state.timerInterval); btn.disabled = true; btn.textContent = _t('sealing');
        var contentHash = await StampChain.computeContentHash(area.value);
        var pubKey = (state.stamps.length > 0 ? state.stamps[state.stamps.length-1].publicKey : '') || (state.kp ? await StampChain.exportPubHex(state.kp.publicKey) : '');
        if (state.apiBase) {
          var resp = await fetch(state.apiBase + '/seal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contentHash, sessionId: state.sessionId, publicKey: pubKey, stamps: state.stamps }) });
          var data = await resp.json();
          if (data.success && data.certificateId) { showToast(_t('sealSuccess') + ': ' + data.certificateId, 'success'); if (state.onSeal) state.onSeal(data); }
          else { showToast(_t('sealFailed') + ': ' + (data.error || _t('unknownError')), 'error'); }
        } else {
          // 离线模式：无 apiBase 时纯本地封章，不请求服务器，直接走本地导出 + 跳转离线认证
          showToast(_t('sealSuccessOffline'), 'success');
          if (state.onSeal) state.onSeal({ success: true, certificateId: 'offline-' + state.sessionId.substring(0, 8), sessionId: state.sessionId, publicKey: pubKey, stamps: state.stamps });
        }
      } catch(e) { showToast(_t('sealFailed') + ': ' + e.message, 'error'); }
      btn.textContent = '\u5c01\u7ae0\u4e0a\u94fe'; btn.disabled = false;
    }
    area.addEventListener('input', function() {
      if (area.value.length > state.maxChars) area.value = area.value.substring(0, state.maxChars);
      if (state.startTime === 0 && area.value.trim().length > 0) {
        state.startTime = Date.now();
        if (timerEl) {
          clearInterval(state.timerInterval);
          state.timerInterval = setInterval(function() {
            var s = Math.floor((Date.now() - state.startTime) / 1000);
            if (timerEl) timerEl.textContent = String(Math.floor(s/60)).padStart(2,'0') + ':' + String(s%60).padStart(2,'0');
          }, 500);
        }
      }
      doStamp_impl(); updateStats();
    });
    area.addEventListener('paste', function(e) {
      state.pasteCount++;
      var text = (e.clipboardData || window.clipboardData).getData('text') || '';
      state.pasteCharTotal += text.length;
      if (text.length > state.maxBurstPaste) state.maxBurstPaste = text.length;
      if (state.pasteCharTotal > 200 && !state.pasteWarned) { state.pasteWarned = true; showToast(_t('pasteDetected'), 'info'); }
    });
    area.addEventListener('drop', function(e) { e.preventDefault(); showToast(_t('noDragDrop'), 'error'); });
    btn.addEventListener('click', sealNow);
    updateStats();
    function setLang(lang) {
      if (!_WB_I18N[lang]) return;
      _wbLang = lang;
      area.placeholder = _t('placeholder');
      btn.textContent = _t('sealBtn');
      updateStats();
    }
    return { seal: sealNow, getState: function() { return state; }, setLang: setLang, destroy: function() { el.innerHTML = ''; } };
  }

C.Core = {
    createTracker: function() {
      var sig = {
        totalKeyPresses: 0, keyIntervals: [], backspaceCount: 0,
        lastKeyTime: 0, lastChar: '', bigramTimings: {},
        editModes: { append: 0, correct: 0, restructure: 0 },
        prevLen: 0, editEventCount: 0,
        mouseMoveCount: 0, mouseIdleStart: 0,
        blurCount: 0, blurStart: 0, blurDurations: [],
        pasteCount: 0, pasteCharTotal: 0,
        selectCount: 0, scrollCount: 0,
        challengeCount: 0, challengeResponded: 0, challengeCorrect: 0
      };
      return {
        onKeyDown: function(e) {
          sig.totalKeyPresses++;
          var now = Date.now();
          if (sig.lastKeyTime > 0) sig.keyIntervals.push(now - sig.lastKeyTime);
          sig.lastKeyTime = now;
          if (e.key === 'Backspace') sig.backspaceCount++;
          if (e.key.length === 1 && sig.lastChar) {
            var bigram = sig.lastChar + e.key.toLowerCase();
            if (!sig.bigramTimings[bigram]) sig.bigramTimings[bigram] = [];
            sig.bigramTimings[bigram].push(now - sig.lastKeyTime);
          }
          if (e.key.length === 1) sig.lastChar = e.key.toLowerCase();
          else if (e.key === 'Backspace') sig.lastChar = '';
        },
        onInput: function(textarea) {
          var curLen = textarea.value.length;
          var diff = curLen - sig.prevLen;
          if (diff > 0) sig.editModes.append += diff;
          else if (diff < 0) sig.editModes.correct += Math.abs(diff);
          sig.prevLen = curLen;
          sig.editEventCount++;
        },
        onPaste: function(text) {
          sig.pasteCount++;
          sig.pasteCharTotal += (text || '').length;
        },
        onMouseMove: function() {
          sig.mouseMoveCount++;
          sig.mouseIdleStart = Date.now();
        },
        onBlur: function() { sig.blurCount++; sig.blurStart = Date.now(); },
        onFocus: function() {
          if (sig.blurStart) { sig.blurDurations.push(Date.now() - sig.blurStart); sig.blurStart = 0; }
        },
        onSelect: function() { sig.selectCount++; },
        onScroll: function() { sig.scrollCount++; },
        computeKeyStats: function() {
          var k = sig.keyIntervals;
          if (!k || k.length < 3) return null;
          var sum = 0, i;
          for (i = 0; i < k.length; i++) sum += k[i];
          var avg = sum / k.length;
          var vari = 0;
          for (i = 0; i < k.length; i++) vari += (k[i] - avg) * (k[i] - avg);
          var cv = Math.sqrt(vari / k.length) / avg;
          var sorted = k.slice().sort(function(a, b) { return a - b; });
          var mid = sorted.length % 2 === 0 ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2 : sorted[Math.floor(sorted.length / 2)];
          var pauses = k.filter(function(x) { return x > 500; }).length;
          var fast = k.filter(function(x) { return x < 100; }).length;
          return { cv: cv, median: mid, pauseCount: pauses, burstRatio: k.length > 0 ? fast / k.length : 0, count: k.length };
        },
        computeContentStats: function(text) {
          var freq = {}, total = 0, ch, i;
          for (i = 0; i < text.length; i++) { ch = text[i]; freq[ch] = (freq[ch] || 0) + 1; total++; }
          var ent = 0, ch2;
          for (ch2 in freq) { var p = freq[ch2] / total; ent -= p * Math.log2(p); }
          var puncs = text.match(/[\u3000-\u303f\uff00-\uffef\u2000-\u206f.,!?;:'\"()\[\]{}]/g) || [];
          var puncSet = {};
          for (i = 0; i < puncs.length; i++) puncSet[puncs[i]] = 1;
          var words = text.split(/[\s,]+,/).filter(function(w) { return w.length > 0; });
          var avgLen = words.length > 0 ? words.reduce(function(s, w) { return s + w.length; }, 0) / words.length : 0;
          var bgVariety = 0;
          if (sig.bigramTimings) { bgVariety = Object.keys(sig.bigramTimings).length; }
          var noSpace = text.replace(/\s/g,"");
          return { visible: noSpace.length, chinese: (text.match(/[\u4e00-\u9fff]/g)||[]).length, letters: (text.match(/[a-zA-Z]/g)||[]).length, entropy: ent, maxCharFreq: total > 0 ? Math.max.apply(null, Object.values(freq)) / total : 0, bgVariety: bgVariety, puncVariety: Object.keys(puncSet).length, avgWordLen: avgLen, hasRare: 0 };
        },
        getSnapshot: function() {
          return {
            totalKeyPresses: sig.totalKeyPresses,
            backspaceCount: sig.backspaceCount,
            editEventCount: sig.editEventCount,
            editModes: { append: sig.editModes.append, correct: sig.editModes.correct },
            mouseMoveCount: sig.mouseMoveCount,
            blurCount: sig.blurCount,
            pasteCharTotal: sig.pasteCharTotal,
            selectCount: sig.selectCount,
            scrollCount: sig.scrollCount
          };
        },
        reset: function() {
          sig.totalKeyPresses = 0; sig.keyIntervals = []; sig.backspaceCount = 0;
          sig.lastKeyTime = 0; sig.lastChar = '';
          sig.bigramTimings = {}; sig.editModes = { append: 0, correct: 0, restructure: 0 };
          sig.prevLen = 0; sig.editEventCount = 0;
          sig.mouseMoveCount = 0; sig.blurCount = 0;
          sig.blurDurations = []; sig.pasteCount = 0; sig.pasteCharTotal = 0;
          sig.selectCount = 0; sig.scrollCount = 0;
        }
      };
    },

    // ======== 离线存储 (IndexedDB) ========
    offline: {
      openDB: function() {
        return new Promise(function(resolve, reject) {
          var req = indexedDB.open('rt_offline', 1);
          req.onupgradeneeded = function(e) {
            var db = e.target.result;
            if (!db.objectStoreNames.contains('pending_stamps')) {
              db.createObjectStore('pending_stamps', { keyPath: 'id', autoIncrement: true });
            }
          };
          req.onsuccess = function(e) { resolve(e.target.result); };
          req.onerror = function(e) { reject(e.target.error); };
        });
      },
      savePendingStamp: function(stamp) {
        return C.Core.offline.openDB().then(function(db) {
          return new Promise(function(resolve, reject) {
            var tx = db.transaction('pending_stamps', 'readwrite');
            var store = tx.objectStore('pending_stamps');
            store.add({ stamp: stamp, ts: Date.now() });
            tx.oncomplete = function() { db.close(); resolve(); };
            tx.onerror = function(e) { db.close(); reject(e.target.error); };
          });
        });
      },
      getPendingStamps: function() {
        return C.Core.offline.openDB().then(function(db) {
          return new Promise(function(resolve, reject) {
            var tx = db.transaction('pending_stamps', 'readonly');
            var store = tx.objectStore('pending_stamps');
            var req = store.getAll();
            req.onsuccess = function() { db.close(); resolve(req.result || []); };
            req.onerror = function(e) { db.close(); reject(e.target.error); };
          });
        });
      },
      clearPendingStamps: function() {
        return C.Core.offline.openDB().then(function(db) {
          return new Promise(function(resolve, reject) {
            var tx = db.transaction('pending_stamps', 'readwrite');
            var store = tx.objectStore('pending_stamps');
            store.clear();
            tx.oncomplete = function() { db.close(); resolve(); };
            tx.onerror = function(e) { db.close(); reject(e.target.error); };
          });
        });
      }
    },

    // ======== 随机数工具 ========
    rand: function(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
  };


// ======== 导出 API 模块 ========
return {
  init: function(containerId, options) {
    if (instances[containerId]) {
      instances[containerId].destroy();
    }
    instances[containerId] = createInstance(containerId, options);
    return instances[containerId];
  },
  getInstance: function(containerId) {
    return instances[containerId] || null;
  }
};

})();
