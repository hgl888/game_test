/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ForgeChooseHeroDlg = (function (_super) {
        __extends(ForgeChooseHeroDlg, _super);
        function ForgeChooseHeroDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeChooseHeroDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiChooseHero_ui;
            self._closeOutSide = false;
        };
        __egretProto__.init = function (defaultChoosed) {
            var self = this;
            _super.prototype.init.call(this);
            self._curChoosed = defaultChoosed;
            self._dataList = uw.userDataCtrl.getHeroDataCtrlList();
            var gridScrollView = self._createGridScrollView("hero_list", uw.ForgeChooseCell, 5, self._onItemCellDataSource);
            gridScrollView.setBounceEnabled(true);
            // 排序
            uw.userDataCtrl.updateHeroSortOption();
            var HeroDataCtrl = uw.HeroDataCtrl;
            var sQuality = HeroDataCtrl.SORT_QUALITY;
            var sLvl = HeroDataCtrl.SORT_LVL;
            var sTempId = HeroDataCtrl.SORT_TEMP_ID;
            var sHasExc = HeroDataCtrl.SORT_EXC_PUT_ON;
            var sortFunc = mo.sortOption.bind({ list: [sHasExc, sLvl, sQuality, sTempId] });
            self._dataList = self._dataList.sort(sortFunc);
            gridScrollView.setTotalCount(self._dataList.length);
        };
        __egretProto__.scrollToItem = function (heroTid) {
            var self = this;
            var cols = 5;
            var visualRowCount = 4;
            var totalRow = Math.ceil(self._dataList.length / cols);
            for (var i = 0, li = self._dataList.length; i < li; i++) {
                if (self._dataList[i].tid == heroTid) {
                    var row = Math.ceil(i / cols);
                    if (row >= visualRowCount) {
                        self._gridScrollView.jumpToPercentVertical((row - (visualRowCount - 1)) / (totalRow - visualRowCount) * 100);
                    }
                    else {
                        self._gridScrollView.jumpToPercentVertical(0);
                    }
                    self._gridScrollView.refresh();
                    break;
                }
            }
        };
        __egretProto__._onCellClick = function (sender) {
            var self = this;
            var heroCtrl = sender.getDataCtrl();
            if (heroCtrl[uw.HeroDataCtrl.SORT_EXC_PUT_ON]) {
                _super.prototype._onCellClick.call(this, sender);
            }
            else {
                mo.showMsg(uw.id_c_msgCode.noExclusive);
            }
        };
        ForgeChooseHeroDlg.__className = "ForgeChooseHeroDlg";
        return ForgeChooseHeroDlg;
    })(uw.ForgeChooseDlg);
    uw.ForgeChooseHeroDlg = ForgeChooseHeroDlg;
    ForgeChooseHeroDlg.prototype.__class__ = "uw.ForgeChooseHeroDlg";
})(uw || (uw = {}));
