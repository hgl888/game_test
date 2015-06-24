var uw;
(function (uw) {
    var _UIHeroIconOption = (function (_super) {
        __extends(_UIHeroIconOption, _super);
        function _UIHeroIconOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _UIHeroIconOption.prototype;
        return _UIHeroIconOption;
    })(mo.Option);
    uw._UIHeroIconOption = _UIHeroIconOption;
    _UIHeroIconOption.prototype.__class__ = "uw._UIHeroIconOption";
    var UIHeroIconCtrl_new = (function (_super) {
        __extends(UIHeroIconCtrl_new, _super);
        function UIHeroIconCtrl_new() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIHeroIconCtrl_new.prototype;
        __egretProto__.init4HeroCell = function () {
            var self = this, clazz = self.__class;
            self.setVisibleByName(clazz.IMG_ICON, true);
            self.setVisibleByName(clazz.IMG_BORDER, true);
            self.setVisibleByName(clazz.IMG_FRAG, false);
            self.setVisibleByName(clazz.IMG_BG, true);
            self.setVisibleByName(clazz.LABEL_COUNT, false);
            self.setVisibleByName(clazz.RICH_COUNT, false);
            self.setVisibleByName(clazz.PANEL_TOUCH, false);
            self.setVisibleByName(clazz.IMG_ADD, false);
        };
        __egretProto__.set4HeroCell = function (icon, colorType, showBg, imgAdd) {
            var self = this, clazz = self.__class;
            self.setInfoByName(clazz.IMG_ICON, icon);
            self.transColorByName(clazz.IMG_BORDER, colorType);
            self.setVisibleByName(clazz.IMG_ADD, showBg);
            if (imgAdd) {
                self.setInfoByName(clazz.IMG_ADD, imgAdd);
            }
            else {
                self.setVisibleByName(clazz.IMG_ADD, false);
            }
        };
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._jsonPath = res.uiItemIcon_ui;
        };
        __egretProto__.init = function (container) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _super.prototype.init.call(this);
            var self = this;
            self.loadMaskTextureByName(self.__class.IMG_ICON, res.SpecialItemIcon.fragmentMask);
            if (container) {
                self.attachWidgetTo(container, -1);
            }
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            var container = self._container;
            container.iconWidget = null;
            container.iconCtrl = null;
            self._container = null;
        };
        __egretProto__.cleanContainer = function (container) {
            if (container.iconWidget) {
                container.iconWidget.removeFromParent(true);
                container.iconWidget = null;
            }
            container.iconCtrl = null;
        };
        //@override
        __egretProto__.attachWidgetTo = function (container, zorder, tag) {
            if (zorder === void 0) { zorder = 0; }
            var self = this;
            self.cleanContainer(container);
            _super.prototype.attachWidgetTo.apply(self, arguments);
            var widget = self.widget;
            //进行缩放设置
            var containerSize = container.getSize();
            var widgetSize = widget.getSize();
            widget.setScale(containerSize.width / widgetSize.width, containerSize.height / widgetSize.height);
            //设置属性
            container.iconCtrl = self;
            container.iconWidget = widget;
            container.bgOpacity = 0;
            self._container = container;
        };
        //@override
        __egretProto__.detachWidget = function () {
            var self = this;
            _super.prototype.detachWidget.call(this);
            if (self._container)
                self.cleanContainer(self._container);
            self._container = null;
        };
        __egretProto__.getContainer = function () {
            return this._container;
        };
        UIHeroIconCtrl_new.__className = "UIHeroIconCtrl_new";
        UIHeroIconCtrl_new.IMG_ICON = "img_icon"; //icon图标
        UIHeroIconCtrl_new.IMG_BORDER = "img_border"; //边框
        UIHeroIconCtrl_new.IMG_FRAG = "img_frag"; //碎片图标
        UIHeroIconCtrl_new.IMG_BG = "img_bg"; //背景图片
        UIHeroIconCtrl_new.LABEL_COUNT = "label_count"; //数量显示文字
        UIHeroIconCtrl_new.PANEL_TOUCH = "panel_touch"; //点击区域
        UIHeroIconCtrl_new.RICH_COUNT = "rich_count"; //显示富文本格式的数量
        UIHeroIconCtrl_new.IMG_ADD = "img_add"; //加号图片
        return UIHeroIconCtrl_new;
    })(mo.WidgetCtrl);
    uw.UIHeroIconCtrl_new = UIHeroIconCtrl_new;
    UIHeroIconCtrl_new.prototype.__class__ = "uw.UIHeroIconCtrl_new";
})(uw || (uw = {}));
