var res;
(function (res) {
    var ResMgr = (function (_super) {
        __extends(ResMgr, _super);
        function ResMgr() {
            _super.call(this);
            var self = this;
            this.__class = this["constructor"];
            self.__className = self.__class.__className;
            self._initProp();
            self._init();
        }
        var __egretProto__ = ResMgr.prototype;
        __egretProto__._initProp = function () {
            var self = this;
            self._pool = {};
            self._currentModuleName = self.__class.GLOBAL;
            self._moduleNameStack = [];
            self._subModuleMap = {};
            self._subModuleResCounterMap = {};
        };
        __egretProto__.pushSubModule = function (moduleName, subModuleName) {
            var self = this, smm = self._subModuleMap;
            var subModuleInfo = smm[moduleName];
            if (!subModuleInfo) {
                subModuleInfo = smm[self._currentModuleName] = { stack: [], counter: {} };
            }
            if (subModuleInfo.stack.indexOf(subModuleName) < 0) {
                subModuleInfo.stack.push(subModuleName);
            }
        };
        __egretProto__.releaseSubModule = function (moduleName, subModuleName) {
            var self = this, ssm = self._subModuleMap;
            var subModuleInfo = ssm[moduleName];
            if (!subModuleInfo)
                return;
            var stack = subModuleInfo.stack;
            var index = stack.indexOf(subModuleName);
            if (index < 0)
                return;
            stack.splice(index, 1);
            var subMap = subModuleInfo.counter[subModuleName];
            if (!subMap)
                return;
            var arr = [];
            for (var resName in subMap) {
                var count = subMap[resName];
                var total = res._counter[resName];
                if (!total)
                    continue; //没有计数则继续
                res._counter[resName] -= (count - 1); //不全部扣除，而是留了1
                if (res._counter[resName] <= 0) {
                    res._counter[resName] = 1; //这时候故意给他1，用于下面真正进行释放
                }
                arr.push(resName);
                delete subMap[resName];
            }
            res.unload(arr);
        };
        __egretProto__._init = function () {
        };
        __egretProto__.runModule = function (moduleName) {
            var self = this;
            if (self._currentModuleName == self.__class.GLOBAL && self._moduleNameStack.length == 0) {
                //这个证明模块内容都为空，这时候，要保存GLOBAL
                self._moduleNameStack.push(self._currentModuleName);
            }
            if (self._releaseModuleName) {
                self.releaseModule();
            }
            if (self._currentModuleName != self.__class.GLOBAL) {
                self._releaseModuleName = self._currentModuleName;
            }
            self._currentModuleName = moduleName;
        };
        __egretProto__.pushModule = function (moduleName) {
            var self = this;
            self._moduleNameStack.push(self._currentModuleName);
            self._currentModuleName = moduleName;
        };
        __egretProto__.popModule = function (moduleName) {
            var self = this;
            if (self._currentModuleName == self.__class.GLOBAL && self._moduleNameStack.length == 0) {
                //如果说当前的是GLOBAL并且已经到达栈底了，则直接返回
                return;
            }
            if (self._releaseModuleName) {
                self.releaseModule();
            }
            self._releaseModuleName = self._currentModuleName;
            self._currentModuleName = self._moduleNameStack.pop();
        };
        __egretProto__.releaseModule = function (moduleName) {
            var self = this;
            moduleName = moduleName || self._releaseModuleName;
            if (!moduleName)
                return; //不需要释放
            if (moduleName == self._releaseModuleName)
                self._releaseModuleName = null;
            var map = self._pool[moduleName];
            if (!map)
                return; //已经没了
            delete self._pool[moduleName];
            var subInfo = self._subModuleMap[moduleName];
            if (subInfo) {
                subInfo.stack.length = 0;
                var subStack = subInfo.stack;
                if (subStack) {
                    while (subStack.length > 0) {
                        self.releaseSubModule(moduleName, subStack.pop());
                    }
                }
            }
            var stack = self._moduleNameStack;
            for (var i = stack.length - 1; i >= 0; i--) {
                var mn = stack[i];
                if (moduleName == mn) {
                    stack.splice(i, 1); //移除
                    break;
                }
            }
            var arr = [];
            for (var resName in map) {
                var count = map[resName];
                var total = res._counter[resName];
                if (!total)
                    continue; //没有计数则继续
                res._counter[resName] -= (count - 1); //不全部扣除，而是留了1
                if (res._counter[resName] <= 0) {
                    res._counter[resName] = 1; //这时候故意给他1，用于下面真正进行释放
                }
                arr.push(resName);
                delete map[resName];
            }
            res.unload(arr);
        };
        __egretProto__.loadToGolabel = function (resources, cb, ctx) {
            res.loadWidthOption(resources, { onEnd: cb, onEndCtx: ctx, moduleName: this.__class.GLOBAL });
        };
        __egretProto__.addResCount = function (resCfgItem) {
            var self = this, smm = self._subModuleMap;
            var resName = resCfgItem.url;
            var moduleName = resCfgItem.moduleName || self._currentModuleName;
            if (!moduleName)
                return;
            var subInfo = smm[moduleName];
            if (subInfo && subInfo.stack.length > 0) {
                var stack = subInfo.stack;
                if (stack && stack.length > 0) {
                    var subModuleName = stack[stack.length - 1];
                    var subMap = subInfo.counter[subModuleName];
                    if (!subMap) {
                        subMap = subInfo.counter[subModuleName] = {};
                    }
                    subMap[resName] = (subMap[resName] || 0) + 1;
                    return;
                }
            }
            var map = self._pool[moduleName];
            if (!map) {
                map = self._pool[moduleName] = {};
            }
            map[resName] = (map[resName] || 0) + 1;
        };
        ResMgr.__className = "ResMgr"; //为了跟cocos方案保持一致所写
        ResMgr.GLOBAL = "global";
        return ResMgr;
    })(egret.EventDispatcher);
    res.ResMgr = ResMgr;
    ResMgr.prototype.__class__ = "res.ResMgr";
    res.mgr = new ResMgr();
})(res || (res = {}));
