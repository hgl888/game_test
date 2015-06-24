
/**
 * Created by Saco on 2015/1/27.
 */
declare class EgretH5Sdk
{
    static checkLogin(fun:Function, thisObj:any);
    static login(fun:Function, thisObj:any);
    static pay(para:any);
    static attention(appId:any, id:any);
    static isOpenAttention(appId:any, id:any, callbackFun:Function, callbackFunClass:any);
}
