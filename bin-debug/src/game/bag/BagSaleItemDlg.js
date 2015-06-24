/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    uw.__import;
    var BagSaleItemDlg = (function (_super) {
        __extends(BagSaleItemDlg, _super);
        function BagSaleItemDlg() {
            _super.apply(this, arguments);
            //@impl IItemInfoCommonApi begin
            this.lbItemUse = mo.UIText;
            this.panelDesc = mo.UIPanel;
            this._iconCtrl = null;
        }
        var __egretProto__ = BagSaleItemDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiBagSaleItemDlg_ui;
            self._saleCount = 1;
            self._salePrice = 0;
            self._dataCtrl = null;
            self._numMonitor = null;
        };
        //@override
        __egretProto__.init = function (dataCtrl) {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self._dataCtrl = dataCtrl;
            self._salePrice = dataCtrl.getTempValue(uw.t_item_sellPrice);
            self._updateTotalGain(self._saleCount);
            self._initItemInfoUI();
            // 设置icon
            self._setItemIcon(self._dataCtrl);
            // 基本信息
            self._setItemName(dataCtrl.tempId, dataCtrl.name);
            self.setInfoByName(clazz.LABEL_PRICE, self._salePrice);
            uw.setGoldColor(self, clazz.LABEL_PRICE);
            uw.setGoldColor(self, clazz.LABEL_TOTAL);
            // 设置拥有数
            var str;
            str = mo.formatStr("拥有[ubb color=#FFAF32] %s [/ubb]件", dataCtrl.count);
            self.setInfoByName("owned", { value: str, fontSize: 56 });
            self.onClickByName(clazz.BTN_OK, self._onOK, self);
            self._numMonitor = uw.NumMonitorCtrl.create(self.getWidgetByName("numMonitor"), dataCtrl.count);
            self._numMonitor.onNumChangedEvent(self._updateTotalGain, self);
        };
        __egretProto__._onOK = function () {
            var self = this;
            self._dataCtrl.sell(self._saleCount, self.close, self);
        };
        __egretProto__._updateTotalGain = function (num) {
            var self = this, clazz = self.__class;
            self._saleCount = num;
            self.setInfoByName(clazz.LABEL_TOTAL, self._saleCount * self._salePrice);
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            self._dataCtrl = null;
            self._numMonitor = null;
            self._iconCtrl = null;
        };
        __egretProto__._initItemInfoUI = function () {
            var self = this, clazz = self.__class;
            //设置用途文本框为高度自适应
            var lbItemUse = self.lbItemUse = self.getWidgetByName(clazz.LABEL_ITEM_USE);
            if (lbItemUse)
                lbItemUse.setAutoSizeHeight(true);
            var lbItemDesc = self.getWidgetByName(clazz.LABEL_ITEM_DESC);
            if (lbItemDesc)
                lbItemDesc.setAutoSizeHeight(true);
            self.panelDesc = self.getWidgetByName(clazz.PANEL_ITEM_DESC);
            if (self.getWidgetByName(clazz.ITEM_ICON)) {
                self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.ITEM_ICON));
            }
            if (self.getWidgetByName(clazz.PANEL_EQUIP_PROP_LIST)) {
                self._propCtrl = uw.EquipPropGridCtrl.create(self.getWidgetByName(clazz.PANEL_EQUIP_PROP_LIST));
            }
        };
        // 设置穿戴等级
        __egretProto__._setWearLimitLv = function (lvl) {
            var self = this, clazz = self.__class;
            var str = mo.formatStr("穿戴等级:[ubb color=#FFAF32] %s [/ubb]", lvl);
            self.setInfoByName(clazz.PANEL_ITEM_OWN_INFO, { value: str, fontSize: 55 });
        };
        // 设置拥有数
        __egretProto__._setItemOwned = function (count) {
            var self = this, clazz = self.__class;
            var str = mo.formatStr("拥有[ubb color=#FFAF32] %s [/ubb]件", count);
            self.setInfoByName(clazz.PANEL_ITEM_OWN_INFO, { value: str, fontSize: 55 });
        };
        // 设置所属英雄
        __egretProto__._setBelongToHeroName = function (heroName) {
            var self = this, clazz = self.__class;
            var str = mo.formatStr("英雄: [ubb color=#FFAF32]%s[/ubb]", heroName);
            self.setInfoByName(clazz.PANEL_ITEM_OWN_INFO, { value: str, fontSize: 55 });
        };
        __egretProto__._setItemName = function (tempId, name) {
            var self = this;
            var clazz = self.__class;
            self.setInfoByName(clazz.LABEL_ITEM_NAME, { value: name, color: uw.getItemColorByTempId(tempId) });
        };
        __egretProto__._setEquipProp = function (equipCtrl) {
            var self = this, clazz = self.__class;
            var panelDesc = self.panelDesc;
            //属性列表
            self.setVisibleByName(clazz.PANEL_EQUIP_PROP_LIST, true);
            self._propCtrl.resetByData(equipCtrl.getProps());
            //自适应底框
            panelDesc.setSize(panelDesc.getSize().width, self._propCtrl.getSize().height + 50);
            self.doLayoutByName(clazz.PANEL_ITEM_INFO);
        };
        __egretProto__._setEquipProp2 = function (equipCtrl) {
            var self = this, clazz = self.__class;
            var panelDesc = self.panelDesc;
            //属性列表
            self.setVisibleByName(clazz.PANEL_EQUIP_PROP_LIST, true);
            self._propCtrl.resetByData(equipCtrl.getProps());
            //自适应底框
            panelDesc.setSize(panelDesc.getSize().width, self.getWidgetByName(clazz.PANEL_ITEM_INFO).getSize().height);
            self.doLayoutByName(clazz.PANEL_ITEM_INFO);
        };
        __egretProto__._setUseAndDesc = function (useTxt, desc) {
            var self = this, clazz = self.__class;
            var lbItemUse = self.lbItemUse;
            var panelDesc = self.panelDesc;
            //设置用途
            lbItemUse.setVisible(true);
            lbItemUse.setOption(useTxt == null ? "空" : useTxt);
            //设置描述
            self.setVisibleByName(clazz.LABEL_ITEM_DESC, desc != null);
            if (desc != null) {
                self.setInfoByName(clazz.LABEL_ITEM_DESC, desc);
            }
            //自适应底框
            panelDesc.setSize(panelDesc.getSize().width, lbItemUse.getSize().height + 100);
            self.doLayoutByName(clazz.PANEL_ITEM_INFO);
            self.setVisibleByName(clazz.PANEL_EQUIP_PROP_LIST, false);
        };
        __egretProto__._setItemIcon = function (dataCtrl) {
            var self = this;
            self._iconCtrl.resetByData(dataCtrl);
            self._iconCtrl.setVisibleByName(self._iconCtrl.__class.LABEL_COUNT, false);
        };
        BagSaleItemDlg.__className = "BagSaleItemDlg";
        BagSaleItemDlg.ITEM_ICON = "panel_icon"; //物品ICON
        BagSaleItemDlg.LABEL_ITEM_NAME = "label_itemName"; //物品名称
        BagSaleItemDlg.LABEL_ITEM_USE = "label_item_use"; //用途描述
        BagSaleItemDlg.LABEL_ITEM_DESC = "label_item_desc"; //可选描述
        BagSaleItemDlg.LABEL_HERONAME = "label_heroName"; // 秘术名称
        BagSaleItemDlg.PANEL_ITEM_DESC = "panel_desc";
        BagSaleItemDlg.PANEL_ITEM_INFO = "panel_center";
        BagSaleItemDlg.PANEL_ITEM_OWN_INFO = "owned";
        BagSaleItemDlg.PANEL_EQUIP_PROP_LIST = "panel_equip_prop";
        BagSaleItemDlg.LABEL_PRICE = "price";
        BagSaleItemDlg.LABEL_TOTAL = "total";
        BagSaleItemDlg.BTN_OK = "btnOK";
        return BagSaleItemDlg;
    })(mo.UIModalLayer);
    uw.BagSaleItemDlg = BagSaleItemDlg;
    BagSaleItemDlg.prototype.__class__ = "uw.BagSaleItemDlg";
})(uw || (uw = {}));
