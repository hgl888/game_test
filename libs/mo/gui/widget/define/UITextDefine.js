var mo;
(function (mo) {
    mo.ALIGN_H_LEFT = egret.HorizontalAlign.LEFT;
    mo.ALIGN_H_CENTER = egret.HorizontalAlign.CENTER;
    mo.ALIGN_H_RIGHT = egret.HorizontalAlign.RIGHT;
    mo.ALIGN_V_TOP = egret.VerticalAlign.TOP;
    mo.ALIGN_V_MIDDLE = egret.VerticalAlign.MIDDLE;
    mo.ALIGN_V_BOTTOM = egret.VerticalAlign.BOTTOM;
    var _UITextOption = (function (_super) {
        __extends(_UITextOption, _super);
        function _UITextOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _UITextOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            if (!self.textRenderer)
                self.textRenderer = new egret.TextField(); //需要先初始化好textRender
            self.textRenderer.lineSpacing = self.textRenderer.size * 0.3;
            self.isFlow = false;
            self.touchScaleEnabled = false;
            self.normalScaleValueX = 0;
            self.normalScaleValueY = 0;
            self.onSelectedScaleOffset = 0.5;
            self.placeHolder = "";
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.textRenderer = null; //需要先初始化好textRender
        };
        return _UITextOption;
    })(mo._UIWidgetOption);
    mo._UITextOption = _UITextOption;
    _UITextOption.prototype.__class__ = "mo._UITextOption";
})(mo || (mo = {}));
