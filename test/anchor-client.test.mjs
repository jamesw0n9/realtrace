import test from 'node:test';
import assert from 'node:assert/strict';
import { loadBrowserScript, loadCore } from './helpers.mjs';

await loadCore();
loadBrowserScript('anchor/anchor-client.js');

function signStr(secretKey, str) {
  return globalThis.StampChain.b2h(globalThis.nacl.sign.detached(new TextEncoder().encode(str), secretKey));
}

test('genesis 签名校验：有效签名 verified=true', async () => {
  const genesis = globalThis.nacl.sign.keyPair();
  globalThis.RtAnchor.configure({ genesisPublicKey: globalThis.StampChain.b2h(genesis.publicKey) });
  const signedData = 'chain-root:abc123';
  const res = await globalThis.RtAnchor.verifyGenesisData({
    signedData: signedData,
    signature: signStr(genesis.secretKey, signedData)
  });
  assert.equal(res.verified, true, res.reason);
});

test('genesis 签名校验：篡改数据 verified=false', async () => {
  const genesis = globalThis.nacl.sign.keyPair();
  globalThis.RtAnchor.configure({ genesisPublicKey: globalThis.StampChain.b2h(genesis.publicKey) });
  const signedData = 'chain-root:abc123';
  const res = await globalThis.RtAnchor.verifyGenesisData({
    signedData: signedData + 'tampered',
    signature: signStr(genesis.secretKey, signedData)
  });
  assert.equal(res.verified, false);
  assert.match(res.reason, /签名无效/);
});

test('genesis 签名校验：无签名视为未背书', async () => {
  const genesis = globalThis.nacl.sign.keyPair();
  globalThis.RtAnchor.configure({ genesisPublicKey: globalThis.StampChain.b2h(genesis.publicKey) });
  const res = await globalThis.RtAnchor.verifyGenesisData({ certificateId: 'x', chainHash: 'y' });
  assert.equal(res.verified, false);
  assert.match(res.reason, /未被官方链背书/);
});

test('genesis 签名校验：未配置公钥 verified=null', async () => {
  globalThis.RtAnchor.configure({ genesisPublicKey: '' });
  const res = await globalThis.RtAnchor.verifyGenesisData({ signedData: 'a', signature: '00' });
  assert.equal(res.verified, null);
});
