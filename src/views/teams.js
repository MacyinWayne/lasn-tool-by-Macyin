/*!
 * views/teams.js —— 养成配队（tab id: teams，排在 overview 之后）
 *
 * 结构（用户确认 2026-11-05）：
 *   - 场景：冲总评分 / 竞技场 / 全国大赛 / 杯赛 / 圣山挑战赛（蓝/绿/红/紫）
 *   - 训练方向：攻框（含突破）/ 三分（含中投）/ 防守（抢断/盖帽）/ 组织（战术/续航）/ 篮板（特化）
 *   - 队伍：主练 ×1、陪练 ×4、经理 ×1（锁定）、器材 ≤5、笔记 ≤2
 *   - 适配度：角色 × 场景 × 方向，默认由 roles + derived 天赋派生，可手动修改并持久化
 *   - 方案：命名保存/读取/删除；方案备注按「场景+方向+主练」为 key 持久化
 *   - 数据缺口：器材库 / 笔记库 / 绿红圣山 / 杯赛场地效果 → 明确占位，不虚构条目
 *
 * 所有数据来自 BBT.characterData / BBT.scenarios / store；页面不写死角色数值。
 */
(function (root) {
  'use strict';
  var BBT = (root.BBT = root.BBT || {});
  var views = (BBT.views = BBT.views || {});
  var dom = BBT.dom;

  var FIT_VALUES = ['适配', '需特定技能组合', '不适配'];
  var FIT_CLASS = { 适配: 'badge--ok', 需特定技能组合: 'badge--warn', 不适配: 'badge--neutral' };
  var FIT_SHORT = { 适配: '适配', 需特定技能组合: '需组合', 不适配: '不适配' };

  /* ---------------- 需求 #2b：角色养成配法静态规则（knowledge §6.2） ---------------- */
  var POSITION_RULES = {
    控卫: { area: '三分线外、全场偏居中', baseSkills: ['三分（技/绿）', '突破（速/蓝）', '横撤（力/红）'] },
    分卫: { area: '侧翼（三分线外或线内一步）', baseSkills: ['中投（技/绿）', '强突（力/红）', '后撤（速/蓝）'] },
    小前: { area: '三分线内、中投距离', baseSkills: ['中投（技/绿）', '强突（力/红）', '突破（速/蓝）'] },
    大前: { area: '禁区/三秒区/两分区', baseSkills: ['中投（技/绿）', '上篮（力/红）', '背打（速/蓝）', '近三秒区→勾手；更远→突破'] },
    中锋: { area: '禁区', baseSkills: ['勾手（技/绿）', '扣篮（力/红）', '无速卡'] }
  };
  var POSITION_OPTIONS = ['控卫', '分卫', '小前', '大前', '中锋'];
  var EQUIP_THREE_SKILLS = ['三分', '横撤', '后撤', '快速三分', '大力三分'];
  var DIR_SKILL_KEYWORDS = {
    drive: ['上篮', '扣篮', '攻框', '突破', '背打', '强突', '终结', '两分'],
    three: ['三分', '中投', '投射', '后撤', '横撤', '远投'],
    defense: ['抢断', '盖帽', '防守', '护筐', '防投'],
    playmaking: ['传球', '组织', '战术', '挡拆', '能量', '回复'],
    rebound: ['篮板', '补篮', '卡位', '对抗']
  };
  var ROLE_SKILL_POOL = {
    得分手: ['三分', '中投', '强突', '后撤'],
    防守者: ['抢断', '盖帽', '横撤', '看破'],
    组织者: ['传球', '挡拆', '战术', '回复'],
    篮板手: ['篮板', '卡位', '补篮', '扣篮']
  };
  var POS_BOOST = {
    控卫: { three: 2, playmaking: 1 },
    分卫: { three: 2, drive: 1 },
    小前: { three: 1, drive: 1 },
    大前: { drive: 2, rebound: 1, three: -1 },
    中锋: { rebound: 2, drive: 1, three: -2 }
  };

  function statNum(stats, key) {
    return Number((stats && stats[key]) || 0);
  }

  function esc(v) {
    return dom.esc(v == null ? '' : String(v));
  }

  function posBase(role) {
    var t = String(role || '');
    if (/控卫|控球/.test(t)) return '控卫';
    if (/分卫|得分/.test(t)) return '分卫';
    if (/小前/.test(t)) return '小前';
    if (/大前/.test(t)) return '大前';
    if (/中锋/.test(t)) return '中锋';
    return t;
  }

  function charName(map, id) {
    var c = map[String(id)];
    return c ? c.name : '—';
  }

  views.teams = {
    id: 'teams',
    nav: '养成配队',
    icon: '🧩',
    title: '养成配队',
    subtitle:
      '按「场景 × 训练方向」规划主练/陪练/经理/器材/笔记，查看角色功能定位与适配度；选中主练后给出「角色养成配法」：方向推荐、位置约束/补丁技能、器材固定技能与配法笔记。',
    dataNote:
      '本页来源：场景/训练方向=用户确认（2026-11-05）· 圣山角色=用户确认 2026-11-09（蓝白神/红希雅/绿野上/紫出羽）· 适配度/养成配法=知识库「比赛机制_攻防回合.md」§6.2 + claims + 角色数据（启发式推断）· 器材库/笔记库=数据待补（占位可手动输入）',
    mount: function (el, ctx) {
      var store = ctx.store;
      var data = ctx.data || (BBT.gameData ? { characters: BBT.gameData.characters() } : { characters: [] });
      var characters = data.characters || [];
      var byId = Object.create(null);
      characters.forEach(function (c) {
        byId[String(c.contentId)] = c;
      });
      var sd = (ctx.gameData && ctx.gameData.scenarios && ctx.gameData.scenarios()) || BBT.scenarios || null;
      var scenarios = (sd && sd.scenarios) || [];
      var directions = (sd && sd.directions) || [];
      var saintMountains = (sd && sd.saintMountains) || {};

      if (!characters.length || !scenarios.length || !directions.length) {
        el.innerHTML =
          '<div class="notice notice--warn"><span class="notice-ico">📦</span><span>' +
          '缺少角色/场景数据，请先运行 <span class="inline-code">node tool/scripts/build-data.mjs</span> 与 ' +
          '<span class="inline-code">node tool/scripts/build-scenarios.mjs</span>。</span></div>';
        return;
      }

      var state = {
        sceneId: scenarios[0].id,
        mountainId: 'blue',
        directionId: directions[0].id,
        activeSlot: null, // { type:'main' } | { type:'coach', index:0..3 }
        filterRole: '全部',
        filterFit: '全部',
        search: '',
        draft: emptyDraft(),
        note: '',
        // 需求 #2b：角色养成配法（选中主练后加载）
        build: null, // { directionId, altPosition, note, patchesNote, equipment:[{name,skill,source}] }
        buildSaved: false
      };
      var planName = '';
      var exceptionText = '';

      function emptyDraft() {
        return {
          mainId: null,
          coachIds: [null, null, null, null],
          equipment: ['', '', '', '', ''],
          notes: ['', ''],
          note: ''
        };
      }

      function currentScene() {
        for (var i = 0; i < scenarios.length; i++) if (scenarios[i].id === state.sceneId) return scenarios[i];
        return scenarios[0];
      }

      function currentDirection() {
        for (var i = 0; i < directions.length; i++) if (directions[i].id === state.directionId) return directions[i];
        return directions[0];
      }

      function sceneKey() {
        return state.sceneId === 'saint' ? 'saint:' + state.mountainId : state.sceneId;
      }

      function sceneLabel() {
        var sc = currentScene();
        if (state.sceneId === 'saint') {
          var m = saintMountains[state.mountainId];
          return sc.name + ' · ' + (m ? m.name : state.mountainId) + (m && m.character ? '（' + m.character + '）' : '（角色待补）');
        }
        return sc.name;
      }

      function mainCharacter() {
        return state.draft.mainId != null ? byId[String(state.draft.mainId)] || null : null;
      }

      /* ---------------- 适配度 ---------------- */
      function charTagText(c) {
        var parts = [];
        (c.derived && c.derived.functionalTags ? c.derived.functionalTags : []).forEach(function (t) { parts.push(t); });
        (c.derived && c.derived.trainingTalents ? c.derived.trainingTalents : []).forEach(function (t) {
          parts.push(t.talent + ' ' + t.category);
        });
        (c.derived && c.derived.knownStreamTalents ? c.derived.knownStreamTalents : []).forEach(function (t) {
          parts.push(t.talent + ' ' + t.category);
        });
        (c.skills || []).forEach(function (s) { parts.push(s.name + ' ' + (s.summary || '')); });
        parts.push(c.style || '', c.positionDesc || '', c.styleDesc || '');
        return parts.join(' ');
      }

      function defaultFit(character) {
        if (!character) return { value: '不适配', reason: '未选择角色', manual: false };
        var dir = currentDirection();
        var sc = currentScene();
        var overrides = store ? store.getFitOverride(character.contentId, sceneKey(), dir.id) : null;
        if (overrides) return { value: overrides, reason: '人工覆盖（可恢复默认）', manual: true };
        // 圣山角色：对应圣山角色直接适配
        var mountain = state.sceneId === 'saint' ? saintMountains[state.mountainId] : null;
        if (mountain && mountain.character && character.name === mountain.character) {
          return { value: '适配', reason: '圣山对应角色：' + mountain.character, manual: false };
        }
        var roles = character.roles || [];
        if (roles.indexOf(dir.role) < 0) {
          var tag = charTagText(character);
          var hits = dir.keywords.filter(function (k) { return tag.indexOf(k) >= 0; }).length;
          if (hits >= 3) return { value: '需特定技能组合', reason: '定位不符但技能/天赋关键词命中 ' + hits + ' 项', manual: false };
          return { value: '不适配', reason: '定位不符（' + (roles.join('/') || '无定位') + '），技能关键词命中不足', manual: false };
        }
        // 得分手内部区分攻框/三分：按六维比较主攻方向
        if (dir.id === 'drive' || dir.id === 'three') {
          var s = character.stats || {};
          var driveScore = ((Number(s['攻筐']) || 0) + (Number(s['突破']) || 0)) / 2;
          var threeScore = Number(s['投射']) || 0;
          var better = driveScore >= threeScore ? 'drive' : 'three';
          if (better !== dir.id) {
            return { value: '需特定技能组合', reason: '同为得分手，但六维更偏 ' + (better === 'drive' ? '攻框/突破' : '投射') + '（图鉴参考值）', manual: false };
          }
          return { value: '适配', reason: '定位命中（得分手）+ 六维更偏本方向', manual: false };
        }
        var tagText = charTagText(character);
        var kwHits = dir.keywords.filter(function (k) { return tagText.indexOf(k) >= 0; }).length;
        return {
          value: '适配',
          reason: '定位命中（' + dir.role + '）' + (kwHits ? '，技能关键词命中 ' + kwHits + ' 项' : ''),
          manual: false
        };
      }

      function fitOf(character) {
        return defaultFit(character);
      }

      /* ---------------- 角色养成配法（需求 #2b） ---------------- */
      function dirById(id) {
        for (var i = 0; i < directions.length; i++) if (directions[i].id === id) return directions[i];
        return null;
      }

      function dirStatValue(dirId, stats) {
        if (dirId === 'drive') return (statNum(stats, '攻筐') + statNum(stats, '突破')) / 2;
        if (dirId === 'three') return statNum(stats, '投射');
        if (dirId === 'defense') return (statNum(stats, '防投') + statNum(stats, '护筐')) / 2;
        if (dirId === 'playmaking') return statNum(stats, '传球');
        if (dirId === 'rebound') return statNum(stats, '护筐');
        return 0;
      }

      function dirStatLabel(dirId) {
        return {
          drive: '攻筐/突破',
          three: '投射',
          defense: '防投/护筐',
          playmaking: '传球',
          rebound: '护筐（代理）'
        }[dirId] || '六维';
      }

      function skillHitsFor(character, dirId) {
        var keywords = DIR_SKILL_KEYWORDS[dirId] || [];
        var text = (character.skills || []).map(function (s) {
          return s.name + ' ' + (s.summary || '') + ' ' + (s.type || '');
        }).join(' ');
        return keywords.filter(function (k) { return text.indexOf(k) >= 0; });
      }

      /**
       * 启发式推荐：roles + 位置落位 + 六维 + 技能文本关键词。
       * 输出主推/备选方向 + 理由；标注「启发式推断」。
       */
      function recommendBuild(character) {
        var pos = posBase(character.role);
        var roles = character.roles || [];
        var stats = character.stats || {};
        var posRule = POSITION_RULES[pos] || { area: '待补', baseSkills: [] };
        var scored = directions.map(function (dir) {
          var score = 0;
          var reasons = [];
          if (roles.indexOf(dir.role) >= 0) {
            var roleBonus = dir.id === 'drive' ? 3.2 : dir.id === 'three' ? 2.8 : dir.id === 'rebound' ? 2.2 : 3;
            score += roleBonus;
            reasons.push('定位命中：' + dir.role);
          }
          var boost = (POS_BOOST[pos] || {})[dir.id] || 0;
          score += boost;
          if (boost > 0) reasons.push('位置利好：' + pos + '落位（' + posRule.area + '）');
          else if (boost < 0) reasons.push('位置约束：' + pos + '落位不利于本方向');
          var value = dirStatValue(dir.id, stats);
          if (value > 0) {
            score += (value / 100) * 0.8;
            reasons.push('六维（' + dirStatLabel(dir.id) + '）：' + Math.round(value));
          }
          var hits = skillHitsFor(character, dir.id);
          if (hits.length) {
            score += Math.min(hits.length, 3) * 0.7;
            reasons.push('技能文本命中：' + hits.join('/'));
          }
          // 三分潜力加成：高投射或技能含三分/中投时，即使位置不利也列为备选
          if (dir.id === 'three') {
            if (statNum(stats, '投射') >= 200 || hits.length >= 2) {
              score += 0.6;
              reasons.push('三分潜力：投射 ' + statNum(stats, '投射') + (hits.length ? '，技能含 ' + hits.join('/') : ''));
            }
          }
          return { direction: dir, score: Math.round(score * 100) / 100, reasons: reasons };
        });
        scored.sort(function (a, b) { return b.score - a.score || a.direction.id.localeCompare(b.direction.id); });
        var primary = scored[0];
        var backup = scored[1];
        var notes = [];
        if (backup && backup.direction.id === 'three' &&
          (statNum(stats, '投射') >= 200 || skillHitsFor(character, 'three').length)) {
          notes.push(
            '有三分潜力：投射 ' + statNum(stats, '投射') +
            '；' + pos + '落位要打三分需换小前/分卫或补后撤/横撤类技能（见下方补丁规则）'
          );
        }
        return {
          position: pos,
          area: posRule.area,
          baseSkills: posRule.baseSkills,
          primary: primary,
          backup: backup,
          scored: scored,
          notes: notes
        };
      }

      /** 位置约束与补丁技能规则（knowledge/比赛机制_攻防回合.md §6.2）。 */
      function patchRulesFor(character, targetDirId, altPosition) {
        var pos = altPosition || posBase(character.role) || '未知';
        var rule = POSITION_RULES[pos] || { area: '待补', baseSkills: [] };
        var skillText = (character.skills || []).map(function (s) { return s.name + ' ' + (s.summary || ''); }).join(' ');
        var rules = [];
        if (targetDirId === 'three') {
          if (pos === '大前' || pos === '小前') {
            rules.push({
              level: '必需',
              need: '后撤 / 横撤 类技能',
              why: pos + '落位在' + rule.area + '，不能直接获得三分线外出手；后撤可退到三分线外（横撤仍在三分线外）',
              from: '器材固定技能：三分/横撤/后撤/快速三分/大力三分；或角色自带技能'
            });
            rules.push({
              level: '建议',
              need: '三分类固定技能（三分/快速三分/大力三分）',
              why: '拉开到三分线外后仍需三分技能完成出手',
              from: '器材固定技能 / 角色技能'
            });
          } else if (pos === '中锋') {
            rules.push({
              level: '必需',
              need: '呼叫挡拆 + 跑外线战术',
              why: '中锋落位禁区且无速卡，需挡拆把中锋调到外线、对方中锋跟出后创造空位',
              from: '战术（呼叫挡拆）/ 队友配合'
            });
            rules.push({
              level: '建议',
              need: '三分 / 横撤 类固定技能',
              why: '跑出外线后仍需三分类技能完成出手',
              from: '器材固定技能'
            });
            rules.push({
              level: '待确认',
              need: '挡拆后中锋外线出手机制',
              why: '该机制来自视频 ASR 转述（§6.3/§6.5），待游戏内核验',
              from: 'knowledge §6.2/§6.3'
            });
          } else if (pos === '控卫') {
            rules.push({
              level: '已具备',
              need: '三分 + 横撤',
              why: '控卫落位三分线外，基础技能已含三分/横撤',
              from: '位置基础技能'
            });
            rules.push({
              level: '建议',
              need: '后撤（从线内退回三分线外）',
              why: '若落位被压到线内一步，后撤可重新获得三分出手',
              from: '角色技能 / 器材固定技能'
            });
          } else if (pos === '分卫') {
            rules.push({
              level: '已具备',
              need: '后撤（退回三分线外）',
              why: '分卫侧翼基础技能含后撤，可退出三分线外',
              from: '位置基础技能'
            });
            rules.push({
              level: '建议',
              need: '三分类固定技能',
              why: '基础技能不含三分，需器材/角色技能补三分出手',
              from: '器材固定技能：三分/横撤/后撤/快速三分/大力三分'
            });
          }
          var hasEquipThree = EQUIP_THREE_SKILLS.some(function (k) { return skillText.indexOf(k) >= 0; });
          if (hasEquipThree) rules.push({ level: '已具备', need: '角色技能含三分类关键词', why: '角色技能文本已出现三分/后撤/横撤相关词', from: '角色技能' });
        } else if (targetDirId === 'drive') {
          if (pos === '中锋') {
            rules.push({ level: '建议', need: '近筐终结 / 扣篮类技能', why: '中锋基础为勾手/扣篮，补强近筐终结', from: '角色技能 / 器材' });
          } else if (pos === '大前') {
            rules.push({ level: '已具备', need: '上篮 / 背打', why: '大前落位两分区，基础技能可直接攻框（近三秒区勾手，更远背打变突破）', from: '位置基础技能' });
          } else {
            rules.push({ level: '已具备', need: '突破 / 强突', why: '该位置基础技能包含突破类，可自然攻框', from: '位置基础技能' });
          }
        } else {
          rules.push({
            level: '已具备',
            need: '位置基础技能',
            why: '该方向为主位置自然方向，暂无强制补丁规则；如换位请以手动覆盖为准',
            from: '位置基础技能'
          });
        }
        return { position: pos, area: rule.area, baseSkills: rule.baseSkills, rules: rules, equipThreeSkills: EQUIP_THREE_SKILLS };
      }

      function loadBuildForMain() {
        var main = mainCharacter();
        if (!main) {
          state.build = null;
          state.buildSaved = false;
          return;
        }
        var rec = recommendBuild(main);
        var saved = store ? store.getCharacterBuild(main.contentId) : null;
        if (saved) {
          state.build = {
            directionId: saved.directionId || rec.primary.direction.id,
            altPosition: saved.altPosition || null,
            note: saved.note || '',
            patchesNote: saved.patchesNote || '',
            equipment: (saved.equipment || []).map(function (x) { return { name: x.name, skill: x.skill, source: x.source }; }),
            skills: (saved.skills || []).map(function (s) { return { name: s.name, source: s.source, required: s.required }; })
          };
          state.buildSaved = true;
        } else {
          state.build = {
            directionId: rec.primary.direction.id,
            altPosition: null,
            note: '',
            patchesNote: '',
            equipment: [],
            skills: []
          };
          state.buildSaved = false;
        }
      }

      function saveBuild() {
        var main = mainCharacter();
        if (!main || !store || !state.build) return;
        var res = store.saveCharacterBuild(main.contentId, state.build);
        if (res.ok) {
          state.buildSaved = true;
          renderPage();
          if (ctx.toast) ctx.toast('养成配法已保存：' + main.name, 'ok');
        } else if (ctx.toast) {
          ctx.toast('保存失败：' + res.errors.join('；'), 'warn');
        }
      }

      /* ---------------- 需求 #2c：技能规划（7 槽 = 5 三选一 + 1 天赋事件 + 1 转盘） ---------------- */
      function skillCandidatesFromRules(rules) {
        var out = [];
        (rules || []).forEach(function (rule) {
          if (rule.level !== '必需' && rule.level !== '建议') return;
          var need = String(rule.need || '');
          if (need.indexOf('后撤') >= 0 && out.indexOf('后撤') < 0) out.push({ name: '后撤', required: rule.level === '必需' });
          if (need.indexOf('横撤') >= 0 && out.indexOf('横撤') < 0) out.push({ name: '横撤', required: rule.level === '必需' });
          if (need.indexOf('三分类') >= 0) {
            ['三分', '快速三分', '大力三分'].forEach(function (s) {
              out.push({ name: s, required: false });
            });
          }
          if (need.indexOf('呼叫挡拆') >= 0) out.push({ name: '呼叫挡拆', required: true });
          if (need.indexOf('跑外线') >= 0) out.push({ name: '跑外线', required: true });
        });
        return out;
      }

      function skillPlanForBuild(main, dirId) {
        var entries = [];
        function add(name, source, required) {
          if (!name) return;
          String(name).split(/[\/、,，]/).forEach(function (part) {
            var v = part.trim();
            if (!v) return;
            entries.push({ name: v, source: source, required: !!required });
          });
        }
        (main.roles || []).forEach(function (role) {
          (ROLE_SKILL_POOL[role] || []).forEach(function (s) { add(s, '定位池', false); });
        });
        var patch = patchRulesFor(main, dirId, state.build ? state.build.altPosition : null);
        skillCandidatesFromRules(patch.rules).forEach(function (s) {
          add(s.name, '定位池', s.required);
        });
        // 来自器材页「按角色配置」的器材标注技能（若已配置）
        var eqBuild = store ? store.getEquipmentBuild(main.contentId, dirId) : null;
        if (eqBuild) {
          (eqBuild.equipmentIds || []).forEach(function (eqId) {
            var link = store ? store.getEquipmentLink(eqId) : null;
            if (link && link.manualSkill) add(link.manualSkill, '器材', false);
          });
          (eqBuild.manualSkills || []).forEach(function (s) {
            add(s.name, s.source === '转盘' ? '转盘' : s.source === '天赋事件' ? '天赋事件' : '器材', s.required);
          });
        }
        (state.build && state.build.skills ? state.build.skills : []).forEach(function (s) {
          add(s.name, s.source || '手动', s.required);
        });
        var seen = Object.create(null);
        var deduped = [];
        entries.forEach(function (e) {
          if (!seen[e.name]) {
            seen[e.name] = { name: e.name, sources: [e.source], required: e.required };
            deduped.push(seen[e.name]);
          } else {
            if (seen[e.name].sources.indexOf(e.source) < 0) seen[e.name].sources.push(e.source);
            if (e.required) seen[e.name].required = true;
          }
        });
        var conflicts = deduped.filter(function (e) { return e.sources.length > 1; });
        var talentCount = deduped.filter(function (e) { return e.sources.indexOf('天赋事件') >= 0; }).length;
        var wheelCount = deduped.filter(function (e) { return e.sources.indexOf('转盘') >= 0; }).length;
        var triCount = deduped.filter(function (e) {
          return e.sources.indexOf('天赋事件') < 0 && e.sources.indexOf('转盘') < 0;
        }).length;
        var equipmentSkills = [];
        if (eqBuild) {
          (eqBuild.equipmentIds || []).forEach(function (eqId) {
            var link = store ? store.getEquipmentLink(eqId) : null;
            if (link && link.manualSkill) equipmentSkills.push(link.manualSkill.trim());
          });
        }
        var duplicateEquipment = equipmentSkills.filter(function (s, i, arr) { return arr.indexOf(s) !== i; });
        return {
          entries: deduped,
          conflicts: conflicts,
          talentCount: talentCount,
          wheelCount: wheelCount,
          triCount: triCount,
          duplicateEquipment: duplicateEquipment
        };
      }

      function skillPlanHtml(main, targetId) {
        var plan = skillPlanForBuild(main, targetId);
        var overCap = plan.triCount > 5 || plan.talentCount > 1 || plan.wheelCount > 1;
        var rows = plan.entries.map(function (e) {
          return (
            '<tr><td>' + esc(e.name) + (e.required ? ' <span class="badge badge--warn">必需</span>' : '') + '</td>' +
            '<td>' + esc(e.sources.join(' / ')) + '</td>' +
            '<td>' + (e.sources.length > 1 ? '<span class="badge badge--warn">同名冲突/已去重</span>' : '<span class="badge badge--ok">唯一</span>') + '</td></tr>'
          );
        }).join('');
        var manual = (state.build && state.build.skills ? state.build.skills : []).map(function (s, i) {
          return (
            '<div class="equip-candidate"><span class="small"><strong>' + esc(s.name) + '</strong> · 来源 ' + esc(s.source || '手动') +
            (s.required ? ' · 必需' : '') + '</span>' +
            '<button type="button" class="btn btn--xs btn--ghost" data-build-skill-remove="' + i + '">删除</button></div>'
          );
        }).join('');
        return (
          '<div class="card card--pad" id="build-skill-plan" style="box-shadow:none;margin-top:12px">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧠</span>技能规划 · 7 槽位</div>' +
          '<div class="card-sub">5 个三选一（前 5 场获胜各 1 次）+ 1 个天赋事件（金/蓝两档随机其一）+ 1 个转盘「随机属性精通」（待确认）。</div></div>' +
          '<span class="badge ' + (overCap ? 'badge--warn' : 'badge--ok') + '">' + plan.entries.length + ' / 7</span></div>' +
          '<div class="small muted">三选一技能 ' + plan.triCount + ' / 5 · 天赋事件 ' + plan.talentCount + ' / 1 · 转盘 ' +
          plan.wheelCount + ' / 1' + (overCap ? ' · <span class="tag tag--orange">超出对应槽位，需要取舍</span>' : '') + '</div>' +
          '<div class="table-wrap" style="margin-top:8px"><table class="table"><thead><tr><th>技能名</th><th>来源</th><th>同名冲突</th></tr></thead><tbody>' +
          (rows || '<tr><td colspan="3" class="small muted">暂无自动技能。</td></tr>') + '</tbody></table></div>' +
          (plan.conflicts.length
            ? '<div class="notice notice--warn" style="margin-top:6px"><span class="notice-ico">⚠️</span><span>同名去重：' +
              esc(plan.conflicts.map(function (e) { return e.name + '（' + e.sources.join('/') + '）'; }).join('；')) +
              '。同名技能全局只学一次（器材/笔记/天赋事件/转盘同技能不重复生效）。</span></div>'
            : '') +
          (plan.duplicateEquipment.length
            ? '<div class="notice notice--warn" style="margin-top:6px"><span class="notice-ico">🎒</span><span>器材技能重复：' +
              esc(plan.duplicateEquipment.join('、')) + '。器材技能重复时建议少带器材，可多刷角色自身技能。</span></div>'
            : '') +
          '<div class="small muted" style="margin-top:6px">同名技能全局只学一次；器材技能重复时建议少带器材，可多刷角色自身技能（带满 5 器材 + 2 笔记会显著压缩三选一候选池）。</div>' +
          '<div class="team-sub-label">手动技能（可增删改并随配法保存）</div>' +
          '<div class="equip-candidates">' + (manual || '<div class="small muted">暂无手动技能。</div>') + '</div>' +
          '<div class="row" style="gap:6px;margin-top:8px;flex-wrap:wrap">' +
          '<input class="input" id="build-skill-name" type="text" maxlength="60" placeholder="技能名（例：后撤/看破）" style="max-width:180px">' +
          '<select class="select" id="build-skill-source">' +
          ['定位池', '器材', '笔记', '天赋事件', '转盘', '手动'].map(function (s) {
            return '<option value="' + esc(s) + '">' + esc(s) + '</option>';
          }).join('') + '</select>' +
          '<label class="small"><input type="checkbox" id="build-skill-required"> 必需</label>' +
          '<button type="button" class="btn btn--sm" id="build-skill-add">添加技能</button></div>' +
          '<div class="small muted" style="margin-top:6px">自动来源：定位并集（启发式占位）+ 位置补丁必需/建议 + 器材页手动标注；同名去重后与 7 槽对照。</div></div>'
        );
      }

      /* ---------------- 列表 ---------------- */
      function filteredCharacters() {
        var dir = currentDirection();
        var q = state.search.trim();
        var list = characters.filter(function (c) {
          if (q && String(c.name).indexOf(q) < 0) return false;
          if (state.filterRole !== '全部' && (c.roles || []).indexOf(state.filterRole) < 0) return false;
          if (state.filterFit !== '全部' && fitOf(c).value !== state.filterFit) return false;
          return true;
        });
        list.sort(function (a, b) {
          var fa = FIT_VALUES.indexOf(fitOf(a).value);
          var fb = FIT_VALUES.indexOf(fitOf(b).value);
          if (fa !== fb) return fa - fb;
          var ra = a.derived && a.derived.rosterRank ? Number(a.derived.rosterRank) : 9999;
          var rb = b.derived && b.derived.rosterRank ? Number(b.derived.rosterRank) : 9999;
          return ra - rb;
        });
        return list;
      }

      function listHtml() {
        var list = filteredCharacters();
        if (!list.length) {
          return '<div class="notice notice--info" style="margin:10px 0"><span class="notice-ico">🔍</span><span>没有匹配的球员。</span></div>';
        }
        return list
          .map(function (c) {
            var fit = fitOf(c);
            var roles = (c.roles || []).map(function (r) { return '<span class="tag">' + esc(r) + '</span>'; }).join('');
            var exception = store ? store.getException(c.contentId) : '';
            var active = state.activeSlot ? false : state.draft.mainId === String(c.contentId);
            return (
              '<div class="team-char' + (active ? ' is-active' : '') + '" data-team-char="' + esc(c.contentId) + '">' +
              '<button type="button" class="team-char-main" data-team-pick="' + esc(c.contentId) + '">' +
              '<span class="team-char-name">' + esc(c.name) + '</span>' +
              '<span class="team-char-meta">' + esc(c.rarity || '—') + ' · ' + esc(c.role || '—') + '</span>' +
              '<span class="row" style="gap:4px;margin-top:4px;flex-wrap:wrap">' + roles + '</span>' +
              '</button>' +
              '<span class="team-char-fit"><span class="badge ' + (FIT_CLASS[fit.value] || 'badge--neutral') +
              '" title="' + esc(fit.reason) + '">' + esc(FIT_SHORT[fit.value] || fit.value) + '</span>' +
              (exception ? '<span class="tag tag--orange" title="' + esc(exception) + '">例外</span>' : '') +
              '<button type="button" class="btn btn--xs btn--ghost" data-fit-edit="' + esc(c.contentId) + '" title="手动修改适配度">改</button>' +
              '</span></div>'
            );
          })
          .join('');
      }

      /* ---------------- 槽位 ---------------- */
      function charSlotHtml(kind, index, id, label) {
        var c = id != null ? byId[String(id)] : null;
        var active = state.activeSlot && state.activeSlot.type === kind && (kind === 'main' || state.activeSlot.index === index);
        return (
          '<div class="team-slot' + (c ? ' is-filled' : '') + (active ? ' is-selecting' : '') + '">' +
          '<div class="team-slot-label">' + esc(label) + '</div>' +
          (c
            ? '<div class="team-slot-body"><span class="team-slot-name">' + esc(c.name) + '</span>' +
              '<span class="small muted">' + esc(c.rarity || '—') + ' · ' + esc(c.role || '—') + '</span>' +
              '<span class="team-slot-actions">' +
              '<button type="button" class="btn btn--xs" data-slot="' + kind + (kind === 'coach' ? ':' + index : '') + '">更换</button>' +
              '<button type="button" class="btn btn--xs btn--ghost" data-slot-clear="' + kind + (kind === 'coach' ? ':' + index : '') + '">清空</button>' +
              '</span></div>'
            : '<button type="button" class="team-slot-empty" data-slot="' + kind + (kind === 'coach' ? ':' + index : '') + '">＋ 选择' + esc(label) + '</button>') +
          '</div>'
        );
      }

      function plansForList() {
        if (!store) return [];
        return store.listTeamPlans().sort(function (a, b) {
          return String(b.updatedAt).localeCompare(String(a.updatedAt));
        });
      }

      function plansHtml() {
        var plans = plansForList();
        if (!plans.length) {
          return '<div class="player-missing">还没有保存的方案。填好槽位后点「保存当前方案」。</div>';
        }
        return (
          '<div class="team-plan-list">' +
          plans.map(function (p) {
            var sc = scenarios.filter(function (x) { return p.sceneId.indexOf(x.id) === 0; })[0];
            var dir = directions.filter(function (x) { return x.id === p.directionId; })[0];
            var main = p.mainId != null ? charName(byId, p.mainId) : '无主练';
            return (
              '<div class="team-plan" data-plan-id="' + esc(p.id) + '">' +
              '<div class="team-plan-main"><strong>' + esc(p.name) + '</strong>' +
              '<div class="small muted">' + esc((sc ? sc.name : p.sceneId) + ' · ' + (dir ? dir.name : p.directionId) + ' · 主练 ' + main) + '</div></div>' +
              '<div class="row" style="gap:4px"><button type="button" class="btn btn--xs" data-plan-load="' + esc(p.id) + '">读取</button>' +
              '<button type="button" class="btn btn--xs btn--ghost" data-plan-delete="' + esc(p.id) + '">删除</button></div>' +
              '</div>'
            );
          }).join('') +
          '</div>'
        );
      }

      /* ---------------- 心愿事件 · 大成功规则（数据：tool/src/data/wish.js） ---------------- */
      function wishData() {
        return (typeof window !== 'undefined' && window.BBTWishData) || null;
      }
      function wishInfoOf(c) {
        var W = wishData();
        if (!c || !W || !W.byName) return null;
        return W.byName[c.name] || null;
      }
      function wishCardHtml() {
        var main = mainCharacter();
        if (!main) return '';
        var w = wishInfoOf(main);
        if (!w) {
          return '<div class="card card--pad" id="build-wish"><div class="card-head"><div><div class="card-title"><span class="ico">💭</span>心愿事件 · 大成功规则</div><div class="card-sub">' + esc(main.name) + '</div></div><span class="badge badge--neutral">数据待补</span></div><div class="player-missing" style="margin-top:8px">该角色暂无心愿事件数据（可能为蓝品质角色/未实装）。</div></div>';
        }
        if (w.noWish) {
          return '<div class="card card--pad" id="build-wish"><div class="card-head"><div><div class="card-title"><span class="ico">💭</span>心愿事件 · ' + esc(main.name) + '</div><div class="card-sub">该角色无心愿事件</div></div><span class="badge badge--neutral">无心愿</span></div>' +
            '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">ℹ️</span><span>' + esc(w.rule) + '</span></div></div>';
        }
        var confClass = w.confidenceLabel && w.confidenceLabel.indexOf('实测') === 0 ? 'badge--ok' : (w.confidenceLabel && w.confidenceLabel.indexOf('基本可信') === 0 ? 'badge--warn' : 'badge--neutral');
        return '<div class="card card--pad" id="build-wish">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">💭</span>心愿事件 · 大成功规则 · ' + esc(main.name) + '</div>' +
          '<div class="card-sub">' + esc(w.wishType) + ' · 判定方式：' + esc(w.judgeStyle) + ' · 同类型 ' + esc(w.memberCount) + ' 人' +
          (w.memberCount > 1 ? '（' + esc(w.sameTypeMembers.join('、')) + '）' : '') + '</div></div>' +
          '<span class="badge ' + confClass + '">' + esc(w.confidenceLabel) + '</span></div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🎯</span><span><strong>大成功条件：</strong>' + esc(w.rule) + '</span></div>' +
          (w.evidence ? '<div class="small muted" style="margin-top:6px">依据：' + esc(w.evidence) + '</div>' : '') +
          '<div class="small muted" style="margin-top:4px">口径：用户实机实测 = 客户端实测证据（完全可信）；推测 = 基本可信（仅心愿这一项）。</div>' +
          '</div>';
      }

      function buildCardHtml() {
        var main = mainCharacter();
        if (!main) {
          return (
            '<div class="card card--pad" id="build-card">' +
            '<div class="card-head"><div><div class="card-title"><span class="ico">🛠️</span>角色养成配法</div>' +
            '<div class="card-sub">选中主练后显示推荐方向、位置约束、补丁技能与器材固定技能。</div></div></div>' +
            '<div class="player-missing">先选择主练（可在左侧列表点选或点主练槽）。</div></div>'
          );
        }
        if (!state.build) loadBuildForMain();
        var rec = recommendBuild(main);
        var targetId = state.build && dirById(state.build.directionId) ? state.build.directionId : rec.primary.direction.id;
        var target = dirById(targetId);
        var altPosition = state.build ? state.build.altPosition : null;
        var patch = patchRulesFor(main, targetId, altPosition);
        var levelClass = { 必需: 'badge--warn', 建议: 'badge--info', 已具备: 'badge--ok', 待确认: 'badge--neutral' };
        var manualNote = targetId !== rec.primary.direction.id
          ? '<div class="small muted" style="margin-top:4px">目标方向为人工指定，覆盖推荐主推（' + esc(rec.primary.direction.name) + '）。</div>'
          : '';
        var equipRows = (state.build.equipment || []).map(function (item, i) {
          return (
            '<div class="build-equip-row" data-build-equip="' + i + '">' +
            '<input class="input" data-build-equip-name="' + i + '" type="text" maxlength="60" placeholder="器材名" value="' + esc(item.name) + '">' +
            '<input class="input" data-build-equip-skill="' + i + '" type="text" maxlength="120" placeholder="固定技能（例：后撤/三分）" value="' + esc(item.skill) + '">' +
            '<input class="input" data-build-equip-source="' + i + '" type="text" maxlength="120" placeholder="来源/备注" value="' + esc(item.source) + '">' +
            '<button type="button" class="btn btn--xs btn--ghost" data-build-equip-remove="' + i + '">删除</button>' +
            '</div>'
          );
        }).join('');
        return (
          '<div class="card card--pad" id="build-card">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🛠️</span>角色养成配法 · ' + esc(main.name) + '</div>' +
          '<div class="card-sub">单角色推荐养成方向 + 位置约束/补丁 + 器材固定技能（需求 #2b）。</div></div>' +
          '<span class="badge badge--warn">启发式推断</span>' +
          (state.buildSaved ? '<span class="badge badge--ok">已保存</span>' : '') + '</div>' +
          '<div class="grid grid--2" style="gap:12px">' +
          '<div class="field"><label class="field-label" for="build-direction"><span class="label-text">目标方向（可手动覆盖）</span></label>' +
          '<select class="select" id="build-direction">' +
          directions.map(function (d) {
            return '<option value="' + esc(d.id) + '"' + (d.id === targetId ? ' selected' : '') + '>' + esc(d.name) + '</option>';
          }).join('') +
          '</select>' + manualNote + '</div>' +
          '<div class="field"><label class="field-label" for="build-alt-position"><span class="label-text">可换位置（位置适性数据待补，先手动标注）</span>' +
          '<span class="badge badge--warn">数据待补</span></label>' +
          '<select class="select" id="build-alt-position">' +
          '<option value=""' + (!altPosition ? ' selected' : '') + '>不换位（主位置：' + esc(posBase(main.role) || '—') + '）</option>' +
          POSITION_OPTIONS.map(function (p) {
            return '<option value="' + esc(p) + '"' + (altPosition === p ? ' selected' : '') + '>' + esc(p) + '（手动标注）</option>';
          }).join('') +
          '</select></div>' +
          '</div>' +
          // 推荐
          '<div class="build-reco" id="build-reco">' +
          '<div class="build-reco-head"><span class="tag tag--orange">主推</span><strong>' + esc(rec.primary.direction.name) + '</strong>' +
          '<span class="small muted">评分 ' + esc(rec.primary.score) + ' / 启发式</span></div>' +
          '<ul class="build-reasons">' +
          rec.primary.reasons.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') +
          '</ul>' +
          (rec.backup
            ? '<div class="build-reco-head" style="margin-top:8px"><span class="tag">备选</span><strong>' +
              esc(rec.backup.direction.name) + '</strong><span class="small muted">评分 ' + esc(rec.backup.score) + '</span></div>' +
              '<ul class="build-reasons">' +
              rec.backup.reasons.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') +
              '</ul>'
            : '') +
          (rec.notes.length
            ? '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🎯</span><span>' +
              esc(rec.notes.join('；')) + '</span></div>'
            : '') +
          '<div class="small muted" style="margin-top:6px">依据：roles + 位置落位 + 六维参考值 + 技能描述关键词；置信度：启发式推断（可手动覆盖）。</div>' +
          '</div>' +
          // 位置约束与补丁
          '<div class="team-sub-label">当前位置与补丁（knowledge/比赛机制_攻防回合.md §6.2）<span class="badge badge--info">规则来自机制文档</span></div>' +
          '<div class="build-position">' +
          '<span class="tag tag--orange">当前：' + esc(patch.position) + '</span>' +
          '<span class="small muted">落位：' + esc(patch.area) + '</span>' +
          '<span class="small muted">基础技能：' + esc(patch.baseSkills.join(' / ')) + '</span>' +
          '</div>' +
          '<div class="build-patch-list">' +
          patch.rules.map(function (r) {
            return (
              '<div class="build-patch">' +
              '<span class="badge ' + (levelClass[r.level] || 'badge--neutral') + '">' + esc(r.level) + '</span>' +
              '<div class="build-patch-body"><strong>' + esc(r.need) + '</strong>' +
              '<div class="small muted">' + esc(r.why) + '</div>' +
              '<div class="small muted">来源：' + esc(r.from) + '</div></div></div>'
            );
          }).join('') +
          '</div>' +
          '<div class="small muted" style="margin-top:6px">三分类固定技能可来自器材：' +
          EQUIP_THREE_SKILLS.map(function (k) { return '<span class="tag">' + esc(k) + '</span>'; }).join(' ') +
          '（器材库数据待补，先手动录入）。补丁人工覆盖/备注：</div>' +
          '<textarea class="input" id="build-patches-note" rows="2" maxlength="1000" placeholder="例：实际用后撤器材补三分；中锋挡拆战术待确认…">' +
          esc(state.build.patchesNote || '') + '</textarea>' +
          // 需求 #2c：技能规划（7 槽 = 5 三选一 + 1 天赋事件 + 1 转盘）
          skillPlanHtml(main, targetId) +
          // 器材固定技能（手动）
          '<div class="team-sub-label">器材固定技能搭配（手动录入 · 数据待补）<span class="badge badge--warn">待接入 equipment_merged.json</span></div>' +
          '<div id="build-equipment">' + (equipRows || '<div class="player-missing">暂无器材录入；后续从 data/structured/guides_cleaned/equipment_merged.json 接入。</div>') + '</div>' +
          '<div class="row" style="margin-top:8px"><button type="button" class="btn btn--sm" id="build-equip-add">＋ 添加器材</button></div>' +
          // 配法笔记
          '<div class="team-sub-label">配法笔记（每角色独立持久化）</div>' +
          '<textarea class="input" id="build-note" rows="3" maxlength="2000" placeholder="记录该角色的养成配法、器材替换、实战感受…">' +
          esc(state.build.note || '') + '</textarea>' +
          '<div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap">' +
          '<button type="button" class="btn btn--primary btn--sm" id="build-save">保存养成配法</button>' +
          '<button type="button" class="btn btn--sm btn--ghost" id="build-reset">恢复默认推荐</button>' +
          '<span class="small muted">来源：knowledge/比赛机制_攻防回合.md §6.2 + claims + 角色数据；数据缺口处已标注。</span>' +
          '</div>' +
          '</div>'
        );
      }

      function panelHtml() {
        var sc = currentScene();
        var dir = currentDirection();
        var mountain = state.sceneId === 'saint' ? saintMountains[state.mountainId] : null;
        var main = mainCharacter();
        var fit = main ? fitOf(main) : null;
        var equipment = state.draft.equipment;
        var notes = state.draft.notes;
        return (
          '<div class="team-panel">' +
          // 场景提示
          '<div class="card card--pad" id="team-scene-info">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🎯</span>' + esc(sc.name) +
          ' · ' + esc(dir.name) + '</div><div class="card-sub">' + esc(sc.desc) + '</div></div>' +
          '<span class="badge badge--info">' + esc(sc.type) + '</span></div>' +
          (mountain
            ? '<div class="team-mountain"><span class="tag tag--orange">' + esc(mountain.name) + '</span>' +
              '<span>' + (mountain.boss || mountain.character ? '敌方 BOSS：' + esc(mountain.boss || mountain.character) : '<span class="badge badge--warn">圣山 BOSS 待补</span>') + '</span>' +
              (mountain.style ? '<span class="tag">' + esc(mountain.style) + ((mountain.cardColor || mountain.noSmallSkill) ? '（' + esc(mountain.cardColor || '无卡色') + '）' : '') + '/破盾</span>' : '') +
              '<span class="small muted">需求特性：' + esc((mountain.requiredTraits || []).join(' / ') || '待补') + '</span>' +
              '<span class="small muted">可偷分：' + esc((mountain.stealPoints || []).join(' / ') || '待补') + '</span>' +
              (mountain.breakRule ? '<span class="small muted">破盾：' + esc(mountain.breakRule) + '</span>' : '') +
              (mountain.noSmallSkill ? '<span class="badge badge--warn">无小技能可破盾</span>' : '') +
              '</div>'
            : '') +
          '<div class="small muted" style="margin-top:6px">' + esc(sc.source) + ' · 置信度：' + esc(sc.confidence) + '</div>' +
          (state.sceneId === 'saint' ? '<div class="small muted" style="margin-top:4px">圣山统一规则：BOSS 6 层圣山结晶（每层能量回复+20%）；按技能卡属性破盾（蓝=速卡/红=力卡/绿=技卡；紫=无色buff仅大招破2层），大招破2层/小技能破1层（须成功）；后期留层→BOSS全队属性大幅提升。认可度：非常认可+900/一般认可+300（每山3种）；胜利+20%但看运气，优先偷分。</div>' : '') +
          '</div>' +
          // 槽位
          '<div class="card card--pad" id="team-slots">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🏋️</span>队伍结构</div>' +
          '<div class="card-sub">主练 ×1 · 陪练 ×4 · 经理 ×1（锁定）· 器材 ≤5 · 笔记 ≤2</div></div>' +
          (state.activeSlot ? '<span class="badge badge--warn">选择中：' + (state.activeSlot.type === 'main' ? '主练' : '陪练 ' + (state.activeSlot.index + 1)) + '（从左侧列表点选）</span>' : '') +
          '</div>' +
          '<div class="team-grid">' +
          charSlotHtml('main', 0, state.draft.mainId, '主练') +
          '<div class="team-slot is-locked"><div class="team-slot-label">经理</div>' +
          '<div class="team-slot-body"><span class="team-slot-name">经理（锁定）</span>' +
          '<span class="small muted">固定位置，不可选</span></div></div>' +
          [0, 1, 2, 3].map(function (i) { return charSlotHtml('coach', i, state.draft.coachIds[i], '陪练 ' + (i + 1)); }).join('') +
          '</div>' +
          '<div class="team-sub-label">器材（≤5 · 器材库待补，先手动输入/标记）<span class="badge badge--warn">数据待补</span></div>' +
          '<div class="team-equip-row">' +
          equipment.map(function (v, i) {
            return '<input class="input team-equip" id="team-equip-' + i + '" data-equip-index="' + i +
              '" type="text" maxlength="60" placeholder="器材 ' + (i + 1) + '（待补/手动）" value="' + esc(v) + '">';
          }).join('') +
          '</div>' +
          '<div class="team-sub-label">笔记（≤2 · 笔记库待补，先手动输入/标记）<span class="badge badge--warn">数据待补</span></div>' +
          '<div class="team-equip-row">' +
          notes.map(function (v, i) {
            return '<input class="input team-equip" id="team-note-slot-' + i + '" data-note-slot="' + i +
              '" type="text" maxlength="80" placeholder="笔记 ' + (i + 1) + '（待补/手动）" value="' + esc(v) + '">';
          }).join('') +
          '</div>' +
          '<div class="small muted" style="margin-top:6px">器材/笔记库数据到位后替换为可选列表；当前输入会随方案保存。</div>' +
          '</div>' +
          // 适配度 / 例外
          '<div class="grid grid--2" style="align-items:start">' +
          '<div class="card card--pad" id="team-fit-card">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📐</span>适配度说明</div>' +
          '<div class="card-sub">角色 × 场景 × 方向；带「人工覆盖」标记的以你的修改为准。</div></div></div>' +
          (main
            ? '<div class="team-fit-main"><strong>' + esc(main.name) + '</strong>' +
              '<span class="badge ' + (FIT_CLASS[fit.value] || 'badge--neutral') + '">' + esc(fit.value) + '</span>' +
              (fit.manual ? '<span class="tag tag--orange">人工覆盖</span>' : '') + '</div>' +
              '<div class="small muted" style="margin-top:6px">判定依据：' + esc(fit.reason) + '</div>' +
              '<div class="row" style="margin-top:8px"><button type="button" class="btn btn--sm" data-fit-edit="' + esc(main.contentId) + '">修改适配度</button></div>'
            : '<div class="player-missing">先选择主练，再查看/修改适配度。</div>') +
          '</div>' +
          '<div class="card card--pad" id="team-exception-card">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🏷️</span>例外标注</div>' +
          '<div class="card-sub">例：白神 = 流派商店流，但功能是通用件。人工配置，随队伍持久化。</div></div></div>' +
          (main
            ? '<textarea class="input" id="team-exception" rows="2" maxlength="500" placeholder="例如：白神 = 流派商店流，但功能是通用件">' +
              esc(exceptionText || (store ? store.getException(main.contentId) : '')) + '</textarea>' +
              '<div class="row" style="margin-top:8px"><button type="button" class="btn btn--sm" id="team-exception-save">保存例外标注</button></div>'
            : '<div class="player-missing">先选择主练后填写例外标注。</div>') +
          '</div></div>' +
          // 心愿事件 · 大成功规则
          wishCardHtml() +
          // 角色养成配法（需求 #2b）
          buildCardHtml() +
          // 备注 + 保存
          '<div class="card card--pad" id="team-note-card">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">📝</span>方案备注</div>' +
          '<div class="card-sub">按「场景 + 方向 + 主练」为 key 保存；未保存方案也能先写备注。</div></div>' +
          (main ? '<span class="badge badge--neutral">key：' + esc(sceneKey() + '|' + dir.id + '|' + main.contentId) + '</span>' : '') + '</div>' +
          '<textarea class="input" id="team-note" rows="3" maxlength="2000" placeholder="这套配队的思路、替代位、注意事项…">' + esc(state.note) + '</textarea>' +
          '<div class="row" style="gap:8px;margin-top:10px;flex-wrap:wrap">' +
          '<button type="button" class="btn btn--sm" id="team-note-save">保存备注</button>' +
          '<input class="input" id="team-plan-name" type="text" maxlength="60" placeholder="方案名（默认自动）" value="' + esc(planName) + '" style="max-width:220px">' +
          '<button type="button" class="btn btn--primary btn--sm" id="team-save-plan">保存当前方案</button>' +
          '</div></div>' +
          // 方案列表
          '<div class="card card--pad" id="team-plans">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">💾</span>已保存方案</div>' +
          '<div class="card-sub">多套命名方案；导出用户配置时一并备份。</div></div></div>' +
          plansHtml() + '</div>' +
          '</div>'
        );
      }

      function bindBuildInputs() {
        if (!state.build) return;
        var dirSel = dom.qs('#build-direction', el);
        if (dirSel) {
          dirSel.addEventListener('change', function () {
            state.build.directionId = dirSel.value;
            renderPage();
          });
        }
        var posSel = dom.qs('#build-alt-position', el);
        if (posSel) {
          posSel.addEventListener('change', function () {
            state.build.altPosition = posSel.value || null;
            renderPage();
          });
        }
        var note = dom.qs('#build-note', el);
        if (note) {
          note.addEventListener('input', function () {
            state.build.note = note.value;
          });
        }
        var patchNote = dom.qs('#build-patches-note', el);
        if (patchNote) {
          patchNote.addEventListener('input', function () {
            state.build.patchesNote = patchNote.value;
          });
        }
        (state.build.equipment || []).forEach(function (item, i) {
          [['name', 'data-build-equip-name'], ['skill', 'data-build-equip-skill'], ['source', 'data-build-equip-source']].forEach(function (pair) {
            var node = dom.qs('[' + pair[1] + '="' + i + '"]', el);
            if (!node) return;
            node.addEventListener('input', function () {
              state.build.equipment[i][pair[0]] = node.value;
            });
          });
        });
      }

      function renderPage() {
        var listHost = dom.qs('#team-list', el);
        if (listHost) listHost.innerHTML = listHtml();
        var countEl = dom.qs('#team-list-count', el);
        if (countEl) countEl.textContent = filteredCharacters().length + ' / ' + characters.length;
        var panelHost = dom.qs('#team-panel', el);
        if (panelHost) panelHost.innerHTML = panelHtml();
        bindPanelInputs();
        bindBuildInputs();
      }

      function bindPanelInputs() {
        [0, 1, 2, 3, 4].forEach(function (i) {
          var inp = dom.qs('#team-equip-' + i, el);
          if (inp) {
            inp.addEventListener('input', function () {
              state.draft.equipment[i] = inp.value;
            });
          }
        });
        [0, 1].forEach(function (i) {
          var inp = dom.qs('#team-note-slot-' + i, el);
          if (inp) {
            inp.addEventListener('input', function () {
              state.draft.notes[i] = inp.value;
            });
          }
        });
        var note = dom.qs('#team-note', el);
        if (note) {
          note.addEventListener('input', function () {
            state.note = note.value;
          });
        }
        var name = dom.qs('#team-plan-name', el);
        if (name) {
          name.addEventListener('input', function () {
            planName = name.value;
          });
        }
        var ex = dom.qs('#team-exception', el);
        if (ex) {
          ex.addEventListener('input', function () {
            exceptionText = ex.value;
          });
        }
      }

      function setActiveSlot(spec) {
        state.activeSlot = spec;
        renderPage();
      }

      function assignSlot(contentId) {
        var setMain = false;
        if (!state.activeSlot) {
          // 没有选择中的槽位时，点列表 = 设为主练
          state.draft.mainId = String(contentId);
          syncNoteForMain();
          loadBuildForMain();
          setMain = true;
        } else if (state.activeSlot.type === 'main') {
          state.draft.mainId = String(contentId);
          syncNoteForMain();
          loadBuildForMain();
          setMain = true;
        } else if (state.activeSlot.type === 'coach') {
          state.draft.coachIds[state.activeSlot.index] = String(contentId);
        }
        state.activeSlot = null;
        renderPage();
        if (setMain && ctx.toast) {
          var c = byId[String(contentId)];
          var w = wishInfoOf(c);
          if (w && w.noWish) ctx.toast(c.name + '：无心愿事件（' + w.rule + '）', 'warn');
          else if (w) ctx.toast('心愿「' + w.wishType + '」大成功：' + String(w.rule).slice(0, 90) + '（' + w.confidenceLabel + '）', 'info');
          else ctx.toast((c ? c.name : '该角色') + '：暂无心愿事件数据', 'warn');
        }
      }

      function syncNoteForMain() {
        if (!store) return;
        state.note = store.getTeamNote(sceneKey(), state.directionId, state.draft.mainId);
        exceptionText = store.getException(state.draft.mainId);
      }

      function clearSlot(spec) {
        if (spec.type === 'main') {
          state.draft.mainId = null;
          state.note = '';
          exceptionText = '';
          state.build = null;
          state.buildSaved = false;
        } else if (spec.type === 'coach') {
          state.draft.coachIds[spec.index] = null;
        }
        state.activeSlot = null;
        renderPage();
      }

      function savePlan() {
        if (!store) return;
        var mainId = state.draft.mainId;
        if (!mainId) {
          if (ctx.toast) ctx.toast('请先选择主练', 'warn');
          return;
        }
        var dir = currentDirection();
        var res = store.saveTeamPlan({
          name: (planName || '').trim(),
          sceneId: sceneKey(),
          directionId: dir.id,
          mountainId: state.sceneId === 'saint' ? state.mountainId : null,
          mainId: mainId,
          coachIds: state.draft.coachIds.filter(Boolean),
          equipment: state.draft.equipment,
          notes: state.draft.notes,
          note: state.note
        });
        if (!res.ok) {
          if (ctx.toast) ctx.toast('保存失败：' + res.errors.join('；'), 'warn');
          return;
        }
        store.setTeamNote(sceneKey(), dir.id, mainId, state.note);
        planName = res.plan.name;
        if (ctx.toast) ctx.toast('方案已保存：' + res.plan.name, 'ok');
        renderPage();
      }

      function loadPlan(plan) {
        if (!plan) return;
        var sceneParts = String(plan.sceneId).split(':');
        state.sceneId = sceneParts[0];
        if (sceneParts[1]) state.mountainId = sceneParts[1];
        else if (plan.mountainId) state.mountainId = plan.mountainId;
        state.directionId = plan.directionId;
        state.draft = {
          mainId: plan.mainId,
          coachIds: [0, 1, 2, 3].map(function (i) { return plan.coachIds[i] || null; }),
          equipment: [0, 1, 2, 3, 4].map(function (i) { return plan.equipment[i] || ''; }),
          notes: [0, 1].map(function (i) { return plan.notes[i] || ''; }),
          note: plan.note || ''
        };
        state.note = plan.note || '';
        planName = plan.name;
        exceptionText = plan.mainId != null && store ? store.getException(plan.mainId) : '';
        state.activeSlot = null;
        loadBuildForMain();
        renderControls();
        renderPage();
        if (ctx.toast) ctx.toast('已读取方案：' + plan.name, 'ok');
      }

      function editFit(contentId) {
        var c = byId[String(contentId)];
        if (!c || !store) return;
        var current = store.getFitOverride(contentId, sceneKey(), state.directionId);
        var fallback = defaultFit(c);
        var m = dom.modal({
          title: '修改适配度：' + c.name,
          subtitle: sceneLabel() + ' · ' + currentDirection().name + '（当前默认：' + fallback.value + '）',
          bodyHtml:
            '<div class="notice notice--info"><span class="notice-ico">📐</span><span>' +
            '默认判定依据：' + esc(fallback.reason) + '。手动修改会持久化（按角色×场景×方向），可随时恢复默认。</span></div>' +
            '<div class="team-fit-options">' +
            FIT_VALUES.map(function (v) {
              return '<button type="button" class="btn btn--sm' + (current === v ? ' btn--primary' : '') +
                '" data-fit-set="' + esc(v) + '">' + esc(v) + '</button>';
            }).join('') +
            '<button type="button" class="btn btn--sm btn--ghost" data-fit-set="">恢复默认</button>' +
            '</div>',
          width: 560
        });
        m.body.querySelectorAll('[data-fit-set]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var value = btn.getAttribute('data-fit-set');
            store.setFitOverride(contentId, sceneKey(), state.directionId, value || null);
            m.close();
            renderPage();
            if (ctx.toast) ctx.toast(value ? '适配度已改为「' + value + '」' : '已恢复默认适配度', 'ok');
          });
        });
      }

      /* ---------------- 养成决策指南（时间段时间 × 流派） ---------------- */
      function decisionGuideHtml() {
        function row(a, b, c) {
          return '<tr><td>' + a + '</td><td>' + b + '</td><td>' + c + '</td></tr>';
        }
        return (
          '<div class="card card--pad" id="decision-guide">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧭</span>养成决策指南（时间段 × 流派）</div>' +
          '<div class="card-sub">玩家要的是「什么局面选什么」，不是逐条数值计算；下面为标准答案。</div></div>' +
          '<span class="badge badge--ok">实测标准</span></div>' +

          '<div class="team-sub-label">① 训练时间段（周一~周四，训练日）</div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>局面</th><th>该做什么</th><th>为什么</th></tr></thead><tbody>' +
          row('有经理位（黄条）', '<strong>训练</strong>（优先经理位）', '经理计数满 3 次 → 老虎机事件：蓝 +48 / 紫 +78 / 金 +102（失败 +12），单次期望约 70 属性，远高于训练本身') +
          row('没经理位 + 精力够下周打工', '休息或低价值训练（只为触发事件/技能/周目标）', '训练本体收益低（34/14 量级），不值得为属性消耗精力') +
          row('没经理位 + 精力不足', '<strong>休息</strong>（不佳+30 / 正常+80 / 充分+110，只补到上限）', '周末打工 3 次需 75 精力、2 次需 50 精力') +
          row('本周是海边合宿', '<strong>全训练</strong>（专注等级 MAX）', '合宿 4 天训练收益 = 专注等级 5 级；单次约 27/10 vs 常规 17/7') +
          row('触发事件（训练事件/怪味面包/球星卡等）', '非训练流：拿钱/精力；训练流：优先精力→属性→钱', '属性对扭蛋流训练日意义小；精力影响打工次数') +
          row('精力/时间富余', '优先把「事件/技能三选一/周目标」走掉', '事件才是训练日的真实收益来源') +
          '</tbody></table></div>' +

          '<div class="team-sub-label" style="margin-top:12px">② 出行时间段（周五~周日 / 周末活动）</div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>局面</th><th>该做什么</th><th>为什么</th></tr></thead><tbody>' +
          row('本周有周末活动', '按事件类型：步行街打折→买扭蛋；餐厅急招→打工；游戏厅打折/地狱游戏→属性；划船比赛→公园', '活动每周只概率触发 1 个，持续整个周末但只能用一次（周六用掉周日就没了）') +
          row('钱包 < 扭蛋预算', '<strong>餐厅打工</strong>（高级 160 + 小费 40/50/100/150 + 陪练 10/人；急招翻倍）', '扭蛋流钱是本金；一周打工 2~3 次 ≈ 400~600 钱') +
          row('钱包够 + 有「增加/暴涨/额外零用钱/笔记继承」', '步行街买扭蛋（一页至少 1 金或 2 紫且自己要的属性）', '扭蛋流的属性主来源；弹跳等接近上限的属性不要买（0 收益）') +
          row('训练流/缺属性', '公园（陪练加成）> 游戏厅（小游戏/地狱游戏）> 餐厅', '公园划船/野餐每个陪练多一条加成；地狱游戏 125 钱→全属性+25') +
          row('缺精力', '公园散步（+30 精力/5~50 钱）或休息', '周末打工要留 75/50 精力') +
          row('最后 1~2 天', '清钱：商店专属饮料（推荐属性未满）→ 偶然饮料（随机+30）→ 全能饮料（全属性+6）', '钱用不完就是浪费') +
          '</tbody></table></div>' +

          '<div class="team-sub-label" style="margin-top:12px">③ 流派差异（核心思路）</div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>流派</th><th>核心思路</th><th>决策要点</th></tr></thead><tbody>' +
          row('扭蛋流', '钱 → 步行街扭蛋 → 属性；训练日只为经理/事件/周目标', '四拖一：羽濑川(多买) + 千圣(×1.3) + 野上(周五出行+22钱) + 卧云(40%增强) ；踢先斗（期望最低）') +
          row('训练流（四拖一）', '训练 + 表情一致/陪练 + 器材暴击 + 专注等级', '合宿周全训练；陪练凑表情；器材对口主练项；笔记链目标（适性/契合/技能）') +
          row('混合/过渡', '先定毕业目标（评分/笔记词条/适性），再分配训练日与出行日', '目标决定优先：要评分→属性；要笔记词条→初次记录品质+词条池；要适性→摇位+目标位置笔记') +
          '</tbody></table></div>' +

          '<div class="team-sub-label" style="margin-top:12px">④ 目标倒推</div>' +
          '<ul class="note-rules small">' +
          '<li><strong>要毕业评分</strong>：堆属性总量（扭蛋流后期分散堆、别撞 1200 折半/上限）；周日结算按本周属性增量最高给全属性+15。</li>' +
          '<li><strong>要契合词条笔记（希雅/白神契合）</strong>：初次记录紫+才有契合词条；携带两本目标角色笔记（原主人各带 1 个）+ 笔记里已有契合词条概率再给 1 个 → 一本最多 4 个；</li>' +
          '<li><strong>要技能词条</strong>：初次记录<strong>金+</strong>；本局要学的技能进技能池（器材/笔记/通用三来源），后期三选一基本由携带器材+笔记决定；</li>' +
          '<li><strong>要适性词条（如大前希雅）</strong>：初次记录<strong>红+</strong> + 适性等级堆到目标（无→白→紫→金→彩）；用「获得一个新位置」摇到紫/金 + 目标位置角色笔记学习触发 +1 级；</li>' +
          '<li><strong>要高星契合（3★）</strong>：合成/修订时 3 本都带同一词条且星级相同 → 保留并升星；星级混杂 → 随机掉星风险。</li>' +
          '</ul>' +
          '<div class="small muted" style="margin-top:8px">注意：本页下方「训练官方数据参考 / 扭蛋流 / 训练计算器」中，数值计算器仅作参考；实际决策以上表为准（人类玩家不需要逐条算数值）。</div>' +
          '</div>'
        );
      }

      /* ---------------- 四流派 · 四拖一配对 ---------------- */
      function streamTeamsHtml() {
        function cell(a, b) { return '<tr><td><strong>' + a + '</strong></td><td>' + b + '</td></tr>'; }
        return (
          '<div class="card card--pad" id="stream-teams">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🏀</span>四流派 · 四拖一配对</div>' +
          '<div class="card-sub">核心资源：训练流=精力换属性；扭蛋/商店/小游戏=周末出行用钱换属性。四拖一 = 4 个流派核心 + 1 个可替换位。</div></div>' +
          '<span class="badge badge--info">社区 + 部分实测</span></div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>流派</th><th>最优四拖一（核心四人 / 踢谁 / 替换位）</th></tr></thead><tbody>' +
          cell('扭蛋流', '<strong>羽濑川</strong>（再买一次 期望2.04颗）+ <strong>千圣</strong>（+30%）+ <strong>野上</strong>（周五出行+22钱+首轮增强｜<strong>质变核心</strong>）+ <strong>卧云</strong>（40%增强）｜<strong>踢：先斗</strong>（44%×1.3 期望最低）｜替换位：经济/发钱件') +
          cell('训练流', '被拖者：<strong>白神</strong>（免费道具：主属性/精力/零花钱）｜支持四：<strong>希雅</strong>（虚空人 +1~2、每人+5%训练加成｜第一核心）+<strong>望月</strong>（表情基础+8%/人｜保底）+<strong>真崎</strong>（一致乘区+0.25）+<strong>闪堂或藤松</strong>（闪堂=升档/上限 +130%；藤松=训练加成/稳定 +111%）｜替代：龙宫寺（望月下位）/佐久间（开荒）｜⚠️百目鬼未实装') +
          cell('商店流', '<strong>羽田</strong>（道具升级/品质）+ <strong>降旗</strong> + <strong>早濑</strong>（商品数量）+ <strong>经济位</strong>（满配：野上 22钱+多1天打工；替代：和泉 每周零花钱 / 名雪 商品-10%过渡）｜<strong>白神（"财神"）=通用商店位，不进优势核心</strong>') +
          cell('小游戏流', '<strong>野上</strong>（+1出行＝多玩一天小游戏，质变核心）+ <strong>稻叶</strong>（小游戏增益）+ <strong>林原</strong>（小游戏奖励）+ <strong>远野</strong>（带加成选项）｜经济替换位：和泉（每周零花钱）；减价：皆川') +
          '</tbody></table></div>' +
          '<div class="small muted" style="margin-top:6px">昵称对照：白神 时久＝"财神"；和泉 香织＝"合权"；百目鬼 剑＝"百木鬼"（未实装）。</div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🧪</span><span>' +
          '<strong>训练流争议：佐久间 vs 闪堂电</strong>——佐久间 +3/+2（40%）进入括号内，吃训练加成/表情/暴击放大（≈+10.8 主属性/次，★★ 再 +3% 乘区），相当于"金色主属性增幅扭蛋"，<strong>开荒期强</strong>；' +
          '闪堂提高表情一致概率 + 一致时升档（哭→微笑、微笑→大笑），是<strong>乘区类、后期随基础值放大</strong>。' +
          '按 6 人、q=30% 估算，闪堂期望提升约 +17%~+33%（取决于天赋 Δq）；持平点 S≈40（+30%）~155（+10%）——<strong>长远闪堂更优</strong>，具体以公测实测天赋数值定。' +
          '</span></div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">⚡</span><span>' +
          '<strong>通用原理：+1 行动次数 = 质变核心（优先于倍率）</strong><br>' +
          '非训练流（扭蛋/商店/小游戏）属性与钱都靠出行 → <strong>野上（每个周五可出行）是所有非训练流的绝对核心</strong>；小游戏流即使不打工，多一天 = 多玩一天小游戏。<br>' +
          '训练流同理 → <strong>百目鬼（每个周六可训练）是训练流"质变核心"——但为内测数据、公测尚未实装</strong>（以公测实装为准）。判定：先锁「+1 行动」核心，再锁 2~3 个增益件，最后 1 位补经济/减价/次数件。' +
          '</span></div>' +
          '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">💰</span><span>' +
          '<strong>商店流经济位：野上 > 名雪（满配结论）</strong><br>' +
          '名雪收益 = 每周商店消费 × 10%；野上 = 22 零花钱 + 每周多 1 天打工（160 基础 + 小费/陪练 ≈ 182+）。' +
          '持平点 ≈ 每周商店消费 <strong>1600~2000+</strong>——实际买不到这么多也不需要，所以<strong>满配经济位用野上</strong>；名雪降为中期过渡/商店核心位。' +
          '</span></div>' +
          '<div class="small muted" style="margin-top:8px">通用规则：①同日名天赋不叠加（羽田「道具升级」× 清水万里）；②替换位优先补「经济/发钱」或「减价」；③所有角色都有通用槽（属性/成长率/上限/出行），只影响数值上限、不改变流派机制。</div>' +
          '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">🎯</span><span>' +
          '<strong>被拖者（四拖一的"1"=主练）怎么选：天赋必须在目标队里有价值。</strong><br>' +
          '❌ 野上放进训练流当被拖者 = 白板甚至亏（他的天赋是周五出行/钱/扭蛋增强，只服务非训练流）；<br>' +
          '✅ 白神放进训练流当被拖者 = 至少不废（每周免费道具：主属性≈半天训练量 / 精力回60+ / 零花钱买「笔记继承」「新位置」「属性扭蛋」）；<br>' +
          '→ 训练流最佳被拖者＝白神（资源型通用件）；非训练流的被拖者可以随便选目标角色，但天赋最好也能吃到该流派的钱/出行。' +
          '</span></div>' +
          '<div class="small muted">⚠️ 训练/商店/小游戏三套核心为社区配对+部分天赋名推断（客户端天赋表解析有损）；财神、合权等不在 38 人图鉴库的角色待补「队伍信息→角色天赋」截图。</div>' +
          '</div>'
        );
      }

      /* ---------------- 训练配对：四拖一配置 + 主练推荐度 ---------------- */
      function trainPairingHtml() {
        function cell2(a, b) { return '<tr><td><strong>' + a + '</strong></td><td>' + b + '</td></tr>'; }
        function cell4(a, b, c, d) { return '<tr><td><strong>' + a + '</strong></td><td>' + b + '</td><td>' + c + '</td><td>' + d + '</td></tr>'; }
        return (
          '<div class="card card--pad" id="train-pairing">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">🧩</span>训练配对：四拖一配置 + 主练推荐度</div>' +
          '<div class="card-sub">两部分：① 四拖一的「四」（固定核心 + 下位替代）② 四拖一的「一」（主练该跟哪套配置训）。</div></div>' +
          '<span class="badge badge--warn">初步判断·待校对</span></div>' +

          '<div class="team-sub-label">前提：养成资源缺，各流派上限受限</div>' +
          '<div class="small muted">同养成进度下各流派收益接近（训练流略高）；实测：扭蛋流野上运气好 9700，训练流四拖一拖野上只有 9300~9400。所以每个主练都要有「首选/次选/再次」的备用队。</div>' +

          '<div class="team-sub-label" style="margin-top:12px">① 四拖一的「四」：固定核心 + 下位替代</div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>流派</th><th>四个支持（固定核心）</th></tr></thead><tbody>' +
          cell2('扭蛋流', '<strong>羽濑川 / 千圣 / 野上 / 卧云</strong>｜替代：羽濑川→春澄永远（同名不叠加）、卧云→先斗；千圣/野上无替代') +
          cell2('商店流', '<strong>羽田 / 降旗 / 早濑 / 野上</strong>（经济位）｜替代：羽田→清水万里（同名不叠加）、野上→和泉（每周零花钱）/名雪（−10%）；白神=通用商店位可作经济/弹性替代') +
          cell2('小游戏流', '<strong>野上 / 稻叶 / 林原 / 远野</strong>｜替代：和泉（经济位）、皆川（减价）；社区版核心样本少') +
          cell2('训练流', '<strong>希雅 / 望月 / 真崎 / 闪堂 或 藤松</strong>（希雅=虚空人+1~2、每人+5%训练加成；望月=表情+8%/人；真崎=一致乘区+0.25；闪堂=升档，藤松=训练加成）｜替代：龙宫寺（望月+4%下位）、佐久间（开荒flat）；百目鬼（未实装）') +
          '</tbody></table></div>' +

          '<div class="team-sub-label" style="margin-top:12px">② 四拖一的「一」：主练推荐度排行</div>' +
          '<div class="table-wrap"><table class="table"><thead><tr><th>主练</th><th>首选</th><th>次选</th><th>再次 / 不推荐</th></tr></thead><tbody>' +
          cell4('野上', '扭蛋流', '商店流', '小游戏流 / <strong>训练流白板</strong>') +
          cell4('白神（财神）', '商店流', '训练流', '扭蛋 ≈ 小游戏') +
          cell4('羽濑川 / 千圣 / 卧云 / 先斗', '扭蛋流', '—', '训练流白板') +
          cell4('春澄永远', '扭蛋流（羽濑川下位）', '—', '训练流白板') +
          cell4('和泉（合权）', '小游戏 / 商店（经济位）', '扭蛋（经济下位）', '—') +
          cell4('名雪', '商店流', '扭蛋 / 小游戏（经济下位）', '—') +
          cell4('希雅', '训练流（第一核心）', '—', '非训练流（虚空人只服务训练）') +
          cell4('望月 / 藤松 / 佐久间 / 闪堂 / 真崎 / 龙宫寺', '训练流', '—', '非训练流白板') +
          cell4('羽田 / 降旗 / 早濑 / 清水', '商店流', '—', '非商店流') +
          cell4('稻叶 / 林原 / 远野 / 皆川', '小游戏流', '—', '非小游戏流') +
          cell4('百目鬼', '训练流（⚠️未实装）', '—', '—') +
          '</tbody></table></div>' +

          '<div class="small muted" style="margin-top:8px">推荐度依据 = 主练天赋能否在目标流派产生价值（越核心越靠前）；当原配流派养成不足（天赋没点全）时，按"次选"换队可能更强（如白神在商店流未点满时跟训练流四拖一）。</div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">📊</span><span>' +
          '<strong>训练天赋·解包明文数值（2026-11-09，客户端 extracted 文案）：</strong><br>' +
          '佐久间：队友训练主属性 +3，且 40%~55% 概率额外 +2（等级成长）；<br>' +
          '藤松：训练时 +5%~15% 训练加成，每恢复 5 次精力再 +5%，上限 25%（升级后 35%）；<br>' +
          '真崎：全部表情一致时额外获得 25%~32% 倍率；<br>' +
          '闪堂：触发表情一致时，哭脸 30%、平常脸 60% 概率升级为笑脸；<br>' +
          '望月：精力≥45~60 时全部表情基础 Bonus +4%，训练开始额外 +30 随机属性；<br>' +
          '希雅：增加队友数量上限 +3，且每个队友额外 +5% 训练加成；<br>' +
          '百目鬼：每个周六均可训练，周六额外 20%~45% 训练加成，精力消耗 -80%（内测文本，公测未实装）。<br>' +
          '<strong>按 3/4/5 人核算（全微笑一致，6人稀有；希雅加成下 3~4 人常见）：</strong>' +
          '希雅 +40%/+40%/+42%；望月 +18%/+23%/+27%；闪堂 +14%/+17%/+20%；真崎 +14%/+13%/+11%；龙宫寺 +9%/+11%/+13%；' +
          '组合 希雅+望月+真崎 = +95%~105%；+藤松 = +114%~124%；<strong>+闪堂 = +125%~142%（最高）</strong>。' +
          '</span></div>' +
          '</div>'
        );
      }

      /* ================= 快速配对面板（核心功能，置顶） ================= */
      var STREAM_PAIRING = {
        gacha: {
          name: '扭蛋流', economy: '零花钱（出行买扭蛋 / 打工赚钱）', coreRule: '质变核心：野上（+1出行）；次数核心：羽濑川；加成核心：千圣；质量核心：卧云',
          supports: [
            { n: '羽濑川 湊', role: '次数核心（再买一次，期望 2 颗/次）', sub: '春澄 永远（同名「再买一个」，概率 40~60%、最多 3 个；无首次必发）' },
            { n: '千圣·贝尔丝', role: '加成核心（扭蛋加成 +25%~60%）', sub: '无（唯一常驻乘区，不可替代）' },
            { n: '野上 泷', role: '质变核心（每个周五可出行 +22 零花钱 + 首轮增强）', sub: '无（唯一 +1 出行，不可替代）' },
            { n: '卧云 真昼', role: '质量核心（40% 升级增强版）', sub: '先斗 月绮（44%×30%，下位）' }
          ]
        },
        store: {
          name: '商店流', economy: '零花钱（周末打工赚钱 → 买商店道具）', coreRule: '经济位必带（满配用野上，替代和泉/名雪）；财神=通用商店位可删',
          supports: [
            { n: '羽田 朱志香', role: '核心（道具升级/品质）', sub: '清水 万里（同名「道具升级」不叠加）' },
            { n: '降旗 千红纱', role: '核心（商店流）', sub: '待补（社区版）' },
            { n: '早濑 千秋', role: '核心（商品数量）', sub: '待补（社区版）' },
            { n: '野上 泷', role: '经济位/质变核心（22钱 + 多 1 天打工 ≈160+）', sub: '和泉 香织（每周零花钱）/名雪 纱夜（商品 −10%）' }
          ]
        },
        minigame: {
          name: '小游戏流（不推荐专门组·临时结论）', economy: '零花钱（出行玩游戏厅小游戏）', coreRule: '⚠️ 体系上限低：小游戏基础产出≈扭蛋/商店，但没有整体增幅、每周最多玩约两次还要花钱 → 常规上限低于其他三体系。小游戏角色更适合放进**训练流队伍**（周末训练流有闲钱玩小游戏，吃到自己的加成）；混进扭蛋/商店队≈白板。未来小游戏出核心后此结论可能改变。',
          supports: [
            { n: '野上 泷', role: '质变核心（+1 出行）', sub: '无（唯一，不可替代）' },
            { n: '稻叶 杏里', role: '核心（小游戏增益）', sub: '和泉 香织（经济位）' },
            { n: '林原 树里', role: '核心（小游戏奖励）', sub: '皆川 式（减价）' },
            { n: '远野 桐', role: '核心（带加成小游戏选项）', sub: '和泉 香织 / 皆川 式' }
          ]
        },
        train: {
          name: '训练流', economy: '精力（训练日消耗；训练流经济位=精力件）', coreRule: '第一核心：希雅；保底核心：望月；乘区：真崎；升档：闪堂（或藤松补训练加成）',
          supports: [
            { n: '希雅·奥黛拉', role: '第一核心（虚空人 +1~2、每人 +5% 训练加成）', sub: '无（唯一，不可替代）' },
            { n: '望月 透', role: '保底核心（表情基础 +8%/人）', sub: '龙宫寺 心叶（+4%/人，下位）' },
            { n: '真崎 辉世', role: '乘区（一致乘区 +0.25，3~4 人场景更值）', sub: '无直接下位（可换藤松/龙宫寺补稳定）' },
            { n: '闪堂 电', role: '升档（微笑 60%→大笑；+一致概率）', sub: '藤松 玖怜（训练加成 +5~15%/精力，稳定位）/佐久间 雨乃（开荒 flat）' }
          ]
        }
      };

      // 角色 → 流派推荐度（初步判断，可继续校正）
      var CHAR_RECOS = {
        // core: 该角色本人位于哪些流派的最优四拖一配置内（主练时只需补 1 个该流派加成位）
        '野上 泷': { list: ['扭蛋流', '商店流', '小游戏流'], avoid: '训练流（天赋白板）', core: ['扭蛋流', '商店流', '小游戏流'], reason: '本人位于扭蛋/商店/小游戏三个最优四拖一内（+1 出行质变核心）→ 作主练时任选一个非训练流派，队伍只需再补 1 个该流派加成位即可满配' },
        '白神 时久': { list: ['商店流', '训练流', '扭蛋流≈小游戏流'], avoid: '', core: [], reason: '免费道具（属性/精力/零花钱）通用；主练指商店流首选、训练流次选' },
        '羽濑川 湊': { list: ['扭蛋流'], avoid: '训练流（天赋白板）', core: ['扭蛋流'], reason: '本人位于扭蛋流最优四拖一内（再买一次）→ 主练时队伍只需再补 1 个扭蛋流加成位即可满配' },
        '千圣·贝尔丝': { list: ['扭蛋流'], avoid: '训练流（天赋白板）', core: ['扭蛋流'], reason: '本人位于扭蛋流最优四拖一内（扭蛋加成+25~60%）→ 主练时队伍只需再补 1 个扭蛋流加成位即可满配' },
        '卧云 真昼': { list: ['扭蛋流'], avoid: '训练流（天赋白板）', core: ['扭蛋流'], reason: '本人位于扭蛋流最优四拖一内（40% 升级增强版）→ 主练时队伍只需再补 1 个扭蛋流加成位即可满配' },
        '先斗 月绮': { list: ['扭蛋流'], avoid: '训练流（天赋白板）', core: ['扭蛋流'], reason: '本人位于扭蛋流四拖一内（44%×30%，下位）→ 主练时可走扭蛋流，队伍补 1 个加成位' },
        '春澄 永远': { list: ['扭蛋流（羽濑川下位）'], avoid: '训练流（天赋白板）', core: ['扭蛋流'], reason: '本人是扭蛋流四拖一的下位件（再买一个·概率版）→ 主练时队伍只需再补 1 个扭蛋流加成位' },
        '和泉 香织': { list: ['训练流（经济位/发钱）', '小游戏 / 商店（经济位）', '扭蛋（经济下位）'], avoid: '', core: [], reason: '经济/发钱位：主练时放进训练流/商店/小游戏均可，队伍补足经济位即可' },
        '名雪 纱夜': { list: ['商店流', '扭蛋 / 小游戏（经济下位）'], avoid: '', core: ['商店流'], reason: '商店流四拖一/经济位成员；主练时队伍补足经济位即可（或走商店核心）' },
        '希雅·奥黛拉': { list: ['训练流（第一核心）'], avoid: '非训练流（虚空人只服务训练）', core: ['训练流'], reason: '本人位于训练流最优四拖一内（第一核心）→ 主练时队伍只需再补 1 个训练流加成位即可满配' },
        '望月 透': { list: ['训练流'], avoid: '非训练流白板', core: ['训练流'], reason: '本人位于训练流最优四拖一内（表情+8%/人）→ 主练时队伍只需再补 1 个训练流加成位即可满配' },
        '藤松 玖怜': { list: ['训练流'], avoid: '非训练流白板', core: ['训练流'], reason: '本人位于训练流四拖一替代位（训练加成）→ 主练时队伍补 1 个训练流加成位' },
        '佐久间 雨乃': { list: ['训练流'], avoid: '非训练流白板', core: ['训练流'], reason: '本人位于训练流四拖一替代位（开荒flat）→ 主练时队伍补 1 个训练流加成位' },
        '闪堂 电': { list: ['训练流'], avoid: '非训练流白板', core: ['训练流'], reason: '本人位于训练流最优四拖一内（升档位）→ 主练时队伍只需再补 1 个训练流加成位即可满配' },
        '真崎 辉世': { list: ['训练流'], avoid: '非训练流白板', core: ['训练流'], reason: '本人位于训练流最优四拖一内（一致乘区+0.25）→ 主练时队伍只需再补 1 个训练流加成位即可满配' },
        '龙宫寺 心叶': { list: ['训练流'], avoid: '非训练流白板', core: ['训练流'], reason: '本人位于训练流四拖一替代位（望月下位）→ 主练时队伍补 1 个训练流加成位' },
        '羽田 朱志香': { list: ['商店流'], avoid: '非商店流', core: ['商店流'], reason: '本人位于商店流最优四拖一内（道具升级/品质）→ 主练时队伍只需再补 1 个商店流加成位' },
        '降旗 千红纱': { list: ['商店流'], avoid: '非商店流', core: ['商店流'], reason: '本人位于商店流最优四拖一内 → 主练时队伍只需再补 1 个商店流加成位' },
        '早濑 千秋': { list: ['商店流'], avoid: '非商店流', core: ['商店流'], reason: '本人位于商店流最优四拖一内（商品数量）→ 主练时队伍只需再补 1 个商店流加成位' },
        '清水 万里': { list: ['商店流'], avoid: '非商店流', core: ['商店流'], reason: '本人是商店流四拖一的下位件（羽田下位）→ 主练时队伍补 1 个商店流加成位' },
        '稻叶 杏里': { list: ['训练流（周末闲钱玩小游戏吃加成）', '小游戏流（体系上限低，临时不推荐）'], avoid: '扭蛋/商店（钱不会拿去玩小游戏≈白板）', core: ['小游戏流'], reason: '本人位于小游戏流四拖一内，但小游戏流上限低 → 作主练时优先跟训练流队（补 1 个训练流加成位），走小游戏队临时不推荐' },
        '林原 树里': { list: ['训练流（周末闲钱玩小游戏吃加成）', '小游戏流（临时不推荐）'], avoid: '扭蛋/商店（≈白板）', core: ['小游戏流'], reason: '本人位于小游戏流四拖一内，但小游戏流上限低 → 优先跟训练流队' },
        '远野 桐': { list: ['训练流（周末闲钱玩小游戏吃加成）', '小游戏流（临时不推荐）'], avoid: '扭蛋/商店（≈白板）', core: ['小游戏流'], reason: '本人位于小游戏流四拖一内，但小游戏流上限低 → 优先跟训练流队' },
        '皆川 式': { list: ['训练流（经济/减价位）', '小游戏流（临时不推荐）'], avoid: '扭蛋/商店', core: ['小游戏流'], reason: '本人是小游戏流减价件；小游戏流上限低 → 优先跟训练流队当经济/减价位' },
        '百目鬼 剑': { list: ['训练流（⚠️未实装）'], avoid: '—', core: ['训练流'], reason: '上线后是训练流"+1 训练日"质变核心（内测数据）' }
      };;

      function pairingPanelHtml() {
        var streamOpts = Object.keys(STREAM_PAIRING).map(function (k) {
          return '<option value="' + k + '">' + STREAM_PAIRING[k].name + '</option>';
        }).join('');
        var charOpts = (characters || []).map(function (c) {
          return '<option value="' + esc(c.name) + '">' + esc(c.name) + '（' + esc(c.role || '') + '）</option>';
        }).join('');
        var freeOpts = '<option value="">（空）</option>' + charOpts;
        return '<div class="card card--pad" id="pairing-panel" style="margin-bottom:16px">' +
          '<div class="card-head"><div><div class="card-title"><span class="ico">⚡</span>快速配对（核心）</div>' +
          '<div class="card-sub">选流派 → 直接给 4 个陪练 + 下位替代；选主练 → 给流派推荐顺序；自由配队 → 风险分析。</div></div>' +
          '<span class="badge badge--ok">核心功能</span></div>' +
          '<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:10px">' +
          '<button type="button" class="btn btn--sm btn--primary" data-pair-mode="stream">我要用哪个流派</button>' +
          '<button type="button" class="btn btn--sm" data-pair-mode="main">我要训练谁（主练）</button>' +
          '<button type="button" class="btn btn--sm" data-pair-mode="free">自由配队分析</button>' +
          '</div>' +
          '<div id="pair-mode-body"></div>' +
          '<div class="small muted" style="margin-top:10px">原始数据 / 公式 / 计算器都放在页面下方「参考数据」里，仅供查证，不影响上面结论。</div>' +
          '</div>';
      }

      function streamBodyHtml(key) {
        var s = STREAM_PAIRING[key];
        var rows = s.supports.map(function (x) {
          return '<tr><td><strong>' + x.n + '</strong></td><td>' + x.role + '</td><td>' + x.sub + '</td></tr>';
        }).join('');
        return '<div class="small">经济位：<strong>' + s.economy + '</strong></div>' +
          '<div class="table-wrap" style="margin-top:6px"><table class="table"><thead><tr><th>陪练</th><th>定位</th><th>下位替代（没这个角色时）</th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
          '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">💡</span><span>' + s.coreRule + '</span></div>';
      }

      function mainBodyHtml(name) {
        var r = CHAR_RECOS[name];
        if (!r) return '<div class="small muted">该角色暂无推荐数据（未在核心角色表内）：按"天赋能否在目标流派产生价值"自判，参考下方卡片。</div>';
        var coreLine = (r.core && r.core.length)
          ? '<div class="notice notice--info" style="margin-top:8px"><span class="notice-ico">🧩</span><span>本人位于 <strong>' + r.core.join(' / ') + '</strong> 的最优四拖一阵容内 → 作为主练时，队伍<strong>只需再补 1 个该流派的加成位</strong>即可满配。</span></div>'
          : '';
        return '<div class="small">主练：<strong>' + esc(name) + '</strong></div>' +
          '<div class="small" style="margin-top:6px">推荐顺序：' + r.list.map(function (x, i) {
            return '<span class="badge badge--ok">' + (i === 0 ? '首选' : i === 1 ? '次选' : '再次') + '：' + esc(x) + '</span>';
          }).join(' ') + '</div>' +
          coreLine +
          (r.avoid ? '<div class="notice notice--warn" style="margin-top:8px"><span class="notice-ico">⚠️</span><span>不推荐：<strong>' + esc(r.avoid) + '</strong></span></div>' : '') +
          '<div class="small muted" style="margin-top:6px">理由：' + esc(r.reason) + '</div>';
      }

      function comboInfo(name) {
        var r = CHAR_RECOS[name];
        if (!r) return { tags: [], text: '未知/通用' };
        var tags = [];
        r.list.forEach(function (x) {
          ['扭蛋流', '商店流', '小游戏流', '训练流'].forEach(function (s) {
            if (x.indexOf(s) >= 0) tags.push(s);
          });
        });
        return { tags: tags, avoid: r.avoid, text: r.reason, raw: r };
      }

      function freeBodyHtml() {
        var opts = '<option value="">（空）</option>' + (characters || []).map(function (c) {
          return '<option value="' + esc(c.name) + '">' + esc(c.name) + '</option>';
        }).join('');
        var sels = '';
        for (var i = 0; i < 5; i++) {
          sels += '<label class="small">' + (i === 0 ? '被拖者/主练' : '成员' + (i + 1)) + '：<select class="select" id="pair-free-' + i + '">' + opts + '</select></label>';
        }
        return '<div class="row" style="gap:8px;flex-wrap:wrap">' + sels + '</div>' +
          '<div id="pair-free-body" class="small" style="margin-top:8px"></div>';
      }

      function analyzeCombo(names) {
        var risks = [];
        var infos = names.map(function (n) { return { n: n, info: n ? comboInfo(n) : null }; }).filter(function (x) { return x.info; });
        var tagsCount = { '扭蛋流': 0, '商店流': 0, '小游戏流': 0, '训练流': 0 };
        infos.forEach(function (x) { x.info.tags.forEach(function (t) { tagsCount[t] += 1; }); });
        var trainN = tagsCount['训练流'];
        var nontrainN = tagsCount['扭蛋流'] + tagsCount['商店流'] + tagsCount['小游戏流'];
        var selected = infos.map(function (x) { return x.n; });
        if (trainN > 0 && nontrainN > 0) risks.push('训练流与非训练流混搭：精力 vs 零花钱两套资源互相打架（训练日/出行日冲突）');
        var nontrainTypes = ['扭蛋流', '商店流', '小游戏流'].filter(function (t) { return tagsCount[t] >= 2 || tagsCount[t] > 0; });
        var distinctNontrain = ['扭蛋流', '商店流', '小游戏流'].filter(function (t) {
          return infos.some(function (x) { return x.info.tags.indexOf(t) >= 0; });
        });
        if (distinctNontrain.length >= 2) risks.push('非训练流派超过 1 种（' + distinctNontrain.join('/') + '）：钱只能花一处，经济会分散');
        if (nontrainN > 0 && selected.indexOf('野上 泷') < 0) risks.push('非训练流缺「野上 泷」：没有 +1 出行（质变核心），收益大幅缩水');
        if (trainN > 0 && selected.indexOf('希雅·奥黛拉') < 0) risks.push('训练流缺「希雅」：训练流第一核心（虚空人/训练加成）缺失');
        if (selected.indexOf('羽濑川 湊') >= 0 && selected.indexOf('春澄 永远') >= 0) risks.push('羽濑川 + 春澄 同时在场：同名「再买一个」不叠加（浪费一个位置）');
        if (selected.indexOf('羽田 朱志香') >= 0 && selected.indexOf('清水 万里') >= 0) risks.push('羽田 + 清水 同时在场：同名「道具升级」不叠加');
        var MINIGAME_CHARS = ['稻叶 杏里', '林原 树里', '远野 桐', '皆川 式'];
        var miniInTeam = MINIGAME_CHARS.filter(function (n) { return selected.indexOf(n) >= 0; });
        if (miniInTeam.length > 0 && trainN === 0) risks.push('小游戏流体系上限低：小游戏角色（' + miniInTeam.join('、') + '）建议放进训练流队伍（周末闲钱玩小游戏吃加成）；放在扭蛋/商店队≈白板');
        if (miniInTeam.length > 0 && distinctNontrain.length >= 2) risks.push('小游戏角色与非训练流派混搭：小游戏消耗零花钱，会和扭蛋/商店抢钱');
        var main = names[0] ? comboInfo(names[0]) : null;
        if (main && main.avoid) {
          var avoidStream = main.avoid.replace(/（.*?）/g, '').trim();
          if (tagsCount[avoidStream] > 0) risks.push('被拖者「' + names[0] + '」与队伍流派冲突：' + main.avoid);
        }
        var str = tagged => tagged;
        var text = risks.length
          ? '<ul class="note-rules">' + risks.map(function (r) { return '<li>⚠️ ' + esc(r) + '</li>'; }).join('') + '</ul>'
          : '<div class="small">未发现明显冲突（加成集中、被拖者天赋与队伍流派匹配）。注意：自由配队可以是有意为之（如训练流带扭蛋增强件刷增强版扭蛋概率），此时以上提示仅供参考。</div>';
        return text;
      }

      function bindPairingPanel(host) {
        var panel = dom.qs('#pairing-panel', host);
        if (!panel) return;
        var mode = 'stream';
        function renderBody() {
          var body = dom.qs('#pair-mode-body', host);
          if (!body) return;
          if (mode === 'stream') {
            body.innerHTML = '<label class="small">选择流派：<select class="select" id="pair-stream">' +
              Object.keys(STREAM_PAIRING).map(function (k) { return '<option value="' + k + '">' + STREAM_PAIRING[k].name + '</option>'; }).join('') +
              '</select></label><div id="pair-stream-body" style="margin-top:8px">' + streamBodyHtml('gacha') + '</div>';
            var sel = dom.qs('#pair-stream', host);
            if (sel) sel.addEventListener('change', function () {
              var b = dom.qs('#pair-stream-body', host);
              if (b) b.innerHTML = streamBodyHtml(sel.value);
            });
          } else if (mode === 'main') {
            body.innerHTML = '<label class="small">选择主练：<select class="select" id="pair-main">' +
              Object.keys(CHAR_RECOS).map(function (n) { return '<option value="' + esc(n) + '">' + esc(n) + '</option>'; }).join('') +
              '</select></label><div id="pair-main-body" style="margin-top:8px">' + mainBodyHtml('野上 泷') + '</div>';
            var ms = dom.qs('#pair-main', host);
            if (ms) ms.addEventListener('change', function () {
              var b = dom.qs('#pair-main-body', host);
              if (b) b.innerHTML = mainBodyHtml(ms.value);
            });
          } else {
            body.innerHTML = freeBodyHtml();
            for (var i = 0; i < 5; i++) {
              (function (idx) {
                var sel = dom.qs('#pair-free-' + idx, host);
                if (sel) sel.addEventListener('change', refreshFree);
              })(i);
            }
            refreshFree();
          }
          function refreshFree() {
            var out = dom.qs('#pair-free-body', host);
            if (!out) return;
            var names = [];
            for (var i = 0; i < 5; i++) {
              var sel = dom.qs('#pair-free-' + i, host);
              names.push(sel && sel.value ? sel.value : null);
            }
            out.innerHTML = analyzeCombo(names);
          }
        }
        dom.delegate(panel, '[data-pair-mode]', 'click', function (ev, t) {
          mode = t.getAttribute('data-pair-mode');
          dom.qsa('[data-pair-mode]', panel).forEach(function (b) {
            b.className = 'btn btn--sm' + (b.getAttribute('data-pair-mode') === mode ? ' btn--primary' : '');
          });
          renderBody();
        });
        renderBody();
      }

      /* ---------------- 顶部选择器 ---------------- */
      function mountHtml() {
        return (
          pairingPanelHtml() +
          '<details class="card card--pad" id="reference-fold" style="margin-top:16px">' +
          '<summary style="cursor:pointer;font-weight:600">📚 参考数据（流派配对表 / 训练天赋数值 / 公式 / 计算器 / 旧版配队面板）— 点击展开</summary>' +
          '<div class="team-toolbar card card--pad" id="team-toolbar">' +
          '<div class="team-toolbar-row">' +
          '<div class="field"><label class="field-label" for="team-scene"><span class="label-text">场景</span>' +
          '<span class="badge badge--info">用户确认</span></label>' +
          '<select class="select" id="team-scene">' +
          scenarios.map(function (s) {
            return '<option value="' + esc(s.id) + '"' + (s.id === state.sceneId ? ' selected' : '') + '>' + esc(s.name) + '</option>';
          }).join('') +
          '</select></div>' +
          '<div class="field"><label class="field-label" for="team-direction"><span class="label-text">训练方向</span>' +
          '<span class="badge badge--warn">定位体系</span></label>' +
          '<select class="select" id="team-direction">' +
          directions.map(function (d) {
            return '<option value="' + esc(d.id) + '"' + (d.id === state.directionId ? ' selected' : '') + '>' + esc(d.name) + '</option>';
          }).join('') +
          '</select></div>' +
          '</div>' +
          '<div class="team-mountain-picker" id="team-mountain-picker"' + (state.sceneId === 'saint' ? '' : ' hidden') + '>' +
          '<span class="small muted">圣山：</span>' +
          ['blue', 'green', 'red', 'purple'].map(function (key) {
            var m = saintMountains[key] || { name: key, character: null };
            return '<button type="button" class="btn btn--sm' + (state.mountainId === key ? ' btn--primary' : '') +
              '" data-mountain="' + esc(key) + '">' + esc(m.name) +
              (m.character ? '（' + esc(m.character) + '）' : '（待补）') + '</button>';
          }).join('') +
          '</div>' +
          '<div class="team-toolbar-note small muted">场景/方向切换后配队面板与适配度重新计算；数据缺口见各区块占位。</div>' +
          '</div>' +
          '<div class="team-layout">' +
          '<aside class="team-side card card--pad">' +
          '<div class="team-side-head"><div class="card-title"><span class="ico">👥</span>角色列表</div>' +
          '<span class="badge badge--neutral" id="team-list-count">' + characters.length + ' / ' + characters.length + '</span></div>' +
          '<div class="team-filters">' +
          '<input class="input" id="team-search" type="search" placeholder="搜索名字…" value="' + esc(state.search) + '">' +
          '<div class="row" style="gap:6px;flex-wrap:wrap">' +
          '<select class="select" id="team-filter-role">' +
          ['全部', '得分手', '防守者', '组织者', '篮板手'].map(function (r) {
            return '<option value="' + esc(r) + '"' + (state.filterRole === r ? ' selected' : '') + '>' + (r === '全部' ? '全部定位' : r) + '</option>';
          }).join('') +
          '</select>' +
          '<select class="select" id="team-filter-fit">' +
          ['全部'].concat(FIT_VALUES).map(function (v) {
            return '<option value="' + esc(v) + '"' + (state.filterFit === v ? ' selected' : '') + '>' + (v === '全部' ? '全部适配度' : v) + '</option>';
          }).join('') +
          '</select>' +
          '</div></div>' +
          '<div class="team-char-list" id="team-list"></div>' +
          '</aside>' +
          '<section class="team-main" id="team-panel"></section>' +
          '</div>' +
          '<div class="stack" style="gap:16px;margin-top:16px" id="decision-guide-wrap">' +
          decisionGuideHtml() +
          '</div>' +
          '<div class="stack" style="gap:16px;margin-top:16px" id="stream-teams-wrap">' +
          streamTeamsHtml() +
          '</div>' +
          '<div class="stack" style="gap:16px;margin-top:16px" id="train-pairing-wrap">' +
          trainPairingHtml() +
          '</div>' +
          (BBT.OfficialWidgets
            ? '<div class="stack" style="gap:16px;margin-top:16px" id="official-training-appendix">' +
              BBT.OfficialWidgets.trainingHtml() +
              '</div>'
            : '') +
          (BBT.GachaStream
            ? '<div class="stack" style="gap:16px;margin-top:16px" id="gacha-stream-appendix-wrap">' +
              BBT.GachaStream.appendixHtml() +
              '</div>'
            : '') +
          '</details>'
        );
      }

      function renderControls() {
        var toolbarHost = dom.qs('#team-toolbar', el);
        if (!toolbarHost) {
          el.innerHTML = mountHtml();
          bindToolbar();
          if (typeof bindPairingPanel === 'function') bindPairingPanel(el);
          if (BBT.GachaStream && BBT.GachaStream.bind) BBT.GachaStream.bind(el);
        } else {
          // 更新选中态与圣山选择器
          var sceneSel = dom.qs('#team-scene', el);
          if (sceneSel) sceneSel.value = state.sceneId;
          var dirSel = dom.qs('#team-direction', el);
          if (dirSel) dirSel.value = state.directionId;
          var picker = dom.qs('#team-mountain-picker', el);
          if (picker) {
            if (state.sceneId === 'saint') picker.removeAttribute('hidden');
            else picker.setAttribute('hidden', 'hidden');
            picker.innerHTML =
              '<span class="small muted">圣山：</span>' +
              ['blue', 'green', 'red', 'purple'].map(function (key) {
                var m = saintMountains[key] || { name: key, character: null };
                return '<button type="button" class="btn btn--sm' + (state.mountainId === key ? ' btn--primary' : '') +
                  '" data-mountain="' + esc(key) + '">' + esc(m.name) +
                  (m.character ? '（' + esc(m.character) + '）' : '（待补）') + '</button>';
              }).join('');
          }
        }
      }

      function onSceneChange() {
        state.draft = emptyDraft();
        state.activeSlot = null;
        state.note = '';
        exceptionText = '';
        renderControls();
        renderPage();
      }

      function bindToolbar() {
        var sceneSel = dom.qs('#team-scene', el);
        if (sceneSel) {
          sceneSel.addEventListener('change', function () {
            state.sceneId = sceneSel.value;
            onSceneChange();
          });
        }
        var dirSel = dom.qs('#team-direction', el);
        if (dirSel) {
          dirSel.addEventListener('change', function () {
            state.directionId = dirSel.value;
            state.activeSlot = null;
            renderPage();
          });
        }
        var search = dom.qs('#team-search', el);
        if (search) {
          search.addEventListener('input', function () {
            state.search = search.value || '';
            renderPage();
          });
        }
        var roleFilter = dom.qs('#team-filter-role', el);
        if (roleFilter) {
          roleFilter.addEventListener('change', function () {
            state.filterRole = roleFilter.value;
            renderPage();
          });
        }
        var fitFilter = dom.qs('#team-filter-fit', el);
        if (fitFilter) {
          fitFilter.addEventListener('change', function () {
            state.filterFit = fitFilter.value;
            renderPage();
          });
        }
      }

      function bindPanelButtons() {
        dom.delegate(el, '[data-team-pick]', 'click', function (event, target) {
          assignSlot(target.getAttribute('data-team-pick'));
        });
        dom.delegate(el, '[data-slot]', 'click', function (event, target) {
          var spec = target.getAttribute('data-slot');
          if (spec === 'main') setActiveSlot({ type: 'main' });
          else if (spec.indexOf('coach:') === 0) setActiveSlot({ type: 'coach', index: Number(spec.split(':')[1]) });
        });
        dom.delegate(el, '[data-slot-clear]', 'click', function (event, target) {
          var spec = target.getAttribute('data-slot-clear');
          if (spec === 'main') clearSlot({ type: 'main' });
          else if (spec.indexOf('coach:') === 0) clearSlot({ type: 'coach', index: Number(spec.split(':')[1]) });
        });
        dom.delegate(el, '[data-fit-edit]', 'click', function (event, target) {
          editFit(target.getAttribute('data-fit-edit'));
        });
        dom.delegate(el, '[data-mountain]', 'click', function (event, target) {
          state.mountainId = target.getAttribute('data-mountain');
          state.draft = emptyDraft();
          state.activeSlot = null;
          renderControls();
          renderPage();
        });
        dom.delegate(el, '#team-note-save', 'click', function () {
          if (!store) return;
          store.setTeamNote(sceneKey(), state.directionId, state.draft.mainId, state.note);
          if (ctx.toast) ctx.toast('方案备注已保存（场景+方向+主练 key）', 'ok');
          renderPage();
        });
        dom.delegate(el, '#team-save-plan', 'click', savePlan);
        dom.delegate(el, '#team-exception-save', 'click', function () {
          if (!store || state.draft.mainId == null) return;
          store.setException(state.draft.mainId, exceptionText);
          if (ctx.toast) ctx.toast('例外标注已保存', 'ok');
          renderPage();
        });
        dom.delegate(el, '[data-plan-load]', 'click', function (event, target) {
          loadPlan(store ? store.getTeamPlan(target.getAttribute('data-plan-load')) : null);
        });
        dom.delegate(el, '[data-plan-delete]', 'click', function (event, target) {
          if (!store) return;
          store.deleteTeamPlan(target.getAttribute('data-plan-delete'));
          if (ctx.toast) ctx.toast('方案已删除', 'ok');
          renderPage();
        });
        // 需求 #2b：角色养成配法
        dom.delegate(el, '#build-save', 'click', saveBuild);
        dom.delegate(el, '#build-equip-add', 'click', function () {
          if (!state.build) return;
          if (state.build.equipment.length >= 5) {
            if (ctx.toast) ctx.toast('器材最多 5 条（占位上限）', 'warn');
            return;
          }
          state.build.equipment.push({ name: '', skill: '', source: '' });
          renderPage();
        });
        dom.delegate(el, '[data-build-equip-remove]', 'click', function (event, target) {
          if (!state.build) return;
          var idx = Number(target.getAttribute('data-build-equip-remove'));
          state.build.equipment.splice(idx, 1);
          renderPage();
        });
        dom.delegate(el, '#build-reset', 'click', function () {
          var main = mainCharacter();
          if (!main) return;
          var rec = recommendBuild(main);
          state.build = {
            directionId: rec.primary.direction.id,
            altPosition: null,
            note: '',
            patchesNote: '',
            equipment: [],
            skills: []
          };
          if (store) store.saveCharacterBuild(main.contentId, state.build);
          if (ctx.toast) ctx.toast('已恢复默认推荐并保存', 'ok');
          renderPage();
        });
        // 需求 #2c：技能规划手动增删
        dom.delegate(el, '#build-skill-add', 'click', function () {
          if (!state.build) return;
          var nameInput = dom.qs('#build-skill-name', el);
          var sourceSel = dom.qs('#build-skill-source', el);
          var requiredBox = dom.qs('#build-skill-required', el);
          var name = nameInput ? String(nameInput.value || '').trim() : '';
          if (!name) {
            if (ctx.toast) ctx.toast('请输入技能名', 'warn');
            return;
          }
          if (!state.build.skills) state.build.skills = [];
          if (state.build.skills.length >= 12) {
            if (ctx.toast) ctx.toast('手动技能最多 12 条', 'warn');
            return;
          }
          state.build.skills.push({
            name: name.slice(0, 60),
            source: sourceSel ? sourceSel.value : '手动',
            required: requiredBox ? requiredBox.checked : false
          });
          renderPage();
        });
        dom.delegate(el, '[data-build-skill-remove]', 'click', function (event, target) {
          if (!state.build || !state.build.skills) return;
          state.build.skills.splice(Number(target.getAttribute('data-build-skill-remove')), 1);
          renderPage();
        });
      }

      el.innerHTML = mountHtml();
      bindToolbar();
      bindPanelButtons();
      bindPairingPanel(el);
      if (BBT.GachaStream && BBT.GachaStream.bind) BBT.GachaStream.bind(el);
      renderPage();
    }
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
