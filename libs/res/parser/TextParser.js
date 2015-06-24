var res;
(function (res) {
    var _ = res;
    var TextParser = (function (_super) {
        __extends(TextParser, _super);
        function TextParser() {
            _super.apply(this, arguments);
            //@override
            this._dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        var __egretProto__ = TextParser.prototype;
        return TextParser;
    })(res.ResParser);
    res.TextParser = TextParser;
    TextParser.prototype.__class__ = "res.TextParser";
    //@override
    TextParser.TYPE = "text";
    res.registerParser(TextParser, "txt", "fsh", "vsh");
})(res || (res = {}));
