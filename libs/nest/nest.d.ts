/**
 * Created by wander on 15-4-13.
 */
declare module nest.user {
    function init(loginInfo: LoginInfo, callback: Function): void;
    /**
     * 是否已登录
     * @param loginInfo
     * @param callback
     */
    function checkLogin(loginInfo: LoginInfo, callback: Function): void;
    /**
     * 调用渠道登录接口
     * @param loginInfo
     * @param callback
     */
    function login(loginInfo: LoginInfo, callback: Function): void;
    /**
     *
     * @param callback 返回类型 LoginCallbackInfo
     */
    function isSupport(callback: Function): void;
    /**
     * 登录接口传递参数
     *
     */
    interface LoginInfo {
        /**
         * 登录类型：如 QQ登录，微信支付
         */
        loginType?: string;
    }
    interface LoginCallbackInfo {
        /**
         * 状态值，0表示成功
         */
        status: string;
        /**
         * 登录方式。
         * 以QQ浏览器为例，返回 ["qq","wx"]
         * 开发者应该主动判断登录方式，如果返回了 null ，则表示没有特殊支付方式，走登录
         */
        loginType: Array<string>;
    }
}
declare module nest.iap {
    /**
     * 支付
     * @param orderInfo
     * @param callback
     */
    function pay(orderInfo: PayInfo, callback: Function): void;
    interface PayInfo {
        goodsId: string;
    }
}
declare module nest.share {
    /**
     * 是否支持分享
     * @param callback
     */
    function isSupport(callback: Function): void;
    /**
     * 分享
     * @param shareInfo
     * @param callback
     */
    function share(shareInfo: ShareInfo, callback: Function): void;
    /**
     * 分享接口传递参数
     */
    interface ShareInfo {
        title: string;
        description: string;
        img_title: string;
        img_url: string;
        url: string;
    }
}
declare module nest.social {
    function isSupport(callback: any): void;
}
declare module nest {
    interface NestData {
        module: string;
        action: string;
        data?: Object;
    }
    function callRuntime(data: NestData, callback: any): void;
}
