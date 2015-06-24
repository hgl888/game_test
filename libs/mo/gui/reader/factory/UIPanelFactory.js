var mo;
(function (mo) {
    var UIPanelData = (function (_super) {
        __extends(UIPanelData, _super);
        function UIPanelData() {
            _super.apply(this, arguments);
            this.adaptScreen = false;
            this.bgColor = 0xffffff;
            this.bgOpacity = 255;
            //TODO 目前bgStartColor和bgEndColor没有用，因为当前egret还不支持渐变色
            this.bgStartColor = 0xffffff;
            this.bgEndColor = 0xffffff;
            this.clippingEnabled = false; //TODO 以后可能会修改名称
            this.layoutType = 0;
            this.vectorX = 0; //TODO 不知道干嘛的
            this.vectorY = 0; //TODO 不知道干嘛的
            this.anchorX = 0;
            this.anchorY = 0;
        }
        var __egretProto__ = UIPanelData.prototype;
        return UIPanelData;
    })(mo.UIScale9Data);
    mo.UIPanelData = UIPanelData;
    UIPanelData.prototype.__class__ = "mo.UIPanelData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UIPanelFactory = (function (_super) {
        __extends(UIPanelFactory, _super);
        function UIPanelFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIPanelFactory.prototype;
        //@override
        __egretProto__._setProductAttr = function (product, data) {
            _super.prototype._setProductAttr.call(this, product, data);
            product.bgColor = data.bgColor;
            //            console.log("data.bgColor--->", data.bgColor, data.bgOpacity);
            product.bgOpacity = data.bgOpacity;
            product.clippingEnabled = data.clippingEnabled;
            product.bgTexture = res.getRes(data.res);
            product.layoutType = data.layoutType;
            var s9e = data.scale9Enabled;
            if (s9e) {
                product.scale9Enabled = s9e;
                var s9g = data.scale9Grid;
                product.scale9Grid = mo.rect(s9g[0], s9g[1], s9g[2], s9g[3]);
            }
        };
        //@override
        UIPanelFactory.PRODUCT_CLASS = mo.UIPanel;
        return UIPanelFactory;
    })(mo.UIWidgetFactory);
    mo.UIPanelFactory = UIPanelFactory;
    UIPanelFactory.prototype.__class__ = "mo.UIPanelFactory";
    mo.uiReader.registerUIFactory(mo.UIPanelFactory);
})(mo || (mo = {}));
