/**
 * Created by lihex on 1/30/15.
 */
var uw;
(function (uw) {
    var UpLvlActivityLayerCtrl = (function (_super) {
        __extends(UpLvlActivityLayerCtrl, _super);
        function UpLvlActivityLayerCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UpLvlActivityLayerCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventUpLvl_ui;
            self._indexs = [];
        };
        //@override
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self._createGridScrollView("listView", uw.EventWonderfulItem1, 1, this._onLimitActivityCellDataSource, true);
            self.registerClassByKey(uw.UserDataCtrl, uw.UserDataCtrl.ON_GET_EVENT_AWARD, self.refreshMe);
        };
        __egretProto__._onLimitActivityCellDataSource = function (cell, index) {
            var self = this;
            var data = self._data[index];
            cell.resetByData(self._activityId, data, self._indexs[index], self._activityCtrl);
        };
        __egretProto__.resetByData = function (activityCtrl) {
            var self = this, clazz = self.__class;
            var DATA_KEY = activityCtrl.DATA_KEY;
            self._activityCtrl = activityCtrl;
            self._activityId = self._activityCtrl.get(DATA_KEY.id);
            //设置活动描述
            var labelDesc = self.getWidgetByName("labelDesc");
            self.formatByName("labelDesc", activityCtrl.get(DATA_KEY.content));
            //构造数据
            var data = activityCtrl.get(DATA_KEY.items);
            self._data = [];
            self._indexs = [];
            for (var i = 0, li = data.length; i < li; i++) {
                self._indexs.push(i);
                self._data.push(data[i]);
            }
            // 升级奖励要过滤已经领过的物品
            // 过滤已经领过的物品
            var arr = uw.userDataCtrl.getActivityDataList(self._activityId);
            for (var index = 0, realIndex = 0, li = self._data.length; index < li; realIndex++) {
                var isGot = arr[realIndex] > 0;
                if (isGot) {
                    mo.ArrayRemoveObjectAtIndex(self._data, index);
                    mo.ArrayRemoveObjectAtIndex(self._indexs, index);
                    li = self._data.length;
                }
                else {
                    index++;
                }
            }
            self._gridScrollView.setTotalCount(self._data.length);
            self._gridScrollView.jumpToTop();
        };
        //只刷新领主升级领奖界面
        __egretProto__.refreshMe = function () {
            var self = this;
            self.resetByData(self._activityCtrl);
        };
        UpLvlActivityLayerCtrl.__className = "UpLvlActivityLayerCtrl";
        return UpLvlActivityLayerCtrl;
    })(mo.WidgetCtrl);
    uw.UpLvlActivityLayerCtrl = UpLvlActivityLayerCtrl;
    UpLvlActivityLayerCtrl.prototype.__class__ = "uw.UpLvlActivityLayerCtrl";
})(uw || (uw = {}));
