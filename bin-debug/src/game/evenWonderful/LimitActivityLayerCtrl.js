/**
 * Created by lihex on 1/30/15.
 */
var uw;
(function (uw) {
    var LimitActivityLayerCtrl = (function (_super) {
        __extends(LimitActivityLayerCtrl, _super);
        function LimitActivityLayerCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LimitActivityLayerCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventLimitBuy_ui;
        };
        //@override
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self._createGridScrollView("listView", uw.EventWonderfulItem2, 2, this._onLimitActivityCellDataSource, true);
            self._gridScrollView.scrollEnabled = false;
        };
        __egretProto__._onLimitActivityCellDataSource = function (cell, index) {
            var self = this;
            var data = self._data[index];
            cell.resetByData(self._activityCtrl.id, data, index, self._activityCtrl);
        };
        __egretProto__.resetByData = function (activityCtrl) {
            var self = this, clazz = self.__class;
            self._activityCtrl = activityCtrl;
            self._data = activityCtrl.items;
            self._gridScrollView.setTotalCount(self._data.length);
            //设置活动时间
            var intervalStr = mo.formatStr("%s -- %s", new Date(activityCtrl.startTime).toFormat("YYYY年MM月DD日"), new Date(activityCtrl.endTime).toFormat("YYYY年MM月DD日"));
            self.setVisibleByName("labelTime", true);
            self.formatByName("labelTime", intervalStr);
            //设置活动描述
            var labelDesc = self.getWidgetByName("labelDesc");
            self.formatByName("labelDesc", activityCtrl.get(activityCtrl.DATA_KEY.content));
        };
        LimitActivityLayerCtrl.__className = "LimitActivityLayerCtrl";
        return LimitActivityLayerCtrl;
    })(mo.WidgetCtrl);
    uw.LimitActivityLayerCtrl = LimitActivityLayerCtrl;
    LimitActivityLayerCtrl.prototype.__class__ = "uw.LimitActivityLayerCtrl";
})(uw || (uw = {}));
