var mo;
(function (mo) {
    var _ = mo;
    var FontDef = (function (_super) {
        __extends(FontDef, _super);
        function FontDef() {
            _super.apply(this, arguments);
            this.xOffset = 0;
            this.yOffset = 0;
            this.xAdvance = 0;
        }
        var __egretProto__ = FontDef.prototype;
        return FontDef;
    })(mo.Rect);
    mo.FontDef = FontDef;
    FontDef.prototype.__class__ = "mo.FontDef";
    var UIFntParser = (function (_super) {
        __extends(UIFntParser, _super);
        function UIFntParser() {
            _super.call(this);
            //@override
            this._dataFormat = egret.URLLoaderDataFormat.TEXT;
            var self = this;
            self.addEventListener(egret.Event.COMPLETE, self._onLoadFinish, self);
            self.addEventListener(egret.IOErrorEvent.IO_ERROR, self._onLoadFinish, self);
        }
        var __egretProto__ = UIFntParser.prototype;
        //@override
        __egretProto__.load = function (resCfgItem, cb, ctx) {
            //这里调用URLLoader去进行资源的加载
            var self = this;
            var url = resCfgItem.url;
            var url1 = path2.changeExtname(url, ".fnt");
            var url2 = path2.changeExtname(url, ".png");
            var resCfgItem1 = res.getResCfgItem(url1);
            var resCfgItem2 = res.getResCfgItem(url2);
            resCfgItem1.type = res.TextParser.TYPE;
            resCfgItem1.notToModule = resCfgItem2.notToModule = true;
            res.load([resCfgItem1, resCfgItem2], function (err, results) {
                if (err || results.length != 2) {
                    var event = new egret.Event(egret.IOErrorEvent.IO_ERROR);
                    self.dispatchEvent(event);
                }
                else {
                    var event = new egret.Event(egret.Event.COMPLETE);
                    event.data = [{ item: resCfgItem, cb: cb, ctx: ctx }, results];
                    self.dispatchEvent(event);
                }
            });
        };
        /**
         * 一项加载结束
         */
        __egretProto__._onLoadFinish = function (event) {
            var self = this;
            var eventData = event.data;
            var itemInfo = eventData[0];
            var resCfgItem = itemInfo.item;
            var compFunc = itemInfo.cb;
            var result;
            if (event.type == egret.Event.COMPLETE) {
                result = res._cache(resCfgItem, self._parse(resCfgItem, eventData[1]));
            }
            else {
                self._handleError(event, resCfgItem);
            }
            compFunc.call(itemInfo.ctx, result, resCfgItem);
        };
        //@override
        __egretProto__._parse = function (resCfgItem, results) {
            var textData = results[0];
            var Texture = results[1];
            //创建纹理集
            var spriteSheet = new egret.SpriteSheet(Texture);
            var re, line;
            var fontDefDictionary = {};
            re = /char id=\w[a-z0-9\-= ]+/gi;
            line = textData.match(re);
            if (line) {
                for (var i = 0; i < line.length; i++) {
                    var element = this._parseCharDef(line[i]);
                    fontDefDictionary[element.charID] = element;
                }
            }
            for (var key in fontDefDictionary) {
                var fontDef = fontDefDictionary[key];
                var name = String.fromCharCode(fontDef.charID);
                spriteSheet.createTexture(name, fontDef.x, fontDef.y, fontDef.width, fontDef.height, fontDef.xOffset, fontDef.yOffset);
            }
            return spriteSheet;
        };
        __egretProto__._parseCharDef = function (line) {
            var charDef = new FontDef();
            // Character ID
            var value = /id=(\d+)/gi.exec(line)[1];
            charDef.charID = value.toString();
            // Character x
            value = /x=([\-\d]+)/gi.exec(line)[1];
            charDef.x = parseInt(value);
            // Character y
            value = /y=([\-\d]+)/gi.exec(line)[1];
            charDef.y = parseInt(value);
            // Character width
            value = /width=([\-\d]+)/gi.exec(line)[1];
            charDef.width = parseInt(value);
            // Character height
            value = /height=([\-\d]+)/gi.exec(line)[1];
            charDef.height = parseInt(value);
            // Character xoffset
            value = /xoffset=([\-\d]+)/gi.exec(line)[1];
            charDef.xOffset = parseInt(value);
            // Character yoffset
            value = /yoffset=([\-\d]+)/gi.exec(line)[1];
            charDef.yOffset = parseInt(value);
            // Character xadvance
            value = /xadvance=([\-\d]+)/gi.exec(line)[1];
            charDef.xAdvance = parseInt(value);
            return charDef;
        };
        __egretProto__.unload = function (data, resCfgItem) {
            var url = resCfgItem.url;
            res.debug("unload--->【%s】", url);
            res.unload([
                path2.changeExtname(url, ".fnt"),
                path2.changeExtname(url, ".png")
            ]);
        };
        return UIFntParser;
    })(res.ResParser);
    mo.UIFntParser = UIFntParser;
    UIFntParser.prototype.__class__ = "mo.UIFntParser";
    //@override
    UIFntParser.TYPE = "bmf";
    res.registerParser(mo.UIFntParser, "bmf");
})(mo || (mo = {}));
