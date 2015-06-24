var uw;
(function (uw) {
    /** 服务端返回的消息码key值 */
    uw.RESP_MSG_CODE = "m";
    /** 服务端返回的消息参数key值 */
    uw.RESP_MSG_ARGS = "a";
    /** 服务端返回的数据key值 */
    uw.RESP_VALUE = "v";
    var Net = (function (_super) {
        __extends(Net, _super);
        function Net() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Net.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.respKey_msgCode = uw.RESP_MSG_CODE;
            self.respKey_msgArgs = uw.RESP_MSG_ARGS;
            self.respKey_value = uw.RESP_VALUE;
            self.httpKey_route = "r";
            self.httpKey_args = "a";
            self.httpKey_handler = "h";
            self.key_host = uw.Keys.key_host;
            self.key_port = uw.Keys.key_port;
            self.loginRoute = uw.iface.c_account_enterGame;
            self.loginNameKey = uw.iface.c_account_enterGame_args.name;
            self.loginPwdKey = uw.iface.c_account_enterGame_args.password;
            self.loginNameKeyOfLocal = uw.Keys.accountName;
            self.loginPwdKeyOfLocal = uw.Keys.password;
            mo.onProjectJsonOnce(self._initByProject, self);
        };
        __egretProto__._initByProject = function () {
            var self = this, project = mo.project;
            self.httpHost = project.httpHost;
            self.httpPort = project.httpPort;
            self.logServer = project.logServer;
        };
        //同步账户
        __egretProto__.asyncAccount = function (strUser, strPwd, cb, toPlayWaiting, toResetAsyncFlag) {
            if (toPlayWaiting === void 0) { toPlayWaiting = true; }
            if (toResetAsyncFlag === void 0) { toResetAsyncFlag = true; }
            var self = this;
            if (toResetAsyncFlag)
                self._hasAsyncAccount = false;
            if (toPlayWaiting)
                mo.playWaiting();
            strUser = strUser || mo.getLocalStorageItem(uw.Keys.accountName, true);
            strPwd = strPwd || mo.getLocalStorageItem(uw.Keys.password, true);
            netLogger.info("开始同步账号信息--->%s@%s", strUser, strPwd);
            var onSuccess = function (user) {
                if (toPlayWaiting)
                    mo.stopWaiting();
                self._reconnecting = false;
                self._hasAsyncAccount = true;
                netLogger.info("账号同步完毕！");
                cb(user);
            };
            var channelInfo = channelCfg.getCurChannel();
            channelInfo.enterGame(strUser, strPwd, onSuccess, self);
        };
        return Net;
    })(mo.Net);
    uw.Net = Net;
    Net.prototype.__class__ = "uw.Net";
    uw.net = new uw.Net();
    mo.registerWaiting({
        //网络处理器
        net: uw.net,
        //等待视图
        waitingView: {
            show: function () {
                mo.WaitingLayer.getInstance().show();
            },
            close: function () {
                mo.WaitingLayer.getInstance().close();
            }
        },
        //重连视图
        reccnView: {
            show: function (onOk) {
                mo.showMsg(uw.id_c_msgCode.connectFail, onOk);
            }
        },
        //被踢出视图
        kickView: {
            show: function (onOk) {
                mo.showMsg(uw.id_c_msgCode.loggedInOtherDevice, function () {
                    if (onOk)
                        onOk();
                    uw.backToIndex();
                }, null);
            }
        },
        //重连失败
        recnnFailed: function () {
            uw.error("重连失败！");
            uw.backToIndex();
        },
        //网络异常
        netErrorView: {
            show: function (onOk) {
                mo.showMsg(uw.id_c_msgCode.disconnect, onOk);
            }
        }
    });
})(uw || (uw = {}));
