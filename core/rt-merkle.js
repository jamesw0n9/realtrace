// ========================================
// rt · Merkle 内容树模块 V1.0.0
// 块级 Merkle 树：封章时对全文建树，支持选择性披露
// 证明 = 某块原文 + 该块到根的合并路径（兄弟哈希），无需出示全文
// 依赖 RtCrypto（SHA-256 提供者），零 DOM 依赖
// ========================================

window.RtMerkle = (() => {
  'use strict';

  var VERSION = '1.0.0';
  var DEFAULT_BLOCK_SIZE = 512;   // 超长段落内部切块大小
  var MAX_BLOCK_SIZE = 1024;      // 段落超过该长度再切固定块

  function b2h(arr) {
    return Array.from(new Uint8Array(arr)).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  async function sha256(data) {
    var input = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    var provider = window.RtCrypto;
    if (!provider || typeof provider.hash !== 'function') throw new Error('RtCrypto provider required (load rt-crypto.js first)');
    var h = await provider.hash(input);
    if (typeof h === 'string') return h;
    return b2h(h);
  }

  // 按自然段落分块；段落超过 MAX_BLOCK_SIZE 再按 DEFAULT_BLOCK_SIZE 切固定块
  function splitBlocks(content, blockSize) {
    blockSize = blockSize || DEFAULT_BLOCK_SIZE;
    var blocks = [];
    if (!content) return blocks;
    var paras = String(content).split(/\r?\n+/).filter(function(p) { return p.length > 0; });
    if (paras.length === 0) paras = [String(content)];
    for (var i = 0; i < paras.length; i++) {
      var p = paras[i];
      if (p.length <= MAX_BLOCK_SIZE) {
        blocks.push(p);
      } else {
        for (var j = 0; j < p.length; j += blockSize) {
          blocks.push(p.slice(j, j + blockSize));
        }
      }
    }
    return blocks;
  }

  // 逐层合并：SHA-256(left || right)，奇数节点复制自身
  async function combineLevel(nodes) {
    var level = nodes.slice();
    while (level.length > 1) {
      var next = [];
      for (var i = 0; i < level.length; i += 2) {
        var left = level[i];
        var right = (i + 1 < level.length) ? level[i + 1] : left;
        next.push(await sha256(left + right));
      }
      level = next;
    }
    return level[0];
  }

  function levelCount(leafCount) {
    if (leafCount <= 1) return 0;
    return Math.ceil(Math.log2(leafCount));
  }

  // 建树：返回根 + 叶子哈希 + 块列表
  async function buildMerkle(content, blockSize) {
    var blocks = splitBlocks(content, blockSize);
    var bs = blockSize || DEFAULT_BLOCK_SIZE;
    if (blocks.length === 0) {
      return { root: '', leafHashes: [], blocks: [], blockSize: bs, blockCount: 0, levels: 0 };
    }
    var leaves = [];
    for (var i = 0; i < blocks.length; i++) leaves.push(await sha256(blocks[i]));
    var root = await combineLevel(leaves);
    return { root: root, leafHashes: leaves, blocks: blocks, blockSize: bs, blockCount: blocks.length, levels: levelCount(blocks.length) };
  }

  // 生成某块的证明：{ blockText, leafIndex, proofPath, blockSize, blockCount, root }
  async function buildProof(content, blockIndex, blockSize) {
    var m = await buildMerkle(content, blockSize);
    if (m.blockCount === 0) throw new Error('Empty content, cannot build proof');
    if (blockIndex < 0 || blockIndex >= m.blockCount) throw new Error('blockIndex out of range: 0..' + (m.blockCount - 1));
    var proofPath = [];
    var level = m.leafHashes.slice();
    var idx = blockIndex;
    while (level.length > 1) {
      var sibling = (idx % 2 === 0)
        ? (idx + 1 < level.length ? level[idx + 1] : level[idx])
        : level[idx - 1];
      proofPath.push(sibling);
      var next = [];
      for (var i = 0; i < level.length; i += 2) {
        var left = level[i];
        var right = (i + 1 < level.length) ? level[i + 1] : left;
        next.push(await sha256(left + right));
      }
      level = next;
      idx = Math.floor(idx / 2);
    }
    return {
      algo: 'sha256-merkle-v1',
      blockIndex: blockIndex,
      blockText: m.blocks[blockIndex],
      leafIndex: blockIndex,
      proofPath: proofPath,
      blockSize: m.blockSize,
      blockCount: m.blockCount,
      levels: m.levels,
      root: m.root
    };
  }

  // 验证证明：hash(blockText) → 沿路径逐层合并 → 与目标根比对
  async function verifyProof(proof) {
    if (!proof || typeof proof !== 'object') return { valid: false, error: 'Invalid proof object' };
    if (!proof.blockText || !Array.isArray(proof.proofPath)) return { valid: false, error: 'Missing blockText or proofPath' };
    var leafIndex = proof.leafIndex || 0;
    var blockCount = proof.blockCount || 0;
    if (blockCount > 0) {
      var expectLevels = levelCount(blockCount);
      if (proof.proofPath.length !== expectLevels) {
        return { valid: false, error: 'Proof path length mismatch: expected ' + expectLevels + ' got ' + proof.proofPath.length };
      }
    }
    var cur = await sha256(proof.blockText);
    var idx = leafIndex;
    for (var i = 0; i < proof.proofPath.length; i++) {
      var sibling = proof.proofPath[i];
      if (typeof sibling !== 'string' || !/^[0-9a-f]{64}$/i.test(sibling)) {
        return { valid: false, error: 'Invalid sibling hash at level ' + i };
      }
      var left = (idx % 2 === 0) ? cur : sibling;
      var right = (idx % 2 === 0) ? sibling : cur;
      cur = await sha256(left + right);
      idx = Math.floor(idx / 2);
    }
    var targetRoot = proof.root || '';
    if (!targetRoot) return { valid: false, error: 'Missing target root' };
    return { valid: cur === targetRoot, computedRoot: cur, targetRoot: targetRoot };
  }

  // 全量验证：出示全文 → 重算 Merkle 根 → 比对目标根
  async function verifyFull(content, targetRoot, blockSize) {
    var m = await buildMerkle(content, blockSize);
    return { valid: m.root === targetRoot, computedRoot: m.root, targetRoot: targetRoot, blockCount: m.blockCount };
  }

  // 导出
  return {
    VERSION: VERSION,
    buildMerkle: buildMerkle,
    buildProof: buildProof,
    verifyProof: verifyProof,
    verifyFull: verifyFull,
    splitBlocks: splitBlocks
  };
})();
