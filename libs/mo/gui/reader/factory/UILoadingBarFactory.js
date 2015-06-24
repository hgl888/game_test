var mo;
(function (mo) {
    var UILoadingBarData = (function (_super) {
        __extends(UILoadingBarData, _super);
        function UILoadingBarData() {
            _super.apply(this, arguments);
            this.direction = 0;
            this.percent = 100;
        }
        var __egretProto__ = UILoadingBarData.prototype;
        return UILoadingBarData;
    })(mo.UIScale9Data);
    mo.UILoadingBarData = UILoadingBarData;
    UILoadingBarData.prototype.__class__ = "mo.UILoadingBarData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UILoadingBarFactory = (function (_super) {
        __extends(UILoadingBarFactory, _super);
        function UILoadingBarFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UILoadingBarFactory.prototype;
        //@override
        __egretProto__._setProductAttr = function (product, data) {
            _super.prototype._setProductAttr.call(this, product, data);
            product.loadTexture(data.res);
            product.setPercent(data.percent);
            product.setDirection(data.direction);
        };
        //@override
        UILoadingBarFactory.PRODUCT_CLASS = mo.UILoadingBar;
        return UILoadingBarFactory;
    })(mo.UIWidgetFactory);
    mo.UILoadingBarFactory = UILoadingBarFactory;
    UILoadingBarFactory.prototype.__class__ = "mo.UILoadingBarFactory";
    mo.uiReader.registerUIFactory(mo.UILoadingBarFactory);
})(mo || (mo = {}));
