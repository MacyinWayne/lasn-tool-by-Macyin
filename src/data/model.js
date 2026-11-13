/*!
 * data/model.js —— 自动生成，请勿手改。
 * 生成脚本：tool/scripts/build-model.mjs
 * 数据来源：knowledge/model.json（T3 formula-hunter）
 * 生成时间：2026-11-13T23:54:51.121Z
 *
 * file:// 下无法 fetch 本地 JSON，因此模型在构建期固化为全局脚本。
 */
(function (root) {
  'use strict';
  var data = {
  "schema": 1,
  "mode": "ready",
  "generatedAt": "2026-11-13T23:54:51.121Z",
  "source": "knowledge/model.json",
  "modelVersion": "v3.3",
  "schemaVersion": "1.0.0",
  "gameVersion": "1.18（公测，2026-10-23 开服）",
  "generatedBy": "formula-hunter (T3)",
  "meta": {
    "name": "篮球少女：飞跃巅峰 · 数值模型",
    "schema_version": "1.0.0",
    "model_version": "v3.3",
    "game_version": "1.18（公测，2026-10-23 开服）",
    "generated_at": "2026-11-05",
    "generated_by": "formula-hunter (T3)",
    "purpose": "工具包（训练计算器/表情优化器/比赛模拟器/养成计算器/验证器/图鉴）的数据内核",
    "source_priority": [
      "客户端配置/反编译（最高）",
      "GameKee wiki（人工整理自客户端）",
      "TapTap/官方帮助图实测",
      "媒体搬运（仅线索）"
    ],
    "evidence_levels": {
      "实测": "可复现公式/多数据点吻合",
      "多源一致": "≥2 独立来源或客户端原文",
      "单源": "单一来源",
      "推断": "推导未观测",
      "待验证": "无法确定，给区间"
    },
    "version_eras": {
      "内测": "2026-05~2026-08（5-15 扭蛋流速通帖、5-18 公式帖、5-22 战斗帖）",
      "先锋/删档测试": "2026-10 中旬~10-22（公测前预热与前瞻；截图窗口 k3_windows.cbt、水印「先锋测试版本」）",
      "公测": "2026-10-23 起（v1.18；本模型默认适用版本）"
    },
    "key_sources": [
      "data/client/extracted/attr_mapping.md",
      "data/structured/characters.json",
      "knowledge/claims.md",
      "https://www.taptap.cn/moment/805700735671995300",
      "https://www.taptap.cn/moment/862429125158111400",
      "https://www.taptap.cn/moment/863887392480691700",
      "https://www.taptap.cn/moment/861959872722241200",
      "https://www.taptap.cn/moment/862516446742185000",
      "https://www.taptap.cn/moment/865657519840692900",
      "https://www.taptap.cn/moment/807028912310717700",
      "https://www.gamekee.com/lqsn/725610.html",
      "https://www.gamekee.com/lqsn/725601.html",
      "https://www.gamekee.com/lqsn/725602.html",
      "https://www.gamekee.com/lqsn/726683.html",
      "https://www.gamekee.com/lqsn/725398.html",
      "https://www.gamekee.com/lqsn/725348.html",
      "https://www.gamekee.com/lqsn/725381.html"
    ],
    "version_changes": [
      {
        "item": "佐久间雨乃 训练技能（队友训练主属性+3，概率额外+2）",
        "eras": {
          "内测": "50%",
          "先锋测试": "40%"
        },
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995300",
          "screenshot 862516446742184898 图2"
        ]
      },
      {
        "item": "属性体系",
        "eras": {
          "内测": "面板=A层6属性，战斗=A层攻防卡",
          "公测": "图鉴/比赛=C层2级属性（三套维度并存）"
        },
        "evidence": [
          "data/client/extracted/attr_mapping.md"
        ]
      },
      {
        "item": "闪堂电",
        "eras": {
          "内测": "一般 UP",
          "公测": "增强"
        },
        "evidence": [
          "https://www.taptap.cn/moment/861959872722241200"
        ]
      },
      {
        "item": "表情一致概率/倍率档位、表情升级分布",
        "eras": {
          "公测": "7 档确切值（v3 客户端数值区）"
        },
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ]
      },
      {
        "item": "评分口径（rank）",
        "eras": {
          "公测": "rank ≈ Σ A 层六属性（10 人回放，7/10 精确）"
        },
        "evidence": [
          "data/apk/replay/ANALYSIS.md"
        ]
      }
    ],
    "v3_patch": {
      "applied_at": "2026-11-05",
      "source": "client-analyst cw_conf 数值区确证 + Lead offline_replay 回放提取",
      "added": [
        "attributes.new_realm（新境界/上限+200/失败率/减耗档位）",
        "expression.consistency_multiplier_progression / consistency_probability_progression / face_upgrade_distribution",
        "training.crit_* 实数 / training_failure_rate / stamina_cost_tiers",
        "battle.card_schools / battle.exhaustion / battle.versus_outcomes",
        "economy.ingame_gacha / economy.ingame_shop",
        "replay_evidence（rank≈ΣA六属性 + 10 人样本）",
        "attributes.attribute_id_map（101~123 语义）",
        "attributes.in_match_conversion（默认 ×1.6/×0.8 + replay_0 个别偏移）",
        "battle.replay_evidence（3 场回放、回合/对抗/统计结构、seed）",
        "battle.replay_evidence.property_event_stream / versus_ground_truth / stats_entry_names / calibration_next",
        "attributes.in_match_conversion.default_current=1.0（当前版本）；legacy_replay_0",
        "battle.current_C_battle.win_rate_model（3 个候选函数 + R²/MAE；差值模型优于比值模型）",
        "battle.result_code_mapping（1..4 编码 × win_rate 交叉统计与假设）",
        "battle.energy_stamina（体力201/能量301 曲线与建模指引）",
        "calibration.next_steps_v33"
      ],
      "still_missing": [
        "versus id → 属性对 完整映射表；result 抽样/阈值规则",
        "win_rate 全量样本（含无 win_rate 行的 result-only 样本）回归；每 versus 体力/能量消耗档位",
        "力竭全属性下降幅度、对抗 5 档名称与 4 码映射",
        "表情一致倍率档位语义与望月/龙宫寺 bonus 实数；训练基础点/精力消耗/失败结算；熟练度曲线与暴击率",
        "商店/扭蛋价格表、抽卡概率（EV）；成长/星级曲线"
      ],
      "corrections": [
        {
          "at": "2026-11-05",
          "item": "in_match 换算系数",
          "from": "默认 A×1.6 / B×0.8（曾作为通用公式）",
          "to": "当前版本 ×1.0（replay_1&2 255/255 命中）；1.6/0.8 仅旧格式 replay_0（136/150），已降级为 legacy_replay_0 并标注 versions",
          "reason": "client-analyst 交叉验证：replay_1/2 快照与赛前 property 完全相同（ratio=1.0）"
        }
      ]
    }
  },
  "evidenceLevels": {
    "实测": "可复现公式/多数据点吻合",
    "多源一致": "≥2 独立来源或客户端原文",
    "单源": "单一来源",
    "推断": "推导未观测",
    "待验证": "无法确定，给区间"
  },
  "versionEras": {
    "内测": "2026-05~2026-08（5-15 扭蛋流速通帖、5-18 公式帖、5-22 战斗帖）",
    "先锋/删档测试": "2026-10 中旬~10-22（公测前预热与前瞻；截图窗口 k3_windows.cbt、水印「先锋测试版本」）",
    "公测": "2026-10-23 起（v1.18；本模型默认适用版本）"
  },
  "versionChanges": [
    {
      "item": "佐久间雨乃 训练技能（队友训练主属性+3，概率额外+2）",
      "eras": {
        "内测": "50%",
        "先锋测试": "40%"
      },
      "evidence": [
        "https://www.taptap.cn/moment/805700735671995300",
        "screenshot 862516446742184898 图2"
      ]
    },
    {
      "item": "属性体系",
      "eras": {
        "内测": "面板=A层6属性，战斗=A层攻防卡",
        "公测": "图鉴/比赛=C层2级属性（三套维度并存）"
      },
      "evidence": [
        "data/client/extracted/attr_mapping.md"
      ]
    },
    {
      "item": "闪堂电",
      "eras": {
        "内测": "一般 UP",
        "公测": "增强"
      },
      "evidence": [
        "https://www.taptap.cn/moment/861959872722241200"
      ]
    },
    {
      "item": "表情一致概率/倍率档位、表情升级分布",
      "eras": {
        "公测": "7 档确切值（v3 客户端数值区）"
      },
      "evidence": [
        "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
      ]
    },
    {
      "item": "评分口径（rank）",
      "eras": {
        "公测": "rank ≈ Σ A 层六属性（10 人回放，7/10 精确）"
      },
      "evidence": [
        "data/apk/replay/ANALYSIS.md"
      ]
    }
  ],
  "attributes": {
    "resolution": "三套属性维度并存（客户端权威）：A=训练/面板6属性；B=1级属性点数5类；C=2级比赛属性14项。社区历史争论的「面板六维 vs 战斗属性」= 把 A 层与 C 层混用，H1/H2 假设由此作废（保留于 historical_hypotheses 供对照）。",
    "layers": {
      "A_training": {
        "name": "A 层：培养/训练属性（游戏内面板 6 图标槽）",
        "attrs": [
          "投射",
          "弹跳",
          "防守",
          "体能",
          "运控",
          "意识"
        ],
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/attr_mapping.md（UI_Img_Attr101~107，面板图标→器材类型）",
          "screenshot: 内测/先锋测试球员详情 6 图标（TapTap 862516446742184898、805700735671995246）"
        ],
        "icon_slots": [
          {
            "slot": 1,
            "icon_shape": "篮球+运动线",
            "color": "green",
            "attr": "投射",
            "confidence": "多源一致",
            "evidence": "UI_Img_Attr101 → 器材类型_投射"
          },
          {
            "slot": 2,
            "icon_shape": "棒状/4段短棒（待客户端图标确认）",
            "color": "green",
            "attr": "弹跳",
            "confidence": "多源一致",
            "evidence": "UI_Img_Attr102（客户端图标编号）+ 位序与数值角色特征推断"
          },
          {
            "slot": 3,
            "icon_shape": "旗帜/飘带",
            "color": "red",
            "attr": "防守",
            "confidence": "多源一致",
            "evidence": "UI_Img_Attr103"
          },
          {
            "slot": 4,
            "icon_shape": "棒状/哑铃（语义待确认）",
            "color": "green",
            "attr": "体能",
            "confidence": "多源一致",
            "evidence": "UI_Img_Attr104 + 器械对口：握力器→体能"
          },
          {
            "slot": 5,
            "icon_shape": "双向箭头",
            "color": "teal",
            "attr": "运控",
            "confidence": "多源一致",
            "evidence": "UI_Img_Attr105 + 器械对口：护目镜→运控"
          },
          {
            "slot": 6,
            "icon_shape": "学士帽",
            "color": "purple",
            "attr": "意识",
            "confidence": "多源一致",
            "evidence": "UI_Img_Attr106"
          }
        ],
        "training_pairs": {
          "投射训练": [
            "投射",
            "运控"
          ],
          "弹跳训练": [
            "弹跳",
            "体能"
          ],
          "防守训练": [
            "防守",
            "体能"
          ],
          "体能训练": [
            "体能",
            "投射"
          ],
          "运控训练": [
            "运控",
            "意识"
          ],
          "意识训练": [
            "意识",
            "弹跳"
          ],
          "note": "edu_train_conf 原文；每次训练同时提升两项（主=训练项，副=另一项）。副属性收益比例待验证。"
        },
        "friend_card": {
          "attr": "友人",
          "icon": "UI_Img_Attr107",
          "note": "友人卡角标，不计入 6 属性"
        }
      },
      "B_primary_points": {
        "name": "B 层：1 级属性（点数）5 类",
        "attrs": [
          {
            "en": "offense",
            "name": "进攻点数",
            "converts_to": [
              "投射",
              "攻筐"
            ]
          },
          {
            "en": "defense",
            "name": "防守点数",
            "converts_to": [
              "防投",
              "护筐"
            ]
          },
          {
            "en": "playmaking",
            "name": "组织点数",
            "converts_to": [
              "传球",
              "突破"
            ]
          },
          {
            "en": "confrontation",
            "name": "对抗点数",
            "converts_to": [
              "篮板",
              "逼抢"
            ]
          },
          {
            "en": "fitness",
            "name": "体能点数",
            "converts_to": [
              "耐力",
              "爆发"
            ]
          }
        ],
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/attr_mapping.md（表名「1级属性」，偏移 15155661 起）"
        ],
        "note": "点数→C 层属性的转化系数未知（待客户端数值区）。"
      },
      "C_secondary_battle": {
        "name": "C 层：2 级比赛属性 14 项",
        "attrs": [
          {
            "en": "shot",
            "name": "投射",
            "desc": "提高中投和三分出手的命中力"
          },
          {
            "en": "attack_hoop",
            "name": "攻筐",
            "desc": "提高上篮、扣篮等内线出手的命中力"
          },
          {
            "en": "def_shot",
            "name": "防投",
            "desc": "降低对方中投和三分出手的命中力"
          },
          {
            "en": "def_attack_hoop",
            "name": "护筐",
            "desc": "降低对方上篮、扣篮等内线出手的命中力"
          },
          {
            "en": "organization",
            "name": "传球",
            "desc": "提高发动快攻的成功率"
          },
          {
            "en": "dribble",
            "name": "突破",
            "desc": "提高突破和虚晃的成功率"
          },
          {
            "en": "rebound",
            "name": "篮板",
            "desc": "提高争抢到篮板的概率"
          },
          {
            "en": "strength",
            "name": "逼抢",
            "desc": "降低对方突破/虚晃/快攻/挡拆的成功率"
          },
          {
            "en": "endurance",
            "name": "耐力",
            "desc": "耐力不足时，球员能力会大幅下降"
          },
          {
            "en": "explosive",
            "name": "爆发",
            "desc": "提高发动挡拆的成功率"
          },
          {
            "en": "stamina",
            "name": "体力",
            "desc": "当前耐力值"
          },
          {
            "en": "max_stamina",
            "name": "最大体力",
            "desc": "最大耐力值"
          },
          {
            "en": "energy",
            "name": "能量",
            "desc": "当前能量值"
          },
          {
            "en": "max_energy",
            "name": "最大能量",
            "desc": "最大能量值"
          }
        ],
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/attr_mapping.md（表名「2级属性」，偏移 15156100 起）"
        ],
        "gamekee_subset": {
          "provided_by_gamekee": [
            "投射",
            "攻筐",
            "防投",
            "护筐",
            "传球",
            "突破"
          ],
          "missing": [
            "篮板",
            "逼抢",
            "耐力",
            "爆发",
            "体力",
            "最大体力",
            "能量",
            "最大能量"
          ],
          "note": "GameKee 图鉴「属性参考」只是 C 层前 6 项；模型对中锋/大前的篮板/逼抢评分偏保守，待客户端配置补全。"
        }
      },
      "D_in_battle": {
        "name": "D 层：战中属性",
        "attrs": [
          {
            "en": "hitpower",
            "name": "命中力/综合命中力"
          },
          {
            "en": "real_hitpower",
            "name": "真实命中力"
          }
        ],
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/attr_mapping.md（偏移 15158400）"
        ]
      }
    },
    "panel_observations": [
      {
        "era": "内测",
        "date": "2026-05",
        "character": "佐久间 雨乃",
        "level": "60/60",
        "slots": [
          120,
          223,
          221,
          134,
          124,
          128
        ],
        "source": "https://www.taptap.cn/moment/805700735671995300"
      },
      {
        "era": "先锋/删档测试",
        "date": "2026-10-23(文件名)",
        "character": "佐久间 雨乃",
        "level": "20/20",
        "slots": [
          79,
          161,
          159,
          92,
          82,
          87
        ],
        "source": "https://www.taptap.cn/moment/862516446742185000"
      },
      {
        "era": "先锋/删档测试",
        "date": "2026-10-23(文件名)",
        "character": "和泉 香织",
        "level": "1/10",
        "slots": [
          79,
          65,
          77,
          65,
          143,
          143
        ],
        "source": "https://www.taptap.cn/moment/862516446742185000"
      }
    ],
    "derived_rules": {
      "potential_rule": {
        "value": "六项潜力之和恒等于 1000（38/38）",
        "unit": "千分比",
        "confidence": "多源一致",
        "evidence": [
          "data/structured/characters.json",
          "https://www.gamekee.com/lqsn/725361.html"
        ],
        "note": "潜力=成长权重分配，不是绝对属性"
      },
      "attribute_curve": {
        "value": "属性参考 ≈ a_rarity + b_rarity × 潜力",
        "unit": "公式",
        "confidence": "多源一致",
        "evidence": [
          "data/structured/characters.json"
        ],
        "note": "见 params",
        "params": {
          "SSR": {
            "a": 107.115,
            "b": 0.5508,
            "attribute_sum_mean": 1193.5
          },
          "SR": {
            "a": 98.544,
            "b": 0.5014,
            "attribute_sum_mean": 1092.6
          },
          "R": {
            "a": 100.026,
            "b": 0.3612,
            "attribute_sum_mean": 961.3
          }
        },
        "anomaly_note": "澪奈·贾妮丝/龙宫寺心叶为 SR 异常点（属性总和 ~1290+，疑更高等级/星级数据）→ 已从拟合剔除并在 roster 标注"
      },
      "attribute_budget": {
        "value": "SSR 属性总和≈1193.5 几乎恒定；SR≈1093（异常点除外）；R≈961",
        "unit": "点",
        "confidence": "多源一致",
        "evidence": [
          "data/structured/characters.json"
        ],
        "note": "稀有度决定总预算，模板(潜力向量)决定分配 → 相对强度主要来自分配+技能乘区"
      },
      "templates": [
        {
          "potentials": [
            100,
            260,
            130,
            233,
            110,
            167
          ],
          "count": 4,
          "members": [
            "亚理纱 贾斯敏(SR·中锋)",
            "绿川 步梦(SR·中锋)",
            "千圣·贝尔丝(SSR·中锋)",
            "榎本 纯那(SSR·中锋)"
          ]
        },
        {
          "potentials": [
            137,
            132,
            110,
            112,
            255,
            254
          ],
          "count": 3,
          "members": [
            "和泉 香织(SSR·控卫)",
            "克拉丽丝·波洛(SR·控卫)",
            "森田 莉莉(R·控卫)"
          ]
        },
        {
          "potentials": [
            100,
            260,
            220,
            143,
            110,
            167
          ],
          "count": 3,
          "members": [
            "洺瑶(SSR·中锋)",
            "五十岚 诗音(R·中锋)",
            "希雅·奥黛拉(SSR·中锋)"
          ]
        },
        {
          "potentials": [
            199,
            167,
            135,
            171,
            115,
            213
          ],
          "count": 2,
          "members": [
            "龙宫寺 心叶(SR·大前)",
            "雨森 琉璃(SSR·大前)"
          ]
        },
        {
          "potentials": [
            109,
            257,
            225,
            171,
            115,
            123
          ],
          "count": 2,
          "members": [
            "早濑 千秋(SR·大前)",
            "稻叶 杏里(SSR·大前)"
          ]
        },
        {
          "potentials": [
            260,
            122,
            118,
            110,
            230,
            160
          ],
          "count": 2,
          "members": [
            "羽田 朱志香(SSR·分卫)",
            "卧云 真昼(SSR·分卫)"
          ]
        },
        {
          "potentials": [
            130,
            260,
            198,
            139,
            150,
            123
          ],
          "count": 2,
          "members": [
            "皆川 式(SR·小前)",
            "羽濑川 湊(SSR·小前)"
          ]
        },
        {
          "potentials": [
            109,
            257,
            135,
            261,
            115,
            123
          ],
          "count": 2,
          "members": [
            "佐久间 雨乃(SSR·大前)",
            "春澄 永远(SR·大前)"
          ]
        }
      ],
      "position_templates": {
        "小前": {
          "sample_size": 7,
          "potentials_avg": [
            170,
            229,
            147,
            148,
            165,
            142
          ]
        },
        "大前": {
          "sample_size": 7,
          "potentials_avg": [
            148,
            218,
            161,
            210,
            115,
            149
          ]
        },
        "分卫": {
          "sample_size": 7,
          "potentials_avg": [
            229,
            155,
            129,
            127,
            180,
            180
          ]
        },
        "控卫": {
          "sample_size": 9,
          "potentials_avg": [
            154,
            140,
            132,
            122,
            209,
            243
          ]
        },
        "中锋": {
          "sample_size": 8,
          "potentials_avg": [
            111,
            249,
            164,
            199,
            110,
            167
          ]
        }
      }
    },
    "history_hypotheses": {
      "note": "以下为 2026-11-05 前基于社区证据的两种假设，已被客户端三套维度取代，仅保留作推理留痕与验证器兼容旧数据。",
      "H1": {
        "claim": "公测面板六维＝投射/攻筐/防投/护筐/传球/突破；弹跳/运控/防守为旧内部名",
        "status": "rejected",
        "reason": "A 层面板图标 UI_Img_Attr101~106 明确为 投射/弹跳/防守/体能/运控/意识"
      },
      "H2": {
        "claim": "面板仍是旧六维（投射/弹跳/防守/体能/运控/意识），GameKee 六维是另一套数据",
        "status": "accepted_with_correction",
        "reason": "面板=A 层正确；但 GameKee 六维不是「球员卡资质」，而是 C 层 2 级属性子集"
      }
    },
    "discriminating_tests": [
      {
        "id": "ATTR-T1",
        "question": "面板第 2/4 图标（棒状）分别是什么属性？",
        "observation": "游戏内长按/点击属性图标看 tooltip 名称；或记录一次训练前后的两槽位差值",
        "if_A": "槽2=弹跳、槽4=体能",
        "if_B": "若 tooltip 显示其他名称则更新",
        "status": "open",
        "priority": "low（客户端已基本确证）"
      },
      {
        "id": "ATTR-T2",
        "question": "副属性收益 = 主属性收益的多少比例？",
        "observation": "记录一次「投射训练」前后面板 投射 与 运控 的增量",
        "expected": "副/主 比值 ∈ [0.3,0.7]",
        "status": "open",
        "priority": "高"
      },
      {
        "id": "ATTR-T3",
        "question": "A 层面板属性如何决定 C 层比赛属性？",
        "observation": "同一角色育成前后 C 层图鉴变化 / 竞技场属性详情",
        "expected": "未知（候选：A→B 点数→C；或 A 直接映射）",
        "status": "open",
        "priority": "高（等待客户端数值区）"
      },
      {
        "id": "ATTR-T4",
        "question": "GameKee 六维是满级值还是成长率？",
        "observation": "对比同一角色不同等级时图鉴数值（图鉴可能固定）",
        "expected": "图鉴应固定为「参考值」",
        "status": "open",
        "priority": "中"
      }
    ],
    "new_realm": {
      "note": "A 层属性「新境界」机制（客户端数值区确证）：属性达到阈值触发新境界，属性上限 +200；此前 9game 文所述「1300 破限」由此正式确认。",
      "thresholds": {
        "value": [
          1300,
          1400,
          1600
        ],
        "unit": "属性值",
        "confidence": "多源一致",
        "evidence": [
          "cw_conf 数值区（@7565009/@7565068/@7565127 对应文案）+ data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "训练中属性达到新境界的触发值；档位与技能/强化相关，非全员同一阈值"
      },
      "attribute_cap_bonus": {
        "value": 200,
        "unit": "点",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "触发新境界后属性上限 +200（客户端数值区）"
      },
      "half_rule": {
        "value": {
          "exists": true,
          "ratio": "待验证"
        },
        "unit": "规则",
        "confidence": "待验证",
        "evidence": [
          "cw_train_effects_tokens.txt（modity_property_half / modity_property_half_ratio）",
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "存在「属性折半」机制与折半比例字段；具体触发条件（是否破限后折半）待验证"
      },
      "training_failure_rate_tiers": {
        "value": [
          0.01,
          0.02,
          0.04,
          0.06,
          0.08,
          0.2,
          1
        ],
        "unit": "概率",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "训练失败率档位 1%/2%/4%/6%/8%/20%/100%（与训练等级/器材/技能相关）"
      },
      "stamina_cost_tiers": {
        "value": "−5% ~ −80%",
        "unit": "精力消耗修正",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "训练精力消耗减免档位（技能/器材/强化来源），与 training 减耗参数互补"
      }
    },
    "attribute_id_map": {
      "note": "客户端属性数值 ID 权威映射（来自 offline_replay 与 cw_conf 效果枚举交叉确证）",
      "confidence": "多源一致",
      "evidence": [
        "data/client/replay/REPLAY_ANALYSIS.md",
        "data/client/replay/players_base_property.csv",
        "cw_knowledge_strings.md（效果枚举）"
      ],
      "ids": {
        "101": "投射（A 层）",
        "102": "弹跳（A 层）",
        "103": "防守（A 层）",
        "104": "体能（A 层）",
        "105": "运控（A 层）",
        "106": "意识（A 层）",
        "107": "二级/子属性 1",
        "108": "二级/子属性 2",
        "109": "二级/子属性 3",
        "110": "二级/子属性 4",
        "111": "二级/子属性 5（B 类系数 0.8）",
        "112": "二级/子属性 6",
        "113": "二级/子属性 7",
        "114": "二级/子属性 8（B 类系数 0.8）",
        "115": "二级/子属性 9（B 类系数 0.8）",
        "116": "熟练度（器材）",
        "117": "暴击加成",
        "119": "出现率",
        "120": "陪伴加成",
        "121": "训练失败率",
        "122": "亲密度",
        "123": "成功概率",
        "201": "体力/耐力（与 202 成对，10 人样本恒相等）",
        "202": "最大体力/最大耐力 或 命中力/真实命中力（待验证）",
        "301": "状态/力竭计数（样本恒 0）",
        "302": "士气/心情/能量类（样本 20~36，不随赛内倍率变化）"
      },
      "note_116_123": "116~123 来自 cw_conf 效果枚举与 replay 字段对应（client-analyst 确证）；107~115 的具体语义仍待 schema 完全对齐"
    },
    "in_match_conversion": {
      "note": "【v3.2 更正】赛前面板值 → 赛内快照的换算规则按回放格式分版本：当前版本 = ×1.0（无衰减）；1.6/0.8 只出现在旧格式回放（replay_0），不是通用公式。建模默认用 default_current=1.0。",
      "confidence": "多源一致（current: replay_1&2 共 255/255 点 ratio=1.0；legacy: replay_0 136/150 点命中 1.6/0.8）",
      "evidence": [
        "data/client/replay/replay_1.json",
        "data/client/replay/replay_2.json",
        "data/client/replay/replay_0.json",
        "data/client/replay/REPLAY_ANALYSIS.md",
        "knowledge/_build/v32_replay_check.json"
      ],
      "default_current": {
        "value": 1,
        "unit": "倍率",
        "confidence": "多源一致",
        "evidence": [
          "data/client/replay/replay_1.json",
          "data/client/replay/replay_2.json",
          "data/client/replay/REPLAY_ANALYSIS.md",
          "knowledge/_build/v32_replay_check.json"
        ],
        "note": "当前版本格式（含 role_id/duty/label_id）：replay_1（150 点）与 replay_2（105 点）的 occ=5 快照与赛前 players[i].property 完全相同，ratio=1.0，合计 255/255 = 100%",
        "formats": "当前版本回放（replay_1/2）",
        "validation": {
          "replay_1": "150/150",
          "replay_2": "105/105"
        }
      },
      "default_current_ids_note": "默认 current 规则下全部属性 ID（101~115）ratio=1.0；201/202/301/302 亦不乘系数（其语义见属性事件流）",
      "legacy_replay_0": {
        "note": "旧格式回放（无 role_id/duty/label_id）特有差异：A 类 ×1.6、B 类 ×0.8。属历史/旧版本，不在当前版本模型中使用。",
        "versions": [
          "旧版本回放格式（replay_0，新手/旧模板 template=6, short_form=3）"
        ],
        "confidence": "单源（仅 replay_0 一场可校验；90.7% 命中）",
        "A_multiplier": {
          "value": 1.6,
          "unit": "倍率",
          "confidence": "单源",
          "evidence": [
            "data/client/replay/replay_0.json",
            "data/client/replay/REPLAY_ANALYSIS.md",
            "knowledge/_build/v32_replay_check.json"
          ],
          "note": "属性 ID 101~110、112、113；replay_0 中 106/150 点命中该系数"
        },
        "B_multiplier": {
          "value": 0.8,
          "unit": "倍率",
          "confidence": "单源",
          "evidence": [
            "data/client/replay/replay_0.json",
            "data/client/replay/REPLAY_ANALYSIS.md",
            "knowledge/_build/v32_replay_check.json"
          ],
          "note": "属性 ID 111、114、115；replay_0 中 30/150 点命中该系数"
        },
        "A_ids": [
          "101",
          "102",
          "103",
          "104",
          "105",
          "106",
          "107",
          "108",
          "109",
          "110",
          "112",
          "113"
        ],
        "B_ids": [
          "111",
          "114",
          "115"
        ],
        "validation": {
          "points": 150,
          "hit_1_6": 106,
          "hit_0_8": 30,
          "hit_1_0": 1,
          "other": 13,
          "total_hit_ratio": 0.9067
        },
        "interpretation": "1.6/0.8 可能是旧版本「面板→赛内」的展示/结算缩放（如旧 UI 以 125% 显示或旧战斗系数），当前版本已取消或改由 buff/技能在事件流中体现"
      },
      "exceptions_observed": {
        "note": "【v3.2 重新归因】下表 14 个偏移仅存在于旧格式回放 replay_0，不再作为「通用公式的例外」；当前版本（replay_1/2）无任何偏移（ratio 全 1.0）",
        "format": "legacy_replay_0",
        "list": [
          {
            "name": "澪奈·贾妮丝",
            "level": 1,
            "ids": {
              "101": 0.489,
              "102": 0.434,
              "103": 0.358,
              "104": 0.571,
              "105": 0.61,
              "106": 0.429
            },
            "note": "六项 A 层属性全部低于默认倍率（in-match 值反而低于 base×1.6）→ 疑赛前被弱化/状态修正或该场快照口径不同"
          },
          {
            "name": "五十岚 诗音",
            "level": 1,
            "ids": {
              "102": 2.08
            },
            "note": "弹跳 in-match = base×2.08（超出 1.6）→ 疑技能/buff 提升"
          },
          {
            "name": "皆川 式",
            "level": 2,
            "ids": {
              "101": 0.76,
              "102": 0.658,
              "103": 1.017,
              "104": 0.732,
              "105": 0.75,
              "106": 0.8
            },
            "note": "六项均偏离默认 → 同上"
          },
          {
            "name": "佐久间 雨乃",
            "level": 2,
            "ids": {
              "106": 2.08
            },
            "note": "意识 in-match = base×2.08 → 疑技能/buff 提升"
          }
        ],
        "reattribution": [
          "澪奈六项（0.358~0.61）：旧格式回放中的赛前状态修正或旧结算口径，当前版本不存在",
          "五十岚 102=2.08 / 佐久间 106=2.08：旧格式中的技能/buff 覆盖；当前版本改由 versus.properties 覆盖字段体现",
          "皆川六项（0.66~1.02）：同上"
        ]
      },
      "modelling_rule": [
        "当前版本（含 role_id/duty/label_id 的回放格式）：赛内值 = 面板值（×1.0）",
        "仅当处理旧格式回放/旧客户端数据时才应用 A=1.6、B=0.8（并标注 versions）",
        "赛内属性变化一律通过 property 事件流（occ=1/2/4 增量）+ versus.properties 覆盖解释，不要用全局倍率硬套"
      ]
    }
  },
  "training": {
    "formula_spec": {
      "main_gain": "主属性增加 = ( base[主属性] + (训练等级-1)×level_bonus + personnel_bonus + equip_match_bonus ) × (1 + Σ训练加成 + mood_bonus) × (1 + crit_bonus) + flat_bonus",
      "secondary_gain": "副属性增加 = main_gain × secondary_ratio；主/副属性固定绑定：投射→运控、弹跳→意识、防守→体能、体能→弹跳、运控→防守、意识→体能（寒溟实机 2026-11-05）；副属性比例观察约 0.33~0.5，待更多样本。",
      "display_value": "游戏内点训练显示的数字 = 未计入表情爆发的数值（main_gain + secondary_gain 展示口径待验证）",
      "with_expression": "最终属性增加 = main_gain × (1 + Σ每表情bonus) × (表情不一致=1 / 一致时=一致倍率)",
      "variables": [
        "base",
        "level_bonus",
        "personnel_bonus",
        "equip_match_bonus",
        "训练加成",
        "mood_bonus",
        "crit_bonus",
        "flat_bonus",
        "secondary_ratio",
        "表情系统(见 expression 模块)"
      ],
      "rng_note": "训练随机数：寒溟实测同配置重复训练结果每次不同；Player.log 中训练请求 education.cs_train 仅携带 cmd_idx，结果由服务器 sc_train_result_start / sc_refresh_education / sc_train_result_end 下发，日志无 seed/random/暴击 字样 → 判断为服务器端每次独立 roll，客户端无法用种子预演；只能做期望值最优。"
    },
    "params": {
      "base_normal": {
        "value": 10,
        "unit": "点",
        "confidence": "实测",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "常规属性（A层：投射/弹跳/防守/体能/运控）训练初始基础=10；适用 内测；公测是否仍 10 待验证",
        "versions": {
          "内测": 10,
          "公测": "待验证(默认10)"
        }
      },
      "base_awareness": {
        "value": 8,
        "unit": "点",
        "confidence": "实测",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "意识=8；适用 内测",
        "versions": {
          "内测": 8,
          "公测": "待验证(默认8)"
        }
      },
      "level_bonus_per_level": {
        "value": 3,
        "unit": "点/训练等级",
        "confidence": "实测",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "训练等级加成=(等级-1)×3"
      },
      "personnel_bonus": {
        "value": 5,
        "unit": "点",
        "confidence": "实测",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "在场人员加值 +5（多人同训仍算 1 人，不叠加）"
      },
      "manager_bonus": {
        "value": 5,
        "unit": "点",
        "confidence": "推断",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "经理可能是 +5 或不同（作者经理场景误差大）→ 区间 [3,5]",
        "range": [
          3,
          5
        ]
      },
      "equip_match_bonus": {
        "value": 1,
        "unit": "点",
        "confidence": "实测",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "对口器材 +1（护目镜→运控，握力器→体能）"
      },
      "secondary_ratio": {
        "value": 0.5,
        "unit": "比例",
        "confidence": "待验证",
        "evidence": [
          "data/client/extracted/attr_mapping.md（训练成对提升）",
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "每次训练同时提升两项，副属性收益比例未公开 → 区间 [0.3,0.7]，默认 0.5",
        "range": [
          0.3,
          0.7
        ]
      },
      "training_bonus_sum": {
        "value": "Σ训练加成%（技能/强化/加成）",
        "unit": "百分比",
        "confidence": "多源一致",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246",
          "data/client/extracted/attr_mapping.md（%s训练*Bonus%d%%）"
        ],
        "note": "乘法乘区；腾松/雨乃2命的 +3% 落在此区"
      },
      "training_bonus_cap": {
        "value": {
          "恢复精力类": 0.25,
          "购买商品类": 0.25,
          "升级后": 0.35
        },
        "unit": "百分比",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_knowledge_strings.md @7609626 / @7610946 / @7561018"
        ],
        "note": "「每恢复精力提升的训练加成」与「每购买商品提升的训练加成」上限 25%，升级后 35% → 训练加成% 乘区有 cap，工具需支持"
      },
      "base_per_attr_modifiers": {
        "value": "角色技能可直接提升 A 层属性的训练基础值（例：防守/体能 基础值 +2/+4/+6/+7）",
        "unit": "点",
        "confidence": "多源一致",
        "evidence": [
          "cw_knowledge_strings.md @7582485 / @7582620 / @7582665"
        ],
        "note": "角色技能可直接提升 A 层属性的训练基础值（防守/体能 基础值 +2/+4/+6/+7）；v3 数值区确认档位存在"
      },
      "mood_bonus": {
        "value": {
          "极好": 0.2,
          "好": 0.1,
          "一般": 0,
          "差": -0.1,
          "极差": -0.2
        },
        "unit": "百分比",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/attr_mapping.md（情绪表，偏移 15158192）"
        ],
        "note": "心情作用于训练点数（乘区与 训练加成% 是否同区待验证，默认独立相加进同一 multiplier）"
      },
      "crit_bonus": {
        "value": "取 crit_bonus_tiers 之一（+5%~+20%）",
        "unit": "百分比",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "（替换 v1 的待验证占位）暴击加成 = (1 + 档位)；档位由器材/技能决定",
        "range": [
          0.05,
          0.2
        ]
      },
      "flat_bonus": {
        "value": "主属性加值（加法区）",
        "unit": "点",
        "confidence": "实测",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "雨乃技能/扭蛋加值在此；不受训练加成%放大 → 稀释根源"
      },
      "stamina_cost": {
        "note": "训练精力消耗未公开；已知 打工服务员 25 精力/次、扭蛋流周五留25/商店流留50、望月门槛 ≥120 上限与休息≥70 → 推断训练消耗 20~30/次，休息恢复 60~80",
        "confidence": "推断",
        "evidence": [
          "https://www.taptap.cn/moment/865657519840692900",
          "https://www.gamekee.com/lqsn/725601.html",
          "https://www.gamekee.com/lqsn/725602.html"
        ],
        "range": [
          20,
          30
        ]
      },
      "sea_variants": {
        "value": 6,
        "unit": "种",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/attr_mapping.md（海边*训练 6 变体）"
        ],
        "note": "场地变体（海边合宿周等）→ 额外加成系数待验证",
        "range": null
      },
      "event_sources": {
        "value": [
          "Initactor 训练事件",
          "Supactor 器材事件",
          "Chapter 剧本事件",
          "State 状态事件",
          "Teammate 队友事件",
          "TeamBuilding",
          "StarCard 球星卡训练事件"
        ],
        "unit": "枚举",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/attr_mapping.md"
        ],
        "note": "训练加成来源分类，可用于拆乘区"
      },
      "crit_proficiency_threshold": {
        "value": 70,
        "unit": "熟练度",
        "confidence": "多源一致",
        "evidence": [
          "@7551259 + data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "器材熟练度 ≥70 触发暴击训练（v2 已有，v3 数值区确认）"
      },
      "crit_bonus_tiers": {
        "value": [
          0.05,
          0.1,
          0.15,
          0.2
        ],
        "unit": "百分比",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "器材暴击加成档位：+5%/+10%/+15%/+20%（v2 只知 +5/10/20，v3 补 +15%）"
      },
      "crit_training_income_tiers": {
        "value": [
          0.2,
          0.3,
          0.4
        ],
        "unit": "百分比",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "器材暴击训练收益档位 +20%/+30%/+40%"
      },
      "stamina_cost_tiers": {
        "value": "−5% ~ −80%",
        "unit": "精力消耗修正",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "训练精力消耗减免档位；可与减耗角色技能叠加时受 cap 限制待验证"
      },
      "training_failure_rate": {
        "value": [
          0.01,
          0.02,
          0.04,
          0.06,
          0.08,
          0.2,
          1
        ],
        "unit": "概率",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "失败率档位；失败时训练收益/精力/熟练度结算规则待验证"
      },
      "training_pairs": {
        "value": [
          {
            "primary": "投射",
            "secondary": "运控"
          },
          {
            "primary": "弹跳",
            "secondary": "意识"
          },
          {
            "primary": "防守",
            "secondary": "体能"
          },
          {
            "primary": "体能",
            "secondary": "弹跳"
          },
          {
            "primary": "运控",
            "secondary": "防守"
          },
          {
            "primary": "意识",
            "secondary": "体能"
          }
        ],
        "unit": "映射表",
        "confidence": "寒溟实测",
        "evidence": [
          "游戏内训练界面预测值（2026-11-05，寒溟实测）"
        ],
        "note": "主/副属性固定绑定；此表推翻了此前从客户端 edu_train_conf 字符串解析的旧配对（旧：弹跳→体能、体能→投射、运控→意识、意识→弹跳），以实机为准",
        "supersedes": "old_client_string_parse"
      },
      "secondary_ratio_range": {
        "value": [
          0.33,
          0.5
        ],
        "unit": "比例",
        "confidence": "寒溟实测(少量样本)",
        "evidence": [
          "训练界面预测值：投射18/运控6=0.33；弹跳13/意识5≈0.38；运控15/防守6=0.4；意识12/体能6=0.5"
        ],
        "note": "副属性/主属性收益比例；随属性类型/配置变化，待更多样本拟合"
      },
      "rng_mode": {
        "value": "server_authoritative_per_training",
        "unit": "机制",
        "confidence": "寒溟实测+日志证据",
        "evidence": [
          "education.cs_train {cmd_idx} 请求；sc_train_result_start/end + sc_refresh_education 下发",
          "同配置重复训练结果每次不同（寒溟实机）"
        ],
        "note": "训练结果无法通过种子本地复现；最优策略只能按期望值计算"
      }
    },
    "role_skills": {
      "佐久间 雨乃": {
        "tier": "T2",
        "role": "前期核心（flat 主属性加值，后期稀释）",
        "flat_bonus_per_training": {
          "value": 3.8,
          "unit": "点/次训练",
          "confidence": "实测",
          "evidence": [
            "https://www.taptap.cn/moment/805700735671995300",
            "screenshot: 40% × +2 + 3"
          ],
          "note": "内测=3+0.5*2=4.0；公测/先锋测试截图=3+0.4*2=3.8（版本参数变化）",
          "versions": {
            "内测": 4,
            "先锋测试": 3.8
          }
        },
        "decay_note": "加法乘区独立、基础值大 → 边际稀释，约 1 个月后乏力"
      },
      "望月 透": {
        "tier": "T2",
        "role": "长期组件（表情 bonus 乘区，+8%）",
        "expression_bonus": {
          "value": 0.08,
          "unit": "百分比(加法进 Σbonus)",
          "confidence": "实测",
          "evidence": [
            "https://www.taptap.cn/moment/805700735671995300"
          ],
          "note": "在 (1+Σbonus) 乘区内，与龙宫寺同区稀释；需精力门槛（≥120 上限/休息≥70）"
        }
      },
      "龙宫寺 心叶": {
        "tier": "T3",
        "role": "低配望月（+4%）",
        "expression_bonus": {
          "value": 0.04,
          "unit": "百分比(加法进 Σbonus)",
          "confidence": "实测",
          "evidence": [
            "https://www.taptap.cn/moment/805700735671995300"
          ],
          "note": "望月下位替代"
        }
      },
      "真崎 辉世": {
        "tier": "T1",
        "role": "表情一致倍率乘区（2.5+0.25）",
        "consistency_multiplier_bonus": {
          "value": 0.25,
          "unit": "倍率加值",
          "confidence": "实测",
          "evidence": [
            "https://www.taptap.cn/moment/805700735671995300"
          ],
          "note": "作用于「一致时倍率」乘区（2.5→2.75）"
        }
      },
      "闪堂电": {
        "tier": "T0",
        "role": "表情一致概率 +15%；2★哭/平常→笑脸 30%/60%",
        "expression_probability": {
          "value": 0.15,
          "unit": "概率加成",
          "confidence": "多源一致",
          "evidence": [
            "https://www.gamekee.com/lqsn/726683.html",
            "https://www.taptap.cn/moment/861959872722241200"
          ],
          "note": "官方技能演示；2★ 质变",
          "versions": {
            "内测": "一般UP",
            "公测": "增强"
          }
        }
      },
      "藤松 玖怜": {
        "tier": "T2",
        "role": "精力回复 5 次 → 训练加成%（乘法区）",
        "training_bonus": {
          "value": 0,
          "unit": "百分比(待定)",
          "confidence": "多源一致",
          "evidence": [
            "https://www.taptap.cn/moment/862429125158111400",
            "https://www.taptap.cn/moment/805700735671995300"
          ],
          "note": "系数未给出 → 待验证；位置为训练加成%乘区"
        }
      },
      "亚理纱 贾斯敏": {
        "tier": "T2",
        "role": "减训练精力消耗（开荒核心）",
        "stamina_reduction": {
          "value": 0,
          "unit": "精力/次(待定)",
          "confidence": "多源一致",
          "evidence": [
            "https://www.taptap.cn/moment/862429125158111400",
            "https://www.gamekee.com/lqsn/725610.html"
          ],
          "note": "系数待验证"
        }
      },
      "希雅·奥黛拉": {
        "tier": "T0",
        "role": "额外拉人（1★稳定拉，训练流核心）",
        "extra_trainee": {
          "value": 1,
          "unit": "人(推断)",
          "confidence": "多源一致",
          "evidence": [
            "https://www.taptap.cn/moment/862429125158111400",
            "https://www.taptap.cn/moment/863887392480691700"
          ],
          "note": "「额外拉人」机制细节待验证"
        }
      },
      "百目鬼 剑": {
        "tier": "T2",
        "role": "周末加训（额外训练机会）",
        "extra_training": {
          "value": 1,
          "unit": "次/周(推断)",
          "confidence": "单源",
          "evidence": [
            "https://www.taptap.cn/moment/862429125158111400"
          ],
          "note": "细节待验证"
        }
      },
      "榎本 纯那": {
        "tier": "T3",
        "role": "购买商品 5 次 → 训练加成%",
        "training_bonus": {
          "value": 0,
          "unit": "百分比(待定)",
          "confidence": "多源一致",
          "evidence": [
            "https://www.taptap.cn/moment/862429125158111400"
          ],
          "note": "系数待验证"
        }
      },
      "克拉丽丝·波洛": {
        "tier": "T3",
        "role": "过渡（凑合用）",
        "note": "羽帖：「克拉丽丝凑合用，实战还行」"
      },
      "澪奈·贾妮丝": {
        "tier": "T3",
        "role": "最终加成（SR 训练流）",
        "note": "羽帖：「澪奈(最终加成)」；系数待验证"
      }
    },
    "calibration_hints": [
      "用一次训练界面的显示数字 + 训练等级 + 在场人数 + 是否有经理/对口器材，反解 base 与 bonus 区",
      "同角色一次暴击/一次未暴击，两次结果相除得 crit_bonus",
      "记录一次「投射训练」前后 投射 与 运控 的增量比 → secondary_ratio"
    ]
  },
  "expression": {
    "formula_spec": {
      "step1": "训练值 = 训练主属性增加（training 模块，不含表情）",
      "step2": "最终 = 训练值 × (1 + Σ每个表情的 bonus) × (表情不一致 ? 1 : 该表情一致倍率)；表情一致人数基础 6（经理1+陪练4+主练1），希雅二星 +1~3 虚空人时可到 9",
      "bonus": "每个表情 bonus = 基础 0.20 + 角色技能加值（望月 +0.08、龙宫寺 +0.04 等）",
      "per_expression_type": "【寒溟实测假设】每个参与者按表情类型给基础倍率：大笑 20%、微笑 10%、哭脸 0%；Σ后进 (1+Σ) 乘区；全员同表情时才乘一致倍率（2.5+真崎0.25）。",
      "source_note": "公式来源：TapTap「训练流公式逆推，雨乃，危！」（内测实测帖，https://www.taptap.cn/moment/805700735671995246；豌豆荚全文转载 2026-10-16），公测参数可能调整",
      "slots": "表情槽位数 = 参与训练人数（经理 + 陪练 + 主练）；满编 6；希雅二星虚空人 +1~3 → 最多 9。爆发 = (1 + Σ每人(表情基础+技能加成)) × (全员同表情时的一致乘区)。",
      "consistency": "爆发 = (1 + Σ每人(表情基础+技能加成)) ×（全员同表情且n≥2 ? 一致乘区表(n)+角色乘区加成 : 1）。表值：2→1.5、3→1.8、4→2.0、6→2.5；真崎+0.25；5 及 7/8/9 待测。"
    },
    "params": {
      "slots": {
        "value": 6,
        "unit": "个（最多）",
        "confidence": "寒溟实测（机制修正）",
        "evidence": [
          "寒溟实测 2026-11-05：非训练队（无虚空人）时，表情一致上限 = 陪练/经理总人数 + 1（主练）；基本都是 2 个表情",
          "之前 6 格来自满编队（经理1+陪练4+主练1）"
        ],
        "note": "表情槽位 = 参与训练的人数（经理 + 陪练 + 主练）；满编 = 6。**不是固定 6**：无人配置只有主练(+经理若有)，单经理=2，单陪练=3，满编=6；希雅二星 +1~3 虚空人 → 最多 9。"
      },
      "base_bonus_per_expression": {
        "value": 0.2,
        "unit": "比例",
        "confidence": "实测",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "每格基础 bonus 20%（内测公式帖口径，未区分哭脸/微笑/大笑）；寒溟实测提示哭脸=0%、微笑/大笑各有基础倍率 → 待公测验证后按表情类型细化"
      },
      "consistency_multiplier_base": {
        "value": 2.5,
        "unit": "倍率",
        "confidence": "实测",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "基准一致倍率 2.5（内测帖；不同表情倍率可能不同，2.0~3.0 区间待验证）",
        "range": [
          2,
          3
        ]
      },
      "consistency_multiplier_真崎": {
        "value": 0.25,
        "unit": "倍率加值",
        "confidence": "实测",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995246"
        ],
        "note": "真崎在倍率乘区 +0.25 → 2.75"
      },
      "character_bonus": {
        "望月 透": {
          "value": 0.08,
          "unit": "比例",
          "confidence": "实测",
          "evidence": [
            "https://www.taptap.cn/moment/805700735671995300"
          ],
          "note": "进 (1+Σ) 乘区"
        },
        "龙宫寺 心叶": {
          "value": 0.04,
          "unit": "比例",
          "confidence": "实测",
          "evidence": [
            "https://www.taptap.cn/moment/805700735671995300"
          ],
          "note": "望月下位替代"
        }
      },
      "expression_consistency_up_闪堂电": {
        "value": 0.15,
        "unit": "概率加成",
        "confidence": "多源一致",
        "evidence": [
          "https://www.gamekee.com/lqsn/726683.html",
          "https://www.taptap.cn/moment/861959872722241200"
        ],
        "note": "全部表情一致概率 +15%；按星级/技能等级递进 15/17/19/20/22/23/25%（客户端 cw_expression_tokens 偏移 22576492~22577679，档位 7 级）",
        "progression": [
          0.15,
          0.17,
          0.19,
          0.2,
          0.22,
          0.23,
          0.25
        ]
      },
      "client_bonus_sources": {
        "note": "客户端文案中与表情 bonus 相关的效果来源（社区望月+8%/龙宫寺+4% 应对应其中一类或多类叠加；映射待数值区确认）",
        "candidates": [
          {
            "value": "队友训练的 bonus +10% / +20% / +40%（小幅/中幅/大幅）",
            "unit": "百分比",
            "confidence": "多源一致",
            "evidence": [
              "cw_knowledge_strings.md @9413478/@9413528/@9413578"
            ],
            "note": "可能对应望月类角色技能的档位"
          },
          {
            "value": "队友训练的所有表情 +3% / +5% / +6%",
            "unit": "百分比",
            "confidence": "多源一致",
            "evidence": [
              "cw_knowledge_strings.md @7581459/@7582346/@7582388"
            ],
            "note": "全局表情加成"
          },
          {
            "value": "周六训练表情 bonus +5%",
            "unit": "百分比",
            "confidence": "多源一致",
            "evidence": [
              "cw_knowledge_strings.md @7586855"
            ],
            "note": "周六特化"
          },
          {
            "value": "当前精力≥阈值时 全部表情基础 Bonus +4%（阈值 45~60 多档）+ 30 随机属性",
            "unit": "百分比",
            "confidence": "多源一致",
            "evidence": [
              "cw_knowledge_strings.md @22580666/@22580968/@22581270/@22581572/@22581874/@22582176/@22582478"
            ],
            "note": "精力门槛型（社区望月门槛描述的客户端版本）"
          },
          {
            "value": "投射训练达到 3 级后，所有友情训练 bonus +50%",
            "unit": "百分比",
            "confidence": "多源一致",
            "evidence": [
              "cw_knowledge_strings.md @7577784"
            ],
            "note": "训练等级门槛型"
          },
          {
            "value": "弹跳/投射/防守/体能训练时 30/40/50% 概率获得额外一次 bonus 提升",
            "unit": "概率",
            "confidence": "多源一致",
            "evidence": [
              "cw_knowledge_strings.md @14812357~@14813137"
            ],
            "note": "概率型 bonus"
          }
        ],
        "community_values": {
          "望月 透": 0.08,
          "龙宫寺 心叶": 0.04,
          "note": "社区实测值（公式帖），与客户端候选来源需数值区对齐"
        },
        "confidence": "多源一致",
        "numeric_confirmed": {
          "value": "表情一致概率 7 档与表情升级分布已确证（见上）；望月/龙宫寺 bonus 实数仍在数值区映射中",
          "unit": "状态",
          "confidence": "多源一致",
          "evidence": [
            "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
          ],
          "note": "v3 更新"
        }
      },
      "example_803": {
        "calc": "(1 + 6×(0.20+0.08+0.04)) × (2.5+0.25) = 2.92 × 2.75 = 8.03",
        "value": 8.03,
        "note": "社区极限例，模型可复现（误差 0）"
      },
      "slots_max_with_xiya": {
        "value": 9,
        "unit": "格",
        "confidence": "寒溟实测",
        "evidence": [
          "knowledge/表情机制_希雅二星虚空人.md"
        ],
        "note": "希雅二星在场时 4 陪练位之一可召唤 1~3 个虚空人（表情必定与某真人一致），最多 9 人一致"
      },
      "xiya_virtual_min": {
        "value": 1,
        "unit": "个",
        "confidence": "寒溟实测",
        "evidence": [
          "knowledge/表情机制_希雅二星虚空人.md"
        ],
        "note": "虚空人下限"
      },
      "xiya_virtual_max": {
        "value": 3,
        "unit": "个",
        "confidence": "寒溟实测",
        "evidence": [
          "knowledge/表情机制_希雅二星虚空人.md"
        ],
        "note": "虚空人上限；1~3 的分布待验证"
      },
      "expr_base_by_type": {
        "value": {
          "大笑": 0.2,
          "微笑": 0.1,
          "哭脸": 0
        },
        "unit": "比例/人",
        "confidence": "寒溟实测（最终确认）",
        "evidence": [
          "3 大笑 + 1 哭脸 = 160% → 3×20% = 60%",
          "1 大笑 + 1 微笑 = 130% → 20% + 10%",
          "3 微笑一致 = 234% → (1+3×10%) × 1.8"
        ],
        "note": "大笑 20% / 微笑 10% / 哭脸 0%；混合只线性相加；一致乘区仅在≥2人同表情时触发"
      },
      "virtual_slots_note": "虚空人只在训练队（希雅2星）出现；非训练队无法超过参与人数上限。",
      "consistency_by_count": {
        "value": {
          "2": 1.5,
          "3": 1.8,
          "4": 2,
          "5": 2.2,
          "6": 2.5
        },
        "unit": "乘区",
        "confidence": "寒溟实测",
        "evidence": [
          "2人=1.5（150% 两哭脸）",
          "3人=1.8（288% 三大笑 / 234% 三微笑）",
          "4人=2.0（360% 四大笑）",
          "5人=2.2（330% 五微笑）",
          "6人=2.5（旧攻略 803%，+真崎0.25→2.75）"
        ],
        "note": "已知 2/3/4/5/6 = 1.5/1.8/2.0/2.2/2.5；推测 = round1(1+0.25n)（银行家舍入：1.75→1.8、2.25→2.2），故 7/8/9 推算 2.8/3.0/3.2；待希雅虚空人实测。",
        "pending": [
          7,
          8,
          9
        ]
      },
      "consistency_formula": {
        "value": "表值：2→1.5、3→1.8、4→2.0、5→2.2、6→2.5；真崎 +0.25；7/8/9 推算 2.8/3.0/3.2",
        "unit": "乘区",
        "confidence": "寒溟实测（2~6人）",
        "evidence": [
          "150% / 234% / 288% / 360% / 330% / 803% 六个锚点"
        ],
        "note": "可能规律：round1(1+0.25n) 按银行家舍入（半到偶数）：1.75→1.8、2.25→2.2；7/8/9 待实测"
      }
    },
    "dilution": {
      "rule": "同乘区加成互稀释：Δ收益 = Δ×∏其他乘区 / 原结果；望月与龙宫寺同在 (1+Σ) 乘区，第二个的边际贡献随 Σ 增大而下降。",
      "example": {
        "sigma_after_望月": 1.6800000000000002
      },
      "conclusion": "「700% 多档实际属性增量可能高于 800% 档」——因为倍数高不等于属性总量高（受一致倍率/其他乘区影响）；优化器应按最终属性排序而非百分比。"
    },
    "consistency_multiplier_progression": {
      "value": [
        0.25,
        0.27,
        0.29,
        0.3,
        0.32,
        0.34,
        0.35
      ],
      "unit": "档位比例（7 级）",
      "confidence": "多源一致",
      "evidence": [
        "cw_conf 数值区偏移 @22629227 起（client-analyst）",
        "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
      ],
      "note": "情绪一致倍率 7 级档位：25/27/29/30/32/34/35%。二义性：可能是「一致倍率提升比例」（倍率=2.5×(1+档位)），也可能直接是倍率千分比；与社区实测「真崎 2.5+0.25=2.75」的对齐关系待验证——模型保留社区值作为默认，客户端档位作为可切换参数",
      "interpretations": {
        "A_ratio_uplift": "倍率 = base 2.5 × (1+档位) → 3.125~3.375",
        "B_direct": "档位×10 ≈ 2.5~3.5 倍率",
        "C_skill_add": "角色技能 +25%~+35% 的档位递进（社区真崎 +0.25 对应首档）"
      }
    },
    "consistency_probability_progression": {
      "value": [
        0.15,
        0.17,
        0.19,
        0.2,
        0.22,
        0.23,
        0.25
      ],
      "unit": "概率（7 级）",
      "confidence": "多源一致",
      "evidence": [
        "cw_conf 数值区偏移 @22576505 起",
        "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
      ],
      "note": "全部表情一致概率额外增加档位：15/17/19/20/22/23/25%（社区/官方演示的 15% 为最低档）"
    },
    "face_upgrade_distribution": {
      "value": {
        "哭脸→笑脸": 0.3,
        "平常脸→笑脸": 0.6,
        "stack_per_trigger": 0.02,
        "max_stacks": 5
      },
      "unit": "概率/层数",
      "confidence": "多源一致",
      "evidence": [
        "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
      ],
      "note": "闪堂电 2★ 表情一致升级机制：哭脸 30%、平常脸 60% 概率升级为笑脸；每触发 1 次额外 +2%（最多 5 次叠加）",
      "note_stack": "「每触发 1 次 +2% 最多 5 次」作用对象（升级概率或笑脸收益）待验证"
    }
  },
  "growth": {
    "panel_attribute_composition": {
      "model": "面板/A 层属性 ≈ 基础(稀有度+潜力曲线) + 等级成长 + 星级/天赋/档案/羁绊加成 + 器材/笔记加值（各项系数待验证）",
      "confidence": "推断",
      "evidence": [
        "data/structured/characters.json",
        "https://www.taptap.cn/moment/862516446742185000",
        "data/client/extracted/attr_mapping.md"
      ],
      "components": {
        "base_from_potential": {
          "value": "属性参考 ≈ a_rarity + b_rarity×潜力（见 attributes.derived_rules）",
          "unit": "公式",
          "confidence": "多源一致",
          "evidence": [
            "data/structured/characters.json"
          ],
          "note": "图鉴口径"
        },
        "level_growth": {
          "value": "面板随等级增长（LV1/10、LV20/20、LV60/60 观察）",
          "unit": "曲线未知",
          "confidence": "推断",
          "evidence": [
            "screenshot 805700735671995246 / 862516446742184898"
          ],
          "note": "两期数据不足拟合；需同角色多等级截图",
          "range": null
        },
        "star_bonus": {
          "example_雨乃": {
            "1★": {
              "value": "训练开始时额外获得 30 随机属性",
              "unit": "点",
              "confidence": "多源一致",
              "evidence": [
                "screenshot 862516446742184898 图2",
                "screenshot 805700735671995246"
              ],
              "note": "「初始随机属性」"
            },
            "2★": {
              "value": 0.03,
              "unit": "训练加成%",
              "confidence": "多源一致",
              "evidence": [
                "screenshot 862516446742184898 图2"
              ],
              "note": "「训练加成」额外 +3%，进 training_bonus 乘区"
            }
          },
          "confidence": "多源一致"
        },
        "talents": {
          "value": "天赋有「初始随机属性/训练加成/每周补助」等（角色各异）",
          "unit": "枚举",
          "confidence": "多源一致",
          "evidence": [
            "https://www.taptap.cn/moment/862241060166830700",
            "screenshot"
          ],
          "note": "同名天赋只生效高级天赋"
        },
        "school_bond": {
          "value": 0.15,
          "unit": "属性加成(示例)",
          "confidence": "多源一致",
          "evidence": [
            "https://www.gamekee.com/lqsn/725395.html"
          ],
          "note": "示例：上阵 5 名明日叶学园 → 弹跳 +15%（客户端帮助图示例，非所有学园通用）"
        },
        "manager": {
          "value": "经理提供训练加成（可能与口哨叠加，作者误差大）",
          "unit": "待验证",
          "confidence": "推断",
          "evidence": [
            "https://www.taptap.cn/moment/805700735671995300"
          ],
          "note": "金色协助需剧本强化解锁"
        },
        "equipment_note": {
          "note": "器材提供对口 +1（训练公式内）、熟练度训练加成（+10→+41 示例）、暴击加成、专属技能；见 economy.equipment"
        }
      }
    },
    "level": {
      "display": "「当前/上限」形式（LV1/10、LV20/20、LV60/60）",
      "confidence": "实测",
      "evidence": [
        "screenshot 862516446742184898",
        "screenshot 805700735671995246"
      ],
      "note": "等级上限与稀有度/星级相关（R/SR/SSR 不同），具体曲线待验证"
    },
    "reset_rules": {
      "free_until_level": {
        "value": 50,
        "unit": "级",
        "confidence": "多源一致",
        "evidence": [
          "https://www.taptap.cn/moment/862241060166830700"
        ],
        "note": "50 级前（含）免费重置返还全部资源；内测/社区口径，公测待验证"
      },
      "reset_cost_after": {
        "value": 200,
        "unit": "钻石",
        "confidence": "多源一致",
        "evidence": [
          "https://www.taptap.cn/moment/862241060166830700"
        ],
        "note": "50 级后 200 钻重置"
      },
      "guidance": "过渡球员在 50 级前换人不亏（规划器按此提示）"
    },
    "tactical_lab": {
      "value": "游戏第 3 天解锁战术研究室，全员共享 5 名指导球员最低等级",
      "unit": "机制",
      "confidence": "多源一致",
      "evidence": [
        "https://www.taptap.cn/moment/862241060166830700"
      ],
      "note": "影响养成规划与二队培养顺序"
    },
    "roguelike_enhance": {
      "name": "剧本强化/肉鸽等级（主线 PVE 获取）",
      "unlocks": {
        "训练流": [
          "精力上限",
          "属性获取效率"
        ],
        "商店流": [
          "4 个商店栏位"
        ],
        "扭蛋流": [
          "彩色扭蛋"
        ],
        "其他": [
          "球队经理金色协助",
          "新增 1 次笔记学习",
          "合宿最后一天全员训练"
        ]
      },
      "confidence": "多源一致",
      "evidence": [
        "https://www.gamekee.com/lqsn/725601.html",
        "https://www.taptap.cn/moment/865657519840692900",
        "https://www.gamekee.com/lqsn/725398.html"
      ],
      "note": "训练流/商店流/扭蛋流的成型门槛由强化等级决定，不是单纯角色强度"
    }
  },
  "battle": {
    "engine": {
      "current": "公测 C 层（2级属性）判定：命中力(hitpower)/真实命中力(real_hitpower) vs 防守方对应防守属性；具体公式待客户端数值区。",
      "legacy_A": "内测 A 层攻防卡系统（社区实测+表格截图），保留供校准与历史对照。",
      "confidence": "推断（切换假设）",
      "evidence": [
        "data/client/extracted/attr_mapping.md",
        "https://www.taptap.cn/moment/807028912310717700",
        "screenshot images/9game_attack_defense_table.png"
      ]
    },
    "legacy_A_cards": {
      "attack_cards": {
        "红": {
          "attr": "弹跳",
          "weight": 1,
          "card_names": [
            "扣篮",
            "勾手",
            "背打"
          ],
          "categories": [
            "篮下进攻"
          ]
        },
        "绿": {
          "attr": "投射",
          "weight": 1,
          "card_names": [
            "上篮",
            "中投",
            "背打"
          ],
          "categories": [
            "内线进攻"
          ]
        },
        "蓝": {
          "attr": "运控",
          "weight": 1,
          "card_names": [
            "横移",
            "三分",
            "突破"
          ],
          "categories": [
            "外线进攻"
          ]
        }
      },
      "defense_card": {
        "formula": "防守卡威力 = 0.30 × 对应属性(按进攻卡颜色) + 0.70 × 防守属性",
        "weights": {
          "value": {
            "matched_attr": 0.3,
            "defense_attr": 0.7
          },
          "unit": "权重",
          "confidence": "多源一致",
          "evidence": [
            "https://www.taptap.cn/moment/807028912310717700",
            "screenshot 9game_attack_defense_table.png"
          ],
          "note": "内测期表格 OCR，已人工复核"
        }
      },
      "card_names": {
        "防守": [
          "盖帽",
          "盯防",
          "抢断"
        ]
      },
      "counter": {
        "cycle": "红↔绿↔蓝↔红（三色循环，具体方向待验证）",
        "effects": {
          "enemy_stamina": "下降",
          "own_hit_rate": "上升",
          "own_energy": "上升"
        },
        "evidence": [
          "screenshot images/FsXdh9H_9rYnkRI3nXhJhOtCci72_20260522231941.png（提示「力卡妨碍」：↑命中率 ↓耐力）",
          "https://www.taptap.cn/moment/807028912310717700"
        ],
        "confidence": "多源一致"
      },
      "will": {
        "note": "意志决定能否看破并采用克制属性卡；意志不足玩家用退出重打规避",
        "confidence": "单源",
        "evidence": [
          "https://www.taptap.cn/moment/807028912310717700",
          "https://www.9game.cn/news/12141289.html"
        ]
      },
      "stamina_exhaust": {
        "trigger": {
          "value": "体能决定何时力竭；耐力耗尽进入力竭",
          "unit": "机制",
          "confidence": "多源一致",
          "evidence": [
            "https://www.taptap.cn/moment/807028912310717700",
            "data/client/extracted/attr_mapping.md（endurance：耐力不足时能力大幅下降）"
          ],
          "note": "内测实测帖 + 公测客户端属性描述双重支持"
        },
        "penalty": {
          "value": null,
          "unit": "属性衰减比例",
          "confidence": "待验证",
          "evidence": [
            "https://www.taptap.cn/moment/807028912310717700",
            "https://www.gamekee.com/lqsn/725359.html"
          ],
          "note": "力竭时属性大幅衰减，幅度未公开 → 推断 20%~40%",
          "range": [
            0.2,
            0.4
          ]
        }
      },
      "round_structure": {
        "note": "比赛为多轮属性比大小（攻方选卡→比对→结算命中/耐力/能量）；回合数/计时器未公开",
        "confidence": "推断",
        "evidence": [
          "https://www.taptap.cn/moment/807028912310717700"
        ]
      }
    },
    "current_C_battle": {
      "attack_vs_defense": [
        {
          "attack": "投射(shot)",
          "defense": "防投(def_shot)",
          "target": "中投/三分命中力"
        },
        {
          "attack": "攻筐(attack_hoop)",
          "defense": "护筐(def_attack_hoop)",
          "target": "上篮/扣篮命中力"
        },
        {
          "attack": "突破(dribble)",
          "defense": "逼抢(strength)",
          "target": "突破/虚晃成功率"
        },
        {
          "attack": "传球(organization)",
          "defense": "逼抢(strength)",
          "target": "快攻成功率"
        },
        {
          "attack": "爆发(explosive)",
          "defense": "逼抢(strength)",
          "target": "挡拆成功率"
        },
        {
          "attack": "篮板(rebound)",
          "defense": "篮板(rebound)",
          "target": "篮板概率"
        }
      ],
      "confidence": "多源一致（C 层属性 desc 原文）",
      "evidence": [
        "data/client/extracted/attr_mapping.md"
      ],
      "formula_unknown": "攻击/防守属性→命中力(hitpower)的具体函数（线性？相减？比值？）待客户端数值区 → 模拟器 v1 用线性差值假设并允许校准",
      "calibrator": "玩家记录一次出手的「命中率%」与双方属性，反解 hitpower 函数",
      "win_rate_model": {
        "note": "【v3.3 新增】用回放 versus_winrate.csv（88 个带 win_rate 样本）拟合的判定函数候选；替换原 formula_unknown 的占位。数据限制：properties 字段只含本次对抗生效/变化的属性（多数行只有单侧），可同时取到攻守两侧属性和的样本仅 n=10。",
        "confidence": "推断（样本量小，方向可信、系数待更多样本）",
        "evidence": [
          "data/client/replay/versus_winrate.csv",
          "data/client/replay/property_events.csv",
          "data/client/replay/REPLAY_ANALYSIS.md",
          "knowledge/_build/v33_results.json"
        ],
        "dataset": {
          "rows": 113,
          "with_win_rate": 88,
          "with_both_side_attrs": 10,
          "win_rate_distribution": {
            "p10": 22,
            "p50": 50,
            "p90": 70
          }
        },
        "candidates": [
          {
            "name": "linear_attr_diff",
            "formula": "win_rate ≈ 0.51 + 0.0026 × (Σ攻方属性 − Σ守方属性)",
            "r2": 0.5682,
            "mae_pp": 9,
            "n": 10,
            "pearson": 0.7538,
            "interpretation": "攻守属性差每 +100 点 → 胜率 +26pp（方向与量级结论）"
          },
          {
            "name": "logistic_attr_diff",
            "formula": "win_rate ≈ sigmoid(0.012 × diff)（b≈0），diff=Σ攻−Σ守",
            "r2": 0.572,
            "mae_pp": 9.39,
            "n": 10,
            "interpretation": "diff=0 → 50%；diff≈+58 → 67%；diff≈+100 → 77%（与线性近似一致）"
          },
          {
            "name": "linear_ratio",
            "formula": "win_rate ≈ 0.38 + 0.1169 × (Σ攻/Σ守)",
            "r2": 0.2669,
            "mae_pp": 13,
            "n": 10,
            "pearson": 0.5166,
            "interpretation": "比值模型明显差于差值模型 → 判定更可能是「属性差」而非纯比值"
          }
        ],
        "best_hypothesis": "win_rate 主要由「攻方有效属性 − 守方有效属性」决定（差值模型 R²≈0.57 > 比值模型 0.27）；推荐模拟器用 logistic_attr_diff 作为默认、线性差作为可切换，并把 versus id 对应的属性对（见 versus_attr_pairs）作为有效属性选择器。",
        "versus_attr_pairs_observed": {
          "1001": {
            "attacker_attrs": {
              "107": 4
            },
            "defender_attrs": {
              "110": 3
            },
            "n": 4
          },
          "1003": {
            "attacker_attrs": {
              "101": 2
            },
            "defender_attrs": {
              "103": 2
            },
            "n": 2
          },
          "1004": {
            "attacker_attrs": {
              "102": 1
            },
            "defender_attrs": {
              "103": 1
            },
            "n": 1
          },
          "1005": {
            "attacker_attrs": {
              "101": 1,
              "102": 1
            },
            "defender_attrs": {
              "103": 2
            },
            "n": 2
          },
          "1008": {
            "attacker_attrs": {
              "106": 1
            },
            "defender_attrs": {
              "106": 1
            },
            "n": 1
          },
          "1014": {
            "attacker_attrs": {
              "113": 1
            },
            "defender_attrs": {
              "113": 1
            },
            "n": 1
          }
        },
        "attr_pair_note": "观测：1001→攻107/守110、1003→101/103、1004→102/103、1005→101或102/103、1008→106/106、1014→113/113（样本少，仅供映射起点；完整 versus→属性对表待配置/更多样本）",
        "limitations": [
          "两侧属性齐全样本仅 10 个",
          "properties 含 buff 覆盖值，与面板值关系待理清",
          "result 与 win_rate 的抽样机制未明",
          "versus id 仅覆盖 15 种中的部分映射"
        ],
        "next": "用 replay_2 的 25 回合/88 步 + versus_winrate.csv 全量（含近 500 条无 win_rate 但可补 result）做分 versus 回归；或从客户端 Lua 公式直接取判定函数"
      }
    },
    "energy_and_skills": {
      "fixed_skill_cost": {
        "value": {
          "energy": 80,
          "pt": 20
        },
        "unit": "点",
        "confidence": "多源一致",
        "evidence": [
          "https://www.gamekee.com/lqsn/725361.html",
          "https://www.gamekee.com/lqsn/725342.html"
        ],
        "note": "固定技能（大招）能量80/PT20"
      },
      "extra_skill_cost": {
        "value": {
          "energy": 0,
          "pt": 0
        },
        "unit": "点",
        "confidence": "多源一致",
        "evidence": [
          "https://www.gamekee.com/lqsn/725361.html"
        ],
        "note": "额外技能（被动）0/0"
      },
      "energy_steal_example": {
        "value": 20,
        "unit": "点",
        "confidence": "单源",
        "evidence": [
          "https://www.gamekee.com/lqsn/725380.html"
        ],
        "note": "白神时久窃取对位20能量、回复我方随机1名20能量"
      },
      "skill_power_examples": [
        {
          "character": "闪堂电",
          "skill": "瞬雷",
          "formula": "运控×100% + 弹跳×20%",
          "evidence": "https://www.gamekee.com/lqsn/725348.html"
        },
        {
          "character": "闪堂电",
          "skill": "闪电突袭",
          "formula": "运控×100% + 弹跳×100%",
          "evidence": "https://www.gamekee.com/lqsn/726683.html"
        },
        {
          "character": "希雅·奥黛拉",
          "skill": "梦境盖帽",
          "formula": "弹跳×100% + 防守×40%",
          "evidence": "https://www.gamekee.com/lqsn/725381.html"
        }
      ],
      "power_model": "技能威力 = Σ(属性 × 系数)，系数来自客户端技能配置（图鉴文本已给示例）；效果缩放常写「受 XX 属性影响」→ 效果值 = 基准 × f(属性)",
      "duration": {
        "value": 120,
        "unit": "秒",
        "confidence": "多源一致",
        "evidence": [
          "https://www.gamekee.com/lqsn/725361.html",
          "https://www.gamekee.com/lqsn/725342.html"
        ],
        "note": "强化/弱化持续 2 分钟"
      },
      "exclusive_card_interval": {
        "value": 180,
        "unit": "秒",
        "confidence": "单源",
        "evidence": [
          "https://www.gamekee.com/lqsn/725348.html"
        ],
        "note": "闪堂电每 3 分钟获得一次性专属卡"
      }
    },
    "style_and_events": {
      "style_speed_bonus": {
        "value": 0.15,
        "unit": "全属性加成(活动示例)",
        "confidence": "单源",
        "evidence": [
          "https://www.gamekee.com/lqsn/726682.html"
        ],
        "note": "立冬杯：速度风格免疫积水、全属性+15%"
      },
      "note": "风格/活动加成为比赛外附加乘区，非通用规则"
    },
    "card_schools": {
      "note": "公测卡牌三系：力/技/速（客户端数值区确证），并带克制字段；与内测红/绿/蓝三色攻防卡的对应关系待验证。",
      "schools": {
        "value": [
          "力",
          "技",
          "速"
        ],
        "unit": "枚举",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "卡牌三系；克制关系由配置字段给出（counter 表）"
      },
      "counter_field": {
        "value": "每个卡配置含克制字段（counter/countered_by）",
        "unit": "配置字段",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "具体克制三角表尚未导出，待数值区/配置表"
      },
      "legacy_mapping": {
        "value": "内测红=弹跳/绿=投射/蓝=运控 的攻防卡系统（A 层）与公测力/技/速三系的映射未确认",
        "unit": "状态",
        "confidence": "待验证",
        "evidence": [
          "claims §E1",
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "工具模拟器暂保留两套：legacy_A_cards 与 card_schools"
      }
    },
    "exhaustion": {
      "note": "力竭机制（客户端数值区确证）：耐力不足 → 力竭 → 全属性下降；存在力竭加深/抵抗档位。",
      "trigger": {
        "value": "耐力不足（stamina 低）→ 进入力竭",
        "unit": "机制",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
          "https://www.taptap.cn/moment/807028912310717679"
        ],
        "note": "耐力由 C 层 endurance/stamina 决定"
      },
      "all_attribute_penalty": {
        "value": true,
        "unit": "布尔",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "力竭时全属性下降（不是单项）"
      },
      "deepen_resist_tiers": {
        "value": "+1% ~ +12%（档位）",
        "unit": "百分比",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "力竭加深/抵抗档位 1%~12%（技能/器材来源）"
      },
      "penalty_magnitude": {
        "value": null,
        "unit": "百分比",
        "confidence": "待验证",
        "evidence": [
          "claims §E5",
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "具体全属性下降幅度未在本次确证范围内 → 保留 v1 推断区间 20%~40%",
        "range": [
          0.2,
          0.4
        ]
      }
    },
    "versus_outcomes": {
      "note": "对抗结果分档（客户端数值区确证）：大胜/小胜/险胜/小败/大败；「力竭人数」修改对抗结果概率列表。",
      "tiers": {
        "value": [
          "大胜",
          "小胜",
          "险胜",
          "小败",
          "大败"
        ],
        "unit": "枚举",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "5 档对抗结果"
      },
      "exhaust_count_modifier": {
        "value": "按「力竭人数」修改对抗结果概率列表",
        "unit": "规则",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "力竭人数越多，对方胜率档位越有利/不利（方向待配置表确认）；这是模拟器的关键规则"
      },
      "probability_list": {
        "value": null,
        "unit": "概率表",
        "confidence": "待验证",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "五档基础概率列表未导出 → 需客户端配置表或对局回放拟合"
      }
    },
    "hitpower": {
      "source": "data/apk/replay/offline_replay.json（对战回放中有真实命中/对抗事件）",
      "note": "hitpower/real_hitpower 已在 v1 记录；v3 增加回放数据路径作为校准样本",
      "confidence": "多源一致",
      "evidence": [
        "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
        "data/apk/replay/offline_replay.json"
      ]
    },
    "replay_evidence": {
      "note": "3 场 APK 内明文回放（offline_replay.archive）：replay_0 为旧格式（新手/旧模板），replay_1/2 为当前版本（含 role_id/duty/label_id）。提供真实回合/对抗/统计 ground truth。",
      "source": "data/apk/extracted/assets/pkg/offline_replay.archive（581,316 B，未加密 JSON：3 replay + 68B index）",
      "files": [
        "data/client/replay/replay_0.json",
        "data/client/replay/replay_1.json",
        "data/client/replay/replay_2.json"
      ],
      "analysis": "data/client/replay/REPLAY_ANALYSIS.md",
      "replays": [
        {
          "file": "data/client/replay/replay_0.json",
          "match_id": 55525337205089,
          "seed": 55525337205089,
          "template": 6,
          "scene": "比赛场景_全国大赛",
          "in_match": {
            "rounds": 5,
            "steps": 16,
            "property_blocks": 1
          },
          "note": "唯一可用于 base→in-match 系数校验的一场（occasion_type=5 快照）"
        },
        {
          "file": "data/client/replay/replay_1.json",
          "match_id": 18316878293,
          "seed": 18316878293,
          "template": 5,
          "in_match": {
            "rounds": 4,
            "steps": 9,
            "property_blocks": 14,
            "morale": 16,
            "commentary": 7
          },
          "note": "含 morale 16 条、commentary 7 条"
        },
        {
          "file": "data/client/replay/replay_2.json",
          "match_id": 338099825541125,
          "seed": 338099825541125,
          "template": 6,
          "in_match": {
            "rounds": 25,
            "steps": 88,
            "property_blocks": 84,
            "stats": 288
          },
          "note": "数据量最大：25 回合/88 步/84 属性快照，适合拟合体力消耗与回合结构"
        }
      ],
      "round_structure": {
        "rounds_fields": [
          "away_score",
          "half_idx",
          "home_off",
          "home_score",
          "is_match_burst",
          "period_idx",
          "period_left_time",
          "prepare_sub_type",
          "prepare_type",
          "round_end_reason",
          "hide_restrain_tips",
          "round_idx"
        ],
        "steps_fields": [
          "core_player_idx",
          "period_left_time",
          "round_idx",
          "round_left_time",
          "step_idx",
          "after_custom_tree_name",
          "versus"
        ],
        "versus_structure": [
          "area_info",
          "guard_info（每名防守者 guard_type/guard_extent）",
          "players",
          "versus",
          "versus_cost_time",
          "dribble_player_id",
          "versus_off_player_idx"
        ],
        "versus_codes_observed": [
          1001,
          1005,
          1014
        ],
        "confidence": "多源一致",
        "evidence": [
          "data/client/replay/REPLAY_ANALYSIS.md"
        ]
      },
      "statistics_fields": [
        "PTS",
        "FG",
        "FGA",
        "TP",
        "TPA",
        "TPCG",
        "TPM",
        "REB",
        "ORB",
        "AST",
        "STL",
        "BLK",
        "TOV",
        "AHA",
        "AHM",
        "BD",
        "BDCG",
        "CQ",
        "CQCG",
        "DC",
        "DCCG",
        "DEB",
        "KG",
        "KGCG",
        "KL",
        "MIS_ATT",
        "MIS_MADE",
        "OPEN_ATT",
        "OPEN_MADE",
        "SPA",
        "SPM",
        "XH",
        "XHCG"
      ],
      "mvp_score_example": {
        "note": "post_match_data.mvp_player_info 含 per-player mvp_score_tbl（例 replay_0 away: -8/38/-6/47/38；home: -11/21/13/28/3）→ 可用于校准「玩家贡献」评分口径",
        "evidence": [
          "data/client/replay/replay_0.json"
        ]
      },
      "reproducible": "每场回放含 seed（match_id 同值）→ 随机可复现，可用于模拟器蒙特卡洛对齐验证",
      "hit_power": "hit_power 字段在 3 场中均为空/0 → 命中力由属性+系数实时计算，需从 versus 事件与统计反推",
      "calibration_uses": [
        "当前版本 ratio=1.0 校验（replay_1 150/150、replay_2 105/105）",
        "旧格式 1.6/0.8 校验（replay_0 136/150，仅历史）",
        "体力/耐力消耗曲线（property 事件流 occ=1/2/4）",
        "对抗结果/克制（versus + win_rate + players.result 1..4）",
        "命中率模型（post_match FG/FGA/TP/TPA 与技术统计 41 项）",
        "MVP/贡献评分口径（mvp_score_tbl）",
        "士气（morale 每步 +1~3）对对抗概率的影响"
      ],
      "limits": [
        "仅 3 场，AI 对手（全国大赛/新手剧本），不代表 PVP",
        "replay_1/2 的 base 与 snapshot 口径与 replay_0 不同，需进一步对齐",
        "107~115 子属性语义部分待确认"
      ],
      "property_event_stream": {
        "note": "in_match_data.property 是属性变更事件流，不是简单快照列表",
        "confidence": "多源一致",
        "evidence": [
          "data/client/replay/REPLAY_ANALYSIS.md",
          "data/client/replay/replay_0.json",
          "data/client/replay/replay_1.json",
          "data/client/replay/replay_2.json"
        ],
        "rules": [
          "occasion_type=5：初始全量快照 player_property_tbl（10 人 × 101~115/201/202/302）",
          "occasion_type=1/2/4：增量事件 {player_idx: {attrId: newValue}}（只含变化字段）",
          "实测：201 经 occ=2 变化 → 当前体力（耐力）",
          "实测：301 经 occ=4 增长 → 当前能量（能量随回合累积）",
          "302 与 morale 字段语义部分确认（士气/心情类，occ 事件中可变化）"
        ],
        "samples": {
          "replay_1_occ2": "见 replay_1.json in_match_data.property 中 occasion_type=2 块（301 增量）",
          "replay_2_occ4": "见 replay_2.json occ=4 块（201/301 增量）"
        }
      },
      "versus_ground_truth": {
        "note": "steps[].versus 是对抗/结算的 ground truth，可用于拟合 hitpower 判定函数",
        "confidence": "多源一致",
        "evidence": [
          "data/client/replay/REPLAY_ANALYSIS.md",
          "data/client/replay/replay_0.json",
          "data/client/replay/replay_1.json",
          "data/client/replay/replay_2.json"
        ],
        "fields": {
          "versus": "对抗类型 id（观测 1001/1005/1014）",
          "players.result": "对抗结果编码 1..4（对应 大胜/小胜/小败/大败 四档方向，具体映射待验证）",
          "win_rate": "整数胜率（样本观测值 90）",
          "properties": "本次对抗的属性覆盖/修正字段",
          "guard_info": "每名防守者 guard_type/guard_extent",
          "area_info": "区域信息",
          "versus_cost_time": "本次对抗耗时"
        },
        "morale_rule": "morale 每步双方 +1~3（回合/对抗推进）"
      },
      "stats_entry_names": {
        "note": "post_match_data.statistics 的 entry_name 共 41 种",
        "confidence": "多源一致",
        "evidence": [
          "data/client/replay/REPLAY_ANALYSIS.md",
          "data/client/replay/replay_2.json"
        ],
        "entries": {
          "篮球基础": [
            "PTS",
            "FG",
            "FGA",
            "TP",
            "TPA",
            "REB",
            "ORB",
            "AST",
            "STL",
            "BLK",
            "TOV"
          ],
          "命中类": [
            "TPM",
            "TPCG",
            "AHA",
            "AHM",
            "BD",
            "BDCG",
            "CQ",
            "CQCG",
            "DC",
            "DCCG",
            "KG",
            "KGCG",
            "KL",
            "KGCG",
            "XH",
            "XHCG",
            "MIS_ATT",
            "MIS_MADE",
            "OPEN_ATT",
            "OPEN_MADE",
            "SPA",
            "SPM",
            "DEB"
          ],
          "中文缩写来源": {
            "ZT": "中投",
            "XH": "虚晃",
            "CQ": "传球",
            "SL": "上篮",
            "KL": "扣篮",
            "JKC": "（待与配置对齐）",
            "SKC": "（待对齐）",
            "LKC": "（待对齐）"
          }
        },
        "calibration_note": "命中类 entry 与 versus 结果可联合拟合 hitpower/命中率模型"
      },
      "calibration_next": [
        "用 replay_2 的 versus 事件（含 win_rate=90 样本）+ players.result 1..4 拟合 hitpower 判定函数（属性→对抗胜率）",
        "用 replay_0 旧格式做 hold-out（注意其 1.6/0.8 旧倍率需先还原为面板值）",
        "用 property 事件流（occ=1/2/4）拟合体力消耗曲线与能量累积曲线",
        "用 stats 41 项与 FG/FGA/TP/TPA 拟合命中率/三分命中，并回推 hitpower 参数",
        "用 morale 每步 +1~3 拟合士气对对抗概率的修正"
      ]
    },
    "in_match_multiplier": {
      "value": 1,
      "unit": "倍率",
      "confidence": "多源一致",
      "evidence": [
        "data/client/replay/replay_1.json",
        "data/client/replay/replay_2.json",
        "knowledge/_build/v32_replay_check.json"
      ],
      "note": "当前版本赛内 = 面板 ×1.0（与 attributes.in_match_conversion.default_current 同步；保留字段供模拟器直接读取）"
    },
    "result_code_mapping": {
      "note": "【v3.3】results 字段中「攻方球员的 result 编码 1..4」与 win_rate 的交叉统计（results 形如 \"3=2;8=3\"）。",
      "confidence": "推断",
      "evidence": [
        "knowledge/_build/v33_results.json"
      ],
      "stats": {
        "1": {
          "n": 12,
          "mean_win": 53.5,
          "min": 26.705,
          "max": 87.80936,
          "pct_win_gt50": 67
        },
        "2": {
          "n": 35,
          "mean_win": 60.1,
          "min": 23.752,
          "max": 100,
          "pct_win_gt50": 77
        },
        "3": {
          "n": 31,
          "mean_win": 37.4,
          "min": 0,
          "max": 90,
          "pct_win_gt50": 32
        },
        "4": {
          "n": 10,
          "mean_win": 29.2,
          "min": 10,
          "max": 70,
          "pct_win_gt50": 10
        }
      },
      "hypothesis": "编码与 win_rate 单调相关：2（均值 60.1，77% 样本 >50）> 1（53.5，67%）> 3（37.4，32%）> 4（29.2，10%）。映射假设：2=胜/最佳、1=小胜/险胜、3=小负、4=大负（5 档名称 大胜/小胜/险胜/小败/大败 与 4 码的对应仍需配置确认；result 可能由 win_rate 抽样 + 阈值共同决定，均值未完全对齐 50% 说明存在额外修正）"
    },
    "energy_stamina": {
      "note": "【v3.3】用 property_events.csv（1146 行：occ=5 初始 545 / occ=2 310 / occ=4 273 / occ=1 17 / occ=3 1）还原的体力(201)/能量(301)变化曲线。",
      "confidence": "推断（样本量 11 人×若干场，档位初步）",
      "evidence": [
        "data/client/replay/versus_winrate.csv",
        "data/client/replay/property_events.csv",
        "data/client/replay/REPLAY_ANALYSIS.md",
        "knowledge/_build/v33_results.json"
      ],
      "stamina_201": {
        "meaning": "当前体力/耐力（occ=2 事件中变化）",
        "initial_values": [
          60,
          66,
          71,
          73,
          75,
          76,
          82,
          84,
          95,
          110
        ],
        "samples": 136,
        "delta": {
          "min": -107,
          "max": 105,
          "mean": -3.24,
          "negatives": 110,
          "positives": 26
        },
        "by_round": {
          "r0": {
            "n": 20,
            "mean": 4,
            "min": -70,
            "max": 105
          },
          "r1": {
            "n": 14,
            "mean": -15.43,
            "min": -107,
            "max": 25
          },
          "r2": {
            "n": 16,
            "mean": -3.31,
            "min": -99,
            "max": 97
          },
          "r3": {
            "n": 20,
            "mean": -0.25,
            "min": -14,
            "max": 56
          },
          "r13": {
            "n": 4,
            "mean": -4.75,
            "min": -33,
            "max": 26
          },
          "r15": {
            "n": 3,
            "mean": -11.67,
            "min": -23,
            "max": -1
          },
          "r4": {
            "n": 8,
            "mean": -7.25,
            "min": -62,
            "max": 32
          },
          "r12": {
            "n": 5,
            "mean": -4.6,
            "min": -10,
            "max": -1
          },
          "r9": {
            "n": 8,
            "mean": -1.75,
            "min": -10,
            "max": 11
          },
          "r14": {
            "n": 2,
            "mean": -5.5,
            "min": -10,
            "max": -1
          },
          "r18": {
            "n": 7,
            "mean": -6.29,
            "min": -11,
            "max": -1
          },
          "r24": {
            "n": 3,
            "mean": -4,
            "min": -10,
            "max": -1
          },
          "r6": {
            "n": 1,
            "mean": 64,
            "min": 64,
            "max": 64
          },
          "r7": {
            "n": 2,
            "mean": -24,
            "min": -47,
            "max": -1
          },
          "r16": {
            "n": 1,
            "mean": -11,
            "min": -11,
            "max": -11
          },
          "r17": {
            "n": 3,
            "mean": -8.67,
            "min": -22,
            "max": -1
          },
          "r19": {
            "n": 2,
            "mean": -2,
            "min": -3,
            "max": -1
          },
          "r8": {
            "n": 2,
            "mean": 36.5,
            "min": -27,
            "max": 100
          },
          "r20": {
            "n": 5,
            "mean": -4.6,
            "min": -10,
            "max": -1
          },
          "r21": {
            "n": 2,
            "mean": -5.5,
            "min": -10,
            "max": -1
          },
          "r22": {
            "n": 1,
            "mean": -11,
            "min": -11,
            "max": -11
          },
          "r10": {
            "n": 1,
            "mean": 37,
            "min": 37,
            "max": 37
          },
          "r5": {
            "n": 2,
            "mean": -1.5,
            "min": -2,
            "max": -1
          },
          "r25": {
            "n": 2,
            "mean": -21.5,
            "min": -25,
            "max": -18
          },
          "r11": {
            "n": 1,
            "mean": -1,
            "min": -1,
            "max": -1
          },
          "r23": {
            "n": 1,
            "mean": -24,
            "min": -24,
            "max": -24
          }
        },
        "interpretation": "体力变化以负为主（110 负 / 26 正），均值 −3.24/事件；r1 均值 −15.4（前期消耗大），后续回合 −0.25~−11.7；恢复事件存在（正 delta）→ 技能/回合恢复。单次变化幅度区间 −107~+105（受技能大额消耗/恢复影响）。"
      },
      "energy_301": {
        "meaning": "当前能量（occ=4 事件中增长）",
        "initial_values": [
          0,
          20,
          80
        ],
        "samples": 381,
        "delta": {
          "min": -105,
          "max": 113,
          "mean": 2.02,
          "negatives": 82,
          "positives": 299
        },
        "by_round": {
          "r1": {
            "n": 20,
            "mean": 12.5,
            "min": 10,
            "max": 15
          },
          "r2": {
            "n": 32,
            "mean": 4.69,
            "min": -101,
            "max": 106
          },
          "r3": {
            "n": 36,
            "mean": -12.42,
            "min": -105,
            "max": 75
          },
          "r4": {
            "n": 24,
            "mean": 2.38,
            "min": -89,
            "max": 92
          },
          "r5": {
            "n": 14,
            "mean": 4.07,
            "min": -13,
            "max": 15
          },
          "r6": {
            "n": 10,
            "mean": 5.1,
            "min": 4,
            "max": 12
          },
          "r7": {
            "n": 12,
            "mean": 4.25,
            "min": -4,
            "max": 12
          },
          "r8": {
            "n": 12,
            "mean": 4.25,
            "min": -7,
            "max": 12
          },
          "r9": {
            "n": 15,
            "mean": 4.47,
            "min": -13,
            "max": 20
          },
          "r10": {
            "n": 11,
            "mean": 4.64,
            "min": 2,
            "max": 12
          },
          "r11": {
            "n": 12,
            "mean": 4.42,
            "min": -1,
            "max": 7
          },
          "r12": {
            "n": 13,
            "mean": 4.77,
            "min": -24,
            "max": 25
          },
          "r13": {
            "n": 15,
            "mean": 4.33,
            "min": -16,
            "max": 20
          },
          "r14": {
            "n": 12,
            "mean": 4.25,
            "min": -19,
            "max": 23
          },
          "r15": {
            "n": 15,
            "mean": -2.2,
            "min": -90,
            "max": 76
          },
          "r16": {
            "n": 12,
            "mean": 4.17,
            "min": -9,
            "max": 13
          },
          "r19": {
            "n": 13,
            "mean": 1.77,
            "min": -80,
            "max": 77
          },
          "r22": {
            "n": 13,
            "mean": 1.85,
            "min": -90,
            "max": 113
          },
          "r23": {
            "n": 12,
            "mean": 4.83,
            "min": -101,
            "max": 105
          },
          "r24": {
            "n": 14,
            "mean": 4.07,
            "min": -22,
            "max": 18
          },
          "r25": {
            "n": 14,
            "mean": 4.43,
            "min": -15,
            "max": 20
          },
          "r17": {
            "n": 11,
            "mean": 0,
            "min": -67,
            "max": 28
          },
          "r18": {
            "n": 16,
            "mean": -0.31,
            "min": -74,
            "max": 13
          },
          "r20": {
            "n": 11,
            "mean": 0,
            "min": -69,
            "max": 42
          },
          "r21": {
            "n": 12,
            "mean": -3,
            "min": -83,
            "max": 8
          }
        },
        "interpretation": "能量变化以正为主（299 正 / 82 负），均值 +2.02/事件；r1 阶段 +12.5/回合（区间 10~15）→ 早期每回合稳定回能约 10~15；负 delta 多为技能释放消耗（r3 均值 −12.4、区间 −105~+75）。"
      },
      "modelling_guidance": [
        "模拟器初始体力取回放初始值区间（60~110，10 人样本），初始能量 0/20/80（与技能配置/星级有关，待对齐）",
        "每回合能量自然恢复约 +10~15（r1 观测），技能释放扣除能量（单次可 −100 级别）",
        "体力消耗与恢复按回合/对抗事件结算：单事件均值 −3.2，前期消耗更大；恢复事件（休息/技能）单独建模",
        "具体每 versus 类型的消耗量需从 replay_2 的 88 步事件流按 versus 分组统计（下一步）"
      ]
    }
  },
  "economy": {
    "stamina": {
      "daily_buy_count": {
        "value": 5,
        "unit": "次/天",
        "confidence": "单源",
        "evidence": [
          "https://www.taptap.cn/moment/804451716169729800"
        ],
        "note": "内测首日帖：一天只能买五次体力，钻石消耗累增；公测待验证"
      },
      "buy_cost_escalation": {
        "value": "累增（具体曲线未公开）",
        "unit": "钻石",
        "confidence": "待验证",
        "evidence": [
          "https://www.taptap.cn/moment/804451716169729800"
        ],
        "note": "建议不买体力（多源共识）"
      },
      "training_cost": {
        "value": "训练/次 20~30 精力（推断）",
        "unit": "精力",
        "confidence": "推断",
        "evidence": [
          "https://www.taptap.cn/moment/865657519840692900",
          "https://www.gamekee.com/lqsn/725601.html"
        ],
        "note": "由打工 25/次、留精力策略、望月门槛反推",
        "range": [
          20,
          30
        ]
      },
      "rest_recovery": {
        "value": "休息恢复 60~80 精力（推断）",
        "unit": "精力",
        "confidence": "推断",
        "evidence": [
          "https://www.gamekee.com/lqsn/725601.html"
        ],
        "note": "望月门槛「一次休息恢复70+」→ 区间",
        "range": [
          60,
          80
        ]
      },
      "max_stamina_progression": {
        "value": "强化后可 ≥120（望月门槛）",
        "unit": "精力",
        "confidence": "多源一致",
        "evidence": [
          "https://www.gamekee.com/lqsn/725601.html"
        ],
        "note": "训练流特殊强化解锁精力上限"
      }
    },
    "equipment": {
      "borrow": {
        "value": 6,
        "unit": "次/天",
        "confidence": "多源一致",
        "evidence": [
          "https://www.gamekee.com/lqsn/725601.html",
          "https://www.taptap.cn/moment/861959872722241200"
        ],
        "note": "好友+公会合计约 6 次；另一帖称 3 次 → 区间 [3,6]",
        "range": [
          3,
          6
        ]
      },
      "proficiency_curve_example": {
        "value": {
          "from": 10,
          "to": 41,
          "item": "4KG哑铃",
          "note": "熟练度 MAX 后训练加成"
        },
        "unit": "点",
        "confidence": "多源一致",
        "evidence": [
          "https://www.gamekee.com/lqsn/725398.html"
        ],
        "note": "客户端帮助图示例，非通用倍率；曲线形态待验证（建议分段线性/指数）"
      },
      "proficiency_crit_threshold": {
        "value": 70,
        "unit": "熟练度",
        "confidence": "多源一致",
        "evidence": [
          "cw_knowledge_strings.md @7551259"
        ],
        "note": "熟练度达到 70 时可触发暴击训练（关键阈值，此前未知）"
      },
      "proficiency_max": {
        "value": 100,
        "unit": "熟练度",
        "confidence": "多源一致",
        "evidence": [
          "cw_knowledge_strings.md @9389020"
        ],
        "note": "熟练度上限 100"
      },
      "crit_bonus": {
        "value": "存在器材暴击加成乘区",
        "unit": "机制",
        "confidence": "实测",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995300"
        ],
        "note": "数值待验证"
      },
      "ssr_select": {
        "count": 6,
        "unlock": "解锁〈胜者之路〉并达到 20 级",
        "evidence": [
          "screenshot images/863924531331337270_FjWOUznADSIQq2B60xOBspNjp-5T_20261026232532.png"
        ],
        "confidence": "单源"
      },
      "support_whistle": {
        "note": "支援哨子=开服期通用刚需（训练流/小游戏流刚需 1★以上；3★ 保值）；具体效果数值待验证",
        "evidence": [
          "https://www.gamekee.com/lqsn/725600.html",
          "https://www.gamekee.com/lqsn/725601.html",
          "https://www.taptap.cn/moment/861959872722241200"
        ]
      }
    },
    "gacha": {
      "beginner_pool_discount": {
        "value": 0.8,
        "unit": "折扣",
        "confidence": "单源",
        "evidence": [
          "https://www.taptap.cn/moment/861959872722241200"
        ],
        "note": "新手池 30 抽打 8 折（24 抽）"
      },
      "pity": {
        "value": 60,
        "unit": "抽",
        "confidence": "单源",
        "evidence": [
          "https://www.taptap.cn/moment/861959872722241200"
        ],
        "note": "普池保底 60 抽"
      },
      "first_day_draws": {
        "value": 166,
        "unit": "抽",
        "confidence": "单源",
        "evidence": [
          "https://www.taptap.cn/moment/861959872722241200"
        ],
        "note": "首日可获普池券约166抽（内测/开服活动口径）"
      },
      "daily_income_常驻券": {
        "value": {
          "min": 15,
          "max": 20
        },
        "unit": "抽/周",
        "confidence": "单源",
        "evidence": [
          "https://www.taptap.cn/moment/862516446742185000"
        ],
        "note": "日常活动周产常驻招募券"
      },
      "advice": "不要花钻抽常驻；优先 UP 球员/器材与圣山（多源一致）"
    },
    "in_run_economy": {
      "work_service_wage": {
        "value": 25,
        "unit": "精力/次",
        "confidence": "多源一致",
        "evidence": [
          "https://www.taptap.cn/moment/865657519840692900",
          "https://www.gamekee.com/lqsn/725602.html"
        ],
        "note": "服务员打工消耗 25 精力/次（收入最高）"
      },
      "allowance_sources": [
        "打工",
        "商店馈赠/乐透",
        "比赛奖金",
        "零花钱扭蛋",
        "角色心愿"
      ],
      "gacha_flow_rhythm": {
        "扭蛋流": {
          "friday_stamina_keep": 25,
          "saturday_cash": "≥400",
          "sunday_cash": "≥200",
          "order": "零花钱≥笔记＞负面换大量属性＞属性＞精力"
        },
        "商店流": {
          "friday_stamina_keep": 50,
          "shop_unlock_level": 20
        },
        "训练流": {
          "rule": "训练日不休息、尽量合练；周末公园划船/训练效率扭蛋/笔记扭蛋"
        },
        "evidence": [
          "https://www.gamekee.com/lqsn/725602.html",
          "https://www.taptap.cn/moment/865657519840692900",
          "https://www.taptap.cn/moment/863887392480691700"
        ]
      },
      "shop_item_price_ref": {
        "value": 50,
        "unit": "零花钱",
        "confidence": "多源一致",
        "evidence": [
          "https://www.gamekee.com/lqsn/725602.html"
        ],
        "note": "恢复精力道具尽量买 50 以下"
      },
      "wish_stock": {
        "rule": "滚动新闻有利好则买入（降低贷款利率=利好，降息=做空）",
        "evidence": [
          "https://www.taptap.cn/moment/862241060166830700"
        ]
      },
      "dungeon_roll": {
        "dice_x1": "常规",
        "dice_x10": "距抽奖券近时（可白嫖10连）",
        "note": "跑团之王心愿买道具期望为负 → 吃保底",
        "evidence": [
          "https://www.taptap.cn/moment/862241060166830700"
        ]
      }
    },
    "daily_loop": {
      "arena_unlock_day": 1,
      "equipment_pool_unlock_day": 2,
      "roguelike_roll": 2,
      "tactical_lab_day": 3,
      "hard_mode_day": 3,
      "note": "开服节奏（单源：叫我新手帖）",
      "evidence": [
        "https://www.taptap.cn/moment/862516446742185000"
      ]
    },
    "reset": {
      "free_until_level": 50,
      "cost_after": 200,
      "unit": "钻石",
      "evidence": [
        "https://www.taptap.cn/moment/862241060166830700"
      ]
    },
    "ingame_gacha": {
      "note": "养成剧本内（步行街）扭蛋相关实数（客户端数值区确证）",
      "upgrade_probability_tiers": {
        "value": [
          0.25,
          0.27,
          0.3,
          0.4
        ],
        "unit": "概率",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "扭蛋升级为增强版的概率档位 25%/27%/30%/40%"
      },
      "effect_30pct_trigger_rate": {
        "value": {
          "min": 0.4,
          "max": 0.6
        },
        "unit": "概率",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "「效果+30%」触发率 40%~60%"
      },
      "buy_again_probability": {
        "value": {
          "min": 0.4,
          "max": 0.6
        },
        "unit": "概率",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "「再买一个」概率 40%~60%（v2 已知模板，v3 补实数）"
      },
      "gold_slot_multiplier": {
        "value": [
          0.5,
          0.8,
          1
        ],
        "unit": "倍率档位",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "金币格倍率 50%/80%/100%"
      }
    },
    "ingame_shop": {
      "note": "养成剧本内商店实数（客户端数值区确证）",
      "per_5_items_training_bonus": {
        "value": 0.05,
        "unit": "训练加成",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "每购买 5 件商品训练加成 +5%"
      },
      "training_bonus_cap": {
        "value": {
          "base": 0.25,
          "upgraded": 0.35
        },
        "unit": "训练加成上限",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "上限 25%（升级 35%）"
      },
      "free_strong_item_max_per_run": {
        "value": 7,
        "unit": "次",
        "confidence": "多源一致",
        "evidence": [
          "data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）"
        ],
        "note": "免费强力商品单局最多触发 7 次"
      }
    }
  },
  "roster": {
    "algorithm": {
      "layers_used": "C 层 2 级属性（GameKee 六维子集）",
      "normalization": "attr_share = attr / attribute_sum（同稀有度总预算近似恒定 → 比较分配而非总量）；再乘稀有度总预算系数",
      "rarity_factor": {
        "SSR": 1,
        "SR": 0.9154587348135734,
        "R": 0.8054461667364893
      },
      "position_weights": {
        "控卫": {
          "attack": 0.2,
          "defense": 0.2,
          "organize": 0.6
        },
        "分卫": {
          "attack": 0.55,
          "defense": 0.15,
          "organize": 0.3
        },
        "小前": {
          "attack": 0.45,
          "defense": 0.3,
          "organize": 0.25
        },
        "大前": {
          "attack": 0.4,
          "defense": 0.45,
          "organize": 0.15
        },
        "中锋": {
          "attack": 0.4,
          "defense": 0.5,
          "organize": 0.1
        }
      },
      "formulas": {
        "attack_share": "(投射 + 攻筐)/2 / sum",
        "defense_share": "(防投 + 护筐)/2 / sum",
        "organize_share": "(传球 + 突破)/2 / sum",
        "attr_score": "(w_att×attack + w_def×defense + w_org×organize) × rarity_factor × 200",
        "skill_score": "技能文本启发式（大幅/中幅/小幅=3/2/1，全队/我方加权，能量/耐力/概率/叠加加分）归一化到 0~100",
        "battle_score": "attr_score×0.62 + skill_score×0.38",
        "training_value": "社区训练评分榜/训练技能整理映射 T0=100/T1=82/T2=64/T3=46/T4=28",
        "composite": "battle_score×0.5 + training_value×0.5（工具可调权重）"
      },
      "caveats": [
        "wiki 缺 篮板/逼抢/耐力/爆发 四项 C 层属性 → 中锋/大前防守评分偏保守（待客户端配置补全）",
        "技能文本启发式无法区分量级 → skill_score 只作粗排，最终以社区榜/实战校准",
        "training_value 是社区榜（单源）映射，非从属性推导 → 标记 confidence 单源"
      ],
      "rank_correlation_check": {
        "spearman_training_value_vs_community_tier": 1,
        "spearman_composite_vs_community_tier": 0.87,
        "note": "training_value 由社区榜映射（相关=1 属构造性结果，仅验证映射一致性）；composite 混合属性+战斗技能后相关性 0.87，说明训练榜与战斗属性近似正交 → 模型必须保留「训练价值/比赛价值」双评分"
      }
    },
    "characters": [
      {
        "id": 227738,
        "content_id": 725380,
        "name": "白神 时久",
        "rarity": "SSR",
        "position": "控卫",
        "style": null,
        "attributes_c": {
          "投射": 183,
          "攻筐": 180,
          "防投": 218,
          "护筐": 169,
          "传球": 197,
          "突破": 248
        },
        "attribute_sum": 1195,
        "potentials": {
          "slot1": 137,
          "slot2": 132,
          "slot3": 200,
          "slot4": 112,
          "slot5": 165,
          "slot6": 254
        },
        "scores": {
          "attack_share": 0.1519,
          "defense_share": 0.1619,
          "organize_share": 0.1862,
          "attr_score": 34.9,
          "skill_score": 100,
          "battle_score": 59.6,
          "training_value": 100,
          "training_value_source": "训练评分榜(单源)",
          "composite": 79.8
        },
        "training_profile": null,
        "community_tier": "T0",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227733,
        "content_id": 725375,
        "name": "野上 泷",
        "rarity": "SSR",
        "position": "大前",
        "style": null,
        "attributes_c": {
          "投射": 217,
          "攻筐": 200,
          "防投": 182,
          "护筐": 251,
          "传球": 170,
          "突破": 176
        },
        "attribute_sum": 1196,
        "potentials": {
          "slot1": 199,
          "slot2": 167,
          "slot3": 135,
          "slot4": 261,
          "slot5": 115,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1743,
          "defense_share": 0.181,
          "organize_share": 0.1446,
          "attr_score": 34.6,
          "skill_score": 80.2,
          "battle_score": 51.9,
          "training_value": 100,
          "training_value_source": "训练评分榜(单源)",
          "composite": 76
        },
        "training_profile": null,
        "community_tier": "T0",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227729,
        "content_id": 725371,
        "name": "羽濑川 湊",
        "rarity": "SSR",
        "position": "小前",
        "style": "篮板手",
        "attributes_c": {
          "投射": 179,
          "攻筐": 250,
          "防投": 216,
          "护筐": 183,
          "传球": 189,
          "突破": 176
        },
        "attribute_sum": 1193,
        "potentials": {
          "slot1": 130,
          "slot2": 260,
          "slot3": 198,
          "slot4": 139,
          "slot5": 150,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1798,
          "defense_share": 0.1672,
          "organize_share": 0.153,
          "attr_score": 33.9,
          "skill_score": 56.3,
          "battle_score": 42.4,
          "training_value": 100,
          "training_value_source": "训练评分榜(单源)",
          "composite": 71.2
        },
        "training_profile": null,
        "community_tier": "T0",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227711,
        "content_id": 725351,
        "name": "羽田 朱志香",
        "rarity": "SSR",
        "position": "分卫",
        "style": "组织者",
        "attributes_c": {
          "投射": 249,
          "攻筐": 174,
          "防投": 172,
          "护筐": 167,
          "传球": 234,
          "突破": 195
        },
        "attribute_sum": 1191,
        "potentials": {
          "slot1": 260,
          "slot2": 122,
          "slot3": 118,
          "slot4": 110,
          "slot5": 230,
          "slot6": 160
        },
        "scores": {
          "attack_share": 0.1776,
          "defense_share": 0.1423,
          "organize_share": 0.1801,
          "attr_score": 34.6,
          "skill_score": 35.7,
          "battle_score": 35,
          "training_value": 100,
          "training_value_source": "训练评分榜(单源)",
          "composite": 67.5
        },
        "training_profile": null,
        "community_tier": "T0",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227739,
        "content_id": 725381,
        "name": "希雅·奥黛拉",
        "rarity": "SSR",
        "position": "中锋",
        "style": null,
        "attributes_c": {
          "投射": 161,
          "攻筐": 250,
          "防投": 228,
          "护筐": 185,
          "传球": 168,
          "突破": 199
        },
        "attribute_sum": 1191,
        "potentials": {
          "slot1": 100,
          "slot2": 260,
          "slot3": 220,
          "slot4": 143,
          "slot5": 110,
          "slot6": 167
        },
        "scores": {
          "attack_share": 0.1725,
          "defense_share": 0.1734,
          "organize_share": 0.1541,
          "attr_score": 34.2,
          "skill_score": 29.4,
          "battle_score": 32.4,
          "training_value": 100,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 66.2
        },
        "training_profile": {
          "tier": "T0",
          "role": "额外拉人（1★稳定拉，训练流核心）"
        },
        "community_tier": "T0",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227708,
        "content_id": 725348,
        "name": "闪堂电",
        "rarity": "SSR",
        "position": "分卫",
        "style": "得分手",
        "attributes_c": {
          "投射": 201,
          "攻筐": 224,
          "防投": 172,
          "护筐": 167,
          "传球": 233,
          "突破": 196
        },
        "attribute_sum": 1193,
        "potentials": {
          "slot1": 170,
          "slot2": 212,
          "slot3": 118,
          "slot4": 110,
          "slot5": 230,
          "slot6": 160
        },
        "scores": {
          "attack_share": 0.1781,
          "defense_share": 0.1421,
          "organize_share": 0.1798,
          "attr_score": 34.6,
          "skill_score": 7.9,
          "battle_score": 24.5,
          "training_value": 100,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 62.3
        },
        "training_profile": {
          "tier": "T0",
          "role": "表情一致概率 +15%；2★哭/平常→笑脸 30%/60%"
        },
        "community_tier": "T0",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227721,
        "content_id": 725362,
        "name": "千圣·贝尔丝",
        "rarity": "SSR",
        "position": "中锋",
        "style": "篮板手",
        "attributes_c": {
          "投射": 161,
          "攻筐": 250,
          "防投": 180,
          "护筐": 235,
          "传球": 167,
          "突破": 200
        },
        "attribute_sum": 1193,
        "potentials": {
          "slot1": 100,
          "slot2": 260,
          "slot3": 130,
          "slot4": 233,
          "slot5": 110,
          "slot6": 167
        },
        "scores": {
          "attack_share": 0.1723,
          "defense_share": 0.1739,
          "organize_share": 0.1538,
          "attr_score": 34.2,
          "skill_score": 46,
          "battle_score": 38.7,
          "training_value": 82,
          "training_value_source": "训练评分榜(单源)",
          "composite": 60.4
        },
        "training_profile": null,
        "community_tier": "T1",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227707,
        "content_id": 725347,
        "name": "洺瑶",
        "rarity": "SSR",
        "position": "中锋",
        "style": "防守者",
        "attributes_c": {
          "投射": 161,
          "攻筐": 250,
          "防投": 228,
          "护筐": 185,
          "传球": 168,
          "突破": 199
        },
        "attribute_sum": 1191,
        "potentials": {
          "slot1": 100,
          "slot2": 260,
          "slot3": 220,
          "slot4": 143,
          "slot5": 110,
          "slot6": 167
        },
        "scores": {
          "attack_share": 0.1725,
          "defense_share": 0.1734,
          "organize_share": 0.1541,
          "attr_score": 34.2,
          "skill_score": 87.3,
          "battle_score": 54.4,
          "training_value": 64,
          "training_value_source": "训练评分榜(单源)",
          "composite": 59.2
        },
        "training_profile": null,
        "community_tier": "T2",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227732,
        "content_id": 725374,
        "name": "卧云 真昼",
        "rarity": "SSR",
        "position": "分卫",
        "style": "组织者",
        "attributes_c": {
          "投射": 249,
          "攻筐": 174,
          "防投": 172,
          "护筐": 167,
          "传球": 234,
          "突破": 195
        },
        "attribute_sum": 1191,
        "potentials": {
          "slot1": 260,
          "slot2": 122,
          "slot3": 118,
          "slot4": 110,
          "slot5": 230,
          "slot6": 160
        },
        "scores": {
          "attack_share": 0.1776,
          "defense_share": 0.1423,
          "organize_share": 0.1801,
          "attr_score": 34.6,
          "skill_score": 38.9,
          "battle_score": 36.2,
          "training_value": 82,
          "training_value_source": "训练评分榜(单源)",
          "composite": 59.1
        },
        "training_profile": null,
        "community_tier": "T1",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227710,
        "content_id": 725350,
        "name": "早濑 千秋",
        "rarity": "SR",
        "position": "大前",
        "style": "防守者",
        "attributes_c": {
          "投射": 154,
          "攻筐": 227,
          "防投": 211,
          "护筐": 184,
          "传球": 155,
          "突破": 160
        },
        "attribute_sum": 1091,
        "potentials": {
          "slot1": 109,
          "slot2": 257,
          "slot3": 225,
          "slot4": 171,
          "slot5": 115,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1746,
          "defense_share": 0.181,
          "organize_share": 0.1444,
          "attr_score": 31.7,
          "skill_score": 38.1,
          "battle_score": 34.1,
          "training_value": 82,
          "training_value_source": "训练评分榜(单源)",
          "composite": 58
        },
        "training_profile": null,
        "community_tier": "T1",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227734,
        "content_id": 725376,
        "name": "降旗 千红纱",
        "rarity": "SSR",
        "position": "小前",
        "style": "篮板手",
        "attributes_c": {
          "投射": 183,
          "攻筐": 230,
          "防投": 218,
          "护筐": 169,
          "传球": 197,
          "突破": 198
        },
        "attribute_sum": 1195,
        "potentials": {
          "slot1": 137,
          "slot2": 222,
          "slot3": 200,
          "slot4": 112,
          "slot5": 165,
          "slot6": 164
        },
        "scores": {
          "attack_share": 0.1728,
          "defense_share": 0.1619,
          "organize_share": 0.1653,
          "attr_score": 33.5,
          "skill_score": 34.1,
          "battle_score": 33.8,
          "training_value": 82,
          "training_value_source": "训练评分榜(单源)",
          "composite": 57.9
        },
        "training_profile": null,
        "community_tier": "T1",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227730,
        "content_id": 725372,
        "name": "真崎 辉世",
        "rarity": "SSR",
        "position": "控卫",
        "style": "得分手",
        "attributes_c": {
          "投射": 201,
          "攻筐": 174,
          "防投": 172,
          "护筐": 167,
          "传球": 234,
          "突破": 245
        },
        "attribute_sum": 1193,
        "potentials": {
          "slot1": 170,
          "slot2": 122,
          "slot3": 118,
          "slot4": 110,
          "slot5": 230,
          "slot6": 250
        },
        "scores": {
          "attack_share": 0.1572,
          "defense_share": 0.1421,
          "organize_share": 0.2008,
          "attr_score": 36.1,
          "skill_score": 19.8,
          "battle_score": 29.9,
          "training_value": 82,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 56
        },
        "training_profile": {
          "tier": "T1",
          "role": "表情一致倍率乘区（2.5+0.25）"
        },
        "community_tier": "T1",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227719,
        "content_id": 725360,
        "name": "名雪 纱夜",
        "rarity": "SSR",
        "position": "控卫",
        "style": "组织者",
        "attributes_c": {
          "投射": 183,
          "攻筐": 180,
          "防投": 168,
          "护筐": 217,
          "传球": 198,
          "突破": 247
        },
        "attribute_sum": 1193,
        "potentials": {
          "slot1": 137,
          "slot2": 132,
          "slot3": 110,
          "slot4": 202,
          "slot5": 165,
          "slot6": 254
        },
        "scores": {
          "attack_share": 0.1521,
          "defense_share": 0.1614,
          "organize_share": 0.1865,
          "attr_score": 34.9,
          "skill_score": 58.7,
          "battle_score": 44,
          "training_value": 64,
          "training_value_source": "训练评分榜(单源)",
          "composite": 54
        },
        "training_profile": null,
        "community_tier": "T2",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227714,
        "content_id": 725355,
        "name": "藤松 玖怜",
        "rarity": "SSR",
        "position": "分卫",
        "style": "防守者",
        "attributes_c": {
          "投射": 227,
          "攻筐": 202,
          "防投": 216,
          "护筐": 183,
          "传球": 189,
          "突破": 176
        },
        "attribute_sum": 1193,
        "potentials": {
          "slot1": 220,
          "slot2": 170,
          "slot3": 198,
          "slot4": 139,
          "slot5": 150,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1798,
          "defense_share": 0.1672,
          "organize_share": 0.153,
          "attr_score": 34,
          "skill_score": 50,
          "battle_score": 40.1,
          "training_value": 64,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 52
        },
        "training_profile": {
          "tier": "T2",
          "role": "精力回复 5 次 → 训练加成%（乘法区）"
        },
        "community_tier": "T2",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227713,
        "content_id": 725354,
        "name": "百目鬼 剑",
        "rarity": "SSR",
        "position": "小前",
        "style": "组织者",
        "attributes_c": {
          "投射": 227,
          "攻筐": 250,
          "防投": 168,
          "护筐": 183,
          "传球": 189,
          "突破": 176
        },
        "attribute_sum": 1193,
        "potentials": {
          "slot1": 220,
          "slot2": 260,
          "slot3": 108,
          "slot4": 139,
          "slot5": 150,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1999,
          "defense_share": 0.1471,
          "organize_share": 0.153,
          "attr_score": 34.5,
          "skill_score": 46.8,
          "battle_score": 39.2,
          "training_value": 64,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 51.6
        },
        "training_profile": {
          "tier": "T2",
          "role": "周末加训（额外训练机会）"
        },
        "community_tier": null,
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227731,
        "content_id": 725373,
        "name": "先斗 月绮",
        "rarity": "SR",
        "position": "控卫",
        "style": "防守者",
        "attributes_c": {
          "投射": 212,
          "攻筐": 165,
          "防投": 154,
          "护筐": 156,
          "传球": 224,
          "突破": 182
        },
        "attribute_sum": 1093,
        "potentials": {
          "slot1": 227,
          "slot2": 132,
          "slot3": 110,
          "slot4": 112,
          "slot5": 255,
          "slot6": 164
        },
        "scores": {
          "attack_share": 0.1725,
          "defense_share": 0.1418,
          "organize_share": 0.1857,
          "attr_score": 31.9,
          "skill_score": 38.1,
          "battle_score": 34.3,
          "training_value": 64,
          "training_value_source": "训练评分榜(单源)",
          "composite": 49.1
        },
        "training_profile": null,
        "community_tier": "T2",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227720,
        "content_id": 725361,
        "name": "佐久间 雨乃",
        "rarity": "SSR",
        "position": "大前",
        "style": "防守者",
        "attributes_c": {
          "投射": 167,
          "攻筐": 250,
          "防投": 181,
          "护筐": 252,
          "传球": 170,
          "突破": 175
        },
        "attribute_sum": 1195,
        "potentials": {
          "slot1": 109,
          "slot2": 257,
          "slot3": 135,
          "slot4": 261,
          "slot5": 115,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1745,
          "defense_share": 0.1812,
          "organize_share": 0.1444,
          "attr_score": 34.6,
          "skill_score": 30.2,
          "battle_score": 32.9,
          "training_value": 64,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 48.5
        },
        "training_profile": {
          "tier": "T2",
          "role": "前期核心（flat 主属性加值，后期稀释）"
        },
        "community_tier": "T2",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227704,
        "content_id": 725344,
        "name": "近江 奏",
        "rarity": "SR",
        "position": "分卫",
        "style": "组织者",
        "attributes_c": {
          "投射": 230,
          "攻筐": 160,
          "防投": 157,
          "护筐": 154,
          "传球": 168,
          "突破": 224
        },
        "attribute_sum": 1093,
        "potentials": {
          "slot1": 260,
          "slot2": 122,
          "slot3": 118,
          "slot4": 110,
          "slot5": 140,
          "slot6": 250
        },
        "scores": {
          "attack_share": 0.1784,
          "defense_share": 0.1423,
          "organize_share": 0.1793,
          "attr_score": 31.7,
          "skill_score": 34.1,
          "battle_score": 32.6,
          "training_value": 64,
          "training_value_source": "训练评分榜(单源)",
          "composite": 48.3
        },
        "training_profile": null,
        "community_tier": "T2",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227706,
        "content_id": 725346,
        "name": "亚理纱 贾斯敏",
        "rarity": "SR",
        "position": "中锋",
        "style": "得分手",
        "attributes_c": {
          "投射": 150,
          "攻筐": 230,
          "防投": 162,
          "护筐": 216,
          "传球": 153,
          "突破": 182
        },
        "attribute_sum": 1093,
        "potentials": {
          "slot1": 100,
          "slot2": 260,
          "slot3": 130,
          "slot4": 233,
          "slot5": 110,
          "slot6": 167
        },
        "scores": {
          "attack_share": 0.1738,
          "defense_share": 0.1729,
          "organize_share": 0.1532,
          "attr_score": 31.4,
          "skill_score": 27.8,
          "battle_score": 30,
          "training_value": 64,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 47
        },
        "training_profile": {
          "tier": "T2",
          "role": "减训练精力消耗（开荒核心）"
        },
        "community_tier": "T2",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227716,
        "content_id": 725357,
        "name": "雨森 琉璃",
        "rarity": "SSR",
        "position": "大前",
        "style": "组织者",
        "attributes_c": {
          "投射": 217,
          "攻筐": 200,
          "防投": 182,
          "护筐": 201,
          "传球": 169,
          "突破": 224
        },
        "attribute_sum": 1193,
        "potentials": {
          "slot1": 199,
          "slot2": 167,
          "slot3": 135,
          "slot4": 171,
          "slot5": 115,
          "slot6": 213
        },
        "scores": {
          "attack_share": 0.1748,
          "defense_share": 0.1605,
          "organize_share": 0.1647,
          "attr_score": 33.4,
          "skill_score": 57.9,
          "battle_score": 42.7,
          "training_value": 46,
          "training_value_source": "训练评分榜(单源)",
          "composite": 44.4
        },
        "training_profile": null,
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227712,
        "content_id": 725352,
        "name": "望月 透",
        "rarity": "SSR",
        "position": "小前",
        "style": "得分手",
        "attributes_c": {
          "投射": 227,
          "攻筐": 202,
          "防投": 168,
          "护筐": 183,
          "传球": 239,
          "突破": 176
        },
        "attribute_sum": 1195,
        "potentials": {
          "slot1": 220,
          "slot2": 170,
          "slot3": 108,
          "slot4": 139,
          "slot5": 240,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1795,
          "defense_share": 0.1469,
          "organize_share": 0.1736,
          "attr_score": 33.6,
          "skill_score": 7.9,
          "battle_score": 23.9,
          "training_value": 64,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 44
        },
        "training_profile": {
          "tier": "T2",
          "role": "长期组件（表情 bonus 乘区，+8%）"
        },
        "community_tier": "T2",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227709,
        "content_id": 725349,
        "name": "克拉丽丝·波洛",
        "rarity": "SR",
        "position": "控卫",
        "style": "组织者",
        "attributes_c": {
          "投射": 168,
          "攻筐": 165,
          "防投": 154,
          "护筐": 155,
          "传球": 225,
          "突破": 226
        },
        "attribute_sum": 1093,
        "potentials": {
          "slot1": 137,
          "slot2": 132,
          "slot3": 110,
          "slot4": 112,
          "slot5": 255,
          "slot6": 254
        },
        "scores": {
          "attack_share": 0.1523,
          "defense_share": 0.1414,
          "organize_share": 0.2063,
          "attr_score": 33.4,
          "skill_score": 48.4,
          "battle_score": 39.1,
          "training_value": 46,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 42.5
        },
        "training_profile": {
          "tier": "T3",
          "role": "过渡（凑合用）"
        },
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227722,
        "content_id": 725363,
        "name": "稻叶 杏里",
        "rarity": "SSR",
        "position": "大前",
        "style": "得分手",
        "attributes_c": {
          "投射": 167,
          "攻筐": 250,
          "防投": 231,
          "护筐": 202,
          "传球": 170,
          "突破": 176
        },
        "attribute_sum": 1196,
        "potentials": {
          "slot1": 109,
          "slot2": 257,
          "slot3": 225,
          "slot4": 171,
          "slot5": 115,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1743,
          "defense_share": 0.181,
          "organize_share": 0.1446,
          "attr_score": 34.6,
          "skill_score": 42.9,
          "battle_score": 37.7,
          "training_value": 46,
          "training_value_source": "训练评分榜(单源)",
          "composite": 41.9
        },
        "training_profile": null,
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227723,
        "content_id": 725364,
        "name": "清水 万里",
        "rarity": "SR",
        "position": "控卫",
        "style": "篮板手",
        "attributes_c": {
          "投射": 168,
          "攻筐": 209,
          "防投": 154,
          "护筐": 155,
          "传球": 181,
          "突破": 226
        },
        "attribute_sum": 1093,
        "potentials": {
          "slot1": 137,
          "slot2": 222,
          "slot3": 110,
          "slot4": 112,
          "slot5": 165,
          "slot6": 254
        },
        "scores": {
          "attack_share": 0.1725,
          "defense_share": 0.1414,
          "organize_share": 0.1862,
          "attr_score": 31.9,
          "skill_score": 46,
          "battle_score": 37.3,
          "training_value": 46,
          "training_value_source": "训练评分榜(单源)",
          "composite": 41.6
        },
        "training_profile": null,
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227737,
        "content_id": 725379,
        "name": "远野 桐",
        "rarity": "SSR",
        "position": "中锋",
        "style": "组织者",
        "attributes_c": {
          "投射": 211,
          "攻筐": 202,
          "防投": 180,
          "护筐": 235,
          "传球": 167,
          "突破": 200
        },
        "attribute_sum": 1195,
        "potentials": {
          "slot1": 190,
          "slot2": 170,
          "slot3": 130,
          "slot4": 233,
          "slot5": 110,
          "slot6": 167
        },
        "scores": {
          "attack_share": 0.1728,
          "defense_share": 0.1736,
          "organize_share": 0.1536,
          "attr_score": 34.3,
          "skill_score": 42.1,
          "battle_score": 37.2,
          "training_value": 46,
          "training_value_source": "训练评分榜(单源)",
          "composite": 41.6
        },
        "training_profile": null,
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227705,
        "content_id": 725345,
        "name": "和泉 香织",
        "rarity": "SSR",
        "position": "控卫",
        "style": "得分手",
        "attributes_c": {
          "投射": 183,
          "攻筐": 180,
          "防投": 168,
          "护筐": 169,
          "传球": 247,
          "突破": 248
        },
        "attribute_sum": 1195,
        "potentials": {
          "slot1": 137,
          "slot2": 132,
          "slot3": 110,
          "slot4": 112,
          "slot5": 255,
          "slot6": 254
        },
        "scores": {
          "attack_share": 0.1519,
          "defense_share": 0.141,
          "organize_share": 0.2071,
          "attr_score": 36.6,
          "skill_score": 36.5,
          "battle_score": 36.5,
          "training_value": 46,
          "training_value_source": "训练评分榜(单源)",
          "composite": 41.3
        },
        "training_profile": null,
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227703,
        "content_id": 725343,
        "name": "龙宫寺 心叶",
        "rarity": "SR",
        "position": "大前",
        "style": "组织者",
        "attributes_c": {
          "投射": 232,
          "攻筐": 215,
          "防投": 200,
          "护筐": 217,
          "传球": 189,
          "突破": 240
        },
        "attribute_sum": 1293,
        "potentials": {
          "slot1": 199,
          "slot2": 167,
          "slot3": 135,
          "slot4": 171,
          "slot5": 115,
          "slot6": 213
        },
        "scores": {
          "attack_share": 0.1729,
          "defense_share": 0.1613,
          "organize_share": 0.1659,
          "attr_score": 30.5,
          "skill_score": 35.7,
          "battle_score": 32.5,
          "training_value": 46,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 39.3
        },
        "training_profile": {
          "tier": "T3",
          "role": "低配望月（+4%）"
        },
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227735,
        "content_id": 725377,
        "name": "林原 树里",
        "rarity": "SSR",
        "position": "控卫",
        "style": "防守者",
        "attributes_c": {
          "投射": 201,
          "攻筐": 174,
          "防投": 222,
          "护筐": 167,
          "传球": 184,
          "突破": 245
        },
        "attribute_sum": 1193,
        "potentials": {
          "slot1": 170,
          "slot2": 122,
          "slot3": 208,
          "slot4": 110,
          "slot5": 140,
          "slot6": 250
        },
        "scores": {
          "attack_share": 0.1572,
          "defense_share": 0.163,
          "organize_share": 0.1798,
          "attr_score": 34.4,
          "skill_score": 28.6,
          "battle_score": 32.2,
          "training_value": 46,
          "training_value_source": "训练评分榜(单源)",
          "composite": 39.1
        },
        "training_profile": null,
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227724,
        "content_id": 725366,
        "name": "榎本 纯那",
        "rarity": "SSR",
        "position": "中锋",
        "style": "防守者",
        "attributes_c": {
          "投射": 161,
          "攻筐": 250,
          "防投": 180,
          "护筐": 235,
          "传球": 167,
          "突破": 200
        },
        "attribute_sum": 1193,
        "potentials": {
          "slot1": 100,
          "slot2": 260,
          "slot3": 130,
          "slot4": 233,
          "slot5": 110,
          "slot6": 167
        },
        "scores": {
          "attack_share": 0.1723,
          "defense_share": 0.1739,
          "organize_share": 0.1538,
          "attr_score": 34.2,
          "skill_score": 28.6,
          "battle_score": 32.1,
          "training_value": 46,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 39
        },
        "training_profile": {
          "tier": "T3",
          "role": "购买商品 5 次 → 训练加成%"
        },
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227725,
        "content_id": 725367,
        "name": "春澄 永远",
        "rarity": "SR",
        "position": "大前",
        "style": "篮板手",
        "attributes_c": {
          "投射": 154,
          "攻筐": 227,
          "防投": 166,
          "护筐": 229,
          "传球": 155,
          "突破": 160
        },
        "attribute_sum": 1091,
        "potentials": {
          "slot1": 109,
          "slot2": 257,
          "slot3": 135,
          "slot4": 261,
          "slot5": 115,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1746,
          "defense_share": 0.181,
          "organize_share": 0.1444,
          "attr_score": 31.7,
          "skill_score": 32.5,
          "battle_score": 32,
          "training_value": 46,
          "training_value_source": "训练评分榜(单源)",
          "composite": 39
        },
        "training_profile": null,
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227702,
        "content_id": 725342,
        "name": "澪奈·贾妮丝",
        "rarity": "SR",
        "position": "小前",
        "style": "防守者",
        "attributes_c": {
          "投射": 197,
          "攻筐": 264,
          "防投": 187,
          "护筐": 248,
          "传球": 207,
          "突破": 194
        },
        "attribute_sum": 1297,
        "potentials": {
          "slot1": 130,
          "slot2": 260,
          "slot3": 108,
          "slot4": 229,
          "slot5": 150,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1777,
          "defense_share": 0.1677,
          "organize_share": 0.1546,
          "attr_score": 30.9,
          "skill_score": 30.2,
          "battle_score": 30.6,
          "training_value": 46,
          "training_value_source": "训练技能整理(TapTap/GameKee)",
          "composite": 38.3
        },
        "training_profile": {
          "tier": "T3",
          "role": "最终加成（SR 训练流）"
        },
        "community_tier": "T3",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227726,
        "content_id": 725368,
        "name": "森田 莉莉",
        "rarity": "R",
        "position": "控卫",
        "style": "得分手",
        "attributes_c": {
          "投射": 150,
          "攻筐": 148,
          "防投": 140,
          "护筐": 140,
          "传球": 192,
          "突破": 192
        },
        "attribute_sum": 962,
        "potentials": {
          "slot1": 137,
          "slot2": 132,
          "slot3": 110,
          "slot4": 112,
          "slot5": 255,
          "slot6": 254
        },
        "scores": {
          "attack_share": 0.1549,
          "defense_share": 0.1455,
          "organize_share": 0.1996,
          "attr_score": 29,
          "skill_score": 0,
          "battle_score": 18,
          "training_value": null,
          "training_value_source": "无数据",
          "composite": 34
        },
        "training_profile": null,
        "community_tier": null,
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227727,
        "content_id": 725369,
        "name": "美伽 未来",
        "rarity": "R",
        "position": "分卫",
        "style": "组织者",
        "attributes_c": {
          "投射": 162,
          "攻筐": 176,
          "防投": 142,
          "护筐": 140,
          "传球": 150,
          "突破": 190
        },
        "attribute_sum": 960,
        "potentials": {
          "slot1": 170,
          "slot2": 212,
          "slot3": 118,
          "slot4": 110,
          "slot5": 140,
          "slot6": 250
        },
        "scores": {
          "attack_share": 0.176,
          "defense_share": 0.1469,
          "organize_share": 0.1771,
          "attr_score": 27.7,
          "skill_score": 0,
          "battle_score": 17.2,
          "training_value": null,
          "training_value_source": "无数据",
          "composite": 33.6
        },
        "training_profile": null,
        "community_tier": null,
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227728,
        "content_id": 725370,
        "name": "五十岚 诗音",
        "rarity": "R",
        "position": "中锋",
        "style": "防守者",
        "attributes_c": {
          "投射": 136,
          "攻筐": 194,
          "防投": 180,
          "护筐": 152,
          "传球": 140,
          "突破": 160
        },
        "attribute_sum": 962,
        "potentials": {
          "slot1": 100,
          "slot2": 260,
          "slot3": 220,
          "slot4": 143,
          "slot5": 110,
          "slot6": 167
        },
        "scores": {
          "attack_share": 0.1715,
          "defense_share": 0.1726,
          "organize_share": 0.1559,
          "attr_score": 27.5,
          "skill_score": 0,
          "battle_score": 17,
          "training_value": null,
          "training_value_source": "无数据",
          "composite": 33.5
        },
        "training_profile": null,
        "community_tier": null,
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227718,
        "content_id": 725359,
        "name": "毒岛 黛也",
        "rarity": "SR",
        "position": "分卫",
        "style": "防守者",
        "attributes_c": {
          "投射": 230,
          "攻筐": 160,
          "防投": 157,
          "护筐": 199,
          "传球": 169,
          "突破": 180
        },
        "attribute_sum": 1095,
        "potentials": {
          "slot1": 260,
          "slot2": 122,
          "slot3": 118,
          "slot4": 200,
          "slot5": 140,
          "slot6": 160
        },
        "scores": {
          "attack_share": 0.1781,
          "defense_share": 0.1626,
          "organize_share": 0.1594,
          "attr_score": 31.2,
          "skill_score": 31.7,
          "battle_score": 31.4,
          "training_value": 28,
          "training_value_source": "训练评分榜(单源)",
          "composite": 29.7
        },
        "training_profile": null,
        "community_tier": "T4",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227736,
        "content_id": 725378,
        "name": "美星 栗栖",
        "rarity": "SR",
        "position": "小前",
        "style": "篮板手",
        "attributes_c": {
          "投射": 210,
          "攻筐": 183,
          "防投": 154,
          "护筐": 168,
          "传球": 172,
          "突破": 206
        },
        "attribute_sum": 1093,
        "potentials": {
          "slot1": 220,
          "slot2": 170,
          "slot3": 108,
          "slot4": 139,
          "slot5": 150,
          "slot6": 213
        },
        "scores": {
          "attack_share": 0.1798,
          "defense_share": 0.1473,
          "organize_share": 0.1729,
          "attr_score": 30.8,
          "skill_score": 30.2,
          "battle_score": 30.6,
          "training_value": 28,
          "training_value_source": "训练评分榜(单源)",
          "composite": 29.3
        },
        "training_profile": null,
        "community_tier": "T4",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227715,
        "content_id": 725356,
        "name": "绿川 步梦",
        "rarity": "SR",
        "position": "中锋",
        "style": "组织者",
        "attributes_c": {
          "投射": 150,
          "攻筐": 230,
          "防投": 162,
          "护筐": 216,
          "传球": 153,
          "突破": 182
        },
        "attribute_sum": 1093,
        "potentials": {
          "slot1": 100,
          "slot2": 260,
          "slot3": 130,
          "slot4": 233,
          "slot5": 110,
          "slot6": 167
        },
        "scores": {
          "attack_share": 0.1738,
          "defense_share": 0.1729,
          "organize_share": 0.1532,
          "attr_score": 31.4,
          "skill_score": 28.6,
          "battle_score": 30.3,
          "training_value": 28,
          "training_value_source": "训练评分榜(单源)",
          "composite": 29.1
        },
        "training_profile": null,
        "community_tier": "T4",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      },
      {
        "id": 227717,
        "content_id": 725358,
        "name": "皆川 式",
        "rarity": "SR",
        "position": "小前",
        "style": "组织者",
        "attributes_c": {
          "投射": 164,
          "攻筐": 230,
          "防投": 196,
          "护筐": 168,
          "传球": 173,
          "突破": 160
        },
        "attribute_sum": 1091,
        "potentials": {
          "slot1": 130,
          "slot2": 260,
          "slot3": 198,
          "slot4": 139,
          "slot5": 150,
          "slot6": 123
        },
        "scores": {
          "attack_share": 0.1806,
          "defense_share": 0.1668,
          "organize_share": 0.1526,
          "attr_score": 31,
          "skill_score": 20.6,
          "battle_score": 27.1,
          "training_value": 28,
          "training_value_source": "训练评分榜(单源)",
          "composite": 27.6
        },
        "training_profile": null,
        "community_tier": "T4",
        "missing_c_attrs": [
          "篮板",
          "逼抢",
          "耐力",
          "爆发"
        ]
      }
    ],
    "replacement_logic": {
      "雨乃 → 腾松": {
        "logic": "雨乃技能 = flat 主属性加值（加法区，+3/+2），基础值大且不吃训练加成%放大 → 边际稀释；腾松技能在训练加成% 乘区 + 精力回复 → 随强化等级提高收益上升。",
        "evidence": [
          "https://www.taptap.cn/moment/805700735671995300",
          "https://www.taptap.cn/moment/862429125158111400"
        ],
        "note": "社区实测「雨乃换腾松分数有明显提升」；适用公测版本仍需按技能数值校准"
      },
      "龙宫寺/望月": "表情 bonus 同乘区互稀释 → 一般二选一（望月+8% 优）",
      "真崎": "独占一致倍率乘区（2.5+0.25）→ 长线价值高",
      "闪堂电 ↔ 真崎": "闪堂电提一致概率（乘区入口），真崎提一致倍率（乘区出口）→ 组合互补",
      "位置链（训练流）": {
        "控卫": "克拉丽丝→∞真崎",
        "小前": "澪奈→∞望月（→百目鬼）",
        "大前": "龙宫寺→∞雨乃",
        "中锋": "亚理纱→∞希雅"
      },
      "evidence": [
        "https://www.taptap.cn/moment/863887392480691700",
        "https://www.taptap.cn/moment/862429125158111400"
      ]
    },
    "tier_reference": {
      "sources": [
        {
          "name": "北空之丘小助手·公测前3天训练评分榜",
          "tiers": {
            "T0": [
              "野上 泷",
              "白神 时久",
              "希雅·奥黛拉",
              "闪堂电",
              "羽田 朱志香",
              "羽濑川 湊"
            ],
            "T1": [
              "卧云 真昼",
              "降旗 千红纱",
              "真崎 辉世",
              "千圣·贝尔丝",
              "早濑 千秋"
            ],
            "T2": [
              "望月 透",
              "佐久间 雨乃",
              "洺瑶",
              "名雪 纱夜",
              "藤松 玖怜",
              "先斗 月绮",
              "近江 奏",
              "亚理纱 贾斯敏"
            ],
            "T3": [
              "远野 桐",
              "林原 树里",
              "稻叶 杏里",
              "和泉 香织",
              "雨森 琉璃",
              "榎本 纯那",
              "克拉丽丝·波洛",
              "春澄 永远",
              "龙宫寺 心叶",
              "澪奈·贾妮丝",
              "清水 万里"
            ],
            "T4": [
              "美星 栗栖",
              "皆川 式",
              "毒岛 黛也",
              "绿川 步梦"
            ]
          },
          "evidence": "https://www.taptap.cn/moment/863887392480691700",
          "basis": "1级/天赋未升级/白板0星"
        },
        {
          "name": "GameKee 开服角色强度榜（22名角色评级）",
          "evidence": "https://www.gamekee.com/lqsn/725623.html",
          "detail_file": "data/structured/derived_roster.json → tier_list（T0 5人/T1 8人/T2 9人）"
        }
      ],
      "note": "两套榜单口径不同（训练 vs 综合），工具并列展示，不合并成单一「强度」"
    },
    "cross_reference": {
      "file": "data/structured/derived_roster.json",
      "producer": "data-scout (T8)",
      "contents": [
        "players（38 人：潜力向量/模板/技能标签/位置排名/多维 z 分）",
        "templates 模板分组",
        "tier_list（GameKee 725623 权威榜）",
        "rankings（overall/panel_only/skill_only）",
        "training_talents（训练技能交叉表）",
        "stream_roles（四流派阵容/自选顺序）",
        "claims_crosswalk"
      ],
      "note": "T5 工具包可直接消费该文件的维度分数/模板/榜单；本 model.json 的 roster 提供算法与双评分（battle/training），两者互补：model.json 负责「公式与参数可校准」，derived_roster.json 负责「细分维度 z 分与榜单交叉」。"
    },
    "strategy_analysis": {
      "four_streams": {
        "训练流": {
          "profile": "高乘区上限/高投入/成型易但贵",
          "advantages": [
            "表情+训练加成双乘区",
            "卡池倾斜"
          ],
          "risks": [
            "依赖哨子与精力循环",
            "四带一弱",
            "二星闪堂+百目鬼≈9万钻"
          ],
          "best_attributes": [
            "弹跳",
            "防守",
            "体能(精力循环)"
          ],
          "evidence": [
            "https://www.taptap.cn/moment/863887392480691700",
            "https://www.taptap.cn/moment/862740910595641100"
          ]
        },
        "扭蛋流": {
          "profile": "开荒最快/后期上限低",
          "advantages": [
            "买扭蛋全队加属性",
            "开荒强"
          ],
          "risks": [
            "必须 SSR「再买一个」",
            "吃零花钱随机"
          ],
          "best_attributes": [
            "全属性均衡",
            "精力(打工)"
          ],
          "evidence": [
            "https://www.taptap.cn/moment/862516446742185000",
            "https://www.gamekee.com/lqsn/725601.html"
          ]
        },
        "商店流": {
          "profile": "中后期稳定/门槛20级",
          "advantages": [
            "后期商品全队增益",
            "经济自洽"
          ],
          "risks": [
            "开荒几乎不能用",
            "栏位需强化"
          ],
          "best_attributes": [
            "经济向(零花钱/商品)"
          ],
          "evidence": [
            "https://www.taptap.cn/moment/863887392480691700",
            "https://www.taptap.cn/moment/862429125158111400"
          ]
        },
        "小游戏流": {
          "profile": "开局强/后期断档",
          "advantages": [
            "开服一周极强",
            "单人属性补强"
          ],
          "risks": [
            "只拉得动指导角色",
            "缺 SSR",
            "无法辐射队友"
          ],
          "best_attributes": [
            "单一主属性(偏科)"
          ],
          "evidence": [
            "https://www.taptap.cn/moment/863887392480691700",
            "https://www.gamekee.com/lqsn/725601.html"
          ]
        }
      },
      "margin_analysis": {
        "dilution": "同乘区加成边际递减（表情 bonus、训练加成%）；flat 加值在基础值大时被稀释（雨乃案例）",
        "sensitivity_note": "训练公式中 训练加成%/暴击加成 是乘法放大项 → 对总收益弹性最高；base/personnel/equip 为固定小量 → 等级越高占比越低"
      }
    }
  },
  "calibration": {
    "philosophy": "所有关键系数做成「可校准参数」；寒溟输入游戏内实测值后，验证器反解参数并给残差/是否需要补充数据",
    "verifier_inputs": [
      {
        "id": "V1",
        "module": "training",
        "need": "一次训练界面显示的主属性增加数字 + 训练等级 + 在场人数 + 是否有经理 + 对口器材 + 是否暴击",
        "solves": [
          "base",
          "level_bonus",
          "personnel_bonus",
          "manager_bonus",
          "crit_bonus"
        ]
      },
      {
        "id": "V2",
        "module": "training",
        "need": "同一次训练后 主属性/副属性 面板增量（两项）",
        "solves": [
          "secondary_ratio"
        ]
      },
      {
        "id": "V3",
        "module": "expression",
        "need": "一次「全不一致」与一次「单表情一致」的训练结果",
        "solves": [
          "consistency_multiplier_base"
        ]
      },
      {
        "id": "V4",
        "module": "expression",
        "need": "6 表情全一致训练结果（含角色加成已知时）",
        "solves": [
          "base_bonus_per_expression",
          "character_bonus"
        ]
      },
      {
        "id": "V5",
        "module": "attributes",
        "need": "球员详情面板 6 槽截图（含 tooltip 名称更佳）",
        "solves": [
          "icon 槽位语义",
          "A 层数值"
        ]
      },
      {
        "id": "V6",
        "module": "battle",
        "need": "一次对决的命中率显示 + 双方面板属性",
        "solves": [
          "hitpower 函数",
          "30/70 权重是否沿用"
        ]
      },
      {
        "id": "V7",
        "module": "growth",
        "need": "同角色 LV1/LV10/LV20 面板截图",
        "solves": [
          "等级成长曲线"
        ]
      },
      {
        "id": "V8",
        "module": "equipment",
        "need": "同一器材熟练度 0/50/MAX 的训练加成数值",
        "solves": [
          "熟练度曲线"
        ]
      },
      {
        "id": "V9",
        "module": "economy",
        "need": "一次训练/休息的精力变化、买体力价格序列",
        "solves": [
          "training_cost",
          "rest_recovery",
          "buy_cost_curve"
        ]
      }
    ],
    "sensitivity_analysis": {
      "training": {
        "baseline": {
          "base": 10,
          "level": 10,
          "personnel": 5,
          "equip": 1,
          "bonus": 0.5,
          "crit": 0.2,
          "flat": 3
        },
        "baseline_main_gain": 80.4,
        "calc": "(10 + 27 + 5 + 1) = 43 → ×(1+0.5)=64.5 → ×(1+0.2)=77.4 → +3 = 80.4",
        "elasticities": {
          "+10pp 训练加成": "5.16 点（约 +6.4%）",
          "+10pp 暴击加成": "6.45 点",
          "+1 训练等级": "5.4 点",
          "+5 flat 加值": "+5 点（不受乘区放大 → 稀释证据）"
        }
      },
      "battle": {
        "defense_weight": {
          "matched_attr": 0.3,
          "defense_attr": 0.7
        },
        "cases": [
          {
            "A": 2000,
            "D": 1000,
            "card": 1300
          },
          {
            "A": 1000,
            "D": 2000,
            "card": 1700
          }
        ],
        "note": "权重 ±10pp 对卡值影响：A 高 D 低时 +7.7%，A 低 D 高时 -5.9% → 防守权重是防守型阵容的杠杆"
      }
    },
    "next_steps_v33": [
      "用 versus_winrate.csv 全量（88 有 win_rate + 其余可补 result）做分 versus 回归，替换 logistic 系数",
      "用 property_events 按 versus 分组统计体力/能量消耗档位，拟合每回合消耗曲线",
      "用 replay_2 88 步事件流验证 win_rate 判定函数（hold-out）",
      "等客户端 Lua/配置提供 versus id→属性对表与 result 抽样规则"
    ]
  },
  "paramOverrides": [
    {
      "id": "trainBaseMain",
      "value": 10,
      "confidence": "实测",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995246",
      "note": "常规属性（A层：投射/弹跳/防守/体能/运控）训练初始基础=10；适用 内测；公测是否仍 10 待验证",
      "versions": {
        "内测": 10,
        "公测": "待验证(默认10)"
      },
      "unit": "点"
    },
    {
      "id": "trainBaseWillpower",
      "value": 8,
      "confidence": "实测",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995246",
      "note": "意识=8；适用 内测",
      "versions": {
        "内测": 8,
        "公测": "待验证(默认8)"
      },
      "unit": "点"
    },
    {
      "id": "trainLevelStep",
      "value": 3,
      "confidence": "实测",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995246",
      "note": "训练等级加成=(等级-1)×3",
      "versions": null,
      "unit": "点/训练等级"
    },
    {
      "id": "personnelBonus",
      "value": 5,
      "confidence": "实测",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995246",
      "note": "在场人员加值 +5（多人同训仍算 1 人，不叠加）",
      "versions": null,
      "unit": "点"
    },
    {
      "id": "gearBonus",
      "value": 1,
      "confidence": "实测",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995246",
      "note": "对口器材 +1（护目镜→运控，握力器→体能）",
      "versions": null,
      "unit": "点"
    },
    {
      "id": "secondarySharePct",
      "value": 50,
      "confidence": "待验证",
      "source": "T3 model.json：data/client/extracted/attr_mapping.md（训练成对提升）",
      "note": "每次训练同时提升两项，副属性收益比例未公开 → 区间 [0.3,0.7]，默认 0.5",
      "versions": null,
      "unit": "比例"
    },
    {
      "id": "gearCritBonusPct",
      "value": 0,
      "confidence": "多源一致",
      "source": "T3 model.json：data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
      "note": "（替换 v1 的待验证占位）暴击加成 = (1 + 档位)；档位由器材/技能决定",
      "versions": null,
      "unit": "百分比"
    },
    {
      "id": "trainingBonusPct",
      "value": 0,
      "confidence": "多源一致",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995246",
      "note": "乘法乘区；腾松/雨乃2命的 +3% 落在此区",
      "versions": null,
      "unit": "百分比"
    },
    {
      "id": "flatAttrBonus",
      "value": 0,
      "confidence": "实测",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995246",
      "note": "雨乃技能/扭蛋加值在此；不受训练加成%放大 → 稀释根源",
      "versions": null,
      "unit": "点"
    },
    {
      "id": "moodBonusPct",
      "value": 0,
      "confidence": "多源一致",
      "source": "T3 model.json：data/client/extracted/attr_mapping.md（情绪表，偏移 15158192）",
      "note": "心情作用于训练点数（乘区与 训练加成% 是否同区待验证，默认独立相加进同一 multiplier）",
      "versions": null,
      "unit": "百分比"
    },
    {
      "id": "exprSlotCount",
      "value": 6,
      "confidence": "待验证",
      "source": "T3 model.json：寒溟实测 2026-11-05：非训练队（无虚空人）时，表情一致上限 = 陪练/经理总人数 + 1（主练）；基本都是 2 个表情",
      "note": "表情槽位 = 参与训练的人数（经理 + 陪练 + 主练）；满编 = 6。**不是固定 6**：无人配置只有主练(+经理若有)，单经理=2，单陪练=3，满编=6；希雅二星 +1~3 虚空人 → 最多 9。",
      "versions": null,
      "unit": "个（最多）"
    },
    {
      "id": "exprBaseBonusPct",
      "value": 20,
      "confidence": "实测",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995246",
      "note": "每格基础 bonus 20%（内测公式帖口径，未区分哭脸/微笑/大笑）；寒溟实测提示哭脸=0%、微笑/大笑各有基础倍率 → 待公测验证后按表情类型细化",
      "versions": null,
      "unit": "比例"
    },
    {
      "id": "exprConsistencyBase",
      "value": 2.5,
      "confidence": "实测",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995246",
      "note": "基准一致倍率 2.5（内测帖；不同表情倍率可能不同，2.0~3.0 区间待验证）",
      "versions": null,
      "unit": "倍率"
    },
    {
      "id": "exprConsistencyExtraPct",
      "value": 0.25,
      "confidence": "实测",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995246",
      "note": "真崎在倍率乘区 +0.25 → 2.75",
      "versions": null,
      "unit": "倍率加值"
    },
    {
      "id": "exprConsistencyBoostPct",
      "value": 0,
      "confidence": "多源一致",
      "source": "T3 model.json：https://www.gamekee.com/lqsn/726683.html",
      "note": "全部表情一致概率 +15%；按星级/技能等级递进 15/17/19/20/22/23/25%（客户端 cw_expression_tokens 偏移 22576492~22577679，档位 7 级）",
      "versions": null,
      "unit": "概率加成"
    },
    {
      "id": "charSkillFlatBonus",
      "value": 0,
      "confidence": "实测",
      "source": "T3 model.json：https://www.taptap.cn/moment/805700735671995300",
      "note": "内测=3+0.5*2=4.0；公测/先锋测试截图=3+0.4*2=3.8（版本参数变化）",
      "versions": {
        "内测": 4,
        "先锋测试": 3.8
      },
      "unit": "点/次训练"
    },
    {
      "id": "critBonusTierPct",
      "value": 0,
      "confidence": "多源一致",
      "source": "T3 model v3.2：data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
      "note": "档位：+5% / +10% / +15% / +20%（默认 0 = 未暴击）",
      "versions": null
    },
    {
      "id": "critTrainingIncomePct",
      "value": 0,
      "confidence": "多源一致",
      "source": "T3 model v3.2：data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
      "note": "档位：+20% / +30% / +40%；与暴击加成档位是否同乘区待验证",
      "versions": null
    },
    {
      "id": "critProficiencyThreshold",
      "value": 70,
      "confidence": "多源一致",
      "source": "T3 model v3.2：@7551259 + data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
      "note": "器材熟练度 ≥70 触发暴击训练（v2 已有，v3 数值区确认）",
      "versions": null,
      "unit": "熟练度"
    },
    {
      "id": "trainingBonusCapPct",
      "value": 25,
      "confidence": "多源一致",
      "source": "T3 model v3.2：data/client/extracted/cw_knowledge_strings.md @7609626 / @7610946 / @7561018",
      "note": "恢复精力类/购买商品类各 25%，升级后 35%（客户端配置）",
      "versions": null
    },
    {
      "id": "realmThreshold1",
      "value": 1300,
      "confidence": "多源一致",
      "source": "cw_conf 数值区（@7565009/@7565068/@7565127 对应文案）+ data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
      "note": "第 1 档新境界阈值；达到后属性上限 +200",
      "versions": null
    },
    {
      "id": "realmThreshold2",
      "value": 1400,
      "confidence": "多源一致",
      "source": "cw_conf 数值区（@7565009/@7565068/@7565127 对应文案）+ data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
      "note": "第 2 档新境界阈值；达到后属性上限 +200",
      "versions": null
    },
    {
      "id": "realmThreshold3",
      "value": 1600,
      "confidence": "多源一致",
      "source": "cw_conf 数值区（@7565009/@7565068/@7565127 对应文案）+ data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
      "note": "第 3 档新境界阈值；达到后属性上限 +200",
      "versions": null
    },
    {
      "id": "realmCapBonus",
      "value": 200,
      "confidence": "多源一致",
      "source": "T3 model v3.2：data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
      "note": "触发新境界后属性上限 +200（客户端数值区）",
      "versions": null,
      "unit": "点"
    },
    {
      "id": "exhaustionPenaltyPct",
      "value": 30,
      "confidence": "待验证",
      "source": "T3 model v3.2：claims §E5",
      "note": "力竭全属性下降幅度未确证（区间 20%~40%），取中位；模拟器 beta 使用",
      "versions": null
    },
    {
      "id": "exhaustionResistPct",
      "value": 0,
      "confidence": "多源一致",
      "source": "T3 model v3.2：data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
      "note": "力竭加深/抵抗档位 +1%~+12%（客户端数值区确证）；0 = 无",
      "versions": null
    },
    {
      "id": "exprConsistencyProbTierPct",
      "value": 15,
      "confidence": "多源一致",
      "source": "T3 model v3.2：cw_conf 数值区偏移 @22576505 起",
      "note": "7 档：15% / 17% / 19% / 20% / 22% / 23% / 25%",
      "versions": null
    },
    {
      "id": "exprConsistencyMultTierPct",
      "value": 25,
      "confidence": "多源一致",
      "source": "T3 model v3.2：cw_conf 数值区偏移 @22629227 起（client-analyst）",
      "note": "7 档：25% / 27% / 29% / 30% / 32% / 34% / 35%；语义（提升比例 or 直接倍率）待验证",
      "versions": null
    },
    {
      "id": "trainingFailurePct",
      "value": 0,
      "confidence": "多源一致",
      "source": "T3 model v3.2：data/client/extracted/cw_conf_numeric.md（client-analyst 从 cw_conf 数值区确认，偏移见 evidence）",
      "note": "档位：1% / 2% / 4% / 6% / 8% / 20% / 100%；失败结算规则待验证（默认 0 = 不模拟）",
      "versions": null
    },
    {
      "id": "resetFreeUntilLevel",
      "value": 50,
      "confidence": "多源一致",
      "source": "T3 model v3.2：https://www.taptap.cn/moment/862241060166830700",
      "note": "50 级前（含）免费重置返还全部资源；内测/社区口径，公测待验证",
      "versions": null,
      "unit": "级"
    },
    {
      "id": "resetCostDiamond",
      "value": 200,
      "confidence": "多源一致",
      "source": "T3 model v3.2：https://www.taptap.cn/moment/862241060166830700",
      "note": "50 级后 200 钻重置",
      "versions": null,
      "unit": "钻石"
    }
  ],
  "moodOptions": [
    {
      "id": "great",
      "name": "极好",
      "bonusPct": 20
    },
    {
      "id": "good",
      "name": "好",
      "bonusPct": 10
    },
    {
      "id": "normal",
      "name": "一般",
      "bonusPct": 0
    },
    {
      "id": "bad",
      "name": "差",
      "bonusPct": -10
    },
    {
      "id": "awful",
      "name": "极差",
      "bonusPct": -20
    }
  ],
  "warnings": []
};
  if (typeof module === "object" && module.exports) module.exports = data;
  if (root) {
    root.BBTModel = data;
    root.BBT = root.BBT || {};
    root.BBT.model = data;
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
