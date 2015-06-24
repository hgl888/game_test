/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var EventWonderfulItem2 = (function (_super) {
        __extends(EventWonderfulItem2, _super);
        function EventWonderfulItem2() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EventWonderfulItem2.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventWonderfulItem2_ui;
        };
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self.onClickByName(clazz.BTNBUY, self.onBuy, self);
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.ITEM_ICON));
            self._iconCtrl.showTip(true);
            self.setVisibleByName(clazz.IMG_MARK, false);
        };
        __egretProto__.onBuy = function () {
            var self = this, clazz = self.__class;
            var localData = self._data;
            var KEY = uw.dsConsts.ActivityItem;
            var diamond = localData[KEY.diamond];
            mo.showMsg(uw.id_c_msgCode.ifBuyLimitedItem, diamond, uw.getItemColorByTempId(self._iconCtrl.dataCtrl.tempId), self._iconCtrl.dataCtrl.name, function () {
                uw.userDataCtrl.receiveMainActivity(self._activityId, self._activityType, self._index, localData[KEY.diamond], function (itemsInfo) {
                    uw.showGainTipsByDlg(itemsInfo, false, "抢购成功");
                    self._refreshRest();
                });
            }, self);
        };
        __egretProto__._refreshRest = function () {
            var self = this, clazz = self.__class;
            var index = self._index, data = self._data;
            var KEY = uw.dsConsts.ActivityItem;
            var arr = uw.userDataCtrl.getActivityDataList(self._activityId);
            var record = arr[index];
            var boughtCount = 0;
            if (record) {
                //不同天则已购买次数清零
                var sameDay = Date.equalsDay(new Date(record[1]), Date.newDate());
                boughtCount = sameDay ? record[0] : 0;
            }
            var left = data[KEY.limitNum] - boughtCount;
            left = left < 0 ? 0 : left; //确保数据正确
            self.setVisibleByName(clazz.BTNBUY, left != 0);
            self.setVisibleByName(clazz.IMG_MARK, left == 0);
            self.formatByName(clazz.LABEL_REST, left);
        };
        __egretProto__.resetByData = function (activityId, data, index, activityCtrl) {
            var self = this, clazz = self.__class;
            self._data = data;
            self._activityId = activityId;
            self._index = index;
            self._activityCtrl = activityCtrl;
            self._activityType = activityCtrl.type;
            //ActivityItem:{items:1,diamond:2,userLvl:3,limitNum:4}
            var KEY = uw.dsConsts.ActivityItem;
            var items = data[KEY.items];
            for (var itemId in items) {
                self._iconCtrl.resetByData(uw.BagDataCtrl.create(itemId, items[itemId]));
                self.setInfoByName(clazz.LABEL_NAME, self._iconCtrl.dataCtrl.name);
                self.setInfoByName(clazz.LABEL_COST, data[KEY.diamond]);
                self._refreshRest();
            }
        };
        EventWonderfulItem2.__className = "EventWonderfulItem2";
        EventWonderfulItem2.ITEM_ICON = "panel_icon"; //物品ICON
        EventWonderfulItem2.LABEL_NAME = "label_name"; //物品名
        EventWonderfulItem2.LABEL_COST = "label_cost"; //物品剩余数量
        EventWonderfulItem2.LABEL_REST = "label_rest"; //物品剩余数量
        EventWonderfulItem2.BTNBUY = "btnBuy"; //物品剩余数量
        EventWonderfulItem2.IMG_MARK = "img_mark"; //物品剩余数量
        return EventWonderfulItem2;
    })(mo.GridViewCell);
    uw.EventWonderfulItem2 = EventWonderfulItem2;
    EventWonderfulItem2.prototype.__class__ = "uw.EventWonderfulItem2";
})(uw || (uw = {}));
