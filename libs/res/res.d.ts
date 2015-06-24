declare module res {
    var log: any;
    var debug: any;
    var info: any;
    var warn: any;
    var error: any;
    class ResCfgItem {
        name: string;
        url: string;
        type: string;
        scale9grid: string;
        cb: Function;
        ctx: any;
        notToCache: boolean;
        notToModule: boolean;
        moduleName: string;
    }
    var _pool: any;
    var _resCfg: any;
    var _aliasCfg: any;
    var _counter: any;
    var _parserDic: any;
    var _parserAliasDic: any;
    var _defaultLimit: number;
    var root: string;
    var _workingCount: number;
    var _queue: ResCfgItem[];
    var _isLoading: boolean;
    var _workingMap: any;
    var _nameMapToUrl: any;
    var testMap: {};
    function printTestMap(): void;
    function setAlias(alias: string, realName: string): void;
    function registerParser(ParserClass: any, ...alias: string[]): void;
    function setParserAlias(parserType: any, ...args: string[]): void;
    function getParser(type: string): ResParser;
    /**
     * 加载资源配置。
     * @param url   可以是：
     *      {string} 配置文件路径
     *      {object} 资源配置数据
     */
    function loadResCfg(url: any): void;
    /**
     * 加载资源组配置。
     * @param url   可以是：
     *      {string} 配置文件路径
     *      {object} 资源组配置数据
     */
    function loadGroupCfg(url: any): void;
    /**
     * 加载资源别名配置。
     * @param url   可以是：
     *      {string} 配置文件路径
     *      {object} 资源别名配置数据
     */
    function loadAliasCfg(url: any): void;
    /**
     * 缓存资源内容
     * @param resCfgItem
     * @param parseResult
     * @returns {any}
     * @private
     */
    function _cache(resCfgItem: ResCfgItem, parseResult: any): any;
    /**
     * 获取已经缓存了的资源。
     * @param url {string} : 资源的名称
     */
    function getRes(url: string): any;
    function getResAsync(url: string, cb?: (data) => void, ctx?: any): void;
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
    function getStatusRes(resource: any, cb: (resData) => void, ctx: any, ResClass?: any): void;
    var _shortNameEnabledMap: {};
    function setShortNameEnabledByType(type: string): void;
    function getResCfgItem(resCfgItem: any, type?: string): ResCfgItem;
    function loadResCfgItem(resCfgItem: ResCfgItem, cb: Function, ctx?: any): void;
    interface LoadOpt4Res {
        onEnd?: Function;
        onEndCtx?: any;
        onEach?: Function;
        onEachCtx?: any;
        moduleName?: string;
    }
    /**
     * 加载资源。
     * @param resources
     * @param cb
     * @param ctx
     */
    function load(resources: any[], cb?: (err: any, results: any[]) => void, ctx?: any): void;
    function unload(resources: any[]): void;
    function unloadSingleByUrlForce(url: any): void;
    /**
     * 加载资源。
     * @param resources
     * @param opt
     */
    function loadWidthOption(resources: any[], opt: LoadOpt4Res): void;
    var _map: {};
    function getResArr(moduleName: any): any[];
    function setParserEnabled(type: any, enabled: any): void;
}
declare module res {
    function getURLLoader(dataFormat?: string): egret.URLLoader;
}
declare module res {
    class ResMgr extends egret.EventDispatcher {
        static __className: string;
        __className: string;
        __class: any;
        static GLOBAL: string;
        _pool: any;
        _currentModuleName: string;
        _moduleNameStack: string[];
        _releaseModuleName: string;
        _subModuleMap: any;
        _subModuleResCounterMap: any;
        _initProp(): void;
        pushSubModule(moduleName: any, subModuleName: any): void;
        releaseSubModule(moduleName: any, subModuleName: any): void;
        _init(): void;
        constructor();
        runModule(moduleName: any): void;
        pushModule(moduleName: any): void;
        popModule(moduleName: any): void;
        releaseModule(moduleName?: string): void;
        loadToGolabel(resources: any[], cb: Function, ctx?: any): void;
        addResCount(resCfgItem: ResCfgItem): void;
    }
    var mgr: ResMgr;
}
/**
 * Created by Administrator on 2015/4/18.
 */
declare module res {
    var _dyResMap: {};
    function register4Dynamic(type: any, onStatic: any, onBeforeLoad: any, onAfterLoad: any): void;
    function unload4Dynamic(node: any, type: any, url: any): void;
    function load4Dynamic(node: any, type: any, url: any, preUrl: any): void;
}
declare module res {
    class ResParser extends egret.EventDispatcher {
        static TYPE: string;
        /**
         * 加载项字典
         */
        _itemInfoDic: any;
        _dataFormat: string;
        /**
         * URLLoader对象池
         */
        _recycler: egret.Recycler;
        /**
         * 获取一个URLLoader对象
         */
        _getLoader(): egret.URLLoader;
        /**
         * 获得真正的url
         * @param resCfgItem
         * @returns {string}
         */
        getRealUrl(resCfgItem: ResCfgItem): string;
        /**
         * 资源加载。
         * @param resCfgItem
         * @param cb
         * @param ctx
         */
        load(resCfgItem: any, cb: (data: any, resCfgItem: ResCfgItem) => void, ctx?: any): void;
        /**
         * 解析资源内容
         * @param resCfgItem
         * @param data
         * @returns {any}
         */
        _parse(resCfgItem: ResCfgItem, data: any): any;
        _onLoadFinish2(event: egret.Event): void;
        /**
         * 一项加载结束
         */
        _onLoadFinish(event: egret.Event): void;
        _handleError(event: egret.IOErrorEvent, resCfgItem: ResCfgItem): void;
        unload(data: any, resCfgItem: ResCfgItem): void;
    }
}
declare module res {
    class TextParser extends ResParser {
        _dataFormat: string;
    }
}
declare module res {
    class JsonParser extends ResParser {
        _dataFormat: string;
        _parse(resCfgItem: ResCfgItem, data: any): any;
    }
}
declare module res {
    class ImageParser extends ResParser {
        _dataFormat: string;
        _parse(resCfgItem: ResCfgItem, data: any): any;
    }
}
declare module res {
    class AudioParser extends ResParser {
        _dataFormat: string;
        /**
         * 一项加载结束
         */
        _onLoadFinish(event: egret.Event): void;
        static _musicTypeMap: any;
        static addForMusicType(url: string): void;
    }
}
declare module res {
    class FrameData {
        name: string;
        x: number;
        y: number;
        w: number;
        h: number;
        offX: number;
        offY: number;
        sourceW: number;
        sourceH: number;
        scale9grid: string;
        rotated: boolean;
        trimmed: boolean;
    }
    class SheetData {
        frames: FrameData[];
    }
    class SheetParser extends ResParser {
        private _imageCfgItem;
        private _dataCfgItem;
        constructor();
        load(resCfgItem: any, cb: (data: any, resCfgItem: ResCfgItem) => void, ctx?: any): void;
        /**
         * 一项加载结束
         */
        _onLoadFinish(event: egret.Event): void;
        _parseSheetData(data: any): SheetData;
        _parse(resCfgItem: ResCfgItem, results: any[]): any;
        unload(data: any, resCfgItem: res.ResCfgItem): void;
    }
}
