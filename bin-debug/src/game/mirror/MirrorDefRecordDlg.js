/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MirrorDefRecordDlg = (function (_super) {
        __extends(MirrorDefRecordDlg, _super);
        function MirrorDefRecordDlg() {
            _super.call(this);
            this._rewardDlg = null;
            this._curCell = null;
        }
        var __egretProto__ = MirrorDefRecordDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiMirrorDefRecordDlg_ui;
        };
        __egretProto__.init = function (type) {
            _super.prototype.init.call(this);
            var self = this;
            self._gridScrollView = self._createGridScrollView(self.__class.PANEL_ITEMLIST, uw.MirrorDefRecordItem, 1, self._onItemCellDataSource, true);
            uw.mirrorDataCtrl.getDefenceHistory(self._initWithData, self);
            self._rewardDlg = uw.MirrorRewardDlg.getInstance();
            self._rewardDlg.setDelegate(self);
        };
        __egretProto__._initWithData = function (data) {
            this._data = data;
            this.setVisibleByName(this.__class.IMG_NO_RECORD, data.length == 0);
            this.refreshGrid();
        };
        __egretProto__.refreshGrid = function () {
            this._gridScrollView.setTotalCount(this._data.length);
            this._gridScrollView.jumpToTop();
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            cell.setBtnDelegate(self);
            cell.resetByData(self._data[index]);
        };
        __egretProto__.showRewardDlg = function (cell) {
            var self = this;
            self._curCell = cell;
            self._rewardDlg.show();
        };
        __egretProto__.getRewards = function () {
            var self = this;
            var info = self._curCell.getInfo();
            uw.mirrorDataCtrl.getDefenceReward(info.time, function () {
                self._rewardDlg.close();
                self._curCell.setVisibleByName(uw.MirrorDefRecordItem.BTN_REWARD, false);
                self._curCell = null;
                // 提示获得体力
                var KEY = uw.dsConsts.UseItemInfo;
                var gains = {};
                gains[KEY.items] = {};
                gains[KEY.items][uw.c_prop.spItemIdKey.strength] = uw.mirrorRewardStrength;
                uw.showGainTips(gains);
            }, self);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            if (self._rewardDlg) {
                uw.MirrorRewardDlg.purgeInstance();
                self._rewardDlg = null;
            }
        };
        MirrorDefRecordDlg.__className = "MirrorDefRecordDlg";
        MirrorDefRecordDlg.PANEL_ITEMLIST = "itemList";
        MirrorDefRecordDlg.LABEL_TITLE = "label_title";
        MirrorDefRecordDlg.IMG_NO_RECORD = "noRecord";
        return MirrorDefRecordDlg;
    })(mo.UIModalLayer);
    uw.MirrorDefRecordDlg = MirrorDefRecordDlg;
    MirrorDefRecordDlg.prototype.__class__ = "uw.MirrorDefRecordDlg";
})(uw || (uw = {}));
