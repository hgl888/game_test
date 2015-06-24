/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MirrorRewardDlg = (function (_super) {
        __extends(MirrorRewardDlg, _super);
        function MirrorRewardDlg() {
            _super.call(this);
        }
        var __egretProto__ = MirrorRewardDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiMirrorRewardDlg_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self.onClickByName(self.__class.BTN_GET, self._onGet, self);
            self.formatByName(self.__class.LABEL_NUM, uw.mirrorRewardStrength);
        };
        __egretProto__._onGet = function () {
            var self = this;
            if (self.getDelegate()) {
                self.getDelegate().getRewards();
            }
        };
        MirrorRewardDlg.__className = "MirrorRewardDlg";
        MirrorRewardDlg.BTN_GET = "btn_get"; // 领取奖励
        MirrorRewardDlg.LABEL_NUM = "label_num"; //数量
        return MirrorRewardDlg;
    })(mo.UIModalLayer);
    uw.MirrorRewardDlg = MirrorRewardDlg;
    MirrorRewardDlg.prototype.__class__ = "uw.MirrorRewardDlg";
})(uw || (uw = {}));
