/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var BagUseItemDlg = (function (_super) {
        __extends(BagUseItemDlg, _super);
        function BagUseItemDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BagUseItemDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiUseItemDlg_ui;
            self._heroList = null;
            self._itemCtrl = null;
            self.heroUseCountDict = {};
        };
        //@override
        __egretProto__.init = function (itemCtrl) {
            var self = this;
            _super.prototype.init.call(this);
            self._itemCtrl = itemCtrl;
            self._heroList = uw.userDataCtrl.getHeroDataCtrlList();
            // 排序
            var HeroDataCtrl = uw.HeroDataCtrl;
            var sLvl = HeroDataCtrl.SORT_LVL;
            var sCurExp = HeroDataCtrl.SORT_CUR_EXP;
            var sortFunc = mo.sortOption.bind({ list: [sLvl, sCurExp] });
            self._heroList.sort(sortFunc);
            var gridScrollView = self._gridScrollView = self._createGridScrollView("hero_list", uw.BagUseItemCell, 2, this._onItemCellDataSource);
            gridScrollView.bounceEnabled = true;
            gridScrollView.setTotalCount(self._heroList.length);
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var heroCtrl = this._heroList[index];
            cell.resetByData(heroCtrl);
            cell.setItemToUse(this._itemCtrl);
            cell.setDelegate(this);
        };
        BagUseItemDlg.__className = "BagUseItemDlg";
        return BagUseItemDlg;
    })(mo.UIModalLayer);
    uw.BagUseItemDlg = BagUseItemDlg;
    BagUseItemDlg.prototype.__class__ = "uw.BagUseItemDlg";
})(uw || (uw = {}));
