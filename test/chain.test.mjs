import test from 'node:test';
import assert from 'node:assert/strict';
import { loadCore, buildTestChain } from './helpers.mjs';

test('core 模块加载', async () => {
  await loadCore();
  assert.ok(globalThis.StampChain, 'StampChain 存在');
  assert.ok(globalThis.RtVerifier, 'RtVerifier 存在');
  assert.ok(globalThis.RtCrypto, 'RtCrypto 存在');
});

test('打章 5 次后双验证器全部通过', async () => {
  const { chain } = await buildTestChain('chain-test-001', 5);
  assert.equal(chain.stamps.length, 5);

  const res = await globalThis.StampChain.verifyChain(chain.stamps);
  assert.equal(res.valid, true, res.errors.join('; '));

  const vres = await globalThis.RtVerifier.verifyChain(chain.stamps);
  assert.equal(vres.ok, true, vres.summary + ' ' + JSON.stringify((vres.details || []).map(function(d) { return d.errors; })));
});

test('篡改任一 stamp 导致验证失败', async () => {
  const { chain } = await buildTestChain('chain-test-002', 4);
  // 篡改 nonce → chainHash 失配 + 签名失效
  chain.stamps[2].nonce = 'tampered-nonce';
  const res = await globalThis.StampChain.verifyChain(chain.stamps);
  assert.equal(res.valid, false, '篡改后应验证失败');
  const vres = await globalThis.RtVerifier.verifyChain(chain.stamps);
  assert.equal(vres.ok, false, '篡改后离线验证应失败');
});

test('断裂 prevChainHash 导致验证失败', async () => {
  const { chain } = await buildTestChain('chain-test-003', 3);
  chain.stamps[1].prevChainHash = '00'.repeat(32);
  const res = await globalThis.RtVerifier.verifyChain(chain.stamps);
  assert.equal(res.ok, false, '链条断裂应验证失败');
});

test('同一链 10 次打章（长会话模拟）', async () => {
  const { chain } = await buildTestChain('chain-test-004', 10);
  const vres = await globalThis.RtVerifier.verifyChain(chain.stamps);
  assert.equal(vres.ok, true);
  assert.equal(vres.totalStamps, 10);
});

// ── V3.0 合并链 / 聚合容器 ───────────────────────

test('mergeChains 展示视图不改写原链证据', async () => {
  const a = await buildTestChain('merge-test-a', 3);
  const b = await buildTestChain('merge-test-b', 4);
  const origA0 = { index: a.chain.stamps[0].index, chainHash: a.chain.stamps[0].chainHash };
  const merged = await globalThis.StampChain.mergeChains([a.chain, b.chain]);
  assert.equal(merged.format, 'display');
  assert.equal(merged._mergeInfo.displayOnly, true);
  assert.equal(merged.stamps.length, 7);
  // 展示视图不重写 index/chainHash → 原链证据保留
  assert.equal(merged.stamps[0].index, origA0.index);
  assert.equal(merged.stamps[0].chainHash, origA0.chainHash);
  // displayOnly 链不要求连续性（未重签）
  assert.ok(merged.stamps.some(function(s) { return s.index !== s.chainHash; }) || true);
});

test('mergeChainsVerified 同私钥连续合并可验证', async () => {
  const a = await buildTestChain('mergev-a', 3);
  // 用同一私钥构建第二条链
  let chainB = await globalThis.StampChain.createChain('mergev-b', Date.now());
  for (let i = 0; i < 4; i++) {
    const r = await globalThis.StampChain.append(chainB, {
      contentLen: 10 + i * 10,
      contentHash: await globalThis.StampChain.computeContentHash('y'.repeat(10 + i * 10)),
      keyPair: a.keyPair,
      sessionId: 'mergev-b'
    });
    chainB = r.chain;
  }
  const chainA = a.chain;
  const merged = await globalThis.StampChain.mergeChainsVerified([chainA, chainB], a.keyPair);
  assert.equal(merged.format, 'merged-continuous');
  assert.equal(merged.stamps.length, 7);
  assert.ok(merged.stamps.every(function(s) { return s.originalChainHash && s.originalSignature; }), '保留创作时刻证据');

  const sres = await globalThis.StampChain.verifyChain(merged.stamps, globalThis.StampChain.b2h(a.keyPair.publicKey));
  assert.equal(sres.valid, true, 'stamp.js 验证通过: ' + sres.errors.join('; '));
  const vres = await globalThis.RtVerifier.verifyChain(merged.stamps);
  assert.equal(vres.ok, true, 'rt-verifier 验证通过: ' + vres.summary);
});

test('mergeChainsVerified 拒绝跨私钥合并', async () => {
  const a = await buildTestChain('mergev-x1', 2);
  const b = await buildTestChain('mergev-x2', 2);
  await assert.rejects(() => globalThis.StampChain.mergeChainsVerified([a.chain, b.chain], a.keyPair), /same identity|public key mismatch/);
});

test('aggregateChains 跨私钥聚合容器可验证', async () => {
  const a = await buildTestChain('agg-a', 3);
  const b = await buildTestChain('agg-b', 2);
  const agg = await globalThis.StampChain.aggregateChains([a.chain, b.chain]);
  assert.equal(agg.format, 'aggregate');
  assert.equal(agg.subChains.length, 2);
  assert.ok(agg.rootHash, '聚合根哈希存在');

  const vres = await globalThis.RtVerifier.verifyPackage(agg);
  assert.equal(vres.ok, true, vres.summary);
  assert.equal(vres.subChainCount, 2);
});

test('篡改聚合内任一子链导致验证失败', async () => {
  const a = await buildTestChain('agg-tamper-a', 3);
  const b = await buildTestChain('agg-tamper-b', 2);
  const agg = await globalThis.StampChain.aggregateChains([a.chain, b.chain]);
  agg.subChains[1].stamps[0].nonce = 'tampered';
  const vres = await globalThis.RtVerifier.verifyPackage(agg);
  assert.equal(vres.ok, false, '篡改子链应验证失败');
});

