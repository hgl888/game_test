/**
 * Created by Administrator on 14-8-20.
 */
var uw;
(function (uw) {
    uw.fightSkillEffectCtrl_hero_1_20 = {};
    var __h_13 = (function (_super) {
        __extends(__h_13, _super);
        function __h_13() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_13.prototype;
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(500, 0);
            this.playDisplay(cfg);
        };
        return __h_13;
    })(uw.FightSkillEffectBaseCtrl);
    __h_13.prototype.__class__ = "uw.___h_13";
    //"大蛇丸"
    uw.fightSkillEffectCtrl_hero_1_20[uw.id_t_warrior.h_13] = __h_13;
    var __h_14 = (function (_super) {
        __extends(__h_14, _super);
        function __h_14() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_14.prototype;
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(500, 0);
            this.playDisplay(cfg);
        };
        return __h_14;
    })(uw.FightSkillEffectBaseCtrl);
    __h_14.prototype.__class__ = "uw.___h_14";
    //"大蛇丸"
    uw.fightSkillEffectCtrl_hero_1_20[uw.id_t_warrior.h_14] = __h_14;
    var __h_16 = (function (_super) {
        __extends(__h_16, _super);
        function __h_16() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_16.prototype;
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(450, 0);
            var targetMember = this.member.fightOption.curController.enemyFrontMember;
            this.createAction(this.member, targetMember, cfg, this.fightSkill, function (action, sender) {
                var scaleX = sender.getScaleX();
                var scaleY = sender.getScaleY();
                sender.setScale(scaleX * 3, scaleY * 3);
            }, this);
        };
        return __h_16;
    })(uw.FightSkillEffectBaseCtrl);
    __h_16.prototype.__class__ = "uw.___h_16";
    //"八神"
    uw.fightSkillEffectCtrl_hero_1_20[uw.id_t_warrior.h_16] = __h_16;
    var __h_17 = (function (_super) {
        __extends(__h_17, _super);
        function __h_17() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_17.prototype;
        //大招
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            cfg.addPos = uw.fightUtils.getCCAScalePos(420, 340);
            var targetMember = this.member.fightOption.curController.enemyFrontMember;
            this.createAction(this.member, targetMember, cfg, this.fightSkill, function (action, sender) {
                var scaleX = sender.getScaleX();
                var scaleY = sender.getScaleY();
                sender.setScale(scaleX * 1.5, scaleY * 1.5);
            }, this);
        };
        return __h_17;
    })(uw.FightSkillEffectBaseCtrl);
    __h_17.prototype.__class__ = "uw.___h_17";
    //"杰克船长"
    uw.fightSkillEffectCtrl_hero_1_20[uw.id_t_warrior.h_17] = __h_17;
    var __h_19 = (function (_super) {
        __extends(__h_19, _super);
        function __h_19() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = __h_19.prototype;
        //技能1
        __egretProto__.displayMix = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
            cfg.isAddAtScene = true;
            cfg.isRelativeSelf = true;
            var posX = 400 + 450 * this.fightSkill.hurtCount;
            cfg.addPos = uw.fightUtils.getCCAScalePos(posX, 0);
            //改变技能选取目标区域
            var targetArea = this.fightSkill.skill.targetArea;
            if (targetArea.length > 1) {
                this.fightSkill.targetArea = uw.fightUtils.changeAreaX(posX - 400, targetArea);
            }
            this.playDisplay(cfg);
            if (this.fightSkill.hurtCount == 0) {
                var cfg = new uw.EffectCfg();
                cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
                cfg.isAddAtScene = true;
                cfg.isRelativeSelf = true;
                cfg.addPos = uw.fightUtils.getCCAScalePos(500, 0);
                cfg.fxSkill = this.fightSkill.skillDisplay[uw.t_skillDisplay_fxTarget]; //目标特效
                var targetMember = this.member.fightOption.curController.enemyFrontMember;
                this.createAction(this.member, targetMember, cfg, this.fightSkill, function (action, sender) {
                    var scaleX = sender.getScaleX();
                    var scaleY = sender.getScaleY();
                    sender.setScale(scaleX * 1.8, scaleY * 1.8);
                    sender.setZOrder(-9999);
                }, this);
            }
            this.fightSkill.hurtCount++;
        };
        return __h_19;
    })(uw.FightSkillEffectBaseCtrl);
    __h_19.prototype.__class__ = "uw.___h_19";
    //"奎爷"
    uw.fightSkillEffectCtrl_hero_1_20[uw.id_t_warrior.h_19] = __h_19;
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
            cfg.addPos = uw.fightUtils.getCCAScalePos(100, 100);
            this.createAction(this.member, this.member.fightOption.curController.enemyFrontMember, cfg, this.fightSkill.clone(), function (action, sender) {
                //sender.setScaleX(sender.getScaleX()*1.5);
            }, this);
        };
        return __h_20;
    })(uw.FightSkillEffectBaseCtrl);
    __h_20.prototype.__class__ = "uw.___h_20";
    //"伏地魔"
    uw.fightSkillEffectCtrl_hero_1_20[uw.id_t_warrior.h_20] = __h_20;
})(uw || (uw = {}));
