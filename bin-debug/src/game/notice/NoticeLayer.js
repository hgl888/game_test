/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var NoticeLayer = (function (_super) {
        __extends(NoticeLayer, _super);
        function NoticeLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = NoticeLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiNoticeLayer_ui;
            self._closeWidgetName = "btnConfirm";
        };
        __egretProto__.setNoticeInfo = function (notice) {
            var self = this;
            var title = notice[uw.dsConsts.NoticeEntity.title];
            var content = notice[uw.dsConsts.NoticeEntity.content];
            var titleWidget = self.getWidgetByName("title");
            titleWidget.setText(title);
            titleWidget.enableStroke(mo.c3b(189, 20, 1), 3);
            var noticeTextContainer = self.getWidgetByName("noticeTextContainer");
            var noticeText = self.getWidgetByName("noticeText");
            noticeText.setAutoSizeHeight(true);
            noticeText.setOption({
                value: content,
                fontSize: 58,
                vAlign: mo.ALIGN_V_TOP
            });
            var size = noticeText.getSize();
            noticeTextContainer.setInnerContainerSize(mo.size(size.width, size.height));
        };
        NoticeLayer.showNotice = function (serverId, ignoreShowed) {
            uw.NoticeDataCtrl.initByServer();
            if (serverId == null)
                serverId = 0;
            var self = this, layer;
            if (self.hasGotNotice && !ignoreShowed)
                return;
            uw.noticeDataCtrl.getNewOneByServerId(serverId, function (noticeData) {
                if (noticeData) {
                    self.hasGotNotice = true;
                    var id = noticeData[uw.dsConsts.NoticeEntity.id];
                    var updateTime = noticeData[uw.dsConsts.NoticeEntity.updateTime];
                    updateTime = new Date(updateTime || "2015-01-01");
                    updateTime = updateTime.getTime();
                    var noticeTime = mo.getLocalStorageItem("noticeTime");
                    if (ignoreShowed || !noticeTime || noticeTime != updateTime) {
                        mo.setLocalStorageItem("noticeTime", updateTime);
                        layer = uw.NoticeLayer.create();
                        layer.setNoticeInfo(noticeData);
                        layer.show();
                    }
                }
            }, self);
        };
        NoticeLayer.__className = "NoticeLayer";
        NoticeLayer.hasGotNotice = false;
        return NoticeLayer;
    })(mo.UIModalLayer);
    uw.NoticeLayer = NoticeLayer;
    NoticeLayer.prototype.__class__ = "uw.NoticeLayer";
})(uw || (uw = {}));
