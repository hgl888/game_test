/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ForgeShopItem = (function (_super) {
        __extends(ForgeShopItem, _super);
        function ForgeShopItem() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ForgeShopItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiForgeShopItem_ui;
            self._useClickEffect = true;
            self._clickWidgetName = "touchPanel";
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self._iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(clazz.PANEL_EQUIP));
            self._heroCtrl = uw.UIHeroIconCtrl.create(self.getWidgetByName(clazz.PANEL_HERO));
        };
        __egretProto__.resetByData = function (data) {
            var self = this, clazz = self.__class;
            self._heroDataCtrl = data.heroDataCtrl;
            self._equipDataCtrl = data.equipDataCtrl;
            var equipCtrl = self._equipDataCtrl;
            var heroCtrl = self._heroDataCtrl;
            self._iconCtrl.resetByData(equipCtrl);
            self._heroCtrl.resetByData(heroCtrl);
            self.setInfoByName(clazz.LABEL_EQUIPNAME, equipCtrl.name);
            self.setColorByName(clazz.LABEL_EQUIPNAME, uw.getItemColorByTempId(equipCtrl.tempId));
            self.setInfoByName(clazz.LABEL_HERONAME, heroCtrl.name);
            var hasHero = !heroCtrl.isTempOnly;
            self.setVisibleByName(clazz.PANEL_HASHERO, hasHero);
            self.setVisibleByName(clazz.PANEL_NOHERO, !hasHero);
            self.setVisibleByName(clazz.PANEL_HERO, hasHero);
            self.setVisibleByName(clazz.LABEL_HERONAME, hasHero);
            self.setVisibleByName(clazz.LABEL_NOHERO, !hasHero);
        };
        __egretProto__.getEquipDataCtrl = function () {
            return this._equipDataCtrl;
        };
        __egretProto__.getHeroDataCtrl = function () {
            return this._heroDataCtrl;
        };
        ForgeShopItem.__className = "ForgeShopItem";
        ForgeShopItem.PANEL_HASHERO = "panel_hasHero";
        ForgeShopItem.PANEL_NOHERO = "panel_noHero";
        ForgeShopItem.PANEL_EQUIP = "panel_equip";
        ForgeShopItem.PANEL_HERO = "panel_hero";
        ForgeShopItem.LABEL_HERONAME = "label_heroName";
        ForgeShopItem.LABEL_EQUIPNAME = "label_equipName";
        ForgeShopItem.LABEL_NOHERO = "label_noHero";
        return ForgeShopItem;
    })(mo.GridViewCell);
    uw.ForgeShopItem = ForgeShopItem;
    ForgeShopItem.prototype.__class__ = "uw.ForgeShopItem";
})(uw || (uw = {}));
