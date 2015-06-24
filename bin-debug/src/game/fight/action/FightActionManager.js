/**
 * Created by Administrator on 14-8-27.
 */
var uw;
(function (uw) {
    var FightActionManager = (function (_super) {
        __extends(FightActionManager, _super);
        function FightActionManager() {
            _super.apply(this, arguments);
            this.isPause = false;
        }
        var __egretProto__ = FightActionManager.prototype;
        __egretProto__.init = function () {
            this.actionArr = [];
        };
        __egretProto__.update = function (dt) {
            var self = this;
            if (this.isPause)
                return;
            for (var i = 0; i < self.actionArr.length; i++) {
                var locAction = self.actionArr[i];
                locAction.update(dt);
            }
        };
        __egretProto__.pause = function (isAll) {
            this.isPause = true;
            for (var i = 0; i < this.actionArr.length; i++) {
                var locAction = this.actionArr[i];
                locAction.pause();
            }
        };
        __egretProto__.resume = function (isAll) {
            this.isPause = false;
            for (var i = 0; i < this.actionArr.length; i++) {
                var locAction = this.actionArr[i];
                locAction.resume();
            }
        };
        //移除某个英雄特效
        __egretProto__.removeActionByMember = function (member) {
            for (var i = 0; i < this.actionArr.length; i++) {
                var locAction = this.actionArr[i];
                if (locAction.controller.member == member) {
                    locAction.removeDisplay();
                    this.actionArr.splice(i, 1);
                    i--;
                }
            }
        };
        //移除某个英雄特效
        __egretProto__.breakActionByMember = function (member) {
            for (var i = 0; i < this.actionArr.length; i++) {
                var locAction = this.actionArr[i];
                if (locAction.controller.member == member && locAction.isCanBreak) {
                    locAction.removeDisplay();
                    this.actionArr.splice(i, 1);
                    i--;
                }
            }
        };
        //添加动作
        __egretProto__.addAction = function (action) {
            this.actionArr.push(action);
        };
        //移除动作
        __egretProto__.removeAction = function (action) {
            mo.ArrayRemoveObject(this.actionArr, action);
            action.removeDisplay();
        };
        __egretProto__.destroy = function () {
            this.actionArr.length = 0;
        };
        FightActionManager.create = function () {
            var a = new FightActionManager();
            a.init();
            return a;
        };
        FightActionManager.__className = "FightActionManager";
        return FightActionManager;
    })(mo.Class);
    uw.FightActionManager = FightActionManager;
    FightActionManager.prototype.__class__ = "uw.FightActionManager";
})(uw || (uw = {}));
