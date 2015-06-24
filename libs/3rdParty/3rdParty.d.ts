declare module path {
    /**
     * 拼接字符串成路径。
     * @param args
     * @returns {string}
     */
    function join(...args: string[]): string;
    /**
     * 获取文件后缀名，主要，后缀名带"."，例如：".png"。
     * @param pathStr
     * @returns {string}
     */
    function extname(pathStr: string): string;
    /**
     * 获取文件名，如果传了extname参数，那么就将去除后缀名。
     * 注意，跟nodejs不同的是，extname参数不区分大小写
     * @param pathStr
     * @param extname
     * @returns {string}
     */
    function basename(pathStr: string, extname?: string): string;
    /**
     * 获取文件所在目录路径。
     * @param pathStr
     * @returns {string}
     */
    function dirname(pathStr: string): string;
    function relative(rootPath: string, realPath: string): string;
}
/**
 * 这是path模块的拓展
 */
declare module path2 {
    /**
     * 替换一个文件的文件后缀名。
     * @param pathStr
     * @param extname
     * @returns {string}
     */
    function changeExtname(pathStr: string, extname?: string): string;
    /**
     * 改变文件的basename。
     * @param pathStr
     * @param basename
     * @param isSameExt
     * @returns {string}
     */
    function changeBasename(pathStr: string, basename: string, isSameExt?: boolean): any;
}
/**
 * 该api值保留了在h5端需要的几个接口而已
 */
declare module process {
    /**
     * 下一个主循环执行一次。
     * 这个和nodejs不同的是，多了执行回调的上下文和传参。
     * @param cb
     * @param ctx
     */
    function nextTick(cb: (...args: any[]) => void, ctx?: any, ...args: any[]): void;
}
/**
 * asyncjs模块的api模拟。只模拟了部分觉得有用的api。
 */
declare module async {
    /**
     * 异步池
     */
    class AsyncPool {
        private _srcObj;
        private _limit;
        private _pool;
        private _iterator;
        private _iteratorCtx;
        private _onEnd;
        private _onEndCtx;
        private _results;
        private _isErr;
        /** 总大小 */
        size: number;
        /** 已完成的大小 */
        finishedSize: number;
        /** 正在工作的大小 **/
        _workingSize: number;
        constructor(srcObj: any, limit: number, iterator: Function, onEnd: Function, ctx?: any);
        _each(obj: any, iterator: (value: any, index?: any) => any, context?: any): void;
        onIterator(iterator: Function, target: any): void;
        onEnd(endCb: Function, endCbTarget: any): void;
        private _handleItem();
        flow(): void;
    }
    /**
     * 序列执行异步任务。
     * @param tasks
     * @param cb
     * @param ctx
     */
    function series(tasks: {
        (cb: (err?: any, arg?: any) => void): void;
    }[], cb: (err: any, results: any[]) => void, ctx?: any): void;
    /**
     * 平行执行异步任务。
     * @param tasks
     * @param cb
     * @param ctx
     */
    function parallel(tasks: {
        (cb: (err?: any, arg?: any) => void): void;
    }[], cb: (err: any, results: any[]) => void, ctx?: any): void;
    /**
     * 瀑布模式执行异步任务。
     * @param tasks
     * @param cb
     * @param ctx
     */
    function waterfall(tasks: {
        (...args: any[]): void;
    }[], cb: (err: any, argFromLastTask?: any) => void, ctx?: any): void;
    /**
     * 使用map方式迭代执行列表或者对象数据，进行异步操作。
     * @param tasks {Array|Object}
     * @param iterator  迭代的异步操作
     * @param cb
     * @param ctx
     */
    function map(tasks: any, iterator: (value: any, index: any, cb: (err: any, ...args: any[]) => void) => void, cb: (err: any, results: any[]) => void, ctx?: any): void;
    /**
     * 使用map方式迭代执行列表或者对象数据，进行异步操作。但是可以限制每次并行的数量。
     * @param tasks {Array|Object}
     * @param limit 每次并行限制数量
     * @param iterator  迭代的异步操作
     * @param cb
     * @param ctx
     */
    function mapLimit(tasks: any, limit: number, iterator: (value: any, index: any, cb: (err: any, ...args: any[]) => void) => void, cb: (err: any, results: any[]) => void, ctx?: any): void;
}

interface CronTime{
    source:any;
    zone:any;
    second:Object;
    minute:Object;
    hour:Object;
    dayOfWeek:Object;
    dayOfMonth:Object;
    month:Object;

    /**
     * calculates the next send time
     */
    sendAt():Date;
    /**
     * Get the number of milliseconds in the future at which to fire our callbacks.
     */
    getTimeout():number;
    /**
     * writes out a cron string
     */
    toString():string;
    /**
     * Json representation of the parsed cron syntax.
     */
    toJSON():string[];
    /**
     * get next date that matches parsed cron time
     */
    _getNextDateFrom(start:Date):Date;
    /**
     * get next date that is a valid DST date
     */
    _findDST(date:Date):Date;
    /**
     * wildcard, or all params in array (for to string)
     */
    _wcOrAll(type:string):string;
    /**
     */
    _hasAll(type:string):boolean;
    /**
     * Parse the cron syntax.
     */
    _parse():string;
    /**
     * Parse a field from the cron syntax.
     */
    _parseField(field:string, type:string, constraints:number[]):void;
}
interface ICronTime_Aliases {
    jan:number;
    feb:number;
    mar:number;
    apr:number;
    may:number;
    jun:number;
    jul:number;
    aug:number;
    sep:number;
    oct:number;
    nov:number;
    dec:number;
    sun:number;
    mon:number;
    tue:number;
    wed:number;
    thu:number;
    fri:number;
    sat:number;
}
declare var CronTime:{
    map:string[];
    constraints:Array<number[]>;
    parseDefaults:string[];
    aliases:ICronTime_Aliases;

    new(source, zone):CronTime;
};
interface CronJob{
    _callbacks:Function[];

    context:any;
    onComplete:Function;
    cronTime:CronTime;

    /**
     * Fire all callbacks registered.
     */
    _callback():void;

    /**
     * Add a method to fire onTick
     */
    addCallback(callback):void;
    /**
     * Manually set the time of a job
     */
    setTime(time:Date):void;
    /**
     * Return the next scheduled date for a job
     */
    nextDate():Date;
    /**
     * Start the cronjob.
     */
    start():void;
    /**
     * Stop the cronjob.
     */
    stop():void;
}

declare var CronJob:{
    new(cronTime, onTick, onComplete, start, timeZone, context):CronJob;
    new(cronTime, ...args):CronJob;
};

interface mo {
    md5(str:string, key?:string, raw?:boolean):string
}