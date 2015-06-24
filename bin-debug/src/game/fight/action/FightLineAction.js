/**
 * Created by Administrator on 14-8-28.
 */
var uw;
(function (uw) {
    var FightLineAction = (function (_super) {
        __extends(FightLineAction, _super);
        function FightLineAction() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightLineAction.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this.lineWidth = 500;
        };
        __egretProto__.init = function (display, controller, cfg) {
            _super.prototype.init.call(this, display, controller, cfg);
            var skillDisplay = this.fightSkill.skillDisplay;
            this.fixBodyType = skillDisplay[uw.t_skillDisplay_fxEmmitor1];
            this.initDisplay();
        };
        __egretProto__.initDisplay = function () {
            this.targetPos = uw.fightUtils.getFixBodyPos(this.targetMember, this.fixBodyType);
            var displayPos = mo.p(this.display.x, this.display.y);
            var distance = displayPos.distanceTo(this.targetPos);
            var scaleX = (distance + 150) / this.lineWidth;
            var rotation = uw.fightUtils.calRotateBy2Point(this.targetPos, displayPos);
            if (this.isFaceLeft) {
            }
            this.display.scaleX = scaleX;
            //计算角度
            this.display.rotation = rotation;
        };
        //动作回调
        __egretProto__.onMovementEvent = function (display, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                this.finish();
            }
        };
        /*//结束
        finish() {
            super.finish();
            var member = this.controller.member;
            if (this.targetType == uw.skillEffecTargetType.TARGET) {
                uw.skillBiz.calSkill(member, [this.targetMember], this.fightSkill);
            } else {
                uw.skillBiz.findTargetAndCalSkill(member, member.fightOption.curController.enemyFrontMember, this.fightSkill);
            }
        }*/
        FightLineAction.create = function (display, controller, cfg) {
            var action = new FightLineAction();
            action.init(display, controller, cfg);
            return action;
        };
        return FightLineAction;
    })(uw.FightBaseAction);
    uw.FightLineAction = FightLineAction;
    FightLineAction.prototype.__class__ = "uw.FightLineAction";
})(uw || (uw = {}));
