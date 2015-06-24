/**
 * Created by Administrator on 14-8-20.
 */
var uw;
(function (uw) {
    uw.fightSkillEffectCtrl_monster_1_20 = {};
    var __h_1 = (function (_super) {
        __extends(__h_1, _super);
        function __h_1() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_1.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 240);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 260);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill2 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(100, 260);
            this.playDisplay(cfg);
        };
        return __h_1;
    })(uw.FightSkillEffectBaseCtrl);
    __h_1.prototype.__class__ = "uw.___h_1";
    //"丛林猎手"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.h_1] = __h_1;
    var __h_3 = (function (_super) {
        __extends(__h_3, _super);
        function __h_3() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_3.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 260);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill2 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.playDisplay(cfg);
        };
        return __h_3;
    })(uw.FightSkillEffectBaseCtrl);
    __h_3.prototype.__class__ = "uw.___h_3";
    //"吸血鬼"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.h_3] = __h_3;
    var __h_6 = (function (_super) {
        __extends(__h_6, _super);
        function __h_6() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_6.prototype;
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 0);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill2 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = false;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.playDisplay(cfg);
        };
        return __h_6;
    })(uw.FightSkillEffectBaseCtrl);
    __h_6.prototype.__class__ = "uw.___h_6";
    //"棺材修女"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.h_6] = __h_6;
    var __h_7 = (function (_super) {
        __extends(__h_7, _super);
        function __h_7() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_7.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(200, 300);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 260);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill2 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.playDisplay(cfg);
        };
        return __h_7;
    })(uw.FightSkillEffectBaseCtrl);
    __h_7.prototype.__class__ = "uw.___h_7";
    //"夜之魔女"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.h_7] = __h_7;
    var __h_10 = (function (_super) {
        __extends(__h_10, _super);
        function __h_10() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_10.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 220);
            this.playDisplay(cfg);
        };
        return __h_10;
    })(uw.FightSkillEffectBaseCtrl);
    __h_10.prototype.__class__ = "uw.___h_10";
    //"悲伤之触"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.h_10] = __h_10;
    var __m_9 = (function (_super) {
        __extends(__m_9, _super);
        function __m_9() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_9.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 280);
            this.playDisplay(cfg);
        };
        return __m_9;
    })(uw.FightSkillEffectBaseCtrl);
    __m_9.prototype.__class__ = "uw.___m_9";
    //"迷雾女妖"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_9] = __m_9;
    var __h_11 = (function (_super) {
        __extends(__h_11, _super);
        function __h_11() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_11.prototype;
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(230, 280);
            this.playDisplay(cfg);
        };
        return __h_11;
    })(uw.FightSkillEffectBaseCtrl);
    __h_11.prototype.__class__ = "uw.___h_11";
    //"暗黑术士"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.h_11] = __h_11;
    var __m_37 = (function (_super) {
        __extends(__m_37, _super);
        function __m_37() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_37.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 300);
            this.playDisplay(cfg);
        };
        return __m_37;
    })(uw.FightSkillEffectBaseCtrl);
    __m_37.prototype.__class__ = "uw.___m_37";
    //"火法"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_37] = __m_37;
    var __m_14 = (function (_super) {
        __extends(__m_14, _super);
        function __m_14() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_14.prototype;
        return __m_14;
    })(uw.FightSkillEffectBaseCtrl);
    __m_14.prototype.__class__ = "uw.___m_14";
    //"哥布林队长"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_14] = __m_14;
    var __m_16 = (function (_super) {
        __extends(__m_16, _super);
        function __m_16() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_16.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 200);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 200);
            this.playDisplay(cfg);
        };
        return __m_16;
    })(uw.FightSkillEffectBaseCtrl);
    __m_16.prototype.__class__ = "uw.___m_16";
    //"熔岩蜘蛛"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_16] = __m_16;
    var __m_17 = (function (_super) {
        __extends(__m_17, _super);
        function __m_17() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_17.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 200);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 200);
            this.playDisplay(cfg);
        };
        return __m_17;
    })(uw.FightSkillEffectBaseCtrl);
    __m_17.prototype.__class__ = "uw.___m_17";
    //"剧毒蜘蛛"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_17] = __m_17;
    var __m_19 = (function (_super) {
        __extends(__m_19, _super);
        function __m_19() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_19.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 200);
            this.playDisplay(cfg);
        };
        return __m_19;
    })(uw.FightSkillEffectBaseCtrl);
    __m_19.prototype.__class__ = "uw.___m_19";
    //"幽冥蜘蛛"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_19] = __m_19;
    var __m_29 = (function (_super) {
        __extends(__m_29, _super);
        function __m_29() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_29.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 260);
            this.playDisplay(cfg);
        };
        return __m_29;
    })(uw.FightSkillEffectBaseCtrl);
    __m_29.prototype.__class__ = "uw.___m_29";
    //"骷髅弓箭手"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_29] = __m_29;
    var __m_33 = (function (_super) {
        __extends(__m_33, _super);
        function __m_33() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_33.prototype;
        return __m_33;
    })(uw.FightSkillEffectBaseCtrl);
    __m_33.prototype.__class__ = "uw.___m_33";
    //"鸟德"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_33] = __m_33;
    var __m_44 = (function (_super) {
        __extends(__m_44, _super);
        function __m_44() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_44.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 130);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(270, 140);
            this.playDisplay(cfg);
        };
        return __m_44;
    })(uw.FightSkillEffectBaseCtrl);
    __m_44.prototype.__class__ = "uw.___m_44";
    //"破坏恶魔"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_44] = __m_44;
    var __m_45 = (function (_super) {
        __extends(__m_45, _super);
        function __m_45() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_45.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 130);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(270, 140);
            this.playDisplay(cfg);
        };
        return __m_45;
    })(uw.FightSkillEffectBaseCtrl);
    __m_45.prototype.__class__ = "uw.___m_45";
    //"诅咒恶魔"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_45] = __m_45;
    var __m_51 = (function (_super) {
        __extends(__m_51, _super);
        function __m_51() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_51.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 100);
            this.playDisplay(cfg);
        };
        return __m_51;
    })(uw.FightSkillEffectBaseCtrl);
    __m_51.prototype.__class__ = "uw.___m_51";
    //"娜迦法师"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_51] = __m_51;
    var __m_52 = (function (_super) {
        __extends(__m_52, _super);
        function __m_52() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __m_52.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 240);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 240);
            this.playDisplay(cfg);
        };
        return __m_52;
    })(uw.FightSkillEffectBaseCtrl);
    __m_52.prototype.__class__ = "uw.___m_52";
    //"娜迦弓手"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_52] = __m_52;
    var __m_59 = (function (_super) {
        __extends(__m_59, _super);
        function __m_59() {
            _super.apply(this, arguments);
            this.mixTargetCount = 0;
        }
        var __egretProto__ = __m_59.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(190, 370);
            var mDisplay = this.member.fightOption.curController.display;
            var memberPos = mo.p(mDisplay.x, mDisplay.y);
            this.memberPos = memberPos;
            var endPos = mo.p(memberPos.x, memberPos.y);
            endPos.x += this.fightSkill.attackDistance;
            this.endPos = endPos;
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                action.play(1, -45);
            }, this);
        };
        __egretProto__.targetEffect = function () {
            if (this.mixTargetCount > 0)
                return;
            this.mixTargetCount++;
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = mo.p(0, 0);
            cfg.fxSkill = this.fightSkill.skillDisplay[uw.t_skillDisplay_fxTarget]; //目标特效
            if (this.member.fightOption.curController.isFaceLeft) {
                cfg.fixPos = mo.p(this.memberPos.x - this.fightSkill.attackDistance, this.memberPos.y - 100);
            }
            else {
                cfg.fixPos = mo.p(this.memberPos.x + this.fightSkill.attackDistance, this.memberPos.y - 100);
            }
            var targetMember = this.member.fightOption.curController.enemyFrontMember;
            this.createAction(this.member, targetMember, cfg, this.fightSkill, function (action, sender) {
                sender.setZOrder(-9999);
            }, this);
        };
        __egretProto__.onFinish = function (actionObj) {
            var self = this;
            //如果是大招
            var action = this.fightSkill.skillDisplay[uw.t_skillDisplay_action];
            if (action == uw.skillAction.NORMAL_ATTACK) {
                self.targetEffect();
            }
        };
        return __m_59;
    })(uw.FightSkillEffectBaseCtrl);
    __m_59.prototype.__class__ = "uw.___m_59";
    //"炮车"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_59] = __m_59;
    var __m_63 = (function (_super) {
        __extends(__m_63, _super);
        function __m_63() {
            _super.apply(this, arguments);
            this.lineWidth = 0;
        }
        var __egretProto__ = __m_63.prototype;
        //技能1
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(1500, 0);
            this.playDisplay(cfg);
        };
        //技能1
        __egretProto__.displaySkill2 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(1500, 0);
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                sender.setZOrder(1);
            }, this);
        };
        //技能3
        __egretProto__.displaySkill3 = function () {
            var posArr = [];
            posArr[0] = [mo.p(200, -50), 0.1];
            posArr[1] = [mo.p(640, -320), 0.3];
            posArr[2] = [mo.p(740, 320), 0.7];
            posArr[3] = [mo.p(1120, 0), 0.8];
            posArr[4] = [mo.p(1600, 300), 0.7];
            posArr[5] = [mo.p(1500, -300), 0.6];
            posArr[6] = [mo.p(1600, 520), 0.2];
            posArr[7] = [mo.p(1700, -220), 0.4];
            posArr[8] = [mo.p(1800, -320), 0.9];
            posArr[9] = [mo.p(1900, 220), 1];
            for (var i = 0; i < posArr.length; i++) {
                var locPos = posArr[i];
                this._fireEffect(locPos[0].x, locPos[0].y, locPos[1]);
            }
        };
        __egretProto__._fireEffect = function (posX, posY, delay) {
            uw.fightUtils.delayCall(delay, function () {
                var cfg = new uw.EffectCfg();
                cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
                cfg.isAddAtScene = true;
                cfg.isRelativeSelf = true;
                cfg.addPos = uw.fightUtils.getCCAScalePos(posX, posY);
                var targetMember = this.member.fightOption.curController.enemyFrontMember;
                this.createAction(this.member, targetMember, cfg, this.fightSkill, function (action, sender) {
                }, this);
            }, this);
        };
        return __m_63;
    })(uw.FightSkillEffectBaseCtrl);
    __m_63.prototype.__class__ = "uw.___m_63";
    //"大火龙"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_63] = __m_63;
    var __m_64 = (function (_super) {
        __extends(__m_64, _super);
        function __m_64() {
            _super.apply(this, arguments);
            this.lineWidth = 0;
        }
        var __egretProto__ = __m_64.prototype;
        //普通技能
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.playDisplay(cfg);
        };
        return __m_64;
    })(uw.FightSkillEffectBaseCtrl);
    __m_64.prototype.__class__ = "uw.___m_64";
    //"暗黑破坏球"
    uw.fightSkillEffectCtrl_monster_1_20[uw.id_t_warrior.m_64] = __m_64;
})(uw || (uw = {}));
