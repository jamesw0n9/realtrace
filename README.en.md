<p align="center">
  <a href="README.md">简体中文</a> ·
  <a href="README.en.md">English</a> ·
  <a href="README.ja.md">日本語</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.de.md">Deutsch</a> ·
  <a href="README.fr.md">Français</a>
</p>
# RealTrace

> **Human creation should remain provable in the age of AI.**
>
> Ed25519 signature chain · Real-time stamping · Zero content upload · Offline verification · Official genesis-chain anchoring (free for individuals)

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-v0.4.0-orange.svg)](https://github.com/jamesw0n9/realtrace)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jamesw0n9/realtrace/pulls)

> When everything can be forged, authenticity becomes a luxury. **Detectors guess. RealTrace proves.**

RealTrace is a **human creation presence certification system**: it uses a cryptographic signature chain to prove that a piece of content "was genuinely written by a human in real time" — not AI-generated, not pasted in afterwards, not altered.

```text
Human creation ── real-time stamping ── signature chain ── sealed & anchored ── verifiable · traceable · tamper-proof
```

---

## Manifesto

In November 2022, ChatGPT was born. From that day on, in a world where everything can be forged, authenticity became a luxury.

AI can imitate any style — except the time of your typing. Detectors guess. RealTrace proves.

RealTrace is a **human creation presence certification system**: from the first second you start writing, every pause, every deletion, every rhythm of your keystrokes is recorded in real time and locked by Ed25519 signatures into an immutable creation chain. When you finish, you hold a `.rt` chain file — verifiable, traceable, tamper-proof.

**This is no longer a multiple-choice question.** Every seal references the hash of the one before it. The causal order is locked by cryptography; any retrospective modification is mathematically detectable. This is evidence from physics and mathematics, not a guess from a statistical model.

**You are the author. You deserve proof.** When someone asks "did AI write this?", you shouldn't have to explain. RealTrace gives you an independently verifiable proof of presence — for publishing, for defending your rights, for evidence. Creators shouldn't fight bare-handed.

**Your content belongs to you. Always.** The text never leaves your device; the chain only records hashes and behavioral traits. We don't promise to protect your privacy — the architecture makes it impossible for us to have your content. Stamping, verification, and certificate checks all happen offline. The chain keeps working even if our site goes down.

**Trust shouldn't be decided by the platform alone.** Sub-chain root hashes anchor into the official genesis chain. Chains signed on any platform can trace back to the same public anchor for independent audit.

RealTrace is open source. Free for individuals. Every creator can seal their own work.

**Your creation. Your proof of presence.**

---

## When human creation becomes something to hoard

In July 2026, unsealed court documents revealed Anthropic's "Project Panama": bulk purchases of over a million used physical books through secondhand dealers — spines sliced off with a hydraulic press, scanned page by page, then destroyed — all so Claude could read more "words written by human hands." In a separate case, roughly 7 million unauthorized books were used for training, ending in a $1.5 billion settlement, a record in U.S. copyright litigation.

AI companies are hoarding human creation. Because they know better than anyone: models can generate endlessly, but human thought, experience, and choice are finite. Old books will be bought up, scanned, and destroyed; the words written by the next generation are drowning in the AI flood — unable even to prove "I wrote this."

When human creation becomes scarce, it needs to be proven and protected.

That is exactly what RealTrace does: from the moment you start writing, your creative process is locked into a verifiable, tamper-evident signature chain. Your words always belong to you. Your creation has proof of presence.

**When human creation becomes scarce, RealTrace is its proof of presence.**

---

## Why RealTrace exists

In November 2022, ChatGPT was born. From that day on, everything on the internet became "untrustworthy": news, comments, essays, poetry, code, contracts, lawsuits — no one, not even the author, could tell with the naked eye whether a piece of text came from a human or from a machine.

More frightening than "AI can write things" is this: **when everything can be forged, authenticity becomes a luxury**. The value of human creation is being silently diluted — your thoughts, emotions, experiences and choices become text indistinguishable from machine output.

RealTrace's mission is to give "human creation" a cryptographic **proof of presence**:

- **From the very first second you write**: not an after-the-fact claim of "I wrote this", but real-time recording and signing of the creative process;
- **No reliance on platform reputation**: every signature can be independently verified offline and mathematically audited;
- **Zero content upload**: the text always stays in your hands; the chain records only hashes and behavioral traits.

> In an age where AI can imitate everything, the dignity of human creation deserves to be defended.

---

## What problems we solve

| Problem | RealTrace's solution |
|:--|:--|
| AI-generated content cannot be distinguished from human creation | Real-time stamping: Ed25519 signature stamps are generated automatically during writing, recording keystroke rhythm, pauses, deletion volume and other behavioral traits |
| Post-hoc tampering or replacement cannot be detected | Chain hashing: each stamp references the hash of the previous stamp; any retrospective modification is mathematically detectable |
| Uploading content creates privacy risk | Zero content upload: the text stays local; the chain records only content hashes and behavioral traits |
| Verification depends on a server; the chain dies when the site goes down | Fully offline: stamping, verification and certificate checks all happen locally; `.rt` files are self-contained |
| Cannot trace "who signed it, which version was signed" | Genesis-chain anchoring: sub-chain root hashes are submitted to the official genesis chain; versions are recorded with the chain and publicly auditable |

---

## Core principles

**Signature chain (stamp chain)** — every seal during writing is a node on the signature chain:

```text
chainHash = SHA-256(sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce)
signature = Ed25519_sign(chainHash)
```

- **Causal order cannot be forged**: each stamp's hash references the previous stamp; the chain's topological order is determined by `prevChainHash`, independent of system time — it cannot be inserted or reordered afterwards;
- **Private keys cannot be forged**: Ed25519 signatures are produced by a locally generated private key that never leaves your device;
- **Behavioral fingerprint**: each stamp carries keystroke rhythm / pause / deletion traits (HMAC behavior chain) for credibility analysis;
- **Genesis-chain anchoring**: sub-chain keys are deterministically derived from the official seed via HKDF-SHA256; sub-chain root hashes anchor into the official genesis chain — traceable upward and downward (free for individuals).
- **Full-text Merkle binding**: every seal also computes the full-text Merkle root and writes it into the chain, enabling selective disclosure of any passage without exposing the whole text.

**Chain file format (`.rt`)**: a ZIP container holding `chain.json` (signature chain) and `meta.json` (version, time, certificate metadata). The chain records only "creative process evidence", never the content.

See [`docs/chain-spec.md`](docs/chain-spec.md) and [`docs/rt-file-format.md`](docs/rt-file-format.md).

---

## Quick start

### 1. Open the writer locally (no server needed)

Double-click `writer/index.html`, or serve the repo root with any static server:

```bash
npx serve .
# open http://localhost:3000/writer/
```

- Choose "Anonymous writing" or "Import .rt to continue" before entering the editor; content is stamped automatically as you type;
- Click "Seal & Anchor" to confirm: you are redirected to the offline verification page to download the `.txt` original and the `.rt` chain file (purely local export, no upload);
- Open `verify/index.html` and drag in the `.rt` file to verify chain integrity fully offline.

### 2. Enable official genesis-chain anchoring (optional, free for individuals)

```bash
copy config.example.js config.js
```

Edit `config.js`:

```js
window.RT_CONFIG = {
  anchor: {
    apiBase: "https://official-anchor-service",  // use the official published address
    genesisPublicKey: "official-genesis-root-public-key",
    enabled: true                                // submit chain root on sealing
  }
};
```

> `config.js` is ignored by `.gitignore`, so your own endpoint configuration will not be committed by accident.
> Anchoring your personal creations to the chain is **free**; enterprise / platform cooperation is licensed (contact us for commercial collaboration).

### 3. Run tests

```bash
npm test
```

---

## Directory structure

| Path | Description |
|:--|:--|
| `core/` | Pure front-end core (browser IIFE, zero build dependencies): stamping `stamp.js`, cryptography `rt-crypto.js`, offline verification `rt-verifier.js`, chain file `rt-export.js`, Merkle disclosure `rt-merkle.js`, timeline `rt-timeline.js`, file download `rt-downloader.js` |
| `writer/` | Writing tool (single-page HTML): automatic stamping + seal download |
| `verify/` | Offline chain verification page: drag in a `.rt` file to verify |
| `anchor/` | Official genesis-chain anchoring client (free for individuals) |
| `docs/` | Chain spec, rt file format, anchoring API docs |
| `test/` | Node regression tests (24/24 passing) |

---

## How the project grew

| Date | Milestone |
|:--|:--|
| 2022.11 | **Origin**: ChatGPT launched; "AI-generated content can no longer be told apart by eye" became reality, giving birth to the idea of a "human creation proof of presence" |
| 2026.06 | **First complete implementation**: chain stamping → sealing → offline verification → self-contained certificate, end to end; 11 invention patents laid out in parallel, parent case filed with the patent agency |
| 2026.07 | **Modular refactor**: stamping core `stamp.js` extracted as a module, crypto toolkit `rt-crypto.js` layered, writer / verifier / anchor service decoupled; officially renamed **RealTrace**; official genesis-chain anchoring service launched |
| 2026.08 | **Open-source MVP v0.1.0 released** (AGPL-3.0 + commercial dual license); enterprise licensing model under planning |
| 2026.08 | **v0.2.0 released**: Merkle selective disclosure + disclosure proof generation, six-language UI, chain ID naming rules, creation-mode selection, modular timeline |
| 2026.08 | **v0.3.0 released**: genesis anchor queue (offline queueing + auto-retry + signature anti-hijack), six-language anchor queue panel integrated into the writer |
| 2026.08 | **v0.4.0 released**: identity module (.rtkey export/import, password-encrypted identity recovery, seal-embedded identity), chain format v3 merge semantics (same-key continuation / cross-key aggregate container), cross-browser verifier |

---

## What's in this release (v0.4.0)

This repository is an **MVP minimal build**: it implements the complete "write → stamp → seal → verify" loop with the least code. This release includes:

- **Real-time stamping**: Ed25519 signature stamps generated automatically during writing, recording keystroke rhythm, pauses, deletion volume and other behavioral traits;
- **Tamper-proof chain**: each stamp references the chain hash of the previous stamp; any retrospective modification is mathematically detectable;
- **Zero content upload**: the text stays local; the chain records only content hashes and behavioral traits;
- **Offline verification**: `.rt` chain files can be fully verified offline, with no server dependency;
- **Behavioral fingerprint**: keystroke rhythm / pause / deletion traits (HMAC behavior chain) for credibility analysis;
- **Genesis-chain anchoring (optional, free for individuals)**: after sealing, the chain root hash is submitted to the official genesis chain, forming publicly auditable provenance;
- **Version traceability**: `.rt` packages record `appVersion` in `meta.json` and chain format `version` in `chain.json`; the version is carried when anchoring to the chain.
- **Merkle selective disclosure**: every seal binds a full-text Merkle root, so any passage can be disclosed without revealing the whole text;
- **Disclosure proof generation**: one-click proof for any passage on the offline verification page, with Merkle path visualization and copyable JSON;
- **Six-language UI**: writer / verifier / website in 简体中文 · English · 日本語 · 한국어 · Deutsch · Français;
- **Chain ID naming rules**: 23-character chain ID (`web-personal-…`) binding public key + root hash — verifiable, not reversible;
- **Creation-mode selection**: choose "Anonymous writing" or "Import .rt to continue" before writing; continuing automatically extends the original chain.
- **Modular timeline**: the scalable histogram timeline is extracted into the shared module `core/rt-timeline.js`, making the writing rhythm visible at a glance.

- **Genesis anchor queue**: after sealing, chain metadata is queued locally first and auto-synced when back online; an Ed25519 signature (`chainId|rootHash`) prevents claim hijacking;
- **Anchor queue panel (six languages)**: ⛓ status indicator / one-click manual sync / auto-sync toggle in the writer — zero-content upload maintained;
- **Privacy notice update**: clarifies that after sealing, only chain metadata may sync to the genesis chain, and that auto-sync can be disabled in the ⛓ panel.

- **Identity module**: PBKDF2-SHA256 (600K iterations) + AES-256-GCM encrypted identity key; export / import `.rtkey` identity key files; importing an identity-bearing `.rt` restores the creator via password; sealing embeds the encrypted identity so the same key can continue the original chain;
- **Chain format v3 — merge semantics**: same-key continuation automatically extends the original chain (`mergeChainsVerified` re-signs and verifies); cross-key chains can be aggregated into a container (`aggregateChains`), verified sub-chain by sub-chain;
- **Cross-browser verifier**: unified tweetnacl signature verification with WebCrypto as fallback only — consistent results across browsers.

> Full changelog: [CHANGELOG.md](CHANGELOG.md).

All features remain backward compatible: `.rt` chain files generated by older versions must remain verifiable and traceable in later versions.

---

## How we differ from existing solutions

| | RealTrace | Ordinary e-signature | TSA timestamp | Copyright registration |
|:--|:--|:--|:--|:--|
| Proves "content was written by a human in real time" | ✅ process-level evidence chain | ❌ only proves signer identity | ❌ only proves time | ❌ after-the-fact registration |
| Prevents post-hoc tampering | ✅ chain hashing + signature | ⚠️ signature object only | ⚠️ hash object only | ❌ |
| Covers the whole creative process | ✅ from first keystroke to seal | ❌ | ❌ | ❌ |
| Offline verifiable | ✅ self-contained `.rt` | ⚠️ depends on PKI | ⚠️ depends on online service | ❌ depends on registration body |
| Privacy (no content upload) | ✅ zero content upload | — | — | ❌ content must be submitted |

---

## Use cases

- **Creators submitting work**: when your work is questioned with "did AI write this?", a `.rt` proof of presence explains the creative process — word count, time spent, creative rhythm, verifiable by anyone;
- **Copyright defense**: evidence is no longer a verbal claim. The behavioral fingerprint and signature chain on the chain provide auditable evidence of the original creative process;
- **Publishers / content communities**: verify whether a submission was genuinely created in real time by a human, rather than pasted in afterwards or batch-generated by machines;
- **Academic scenarios**: original-process evidence for papers, projects and technical documents, so "I wrote this" has something to stand on.

> Creators shouldn't have to face suspicion bare-handed.

---

## Privacy & security

- **Zero content upload** by default: your writing stays local; the chain records only content hashes and behavioral traits;
- `.rt` chain files are fully under your control — store them locally or back them up with your own encryption;
- Official anchoring submits only the chain root hash and signature metadata, never the content;
- All verification logic is open source and auditable;
- If you find a security vulnerability, message the maintainers privately; do not disclose publicly before a fix is ready.

---

---

## Sponsor · Buy me a coffee

Enjoy the project? Buy me a coffee ☕:

- [GitHub Sponsors](https://github.com/sponsors/jamesw0n9)
- [Ko-fi](https://ko-fi.com/realtrace)
- China: Alipay / WeChat Pay QR codes (personal small tips only, not a commercial license)

| Alipay | WeChat Pay |
|:---:|:---:|
| <img src="site/sponsor/alipay.png" width="130" alt="Alipay QR"> | <img src="site/sponsor/wechat.png" width="130" alt="WeChat Pay QR"> |

> Sponsorship is just a token of support — **it is not a commercial license**. Personal use stays free; enterprise / platform integration is licensed separately via [`LICENSE.commercial`](LICENSE.commercial).

---

## Open source & commercial

**AGPL-3.0 + commercial dual license** (the open-source part is governed by the full AGPL-3.0 text in [`LICENSE`](LICENSE)):

- **Individuals**: free to use, modify and distribute; self-built / self-signed creation chains are completely free and can be self-verified offline; anchoring to the official genesis chain is free for individuals;
- **Non-commercial organizations / small circles** (public or non-profit schools, writers' / industry associations, etc., verified by non-profit registration / legal-entity certificate): free for internal member use only — no external paid services, no public platform operation, no resale or redistribution after integration;
- **Enterprises / platforms**: cooperation is licensed — see [`LICENSE.commercial`](LICENSE.commercial).

> Free for personal use; enterprise / platform commercial integration requires a separate license. Issues and Pull Requests are welcome — chain-format compatibility, verification correctness and privacy/security issues get priority.

---

**Your creation. Your proof of presence.**

In an age where AI can imitate everything, the dignity of human creation deserves to be defended.
