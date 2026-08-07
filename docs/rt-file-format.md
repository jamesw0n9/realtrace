# RealTrace · .rt 链文件格式

> 版本：V3.0.0（纯链容器 · 链 ID 命名规则 · 合并/聚合容器）
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
| `version` | string | 格式版本，如 `"3.0"` |
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

## 5. 命名建议

```
rt-{cid}.rt               # 链文件（完整 23 位 cid，见 §6）
content-{cid}.txt         # 正文
```

- 文件名携带 chainId 的完整 cid 段（23 位 hex），与链 ID 完全对齐，不暴露 source/owner，杜绝从文件名反推归属；
- 旧版「cid 前 8 位」命名自 V2.2.0 起废弃。

## 6. 链 ID 命名规则

链 ID 统一为三段式，三段取值全部为英文（小写字母与数字），可读且可密码学验证：

```text
chainId = <source>-<owner>-<cid>
```

- **source（来源）**：`web` / `sdk` / `cli` / `app` / `merge` / `import`，表示链的生成端；新增来源向后兼容。
- **owner（归属）**：`personal`（个人创作）或 `partner-<pid>`（授权平台支链，pid 为 4–8 位小写字母数字）。
- **cid（密码学身份，23 位 hex）**：

```text
cid = hex( SHA-256( pubkey || chainRootHash ) )[0:23]
```

`pubkey` 为 chain.json 的 `pk`（hex 小写），`chainRootHash` 为 `hashChain.current`（最后一个 stamp 的 hash），`||` 为字符串拼接。

**看 ID 可验证**：从 `.rt` 读取 `pk` + stamps 重算根哈希 → 派生 cid → 与 chainId 比对；一致可信，不一致提示「链 ID 与链内容不符」。cid 为 SHA-256 输出，不可反推创建时间或内容。

**示例**：

```text
web-personal-3f9a2c81e4d07b2acd21a4f
sdk-partner-a1b2c3-9f3c7d2e11aa44bb05c1e9d
```
