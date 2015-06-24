/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var UICopyHeroIconCtrl = (function (_super) {
        __extends(UICopyHeroIconCtrl, _super);
        function UICopyHeroIconCtrl() {
            _super.call(this);
            this._isBoss = false;
            this.dataCtrl = null;
        }
        var __egretProto__ = UICopyHeroIconCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroIcon_ui;
            self._clickWidgetName = self.__class.PANEL_TOUCH;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var container = args[0];
            var dataCtrl = args[1];
            var option = args[2];
            _super.prototype.init.call(this, container);
            var self = this;
            self.resetByData(dataCtrl);
            self.setTouchEnabledByName(self.__class.IMG_BORDER, false);
        };
        __egretProto__.setDefaultUi = function () {
            var self = this, clazz = self.__class;
            self.setInfoByName(clazz.IMG_ICON, res.ui_panel.heroIcon_jpg); //英雄图标
            self.transColorByName(clazz.IMG_BORDER, uw.getRoleColorType(0));
        };
        __egretProto__.resetByData = function (dataCtrl) {
            var self = this;
            self.setDefaultUi();
            if (!dataCtrl) {
                return;
            }
            var dataCtrl;
            if (typeof dataCtrl == "number" || typeof dataCtrl == "string") {
                var jsonPath;
                jsonPath = uw.cfg_t_monster;
                dataCtrl = uw.HeroDataCtrl.create(null, mo.getJSONWithFileNameAndID(jsonPath, dataCtrl));
            }
            self.dataCtrl = dataCtrl;
            //进行ui设置
            var colorType = dataCtrl.isTempOnly ? uw.getRoleColorType(0) : dataCtrl.colorType;
            self.transColorByName(self.__class.IMG_BORDER, colorType); //英雄图标边框
            self.setVisibleByName(self.__class.IMG_ISBOSS, false);
        };
        __egretProto__._readTipInfo = function () {
            //进行ui设置
            var self = this;
            var tipWidget = self.tipWidget;
            var dataCtrl = self.dataCtrl;
            tipWidget.setInfoByName(self.__class.LABEL_NAME, "未知");
            tipWidget.setColorByName(self.__class.LABEL_NAME, uw.getRoleTextColor(dataCtrl.getTempValue(uw.t_monster_quality)));
            tipWidget.setInfoByName(self.__class.LABEL_DESC, "镜像会复制你派出的英雄");
            tipWidget.setVisibleByName(self.__class.LABEL_PRICE, false);
            tipWidget.setVisibleByName(self.__class.LABEL_LEVEL, true);
            tipWidget.setVisibleByName(self.__class.LABEL_ISBOSS, false);
            tipWidget.formatByName(self.__class.LABEL_LEVEL, dataCtrl.getTempValue(uw.t_monster_lvl));
            tipWidget.setVisibleByName(self.__class.LABEL_TRAINLVL, true);
            tipWidget.formatByName(self.__class.LABEL_TRAINLVL, dataCtrl.getTempValue(uw.t_monster_trainLv));
            var item = tipWidget.getWidgetByName(self.__class.PANEL_ITEM);
            var tipDataCtrl = uw.UICopyHeroIconCtrl.create(item);
            tipDataCtrl.resetByData(self.dataCtrl);
            self._adapt("镜像会复制你派出的英雄");
        };
        UICopyHeroIconCtrl.__className = "UICopyHeroIconCtrl";
        UICopyHeroIconCtrl.IMG_ICON = "img_icon"; //icon图标
        UICopyHeroIconCtrl.IMG_BORDER = "img_border"; //边框
        UICopyHeroIconCtrl.IMG_FRAG = "img_frag"; //碎片图标
        UICopyHeroIconCtrl.IMG_ISBOSS = "img_isBoss"; //是否是怪物
        UICopyHeroIconCtrl.PANEL_TOUCH = "panel_touch"; //点击区域
        return UICopyHeroIconCtrl;
    })(uw.UIIconCtrl);
    uw.UICopyHeroIconCtrl = UICopyHeroIconCtrl;
    UICopyHeroIconCtrl.prototype.__class__ = "uw.UICopyHeroIconCtrl";
})(uw || (uw = {}));
