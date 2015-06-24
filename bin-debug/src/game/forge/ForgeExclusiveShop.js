/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ForgeExclusiveShop = (function (_super) {
        __extends(ForgeExclusiveShop, _super);
        function ForgeExclusiveShop() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeExclusiveShop.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiForgeExclusiveShop_ui;
        };
        __egretProto__.init = function (defaultHeroCtrl) {
            var self = this;
            _super.prototype.init.call(this);
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.EXACT_FIT);
            self._createGridScrollView("itemList", uw.ForgeShopItem, 2, this._onItemCellDataSource, true);
            self._initWithData();
        };
        __egretProto__._initWithData = function () {
            var owned = uw.userDataCtrl.getHeroDataCtrlList();
            var notOwned = uw.userDataCtrl.getNotOwnHeroDataCtrlList();
            var allHero = owned.concat(notOwned);
            var data = [];
            for (var i = 0, li = allHero.length; i < li; i++) {
                var heroCtrl = allHero[i];
                var exclusive = heroCtrl.getEquipDataCtrlByPart(uw.c_prop.equipPartKey.exclusive);
                var exclusiveInBag = heroCtrl.getNotOnExclusiveEquipDataCtrl();
                // 未获得该专属 & 背包中没有该专属
                if (exclusive.isTempOnly && !exclusiveInBag) {
                    uw.log("-->");
                    var item = { equipDataCtrl: exclusive, heroDataCtrl: heroCtrl };
                    data.push(item);
                }
            }
            this._data = data;
            this._gridScrollView.setTotalCount(this._data.length);
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var item = this._data[index];
            cell.resetByData(item);
            cell.onClick(this._itemClick, this);
        };
        __egretProto__._itemClick = function (cell) {
            var self = this;
            var equipCtrl = cell.getEquipDataCtrl();
            var heroDataCtrl = cell.getHeroDataCtrl();
            var hasHero = !heroDataCtrl.isTempOnly;
            if (hasHero) {
                var dlg = uw.ForgeExchagneDlg.create(equipCtrl, heroDataCtrl);
                dlg.onClose(self._onExchangeDlgClose, self);
                dlg.show();
            }
            else {
                mo.showMsg(uw.id_c_msgCode.unGetHero);
            }
        };
        __egretProto__._onExchangeDlgClose = function (event) {
            var dlg = event.sender;
            if (dlg.exchangeSucc) {
                this._initWithData();
            }
        };
        ForgeExclusiveShop.__className = "ForgeExclusiveShop";
        return ForgeExclusiveShop;
    })(mo.DisplayLayer);
    uw.ForgeExclusiveShop = ForgeExclusiveShop;
    ForgeExclusiveShop.prototype.__class__ = "uw.ForgeExclusiveShop";
})(uw || (uw = {}));
