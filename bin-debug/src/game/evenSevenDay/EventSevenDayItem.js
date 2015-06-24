/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var EventSevenDayItem = (function (_super) {
        __extends(EventSevenDayItem, _super);
        function EventSevenDayItem() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EventSevenDayItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventSevenDayItem_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self.onClickByName(self.__class.btnGetAward, self.menuGetAward, self);
        };
        __egretProto__.setState = function () {
            var self = this;
            var canGet = self._state == 0 || self._state == 1;
            self.setVisibleByName(self.__class.btnGetAward, canGet);
            self.setVisibleByName(self.__class.imgGot, !canGet);
            if (self._state == 1) {
                var seq = mo.sequence();
                self.setVisibleByName(self.__class.btnGetRewardBg, true);
                var btnGetRewardBg = self.getWidgetByName(self.__class.btnGetRewardBg);
                var actRotation = mo.repeatForever(mo.rotateBy(10, 360));
                btnGetRewardBg.stopAllActions();
                btnGetRewardBg.runAction(actRotation);
            }
            else {
                self.setVisibleByName(self.__class.btnGetRewardBg, false);
            }
        };
        /**
         * 0：待领取但今天不可领取
         * 1：今日可以领取
         * 2：已经领取
         */
        __egretProto__.menuGetAward = function () {
            var self = this;
            if (self._state == 0) {
                return mo.showMsg(uw.id_c_msgCode.cantGetNoDays, self._days);
            }
            else if (self._state == 1) {
                uw.userDataCtrl.receiveSevenLogin(function () {
                    self._state = 2;
                    self.setState();
                }, this);
            }
        };
        __egretProto__.resetByData = function (activityItem, index) {
            var self = this;
            self._days = index + 1;
            self.setInfoByName("day", self._days);
            self._state = uw.userDataCtrl.getSevenLoginStateArr()[index];
            self.setState();
            var itemsObject = activityItem[uw.dsConsts.ActivityItem.items];
            var itemWidget, ctrl;
            var i = 1;
            for (var tempId in itemsObject) {
                itemWidget = self.getWidgetByName("item" + i);
                ctrl = uw.UIItemIconCtrl.create(itemWidget, tempId);
                ctrl.setCount(itemsObject[tempId]);
                ctrl.showTip(true);
                i++;
            }
        };
        EventSevenDayItem.__className = "EventSevenDayItem";
        EventSevenDayItem.btnGetAward = "btnGetAward";
        EventSevenDayItem.btnGetRewardBg = "btnGetRewardBg";
        EventSevenDayItem.imgGot = "imgGot";
        return EventSevenDayItem;
    })(mo.GridViewCell);
    uw.EventSevenDayItem = EventSevenDayItem;
    EventSevenDayItem.prototype.__class__ = "uw.EventSevenDayItem";
})(uw || (uw = {}));
