/**
 * Created by Administrator on 14-7-29.
 */
var uw;
(function (uw) {
    var EffectCfg = (function () {
        function EffectCfg(targetType, isAddAtScene, isRelativeSelf, addPos, fxSkill, effectType, fixPos, isCanBreak) {
            this.targetType = targetType || uw.skillEffecTargetType.TARGET; //目标类型，区分伤害计算
            this.isAddAtScene = isAddAtScene || false; //是否把特效添加到场景
            this.isRelativeSelf = isRelativeSelf || false; //是否相对于自己
            this.addPos = addPos || mo.p(0, 0); //相对位移
            this.fxSkill = fxSkill || null; //替换特效
            this.effectType = effectType || null; //替换特效类型
            this.fixPos = fixPos || null; //固定位置
            this.isCanBreak = isCanBreak || false; //是否可以打断
        }
        var __egretProto__ = EffectCfg.prototype;
        return EffectCfg;
    })();
    uw.EffectCfg = EffectCfg;
    EffectCfg.prototype.__class__ = "uw.EffectCfg";
    var FightSkillEffectBaseCtrl = (function (_super) {
        __extends(FightSkillEffectBaseCtrl, _super);
        function FightSkillEffectBaseCtrl() {
            _super.apply(this, arguments);
            this.isPause = false;
        }
        var __egretProto__ = FightSkillEffectBaseCtrl.prototype;
        __egretProto__.init = function (member, fightSkill) {
            var self = this;
            _super.prototype.init.call(this);
            self.member = member;
            self.fightSkill = fightSkill;
            this.playSkill();
        };
        //普通技能
        __egretProto__.displayNormal = function () {
            this.playDisplay();
        };
        //技能1
        __egretProto__.displaySkill1 = function () {
            this.playDisplay();
        };
        //技能2
        __egretProto__.displaySkill2 = function () {
            this.playDisplay();
        };
        //技能2
        __egretProto__.displaySkill3 = function () {
            this.playDisplay();
        };
        //大招
        __egretProto__.displayMix = function () {
            this.playDisplay();
        };
        //处理
        __egretProto__.handle = function () {
            uw.skillBiz.findTargetAndCalSkill(this.member, this.member, this.fightSkill);
        };
        __egretProto__.playSkill = function () {
            var action = this.fightSkill.skillDisplay[uw.t_skillDisplay_action];
            switch (action) {
                case uw.skillAction.NORMAL_ATTACK:
                    this.displayNormal();
                    break;
                case uw.skillAction.SKILL_ATTACK1:
                    this.displaySkill1();
                    break;
                case uw.skillAction.SKILL_ATTACK2:
                    this.displaySkill2();
                    break;
                case uw.skillAction.SKILL_ATTACK3:
                    this.displaySkill3();
                    break;
                case uw.skillAction.UNIQUE_ATTACK:
                    this.displayMix();
                    break;
            }
        };
        __egretProto__._getDefaultCfg = function () {
            var cfg = new uw.EffectCfg();
            var effectType = this.fightSkill.skillDisplay[uw.t_skillDisplay_effectType];
            switch (effectType) {
                case uw.skillEffectType.FIX:
                    cfg.targetType = uw.skillEffecTargetType.TARGET;
                    cfg.isAddAtScene = false;
                    cfg.isRelativeSelf = false;
                    cfg.addPos = uw.fightUtils.getCCAScalePos(0, 0);
                    break;
                case uw.skillEffectType.FLY:
                    cfg.targetType = uw.skillEffecTargetType.TARGET;
                    cfg.isAddAtScene = true;
                    cfg.isRelativeSelf = true;
                    cfg.addPos = uw.fightUtils.getCCAScalePos(280, 280);
                    break;
                case uw.skillEffectType.FLY_X:
                    cfg.targetType = uw.skillEffecTargetType.TARGET;
                    cfg.isAddAtScene = true;
                    cfg.isRelativeSelf = true;
                    cfg.addPos = uw.fightUtils.getCCAScalePos(280, 280);
                    break;
                case uw.skillEffectType.LINE:
                    cfg.targetType = uw.skillEffecTargetType.TARGET;
                    cfg.isAddAtScene = true;
                    cfg.isRelativeSelf = true;
                    cfg.addPos = uw.fightUtils.getCCAScalePos(280, 280);
                    break;
                case uw.skillEffectType.MOVE:
                    cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
                    cfg.isAddAtScene = true;
                    cfg.isRelativeSelf = true;
                    cfg.addPos = uw.fightUtils.getCCAScalePos(300, 0);
                    break;
                case uw.skillEffectType.SCALE_X_TARGET:
                    cfg.targetType = uw.skillEffecTargetType.FRONT_TARGET;
                    cfg.isAddAtScene = true;
                    cfg.isRelativeSelf = true;
                    cfg.addPos = uw.fightUtils.getCCAScalePos(280, 280);
                    break;
            }
            return cfg;
        };
        __egretProto__.playDisplay = function (cfg) {
            var self = this, cfg = cfg || this._getDefaultCfg();
            var member = this.member;
            var fightSkill = this.fightSkill;
            switch (cfg.targetType) {
                case uw.skillEffecTargetType.TARGET:
                    var targets = uw.targetBiz.find(member.fightOption.curIsChallenger, member, member.fightOption.curController.enemyFrontMember, fightSkill);
                    for (var i = 0; i < targets.length; i++) {
                        var locTarget = targets[i];
                        self.createAction(member, locTarget, cfg, fightSkill);
                    }
                    break;
                case uw.skillEffecTargetType.FRONT_TARGET:
                    var targetMember = this.member.fightOption.curController.enemyFrontMember;
                    self.createAction(member, targetMember, cfg, fightSkill);
                    break;
                case uw.skillEffecTargetType.SELF:
                    var targetMember = this.member;
                    self.createAction(member, targetMember, cfg, fightSkill);
                    break;
            }
        };
        __egretProto__.createAction = function (member, targetMember, cfg, fightSkill, cb, target) {
            if (!targetMember)
                return;
            var fxSkill = cfg.fxSkill || fightSkill.skillDisplay[uw.t_skillDisplay_fxSkill]; //特效名字
            var targetType = cfg.targetType;
            var isAddAtScene = cfg.isAddAtScene;
            var isRelativeSelf = cfg.isRelativeSelf;
            var effectType = cfg.effectType;
            var addPos = cfg.addPos;
            var fixPos = cfg.fixPos;
            var self = this;
            var effectAtTarget = isAddAtScene ? null : targetMember;
            var relativeMember = isRelativeSelf ? member : targetMember;
            var pos = fixPos || self._getPos(relativeMember, isAddAtScene, addPos, isRelativeSelf, effectType);
            var newFightSkill = fightSkill.clone();
            var actionCfg = {
                targetType: targetType,
                fightSkill: newFightSkill,
                targetMember: targetMember,
                isCanBreak: cfg.isCanBreak
            };
            this.createEffect(fxSkill, member, pos, effectAtTarget, newFightSkill, function (sender) {
                var action = self._createAction(sender, actionCfg, effectType);
                if (cb)
                    cb.call(target, action, sender);
            }, this);
        };
        __egretProto__._createAction = function (sender, actionCfg, effectType) {
            var self = this, action;
            var effectType = effectType || this.fightSkill.skillDisplay[uw.t_skillDisplay_effectType];
            switch (effectType) {
                case uw.skillEffectType.FIX:
                    action = uw.FightFixAction.create(sender, self, actionCfg);
                    break;
                case uw.skillEffectType.FLY:
                    action = uw.FightFlyAction.create(sender, self, actionCfg);
                    break;
                case uw.skillEffectType.FLY_X:
                    action = uw.FightFlyXAction.create(sender, self, actionCfg);
                    break;
                case uw.skillEffectType.LINE:
                    action = uw.FightLineAction.create(sender, self, actionCfg);
                    break;
                case uw.skillEffectType.MOVE:
                    action = uw.FightMoveAction.create(sender, self, actionCfg);
                    break;
                case uw.skillEffectType.SCALE_X_TARGET:
                    action = uw.FightScaleXMoveAction.create(sender, self, actionCfg);
                    break;
                case uw.skillEffectType.PARABOLA:
                    action = uw.FightParabolaAction.create(sender, self, actionCfg);
                    break;
            }
            self.addAction(action);
            return action;
        };
        __egretProto__._getPos = function (relativeMember, isAddAtScene, addPos, isRelativeSelf, effectType) {
            var pos = this._calBodyPos(relativeMember, isAddAtScene, isRelativeSelf, effectType);
            if (addPos) {
                if (this.member.fightOption.curController.isFaceLeft) {
                    addPos.x *= -1;
                }
                pos.x += addPos.x;
                pos.y += -addPos.y;
            }
            return pos;
        };
        __egretProto__._calBodyPos = function (relativeMember, isAddAtScene, isRelativeSelf, effectType) {
            var pos = mo.p(0, 0);
            var effectType = effectType || this.fightSkill.skillDisplay[uw.t_skillDisplay_effectType];
            var bodyType = this.fightSkill.skillDisplay[uw.t_skillDisplay_fxEmmitor1];
            if (isAddAtScene) {
                pos = relativeMember.fightOption.curController.display.getPosition();
            }
            //固定特效，并且相对目标为敌方
            if (effectType == uw.skillEffectType.FIX && !isRelativeSelf) {
                var bodyPos = uw.fightUtils.getDisplayBodyPos(relativeMember, bodyType);
                pos.x += bodyPos.x;
                pos.y += bodyPos.y;
            }
            return pos;
        };
        //添加动作
        __egretProto__.addAction = function (action) {
            uw.fightActionManager.addAction(action);
        };
        //创建特效
        __egretProto__.createEffect = function (fxSkill, member, pos, targetMember, fightSkill, cb, target) {
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
                sender.playWithIndex(0);
                sender.setScaleY(1);
                //面向右边则设置反值
                if (member.fightOption.curController.isFaceLeft) {
                    sender.setScaleX(-1);
                }
                else {
                    sender.setScaleX(1);
                }
                if (cb && !uw.Fight.isExit)
                    cb.call(target, sender);
            }, self);
            if (targetMember) {
                skillEffectNode.zOrder = uw.roleZOrder.ARMATURE + 1;
            }
            else {
                skillEffectNode.zOrder = member.fightOption.curController.display.zOrder;
            }
            skillEffectNode.x = pos.x;
            skillEffectNode.y = pos.y;
            return skillEffectNode;
        };
        //暂停
        __egretProto__.pause = function () {
            this.isPause = true;
        };
        //继续
        __egretProto__.resume = function () {
            this.isPause = false;
        };
        FightSkillEffectBaseCtrl.__className = "FightSkillEffectController";
        FightSkillEffectBaseCtrl.create = function (member, fightSkill) {
            var C = uw.fightSkillEffectCtrl_hero_1_20[member.tid];
            if (!C)
                C = uw.fightSkillEffectCtrl_hero_21_40[member.tid];
            if (!C)
                C = uw.fightSkillEffectCtrl_monster_1_20[member.tid];
            if (!C)
                C = uw.FightSkillEffectBaseCtrl;
            var c = new C(member, fightSkill);
            c.init(member, fightSkill);
            return c;
        };
        return FightSkillEffectBaseCtrl;
    })(mo.DataController);
    uw.FightSkillEffectBaseCtrl = FightSkillEffectBaseCtrl;
    FightSkillEffectBaseCtrl.prototype.__class__ = "uw.FightSkillEffectBaseCtrl";
})(uw || (uw = {}));
