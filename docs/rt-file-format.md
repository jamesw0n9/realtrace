# Realtrace · .rt 链文件格式

> 版本：V2.2.0（纯链容器 · 链 ID 命名规则 · 文件名完整 cid）
> `.rt` 是 **ZIP 容器**，只记录 stamp 链与链元数据，**不包含创作正文**。正文单独以 `.txt` 下载。

## 1. 容器结构

```
xxx.rt (ZIP)
├── chain.json    必选：链数据（stamps + 派生密钥元数据）
├── meta.json     可选：封章元信息
└── cert.html     可选：内嵌认证书（自包含 HTML）
```

兼容旧格式：若文件是合法 JSON 且含 `sessionId` + `stamps` 字段，也按链文件解析（`RtExport.loadRtFile` 自动兼容）。

## 2. chain.json 字段

| 字段 | 类型 | 说明 |
|:-----|:-----|:-----|
| `version` | string | 格式版本，如 `"2.0.0"` |
| `chainId` | string | 链 ID（`来源-归属-cid`，见 §6 命名规则） |
| `pk` | string | 会话 Ed25519 公钥 hex |
| `skEncrypted` | string | 加密后的私钥 hex（用户选择加密时存在） |
| `kdf` | object | `{ salt, iterations }` 密钥派生参数 |
| `cipher` | object | `{ iv, tag }` AES-GCM 参数 |
| `status` | string | `"active"` / `"locked"` |
| `lockedAt` | number | 封章时间戳（ms） |
| `ts` | number | 兼容时间戳 |
| `stamps` | array | stamp 数组（字段见链规格） |
| `hashChain` | string | 最终链哈希（= 最后 stamp 的 chainHash） |
| `signatureChain` | string | 最终签名 |

## 3. 隐私边界

- **零内容上传**：链内不存正文，只存 `contentHash`（sha256 摘要）；
- 私钥默认**不**写入链文件；用户选择加密导出时才写入 `skEncrypted`（密码派生密钥加密）；
- 认证书（`cert.html`）是自包含 HTML，可独立打开、离线展示时间轴与链信息。

## 4. 轻量续写（Light Head，预留）

超大 `.rt` 文件续写时，可只读取头部 ~2KB（`RtLightHead`）：

```
RTLH (魔数) + rt-light-v1 + sessionId + prevChainHash + 最后索引 + 内容长度
```

仅上传新增 stamp（增量追加），不传输全量文件。该能力为后续版本预留，MVP 写作工具直接读写完整 `.rt`。

## 5. Naming Convention

```
rt-{cid}.rt               # chain file (full 23-char cid, see §6)
content-{cid}.txt         # content
```

- The file name carries the complete cid segment (23 hex chars) of chainId, fully aligned with the chain ID; it exposes neither source nor owner;
- The legacy "first 8 chars of cid" naming is deprecated since V2.2.0.

## 6. Chain ID Naming Rules

The chain ID uses a three-part format that is readable and cryptographically verifiable:

```text
chainId = <source>-<owner>-<cid>
```

- **source**: `web` / `sdk` / `cli` / `app` / `merge` / `import`, the generating end of the chain; new sources are backward compatible.
- **owner**: `personal` (personal creation) or `partner-<pid>` (authorized platform branch; pid is 4-8 lowercase alphanumeric characters).
- **cid (cryptographic identity, 23 hex chars)**:

```text
cid = hex( SHA-256( pubkey || chainRootHash ) )[0:23]
```

`pubkey` is the `pk` field of chain.json (lowercase hex); `chainRootHash` is `hashChain.current` (the hash of the last stamp); `||` is string concatenation.

**Verifiable by ID**: read `pk` + stamps from the `.rt`, recompute the root hash → derive cid → compare with chainId; a match is trustworthy, a mismatch reports "chain ID does not match chain content". cid is a SHA-256 output and cannot be reversed into creation time or content.

**Examples**:

```text
web-personal-3f9a2c81e4d07b2acd21a4f
sdk-partner-a1b2c3-9f3c7d2e11aa44bb05c1e9d
```
