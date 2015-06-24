/**
 * Created by SmallAiTT on 2015/2/25.
 */
declare module logger {
    /**
     * 格式化参数成String。
     * 参数和h5的console.log保持一致。
     * @returns {*}
     */
    function formatStr(...args: any[]): string;
    /**
     * 初始化模块日志
     * @param m
     * @param mName
     */
    function initLogger(m: any, mName: any): void;
    /**
     * 设置日志等级
     * @param mName
     * @param lvl
     */
    function setLvl(mName: any, lvl: any): void;
}
