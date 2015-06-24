/**
 * Created by Administrator on 14-11-15.
 */
var uw;
(function (uw) {
    var FightMixSkillEffectBaseCtrl = (function (_super) {
        __extends(FightMixSkillEffectBaseCtrl, _super);
        function FightMixSkillEffectBaseCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightMixSkillEffectBaseCtrl.prototype;
        __egretProto__.init = function (fightSkill) {
            var self = this;
            _super.prototype.init.call(this);
            self.fightSkill = fightSkill;
            self.play();
        };
        __egretProto__.play = function () {
            var cfg = this._getDefaultCfg();
            this.playDisplay(cfg);
        };
        __egretProto__.playDisplay = function (cfg) {
            var self = this;
            var fightSkill = this.fightSkill;
            switch (cfg.targetType) {
                case uw.skillEffecTargetType.TARGET:
                    var targets = uw.targetBiz.find(fightSkill.mixIsChallenger, null, null, fightSkill);
                    for (var i = 0; i < targets.length; i++) {
                        var locTarget = targets[i];
                        self.createAction(locTarget, cfg, fightSkill);
                    }
                    break;
                case uw.skillEffecTargetType.FRONT_TARGET:
                    self.createAction(null, cfg, fightSkill);
                    break;
            }
        };
        __egretProto__._getDefaultCfg = function () {
            var cfg = new uw.EffectCfg();
            cfg.targetType = uw.skillEffecTargetType.TARGET;
            cfg.addPos = mo.p(0, 0);
            return cfg;
        };
        __egretProto__.createAction = function (targetMember, cfg, fightSkill, cb, target) {
            var fxSkill = cfg.fxSkill || fightSkill.skillDisplay[uw.t_skillDisplay_fxSkill]; //特效名字
            var targetType = cfg.targetType;
            var addPos = cfg.addPos;
            var self = this, relativeDisplay = null, pos = mo.p(addPos.x, addPos.y);
            var effectAtTarget = targetMember;
            if (targetMember) {
                relativeDisplay = targetMember.fightOption.curController.display;
                var bodyType = this.fightSkill.skillDisplay[uw.t_skillDisplay_fxEmmitor1];
                var bodyPos = uw.fightUtils.getDisplayBodyPos(targetMember, bodyType);
                pos.x += bodyPos.x;
                pos.y += bodyPos.y;
            }
            var newFightSkill = fightSkill.clone();
            var actionCfg = {
                targetType: targetType,
                fightSkill: newFightSkill,
                targetMember: targetMember
            };
            this.createEffect(fxSkill, pos, effectAtTarget, newFightSkill, function (sender) {
                var action = self._createAction(sender, actionCfg);
                if (cb)
                    cb.call(target, action, sender);
            }, this);
        };
        __egretProto__._createAction = function (sender, actionCfg) {
            var self = this;
            var action = uw.FightFixAction.create(sender, self, actionCfg);
            self.addAction(action);
            return action;
        };
        //添加动作
        __egretProto__.addAction = function (action) {
            uw.fightActionManager.addAction(action);
        };
        //创建特效
        __egretProto__.createEffect = function (fxSkill, pos, targetMember, fightSkill, cb, target) {
            //正常轨迹是朝着目标直线的
            var self = this;
            if (!fxSkill)
                return;
            var targetDisplay;
            if (!targetMember) {
                targetDisplay = uw.fightScene.getMainLayer();
            }
            else {
                targetDisplay = targetMember.fightOption.curController.display;
            }
            var skillEffectNode = uw.effectArmFactory.attachDynamicNodeTo4Recycle(targetDisplay, fxSkill, null, function (sender) {
                sender.setScaleX(1);
                sender.playWithIndex(0);
                if (cb && !uw.Fight.isExit)
                    cb.call(target, sender);
            }, self);
            if (targetMember) {
                skillEffectNode.zOrder = uw.roleZOrder.ARMATURE + 1;
            }
            else {
                skillEffectNode.zOrder = 900;
            }
            skillEffectNode.x = pos.x;
            skillEffectNode.y = pos.y;
            return skillEffectNode;
        };
        FightMixSkillEffectBaseCtrl.create = function (fightSkill) {
            var C = uw.fightMixSkillEffectCtrl[fightSkill.skill.showId];
            if (!C) {
                C = uw.FightMixSkillEffectBaseCtrl;
            }
            var c = new C();
            c.init(fightSkill);
            return c;
        };
        FightMixSkillEffectBaseCtrl.__className = "FightMixSkillEffectBaseCtrl";
        return FightMixSkillEffectBaseCtrl;
    })(mo.DataController);
    uw.FightMixSkillEffectBaseCtrl = FightMixSkillEffectBaseCtrl;
    FightMixSkillEffectBaseCtrl.prototype.__class__ = "uw.FightMixSkillEffectBaseCtrl";
})(uw || (uw = {}));
