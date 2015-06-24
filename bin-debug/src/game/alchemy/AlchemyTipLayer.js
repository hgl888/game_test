/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var AlchemyTipLayer = (function (_super) {
        __extends(AlchemyTipLayer, _super);
        function AlchemyTipLayer() {
            _super.apply(this, arguments);
            this._count = 3;
        }
        var __egretProto__ = AlchemyTipLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiAlchemyTipLayer_ui;
            self.blurMaskEnabled = false;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self.onClickByName("btnCancel", self.menuCancel, self);
            self.onClickByName("btnConfirm", self.menuConfirm, self);
            var reNum = uw.userDataCtrl.getBuyGoldReNum();
            if (reNum <= 3)
                self._count = reNum;
            self.formatByName("title", self._count);
            var buyGoldCost = uw.userDataCtrl.getBuyGoldCost(self._count);
            self.setInfoByName("diamondCount", buyGoldCost[0]);
            self.setInfoByName("goldCount", buyGoldCost[1]);
            uw.setDiamondColor(self, "diamondCount");
            uw.setGoldColor(self, "goldCount");
        };
        __egretProto__.menuCancel = function () {
            this.close();
        };
        __egretProto__.menuConfirm = function () {
            var self = this;
            uw.userDataCtrl.buyGold(self._count, self.closeMy, self);
        };
        __egretProto__.closeMy = function (resultArr) {
            var self = this;
            self.removeFromParent(true);
            if (self._onCloseFunc) {
                self._onCloseFunc.call(self._onCloseTarget, resultArr);
            }
        };
        AlchemyTipLayer.__className = "AlchemyTipLayer";
        return AlchemyTipLayer;
    })(mo.Dlg);
    uw.AlchemyTipLayer = AlchemyTipLayer;
    AlchemyTipLayer.prototype.__class__ = "uw.AlchemyTipLayer";
})(uw || (uw = {}));
