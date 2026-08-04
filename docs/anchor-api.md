# RealTrace · 官方创世链锚定 API

> 个人创作上链**免费**；联合授权平台使用**单独支链**并另行授权。
> 开源仓库内置客户端 `anchor/anchor-client.js`，仅需配置端点即可启用。

## 1. 启用方式

复制 `config.example.js` 为 `config.js`（已被 .gitignore 忽略）：

```js
window.RT_CONFIG = {
  anchor: {
    apiBase: "https://官方服务地址",   // 以官方发布为准
    genesisPublicKey: "官方创世链根公钥",
    enabled: true
  }
};
```

不配置 / `enabled: false` = 完全离线模式，客户端不发起任何网络请求。

## 2. 客户端 API（anchor/anchor-client.js）

```js
// 增量打章上报（可选，失败不阻塞写作）
await RtAnchor.submitStamp(stamp);

// 封章上链：验链 → 生成证书 → 子链根哈希记入官方创世链
// payload: { sessionId, publicKey, stamps, contentHash }
var res = await RtAnchor.seal(payload);
// → { success: true, certificateId, rootHash, tsaBound }

// 查询证书（官方创世链可审计记录）
var cert = await RtAnchor.query(certificateId);

// 查询从创世根到指定证书的完整溯源路径（官方服务支持时）
var path = await RtAnchor.genesisPath(certificateId);

// 程序化配置（优先级低于 window.RT_CONFIG.anchor）
RtAnchor.configure({ apiBase: "...", enabled: true });
```

## 3. 服务端契约（对接方参考）

| 方法 | 路径 | 说明 |
|:-----|:-----|:-----|
| POST | `/stamp` | 增量打章上报（可选，用于服务端预验签） |
| POST | `/seal` | 封章：验链、生成证书、锚定子链根哈希到创世链 |
| GET | `/certificate/{id}` | 证书查询 |
| GET | `/genesis/path/{id}` | 创世溯源路径查询（可选） |
| GET | `/api/v1/genesis/stats` | 创世链公开统计（首页展示） |

`/seal` 请求体示例：

```json
{
  "sessionId": "web-xxx",
  "publicKey": "ed25519公钥hex（匿名可省略）",
  "stamps": [ { "index": 0, "sessionId": "web-xxx", "timestamp": "...", "nonce": "...", "salt": "...", "contentHash": "...", "prevChainHash": "", "signature": "...", "publicKey": "..." } ],
  "contentHash": "sha256(最终内容)"
}
```

## 4. 商业模型

- **个人创作者**：本地打章/验章免费；锚定官方创世链免费（限合理用量，防滥用）；
- **联合授权平台**（需在 SDK 上附加人脸识别、平台水印等能力）：授权时由官方分配**专属支链**并下发 SDK 接口，平台从自己的支链往下分发子链；任何落在该支链之下的链，均可通过链上溯源确认「由该平台分发」。按授权收费，授权费包含服务器功能使用；
- 增值能力（TSA 司法级时间戳、人脸锚定）为后续版本，不在本 MVP 范围内。

### 4.1 支链分发模型

```text
创世链（官方）
 └── 授权平台 A 支链（sessionId = partner:A）
      ├── A 用户 1 链（partner:A:s1）
      └── A 用户 2 链（partner:A:s2）
 └── 授权平台 B 支链（sessionId = partner:B）
```

- 支链密钥：`HKDF(创世主种子, sessionId="partner:<partnerId>")` 确定性派生，官方签发支链公钥；
- 平台 SDK 所有会话使用 `partner:<partnerId>:<session>` 命名空间，封章锚定 `tier=partner`；
- 溯源：任意证书 → `session_id` 前缀定位授权方 → `genesis_chain` 链式记录回创世根。