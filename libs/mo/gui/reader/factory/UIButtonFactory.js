var mo;
(function (mo) {
    var UIButtonData = (function (_super) {
        __extends(UIButtonData, _super);
        function UIButtonData() {
            _super.apply(this, arguments);
            this.textColor = 0;
            this.fontSize = 20;
            this.pressedActionEnabled = false;
        }
        var __egretProto__ = UIButtonData.prototype;
        return UIButtonData;
    })(mo.UIScale9Data);
    mo.UIButtonData = UIButtonData;
    UIButtonData.prototype.__class__ = "mo.UIButtonData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UIButtonFactory = (function (_super) {
        __extends(UIButtonFactory, _super);
        function UIButtonFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIButtonFactory.prototype;
        //@override
        __egretProto__._setProductAttr = function (product, data) {
            _super.prototype._setProductAttr.call(this, product, data);
            product.loadTextures(data.normal, data.pressed, data.disabled);
            product.setPressedActionEnabled(data.pressedActionEnabled);
            if (data.text) {
                product.setTitleText(data.text);
                product.setTitleFontSize(data.fontSize);
                product.setTitleFontName(data.fontName);
                product.setTitleColor(data.textColor);
            }
            //            debug("product.touchEnabled--->", product.touchEnabled);
        };
        //@override
        UIButtonFactory.PRODUCT_CLASS = mo.UIButton;
        return UIButtonFactory;
    })(mo.UIWidgetFactory);
    mo.UIButtonFactory = UIButtonFactory;
    UIButtonFactory.prototype.__class__ = "mo.UIButtonFactory";
    mo.uiReader.registerUIFactory(mo.UIButtonFactory);
})(mo || (mo = {}));
