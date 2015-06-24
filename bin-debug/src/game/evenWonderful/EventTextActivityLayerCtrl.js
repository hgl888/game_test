/**
 * Created by lihex on 3/20/15.
 */
var uw;
(function (uw) {
    var EventTextActivityLayerCtrl = (function (_super) {
        __extends(EventTextActivityLayerCtrl, _super);
        function EventTextActivityLayerCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EventTextActivityLayerCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEventText_ui;
        };
        //@override
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self._labelTime = self.getWidgetByName(clazz.LABEL_TIME);
            self._labelDesc = self.getWidgetByName(clazz.LABEL_DESC);
            self._labelDesc.setAutoSizeHeight(true);
            self._sv = self.getWidgetByName("sv");
        };
        __egretProto__.resetByData = function (activityCtrl) {
            var self = this, clazz = self.__class;
            //设置活动时间
            var intervalStr = mo.formatStr("%s -- %s", new Date(activityCtrl.startTime).toFormat("YYYY年MM月DD日"), new Date(activityCtrl.endTime).toFormat("YYYY年MM月DD日"));
            self.setInfoByName(clazz.LABEL_TIME, intervalStr);
            self.setInfoByName(clazz.LABEL_DESC, activityCtrl.get(activityCtrl.DATA_KEY.content));
            var inc = self._sv.getInnerContainer();
            var srcHeight = inc.getSrcSize().height;
            var txtHeight = self._labelDesc.getSize().height;
            if (txtHeight > srcHeight) {
                self._sv.setInnerContainerSize(inc.getSrcSize().width, txtHeight + 200);
            }
            else {
                self._sv.setInnerContainerSize(inc.getSrcSize());
            }
            inc.doLayout();
            self._sv.jumpToTop();
        };
        EventTextActivityLayerCtrl.__className = "EventTextActivityLayerCtrl";
        EventTextActivityLayerCtrl.LABEL_TIME = "labelTime";
        EventTextActivityLayerCtrl.LABEL_DESC = "label_desc";
        EventTextActivityLayerCtrl.LABEL_RULE = "label_rule";
        return EventTextActivityLayerCtrl;
    })(mo.WidgetCtrl);
    uw.EventTextActivityLayerCtrl = EventTextActivityLayerCtrl;
    EventTextActivityLayerCtrl.prototype.__class__ = "uw.EventTextActivityLayerCtrl";
})(uw || (uw = {}));
