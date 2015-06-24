var mo;
(function (mo) {
    var _ = mo;
    var UIReader = (function () {
        function UIReader() {
            this._factoryDic = {};
        }
        var __egretProto__ = UIReader.prototype;
        __egretProto__.genWidget = function (data) {
            if (typeof data == "string") {
                var dataName = data;
                data = res.getRes(data); //如果是字符串则从res中获取下数据先
                if (!data) {
                    mo.warn("请确保已经加载了ui资源：【%s】", dataName);
                    return null;
                }
            }
            var widgetTree = data.widgetTree;
            return this._genWidget(widgetTree);
        };
        __egretProto__._genWidget = function (data) {
            var factory = this._factoryDic[data.className].getInstance();
            var widget = factory.produce(data);
            var childrenData = data.children;
            if (childrenData) {
                for (var i = 0, li = childrenData.length; i < li; ++i) {
                    var childData = childrenData[i];
                    var child = this._genWidget(childData);
                    if (child)
                        widget.addChild(child);
                }
            }
            return widget;
        };
        __egretProto__.registerUIFactory = function (factoryClass) {
            var name = factoryClass.PRODUCT_CLASS.__className;
            this._factoryDic[name] = factoryClass;
        };
        return UIReader;
    })();
    mo.UIReader = UIReader;
    UIReader.prototype.__class__ = "mo.UIReader";
    mo.uiReader = new UIReader();
    res.setParserAlias(res.TextParser, "fnt");
})(mo || (mo = {}));
