/**
 * Created by Administrator on 2015/4/18.
 */
var res;
(function (res) {
    res._dyResMap = {};
    var DynamicResHelper = (function () {
        function DynamicResHelper(onStatic, onBeforeLoad, onAfterLoad) {
            var self = this;
            self.onStatic = onStatic;
            self.onBeforeLoad = onBeforeLoad;
            self.onAfterLoad = onAfterLoad;
            self.urlToNodes = {};
        }
        var __egretProto__ = DynamicResHelper.prototype;
        return DynamicResHelper;
    })();
    DynamicResHelper.prototype.__class__ = "res.DynamicResHelper";
    function register4Dynamic(type, onStatic, onBeforeLoad, onAfterLoad) {
        res._dyResMap[type] = new DynamicResHelper(onStatic, onBeforeLoad, onAfterLoad);
    }
    res.register4Dynamic = register4Dynamic;
    function unload4Dynamic(node, type, url) {
        var drh = res._dyResMap[type];
        if (!drh) {
            res.error("未注册类型为【%s】的动态处理器", type);
            return;
        }
        if (!url)
            return;
        var nodes = drh.urlToNodes[url];
        if (!nodes)
            return; //没有
        var index = nodes.indexOf(node);
        if (index < 0)
            return; //没有在列表中
        nodes.splice(index, 1); //删除
        if (nodes.length == 0 && res.getRes(url)) {
            delete drh.urlToNodes[url];
            //已经没有了，并且资源已经加载完毕了
            res.unload([url]);
        }
    }
    res.unload4Dynamic = unload4Dynamic;
    function load4Dynamic(node, type, url, preUrl) {
        var drh = res._dyResMap[type];
        if (!drh) {
            res.error("未注册类型为【%s】的动态处理器", type);
            return;
        }
        if (!url)
            return; //不能为null
        var resData = res.getRes(url);
        //如果两者相等，则直接执行onStatic回调
        if (resData && url == preUrl) {
            //执行onStatic处理
            node[drh.onStatic](resData);
        }
        //移除preUrl对node的关联
        unload4Dynamic(node, type, preUrl);
        var nodes = drh.urlToNodes[url];
        //如果已经存在了，那么有可能是动态加载的也可能是静态加载的
        if (resData) {
            if (nodes) {
                if (nodes.indexOf(node) < 0) {
                    nodes.push(node); //push进去
                }
            }
            //执行onStatic处理
            node[drh.onStatic](resData);
        }
        else {
            //执行onBeforeLoad处理
            node[drh.onBeforeLoad]();
            var needToLoad = false; //是否需要进行资源加载
            if (!nodes) {
                nodes = drh.urlToNodes[url] = [];
                needToLoad = true;
            }
            if (nodes.indexOf(node) < 0) {
                nodes.push(node);
            }
            if (needToLoad) {
                var rci = res.getResCfgItem(url);
                rci.notToModule = true;
                res.load([rci], function () {
                    //当资源加载完了之后，再判断是否进行释放
                    //如果加载过程中就调用了unload，那么处理起来就相当麻烦，所以就不那么弄了
                    var url4Cb = this.url, type4Cb = this.type, drh4Cb = res._dyResMap[type4Cb];
                    var nodes4Cb = drh4Cb.urlToNodes[url4Cb];
                    //已经没有任何node使用这个资源了
                    if (nodes4Cb.length == 0) {
                        delete drh4Cb.urlToNodes[url4Cb]; //移除掉
                        res.unload([url4Cb]); //进行释放
                        return;
                    }
                    var resData = res.getRes(url);
                    for (var i = 0, l_i = nodes4Cb.length; i < l_i; ++i) {
                        var node4Cb = nodes4Cb[i];
                        node4Cb[drh4Cb.onAfterLoad](resData);
                    }
                }, { type: type, url: url });
            }
        }
    }
    res.load4Dynamic = load4Dynamic;
})(res || (res = {}));
