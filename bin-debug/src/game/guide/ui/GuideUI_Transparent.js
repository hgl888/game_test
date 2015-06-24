var uw;
(function (uw) {
    var GuideUI_Transparent = (function (_super) {
        __extends(GuideUI_Transparent, _super);
        function GuideUI_Transparent() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideUI_Transparent.prototype;
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            var rootWidget = new mo.UIPanel();
            rootWidget.width = self.width;
            rootWidget.height = self.height;
            self._setRootWidget(rootWidget);
            self._setPenetrable(true); //设置成可穿透
        };
        GuideUI_Transparent.__className = "GuideUI_Transparent";
        return GuideUI_Transparent;
    })(mo.GuideUI);
    uw.GuideUI_Transparent = GuideUI_Transparent;
    GuideUI_Transparent.prototype.__class__ = "uw.GuideUI_Transparent";
})(uw || (uw = {}));
