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
