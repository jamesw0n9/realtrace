# Realtrace · 链规格（Chain Spec）

> 版本：V2.0.0（F2 标准化）
> 本文描述 stamp 链的密码学构造，前端、离线验证器、服务端三者行为必须一致。

## 1. 打章（Stamp）

写作过程中，客户端按固定节奏（默认 ≥15s）自动生成一个 stamp：

```json
{
  "sessionId": "web-xxx",
  "index": 0,
  "timestamp": "2026-08-03T08:00:00.000Z",
  "nonce": "16位随机hex",
  "salt": "每章随机16字节hex",
  "contentHash": "sha256(当前内容)",
  "prevChainHash": "前一章 chainHash（创世章为空串）",
  "signature": "Ed25519 签名（覆盖 chainHash 摘要字节）",
  "publicKey": "会话 Ed25519 公钥 hex",
  "seq": 1,
  "ts": 1780000000000,
  "duration": 0,
  "wordDelta": 0,
  "totalWords": 0,
  "deleteDelta": 0,
  "chainHash": "见下",
  "behaviorHash": "见下"
}
```

## 2. 链哈希（chainHash）

F2 标准化公式，所有端必须一致：

```
chainHash = SHA-256( sessionId || index || salt || timestamp || contentHash || prevChainHash || nonce )
```

- `index` 从 0 开始连续递增；
- `prevChainHash` 保证**因果序**：任何中间修改都会导致后续所有链哈希失配；
- 与系统时间无关，不依赖 TSA（时间戳只是展示字段）。

## 3. 签名（Signature）

Ed25519 对 chainHash 的**摘要字节**签名（不是签文本字符串）：

```
signature = Ed25519_sign( SHA-256_bytes(chainHash), sessionPrivateKey )
```

验证方用 `publicKey` + WebCrypto `Ed25519` 原语验证。

## 4. 行为特征链（behaviorHash，发明 2）

用于行为可信度分析的 HMAC 链，记录打字节奏 / 删除量特征：

```
behaviorHash = HMAC-SHA256(
  key   = prevChainHash || sessionId,          // 创世章用 sessionId
  data  = seq || now || duration || wordDelta || totalWords || deleteDelta || nonce[:8]
)
```

该字段不参与链完整性判定，仅作为可信度因子输入。

## 5. 链验证（离线，无需网络）

`RtVerifier.verifyChain(stamps)` 逐章检查：

1. **索引连续**：`stamps[i].index === i`
2. **串联**：`stamps[i].prevChainHash === stamps[i-1].chainHash`；创世章 `prevChainHash === ""`
3. **哈希重算**：按 §2 公式重算 chainHash 并比对
4. **签名**：Ed25519 验签
5. **锚点**（可选）：`chainAnchor.prevId` 指向前一锚点、`chainAnchor.id === chainHash`

任一失败即判定链被篡改。

## 6. 创世链（Genesis Chain）

- 子链密钥由官方种子 `GENESIS_MASTER_SEED` 通过 **HKDF-SHA256** 确定性派生（同一 session 永远得到同一密钥对）；
- 封章时子链根哈希（最终 chainHash）由官方服务写入 `genesis_chain` 表，形成公开可审计的溯源路径；
- **开源仓库不包含种子**，只包含派生/验证逻辑与官方根公钥（配置项）。

```
GENESIS_MASTER_SEED (仅官方服务端)
        │  HKDF-SHA256(sessionId)
        ▼
  子链密钥对 ──签名──▶ 子链 stamp 链
                              │ 封章
                              ▼
   官方创世链 ◀──锚定── 子链根哈希 (certificateId)
```

## 7. 分叉与合并

- 同一私钥派生出的所有子链可合并；不同私钥的链仅在得到授权时可在服务端合并；
- 客户端 `StampChain.mergeChains`：按时间轴排序并重编 `index/seq`（用于展示与统计）；
- 合并后如需形成新的密码学连续链（重算 prevChainHash 串联），需重新封章锚定，由服务端完成。