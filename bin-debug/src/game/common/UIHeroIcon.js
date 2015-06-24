/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var UIHeroIconCtrl = (function (_super) {
        __extends(UIHeroIconCtrl, _super);
        function UIHeroIconCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIHeroIconCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroIcon_ui;
            self._isBoss = false;
            self._clickWidgetName = self.__class.PANEL_TOUCH;
        };
        //@override
        __egretProto__.init = function (container, dataCtrl, option) {
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self.resetByData(dataCtrl);
            self.setTouchEnabledByName(clazz.IMG_BORDER, false);
        };
        __egretProto__.setDefaultUi = function () {
            var self = this, clazz = self.__class;
            self.setInfoByName(clazz.IMG_ICON, res.ui_panel.heroIcon_jpg); //英雄图标
            self.transColorByName(clazz.IMG_BORDER, uw.getRoleColorType(0));
        };
        __egretProto__.resetByData = function (dataCtrl) {
            var self = this, clazz = self.__class;
            if (!dataCtrl) {
                self.setDefaultUi();
                return;
            }
            if (typeof dataCtrl == "number" || typeof dataCtrl == "string") {
                var jsonPath;
                if (uw.idBelongHero(dataCtrl)) {
                    jsonPath = uw.cfg_t_hero;
                }
                else {
                    jsonPath = uw.cfg_t_monster;
                }
                dataCtrl = uw.HeroDataCtrl.create(null, mo.getJSONWithFileNameAndID(jsonPath, dataCtrl));
            }
            self.dataCtrl = dataCtrl;
            //进行ui设置
            var tempId = dataCtrl.tempId;
            var icon = uw.getRoleIconByTempId(tempId);
            self.setInfoByName(clazz.IMG_ICON, icon); //英雄图标
            self.transColorByName(clazz.IMG_BORDER, dataCtrl.colorType); //英雄图标边框
            if (!uw.idBelongHero(tempId)) {
                //是否是boss
                this._isBoss = uw.isBoss(dataCtrl.getTempValue(uw.t_monster_type));
                self.setVisibleByName(clazz.IMG_ISBOSS, this._isBoss);
            }
        };
        __egretProto__.hideBossMark = function () {
            var self = this, clazz = self.__class;
            var self = this;
            self.setVisibleByName(clazz.IMG_ISBOSS, false);
        };
        __egretProto__.hideInfo = function () {
            var self = this, clazz = self.__class;
            self.setVisibleByName(clazz.LABEL_LVL_CONTAINER, false);
            self.setVisibleByName(clazz.IMG_ICON, false);
            self.setVisibleByName(clazz.IMG_FRAG, false);
            self.setVisibleByName(clazz.IMG_ISBOSS, false);
            self.setVisibleByName(clazz.PANEL_BG, true);
        };
        __egretProto__.showLvl = function (lvl) {
            var self = this, clazz = self.__class;
            if (!lvl) {
                lvl = self.dataCtrl.lvl;
            }
            self.setVisibleByName(clazz.LABEL_LVL_CONTAINER, true);
            self.setInfoByName(clazz.LABEL_LVL, lvl);
        };
        __egretProto__._setDefaultTipInfo = function () {
            var self = this, clazz = self.__class;
            var tipWidget = self.tipWidget;
            tipWidget.setInfoByName(clazz.LABEL_NAME, "未知英雄");
            //        tipWidget.setColorByName(self.LABEL_NAME, color);
            tipWidget.setInfoByName(clazz.LABEL_DESC, "未知英雄");
            tipWidget.setVisibleByName(clazz.LABEL_PRICE, false);
            tipWidget.setVisibleByName(clazz.LABEL_LEVEL, true);
            tipWidget.formatByName(clazz.LABEL_LEVEL, 0);
        };
        __egretProto__._readTipInfo = function () {
            //进行ui设置
            var self = this, clazz = self.__class;
            var tipWidget = self.tipWidget;
            var dataCtrl = self.dataCtrl;
            if (!dataCtrl) {
                self._setDefaultTipInfo();
                return;
            }
            var warrior = uw.getWarriorByTempId(dataCtrl.tempId);
            var color = uw.getRoleTextColor(dataCtrl.getTempValue(uw.t_monster_quality));
            tipWidget.setColorByName(clazz.LABEL_NAME, color);
            tipWidget.setInfoByName(clazz.LABEL_NAME, warrior[uw.t_warrior_name]);
            tipWidget.setInfoByName(clazz.LABEL_DESC, warrior[uw.t_warrior_desc]);
            tipWidget.setVisibleByName(clazz.LABEL_PRICE, false);
            if (uw.idBelongHero(dataCtrl.tempId)) {
                tipWidget.setVisibleByName(clazz.LABEL_ISBOSS, false);
                tipWidget.setVisibleByName(clazz.LABEL_TRAINLVL, false);
                if (dataCtrl.lvl) {
                    tipWidget.setVisibleByName(clazz.LABEL_LEVEL, true);
                    tipWidget.formatByName(clazz.LABEL_LEVEL, dataCtrl.lvl);
                }
            }
            else {
                tipWidget.setVisibleByName(clazz.LABEL_ISBOSS, this._isBoss);
                if (dataCtrl.getTempValue(uw.t_monster_lvl)) {
                    tipWidget.setVisibleByName(clazz.LABEL_LEVEL, true);
                    tipWidget.formatByName(clazz.LABEL_LEVEL, dataCtrl.getTempValue(uw.t_monster_lvl));
                }
                //怪物的觉醒等级
                var monster_trainLv = dataCtrl.getTempValue(uw.t_monster_trainLv);
                if (monster_trainLv > 0) {
                    tipWidget.setVisibleByName(clazz.LABEL_TRAINLVL, true);
                    tipWidget.formatByName(clazz.LABEL_TRAINLVL, monster_trainLv);
                }
                else {
                    tipWidget.setVisibleByName(clazz.LABEL_TRAINLVL, false);
                }
            }
            var item = tipWidget.getWidgetByName(clazz.PANEL_ITEM);
            var tipDataCtrl = uw.UIHeroIconCtrl.create(item);
            tipDataCtrl.resetByData(self.dataCtrl);
            tipDataCtrl.hideBossMark();
            self._adapt(warrior[uw.t_warrior_desc]);
        };
        UIHeroIconCtrl.__className = "UIHeroIconCtrl";
        UIHeroIconCtrl.LABEL_LVL_CONTAINER = "lvlContainer"; //等级
        UIHeroIconCtrl.LABEL_LVL = "lvl"; //等级
        UIHeroIconCtrl.IMG_ICON = "img_icon"; //icon图标
        UIHeroIconCtrl.IMG_BORDER = "img_border"; //边框
        UIHeroIconCtrl.IMG_FRAG = "img_frag"; //碎片图标
        UIHeroIconCtrl.IMG_ISBOSS = "img_isBoss"; //是否是怪物
        UIHeroIconCtrl.PANEL_TOUCH = "panel_touch"; //点击区域
        UIHeroIconCtrl.PANEL_BG = "panel_bg"; //背景
        return UIHeroIconCtrl;
    })(uw.UIIconCtrl);
    uw.UIHeroIconCtrl = UIHeroIconCtrl;
    UIHeroIconCtrl.prototype.__class__ = "uw.UIHeroIconCtrl";
})(uw || (uw = {}));
