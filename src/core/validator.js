/*!
 * core/validator.js —— 验证器（T5）
 *
 * 两条验证线：
 *  1) 训练样本：输入一次训练的显示数字（主/副属性），反推副属性占比、暴击等参数并算残差。
 *  2) 面板样本：输入 A 层六属性实测面板，用潜力曲线反解等级/成长、算残差。
 * 同时输出「需要补充哪条数据」（来自 T3 calibration.verifier_inputs）。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.validator = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function getModel() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    return B.model || (typeof globalThis !== 'undefined' ? globalThis.BBTModel : null) || null;
  }

  function getTraining() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    if (B.training) return B.training;
    return null;
  }

  function getGrowth() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    return B.growth || null;
  }

  /** 训练样本验证：模型预测 vs 实测显示值。 */
  function validateTrainingSample(sample, values, pair) {
    var training = getTraining();
    if (!training) return { ok: false, error: '训练模块未加载' };
    var s = sample || {};
    var level = Math.max(1, Math.floor(Number(s.level) || 1));
    var itemId = s.itemId || 'shot';
    var p = pair || { primary: '投射', secondary: '运控' };
    var result = training.computeItem(values || {}, { itemId: itemId, pair: p, level: level });
    var observedMain = Number(s.mainGain);
    var observedSecondary = Number(s.secondaryGain);
    var hasMain = isFinite(observedMain) && observedMain > 0;
    var hasSecondary = isFinite(observedSecondary) && observedSecondary >= 0;
    var residualMain = hasMain ? observedMain - result.primary.total : null;
    var residualSecondary = hasSecondary ? observedSecondary - result.secondary.total : null;
    var impliedRatio = hasMain && hasSecondary && observedMain > 0
      ? observedSecondary / observedMain
      : null;
    var impliedCrit = null;
    if (hasMain) {
      var subtotal = result.primary.subtotal;
      var denom = subtotal * result.bonusMultiplier * result.venueMultiplier;
      if (denom > 0) {
        impliedCrit = (observedMain - result.flatBonus) / denom - 1;
      }
    }
    var verdict = '无法判断（缺少实测数字）';
    if (hasMain) {
      var rel = Math.abs(residualMain) / Math.max(1, result.primary.total);
      verdict =
        rel <= 0.05
          ? '模型与实测吻合（误差 ≤5%）'
          : rel <= 0.15
            ? '模型接近（误差 5%~15%），可继续采样'
            : '偏差 >15%：优先校准训练加成/暴击/角色技能位置';
    }
    return {
      ok: true,
      level: level,
      itemId: itemId,
      predicted: {
        main: result.primary.total,
        secondary: result.secondary.total,
        subtotal: result.primary.subtotal,
        multiplier: result.primary.multiplier,
        formula: result.primary.formula
      },
      observed: {
        main: hasMain ? observedMain : null,
        secondary: hasSecondary ? observedSecondary : null
      },
      residual: { main: residualMain, secondary: residualSecondary },
      implied: {
        secondaryRatio: impliedRatio,
        critBonusPct: impliedCrit != null ? impliedCrit * 100 : null
      },
      verdict: verdict,
      confidence: '实测样本优先于模型'
    };
  }

  /** 面板样本验证：按稀有度潜力曲线预测 vs 实测六维。 */
  function validatePanel(sample, character) {
    var growth = getGrowth();
    if (!growth) return { ok: false, error: '养成模块未加载' };
    var s = sample || {};
    var rarity = s.rarity || (character && character.rarity) || 'SSR';
    var potentials =
      s.potentials ||
      (character && growth.toPotentialMap(character)) ||
      { 投射: 167, 攻筐: 167, 防投: 167, 护筐: 167, 传球: 166, 突破: 166 };
    var predicted = growth.predictPanel(rarity, potentials);
    var observed = s.observed || {};
    var attrs = growth.CODEX_ATTRS;
    var residuals = {};
    var abs = [];
    attrs.forEach(function (attr) {
      var a = observed[attr];
      if (typeof a === 'number') {
        residuals[attr] = a - predicted[attr];
        abs.push(Math.abs(residuals[attr]));
      } else {
        residuals[attr] = null;
      }
    });
    var mae = abs.length ? abs.reduce(function (a, b) { return a + b; }, 0) / abs.length : null;
    var maxAbs = abs.length ? Math.max.apply(null, abs) : null;
    // 用同一批潜力试拟合其它稀有度，看哪个更接近（推断成长阶段）
    var bestRarity = rarity;
    var bestMae = mae;
    ['SSR', 'SR', 'R'].forEach(function (r) {
      var pred = growth.predictPanel(r, potentials);
      var errs = [];
      attrs.forEach(function (attr) {
        if (typeof observed[attr] === 'number') errs.push(Math.abs(observed[attr] - pred[attr]));
      });
      if (!errs.length) return;
      var m = errs.reduce(function (a, b) { return a + b; }, 0) / errs.length;
      if (bestMae == null || m < bestMae) {
        bestMae = m;
        bestRarity = r;
      }
    });
    var verdict =
      mae == null
        ? '缺少实测面板'
        : mae <= 4
          ? '预测与实测吻合（MAE ≤4）'
          : mae <= 10
            ? '存在成长加成（等级/星级/羁绊）或数据口径差异'
            : '偏差较大：可能不是该稀有度/该潜力曲线，或面板含大量成长项';
    return {
      ok: true,
      rarity: rarity,
      potentials: potentials,
      predicted: predicted,
      observed: observed,
      residuals: residuals,
      mae: mae,
      maxAbs: maxAbs,
      bestRarity: bestRarity,
      bestMae: bestMae,
      verdict: verdict,
      hint:
        mae != null && mae > 4
          ? '需要「同角色多等级面板截图」(V7) 才能把等级成长从拟合残差里分离出来。'
          : '继续采样不同稀有度角色可提高曲线置信度。'
    };
  }

  function verifierInputs() {
    var m = getModel();
    return (m && m.calibration && m.calibration.verifier_inputs) || [];
  }

  function sensitivity() {
    var m = getModel();
    return (m && m.calibration && m.calibration.sensitivity_analysis) || null;
  }

  function philosophy() {
    var m = getModel();
    return (m && m.calibration && m.calibration.philosophy) || '';
  }

  return {
    validateTrainingSample: validateTrainingSample,
    validatePanel: validatePanel,
    verifierInputs: verifierInputs,
    sensitivity: sensitivity,
    philosophy: philosophy
  };
});
