/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ExclusiveGetDlg = (function (_super) {
        __extends(ExclusiveGetDlg, _super);
        function ExclusiveGetDlg() {
            _super.apply(this, arguments);
            //@impl IItemInfoCommonApi begin
            this.lbItemUse = mo.UIText;
            this.panelDesc = mo.UIPanel;
            this._iconCtrl = null;
        }
        var __egretProto__ = ExclusiveGetDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiForgeExclusiveGetDlg_ui;
        };
        //@override
        __egretProto__.init = function (dataCtrl) {
            _super.prototype.init.call(this);
            var self = this, clazz = self.__class;
            self.getWidgetByName("bg").registerSrcSizeByName("panel_desc");
            self._initItemInfoUI();
            self._setItemIcon(dataCtrl);
            self._setItemName(dataCtrl.tempId, dataCtrl.name);
            self._setBelongToHeroName(dataCtrl.heroName);
            self._setEquipProp(dataCtrl);
            self.showTitle();
            self.showItemEffect();
            self.doLayoutByName("bg");
        };
        __egretProto__.showTitle = function () {
            var self = this;
            var titleWidget = self.getWidgetByName("title");
            uw.UpArmatureWithBegin.play(titleWidget, res.cca_ui.getExclusiveTitle, null, function () {
            }, self);
        };
        __egretProto__.showItemEffect = function () {
            var self = this;
            var panelIcon = self.getWidgetByName("panel_icon");
            var widget = this.getWidgetByName("panel_icon");
            var size = widget.getSize();
            uw.UpArmature.play(panelIcon, res.cca_ui.getExclusiveItem, mo.p(size.width / 2, size.height / 2), function () {
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
        ExclusiveGetDlg.__className = "ExclusiveGetDlg";
        ExclusiveGetDlg.ITEM_ICON = "panel_icon"; //物品ICON
        ExclusiveGetDlg.LABEL_ITEM_NAME = "label_itemName"; //物品名称
        ExclusiveGetDlg.LABEL_ITEM_USE = "label_item_use"; //用途描述
        ExclusiveGetDlg.LABEL_ITEM_DESC = "label_item_desc"; //可选描述
        ExclusiveGetDlg.LABEL_HERONAME = "label_heroName"; // 秘术名称
        ExclusiveGetDlg.PANEL_ITEM_DESC = "panel_desc";
        ExclusiveGetDlg.PANEL_ITEM_INFO = "panel_center";
        ExclusiveGetDlg.PANEL_ITEM_OWN_INFO = "owned";
        ExclusiveGetDlg.PANEL_EQUIP_PROP_LIST = "panel_equip_prop";
        return ExclusiveGetDlg;
    })(mo.UIModalLayer);
    uw.ExclusiveGetDlg = ExclusiveGetDlg;
    ExclusiveGetDlg.prototype.__class__ = "uw.ExclusiveGetDlg";
})(uw || (uw = {}));
