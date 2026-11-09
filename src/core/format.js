/*!
 * core/format.js —— 数字格式化（纯函数，无 DOM）
 * 所有界面数字都经由这里，保证千分位、百分比、倍率写法统一。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.format = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function isNum(v) {
    return typeof v === 'number' && isFinite(v);
  }

  /** 修约到 d 位小数，并去掉多余的尾随 0。 */
  function trim(n, d) {
    if (!isNum(n)) return '—';
    var s = n.toFixed(d);
    if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, '');
    if (s === '-0') s = '0';
    return s;
  }

  /** 数字：自动加千分位，最多 d 位小数。 */
  function num(n, d) {
    if (!isNum(n)) return '—';
    var digits = typeof d === 'number' ? d : inferDigits(n);
    var parts = trim(n, digits).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  function inferDigits(n) {
    var a = Math.abs(n);
    if (a === 0) return 0;
    if (a >= 1000) return 0;
    if (a >= 100) return 1;
    if (a >= 1) return 2;
    return 3;
  }

  /** 带符号：+12.5 / −3。 */
  function signed(n, d) {
    if (!isNum(n)) return '—';
    var base = num(Math.abs(n), d);
    if (Math.abs(n) < 1e-12) return '0';
    return (n > 0 ? '+' : '−') + base;
  }

  /** 小数倍率：8.03 → "8.03×"；2.75 → "2.75×"。 */
  function multiplier(n, d) {
    if (!isNum(n)) return '—';
    return trim(n, typeof d === 'number' ? d : 2) + '×';
  }

  /** 分数转百分比文本：8.03 → "803%"；0.32 → "32%"。 */
  function percentFromFraction(f, d) {
    if (!isNum(f)) return '—';
    var p = f * 100;
    var digits = typeof d === 'number' ? d : (p >= 100 ? 0 : 2);
    return trim(p, digits) + '%';
  }

  /** 已经是百分数的数字转文本：20 → "20%"；0.5 → "0.5%"。 */
  function percentValue(p, d) {
    if (!isNum(p)) return '—';
    var digits = typeof d === 'number' ? d : (Math.abs(p) >= 100 ? 0 : 1);
    return trim(p, digits) + '%';
  }

  /** 小数转百分比但保留固定两位（用于精确对照，如 8.03 → 803.00%）。 */
  function percentFixed(f, d) {
    if (!isNum(f)) return '—';
    return (f * 100).toFixed(typeof d === 'number' ? d : 2) + '%';
  }

  /** 属性点：123.4 → "123.4 点"。 */
  function points(n, unit) {
    return num(n, 1) + (unit ? unit : ' 点');
  }

  /** 缩短中文数量：1234 → "1,234"；超过 1 亿用「亿」。 */
  function compact(n) {
    if (!isNum(n)) return '—';
    var abs = Math.abs(n);
    if (abs >= 1e8) return trim(n / 1e8, 2) + '亿';
    if (abs >= 1e4) return trim(n / 1e4, 2) + '万';
    return num(n, 0);
  }

  return {
    isNum: isNum,
    trim: trim,
    num: num,
    signed: signed,
    multiplier: multiplier,
    percentFromFraction: percentFromFraction,
    percentValue: percentValue,
    percentFixed: percentFixed,
    points: points,
    compact: compact
  };
});
