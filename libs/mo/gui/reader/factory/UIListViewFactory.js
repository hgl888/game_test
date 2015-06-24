var mo;
(function (mo) {
    var UIListViewData = (function (_super) {
        __extends(UIListViewData, _super);
        function UIListViewData() {
            _super.apply(this, arguments);
            this.gravity = 3;
            this.itemMargin = 0;
        }
        var __egretProto__ = UIListViewData.prototype;
        return UIListViewData;
    })(mo.UIScrollViewData);
    mo.UIListViewData = UIListViewData;
    UIListViewData.prototype.__class__ = "mo.UIListViewData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UIListViewFactory = (function (_super) {
        __extends(UIListViewFactory, _super);
        function UIListViewFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIListViewFactory.prototype;
        //@override
        __egretProto__._setProductAttr = function (product, data) {
            _super.prototype._setProductAttr.call(this, product, data);
            product.setGravity(data.gravity);
            product.setItemsMargin(data.itemMargin);
        };
        //@override
        UIListViewFactory.PRODUCT_CLASS = mo.UIListView;
        return UIListViewFactory;
    })(mo.UIScrollViewFactory);
    mo.UIListViewFactory = UIListViewFactory;
    UIListViewFactory.prototype.__class__ = "mo.UIListViewFactory";
    mo.uiReader.registerUIFactory(mo.UIListViewFactory);
})(mo || (mo = {}));
