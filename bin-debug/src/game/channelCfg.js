var channelCfg;
(function (channelCfg) {
    //通过SDK登陆游戏的检测
    function loginGame(sdkData, cb, cbTarget) {
        var self = this;
        var argsKeys = uw.iface.h_account_loginBySdk_args, args = {};
        args[argsKeys.channelId] = mo.project.channelId;
        args[argsKeys.sdkData] = sdkData;
        args[argsKeys.deviceId] = mo.getDeviceId();
        mo.request4Http(uw.iface.h_account_loginBySdk, args, function (data) {
            cb.call(cbTarget, true, data);
        }, self);
    }
    channelCfg.loginGame = loginGame;
    //通过SDK进入游戏
    function enterGame(sdkData, cb, cbTarget) {
        var args = {};
        var argsKeys = uw.iface.c_account_enterGameBySdk_args;
        args[argsKeys.channelId] = mo.project.channelId;
        args[argsKeys.sdkData] = sdkData;
        args[argsKeys.deviceId] = mo.getDeviceId();
        //注意了，同步账号比较特殊，需要调用的是request4Pomelo接口
        mo.request4Pomelo(uw.iface.c_account_enterGameBySdk, args, cb, cbTarget);
    }
    channelCfg.enterGame = enterGame;
    var channelMap = {};
    var curChannelInstance;
    function getCurChannel() {
        var channelId = mo.project.channelId;
        return getCfg(channelId);
    }
    channelCfg.getCurChannel = getCurChannel;
    function getCfg(channelId) {
        if (!curChannelInstance) {
            curChannelInstance = new channelMap[channelId] || new channelMap[channelCfg.key.local];
        }
        return curChannelInstance;
    }
    channelCfg.getCfg = getCfg;
    /*==================渠道开始==================*/
    channelCfg.key = {
        local: 0,
        egret: 10001,
        egretTencent: 10002,
        appleStore: 99999
    };
    /**
     * Channel的基类
     */
    var BaseChannel = (function () {
        function BaseChannel() {
            this.defaultUI = false;
            this.isValidIAP = false;
            this.name = "";
        }
        var __egretProto__ = BaseChannel.prototype;
        __egretProto__.login = function (cb, cbTarget) {
            uw.warn("login接口未实现");
        };
        __egretProto__.logout = function (cb, cbTarget) {
            uw.warn("logout接口未实现");
        };
        __egretProto__.enterGame = function (strUser, strPwd, cb, cbTarget) {
            uw.warn("enterGame接口未实现");
        };
        __egretProto__.pay = function (rechargeId, cb, target) {
            uw.warn("pay接口未实现");
        };
        __egretProto__.share = function (cb, target) {
            uw.warn("share接口未实现");
        };
        __egretProto__.social = function (cb, target) {
            uw.warn("social接口未实现");
        };
        return BaseChannel;
    })();
    BaseChannel.prototype.__class__ = "channelCfg.BaseChannel";
    /**
     * 本地环境
     */
    var Local = (function (_super) {
        __extends(Local, _super);
        function Local() {
            _super.apply(this, arguments);
            this.defaultUI = true;
        }
        var __egretProto__ = Local.prototype;
        __egretProto__.login = function (cb, cbTarget) {
            var self = this;
            uw.SdkLoginLayer.checkLogin(function (data) {
                if (data) {
                    cb.call(cbTarget, true, data);
                }
                else {
                    cb.call(cbTarget, false);
                    uw.SdkLoginLayer.login(function (data1) {
                        cb.call(cbTarget, true, data1);
                    }, self);
                }
            }, self);
        };
        __egretProto__.logout = function (cb, cbTarget) {
            var self = this;
            uw.SdkLoginLayer.logout(function (data) {
                cb.call(cbTarget, true, data);
            }, self);
        };
        __egretProto__.enterGame = function (strUser, strPwd, cb, cbTarget) {
            var self = this;
            var argsObj = uw.iface.c_account_enterGame_args, args = {};
            args[argsObj.name] = strUser;
            args[argsObj.password] = strPwd + "";
            args[argsObj.channelId] = mo.project.channelId;
            //注意了，同步账号比较特殊，需要调用的是request4Pomelo接口
            mo.request4Pomelo(uw.iface.c_account_enterGame, args, cb, cbTarget);
        };
        return Local;
    })(BaseChannel);
    Local.prototype.__class__ = "channelCfg.Local";
    channelMap[channelCfg.key.local] = Local;
    /**
     * Egret Runtime 渠道
     */
    var EgretRuntime = (function (_super) {
        __extends(EgretRuntime, _super);
        function EgretRuntime() {
            _super.apply(this, arguments);
            this.defaultUI = false;
            this.isOpenAttention = false;
            this.appId = 88;
            this.isValidIAP = true;
            this._pollingCount = 0;
            this.name = "";
            this.iconPath = "";
        }
        var __egretProto__ = EgretRuntime.prototype;
        __egretProto__.login = function (cb, cbTarget) {
            var self = this;
            EgretH5Sdk.checkLogin(function (tokenObj) {
                if (tokenObj.status == -1) {
                    cb.call(cbTarget, false);
                    EgretH5Sdk.login(function (tokenObj1) {
                        self._sdkData = [tokenObj1.token];
                        self.name = tokenObj1.name;
                        self.iconPath = tokenObj1.pic;
                        loginGame(self._sdkData, cb, cbTarget);
                    }, self);
                }
                else {
                    self._sdkData = [tokenObj.token];
                    self.name = tokenObj.name;
                    loginGame(self._sdkData, cb, cbTarget);
                }
            }, self);
        };
        __egretProto__.logout = function (cb, cbTarget) {
            var self = this;
            EgretH5Sdk.login(function (tokenObj1) {
                self._sdkData = [tokenObj1.token];
                self.name = tokenObj1.name;
                self.iconPath = tokenObj1.pic;
                loginGame(self._sdkData, cb, cbTarget);
            }, self);
        };
        __egretProto__.enterGame = function (strUser, strPwd, cb, cbTarget) {
            var self = this;
            enterGame(self._sdkData, cb, cbTarget);
        };
        __egretProto__.doAfterLogin = function (sdkData) {
            var self = this;
            self.id = sdkData[uw.dsConsts.SDKData.id];
            EgretH5Sdk.isOpenAttention(self.appId, self.id, function (result) {
                uw.log("----->id = %s, result.status] = %s", self.id, result["status"]);
                self.isOpenAttention = result["status"] == 1;
            }, self);
        };
        __egretProto__.attention = function () {
            var self = this;
            EgretH5Sdk.attention(self.appId, self.id);
        };
        /**
         * 轮询n分钟,下次轮询结束前再次设置无效
         * @param interval 检查间隔(秒)
         * @param n 轮询n分钟
         */
        __egretProto__.startPolling = function (interval, n) {
            var self = this;
            if (!self._pollingInvId) {
                self._pollingCount = 0;
                self._pollingInvId = tm.setInterval(function () {
                    mo.request(uw.iface.a_recharge_handleRequest, function (rstArr) {
                        self._pollingCount++;
                        uw.log("----polling, rstArr: ", rstArr);
                        var needPolling = rstArr[0];
                        var reChargeId = rstArr[1];
                        if (reChargeId) {
                            uw.log("----pay succ: " + reChargeId);
                            uw.rechargeDataCtrl._rechargeFinal(reChargeId, null, null, null);
                            if (!needPolling) {
                                uw.log("----stop polling");
                                tm.clearInterval(self._pollingInvId);
                                self._pollingInvId = null;
                            }
                        }
                        // 轮询超过n分钟了则停止轮询
                        if (self._pollingCount >= (n * 60 * 1000 / interval) && !needPolling) {
                            uw.log("----stop polling time out");
                            tm.clearInterval(self._pollingInvId);
                            self._pollingInvId = null;
                        }
                    });
                }, interval * 1000); //每隔interval秒检查一次，总共检查n分钟
            }
        };
        __egretProto__.pay = function (rechargeId, cb, target) {
            var self = this;
            var argsKey = uw.iface.a_recharge_getRequest_args;
            var args = {};
            args[argsKey.rechargeId] = rechargeId;
            mo.request(uw.iface.a_recharge_getRequest, args, function (requestId) {
                uw.log("---->requestId" + requestId);
                var serverId = mo.getLocalStorageItem(uw.Keys.curServerId, true);
                var pInfo = {
                    uId: self.id,
                    appId: self.appId,
                    goodsId: rechargeId,
                    goodsNumber: 1,
                    serverId: serverId,
                    ext: requestId
                };
                EgretH5Sdk.pay(pInfo);
                self.startPolling(10, 20); //每10秒轮询一次, 最长轮询20分钟
                mo.stopWaiting();
            });
        };
        return EgretRuntime;
    })(BaseChannel);
    EgretRuntime.prototype.__class__ = "channelCfg.EgretRuntime";
    channelMap[channelCfg.key.egret] = EgretRuntime;
    /**
     * Egret Runtime 腾讯的渠道
     */
    var EgretRuntimeTencent = (function (_super) {
        __extends(EgretRuntimeTencent, _super);
        function EgretRuntimeTencent() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EgretRuntimeTencent.prototype;
        __egretProto__.login = function (cb, cbTarget, option) {
            var self = this;
            nest.user.checkLogin(option, function (tokenObj) {
                var loginInfo = {};
                self.option = option || loginInfo;
                mo.log("tokenObj.status=====" + tokenObj.status);
                if (tokenObj.status == -1) {
                    cb.call(cbTarget, false);
                    mo.log("ssssssasasasasasasasasaasas");
                    nest.user.login(self.option, function (tokenObj1) {
                        mo.log("tokenObj1tokenObj1tokenObj1");
                        self._sdkData = [tokenObj1.token];
                        self.name = tokenObj1.name;
                        self.iconPath = tokenObj1.pic;
                        loginGame(self._sdkData, cb, cbTarget);
                    });
                }
                else {
                    self._sdkData = [tokenObj.token];
                    self.name = tokenObj.name;
                    loginGame(self._sdkData, cb, cbTarget);
                }
            });
        };
        __egretProto__.logout = function (cb, cbTarget) {
            var self = this;
            nest.user.login(self.option, function (tokenObj1) {
                self._sdkData = [tokenObj1.token];
                self.name = tokenObj1.name;
                self.iconPath = tokenObj1.pic;
                loginGame(self._sdkData, cb, cbTarget);
            });
        };
        __egretProto__.attention = function () {
            var self = this;
        };
        __egretProto__.pay = function (rechargeId, cb, target) {
            var self = this;
            var argsKey = uw.iface.a_recharge_getRequest_args;
            var args = {};
            args[argsKey.rechargeId] = rechargeId;
            mo.request(uw.iface.a_recharge_getRequest, args, function (requestId) {
                uw.log("---->requestId" + requestId);
                var serverId = mo.getLocalStorageItem(uw.Keys.curServerId, true);
                var pInfo = {
                    uId: self.id,
                    appId: self.appId,
                    goodsId: rechargeId,
                    goodsNumber: 1,
                    serverId: serverId,
                    ext: requestId
                };
                nest.iap.pay(pInfo, function () {
                });
                self.startPolling(10, 20); //每10秒轮询一次, 最长轮询20分钟
                mo.stopWaiting();
            });
        };
        return EgretRuntimeTencent;
    })(EgretRuntime);
    EgretRuntimeTencent.prototype.__class__ = "channelCfg.EgretRuntimeTencent";
    channelMap[channelCfg.key.egretTencent] = EgretRuntimeTencent;
    /**
     * 苹果商店渠道
     */
    var AppleStore = (function (_super) {
        __extends(AppleStore, _super);
        function AppleStore() {
            _super.apply(this, arguments);
            this.defaultUI = false;
            this.isValidIAP = false;
        }
        var __egretProto__ = AppleStore.prototype;
        __egretProto__.pay = function (cb, target) {
            // 获取支付信息
            //            var rechargeTemp = mo.getJSONWithFileNameAndID(uw.cfg_c_recharge, rechargeId);
            //            var payId = rechargeTemp[uw.c_recharge_payId];
            //            var payInfoTemp = mo.getJSONWithFileNameAndID(uw.cfg_c_payInfo, payId);
            //            var channelMap = uw.channelKeyMap;
            //            var productId = payInfoTemp[channelMap[channelId]][0];
            //            var sdkType = mo.StoreKit.ANY_SDK;
            //            if(channelId == 1){
            //                sdkType = mo.StoreKit.APP_STORE;
            //            }
            //            // 指定支付类型
            //            var sKit = mo.StoreKit.getInstance(sdkType);
            //            sKit.onPayResult(function(ret, product, receipt){
            //                log("Pay result = %s", ret, product[sKit.Product_Id]);
            //                mo.stopWaiting();
            //                switch (ret) {
            //                    case sKit.PAY_SUCC:
            //                        self._rechargeFinal(rechargeId, receipt, cb, target);
            //                        break;
            //                    case sKit.PAY_FAILED:
            //                        if(cb) cb.call(target, false);
            //                        break;
            //                }
            //            }, self);
            //            sKit.pay(mo.StoreKit.crateProduct(productId));
        };
        return AppleStore;
    })(BaseChannel);
    AppleStore.prototype.__class__ = "channelCfg.AppleStore";
    channelMap[channelCfg.key.appleStore] = AppleStore;
})(channelCfg || (channelCfg = {}));
