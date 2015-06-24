/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var MirrorAtkRankItemCell = (function (_super) {
        __extends(MirrorAtkRankItemCell, _super);
        function MirrorAtkRankItemCell() {
            _super.call(this);
            this._clickWidgetName = "root";
            this._useClickEffect = true;
            this._info = null;
        }
        var __egretProto__ = MirrorAtkRankItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiMirrorAtkRankItem_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._headCtrl = uw.UIHeadIconCtrl.create(self.getWidgetByName(self.__class.PANEL_HEAD));
        };
        __egretProto__.resetByData = function (info) {
            var self = this;
            self._info = info;
            if (info == -1) {
                self.setVisible(false);
                self.setTouchEnabledByName(self._clickWidgetName, false);
            }
            else {
                self.setVisible(true);
                self.setTouchEnabledByName(self._clickWidgetName, true);
                self.setInfoByName(self.__class.LABEL_NAME, info.name);
                self._headCtrl.resetByData(info.iconId, info.lvl);
                // 当前累计的金币
                self.formatByName(self.__class.LABEL_GOLD, info.totalGain);
                self.setInfoByName(self.__class.LABEL_ZL, info.combatEff);
                self.setVisibleByName(self.__class.IMG_FLAG, false);
                // 是自己的话，要换上高亮图
                var isSelf = uw.userDataCtrl.getId() == info.userId;
                self.getWidgetByName(self.__class.IMG_BG).bgTexture = isSelf ? res.ui_panel.blk9_gold1_png : res.ui_panel.blk9_gold_png;
                if (isSelf)
                    return;
                // 是否被锁定
                if (info.isLocked) {
                    self.setVisibleByName(self.__class.IMG_FLAG, true);
                    self.setInfoByName(self.__class.IMG_FLAG, res.ui_mirrorworld.ntc_inabattle_png);
                    return;
                }
                // 是否可挑战
                var opt = uw.mirrorDataCtrl.getChallengeOpt(info);
                if (opt.canChallenge) {
                    self.setVisibleByName(self.__class.IMG_FLAG, true);
                    self.setInfoByName(self.__class.IMG_FLAG, res.ui_mirrorworld.ntc_challengable_png);
                }
            }
            self.setTouchEnabledByName(self.__class.IMG_BG, false);
        };
        __egretProto__.getInfo = function () {
            return this._info;
        };
        MirrorAtkRankItemCell.__className = "MirrorAtkRankItemCell";
        MirrorAtkRankItemCell.PANEL_HEAD = "panel_head";
        MirrorAtkRankItemCell.LABEL_NAME = "label_name"; // 名字
        MirrorAtkRankItemCell.LABEL_GOLD = "label_gold"; //金币
        MirrorAtkRankItemCell.LABEL_ZL = "label_zl"; //战力
        MirrorAtkRankItemCell.IMG_FLAG = "img_flag"; // 战斗中
        MirrorAtkRankItemCell.IMG_BG = "img_bg"; // 背景
        return MirrorAtkRankItemCell;
    })(mo.GridViewCell);
    uw.MirrorAtkRankItemCell = MirrorAtkRankItemCell;
    MirrorAtkRankItemCell.prototype.__class__ = "uw.MirrorAtkRankItemCell";
})(uw || (uw = {}));
