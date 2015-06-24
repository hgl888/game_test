/**
 * Created by SmallAiTT on 2015/2/25.
 */
declare module tm {
    var log: any;
    var debug: any;
    var info: any;
    var warn: any;
    var error: any;
    /**
     * 这个api用于代替原生的setTimeout，并且加入了context和args的支持
     * @param cb
     * @param ctxOrDelay
     * @param delayOrArg0
     * @param args
     * @returns {number}
     */
    function setTimeout(cb: Function, ctxOrDelay: any, delayOrArg0?: any, ...args: any[]): number;
    /**
     * 这个是跟着tick走的。也就是说不是跟着真实时间走的。休眠时将停止，激活时根据上次停止处继续。
     * @param cb
     * @param ctxOrDelay
     * @param delayOrArg0
     * @param args
     * @returns {number}
     */
    function setTimeout4Tick(cb: Function, ctxOrDelay: any, delayOrArg0?: any, ...args: any[]): number;
    function clearTimeout(tickOutId: number): void;
    function setInterval(cb: Function, ctxOrDelay: any, intervalOrArg0?: any, ...args: any[]): number;
    function setInterval4Tick(cb: Function, ctxOrDelay: any, intervalOrArg0?: any, ...args: any[]): number;
    function clearInterval(tickIntervalId: number): void;
    function init(): void;
}
