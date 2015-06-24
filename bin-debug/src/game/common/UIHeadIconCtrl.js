/**
 * Created by yangsong on 14/12/22.
 */
var uw;
(function (uw) {
    var UIHeadIconCtrl = (function (_super) {
        __extends(UIHeadIconCtrl, _super);
        function UIHeadIconCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIHeadIconCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._jsonPath = res.uiHeadItem_ui;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
            var container = args[0], heroTid = args[1], lvl = args[2], rankNum = args[3];
            _super.prototype.init.call(this, container);
            self._clickWidgetName = self.__class.PANEL_TOUCH;
            self.loadMaskTextureByName(self.__class.IMG_ICON, res.ui_arena.cov_head_png);
            self.setMaskEnabledByName(self.__class.IMG_ICON, true); //是否设置mask
            //设置count的描边
            self.enableStrokeByName(self.__class.LABEL_LVL, cc.c3b(20, 3, 0), 3);
            self.resetByData(heroTid, lvl, rankNum);
        };
        __egretProto__.setDefaultUi = function () {
            var self = this;
            self.setInfoByName(self.__class.LABEL_LVL, 0);
            self.setInfoByName(self.__class.IMG_ICON, res.ui_panel.heroIcon_jpg);
            self.setInfoByName(self.__class.IMG_BORDER, uw.getRankBorder(999)); //边框
        };
        __egretProto__.resetByData = function (heroTid, lvl, rankNum) {
            var self = this;
            self.setInfoByName(self.__class.LABEL_LVL, lvl || 0);
            var borderFrame = uw.getRankBorder(rankNum || 999);
            self.setInfoByName(self.__class.IMG_BORDER, borderFrame); //边框
            var icon = res.ui_panel.heroIcon_jpg;
            if (heroTid != null) {
                icon = resHelper.getRoleIconPath(heroTid);
                self.setInfoByName(self.__class.IMG_ICON, icon); //图标 注意，这个一定要设置在mask后面，否则会出问题
            }
            else {
                self.setInfoByName(self.__class.IMG_ICON, res.ui_panel.heroIcon_jpg);
            }
        };
        UIHeadIconCtrl.__className = "UIHeadIconCtrl";
        UIHeadIconCtrl.IMG_ICON = "img_icon"; //icon图标
        UIHeadIconCtrl.IMG_BORDER = "img_border"; //边框
        UIHeadIconCtrl.LABEL_LVL = "label_lvl"; //等级显示文字
        UIHeadIconCtrl.PANEL_TOUCH = "panel_touch"; //点击区域
        return UIHeadIconCtrl;
    })(uw.UIIconCtrl);
    uw.UIHeadIconCtrl = UIHeadIconCtrl;
    UIHeadIconCtrl.prototype.__class__ = "uw.UIHeadIconCtrl";
})(uw || (uw = {}));
