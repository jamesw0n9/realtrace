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
  assert.equal(chainJson.version, '3.0');
  assert.equal(chainJson.stamps.length, 3);
  // 链 ID 命名规则：来源-归属-cid（cid 可验证，BZ-007 第八章）
  const chainIdParts = chainJson.chainId.split('-');
  assert.equal(chainIdParts[0], 'web');
  assert.equal(chainIdParts[1], 'personal');
  assert.equal(chainIdParts[2].length, 23);
  const expectedCid = await globalThis.RtExport.deriveCid(globalThis.StampChain.b2h(keyPair.publicKey), chainJson.hashChain.current);
  assert.equal(chainIdParts[2], expectedCid);
  assert.ok(chainJson.hashChain && chainJson.hashChain.current, 'hashChain.current 存在');
  // V3.0: .rt 链文件携带完整可验证字段（chain-spec §1），离线验证器可直接重算验证
  const v2stamp = chainJson.stamps[0];
  assert.equal(v2stamp.index, 0, '创世章 index=0');
  assert.equal(v2stamp.prevChainHash, '', '创世章 prevChainHash 为空串');
  for (const k of ['sessionId','salt','timestamp','contentHash','nonce','publicKey','signature','chainHash']) {
    assert.ok(v2stamp[k] !== undefined && v2stamp[k] !== '', 'stamp 含验证字段 ' + k);
  }
  assert.ok(chainJson.stamps[1].prevChainHash === chainJson.stamps[0].chainHash, '第二节 prevChainHash 串联');
  const vres = await globalThis.RtVerifier.verifyChain(chainJson.stamps);
  assert.equal(vres.ok, true, 'rt-verifier 离线验证通过: ' + vres.summary);
  const sres = await globalThis.StampChain.verifyChain(chainJson.stamps, globalThis.StampChain.b2h(keyPair.publicKey));
  assert.equal(sres.valid, true, 'stamp.js F2 验证通过: ' + sres.errors.join(';'));
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

  // V3.0.0 不含正文
  assert.equal(globalThis.RtExport.extractContent({ rtVersion: '2.0' }), '');
  // 旧格式兼容
  assert.equal(globalThis.RtExport.extractContent({ rtVersion: '1.0', contentRaw: '旧内容' }), '旧内容');
});


test('buildRtPackageWithKey 身份往返：导出→chain.json→恢复私钥', async () => {
  loadBrowserScript('core/key-vault.js');
  loadBrowserScript('core/rt-export.js');
  const kp = globalThis.nacl.sign.keyPair();
  const { chain } = await buildTestChain('file-identity-001', 3);
  const blob = await globalThis.RtExport.buildRtPackageWithKey({
    stamps: chain.stamps,
    sessionId: 'file-identity-001',
    publicKeyHex: globalThis.StampChain.b2h(kp.publicKey),
    kp: kp
  }, 'pure-chain', null, 'identity-pass-123');
  assert.ok(blob, '应生成含身份 Blob');
  const buf = Buffer.from(await blob.arrayBuffer());
  const zip = await globalThis.JSZip.loadAsync(buf);
  const chainJson = JSON.parse(await zip.file('chain.json').async('string'));
  assert.ok(chainJson.skEncrypted, 'chain.json 含加密身份');
  assert.ok(chainJson.kdf && chainJson.kdf.salt && chainJson.kdf.iterations, 'kdf 元数据完整');
  assert.ok(chainJson.cipher && chainJson.cipher.iv, 'cipher 元数据完整');
  // 重建 v2 payload → 解密 → 与原私钥一致
  const payload = {
    v: 2,
    kdf: chainJson.kdf.algorithm || 'PBKDF2-SHA256',
    iter: chainJson.kdf.iterations || 600000,
    saltHex: chainJson.kdf.salt,
    ivHex: chainJson.cipher.iv,
    dataHex: chainJson.skEncrypted
  };
  const secretHex = await globalThis.RtKeyVault.importEncryptedKey(payload, 'identity-pass-123');
  assert.equal(secretHex, globalThis.StampChain.b2h(kp.secretKey), '恢复的私钥与原私钥一致');
  // hasEncryptedKey 识别 v2 格式
  assert.equal(globalThis.RtExport.hasEncryptedKey({ encryptedPrivateKey: payload }), true);
});
