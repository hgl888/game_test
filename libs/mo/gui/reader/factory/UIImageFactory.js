var mo;
(function (mo) {
    var UIImageData = (function (_super) {
        __extends(UIImageData, _super);
        function UIImageData() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIImageData.prototype;
        return UIImageData;
    })(mo.UIScale9Data);
    mo.UIImageData = UIImageData;
    UIImageData.prototype.__class__ = "mo.UIImageData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UIImageFactory = (function (_super) {
        __extends(UIImageFactory, _super);
        function UIImageFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIImageFactory.prototype;
        //@override
        __egretProto__._setProductAttr = function (product, data) {
            _super.prototype._setProductAttr.call(this, product, data);
            product.loadTexture(data.res);
        };
        //@override
        UIImageFactory.PRODUCT_CLASS = mo.UIImage;
        return UIImageFactory;
    })(mo.UIWidgetFactory);
    mo.UIImageFactory = UIImageFactory;
    UIImageFactory.prototype.__class__ = "mo.UIImageFactory";
    mo.uiReader.registerUIFactory(mo.UIImageFactory);
})(mo || (mo = {}));
