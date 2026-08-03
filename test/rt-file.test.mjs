import test from 'node:test';
import assert from 'node:assert/strict';
import { loadCore, loadBrowserScript, buildTestChain } from './helpers.mjs';

await loadCore();

test('构建 .rt ZIP 包（含 chain.json + meta.json）', async () => {
  // 加载依赖（jszip + rt-export）
  loadBrowserScript('core/lib/jszip.min.js');
  loadBrowserScript('core/rt-export.js');
  assert.ok(globalThis.RtExport, 'RtExport 存在');

  const { chain, keyPair } = await buildTestChain('file-test-001', 3);
  const blob = await globalThis.RtExport.buildRtPackage({
    stamps: chain.stamps,
    sessionId: 'file-test-001',
    publicKeyHex: globalThis.StampChain.b2h(keyPair.publicKey)
  }, 'pure-chain');
  assert.ok(blob, '应生成 Blob');

  const buf = Buffer.from(await blob.arrayBuffer());
  const zip = await globalThis.JSZip.loadAsync(buf);
  assert.ok(zip.file('chain.json'), 'zip 内含 chain.json');
  assert.ok(zip.file('meta.json'), 'zip 内含 meta.json');

  const chainJson = JSON.parse(await zip.file('chain.json').async('string'));
  assert.equal(chainJson.version, '2.0');
  assert.equal(chainJson.stamps.length, 3);
  // 链 ID 命名规则：来源-归属-cid（cid 可验证，BZ-007 第八章）
  const chainIdParts = chainJson.chainId.split('-');
  assert.equal(chainIdParts[0], 'web');
  assert.equal(chainIdParts[1], 'personal');
  assert.equal(chainIdParts[2].length, 23);
  const expectedCid = await globalThis.RtExport.deriveCid(globalThis.StampChain.b2h(keyPair.publicKey), chainJson.hashChain.current);
  assert.equal(chainIdParts[2], expectedCid);
  assert.ok(chainJson.hashChain && chainJson.hashChain.current, 'hashChain.current 存在');
});

test('导出辅助函数（时长/速度/加密标识/内容提取）', async () => {
  loadBrowserScript('core/rt-export.js');

  // 时长：last - first（ts 毫秒）
  const pkg = { stamps: [{ ts: 1000 }, { ts: 2000 }, { ts: 5000 }], contentLength: 100 };
  assert.equal(globalThis.RtExport.getDurationMs(pkg), 4000);
  // 速度：round(100 / (4000/60000)) = 1500
  assert.equal(globalThis.RtExport.estimateSpeed(pkg), 1500);

  // 加密标识
  assert.equal(globalThis.RtExport.hasEncryptedKey({}), false);
  assert.equal(globalThis.RtExport.hasEncryptedKey({ skEncrypted: 'abc' }), true);
  assert.equal(globalThis.RtExport.hasEncryptedKey({ pk: 'hex', skEncrypted: null }), false);

  // V2.0.0 不含正文
  assert.equal(globalThis.RtExport.extractContent({ rtVersion: '2.0' }), '');
  // 旧格式兼容
  assert.equal(globalThis.RtExport.extractContent({ rtVersion: '1.0', contentRaw: '旧内容' }), '旧内容');
});
