<!-- Translated from the English source README.md — English is the single source of truth. See docs/i18n.md. -->
<p align="center">
  <a href="README.md">English</a> ·
  <a href="README.zh.md">简体中文</a> ·
  <a href="README.zh-TW.md">繁體中文</a> ·
  <a href="README.ja.md">日本語</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.de.md">Deutsch</a> ·
  <a href="README.fr.md">Français</a> ·
  <a href="README.es.md">Español</a> ·
  <a href="README.pt-BR.md">Português</a> ·
  <a href="README.ru.md">Русский</a> ·
  <a href="README.id.md">Bahasa Indonesia</a> ·
  <a href="README.it.md">Italiano</a> ·
  <a href="README.tr.md">Türkçe</a> ·
  <a href="README.vi.md">Tiếng Việt</a>
</p>
# RealTrace

> **La creazione umana dovrebbe rimanere provabile nell'era dell'AI.**
>
> Catena di firme Ed25519 · Marchio temporale in tempo reale · Senza caricamento di contenuto · Verifica offline · Ancoraggio ufficiale della catena di origine (gratuito per i singoli utenti)

[![Licenza: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)
[![Versione](https://img.shields.io/badge/version-v0.6.0-orange.svg)](https://github.com/jamesw0n9/realtrace)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jamesw0n9/realtrace/pulls)

<p align="center">
  <img src="docs/demo/realtrace-demo-25s-en.gif" alt="Demo di RealTrace" width="640" />
  <br />
  <em>25 secondi · dal marchio temporale in tempo reale alla verifica offline (demo · senza audio)</em>
  <br />
  <a href="docs/demo/realtrace-demo-25s-en.mp4">▶ Guarda il video demo completo (MP4)</a>
</p>

> Quando tutto può essere falsificato, l'autenticità diventa un lusso. **I rilevatori sospettano. RealTrace prova.**

RealTrace è un **sistema di certificazione della presenza della creazione umana**: utilizza una catena di firme crittografica per dimostrare che un pezzo di contenuto "è stato veramente scritto da un essere umano in tempo reale" — non generato dall'AI, non incollato dopo, non alterato.

```text
Creazione umana ── marchio temporale in tempo reale ── catena di firme ── sigillato & ancorato ── verificabile · tracciabile · impossibile da alterare
```

---

## Manifesto

Nel novembre 2022, è nato ChatGPT. Da quel giorno in poi, in un mondo dove tutto può essere falsificato, l'autenticità è diventata un lusso.

L'AI può imitare qualsiasi stile — eccetto il tempo della tua digitazione. I rilevatori sospettano. RealTrace prova.

RealTrace è un **sistema di certificazione della presenza della creazione umana**: dal primo secondo in cui inizi a scrivere, ogni pausa, ogni eliminazione, ogni ritmo della tua digitazione viene registrato in tempo reale e bloccato da firme Ed25519 in una catena di creazione immutabile. Quando finisci, hai un file `.rt` di catena — verificabile, tracciabile, impossibile da alterare.

**Non è più una domanda a scelta multipla.** Ogni sigillo si riferisce all'hash del precedente. L'ordine causale è bloccato dalla crittografia; qualsiasi modifica retroattiva è matematicamente detectabile. Questo è un'evidenza dalla fisica e dalla matematica, non una supposizione da un modello statistico.

**Sei l'autore. Ti meriti una prova.** Quando qualcuno chiede "l'ha scritto l'AI?", non dovresti dover spiegare. RealTrace ti dà una prova indipendentemente verificabile della presenza — per la pubblicazione, per difendere i tuoi diritti, per l'evidenza. Gli autori non dovrebbero combattere a mani nude.

**Il tuo contenuto ti appartiene. Sempre.** Il testo non lascia il tuo dispositivo; la catena registra solo hash e tratti comportamentali. Non promettiamo di proteggere la tua privacy — l'architettura rende impossibile per noi avere il tuo contenuto. Marchiatura, verifica e controlli di certificato avvengono offline. La catena continua a funzionare anche se il nostro sito va offline.

**La fiducia non dovrebbe essere decisa solo dal piattaforma.** Le hash delle sottocatene si ancorano alla catena di origine ufficiale. Le catene firmate su qualsiasi piattaforma possono tracciare indietro allo stesso ancoraggio pubblico per un audit indipendente.

RealTrace è open source. Gratuito per i singoli utenti. Ogni creatore può sigillare il proprio lavoro.

**La tua creazione. La tua prova di presenza.**

---

## Quando la creazione umana diventa qualcosa da raccogliere

Nel luglio 2026, documenti giudiziari decrittati hanno rivelato "Progetto Panama" di Anthropic: acquisti in massa di oltre un milione di libri usati attraverso rivenditori di seconda mano — spalle tagliate con una pressa idraulica, scansionate pagina per pagina, poi distrutte — tutto per permettere a Claude di leggere più "parole scritte dalle mani umane." In un altro caso, circa 7 milioni di libri non autorizzati sono stati utilizzati per l'addestramento, culminando in un accordo di 1,5 miliardi di dollari, un record nella litigio di copyright negli Stati Uniti.

Le aziende AI stanno raccogliendo la creazione umana. Perché sanno meglio di chiunque altro: i modelli possono generare all'infinito, ma il pensiero, l'esperienza e la scelta umani sono finiti. Vecchi libri saranno acquistati, scansionati e distrutti; le parole scritte dalla prossima generazione saranno sommerse nel diluvio AI — non in grado nemmeno di dimostrare "l'ho scritto io."

Quando la creazione umana diventa scarsa, deve essere dimostrata e protetta.

Esattamente questo è ciò che fa RealTrace: dal momento in cui inizi a scrivere, il tuo processo creativo viene bloccato in una catena di firme verificabile e impossibile da alterare. Le tue parole sempre ti appartengono. La tua creazione ha una prova di presenza.

**Quando la creazione umana diventa scarsa, RealTrace è la sua prova di presenza.**

---

## Perché esiste RealTrace

Nel novembre 2022, è nato ChatGPT. Da quel giorno in poi, tutto su Internet è diventato "inaffidabile": notizie, commenti, saggi, poesie, codice, contratti, cause — nessuno, nemmeno l'autore, può dire con gli occhi nudi se un pezzo di testo è venuto da un essere umano o da una macchina.

Più spaventoso di "l'AI può scrivere cose" è questo: **quando tutto può essere falsificato, l'autenticità diventa un lusso**. Il valore della creazione umana viene diluito silenziosamente — i tuoi pensieri, emozioni, esperienze e scelte diventano testo indistinguibile dall'output macchina.

La missione di RealTrace è dare alla "creazione umana" una **prova di presenza crittografica**:

- **Dai primi secondi in cui scrivi**: non una dichiarazione retroattiva di "l'ho scritto io", ma registrazione e firma in tempo reale del processo creativo;
- **Senza dipendenza dalla reputazione della piattaforma**: ogni firma può essere verificata indipendentemente offline e auditata matematicamente;
- **Senza caricamento di contenuto**: il testo rimane sempre nelle tue mani; la catena registra solo hash e tratti comportamentali.

> In un'era in cui l'AI può imitare tutto, la dignità della creazione umana merita di essere difesa.

---

## I problemi che risolviamo

| Problema | Soluzione di RealTrace |
|:--|:--|
| Il contenuto generato dall'AI non può essere distinto dalla creazione umana | Marchio temporale in tempo reale: firme di hash Ed25519 generate automaticamente durante la scrittura, registrando il ritmo delle battute, le pause, la quantità di eliminazione e altri tratti comportamentali |
| Non si può rilevare il tampering o la sostituzione posteriore | Hashing della catena: ogni firma si riferisce all'hash della firma precedente; qualsiasi modifica retroattiva è matematicamente detectabile |
| Il caricamento del contenuto crea un rischio di privacy | Senza caricamento di contenuto: il testo rimane locale; la catena registra solo hash e tratti comportamentali |
| La verifica dipende da un server; la catena muore quando il sito va offline | Offline completo: marchiatura, verifica e controlli di certificato avvengono localmente; i file `.rt` sono autocontenuti |
| Non si può tracciare "chi ha firmato, quale versione è stata firmata" | Ancoraggio della catena di origine: le hash delle sottocatene sono derivate deterministicamente dal seme ufficiale tramite HKDF-SHA256; le hash delle radici delle sottocatene si ancorano alla catena di origine ufficiale — tracciabili in alto e in basso (gratuito per i singoli utenti) |

---

## Principi fondamentali

**Catena di firme (catena di marchi)** — ogni sigillo durante la scrittura è un nodo sulla catena di firme:

```text
chainHash = SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
signature = Ed25519_sign(chainHash)
```

- **L'ordine causale non può essere falsificato**: ogni firma ha un hash che si riferisce alla firma precedente; l'ordine topologico della catena è determinato da `prevChainHash`, indipendentemente dall'ora del sistema — non può essere inserito o riordinato dopo;
- **Le chiavi private non possono essere falsificate**: le firme Ed25519 sono prodotte da una chiave privata generata localmente che non lascia mai il tuo dispositivo;
- **Impronta comportamentale**: ogni firma trasporta tratti del ritmo delle battute / pause / eliminazione (catena di comportamento HMAC) per l'analisi della credibilità;
- **Ancoraggio della catena di origine**: le chiavi delle sottocatene sono derivate deterministicamente dal seme ufficiale tramite HKDF-SHA256; le hash delle radici delle sottocatene si ancorano alla catena di origine ufficiale — tracciabili in alto e in basso (gratuito per i singoli utenti);
- **Legame Merkle del testo completo**: ogni sigillo calcola anche il root Merkle del testo completo e lo scrive nella catena, permettendo la divulgazione selettiva di qualsiasi passaggio senza esporre l'intero testo.

**Formato del file di catena (`.rt`)**: un contenitore ZIP che contiene `chain.json` (catena di firme) e `meta.json` (versione, ora, metadata del certificato). La catena registra solo "evidenza del processo creativo", mai il contenuto.

Vedi [`docs/chain-spec.md`](docs/chain-spec.md) e [`docs/rt-file-format.md`](docs/rt-file-format.md).

---

## Avvio rapido

### 1. Apri il writer localmente (nessun server necessario)

Fai doppio clic su `writer/index.html`, o servi la root del repository con qualsiasi server statico:

```bash
npx serve .
# apri http://localhost:3000/writer/
```

- Scegli "Scrittura anonima" o "Importa .rt per continuare" prima di entrare nell'editor; il contenuto viene marchiato automaticamente mentre scrivi;
- Clicca "Sigilla & Ancora" per confermare: vengono reindirizzati alla pagina di verifica offline per scaricare il file `.txt` originale e il file `.rt` di catena (esportazione puramente locale, nessun caricamento);
- Apri `verify/index.html` e trascina il file `.rt` per verificare integralmente l'integrità della catena offline.

### 2. Abilita l'ancoraggio della catena di origine ufficiale (opzionale, gratuito per i singoli utenti)

```bash
copy config.example.js config.js
```

Modifica `config.js`:

```js
window.RT_CONFIG = {
  anchor: {
    apiBase: "https://official-anchor-service",  // usa l'indirizzo pubblicato ufficiale
    genesisPublicKey: "official-genesis-root-public-key",
    enabled: true                                // invia la radice della catena alla sigillatura
  }
};
```

> `config.js` è ignorato da `.gitignore`, quindi la tua configurazione di endpoint personale non verrà accidentalmente commitata.
> Ancorare le tue creazioni personali alla catena è **gratuito**; la collaborazione aziendale / piattaforma è licenziata (contattaci per collaborazioni commerciali).

### 3. Esegui i test

```bash
npm test
```

## Struttura della directory

| Percorso | Descrizione |
|:--|:--|
| `core/` | Core front-end puro (browser IIFE, zero dipendenze di costruzione): marcatura `stamp.js`, crittografia `rt-crypto.js`, verifica offline `rt-verifier.js`, file catena `rt-export.js`, rivelazione Merkle `rt-merkle.js`, cronologia `rt-timeline.js`, download file `rt-downloader.js` |
| `writer/` | Strumento di scrittura (HTML a pagina singola): marcatura automatica + download sigillo |
| `verify/` | Pagina di verifica della catena offline: trascina un file `.rt` per verificare |
| `anchor/` | Client di ancoraggio della catena iniziale ufficiale (gratuito per individui) |
| `docs/` | Specifiche della catena, formato del file rt, documentazione API di ancoraggio |
| `test/` | Test di regressione Node (24/24 superati) |

---

## Come è cresciuto il progetto

| Data | Milestone |
|:--|:--|
| 2022.11 | **Origine**: lancio di ChatGPT; "Il contenuto generato dall'AI non può più essere distinto a occhio" è diventata realtà, nascendo dall'idea di una "prova di presenza di creazione umana" |
| 2026.06 | **Prima implementazione completa**: marcatura catena → sigillo → verifica offline → certificato autonomo, end-to-end; 11 brevetti di invenzione delineati in parallelo, caso principale depositato presso l'ufficio brevetti |
| 2026.07 | **Ristrutturazione modulare**: il core di marcatura `stamp.js` estratto come modulo, kit di strumenti crittografici `rt-crypto.js` strato, servizio writer / verifier / anchor decouplato; ufficialmente rinominato **RealTrace**; lancio del servizio di ancoraggio della catena iniziale ufficiale |
| 2026.08 | **Rilascio del MVP open-source v0.1.0** (AGPL-3.0 + licenza dual commerciale); modello di licenza aziendale in fase di pianificazione |
| 2026.08 | **Rilascio di v0.2.0**: rivelazione Merkle selettiva + generazione prova di rivelazione, UI a sei lingue, regole di nomina ID catena, selezione modalità di creazione, cronologia modulare |
| 2026.08 | **Rilascio di v0.3.0**: coda di ancoraggio di inizio (coda di attesa offline + riavvio automatico + firma anti-hijack), pannello di coda di ancoraggio a sei lingue integrato nel writer |
| 2026.08 | **Rilascio di v0.4.0**: modulo di identità (.rtkey esportazione/importazione, recupero identità crittografato con password, identità incorporata nel sigillo), semantica di fusione formato catena v3 (continuazione con la stessa chiave / contenitore di aggregazione a chiave incrociata), verifier multi-browser |
| 2026.08 | **v0.5.0 rilasciato**: README in 14 lingue; l'inglese è l'unica fonte delle traduzioni (docs/i18n.md) |
| 2026.08 | **Rilascio di v0.5.0**: coda di ancoraggio di inizio (coda di attesa locale + sincronizzazione automatica quando online + firma Ed25519 (`chainId|rootHash`) per prevenire il hijack); pannello di coda di ancoraggio (sei lingue) con indicatore di stato / sincronizzazione manuale con un clic / toggle di sincronizzazione automatica nel writer — mantenimento del caricamento zero-contenuto; aggiornamento della nota sulla privacy |

- **Modulo di identità**: chiave di identità crittografata con PBKDF2-SHA256 (600K iterazioni) + AES-256-GCM; esportazione / importazione di file chiave di identità `.rtkey`; l'importazione di un file `.rt` con identità recupera il creatore tramite password; il sigillo incorpora l'identità crittografata in modo che la stessa chiave possa continuare la catena originale;
- **Semantica di fusione formato catena v3**: la continuazione con la stessa chiave estende automaticamente la catena originale (`mergeChainsVerified` riscrive e verifica); le catene incrociate possono essere aggregate in un contenitore (`aggregateChains`), verificata catena per catena;
- **Verifier multi-browser**: verifica della firma tweetnacl unificata con WebCrypto come fallback solo — risultati coerenti tra i browser.

> Changelog completo: [CHANGELOG.md](CHANGELOG.md).

Tutte le funzionalità rimangono backward compatible: i file di catena `.rt` generati dalle versioni più vecchie devono rimanere verificabili e tracciabili nelle versioni successive.

---

## Cosa c'è in questa versione (v0.4.0)

Questo repository è un **costruzione open-source completa**: implementa il ciclo completo "scrivi → marca → sigilla → verifica → continuità dell'identità → fusione della catena". Questa versione include:

- **Marcatura in tempo reale**: firme di marcatura Ed25519 generate automaticamente durante la scrittura, registrando il ritmo delle battute, le pause, il volume di cancellazione e altri tratti comportamentali;
- **Catena anti-tampering**: ogni marcatura si riferisce all'hash della catena della marcatura precedente; qualsiasi modifica retroattiva è detectabile matematicamente;
- **Caricamento zero-contenuto**: il testo rimane locale; la catena registra solo hash di contenuto e tratti comportamentali;
- **Verifica offline**: i file di catena `.rt` possono essere verificati completamente offline, senza dipendenza dal server;
- **Impronta comportamentale**: tratti di ritmo delle battute / pause / cancellazione (catena di comportamento HMAC) per l'analisi della credibilità;
- **Anchoring della catena iniziale (opzionale, gratuito per individui)**: dopo la sigillatura, l'hash radice della catena viene inviato alla catena iniziale ufficiale, formando una provenienza audibile pubblicamente;
- **Tracciabilità della versione**: i pacchetti `.rt` registrano `appVersion` in `meta.json` e la versione del formato catena in `chain.json`; la versione è trasportata quando si ancorano alla catena.
- **Rivelazione Merkle selettiva**: ogni sigillo lega un radice Merkle completo del testo, quindi qualsiasi passaggio può essere rivelato senza rivelare l'intero testo;
- **Generazione prova di rivelazione**: un clic per la prova di qualsiasi passaggio sulla pagina di verifica offline, con visualizzazione del percorso Merkle e JSON copiabile;
- **UI a sei lingue**: writer / verifier / sito in 简体中文 · English · 日本語 · 한국어 · Deutsch · Français;
- **Regole di nomina ID catena**: ID catena di 23 caratteri (`web-personal-…`) che lega la chiave pubblica + hash radice — verificabile, non reversibile;
- **Selezione modalità di creazione**: scegliere "Scrittura anonima" o "Importa .rt per continuare" prima di scrivere; la continuazione estende automaticamente la catena originale.
- **Cronologia modulare**: la cronologia a histogramma scalabile è estratta nel modulo condiviso `core/rt-timeline.js`, rendendo visibile il ritmo di scrittura a colpo d'occhio.

- **Coda di ancoraggio di inizio**: dopo la sigillatura, i metadati della catena vengono messi in coda localmente prima e sincronizzati automaticamente quando si torna online; una firma Ed25519 (`chainId|rootHash`) previene il hijack;
- **Pannello di coda di ancoraggio (sei lingue)**: indicatore di stato ⛓ / sincronizzazione manuale con un clic / toggle di sincronizzazione automatica nel writer — mantenimento del caricamento zero-contenuto;
- **Aggiornamento della nota sulla privacy**: chiarisce che dopo la sigillatura, solo i metadati della catena possono essere sincronizzati con la catena iniziale, e che la sincronizzazione automatica può essere disattivata nel pannello ⛓.

- **Modulo di identità**: chiave di identità crittografata con PBKDF2-SHA256 (600K iterazioni) + AES-256-GCM; esportazione / importazione di file chiave di identità `.rtkey`; l'importazione di un file `.rt` con identità recupera il creatore tramite password; il sigillo incorpora l'identità crittografata in modo che la stessa chiave possa continuare la catena originale;
- **Semantica di fusione formato catena v3**: la continuazione con la stessa chiave estende automaticamente la catena originale (`mergeChainsVerified` riscrive e verifica); le catene incrociate possono essere aggregate in un contenitore (`aggregateChains`), verificata catena per catena;
- **Verifier multi-browser**: verifica della firma tweetnacl unificata con WebCrypto come fallback solo — risultati coerenti tra i browser.

> Changelog completo: [CHANGELOG.md](CHANGELOG.md).

Tutte le funzionalità rimangono backward compatible: i file di catena `.rt` generati dalle versioni più vecchie devono rimanere verificabili e tracciabili nelle versioni successive.

---

## Come ci differenziamo dalle soluzioni esistenti

| | RealTrace | Firma e-signature ordinaria | Timestamp TSA | Registrazione dei diritti d'autore |
|:--|:--|:--|:--|:--|
| Prova che "il contenuto è stato scritto da un essere umano in tempo reale" | ✅ catena di prova a livello di processo | ❌ solo prova dell'identità del firmatario | ❌ solo prova del tempo | ❌ registrazione retroattiva |
| Previene la manipolazione post-hoc | ✅ hashing della catena + firma | ⚠️ solo oggetto di firma | ⚠️ solo oggetto di hash | ❌ |
| Copre l'intero processo creativo | ✅ dal primo battito alla sigillatura | ❌ | ❌ | ❌ |
| Verificabile offline | ✅ file di catena `.rt` autonomi | ⚠️ dipende dal PKI | ⚠️ dipende dal servizio online | ❌ dipende dall'ente di registrazione |
| Privacy (nessun caricamento di contenuto) | ✅ caricamento zero-contenuto | — | — | ❌ il contenuto deve essere presentato |

---

## Casistiche d'uso

- **Creatori che presentano il loro lavoro**: quando il tuo lavoro viene messo in discussione con "ha scritto AI questo?", una prova `.rt` di presenza spiega il processo creativo — conteggio delle parole, tempo trascorso, ritmo creativo, verificabile da chiunque;
- **Difesa dei diritti d'autore**: l'evidenza non è più una affermazione verbale. L'impronta comportamentale e la catena di firma sulla catena forniscono una prova auditabile del processo creativo originale;
- **Editori / comunità di contenuti**: verificare se una presentazione è stata veramente creata in tempo reale da un essere umano, piuttosto che incollata dopo o generata in batch da macchine;
- **Scenari accademici**: prova del processo originale per articoli, progetti e documenti tecnici, in modo che "l'ho scritto" abbia qualcosa su cui basarsi.

> I creatori non dovrebbero dover affrontare sospetti a mani nude.

---

## Privacy e sicurezza

- **Caricamento zero-contenuto** di default: la tua scrittura rimane locale; la catena registra solo hash di contenuto e tratti comportamentali;
- I file di catena `.rt` sono completamente sotto il tuo controllo — conservali localmente o eseguili con la tua crittografia;
- L'ancoraggio ufficiale invia solo l'hash radice della catena e i metadati della firma, mai il contenuto;
- Tutta la logica di verifica è open source e verificabile;
- Se trovi una vulnerabilità di sicurezza, messaggia i gestori privatamente; non rivelare pubblicamente prima che sia pronto un fix.

---

---

## Sponsor · Offrimi un caffè

Ti piace il progetto? Offrimi un caffè ☕:

- [GitHub Sponsors](https://github.com/sponsors/jamesw0n9)
- [Ko-fi](https://ko-fi.com/realtrace)
- Cina: codici QR di Alipay / WeChat Pay (suggerimenti personali solo, non una licenza commerciale)

| Alipay | WeChat Pay |
|:---:|:---:|
| <img src="site/sponsor/alipay.png" width="130" alt="Alipay QR"> | <img src="site/sponsor/wechat.png" width="130" alt="WeChat Pay QR"> |

> Il sostegno è solo un segno di apprezzamento — **non è una licenza commerciale**. L'uso personale rimane gratuito; l'integrazione aziendale / piattaforma è licenziata separatamente tramite [`LICENSE.commercial`](LICENSE.commercial).

---

## Open source e commerciale

**Licenza dual commerciale AGPL-3.0 + commerciale** (la parte open-source è regolata dal testo completo della licenza AGPL-3.0 in [`LICENSE`](LICENSE)):

- **Individui**: libero di utilizzare, modificare e distribuire; le catene di creazione auto-costruite / auto-firmate sono completamente gratuite e possono essere auto-verificate offline; l'ancoraggio alla catena iniziale ufficiale è gratuito per gli individui;
- **Organizzazioni non commerciali / piccoli gruppi** (scuole pubbliche o non profit, associazioni di scrittori / industrie, ecc., verificati da registrazione non profit / certificato di entità giuridica): gratuito per l'uso interno dei membri solo — nessun servizio pagato esterno, nessuna piattaforma pubblica di operazione, nessuna vendita o redistribuzione dopo l'integrazione;
- **Aziende / piattaforme**: la collaborazione è licenziata — vedere [`LICENSE.commercial`](LICENSE.commercial).

> Gratuito per l'uso personale; l'integrazione aziendale / piattaforma richiede una licenza separata. Le segnalazioni di problemi e i Pull Requests sono benvenuti — la compatibilità del formato catena, la correttezza della verifica e le questioni di privacy/sicurezza hanno la priorità.

---

**La tua creazione. La tua prova di presenza.**

In un'era in cui l'AI può imitare tutto, la dignità della creazione umana merita di essere difesa.
