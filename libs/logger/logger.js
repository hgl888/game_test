/**
 * Created by SmallAiTT on 2015/2/25.
 */
var logger;
(function (logger) {
    /**
     * 格式化参数成String。
     * 参数和h5的console.log保持一致。
     * @returns {*}
     */
    function formatStr() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var l = args.length;
        if (l < 1) {
            return "";
        }
        var str = args[0];
        var needToFormat = true;
        if (typeof str == "object") {
            str = JSON.stringify(str);
            needToFormat = false;
        }
        if (str == null)
            str = "null";
        str += "";
        var count = 1;
        if (needToFormat) {
            var content = str.replace(/(%d)|(%i)|(%s)|(%f)|(%o)/g, function (world) {
                if (args.length <= count)
                    return world;
                var value = args[count++];
                if (world == "%d" || world == "%i") {
                    return parseInt(value);
                }
                else {
                    return value;
                }
            });
            for (var l_i = args.length; count < l_i; count++) {
                content += "    " + args[count];
            }
            return content;
        }
        else {
            for (var i = 1; i < l; ++i) {
                var arg = args[i];
                arg = typeof arg == "object" ? JSON.stringify(arg) : arg;
                str += "    " + arg;
            }
            return str;
        }
    }
    logger.formatStr = formatStr;
    var _map = {};
    /**
     * 初始化模块日志
     * @param m
     * @param mName
     */
    function initLogger(m, mName) {
        _map[mName] = m;
        if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5) {
            m.log = console.log.bind(console);
            m.debug = console.debug.bind(console);
            m.info = console.info.bind(console);
            m.warn = console.warn.bind(console);
            m.error = console.error.bind(console);
        }
        else {
            m.log = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                console.log(mName + ".log: " + formatStr.apply(logger, arguments));
            };
            m.debug = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                console.debug(mName + ".debug: " + formatStr.apply(logger, arguments));
            };
            m.info = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                //TODO 骗纸啊，runtime居然没有console.info！！！
                console.debug(mName + ".info: " + formatStr.apply(logger, arguments));
            };
            m.warn = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                console.warn(mName + ".warn: " + formatStr.apply(logger, arguments));
            };
            m.error = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                console.error(mName + ".error: " + formatStr.apply(logger, arguments));
            };
        }
    }
    logger.initLogger = initLogger;
    /**
     * 设置日志等级
     * @param mName
     * @param lvl
     */
    function setLvl(mName, lvl) {
        if (mName == "default") {
            for (var key in _map) {
                if (key == "default")
                    continue;
                var m = _map[key];
                if (!m)
                    continue;
                initLogger(m, key);
                if (lvl > 1) {
                    m.log = function () {
                    };
                    m.debug = function () {
                    };
                }
                if (lvl > 2)
                    m.info = function () {
                    };
                if (lvl > 3)
                    m.warn = function () {
                    };
                if (lvl > 4)
                    m.error = function () {
                    };
            }
        }
        else {
            var m = _map[mName];
            if (!m)
                return; //该日志还没初始化过，没法设置等级
            initLogger(m, mName);
            if (lvl > 1) {
                m.log = function () {
                };
                m.debug = function () {
                };
            }
            if (lvl > 2)
                m.info = function () {
                };
            if (lvl > 3)
                m.warn = function () {
                };
            if (lvl > 4)
                m.error = function () {
                };
        }
    }
    logger.setLvl = setLvl;
    initLogger(logger, "logger");
})(logger || (logger = {}));
