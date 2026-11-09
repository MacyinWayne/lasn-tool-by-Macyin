/*!
 * ui/charts.js —— 零依赖内联 SVG 图表
 *
 * 全部用字符串拼 SVG（不碰 Canvas / 不引第三方库），
 * 由视图插入 innerHTML；颜色一律用 CSS 变量，跟随主题切换。
 *
 * 提供：line（折线/面积）、bars（柱状）、radar（雷达）、gauge（半环仪表）。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.charts = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var uidSeq = 0;

  function uid(prefix) {
    uidSeq += 1;
    return prefix + '-' + uidSeq;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function isNum(v) {
    return typeof v === 'number' && isFinite(v);
  }

  function round(v, d) {
    var f = Math.pow(10, d == null ? 2 : d);
    return Math.round(v * f) / f;
  }

  function defaultFmt(v) {
    if (!isNum(v)) return '—';
    var a = Math.abs(v);
    if (a >= 10000) return round(v / 10000, 1) + '万';
    if (a >= 100) return String(round(v, 0));
    if (a >= 10) return String(round(v, 1));
    return String(round(v, 2));
  }

  /** 取「好看」的刻度间隔：1/2/5 × 10^n */
  function niceStep(rawStep) {
    if (!isNum(rawStep) || rawStep <= 0) return 1;
    var exp = Math.floor(Math.log(rawStep) / Math.LN10);
    var base = Math.pow(10, exp);
    var n = rawStep / base;
    var mult = n >= 5 ? 10 : n >= 2 ? 5 : n >= 1 ? 2 : 1;
    return mult * base;
  }

  /**
   * 计算 y 轴域与刻度。
   * @returns {{min:number,max:number,step:number,ticks:number[]}}
   */
  function niceScale(minVal, maxVal, tickCount) {
    var ticks = Math.max(2, Math.min(8, tickCount || 4));
    var min = isNum(minVal) ? minVal : 0;
    var max = isNum(maxVal) ? maxVal : 1;
    if (min === max) {
      if (max === 0) max = 1;
      else {
        var pad = Math.abs(max) * 0.15;
        min -= pad;
        max += pad;
      }
    }
    var step = niceStep((max - min) / ticks);
    var niceMin = Math.floor(min / step) * step;
    var niceMax = Math.ceil(max / step) * step;
    if (niceMin === niceMax) niceMax = niceMin + step;
    var out = [];
    for (var v = niceMin; v <= niceMax + step * 0.5; v += step) {
      out.push(round(v, 6));
      if (out.length > 40) break;
    }
    return { min: round(niceMin, 6), max: round(niceMax, 6), step: step, ticks: out };
  }

  /**
   * 折线图。
   * @param {Object} opts { width,height, labels, series:[{name,values,color,area,dashed,showPoints}],
   *                        yLabel,xLabel,yFmt,xFmt,zeroBased,yTicks,title,ariaLabel }
   */
  function line(opts) {
    var o = opts || {};
    var width = o.width || 760;
    var height = o.height || 300;
    var padL = o.padL || 54;
    var padR = o.padR || 18;
    var padT = o.padT || 18;
    var padB = o.padB || 40;
    var labels = Array.isArray(o.labels) ? o.labels : [];
    var series = (Array.isArray(o.series) ? o.series : []).map(function (s, i) {
      return {
        name: s.name || '系列 ' + (i + 1),
        values: Array.isArray(s.values) ? s.values : [],
        color: s.color || 'var(--orange)',
        area: !!s.area,
        dashed: !!s.dashed,
        showPoints: s.showPoints !== false
      };
    });
    var yFmt = typeof o.yFmt === 'function' ? o.yFmt : defaultFmt;
    var xFmt = typeof o.xFmt === 'function' ? o.xFmt : function (v) { return v; };

    var all = [];
    series.forEach(function (s) {
      s.values.forEach(function (v) {
        if (isNum(v)) all.push(v);
      });
    });
    if (!all.length) return emptySvg(width, height, '暂无数据');
    var dataMin = Math.min.apply(null, all);
    var dataMax = Math.max.apply(null, all);
    var yMin = o.zeroBased ? 0 : Math.min(dataMin, dataMin >= 0 ? dataMin : 0);
    if (o.zeroBased) {
      yMin = 0;
    } else {
      yMin = dataMin - Math.abs(dataMax - dataMin) * 0.08;
      if (dataMin >= 0 && yMin < 0) yMin = 0;
    }
    var scale = niceScale(yMin, dataMax + Math.abs(dataMax - dataMin) * 0.08, o.yTicks || 4);

    var innerW = width - padL - padR;
    var innerH = height - padT - padB;
    var n = Math.max(labels.length, 1);
    var xAt = function (i) {
      if (n === 1) return padL + innerW / 2;
      return padL + (innerW * i) / (n - 1);
    };
    var yAt = function (v) {
      var ratio = (v - scale.min) / (scale.max - scale.min || 1);
      if (ratio < 0) ratio = 0;
      if (ratio > 1) ratio = 1;
      return padT + innerH - ratio * innerH;
    };

    var svg = [];
    svg.push(
      '<svg class="chart-svg" viewBox="0 0 ' + width + ' ' + height + '" ' +
        'role="img" aria-label="' + esc(o.ariaLabel || o.title || '折线图') + '" ' +
        'preserveAspectRatio="xMidYMid meet">'
    );
    // 网格 + y 刻度
    scale.ticks.forEach(function (t) {
      var y = yAt(t);
      svg.push('<line class="c-grid" x1="' + padL + '" y1="' + round(y, 2) + '" x2="' +
        (width - padR) + '" y2="' + round(y, 2) + '"/>');
      svg.push('<text class="c-tick" x="' + (padL - 8) + '" y="' + round(y + 3.5, 2) +
        '" text-anchor="end">' + esc(yFmt(t)) + '</text>');
    });
    // 基线
    svg.push('<line class="c-axis" x1="' + padL + '" y1="' + (padT + innerH) + '" x2="' +
      (width - padR) + '" y2="' + (padT + innerH) + '"/>');
    // x 刻度标签
    var every = n > 14 ? Math.ceil(n / 12) : 1;
    labels.forEach(function (label, i) {
      if (i % every !== 0 && i !== n - 1) return;
      var x = xAt(i);
      svg.push('<text class="c-tick" x="' + round(x, 2) + '" y="' + (padT + innerH + 18) +
        '" text-anchor="middle">' + esc(xFmt(label)) + '</text>');
    });
    // x 轴标题
    if (o.xLabel) {
      svg.push('<text class="c-axis-label" x="' + (padL + innerW) + '" y="' + (height - 6) +
        '" text-anchor="end">' + esc(o.xLabel) + '</text>');
    }
    if (o.yLabel) {
      svg.push('<text class="c-axis-label" x="' + padL + '" y="' + (padT - 6) +
        '" text-anchor="start">' + esc(o.yLabel) + '</text>');
    }

    // defs：面积渐变
    series.forEach(function (s, si) {
      if (!s.area) return;
      var gid = uid('grad');
      svg.push(
        '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="' + s.color + '" stop-opacity="0.55"/>' +
          '<stop offset="100%" stop-color="' + s.color + '" stop-opacity="0"/>' +
        '</linearGradient></defs>'
      );
      s._grad = gid;
    });

    // 面积
    series.forEach(function (s) {
      if (!s.area) return;
      var pts = [];
      s.values.forEach(function (v, i) {
        if (isNum(v)) pts.push([xAt(i), yAt(v)]);
      });
      if (pts.length < 2) return;
      var baseY = padT + innerH;
      var d = 'M' + round(pts[0][0], 2) + ',' + baseY;
      pts.forEach(function (p) {
        d += 'L' + round(p[0], 2) + ',' + round(p[1], 2);
      });
      d += 'L' + round(pts[pts.length - 1][0], 2) + ',' + baseY + 'Z';
      svg.push('<path class="c-area" d="' + d + '" fill="url(#' + s._grad + ')"/>');
    });

    // 折线
    series.forEach(function (s) {
      var segments = [];
      var current = [];
      s.values.forEach(function (v, i) {
        if (isNum(v)) current.push([xAt(i), yAt(v)]);
        else if (current.length) {
          segments.push(current);
          current = [];
        }
      });
      if (current.length) segments.push(current);
      segments.forEach(function (seg) {
        var d = seg
          .map(function (p, i) {
            return (i === 0 ? 'M' : 'L') + round(p[0], 2) + ',' + round(p[1], 2);
          })
          .join(' ');
        svg.push('<path class="c-line' + (s.dashed ? ' c-line--dashed' : '') + '" d="' + d +
          '" stroke="' + s.color + '"/>');
      });
      if (s.showPoints !== false) {
        s.values.forEach(function (v, i) {
          if (!isNum(v)) return;
          var showLabel = o.showLastLabels && i === s.values.length - 1;
          svg.push(
            '<circle class="c-dot" cx="' + round(xAt(i), 2) + '" cy="' + round(yAt(v), 2) +
              '" r="' + (showLabel ? 4.6 : 3.4) + '" fill="' + s.color + '">' +
              '<title>' + esc(s.name + ' · ' + (labels[i] != null ? labels[i] : '第' + (i + 1) + '点') +
              '：' + yFmt(v)) + '</title></circle>'
          );
          if (showLabel) {
            svg.push('<text class="c-value" x="' + round(xAt(i), 2) + '" y="' +
              round(yAt(v) - 10, 2) + '" text-anchor="middle">' + esc(yFmt(v)) + '</text>');
          }
        });
      }
    });

    svg.push('</svg>');
    return svg.join('');
  }

  /**
   * 柱状图（单系列，可高亮某个柱）。
   * @param {Object} opts { width,height,labels,values,colors,yFmt,valueLabels,highlightIndex,zeroBased,yLabel,xLabel }
   */
  function bars(opts) {
    var o = opts || {};
    var width = o.width || 760;
    var height = o.height || 280;
    var padL = o.padL || 50;
    var padR = o.padR || 16;
    var padT = o.padT || 22;
    var padB = o.padB || 42;
    var labels = Array.isArray(o.labels) ? o.labels : [];
    var values = Array.isArray(o.values) ? o.values : [];
    var yFmt = typeof o.yFmt === 'function' ? o.yFmt : defaultFmt;
    var nums = values.filter(isNum);
    if (!nums.length) return emptySvg(width, height, '暂无数据');
    var dataMax = Math.max.apply(null, nums);
    var dataMin = Math.min.apply(null, nums);
    var scale = niceScale(o.zeroBased === false ? dataMin : 0, dataMax * 1.08, o.yTicks || 4);
    var innerW = width - padL - padR;
    var innerH = height - padT - padB;
    var n = Math.max(values.length, 1);
    var slot = innerW / n;
    var barW = Math.min(slot * 0.58, 54);
    var yAt = function (v) {
      var ratio = (v - scale.min) / (scale.max - scale.min || 1);
      if (ratio < 0) ratio = 0;
      if (ratio > 1) ratio = 1;
      return padT + innerH - ratio * innerH;
    };
    var svg = [];
    svg.push(
      '<svg class="chart-svg" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' +
        esc(o.ariaLabel || o.title || '柱状图') + '" preserveAspectRatio="xMidYMid meet">'
    );
    scale.ticks.forEach(function (t) {
      var y = yAt(t);
      svg.push('<line class="c-grid" x1="' + padL + '" y1="' + round(y, 2) + '" x2="' +
        (width - padR) + '" y2="' + round(y, 2) + '"/>');
      svg.push('<text class="c-tick" x="' + (padL - 8) + '" y="' + round(y + 3.5, 2) +
        '" text-anchor="end">' + esc(yFmt(t)) + '</text>');
    });
    svg.push('<line class="c-axis" x1="' + padL + '" y1="' + (padT + innerH) + '" x2="' +
      (width - padR) + '" y2="' + (padT + innerH) + '"/>');
    var baseY = yAt(Math.max(scale.min, 0));
    values.forEach(function (v, i) {
      var x = padL + slot * i + (slot - barW) / 2;
      if (!isNum(v)) return;
      var yTop = yAt(v);
      var h = Math.max(1, baseY - yTop);
      var fill = Array.isArray(o.colors) && o.colors[i]
        ? o.colors[i]
        : o.highlightIndex === i
          ? 'var(--orange)'
          : 'var(--blue)';
      var muted = o.highlightIndex != null && o.highlightIndex !== i;
      svg.push(
        '<rect class="c-bar' + (muted ? ' c-bar--muted' : '') + '" x="' + round(x, 2) + '" y="' +
          round(yTop, 2) + '" width="' + round(barW, 2) + '" height="' + round(h, 2) +
          '" rx="5" fill="' + fill + '"><title>' + esc((labels[i] != null ? labels[i] : '') + '：' +
          yFmt(v)) + '</title></rect>'
      );
      if (o.valueLabels !== false) {
        svg.push('<text class="c-value" x="' + round(x + barW / 2, 2) + '" y="' +
          round(yTop - 7, 2) + '" text-anchor="middle">' + esc(yFmt(v)) + '</text>');
      }
      if (i % (n > 14 ? Math.ceil(n / 12) : 1) === 0 || i === n - 1) {
        svg.push('<text class="c-tick" x="' + round(x + barW / 2, 2) + '" y="' +
          (padT + innerH + 18) + '" text-anchor="middle">' + esc(labels[i] != null ? labels[i] : i + 1) +
          '</text>');
      }
    });
    if (o.xLabel) {
      svg.push('<text class="c-axis-label" x="' + (padL + innerW) + '" y="' + (height - 5) +
        '" text-anchor="end">' + esc(o.xLabel) + '</text>');
    }
    if (o.yLabel) {
      svg.push('<text class="c-axis-label" x="' + padL + '" y="' + (padT - 7) +
        '" text-anchor="start">' + esc(o.yLabel) + '</text>');
    }
    svg.push('</svg>');
    return svg.join('');
  }

  /**
   * 雷达图。
   * @param {Object} opts { size, axes:[{label, max?}], series:[{name,color,values:[number|null]}], rings, ariaLabel }
   *   values 与 axes 等长；任意一个轴为 null 时该系列不绘制（显示「数据待导入」）。
   */
  function radar(opts) {
    var o = opts || {};
    var size = o.size || 320;
    var axes = Array.isArray(o.axes) ? o.axes : [];
    var series = Array.isArray(o.series) ? o.series : [];
    if (!axes.length) return emptySvg(size, size, '暂无维度');
    var cx = size / 2;
    var cy = size / 2 + 4;
    var radius = size * 0.32;
    var rings = o.rings || 4;
    var maxVal = 0;
    series.forEach(function (s) {
      (s.values || []).forEach(function (v) {
        if (isNum(v) && v > maxVal) maxVal = v;
      });
    });
    if (!maxVal) maxVal = 100;
    maxVal = maxVal * 1.1;
    axes.forEach(function (a) {
      if (isNum(a.max) && a.max > maxVal) maxVal = a.max;
    });
    var angleAt = function (i) {
      return (-Math.PI / 2) + (Math.PI * 2 * i) / axes.length;
    };
    var pointAt = function (i, ratio) {
      var ang = angleAt(i);
      return [cx + Math.cos(ang) * radius * ratio, cy + Math.sin(ang) * radius * ratio];
    };
    var svg = [];
    svg.push(
      '<svg class="chart-svg" viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="' +
        esc(o.ariaLabel || '雷达图') + '" preserveAspectRatio="xMidYMid meet">'
    );
    // 同心多边形
    for (var r = rings; r >= 1; r--) {
      var ratio = r / rings;
      var pts = axes
        .map(function (a, i) {
          var p = pointAt(i, ratio);
          return round(p[0], 2) + ',' + round(p[1], 2);
        })
        .join(' ');
      svg.push('<polygon points="' + pts + '" fill="none" stroke="var(--line)" stroke-width="' +
        (r === rings ? 1.2 : 1) + '"/>');
    }
    // 轴线 + 标签
    axes.forEach(function (a, i) {
      var end = pointAt(i, 1);
      svg.push('<line x1="' + cx + '" y1="' + cy + '" x2="' + round(end[0], 2) + '" y2="' +
        round(end[1], 2) + '" stroke="var(--line)" stroke-width="1"/>');
      var lp = pointAt(i, 1.19);
      var ang = angleAt(i);
      var cos = Math.cos(ang);
      var anchor = Math.abs(cos) < 0.25 ? 'middle' : cos > 0 ? 'start' : 'end';
      var dy = Math.sin(ang) > 0.3 ? 10 : Math.sin(ang) < -0.3 ? -4 : 4;
      svg.push('<text class="c-tick" x="' + round(lp[0], 2) + '" y="' + round(lp[1] + dy, 2) +
        '" text-anchor="' + anchor + '">' + esc(a.label) + '</text>');
    });
    // 数据
    var drawn = 0;
    series.forEach(function (s) {
      var values = Array.isArray(s.values) ? s.values : [];
      var usable = values.length === axes.length && values.every(isNum);
      if (!usable) return;
      drawn += 1;
      var pts = values.map(function (v, i) {
        var ratio = Math.max(0.02, Math.min(1, v / maxVal));
        var p = pointAt(i, ratio);
        return [round(p[0], 2), round(p[1], 2)];
      });
      var poly = pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ');
      var color = s.color || 'var(--orange)';
      svg.push('<polygon points="' + poly + '" fill="' + color + '" fill-opacity="0.16" stroke="' +
        color + '" stroke-width="2.2" stroke-linejoin="round"/>');
      pts.forEach(function (p, i) {
        svg.push('<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.2" fill="' + color +
          '" stroke="var(--surface)" stroke-width="1.4"><title>' + esc(axes[i].label + '：' +
          defaultFmt(values[i])) + '</title></circle>');
      });
    });
    if (!drawn) {
      svg.push('<text class="c-tick" x="' + cx + '" y="' + (cy + 4) +
        '" text-anchor="middle" style="font-size:12px">' + esc(o.emptyText || '数据待导入') + '</text>');
    }
    svg.push('</svg>');
    return svg.join('');
  }

  /**
   * 半环仪表（用于爆发倍率这类「相对满值」的直观展示）。
   * @param {Object} opts { value,max,width,height,label,subLabel,color,ariaLabel }
   */
  function gauge(opts) {
    var o = opts || {};
    var width = o.width || 300;
    var height = o.height || 180;
    var value = isNum(o.value) ? o.value : 0;
    var max = isNum(o.max) && o.max > 0 ? o.max : 1;
    var ratio = Math.max(0, Math.min(1, value / max));
    var cx = width / 2;
    var cy = height - 26;
    var radius = Math.min(width / 2 - 22, height - 46);
    var start = Math.PI;
    var end = Math.PI * 2;
    var ang = start + (end - start) * ratio;
    var arc = function (from, to) {
      var x1 = cx + Math.cos(from) * radius;
      var y1 = cy + Math.sin(from) * radius;
      var x2 = cx + Math.cos(to) * radius;
      var y2 = cy + Math.sin(to) * radius;
      var large = to - from > Math.PI ? 1 : 0;
      return 'M' + round(x1, 2) + ',' + round(y1, 2) + 'A' + radius + ',' + radius + ' 0 ' + large +
        ' 1 ' + round(x2, 2) + ',' + round(y2, 2);
    };
    var color = o.color || 'var(--orange)';
    var svg = [];
    svg.push('<svg class="chart-svg" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' +
      esc(o.ariaLabel || o.label || '仪表') + '">');
    svg.push('<path d="' + arc(start, end) + '" fill="none" stroke="var(--surface-3)" stroke-width="14" stroke-linecap="round"/>');
    if (ratio > 0.001) {
      svg.push('<path d="' + arc(start, ang) + '" fill="none" stroke="' + color +
        '" stroke-width="14" stroke-linecap="round"/>');
    }
    svg.push('<text x="' + cx + '" y="' + (cy - 12) + '" text-anchor="middle" ' +
      'style="font-size:30px;font-weight:850;fill:var(--ink);font-variant-numeric:tabular-nums">' +
      esc(o.valueText != null ? o.valueText : defaultFmt(value)) + '</text>');
    if (o.label) {
      svg.push('<text x="' + cx + '" y="' + (cy + 14) + '" text-anchor="middle" ' +
        'style="font-size:11.5px;fill:var(--ink-3);font-weight:600">' + esc(o.label) + '</text>');
    }
    if (o.subLabel) {
      svg.push('<text x="' + cx + '" y="' + (cy + 30) + '" text-anchor="middle" ' +
        'style="font-size:10.5px;fill:var(--ink-4)">' + esc(o.subLabel) + '</text>');
    }
    svg.push('</svg>');
    return svg.join('');
  }

  function emptySvg(width, height, text) {
    return (
      '<svg class="chart-svg" viewBox="0 0 ' + width + ' ' + height + '" role="img" aria-label="' +
      esc(text) + '"><text x="' + width / 2 + '" y="' + height / 2 +
      '" text-anchor="middle" style="font-size:12px;fill:var(--ink-4)">' + esc(text) + '</text></svg>'
    );
  }

  return {
    line: line,
    bars: bars,
    radar: radar,
    gauge: gauge,
    niceScale: niceScale,
    niceStep: niceStep,
    emptySvg: emptySvg,
    esc: esc
  };
});
