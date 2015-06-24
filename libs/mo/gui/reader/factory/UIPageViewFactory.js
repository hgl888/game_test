var mo;
(function (mo) {
    var UIPageViewData = (function (_super) {
        __extends(UIPageViewData, _super);
        function UIPageViewData() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIPageViewData.prototype;
        return UIPageViewData;
    })(mo.UIPanelData);
    mo.UIPageViewData = UIPageViewData;
    UIPageViewData.prototype.__class__ = "mo.UIPageViewData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UIPageViewFactory = (function (_super) {
        __extends(UIPageViewFactory, _super);
        function UIPageViewFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIPageViewFactory.prototype;
        //        @override
        UIPageViewFactory.PRODUCT_CLASS = mo.UIPageView;
        return UIPageViewFactory;
    })(mo.UIPanelFactory);
    mo.UIPageViewFactory = UIPageViewFactory;
    UIPageViewFactory.prototype.__class__ = "mo.UIPageViewFactory";
    mo.uiReader.registerUIFactory(mo.UIPageViewFactory);
})(mo || (mo = {}));
