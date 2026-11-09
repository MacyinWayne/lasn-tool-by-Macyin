/*!
 * views/simulator.js —— 比赛模拟器（T5 beta，蒙特卡洛）
 */
(function (root) {
  'use strict';
  var BBT = root.BBT = root.BBT || {};
  var views = BBT.views = BBT.views || {};
  var dom = BBT.dom;

  function playerOptions(all, selected) {
    return all
      .map(function (p) {
        return '<option value="' + dom.esc(p.name) + '"' + (p.name === selected ? ' selected' : '') + '>' +
          dom.esc(p.name + '（' + (p.rarity || '?') + '·' + (p.position || '?') + '）') + '</option>';
      })
      .join('');
  }

  views.simulator = {
    id: 'simulator',
    nav: '比赛模拟器',
    icon: '🎮',
    title: '比赛模拟器（蒙特卡洛 beta）',
    subtitle: '这个工具回答：这套阵容在「克制优先 / 省体力 / 爆发 / 技能」策略下大概什么胜率、体能什么时候见底、哪个属性最值钱？结果为示意，命中函数待客户端校准。',
    dataNote:
      '来源：T3 battle 模型（攻防卡 / 防守 30-70% / 力竭）+ 示意假设；beta，命中函数待校准',
    mount: function (el, ctx) {
      var format = BBT.format;
      var roster = BBT.roster;
      var battle = BBT.battle;
      var all = roster.playerList().filter(function (p) {
        return ctx.isOwned ? ctx.isOwned(p.contentId) : true;
      });
      if (!all.length) {
        el.innerHTML = '<div class="notice notice--warn">还没有选择「我的角色」。请先在顶栏「我的角色」里勾选你拥有的角色，模拟器只列出已拥有角色。</div>';
        return;
      }
      var defaults = roster
        .rankByStream('battle')
        .filter(function (r) { return ctx.isOwned ? ctx.isOwned(r.player.contentId) : true; })
        .slice(0, 5)
        .map(function (r) { return r.player.name; });
      if (!defaults.length) defaults = all.slice(0, 5).map(function (p) { return p.name; });

      var html = '';
      html += '<div class="grid grid--main-side" style="align-items:start">';
      html +=
        '<div class="card card--pad card--shadow">' +
        '<div class="card-head"><div><div class="card-title"><span class="ico">🎛️</span>对局设置</div>' +
        '<div class="card-sub">从图鉴数据派生双方综合面板；敌方按难度系数缩放。</div></div></div>' +
        '<div class="stack" style="gap:12px">' +
        '<div><div class="field-label">我方 5 人阵容</div>' +
        '<div class="grid" style="grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">' +
        [0, 1, 2, 3, 4].map(function (i) {
          return '<select class="select" data-ally="' + i + '" style="width:100%">' +
            playerOptions(all, defaults[i]) + '</select>';
        }).join('') +
        '</div></div>' +
        '<div class="form-grid">' +
        '<div class="field"><label class="field-label" for="sim-strategy"><span class="label-text">策略</span>' +
        '<span class="badge badge--warn">推断</span></label>' +
        '<select class="select" id="sim-strategy" style="width:100%">' +
        battle.STRATEGIES.map(function (s) {
          return '<option value="' + s.id + '">' + dom.esc(s.name + ' · ' + s.desc) + '</option>';
        }).join('') + '</select></div>' +
        '<div class="field"><label class="field-label" for="sim-difficulty"><span class="label-text">敌方难度</span>' +
        '<span class="badge badge--warn">示意</span></label>' +
        '<select class="select" id="sim-difficulty" style="width:100%">' +
        '<option value="0.85">弱队（×0.85）</option><option value="1" selected>同级（×1.00）</option>' +
        '<option value="1.15">强敌（×1.15）</option><option value="1.3">精英（×1.30）</option>' +
        '</select></div>' +
        '<div class="field"><label class="field-label" for="sim-count"><span class="label-text">模拟场数</span>' +
        '<span class="badge badge--warn">性能</span></label>' +
        '<div class="input-wrap"><input class="input" id="sim-count" type="number" value="2000" min="200" max="20000" step="100">' +
        '<span class="input-unit">场</span></div></div>' +
        '<div class="field"><label class="field-label" for="sim-seed"><span class="label-text">随机种子</span></label>' +
        '<div class="input-wrap"><input class="input" id="sim-seed" type="number" value="20261105" step="1"></div>' +
        '<div class="field-hint">同种子同结果，可复现。</div></div>' +
        '<div class="field"><label class="field-label" for="sim-conv"><span class="label-text">面板→赛内系数</span>' +
        dom.confBadge('客户端确证') + '</label>' +
        '<div class="input-wrap"><input class="input" id="sim-conv" type="number" value="1" min="0" max="5" step="0.1">' +
        '<span class="input-unit">×</span></div>' +
        '<div class="field-hint">当前版本面板值 = 赛内值（×1，客户端确证）；旧版回放可切 ×1.6 复现。</div></div>' +
        '</div>' +
        '<button class="btn btn--primary" id="sim-run">运行蒙特卡洛模拟</button>' +
        '<div class="notice notice--warn"><span class="notice-ico">🧪</span><span>' +
        'beta/示意：攻防卡映射、防守 30%/70%、耐力力竭来自 T3 模型；命中函数、回合数、力竭衰减幅度未确认，' +
        '结果只用于相对比较。</span></div>' +
        '</div></div>';

      html += '<div id="sim-result" class="stack" style="gap:18px"></div>';
      html += '</div>';
      html += '<div id="sim-extra" class="stack" style="gap:18px"></div>';
      el.innerHTML = html;

      var resultHost = dom.qs('#sim-result', el);
      var extraHost = dom.qs('#sim-extra', el);

      function run() {
        var names = [];
        dom.qsa('[data-ally]', el).forEach(function (sel) {
          names.push(sel.value);
        });
        if (!names.filter(Boolean).length) names = defaults.slice();
        var players = names.map(function (n) { return roster.byName(n); }).filter(Boolean);
        if (!players.length) players = defaults.map(function (n) { return roster.byName(n); }).filter(Boolean);
        var conv = Number(dom.qs('#sim-conv', el).value);
        if (!isFinite(conv)) conv = 1;
        var panelA = battle.deriveTeamProfile(players.map(function (p) { return p.stats; }));
        if (!panelA) {
          resultHost.innerHTML = '<div class="notice notice--warn">无法派生我方面板（角色数据缺失）。</div>';
          return;
        }
        var teamA = {
          attack: panelA.attack * conv,
          defense: panelA.defense * conv,
          organize: panelA.organize * conv,
          rebound: panelA.rebound * conv,
          stamina: panelA.stamina,
          will: panelA.will,
          shot: panelA.shot * conv,
          attackHoop: panelA.attackHoop * conv,
          defShot: panelA.defShot * conv,
          rim: panelA.rim * conv,
          pass: panelA.pass * conv,
          dribble: panelA.dribble * conv,
          proxies: panelA.proxies.concat(
            conv === 1 ? ['当前版本面板→赛内 ×1.0（客户端确证）'] : ['旧版回放换算 ×' + conv]
          )
        };
        var factor = Number(dom.qs('#sim-difficulty', el).value) || 1;
        var teamB = {
          attack: teamA.attack * factor,
          defense: teamA.defense * factor,
          organize: teamA.organize * factor,
          rebound: teamA.rebound * factor,
          stamina: teamA.stamina,
          will: teamA.will * factor,
          shot: teamA.shot * factor,
          attackHoop: teamA.attackHoop * factor,
          defShot: teamA.defShot * factor,
          rim: teamA.rim * factor,
          pass: teamA.pass * factor,
          dribble: teamA.dribble * factor,
          proxies: teamA.proxies
        };
        var result = battle.simulate({
          teamA: teamA,
          teamB: teamB,
          strategyId: dom.qs('#sim-strategy', el).value,
          simulations: Number(dom.qs('#sim-count', el).value) || 2000,
          seed: Number(dom.qs('#sim-seed', el).value) || 20261105
        });
        ctx.lastSimulation = result;

        var resultHtml = '';
        resultHtml +=
          '<div class="result-card">' +
          '<div class="result-label">我方胜率（' + result.simulations + ' 场 · ' + dom.esc(result.strategy.name) + '）' +
          dom.confBadge('推断') + '<span class="tag tag--orange">beta</span></div>' +
          '<div class="result-main"><span class="big-number num">' + format.num(result.winRate * 100, 1) +
          '</span><span class="big-unit">%</span></div>' +
          '<div class="result-note">平局 ' + format.num(result.drawRate * 100, 1) + '% · 告负 ' +
          format.num(result.lossRate * 100, 1) + '% · 平均比分 ' +
          format.num(result.avgScoreA, 0) + ' : ' + format.num(result.avgScoreB, 0) +
          ' · 平均分差 ' + format.signed(result.avgDiff, 1) + '</div>' +
          '<div class="result-formula">分差 P25 ~ P75：' +
          format.signed(result.scoreDiffP25, 1) + ' ~ ' + format.signed(result.scoreDiffP75, 1) +
          '；力竭时点均值：' + (result.exhaustMean != null ? 'R' + format.num(result.exhaustMean, 1) : '未力竭') + '</div>' +
          '</div>';

        resultHtml +=
          '<div class="grid grid--3" style="gap:12px">' +
          '<div class="stat"><div class="stat-label">平均得分</div><div class="stat-value num">' +
          format.num(result.avgScoreA, 1) + '</div><div class="stat-hint">敌方 ' + format.num(result.avgScoreB, 1) + '</div></div>' +
          '<div class="stat stat--blue"><div class="stat-label">力竭场次占比</div><div class="stat-value num">' +
          format.num((result.exhaustCount / result.simulations) * 100, 0) + '<span class="unit">%</span></div>' +
          '<div class="stat-hint">P25/P75：R' + (result.exhaustP25 != null ? result.exhaustP25 : '—') + ' / R' +
          (result.exhaustP75 != null ? result.exhaustP75 : '—') + '</div></div>' +
          '<div class="stat"><div class="stat-label">关键因子</div><div class="stat-value num" style="font-size:20px">' +
          dom.esc(result.contribution[0].label) + '</div><div class="stat-hint">+10% 时胜率 ' +
          format.signed(result.contribution[0].delta * 100, 1) + 'pp</div></div>' +
          '</div>';

        var contribChart = BBT.charts.bars({
          labels: result.contribution.map(function (c) { return c.label.split('（')[0]; }),
          values: result.contribution.map(function (c) { return c.delta * 100; }),
          yFmt: function (v) { return format.signed(v, 1) + 'pp'; },
          highlightIndex: 0,
          yLabel: '胜率变化（属性 +10%）',
          xLabel: '属性',
          height: 260,
          ariaLabel: '属性对胜率的贡献'
        });
        var diffBars = [];
        for (var i = 0; i < 5; i++) diffBars.push(0);
        resultHtml +=
          '<div class="chart-grid-2">' +
          '<div class="chart"><div class="chart-head"><div><div class="chart-title">属性弹性（各自 +10% 的胜率变化）</div>' +
          '<div class="chart-sub">越大说明该属性越值得优先投入。</div></div></div>' + contribChart +
          '<div class="chart-caption">这是相对比较，不是绝对强度；命中函数的未知性会让绝对值偏移。</div></div>' +
          '<div class="chart"><div class="chart-head"><div><div class="chart-title">双方综合面板</div>' +
          '<div class="chart-sub">由我方 5 人 C 层六维平均派生；篮板/逼抢/耐力为代理值。</div></div></div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>指标</th><th class="num">我方</th><th class="num">敌方</th></tr></thead><tbody>' +
          [['进攻', teamA.attack, teamB.attack], ['防守', teamA.defense, teamB.defense],
           ['组织', teamA.organize, teamB.organize], ['篮板(代理)', teamA.rebound, teamB.rebound],
           ['意志', teamA.will, teamB.will]].map(function (r) {
            return '<tr><td>' + r[0] + '</td><td class="num">' + format.num(r[1], 0) +
              '</td><td class="num">' + format.num(r[2], 0) + '</td></tr>';
          }).join('') +
          '</tbody></table></div>' +
          '<div class="chart-caption">' + dom.esc(teamA.proxies.join('；')) + '</div></div>' +
          '</div>';

        resultHost.innerHTML = resultHtml;

        extraHost.innerHTML =
          '<div class="card card--pad">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧾</span>模拟假设与待校准项</div>' +
          '<div class="card-sub">全部参数都可校准；验证器 Tab 会告诉你该补哪条数据。</div></div>' +
          dom.confBadge('推断') + '</div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>假设</th><th class="num">取值</th><th>说明</th></tr></thead><tbody>' +
          '<tr><td>回合数</td><td class="num">' + result.assumptions.rounds + '</td><td class="small muted">回合结构未公开</td></tr>' +
          '<tr><td>基础命中</td><td class="num">' + format.num(result.assumptions.baseHit * 100, 0) + '%</td><td class="small muted">logistic 差值假设</td></tr>' +
          '<tr><td>防守卡权重</td><td class="num">30% / 70%</td><td class="small muted">T3 模型 + 截图 OCR</td></tr>' +
          '<tr><td>力竭属性惩罚</td><td class="num">×' + result.assumptions.exhaustionPenalty + '</td><td class="small muted">模型区间 20%~40% 衰减</td></tr>' +
          '<tr><td>技能能量</td><td class="num">' + result.assumptions.skillEnergyCost + '</td><td class="small muted">固定技能 80 能量（多源一致）</td></tr>' +
          '</tbody></table></div>' +
          '<div class="notice notice--info" style="margin-top:12px"><span class="notice-ico">🔬</span><span>' +
          dom.esc(result.caveat) + '</span></div>' +
          '</div>';
      }

      dom.qs('#sim-run', el).addEventListener('click', run);
      run();
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
