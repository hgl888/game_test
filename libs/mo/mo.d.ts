declare module global {
    var testMode: any;
}
declare module cc {
    var RED: number;
    var GREEN: number;
    var BLUE: number;
    var BLACK: number;
    var WHITE: number;
    var YELLOW: number;
    var GRAY: number;
    var MAGENTA: number;
    var ORANGE: number;
    function c3b(r: number, g: number, b: number): number;
    function convertColor3BtoHexString(clr: any): string;
    function hexToColor(hex: any): number;
}
declare module logCode {
    var c_101: string;
    var c_102: string;
    var c_103: string;
    var c_104: string;
    var c_105: string;
}
declare module mo {
    var log: any;
    var debug: any;
    var info: any;
    var warn: any;
    var error: any;
}
declare module gEventType {
    var visible: string;
    var invisible: string;
    var slidePanel: string;
    var newSceneVisible: string;
}
declare module mo {
    class Event extends egret.Event {
        static __className: string;
        static getBeforeEventType(eventType: any): string;
        static getAfterEventType(eventType: any): string;
        sender: any;
    }
}
declare module mo {
    /**
     * 数据控制器事件类。
     */
    class AutoEvent extends egret.Event {
        param: any;
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
    }
    /**
     * Lazy模式的EventDispatcher类，默认开启的是下一帧自动执行dispatch操作。
     */
    class AutoEventDispatcher extends egret.EventDispatcher {
        static _dispatcher: egret.EventDispatcher;
        static getDispatcher(): egret.EventDispatcher;
        static addEventListener(eventType: string, listener: (event: egret.Event) => void, ctx: any): void;
        static removeEventListener(eventType: string, listener: (event: egret.Event) => void, ctx: any): void;
        _data: any;
        _autoNotify: boolean;
        __class: any;
        constructor(target?: egret.IEventDispatcher);
        /**
         * 创建event对象
         * @param eventType
         * @returns {AutoEvent}
         * @private
         */
        _createEvent(eventType: string): AutoEvent;
        /**
         * 进行分发
         * @param eventType
         */
        dispatch(eventType: string): void;
        /**
         * 设置改变
         * @param eventType
         * @private
         */
        _setChanged(eventType: string): void;
        /**
         * 设置数据。
         * @param key
         * @param value
         */
        set(key: string, value?: any): void;
        /**
         * 获取数据。
         * @param key
         * @returns {any}
         */
        get(key: string): any;
    }
    class AutoEventDispatcherHandler {
        private _dispatchers;
        private _eventsInArr;
        private _isTicking;
        push(dispatcher: AutoEventDispatcher, event: string): void;
        private _mainLoop();
    }
    /**
     * 事件自动分发器的处理器。
     * @type {mo.AutoEventDispatcherHandler}
     */
    var autoEventDispatcherHandler: AutoEventDispatcherHandler;
}
declare module mo {
    class TouchEvent extends egret.TouchEvent {
        static LONG_TOUCH_BEGIN: string;
        static LONG_TOUCH_END: string;
        static NODE_BEGIN: string;
        static NODE_END: string;
        static NODE_MOVE: string;
        static dispatchTouchEvent(target: egret.IEventDispatcher, type: string, touchPointID?: number, stageX?: number, stageY?: number, ctrlKey?: boolean, altKey?: boolean, shiftKey?: boolean, touchDown?: boolean): void;
    }
}
declare module mo {
    function removeEventListeners(dispatcher: egret.EventDispatcher, eventType?: string, useCapture?: boolean): void;
    function addEventListenerOnce(dispatcher: egret.EventDispatcher, eventType: string, listener: Function, ctx?: any): void;
    function removeEventListenerOnce(dispatcher: egret.EventDispatcher, eventType: string, listener: Function, ctx?: any): void;
    function addBeforeEventListener(dispatcher: egret.EventDispatcher, eventType: string, listener: Function, ctx: any, useCapture?: boolean, priority?: number): void;
    function addAfterEventListener(dispatcher: egret.EventDispatcher, eventType: string, listener: Function, ctx: any, useCapture?: boolean, priority?: number): void;
    function removeBeforeEventListener(dispatcher: egret.EventDispatcher, eventType: string, listener: Function, ctx: any, useCapture?: boolean): void;
    function removeAfterEventListener(dispatcher: egret.EventDispatcher, eventType: string, listener: Function, ctx: any, useCapture?: boolean): void;
    function dispatchEvent(dispatcherInfoArr: any[][], dstFunc: any, sender: any, ...args: any[]): void;
    function dispatchEventWidthCallback(dispatcherInfoArr: any[][], dstFunc: any, sender: any, ...args: any[]): void;
}
declare module mo {
    var actionDispatcher: egret.EventDispatcher;
    var visibleDispatcher: egret.EventDispatcher;
    var invisibleDispatcher: egret.EventDispatcher;
    var exitDispatcher: egret.EventDispatcher;
    var enterDispatcher: egret.EventDispatcher;
    var clickDispatcher: egret.EventDispatcher;
    var cellClickDispatcher: egret.EventDispatcher;
    var widgetCtrlClickDispatcher: egret.EventDispatcher;
}
declare module mo {
    /**
     * 数组操作：移动一个元素到新的位置
     * @param arr
     * @param oldIndex
     * @param newIndex
     * @returns {Array}
     */
    function arrayMove(arr: any[], oldIndex: number, newIndex: number): any[];
    /**
     * 数组操作：交换两个元素的位置
     * @param arr
     * @param oldIndex
     * @param newIndex
     * @returns {Array}
     */
    function arraySwap(arr: any[], oldIndex: number, newIndex: number): any[];
    /**
     * 合并2个jsonObject
     * @param jsonObj1
     * @param jsonObj2
     * @returns {{}}
     */
    function mergeJsonObject(jsonObj1: any, jsonObj2: any): {};
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    function trimSpace(str: string): string;
    /**
     * 排序功能的option函数模板。
     *      例子：
     *      var arr = [
     *          {"key1":"a", "key2":"b", "key3":"c", "key4":"d"},
     *          ...
     *      ]
     *      arr.sort(export function sortOption.bind({list : ["key1", "key2", {name:"key3", type:1}, "key4"]}));
     *      意思是一次按照数组的顺序为优先级进行排序，默认为为降序。当定义type为1的时候，为升序。
     * @param a
     * @param b
     * @returns {number}
     */
    function sortOption(a: any, b: any): number;
    /**
     *
     * @param value
     * @param index
     * @param ar
     * @returns {boolean}
     */
    function filterOption(value: any, index: number, ar?: any): boolean;
    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    function getStringLength(str: string): number;
    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    function isChinese(str: string): boolean;
    /**
     * 根据字节长度获取文字
     * @param str
     * @param startNum 字数序号
     * @param subLength
     */
    function subStr(str: string, startNum: number, subLength: number): string;
    /**
     * 从多个字典中查找到值
     * @param props
     * @param key
     */
    function getValueForKey(props: any, key: any): any;
    /**
     * 敏感词检测
     * @param word
     * @param sensitiveArr
     * @returns {boolean}
     */
    function checkSensitiveWord(word: any, sensitiveArr: any): boolean;
    /**
     * 替换敏感词
     * @param word
     * @param sensitiveArr
     * @returns {*}
     */
    function replaceSensitiveWord(word: any, sensitiveArr: any): any;
    /**
     * 获取2个数之间的随机数
     * @param startNum
     * @param endNum
     * @returns {number}
     */
    function random(startNum: number, endNum?: number): number;
    /**
     * 从数组里随机出一个
     * @param arr
     */
    function randomFromArr(arr: any): any;
    /**
     * 判断一个对象是否为空对象
     * @param obj
     * @returns {boolean}
     */
    function isEmptyObj(obj: any): boolean;
    /**
     * 字符串转为对象   "1:2,2:3" => {"1":2,"2":3}
     * @param str
     * @return {Object}
     */
    function strToObj(str: any): {};
}
declare module mo {
    /**
     * 获取今天的时间。
     * @param {String} time 例如：11:00
     * @returns {Date}
     */
    function getTimeOfToday(time: any): Date;
    function getDateTime(time: any, d: any, nextDays: any): Date;
    /**
     * 格式化时间
     *  1、< 60s, 显示为“刚刚”
     *  2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
     *  3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
     *  4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
     *  5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
     * @param {String} time 如：Sun May 25 2014 12:36:12 GMT+0800 (CST)
     * @returns String
     */
    function timeFormat(time: any): string;
    /**
     * 毫秒转成 x时x分x秒格式
     * @param msd
     * @returns {number}
     */
    function millisecondToDate(msd: any): string;
    function formatWeekdayHour(date: any, isEveryDay: any): string;
    /**
     * 获取“周一、周二”这种字符串
     * @param weekday
     */
    function getWeekdayDesc(weekday: any): string;
    /**
     * 根据时间得到时间的字符串，时间单位为毫秒，得到的为 HH:MM:SS或者MM:SS 这种。
     * @param milliseconds
     * @returns {string}
     */
    function getTimeStr(milliseconds: number, locale?: boolean): string;
    /**
     * 获得时间字符串
     * @param timeA
     * @param timeB
     * @returns {*}
     */
    function getBetweenTimeString(timeA: any, timeB: any): string;
    function getNextTime(refreshTimeArr: any, time?: any): any;
}
/**
 * Created by huanghaiying on 15/1/9.
 */
declare class ColorTransformUtils {
    private static _transformCache;
    private static _transformMatrix;
    static getTransform(type: any): egret.ColorTransform;
    static addTransform(type: any, matrix: number[]): void;
}
declare class ColorTransformType {
    static gray: number;
    static clone: number;
    static skillDisabled: number;
    static light: number;
    static green: number;
    static blue: number;
    static purple: number;
    static fightMask: number;
    static death: number;
}
declare module mo {
    class Project {
        logLvl: any;
        renderMode: number;
        showFPS: boolean;
        frameRate: number;
        sharedCfg: any;
        version: string;
        assetsHost: string;
        assetsPort: string;
        httpHost: string;
        httpPort: string;
        logServer: boolean;
        isDev: boolean;
        design: Size;
        resolution: Size;
        resLimit: number;
        audioEnabled: boolean;
        guideEnabled: boolean;
        isSandBox: boolean;
        isValidIAP: boolean;
        armatureDemoEnabled: number;
        fightAreaEnabled: boolean;
        fightSimulateEnabled: boolean;
        ccaContentScale: number;
        channelId: string;
        fightDebugMode: boolean;
        openRecharge: boolean;
        option: any;
        isScatterMode: boolean;
        static setData(project: Project, data: any): void;
    }
    var project: Project;
    function onProjectJsonOnce(listener: Function, ctx?: any): void;
    function loadProject(cb: Function, ctx?: any): void;
}
declare module mo {
    /**
     * 每帧都执行。
     * @param cb
     * @param ctx
     */
    function tick(cb: (frameTime: number) => void, ctx?: any): void;
    /**
     * 移除每帧的执行函数。
     * @param cb
     * @param ctx
     */
    function clearTick(cb: (frameTime: number) => void, ctx?: any): void;
    /**
     * 下一个主循环执行一次。
     * @deprecated
     * @param cb
     * @param ctx
     */
    function nextTick(cb: (...args: any[]) => void, ctx?: any, ...args: any[]): void;
    /**
     * 在指定的延迟（以毫秒为单位）后运行指定的函数。
     * @method mo.setTimeout
     * @param cb {Function} 侦听函数
     * @param ctx {any} this对象
     * @param delay {number} 延迟时间，以毫秒为单位
     * @param ...args {any} 参数列表
     * @returns {number} 返回索引，可以用于 clearTimeout
     */
    function setTimeout(cb: (...args: any[]) => void, ctx: any, delay: number, ...args: any[]): number;
    /**
     * 清除指定延迟后运行的函数。
     * @method mo.clearTimeout
     * @param key {number}
     */
    function clearTimeout(key: number): void;
    function clearAllTimeout(): void;
    function setInterval(cb: Function, ctx: any, interval: number): number;
    function clearInterval(key: number): void;
    function clearAllInterval(): void;
    var _customStageGetter: any;
    function getStage(): egret.Stage;
    function clearStage(): egret.Stage;
    var _actionMag: egret.action.Manager;
    function runAction(action: egret.action.Action, target: any, paused?: boolean): void;
}
declare module mo {
    /**
     * 是否开启音效
     */
    var _audioEnabled: any;
    var audioEnabled: any;
    /** 默认的点击按键的音效id */
    var audioIdOnClick: number;
    var _playingMusic: any;
    /**
     * 播放一个音效
     * @param audioPath
     * @param isBgMusic
     * @param cb
     * @param {Boolean|null} loop
     */
    function playAudio(audioPath: any, loop?: any, isBgMusic?: any, cb?: any): void;
    /**
     * 停止一个音效
     * @param audioPath
     */
    function pauseAudio(audioPath: any): void;
    /**
     * 播放一个背景音乐
     * @param audioPath
     * @param loop
     */
    function playMusic(audioPath: any, loop: any): void;
    /**
     * 暂停背景音乐
     */
    function pauseMusic(): void;
    /**
     * 恢复背景音乐
     */
    function resumeMusic(): void;
    /**
     * 设置背景音乐音量
     * @param volume
     */
    function setMusicVolume(volume: any): void;
    var playUIAudio: Function;
}
declare module mo {
    function addConst(Class: any, prop: any): void;
}
declare module mo {
    var worldClock: any;
    class RESOLUTION_POLICY {
        static NO_BORDER: string;
        static SHOW_ALL: string;
        static EXACT_FIT: string;
        static FIXED_WIDTH: string;
        static FIXED_HEIGHT: string;
    }
    function init(): void;
    function resetArr(arr: any): void;
    /**
     * 遍历对象或者数组。
     * @param obj
     * @param iterator
     * @param context
     */
    function each(obj: any, iterator: (value: any, index?: any) => any, context?: any): void;
    /**
     * 格式化参数成String。
     * 参数和h5的console.log保持一致。
     * @returns {*}
     */
    function formatStr(...args: any[]): string;
    function formatPlaceholder(tempStr: any, map: any): any;
    /**
     * 延时执行一个函数
     * @param delay 时间单位：秒
     * @param selector
     * @param target
     */
    function delayCall(delay: number, selector: (...args: any[]) => void, ctx?: any): number;
    /**
     * 清除延迟执行的函数
     * @param key
     */
    function clearDelayCall(key: number): void;
    /**
     * 循环执行一个函数
     * @param interval 时间单位：毫秒
     * @param selector
     * @param target
     * @param atOnce 立即执行一次再开始回调
     */
    function schedule(selector: Function, target: any, interval: number, atOnce?: boolean): void;
    /**
     * 取消执行一个函数
     * @param selector
     * @param target
     */
    function unschedule(selector: Function, target: any): void;
    /**
     * 暂停目标所有schedule
     * @param target
     */
    function pauseScheduleTarget(target: any): void;
    /**
     * 继续目标所有schedule
     * @param target
     */
    function resumeScheduleTarget(target: any): void;
    /**
     * 获取一个json文件的内容
     * @param fileName
     * @returns {Object}
     */
    function getJSONWithFileName(fileName: any): any;
    /**
     * 获取一个json文件中某个id的单条信息
     * @param fileName
     * @param id
     * @returns {Object}
     */
    function getJSONWithFileNameAndID(fileName: any, id: any): any;
    /**
     * 读取策划配置表里有分号的信息，如：1,2,3,4
     * @param str
     * @param num
     * @returns {*}
     */
    function getStrByOrder(str: any, num: any): any;
    /**
     * 获取机器码
     */
    function getDeviceId(): any;
    /**
     * 给一个sprite设置一个shader效果
     * @param RGBANode
     * @param shaderObject
     */
    function setShader(RGBANode: any, shaderObject: any): void;
    /**
     * 作换坐标系的点
     * @param targetNode 要转换到的节点
     * @param originNode 原来的节点
     * @param pos
     */
    function convertNodeToNodeSpace(targetNode: any, originNode: any, pos: any): any;
    /**
     * 创建一个有高斯模糊后的全屏sprite
     * @param blurSize 模糊程度，0~1，值越大模糊程度越高
     * @returns {cc.Sprite|*}
     */
    function createBlurredBg(blurSize: number): any;
    var __ipCfgName: string;
    var __areaId: string;
    function _getLocalStorageKeyPre(key: any, withoutAreaPrefix: any): string;
    /**
     * localStorage api的进一步封装。
     * @param key
     * @param value
     */
    function setLocalStorageItem(key: any, value: any, withoutAreaPrefix?: boolean): void;
    /**
     * localStorage api的进一步封装。
     * @param key
     * @returns {*}
     */
    function getLocalStorageItem(key: any, withoutAreaPrefix?: boolean): any;
    /**
     * localStorage api的进一步封装。
     * @param key
     * @returns {*}
     */
    function removeLocalStorageItem(key: any, withoutAreaPrefix: any): void;
    /**
     * 判断是否需要刷新
     * @param refreshHours
     * @param lastTime {Date}
     * @param now {Date}
     * @returns {boolean}
     */
    function needToRefresh(refreshHours: any, lastTime: any, now?: Date): boolean;
    /**
     * 检测web端运行于什么系统
     */
    function checkPlatform(): number;
    /**
     * 判断一个节点是否真的可见
     * @param displayObject
     * @returns {boolean}
     */
    function isNodeVisible(displayObject: egret.DisplayObject): boolean;
}
declare module mo {
    /**
     * 验证数组类型
     * @param {Array} arr
     * @param {function} type
     * @return {Boolean}
     * @function
     */
    function ArrayVerifyType(arr: any[], type: Function): boolean;
    /**
     * 根据index删除对象
     * @function
     * @param {Array} arr Source Array
     * @param {Number} index index of remove object
     */
    function ArrayRemoveObjectAtIndex(arr: any[], index: number): void;
    /**
     * 删除某个对象
     * @function
     * @param {Array} arr Source Array
     * @param {*} delObj  remove object
     */
    function ArrayRemoveObject(arr: any[], delObj: any): void;
    /**
     * @function
     * @param {Array} arr Source Array
     * @param {Array} minusArr minus Array
     */
    function ArrayRemoveArray(arr: any[], minusArr: any[]): void;
    /**
     * 获取对象在数据里的排序
     * @function
     * @param {Array} arr Source Array
     * @param {*} value find value
     * @return {Number} index of first occurence of value
     */
    function ArrayGetIndexOfValue(arr: any[], value: any): number;
    /**
     * 推送到数组里
     * @function
     * @param {Array} arr
     * @param {*} addObj
     */
    function ArrayAppendObject(arr: any[], addObj: any): void;
    /**
     * 在数组里插入对象
     * @function
     * @param {Array} arr
     * @param {*} addObj
     * @param {Number} index
     * @return {Array}
     */
    function ArrayAppendObjectToIndex(arr: any[], addObj: any, index: number): any[];
    /**
     * 在某个位置插入多个对象
     * @function
     * @param {Array} arr
     * @param {Array} addObjs
     * @param {Number} index
     * @return {Array}
     */
    function ArrayAppendObjectsToIndex(arr: any[], addObjs: any[], index: number): any[];
    /**
     * 找出一个对象在数组里的index
     * @function
     * @param {Array} arr Source Array
     * @param {*} findObj find object
     * @return {Number} index of first occurence of value
     */
    function ArrayGetIndexOfObject(arr: any[], findObj: any): number;
    /**
     * 数组是否包含一个对象
     * @function
     * @param {Array} arr
     * @param {*} findObj
     * @return {Boolean}
     */
    function ArrayContainsObject(arr: any[], findObj: any): boolean;
    /**
     * 过滤重复的对象
     * @function
     * @param {Array} arr
     * @return {Array}
     */
    function filter(arr: any[]): any[];
}
declare module mo {
    class __ImportBaseCommonApi {
    }
}
declare module mo._baseConstFuncPrototype {
    /**
     * 创建
     * @param args
     * @returns {any}
     */
    function create(...args: any[]): any;
    function createDynamic(...args: any[]): any;
    function getInstance(...args: any[]): any;
    function purgeInstance(): void;
}
declare module mo {
    class Class extends egret.EventDispatcher {
        static __className: string;
        __className: string;
        __class: any;
        _isInstance: boolean;
        _initProp(): void;
        constructor();
        init(...args: any[]): void;
        _init(...args: any[]): void;
        _hasDtored: boolean;
        doDtor(): void;
        dtor(): void;
        static create(...args: any[]): any;
        static getInstance(...args: any[]): any;
        static purgeInstance(...args: any[]): any;
    }
}
declare module mo {
    class Option {
        static __className: string;
        __className: string;
        __class: any;
        _initProp(): void;
        constructor();
        _init(...args: any[]): void;
        _hasDtored: boolean;
        doDtor(): void;
        dtor(): void;
        reset(): void;
        clone(temp: Option): Option;
    }
}
/**
 * 常用的颜色值
 */
declare module mo {
    var RED: number;
    var GREEN: number;
    var BLUE: number;
    var BLACK: number;
    var WHITE: number;
    var YELLOW: number;
    var GRAY: number;
    function c3b(r: number, g: number, b: number): number;
}
/**
 * WebGL constants
 */
declare module gl {
    /**
     * @constant
     * @type {Number}
     */
    var ONE: number;
    /**
     * @constant
     * @type {Number}
     */
    var ZERO: number;
    /**
     * @constant
     * @type {Number}
     */
    var SRC_ALPHA: number;
    /**
     * @constant
     * @type {Number}
     */
    var ONE_MINUS_SRC_ALPHA: number;
    /**
     * @constant
     * @type {Number}
     */
    var ONE_MINUS_DST_COLOR: number;
    /**
     * @constant
     * @type {Number}
     */
    var DST_ALPHA: number;
}
declare module mo {
    /**
     * 只继承function
     * @param clazz
     * @param props
     */
    function impl(clazz: any, ...props: any[]): void;
}
declare module mo {
    var MSG_DEPRECATED: string;
    var MSG_INNER_SIZE_RESET: string;
}
declare module mo {
    class Point extends egret.Point {
        /**
         * xDirty
         */
        _xDirty: boolean;
        _setXDirty(xDirty: boolean): void;
        xDirty: boolean;
        /**
         * yDirty
         */
        _yDirty: boolean;
        _setYDirty(yDirty: boolean): void;
        yDirty: boolean;
        /**
         * dirty
         */
        _dirty: boolean;
        _setDirty(dirty: boolean): void;
        dirty: boolean;
        /**
         * x
         */
        _x: number;
        _setX(x: number): void;
        x: number;
        /**
         * y
         */
        _y: number;
        _setY(y: number): void;
        y: number;
        clone(point?: Point): Point;
        /**
         * 返回该点的相反点
         * @returns {Point}
         */
        neg(): Point;
        /**
         * 加上某个点所得到的点
         * @param point
         * @returns {Point}
         */
        add(point: Point): Point;
        /**
         * 检出某个点所得到的点
         * @param point
         * @returns {Point}
         */
        sub(point: Point): Point;
        /**
         * 乘以一个系数所得到的点
         * @param floatVar
         * @returns {Point}
         */
        mult(floatVar: number): Point;
        /**
         * 和某个点的中心点
         * @param point
         * @returns {Point}
         */
        midPoint(point: Point): Point;
        /**
         * 和某个点的点乘积
         * @param point
         * @returns {number}
         */
        dot(point: Point): number;
        /**
         * 和某个点的差乘积
         * @param point
         */
        cross(point: Point): number;
        /**
         * 绕着原点顺时针旋转90°后得到的点。
         * @returns {Point}
         */
        perp(): Point;
        /**
         * 绕着原点逆时针时针旋转90°后得到的点。
         * @returns {Point}
         */
        rPerp(): Point;
        /**
         * 获取该点在point点上的投影。
         * @param point
         * @returns {Point}
         */
        project(point: Point): Point;
        /**
         * 绕着某个点旋转的到的新点？ TODO
         * @param point
         * @returns {Point}
         */
        rotate(point: Point): Point;
        /**
         * 绕着某个点旋转的到的新点？ TODO
         * @param point
         * @returns {Point}
         */
        unrotate(point: Point): Point;
        /**
         * 计算点到原点的距离平方？
         * @returns {number}
         */
        lengthSQ: number;
        /**
         * 到某个点的距离平方。
         * @param point
         * @returns {number}
         */
        distanceSQTo(point: Point): number;
        /**
         * @deprecated
         * @param point
         * @returns {number}
         */
        distanceSQ(point: Point): number;
        /**
         * 获取点到原点的距离。
         * @returns {number}
         */
        length: number;
        /**
         * 获取该点到某点的距离。
         * @param point
         * @returns {number}
         */
        distanceTo(point: Point): number;
        /**
         * @deprecated
         * @param point
         * @returns {number}
         */
        distance(point: Point): number;
        /**
         * 获取单位向量。
         * @returns {Point}
         */
        normalize(): Point;
        toAngle(): number;
    }
    function p(x: any, y?: any, resultPoint?: Point): Point;
}
declare module mo {
    class Rect extends egret.Rectangle {
        /**
         * 判断是否包含一个矩形区域
         * @param rect
         * @returns {boolean}
         */
        containsRect(rect: Rect): boolean;
        /**
         * 获取最大的x值
         * @returns {number}
         */
        maxX: number;
        /**
         * 获取中间的x值
         * @returns {number}
         */
        midX: number;
        /**
         * 获取最大的y值
         * @returns {number}
         */
        maxY: number;
        /**
         * 获取中间的y值
         * @returns {number}
         */
        midY: number;
        /**
         * 判断两个矩形框是否有交集
         * @param rect
         * @returns {boolean}
         */
        overlaps(rect: Rect): boolean;
        /**
         * 和矩形框求并集。
         * @param rect
         * @returns {mo.Rect}
         */
        union(rect: Rect): Rect;
        getIntersection(rect: Rect): Rect;
        clone(temp?: Rect): Rect;
    }
    function rect(x: any, y: any, width: any, height: any, resultRect?: Rect): Rect;
}
declare module mo {
    class Size extends egret.HashObject {
        /**
         * Size的宽度
         * @constant {number} mo.Size#width
         */
        width: number;
        /**
         * Size的高度
         * @constant {number} mo.Size#height
         */
        height: number;
        constructor(width?: number, height?: number);
        /**
         * 克隆点对象
         * @method mo.Size#clone
         * @returns {mo.Size}
         */
        clone(): Size;
        /**
         * 确定两个Size是否相同。如果两个Size具有相同的 width 和 height 值，则它们相同。
         * @method mo.Size#equals
         * @param {mo.Size} toCompare 要比较的Size。
         * @returns {boolean} 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
         */
        equals(toCompare: Size): boolean;
    }
    function size(width: any, height?: any, resultSize?: Size): Size;
}
/**
* Created by lihex on 12/18/14.
*/
declare module mo {
    class VisibleRect extends Class {
        private _topLeft;
        private _topRight;
        private _top;
        private _bottomLeft;
        private _bottomRight;
        private _bottom;
        private _center;
        private _left;
        private _right;
        private _width;
        private _height;
        private _size;
        _initProp(): void;
        init(): void;
        getRect(): Rect;
        getSize(): Size;
        getWidth(): number;
        getHeight(): number;
        topLeft(): Point;
        topRight(): Point;
        top(): Point;
        bottomLeft(): Point;
        bottomRight(): Point;
        bottom(): Point;
        center(): Point;
        left(): Point;
        right(): Point;
    }
    var visibleRect: VisibleRect;
}
declare module mo {
    /**
     *
     * @param pWOrH
     * @param wOrH
     * @param aXOrY
     * @param poseType  0:左/上,1:中,2:右/下
     * @returns {number}
     */
    function calLayoutXOrY(pWOrH: number, wOrH: number, aXOrY: number, poseType: number): number;
}
declare module mo {
    /**
     * 角度转弧度
     * @param {Number} angle
     * @return {Number}
     * @function
     */
    function degreesToRadians(angle: number): number;
    /**
     * 弧度转角度
     * @param {Number} angle
     * @return {Number}
     * @function
     */
    function radiansToDegrees(angle: number): number;
    /**
     * 返回相反的点坐标
     * @param point
     * @returns {Point}
     */
    function pNeg(point: Point): Point;
    /**
     * 两点相加
     * @param v1
     * @param v2
     * @returns {Point}
     */
    function pAdd(v1: Point, v2: Point): Point;
    /**
     * 两点相减
     * @param v1
     * @param v2
     * @returns {Point}
     */
    function pSub(v1: Point, v2: Point): Point;
    /**
     * 点乘以某个系数得到新的点
     * @param point
     * @param floatVar
     * @returns {Point}
     */
    function pMult(point: Point, floatVar: number): Point;
    /**
     * 两点的中心点
     * @param v1
     * @param v2
     * @returns {Point}
     */
    function pMidpoint(v1: Point, v2: Point): Point;
    /**
     * Calculates dot product of two points.
     * @param {mo.Point} v1
     * @param {mo.Point} v2
     * @return {Number}
     */
    function pDot(v1: Point, v2: Point): number;
    /**
     * Returns point multiplied to a length of 1.
     * @param {cc.Point} v
     * @return {cc.Point}
     */
    function pNormalize(v: Point): Point;
    /**
     * Calculates distance between point an origin
     * @param  {cc.Point} v
     * @return {Number}
     */
    function pLength(v: Point): number;
    /**
     * Calculates the square length of a cc.Point (not calling sqrt() )
     * @param  {cc.Point} v
     *@return {Number}
     */
    function pLengthSQ(v: Point): number;
}
declare module mo {
    var _MsgDlgClassMap: any;
    var _msgData: any;
    var msgTypeKey: any;
    var msgTextKey: any;
    var defaultMsgType: any;
    /**
     * 显示提示信息
     * @param msgCode 消息的ID
     * @param args 最后4个分别是确定和取消的回调参数，之前的是要替换的字符串
     */
    function showMsg(msgCode: any, ...args: any[]): boolean;
    /**
     * 按照类型注册弹出框类
     * @param type
     * @param MsgDlgClass
     */
    function registerMsgDlg(type: any, MsgDlgClass: any): void;
    /**
     * 设置提示消息数据
     * @param data
     */
    function setMsgData(data: any): void;
}
declare module mo {
    function callFunc(selector: Function, selectorTarget?: any, data?: any): egret.action.CallFunc;
    function sequence(...actions: any[]): egret.action.Sequence;
    function spawn(...actions: any[]): egret.action.Spawn;
    function repeat(action: any, times: number): egret.action.Repeat;
    function repeatForever(action: any): egret.action.RepeatForever;
    function moveBy(duration: number, pos: Point): egret.action.MoveBy;
    function moveTo(duration: number, pos: Point): egret.action.MoveTo;
    function scaleBy(duration: number, sx: number, sy?: number): egret.action.ScaleBy;
    function scaleTo(duration: number, sx: number, sy?: number): egret.action.ScaleTo;
    function skewBy(duration: number, skx: number, sky?: number): egret.action.SkewBy;
    function skewTo(duration: number, skx: number, sky?: number): egret.action.SkewTo;
    function rotateBy(duration: number, rotate: number): egret.action.RotateBy;
    function rotateTo(duration: number, rotate: number): egret.action.RotateTo;
    function jumpBy(duration: number, pos: Point, height: any, jumps: any): egret.action.JumpBy;
    function jumpTo(duration: number, pos: Point, height: any, jumps: any): egret.action.JumpTo;
    function fadeTo(duration: number, alpha: number): egret.action.FadeTo;
    function fadeIn(duration: number): egret.action.FadeIn;
    function fadeOut(duration: number): egret.action.FadeOut;
    function delayTime(duration: number): egret.action.DelayTime;
    function ellipse(duration: number, centerPosition: Point, aLength: number, cLength: number): action.Ellipse;
    function shake(duration: number, strengthX: number, strengthY: number): action.Shake;
    function bezierBy(t: any, c: any): action.BezierBy;
    function bezierTo(t: any, c: any): action.BezierTo;
    function track(trackTarget: any, trackSpeed: number, callback: any, callTarget: any): action.Track;
}
declare module mo.action {
    class ProgressTo extends egret.action.ActionInterval {
        __className: string;
        _to: number;
        _from: number;
        _cb: any;
        _cbTarget: any;
        constructor();
        startWithTarget(target: any): void;
        initWithDuration(duration: any, percent: any, cb?: any, target?: any): boolean;
        update(dt: any): void;
        clone(): ProgressTo;
        static create: (duration: any, percent: any, cb?: any, target?: any) => ProgressTo;
    }
    class ProgressFromTo extends egret.action.ActionInterval {
        __className: string;
        _to: number;
        _from: number;
        _cb: any;
        _cbTarget: any;
        constructor();
        initWithDuration(duration: any, fromPercentage: any, toPercentage: any, cb?: any, target?: any): boolean;
        update(dt: any): void;
        clone(): ProgressFromTo;
        reverse(): ProgressFromTo;
        static create: (duration: any, fromPercentage: any, toPercentage: any, cb?: any, target?: any) => ProgressFromTo;
    }
}
declare module mo.action {
    class Ellipse extends egret.action.ActionInterval {
        static __className: string;
        _centerPosition: Point;
        _aLength: number;
        _cLength: number;
        startWithTarget(target: any): void;
        initWithDuration(duration: any, centerPosition: any, aLength: any, cLength: any): boolean;
        update(dt: any): void;
        _ellipseX(a: any, by: any, c: any, dt: any): any;
        _ellipseY(a: any, by: any, c: any, dt: any): number;
        static create(duration: any, centerPosition: any, aLength: any, cLength: any): Ellipse;
    }
}
/**
 * Created by Administrator on 2014/12/29.
 */
declare module mo.action {
    class BezierBy extends egret.action.ActionInterval {
        __className: string;
        _config: any;
        _startPosition: any;
        _previousPosition: any;
        /**
         * Constructor
         */
        constructor();
        /**
         * @param {Number} t time in seconds
         * @param {Array} c Array of points
         * @return {Boolean}
         */
        initWithDuration(t: any, c: any): boolean;
        /**
         * returns a new clone of the action
         * @returns {cc.BezierBy}
         */
        clone(): any;
        /**
         * @param {cc.Node} target
         */
        startWithTarget(target: any): void;
        /**
         * @param {Number} time
         */
        update(time: any): void;
        _bezierAt(a: any, b: any, c: any, d: any, t: any): number;
        /**
         * @return {cc.ActionInterval}
         */
        reverse(): BezierBy;
        static create(t: any, c: any): BezierBy;
    }
    /** An action that moves the target with a cubic Bezier curve to a destination point.
     * @class
     * @extends cc.BezierBy
     */
    class BezierTo extends BezierBy {
        _toConfig: any;
        constructor();
        /**
         * @param {Number} t time in seconds
         * @param {Array} c Array of points
         * @return {Boolean}
         */
        initWithDuration(t: any, c: any): boolean;
        /**
         * returns a new clone of the action
         * @returns {cc.BezierTo}
         */
        clone(): any;
        /**
         * @param {cc.Node} target
         */
        startWithTarget(target: any): void;
        /**
         * @param {Number} t
         * @param {Array} c array of points
         * @return {mo.BezierTo}
         * @example
         * // example
         * var bezier = [cc.p(0, windowSize.height / 2), cc.p(300, -windowSize.height / 2), cc.p(300, 100)];
         * var bezierTo = cc.BezierTo.create(2, bezier);
         */
        static create(t: any, c: any): BezierTo;
    }
}
declare module mo {
    class Ease extends egret.Ease {
    }
}
/**
 * Created by Administrator on 2014/12/29.
 */
declare module mo.action {
    class Shake extends egret.action.ActionInterval {
        __className: string;
        _initialX: number;
        _initialY: number;
        _strengthX: number;
        _strengthY: number;
        _isInit: boolean;
        constructor();
        startWithTarget(target: any): void;
        initWithDuration(duration: any, strengthX: any, strengthY: any): boolean;
        update(dt: any): void;
        stop(): void;
        _fgRangeRand(min: any, max: any): any;
        static create: (duration: number, strengthX: number, strengthY: number) => Shake;
    }
}
/**
 * Created by Administrator on 2015/1/28.
 */
declare module mo.action {
    class Track extends egret.action.ActionInterval {
        __className: string;
        _omega: number;
        _trackTarget: any;
        _trackSpeed: number;
        _callback: any;
        _callTarget: any;
        initWithTarget(trackTarget: any, trackSpeed: any, callback: any, callTarget: any): void;
        step(dt: any): void;
        /**
         * @return {Boolean}
         */
        isDone(): boolean;
        stop(): void;
        static create(trackTargett: any, trackSpeed: number, callback: any, callTarget: any): Track;
    }
}
declare module mo {
    class _LastOption extends Option {
        map: any;
        node: Node;
        _initProp(): void;
        initLastValue(key: string, newValue: any): void;
        setLastValue(key: string, value: any): void;
        resetToLast(key: string): void;
        isEnabled(key: string): boolean;
        dtor(): void;
    }
    var _node4Scroll: Node;
    class _NodeOption extends Option {
        tag: string;
        nodeSizeDirty: boolean;
        clickData: any;
        zOrder: number;
        tempRect: Rect;
        penetrable: boolean;
        clickCb: (sender: Node, event: egret.TouchEvent) => void;
        clickCtx: any;
        factory: any;
        delegate: any;
        canBeReclaimed: boolean;
        eventStoreForClass: any;
        isReclaimed: boolean;
        isAutoDtor: boolean;
        hasDtored: boolean;
        scale9Grid: Rect;
        scale9Enabled: boolean;
        fillMode: string;
        _initProp(): void;
        dtor(): void;
    }
    class _TouchOption extends Option {
        touchBeganPoint: Point;
        touchBeganStagePoint: Point;
        touchMovedPoint: Point;
        touchMovedStagePoint: Point;
        touchMovingPoint: Point;
        touchMovingStagePoint: Point;
        touchEndedPoint: Point;
        touchEndedStagePoint: Point;
        bePressed: boolean;
        canTap: boolean;
        clickedThisTick: boolean;
        canLongTouch: boolean;
        touchEventsInited: boolean;
        longTouchEventSelector: Function;
        longTouchEventListener: any;
        isDoingLongEvent: boolean;
        respInterval: number;
        startInterVal: number;
        longTouchEnabled: boolean;
        longTouchEventInterValId: number;
        longTouchTimeoutId: number;
        movedDeltaSQ: number;
        isIn: boolean;
        hitChildrenEnabled: boolean;
        hitEgretEnabled: boolean;
        _initProp(): void;
        dtor(): void;
        clearPoints(): void;
    }
    class _ExtendOption extends Option {
    }
}
declare module mo {
    class Node extends egret.DisplayObjectContainer {
        static __className: string;
        static create(...args: any[]): any;
        static createDynamic(...args: any[]): any;
        static getInstance(...args: any[]): any;
        static purgeInstance(...args: any[]): any;
        static NODE_OPTION_CLASS: typeof _NodeOption;
        static TOUCH_OPTION_CLASS: typeof _TouchOption;
        static CLICK_NODE: string;
        static NODE_TOUCH_BEGIN: string;
        static REMOVE_FROM_PARENT: string;
        __class: any;
        __className: string;
        _dirty: boolean;
        _isInstance: boolean;
        /**
         * 判断是否需要对子节点列表重新排序
         * @type {boolean}
         * @private
         */
        _reorderChildrenDirty: boolean;
        _nodeOption: _NodeOption;
        _touchOption: _TouchOption;
        extendOption: _ExtendOption;
        _lastOption: _LastOption;
        _setZOrder(zOrder: number): void;
        zOrder: number;
        /**
         * @deprecated
         * @param zOrder
         */
        setZOrder(zOrder: number): void;
        /**
         * @deprecated
         * @returns {number}
         */
        getZOrder(): number;
        _setVisible(value: boolean): void;
        /**
         * 请注意，子类所有的成员属性都必须在这里赋值，不能直接在声明时候也附上值。
         * @private
         */
        _initProp(): void;
        constructor();
        _init(): void;
        _setWidth(width: number): void;
        _setHeight(height: number): void;
        init(...args: any[]): void;
        /**
         * 获取shader
         * @return any
         */
        getShaderProgram(): any;
        setParent(parent: any): void;
        getParent(): any;
        setRotation(rotation: number): void;
        getRotation(): number;
        setOpacity(opacity: number): void;
        getOpacity(): number;
        setScale(scaleX: number, scaleY?: number): void;
        setScaleX(scaleX: number): void;
        setScaleY(scaleY: number): void;
        getScale(): number;
        getScaleY(): number;
        getScaleX(): number;
        setName(name: string): void;
        getName(): string;
        setTag(tag: string): void;
        getTag(): string;
        setSkewY(skewY: number): void;
        getSkewY(): number;
        setSkewX(skewX: number): void;
        getSkewX(): number;
        setPosition(pos: any, posY?: number): void;
        getPosition(): Point;
        setPositionX(x: number): void;
        getPositionX(): number;
        setPositionY(y: number): void;
        getPositionY(): number;
        setVisible(visible: boolean): void;
        isVisible(): boolean;
        setAnchorPoint(pos: any, posY?: number): void;
        getAnchorPoint(): Point;
        getAnchorPointInPoints(): Point;
        setSize(size: any, height?: number): void;
        getSize(): Size;
        /**
         * 获取子节点
         * @return {Array<egret.DisplayObject>}
         */
        getChildren(): egret.DisplayObject[];
        /**
         * 获取Widget的子节点数量
         * @returns {Number}
         */
        getChildrenCount(): number;
        getChildByTag(tag: string): any;
        removeChildByTag(tag: string): void;
        setShaderProgram(): void;
        /**=========== Action相关 ===========*/
        /**
         * Action管理器
         * @returns {any}
         */
        getActionManager(): egret.action.Manager;
        runAction(action: egret.action.Action): void;
        pauseSchedulerAndActions(): void;
        resumeSchedulerAndActions(): void;
        numberOfRunningActions(): any;
        stopAllActions(): void;
        stopActionByTag(tag: any): void;
        getActionByTag(tag: any): egret.action.Action;
        stopAction(action: any): void;
        /**
         * @deprecated
         * @returns {boolean}
         */
        isRunning(): boolean;
        update(dt: number): void;
        setColor(color: any): void;
        getColor(): void;
        _parentChanged(parent: egret.DisplayObjectContainer): void;
        addChild(child: egret.DisplayObject): egret.DisplayObject;
        /**
         * 对子类进行排序
         */
        sortChildren(): void;
        _onNodeSizeDirty(): void;
        _updateTransform(): void;
        _onBeforeVisit(): void;
        _onVisit(): void;
        _onUpdateView(): void;
        _onAfterVisit(): void;
        _onAddToStage(): void;
        onEnter(): void;
        onEnterNextTick(): void;
        _onRemoveFromStage(): void;
        onExit(): void;
        getWorldBoxWithoutChildren(): Rect;
        getBounds(resultRect?: Rect, calculateAnchor?: boolean): Rect;
        localToGlobal(x?: number, y?: number, resultPoint?: Point): Point;
        _setTouchEnabled(touchEnabled: boolean): void;
        /**
         * @deprecated
         * @param touchEnabled
         */
        setTouchEnabled(touchEnabled: boolean): void;
        /**
         * @deprecated
         * @returns {boolean}
         */
        isTouchEnabled(): boolean;
        _setPenetrable(penetrable: boolean): void;
        penetrable: boolean;
        /**
         * @deprecated
         * @param penetrable
         */
        setPenetrable(penetrable: boolean): void;
        /**
         * @deprecated
         */
        isPenetrable(): boolean;
        longTouchEnabled: boolean;
        enableLongTouch(respInterval?: number, startInterVal?: number): void;
        _scheduleLongTouchCheck(respInterval: any, delayTime: any): void;
        _unscheduleLongTouchCheck(): void;
        _emitLongTouchBegan(): void;
        hitChildrenEnabled: boolean;
        hitTest(x: number, y: number, ignoreTouchEnabled?: boolean): egret.DisplayObject;
        _initTouchEvents(): void;
        __resetDownEvent(): void;
        __resetOtherEvents(): void;
        _onTouchMoveInStage(event: egret.TouchEvent): void;
        _moving(): void;
        _onTouchEndInStage(event: egret.TouchEvent): void;
        _end(event: egret.TouchEvent): void;
        _removeTouchEvents(): void;
        _onTouchBegin(event: egret.TouchEvent): void;
        onTouchBegan(event: egret.TouchEvent): void;
        onClick(cb: (sender?: Node, event?: egret.TouchEvent) => void, ctx?: any, ...args: any[]): void;
        _doClick(event: egret.TouchEvent): void;
        doDtor(): void;
        dtor(): void;
        registerClassByKey(clazz: any, key: any, listener: Function): void;
        getFactory(): any;
        setFactory(factory: any): void;
        getDelegate(): any;
        setDelegate(delegate: any): void;
        removeFromParent(...args: any[]): void;
        addShader(shader: any): void;
        removeShader(): void;
        canBeReclaimed(): boolean;
        reset(...args: any[]): void;
        isAutoDtor: boolean;
    }
}
/**
 * Created by Administrator on 2014/12/22.
 */
declare module mo {
    class Sprite extends Node {
        static __className: string;
        init(fileName: any): void;
        /**
         * 全部Bitmap是否开启DEBUG模式
         * @member {boolean} egret.Bitmap.debug
         * @private
         */
        static debug: boolean;
        private static renderFilter;
        constructor(texture?: egret.Texture);
        /**
         * 单个Bitmap是否开启DEBUG模式
         * @member {boolean} egret.Bitmap#debug
         * @private
         */
        debug: boolean;
        /**
         * debug边框颜色，默认值为红色
         * @member {number} egret.Bitmap#debugColor
         * @private
         */
        debugColor: number;
        private _texture;
        /**
         * 渲染纹理
         * @member {egret.Texture} egret.Bitmap#texture
         */
        texture: egret.Texture;
        /**
         * 矩形区域，它定义位图对象的九个缩放区域。此属性仅当fillMode为BitmapFillMode.SCALE时有效。
         * scale9Grid的x、y、width、height分别代表九宫图中中间那块的左上点的x、y以及中间方块的宽高。
         * @member {egret.Texture} egret.Bitmap#scale9Grid
         */
        scale9Grid: egret.Rectangle;
        /**
         * 确定位图填充尺寸的方式。
         * 设置为 BitmapFillMode.REPEAT时，位图将重复以填充区域；BitmapFillMode.SCALE时，位图将拉伸以填充区域。
         * 默认值：BitmapFillMode.SCALE。
         * @member {egret.Texture} egret.Bitmap#fillMode
         */
        fillMode: string;
        _render(renderContext: egret.RendererContext): void;
    }
}
declare module mo {
    class Layer extends Node {
        static __className: string;
        static PHASE_SHOW: string;
        static PHASE_HIDE: string;
        static PHASE_CLOSE: string;
        moduleInfo: any;
        _showWithAction: boolean;
        _showingWithAction: boolean;
        _setShowingWithAction(showingWithAction: boolean): void;
        showingWithAction: boolean;
        /** 是否自动进行背景模糊遮罩 */
        _blurMaskEnabled: boolean;
        _setBlurMaskEnabled(blurMaskEnabled: boolean): void;
        blurMaskEnabled: boolean;
        _onCloseFunc(): void;
        _onCloseTarget: any;
        _onShowFunc(): void;
        _onShowTarget: any;
        _onHideFunc(): void;
        _onHideTarget: any;
        _initProp(): void;
        dtor(): void;
        _getShowAction(cb: any): egret.action.Action;
        _onShowReady(): void;
        _doShow(): void;
        show(): void;
        _showWithoutAction(): void;
        _onHide(): void;
        _doHide(): void;
        hide(): void;
        _onClose(): any;
        _doClose(): void;
        close(): void;
        onClose(listener: any, ctx?: any): void;
        onShow(listener: any, ctx?: any): void;
        onHide(listener: any, ctx?: any): void;
        setLayoutAdaptive(widget: any, isAdaptiveChildren: any): void;
    }
}
declare module mo {
    class Invocation extends Class {
        static __className: string;
        _target: any;
        _callback: Function;
        _initProp(): void;
        _init(): void;
        invokeFirst(...args: any[]): void;
        invoke(dt: number): void;
        equals(callback: any, target: any): boolean;
    }
}
declare module mo {
    class CountdownInvocation extends Invocation {
        static __className: string;
        _countdownTime: number;
        _leftTime: number;
        _endCallback: Function;
        _endTarget: any;
        _initProp(): void;
        init(leftTime: any, callback: any, target: any, endCallback: any, endTarget: any, ...args: any[]): void;
        invokeFirst(...args: any[]): void;
        invoke(dt: number): void;
    }
    class LoopCountdownToEndTimeInvocation extends Invocation {
        static __className: string;
        _interval: number;
        _intervalCallback: Function;
        _intervalTarget: any;
        _endCallback: Function;
        _endTarget: any;
        _leftTime: number;
        _count: number;
        init(endTime: any, interval: any, callback: any, target: any, intervalCallback: any, intervalTarget: any, endCallback: any, endTarget: any, ...args: any[]): void;
        invokeFirst(...args: any[]): void;
        invoke(dt: number): void;
    }
    class LimitTimeoutInvocation extends Invocation {
        static __className: string;
        LIMIT_BEGINNING: number;
        LIMIT_BEGAN: number;
        LIMIT_ENDED: number;
        _countdownTime4Begin: number;
        _countdownTime4End: number;
        _leftTime4Begin: number;
        _leftTime4End: number;
        _limitCallback: Function;
        _limitTarget: any;
        _state: number;
        _initProp(): void;
        init(leftTime4Begin: any, leftTime4End: any, limitCallback: any, limitTarget: any, ...args: any[]): any;
        invoke(dt: number): void;
    }
}
declare module mo {
    class Timer extends Class {
        static __className: string;
        _invocations: any[];
        _initProp(): void;
        _init(): void;
        _reset(up: any): void;
        clear(): void;
        _update(dt: number): void;
        setInvocation(invocation: Invocation): Invocation;
        /**
         * 设置interval类型触发器
         * @param callback
         * @param target
         * @returns {callback}
         */
        setInterval(callback: Function, target?: any): Invocation;
        /**
         * 设置倒计时类型触发器
         * @param {Number} millisecond   倒计时的毫秒数
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        countdown(millisecond: any, callback: Function, target?: any, endCallback?: any, endTarget?: any): Invocation;
        /**
         * 倒计时到某个时间点的触发器
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        countdownToEndTime(endTime: any, callback: Function, target?: any, endCallback?: any, endTarget?: any): Invocation;
        /**
         * 循环方式的倒数计时。自动根据结束时间点算出循环次数。
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Number} interval  每次循环的时间间隔
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} intervalCallback  每次循环结束的回调
         * @param {Object|null} intervalTarget  每次循环结束的回调函数的上下文
         * @param {Function|null} endCallback   总倒计时结束的回调
         * @param {Object|null} endTarget   总倒计时结束的回调函数的上下文
         * @returns {LoopCountdownToEndTimeInvocation}
         */
        countdownLoopToEndTime(endTime: any, interval: any, callback: Function, target?: any, intervalCallback?: any, intervalTarget?: any, endCallback?: any, endTarget?: any): Invocation;
        /**
         * 具有时间区间段的setTimeout，针对毫秒：
         mo.timer.setLimitTimeout(5000, 10000, function(){
            cc.log(arguments);
        });
         * @param leftTime4Begin
         * @param leftTime4End
         * @param limitCallback
         * @param limitTarget
         * @returns {mo.LimitTimeoutInvocation}
         */
        setLimitTimeout(leftTime4Begin: number, leftTime4End: number, limitCallback: Function, limitTarget?: any): Invocation;
        /**
         * 具有时间区间段的setTimeout，针对小时：
         mo.timer.setHourLimitTimeout(16, 17, function(){
            cc.log(arguments);
        });
         * @param beginHour
         * @param endHour
         * @param limitCallback
         * @param limitTarget
         * @returns {mo.LimitTimeoutInvocation}
         */
        setHourLimitTimeout(beginHour: number, endHour: number, limitCallback: Function, limitTarget?: any): Invocation;
        /**
         * 移除invocation
         * @param invocation
         */
        removeInvocation(invocation: Invocation): void;
        /**
         * 移除invocation
         * @param callback
         * @param target
         */
        removeInvocationByCallback(callback: Function, target?: any): void;
    }
    var timer: Timer;
}
declare module mo {
    class DataController extends Class {
        static __className: string;
        static ON_RESET: string;
        resModuleName: string;
        _data: any;
        DATA_KEY: any;
        _keyChangedMap: any;
        _customArgMap: any;
        _autoNotify: boolean;
        _initProp(): void;
        constructor();
        reset(...args: any[]): void;
        dtor(): void;
        init(...args: any[]): void;
        setAutoNotify(isAuto: boolean): void;
        isAutoNotify(): boolean;
        _notifyArr(selectors: Function[], targets: any[], args: any[]): void;
        _setChanged(key: any): void;
        get(key: any): any;
        set(key: any, value: any): void;
        add(key: any, value: any): void;
        getData(): any;
        _cloneObj(obj: any): any;
        pushNotify(key: any, value?: any, ...args: any[]): void;
        pushNotifyAtOnce(eventName: any, value: any, ...args: any[]): void;
        _notifyEvent(eventName: any, registersForKey: any, customArgMap: any): void;
        notifyEvent(eventName: any): void;
        notifyAll(): void;
        _changed: boolean;
        __baseInited: boolean;
        __registers: Function[];
        __registerTargets: any[];
        __registersForKey: any;
        _initBase(): void;
        register(selector: Function, target?: any): any;
        registerByKey(key: any, selector: Function, target?: any): void;
        unregister(selector: Function, target?: any): void;
        unregisterByKey(key: any, selector: Function, target?: any): void;
        unregisterAll(): void;
        static _changed: boolean;
        static __baseInited: boolean;
        static __registers: Function[];
        static __registerTargets: any[];
        static __registersForKey: any;
        static _initBase(): void;
        static register(selector: Function, target?: any): any;
        static registerByKey(key: any, selector: Function, target?: any): void;
        static unregister(selector: Function, target?: any): void;
        static unregisterByKey(key: any, selector: Function, target?: any): void;
        static unregisterAll(): void;
        static _registerQueue: any[];
        static _pushInv(target: any, eventName: any): void;
        static _resetList: any[];
        static _pushResetTarget(target: any): void;
    }
    var _isScheduler4DataControllerStarted: boolean;
    function _startScheduler4DataController(): void;
    function registerClassByKey(target: any, clazz: any, key: string, listener: Function): void;
    function unregisterClass(target: any): void;
}
declare module mo {
    class _UIWidgetOption extends _NodeOption {
        clickAudioId: any;
        widgetChildren: UIWidget[];
        nodes: egret.DisplayObject[];
        bright: boolean;
        focus: boolean;
        brightStyle: number;
        layoutParameterDictionary: Object;
        ignoreSize: boolean;
        sizeType: number;
        positionType: number;
        flippedX: boolean;
        flippedY: boolean;
        srcRect: Rect;
        sizePercent: Point;
        posPercent: Point;
        isGray: boolean;
        _initProp(): void;
        clone(temp?: _UIWidgetOption): _UIWidgetOption;
        getClickAudioId(): any;
    }
}
declare module mo {
    var ALIGN_H_LEFT: string;
    var ALIGN_H_CENTER: string;
    var ALIGN_H_RIGHT: string;
    var ALIGN_V_TOP: string;
    var ALIGN_V_MIDDLE: string;
    var ALIGN_V_BOTTOM: string;
    class _UITextOption extends _UIWidgetOption {
        inv: Invocation;
        passedMillisecond: number;
        touchScaleEnabled: boolean;
        normalScaleValueX: number;
        normalScaleValueY: number;
        onSelectedScaleOffset: number;
        textRenderer: egret.TextField;
        color: number;
        str4Format: string;
        ubbParser: UBBParser;
        autoSizeHeight: boolean;
        autoSizeWidth: boolean;
        placeHolder: string;
        isFlow: boolean;
        _initProp(): void;
        dtor(): void;
    }
}
declare module mo {
    class _UITextAtlasOption extends _UIWidgetOption {
        string: string;
        mapStartChar: string;
        spriteSheet: egret.SpriteSheet;
        itemWidth: number;
        itemHeight: number;
        itemsPerRow: number;
        itemsPerColumn: number;
        textureFile: string;
        _initProp(): void;
        dtor(): void;
    }
}
declare module mo.LinearGravity {
    var none: number;
    var left: number;
    var centerHorizontal: number;
    var right: number;
    var top: number;
    var centerVertical: number;
    var bottom: number;
}
declare module mo.RelativeAlign {
    var alignNone: number;
    var alignParentTopLeft: number;
    var alignParentTopCenterHorizontal: number;
    var alignParentTopRight: number;
    var alignParentLeftCenterVertical: number;
    var centerInParent: number;
    var alignParentRightCenterVertical: number;
    var alignParentLeftBottom: number;
    var alignParentBottomCenterHorizontal: number;
    var alignParentRightBottom: number;
}
declare module mo.LayoutParameterType {
    var none: number;
    var linear: number;
    var relative: number;
}
declare module mo {
    class Margin {
        left: number;
        top: number;
        right: number;
        bottom: number;
        constructor(margin?: any, right?: number, bottom?: number, left?: number);
        setMargin(margin?: any, right?: number, bottom?: number, left?: number): void;
        equals(target: any): boolean;
    }
    class Padding {
        left: number;
        top: number;
        right: number;
        bottom: number;
        constructor(padding?: any, right?: number, bottom?: number, left?: number);
        setMargin(padding?: any, right?: number, bottom?: number, left?: number): void;
        equals(target: any): boolean;
    }
}
declare module mo.LayoutBackGroundColorType {
    var none: number;
    var solid: number;
    var gradient: number;
}
declare module mo.LayoutType {
    var absolute: number;
    var linearVertical: number;
    var linearHorizontal: number;
    var relative: number;
}
declare module mo.LayoutClippingType {
    var stencil: number;
    var scissor: number;
}
declare module mo {
    class LayoutParameter extends Class {
        static LINEAR_ALIGN_HT_LEFT: number;
        static LINEAR_ALIGN_HT_RIGHT: number;
        _margin: Margin;
        _type: number;
        setMargin(margin: Margin): void;
        getMargin(): Margin;
        getType(): number;
        _padding: Padding;
        setPadding(padding: Padding): void;
        getPadding(): Padding;
        clone(): LayoutParameter;
        copyProperties(model: any): void;
    }
    class LinearLayoutParameter extends LayoutParameter {
        _type: number;
        _gravity: number;
        _setGravity(gravity: number): void;
        gravity: number;
        /**
         * @deprecated
         * @param gravity
         */
        setGravity(gravity: number): void;
        /**
         * @deprecated
         */
        getGravity(): number;
        copyProperties(model: any): void;
    }
    class RelativeLayoutParameter extends LayoutParameter {
        _type: number;
        _put: boolean;
        _align: number;
        _setAlign(align: number): void;
        align: number;
        /**
         * @deprecated
         * @param align
         */
        setAlign(align: number): void;
        /**
         * @deprecated
         */
        getAlign(): number;
        copyProperties(model: any): void;
    }
    class _UIPanelOption extends _UIWidgetOption {
        layoutType: number;
        doLayoutDirty: any;
        clippingEnabled: any;
        clippingDirty: any;
        bgOpacity: number;
        bgColor: number;
        bgColorDirty: boolean;
        bgTexture: egret.Texture;
        graphics: egret.Graphics;
        autoSizeEnabled: boolean;
        richText: UIText;
        childSrcSizeMap: any;
        _initProp(): void;
        dtor(): void;
    }
}
declare module mo.ScrollViewDir {
    var none: number;
    var vertical: number;
    var horizontal: number;
    var both: number;
}
declare module mo.ScrollViewEventType {
    var scrollToTop: number;
    var scrollToBottom: number;
    var scrollToLeft: number;
    var scrollToRight: number;
    var scrolling: number;
    var bounceTop: number;
    var bounceBottom: number;
    var bounceLeft: number;
    var bounceRight: number;
}
declare module mo {
    var AUTOSCROLLMAXSPEED: number;
    var SCROLLDIR_UP: Point;
    var SCROLLDIR_DOWN: Point;
    var SCROLLDIR_LEFT: Point;
    var SCROLLDIR_RIGHT: Point;
    class _ScrollOption extends Option {
        innerContainer: UIPanel;
        direction: number;
        scrollDir: Point;
        autoScrollDir: Point;
        topBoundary: number;
        bottomBoundary: number;
        leftBoundary: number;
        rightBoundary: number;
        bounceTopBoundary: number;
        bounceBottomBoundary: number;
        bounceLeftBoundary: number;
        bounceRightBoundary: number;
        autoScroll: boolean;
        autoScrollAddUpTime: number;
        autoScrollOriginalSpeed: number;
        autoScrollAcceleration: number;
        isAutoScrollSpeedAttenuated: any;
        needCheckAutoScrollDestination: any;
        autoScrollDestination: Point;
        slidTime: number;
        moveChildPoint: Point;
        childFocusCancelOffset: number;
        leftBounceNeeded: boolean;
        topBounceNeeded: boolean;
        rightBounceNeeded: boolean;
        bottomBounceNeeded: boolean;
        bounceEnabled: boolean;
        bouncing: boolean;
        bounceDir: Point;
        bounceOriginalSpeed: number;
        inertiaScrollEnabled: boolean;
        scrollViewEventListener: Function;
        scrollViewEventSelector: any;
        targetNode: Node;
        longTouchWhenScrollingEnabled: boolean;
        maxMovedDeltaSQ: number;
        scrollEnabled: boolean;
        _initProp(): void;
        dtor(): void;
    }
}
declare module mo {
    class _UIImageOption extends _UIWidgetOption {
        scale9Enabled: boolean;
        scale9Grid: Rect;
        prevIgnoreSize: boolean;
        texture: egret.Texture;
        maskTexture: egret.Texture;
        maskTextureFile: string;
        maskEnabled: boolean;
        isEnter: boolean;
        isExit: boolean;
        oldAlpha: number;
        fadeTextureAct: egret.action.Action;
        isTextureFade: boolean;
        textureInfo: any[];
        lastTextureInfo: any[];
        currUrl: string;
        _initProp(): void;
        dtor(): void;
    }
}
declare module mo {
    class _UIButtonOption extends Option {
        textures: egret.Texture[];
        titlePosByPercent: Point;
        pressedActionEnabled: boolean;
        isGray: boolean;
        currentIndex: number;
        textWidth: number;
        textDirty: boolean;
        oldScale: Point;
        act: egret.action.Action;
        _initProp(): void;
        setTexture(index: number, texture: egret.Texture): void;
    }
}
declare module mo {
    class _UILoadingBarOption extends Option {
        barType: number;
        percent: number;
        texture: egret.Texture;
        queueBaseNumber: any;
        queueBaseNumberSum: any;
        actionQueueRunning: any;
        curValue: any;
        totalValue: any;
        switchMode: any;
        curBaseNumIndex: any;
        diffValue: any;
        curTargetValue: any;
        finalCurValue: any;
        finalTotalValue: any;
        finalTargetValue: any;
        runActionQueueCb: any;
        runActionQueueCbTarget: any;
        stopActionCb: any;
        stopActionCbTarget: any;
        runningActionCb: any;
        runningActionCbTarget: any;
        lightWidget: UIImage;
        innerLabel: UIText;
        _initProp(): void;
        dtor(): void;
    }
}
declare module mo {
    interface IWidgetByNameApi {
        getPositionByName(name: string): Point;
        setPositionByName(name: string, x: any, y?: number): void;
        setPositionOffsetByName(name: string, x: any, y?: number): void;
        setScaleByName(name: string, scaleX: any, scaleY?: number): void;
        /**
         * 缩放适配屏幕
         * @param widgetName
         * @param mode
         */
        setAdaptiveScaleByName(widgetName: string, mode: any): void;
        setSizeByName(name: string, width: any, height?: number): void;
        getSizeByName(name: string): Size;
        setVisibleByName(name: string, visible: any): void;
        setGrayByName(name: string, isGray: boolean): void;
        setButtonImgByName(name: string, frameName: string): void;
        /**
         * 通过名字为Widget设置信息。
         * @param name
         * @param option
         */
        setInfoByName(name: string, option: any): void;
        setInfo(info: any): void;
        /**
         * 通过名字设置widget颜色, widget通常是个Label。
         * @param name
         * @param color
         */
        setColorByName(name: string, color: number): void;
        /**
         * 通过名字设置Widget是否可点击
         * @param name
         * @param touchEnabled
         */
        setTouchEnabledByName(name: string, touchEnabled: boolean): void;
        /**
         * 通过名称设置click监听
         * @param name
         * @param listener
         * @param target
         * @param data
         * @param audioId
         */
        onClickByName(name: string, listener: Function, target?: any, data?: any, audioId?: any): void;
        /**
         * 通过名称设置longTouch监听
         * @param name
         * @param listener
         * @param target
         */
        onLongTouchByName(name: string, listener: Function, target?: any, respInterval?: number, startInterVal?: number): void;
        /**
         * 打开长按事件的支持
         * @param name
         * @param listener
         * @param target
         * @param respInterval
         * @param startInterVal
         */
        enableLongTouchByName(name: string, respInterval?: number, startInterVal?: number): void;
        /**
         * 添加一个子节点。子节点可以是一个widget也可以是一个普通的node。在内部进行自动判断了。
         * @param name
         * @param child
         * @param tag
         */
        addChildNodeByName(name: string, child: any, tag: any): void;
        /**
         * 根据名字设置其是否可见。与visible不同的是，会同时设置是否可点击。
         * @param name
         * @param disappeared
         */
        setDisappearedByName(name: string, disappeared: any): void;
        /**
         * 根据名字设置动态图片
         * @param name
         * @param img
         * @param defImg
         */
        setMaskEnabledByName(name: string, enable: any): void;
        loadMaskTextureByName(name: string, textFileName: any): void;
        formatByName(name: string, ...args: any[]): void;
        doLayoutByName(name: string, ...args: any[]): void;
        setLayoutDirtyByName(name: string, ...args: any[]): void;
        /**
         * 根据widget的名称设置描边。
         * @param name
         * @param strokeColor
         * @param strokeSize
         * @returns {*}
         */
        enableStrokeByName(name: string, strokeColor: number, strokeSize: number): void;
        /**
         * 根据widget名字禁用描边。
         * @param name
         * @returns {*}
         */
        disableStrokeByName(name: any): void;
        /**
         * 根据widget名字设置计时器。
         * 其中，widget必须为Label类型（有setText方法）。
         * 每次调用该方法，都为将起始时间设置为00:00。
         * @param name
         * @param {Function|null} cb  每秒的触发回调，可以不设置。参数为：millisecond(每次间隔的毫秒数，约等于1秒)； widget
         * @param {Function|null} target 回调函数的上下文，可以不设置
         * @returns {*}
         */
        setIntervalByName(name: string, cb: any, target: any): any;
        /**
         * 设置倒计时类型触发器。
         * 当参数个数为四个时，表示：name, millisecond, endCallback, endTarget。
         * @param {String} name widget的名称
         * @param {Number} millisecond   倒计时的毫秒数
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        countdownByName(name: string, millisecond: any, callback: any, target?: any, endCallback?: any, endTarget?: any): any;
        /**
         * 倒计时到某个时间点的触发器。
         * 当参数个数为四个时，表示：name, millisecond, endCallback, endTarget。
         * @param {String} name widget的名称
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        countdownToEndTimeByName(name: string, endTime: any, callback: any, target: any, endCallback?: any, endTarget?: any): any;
        /**
         * 循环方式的倒数计时。自动根据结束时间点算出循环次数。
         * @param {String} name widget的名称
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Number} interval  每次循环的时间间隔
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} intervalCallback  每次循环结束的回调
         * @param {Object|null} intervalTarget  每次循环结束的回调函数的上下文
         * @param {Function|null} endCallback   总倒计时结束的回调
         * @param {Object|null} endTarget   总倒计时结束的回调函数的上下文
         * @returns {LoopCountdownToEndTimeInvocation}
         */
        countdownLoopToEndTimeByName(name: string, endTime: any, interval: any, callback: any, target: any, intervalCallback: any, intervalTarget: any, endCallback: any, endTarget: any): any;
        /**
         * 设置线性布局（水平）。
         * @param name
         * @param spacing   间距
         * @returns {*}
         */
        setLinearLayoutByName(name: string, spacing: any, align: any): void;
        /**
         * 长按name1的widget显示name2的widget。
         * @param name1
         * @param name2
         * @returns {*}
         */
        setTouchToShowByName(name1: any, name2: any): void;
        /**
         * 底数，例如： [100,200,300]
         * @param {Array} arr
         */
        setProgressQueueBaseNumberByName(name: string, arr: any): void;
        /**\
         * 单次增加多少
         * @param name
         * @param value
         * @param cb
         * @param ctx
         * @returns {*}
         */
        runProgressQueueByName(name: string, value: number, cb: Function, ctx?: any): void;
        /**
         * 通过名称获得widget并执行动作。
         * @param name
         * @param action
         */
        runActionByName(name: string, action: any): void;
        /**
         * 添加事件监听
         * @param name widget名
         * @param eventName 事件名
         * @param cb
         * @param cbtx
         */
        addEventListenerByName(name: string, eventName: string, cb: Function, cbtx: any): void;
        /**
         * 移除事件监听
         * @param name
         * @param eventName
         * @param cb
         * @param cbtx
         */
        removeEventListenerByName(name: string, eventName: string, cb: Function, cbtx: any): void;
    }
}
/**
 * bright style
 * @type {Object}
 */
declare module mo.BrightStyle {
    var none: number;
    var normal: number;
    var high_light: number;
}
/**
 * widget style
 * @type {Object}
 */
declare module mo.WidgetType {
    var widget: number;
    var container: number;
}
/**
 * texture resource type
 * @type {Object}
 */
declare module mo.TextureResType {
    var local: number;
    var plist: number;
}
/**
 * touch event type
 * @type {Object}
 */
declare module mo.TouchEventType {
    var began: number;
    var moved: number;
    var ended: number;
    var canceled: number;
    var lbegan: number;
}
/**
 * size type
 * @type {Object}
 */
declare module mo.SizeType {
    var absolute: number;
    var percent: number;
}
/**
 * position type
 * @type {Object}
 */
declare module mo.PositionType {
    var absolute: number;
    var percent: number;
}
declare module mo {
    /**
     * Widget的基类
     * @class
     * @extends Node
     */
    class UIWidget extends Node implements IWidgetByNameApi {
        static __className: string;
        static NODE_OPTION_CLASS: typeof _UIWidgetOption;
        _nodeOption: _UIWidgetOption;
        _setSizePercentX(sizePercentX: number): void;
        sizePercentX: number;
        _setSizePercentY(sizePercentY: number): void;
        sizePercentY: number;
        setSizePercent(percentX: any, percentY?: number): void;
        getSizePercent(temp?: Point): Point;
        _updateSizeByPercent(): void;
        _setPosPercentX(posPercentX: number): void;
        posPercentX: number;
        _setPosPercentY(posPercentY: number): void;
        posPercentY: number;
        _updatePosByPercent(): void;
        setPositionPercent(percentX: any, percentY?: number): void;
        getPositionPercent(temp?: Point): Point;
        setPosition(pos: any, posY?: number): void;
        _initProp(): void;
        _init(): void;
        /**
         * 初始化渲染
         */
        initRenderer(): void;
        soundOnClick(clickAudioId: any): void;
        _playDefaultSoundOnClick(): void;
        setOption(option: any): any;
        _doAddChild(widget: egret.DisplayObject, index: number, notifyListeners?: boolean): egret.DisplayObject;
        _doRemoveChild(index: number, notifyListeners?: boolean): egret.DisplayObject;
        updateSizeByPercentForChildren(): void;
        getWidgetParent(): UIWidget;
        _onNodeSizeDirty(): void;
        _onBeforeVisit(): void;
        _onAfterVisit(): void;
        setSizeType(type: any): void;
        getSizeType(): number;
        sizeType: number;
        ignoreContentAdaptWithSize(ignore: any): void;
        isIgnoreContentAdaptWithSize(): boolean;
        isFocused(): boolean;
        setFocused(focus: any): void;
        setBright(bright: boolean): void;
        setBrightStyle(style: any): void;
        /**
         * 0:normal, 1:pressed, 2:disabled
         * @param index
         * @private
         */
        _onPressStateChanged(index: number): void;
        onTouchLongClicked(event: egret.TouchEvent): void;
        private longClickEvent();
        setPositionType(type: any): void;
        getPositionType(): number;
        setFlippedX(flipX: any): void;
        isFlippedX(): boolean;
        setFlippedY(flipY: any): void;
        isFlippedY(): boolean;
        isBright(): boolean;
        getLeftInParent(): number;
        getBottomInParent(): number;
        getRightInParent(): number;
        getTopInParent(): number;
        setLayoutParameter(parameter: LayoutParameter): void;
        getLayoutParameter(type: any): any;
        setGray(isGray: boolean): void;
        transColor(colorType: any): any;
        clone(): any;
        copyClonedWidgetChildren(model: UIWidget): void;
        copySpecialProps(model: any): void;
        copyProps(widget: UIWidget): void;
        private _sortWidgetChildrenByPosX();
        private _sortWidgetChildrenByPosY();
        removeWidgets(): void;
        removeNodes(): void;
        /**
         * 通过widget的名称获取到widget对象。
         * 或则通过层级名字的获取widget对象，例如 aWidget.b.c
         * @param name
         * @returns {*}
         */
        getWidgetByName(name: string): any;
        private _seekWidgetByName(name);
        onTouchBegan(event: egret.TouchEvent): void;
        _moving(): void;
        _end(event: egret.TouchEvent): void;
        setPositionOffset(pos: any): void;
        onLongTouch(...args: any[]): void;
        setSrcPos(point: any, y?: number): void;
        getSrcPos(temp?: Point): Point;
        setSrcSize(size: any, height?: number): void;
        getSrcSize(temp?: Size): Size;
        getPositionByName(name: string): Point;
        setPositionByName(name: string, x: any, y?: number): void;
        setPositionOffsetByName(name: string, x: any, y?: number): void;
        setScaleByName(name: string, scaleX: any, scaleY?: number): void;
        /**
         * 缩放适配屏幕
         * @param widgetName
         * @param mode
         */
        setAdaptiveScaleByName(widgetName: string, mode: any): void;
        setSizeByName(name: string, width: any, height?: number): void;
        getSizeByName(name: string): Size;
        setVisibleByName(name: string, visible: any): void;
        setGrayByName(name: string, isGray: boolean): void;
        transColorByName(name: string, colorType: any): void;
        setButtonImgByName(name: string, frameName: string): void;
        /**
         * 通过名字为Widget设置信息。
         * @param name
         * @param option
         */
        setInfoByName(name: string, option: any): void;
        setInfo(info: any): void;
        /**
         * 通过名字设置widget颜色, widget通常是个Label。
         * @param name
         * @param color
         */
        setColorByName(name: string, color: number): void;
        /**
         * 通过名字设置Widget是否可点击
         * @param name
         * @param touchEnabled
         */
        setTouchEnabledByName(name: string, touchEnabled: boolean): void;
        /**
         * 通过名称设置click监听
         * @param name
         * @param listener
         * @param target
         * @param data
         * @param audioId
         */
        onClickByName(name: string, listener: Function, target?: any, data?: any, audioId?: any): void;
        /**
         * 通过名称设置longTouch监听
         * @param name
         * @param listener
         * @param target
         */
        onLongTouchByName(name: string, listener: Function, target?: any, respInterval?: number, startInterVal?: number): void;
        /**
         * 打开长按事件的支持
         * @param name
         * @param listener
         * @param target
         * @param respInterval
         * @param startInterVal
         */
        enableLongTouchByName(name: string, respInterval?: number, startInterVal?: number): void;
        /**
         * 添加一个子节点。子节点可以是一个widget也可以是一个普通的node。在内部进行自动判断了。
         * @param name
         * @param child
         * @param tag
         */
        addChildNodeByName(name: string, child: any, tag: any): void;
        /**
         * 根据名字设置其是否可见。与visible不同的是，会同时设置是否可点击。
         * @param name
         * @param disappeared
         */
        setDisappearedByName(name: string, disappeared: any): void;
        setMaskEnabledByName(name: string, enable: any): void;
        loadMaskTextureByName(name: string, textFileName: any): void;
        formatByName(name: string, ...args: any[]): void;
        doLayoutByName(name: string, ...args: any[]): void;
        setLayoutDirtyByName(name: string, ...args: any[]): void;
        /**
         * 根据widget的名称设置描边。
         * @param name
         * @param strokeColor
         * @param strokeSize
         * @returns {*}
         */
        enableStrokeByName(name: string, strokeColor: number, strokeSize: number): void;
        /**
         * 根据widget名字禁用描边。
         * @param name
         * @returns {*}
         */
        disableStrokeByName(name: any): void;
        /**
         * 根据widget名字设置计时器。
         * 其中，widget必须为Label类型（有setText方法）。
         * 每次调用该方法，都为将起始时间设置为00:00。
         * @param name
         * @param {Function|null} cb  每秒的触发回调，可以不设置。参数为：millisecond(每次间隔的毫秒数，约等于1秒)； widget
         * @param {Function|null} target 回调函数的上下文，可以不设置
         * @returns {*}
         */
        setIntervalByName(name: string, cb: any, target: any): any;
        /**
         * 设置倒计时类型触发器。
         * 当参数个数为四个时，表示：name, millisecond, endCallback, endTarget。
         * @param {String} name widget的名称
         * @param {Number} millisecond   倒计时的毫秒数
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        countdownByName(name: string, millisecond: any, callback: any, target?: any, endCallback?: any, endTarget?: any): any;
        /**
         * 倒计时到某个时间点的触发器。
         * 当参数个数为四个时，表示：name, millisecond, endCallback, endTarget。
         * @param {String} name widget的名称
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        countdownToEndTimeByName(name: string, endTime: any, callback: any, target: any, endCallback?: any, endTarget?: any): any;
        /**
         * 循环方式的倒数计时。自动根据结束时间点算出循环次数。
         * @param {String} name widget的名称
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Number} interval  每次循环的时间间隔
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} intervalCallback  每次循环结束的回调
         * @param {Object|null} intervalTarget  每次循环结束的回调函数的上下文
         * @param {Function|null} endCallback   总倒计时结束的回调
         * @param {Object|null} endTarget   总倒计时结束的回调函数的上下文
         * @returns {LoopCountdownToEndTimeInvocation}
         */
        countdownLoopToEndTimeByName(name: string, endTime: any, interval: any, callback: any, target: any, intervalCallback: any, intervalTarget: any, endCallback: any, endTarget: any): any;
        /**
         * 设置线性布局（水平）。
         * @param name
         * @param spacing   间距
         * @returns {*}
         */
        setLinearLayoutByName(name: string, spacing: any, align: any): void;
        /**
         * 长按name1的widget显示name2的widget。
         * @param name1
         * @param name2
         * @returns {*}
         */
        setTouchToShowByName(name1: any, name2: any): void;
        _onBegin4TouchToShowByName(): void;
        _onEnd4TouchToShowByName(): void;
        /**
         * 底数，例如： [100,200,300]
         * @param {Array} arr
         */
        setProgressQueueBaseNumberByName(name: string, arr: any): void;
        /**\
         * 单次增加多少
         * @param name
         * @param value
         * @param cb
         * @param ctx
         * @returns {*}
         */
        runProgressQueueByName(name: string, value: number, cb: Function, ctx?: any): void;
        /**
         * 通过名称获得widget并执行动作。
         * @param name
         * @param action
         */
        runActionByName(name: string, action: any): void;
        /**
         * 添加事件监听
         * @param name widget名
         * @param eventName 事件名
         * @param cb
         * @param cbtx
         */
        addEventListenerByName(name: string, eventName: string, cb: Function, cbtx: any): void;
        /**
         * 移除事件监听
         * @param name
         * @param eventName
         * @param cb
         * @param cbtx
         */
        removeEventListenerByName(name: string, eventName: string, cb: Function, cbtx: any): void;
    }
}
declare module mo {
    /**
     * @class UIText
     * 文本类
     */
    class UIText extends UIWidget {
        static __className: string;
        static NODE_OPTION_CLASS: typeof _UITextOption;
        _nodeOption: _UITextOption;
        _initProp(): void;
        /**
         * 设置文本内容
         * @param {String} text
         */
        setText(text: any): void;
        /**
         * 获取文本内容
         * @returns {String}
         */
        getText(): string;
        /**
         * 获取文本长度
         * @returns {Number}
         */
        getTextLength(): number;
        /**
         * 设置字体大小
         * @param {Number} fontSize
         */
        setFontSize(fontSize: number): void;
        /**
         * 获取字体大小
         * @returns {Number}
         */
        getFontSize(): number;
        /**
         * 设置字体
         * @param {String} name
         */
        setFontName(name: string): void;
        /**
         * 获取字体
         * @returns {String}
         */
        getFontName(): string;
        /**
         * 设置文本域宽度
         * @param {Number} width
         * @param {Number} height
         */
        setAreaSize(width: number, height: number): void;
        /**
         * 获取文本域大小
         * @returns {mo.Size}
         */
        getAreaSize(): Size;
        /**
         * 设置文本的横向对齐方式
         * @param {ALIGN_H_LEFT | ALIGN_H_CENTER | ALIGN_H_RIGHT} hAlign Horizontal Alignment
         */
        setHAlign(hAlign: string): void;
        /**
         * 获取文本的横向对齐方式
         * @returns {ALIGN_H_LEFT | ALIGN_H_CENTER | ALIGN_H_RIGHT}
         */
        getHAlign(): string;
        /**
         * 设置文本的垂直对齐方式
         * @param {ALIGN_V_TOP|ALIGN_V_MIDDLE|ALIGN_V_BOTTOM} vAlign
         */
        setVAlign(vAlign: string): void;
        /**
         * 获取文本的垂直对齐方式
         * @returns {ALIGN_V_TOP|ALIGN_V_MIDDLE|ALIGN_V_BOTTOM}
         */
        getVAlign(): string;
        /**
         * 设置斜体
         * @param isItalic
         */
        setItalic(isItalic: boolean): void;
        /**
         * 是否斜体
         * @returns {boolean}
         */
        getItalic(): boolean;
        /**
         * 设置粗体
         * @param bold
         */
        setBold(bold: boolean): void;
        /**
         * 是否粗体
         * @returns {boolean}
         */
        getBold(): boolean;
        /**
         * 包含三个 8 位 RGB 颜色成分的数字；例如，0xFF0000 为红色，0x00FF00 为绿色。
         */
        _setColor(color: number): void;
        color: number;
        /**
         * @deprecated
         * @param color
         */
        setColor(color: number): void;
        /**
         * @deprecated
         */
        getColor(): number;
        /**
         * 设置描边颜色，颜色值同setColor
         * @param color
         * @param lineSize
         */
        enableStroke(color: number, lineSize?: number): void;
        /**
         * 禁用描边
         */
        disableStroke(): void;
        /**
         * 获取行数
         * @returns {number}
         */
        getNumLines(): number;
        /**
         * 设置行距
         * @param value
         */
        setLineSpacing(value: number): void;
        /**
         * 获取行距
         * @returns {number}
         */
        getLineSpacing(): number;
        /**
         * 设置点击时候是否可放大
         * @param {Boolean} enable
         */
        setTouchScaleEnabled(enable: boolean): void;
        /**
         * 点击时是否可放大
         * @returns {Boolean}
         */
        isTouchScaleEnabled(): boolean;
        /**
         * 设置单行最大长度（单位：像素）
         * @param {Number} length
         */
        setMaxLength(length: number): void;
        /**
         * 获取单行最大宽度（单位：像素）
         * @returns {Number} length
         */
        getMaxLength(): number;
        /**
         * @Override
         */
        _onPressStateChanged(index: number): void;
        /**
         * @Override
         */
        _onNodeSizeDirty(): void;
        /**
         * @private
         */
        private _labelScaleChangedWithSize();
        /**
         * 专门给WEBGL用的啊亲，这是一个HACK!
         * @returns {boolean}
         */
        _makeBitmapCache(): boolean;
        _render(renderContext: egret.RendererContext): void;
        copySpecialProps(uiLabel: any): void;
        format(...args: any[]): void;
        setOption(option: any): any;
        setAutoSizeHeight(aH: any): void;
        setAutoSizeWidth(aW: any): void;
        setInterval(cb: any, target: any): any;
        countdown(millisecond: any, callback: any, target?: any, endCallback?: any, endTarget?: any): Invocation;
        countdownToEndTime(endTime: any, callback: any, target: any, endCallback?: any, endTarget?: any): Invocation;
        countdownLoopToEndTime(endTime: any, interval: any, callback: any, target: any, intervalCallback: any, intervalTarget: any, endCallback: any, endTarget: any): Invocation;
        dtor(): void;
    }
}
declare module mo {
    /**
     * 输入框基类
     * @class
     */
    class UIInput extends UIText {
        static __className: string;
        _initProp(): void;
        /**
         * @private
         */
        initRenderer(): void;
        onEnter(): void;
        onExit(): void;
        onTapHandler(e: egret.TouchEvent): void;
        /**
         * 开启密码样式
         * @param {Boolean} enable
         */
        setPasswordEnabled(enable: boolean): void;
        setPlaceHolder(placeText: any): void;
        getPlaceHolder(): string;
        setAreaSize(width: number, height: number): void;
        /**
         * 是否开启密码样式
         * @returns {Boolean}
         */
        isPasswordEnabled(): boolean;
        _setTouchEnabled(enable: any): void;
        /**
         * 复制特殊属性
         * @param textField
         */
        copySpecialProps(textField: UIInput): void;
        _render(renderContext: egret.RendererContext): void;
        setOption(option: any): any;
    }
}
declare module mo {
    class UITextAtlas extends UIWidget {
        static __className: string;
        static NODE_OPTION_CLASS: typeof _UITextAtlasOption;
        _nodeOption: _UITextAtlasOption;
        constructor(str?: string, textureFile?: string, itemWidth?: number, itemHeight?: number, startCharMap?: string);
        setProperty(str: string, textureFile: string, itemWidth?: number, itemHeight?: number, startCharMap?: string): void;
        private _updateSpriteSheet();
        _render(renderContext: egret.RendererContext): void;
        getText(): string;
        setText(label: string): void;
        copySpecialProps(labelAtlas: UITextAtlas): void;
        setOption(option: any): any;
    }
}
declare module mo {
    class UITextBMFont extends UIWidget {
        static __className: string;
        _bitmapTextRenderer: egret.BitmapText;
        _fntFileName: string;
        _initProp(): void;
        initRenderer(): void;
        setFntFile(fileName: string): void;
        setText(value: string): void;
        getText(): string;
        _onNodeSizeDirty(): void;
        getRenderer(): egret.BitmapText;
        private _labelBMFontScaleChangedWithSize();
        copySpecialProps(labelBMFont: UITextBMFont): void;
    }
}
declare module mo {
    class UIImage extends UIWidget {
        static __className: string;
        static NODE_OPTION_CLASS: typeof _UIImageOption;
        _nodeOption: _UIImageOption;
        /**
         * fillMode
         */
        _setFillMode(fillMode: string): void;
        fillMode: string;
        /**
         * 是否开启蒙版
         */
        _setMaskEnabled(maskEnabled: boolean): void;
        maskEnabled: boolean;
        /**
         * @deprecated
         * @param maskEnabled
         */
        setMaskEnabled(maskEnabled: boolean): void;
        /**
         * @deprecated
         */
        isMaskEnabled(): boolean;
        _onStatic4Img(texture: egret.Texture): void;
        _onBeforeLoad4Img(): void;
        _onAfterLoad4Img(texture: egret.Texture): void;
        /**
         * 加载资源，可以是egret.Texture或路径
         * @param {String||egret.Texture} fileName
         * @param {Function} cb
         * @param {Function} target
         */
        loadTexture(fileName: any, cb?: Function, target?: any): void;
        onEnter(): void;
        onExit(): void;
        /**
         * 设置蒙版Texture
         * @param fileName
         */
        loadMaskTexture(fileName: string): void;
        /**
         * @private
         */
        private _makeMaskedTexture();
        dtor(): void;
        /**
         * 设置特殊属性
         * @Override
         * @param imageView
         */
        copySpecialProps(imageView: UIImage): void;
        setOption(option: any): any;
        setHighLight(): void;
        _render(renderContext: egret.RendererContext): void;
    }
}
declare module mo {
    class UIButton extends UIWidget {
        static __className: string;
        _buttonOption: _UIButtonOption;
        _properties: egret.TextFieldProperties;
        _buttonTexture: any;
        _initProp(): void;
        /**
         * 加载资源
         * @param normal
         * @param selected
         * @param disabled
         */
        loadTextures(normal: any, selected?: any, disabled?: any): void;
        /**
         * @param texture
         * @param index
         * @param cb
         * @param ctx
         * @private
         */
        private _setBitmapTexture(texture, index, cb?, ctx?);
        /**
         * 加载正常状态资源
         * @param texture
         * @param cb
         * @param ctx
         */
        loadTextureNormal(texture: any, cb?: Function, ctx?: any): void;
        /**
         * 加载被按下去状态资源
         * @param texture
         * @param cb
         * @param ctx
         */
        loadTexturePressed(texture: any, cb?: Function, ctx?: any): void;
        /**
         * 加载禁用状态资源
         * @param texture
         * @param cb
         * @param ctx
         */
        loadTextureDisabled(texture: any, cb?: Function, ctx?: any): void;
        /**
         * @Override
         */
        _onPressStateChanged(index: number): void;
        /**
         * @Override
         */
        onExit(): void;
        /**
         * 按钮被点击是否能缩放
         * @param {Boolean} enabled
         */
        setPressedActionEnabled(enabled: boolean): void;
        /**
         * 标题的位置百分比
         * @param point
         * @param y
         */
        setTitlePosByPercent(point: any, y?: number): void;
        /**
         * 设置标题文本
         * @param {String} text
         */
        setTitleText(text: string): void;
        /**
         * 获取标题文本
         * @returns {String} text
         */
        getTitleText(): string;
        _setStroke(value: number, lineSize: any): void;
        /**
         * 设置标题颜色
         * @param {number} color
         */
        setTitleColor(color: number): void;
        /**
         * 获取标题颜色
         * @returns {number}
         */
        getTitleColor(): number;
        /**
         * 设置标题描边颜色，颜色值同setColor
         * @param color
         * @param lineSize
         */
        enableStroke(color: number, lineSize?: number): void;
        /**
         * 禁用标题描边
         */
        disableStroke(): void;
        /**
         * 设置标题字体大小
         * @param {Number} size
         */
        setTitleFontSize(size: number): void;
        /**
         * 获取标题字体大小
         * @returns {Number}
         */
        getTitleFontSize(): number;
        /**
         * 设置标题字体大小
         * @param {String} fontName
         */
        setTitleFontName(fontName: string): void;
        /**
         * 获取标题字体大小
         * @returns {String}
         */
        getTitleFontName(): string;
        /**
         * 置灰
         * @param isGray
         */
        setGray(isGray: boolean): void;
        /**
         * 专门给WEBGL用的啊亲，这是一个HACK!
         * @returns {boolean}
         */
        _makeBitmapCache(): boolean;
        _draw(renderContext: any): void;
        _render(renderContext: egret.RendererContext): void;
        /**
         * @Override
         * 设置特殊属性
         */
        copySpecialProps(uiButton: UIButton): void;
        setOption(option: any): any;
        setButtonImg(frameName: any): void;
        dtor(): void;
        reset(): void;
    }
}
declare module mo.LoadingBarType {
    var LEFT: number;
    var RIGHT: number;
}
declare module mo {
    class UILoadingBar extends UIWidget {
        static __className: string;
        static SWITCH_MODE_POSITIVE: number;
        static SWITCH_MODE_NEGATIVE: number;
        static SWITCH_MODE_DEFAULT: number;
        static BAR_OPTION_CLASS: _UILoadingBarOption;
        _barOption: _UILoadingBarOption;
        _initProp(): void;
        /**
         * 改变进度条方向，默认左边到右边
         * 0,左到右  1,右到左
         * @param {Number} dir
         */
        setDirection(dir: number): void;
        /**
         * 获取进度条的方向
         * @returns {Number}
         */
        getDirection(): number;
        /**
         * 给进度条加一个资源
         * @param {String||egret.Texture} fileName
         */
        loadTexture(fileName: any): void;
        /**
         * 改变进度
         * @param {number} percent
         */
        setPercent(percent: number): void;
        /**
         * 获取进度
         * @returns {number}
         */
        getPercent(): number;
        _render(renderContext: egret.RendererContext): void;
        /**
         * @param loadingBar
         */
        copySpecialProps(loadingBar: UILoadingBar): void;
        setOption(option: any): any;
        /**
         * @param cur
         * @param total
         * @param str
         */
        setProgress(cur: any, total?: any, str?: any): void;
        _setProgressPercent(percent: any): void;
        getCurValue(): any;
        getTotalValue(): any;
        /**
         * @param {mo.UIWidget|String} texture
         */
        loadLightTexture(texture: any): void;
        setLightWidgetPosition(): void;
        getLightWidget(): UIImage;
        getInnerLabel(): UIText;
        /**
         *  停止动态进度条，直接设置最终进度值
         */
        stopQueueRunning(): void;
        /**
         * 重置进度条所有状态
         */
        resetSelf(): void;
        reset(): void;
        /**
         * 底数，例如： [100,200,300]
         * @param {Array} arr
         */
        setProgressQueueBaseNumber(arr: any, switchMode?: any): void;
        /**
         * 获取底数
         */
        getProgressQueueBaseNumber(): any;
        /**
         * 基数之和
         * @returns {null}
         */
        getSumOfQueueBaseNumbers(): any;
        /**
         * 调整跑进度条时的两个参数
         * @private
         */
        _normalTargetAndFinalValue(): void;
        _beginShakeLight(): void;
        _stopShakeLight(): void;
        /**
         * 单次增加多少
         * @param diffValue
         * @param cb
         * @param cbTarget
         */
        runProgressQueue(diffValue: any, cb: any, cbTarget: any): void;
        /**
         * 运行到目标数值
         * @param targetValue 目标数值
         * @param cb
         * @param cbTarget
         */
        runProgressQueue2(targetValue: any, cb: any, cbTarget: any): void;
        onStopRunningProgress(cb: any, target: any): void;
        onRunningProgress(cb: any, target: any): void;
        onExit(): void;
        _getBaseNumIndex(targetValue: any): number;
        /**
         * 通过现有值和索引设置目标进度
         * @param curValue 该槽现有值 (e.g. 专属装备服务器剩余经验)
         * @param baseNumIndex 该槽总值在基数数组中的索引值 (e.g. 装备待升的等级)
         *
         */
        setCurTargetValue(curValue: any, baseNumIndex: any): void;
        _runActionQueue(dtByMs: any): void;
        /**
         * 增量
         * @param duration
         * @param diffPercent
         */
        runProgressBy(duration: any, diffPercent: any): void;
        /**
         * 从当前到y
         * @param duration
         * @param percent
         * @param cb
         * @param target
         */
        runProgressTo(duration: any, percent: any, cb?: any, target?: any): void;
        /**
         * 从x到y
         * @param duration
         * @param fromPercentage
         * @param toPercentage
         * @param cb
         * @param target
         */
        runProgressFromTo(duration: any, fromPercentage: any, toPercentage: any, cb?: any, target?: any): void;
    }
}
declare module mo {
    class UIPanel extends UIWidget {
        static __className: string;
        static NODE_OPTION_CLASS: typeof _UIPanelOption;
        _nodeOption: _UIPanelOption;
        _setClippingEnabled(clippingEnabled: boolean): void;
        clippingEnabled: boolean;
        _setLayoutType(layoutType: number): void;
        layoutType: number;
        getLayoutType(): number;
        setLayoutType(layoutType: number): void;
        bgOpacity: number;
        bgColor: number;
        /**
         * 是否开启九宫格
         */
        _setScale9Enabled(scale9Enabled: boolean): void;
        scale9Enabled: boolean;
        /**
         * scale9Grid
         */
        _setScale9Grid(scale9Grid: Rect): void;
        scale9Grid: Rect;
        /**
         * fillMode
         */
        _setFillMode(fillMode: string): void;
        fillMode: string;
        /**
         * 设置背景纹理
         * @param texture
         */
        bgTexture: any;
        _initProp(): void;
        constructor(width?: number, height?: number);
        addChild(widget: egret.DisplayObject): egret.DisplayObject;
        removeChild(widget: egret.DisplayObject): egret.DisplayObject;
        removeChildren(): void;
        supplyTheLayoutParameterLackToChild(locChild: UIWidget): void;
        /**
         * 请求进行layout。其实只是设置了个flag为true而已。
         */
        setLayoutDirty(): void;
        /**
         * 是否启用自动大小设置。只有当其为线性布局是才有用。
         */
        _setAutoSizeEnabled(autoSizeEnabled: boolean): void;
        autoSizeEnabled: boolean;
        /**
         * 进行线性布局。
         */
        _doLayout_linear(linearType?: number): void;
        /**
         * 进行相对布局
         */
        _doLayout_relative(): void;
        /**
         * 进行布局
         */
        _doLayout(): void;
        doLayout(layoutDirty?: boolean): void;
        _updateGraphics(): void;
        _updateClipping(): void;
        _onNodeSizeDirty(): void;
        _onVisit(): void;
        _onUpdateView(): void;
        _onAfterVisit(): void;
        setLayoutParameter(parameter: LayoutParameter): void;
        _render(renderContext: egret.RendererContext): void;
        setLinearLayout(spacing: any, align: any): void;
        copySpecialProps(layout: any): void;
        /** widget extend begin **/
        setOption(option: any): any;
        enableStroke(strokeColor: any, strokeSize: any): void;
        disableStroke(mustUpdateTexture: any): void;
        setWidth(width: any): void;
        setHeight(height: any): void;
        /**
         * 注册要监听原始大小变化的子widget
         * @param name
         */
        registerSrcSizeByName(name: string): void;
        /**
         * 累加子项原始大小的变化--为实现自动大小dlg效果
         * @private
         */
        _calcTotalSrcSizeChanged(): void;
        setPadding(top: any, right?: number, bottom?: number, left?: number): void;
    }
    /**
     * 通过x排序
     * @param node1
     * @param node2
     * @returns {number}
     * @private
     */
    function _sortFuncByX(node1: UIWidget, node2: UIWidget): number;
}
declare module mo {
    var scrollEnabled: boolean;
    class UIScrollView extends UIPanel {
        static __className: string;
        static SCROLL_END: string;
        _scrollOption: _ScrollOption;
        innerContainer: UIPanel;
        _setDirection(direction: number): void;
        direction: number;
        /**
         * @deprecated
         * @param direction
         */
        setDirection(direction: number): void;
        /**
         * @deprecated
         * @returns {number}
         */
        getDirection(): number;
        _setBounceEnabled(bounceEnabled: boolean): void;
        bounceEnabled: boolean;
        /**
         * @deprecated
         * @param bounceEnabled
         */
        setBounceEnabled(bounceEnabled: boolean): void;
        /**
         * @param direction
         */
        isBounceEnabled(): boolean;
        longTouchWhenScrollingEnabled: boolean;
        _initProp(): void;
        constructor(width?: number, height?: number);
        setSize(...args: any[]): void;
        dtor(): void;
        hitTest(x: number, y: number, ignoreTouchEnabled?: boolean): egret.DisplayObject;
        _updateEnabled: boolean;
        setUpdateEnabled(updateEnabled: boolean): void;
        onEnter(): void;
        onExit(): void;
        /**
         * 初始化边界
         * @private
         */
        _initBoundary(): void;
        _onNodeSizeDirty(): void;
        setInnerContainerSize(size: Size): void;
        _dispatchScrollEnd(): void;
        getInnerContainer(): UIPanel;
        getInnerContainerSize(): Size;
        moveChildren(offsetX: number, offsetY: number): void;
        autoScrollChildren(dt: number): void;
        bounceChildren(dt: number): void;
        checkNeedBounce(): boolean;
        checkBounceBoundary(): void;
        startBounceChildren(v: number): void;
        stopBounceChildren(): void;
        startAutoScrollChildrenWithOriginalSpeed(dir: any, v: any, attenuated: any, acceleration: any): void;
        stopAutoScrollChildren(): void;
        bounceScrollChildren(touchOffsetX: any, touchOffsetY: any): boolean;
        checkCustomScrollDestination(touchOffsetX: number, touchOffsetY: number): boolean;
        getCurAutoScrollDistance(dt: number): number;
        scrollChildren(touchOffsetX: number, touchOffsetY: number): boolean;
        startRecordSlidAction(): void;
        endRecordSlidAction(): void;
        handlePressLogic(event: egret.TouchEvent): void;
        handleMoveLogic(): void;
        _initTouchEvents(): void;
        __resetDownEvent(): void;
        __resetOtherEvents(): void;
        onTouchBegan(event: egret.TouchEvent): void;
        _moving(): void;
        _end(event: egret.TouchEvent): void;
        scrollEnabled: boolean;
        update(frameTime: number): void;
        scrollToTopEvent(): void;
        scrollToBottomEvent(): void;
        scrollToLeftEvent(): void;
        scrollToRightEvent(): void;
        scrollingEvent(): void;
        bounceTopEvent(): void;
        bounceBottomEvent(): void;
        bounceLeftEvent(): void;
        bounceRightEvent(): void;
        addEventListenerScrollView(selector: Function, target: any): void;
        setInertiaScrollEnabled(enabled: any): void;
        isInertiaScrollEnabled(): boolean;
        startAutoScrollChildrenWithDestination(des: Point, time: any, attenuated: any): void;
        jumpToDestination(des: any): void;
        scrollToBottom(time: number, attenuated: boolean): void;
        scrollToTop(time: number, attenuated: boolean): void;
        scrollToLeft(time: number, attenuated: boolean): void;
        scrollToRight(time: number, attenuated: boolean): void;
        scrollToTopLeft(time: number, attenuated: boolean): void;
        scrollToTopRight(time: number, attenuated: boolean): void;
        scrollToBottomLeft(time: number, attenuated: boolean): void;
        scrollToBottomRight(time: number, attenuated: boolean): void;
        scrollToPercentVertical(percent: number, time: number, attenuated: boolean): void;
        scrollToPercentHorizontal(percent: number, time: number, attenuated: boolean): void;
        scrollToPercentBothDirection(percent: Point, time: number, attenuated: boolean): void;
        jumpToBottom(): void;
        jumpToTop(): void;
        jumpToLeft(): void;
        jumpToRight(): void;
        jumpToTopLeft(): void;
        jumpToTopRight(): void;
        jumpToBottomLeft(): void;
        jumpToBottomRight(): void;
        jumpToPercentVertical(percent: number): void;
        jumpToPercentHorizontal(percent: number): void;
        jumpToPercentBothDirection(percent: Point): void;
        _setLayoutType(type: number): void;
        layoutType: number;
        addChild(child: egret.DisplayObject): egret.DisplayObject;
        removeChildren(): void;
        removeChild(child: egret.DisplayObject): egret.DisplayObject;
        getChildren(): egret.DisplayObject[];
        getChildrenCount(): number;
        getChildByName(name: string): egret.DisplayObject;
        removeWidgets(): void;
        removeNodes(): void;
    }
}
declare module mo.ListViewEventType {
    var listViewOnselectedItem: number;
}
declare module mo.ListViewGravity {
    var left: number;
    var right: number;
    var centerHorizontal: number;
    var top: number;
    var bottom: number;
    var centerVertical: number;
}
declare module mo {
    class UIListView extends UIScrollView {
        static __className: string;
        _model: UIWidget;
        _items: UIWidget[];
        _gravity: number;
        _itemsMargin: number;
        _listViewEventListener: any;
        _listViewEventSelector: any;
        _curSelectedIndex: number;
        _refreshViewDirty: boolean;
        _initProp(): void;
        _init(): void;
        /**
         * Sets a item model for listview. A model will be cloned for adding default item.
         * @param {mo.UIWidget} model
         */
        setItemModel(model: UIWidget): void;
        updateInnerContainerSize(): void;
        remedyLayoutParameter(item: any): void;
        /**
         * Push back a default item(create by a cloned model) into listview.
         */
        pushBackDefaultItem(): void;
        /**
         * Insert a default item(create by a cloned model) into listview.
         * @param {Number} index
         */
        insertDefaultItem(index: number): void;
        /**
         * Push back custom item into listview.
         * @param {mo.UIWidget} item
         */
        pushBackCustomItem(item: UIWidget): void;
        /**
         * Push back custom item into listview.
         * @param {mo.UIWidget} item
         * @param {Number} index
         */
        insertCustomItem(item: UIWidget, index: number): void;
        /**
         * Removes a item whose index is same as the parameter.
         * @param {Number} index
         */
        removeItem(index: number): void;
        /**
         * Removes the last item of listview.
         */
        removeLastItem(): void;
        /**
         * Returns a item whose index is same as the parameter.
         * @param {Number} index
         * @returns {mo.UIWidget}
         */
        getItem(index: number): UIWidget;
        /**
         * Returns the item container.
         * @returns {Array}
         */
        getItems(): UIWidget[];
        /**
         * Returns the index of item.
         * @param {mo.UIWidget} item
         * @returns {Number}
         */
        getIndex(item: UIWidget): number;
        /**
         * Changes the gravity of listview.
         * @param {Number} gravity
         */
        setGravity(gravity: number): void;
        /**
         * Changes the margin between each item.
         * @param {Number} margin
         */
        setItemsMargin(margin: number): void;
        /**
         * Get the margin between each item.
         * @returns {Number}
         */
        getItemsMargin(): number;
        /**
         * Changes scroll direction of scrollview.
         * @param {Number} dir
         */
        _setDirection(dir: number): void;
        /**
         *  add event listener
         * @param {Function} selector
         * @param {Object} target
         */
        addEventListenerListView(selector: Function, target: any): void;
        selectedItemEvent(): void;
        /**
         * get current selected index
         * @returns {number}
         */
        getCurSelectedIndex(): number;
        /**
         * request refresh view
         */
        requestRefreshView(): void;
        refreshView(): void;
        sortChildren(): void;
        _onVisit(): void;
        _onAfterVisit(): void;
        _onNodeSizeDirty(): void;
        copyClonedWidgetChildren(model: UIListView): void;
        copySpecialProps(listView: UIListView): void;
    }
}
declare module mo.PageViewEventType {
    var turning: number;
}
declare module mo.PVTouchDir {
    var touchLeft: number;
    var touchRight: number;
}
declare module mo {
    class UIPageView extends UIPanel {
        static __className: string;
        _curPageIdx: number;
        _pages: any;
        _touchMoveDir: any;
        _touchStartLocation: number;
        _touchMoveStartLocation: number;
        _touchMovePos: any;
        _leftChild: any;
        _rightChild: any;
        _leftBoundary: number;
        _rightBoundary: number;
        _isAutoScrolling: boolean;
        _autoScrollDistance: number;
        _autoScrollSpeed: number;
        _autoScrollDir: number;
        _childFocusCancelOffset: number;
        _pageViewEventListener: any;
        _pageViewEventSelector: any;
        _initProp(): void;
        _init(): void;
        onEnter(): void;
        onExit(): void;
        /**
         * Add a widget to a page of pageview.
         * @param {mo.UIWidget} widget
         * @param {Number} pageIdx
         * @param {Boolean} forceCreate
         */
        addWidgetToPage(widget: UIWidget, pageIdx: number, forceCreate: boolean): void;
        /**
         * create page
         * @returns {mo.UIPanel}
         */
        createPage(): UIPanel;
        /**
         * Push back a page to pageview.
         * @param {mo.UIPanel} page
         */
        addPage(page: UIPanel): void;
        /**
         * Inert a page to pageview.
         * @param {mo.UIPanel} page
         * @param {Number} idx
         */
        insertPage(page: UIPanel, idx: number): void;
        /**
         * Remove a page of pageview.
         * @param {mo.UIPanel} page
         */
        removePage(page: any): void;
        /**
         * Remove a page at index of pageview.
         * @param {Number} index
         */
        removePageAtIndex(index: number): void;
        updateBoundaryPages(): void;
        /**
         * Get x position by index
         * @param {Number} idx
         * @returns {Number}
         */
        getPositionXByIndex(idx: number): number;
        /**
         *  remove widget child override
         * @param {mo.UIWidget} child
         */
        removeChild(child: egret.DisplayObject): egret.DisplayObject;
        _onNodeSizeDirty(): void;
        updateChildrenSize(): void;
        updateChildrenPosition(): void;
        removeChildren(): void;
        /**
         * scroll pageview to index.
         * @param {Number} idx
         */
        scrollToPage(idx: number): void;
        update(dt: any): void;
        onTouchBegan(event: egret.TouchEvent): void;
        onTouchMoved(event: egret.TouchEvent): void;
        onTouchEnded(event: egret.TouchEvent): void;
        onTouchCancelled(event: egret.TouchEvent): void;
        movePages(offset: any): void;
        scrollPages(touchOffset: any): boolean;
        handlePressLogic(touchPoint: any): void;
        handleMoveLogic(touchPoint: any): void;
        handleReleaseLogic(): void;
        pageTurningEvent(): void;
        /**
         * @param {Function} selector
         * @param {Object} target
         */
        addEventListenerPageView(selector: any, target: any): void;
        /**
         * get pages
         * @returns {Array}
         */
        getPages(): any;
        /**
         * get cur page index
         * @returns {Number}
         */
        getCurPageIndex(): number;
        copyClonedWidgetChildren(model: any): void;
    }
}
/**
 * Created by lihex on 12/24/14.
 */
declare module mo {
    class UbbTextElement {
        text: string;
        color: any;
        fontSize: number;
        font: string;
        constructor(text?: string, color?: number, fontSize?: number, font?: string);
        setValue(k: any, v: any): void;
        toTextFlowElement(): Object;
        _convertColorFromStr(color: any): number;
    }
    class UBBParser {
        static LINE_BREAK_TAG: string;
        static UBB_TAG: string;
        _ubbElements: any;
        _defFontSize: any;
        _defFontName: any;
        _defColor: any;
        constructor(defaultFntSize?: number, defaultFntName?: string, defaultColor?: number);
        static getInstance(...args: any[]): any;
        resetDefault(defaultFntSize?: number, defaultFntName?: string, defaultColor?: number): void;
        ubb2TextFlow(str: string): any;
        _parseUBB(str: any): void;
        _parseTextFromStr(ubbStr: any): string;
        _splitUbbAttr(str: any): UbbTextElement;
        checkIsExitUBB(str: any): boolean;
    }
}
declare module mo {
    class UIWidgetData {
        className: string;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        anchorX: number;
        anchorY: number;
        ignoreSize: boolean;
        posType: number;
        posPercentX: number;
        posPercentY: number;
        sizeType: number;
        sizePercentX: number;
        sizePercentY: number;
        zOrder: number;
        options: any;
        children: UIWidgetData[];
        colorType: number;
        color: number;
        customProperty: string;
        flipX: boolean;
        flipY: boolean;
        opacity: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        scaleWidth: number;
        scaleHeight: number;
        scale9Enabled: boolean;
        touchEnabled: boolean;
        visible: boolean;
        res: string;
        layoutParameter: UILayoutParameter;
    }
}
declare module mo {
    class UIWidgetFactory {
        static getInstance(): UIWidgetFactory;
        static PRODUCT_CLASS: any;
        __class: any;
        constructor();
        produce(data: UIWidgetData): UIWidget;
        _setProductAttr(product: UIWidget, data: UIWidgetData): void;
    }
}
declare module mo {
    class UIScale9Data extends UIWidgetData {
        scale9Enabled: boolean;
        scale9Grid: number[];
    }
    class UIRootData {
        designHeight: number;
        designWidth: number;
        textures: string[];
        widgetTree: UIWidgetData;
        dataScale: number;
    }
    class UILayoutParameter {
        type: number;
        align: number;
        gravity: number;
        eageType: number;
        normalHorizontal: number;
        normalVertical: number;
        parentHorizontal: number;
        parentVertical: number;
        margin: number[];
    }
}
declare module mo {
    class UIDataParser extends res.JsonParser {
        static TYPE: string;
        _onLoadFinish(event: egret.Event): void;
        unload(data: any, resCfgItem: res.ResCfgItem): void;
        _parse(resCfgItem: res.ResCfgItem, parseResult: any): any;
        _parseChildren(data: any, uiKey: UIKey, uiData: UIWidgetData): void;
        _parseUIRootData(data: any): UIRootData;
        _parseLayoutParameter(data: any, uiKey: UIKey): UILayoutParameter;
        _parseBaseUIWidgetData(data: any, uiKey: UIKey, uiData: UIWidgetData): UIWidgetData;
        _parseUIScale9Data(data: any, uiKey: UIKey, uiData: UIScale9Data): UIScale9Data;
        _parseUITextData(data: any, uiKey: UIKey, uiData: UITextData): UITextData;
        _parseUTextAtlasData(data: any, uiKey: UIKey, uiData: UITextAtlasData): UITextAtlasData;
        _parseUIInputData(data: any, uiKey: UIKey, uiData: UIInputData): UIInputData;
        _parseUIImageData(data: any, uiKey: UIKey, uiData: UIImageData): UIImageData;
        _parseUILoadingBarData(data: any, uiKey: UIKey, uiData: UILoadingBarData): UILoadingBarData;
        _parseUIButtonData(data: any, uiKey: UIKey, uiData: UIButtonData): UIButtonData;
        _parseUIPanelData(data: any, uiKey: UIKey, uiData: UIPanelData): UIPanelData;
        _parseUIScrollViewData(data: any, uiKey: UIKey, uiData: UIScrollViewData): UIScrollViewData;
        _parseUIListViewData(data: any, uiKey: UIKey, uiData: UIListViewData): UIListViewData;
        _parseUIPageViewData(data: any, uiKey: UIKey, uiData: UIPageViewData): UIPageViewData;
        _parseWidgetData(data: any, uiKey: UIKey): any;
    }
}
declare module mo {
    class FontDef extends Rect {
        charID: string;
        xOffset: number;
        yOffset: number;
        xAdvance: number;
    }
    class UIFntParser extends res.ResParser {
        _dataFormat: string;
        constructor();
        load(resCfgItem: any, cb: (data: any, resCfgItem: res.ResCfgItem) => void, ctx?: any): void;
        /**
         * 一项加载结束
         */
        _onLoadFinish(event: egret.Event): void;
        _parse(resCfgItem: res.ResCfgItem, results: any[]): any;
        private _parseCharDef(line);
        unload(data: any, resCfgItem: res.ResCfgItem): void;
    }
}
declare module mo {
    interface UIKey {
        className: string;
        designHeight: string;
        designWidth: string;
        textures: string;
        widgetTree: string;
        dataScale: string;
        name: string;
        x: string;
        y: string;
        width: string;
        height: string;
        anchorX: string;
        anchorY: string;
        posType: string;
        posPercentX: string;
        posPercentY: string;
        sizeType: string;
        sizePercentX: string;
        sizePercentY: string;
        zOrder: string;
        children: string;
        color: string;
        flipX: string;
        flipY: string;
        opacity: string;
        rotation: string;
        scaleX: string;
        scaleY: string;
        touchEnabled: string;
        visible: string;
        fontName: string;
        fontSize: string;
        text: string;
        textColor: string;
        areaHeight: string;
        areaWidth: string;
        hAlignment: string;
        vAlignment: string;
        itemWidth: string;
        itemHeight: string;
        startCharMap: string;
        layoutParameter: string;
        adaptScreen: string;
        bgColor: string;
        bgOpacity: string;
        scale9Grid: string;
        scale9Enabled: string;
        clippingEnabled: string;
        layoutType: string;
        vectorX: string;
        vectorY: string;
        passwordEnable: string;
        placeHolder: string;
        direction: string;
        percent: string;
        innerWidth: string;
        innerHeight: string;
        gravity: string;
        itemMargin: string;
        normal: string;
        pressed: string;
        disabled: string;
        type: string;
        align: string;
        normalHorizontal: string;
        normalVertical: string;
        parentHorizontal: string;
        parentVertical: string;
        margin: string;
        res: string;
    }
    function getUIKey(uglified?: boolean): UIKey;
}
declare module mo {
    class UIReader {
        private _factoryDic;
        genWidget(data: any): any;
        _genWidget(data: UIWidgetData): any;
        registerUIFactory(factoryClass: any): void;
    }
    var uiReader: UIReader;
}
declare module mo {
    class UITextData extends UIWidgetData {
        fontName: string;
        fontSize: number;
        fontType: number;
        text: string;
        fontFile: string;
        touchScaleEnable: boolean;
        areaHeight: number;
        areaWidth: number;
        hAlignment: number;
        vAlignment: number;
    }
}
declare module mo {
    class UITextFactory extends UIWidgetFactory {
        static PRODUCT_CLASS: any;
        _setProductAttr(product: UIText, data: UITextData): void;
    }
}
declare module mo {
    class UITextAtlasData extends UITextData {
        itemWidth: number;
        itemHeight: number;
        startCharMap: string;
    }
}
declare module mo {
    class UITextAtlasFactory extends UIWidgetFactory {
        static PRODUCT_CLASS: any;
        _setProductAttr(product: UITextAtlas, data: UITextAtlasData): void;
    }
}
declare module mo {
    class UIInputData extends UITextData {
        passwordEnable: boolean;
        placeHolder: string;
    }
}
declare module mo {
    class UIInputFactory extends UITextFactory {
        static PRODUCT_CLASS: any;
        _setProductAttr(product: UIInput, data: UIInputData): void;
    }
}
declare module mo {
    class UIImageData extends UIScale9Data {
    }
}
declare module mo {
    class UIImageFactory extends UIWidgetFactory {
        static PRODUCT_CLASS: any;
        _setProductAttr(product: UIImage, data: UIImageData): void;
    }
}
declare module mo {
    class UIButtonData extends UIScale9Data {
        normal: string;
        pressed: string;
        disabled: string;
        text: string;
        textColor: number;
        fontSize: number;
        fontName: string;
        pressedActionEnabled: boolean;
    }
}
declare module mo {
    class UIButtonFactory extends UIWidgetFactory {
        static PRODUCT_CLASS: any;
        _setProductAttr(product: UIButton, data: UIButtonData): void;
    }
}
declare module mo {
    class UILoadingBarData extends UIScale9Data {
        direction: number;
        percent: number;
    }
}
declare module mo {
    class UILoadingBarFactory extends UIWidgetFactory {
        static PRODUCT_CLASS: any;
        _setProductAttr(product: UILoadingBar, data: UILoadingBarData): void;
    }
}
declare module mo {
    class UIPanelData extends UIScale9Data {
        adaptScreen: boolean;
        bgColor: number;
        bgOpacity: number;
        bgStartColor: number;
        bgEndColor: number;
        clippingEnabled: boolean;
        layoutType: number;
        vectorX: number;
        vectorY: number;
        anchorX: number;
        anchorY: number;
    }
}
declare module mo {
    class UIPanelFactory extends UIWidgetFactory {
        static PRODUCT_CLASS: any;
        _setProductAttr(product: UIPanel, data: UIPanelData): void;
    }
}
declare module mo {
    class UIScrollViewData extends UIPanelData {
        direction: number;
        innerWidth: number;
        innerHeight: number;
    }
}
declare module mo {
    class UIScrollViewFactory extends UIPanelFactory {
        static PRODUCT_CLASS: any;
        _setProductAttr(product: UIScrollView, data: UIScrollViewData): void;
    }
}
declare module mo {
    class UIListViewData extends UIScrollViewData {
        gravity: number;
        itemMargin: number;
    }
}
declare module mo {
    class UIListViewFactory extends UIScrollViewFactory {
        static PRODUCT_CLASS: any;
        _setProductAttr(product: UIListView, data: UIListViewData): void;
    }
}
declare module mo {
    class UIPageViewData extends UIPanelData {
    }
}
declare module mo {
    class UIPageViewFactory extends UIPanelFactory {
        static PRODUCT_CLASS: any;
    }
}
declare module mo {
    class WidgetCtrl extends Class implements IWidgetByNameApi {
        static __className: string;
        _jsonPath: string;
        _clickWidgetName: string;
        _clickFunc: Function;
        _clickTarget: any;
        _clickData: any;
        _gridScrollView: GridScrollView;
        _widget: UIWidget;
        _setWidget(widget: UIWidget): void;
        widget: UIWidget;
        isAutoDtor: boolean;
        _initProp(): void;
        _init(): void;
        resetByData(data: any, ...args: any[]): void;
        _eventStoreForClass: any[];
        resModuleName: string;
        dtor(): void;
        registerClassByKey(clazz: any, key: string, listener: Function): void;
        init(...args: any[]): void;
        onEnter(): void;
        onExit(): void;
        setClickEnabled(enabled: boolean): void;
        _initClickEvent(): void;
        _removeClickEvent(): void;
        /**
         * 创建gridScrollView方法。不需要设置viewSize和cellSize。
         * @param panelName
         * @param cellClass
         * @param cols
         * @param onCellDataSource
         * @param autoCellWidth
         * @returns {mo.GridScrollView}
         * @private
         */
        _createGridScrollView(panelName: string, cellClass: any, cols: number, onCellDataSource: Function, autoCellWidth?: boolean): any;
        attachWidgetTo(parent: any, zorder?: number, tag?: any): void;
        detachWidget(): void;
        setLayoutAdaptive(widget: any, isAdaptiveChildren: any): void;
        _doClick(sender: any): void;
        onClick(selector: any, target: any, data: any): void;
        getWidgetByName(name: any): any;
        getPositionByName(name: string): Point;
        setPositionByName(name: string, x: any, y?: number): void;
        setPositionOffsetByName(name: string, x: any, y?: number): void;
        setScaleByName(name: string, scaleX: any, scaleY?: number): void;
        /**
         * 缩放适配屏幕
         * @param widgetName
         * @param mode
         */
        setAdaptiveScaleByName(widgetName: string, mode: any): void;
        setSizeByName(name: string, width: any, height?: number): void;
        getSizeByName(name: string): Size;
        setVisibleByName(name: string, visible: any): void;
        setGrayByName(name: string, isGray: boolean): void;
        transColorByName(name: string, colorType: any): void;
        setButtonImgByName(name: string, frameName: string): void;
        /**
         * 通过名字为Widget设置信息。
         * @param name
         * @param option
         */
        setInfoByName(name: string, option: any): void;
        setInfo(info: any): void;
        /**
         * 通过名字设置widget颜色, widget通常是个Label。
         * @param name
         * @param color
         */
        setColorByName(name: string, color: number): void;
        /**
         * 通过名字设置Widget是否可点击
         * @param name
         * @param touchEnabled
         */
        setTouchEnabledByName(name: string, touchEnabled: boolean): void;
        /**
         * 通过名称设置click监听
         * @param name
         * @param listener
         * @param target
         * @param data
         * @param audioId
         */
        onClickByName(name: string, listener: Function, target?: any, data?: any, audioId?: any): void;
        /**
         * 通过名称设置longTouch监听
         * @param name
         * @param listener
         * @param target
         */
        onLongTouchByName(name: string, listener: Function, target?: any, respInterval?: number, startInterVal?: number): void;
        /**
         * 打开长按事件的支持
         * @param name
         * @param listener
         * @param target
         * @param respInterval
         * @param startInterVal
         */
        enableLongTouchByName(name: string, respInterval?: number, startInterVal?: number): void;
        /**
         * 添加一个子节点。子节点可以是一个widget也可以是一个普通的node。在内部进行自动判断了。
         * @param name
         * @param child
         * @param tag
         */
        addChildNodeByName(name: string, child: any, tag: any): void;
        /**
         * 根据名字设置其是否可见。与visible不同的是，会同时设置是否可点击。
         * @param name
         * @param disappeared
         */
        setDisappearedByName(name: string, disappeared: any): void;
        setMaskEnabledByName(name: string, enable: any): void;
        loadMaskTextureByName(name: string, textFileName: any): void;
        formatByName(name: string, ...args: any[]): void;
        doLayoutByName(name: string, ...args: any[]): void;
        setLayoutDirtyByName(name: string, ...args: any[]): void;
        /**
         * 根据widget的名称设置描边。
         * @param name
         * @param strokeColor
         * @param strokeSize
         * @returns {*}
         */
        enableStrokeByName(name: string, strokeColor: number, strokeSize: number): void;
        /**
         * 根据widget名字禁用描边。
         * @param name
         * @returns {*}
         */
        disableStrokeByName(name: any): void;
        /**
         * 根据widget名字设置计时器。
         * 其中，widget必须为Label类型（有setText方法）。
         * 每次调用该方法，都为将起始时间设置为00:00。
         * @param name
         * @param {Function|null} cb  每秒的触发回调，可以不设置。参数为：millisecond(每次间隔的毫秒数，约等于1秒)； widget
         * @param {Function|null} target 回调函数的上下文，可以不设置
         * @returns {*}
         */
        setIntervalByName(name: string, cb: any, target: any): any;
        /**
         * 设置倒计时类型触发器。
         * 当参数个数为四个时，表示：name, millisecond, endCallback, endTarget。
         * @param {String} name widget的名称
         * @param {Number} millisecond   倒计时的毫秒数
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        countdownByName(name: string, millisecond: any, callback: any, target?: any, endCallback?: any, endTarget?: any): any;
        /**
         * 倒计时到某个时间点的触发器。
         * 当参数个数为四个时，表示：name, millisecond, endCallback, endTarget。
         * @param {String} name widget的名称
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        countdownToEndTimeByName(name: string, endTime: any, callback: any, target: any, endCallback?: any, endTarget?: any): any;
        /**
         * 循环方式的倒数计时。自动根据结束时间点算出循环次数。
         * @param {String} name widget的名称
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Number} interval  每次循环的时间间隔
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} intervalCallback  每次循环结束的回调
         * @param {Object|null} intervalTarget  每次循环结束的回调函数的上下文
         * @param {Function|null} endCallback   总倒计时结束的回调
         * @param {Object|null} endTarget   总倒计时结束的回调函数的上下文
         * @returns {LoopCountdownToEndTimeInvocation}
         */
        countdownLoopToEndTimeByName(name: string, endTime: any, interval: any, callback: any, target: any, intervalCallback: any, intervalTarget: any, endCallback: any, endTarget: any): any;
        /**
         * 设置线性布局（水平）。
         * @param name
         * @param spacing   间距
         * @returns {*}
         */
        setLinearLayoutByName(name: string, spacing: any, align: any): void;
        /**
         * 长按name1的widget显示name2的widget。
         * @param name1
         * @param name2
         * @returns {*}
         */
        setTouchToShowByName(name1: any, name2: any): void;
        _onBegin4TouchToShowByName(): void;
        _onEnd4TouchToShowByName(): void;
        /**
         * 底数，例如： [100,200,300]
         * @param {Array} arr
         */
        setProgressQueueBaseNumberByName(name: string, arr: any): void;
        /**\
         * 单次增加多少
         * @param name
         * @param value
         * @param cb
         * @param ctx
         * @returns {*}
         */
        runProgressQueueByName(name: string, value: number, cb: Function, ctx?: any): void;
        /**
         * 通过名称获得widget并执行动作。
         * @param name
         * @param action
         */
        runActionByName(name: string, action: any): void;
        /**
         * 添加事件监听
         * @param name widget名
         * @param eventName 事件名
         * @param cb
         * @param cbtx
         */
        addEventListenerByName(name: string, eventName: string, cb: Function, cbtx: any): void;
        /**
         * 移除事件监听
         * @param name
         * @param eventName
         * @param cb
         * @param cbtx
         */
        removeEventListenerByName(name: string, eventName: string, cb: Function, cbtx: any): void;
    }
}
declare module mo {
    class GridController extends WidgetCtrl {
        static __className: string;
        static LAYOUT_AVG: number;
        static LAYOUT_TOP: number;
        static LAYOUT_BOTTOM: number;
        _itemJsonPath: string;
        _itemWidgets: any;
        _containerH: number;
        _containerW: number;
        _itemH: number;
        _itemW: number;
        _cols: number;
        _layout: number;
        _dataList: any[];
        _resizeContainer: boolean;
        _marginH: number;
        _rows: number;
        _initProp(): void;
        init(container: any, cols: any, resizeContainer: any): void;
        _resetItemByData(widget: any, data: any, index: any): void;
        _initItemWidget(widget: any): void;
        _setPosByAvg(widget: any, row: any, col: any): void;
        _setPosByTop_bak(widget: any, row: any, col: any): void;
        _setPosByTop(widget: any, row: any, col: any): void;
        _setPosByBottom_bak(widget: any, row: any, col: any): void;
        _setPosByBottom(widget: any, row: any, col: any): void;
        _createItemWidget(): any;
        /**
         * 通过此接口进行视图的重置
         * @param dataList
         */
        resetByData(dataList: any): void;
        setLayoutType(type: any): void;
        setSize(width: any, height: any): void;
        getSize(): Size;
        /**
         * 获取总行数累加的高度
         */
        getRowTotalHeight(): number;
        cellAtIndex(index: any): egret.DisplayObject;
        setMarginHeight(height: any): void;
    }
}
/**
 * Created by lihex on 1/17/15.
 */
declare module mo {
    class LinearVerticalCtrl extends WidgetCtrl {
        _tpName: any;
        _tpWidget: any;
        _itemWidgets: any;
        _dataSourceAdapterSelector: any;
        _dataSourceAdapterTarget: any;
        _itemCount: any;
        _itemWidgetCreateSelector: any;
        _itemWidgetCreateTarget: any;
        _initProp(): void;
        /**
         * @param container 容器panel
         * @param templateName(string 模板项名|function构建模板项的回调)
         * @param target
         */
        init(container: UIPanel, templateName?: any, target?: any): void;
        reclaimItemWidget(): void;
        /**
         *
         * @param count 数量|字典
         * @param selector
         * @param target
         */
        resetByData(count: any, selector?: any, target?: any): void;
        /**
         * 根据索引获得子项
         * @param index
         * @returns {any}
         * @private
         */
        _getItemWidget(index: any): any;
        /**
         * 创建子项
         * @returns {any}
         * @private
         */
        _createItemWidget(): any;
        /**
         * 设置创建子项的回调
         * @param selector
         * @param target
         */
        setWidgetCreateAdapter(selector: any, target: any): void;
        /**
         * 设置数据设置回调
         * @param selector
         * @param target
         */
        setDataSourceAdapter(selector: any, target: any): void;
        _executeDataAdapterCallback(itemWidget: any, index: any): any;
        dtor(): void;
    }
}
declare module mo {
    class PageViewController extends WidgetCtrl {
        static __className: string;
        _pageViewContainer: UIPageView;
        _initPageCount: number;
        _itemClass: any;
        _itemJsonPath: string;
        _initProp(): void;
        init(container: any): void;
        setTouchEnabled(enable: boolean): void;
        _createItemWidget(): UIPanel;
        setItemJsonPath(itemJsonPath: string): void;
        _resetItemByData(widget: any, data: any, index: any): void;
        /**
         * 通过此接口进行视图的重置
         * @param {Object || Array} data
         */
        resetByData(data: any): void;
        _addPage(page: UIPanel): void;
        prePage(): void;
        nextPage(): void;
        /**
         * 获取pageViewContainer
         * @returns {mo.UIPageView}
         */
        getPageViewContainer(): UIPageView;
        getPagesCount(): any;
        scrollToPage(idx: number): void;
        getCurPageIndex(): number;
        _pageViewEvent(): void;
        _pageEnterEventSelector: Function;
        _pageEnterEventListener: any;
        addPageEnterEvent(pageEnterEventSelector: any, pageEnterEventListener: any): void;
        onPageEnter(): void;
        dtor(): void;
    }
}
/**
 * Created by lihex on 12/19/14.
 */
declare module mo {
    class SidePanelCtrl extends Class {
        static __className: string;
        widget: any;
        _leftPanel: any;
        _rightPanel: any;
        _leftSize: any;
        _rightSize: any;
        _leftDesignPos: any;
        _rightDesignPos: any;
        _hiddenPos: any;
        _center: any;
        actionEventType: string;
        isRightBack: boolean;
        init(widget: any, leftPanelName: any, rightPanelName: any, splitWidth: any): void;
        reset(): void;
        runRight(cb: any, target?: any): void;
        leftIn(cb: any, target: any): void;
        leftOut(cb: any, target: any): void;
    }
}
declare module mo {
    class GridViewCell extends UIPanel {
        static __className: string;
        _row: number;
        _idx: number;
        _jsonPath: string;
        _uiWidget: any;
        _cellSize: Size;
        _clickWidgetName: string;
        _useClickEffect: boolean;
        _originPos: any;
        listenersInited: boolean;
        resetByData(data: any, ...args: any[]): void;
        _initProp(): void;
        init(...args: any[]): void;
        _onTouchBeginForClickWidget(): void;
        _onTouchEndForClickWidget(): void;
        dtor(): void;
        _onClick(sender: any, event: any, data: any): void;
        getUIWidget(): any;
        initWithFilePath(jsonPath: any): void;
        /**
         * 获取cell的index
         * @returns {number}
         */
        getIdx(): number;
        /**
         * 设置cell的index
         * @param {number} idx
         */
        setIdx(idx: any): void;
        /**
         * 获取cell所在的列数
         * @returns {number}
         */
        getRow(): number;
        /**
         * 设置cell所在的列数
         * @param {number} row
         */
        setRow(row: any): void;
        /**
         * 重置这个cell
         */
        reset(): void;
        /**
         * 设置cellSize大小
         * @param {number} cellSize
         */
        setCellSize(cellSize: any): void;
        /**
         * 获取cellSize
         */
        getCellSize(): Size;
    }
}
declare module mo {
    class GridView extends UIPanel {
        static __className: string;
        _cellsSize: Size;
        _minSize: Size;
        _cellsCountPerPage: number;
        _curPageNum: number;
        _columns: number;
        _rows: number;
        _dataLength: number;
        _indices: Object;
        _cellsUsed: GridViewCell[];
        _cellsFreed: GridViewCell[];
        _positions: Point[];
        _dataSourceAdapterSelector: Function;
        _dataSourceAdapterTarget: any;
        _cellClass: any;
        _ignoreNullCell: boolean;
        _isCellsDirty: boolean;
        _isNeedUpdateCells: boolean;
        _autoCalRows: boolean;
        _gridViewDelegate: UIScrollView;
        _initProp(): void;
        /**
         *
         * @param cellSize
         * @param col
         * @param dataLength
         * @param selector
         * @param target
         * @param cellClass
         * @param {Boolean | Number} autoCalRows 传布尔值表示是否通过dataLength/col自动计算行数
         */
        init(cellSize: Size, col: number, dataLength: number, selector: Function, target: any, cellClass: Class, autoCalRows: any): void;
        /**
         * 重设grid的数量
         * @param {Number} dataLength
         */
        setTotalCount(dataLength: number): void;
        getTotalCount(): number;
        /**
         * 移除时候销毁对象
         */
        dtor(): void;
        /**
         * 设置控制gridview的对象
         */
        setDelegate(target: any): void;
        setMinSize(size: Size): void;
        _resetSize(): void;
        setCellsDirty(isDirty: boolean): void;
        /**
         * 滚动的回调
         */
        needUpdateCells(): void;
        /**
         * 设置绑定数据的callback
         * @param selector
         * @param target
         */
        addEventListenerGridView(selector: Function, target: any): void;
        _executeDataAdapterCallback(convertCell: GridViewCell, idx: number): any;
        /**
         * 设置cell的数量
         * @param {Number} cellsCountPerPage
         */
        setCountOfCellPerPage(cellsCountPerPage: number): void;
        /**
         * 获取cell的数量
         * @returns {number}
         */
        getCountOfCellPerPage(): number;
        /**
         * 设置cell的尺寸
         * @param {mo.Size} cellsSize
         */
        setSizeOfCell(cellsSize: Size): void;
        /**
         * 获取cell的尺寸
         * @returns {mo.Size}
         */
        getSizeOfCell(): Size;
        /**
         * 设置列数
         * @param {Number} columns
         */
        setColumns(columns: number): void;
        /**
         * 获取列数
         * @returns {number}
         */
        getColumns(): number;
        /**
         * 设置行数
         * @param {Number} rows
         */
        setRows(rows: number): void;
        /**
         * 获取行数
         * @returns {number}
         */
        getRows(): number;
        /**
         * 设置当前是位于第几页（用于GridPageView里）
         * @param {Number} num
         */
        setCurPage(num: number): void;
        /**
         * 获取当前是位于第几页
         * @returns {number}
         */
        getCurPage(): number;
        /**
         * 获取所有的cell
         * @returns {Array}
         */
        getCells(): GridViewCell[];
        /**
         * 通过index获取一个cell
         * @param {Number} idx
         * @returns {*}
         */
        cellAtIndex(idx: number): any;
        _dequeueCell(): GridViewCell;
        /**
         * 重载数据
         */
        reloadData(): void;
        /**
         * 更新数据
         */
        updateData(): void;
        /**
         * 移除所有在使用的cell
         */
        removeAllFromUsed(): void;
        /**
         * 移动所有没用的cell
         */
        removeAllFromFreed(): void;
        /**
         * 更新cell的位置
         */
        updatePositions(): void;
        /**
         * 更新某个位置的cell
         * @param {Number} idx
         * @param {Number} row
         */
        updateCellAtIndex(idx: number, row: number): void;
        /**
         * 根据index获取cell设置的位置
         * @param {Number} idx
         * @returns {*}
         */
        cellPositionFromIndex(idx: number): Point;
        /**
         * 某个位置插入一个cell
         * @param {Object} cell
         * @param {Number} idx
         */
        insertCellAtIndex(cell: GridViewCell, idx: number): void;
        _cellBeginRowFromOffset(offset: Point, targetSize: Size, targetInnerSize: Size): number;
        _cellEndRowFromOffset(offset: Point, targetSize: Size, targetInnerSize: Size): number;
        _cellBeginColumnFromOffset(offset: Point, targetSize: Size): number;
        _cellEndColumnFromOffset(offset: Point, targetSize: Size): number;
        _cellFirstIndexFromRow(row: number): number;
        ignoreNullCell(ignore: boolean): void;
        updateCellUsedData(): void;
        dropOneCell(): void;
        _onBeforeVisit(): void;
        _onAfterVisit(): void;
    }
}
declare module mo {
    class GridScrollView extends UIScrollView {
        static __className: string;
        _gridView: GridView;
        _cellSize: Size;
        _viewSize: Size;
        _cols: number;
        _totalCount: number;
        _customEventSelector: Function;
        _customEventListener: any;
        _initProp(): void;
        init(viewSize: Size, cellSize: Size, cols: number, totalCount: number, selector: Function, target: any, cellClass: any): void;
        reSize(size: any): void;
        dtor(): void;
        onScroll(selector: Function, target: any): void;
        _resetSize(): void;
        /**
         *  更新内部gridview
         */
        refresh(): void;
        /**
         * 刷新gridview可以见cell的数据
         */
        refreshData(): void;
        _onScrolling(sender: any, event: any): void;
        setScrollViewTouchEnabled(isTouch: boolean): void;
        ignoreNullCell(ignore: boolean): void;
        setTotalCount(totalCount: number): void;
        getTotalCount(): number;
        removeAllFromUsed(): void;
        dropOneCell(): void;
        /**
         * 通过index获取一个cell
         * @param {Number} idx
         * @returns {*}
         */
        cellAtIndex(idx: number): any;
        getCells(): GridViewCell[];
        scrollToItem(idx: any): void;
    }
}
declare module mo {
    class GridPageIndex extends UIPanel {
        static __className: string;
        _totalPageNum: number;
        _lastPageNum: number;
        _curPageNum: number;
        _lastPageIndex: number;
        _curPageIndex: number;
        _requiredPageIndexNum: number;
        _maxPageIndexNum: number;
        _pageIndexRenders: UIImage[];
        _pageOnRender: UIImage;
        _offTexName: string;
        _onTexName: string;
        _spacing: number;
        _indexDirty: boolean;
        _initProp(): void;
        /**
         * 加载图标
         * @param on
         * @param off
         */
        loadTextures(on: string, off: string): void;
        /**
         *  加载灰色图标
         * @param off 资源名
         */
        loadOffTexture(off: string): void;
        /**
         * 加载高亮图标
         * @param on 资源名
         */
        loadOnTexture(on: string): void;
        /**
         *  设置图标间距
         * @param spacing
         */
        setSpacing(spacing: number): void;
        drawPageIndexIcon(): void;
        /**
         *  设置最多显示图标数
         * @param num
         */
        setMaxPageIndexNum(num: number): void;
        /**
         *  设置总页数
         * @param num
         */
        setTotalPageNum(num: number): void;
        /**
         *  设置页码
         * @param num 从1开始
         */
        setPageNum(num: number): void;
        /**
         *  设置页码索引
         * @param index 从0开始
         */
        _setPageIndex(index: number): void;
        /**
         *  更新图标位置
         * @private
         */
        _updateIndex(): void;
        update(dt: number): void;
        dtor(): void;
    }
}
declare module mo {
    class GridPageView extends UIPanel {
        static __className: string;
        static IMG_PAGE_ON: string;
        static IMG_PAGE_OFF: string;
        _rows: number;
        _columns: number;
        _pageViewContainer: UIPageView;
        _pageIndexContainer: GridPageIndex;
        _totalCellsCount: number;
        _useGridViews: any[];
        _freeGridViews: any[];
        _initPageCount: number;
        _cellsCounts: number;
        _widthPerPage: number;
        _lastedPageNum: number;
        _pageIndexDistance: number;
        _totalCount: number;
        _viewSize: Size;
        _cellSize: Size;
        _selector: Function;
        _target: any;
        _cellClass: any;
        _pageIndexEnabled: boolean;
        _onPageChangedCb: Function;
        _onPageChangedTarget: any;
        _maxPageIndexNum: number;
        _totalPageCount: number;
        _initProp(): void;
        /**
         *
         * @param viewSize 视窗尺寸
         * @param cellSize 格子尺寸
         * @param row 单页的列数
         * @param col 单页的横数
         * @param totalCount 所有格子的数量
         * @param selector
         * @param target
         * @param cellClass
         * @returns {mo.GridPageView}
         *
         * @example
         *
         var gridPageView = mo.GridPageView.create(
         size(240,160),size(24,16),
         10, 5,self._data.length, self.gridviewDataSource, self);
         gridPageView.setPageIndexEnabled(true);
         uiLayer.addWidget(gridPageView);

         gridviewDataSource(convertView, idx){
           var cell = convertView;
           var button;

           if(!cell){
               var str = self._data[idx];

               cell = new mo.GridViewCell();
               button = cc.LabelTTF.create(str, "Arial", 12);
               button.setAnchorPoint(0,0);
               button.setTag(1);
               cell.addNode(button);
           }
           else{
               button = cell.getChildByTag(1);
           }

           button.setString(idx);
           return cell;
      }
         */
        init(viewSize: any, cellSize: any, row: any, col: any, totalCount: any, selector: any, target: any, cellClass: any): void;
        scrollToPage(idx: any): void;
        getCurPageIndex(): number;
        _resetSize(): void;
        getTotalCount(): number;
        setTotalCount(totalCount: any): void;
        getDataCountByPageIndex(index: any): number;
        removeAllFromUsed(): void;
        onPageChanged(cb: any, target: any): void;
        /**
         * 更新某页的数据
         * @param index 页码 (0~n)
         */
        updatePageByIndex(index: any): void;
        _pageViewEvent(): void;
        _reclaimGridView(gridView: any): void;
        _dequeueGridView(): any;
        setPageViewTouchEnabled(isTouch: any): void;
        /**
         * 获取pageViewContainer
         * @returns {mo.UIPageView}
         */
        getPageViewContainer(): UIPageView;
        getPagesCount(): any;
        /**
         * 获取pageIndex
         * @returns {mo.GridPageIndex}
         */
        getPageIndexContainer(): GridPageIndex;
        /**
         * 启动pageIndex
         * @param {Boolean} enable
         */
        setPageIndexEnabled(enable: any): void;
        /**
         * 设置pageIndex和pageView的距离
         * @param {Number} distance
         */
        setPageIndexDistance(distance: any): void;
        /**
         * 获取pageIndex和pageView的距离
         * @returns {number}
         */
        getPageIndexDistance(): number;
        dtor(): void;
    }
}
declare module mo {
    class _CellOption extends Option {
        row: number;
        idx: number;
        jsonPath: string;
        widget: any;
        cellSize: Size;
        clickWidgetName: string;
        useClickEffect: boolean;
        originPos: any;
        listenerInited: boolean;
        listenerIniter: Function;
        listenerIniterCtx: any;
        data: any;
        _initProp(): void;
        dtor(): void;
    }
    class UIGridCell extends UIPanel {
        static __className: string;
        _cellOption: _CellOption;
        /**
         * 数据
         */
        data: any;
        resetByData(data: any, ...args: any[]): void;
        initListeners(): void;
        registerListenerIniter(listenerIniter: Function, listenerIniterCtx: any): void;
        _initProp(): void;
        init(...args: any[]): void;
        _onTouchBeginForClickWidget(): void;
        _onTouchEndForClickWidget(): void;
        dtor(): void;
        _onClick(sender: any, event: any, data: any): void;
        getUIWidget(): any;
        initWithFilePath(jsonPath: any): void;
        /**
         * 获取cell的index
         * @returns {number}
         */
        getIdx(): number;
        /**
         * 设置cell的index
         * @param {number} idx
         */
        setIdx(idx: any): void;
        /**
         * 获取cell所在的列数
         * @returns {number}
         */
        getRow(): number;
        /**
         * 设置cell所在的列数
         * @param {number} row
         */
        setRow(row: any): void;
        /**
         * 重置这个cell
         */
        reset(): void;
        /**
         * 设置cellSize大小
         */
        setCellSize(cellSize: any, height?: number): void;
        /**
         * 获取cellSize
         */
        getCellSize(): Size;
    }
}
declare module mo {
    class _GridViewOption extends Option {
        dataSourceAdapter: Function;
        dataSourceAdapterCtx: any;
        cellClass: any;
        cellSize: Size;
        dataList: any[];
        shownMap: any;
        recycleList: UIGridCell[];
        cols: number;
        rowNumPerView: number;
        emptyCellEnabled: boolean;
        viewRect: Rect;
        shownBeginPoint: Point;
        shownEndPoint: Point;
        hiddenBeginPoint: Point;
        hiddenEndPoint: Point;
        curCellBeginRow: number;
        curCellBeginCol: number;
        curCellEndRow: number;
        curCellEndCol: number;
        listenerIniter: Function;
        listenerIniterCtx: any;
        scrollView: UIScrollView;
        _initProp(): void;
        dtor(): void;
    }
    class UIGridView extends UIPanel {
        static __className: string;
        _gridViewOption: _GridViewOption;
        getCols(): number;
        setCellClass(cellClass: any): void;
        setViewSize(size: any, height?: number): void;
        resetStates(): void;
        registerListenerIniter(listenerIniter: Function, listenerIniterCtx: any): void;
        load(dataList: any[]): any;
        reload(): void;
        _initProp(): void;
        addToScrollView(scrollView: UIScrollView): void;
        refresh(vx: any, vy: any): void;
    }
}
/**
 * Created by SmallAiTT on 2015/4/1.
 */
declare module mo {
    /**
     * 注册九宫格数据
     * @param data
     */
    function registerS9GData(data: any): void;
    /**
     * 创建九宫格panel
     * @param width
     * @param height
     * @param pngPath
     * @returns {*}
     */
    function createS9GPanel(width: number, height: number, pngPath: string, tempPanel?: UIPanel): UIPanel;
}
declare module mo {
    class Scene extends Node {
        static __className: string;
        topTray: TopTray;
        loadingTray: LoadingTray;
        guideTray: GuideTray;
        msgTray: MsgTray;
        dlgTray: DlgTray;
        menuTray: MenuTray;
        displayTray: DisplayTray;
        _createTray(TrayClass: any): Tray;
        _initProp(): void;
        show(...args: any[]): void;
        _trayStackToHide: Tray[][];
        hideTraysUnder(tray: Tray): void;
        recoverTrays(): void;
        dtor(): void;
        static preload(cb?: Function, ...args: any[]): void;
    }
    function dispatchLayerVisible(parent: Node): void;
    function dispatchLayerInvisible(parent: Node): void;
}
declare module mo {
    var __resCfg: any;
    var runningScene: any;
    class SceneMgr extends Class {
        static __className: string;
        static LOADING_TYPE_CIRCLE: number;
        static LOADING_TYPE_ARMATURE: number;
        _scenesStack: Scene[];
        _initProp(): void;
        _LoadingLayerClass: any;
        registerLoadingLayerClass(LoadingLayerClass: any): void;
        /**
         * 推送场景，还会保留原来的scene在内存里
         * @param sceneClass
         * @param loadingType
         * @param reqTask
         * @param cb
         */
        runScene(sceneClass: any, loadingType: number, reqTask: Function, cb?: Function): void;
        /**
         * 推送场景，还会保留原来的scene在内存里
         * @param sceneClass
         * @param loadingType
         * @param cb
         * @param reqTask
         */
        pushScene(sceneClass: any, loadingType: number, reqTask: Function, cb?: Function): void;
        /**
         * 回到上一个scene哦亲
         * @param sceneClass
         * @param cb
         */
        popScene(sceneClass?: any, cb?: Function): void;
        _dispatchVisibleLayerVisible(parent: Node): void;
        _dispatchVisibleLayerInvisible(parent: Node): void;
        purge(): void;
        isInStack(scene: Scene): boolean;
        clear(): void;
    }
    var sceneMgr: any;
}
declare module mo {
    class Tray extends Layer {
        static __className: string;
        _initProp(): void;
        dtor(): void;
        _instanceList: any[];
        _forceHidden: boolean;
        _setForceHidden(forceHidden: boolean): void;
        forceHidden: boolean;
        _judgeToShow(): void;
        _onLayerInvisible(event: Event): void;
        add(layer: Layer): void;
        _onNodeInvisible(event: egret.Event): void;
        addNode(node: Node): void;
        _layerStackToHide: Layer[][];
        hideLayersUnder(layer: Layer): void;
        recoverLayers(): void;
    }
}
declare module mo {
    class DisplayTray extends Tray {
        static __className: string;
        _initProp(): void;
    }
}
declare module mo {
    class DlgTray extends Tray {
        static __className: string;
        _initProp(): void;
    }
}
declare module mo {
    class ModuleTray extends Tray {
        static __className: string;
        _moduleLayerMap: any;
        _moduleNameStack: string[];
        _moduleName: string;
        _moduleLayer: Layer;
        _defaultModuleName: string;
        _initProp(): void;
        pushModule(moduleName: string): void;
        popModule(): void;
        hideLayersInStack(): void;
        add(layer: Layer): void;
    }
}
declare module mo {
    class MenuTray extends Tray {
        static __className: string;
        _initProp(): void;
    }
}
declare module mo {
    class MsgTray extends Tray {
        static __className: string;
        _initProp(): void;
    }
}
declare module mo {
    class TipTray extends Tray {
        static __className: string;
        _initProp(): void;
    }
}
declare module mo {
    class GuideTray extends Tray {
        static __className: string;
        _interverId: any;
        _initProp(): void;
        add(layer: Layer): void;
        dtor(): void;
        showPre(): void;
        _setPenetrable(penetrable: any): void;
        _setVisible(visible: boolean): void;
    }
}
declare module mo {
    class LoadingTray extends Tray {
        static __className: string;
        _initProp(): void;
    }
}
declare module mo {
    class TopTray extends Tray {
        static __className: string;
        _initProp(): void;
    }
}
declare module mo {
    class BlurMaskLayer extends Layer {
        static __className: string;
        _finallyTexture: egret.RenderTexture;
        _initProp(): void;
        init(tray: any, ...args: any[]): void;
        dtor(): void;
    }
}
declare module mo {
    class UILayer extends Layer implements IWidgetByNameApi {
        static __className: string;
        _jsonPath: string;
        _widgetCtrlMap: any;
        _gridScrollView: GridScrollView;
        _gridView: GridView;
        isToHideTraysUnder: boolean;
        _initProp(): void;
        constructor(jsonPath?: string);
        _init(): void;
        initRootWidget(uiData: any): boolean;
        /**
         * 根widget节点
         */
        _rootWidget: UIPanel;
        _setRootWidget(rootWidget: UIPanel): void;
        rootWidget: UIPanel;
        addWidget(widget: UIWidget): void;
        _getTray(): Tray;
        tray: Tray;
        show(): void;
        getWidgetByName(name: string): any;
        /**
         * 创建gridScrollView方法。不需要设置viewSize和cellSize。
         * @param panelName
         * @param cellClass
         * @param cols
         * @param onCellDataSource
         * @param autoCellWidth
         * @returns {mo.GridScrollView}
         * @private
         */
        _createGridScrollView(panelName: string, cellClass: any, cols: number, onCellDataSource: Function, autoCellWidth?: boolean): any;
        _createGridView(panelName: string, cellClass: any, cols: number, onCellDataSource: Function, autoCellWidth?: boolean): any;
        /** ************************************************************************/
        getPositionByName(name: string): Point;
        setPositionByName(name: string, x: any, y?: number): void;
        setPositionOffsetByName(name: string, x: any, y?: number): void;
        setScaleByName(name: string, scaleX: any, scaleY?: number): void;
        /**
         * 缩放适配屏幕
         * @param widgetName
         * @param mode
         */
        setAdaptiveScaleByName(widgetName: string, mode: any): void;
        setSizeByName(name: string, width: any, height?: number): void;
        getSizeByName(name: string): Size;
        setVisibleByName(name: string, visible: any): void;
        setGrayByName(name: string, isGray: boolean): void;
        transColorByName(name: string, colorType: any): void;
        setButtonImgByName(name: string, frameName: string): void;
        /**
         * 通过名字为Widget设置信息。
         * @param name
         * @param option
         */
        setInfoByName(name: string, option: any): void;
        setInfo(info: any): void;
        /**
         * 通过名字设置widget颜色, widget通常是个Label。
         * @param name
         * @param color
         */
        setColorByName(name: string, color: number): void;
        /**
         * 通过名字设置Widget是否可点击
         * @param name
         * @param touchEnabled
         */
        setTouchEnabledByName(name: string, touchEnabled: boolean): void;
        /**
         * 通过名称设置click监听
         * @param name
         * @param listener
         * @param target
         * @param data
         * @param audioId
         */
        onClickByName(name: string, listener: Function, target?: any, data?: any, audioId?: any): void;
        /**
         * 通过名称设置longTouch监听
         * @param name
         * @param listener
         * @param target
         */
        onLongTouchByName(name: string, listener: Function, target?: any, respInterval?: number, startInterVal?: number): void;
        /**
         * 打开长按事件的支持
         * @param name
         * @param listener
         * @param target
         * @param respInterval
         * @param startInterVal
         */
        enableLongTouchByName(name: string, respInterval?: number, startInterVal?: number): void;
        /**
         * 添加一个子节点。子节点可以是一个widget也可以是一个普通的node。在内部进行自动判断了。
         * @param name
         * @param child
         * @param tag
         */
        addChildNodeByName(name: string, child: any, tag: any): void;
        /**
         * 根据名字设置其是否可见。与visible不同的是，会同时设置是否可点击。
         * @param name
         * @param disappeared
         */
        setDisappearedByName(name: string, disappeared: any): void;
        setMaskEnabledByName(name: string, enable: any): void;
        loadMaskTextureByName(name: string, textFileName: any): void;
        formatByName(name: string, ...args: any[]): void;
        doLayoutByName(name: string, ...args: any[]): void;
        setLayoutDirtyByName(name: string, ...args: any[]): void;
        /**
         * 根据widget的名称设置描边。
         * @param name
         * @param strokeColor
         * @param strokeSize
         * @returns {*}
         */
        enableStrokeByName(name: string, strokeColor: number, strokeSize: number): void;
        /**
         * 根据widget名字禁用描边。
         * @param name
         * @returns {*}
         */
        disableStrokeByName(name: any): void;
        /**
         * 根据widget名字设置计时器。
         * 其中，widget必须为Label类型（有setText方法）。
         * 每次调用该方法，都为将起始时间设置为00:00。
         * @param name
         * @param {Function|null} cb  每秒的触发回调，可以不设置。参数为：millisecond(每次间隔的毫秒数，约等于1秒)； widget
         * @param {Function|null} target 回调函数的上下文，可以不设置
         * @returns {*}
         */
        setIntervalByName(name: string, cb: any, target: any): any;
        /**
         * 设置倒计时类型触发器。
         * 当参数个数为四个时，表示：name, millisecond, endCallback, endTarget。
         * @param {String} name widget的名称
         * @param {Number} millisecond   倒计时的毫秒数
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        countdownByName(name: string, millisecond: any, callback: any, target?: any, endCallback?: any, endTarget?: any): any;
        /**
         * 倒计时到某个时间点的触发器。
         * 当参数个数为四个时，表示：name, millisecond, endCallback, endTarget。
         * @param {String} name widget的名称
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        countdownToEndTimeByName(name: string, endTime: any, callback: any, target: any, endCallback?: any, endTarget?: any): any;
        /**
         * 循环方式的倒数计时。自动根据结束时间点算出循环次数。
         * @param {String} name widget的名称
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Number} interval  每次循环的时间间隔
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} intervalCallback  每次循环结束的回调
         * @param {Object|null} intervalTarget  每次循环结束的回调函数的上下文
         * @param {Function|null} endCallback   总倒计时结束的回调
         * @param {Object|null} endTarget   总倒计时结束的回调函数的上下文
         * @returns {LoopCountdownToEndTimeInvocation}
         */
        countdownLoopToEndTimeByName(name: string, endTime: any, interval: any, callback: any, target: any, intervalCallback: any, intervalTarget: any, endCallback: any, endTarget: any): any;
        /**
         * 设置线性布局（水平）。
         * @param name
         * @param spacing   间距
         * @returns {*}
         */
        setLinearLayoutByName(name: string, spacing: any, align: any): void;
        /**
         * 长按name1的widget显示name2的widget。
         * @param name1
         * @param name2
         * @returns {*}
         */
        setTouchToShowByName(name1: any, name2: any): void;
        _onBegin4TouchToShowByName(): void;
        _onEnd4TouchToShowByName(): void;
        /**
         * 底数，例如： [100,200,300]
         * @param {Array} arr
         */
        setProgressQueueBaseNumberByName(name: string, arr: any): void;
        /**\
         * 单次增加多少
         * @param name
         * @param value
         * @param cb
         * @param ctx
         * @returns {*}
         */
        runProgressQueueByName(name: string, value: number, cb: Function, ctx?: any): void;
        /**
         * 通过名称获得widget并执行动作。
         * @param name
         * @param action
         */
        runActionByName(name: string, action: any): void;
        /**
         * 添加事件监听
         * @param name widget名
         * @param eventName 事件名
         * @param cb
         * @param cbtx
         */
        addEventListenerByName(name: string, eventName: string, cb: Function, cbtx: any): void;
        /**
         * 移除事件监听
         * @param name
         * @param eventName
         * @param cb
         * @param cbtx
         */
        removeEventListenerByName(name: string, eventName: string, cb: Function, cbtx: any): void;
    }
}
declare module mo {
    class DisplayLayer extends UILayer {
        static __className: string;
        _getTray(): Tray;
    }
}
declare module mo {
    class MenuLayer extends UILayer {
        static __className: string;
        _getTray(): Tray;
    }
}
declare module mo {
    class Dlg extends UILayer {
        static __className: string;
        _removeFromParentWhenShow: boolean;
        _closeWidgetName: string;
        _closeOutSide: boolean;
        _closeRootName: string;
        _initProp(): void;
        _init(): void;
        _getTray(): Tray;
        show(): void;
        _initCloseWidget(): void;
        _initCloseWidgetOutSide(): void;
    }
}
declare module mo {
    class UIModalLayer extends Dlg {
        static __className: string;
    }
}
declare module mo {
    class MsgDlg extends Dlg {
        static __className: string;
        _msgWidgetName: string;
        _isOnTop: boolean;
        _initProp(): void;
        _getTray(): Tray;
        _msg: string;
        _setMsg(msg: string): void;
        msg: string;
        static show(...args: any[]): void;
    }
}
declare module mo {
    class TopDlg extends Dlg {
        static __className: string;
        _getTray(): Tray;
    }
}
declare module mo {
    class LoadingLayer extends UILayer {
        static __className: string;
        _initProp(): void;
        _getTray(): Tray;
    }
}
declare module mo {
    class WaitingLayer extends LoadingLayer {
        static __className: string;
        static IMG_LOADING: string;
        static IMG_LOADING_BG: string;
        _circle: UIImage;
        _circleBg: UIImage;
        _maskMode: number;
        _initProp(): void;
        init(): void;
        onEnter(): void;
        onExit(): void;
    }
    class ReconnectWaitingNode extends WaitingLayer {
        static __className: string;
        _str: any;
        init(): void;
    }
    class Mask extends LoadingLayer {
        static __className: string;
    }
}
declare module mo {
    class TopLayer extends UILayer {
        static __className: string;
        _init(): void;
        _getTray(): Tray;
    }
}
declare module mo {
    class BaseFactory extends Class {
        static __className: string;
        _queue: any;
        _createCount: number;
        _productClass: any;
        _initProp(): void;
        produce(...args: any[]): any;
        produce4Recycle(...args: any[]): any;
        produceDynamic(...args: any[]): any;
        produceDynamic4Recycle(...args: any[]): any;
        _produce(...args: any[]): any;
        _produceDynamic(...args: any[]): any;
        reclaim(node: any): void;
        releaseAllProducts(): void;
        releaseProduct(product: any): void;
        dtor(): void;
    }
}
declare module mo {
    class MultiIdBaseFactory extends BaseFactory {
        static __className: string;
        _initProp(): void;
        _init(): void;
        _produce(keyName: any, ...args: any[]): any;
        _produceDynamic(keyName: any, ...args: any[]): any;
        reclaim(node: any): void;
        releaseAllProducts(): void;
        releaseProduct(product: any): void;
    }
}
/**
 * Created by yangsong on 14/12/24.
 */
declare module pomeloClient {
    class Pomelo {
        private JS_WS_CLIENT_TYPE;
        private JS_WS_CLIENT_VERSION;
        private RES_OK;
        private RES_FAIL;
        private RES_OLD_CLIENT;
        private socket;
        private package;
        private protocol;
        private message;
        private initCallback;
        private handlers;
        private _callbacks;
        private callbacks;
        private routeMap;
        private handshakeBuffer;
        private handshakeCallback;
        private heartbeatId;
        private heartbeatTimeoutId;
        private heartbeatTimeout;
        private nextHeartbeatTimeout;
        private heartbeatInterval;
        private gapThreshold;
        private reqId;
        constructor();
        init(params: any, cb: any): void;
        private initEgretSocket(host, port, cb);
        on(event: any, fn: any): void;
        removeAllListeners(event?: any, fn?: any): void;
        private index(arr, obj);
        disconnect(): void;
        request(route: any, msg: any, cb: any): void;
        private notify;
        private sendMessage(reqId, route, msg);
        private send(packet);
        private processPackage(msg);
        private processMessage(msg);
        private heartbeat(data);
        private heartbeatTimeoutCb();
        private handshake(data);
        private handshakeInit(data);
        private onData(data);
        private deCompose(msg);
        private onKick(data);
        private emit(event, ...args);
    }
}
declare var pomelo: pomeloClient.Pomelo;
/**
 * Created by SmallAiTT on 2015/3/26.
 */
declare module netLogger {
    var log: any;
    var debug: any;
    var info: any;
    var warn: any;
    var error: any;
}
declare module mo {
    class _NetRequestInfo {
        requestId: any;
        route: string;
        args: any;
        cb: Function;
        ctx: any;
        isHttp: boolean;
        toPlayWaiting: boolean;
    }
    function registerWaiting(opt: any): void;
    var _waitingPlayCount: number;
    /**
     * 播放等待画面
     */
    function playWaiting(): void;
    /**
     * 停止等待画面
     */
    function stopWaiting(): void;
    /**
     * 强制停止等待画面
     */
    function stopWaitingForce(): void;
    /**
     * Net的事件。
     */
    class NetEvent extends Event {
        route_value: any;
        route_msgCode: string;
        route_msgArgs: any;
    }
    class Net extends Class {
        static __className: string;
        static ON_ERROR: string;
        static ON_CLOSE: string;
        static ON_KICK: string;
        static ON_SUCCESS: string;
        static ON_ROUTE_ERROR: string;
        static ON_ROUTE_SUCCESS: string;
        logServer: boolean;
        respKey_msgCode: string;
        respKey_msgArgs: string;
        respKey_value: string;
        httpKey_route: string;
        httpKey_args: any;
        httpKey_handler: any;
        key_host: string;
        key_port: string;
        gateDispatcher: string;
        httpHost: string;
        httpPort: string;
        loginNameKey: string;
        loginPwdKey: string;
        loginNameKeyOfLocal: string;
        loginPwdKeyOfLocal: string;
        loginRoute: string;
        reconnectView: any;
        _connectEventsInited: boolean;
        _kicked: boolean;
        _connecting: boolean;
        _connected: boolean;
        _requestIdCounter: number;
        _waitingRequestMap: any;
        _waitingQueue: any[];
        _waitingReq4PomeloQueue: any[];
        _connectType: number;
        _hasAsyncAccount: boolean;
        _reconnecting: boolean;
        _initProp(): void;
        connect(cb: Function, playWaiting?: boolean): void;
        disconnect(): void;
        asyncAccount(strUser: any, strPwd: any, cb: any, toPlayWaiting?: boolean, toResetAsyncFlag?: boolean): void;
        _reconnect(requestInfo?: _NetRequestInfo): void;
        request(route: any, args: any, cb: any, ctx: any): void;
        requestWaiting(route: any, args: any, cb: any, ctx: any): void;
        request4Pomelo(route: any, args: any, cb: any, ctx: any): void;
        requestWaiting4Pomelo(route: any, args: any, cb: any, ctx: any): void;
        request4Http(route: any, args: any, cb: any, ctx: any): void;
        requestWaiting4Http(route: any, args: any, cb: any, ctx: any): void;
        _getRequestInfo(route: any, args: any, cb: any, target: any, option: any): _NetRequestInfo;
        _request(requestInfo: _NetRequestInfo, force?: boolean): void;
        _doRequest(requestInfo: _NetRequestInfo): void;
        _getHttpParams(route: any, args: any): string;
        _requestHttp(requestInfo: _NetRequestInfo): void;
        _requestPomelo(requestInfo: _NetRequestInfo): void;
        _handlerRequestResult(requestInfo: _NetRequestInfo, result: any): void;
        _netErrShown: boolean;
        _showNetErrMsg(): void;
        _initConnectEvents(): void;
        _dispatchNetEvent(eventType: string, value?: any, msgCode?: string, msgArgs?: string): void;
        _onClose(event: any): void;
        addEventListenerForRouteSuccess(route: any, cb: any, ctx: any): void;
        removeEventListenerForRouteSuccess(route: any, cb: any, ctx: any): void;
        addEventListenerForRouteError(route: any, cb: any, ctx: any): void;
        removeEventListenerForRouteError(route: any, cb: any, ctx: any): void;
        reset(): void;
    }
    function request(route: any, args?: any, cb?: any, ctx?: any): void;
    function requestWaiting(route: any, args?: any, cb?: any, ctx?: any): void;
    function request4Pomelo(route: any, args?: any, cb?: any, ctx?: any): void;
    function requestWaiting4Pomelo(route: any, args?: any, cb?: any, ctx?: any): void;
    function request4Http(route: any, args?: any, cb?: any, ctx?: any): void;
    function requestWaiting4Http(route: any, args?: any, cb?: any, ctx?: any): void;
    function connect(cb: Function, playWaiting?: boolean): void;
    function disconnect(): void;
}
/**
 * Created by huanghaiying on 14/12/31.
 */
declare module egret_native.dragonBones {
    class Factory {
        constructor();
        setBlendMode(blendMode: any): any;
        loadDragonBonesData(skeJsonPath: any, name: any): any;
        loadTextureAtlas(textureJsonPath: any, texturePngPath: any, name: any): any;
        buildArmatrue(name: any): any;
        removeArmature(name: any): void;
    }
}
declare module mo {
    class DragonBonesFactory extends dragonBones.EgretFactory {
        private _blendMode;
        constructor();
        setBlendMode(blendMode: string): void;
        _generateDisplay(textureAtlas: dragonBones.EgretTextureAtlas, fullName: string, pivotX: number, pivotY: number): any;
        loadDragonBonesData(skeJsonPath: any, name: any): void;
        loadTextureAtlas(textureJsonPath: any, texturePngPath: any, name: any): void;
    }
    var _dbFactory: any;
}
/**
 * Created by huanghaiying on 14/12/17.
 */
declare module mo {
    class Armature extends Node {
        static __className: string;
        static MOVEMENT_TYPE: {
            START: number;
            COMPLETE: number;
            LOOP_COMPLETE: number;
        };
        private _armature;
        private _movementTypeMap;
        static _ARM_COUNT_MAP: any;
        static RESET_ARM_COUNT_MAP(): void;
        static ADD_TO_ARM_COUNT_MAP(arm: any): void;
        static DEL_FROM_ARM_COUNT_MAP(arm: any): void;
        static PRINT_RESET_ARM_COUNT_MAP(): void;
        onEnter(): void;
        onExit(): void;
        private _isAddTicker;
        /**
         * 注册到定时器
         */
        private registerTicker();
        /**
         * 从定时器中移除
         */
        private unRegisterTicker();
        _initProp(): void;
        _armPath: string;
        _armName: string;
        initDynamic(armPath: string, defaultSpriteFile: any, cb: any, cbTarget: any): void;
        handleDynamic(name: any, defaultFile: any, cb: any, cbTarget: any): void;
        init(armPath: any, ...args: any[]): void;
        _getWidth(): number;
        _getHeight(): number;
        private _completeFunc;
        private _frameFunc;
        private initArmature();
        dtor(): void;
        setSpeedScale(speedScale: number): void;
        private _delayAnimationIndex;
        private addListeners();
        private removeListeners();
        private _completeCalls;
        private _completeObjs;
        private completeHandler(e);
        private _frameCalls;
        private _frameObjs;
        private frameHandler(e);
        private _isReady;
        private _delayAnimationName;
        private isReady();
        private getAnimation();
        private _name;
        /**
         * 获取播放的名称
         * @returns {string}
         */
        name: string;
        /**
         * 播放第几个动画
         * @param index
         */
        playWithIndex(index: any): void;
        /**
         * 停在第几个动画
         * @param index
         */
        stopWithIndex(index: any): void;
        hasAnimationName(animationName: string): boolean;
        /**
         * 播放名为name的动画
         * @param name
         */
        play(name: string): void;
        /**
         * 停止后恢复播放
         */
        resume(): void;
        /**
         * 暂停播放
         */
        pause(): void;
        /**
         * 停止播放
         */
        stop(): void;
        reset(): void;
        setMovementEventCallFunc(callFunc: any, target: any): void;
        /**
         * 移除一个movement事件
         * @param callFunc
         * @param target
         */
        removeMovementEvent(callFunc: any, target: any): void;
        setFrameEventCallFunc(callFunc: any, target: any): void;
        /**
         * 移除一个frame事件
         * @param callFunc
         * @param target
         */
        removeFrameEvent(callFunc: any, target: any): void;
        getBoneConfig(boneName: string): number[];
    }
}
declare module mo {
    class ArmatureFactory extends MultiIdBaseFactory {
        static __className: string;
        _initProp(): void;
        _getArmPath(pathStr: string): string;
        produce(...args: any[]): Armature;
        produceDynamic(...args: any[]): Armature;
        attachDynamicNodeTo(parent: any, armName: any, defaultSpriteFile: any, cb: any, cbTarget: any): Armature;
        attachDynamicNodeTo4Recycle(parent: any, armName: any, defaultSpriteFile: any, cb: any, cbTarget: any): Armature;
    }
    var armatureFactory: ArmatureFactory;
}
/**
 * Created by SmallAiTT on 2015/3/9.
 */
declare module mo {
    class ArmDataParser extends res.ResParser {
        static TYPE: string;
        /**
         * 资源加载。
         * @param resCfgItem
         * @param cb
         * @param ctx
         */
        load(resCfgItem: any, cb: (data: any, resCfgItem: res.ResCfgItem) => void, ctx?: any): void;
        unload(data: any, resCfgItem: res.ResCfgItem): void;
        _loadArm(resCfgItem: res.ResCfgItem, func: any): void;
    }
}
declare module mo {
    class GuideHookUI extends UIWidget {
        static __className: string;
        _cmd: GuideCmd;
        _touchProxy: GuideTouchProxy;
        touchProxy: GuideTouchProxy;
        _setCmd(cmd: GuideCmd): void;
        cmd: GuideCmd;
        /**
         * @deprecated
         * @param cmd
         */
        setCmd(cmd: GuideCmd): void;
        /**
         * @deprecated
         */
        getCmd(): GuideCmd;
    }
}
declare module mo {
    class GuideUI extends UILayer {
        static __className: string;
        _cmd: GuideCmd;
        _touchProxy: GuideTouchProxy;
        touchProxy: GuideTouchProxy;
        _setCmd(cmd: GuideCmd): void;
        cmd: any;
        /**
         * @deprecated
         * @param cmd
         */
        setCmd(cmd: any): void;
        /**
         * @deprecated
         */
        getCmd(): any;
        _getTray(): Tray;
        _initProp(): void;
    }
}
declare module mo {
    class GuideTouchProxy extends Node {
        static __className: string;
        _initProp(): void;
        _init(): void;
        _cmd: GuideCmd;
        _setCmd(cmd: GuideCmd): void;
        cmd: GuideCmd;
        _canDispatch: boolean;
        _dispatchTouchEventToTargetNode(event: egret.TouchEvent): void;
        onTouchBegan(event: egret.TouchEvent): void;
    }
}
declare module mo {
    class GuideHandler extends Class {
        static __className: string;
        _map: any;
        _initProp(): void;
        set(name: any, func: any, ctx?: any): void;
        get(name: any): any;
    }
    var guideCmdConditionMgr: GuideHandler;
    var guideCmdNodeMgr: GuideHandler;
    var guideCmdRectNodeMgr: GuideHandler;
    var guideCmdBeforeShowMgr: GuideHandler;
    var guideCmdAfterShowMgr: GuideHandler;
    var guideCmdBeforeNextMgr: GuideHandler;
    var guideCmdAfterNextMgr: GuideHandler;
    var nextGuideCmdMgr: GuideHandler;
}
declare module mo_guide {
    var log: any;
    var debug: any;
    var info: any;
    var warn: any;
    var error: any;
}
declare module mo {
    class GuideCmd extends Class {
        static __className: string;
        END_TYPE_NOT_SAVE: number;
        END_TYPE_NEXT: number;
        EVENT_TYPE_CLEAR_EVENT: string;
        guideMgr: GuideMgr;
        type: any;
        groupId: number;
        cmdIndex: number;
        bubbleText: string;
        nextCmdKey: string;
        revertCmdKey: string;
        penetrable: boolean;
        countdown: number;
        _countdownKey: number;
        talk: string;
        npcIndex: number;
        option: any;
        _UIClass: any;
        ui: GuideUI;
        _HookUIClass: any;
        hookUI: GuideHookUI;
        isHook: boolean;
        layerName: string;
        layer: UILayer;
        nodeName: string;
        node: Node;
        rectNodeName: string;
        rectNode: Node;
        waiting: boolean;
        route: string;
        delayTimeToShow: number;
        endType: any;
        toSave: boolean;
        actions: any[];
        _initProp(): void;
        _init(): void;
        /** 命令可触发的条件 */
        _onCondition: Function;
        _onConditionCtx: any;
        _onConditionArg: any;
        onCondition(handler: any, ctx: any, arg: any): void;
        _doCondition(layer: any): any;
        judgeContent: string;
        judge(): any;
        /** node的获取器 */
        _onNodeGetter: Function;
        _onNodeGetterCtx: any;
        _onNodeGetterArg: any;
        onNodeGetter(handler: any, ctx: any, args: any): void;
        _doNodeGetter(): Node;
        /** 矩形区域定位用的node */
        _onRectNodeGetter: Function;
        _onRectNodeGetterCtx: any;
        _onRectNodeGetterArg: any;
        onRectNodeGetter(handler: any, ctx: any, arg: any): void;
        _doRectNodeGetter(): Node;
        getRectNode(): Node;
        getNodeRect(): egret.Rectangle;
        /** 显示前的处理器 */
        _onBeforeShowDoing: boolean;
        _onBeforeShow: Function;
        _onBeforeShowCtx: any;
        _onBeforeShowArg: any;
        onBeforeShow(func: any, ctx: any, arg: any): void;
        _doBeforeShow(cb: any): void;
        /** 显示后的处理器 */
        _onAfterShow: Function;
        _onAfterShowCtx: any;
        _onAfterShowArg: any;
        onAfterShow(func: any, ctx: any, arg: any): void;
        _doAfterShow(): void;
        /** 提交前的处理器 */
        _onBeforeNext: Function;
        _onBeforeNextCtx: any;
        _onBeforeNextArg: any;
        onBeforeNext(func: any, ctx: any, arg: any): void;
        _doBeforeNext(cb: any): void;
        /** 提交后的处理器 */
        _onAfterNext: Function;
        _onAfterNextCtx: any;
        _onAfterNextArg: any;
        onAfterNext(func: any, ctx?: any, arg?: any): void;
        _doAfterNext(): void;
        /** 当目标节点被点击了 */
        /**  */
        _onNodeClickBefore: Function;
        _onNodeClickBeforeCtx: any;
        onNodeClickBefore(handler: any, ctx: any): void;
        _doNodeClickBefore(event: Event): void;
        /** 目标节点点击之后 */
        _onNodeClickAfter: Function;
        _onNodeClickAfterCtx: any;
        onNodeClickAfter(handler: any, ctx: any): void;
        _doNodeClickAfter(event: Event): void;
        /** 下一个命令获取器 */
        _onNextCmdGetter: any;
        _onNextCmdGetterCtx: any;
        _onNextCmdGetterArg: any;
        onNextCmdGetter(handler: any, ctx?: any, arg?: any): void;
        _doNextCmdGetter(): any;
        _doShow(): void;
        _doNext(): void;
        _uiCreated: boolean;
        _createUI(): void;
        hide(): void;
        reshow(): void;
        close(): void;
        _doInitNode(cb: any): void;
        _show(): void;
        _initRouteEventsInited: boolean;
        _initRouteEvents(): void;
        _next(withoutRoute?: boolean): void;
        _removeNetEventListeners(): void;
        _onRouteSuccess(): void;
        _onRouteError(): void;
        next(withoutRoute?: boolean): void;
        getTargetNode(): Node;
        _readyToExec(layer: any): any;
        /**
         * 等待
         * @param map 格式为：{groupId:cmdIndex}
         */
        wait(): void;
        /**
         * 等待结束
         * @param map 格式为：{groupId:cmdIndex}
         */
        waitDone(): void;
        _touchEventsInited: boolean;
        _initTouchEvents(): void;
        _onLayerVisible(): void;
        canExec(layer: any): boolean;
        _getActionDispatcher(type: any): egret.EventDispatcher;
        _actionEventsInited: boolean;
        _initActionEvents(): void;
        _removeActionEvents(): void;
        _isExecing: boolean;
        exec(layer: any): void;
        ctor(): void;
        unbindNodes(): void;
        dtor(): void;
        dispatchDtorEvent(): void;
        addClearEventListener(listener: any, ctx: any): void;
        dispatchClearEvent(): void;
        addEventListeners4Layer(): void;
        removeEventListeners4Layer(): void;
        _onBeforeLayerVisible(event: Event): void;
        _onAfterLayerVisible(event: Event): void;
        refresh(): void;
    }
}
declare module mo {
    class GuideCmdData extends Class {
        static __className: string;
        type: any;
        groupId: number;
        cmdIndex: number;
        bubbleText: string;
        nextCmd: string;
        judge: string;
        revertCmd: string;
        penetrable: boolean;
        countdown: number;
        endType: number;
        toSave: boolean;
        condition: string;
        talk: string;
        npcIndex: number;
        layer: string;
        node: string;
        rectNode: string;
        waiting: boolean;
        route: string;
        delayTimeToShow: number;
        beforeShow: string;
        afterShow: string;
        beforeNext: string;
        afterNext: string;
        actions: string[];
        isHook: boolean;
        option: any;
        _initProp(): void;
    }
}
declare module mo {
    class GuideCmdFactory extends Class {
        static __className: string;
        _CmdClass: any;
        _initProp(): void;
        produce(data: any): any;
        _setHandler(cmd: any, handlerName: any, onHandler: any, handlerMgr: any): void;
        _setCmdAttr(cmd: any, data: any): void;
    }
}
declare module mo {
    /** 引导是否暂停 */
    var guidePaused: boolean;
    var guideRevert: any;
    var guideJudge: any;
    class GuideEvent extends Event {
        static __className: string;
        static SHOW_CMD: string;
        static CLOSE_CMD: string;
        cmd: GuideCmd;
    }
    class GuideMgr extends Class {
        static __className: string;
        _cfgData: any;
        cmdMap: any;
        isGuideFinished: boolean;
        net: Net;
        _hideList: GuideCmd[];
        _initProp(): void;
        _init(): void;
        _hideCmd(cmd: any): void;
        hideAllCmd(): void;
        showAllCmd(): void;
        showing: boolean;
        addShowCmdListener(cb: any, ctx: any): void;
        dispatchShowCmdEvent(cmd: any): void;
        addCloseCmdListener(cb: any, ctx: any): void;
        dispatchCloseCmdEvent(cmd: any): void;
        setCfgData(cfgData: any): void;
        removeInvisibleCmd(): void;
        hasCmdByGroupId(groupId: any): boolean;
        hasCmd(groupId: any, cmdIndex: any): boolean;
        /**
         * 等待
         * @param arr 格式为：[groupId+"_"+cmdIndex]
         */
        wait(arr: any): void;
        /**
         * 等待结束
         * @param arr 格式为：[groupId+"_"+cmdIndex]
         */
        waitDone(arr: any): void;
        dtor(): void;
        init(): void;
        /**
         * 设置当前的命令
         *      两个参数：groupId、cmdIndex
         *      一个参数：groupId_cmdIndex
         * @param groupId   引导到步骤id
         * @param cmdIndex  引导小步骤下标
         */
        setCmd(groupId: any, cmdIndex?: any): GuideCmd;
        getCmd(groupId: any, cmdIndex?: any): any;
        removeCmd(cmd: GuideCmd): void;
        revertCmd(cmd: any): boolean;
        goToNextCmd(cmd: any): void;
        jumpToNextGroup(cmd: any): void;
        refresh(): void;
        refreshNextTick(): void;
        submit(curCmd: any, nextCmd: any): void;
        _doSubmit(curCmd: any, nextCmd: any): void;
    }
    var _guideCmdFactoryClassMap: {};
    /** 注册引导命令工厂类 */
    function registerGuideCmdFactoryClass(factoryClass: any, ...args: any[]): void;
    /** 引导管理器列表 */
    var _guideMgrList: any[];
    /** 注册引导管理器 */
    function registerGuideMgr(guideMgr: any): void;
    /** 移除不可见的引导 */
    function removeInvisibleCmd(): void;
    /** 刷新引导 */
    function refreshGuide(): void;
    function searchLayer4Guide(layerClassName: string): Layer;
    function addGuidePauseListener(layerClassName: string): void;
}
