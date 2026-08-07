import test from 'node:test';
import assert from 'node:assert/strict';
import { loadBrowserScript, loadCore } from './helpers.mjs';

await loadCore();
loadBrowserScript('core/key-vault.js');

test('RtKeyVault 模块加载', () => {
  assert.ok(globalThis.RtKeyVault, 'RtKeyVault 存在');
});

test('导出→导入 密码加密身份 round-trip', async () => {
  const kp = globalThis.nacl.sign.keyPair();
  const secretHex = globalThis.StampChain.b2h(kp.secretKey);
  const pubHex = globalThis.StampChain.b2h(kp.publicKey);

  const payload = await globalThis.RtKeyVault.exportEncryptedKey(secretHex, 'test-pass-123');
  assert.equal(payload.v, 2);
  assert.equal(payload.kdf, 'PBKDF2-SHA256');
  assert.ok(payload.saltHex && payload.ivHex && payload.dataHex, '自包含 payload 字段完整');

  const recovered = await globalThis.RtKeyVault.importEncryptedKey(payload, 'test-pass-123');
  assert.equal(recovered, secretHex, '解密后应还原原私钥 hex');

  const pair = globalThis.RtKeyVault.keyPairFromSecret(recovered);
  assert.equal(globalThis.StampChain.b2h(pair.publicKey), pubHex, '公钥应一致');
});

test('错误密码应解密失败', async () => {
  const kp = globalThis.nacl.sign.keyPair();
  const payload = await globalThis.RtKeyVault.exportEncryptedKey(globalThis.StampChain.b2h(kp.secretKey), 'right-pass');
  await assert.rejects(
    () => globalThis.RtKeyVault.importEncryptedKey(payload, 'wrong-pass'),
    /密码错误|解密失败/
  );
});

test('短密码与非法私钥应拒绝', async () => {
  const kp = globalThis.nacl.sign.keyPair();
  await assert.rejects(() => globalThis.RtKeyVault.exportEncryptedKey(globalThis.StampChain.b2h(kp.secretKey), '12345'), /at least 6/);
  await assert.rejects(() => globalThis.RtKeyVault.exportEncryptedKey('zz'.repeat(32), 'long-pass-ok'), /Invalid Ed25519/);
});

test('recoverKeyPairFromPayload 便捷入口', async () => {
  const kp = globalThis.nacl.sign.keyPair();
  const secretHex = globalThis.StampChain.b2h(kp.secretKey);
  const payload = await globalThis.RtKeyVault.exportEncryptedKey(secretHex, 'test-pass-456');
  const res = await globalThis.RtKeyVault.recoverKeyPairFromPayload(payload, 'test-pass-456');
  assert.equal(res.secretKeyHex, secretHex);
  assert.equal(res.publicKeyHex, globalThis.StampChain.b2h(kp.publicKey));
});

test('旧版 pkcs8 加密身份提示重导出', async () => {
  await assert.rejects(
    () => globalThis.RtKeyVault.importEncryptedKey({ v: 1, encryptedKeyHex: 'deadbeef' }, 'pass-123456'),
    /旧版.*重新导出/
  );
});

