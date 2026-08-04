# Changelog / 变更记录

All notable changes to RealTrace are documented here.
本文件记录 RealTrace 的重要变更，与 GitHub Releases 保持一致。

## [v0.2.0] - 2026-08-05

### Added / 新增
- **Merkle selective disclosure**（Merkle 选择性披露）：every seal binds a full-text Merkle root; disclose any passage without revealing the whole text / 每章绑定全文 Merkle 根，可只披露任意段落而不暴露全文；
- **Disclosure proof generation**（生成披露证明）：one-click disclosure proof with Merkle path visualization on the offline verification page / 离线认证页一键生成段落披露证明，附 Merkle 路径可视化，复制 JSON 即可自证；
- **Six-language UI**（六语界面）：writer / verifier / website in 简体中文 · English · 日本語 · 한국어 · Deutsch · Français / 写作页、离线认证页与官网支持六种语言；
- **Chain ID naming rules**（链 ID 命名规则）：23-character chain ID (`web-personal-…`) binding public key + root hash — verifiable, not reversible / 公钥 + 根哈希双绑定的 23 位链 ID，可验证、不可反推；
- **Creation-mode selection**（创作模式选择）：choose anonymous writing or import .rt to continue before writing / 写作前先选「匿名写作」或「导入 .rt 续写」，续写自动延续原链；
- **Modular timeline**（时间轴模块化）：scalable histogram timeline extracted into `core/rt-timeline.js` / 可缩放直方图时间轴剥离为独立共用模块；
- **Verifier enhancements**（离线认证页增强）：.txt / .rt download module, auto-download removed, ID Check i18n / 新增文件下载模块、取消自动下载、ID Check 文案随语言切换；
- **Network-aware genesis anchoring**（创世链锚定）：local seal + zero-content anchor report / 本地封章 + 零内容锚定报告；
- **Sponsorship entry**（赞助入口）：GitHub Sponsors + Ko-fi on the website / 官网新增赞助入口；
- **GitHub Actions Pages**：deploy `site/` to Pages from `main` / 由 main 分支自动部署官网到 Pages。

### Changed / 变更
- Rebrand to **RealTrace**；chain ID display layer normalized（品牌更名，链 ID 展示层归一化）；
- Offline seal is purely local export, jumping to offline verification without a server（离线封章纯本地导出并跳转离线认证）。

### Fixed / 修复
- Historical Chinese chain-ID segment no longer leaks into other languages（历史中文链 ID 残留显示修复）；
- rt version shows the real chain format version instead of hardcoded "session"（rt 版本显示真实版本号）；
- Verify-page language switching and ID Check text issues（验证页语言切换与 ID Check 文案问题）。

## [v0.1.0] - 2026-08-03

### Added / 新增
- Open-source MVP release（开源 MVP 发布）：real-time stamping, tamper-evident chain, zero content upload, offline verification, version traceability / 实时打章、防篡改链、零内容上传、离线验证、版本可溯源。
