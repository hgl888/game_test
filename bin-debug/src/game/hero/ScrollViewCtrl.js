/**
 * Created by lihex on 3/10/15.
 */
var uw;
(function (uw) {
    var EquipItemCtrl = (function (_super) {
        __extends(EquipItemCtrl, _super);
        function EquipItemCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EquipItemCtrl.prototype;
        __egretProto__.init = function (panel) {
            var self = this, clazz = self.__class;
            self.widget = panel;
            panel.ctrl = self;
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_EQUIP_ICON));
            self._equipPropCtrl = uw.EquipPropGridCtrl.create(self.getWidgetByName(clazz.PANEL_PROP_LIST), 50);
        };
        __egretProto__.resetByData = function (equipCtrl) {
            var self = this, clazz = self.__class;
            self._iconCtrl.resetByData(equipCtrl);
            var isTempOnly = equipCtrl.isTempOnly;
            var lvl = equipCtrl.lvl; //获取到装备强化等级
            var lvlTxt = lvl ? ("+" + lvl) : "未强化";
            lvlTxt = isTempOnly ? "" : lvlTxt;
            //装备名称和强化等级
            var str;
            str = mo.formatStr("[ubb color=%s size=60]%s[/ubb][ubb color=#e49b24 size=50] %s[/ubb]", uw.getColorByQuality(equipCtrl.quality), equipCtrl.name, lvlTxt);
            self.setInfoByName(clazz.PANEL_NAME_STRENGTH, { value: str });
            str = mo.formatStr("[ubb color=#d3d3d3]等级需求：%s[/ubb]", equipCtrl.needLvl);
            self.setInfoByName(clazz.LABEL_REQUIRED_LVL, { value: str, fontSize: 50 });
            //属性列表
            self._equipPropCtrl.resetByData(equipCtrl.getProps());
            self.doLayoutByName(clazz.LAYOUT_TOP);
        };
        EquipItemCtrl.__className = "EquipItemCtrl";
        EquipItemCtrl.PANEL_EQUIP_ICON = "equip_icon"; //材料的icon容器的名字模板
        EquipItemCtrl.PANEL_NAME_STRENGTH = "panel_name_strength"; //名称和强化等级富文本
        EquipItemCtrl.LAYOUT_TOP = "layout_top";
        EquipItemCtrl.LABEL_REQUIRED_LVL = "label_requiredLvl";
        EquipItemCtrl.PANEL_PROP_LIST = "prop";
        return EquipItemCtrl;
    })(mo.WidgetCtrl);
    uw.EquipItemCtrl = EquipItemCtrl;
    EquipItemCtrl.prototype.__class__ = "uw.EquipItemCtrl";
    var ScrollViewCtrl = (function (_super) {
        __extends(ScrollViewCtrl, _super);
        function ScrollViewCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ScrollViewCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._items = [];
        };
        __egretProto__.setDelegate = function (d) {
            this._delegate = d;
        };
        __egretProto__.init = function (sv) {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self.widget = sv;
            self._sv = sv;
            self._sv.setTouchEnabled(false);
            self._sv.addEventListenerScrollView(self.onScrollEvent, self);
            for (var i = 0, li = clazz.MAX_ITEM_COUNT; i < li; i++) {
                var item = self.getWidgetByName(mo.formatStr("equipItem%s", i));
                EquipItemCtrl.create(item);
                self._items.push(item);
            }
        };
        __egretProto__.onExit = function () {
            var self = this;
            _super.prototype.onExit.call(this);
            if (self._armCtrl) {
                self._armCtrl.clear();
                self._armCtrl = null;
            }
        };
        __egretProto__._swapSv = function () {
            var self = this;
            var firstItem = self._items.shift();
            var lastItem = self._items[self._items.length - 1];
            firstItem.y = lastItem.y + 710;
            self._items.push(firstItem);
            self._lowEquipCtrl = self._highEquipCtrl;
            self._highEquipCtrl = self._highNextEquipCtrl;
        };
        __egretProto__.onScrollEvent = function (sv, eventType) {
            var self = this;
            var innerContainer = self._sv.getInnerContainer();
            if (eventType == 1) {
                self._swapSv();
                self._sv.setInnerContainerSize(new mo.Size(innerContainer.width, innerContainer.height + 710));
                self._delegate.showBtn();
            }
        };
        __egretProto__.doWhat = function () {
            var self = this;
            self._delegate.hideBtn();
            self._sv.scrollToBottom(0.2, false);
        };
        __egretProto__.restore = function () {
            var self = this;
            var innerContainer = self._sv.getInnerContainer();
            var srcSize = innerContainer.getSrcSize();
            innerContainer.y = 0;
            self._sv.setInnerContainerSize(new mo.Size(srcSize.width, srcSize.height));
            for (var i = 0, li = self._items.length; i < li; i++) {
                var item = self._items[i];
                var item2 = self.getWidgetByName(mo.formatStr("equipItem%s", i));
                var srcPos = item2.getSrcPos();
                item.setPosition(srcPos);
            }
        };
        __egretProto__.resetByData = function (heroCtrl, part) {
            var self = this;
            self._heroDataCtrl = heroCtrl;
            self.resetPart(part);
        };
        __egretProto__.resetPart = function (part) {
            var self = this;
            self._curPart = part;
            self._refreshData();
        };
        __egretProto__._refreshData = function () {
            var self = this, clazz = self.__class;
            var part = self._curPart;
            self._setupLowEquip();
            self._setupHighEquip();
            self._setupHighNextEquip();
        };
        __egretProto__._setupLowEquip = function () {
            var self = this, clazz = self.__class;
            var part = self._curPart;
            var equipCtrl = self._lowEquipCtrl = self._heroDataCtrl.getEquipDataCtrlByPart(part);
            var panel = self._items[0];
            panel.ctrl.resetByData(equipCtrl);
        };
        __egretProto__._setupHighEquip = function () {
            var self = this, clazz = self.__class;
            var panel = self._items[1];
            var lowEquipCtrl = self._lowEquipCtrl;
            var highEquipCtrl = self._highEquipCtrl = lowEquipCtrl.getNext();
            if (lowEquipCtrl.isTempOnly || highEquipCtrl == null) {
                panel.setVisible(false);
                return;
            }
            panel.setVisible(true);
            panel.ctrl.resetByData(highEquipCtrl);
        };
        __egretProto__._setupHighNextEquip = function () {
            var self = this, clazz = self.__class;
            var panel = self._items[2];
            if (!self._highEquipCtrl)
                return panel.setVisible(false);
            var highNextEquipCtrl = self._highNextEquipCtrl = self._highEquipCtrl.getNext();
            if (highNextEquipCtrl) {
                panel.setVisible(true);
                panel.ctrl.resetByData(highNextEquipCtrl);
            }
        };
        __egretProto__.playStrEffect = function () {
            var self = this;
            var iconPanel = self._items[0].getWidgetByName(uw.EquipItemCtrl.PANEL_EQUIP_ICON);
            var panel_op = self._delegate._panel_op;
            var pos = mo.convertNodeToNodeSpace(panel_op, iconPanel, mo.p(120, 120));
            if (!self._armCtrl) {
                self._armCtrl = uw.UpArmature.play(panel_op, res.cca_ui.effect_upEquip, pos, function () {
                    self._armCtrl = null;
                });
            }
        };
        ScrollViewCtrl.__className = "ScrollViewCtrl";
        ScrollViewCtrl.MAX_ITEM_COUNT = 3;
        return ScrollViewCtrl;
    })(mo.WidgetCtrl);
    uw.ScrollViewCtrl = ScrollViewCtrl;
    ScrollViewCtrl.prototype.__class__ = "uw.ScrollViewCtrl";
})(uw || (uw = {}));
