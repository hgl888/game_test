var mo;
(function (mo) {
    var UIInputData = (function (_super) {
        __extends(UIInputData, _super);
        function UIInputData() {
            _super.apply(this, arguments);
            //        public maxLengthEnable:boolean = false;//TODO 这个目前没用，解析也不做
            this.passwordEnable = false;
            //        public passwordStyleText:string = "*";//TODO 这个目前没用，解析也不做
            this.placeHolder = "input words here";
        }
        var __egretProto__ = UIInputData.prototype;
        return UIInputData;
    })(mo.UITextData);
    mo.UIInputData = UIInputData;
    UIInputData.prototype.__class__ = "mo.UIInputData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UIInputFactory = (function (_super) {
        __extends(UIInputFactory, _super);
        function UIInputFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIInputFactory.prototype;
        //@override
        __egretProto__._setProductAttr = function (product, data) {
            _super.prototype._setProductAttr.call(this, product, data);
            product.setPasswordEnabled(data.passwordEnable);
            product.setPlaceHolder(data.placeHolder);
        };
        //@override
        UIInputFactory.PRODUCT_CLASS = mo.UIInput;
        return UIInputFactory;
    })(mo.UITextFactory);
    mo.UIInputFactory = UIInputFactory;
    UIInputFactory.prototype.__class__ = "mo.UIInputFactory";
    mo.uiReader.registerUIFactory(mo.UIInputFactory);
})(mo || (mo = {}));
