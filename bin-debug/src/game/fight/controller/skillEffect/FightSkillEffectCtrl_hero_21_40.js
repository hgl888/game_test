/**
 * Created by Administrator on 14-8-20.
 */
var uw;
(function (uw) {
    uw.fightSkillEffectCtrl_hero_21_40 = {};
    var __h_20 = (function (_super) {
        __extends(__h_20, _super);
        function __h_20() {
            _super.apply(this, arguments);
            this.lineWidth = 0;
        }
        var __egretProto__ = __h_20.prototype;
        //普通技能
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 280);
            this.playDisplay(cfg);
        };
        //技能1
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(300, 260);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = false;
            if (this.member.isFaceLeft) {
                cfg.fixPos = mo.p(mo.visibleRect.center().x - 500, mo.visibleRect.center().y + 100);
            }
            else {
                cfg.fixPos = mo.p(mo.visibleRect.center().x + 500, mo.visibleRect.center().y + 100);
            }
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                sender.setScaleX(sender.getScaleX() * 1.5);
            }, this);
        };
        return __h_20;
    })(uw.FightSkillEffectBaseCtrl);
    __h_20.prototype.__class__ = "uw.___h_20";
    //"伏地魔"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_20] = __h_20;
    var __h_21 = (function (_super) {
        __extends(__h_21, _super);
        function __h_21() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_21.prototype;
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(450, 250);
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                sender.setScaleX(sender.getScaleX() * 1.5);
            }, this);
        };
        return __h_21;
    })(uw.FightSkillEffectBaseCtrl);
    __h_21.prototype.__class__ = "uw.___h_21";
    //"但丁"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_21] = __h_21;
    var __h_18 = (function (_super) {
        __extends(__h_18, _super);
        function __h_18() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_18.prototype;
        //技能2
        __egretProto__.displaySkill2 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 200);
            this.playDisplay(cfg);
        };
        return __h_18;
    })(uw.FightSkillEffectBaseCtrl);
    __h_18.prototype.__class__ = "uw.___h_18";
    //"贝姐"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_18] = __h_18;
    var __h_23 = (function (_super) {
        __extends(__h_23, _super);
        function __h_23() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_23.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 260);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 0);
            this.playDisplay(cfg);
        };
        return __h_23;
    })(uw.FightSkillEffectBaseCtrl);
    __h_23.prototype.__class__ = "uw.___h_23";
    //"鹰眼"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_23] = __h_23;
    var __h_24 = (function (_super) {
        __extends(__h_24, _super);
        function __h_24() {
            _super.apply(this, arguments);
            this.mixTargetCount = 0;
        }
        var __egretProto__ = __h_24.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(300, 300);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var self = this;
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(300, 300);
            self.playDisplay(cfg);
        };
        __egretProto__.mixTargetEffect = function () {
            var self = this;
            if (this.mixTargetCount > 0)
                return;
            this.mixTargetCount++;
            var cfg = new uw.EffectCfg();
            cfg.effectType = uw.skillEffectType.FIX;
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            cfg.fxSkill = self.fightSkill.skillDisplay[uw.t_skillDisplay_fxTarget]; //目标特效
            self.playDisplay(cfg);
        };
        __egretProto__.onFinish = function (actionObj) {
            var self = this;
            //如果是大招
            var action = this.fightSkill.skillDisplay[uw.t_skillDisplay_action];
            if (action == uw.skillAction.UNIQUE_ATTACK) {
                self.mixTargetEffect();
            }
        };
        return __h_24;
    })(uw.FightSkillEffectBaseCtrl);
    __h_24.prototype.__class__ = "uw.___h_24";
    //"贝吉塔"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_24] = __h_24;
    var __h_25 = (function (_super) {
        __extends(__h_25, _super);
        function __h_25() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_25.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(280, 280);
            this.playDisplay(cfg);
        };
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(300, 280);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(200, 370);
            this.playDisplay(cfg);
        };
        return __h_25;
    })(uw.FightSkillEffectBaseCtrl);
    __h_25.prototype.__class__ = "uw.___h_25";
    //"贝吉塔"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_25] = __h_25;
    var __h_32 = (function (_super) {
        __extends(__h_32, _super);
        function __h_32() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_32.prototype;
        //普通技能
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(300, 300);
            this.playDisplay(cfg);
        };
        //技能1
        __egretProto__.displaySkill1 = function () {
            var self = this;
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(380, 255);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.playDisplay(cfg);
        };
        return __h_32;
    })(uw.FightSkillEffectBaseCtrl);
    __h_32.prototype.__class__ = "uw.___h_32";
    //"毒液"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_32] = __h_32;
    var __h_36 = (function (_super) {
        __extends(__h_36, _super);
        function __h_36() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_36.prototype;
        //普通技能
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(100, 200);
            this.playDisplay(cfg);
        };
        //技能1
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(220, 220);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.playDisplay(cfg);
        };
        return __h_36;
    })(uw.FightSkillEffectBaseCtrl);
    __h_36.prototype.__class__ = "uw.___h_36";
    //"幽灵公主"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_36] = __h_36;
    var __h_39 = (function (_super) {
        __extends(__h_39, _super);
        function __h_39() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_39.prototype;
        //技能2
        __egretProto__.displaySkill2 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(220, 220);
            this.playDisplay(cfg);
        };
        return __h_39;
    })(uw.FightSkillEffectBaseCtrl);
    __h_39.prototype.__class__ = "uw.___h_39";
    //"传说哥"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_39] = __h_39;
    var __h_40 = (function (_super) {
        __extends(__h_40, _super);
        function __h_40() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_40.prototype;
        //普通技能
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(220, 100);
            this.playDisplay(cfg);
        };
        //技能1
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            var posX = 750 + 400 * this.fightSkill.hurtCount;
            cfg.addPos = uw.fightUtils.getCCAScalePos(posX, 0);
            this.playDisplay(cfg);
            //改变技能选取目标区域
            var targetArea = this.fightSkill.skill.targetArea;
            if (targetArea.length > 1) {
                targetArea[1][0] = posX;
            }
            this.fightSkill.hurtCount++;
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            var targetMember = this.member.fightOption.curController.enemyFrontMember;
            this.createAction(this.member, targetMember, cfg, this.fightSkill, function (action, sender) {
                var scaleX = sender.getScaleX();
                var scaleY = sender.getScaleY();
                sender.setScale(scaleX * 1.5, scaleY * 1.5);
            }, this);
        };
        return __h_40;
    })(uw.FightSkillEffectBaseCtrl);
    __h_40.prototype.__class__ = "uw.___h_40";
    //"影魔"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_40] = __h_40;
    var __h_22 = (function (_super) {
        __extends(__h_22, _super);
        function __h_22() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_22.prototype;
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(660, 0);
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                sender.setScaleX(sender.getScaleX() * 1.3);
                sender.setScaleY(sender.getScaleY() * 1.3);
            }, this);
        };
        return __h_22;
    })(uw.FightSkillEffectBaseCtrl);
    __h_22.prototype.__class__ = "uw.___h_22";
    //"维加"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_22] = __h_22;
    var __h_26 = (function (_super) {
        __extends(__h_26, _super);
        function __h_26() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_26.prototype;
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                sender.setZOrder(9999);
                sender.setScaleX(sender.getScaleX() * 1.2);
                sender.setScaleY(sender.getScaleY() * 1.2);
            }, this);
        };
        return __h_26;
    })(uw.FightSkillEffectBaseCtrl);
    __h_26.prototype.__class__ = "uw.___h_26";
    //"一叽咕"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_26] = __h_26;
    var __h_27 = (function (_super) {
        __extends(__h_27, _super);
        function __h_27() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_27.prototype;
        //普通技能
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 200);
            this.playDisplay(cfg);
        };
        //技能1
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                var scaleX = sender.getScaleX();
                var scaleY = sender.getScaleY();
                sender.setZOrder(-9999);
                sender.setScaleX(scaleX * 1.2);
                sender.setScaleY(scaleY * 1.2);
            }, this);
        };
        //技能2
        __egretProto__.displaySkill2 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 0);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = false;
            cfg.fixPos = mo.p(mo.visibleRect.center().x, mo.visibleRect.center().y + 100);
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                var scaleX = sender.getScaleX();
                var scaleY = sender.getScaleY();
                sender.setZOrder(9999);
                sender.setScaleX(scaleX * 1.5);
                sender.setScaleY(scaleY * 1.5);
            }, this);
            /*            var targetArea = this.fightSkill.skill.targetArea;
                        targetArea[1][0] = cfg.fixPos.x;*/
        };
        return __h_27;
    })(uw.FightSkillEffectBaseCtrl);
    __h_27.prototype.__class__ = "uw.___h_27";
    //"罗"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_27] = __h_27;
    var __h_31 = (function (_super) {
        __extends(__h_31, _super);
        function __h_31() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_31.prototype;
        //普通技能
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(300, 220);
            this.playDisplay(cfg);
        };
        //技能2
        __egretProto__.displaySkill2 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(480, 180);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.playDisplay(cfg);
        };
        return __h_31;
    })(uw.FightSkillEffectBaseCtrl);
    __h_31.prototype.__class__ = "uw.___h_31";
    //"杀殿"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_31] = __h_31;
    var __h_33 = (function (_super) {
        __extends(__h_33, _super);
        function __h_33() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_33.prototype;
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(520, 320);
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                //天字永远是正面的
                sender.setZOrder(9999);
                sender.setScaleX(1.5);
                sender.setScaleY(1.5);
            }, this);
        };
        return __h_33;
    })(uw.FightSkillEffectBaseCtrl);
    __h_33.prototype.__class__ = "uw.___h_33";
    //"豪鬼"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_33] = __h_33;
    var __h_34 = (function (_super) {
        __extends(__h_34, _super);
        function __h_34() {
            _super.apply(this, arguments);
            this.boomEffectCount = 0;
        }
        var __egretProto__ = __h_34.prototype;
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(280, 280);
            this.playDisplay(cfg);
        };
        __egretProto__.boom = function (targetMember) {
            var self = this;
            var boomSkill = uw.getSkillData(self.fightSkill.skill.exValue, self.fightSkill.skill.lvl + self.member.skillLvl);
            var boomFightSkill = uw.FightSkill.create(self.member, boomSkill, false);
            self.fightSkill = boomFightSkill;
            this.boomFightSkill = boomFightSkill;
            var cfg = new uw.EffectCfg();
            cfg.effectType = uw.skillEffectType.FIX;
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = false;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            cfg.addPos.y = -(targetMember.fightOption.curController.display.getStatePos().y + 40);
            cfg.fxSkill = boomFightSkill.skillDisplay[uw.t_skillDisplay_fxSkill];
            this.createAction(this.member, targetMember, cfg, boomFightSkill);
        };
        __egretProto__.boomEffect = function (targetMember) {
            var self = this;
            if (self.boomEffectCount > 0)
                return;
            self.boomEffectCount++;
            var cfg = new uw.EffectCfg();
            cfg.effectType = uw.skillEffectType.FIX;
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = false;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            cfg.addPos.y = -(targetMember.fightOption.curController.display.getStatePos().y + 40);
            cfg.fxSkill = this.boomFightSkill.skillDisplay[uw.t_skillDisplay_fxTarget]; //目标特效
            this.createAction(this.member, targetMember, cfg, this.boomFightSkill, function (action, sender) {
                var scaleX = sender.getScaleX();
                var scaleY = sender.getScaleY();
                sender.setScale(scaleX * 2, scaleY * 2);
            }, this);
        };
        __egretProto__.onFinish = function (actionObj) {
            //如果是大招
            var action = actionObj.fightSkill.skillDisplay[uw.t_skillDisplay_action];
            if (action == uw.skillAction.UNIQUE_ATTACK) {
                this.boom(actionObj.targetMember);
            }
            if (action == uw.skillAction.NONE) {
                this.boomEffect(actionObj.targetMember);
            }
            if (action == uw.skillAction.SKILL_ATTACK2) {
                //闪光
                var mainLayer = uw.fightScene.getMainLayer();
                mainLayer.setLight();
            }
        };
        __egretProto__.displaySkill2 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(200, 360);
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
        return __h_34;
    })(uw.FightSkillEffectBaseCtrl);
    __h_34.prototype.__class__ = "uw.___h_34";
    //"艾达王"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_34] = __h_34;
    var __h_35 = (function (_super) {
        __extends(__h_35, _super);
        function __h_35() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_35.prototype;
        //普通技能
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(250, 270);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var self = this;
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(130, 240);
            var targets = uw.targetBiz.find(self.member.fightOption.curIsChallenger, self.member, self.member.fightOption.curController.enemyFrontMember, self.fightSkill);
            self.createAction(self.member, targets[0], cfg, self.fightSkill, function (action, sender) {
                sender.setScaleY(sender.getScaleY() * 1.5);
                action.lineWidth = 700;
                action.initDisplay();
            }, self);
        };
        return __h_35;
    })(uw.FightSkillEffectBaseCtrl);
    __h_35.prototype.__class__ = "uw.___h_35";
    //"西索"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_35] = __h_35;
    var __h_41 = (function (_super) {
        __extends(__h_41, _super);
        function __h_41() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_41.prototype;
        //普通技能
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 200);
            this.playDisplay(cfg);
        };
        //技能1
        __egretProto__.displaySkill1 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 200);
            this.playDisplay(cfg);
        };
        //技能3
        __egretProto__.displaySkill3 = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = false;
            cfg.isRelativeSelf = false;
            cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
            this.playDisplay(cfg);
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(260, 200);
            this.playDisplay(cfg);
        };
        return __h_41;
    })(uw.FightSkillEffectBaseCtrl);
    __h_41.prototype.__class__ = "uw.___h_41";
    //"玛嘉"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_41] = __h_41;
    var __h_42 = (function (_super) {
        __extends(__h_42, _super);
        function __h_42() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_42.prototype;
        //大招
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(330, 215);
            this.playDisplay(cfg);
        };
        __egretProto__.displayMix = function () {
            var member = this.member, self = this;
            var fightSkill = this.fightSkill;
            var cfg = this._getDefaultCfg();
            var targets = uw.targetBiz.find(member.fightOption.curIsChallenger, member, member.fightOption.curController.enemyFrontMember, fightSkill);
            for (var i = 0; i < targets.length; i++) {
                var locTarget = targets[i];
                self.createAction(member, locTarget, cfg, fightSkill.clone(), function (action, sender) {
                    sender.setScaleX(sender.getScaleX() * 1.5);
                    sender.setScaleY(sender.getScaleY() * 1.5);
                }, this);
            }
        };
        return __h_42;
    })(uw.FightSkillEffectBaseCtrl);
    __h_42.prototype.__class__ = "uw.___h_42";
    //"佐助"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_42] = __h_42;
    var __h_44 = (function (_super) {
        __extends(__h_44, _super);
        function __h_44() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_44.prototype;
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(270, 250);
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                sender.setScaleX(sender.getScaleX() * 2.5);
                sender.setScaleY(sender.getScaleY() * 1.8);
            }, this);
        };
        return __h_44;
    })(uw.FightSkillEffectBaseCtrl);
    __h_44.prototype.__class__ = "uw.___h_44";
    //"黑衣人"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_44] = __h_44;
    var __h_48 = (function (_super) {
        __extends(__h_48, _super);
        function __h_48() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_48.prototype;
        //技能1
        __egretProto__.displayMix = function () {
            if (this.fightSkill.hurtCount == 0) {
                var cfg = new uw.EffectCfg();
                cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
                cfg.isAddAtScene = false;
                cfg.isRelativeSelf = true;
                cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
                cfg.fxSkill = this.fightSkill.skillDisplay[uw.t_skillDisplay_fxTarget]; //目标特效
                var targetMember = this.member.fightOption.curController.enemyFrontMember;
                this.createAction(this.member, this.member, cfg, this.fightSkill, function (action, sender) {
                    var scaleX = sender.getScaleX();
                    var scaleY = sender.getScaleY();
                    sender.setScale(scaleX * 1.8, scaleY * 1.8);
                    sender.setZOrder(-1);
                }, this);
            }
            else {
                var cfg = new uw.EffectCfg();
                cfg.targetType = uw.skillEffecTargetType.TARGET;
                cfg.isAddAtScene = false;
                cfg.isRelativeSelf = false;
                cfg.isCanBreak = true;
                cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
                this.playDisplay(cfg);
            }
            this.fightSkill.hurtCount++;
        };
        return __h_48;
    })(uw.FightSkillEffectBaseCtrl);
    __h_48.prototype.__class__ = "uw.___h_48";
    //"大波妹"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_48] = __h_48;
    var __h_50 = (function (_super) {
        __extends(__h_50, _super);
        function __h_50() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_50.prototype;
        __egretProto__.displayNormal = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(190, 270); //180,360    -20,330
            this.playDisplay(cfg);
        };
        //招1
        __egretProto__.displaySkill1 = function () {
            var member = this.member;
            var fightSkill = this.fightSkill;
            var targets = uw.targetBiz.find(member.fightOption.curIsChallenger, member, member.fightOption.curController.enemyFrontMember, fightSkill);
            if (targets.length == 1) {
                targets = [targets[0], targets[0]];
            }
            for (var i = 0; i < targets.length; i++) {
                var locTarget = targets[i];
                var cfg = new uw.EffectCfg();
                cfg.targetType = uw.skillEffecTargetType.TARGET;
                cfg.isAddAtScene = true;
                cfg.isRelativeSelf = true;
                if (i == 0) {
                    cfg.addPos = uw.fightUtils.getCCAScalePos(180, 380); //180,360    -20,330
                }
                else {
                    cfg.addPos = uw.fightUtils.getCCAScalePos(-20, 300); //180,360    -20,330
                }
                this._displaySkill1(locTarget, cfg);
            }
        };
        __egretProto__._displaySkill1 = function (target, cfg) {
            var member = this.member;
            var fightSkill = this.fightSkill;
            this.createAction(member, target, cfg, fightSkill, function (action, sender) {
                action.isStop = true;
                sender.setOpacity(100);
                var fadeInOut = mo.sequence(mo.fadeIn(0.2), mo.fadeOut(0.2));
                var repeatAction = mo.repeatForever(fadeInOut);
                //sender.runAction(repeatAction);
                var delay = mo.sequence(mo.fadeIn(0.3), mo.callFunc(function () {
                    //sender.stopAction(repeatAction);
                    action.isStop = false;
                    sender.setOpacity(255);
                }, this));
                sender.runAction(delay);
            }, this);
        };
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            var posX = 500 + 650 * this.fightSkill.hurtCount;
            cfg.addPos = uw.fightUtils.getCCAScalePos(posX, -100);
            //改变技能选取目标区域
            var targetArea = this.fightSkill.skill.targetArea;
            if (targetArea.length > 1) {
                this.fightSkill.targetArea = uw.fightUtils.changeAreaX(posX - 400, targetArea);
            }
            this.playDisplay(cfg);
            this.fightSkill.hurtCount++;
        };
        return __h_50;
    })(uw.FightSkillEffectBaseCtrl);
    __h_50.prototype.__class__ = "uw.___h_50";
    //"伊卡洛斯"
    uw.fightSkillEffectCtrl_hero_21_40[uw.id_t_warrior.h_50] = __h_50;
})(uw || (uw = {}));
