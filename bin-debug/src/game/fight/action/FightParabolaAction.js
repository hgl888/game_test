/**
 * Created by Administrator on 14-11-3.
 */
var uw;
(function (uw) {
    var FightParabolaAction = (function (_super) {
        __extends(FightParabolaAction, _super);
        function FightParabolaAction() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightParabolaAction.prototype;
        __egretProto__.init = function (display, controller, cfg) {
            _super.prototype.init.call(this, display, controller, cfg);
            this.isPause = true;
        };
        __egretProto__.play = function (time, startRotation) {
            //抛物线
            var distance = this.fightSkill.attackDistance;
            var startPos = mo.p(this.display.x, this.display.y);
            var memberDisplay = this.controller.member.fightOption.curController.display;
            var memberPos = mo.p(memberDisplay.x, memberDisplay.y);
            var endPos = mo.p(memberPos.x, memberPos.y);
            var midPos = mo.p(memberPos.x, memberPos.y - 700);
            if (this.isFaceLeft) {
                endPos.x -= distance;
                midPos.x -= (distance * 3 / 4);
            }
            else {
                endPos.x += distance;
                midPos.x += (distance * 3 / 4);
            }
            this.endPos = endPos;
            this._config = [startPos, midPos, endPos];
            this._bezierAction = mo.bezierTo(time, this._config);
            this._bezierAction.setEase(mo.Ease.getPowInOut(0.8));
            this.display.runAction(this._bezierAction);
            //旋转为90度
            var endRation = 90;
            if (this.isFaceLeft) {
                startRotation -= 180;
                endRation = -90;
            }
            this.display.rotation = startRotation;
            this._rotationAction = mo.rotateBy(time, endRation);
            this.display.runAction(this._rotationAction);
            this.isPause = false;
            //var ease = cc.EaseOut.create(this._bezierAction, 2);
            //this.display.runAction(ease);
        };
        __egretProto__.step = function (dt) {
            if (!this._rotationAction)
                return;
            if (this._rotationAction.isDone()) {
                this.finish();
            }
        };
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
        FightParabolaAction.create = function (display, controller, cfg) {
            var action = new FightParabolaAction();
            action.init(display, controller, cfg);
            return action;
        };
        return FightParabolaAction;
    })(uw.FightBaseAction);
    uw.FightParabolaAction = FightParabolaAction;
    FightParabolaAction.prototype.__class__ = "uw.FightParabolaAction";
})(uw || (uw = {}));
