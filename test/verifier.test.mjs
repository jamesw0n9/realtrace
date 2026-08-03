import test from 'node:test';
import assert from 'node:assert/strict';
import { loadCore, buildTestChain } from './helpers.mjs';

await loadCore();

test('空链验证失败', async () => {
  const res = await globalThis.RtVerifier.verifyChain([]);
  assert.equal(res.ok, false);
});

test('stamp 索引乱序验证失败', async () => {
  const res = await globalThis.RtVerifier.verifyChain([{ index: 1 }, { index: 0 }]);
  assert.equal(res.ok, false);
  assert.match(res.summary, /索引乱序/);
});

test('缺失字段验证失败', async () => {
  const res = await globalThis.RtVerifier.verifyChain([{}]);
  assert.equal(res.ok, false);
});

test('单个 stamp 链验证通过', async () => {
  const { chain } = await buildTestChain('verify-test-001', 1);
  const res = await globalThis.RtVerifier.verifyChain(chain.stamps);
  assert.equal(res.ok, true, res.summary + ' ' + JSON.stringify((res.details || []).map(function(d) { return d.errors; })));
});

test('最终内容摘要校验', async () => {
  const { chain } = await buildTestChain('verify-test-002', 2, 20);
  const content = '人类创作认证测试内容';
  const vres = await globalThis.RtVerifier.verifyChain(chain.stamps, content);
  assert.equal(vres.ok, false, '未绑定内容的 chainHash 应与最终内容摘要不匹配');
});