/**
 * Created by Administrator on 14-8-28.
 */
var uw;
(function (uw) {
    var FightScaleXMoveAction = (function (_super) {
        __extends(FightScaleXMoveAction, _super);
        function FightScaleXMoveAction() {
            _super.apply(this, arguments);
            this.timeAdd = 0; //累计时间
            this.curAttackNum = 0; //当前已经攻击的次数
            this.maxLength = 0;
        }
        var __egretProto__ = FightScaleXMoveAction.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.rectWidth = 500;
            this.moveTime = 0.2;
            this.keepTime = 0.9;
        };
        __egretProto__.init = function (display, controller, cfg) {
            _super.prototype.init.call(this, display, controller, cfg);
            this.isCanBreak = true;
            var winSize = mo.visibleRect.getSize();
            this.maxLength = winSize.width - 400;
            this.oldPos = mo.p(display.getPositionX(), display.getPositionY());
            var skillDisplay = this.fightSkill.skillDisplay;
            this.attackNum = skillDisplay[uw.t_skillDisplay_number]; //次数
        };
        __egretProto__.step = function (dt) {
            var self = this;
            self.timeAdd += dt;
            var per = self.timeAdd / self.moveTime;
            var scaleX = self.maxLength * per / self.rectWidth;
            var diffPosX = self.maxLength * per / 2;
            if (self.isFaceLeft) {
                diffPosX *= -1;
                scaleX *= -1;
            }
            if (self.timeAdd < self.moveTime) {
                self.display.scaleX = scaleX;
            }
            self.checkFinish();
            self.checkAttack(dt);
        };
        __egretProto__.checkAttack = function (dt) {
            var self = this;
            if (self.timeAdd > self.moveTime + self.keepTime / self.attackNum * self.curAttackNum) {
                self.curAttackNum++;
                self._calAttack();
            }
        };
        __egretProto__._calAttack = function () {
            var member = this.controller.member;
            uw.skillBiz.findTargetAndCalSkill(member, member.fightOption.curController.enemyFrontMember, this.fightSkill);
        };
        __egretProto__.checkFinish = function () {
            var self = this;
            if (self.timeAdd >= self.moveTime + self.keepTime) {
                for (var i = 0; i < self.attackNum - self.curAttackNum; i++) {
                    self._calAttack();
                }
                self.finish();
            }
        };
        __egretProto__.finish = function () {
            uw.fightActionManager.removeAction(this);
            this.removeDisplay();
        };
        FightScaleXMoveAction.create = function (display, controller, cfg) {
            var action = new FightScaleXMoveAction();
            action.init(display, controller, cfg);
            return action;
        };
        return FightScaleXMoveAction;
    })(uw.FightBaseAction);
    uw.FightScaleXMoveAction = FightScaleXMoveAction;
    FightScaleXMoveAction.prototype.__class__ = "uw.FightScaleXMoveAction";
})(uw || (uw = {}));
