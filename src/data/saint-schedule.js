/** src/data/saint-schedule.js —— 【自动生成，请勿手改】圣山轮换时间工具（系统时间） */
(function (root) {
  'use strict';
  var D = {
  "schema": "saint-schedule-v1",
  "periodDays": 3,
  "periodMs": 259200000,
  "rotationHour": 5,
  "order": [
    "blue",
    "red",
    "green",
    "purple"
  ],
  "labels": {
    "blue": "蓝圣山",
    "red": "红圣山",
    "green": "绿圣山",
    "purple": "紫圣山"
  },
  "anchor": {
    "key": "red",
    "endAt": "2026-11-11T05:00:00+08:00",
    "atMs": 1794344400000,
    "note": "红圣山轮换结束时间（=下一个圣山绿圣山开始时间），2026-11-11 05:00"
  },
  "timezone": "Asia/Shanghai",
  "offsetMinutes": 480
};
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fmt(ms) {
    if (ms <= 0) return '0 分钟';
    var m = Math.floor(ms / 60000);
    var d = Math.floor(m / 1440); m -= d * 1440;
    var h = Math.floor(m / 60); m -= h * 60;
    return (d > 0 ? d + ' 天 ' : '') + (h > 0 || d > 0 ? h + ' 小时 ' : '') + m + ' 分钟';
  }
  function shanghaiDate(ms) {
    // 固定 +08:00（不给用户系统时区误差）
    var t = new Date(ms + 8 * 3600000);
    return { y: t.getUTCFullYear(), mo: t.getUTCMonth() + 1, d: t.getUTCDate(), h: t.getUTCHours(), mi: t.getUTCMinutes() };
  }
  function atText(ms) {
    var t = shanghaiDate(ms);
    return t.y + '-' + pad(t.mo) + '-' + pad(t.d) + ' ' + pad(t.h) + ':' + pad(t.mi);
  }
  function compute(nowMs) {
    var now = typeof nowMs === 'number' ? nowMs : Date.now();
    var anchor = D.anchor.atMs;
    var period = D.periodMs;
    var base = D.order.indexOf(D.anchor.key); // 锚点时刻 = 该圣山结束、下一个开始
    var dayIndex = Math.floor((now - anchor) / period);
    var startMs = anchor + dayIndex * period;
    var idx = ((base + 1 + dayIndex) % 4 + 4) % 4; // 锚点时刻下一个圣山
    var key = D.order[idx];
    var nextIdx = (idx + 1) % 4;
    var nextAtMs = startMs + period;
    var day = Math.floor((now - startMs) / 86400000) + 1;
    var remainingMs = nextAtMs - now;
    return {
      key: key, label: D.labels[key] || key, index: idx,
      day: day, days: D.periodDays,
      startAtMs: startMs, startAtText: atText(startMs),
      nextKey: D.order[nextIdx], nextLabel: D.labels[D.order[nextIdx]] || D.order[nextIdx],
      nextAtMs: nextAtMs, nextAtText: atText(nextAtMs),
      remainingMs: remainingMs, remainingText: fmt(remainingMs),
      nowText: atText(now), anchorText: atText(anchor),
      orderText: D.order.map(function (k) { return D.labels[k] || k; }).join(' → ')
    };
  }
  root.BBTSaintSchedule = { data: D, compute: compute, fmt: fmt, atText: atText };
  if (root.BBT) root.BBT.saintSchedule = root.BBTSaintSchedule;
})(typeof globalThis !== 'undefined' ? globalThis : this);
