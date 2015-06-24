var mo;
(function (mo) {
    var UIWidgetData = (function () {
        function UIWidgetData() {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.anchorX = 0.5; //ccs里面叫做anchorPointX
            this.anchorY = 0.5; //ccs里面叫做anchorPointY
            this.ignoreSize = false; //TODO 目前key里面没解析
            this.posType = 0; //ccs里面叫做positionType
            this.posPercentX = 0; //ccs里面叫做positionPercentX
            this.posPercentY = 0; //ccs里面叫做positionPercentY
            this.sizeType = 0;
            this.sizePercentX = 0;
            this.sizePercentY = 0;
            this.zOrder = 0; //ccs里面叫做ZOrder
            //颜色
            this.colorType = 0; //TODO 目前没用
            this.color = 0; //默认黑色
            this.flipX = false;
            this.flipY = false;
            this.opacity = 255; //透明度
            this.rotation = 0; //旋转
            this.scaleX = 1;
            this.scaleY = 1;
            //TODO 令人费解的api 目前没用
            this.scaleWidth = 1;
            this.scaleHeight = 1;
            this.scale9Enabled = false;
            this.touchEnabled = false;
            this.visible = true;
            this.layoutParameter = null;
        }
        var __egretProto__ = UIWidgetData.prototype;
        return UIWidgetData;
    })();
    mo.UIWidgetData = UIWidgetData;
    UIWidgetData.prototype.__class__ = "mo.UIWidgetData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var UIWidgetFactory = (function () {
        function UIWidgetFactory() {
            this.__class = this["constructor"];
        }
        var __egretProto__ = UIWidgetFactory.prototype;
        UIWidgetFactory.getInstance = function () {
            var instanceName = "__instance";
            if (!this[instanceName])
                this[instanceName] = new this();
            return this[instanceName];
        };
        __egretProto__.produce = function (data) {
            var product = new this.__class.PRODUCT_CLASS();
            this._setProductAttr(product, data);
            return product;
        };
        __egretProto__._setProductAttr = function (product, data) {
            product.name = data.name;
            product.x = data.x;
            product.y = data.y;
            product.setSrcPos(data.x, data.y);
            //            product.setPosition(data.x, data.y);
            product.width = data.width;
            product.height = data.height;
            product.setSrcSize(data.width, data.height);
            //            product.setSize(data.width, data.height);
            product.anchorX = data.anchorX;
            product.anchorY = data.anchorY;
            //            product.setAnchorPoint(data.anchorX, data.anchorY);
            product.alpha = data.opacity / 255;
            product.touchEnabled = data.touchEnabled;
            product.visible = data.visible;
            product.rotation = data.rotation;
            product.zOrder = data.zOrder;
            var layoutParameter = data.layoutParameter;
            if (layoutParameter) {
                var param;
                switch (layoutParameter.type) {
                    case mo.LayoutParameterType.none: break;
                    case mo.LayoutParameterType.linear:
                        param = new mo.LinearLayoutParameter();
                        param.gravity = layoutParameter.gravity || param.gravity;
                        break;
                    case mo.LayoutParameterType.relative:
                        param = new mo.RelativeLayoutParameter();
                        param.align = layoutParameter.align;
                        break;
                }
                if (param) {
                    param.setMargin(new mo.Margin(layoutParameter.margin));
                    product.setLayoutParameter(param);
                }
            }
            product.scaleX = data.scaleX;
            product.scaleY = data.scaleY;
            product.setPositionType(data.posType);
            product.posPercentX = data.posPercentX;
            product.posPercentY = data.posPercentY;
            product.setSizeType(data.sizeType);
            product.sizePercentX = data.sizePercentX;
            product.sizePercentY = data.sizePercentY;
            //TODO egret还不支持 color设置
            //TODO egret还不支持 flip设置
        };
        UIWidgetFactory.PRODUCT_CLASS = mo.UIWidget;
        return UIWidgetFactory;
    })();
    mo.UIWidgetFactory = UIWidgetFactory;
    UIWidgetFactory.prototype.__class__ = "mo.UIWidgetFactory";
})(mo || (mo = {}));
