/**
 * Created by Administrator on 14-8-28.
 */
/**
 * Created by Administrator on 14-8-26.
 */
var uw;
(function (uw) {
    var FightBaseAction = (function (_super) {
        __extends(FightBaseAction, _super);
        function FightBaseAction() {
            _super.apply(this, arguments);
            this.isPause = false; //是否暂停
            this.speed = 0;
            this.fixBodyType = 0; //打击部位
            this.isFaceLeft = true;
            this.isCanBreak = false; //是否可以打断
            this.targetType = 0;
        }
        var __egretProto__ = FightBaseAction.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.targetPos = mo.p(0, 0);
            this.dtPos = mo.p(0, 0);
        };
        __egretProto__.init = function (display, controller, cfg) {
            this.display = display;
            this.controller = controller;
            //cfg
            this.targetMember = cfg.targetMember;
            this.fightSkill = cfg.fightSkill;
            this.targetType = cfg.targetType;
            this.isCanBreak = cfg.isCanBreak;
            var member = this.controller.member;
            if (member) {
                this.isFaceLeft = member.fightOption.curController.isFaceLeft;
            }
            display.setMovementEventCallFunc(this.onMovementEvent, this);
            display.setFrameEventCallFunc(this.onFrameEvent, this);
        };
        __egretProto__.update = function (dt) {
            if (this.isPause)
                return;
            this.step(dt);
        };
        __egretProto__.step = function (dt) {
        };
        __egretProto__.calZOrder = function (newX, newY) {
        };
        //暂停
        __egretProto__.pause = function () {
            this.isPause = true;
            if (this.display) {
                this.display.pause();
                this.display.pauseSchedulerAndActions();
            }
        };
        //继续
        __egretProto__.resume = function () {
            this.isPause = false;
            if (this.display) {
                this.display.resume();
                this.display.resumeSchedulerAndActions();
            }
        };
        //移除显示
        __egretProto__.removeDisplay = function () {
            if (this.display) {
                this.display.removeMovementEvent(this.onMovementEvent, this);
                this.display.removeFrameEvent(this.onFrameEvent, this);
                this.display.stopAllActions();
                this.display.removeFromParent();
            }
        };
        //事件处理
        __egretProto__.onFrameEvent = function (display, evt, originFrameIndex, currentFrameIndex) {
            if (evt == uw.Fight.HeroEvent.attack) {
                var member = this.controller.member;
                if (member) {
                    if (this.targetType == uw.skillEffecTargetType.TARGET) {
                        uw.skillBiz.calSkill(member, [this.targetMember], this.fightSkill);
                    }
                    else {
                        uw.skillBiz.findTargetAndCalSkill(member, this.targetMember, this.fightSkill);
                    }
                }
                else {
                    //秘术
                    uw.skillBiz.calSecretSkill(this.fightSkill);
                }
            }
            if (evt == uw.Fight.HeroEvent.shake) {
                //震屏
                uw.fightUtils.shakeEffect();
            }
        };
        //动作回调
        __egretProto__.onMovementEvent = function (display, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
            }
        };
        __egretProto__.finish = function () {
            var self = this;
            uw.fightActionManager.removeAction(self);
            if (self.controller.onFinish) {
                self.controller.onFinish(self);
            }
        };
        return FightBaseAction;
    })(mo.Class);
    uw.FightBaseAction = FightBaseAction;
    FightBaseAction.prototype.__class__ = "uw.FightBaseAction";
})(uw || (uw = {}));
