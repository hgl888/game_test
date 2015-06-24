var res;
(function (res) {
    var _ = res;
    var ResParser = (function (_super) {
        __extends(ResParser, _super);
        function ResParser() {
            _super.apply(this, arguments);
            /**
             * 加载项字典
             */
            this._itemInfoDic = {};
            this._dataFormat = egret.URLLoaderDataFormat.BINARY;
            /**
             * URLLoader对象池
             */
            this._recycler = new egret.Recycler();
        }
        var __egretProto__ = ResParser.prototype;
        /**
         * 获取一个URLLoader对象
         */
        __egretProto__._getLoader = function () {
            var self = this;
            var loader = self._recycler.pop();
            if (!loader) {
                loader = new egret.URLLoader();
                loader.addEventListener(egret.Event.COMPLETE, self._onLoadFinish2, self);
                loader.addEventListener(egret.IOErrorEvent.IO_ERROR, self._onLoadFinish2, self);
            }
            loader.dataFormat = self._dataFormat;
            return loader;
        };
        /**
         * 获得真正的url
         * @param resCfgItem
         * @returns {string}
         */
        __egretProto__.getRealUrl = function (resCfgItem) {
            var url = resCfgItem.url;
            //如果已经是远程方式的，那么就直接返回
            if (url.indexOf("www.") == 0 || url.indexOf("http:") == 0)
                return url;
            return path.join(_.root, url);
        };
        /**
         * 资源加载。
         * @param resCfgItem
         * @param cb
         * @param ctx
         */
        __egretProto__.load = function (resCfgItem, cb, ctx) {
            //这里调用URLLoader去进行资源的加载
            var self = this;
            var loader = self._getLoader();
            self._itemInfoDic[loader.hashCode] = { item: resCfgItem, cb: cb, ctx: ctx };
            res._workingCount++;
            res.testMap[resCfgItem.url] = (res.testMap[resCfgItem.url] || 0) + 1;
            res.debug("loader begin load【type:%s】--->【%s】", self._dataFormat, resCfgItem.url);
            loader.load(new egret.URLRequest(self.getRealUrl(resCfgItem)));
        };
        /**
         * 解析资源内容
         * @param resCfgItem
         * @param data
         * @returns {any}
         */
        __egretProto__._parse = function (resCfgItem, data) {
            //这里进行内容的处理，将处理完的结果返回
            return data;
        };
        __egretProto__._onLoadFinish2 = function (event) {
            var self = this;
            var loader = (event.target);
            var itemInfo = self._itemInfoDic[loader.hashCode];
            var resCfgItem = itemInfo.item;
            var url = resCfgItem.url;
            res.debug("_onLoadFinish2---->【%s】", url);
            res.testMap[url]--;
            if (!res.testMap[url])
                delete res.testMap[url];
            res._workingCount--;
            if (res._queue.length == 0 && res._workingCount <= 0) {
                res._isLoading = false; //证明这时候已经结束了
            }
            this._onLoadFinish(event);
        };
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
            //res.debug("onLoadFinish--->" + resCfgItem.url + "--->" + (event.type == egret.Event.COMPLETE));
            if (event.type == egret.Event.COMPLETE) {
                result = res._cache(resCfgItem, self._parse(resCfgItem, data));
            }
            else {
                self._handleError(event, resCfgItem);
            }
            compFunc.call(itemInfo.ctx, result, resCfgItem);
        };
        __egretProto__._handleError = function (event, resCfgItem) {
            //在此处理异常信息
            res.error("load resource【%s】 failed! ", resCfgItem.url);
        };
        __egretProto__.unload = function (data, resCfgItem) {
            res.debug("unload--->【%s】", resCfgItem.url);
            //子类在此写卸载逻辑
            if (data && data.dispose) {
                res.debug("dispose--->【%s】", resCfgItem.url);
                data.dispose();
            }
        };
        ResParser.TYPE = "base";
        return ResParser;
    })(egret.EventDispatcher);
    res.ResParser = ResParser;
    ResParser.prototype.__class__ = "res.ResParser";
})(res || (res = {}));
