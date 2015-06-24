/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var ExchangeDlg = (function (_super) {
        __extends(ExchangeDlg, _super);
        function ExchangeDlg() {
            _super.apply(this, arguments);
            this._opt = null;
            this._exchangeType = null;
            this._info = null;
            this.needRefresh = false;
            this._buyCount = 1;
            //@impl IItemInfoCommonApi begin
            this.lbItemUse = mo.UIText;
            this.panelDesc = mo.UIPanel;
            this._iconCtrl = null;
        }
        var __egretProto__ = ExchangeDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiExchangeDlg_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this, clazz = self.__class;
            uw.UIMaterialIconCtrl.create();
            // 材料物品ICON
            self._itemIconCtrlMap = {};
            //材料列表Ctrl
            self._materialListCtrl = uw.UIMaterialListCtrl.create(self.getWidgetByName("panel_bottom"), 0.6);
            self._materialListCtrl.onItemClick(self._showDetail, self);
            self._initItemInfoUI();
            self._numMonitor = uw.NumMonitorCtrl.create(self.getWidgetByName("numMonitor"), 99);
            self._numMonitor.onNumChangedEvent(self._updateTotalCount, self);
            self.onClickByName(clazz.BTN_EXCHANGE, self._btnExchange, self);
            //监听背包物品数量变化
            self.registerClassByKey(uw.UserDataCtrl, uw.UserDataCtrl.ON_GET_BAG_ITEMS, self._onBagItemChanged);
        };
        __egretProto__._updateTotalCount = function (num) {
            var self = this;
            self._buyCount = num;
            self.needRefresh = true;
            self._refreshCost();
        };
        __egretProto__._refreshCost = function () {
            var self = this, clazz = self.__class;
            var info = self._info;
            var id = info[uw.c_exchange_id];
            var opt = self._opt = uw.exchangeDataCtrl.getExchangeOpt(id, self._buyCount);
            var stuffArr = opt.stuffArr;
            self._materialListCtrl.resetByData(stuffArr);
            // 设置按钮状态
            self.setVisibleByName(clazz.BTN_EXCHANGE, true);
            self.setVisibleByName(clazz.LABEL_MAXTIPS, false);
            var exchangeTypeKey = uw.c_prop.exchangeTypeKey;
            var isExchanged = uw.exchangeDataCtrl.getExchangeState(opt.exchangeId) == uw.ExchangeDataCtrl.EXCHANGED;
            if (self._exchangeType == exchangeTypeKey.daily) {
                self.setVisibleByName(clazz.BTN_EXCHANGE, !isExchanged);
                self.setVisibleByName(clazz.LABEL_MAXTIPS, isExchanged);
            }
            self.setGrayByName(clazz.BTN_EXCHANGE, !opt.isStuffEnough);
        };
        __egretProto__._btnExchange = function () {
            var self = this;
            var opt = self._opt;
            uw.exchangeDataCtrl.exchange(opt, function (useItemInfo) {
                uw.showGainTips(useItemInfo);
                self.needRefresh = true;
                self.close();
            }, self);
        };
        __egretProto__._showDetail = function (materialCtrl) {
            var dataCtrl = materialCtrl.getDataCtrl();
            uw.GainInfoDlg.getInstance().resetByData(dataCtrl.tempId).show();
        };
        __egretProto__._onBagItemChanged = function () {
            var self = this;
            self.resetByData(self._info, self._exchangeType);
            self.needRefresh = true;
        };
        __egretProto__.resetByData = function (info, exchangeType) {
            var self = this, clazz = self.__class;
            self._info = info;
            self.needRefresh = false;
            self._buyCount = 1;
            var id = info[uw.c_exchange_id];
            self._exchangeType = exchangeType;
            // 开启数量选择器
            if (exchangeType == uw.c_prop.exchangeTypeKey.darkStone) {
                self._numMonitor.setEnabled(true);
                self._numMonitor.resetSelf(99);
            }
            else {
                self._numMonitor.setEnabled(false);
            }
            var opt = self._opt = uw.exchangeDataCtrl.getExchangeOpt(id);
            var itemId = opt.itemId;
            self._iconCtrl.resetByData(itemId);
            self._setItemName(self._iconCtrl.dataCtrl.tempId, self._iconCtrl.dataCtrl.name);
            self.setVisibleByName(clazz.LABEL_ITEM_DESC, false);
            self.setVisibleByName(clazz.LABEL_ITEM_USE, true);
            self.setVisibleByName(clazz.PANEL_SECRET, false);
            //每日物品显示
            self.setVisibleByName(clazz.LABEL_EXCHANGECOUNT, exchangeType == uw.c_prop.exchangeTypeKey.daily);
            if (exchangeType == uw.c_prop.exchangeTypeKey.daily) {
                var opt = uw.exchangeDataCtrl.getExchangeOpt(info[uw.c_exchange_id]);
                self.setInfoByName(clazz.LABEL_EXCHANGECOUNT, {
                    value: mo.formatStr("[ubb]兑换数量：[/ubb][ubb color=#FFAF32]%s[/ubb]", opt.itemCount),
                    fontSize: 56
                });
            }
            //祝福和专属显示
            if (exchangeType == uw.c_prop.exchangeTypeKey.wish || exchangeType == uw.c_prop.exchangeTypeKey.exclusive) {
                self.setVisibleByName(clazz.LABEL_EXCHANGECOUNT, false);
                var t_itemEquip = mo.getJSONWithFileNameAndID(uw.cfg_t_itemEquip, itemId);
                self._setWearLimitLv(t_itemEquip[uw.t_itemEquip_needLvl]);
                var equipCtrl = uw.EquipDataCtrl.create(null, t_itemEquip);
                if (equipCtrl.isExclusive) {
                    //设置关联英雄
                    self.setVisibleByName(clazz.PANEL_SECRET, true);
                    self.setInfoByName(clazz.LABEL_HERONAME, equipCtrl.heroName);
                    //属性列表
                    self._setEquipProp2(equipCtrl);
                }
                else {
                    //祝福
                    self._setEquipProp(equipCtrl);
                }
                self.setVisibleByName(clazz.LABEL_ITEM_USE, false);
            }
            else {
                self._setItemOwned(uw.userDataCtrl.getItemNum(opt.itemId));
                self._setUseAndDesc(self._iconCtrl.dataCtrl.getTempValue(uw.t_item_useTxt), null);
            }
            var stuffArr = opt.stuffArr;
            self._refreshCost();
            self._materialListCtrl.resetByData(stuffArr);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            uw.GainInfoDlg.purgeInstance();
            this._materialListCtrl.doDtor();
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
            panelDesc.setSize(panelDesc.getSize().width, self._propCtrl.getSize().height + 100);
            self.doLayoutByName(clazz.PANEL_ITEM_INFO);
        };
        __egretProto__._setEquipProp2 = function (equipCtrl) {
            var self = this, clazz = self.__class;
            var panelDesc = self.panelDesc;
            //属性列表
            self.setVisibleByName(clazz.PANEL_EQUIP_PROP_LIST, true);
            self._propCtrl.resetByData(equipCtrl.getProps());
            //自适应底框
            panelDesc.setSize(panelDesc.getSize().width, self.getWidgetByName(clazz.PANEL_SECRET).getSize().height + self._propCtrl.getSize().height + 100);
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
        ExchangeDlg.__className = "ExchangeDlg";
        ExchangeDlg.ITEM_COUNT = 4;
        ExchangeDlg.PANEL_ICON = "panel_icon";
        ExchangeDlg.LABEL_NAME = "label_name";
        ExchangeDlg.LABEL_DESC = "label_desc";
        ExchangeDlg.IMG_WEARLVL = "img_wearLvl";
        ExchangeDlg.LABEL_EXCHANGCOUNT = "label_exchangCount";
        ExchangeDlg.BTN_EXCHANGE = "btnExchange";
        ExchangeDlg.LABEL_MAXTIPS = "label_maxTips";
        //下面是ui相关
        ExchangeDlg.PANEL_META_TMP = "meta%s"; //材料icon父容器的名字模板
        ExchangeDlg.PANEL_ICON_TMP = "panel_icon%s"; // 材料icon
        ExchangeDlg.RICH_COUNT_TMP = "rich_count%s"; // 材料数量
        ExchangeDlg.ITEM_ICON = "panel_icon"; //物品ICON
        ExchangeDlg.LABEL_ITEM_NAME = "label_itemName"; //物品名称
        ExchangeDlg.LABEL_ITEM_USE = "label_item_use"; //用途描述
        ExchangeDlg.LABEL_ITEM_DESC = "label_item_desc"; //可选描述
        ExchangeDlg.LABEL_HERONAME = "label_heroName"; // 英雄名称
        ExchangeDlg.LABEL_EXCHANGECOUNT = "label_exchangeCount"; // 兑换数量
        ExchangeDlg.PANEL_SECRET = "panel_secret"; //关联英雄panel
        ExchangeDlg.PANEL_BG = "bg";
        ExchangeDlg.PANEL_ITEM_DESC = "panel_desc";
        ExchangeDlg.PANEL_ITEM_INFO = "panel_center";
        ExchangeDlg.PANEL_ITEM_OWN_INFO = "owned";
        ExchangeDlg.PANEL_EQUIP_PROP_LIST = "panel_equip_prop";
        return ExchangeDlg;
    })(mo.UIModalLayer);
    uw.ExchangeDlg = ExchangeDlg;
    ExchangeDlg.prototype.__class__ = "uw.ExchangeDlg";
})(uw || (uw = {}));
