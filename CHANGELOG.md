# Changelog / 变更记录

> English first, then Chinese — 英文在前，中文在后。

## [v0.2.0] - 2026-08-05

### Added
- **Merkle selective disclosure**: every seal binds a full-text Merkle root, so any passage can be disclosed without revealing the whole text.
- **Disclosure proof generation**: one-click disclosure proof for any passage on the offline verification page, with Merkle path visualization and copyable JSON.
- **Six-language UI**: writer / verifier / website in 简体中文 · English · 日本語 · 한국어 · Deutsch · Français.
- **Chain ID naming rules**: 23-character chain ID (`web-personal-…`) binding public key + root hash — verifiable, not reversible.
- **Creation-mode selection**: choose "Anonymous writing" or "Import .rt to continue" before writing; continuing automatically extends the original chain.
- **Modular timeline**: scalable histogram timeline extracted into `core/rt-timeline.js` as a shared module.
- **Verifier enhancements**: .txt / .rt download module; auto-download removed; ID Check text follows language switching.
- **Network-aware genesis anchoring**: local seal + zero-content anchor report.
- **Sponsorship entry**: GitHub Sponsors + Ko-fi added to the website.
- **GitHub Actions Pages**: deploy `site/` to Pages from `main`.

### Changed
- Rebrand to **RealTrace**; chain ID display layer normalized.
- Offline seal is purely local export, jumping to offline verification without a server.

### Fixed
- Historical Chinese chain-ID segment no longer leaks into other languages.
- rt version shows the real chain format version instead of hardcoded "session".
- Verify-page language switching and ID Check text issues.

### 新增
- **Merkle 选择性披露**：每章绑定全文 Merkle 根，可只披露任意段落而不暴露全文。
- **生成披露证明**：离线认证页一键生成段落披露证明，附 Merkle 路径可视化，复制 JSON 即可自证。
- **六语界面**：写作页 / 离线认证页 / 官网支持 简体中文 · English · 日本語 · 한국어 · Deutsch · Français。
- **链 ID 命名规则**：公钥 + 根哈希双绑定的 23 位链 ID（`web-personal-…`），可验证、不可反推。
- **创作模式选择**：写作前先选「匿名写作」或「导入 .rt 续写」，续写自动延续原链。
- **时间轴模块化**：可缩放直方图时间轴剥离为独立共用模块 `core/rt-timeline.js`。
- **离线认证页增强**：新增 .txt / .rt 文件下载模块、取消自动下载、ID Check 文案随语言切换。
- **创世链锚定（网络感知）**：本地封章 + 零内容锚定报告。
- **赞助入口**：官网新增 GitHub Sponsors + Ko-fi。
- **GitHub Actions Pages**：由 main 分支自动部署官网到 Pages。

### 变更
- 品牌更名 **RealTrace**；链 ID 展示层归一化。
- 离线封章改为纯本地导出，直接跳转离线认证，不依赖服务器。

### 修复
- 历史中文链 ID 残留不再泄漏到其他语言界面。
- rt 版本显示真实链格式版本号，而非硬编码 "session"。
- 验证页语言切换与 ID Check 文案问题。

## [v0.1.0] - 2026-08-03

### Added
- Open-source MVP release: the complete "write → stamp → seal → verify" loop with minimal code.
- **Real-time stamping**: Ed25519 signature stamps generated automatically while writing; fully offline.
- **Tamper-evident chain**: each stamp references the previous chain hash; any retroactive modification is mathematically detectable.
- **Zero content upload**: text stays local; the chain records only content hashes and behavioral traits.
- **Offline verification**: `.rt` chain files verify fully offline, with no server dependency.
- **Behavioral fingerprint**: keystroke rhythm / pause / deletion traits (HMAC behavior chain) for credibility analysis.
- **Genesis-chain anchoring (optional, free for individuals)**: submit the chain root hash to the official genesis chain for a publicly auditable trail.
- **Version traceability**: `.rt` packages record `appVersion` in `meta.json` and chain format `version` in `chain.json`.

### 新增
- 开源 MVP 发布：以最少代码实现「写作 → 打章 → 封章 → 验证」完整闭环。
- **实时打章**：写作过程中自动生成 Ed25519 签名 stamp，全程离线可用。
- **防篡改链**：每个 stamp 引用前一个链哈希，任何回顾性修改在数学上可检测。
- **零内容上传**：正文只存在本地，链上仅记录内容哈希与行为特征。
- **离线验证**：`.rt` 链文件可完全离线验证，不依赖任何服务器。
- **行为指纹**：打字节奏 / 停顿 / 删除量特征（HMAC 行为链），供可信度分析。
- **创世链锚定（可选，个人免费）**：封章后提交链根哈希到官方创世链，形成公开可审计的溯源记录。
- **版本可溯源**：`.rt` 包内 `meta.json` 记录 `appVersion`，`chain.json` 记录链格式 `version`。

---

> Full changelog is also published on GitHub Releases.
> 完整变更记录同步发布在 GitHub Releases。
