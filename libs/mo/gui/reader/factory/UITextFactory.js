var mo;
(function (mo) {
    var UITextData = (function (_super) {
        __extends(UITextData, _super);
        function UITextData() {
            _super.apply(this, arguments);
            this.fontSize = 32;
            this.fontType = 0;
            this.text = "";
            this.touchScaleEnable = false; //TODO 目前没用
            this.areaHeight = 0;
            this.areaWidth = 0;
            this.hAlignment = 0;
            this.vAlignment = 0;
        }
        var __egretProto__ = UITextData.prototype;
        return UITextData;
    })(mo.UIWidgetData);
    mo.UITextData = UITextData;
    UITextData.prototype.__class__ = "mo.UITextData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var HALIGN_MAP = {}, VALIGN_MAP = {};
    HALIGN_MAP[0] = mo.ALIGN_H_LEFT;
    HALIGN_MAP[1] = mo.ALIGN_H_CENTER;
    HALIGN_MAP[2] = mo.ALIGN_H_RIGHT;
    VALIGN_MAP[0] = mo.ALIGN_V_TOP;
    VALIGN_MAP[1] = mo.ALIGN_V_MIDDLE;
    VALIGN_MAP[2] = mo.ALIGN_V_BOTTOM;
    var UITextFactory = (function (_super) {
        __extends(UITextFactory, _super);
        function UITextFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UITextFactory.prototype;
        //@override
        __egretProto__._setProductAttr = function (product, data) {
            _super.prototype._setProductAttr.call(this, product, data);
            product.setFontName(data.fontName);
            product.setFontSize(data.fontSize);
            product.color = data.color;
            product.setHAlign(HALIGN_MAP[data.hAlignment]);
            product.setVAlign(VALIGN_MAP[data.vAlignment]);
            if (data.areaWidth != 0 && data.areaWidth != 0) {
                product.setAreaSize(data.areaWidth, data.areaHeight);
            }
            if (data.areaWidth == 0 && data.areaWidth == 0) {
                product.setAutoSizeWidth(true);
            }
            product.setText(data.text);
        };
        //@override
        UITextFactory.PRODUCT_CLASS = mo.UIText;
        return UITextFactory;
    })(mo.UIWidgetFactory);
    mo.UITextFactory = UITextFactory;
    UITextFactory.prototype.__class__ = "mo.UITextFactory";
    mo.uiReader.registerUIFactory(mo.UITextFactory);
})(mo || (mo = {}));
