var mo;
(function (mo) {
    var UIScrollViewData = (function (_super) {
        __extends(UIScrollViewData, _super);
        function UIScrollViewData() {
            _super.apply(this, arguments);
            this.direction = 1;
            this.innerWidth = 200; //TODO
            this.innerHeight = 200; //TODO
        }
        var __egretProto__ = UIScrollViewData.prototype;
        return UIScrollViewData;
    })(mo.UIPanelData);
    mo.UIScrollViewData = UIScrollViewData;
    UIScrollViewData.prototype.__class__ = "mo.UIScrollViewData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UIScrollViewFactory = (function (_super) {
        __extends(UIScrollViewFactory, _super);
        function UIScrollViewFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIScrollViewFactory.prototype;
        //@override
        __egretProto__._setProductAttr = function (product, data) {
            _super.prototype._setProductAttr.call(this, product, data);
            product.direction = data.direction;
            product.setInnerContainerSize(mo.size(data.innerWidth, data.innerHeight));
            product.getInnerContainer().setSrcSize(mo.size(data.innerWidth, data.innerHeight));
            //TODO
        };
        //@override
        UIScrollViewFactory.PRODUCT_CLASS = mo.UIScrollView;
        return UIScrollViewFactory;
    })(mo.UIPanelFactory);
    mo.UIScrollViewFactory = UIScrollViewFactory;
    UIScrollViewFactory.prototype.__class__ = "mo.UIScrollViewFactory";
    mo.uiReader.registerUIFactory(mo.UIScrollViewFactory);
})(mo || (mo = {}));
