/**
 * Created by lihex on 1/30/15.
 */
var uw;
(function (uw) {
    var ChargeActivityLayerCtrl = (function (_super) {
        __extends(ChargeActivityLayerCtrl, _super);
        function ChargeActivityLayerCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ChargeActivityLayerCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventCharge_ui;
            self._indexs = [];
        };
        //@override
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            uw.setDiamondColor(self, "diamond");
            self._createGridScrollView("listView", uw.EventWonderfulItem1, 1, this._onLimitActivityCellDataSource, true);
            self.registerClassByKey(uw.RechargeDataCtrl, uw.RechargeDataCtrl.ON_RECHARGED, self._onRecharged);
        };
        __egretProto__._onRecharged = function (diamond) {
            var self = this, clazz = self.__class;
            var activityCtrl = self._activityCtrl, activityType = self._activityCtrl.type;
            var curCount;
            var DATA_KEY = activityCtrl.DATA_KEY;
            if (activityType == uw.c_prop.activityTypeKey.dayChargeCount) {
                curCount = activityCtrl.get(DATA_KEY.todayRecharge) + diamond;
                activityCtrl.set(DATA_KEY.todayRecharge, curCount);
            }
            else if (activityType == uw.c_prop.activityTypeKey.allChargeCount) {
                curCount = activityCtrl.get(DATA_KEY.allRecharge) + diamond;
                activityCtrl.set(DATA_KEY.allRecharge, curCount);
            }
            self.setInfoByName("diamond", curCount);
            self._gridScrollView.refreshData();
        };
        __egretProto__._onLimitActivityCellDataSource = function (cell, index) {
            var self = this;
            var data = self._data[index];
            cell.resetByData(self._activityId, data, self._indexs[index], self._activityCtrl);
        };
        __egretProto__.resetByData = function (activityCtrl) {
            var self = this, clazz = self.__class;
            var DATA_KEY = activityCtrl.DATA_KEY;
            var activityType = activityCtrl.get(DATA_KEY.type);
            self._activityCtrl = activityCtrl;
            self._activityId = self._activityCtrl.get(DATA_KEY.id);
            //设置活动时间
            var intervalStr = mo.formatStr("%s -- %s", new Date(activityCtrl.startTime).toFormat("YYYY年MM月DD日"), new Date(activityCtrl.endTime).toFormat("YYYY年MM月DD日"));
            self.setVisibleByName("labelTime", true);
            self.formatByName("labelTime", intervalStr);
            //设置活动描述
            var labelDesc = self.getWidgetByName("labelDesc");
            self.formatByName("labelDesc", activityCtrl.get(DATA_KEY.content));
            switch (activityType) {
                case uw.c_prop.activityTypeKey.dayChargeCount:
                    self.setInfoByName("diamond", activityCtrl.get(DATA_KEY.todayRecharge));
                    self.setInfoByName("labelCost", "今日累积充值");
                    break;
                case uw.c_prop.activityTypeKey.allChargeCount:
                    self.setInfoByName("diamond", activityCtrl.get(DATA_KEY.allRecharge));
                    self.setInfoByName("labelCost", "累积充值");
                    break;
                case uw.c_prop.activityTypeKey.dayCostCount:
                    self.setInfoByName("diamond", activityCtrl.get(DATA_KEY.todayCost));
                    self.setInfoByName("labelCost", "今日累积消费");
                    break;
                case uw.c_prop.activityTypeKey.allCostCount:
                    self.setInfoByName("diamond", activityCtrl.get(DATA_KEY.allCost));
                    self.setInfoByName("labelCost", "累积消费");
                    break;
            }
            //构造数据
            var data = activityCtrl.get(DATA_KEY.items);
            self._data = [];
            self._indexs = [];
            for (var i = 0, li = data.length; i < li; i++) {
                self._indexs.push(i);
                self._data.push(data[i]);
            }
            self._gridScrollView.setTotalCount(self._data.length);
            self._gridScrollView.jumpToTop();
        };
        ChargeActivityLayerCtrl.__className = "ChargeActivityLayerCtrl";
        return ChargeActivityLayerCtrl;
    })(mo.WidgetCtrl);
    uw.ChargeActivityLayerCtrl = ChargeActivityLayerCtrl;
    ChargeActivityLayerCtrl.prototype.__class__ = "uw.ChargeActivityLayerCtrl";
})(uw || (uw = {}));
