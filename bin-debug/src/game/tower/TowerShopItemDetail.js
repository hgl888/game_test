/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var TowerShopItemDetail = (function (_super) {
        __extends(TowerShopItemDetail, _super);
        function TowerShopItemDetail(info) {
            _super.call(this);
            this.PANEL_COUNTTOSALE = "panel_countToSale";
            this.LABEL_COST = "label_cost";
            this.IMG_COSTICON = "img_costIcon";
            this.BTN_CONFIRM = "btn_confirm";
            this._info = null;
            this._saleCount = 1;
            //@impl IItemInfoCommonApi begin
            this.lbItemUse = mo.UIText;
            this.panelDesc = mo.UIPanel;
            this._iconCtrl = null;
            this._info = info;
        }
        var __egretProto__ = TowerShopItemDetail.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiShopItemDetail_ui;
        };
        __egretProto__.init = function (info) {
            _super.prototype.init.call(this);
            var self = this;
            self._info = info;
            var itemId = info.itemId;
            var unitId = info.unitId;
            var itemCount = uw.userDataCtrl.getItemNum(itemId);
            var itemData = mo.getJSONWithFileNameAndID(uw.cfg_t_item, itemId);
            var name = itemData[uw.t_item_name], desc = itemData[uw.t_item_explain], useTxt = itemData[uw.t_item_useTxt];
            self._initItemInfoUI();
            //设置ICON
            self._setItemIcon(itemId);
            // 设置名称
            self._setItemName(itemId, name);
            // 设置拥有数
            self._setItemOwned(itemCount);
            //设置用途和描述
            self._setUseAndDesc(useTxt, desc);
            self._updateUI();
            //消耗的单位
            var costIcon = resHelper.getUIIconPath(unitId);
            self.setInfoByName(self.IMG_COSTICON, costIcon);
            //数量选择器
            var numMonitor = uw.NumMonitorCtrl.create(self.getWidgetByName("numMonitor"), 99);
            numMonitor.onNumChangedEvent(self._updateTotalCost, self);
            self.onClickByName(self.BTN_CONFIRM, self.menuConfirm, this);
        };
        __egretProto__.menuConfirm = function () {
            var self = this;
            uw.shopDataCtrl.buy(uw.c_prop.shopTypeKey.tower, self._info.index, self._saleCount, self.close, self);
        };
        __egretProto__._updateUI = function () {
            var self = this;
            var str = mo.formatStr("[ubb]购买[/ubb][ubb color=#FFAF32] %s [/ubb][ubb]件:[/ubb]", self._saleCount);
            self.setInfoByName(self.PANEL_COUNTTOSALE, { value: str, fontSize: 55 });
            var ownCostUnitNum = uw.userDataCtrl.getItemNum(self._info.unitId);
            var totalCost = self._saleCount * self._info.price;
            var isEnough = ownCostUnitNum >= totalCost;
            var color = isEnough ? cc.c3b(225, 225, 225) : cc.c3b(255, 0, 0);
            self.setColorByName(self.LABEL_COST, color);
            self.setGrayByName(self.BTN_CONFIRM, !isEnough);
            self.setInfoByName(self.LABEL_COST, totalCost);
        };
        __egretProto__._updateTotalCost = function (num) {
            var self = this;
            self._saleCount = num;
            self._updateUI();
            if (num >= 99) {
                mo.showMsg(uw.id_c_msgCode.buyLimitNow);
            }
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
        TowerShopItemDetail.__className = "TowerShopItemDetail";
        //@impl IItemInfoCommonApi begin
        TowerShopItemDetail.ITEM_ICON = "panel_icon"; //物品ICON
        TowerShopItemDetail.LABEL_ITEM_NAME = "label_itemName"; //物品名称
        TowerShopItemDetail.LABEL_ITEM_USE = "label_item_use"; //用途描述
        TowerShopItemDetail.LABEL_ITEM_DESC = "label_item_desc"; //可选描述
        TowerShopItemDetail.LABEL_HERONAME = "label_heroName"; // 秘术名称
        TowerShopItemDetail.PANEL_ITEM_DESC = "panel_desc";
        TowerShopItemDetail.PANEL_ITEM_INFO = "panel_center";
        TowerShopItemDetail.PANEL_ITEM_OWN_INFO = "owned";
        TowerShopItemDetail.PANEL_EQUIP_PROP_LIST = "panel_equip_prop";
        return TowerShopItemDetail;
    })(mo.UIModalLayer);
    uw.TowerShopItemDetail = TowerShopItemDetail;
    TowerShopItemDetail.prototype.__class__ = "uw.TowerShopItemDetail";
})(uw || (uw = {}));
