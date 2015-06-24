var res;
(function (res) {
    var _ = res;
    var ImageParser = (function (_super) {
        __extends(ImageParser, _super);
        function ImageParser() {
            _super.apply(this, arguments);
            //@override
            this._dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        }
        var __egretProto__ = ImageParser.prototype;
        //@override
        __egretProto__._parse = function (resCfgItem, data) {
            //这里进行内容的处理，将处理完的结果返回
            var str = resCfgItem["scale9grid"];
            if (str) {
                var list = str.split(",");
                data["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
            }
            data.url = resCfgItem.url; //注意了，这里很黄很暴力
            return data;
        };
        return ImageParser;
    })(res.ResParser);
    res.ImageParser = ImageParser;
    ImageParser.prototype.__class__ = "res.ImageParser";
    //@override
    ImageParser.TYPE = "image";
    res.registerParser(ImageParser, "png", "jpg");
})(res || (res = {}));
