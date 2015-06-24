var mo;
(function (mo) {
    var __ImportBaseCommonApi = (function () {
        function __ImportBaseCommonApi() {
        }
        var __egretProto__ = __ImportBaseCommonApi.prototype;
        return __ImportBaseCommonApi;
    })();
    mo.__ImportBaseCommonApi = __ImportBaseCommonApi;
    __ImportBaseCommonApi.prototype.__class__ = "mo.___ImportBaseCommonApi";
    ;
})(mo || (mo = {}));
var mo;
(function (mo) {
    var _baseConstFuncPrototype;
    (function (_baseConstFuncPrototype) {
        /**
         * 创建
         * @param args
         * @returns {any}
         */
        function create() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var Class = this;
            var obj = new Class();
            if (obj.init)
                obj.init.apply(obj, arguments);
            return obj;
        }
        _baseConstFuncPrototype.create = create;
        function createDynamic() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var Class = this;
            var obj = new Class();
            if (obj.initDynamic)
                obj.initDynamic.apply(obj, arguments);
            return obj;
        }
        _baseConstFuncPrototype.createDynamic = createDynamic;
        function getInstance() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var Class = this;
            if (!Class._instance) {
                var instance = Class._instance = Class.create.apply(Class, arguments);
                instance._isInstance = true;
            }
            return Class._instance;
        }
        _baseConstFuncPrototype.getInstance = getInstance;
        function purgeInstance() {
            var Class = this;
            var instance = Class._instance;
            if (instance) {
                if (instance.doDtor)
                    instance.doDtor();
                Class._instance = null;
            }
        }
        _baseConstFuncPrototype.purgeInstance = purgeInstance;
    })(_baseConstFuncPrototype = mo._baseConstFuncPrototype || (mo._baseConstFuncPrototype = {}));
})(mo || (mo = {}));
