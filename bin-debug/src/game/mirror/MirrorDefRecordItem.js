/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MirrorDefRecordItem = (function (_super) {
        __extends(MirrorDefRecordItem, _super);
        function MirrorDefRecordItem() {
            _super.call(this);
            this._btnDelegate = null;
            this._info = null;
            this._headCtrl = null;
        }
        var __egretProto__ = MirrorDefRecordItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiMirrorDefRecordItem_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._headCtrl = uw.UIHeadIconCtrl.create(self.getWidgetByName(self.__class.PANEL_HEAD));
            self.onClickByName(self.__class.BTN_REWARD, self._onGetRewardBtnClick, self);
        };
        __egretProto__.setBtnDelegate = function (delegate) {
            this._btnDelegate = delegate;
        };
        __egretProto__.resetByData = function (data) {
            var self = this;
            self._info = data;
            self.setInfoByName(self.__class.LABEL_NAME, data.name);
            self.setInfoByName(self.__class.LABEL_TIME, mo.getBetweenTimeString(data.time, null));
            self._headCtrl.resetByData(data.iconId, data.lvl, 1);
            var state = data.state;
            self.setInfoByName(self.__class.IMG_RESULT, state > 0 ? res.ui_panel.icon_win_png : res.ui_panel.icon_lose_png);
            self.setVisibleByName(self.__class.BTN_REWARD, state == 1);
            self.setVisibleByName(self.__class.BTN_REPLY, false);
        };
        __egretProto__.getInfo = function () {
            return this._info;
        };
        __egretProto__._onGetRewardBtnClick = function () {
            var self = this;
            if (self._btnDelegate) {
                self._btnDelegate.showRewardDlg(self);
            }
        };
        MirrorDefRecordItem.__className = "MirrorDefRecordItem";
        MirrorDefRecordItem.PANEL_HEAD = "panel_head";
        MirrorDefRecordItem.LABEL_NAME = "label_name";
        MirrorDefRecordItem.LABEL_TIME = "label_time";
        MirrorDefRecordItem.BTN_REWARD = "btnReward";
        MirrorDefRecordItem.BTN_REPLY = "btnReply";
        MirrorDefRecordItem.IMG_RESULT = "img_result";
        return MirrorDefRecordItem;
    })(mo.GridViewCell);
    uw.MirrorDefRecordItem = MirrorDefRecordItem;
    MirrorDefRecordItem.prototype.__class__ = "uw.MirrorDefRecordItem";
})(uw || (uw = {}));
