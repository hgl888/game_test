var uw;
(function (uw) {
    var ArenaHighestRecordDlg = (function (_super) {
        __extends(ArenaHighestRecordDlg, _super);
        function ArenaHighestRecordDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ArenaHighestRecordDlg.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaHighestRecordDlg_ui;
            self._closeOutSide = false; //这里应该是点击【领取】才关闭，所以这个值要设置成false
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            var titleWidget = self.getWidgetByName("title");
            uw.UpArmatureWithBegin.play(titleWidget, res.cca_ui.towerHighest, null, function () {
            }, self);
            var data = uw.arenaDataCtrl.getHighRankData();
            self.setInfoByName("highestRank", data[0]);
            self.formatByName("curRank", data[1]);
            self.formatByName("changedRank", data[0] - data[1]);
            self.setInfoByName("diamond", data[2]);
            uw.setDiamondColor(self, "diamond");
            self.onClickByName("btnGet", self.getDiamond, self);
        };
        __egretProto__.getDiamond = function () {
            uw.arenaDataCtrl.handleHighRankData();
            this.close();
        };
        ArenaHighestRecordDlg.__className = "ArenaHighestRecordDlg";
        return ArenaHighestRecordDlg;
    })(mo.Dlg);
    uw.ArenaHighestRecordDlg = ArenaHighestRecordDlg;
    ArenaHighestRecordDlg.prototype.__class__ = "uw.ArenaHighestRecordDlg";
})(uw || (uw = {}));
