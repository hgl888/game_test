var mo;
(function (mo) {
    var UIScale9Data = (function (_super) {
        __extends(UIScale9Data, _super);
        function UIScale9Data() {
            _super.apply(this, arguments);
            this.scale9Enabled = false;
            this.scale9Grid = [0, 0, 1, 1]; //x,y,w,h
        }
        var __egretProto__ = UIScale9Data.prototype;
        return UIScale9Data;
    })(mo.UIWidgetData);
    mo.UIScale9Data = UIScale9Data;
    UIScale9Data.prototype.__class__ = "mo.UIScale9Data";
    var UIRootData = (function () {
        function UIRootData() {
            this.designHeight = 0;
            this.designWidth = 0;
            this.textures = [];
            this.dataScale = 1;
        }
        var __egretProto__ = UIRootData.prototype;
        return UIRootData;
    })();
    mo.UIRootData = UIRootData;
    UIRootData.prototype.__class__ = "mo.UIRootData";
    var UILayoutParameter = (function () {
        function UILayoutParameter() {
            this.type = 0;
            this.align = 0; //TODO
            this.gravity = 0;
            this.eageType = 0; //TODO 目前没用
            this.normalHorizontal = 0;
            this.normalVertical = 0;
            this.parentHorizontal = 0;
            this.parentVertical = 0;
            this.margin = []; //上右下左，保持和html一直的规则
        }
        var __egretProto__ = UILayoutParameter.prototype;
        return UILayoutParameter;
    })();
    mo.UILayoutParameter = UILayoutParameter;
    UILayoutParameter.prototype.__class__ = "mo.UILayoutParameter";
})(mo || (mo = {}));
