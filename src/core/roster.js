/*!
 * core/roster.js —— 相对优势 / 双评分 / 四流派（T5）
 *
 * 数据来源：
 *  - knowledge/model.json → roster（算法、双评分、梯队、替代逻辑、四流派）
 *  - data/structured/derived_roster.json → roster.js（模板分组、rankings、stream_roles）
 *
 * 纪律：训练价值与比赛价值近似正交（模型 rank_correlation 0.87）→ 双评分并列展示，
 * 不合并成单一「强度」。所有评分标注来源与置信度。
 */
(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) {
    root.BBT = root.BBT || {};
    root.BBT.roster = api;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function getModel() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    return B.model || (typeof globalThis !== 'undefined' ? globalThis.BBTModel : null) || null;
  }

  function getData() {
    var B = (typeof globalThis !== 'undefined' && globalThis.BBT) || {};
    return B.rosterData || (typeof globalThis !== 'undefined' ? globalThis.BBRosterData : null) || null;
  }

  function rosterAlgorithm() {
    var m = getModel();
    return (m && m.roster && m.roster.algorithm) || null;
  }

  function modelScoresByName() {
    var m = getModel();
    var chars = (m && m.roster && m.roster.characters) || [];
    var out = Object.create(null);
    chars.forEach(function (c) {
      if (c && c.name && c.scores) out[c.name] = c.scores;
    });
    return out;
  }

  function playerList() {
    var data = getData();
    var modelScores = modelScoresByName();
    if (data && Array.isArray(data.players) && data.players.length) {
      return data.players.map(function (p) {
        var ms = modelScores[p.name] || null;
        var scores = p.scores || null;
        if (ms) {
          scores = Object.assign({}, scores || {}, {
            battle_score: ms.battle_score,
            training_value: ms.training_value,
            composite: ms.composite,
            attr_score: ms.attr_score,
            skill_score: ms.skill_score,
            attack_share: ms.attack_share,
            defense_share: ms.defense_share,
            organize_share: ms.organize_share
          });
        }
        return {
          contentId: p.contentId,
          name: p.name,
          rarity: p.rarity,
          position: p.position,
          style: p.style,
          school: p.school,
          stats: p.stats,
          attributeSum: p.attributeSum,
          potentials: p.potentials,
          template: p.positionTemplate,
          scores: scores,
          positionRank: p.positionRank,
          functionalTags: p.functionalTags || [],
          roleSummary: p.roleSummary,
          communityTier: p.communityTier || (ms && ms.community_tier) || null,
          missingCAttrs: p.missingCAttrs
        };
      });
    }
    var m = getModel();
    var chars = (m && m.roster && m.roster.characters) || [];
    return chars.map(function (c) {
      return {
        contentId: c.content_id,
        name: c.name,
        rarity: c.rarity,
        position: c.position,
        style: c.style,
        school: null,
        stats: c.attributes_c,
        attributeSum: c.attribute_sum,
        potentials: c.potentials,
        template: null,
        scores: c.scores || null,
        positionRank: null,
        functionalTags: [],
        roleSummary: '',
        communityTier: c.community_tier || null,
        missingCAttrs: c.missing_c_attrs || []
      };
    });
  }

  function byName(name) {
    return (
      playerList().filter(function (p) {
        return p.name === name;
      })[0] || null
    );
  }

  /** 综合分：训练价值与比赛价值按权重混合（默认各 50%）。缺失维度用 50 分中性值并标记。 */
  function compositeScore(player, weights) {
    if (!player || !player.scores) return null;
    var w = weights || { battle: 0.5, training: 0.5 };
    var battle = player.scores.battle_score;
    var training = player.scores.training_value;
    if (battle == null && training == null) return null;
    var imputed = false;
    if (battle == null) {
      battle = 50;
      imputed = true;
    }
    if (training == null) {
      training = 50;
      imputed = true;
    }
    var score = battle * w.battle + training * w.training;
    return imputed ? Math.round(score * 10) / 10 : score;
  }

  /** 四流派预设（权重为方法定义，标「推断」；策略内容来自 T3 model + T8 roster_analysis）。 */
  var STREAMS = [
    {
      id: 'training',
      name: '训练流',
      weights: { battle: 0.3, training: 0.7 },
      desc: '高乘区上限、高投入；优先训练价值与表情/训练技能。',
      tagline: '表情+训练双乘区',
      confidence: '推断'
    },
    {
      id: 'battle',
      name: '比赛流',
      weights: { battle: 0.8, training: 0.2 },
      desc: '按 C 层面板与战斗技能排，优先 battle_score。',
      tagline: '面板 + 战斗技能',
      confidence: '推断'
    },
    {
      id: 'gacha',
      name: '扭蛋流',
      weights: { battle: 0.45, training: 0.55 },
      desc: '开荒最快、后期上限低；看经济/属性均衡与「再买一个」类天赋。',
      tagline: '买扭蛋全队加属性',
      confidence: '推断'
    },
    {
      id: 'shop',
      name: '商店流',
      weights: { battle: 0.5, training: 0.5 },
      desc: '20 级后稳定；看商店类天赋（减价/品质/数量）与续航。',
      tagline: '中后期经济自洽',
      confidence: '推断'
    }
  ];

  function streamById(id) {
    for (var i = 0; i < STREAMS.length; i++) {
      if (STREAMS[i].id === id) return STREAMS[i];
    }
    return STREAMS[0];
  }

  /** 按流派权重排序（可选筛选）。 */
  function rankByStream(streamId, filter) {
    var stream = streamById(streamId);
    var f = filter || {};
    return playerList()
      .filter(function (p) {
        if (f.rarity && f.rarity !== '全部' && p.rarity !== f.rarity) return false;
        if (f.position && f.position !== '全部' && p.position !== f.position) return false;
        if (f.tier && f.tier !== '全部' && p.communityTier !== f.tier) return false;
        if (f.query) {
          var q = String(f.query).toLowerCase();
          var hay = (p.name + ' ' + p.position + ' ' + (p.functionalTags || []).join(' ')).toLowerCase();
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      })
      .map(function (p) {
        return {
          player: p,
          score: compositeScore(p, stream.weights)
        };
      })
      .filter(function (x) {
        return x.score != null;
      })
      .sort(function (a, b) {
        return b.score - a.score;
      });
  }

  /** 四流派各自的第一梯队（工具内推荐）。 */
  function topByStream(streamId, n) {
    return rankByStream(streamId).slice(0, n || 6);
  }

  /** 队伍评分 + 位置平衡检查。 */
  function teamRating(names) {
    var list = playerList();
    var picked = (names || [])
      .map(function (name) {
        return list.filter(function (p) {
          return p.name === name;
        })[0];
      })
      .filter(Boolean);
    if (!picked.length) {
      return { count: 0, battle: null, training: null, composite: null, positions: {}, warnings: [] };
    }
    var sumB = 0;
    var sumT = 0;
    var positions = {};
    picked.forEach(function (p) {
      if (p.scores) {
        sumB += p.scores.battle_score || 0;
        sumT += p.scores.training_value || 0;
      }
      positions[p.position] = (positions[p.position] || 0) + 1;
    });
    var warnings = [];
    var roles = ['控卫', '分卫', '小前', '大前', '中锋'];
    roles.forEach(function (role) {
      if (!positions[role]) warnings.push('缺少 ' + role + '：位置模板加成/对位可能吃亏');
      if (positions[role] > 2) warnings.push(role + ' 过多（' + positions[role] + ' 人）：位置重叠');
    });
    return {
      count: picked.length,
      battle: sumB / picked.length,
      training: sumT / picked.length,
      composite: (sumB + sumT) / (2 * picked.length),
      positions: positions,
      warnings: warnings,
      players: picked
    };
  }

  /** 位置边际权重（六维每点对位置加权得分的贡献）。 */
  function positionMarginal(position) {
    var m = getModel();
    var w =
      m && m.roster && m.roster.algorithm && m.roster.algorithm.position_weights
        ? m.roster.algorithm.position_weights[position]
        : null;
    if (!w) w = { attack: 0.4, defense: 0.4, organize: 0.2 };
    return [
      { attr: '进攻（投射/攻筐）', weight: w.attack },
      { attr: '防守（防投/护筐）', weight: w.defense },
      { attr: '组织（传球/突破）', weight: w.organize }
    ];
  }

  /** 替换建议（T3 权威替换逻辑）。 */
  function replacementLogic() {
    var m = getModel();
    return (m && m.roster && m.roster.replacement_logic) || null;
  }

  function fourStreams() {
    var m = getModel();
    return (m && m.roster && m.roster.strategy_analysis && m.roster.strategy_analysis.four_streams) || null;
  }

  /** 梯队（优先用 derived_roster 的 GameKee 榜单）。 */
  function tierMap() {
    var data = getData();
    var out = {};
    var tiers = data && data.tierList && data.tierList.tiers;
    if (tiers) {
      Object.keys(tiers).forEach(function (tierName) {
        (tiers[tierName] || []).forEach(function (item) {
          var name = item.matched_player || item.name;
          out[name] = tierName;
        });
      });
    }
    if (!Object.keys(out).length) {
      playerList().forEach(function (p) {
        if (p.communityTier) out[p.name] = p.communityTier;
      });
    }
    return out;
  }

  function tierOf(name) {
    return tierMap()[name] || null;
  }

  function tierList() {
    var data = getData();
    return (data && data.tierList) || null;
  }

  function rankings() {
    var data = getData();
    return (data && data.rankings) || null;
  }

  function streamRoles() {
    var data = getData();
    return (data && data.streamRoles) || [];
  }

  function templates() {
    var data = getData();
    return (data && data.templates) || [];
  }

  function sampleCount() {
    return playerList().length;
  }

  return {
    STREAMS: STREAMS,
    playerList: playerList,
    byName: byName,
    compositeScore: compositeScore,
    streamById: streamById,
    rankByStream: rankByStream,
    topByStream: topByStream,
    teamRating: teamRating,
    positionMarginal: positionMarginal,
    replacementLogic: replacementLogic,
    fourStreams: fourStreams,
    tierMap: tierMap,
    tierOf: tierOf,
    tierList: tierList,
    rankings: rankings,
    streamRoles: streamRoles,
    templates: templates,
    sampleCount: sampleCount,
    rosterAlgorithm: rosterAlgorithm
  };
});
