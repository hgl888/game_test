/**
 * Created by Administrator on 14-8-26.
 */
var uw;
(function (uw) {
    var FightFlyAction = (function (_super) {
        __extends(FightFlyAction, _super);
        function FightFlyAction() {
            _super.apply(this, arguments);
            this.speed = 0; //速度
            this.isStop = false;
        }
        var __egretProto__ = FightFlyAction.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.zOrderHigh = 280;
            this.hitDistance = 100;
        };
        __egretProto__.init = function (display, controller, cfg) {
            _super.prototype.init.call(this, display, controller, cfg);
            var skillDisplay = this.fightSkill.skillDisplay;
            this.speed = skillDisplay[uw.t_skillDisplay_speed]; //速度
            this.fixBodyType = skillDisplay[uw.t_skillDisplay_fxEmmitor1];
            this.targetBodyWidth = this.targetMember.fightOption.curController.display.width || 300;
        };
        __egretProto__.step = function (dt) {
            var self = this;
            if (self.isStop)
                return;
            self.calTargetPos();
            //根据dt改变x,y轴
            var disX = self.display.x;
            var disY = self.display.y;
            var newX = disX + self.dtPos.x * dt;
            var newY = disY + self.dtPos.y * dt;
            self.display.x = newX;
            self.display.y = newY;
            self.calZOrder(newX, newY);
            self.checkFinish(dt, disX, disY, newX, newY);
        };
        __egretProto__.calZOrder = function (newX, newY) {
            if (Math.abs(newX - this.targetPos.x) <= this.targetBodyWidth) {
                this.display.zOrder = this.targetMember.fightOption.curController.display.getZOrder() + 1;
            }
            else {
                this.display.zOrder = newY - this.zOrderHigh;
            }
        };
        __egretProto__.checkFinish = function (dt, oldX, oldY, newX, newY) {
            var targetPos = this.targetPos;
            //其中有一个溢出则为到达
            if ((oldX - this.targetPos.x) * (newX - this.targetPos.x) <= 0 || (oldY - this.targetPos.y) * (newY - this.targetPos.y) <= 0) {
                this.finish();
            }
            else {
                var distance = mo.p(newX, newY).distanceTo(targetPos);
                if (distance <= this.hitDistance || 0)
                    this.finish();
            }
        };
        __egretProto__.calTargetPos = function () {
            var self = this;
            var pos = uw.fightUtils.getFixBodyPos(self.targetMember, self.fixBodyType);
            var targetPos = self.targetPos;
            if (targetPos.x == pos.x && targetPos.y == pos.y) {
                return;
            }
            targetPos.x = pos.x;
            targetPos.y = pos.y;
            var displayPos = mo.p(self.display.x, self.display.y);
            var distance = displayPos.distanceTo(targetPos);
            var time = distance / self.speed;
            //算两点之间的
            self.dtPos.x = (targetPos.x - displayPos.x) / time;
            self.dtPos.y = (targetPos.y - displayPos.y) / time;
            //算角度
            var rotation = uw.fightUtils.calRotateBy2Point(targetPos, displayPos);
            if (self.isFaceLeft) {
                rotation -= 180;
            }
            self.display.rotation = rotation;
        };
        //结束
        __egretProto__.finish = function () {
            _super.prototype.finish.call(this);
            var member = this.controller.member;
            if (this.targetType == uw.skillEffecTargetType.TARGET) {
                uw.skillBiz.calSkill(member, [this.targetMember], this.fightSkill);
            }
            else {
                uw.skillBiz.findTargetAndCalSkill(member, member.fightOption.curController.enemyFrontMember, this.fightSkill);
            }
        };
        FightFlyAction.create = function (display, controller, cfg) {
            var action = new FightFlyAction();
            action.init(display, controller, cfg);
            return action;
        };
        return FightFlyAction;
    })(uw.FightBaseAction);
    uw.FightFlyAction = FightFlyAction;
    FightFlyAction.prototype.__class__ = "uw.FightFlyAction";
})(uw || (uw = {}));
