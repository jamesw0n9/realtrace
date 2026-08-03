// 测试辅助：把浏览器 IIFE 核心模块加载进 Node 全局上下文
import vm from 'node:vm';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

export function loadBrowserScript(rel) {
  if (!globalThis.window) globalThis.window = globalThis;
  if (!globalThis.self) globalThis.self = globalThis;
  const code = fs.readFileSync(path.join(root, rel), 'utf8');
  vm.runInThisContext(code, { filename: rel });
}

export async function loadCore() {
  if (!globalThis.window) globalThis.window = globalThis;
  if (!globalThis.self) globalThis.self = globalThis;
  loadBrowserScript('core/lib/tweetnacl.min.js');
  loadBrowserScript('core/rt-crypto.js');
  loadBrowserScript('core/stamp.js');
  loadBrowserScript('core/rt-verifier.js');
}

export async function buildTestChain(sessionId, count, prefixLen) {
  const kp = globalThis.nacl.sign.keyPair();
  let chain = await globalThis.StampChain.createChain(sessionId, Date.now());
  for (let i = 0; i < count; i++) {
    const r = await globalThis.StampChain.append(chain, {
      contentLen: (prefixLen || 10) + i * 10,
      keyPair: kp,
      sessionId: sessionId
    });
    chain = r.chain;
  }
  return { chain, keyPair: kp };
}