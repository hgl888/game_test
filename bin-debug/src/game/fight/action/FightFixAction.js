/**
 * Created by Administrator on 14-8-28.
 */
var uw;
(function (uw) {
    var FightFixAction = (function (_super) {
        __extends(FightFixAction, _super);
        function FightFixAction() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightFixAction.prototype;
        __egretProto__.init = function (display, controller, cfg) {
            _super.prototype.init.call(this, display, controller, cfg);
        };
        //动作回调
        __egretProto__.onMovementEvent = function (display, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                this.finish();
            }
        };
        FightFixAction.create = function (display, controller, cfg) {
            var action = new FightFixAction();
            action.init(display, controller, cfg);
            return action;
        };
        return FightFixAction;
    })(uw.FightBaseAction);
    uw.FightFixAction = FightFixAction;
    FightFixAction.prototype.__class__ = "uw.FightFixAction";
})(uw || (uw = {}));
