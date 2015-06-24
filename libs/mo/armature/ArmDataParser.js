/**
 * Created by SmallAiTT on 2015/3/9.
 */
var mo;
(function (mo) {
    var ArmDataParser = (function (_super) {
        __extends(ArmDataParser, _super);
        function ArmDataParser() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ArmDataParser.prototype;
        /**
         * 资源加载。
         * @param resCfgItem
         * @param cb
         * @param ctx
         */
        __egretProto__.load = function (resCfgItem, cb, ctx) {
            if (!resCfgItem)
                return; //已经木有了
            //这里调用URLLoader去进行资源的加载
            var self = this;
            var url = resCfgItem.url;
            res.testMap[url] = (res.testMap[url] || 0) + 1;
            var func = function (err, results) {
                res.testMap[url]--;
                if (!res.testMap[url])
                    delete res.testMap[url];
                if (err) {
                    res.error("ArmDataParser Error--->", err);
                    cb.call(ctx, null);
                }
                else {
                    var result = {
                        ske: results[0],
                        textureData: results[1],
                        png: results[2]
                    };
                    //加载数据到工厂中
                    if (egret.MainContext.runtimeType != egret.MainContext.RUNTIME_NATIVE) {
                        var factory = mo._dbFactory;
                        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(results[0]));
                        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(results[2], results[1]));
                    }
                    res._cache(resCfgItem, result); //只缓存一次
                    cb.call(ctx, null);
                }
                self._isLoading = false;
            };
            self._loadArm(resCfgItem, func);
        };
        __egretProto__.unload = function (data, resCfgItem) {
            var factory = mo._dbFactory;
            var url = resCfgItem.url;
            var armName = path.basename(url, ".arm");
            var dirname = path.dirname(url);
            res.debug("unload--->【%s】", url);
            if (egret.MainContext.runtimeType != egret.MainContext.RUNTIME_NATIVE) {
                res.unload([
                    path.join(dirname, armName + "_ske.json"),
                    path.join(dirname, armName + "_texture.json"),
                    path.join(dirname, armName + "_texture.png")
                ]);
            }
            var name = path.basename(resCfgItem.url, ".arm");
            if (factory.removeDragonBonesData) {
                factory.removeDragonBonesData(name);
            }
            if (factory.removeTextureAtlas) {
                factory.removeTextureAtlas(name);
            }
        };
        __egretProto__._loadArm = function (resCfgItem, func) {
            var url = resCfgItem.url;
            var armName = path.basename(url, ".arm");
            var dirname = path.dirname(url);
            var arr = [
                path.join(dirname, armName + "_ske.json"),
                path.join(dirname, armName + "_texture.json"),
                path.join(dirname, armName + "_texture.png")
            ];
            var resArr = [];
            for (var i = 0, l_i = arr.length; i < l_i; i++) {
                var rci = res.getResCfgItem(arr[i]);
                rci.notToModule = true;
                resArr.push(rci);
            }
            res.load(resArr, func);
            //async.map(arr,
            //    function(url, index, cb1){
            //        var rci = res.getResCfgItem(url);
            //        res._counter[url] = (res._counter[url] || 0) + 1;
            //        rci.notToCache = true;
            //        rci.moduleName = resCfgItem.moduleName;
            //        var parser:res.ResParser = res.getParser(rci.type);
            //        parser.load(rci, function(rul){
            //            cb1(null, rul);
            //        }, null);
            //    }, func);
        };
        //@override
        ArmDataParser.TYPE = "arm";
        return ArmDataParser;
    })(res.ResParser);
    mo.ArmDataParser = ArmDataParser;
    ArmDataParser.prototype.__class__ = "mo.ArmDataParser";
    if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_NATIVE) {
        ArmDataParser.prototype._loadArm = function (resCfgItem, func) {
            var url = resCfgItem.url;
            var armName = path.basename(url, ".arm");
            var dirname = path.dirname(url);
            var resRoot = res.root;
            var skeUrl = path.join(resRoot, dirname, armName + "_ske.json");
            var textureJsonUrl = path.join(resRoot, dirname, armName + "_texture.json");
            var pngUrl = path.join(resRoot, dirname, armName + "_texture.png");
            var versionCtr = (egret.MainContext.instance.netContext)._versionCtr;
            function download(url, callback) {
                if (!egret_native.isFileExists(url)) {
                }
                else if (!versionCtr.checkIsNewVersion(url)) {
                }
                else {
                    callback.call();
                    return;
                }
                var promise = egret.PromiseObject.create();
                promise.onSuccessFunc = function () {
                    versionCtr.saveVersion(url);
                    callback.call();
                };
                promise.onErrorFunc = function () {
                    callback.call(null, "加载失败");
                };
                egret_native.download(url, url, promise);
            }
            function addToMember() {
                var factory = mo._dbFactory;
                var promise = new egret.PromiseObject();
                promise.onSuccessFunc = function (name) {
                    process.nextTick(function () {
                        func(null, [{}, {}, {}]);
                    });
                    //res.info("load db data onSuccess name="+name);
                };
                factory.loadTextureAtlas(textureJsonUrl, pngUrl, armName);
                //factory.loadDragonBonesData(skeUrl, armName);
                factory.loadDragonBonesDataAsync(skeUrl, armName, promise);
            }
            async.parallel([
                function (cb1) {
                    download(skeUrl, cb1);
                },
                function (cb1) {
                    download(textureJsonUrl, cb1);
                },
                function (cb1) {
                    download(pngUrl, cb1);
                }
            ], addToMember);
        };
    }
    res.registerParser(ArmDataParser, "arm");
})(mo || (mo = {}));
