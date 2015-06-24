/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var HeroUpGradeDlg = (function (_super) {
        __extends(HeroUpGradeDlg, _super);
        function HeroUpGradeDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HeroUpGradeDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroUpGradeDlg_ui;
            self._closeWidgetName = "btn_cancel";
        };
        //@override
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self.showTitle();
        };
        __egretProto__.resetByData = function (oldTempId, newTempId) {
            var self = this, clazz = self.__class;
            uw.UIHeroIconCtrl.create(self.getWidgetByName(clazz.PANEL_BEFORE_UP_GRADE), oldTempId);
            uw.UIHeroIconCtrl.create(self.getWidgetByName(clazz.PANEL_AFTER_UP_GRADE), newTempId);
            var t_hero = mo.getJSONWithFileName(uw.cfg_t_hero);
            var oldTemp = t_hero[oldTempId];
            var newTemp = t_hero[newTempId];
            self.setInfoByName(clazz.LABEL_OLD_INTEL, oldTemp[uw.t_hero_lvlIntel]);
            self.setInfoByName(clazz.LABEL_NEW_INTEL, newTemp[uw.t_hero_lvlIntel]);
            self.setInfoByName(clazz.LABEL_OLD_POWER, oldTemp[uw.t_hero_lvlPower]);
            self.setInfoByName(clazz.LABEL_NEW_POWER, newTemp[uw.t_hero_lvlPower]);
            self.setInfoByName(clazz.LABEL_OLD_LIFE, oldTemp[uw.t_hero_lvlLife]);
            self.setInfoByName(clazz.LABEL_NEW_LIFE, newTemp[uw.t_hero_lvlLife]);
        };
        __egretProto__.showTitle = function () {
            var self = this;
            var titleWidget = self.getWidgetByName("title");
            uw.UpArmatureWithBegin.play(titleWidget, res.cca_ui.qualityUp, null, function () {
            }, self);
        };
        HeroUpGradeDlg.__className = "HeroUpGradeDlg";
        HeroUpGradeDlg.PANEL_BEFORE_UP_GRADE = "beforeUpGrade";
        HeroUpGradeDlg.PANEL_AFTER_UP_GRADE = "afterUpGrade";
        HeroUpGradeDlg.LABEL_OLD_LIFE = "oldLife";
        HeroUpGradeDlg.LABEL_NEW_LIFE = "newLife";
        HeroUpGradeDlg.LABEL_OLD_INTEL = "oldIntel";
        HeroUpGradeDlg.LABEL_NEW_INTEL = "newIntel";
        HeroUpGradeDlg.LABEL_OLD_POWER = "oldPower";
        HeroUpGradeDlg.LABEL_NEW_POWER = "newPower";
        return HeroUpGradeDlg;
    })(mo.UIModalLayer);
    uw.HeroUpGradeDlg = HeroUpGradeDlg;
    HeroUpGradeDlg.prototype.__class__ = "uw.HeroUpGradeDlg";
})(uw || (uw = {}));
