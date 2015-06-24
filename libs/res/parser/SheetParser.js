var res;
(function (res) {
    var _ = res;
    var FrameData = (function () {
        function FrameData() {
        }
        var __egretProto__ = FrameData.prototype;
        return FrameData;
    })();
    res.FrameData = FrameData;
    FrameData.prototype.__class__ = "res.FrameData";
    var SheetData = (function () {
        function SheetData() {
        }
        var __egretProto__ = SheetData.prototype;
        return SheetData;
    })();
    res.SheetData = SheetData;
    SheetData.prototype.__class__ = "res.SheetData";
    var SheetParser = (function (_super) {
        __extends(SheetParser, _super);
        function SheetParser() {
            _super.call(this);
            var self = this;
            self.addEventListener(egret.Event.COMPLETE, self._onLoadFinish, self);
            self.addEventListener(egret.IOErrorEvent.IO_ERROR, self._onLoadFinish, self);
        }
        var __egretProto__ = SheetParser.prototype;
        //@override
        __egretProto__.load = function (resCfgItem, cb, ctx) {
            //这里调用URLLoader去进行资源的加载
            var self = this;
            var url = resCfgItem.url;
            var url1 = path2.changeExtname(url, ".json");
            var url2 = path2.changeExtname(url, ".png");
            var resCfgItem1 = res.getResCfgItem(url1);
            var resCfgItem2 = res.getResCfgItem(url2);
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
        __egretProto__._parseSheetData = function (data) {
            var sheetData = new SheetData();
            var frames = data["frames"];
            var tempFrames = [];
            for (var i = 0; i < frames.length; ++i) {
                var frame = frames[i];
                var frameData = new FrameData();
                tempFrames.push(frameData);
                frameData.name = frame["filename"];
                frameData.x = frame["frame"]["x"];
                frameData.y = frame["frame"]["y"];
                frameData.w = frame["frame"]["w"];
                frameData.h = frame["frame"]["h"];
                frameData.sourceW = frame["sourceSize"]["w"];
                frameData.sourceH = frame["sourceSize"]["h"];
                frameData.scale9grid = frame["scale9grid"];
                frameData.rotated = frame["rotated"];
                frameData.trimmed = frame["trimmed"];
                frameData.offX = frame["spriteSourceSize"]["x"];
                frameData.offY = frame["spriteSourceSize"]["y"];
            }
            sheetData.frames = tempFrames;
            return sheetData;
        };
        //@override
        __egretProto__._parse = function (resCfgItem, results) {
            var sheetData = this._parseSheetData(results[0]);
            var texture = results[1];
            var frames = sheetData.frames;
            if (!frames) {
                return null;
            }
            var spriteSheet = new egret.SpriteSheet(texture);
            for (var i = 0; i < frames.length; ++i) {
                var frameData = frames[i];
                var rotated = frameData.rotated;
                var w = rotated ? frameData.h : frameData.w;
                var h = rotated ? frameData.w : frameData.h;
                var texture = spriteSheet.createTexture(frameData.name, frameData.x, frameData.y, w, h, frameData.offX, frameData.offY, frameData.sourceW, frameData.sourceH);
                if (rotated)
                    texture["rotation"] = 90;
                if (frameData.scale9grid) {
                    var str = frameData.scale9grid;
                    var list = str.split(",");
                    texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]), parseInt(list[1]), parseInt(list[2]), parseInt(list[3]));
                }
            }
            return spriteSheet;
        };
        __egretProto__.unload = function (data, resCfgItem) {
            var url = resCfgItem.url;
            res.debug("unload--->【%s】", url);
            res.unload([
                path2.changeExtname(url, ".json"),
                path2.changeExtname(url, ".png")
            ]);
            if (data && data.dispose) {
                data.dispose();
            }
        };
        return SheetParser;
    })(res.ResParser);
    res.SheetParser = SheetParser;
    SheetParser.prototype.__class__ = "res.SheetParser";
    //@override
    SheetParser.TYPE = "sheet";
    res.registerParser(SheetParser, "sheet");
})(res || (res = {}));
