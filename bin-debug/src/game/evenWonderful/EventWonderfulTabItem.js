var uw;
(function (uw) {
    var EventWonderfulTabItem = (function (_super) {
        __extends(EventWonderfulTabItem, _super);
        function EventWonderfulTabItem() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EventWonderfulTabItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventWonderfulTabItem_ui;
            self._clickWidgetName = "button";
        };
        __egretProto__.resetByData = function (activityCtrl) {
            var self = this, clazz = self.__class;
            self._activityCtrl = activityCtrl;
            var iconType = activityCtrl.get(activityCtrl.DATA_KEY.iconType);
            self.setInfoByName("icon", resHelper.getEventIconPath(iconType));
            self.setInfoByName("title", activityCtrl.get(activityCtrl.DATA_KEY.title));
            self.enableStrokeByName("title", mo.c3b(65, 37, 0), 3);
            self.setFocused(activityCtrl == self.getDelegate()._curActivityCtrl);
        };
        __egretProto__.setFocused = function (focus) {
            var self = this, clazz = self.__class;
            self.setVisibleByName("tab", focus);
            var btn = self.getWidgetByName("button");
            btn.setTouchEnabled(!focus);
            btn.setBrightStyle(focus ? mo.BrightStyle.high_light : mo.BrightStyle.normal);
        };
        EventWonderfulTabItem.__className = "EventWonderfulTabItem";
        return EventWonderfulTabItem;
    })(mo.GridViewCell);
    uw.EventWonderfulTabItem = EventWonderfulTabItem;
    EventWonderfulTabItem.prototype.__class__ = "uw.EventWonderfulTabItem";
})(uw || (uw = {}));
