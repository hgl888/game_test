var mo;
(function (mo) {
    var UITextAtlasData = (function (_super) {
        __extends(UITextAtlasData, _super);
        function UITextAtlasData() {
            _super.apply(this, arguments);
            this.itemWidth = 0;
            this.itemHeight = 0;
            this.startCharMap = "0";
        }
        var __egretProto__ = UITextAtlasData.prototype;
        return UITextAtlasData;
    })(mo.UITextData);
    mo.UITextAtlasData = UITextAtlasData;
    UITextAtlasData.prototype.__class__ = "mo.UITextAtlasData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    //TODO
    var UITextAtlasFactory = (function (_super) {
        __extends(UITextAtlasFactory, _super);
        function UITextAtlasFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UITextAtlasFactory.prototype;
        //@override
        __egretProto__._setProductAttr = function (product, data) {
            _super.prototype._setProductAttr.call(this, product, data);
            product.setProperty(data.text, data.res, data.itemWidth, data.itemHeight, data.startCharMap);
        };
        //@override
        UITextAtlasFactory.PRODUCT_CLASS = mo.UITextAtlas;
        return UITextAtlasFactory;
    })(mo.UIWidgetFactory);
    mo.UITextAtlasFactory = UITextAtlasFactory;
    UITextAtlasFactory.prototype.__class__ = "mo.UITextAtlasFactory";
    mo.uiReader.registerUIFactory(mo.UITextAtlasFactory);
})(mo || (mo = {}));
