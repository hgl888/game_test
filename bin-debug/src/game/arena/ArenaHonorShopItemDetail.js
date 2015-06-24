/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaHonorShopItemDetail = (function (_super) {
        __extends(ArenaHonorShopItemDetail, _super);
        function ArenaHonorShopItemDetail() {
            _super.apply(this, arguments);
            //@impl IItemInfoCommonApi begin
            this.lbItemUse = mo.UIText;
            this.panelDesc = mo.UIPanel;
            this._iconCtrl = null;
        }
        var __egretProto__ = ArenaHonorShopItemDetail.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiShopItemDetail_ui;
        };
        __egretProto__.init = function (info) {
            _super.prototype.init.call(this);
            var self = this, clazz = self.__class;
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_ICON));
            self._initItemInfoUI();
            //移除数量选择器
            self.getWidgetByName("numMonitor").removeFromParent(true);
        };
        __egretProto__.menuConfirm = function (sender) {
            var self = this;
            uw.arenaDataCtrl.buyHonorShopItem(self._info.index, this.close, this);
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
            self.setInfoByName(self.__class.LABEL_ITEMNAME, name);
            self.setColorByName(self.__class.LABEL_ITEMNAME, uw.getItemColorByTempId(itemId));
            // 设置拥有数
            var str;
            str = mo.formatStr("拥有[ubb color=#FFAF32] %s [/ubb]件", itemCount);
            self.setInfoByName("owned", { value: str, fontSize: 56 });
            //设置用途和描述
            self._setUseAndDesc(useTxt, desc);
            var costIcon = resHelper.getUIIconPath(unitId);
            self.setInfoByName(self.__class.IMG_COSTICON, costIcon);
            self._iconCtrl.resetByData(itemId);
            str = mo.formatStr("[ubb]购买[/ubb][ubb color=#FFAF32] %s [/ubb][ubb]件:[/ubb]", itemNum);
            self.setInfoByName(self.__class.PANEL_COUNTTOSALE, { value: str, fontSize: 55 });
            var ownCostUnitNum = uw.userDataCtrl.getHonor();
            var isEnough = ownCostUnitNum >= price;
            var color = isEnough ? mo.c3b(225, 225, 225) : mo.c3b(255, 0, 0);
            self.setColorByName(self.__class.LABEL_COST, color);
            self.setInfoByName(self.__class.LABEL_COST, price);
            self.onClickByName(self.__class.BTN_CONFIRM, self.menuConfirm, this);
            self.setGrayByName(self.__class.BTN_CONFIRM, !isEnough);
            return self;
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
        ArenaHonorShopItemDetail.__className = "ArenaHonorShopItemDetail";
        ArenaHonorShopItemDetail.PANEL_ICON = "panel_icon";
        ArenaHonorShopItemDetail.LABEL_DESC = "label_desc";
        ArenaHonorShopItemDetail.PANEL_COUNTTOSALE = "panel_countToSale";
        ArenaHonorShopItemDetail.LABEL_ITEMNAME = "label_itemName";
        ArenaHonorShopItemDetail.LABEL_COST = "label_cost";
        ArenaHonorShopItemDetail.LABEL_OWNCOUNT = "label_ownCount";
        ArenaHonorShopItemDetail.IMG_COSTICON = "img_costIcon";
        ArenaHonorShopItemDetail.BTN_CONFIRM = "btn_confirm";
        ArenaHonorShopItemDetail.ITEM_ICON = "panel_icon"; //物品ICON
        ArenaHonorShopItemDetail.LABEL_ITEM_NAME = "label_itemName"; //物品名称
        ArenaHonorShopItemDetail.LABEL_ITEM_USE = "label_item_use"; //用途描述
        ArenaHonorShopItemDetail.LABEL_ITEM_DESC = "label_item_desc"; //可选描述
        ArenaHonorShopItemDetail.LABEL_HERONAME = "label_heroName"; // 秘术名称
        ArenaHonorShopItemDetail.PANEL_ITEM_DESC = "panel_desc";
        ArenaHonorShopItemDetail.PANEL_ITEM_INFO = "panel_center";
        ArenaHonorShopItemDetail.PANEL_ITEM_OWN_INFO = "owned";
        ArenaHonorShopItemDetail.PANEL_EQUIP_PROP_LIST = "panel_equip_prop";
        return ArenaHonorShopItemDetail;
    })(mo.UIModalLayer);
    uw.ArenaHonorShopItemDetail = ArenaHonorShopItemDetail;
    ArenaHonorShopItemDetail.prototype.__class__ = "uw.ArenaHonorShopItemDetail";
})(uw || (uw = {}));
