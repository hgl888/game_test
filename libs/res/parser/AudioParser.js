var res;
(function (res) {
    var _ = res;
    var AudioParser = (function (_super) {
        __extends(AudioParser, _super);
        function AudioParser() {
            _super.apply(this, arguments);
            //@override
            this._dataFormat = egret.URLLoaderDataFormat.SOUND;
        }
        var __egretProto__ = AudioParser.prototype;
        //@override
        /**
         * 一项加载结束
         */
        __egretProto__._onLoadFinish = function (event) {
            var self = this;
            var loader = (event.target);
            var itemInfo = self._itemInfoDic[loader.hashCode];
            var data = loader.data;
            delete self._itemInfoDic[loader.hashCode];
            self._recycler.push(loader);
            var resCfgItem = itemInfo.item;
            var compFunc = itemInfo.cb;
            var result;
            res.info("onLoadFinish--->" + resCfgItem.url + "--->" + (event.type == egret.Event.COMPLETE));
            if (event.type == egret.Event.COMPLETE) {
                var flag = !!AudioParser._musicTypeMap[resCfgItem.url];
                var type = flag ? egret.Sound.MUSIC : egret.Sound.EFFECT;
                return data.preload(type, function () {
                    //debug("audio loaded-->%s", resCfgItem.url);
                    result = res._cache(resCfgItem, self._parse(resCfgItem, data));
                    compFunc.call(itemInfo.ctx, result, resCfgItem);
                }, null);
            }
            else {
                self._handleError(event, resCfgItem);
                compFunc.call(itemInfo.ctx, result, resCfgItem);
            }
        };
        AudioParser.addForMusicType = function (url) {
            AudioParser._musicTypeMap[url] = true;
        };
        AudioParser._musicTypeMap = {};
        return AudioParser;
    })(res.ResParser);
    res.AudioParser = AudioParser;
    AudioParser.prototype.__class__ = "res.AudioParser";
    //@override
    AudioParser.TYPE = "audio";
    res.registerParser(AudioParser, "mp3", "ogg");
})(res || (res = {}));
