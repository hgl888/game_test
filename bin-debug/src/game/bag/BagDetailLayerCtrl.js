/**
 * Created by lihex on 12/18/14.
 */
var uw;
(function (uw) {
    var __import;
    var BagDetailLayerCtrl = (function (_super) {
        __extends(BagDetailLayerCtrl, _super);
        function BagDetailLayerCtrl() {
            _super.apply(this, arguments);
            //@impl IItemInfoCommonApi begin
            this.lbItemUse = mo.UIText;
            this.panelDesc = mo.UIPanel;
            this._iconCtrl = null;
        }
        var __egretProto__ = BagDetailLayerCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._dataCtrl = null;
        };
        //@override
        __egretProto__.init = function (widget, from, opt) {
            _super.prototype.init.call(this);
            var self = this;
            var clazz = self.__class;
            from = from || clazz.CREATE_FROM_BAG_LAYER;
            self.widget = widget;
            self._createFrom = from;
            self._heroDataCtrl = opt;
            //self.widget.controller = self;
            self._originPos = mo.p(self.widget.getPosition());
            self._outPos = mo.p(-(mo.visibleRect.getSize().width - 2048) / 2 - self.widget.getSize().width - self._originPos.x, self._originPos.y);
            //移出屏幕外
            self.widget.setPosition(self._outPos);
            //初始化UI
            self._initUI();
            self.registerClassByKey(uw.EquipDataCtrl, uw.EquipDataCtrl.ON_SOLD, self._onEquipSold);
            self.registerClassByKey(uw.BagDataCtrl, uw.BagDataCtrl.ON_COUNT_CHANGED, self._onItemCountChanged);
        };
        __egretProto__._initUI = function () {
            var self = this;
            self._initItemInfoUI();
            uw.setGoldColor(self.widget, "price");
        };
        __egretProto__.hideLayer = function () {
            var self = this;
            // 移出屏幕外
            var seq = mo.sequence(mo.moveTo(0.25, self._outPos).setEase(mo.Ease.backOut), mo.callFunc(function () {
                self._poped = false;
                self.widget.setVisible(false);
            }, self));
            self.widget.runAction(seq);
        };
        __egretProto__.popInfoLayer = function () {
            var self = this;
            if (!self._poped) {
                self._poped = true;
                self.widget.setVisible(true);
                self.widget.runAction(mo.moveTo(0.25, self._originPos).setEase(mo.Ease.backOut));
            }
        };
        __egretProto__.resetByData = function (dataCtrl) {
            var self = this;
            var clazz = self.__class;
            self._dataCtrl = dataCtrl;
            var type = dataCtrl.getTempValue(uw.t_item_type), count = dataCtrl.getCount(), name = dataCtrl.getTempValue(uw.t_item_name), desc = dataCtrl.getTempValue(uw.t_item_explain), price = dataCtrl.getTempValue(uw.t_item_sellPrice), id = dataCtrl.getTempValue(uw.t_item_id), isSell = dataCtrl.getTempValue(uw.t_item_isSell), isUse = dataCtrl.getTempValue(uw.t_item_isUse), useTxt = dataCtrl.getTempValue(uw.t_item_useTxt);
            // 基本信息
            var widget = self.widget;
            self._setItemName(id, name);
            self.setInfoByName("price", price);
            // 设置icon
            self._setItemIcon(dataCtrl);
            // 设置拥有数
            self._setItemOwned(count);
            // 分类显示物品
            self.setVisibleByName(clazz.LABEL_ITEM_DESC, false);
            self.setVisibleByName(clazz.LABEL_ITEM_USE, false);
            self.setVisibleByName(clazz.PANEL_EQUIP_PROP_LIST, false);
            self.setVisibleByName(clazz.PANEL_SECRET, false);
            var itemTypeKey = uw.c_prop.itemTypeKey;
            switch (type) {
                case itemTypeKey.equip:
                    self._showEquip();
                    break;
                default:
                    //设置用途
                    self._setUseAndDesc(useTxt, desc);
                    break;
            }
            // 设置左侧按钮
            if (self._createFrom == clazz.CREATE_FROM_HERO_LAYER && !self._dataCtrl.isExclusive) {
                // 如果是从英雄界面创建且不是专属装备就把"出售"按钮改成"装备"按钮
                var btnEquip = self.getWidgetByName(clazz.BTN_LEFT), btnEquipText = res.BagOtherBtnFrameName.puton;
                btnEquip.loadTextures(btnEquipText);
                self.onClickByName(clazz.BTN_LEFT, self._onPutOnClick, self);
            }
            else {
                // 设置成出售按钮
                var btnSale = self.getWidgetByName(clazz.BTN_LEFT), btnSaleText = res.BagOtherBtnFrameName.sale;
                btnSale.touchEnabled = (isSell);
                btnSale.loadTextures(btnSaleText);
                btnSale.setGray(!isSell);
                self.onClickByName(clazz.BTN_LEFT, self._onSaleClick, self);
            }
            // 设置右边的按钮
            self._setOtherBtnByType(id, type, isUse);
            var flash_mask = self.getWidgetByName("refresh_area");
            flash_mask.setOpacity(0);
            flash_mask.runAction(mo.fadeIn(0.1));
        };
        // 设置右边的按钮
        __egretProto__._setOtherBtnByType = function (tempId, type, isUse) {
            var self = this, clazz = self.__class;
            var btnOther = self.getWidgetByName(clazz.BTN_RIGHT), btnTex, onClickFunc, itemTypeKey = uw.c_prop.itemTypeKey;
            // 可使用的物品或者暗影石
            if (isUse || type == itemTypeKey.darkStone) {
                btnTex = res.BagOtherBtnFrameName.use;
                onClickFunc = self._onUseClick;
            }
            else {
                switch (type) {
                    case itemTypeKey.heroFragment:
                    case itemTypeKey.material:
                        btnTex = res.BagOtherBtnFrameName.detail;
                        onClickFunc = self._onDetailClick;
                        break;
                    case itemTypeKey.equip:
                        if (self._dataCtrl.isExclusive) {
                            btnTex = res.BagOtherBtnFrameName.puton;
                            onClickFunc = self._onPutOnClick;
                        }
                        else {
                            btnTex = res.BagOtherBtnFrameName.detail;
                            onClickFunc = self._onDetailClick;
                        }
                        break;
                    case itemTypeKey.consumables:
                        btnTex = res.BagOtherBtnFrameName.detail;
                        onClickFunc = self._onDetailClick;
                        break;
                }
            }
            btnOther.loadTextures(btnTex);
            self.onClickByName(clazz.BTN_RIGHT, onClickFunc, self);
        };
        /**
         * 显示专属装备
         */
        __egretProto__._showExclusiveEquip = function () {
            var self = this, clazz = self.__class;
            var panelDesc = self.panelDesc;
            var equipCtrl = self._dataCtrl;
            // 设置穿戴等级
            self._setWearLimitLv(equipCtrl.needLvl);
            //设置关联英雄
            self.setVisibleByName(clazz.PANEL_SECRET, true);
            self.setInfoByName(clazz.LABEL_HERONAME, equipCtrl.heroName);
            //属性列表
            self._setEquipProp2(equipCtrl);
        };
        /**
         * 显示祝福
         * @private
         */
        __egretProto__._showWish = function () {
            var self = this, clazz = self.__class;
            var equipCtrl = self._dataCtrl, desc = equipCtrl.explain;
            // 设置穿戴等级
            self._setWearLimitLv(equipCtrl.needLvl);
            //属性列表
            self._setEquipProp(equipCtrl);
            //设置描述
            self.setVisibleByName(clazz.LABEL_ITEM_DESC, desc != null);
            if (desc != null) {
                self.setInfoByName(clazz.LABEL_ITEM_DESC, desc);
            }
        };
        __egretProto__._showEquip = function () {
            var self = this;
            var equipCtrl = self._dataCtrl;
            if (equipCtrl.isExclusive) {
                self._showExclusiveEquip();
            }
            else {
                self._showWish();
            }
        };
        __egretProto__._onItemCountChanged = function (count, ctrl) {
            var self = this;
            if (self._dataCtrl != ctrl)
                return;
            // 设置拥有数
            self._setItemOwned(count);
            if (count == 0) {
                self._dataCtrl = null;
                self.hideLayer();
            }
        };
        __egretProto__._onEquipSold = function () {
            var self = this;
            this.hideLayer();
            self._dataCtrl = null;
        };
        __egretProto__._onPutOnClick = function () {
            var self = this;
            var equipCtrl = self._dataCtrl;
            // 默认穿祝福
            var heroDataCtrl = self._heroDataCtrl;
            // 如果是专属则穿专属
            if (equipCtrl.isExclusive) {
                var heroTid = equipCtrl.heroTid;
                heroDataCtrl = uw.userDataCtrl.getHeroDataCtrlByTid(heroTid);
                if (null == heroDataCtrl) {
                    return mo.showMsg(uw.id_c_msgCode.noHero);
                }
                var exclusiveEquipCtrl = heroDataCtrl.getEquipDataCtrlByPart(uw.c_prop.equipPartKey.exclusive);
                if (!exclusiveEquipCtrl.isTempOnly) {
                    return mo.showMsg(uw.id_c_msgCode.oneMost);
                }
            }
            heroDataCtrl.putOnEquip(equipCtrl, function () {
                uw.log("---> 穿戴成功");
                this.hideLayer();
                self._dataCtrl.setPutOn();
                self._dataCtrl = null;
            }, self);
        };
        __egretProto__._onUseClick = function () {
            var self = this;
            var itemType = self._dataCtrl.getTempValue(uw.t_item_type);
            // 使用暗影石
            if (itemType == uw.c_prop.itemTypeKey.darkStone) {
                self._onUseElixirClick();
                return;
            }
            var useLogicType = self._dataCtrl.getLogicTempValue(uw.t_itemLogic_type);
            switch (useLogicType) {
                case uw.ItemLogicType.GetMore:
                case uw.ItemLogicType.GetRes:
                    //检查是否有达最大获得数量的物品
                    var itemLogic = mo.getJSONWithFileName(uw.cfg_t_itemLogic);
                    var itemLogic_create = itemLogic[self._dataCtrl.tempId][uw.t_itemLogic_create];
                    var checkItems = [];
                    for (var i = 0; i < itemLogic_create.length; i++) {
                        var item = itemLogic_create[i];
                        checkItems.push(item[0]);
                    }
                    uw.confirmMaxGetItems(checkItems, function () {
                        self._dataCtrl.use();
                    }, self);
                    break;
                case uw.ItemLogicType.GetExp:
                    // 使用经验卡
                    this._onUseExpClick();
                    break;
            }
        };
        __egretProto__.resetHero = function (heroCtrl) {
            var self = this;
            self._heroDataCtrl = heroCtrl;
        };
        /* 以下方法会弹出对话框 */
        __egretProto__._onDetailClick = function () {
            var self = this;
            uw.GainInfoDlg.getInstance().resetByData(this._dataCtrl.tempId).show();
        };
        __egretProto__._onSaleClick = function () {
            var dlg = uw.BagSaleItemDlg.create(this._dataCtrl);
            dlg.show();
        };
        /* 使用经验卡 */
        __egretProto__._onUseExpClick = function () {
            var dlg = uw.BagUseItemDlg.create(this._dataCtrl);
            dlg.show();
        };
        //使用培养丹
        __egretProto__._onUseElixirClick = function () {
            uw.pushSubModule(uw.SubModule.Hero);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            uw.GainInfoDlg.purgeInstance();
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
            panelDesc.doLayout();
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
            panelDesc.doLayout();
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
        BagDetailLayerCtrl.__className = "BagDetailLayerCtrl";
        BagDetailLayerCtrl.ITEM_ICON = "panel_icon"; //物品ICON
        BagDetailLayerCtrl.LABEL_ITEM_NAME = "label_itemName"; //物品名称
        BagDetailLayerCtrl.LABEL_ITEM_USE = "label_item_use"; //用途描述
        BagDetailLayerCtrl.LABEL_ITEM_DESC = "label_item_desc"; //可选描述
        BagDetailLayerCtrl.LABEL_HERONAME = "label_heroName"; // 英雄名称
        BagDetailLayerCtrl.PANEL_SECRET = "panel_secret"; //关联英雄panel
        BagDetailLayerCtrl.PANEL_ITEM_DESC = "panel_desc";
        BagDetailLayerCtrl.PANEL_ITEM_INFO = "panel_center";
        BagDetailLayerCtrl.PANEL_ITEM_OWN_INFO = "owned";
        BagDetailLayerCtrl.PANEL_EQUIP_PROP_LIST = "panel_equip_prop";
        BagDetailLayerCtrl.CREATE_FROM_BAG_LAYER = 1;
        BagDetailLayerCtrl.CREATE_FROM_HERO_LAYER = 2;
        BagDetailLayerCtrl.BTN_LEFT = "btnLeft";
        BagDetailLayerCtrl.BTN_RIGHT = "btnRight";
        return BagDetailLayerCtrl;
    })(mo.WidgetCtrl);
    uw.BagDetailLayerCtrl = BagDetailLayerCtrl;
    BagDetailLayerCtrl.prototype.__class__ = "uw.BagDetailLayerCtrl";
})(uw || (uw = {}));
