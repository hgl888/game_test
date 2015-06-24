var mo;
(function (mo) {
    /**
     * TODO 加载资源
     *      1)...preload(function(cb1){
    *          mo.request(iface, args, function(){
    *              cb1();
    *          });
    *      }, "base", cb, target);
     *
     *      2)...preload("base", cb, target);
     *
     *      3)...preload(["a.png"], cb);
     * @param {Function} reqTask 请求处理任务，格式为：
     *          function(cb){
    *              cb();//第一个参数为error，如果传了(例如cb("error"))就表示有错了。那么最终的callback将不会被执行。
    *          }
     * @param {Array|String} resources
     *          1、数组：和原来一样
     *          2、字符串：cfgName
     * @param {Function} cb    最终的回调
     * @param {Object} target    回调函数的上下文
     * @returns {mo.RequestLoaderScene|*}
     */
    function preload(reqTask, resources, cb, target) {
        //        mo.RequestLoaderScene.preload.apply(mo.RequestLoaderScene, arguments);
        async.parallel(reqTask, cb, target);
    }
    mo.preload = preload;
    /**
     * @param reqTask
     * @param resources 配置文件的名字，请看resCfg.js
     * @param cb
     * @param target
     */
    function preloadWaiting(reqTask, resources, cb, target) {
        mo.playWaiting();
        var l = arguments.length;
        if (l == 2) {
            cb = resources;
            if (typeof reqTask == "function")
                resources = null;
            else {
                resources = reqTask;
                reqTask = null;
            }
        }
        else if (l == 3) {
            var lastArg = arguments[2];
            if (typeof lastArg != "function") {
                target = cb;
                cb = resources;
                if (typeof reqTask == "function")
                    resources = null;
                else {
                    resources = reqTask;
                    reqTask = null;
                }
            }
        }
        var tasks = [];
        if (reqTask)
            tasks.push(reqTask);
        if (resources) {
            if (typeof resources == "string" || typeof resources == "number") {
                var rc = res.getResArr(resources);
                if (rc) {
                    resources = rc;
                }
            }
            tasks.push(function (cb) {
                res.load(resources, cb);
            });
        }
        async.parallel(tasks, function (err) {
            mo.stopWaiting();
            if (err)
                return mo.error(err);
            cb.apply(target);
        });
    }
    mo.preloadWaiting = preloadWaiting;
    function load(resources, cb, target) {
        //        if(typeof resources == "string" || typeof resources == "number"){
        //            var rc = mo.getResCfg(resources);
        //            resources = rc && rc.res ? rc.res : [];
        //        }
        res.load(resources, cb, target);
    }
    mo.load = load;
})(mo || (mo = {}));
