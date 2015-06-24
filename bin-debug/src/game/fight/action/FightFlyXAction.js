/**
 * Created by Administrator on 14-8-26.
 */
var uw;
(function (uw) {
    var FightFlyXAction = (function (_super) {
        __extends(FightFlyXAction, _super);
        function FightFlyXAction() {
            _super.apply(this, arguments);
            this.speed = 0; //速度
        }
        var __egretProto__ = FightFlyXAction.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.zOrderHigh = 280;
            this.hitDistance = 200;
        };
        __egretProto__.init = function (display, controller, cfg) {
            _super.prototype.init.call(this, display, controller, cfg);
            var skillDisplay = this.fightSkill.skillDisplay;
            this.speed = skillDisplay[uw.t_skillDisplay_speed]; //速度
            this.fixBodyType = skillDisplay[uw.t_skillDisplay_fxEmmitor1];
            //todo
            /*var boundingBox = this.targetMember.fightOption.curController.display.getBoundingBox();
            this.targetBodyWidth = boundingBox.width || 300;*/
            this.targetBodyWidth = 300;
        };
        __egretProto__.step = function (dt) {
            var self = this;
            self.calTargetPos();
            //根据dt改变x,y轴
            var disX = self.display.x;
            var disY = self.display.y;
            var newX = disX + self.dtPos.x * dt;
            var newY = disY;
            self.display.x = newX;
            self.calZOrder(newX, newY);
            self.checkFinish(dt, disX, disY, newX, newY);
        };
        __egretProto__.calZOrder = function (newX, newY) {
            var self = this;
            if (Math.abs(newX - self.targetPos.x) <= self.targetBodyWidth) {
                self.display.zOrder = self.targetMember.fightOption.curController.display.getZOrder() + 1;
            }
            else {
                self.display.zOrder = newY - self.zOrderHigh || 0;
            }
        };
        __egretProto__.checkFinish = function (dt, oldX, oldY, newX, newY) {
            var self = this;
            var targetPos = self.targetPos;
            //其中有一个溢出则为到达
            if ((oldX - self.targetPos.x) * (newX - self.targetPos.x) <= 0) {
                self.finish();
            }
            else {
                var distance = mo.p(newX, newY).distanceTo(targetPos);
                if (distance <= self.hitDistance || 0)
                    self.finish();
            }
        };
        __egretProto__.calTargetPos = function () {
            var self = this;
            var pos = uw.fightUtils.getFixBodyPos(self.targetMember, self.fixBodyType);
            var targetPos = self.targetPos;
            if (targetPos.x == pos.x) {
                return;
            }
            targetPos.x = pos.x;
            var displayPos = mo.p(self.display.x, self.display.y);
            var distance = Math.abs(targetPos.x - displayPos.x);
            var time = distance / self.speed;
            //算两点之间的
            self.dtPos.x = (targetPos.x - displayPos.x) / time;
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
        FightFlyXAction.create = function (display, controller, cfg) {
            var action = new FightFlyXAction();
            action.init(display, controller, cfg);
            return action;
        };
        return FightFlyXAction;
    })(uw.FightBaseAction);
    uw.FightFlyXAction = FightFlyXAction;
    FightFlyXAction.prototype.__class__ = "uw.FightFlyXAction";
})(uw || (uw = {}));
