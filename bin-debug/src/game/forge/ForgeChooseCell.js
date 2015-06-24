/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ForgeChooseCell = (function (_super) {
        __extends(ForgeChooseCell, _super);
        function ForgeChooseCell() {
            _super.call(this);
        }
        var __egretProto__ = ForgeChooseCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiForgeHeroIcon_ui;
            self._useClickEffect = true;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self._iconCtrl = uw.UIHeroIconCtrl.create(self.getWidgetByName(self.__class.PANEL_ICON));
        };
        __egretProto__.resetByData = function (dataCtrl) {
            var self = this;
            self._dataCtrl = dataCtrl;
            self._iconCtrl.resetByData(dataCtrl);
            self.setName("cell_heroTid_" + dataCtrl.tid);
            self.setInfoByName(self.__class.LABEL_LVL, "Lv." + dataCtrl.getLvl());
            self.setVisibleByName(self.__class.PANEL_MASK, !dataCtrl[uw.HeroDataCtrl.SORT_EXC_PUT_ON]);
        };
        __egretProto__.getDataCtrl = function () {
            return this._dataCtrl;
        };
        ForgeChooseCell.__className = "ForgeChooseCell";
        ForgeChooseCell.PANEL_ICON = "panel_icon";
        ForgeChooseCell.PANEL_MASK = "mask";
        ForgeChooseCell.LABEL_LVL = "lv";
        return ForgeChooseCell;
    })(mo.GridViewCell);
    uw.ForgeChooseCell = ForgeChooseCell;
    ForgeChooseCell.prototype.__class__ = "uw.ForgeChooseCell";
    var ForgeChooseDlg = (function (_super) {
        __extends(ForgeChooseDlg, _super);
        function ForgeChooseDlg() {
            _super.call(this);
        }
        var __egretProto__ = ForgeChooseDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiChooseHero_ui;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.getCurChoosed = function () {
            return this._curChoosed;
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var self = this;
            var dataCtrl = self._dataList[index];
            cell.resetByData(dataCtrl);
            cell.onClick(this._onCellClick, this);
        };
        __egretProto__._onCellClick = function (sender) {
            var self = this;
            self._curChoosed = sender.getDataCtrl();
            self.close();
        };
        ForgeChooseDlg.__className = "ForgeChooseDlg";
        return ForgeChooseDlg;
    })(mo.UIModalLayer);
    uw.ForgeChooseDlg = ForgeChooseDlg;
    ForgeChooseDlg.prototype.__class__ = "uw.ForgeChooseDlg";
})(uw || (uw = {}));
