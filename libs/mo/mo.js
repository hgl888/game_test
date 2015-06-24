var mo;
(function (mo) {
    function addConst(Class, prop) {
        for (var key in prop) {
            Class[key] = prop[key];
        }
    }
    mo.addConst = addConst;
})(mo || (mo = {}));
var mo;
(function (mo) {
    mo.worldClock;
    var RESOLUTION_POLICY = (function () {
        function RESOLUTION_POLICY() {
        }
        var __egretProto__ = RESOLUTION_POLICY.prototype;
        RESOLUTION_POLICY.NO_BORDER = "noBorder";
        RESOLUTION_POLICY.SHOW_ALL = "showAll";
        RESOLUTION_POLICY.EXACT_FIT = "ExactFit";
        RESOLUTION_POLICY.FIXED_WIDTH = "FixedWidth";
        RESOLUTION_POLICY.FIXED_HEIGHT = "FixedHeight";
        return RESOLUTION_POLICY;
    })();
    mo.RESOLUTION_POLICY = RESOLUTION_POLICY;
    RESOLUTION_POLICY.prototype.__class__ = "mo.RESOLUTION_POLICY";
    //框架相关的初始化操作
    function init() {
        tm.init();
        if (mo.project.showFPS) {
            var profiler = egret.Profiler.getInstance();
            profiler.run();
            profiler._setTxtFontSize(60);
            var _txt = profiler._txt;
            _txt.y = mo.getStage().stageHeight - 200;
        }
        mo.visibleRect = mo.VisibleRect.create();
        if (mo.audioEnabled == null) {
            mo.audioEnabled = mo.project.audioEnabled;
        }
        else {
            res.setParserEnabled(res.AudioParser.TYPE, mo.audioEnabled);
        }
        res._defaultLimit = mo.project.resLimit;
        egret.RendererContext.registerBlendModeForGL("mask", 772, 0);
        egret.RendererContext.registerBlendModeForGL("clear", 1, 0);
        mo.worldClock = new dragonBones.WorldClock();
        egret.Ticker.getInstance().register(_advanceFun, null);
    }
    mo.init = init;
    var _advanceFun = function (dt) {
        mo.worldClock.advanceTime(dt / 1000);
    };
    function resetArr(arr) {
        if (arr) {
            for (var i = arr.length - 1; i >= 0; --i) {
                if (arr[i] == null) {
                    arr.splice(i, 1);
                }
            }
        }
    }
    mo.resetArr = resetArr;
    /**
     * 遍历对象或者数组。
     * @param obj
     * @param iterator
     * @param context
     */
    function each(obj, iterator, context) {
        if (!obj)
            return;
        if (obj instanceof Array) {
            for (var i = 0, li = obj.length; i < li; i++) {
                if (iterator.call(context, obj[i], i) === false)
                    return;
            }
        }
        else {
            for (var key in obj) {
                if (iterator.call(context, obj[key], key) === false)
                    return;
            }
        }
    }
    mo.each = each;
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
    mo.formatStr = formatStr;
    var _tempStrRegExp = /\$\{[^\s\{\}]*\}/g;
    function formatPlaceholder(tempStr, map) {
        function change(word) {
            var key = word.substring(2, word.length - 1);
            var value = map[key];
            if (value == null) {
                console.error("formatTempStr时，map中缺少变量【%s】的设置，请检查！", key);
                return word;
            }
            return value;
        }
        return tempStr.replace(_tempStrRegExp, change);
    }
    mo.formatPlaceholder = formatPlaceholder;
    /**
     * 延时执行一个函数
     * @param delay 时间单位：秒
     * @param selector
     * @param target
     */
    function delayCall(delay, selector, ctx) {
        var ms = delay * 1000;
        return mo.setTimeout(selector, ctx, ms);
    }
    mo.delayCall = delayCall;
    /**
     * 清除延迟执行的函数
     * @param key
     */
    function clearDelayCall(key) {
        mo.clearTimeout(key);
    }
    mo.clearDelayCall = clearDelayCall;
    var _intervalCache = {};
    /**
     * 循环执行一个函数
     * @param interval 时间单位：毫秒
     * @param selector
     * @param target
     * @param atOnce 立即执行一次再开始回调
     */
    function schedule(selector, target, interval, atOnce) {
        if (atOnce) {
            selector.call(target, target);
        }
        var intervalId = mo.setInterval(function () {
            selector.call(target, target);
        }, target, interval);
        _intervalCache[intervalId] = [selector, target];
    }
    mo.schedule = schedule;
    /**
     * 取消执行一个函数
     * @param selector
     * @param target
     */
    function unschedule(selector, target) {
        for (var intervalId in _intervalCache) {
            var arr = _intervalCache[intervalId];
            if (arr[0] == selector && arr[1] == target) {
                mo.clearInterval(intervalId);
                delete _intervalCache[intervalId];
                break;
            }
        }
    }
    mo.unschedule = unschedule;
    /**
     * 暂停目标所有schedule
     * @param target
     */
    function pauseScheduleTarget(target) {
        mo.warn(logCode.c_101, "mo", "pauseScheduleTarget");
    }
    mo.pauseScheduleTarget = pauseScheduleTarget;
    /**
     * 继续目标所有schedule
     * @param target
     */
    function resumeScheduleTarget(target) {
        mo.warn(logCode.c_101, "mo", "resumeScheduleTarget");
    }
    mo.resumeScheduleTarget = resumeScheduleTarget;
    /**
     * 获取一个json文件的内容
     * @param fileName
     * @returns {Object}
     */
    function getJSONWithFileName(fileName) {
        return res.getRes(fileName);
    }
    mo.getJSONWithFileName = getJSONWithFileName;
    /**
     * 获取一个json文件中某个id的单条信息
     * @param fileName
     * @param id
     * @returns {Object}
     */
    function getJSONWithFileNameAndID(fileName, id) {
        var jsonData = mo.getJSONWithFileName(fileName);
        if (jsonData && jsonData.hasOwnProperty(id)) {
            return jsonData[id];
        }
        mo.error("亲," + fileName + "这个文件木有这个ID:" + id);
        return {};
    }
    mo.getJSONWithFileNameAndID = getJSONWithFileNameAndID;
    /**
     * 读取策划配置表里有分号的信息，如：1,2,3,4
     * @param str
     * @param num
     * @returns {*}
     */
    function getStrByOrder(str, num) {
        return str.split(",")[num];
    }
    mo.getStrByOrder = getStrByOrder;
    /**
     * 获取机器码
     */
    function getDeviceId() {
        //todo 如果有获取设备号的api
        //        if(egret.hasOwnProperty("getDeviceId")){
        //            return egret.getDeviceId();
        //        }
        //如果没有获取设备号的功能，利用启动的时间点作为设备号
        var localDevice = mo.getLocalStorageItem("DeviceId", true);
        if (!localDevice) {
            localDevice = "device" + (new Date).getTime();
            mo.setLocalStorageItem("DeviceId", localDevice, true);
        }
        return localDevice;
    }
    mo.getDeviceId = getDeviceId;
    /**
     * 给一个sprite设置一个shader效果
     * @param RGBANode
     * @param shaderObject
     */
    function setShader(RGBANode, shaderObject) {
        mo.warn(logCode.c_101, "mo", "setShader");
    }
    mo.setShader = setShader;
    //    export function isTouchInside (touch, node, ignoreVisibleAndRunning) {
    //        if (!ignoreVisibleAndRunning) {
    //            if (!node.isVisible()) return false;
    //            if (!node.isRunning()) return false;
    //        }
    //        var touchLocation = touch.getLocation(); // Get the touch position
    //        touchLocation = node.getParent().convertToNodeSpace(touchLocation);
    //        var box = node.getBoundingBox();
    //        return cc.rectContainsPoint(box, touchLocation);
    //    };
    //
    /**
     * 作换坐标系的点
     * @param targetNode 要转换到的节点
     * @param originNode 原来的节点
     * @param pos
     */
    function convertNodeToNodeSpace(targetNode, originNode, pos) {
        var point = originNode.localToGlobal(pos.x, pos.y);
        return targetNode.globalToLocal(point.x, point.y);
    }
    mo.convertNodeToNodeSpace = convertNodeToNodeSpace;
    /**
     * 创建一个有高斯模糊后的全屏sprite
     * @param blurSize 模糊程度，0~1，值越大模糊程度越高
     * @returns {cc.Sprite|*}
     */
    function createBlurredBg(blurSize) {
        mo.warn(logCode.c_101, "mo", "createBlurredBg");
        return null;
    }
    mo.createBlurredBg = createBlurredBg;
    mo.__ipCfgName = "";
    mo.__areaId = "";
    function _getLocalStorageKeyPre(key, withoutAreaPrefix) {
        withoutAreaPrefix = withoutAreaPrefix || false;
        return formatStr("%s_%s_%s", mo.__ipCfgName, (withoutAreaPrefix ? "" : mo.__areaId), key);
    }
    mo._getLocalStorageKeyPre = _getLocalStorageKeyPre;
    /**
     * localStorage api的进一步封装。
     * @param key
     * @param value
     */
    function setLocalStorageItem(key, value, withoutAreaPrefix) {
        var realKey = mo._getLocalStorageKeyPre(key, withoutAreaPrefix);
        value = JSON.stringify(value);
        egret.localStorage.setItem(realKey, value);
    }
    mo.setLocalStorageItem = setLocalStorageItem;
    /**
     * localStorage api的进一步封装。
     * @param key
     * @returns {*}
     */
    function getLocalStorageItem(key, withoutAreaPrefix) {
        var realKey = mo._getLocalStorageKeyPre(key, withoutAreaPrefix);
        var value = egret.localStorage.getItem(realKey);
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    }
    mo.getLocalStorageItem = getLocalStorageItem;
    /**
     * localStorage api的进一步封装。
     * @param key
     * @returns {*}
     */
    function removeLocalStorageItem(key, withoutAreaPrefix) {
        var realKey = mo._getLocalStorageKeyPre(key, withoutAreaPrefix);
        egret.localStorage.removeItem(realKey);
    }
    mo.removeLocalStorageItem = removeLocalStorageItem;
    //
    //    export function loadBaseRes(cb, target){
    //        mo.resMgr.unload("base");
    //        mo.load("base", function(){
    //            cc.spriteFrameCache.addSpriteFrames(res.ui_common_plist);
    //            cc.spriteFrameCache.addSpriteFrames(res.ui_btn_plist);
    //            cb.call(target);
    //        });
    //    };
    /**
     * 判断是否需要刷新
     * @param refreshHours
     * @param lastTime {Date}
     * @param now {Date}
     * @returns {boolean}
     */
    function needToRefresh(refreshHours, lastTime, now) {
        if (!lastTime)
            return true;
        now = now || Date.newDate();
        var delta = now.getTime() - lastTime.getTime();
        if (delta >= 24 * 60 * 60 * 1000)
            return true; //时间间隔了一天，则需要刷新
        var hours = now.getHours(); //当前是几时
        var lHours = lastTime.getHours(); //上次刷新是几时
        if (hours == lHours && delta < 60 * 60 * 1000)
            return false; //这时候认为不刷新
        for (var i = 0, li = refreshHours.length; i < li; i++) {
            var itemi = refreshHours[i];
            if (hours == lHours) {
                if (itemi != hours)
                    return true; //只要有间隔就可以返回true
            }
            else if (hours > lHours) {
                if (hours >= itemi && lHours < itemi) {
                    return true;
                }
            }
            else {
                if (hours >= itemi || lHours < itemi) {
                    return true;
                }
            }
        }
        return false;
    }
    mo.needToRefresh = needToRefresh;
    /**
     * 检测web端运行于什么系统
     */
    function checkPlatform() {
        mo.warn(logCode.c_101, "mo", "checkPlatform");
        return 0;
    }
    mo.checkPlatform = checkPlatform;
    /**
     * 判断一个节点是否真的可见
     * @param displayObject
     * @returns {boolean}
     */
    function isNodeVisible(displayObject) {
        var parent = displayObject;
        while (parent) {
            if (!parent.visible)
                return false;
            parent = parent.parent;
        }
        return false;
    }
    mo.isNodeVisible = isNodeVisible;
})(mo || (mo = {}));
