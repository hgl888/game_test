var uw;
(function (uw) {
    var IndexScene = (function (_super) {
        __extends(IndexScene, _super);
        function IndexScene() {
            _super.apply(this, arguments);
            this._autoEnterGame = false;
            this._isLoginSucc = false;
        }
        var __egretProto__ = IndexScene.prototype;
        __egretProto__.show = function () {
            var self = this;
            self.indexLayer = uw.IndexLayer.create();
            self.indexLayer.setDelegate(this);
            self.indexLayer.show();
            self.requestChannel();
        };
        __egretProto__.requestChannel = function () {
            var self = this;
            self.indexLayer.resetNotLoginLayout();
            //todo self.indexLayer.canStart(false);
            self.requestTimeOut();
            var channelInfo = channelCfg.getCurChannel();
            channelInfo.login(function (succ, data) {
                if (self._isLoginSucc)
                    return;
                self.clearRequestTimeOut();
                if (succ) {
                    self._isLoginSucc = true;
                    self.onLoginSucc(data);
                    self.indexLayer.resetLoginedLayout();
                }
                else {
                }
            });
        };
        __egretProto__.requestTimeOut = function () {
            var self = this;
            mo.playWaiting();
            if (self._timerId == null) {
                self._timerId = tm.setTimeout(function () {
                    self.clearRequestTimeOut();
                    mo.showMsg("请求超时了，请重新登录!");
                }, 10000);
            }
        };
        __egretProto__.clearRequestTimeOut = function () {
            var self = this;
            if (self._timerId != null) {
                mo.stopWaiting();
                //todo self.indexLayer.canStart(true);
                tm.clearTimeout(self._timerId);
                self._timerId = null;
            }
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            //统计是否完成登陆/授权页面
            uw.RecordDataCtrl.addLoadRecord(uw.id_c_loadModule.login);
            mo.playMusicById(res.audio_ui.bg_home, true);
            mo.setMusicVolume(0.3);
        };
        __egretProto__.showSelectServerLayer = function () {
            var self = this;
            uw.serverDataCtrl.updateMyServerList(function () {
                var indexSelectServerLayer = uw.IndexSelectServerLayer.create();
                indexSelectServerLayer.setDelegate(this);
                indexSelectServerLayer.show();
            });
        };
        __egretProto__.onLoginSucc = function (data) {
            var channelInfo = channelCfg.getCurChannel();
            if (channelInfo.doAfterLogin) {
                var sdkData = data[uw.dsConsts.LoginData.sdkData];
                channelInfo.doAfterLogin(sdkData);
            }
            //记住已经登陆过了和用户密码
            var accountData = data[uw.dsConsts.LoginData.account];
            var accountEntity = uw.dsConsts.AccountEntity;
            var strUser = accountData[accountEntity.name];
            var strPwd = accountData[accountEntity.pwd];
            var userServers = accountData[accountEntity.userServers];
            if (userServers) {
                uw.serverDataCtrl.setMyServerIds(userServers);
            }
            if (this._autoEnterGame) {
                this.enterGame(strUser, strPwd);
            }
        };
        __egretProto__.enterGame = function (strUser, strPwd) {
            var self = this;
            if (self._isLoginSucc) {
                uw.net.asyncAccount(strUser, strPwd, this.onEnterGameSucc, true);
            }
            else {
                this._autoEnterGame = true;
                self.requestChannel();
            }
        };
        __egretProto__.onEnterGameSucc = function (user) {
            var self = this;
            if (!user) {
                mo.sceneMgr.runScene(uw.FilmScene, mo.SceneMgr.LOADING_TYPE_ARMATURE, function (err, scene) {
                    if (mo.project.fightSimulateEnabled) {
                        scene.showMovie();
                    }
                    else {
                        scene.showCreateRole();
                    }
                });
            }
            else {
                //进入主城
                mo.sceneMgr.runScene(uw.HomeScene, mo.SceneMgr.LOADING_TYPE_ARMATURE, function () {
                });
            }
        };
        __egretProto__.logout = function () {
            var self = this;
            self._isLoginSucc = false;
            self.indexLayer.resetNotLoginLayout();
            //todo self.indexLayer.canStart(false);
            var channelInfo = channelCfg.getCurChannel();
            channelInfo.logout(function (succ, data) {
                self._isLoginSucc = true;
                self.onLoginSucc(data);
                //todo self.indexLayer.canStart(true);
                self.indexLayer.resetLoginedLayout();
            }, self);
        };
        IndexScene.preload = function (cb) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            uw.ServerDataCtrl.initByServer(cb);
        };
        IndexScene.__className = "IndexScene";
        return IndexScene;
    })(mo.Scene);
    uw.IndexScene = IndexScene;
    IndexScene.prototype.__class__ = "uw.IndexScene";
})(uw || (uw = {}));
