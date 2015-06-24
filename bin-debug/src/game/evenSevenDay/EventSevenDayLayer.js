var uw;
(function (uw) {
    var EventSevenDayLayer = (function (_super) {
        __extends(EventSevenDayLayer, _super);
        function EventSevenDayLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EventSevenDayLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventSevenDayLayer_ui;
        };
        __egretProto__.init = function (result) {
            _super.prototype.init.apply(this, arguments);
            var self = this;
            self._btn2Day = self.getWidgetByName(EventSevenDayLayer.BTN_2_DAY);
            self._btn7Day = self.getWidgetByName(EventSevenDayLayer.BTN_7_DAY);
            self._btn2Day.onClick(self.menu2Day, self);
            self._btn7Day.onClick(self.menu7Day, self);
            self._curBtn = self._btn7Day;
            self.menu7Day();
            self.onClickByName("btnClose", self.close, self);
            if (!result)
                return;
            //设置物品
            self._data = result.items;
            self._gridScrollView = self._createGridScrollView(EventSevenDayLayer.PANEL_AWARD_LIST, uw.EventSevenDayItem, 1, this._onCellDataSource);
            self._gridScrollView.setTotalCount(self._data.length);
        };
        __egretProto__.menu2Day = function () {
            var self = this;
            if (self._curBtn) {
                self._curBtn.setBright(true);
            }
            self._curBtn = self._btn2Day;
            self._curBtn.setBright(false);
            self.setInfoByName(EventSevenDayLayer.IMG_CHAR, res.ui_event.ntc_cg2_jpg);
        };
        __egretProto__.menu7Day = function () {
            var self = this;
            if (self._curBtn) {
                self._curBtn.setBright(true);
            }
            self._curBtn = self._btn7Day;
            self._curBtn.setBright(false);
            self.setInfoByName(EventSevenDayLayer.IMG_CHAR, res.ui_event.ntc_cg7_jpg);
        };
        __egretProto__._onCellDataSource = function (cell, index) {
            var info = this._data[index];
            cell.resetByData(info, index);
            cell.setDelegate(this);
        };
        EventSevenDayLayer.__className = "EventSevenDayLayer";
        EventSevenDayLayer.PANEL_AWARD_LIST = "listView";
        EventSevenDayLayer.BTN_2_DAY = "btn2Day";
        EventSevenDayLayer.BTN_7_DAY = "btn7Day";
        EventSevenDayLayer.IMG_CHAR = "char";
        return EventSevenDayLayer;
    })(mo.Dlg);
    uw.EventSevenDayLayer = EventSevenDayLayer;
    EventSevenDayLayer.prototype.__class__ = "uw.EventSevenDayLayer";
})(uw || (uw = {}));
