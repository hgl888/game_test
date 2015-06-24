/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var BagLayer = (function (_super) {
        __extends(BagLayer, _super);
        function BagLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BagLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiBagLayer_ui;
        };
        //@override
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this, clazz = self.__class;
            self._bagQueryLayerCtrl = uw.BagQueryLayerCtrl.create();
            self._bagQueryLayerCtrl.attachWidgetTo(self.getWidgetByName(clazz.QUERY_PANEL));
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.EXACT_FIT);
            var tabList = uw.TabListCtrl.create(self.getWidgetByName(clazz.GROUP_CONTAINER), uw.TabListCtrl.POINTER_TO_LEFT);
            tabList.onTabClicked(self._onTabClicked, self);
            var tabs = [
                { name: clazz.BTN_ALL, title: "全部" },
                { name: clazz.BTN_ITEM, title: "道具" },
                { name: clazz.BTN_EQUIP, title: "装备" },
                { name: clazz.BTN_HERO, title: "英雄" },
                { name: clazz.BTN_MATE, title: "材料" }
            ];
            tabList.resetByData(tabs);
            tabList.movePointerByName(BagLayer.BTN_ALL);
        };
        __egretProto__.setCurList = function (showType) {
            var self = this;
            self._bagQueryLayerCtrl.setCurList(showType);
        };
        __egretProto__._onTabClicked = function (sender) {
            var self = this, clazz = self.__class;
            var name = sender.getName();
            var showType = uw.BagGridLayerCtrl.SHOW_TYPE_ALL;
            switch (name) {
                case clazz.BTN_ALL:
                    showType = uw.BagGridLayerCtrl.SHOW_TYPE_ALL;
                    break;
                case clazz.BTN_ITEM:
                    showType = uw.BagGridLayerCtrl.SHOW_TYPE_ITEM;
                    break;
                case clazz.BTN_EQUIP:
                    showType = uw.BagGridLayerCtrl.SHOW_TYPE_EQUIP;
                    break;
                case clazz.BTN_HERO:
                    showType = uw.BagGridLayerCtrl.SHOW_TYPE_HERO;
                    break;
                case clazz.BTN_MATE:
                    showType = uw.BagGridLayerCtrl.SHOW_TYPE_MATE;
                    break;
            }
            self.setCurList(showType);
            return true;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            this._bagQueryLayerCtrl.doDtor();
        };
        BagLayer.__className = "BagLayer";
        BagLayer.GROUP_CONTAINER = "group_container";
        BagLayer.BTN_ALL = "btnAll";
        BagLayer.BTN_EQUIP = "btnEquip";
        BagLayer.BTN_ITEM = "btnItem";
        BagLayer.BTN_HERO = "btnHero";
        BagLayer.BTN_MATE = "btnMate";
        BagLayer.QUERY_PANEL = "query_panel";
        return BagLayer;
    })(mo.DisplayLayer);
    uw.BagLayer = BagLayer;
    BagLayer.prototype.__class__ = "uw.BagLayer";
})(uw || (uw = {}));
