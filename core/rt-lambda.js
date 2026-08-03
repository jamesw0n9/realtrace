// ========================================
// 真迹 · Lambda(t) 滑动窗口计算引擎
// 核心算法：对任意时序数据流，以滑动窗口计算
// Lambda = D_KL[ P(正向转移) || P(反向转移) ]
// 输出 Lambda(t) 曲线 + 频谱分析
// 不依赖任何外部库，纯 JS 实现
// ========================================

window.RtLambda = (() => {
  'use strict'

  // --- 默认参数 ---
  const DEFAULTS = {
    windowSize: 20,       // 每个窗口的事件数  [来源: 经验值, 平衡统计稳定性与时间分辨率]
    windowStep: 5,        // 窗口滑动步长  [来源: 经验值, 窗口大小的1/4, 保证50%重叠率]
    numBins: 10,          // 间隔量化桶数  [来源: Scott's rule 参考, 对数空间下10桶覆盖典型打字间隔3个数量级]
    minIntervals: 15      // 最少需要的事件数  [来源: 估算, 窗口大小20*75%最小填充率, 待实验验证]
  };

  // --- 辅助：将连续间隔值离散化到桶 ---
  function quantize(intervals, numBins) {
    if (intervals.length === 0) return [];
    var minVal = Math.max(1, Math.min.apply(null, intervals));
    var maxVal = Math.max.apply(null, intervals);
    if (maxVal - minVal < 1) return intervals.map(function() { return 0; });
    var logMin = Math.log(minVal);
    var logMax = Math.log(maxVal);
    var logRange = logMax - logMin;
    return intervals.map(function(v) {
      var bin = Math.floor((Math.log(v) - logMin) / logRange * numBins);
      if (bin < 0) bin = 0;
      if (bin >= numBins) bin = numBins - 1;
      return bin;
    });
  }

  // --- 从离散化序列构建转移概率矩阵 ---
  function buildTransitionMatrix(bins, numBins) {
    var fwd = [];
    var rev = [];
    for (var i = 0; i < numBins; i++) {
      fwd[i] = [];
      rev[i] = [];
      for (var j = 0; j < numBins; j++) {
        fwd[i][j] = 0;
        rev[i][j] = 0;
      }
    }
    for (var k = 0; k < bins.length - 1; k++) {
      fwd[bins[k]][bins[k+1]] += 1;
    }
    for (var m = bins.length - 1; m > 0; m--) {
      rev[bins[m]][bins[m-1]] += 1;
    }
    for (var i2 = 0; i2 < numBins; i2++) {
      var sumF = 0, sumR = 0;
      for (var j2 = 0; j2 < numBins; j2++) {
        sumF += fwd[i2][j2]; sumR += rev[i2][j2];
      }
      for (var j3 = 0; j3 < numBins; j3++) {
        fwd[i2][j3] = sumF > 0 ? fwd[i2][j3] / sumF : 0;
        rev[i2][j3] = sumR > 0 ? rev[i2][j3] / sumR : 0;
      }
    }
    return { forward: fwd, reverse: rev };
  }

  // --- 稳态分布 pi（边际分布近似）---
  function steadyState(bins, numBins) {
    var pi = [];
    for (var i = 0; i < numBins; i++) pi[i] = 0;
    for (var k = 0; k < bins.length; k++) pi[bins[k]] += 1;
    for (var j = 0; j < numBins; j++) pi[j] = pi[j] / bins.length;
    return pi;
  }

  // --- 计算单个窗口的 Lambda 值 ---
  function computeLambda(bins, numBins) {
    var tmat = buildTransitionMatrix(bins, numBins);
    var fwd = tmat.forward;
    var rev = tmat.reverse;
    var pi = steadyState(bins, numBins);
    var lambda = 0;
    for (var i = 0; i < numBins; i++) {
      if (pi[i] <= 0) continue;
      for (var j = 0; j < numBins; j++) {
        var p = fwd[i][j];
        var q = rev[i][j];
        if (p <= 0) continue;
        if (q <= 0) { lambda += pi[i] * p * 5; continue; }
        lambda += pi[i] * p * Math.log(p / q);
      }
    }
    return lambda / bins.length;
  }

  // --- 主函数：输入时间戳数组，输出 Lambda(t) 曲线 ---
  function computeLambdaCurve(timestamps, options) {
    var opts = Object.assign({}, DEFAULTS, options || {});
    if (!timestamps || timestamps.length < opts.minIntervals) {
      return { lambdas: [], times: [], intervals: [], message: "数据不足" };
    }
    var intervals = [];
    for (var i = 1; i < timestamps.length; i++) {
      intervals.push(timestamps[i] - timestamps[i-1]);
    }
    if (intervals.length < opts.minIntervals) {
      return { lambdas: [], times: [], intervals: intervals, message: "间隔数不足" };
    }
    var bins = quantize(intervals, opts.numBins);
    var W = Math.min(opts.windowSize, bins.length);
    var step = Math.max(opts.windowStep, 1);
    var lambdas = [];
    var times = [];
    var t = 0;
    while (t + W <= bins.length) {
      var windowBins = bins.slice(t, t + W);
      lambdas.push(computeLambda(windowBins, opts.numBins));
      var midIdx = t + Math.floor(W / 2);
      var ts = timestamps[0] + intervals.slice(0, midIdx).reduce(function(a,b){return a+b;}, 0);
      times.push(ts);
      t += step;
    }
    return {
      lambdas: lambdas,
      times: times,
      intervals: intervals,
      statistics: computeStatistics(lambdas),
      message: "OK"
    };
  }

  // --- Lambda 曲线统计 ---
  function computeStatistics(lambdas) {
    if (!lambdas || lambdas.length === 0) {
      return { mean: 0, max: 0, min: 0, std: 0, trend: "unknown" };
    }
    var n = lambdas.length;
    var sum = lambdas.reduce(function(a,b){return a+b;}, 0);
    var mean = sum / n;
    var max = Math.max.apply(null, lambdas);
    var min = Math.min.apply(null, lambdas);
    var sqSum = lambdas.reduce(function(a,b){return a+(b-mean)*(b-mean);}, 0);
    var std = Math.sqrt(sqSum / n);
    var indices = Array.from({length: n}, function(_,i){return i;});
    var sx = indices.reduce(function(a,b){return a+b;}, 0) / n;
    var sy = mean;
    var sxx = indices.reduce(function(a,b,i){return a+(i-sx)*(i-sx);}, 0);
    var sxy = lambdas.reduce(function(a,b,i){return a+(i-sx)*(b-sy);}, 0);
    var slope = sxx > 0 ? sxy / sxx : 0;
    return { mean: mean, max: max, min: min, std: std,
      slope: slope,
      trend: slope > 0.01 ? "上升" : slope < -0.01 ? "下降" : "稳定"  // [来源: 经验值, 0.01归一化斜率阈值对应窗数100时1%变化率]
    };
  }

  // --- 频谱分析 ---
  function computeSpectrum(lambdas) {
    if (!lambdas || lambdas.length < 4) {
      return { varRatio: null, energyDistribution: "unknown", n: 0 };
    }
    var diffs = [];
    for (var i = 1; i < lambdas.length; i++) {
      diffs.push(lambdas[i] - lambdas[i-1]);
    }
    var dMean = diffs.reduce(function(a,b){return a+b;}, 0) / diffs.length;
    var dVar = diffs.reduce(function(a,b){return a+(b-dMean)*(b-dMean);}, 0) / diffs.length;
    var oMean = lambdas.reduce(function(a,b){return a+b;}, 0) / lambdas.length;
    var oVar = lambdas.reduce(function(a,b){return a+(b-oMean)*(b-oMean);}, 0) / lambdas.length;
    var vr = oVar > 0 ? dVar / oVar : 0;
    var ed = vr > 1.5 ? "高频主导" : vr > 0.8 ? "宽带" : "低频主导";
    return { varRatio: vr, energyDistribution: ed, n: lambdas.length };
  }

  // --- 全量分析：Lambda(t) + 统计 + 频谱 ---
  function fullAnalysis(timestamps, options) {
    var curve = computeLambdaCurve(timestamps, options);
    if (curve.lambdas.length === 0) {
      return Object.assign(curve, { spectrum: null, verdict: "数据不足" });
    }
    var spectrum = computeSpectrum(curve.lambdas);
    var s = curve.statistics;
    var v = "";
    if (s.mean > 0.5 && spectrum.varRatio < 1.2) v = "生命体特征显著";  // [来源: 估算, Λ>0.5对应强时间不可逆性, varRatio<1.2排除高频噪声干扰]
    else if (s.mean > 0.2) v = "生命体特征";  // [来源: 估算, Λ>0.2对应可检测的时间不可逆性]
    else if (s.mean > 0.05) v = "弱生命特征";  // [来源: 估算, Λ>0.05接近噪声底限]
    else v = "非生命过程";  // [来源: 逻辑推断, Λ≈0时无时间不可逆性]
    return Object.assign(curve, { spectrum: spectrum, verdict: v });
  }

  // --- 公开 API ---
  return {
    compute: computeLambdaCurve,
    analyze: fullAnalysis,
    spectrum: computeSpectrum,
    VERSION: "1.0.0"
  };
})();

