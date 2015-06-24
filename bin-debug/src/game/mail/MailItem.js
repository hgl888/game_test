/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MailItemCell = (function (_super) {
        __extends(MailItemCell, _super);
        function MailItemCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MailItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiMailItem_ui;
            self._clickWidgetName = "touch_panel";
            self._id = 0;
        };
        __egretProto__.resetByData = function (info) {
            var self = this;
            self._dataCtrl = uw.mailDataCtrl;
            self._id = info[uw.dsConsts.MailEntity.id];
            self._dataCtrl.registerByKey(self._dataCtrl.MAIL_INFO + self._id, self.resetInfo, self);
            self.resetInfo();
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            var self = this;
            self._dataCtrl.unregisterByKey(self._dataCtrl.MAIL_INFO + self._id, self.resetInfo, self);
        };
        __egretProto__.resetInfo = function () {
            var self = this;
            var data = self._dataCtrl.getInfoById(self._id);
            var mailInfo = uw.dsConsts.MailEntity;
            self.setInfoByName("sender", data[mailInfo.fromName]);
            self.setInfoByName("title", data[mailInfo.title]);
            self.setInfoByName("date", mo.getBetweenTimeString(data[mailInfo.addTime], null));
            self.setVisibleByName("attachment", !!data[mailInfo.items] && !data[mailInfo.isPicked]);
            self.showDiffBg(data[mailInfo.isRead]);
        };
        __egretProto__.getId = function () {
            return this._id;
        };
        __egretProto__.setRead = function () {
            var self = this;
            self._dataCtrl.setRead(self._id);
            self.showDiffBg(true);
        };
        __egretProto__.showDiffBg = function (isReaded) {
            var self = this;
            self.setVisibleByName("readed", isReaded);
            self.setVisibleByName("unread", !isReaded);
        };
        MailItemCell.__className = "MailItemCell";
        return MailItemCell;
    })(mo.GridViewCell);
    uw.MailItemCell = MailItemCell;
    MailItemCell.prototype.__class__ = "uw.MailItemCell";
})(uw || (uw = {}));
