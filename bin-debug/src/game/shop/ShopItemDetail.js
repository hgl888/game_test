/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ShopItemDetail = (function (_super) {
        __extends(ShopItemDetail, _super);
        function ShopItemDetail() {
            _super.apply(this, arguments);
            //@impl IItemInfoCommonApi begin
            this.lbItemUse = mo.UIText;
            this.panelDesc = mo.UIPanel;
            this._iconCtrl = null;
        }
        var __egretProto__ = ShopItemDetail.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiShopItemDetail_ui;
        };
        __egretProto__.init = function (info) {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self._initItemInfoUI();
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_ICON));
            self.onClickByName(clazz.BTN_CONFIRM, self.menuConfirm, this);
            //移除数量选择器
            self.getWidgetByName("numMonitor").removeFromParent(true);
            //注册监听
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.gold.toString(), self._refresh);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.diamond.toString(), self._refresh);
            if (info)
                self.resetByData(info);
        };
        __egretProto__._refresh = function () {
            var self = this;
            if (self._info)
                self.resetByData(self._info);
        };
        __egretProto__.resetByData = function (info) {
            var self = this, clazz = self.__class;
            self._info = info;
            var itemId = info.itemId;
            var itemNum = info.itemNum;
            var unitId = info.unitId;
            var price = info.price;
            var itemCount = uw.userDataCtrl.getItemNum(itemId);
            var itemData = mo.getJSONWithFileNameAndID(uw.cfg_t_item, itemId);
            var name = itemData[uw.t_item_name], desc = itemData[uw.t_item_explain], useTxt = itemData[uw.t_item_useTxt];
            self.setInfoByName(clazz.LABEL_ITEMNAME, name);
            self.setColorByName(clazz.LABEL_ITEMNAME, uw.getItemColorByTempId(itemId));
            // 设置拥有数
            var str;
            str = mo.formatStr("拥有[ubb color=#FFAF32] %s [/ubb]件", itemCount);
            self.setInfoByName("owned", { value: str, fontSize: 55 });
            //设置用途和描述
            self._setUseAndDesc(useTxt, desc);
            var costIcon = resHelper.getUIIconPath(unitId);
            self.setInfoByName(clazz.IMG_COSTICON, costIcon);
            self._iconCtrl.resetByData(itemId);
            str = mo.formatStr("[ubb]购买[/ubb][ubb color=#FFAF32] %s [/ubb][ubb]件:[/ubb]", itemNum);
            self.setInfoByName(clazz.PANEL_COUNTTOSALE, { value: str, fontSize: 55 });
            var ownCostUnitNum = uw.userDataCtrl.getItemNum(unitId);
            self.setInfoByName(clazz.LABEL_COST, price);
            var costWidget = self.getWidgetByName(clazz.LABEL_COST);
            if (unitId == uw.c_prop.spItemIdKey.diamond) {
                uw.userDataCtrl.setDiamondTxt(costWidget, price);
            }
            else if (unitId == uw.c_prop.spItemIdKey.gold) {
                uw.userDataCtrl.setGoldTxt(costWidget, price);
            }
            else {
                var color = ownCostUnitNum < price ? cc.c3b(255, 0, 0) : cc.c3b(255, 202, 109);
                costWidget.setColor(color);
            }
            return self;
        };
        __egretProto__.menuConfirm = function (sender) {
            var self = this;
            uw.shopDataCtrl.buy(self._info.type, self._info.index, 1, function () {
                self._info.isSold = 1;
                self.close();
            }, self);
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
        ShopItemDetail.__className = "ShopItemDetail";
        ShopItemDetail.PANEL_ICON = "panel_icon";
        ShopItemDetail.PANEL_COUNTTOSALE = "panel_countToSale";
        ShopItemDetail.LABEL_ITEMNAME = "label_itemName";
        ShopItemDetail.LABEL_COST = "label_cost";
        ShopItemDetail.IMG_COSTICON = "img_costIcon";
        ShopItemDetail.BTN_CONFIRM = "btn_confirm";
        ShopItemDetail.ITEM_ICON = "panel_icon"; //物品ICON
        ShopItemDetail.LABEL_ITEM_NAME = "label_itemName"; //物品名称
        ShopItemDetail.LABEL_ITEM_USE = "label_item_use"; //用途描述
        ShopItemDetail.LABEL_ITEM_DESC = "label_item_desc"; //可选描述
        ShopItemDetail.LABEL_HERONAME = "label_heroName"; // 秘术名称
        ShopItemDetail.PANEL_ITEM_DESC = "panel_desc";
        ShopItemDetail.PANEL_ITEM_INFO = "panel_center";
        ShopItemDetail.PANEL_ITEM_OWN_INFO = "owned";
        ShopItemDetail.PANEL_EQUIP_PROP_LIST = "panel_equip_prop";
        return ShopItemDetail;
    })(mo.UIModalLayer);
    uw.ShopItemDetail = ShopItemDetail;
    ShopItemDetail.prototype.__class__ = "uw.ShopItemDetail";
})(uw || (uw = {}));
