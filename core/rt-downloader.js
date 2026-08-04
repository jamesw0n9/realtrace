// ========================================
// Realtrace · 文件下载模块 (V1.0)
// 用途：在离线认证页提供 .txt 原文 与 .rt 链文件 的下载入口与说明
// 设计：封章不再自动下载（防浏览器拦截后丢失内容），
//       用户在认证页按需下载；txt=正文原件，rt=密码学签名链
// ========================================
window.RtDownloader = (() => {
  "use strict";

  var I18N = {
    zh: {
      title: '文件下载与原文备份',
      dlTxt: '下载 .txt 原文',
      dlRt: '下载 .rt 链文件',
      txtDesc: '.txt 是本次创作的内容原件（纯文本）。正文不会写入 .rt 文件，请与 .rt 一起妥善保存，便于对照与归档。',
      rtDesc: '.rt 是创作过程的加密签名链（Ed25519 逐键封章），证明「这篇内容确实由你亲手敲出」。它不含正文，需配合 .txt 使用。',
      whyRt: '为什么保留 .rt？——它是你人类创作的密码学在场证明：任何浏览器都能离线验证；未来可用它续写同一条创作链；封章后链根哈希可锚定官方创世链。',
      note: '若浏览器拦截下载，请点击地址栏右侧的下载图标选择「保留/允许」，或再次点击下载按钮。',
      noData: '暂无可用数据'
    },
    en: {
      title: 'Files & Original Backup',
      dlTxt: 'Download .txt original',
      dlRt: 'Download .rt chain file',
      txtDesc: '.txt is the original content of this creation (plain text). The content is not stored in the .rt file — keep both together for review and archiving.',
      rtDesc: '.rt is the cryptographic signature chain (Ed25519 per-keystroke stamps) proving this text was genuinely typed by you. It contains no content and works with the .txt.',
      whyRt: 'Why keep the .rt? — It is your cryptographic proof of human authorship: verifiable offline in any browser; usable to continue the same chain later; its root hash can be anchored to the official genesis chain after sealing.',
      note: 'If your browser blocks the download, click the download icon in the address bar and choose "Keep/Allow", or click the button again.',
      noData: 'No data available'
    },
    ja: {
      title: 'ファイル保存と原文バックアップ',
      dlTxt: '.txt 原文をダウンロード',
      dlRt: '.rt チェーンファイルをダウンロード',
      txtDesc: '.txt は今回の創作内容の原本（プレーンテキスト）です。本文は .rt ファイルには保存されないため、.rt と一緒に大切に保管してください。',
      rtDesc: '.rt は創作過程の暗号署名チェーン（Ed25519 逐キー封章）で、「この文章が本当にあなたが打ったもの」を証明します。本文は含まれず、.txt と組み合わせて使用します。',
      whyRt: 'なぜ .rt を残すのか？—— それはあなたの人間による創作の暗号学的存在証明です：どのブラウザでもオフライン検証でき、将来同じ創作チェーンを続けることもでき、封章後にルートハッシュを公式創世チェーンにアンカーできます。',
      note: 'ブラウザがダウンロードをブロックした場合は、アドレスバー右のダウンロードアイコンから「保持/許可」を選ぶか、もう一度ボタンをクリックしてください。',
      noData: '利用可能なデータはありません'
    },
    ko: {
      title: '파일 저장 및 원문 백업',
      dlTxt: '.txt 원문 다운로드',
      dlRt: '.rt 체인 파일 다운로드',
      txtDesc: '.txt는 이번 창작의 내용 원본(일반 텍스트)입니다. 본문은 .rt 파일에 저장되지 않으므로 .rt와 함께 안전하게 보관하세요.',
      rtDesc: '.rt는 창작 과정의 암호 서명 체인(Ed25519 키별 봉인)으로, 이 글이 정말로 직접 입력했음을 증명합니다. 본문은 포함되지 않으며 .txt와 함께 사용합니다.',
      whyRt: '.rt를 왜 보관해야 하나요? — 인간 창작의 암호학적 존재 증명입니다: 어떤 브라우저에서든 오프라인 검증 가능하고, 나중에 같은 창작 체인을 이어갈 수 있으며, 봉인 후 루트 해시를 공식 창세 체인에 앵커링할 수 있습니다.',
      note: '브라우저가 다운로드를 차단하면 주소창 오른쪽의 다운로드 아이콘에서 "유지/허용"을 선택하거나 버튼을 다시 클릭하세요.',
      noData: '사용 가능한 데이터가 없습니다'
    },
    fr: {
      title: 'Fichiers et sauvegarde',
      dlTxt: 'Télécharger le .txt original',
      dlRt: 'Télécharger le fichier .rt',
      txtDesc: 'Le .txt est le contenu original de cette création (texte brut). Le contenu n\'est pas stocké dans le .rt — conservez les deux ensemble.',
      rtDesc: 'Le .rt est la chaîne de signatures cryptographiques (scellés Ed25519 par frappe) prouvant que ce texte a bien été tapé par vous. Il ne contient aucun contenu et fonctionne avec le .txt.',
      whyRt: 'Pourquoi conserver le .rt ? — C\'est votre preuve cryptographique de création humaine : vérifiable hors ligne dans tout navigateur, utilisable pour continuer la même chaîne plus tard, et sa racine peut être ancrée à la chaîne genèse officielle.',
      note: 'Si le navigateur bloque le téléchargement, cliquez sur l\'icône de téléchargement dans la barre d\'adresse et choisissez « Conserver/Autoriser », ou cliquez à nouveau sur le bouton.',
      noData: 'Aucune donnée disponible'
    },
    de: {
      title: 'Dateien & Original-Backup',
      dlTxt: '.txt-Original herunterladen',
      dlRt: '.rt-Kettendatei herunterladen',
      txtDesc: '.txt ist der Originalinhalt dieser Erstellung (Klartext). Der Inhalt wird nicht in der .rt-Datei gespeichert — bewahren Sie beide zusammen auf.',
      rtDesc: '.rt ist die kryptografische Signaturkette (Ed25519-Stempel pro Tastendruck), die belegt, dass dieser Text wirklich von Ihnen getippt wurde. Sie enthält keinen Inhalt und funktioniert mit dem .txt.',
      whyRt: 'Warum .rt aufbewahren? — Es ist Ihr kryptografischer Beweis menschlicher Autorschaft: in jedem Browser offline verifizierbar, später zum Fortsetzen derselben Kette nutzbar, und seine Wurzel kann nach dem Versiegeln an der offiziellen Genesis-Kette verankert werden.',
      note: 'Blockiert der Browser den Download, klicken Sie auf das Download-Symbol in der Adressleiste und wählen Sie „Behalten/Erlauben“, oder klicken Sie erneut auf die Schaltfläche.',
      noData: 'Keine Daten verfügbar'
    }
  };

  function t(lang, key) {
    var d = I18N[lang] || I18N.zh;
    return d[key] !== undefined ? d[key] : (I18N.zh[key] !== undefined ? I18N.zh[key] : key);
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function cidOf(id) {
    var p = String(id || '').split('-');
    return p.length > 1 ? p[p.length - 1] : String(id || 'cert').substring(0, 23);
  }

  // ─── 样式注入（自包含，防重复） ──────────
  var cssInjected = false;
  function injectCSS() {
    if (cssInjected) return;
    cssInjected = true;
    var css = '.rtdl-card{background:#1E293B;border:1px solid #334155;border-radius:10px;padding:16px;margin-bottom:16px}'
      + '.rtdl-h{font-size:12px;font-weight:700;color:#D4A017;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px}'
      + '.rtdl-btns{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 12px}'
      + '.rtdl-btn{padding:8px 16px;border-radius:6px;border:none;font-size:13px;font-weight:600;cursor:pointer;background:#D4A017;color:#0F172A;transition:opacity .2s}'
      + '.rtdl-btn:hover{opacity:.85}'
      + '.rtdl-desc{font-size:12px;color:#94A3B8;line-height:1.7;margin:4px 0}'
      + '.rtdl-why{font-size:12px;color:#D4A017;line-height:1.7;margin:6px 0;padding:8px 10px;background:rgba(212,160,23,.08);border-radius:6px}'
      + '.rtdl-note{font-size:11px;color:#64748B;line-height:1.6;margin-top:6px}';
    var st = document.createElement('style');
    st.textContent = css;
    document.head.appendChild(st);
  }

  // ─── 下载 .txt 原文 ────────────────────
  function downloadTxt(content, cid) {
    if (!content) return false;
    var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'content-' + cid + '.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 10000);
    return true;
  }

  // ─── 下载 .rt 链文件（从内存数据重建） ────
  function downloadRt(data, cid) {
    if (!data || !data.stamps || data.stamps.length === 0) return false;
    var seal = {
      stamps: data.stamps,
      sessionId: data.sessionId || data.chainId,
      chainId: data.chainId,
      publicKey: data.publicKey || data.pk || '',
      sealedAt: data.sealedAt || '',
      status: 'locked',
      lockedAt: data.lockedAt || (data.sealedAt ? new Date(data.sealedAt).getTime() : Date.now()),
      createdAt: data.sealedAt || data.ts || null
    };
    if (window.RtExport && typeof RtExport.downloadRtFile === 'function') {
      RtExport.downloadRtFile(seal, 'rt-' + cid + '.rt');
      return true;
    }
    return false;
  }

  // ─── 渲染下载与说明区块 ────────────────
  // opts: { data, content, lang }
  function render(box, opts) {
    if (!box) return;
    injectCSS();
    var lang = (opts && opts.lang) || 'zh';
    var data = (opts && opts.data) || null;
    var content = (opts && opts.content) || '';
    var hasChain = !!(data && data.stamps && data.stamps.length > 0);
    if (!hasChain) { box.style.display = 'none'; box.innerHTML = ''; return; }
    var cid = cidOf(data.chainId || data.sessionId || '');
    var h = '';
    h += '<div class="rtdl-card"><div class="rtdl-h">' + esc(t(lang, 'title')) + '</div>';
    h += '<div class="rtdl-btns">';
    if (content) {
      h += '<button type="button" class="rtdl-btn" id="rtdlTxtBtn">' + esc(t(lang, 'dlTxt')) + '</button>';
    }
    h += '<button type="button" class="rtdl-btn" id="rtdlRtBtn">' + esc(t(lang, 'dlRt')) + '</button>';
    h += '</div>';
    h += '<p class="rtdl-desc">' + esc(t(lang, 'txtDesc')) + '</p>';
    h += '<p class="rtdl-desc">' + esc(t(lang, 'rtDesc')) + '</p>';
    h += '<p class="rtdl-why">' + esc(t(lang, 'whyRt')) + '</p>';
    h += '<p class="rtdl-note">' + esc(t(lang, 'note')) + '</p>';
    h += '</div>';
    box.innerHTML = h;
    box.style.display = '';
    var txtBtn = box.querySelector('#rtdlTxtBtn');
    if (txtBtn) txtBtn.onclick = function() { downloadTxt(content, cid); };
    var rtBtn = box.querySelector('#rtdlRtBtn');
    if (rtBtn) rtBtn.onclick = function() { downloadRt(data, cid); };
  }

  return {
    render: render,
    downloadTxt: downloadTxt,
    downloadRt: downloadRt,
    t: t
  };
})();
