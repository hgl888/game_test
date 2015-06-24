var res;
(function (res) {
    res.log;
    res.debug;
    res.info;
    res.warn;
    res.error;
    logger.initLogger(res, "res");
    logger.setLvl("res", 4);
    var ResCfgItem = (function () {
        function ResCfgItem() {
            this.notToCache = false;
            this.notToModule = false;
        }
        var __egretProto__ = ResCfgItem.prototype;
        return ResCfgItem;
    })();
    res.ResCfgItem = ResCfgItem;
    ResCfgItem.prototype.__class__ = "res.ResCfgItem";
    res._pool = {}; //资源缓存池
    res._resCfg = {}; //资源配置
    res._aliasCfg = {}; //资源别名配置
    res._counter = {}; //资源加载计数器
    res._parserDic = {}; //资源解析器映射库，key为解析器type。
    res._parserAliasDic = {}; //资源解析器类型别名映射，key为别名，value为parserType
    res._defaultLimit = 100; //并行加载个数
    res.root = ""; //资源根路径
    res._workingCount = 0; //正在工作的数量
    res._queue = [];
    res._isLoading = false; //是否正在加载资源
    res._workingMap = {}; //正在工作的映射
    res._nameMapToUrl = {}; //名字映射到url
    res.testMap = {};
    function printTestMap() {
        res.info("printTestMap:");
        for (var key in res.testMap) {
            res.info(key + "---->" + res.testMap[key]);
        }
    }
    res.printTestMap = printTestMap;
    function setAlias(alias, realName) {
        res._aliasCfg[alias] = realName;
    }
    res.setAlias = setAlias;
    function registerParser(ParserClass) {
        var alias = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            alias[_i - 1] = arguments[_i];
        }
        var type = ParserClass.TYPE;
        if (!egret.Injector.hasMapRule(res.ResParser, type))
            egret.Injector.mapClass(res.ResParser, ParserClass, type);
        setParserAlias.apply(res, [type].concat(alias));
    }
    res.registerParser = registerParser;
    function setParserAlias(parserType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var parserAliasDic = res._parserAliasDic;
        for (var i = 0, li = args.length; i < li; ++i) {
            var alias = args[i].toLocaleLowerCase();
            if (parserAliasDic[alias])
                res.warn("资源加载器别名【%s】已经映射了【%s】，将被覆盖成【%s】，请检查！", alias, parserAliasDic[alias], parserType);
            parserAliasDic[alias] = parserType;
        }
    }
    res.setParserAlias = setParserAlias;
    function getParser(type) {
        return egret.Injector.getInstance(res.ResParser, type);
    }
    res.getParser = getParser;
    /**
     * 加载资源配置。
     * @param url   可以是：
     *      {string} 配置文件路径
     *      {object} 资源配置数据
     */
    function loadResCfg(url) {
    }
    res.loadResCfg = loadResCfg;
    /**
     * 加载资源组配置。
     * @param url   可以是：
     *      {string} 配置文件路径
     *      {object} 资源组配置数据
     */
    function loadGroupCfg(url) {
    }
    res.loadGroupCfg = loadGroupCfg;
    /**
     * 加载资源别名配置。
     * @param url   可以是：
     *      {string} 配置文件路径
     *      {object} 资源别名配置数据
     */
    function loadAliasCfg(url) {
    }
    res.loadAliasCfg = loadAliasCfg;
    /**
     * 缓存资源内容
     * @param resCfgItem
     * @param parseResult
     * @returns {any}
     * @private
     */
    function _cache(resCfgItem, parseResult) {
        //这里对解析结果进行缓存操作，将缓存的数据返回
        var url = resCfgItem.url;
        //还有计数，就证明需要cache
        if (res._counter[url] && !resCfgItem.notToCache) {
            res._pool[url] = parseResult;
        }
        else {
            if (!res.getRes(url)) {
                delete res._resCfg[url];
            }
        }
        return parseResult;
    }
    res._cache = _cache;
    /**
     * 获取已经缓存了的资源。
     * @param url {string} : 资源的名称
     */
    function getRes(url) {
        if (url == null)
            return null;
        var pool = res._pool;
        var data = pool[url];
        if (!data) {
            if (res._nameMapToUrl[url]) {
                url = res._nameMapToUrl[url] || url;
                data = pool[url];
            }
            else {
                url = res._aliasCfg[url] || url;
                data = pool[url];
            }
        }
        if (!data) {
            var index = url.indexOf("#");
            if (index > 0) {
                var sheetName = url.substring(0, index);
                var frameName = url.substring(index + 1);
                var sheetName = res._nameMapToUrl[sheetName] || sheetName + ".sheet";
                var sheet = pool[sheetName];
                if (!sheet) {
                    res.warn("未加载SpriteSheet【%s】，请检查！", sheetName);
                    return null;
                }
                else {
                    return sheet.getTexture(frameName);
                }
            }
        }
        return data;
    }
    res.getRes = getRes;
    function getResAsync(url, cb, ctx) {
        var data = getRes(url);
        if (data) {
            process.nextTick(function () {
                cb.call(ctx, null, data);
            }, null);
        }
        else {
            res.load([url], function (err, results) {
                if (err)
                    data = null;
                cb.call(ctx, err, data);
            });
        }
    }
    res.getResAsync = getResAsync;
    /**
     * 获取有状态的资源。分成三种状态：
     *      1、穿进去的name就是目标资源对象；
     *      2、穿进去的name为已string或者resItemCfg，并且已经预先加载好资源了；
     *      2、穿进去的name为已string或者resItemCfg，但资源还未加载。只有这种情况，是异步的。
     *  如果获取到的资源会空，则不会执行回调。
     * @param resource
     * @param cb
     * @param ctx
     * @param ResClass 资源类型。如果有传，则做校验，如果校验不通过，一样不会调用callback。
     */
    function getStatusRes(resource, cb, ctx, ResClass) {
        var warnStr = "【%s】对应的资源不是一个【%s】对象，请检查！";
        var ResClassName = ResClass ? (ResClass.__className || ResClass.prototype.__class__) : "";
        if (resource == null) {
            res.warn("资源参数不能为空！");
        }
        else if (typeof resource == "string" || resource.url != null) {
            var resData = res.getRes(resource);
            if (resData) {
                if (ResClass && !(resData instanceof ResClass))
                    res.warn(warnStr, resource, ResClassName);
                else
                    cb.call(ctx, resData);
            }
            else {
                res.load([resource], function (err, results) {
                    resData = results[0];
                    if (!resData)
                        res.warn("未找到【%s】对应的资源！", resource);
                    else if (ResClass && !(resData instanceof ResClass))
                        res.warn(warnStr, resource, ResClassName);
                    else
                        cb.call(ctx, resData);
                });
            }
        }
        else {
            if (ResClass && !(resource instanceof ResClass))
                res.warn(warnStr, resource, ResClassName);
            else
                cb.call(ctx, resource);
        }
    }
    res.getStatusRes = getStatusRes;
    res._shortNameEnabledMap = {};
    function setShortNameEnabledByType(type) {
        res._shortNameEnabledMap[type] = true;
    }
    res.setShortNameEnabledByType = setShortNameEnabledByType;
    function getResCfgItem(resCfgItem, type) {
        var hasName = true;
        if (typeof resCfgItem == "string") {
            var item = new ResCfgItem();
            item.name = resCfgItem;
            item.url = resCfgItem;
            resCfgItem = item;
            hasName = false;
            if (type)
                resCfgItem.type = type;
        }
        else {
            var temp = new ResCfgItem();
            temp.name = resCfgItem.name;
            temp.url = resCfgItem.url;
            temp.type = resCfgItem.type;
            temp.scale9grid = resCfgItem.scale9grid;
            temp.notToCache = resCfgItem.notToCache;
            temp.notToModule = resCfgItem.notToModule;
            temp.moduleName = resCfgItem.moduleName;
            resCfgItem = temp;
        }
        if (!resCfgItem.type) {
            var extname = path.extname(resCfgItem.url);
            var type;
            if (extname) {
                type = res._parserAliasDic[extname.substring(1).toLocaleLowerCase()]; //通过别名找到
                resCfgItem.type = type;
            }
        }
        if (!resCfgItem.type)
            throw new Error("资源配置数据未定义类型：\n    url:" + resCfgItem.url);
        if (!resCfgItem.name) {
            resCfgItem.name = resCfgItem.url; //如果没有写name，就用其url作为name
            hasName = false;
        }
        if (!resCfgItem.url || resCfgItem.url.trim() == "") {
            throw new Error("资源配置数据未定义url：\n    url:" + resCfgItem.type + resCfgItem.name);
        }
        if (!hasName && res._shortNameEnabledMap[resCfgItem.type]) {
            var extname = path.extname(resCfgItem.name);
            resCfgItem.name = path.basename(resCfgItem.name, extname);
        }
        return resCfgItem;
    }
    res.getResCfgItem = getResCfgItem;
    function loadResCfgItem(resCfgItem, cb, ctx) {
        var parserEnabled = _parserEnabledMap[resCfgItem.type];
        if (parserEnabled === false) {
            return cb.call(ctx, null, null);
        }
        resCfgItem.cb = cb;
        resCfgItem.ctx = ctx;
        res._queue.push(resCfgItem); //推进发送列表中
        if (!res._isLoading || res._workingCount < res._defaultLimit) {
            _requestNext();
        }
    }
    res.loadResCfgItem = loadResCfgItem;
    /**
     * 加载资源。
     * @param resources
     * @param cb
     * @param ctx
     */
    function load(resources, cb, ctx) {
        loadWidthOption(resources, { onEnd: cb, onEndCtx: ctx });
    }
    res.load = load;
    function unload(resources) {
        for (var i = 0, li = resources.length; i < li; ++i) {
            var url = resources[i];
            if (typeof url != "string") {
                url = url.url;
            }
            else {
                if (!res._counter[url] && res._nameMapToUrl[url]) {
                    url = res._nameMapToUrl[url];
                } //如果是通过name来进行转化
            }
            if (res._counter[url]) {
                res._counter[url]--;
                if (res._counter[url] <= 0) {
                    _unloadByUrl(url);
                }
            }
        }
    }
    res.unload = unload;
    var _unloadByUrl = function (url) {
        res.info("进行资源释放：【%s】", url);
        var data = res._pool[url];
        var resCfgItem = res._resCfg[url];
        delete res._pool[url]; //清除资源
        delete res._resCfg[url]; //清除资源配置项
        delete res._workingMap[url]; //清除正在工作的列表
        delete res._counter[url]; //清除计数
        for (var name in res._nameMapToUrl) {
            if (res._nameMapToUrl[name] == url)
                delete res._nameMapToUrl[name];
        }
        for (var alias in res._aliasCfg) {
            if (res._aliasCfg[alias] == url)
                delete res._aliasCfg[alias];
        }
        if (resCfgItem) {
            var parser = res.getParser(resCfgItem.type);
            if (parser) {
                parser.unload(data, resCfgItem);
            }
        }
    };
    function unloadSingleByUrlForce(url) {
        var data = res._pool[url];
        var resCfgItem = res._resCfg[url];
        delete res._pool[url];
        delete res._resCfg[url];
        res._counter[url] = 0;
        for (var name in res._nameMapToUrl) {
            if (res._nameMapToUrl[name] == url)
                delete res._nameMapToUrl[name];
        }
        for (var alias in res._aliasCfg) {
            if (res._aliasCfg[alias] == url)
                delete res._aliasCfg[alias];
        }
        if (resCfgItem) {
            var parser = res.getParser(resCfgItem.type);
            if (parser) {
                parser.unload(data, resCfgItem);
            }
        }
    }
    res.unloadSingleByUrlForce = unloadSingleByUrlForce;
    /**
     * 加载资源。
     * @param resources
     * @param opt
     */
    function loadWidthOption(resources, opt) {
        egret.callLater(function () {
            var tempArr = [];
            for (var i = 0, l_i = resources.length; i < l_i; i++) {
                if (!resources[i])
                    continue;
                var rci = res.getResCfgItem(resources[i]);
                tempArr.push(rci);
                res._counter[rci.url] = (res._counter[rci.url] || 0) + 1; //优先进行计数，这样才避免掉如果正在等待队列中，却被unload照成的计数错误
                if (!rci.notToModule) {
                    rci.moduleName = rci.moduleName || opt.moduleName || res.mgr._currentModuleName;
                    res.mgr.addResCount(rci); //直接进行模块资源数量的累加
                }
            }
            async.map(tempArr, function (resCfgItem, index, cb1) {
                loadResCfgItem(resCfgItem, function (data, resCfgItem1) {
                    if (opt.onEach)
                        opt.onEach.call(opt.onEachCtx, data, resCfgItem1);
                    cb1(null, data);
                }, null);
            }, function (err, results) {
                if (opt.onEnd)
                    opt.onEnd.call(opt.onEndCtx, err, results);
                else
                    res.error(err);
            });
        }, null);
    }
    res.loadWidthOption = loadWidthOption;
    var _requestNext = function () {
        var queue = res._queue;
        if (queue.length == 0 && res._workingCount <= 0) {
            res._isLoading = false; //证明这时候已经结束了
        }
        if (queue.length == 0)
            return; //这时候已经都请求完了
        if (res._workingCount >= res._defaultLimit)
            return; //这时候请求数量超过限制数，直接返回
        var resCfgItem = queue.shift(); //获取下一个需要请求的配置项
        var url = resCfgItem.url;
        if (!res._counter[url] || res._counter[url] <= 0) {
            return _requestNext();
        }
        var name = resCfgItem.name;
        res._resCfg[url] = resCfgItem;
        var nameMapToUrl = res._nameMapToUrl;
        var nameUrl = nameMapToUrl[name];
        if (!nameUrl) {
            nameMapToUrl[name] = url;
        }
        else if (nameUrl != url) {
            res.warn("资源名称【%s】:【%s】已经存在，将被替换成【%s】", name, nameUrl, url);
            nameMapToUrl[name] = url;
        }
        //如果正在工作的任务中存在相同的，则不做加载操作了，而是等待结果
        var workingMap = res._workingMap;
        var arr = workingMap[url];
        if (arr != null) {
            arr.push(resCfgItem);
            return _requestNext();
        }
        res.info("开始请求资源：【%s】", url);
        res._isLoading = true;
        var handleResult = function (doWaiting) {
            var cb = resCfgItem.cb;
            res.info("处理资源结果：【%s】加载完毕，进行回调！", resCfgItem.url, !!cb);
            if (!cb)
                return;
            var ctx = resCfgItem.ctx;
            delete resCfgItem.cb;
            delete resCfgItem.ctx;
            var result = res._pool[url];
            cb.call(ctx, result, resCfgItem); //进行回调
            if (doWaiting) {
                var arr = workingMap[url];
                if (arr != null) {
                    while (arr.length > 0) {
                        var rci = arr.pop();
                        var rciCb = rci.cb, rciCtx = rci.ctx;
                        delete rci.cb;
                        delete rci.ctx;
                        res.info("等待中的资源正进行回调：【%s】", resCfgItem.url);
                        rciCb.call(rciCtx, result, rci); //进行回调
                    }
                }
            }
            if (queue.length == 0 && res._workingCount <= 0) {
                res._isLoading = false; //证明这时候已经结束了
            }
            if (doWaiting)
                delete workingMap[url];
            _requestNext();
            ////为了体验好，到下一帧才执行下一个请求
            //process.nextTick(function(){
            //}, null);
        };
        if (res._pool[url]) {
            handleResult(false);
        }
        else {
            if (workingMap[url] == null)
                workingMap[url] = []; //设置成正在工作
            var parser = getParser(resCfgItem.type);
            parser.load(resCfgItem, function () {
                handleResult(true);
            }, null);
        }
    };
    res._map = {};
    function getResArr(moduleName) {
        return res._map[moduleName] || [];
    }
    res.getResArr = getResArr;
    var _parserEnabledMap = {};
    function setParserEnabled(type, enabled) {
        enabled == !!enabled;
        _parserEnabledMap[type] = enabled;
    }
    res.setParserEnabled = setParserEnabled;
})(res || (res = {}));
