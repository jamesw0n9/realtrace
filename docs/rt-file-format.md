# Realtrace · .rt 链文件格式

> 版本：V2.0.0（纯链容器）
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
| `chainId` | string | 链 ID（= sessionId） |
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
rt-{sessionId前8位}.rt     # 链文件
content-{sessionId前8位}.txt # 正文
```