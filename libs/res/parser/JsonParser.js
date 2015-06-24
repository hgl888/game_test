var res;
(function (res) {
    var _ = res;
    var JsonParser = (function (_super) {
        __extends(JsonParser, _super);
        function JsonParser() {
            _super.apply(this, arguments);
            //@override
            this._dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        var __egretProto__ = JsonParser.prototype;
        //@override
        __egretProto__._parse = function (resCfgItem, data) {
            try {
                return JSON.parse(data);
            }
            catch (e) {
                console.error("JSON文件格式不正确: " + resCfgItem.url + "\ndata:" + data);
                return null;
            }
        };
        return JsonParser;
    })(res.ResParser);
    res.JsonParser = JsonParser;
    JsonParser.prototype.__class__ = "res.JsonParser";
    //@override
    JsonParser.TYPE = "json";
    res.registerParser(JsonParser, "json");
})(res || (res = {}));
