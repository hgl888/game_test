/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var HomeScene = (function (_super) {
        __extends(HomeScene, _super);
        function HomeScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HomeScene.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.isLevelUp = false;
            self._isShowBackLayer = false;
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.bgLayer.show();
            self.uiLayer.show();
            self.menuLayer.show();
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            //背景
            self.bgLayer = uw.HomeBackgroundLayer.create();
            self.bgLayer.setDelegate(self);
            //头像
            self.uiLayer = uw.HomeUILayer.create();
            self.uiLayer.setDelegate(self);
            //UI层
            self.menuLayer = uw.HomeMenuLayer.create();
            self.menuLayer.setDelegate(self);
            // 注册升级结果回调
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.lvl, function () {
                self.isLevelUp = true;
                uw.checkLeaderLevelUp();
            });
            //初始化升级界面
            uw.HomeLevelUpLayer.getInstance();
            //返回主城界面时候回调这个，包括打开任务栏这种弹窗的关闭
            var dispatcher = mo.visibleDispatcher, eventType = uw.HomeBackgroundLayer.__className;
            mo.addAfterEventListener(dispatcher, eventType, self.onBackHome, self);
            //主城界面不可见时需要停止神秘商店倒计时
            var dispatcher = mo.invisibleDispatcher, eventType = uw.HomeBackgroundLayer.__className;
            mo.addAfterEventListener(dispatcher, eventType, self.onInvisible, self);
        };
        __egretProto__.onInvisible = function () {
            var self = this;
            //停止神秘商店倒计时
            self.bgLayer.stopSecretShopCountDown();
        };
        __egretProto__.onBackHome = function () {
            var self = this;
            uw.userDataCtrl.getRedInfo(self.updateState, self);
            self.menuLayer.resetBtnState();
            self.checkUnlockModule();
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            //统计是否到了主城
            uw.RecordDataCtrl.addLoadRecord(uw.id_c_loadModule.home);
            //如果开启动作demo，直接切换
            if (mo.project.armatureDemoEnabled) {
                uw.FightDemoCtrl.enter();
            }
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            var self = this;
            //停止神秘商店倒计时
            self.bgLayer.stopSecretShopCountDown();
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            //移除监听
            uw.HomeLevelUpLayer.purgeInstance();
            var dispatcher = mo.visibleDispatcher, eventType = uw.HomeBackgroundLayer.__className;
            mo.removeAfterEventListener(dispatcher, eventType, self.onBackHome, self);
            //移除监听
            var dispatcher = mo.invisibleDispatcher, eventType = uw.HomeBackgroundLayer.__className;
            mo.removeAfterEventListener(dispatcher, eventType, self.onInvisible, self);
        };
        __egretProto__.checkUnlockModule = function () {
            var self = this;
            if (self.isLevelUp && mo.runningScene instanceof uw.HomeScene) {
                self.isLevelUp = false;
                //开启等级到了的模块
                self.bgLayer.unlockModules();
                self.menuLayer.unlockModules();
            }
        };
        __egretProto__.updateState = function (err, stateObj) {
            var self = this;
            self.menuLayer.updateState(stateObj);
            self.bgLayer.updateState(stateObj);
        };
        /**
         * 主城资源预加载。
         * @param cb
         */
        HomeScene.preload = function (cb) {
            uw.UserDataCtrl.initByServer(function () {
                uw.SubModuleDataCtrl.initSubModule();
                var resIds = [], armName;
                var moduleConfig = uw.ModuleConfig;
                var data;
                for (var i = 0; i < moduleConfig.length; i++) {
                    data = moduleConfig[i];
                    armName = data.armName;
                    if (armName) {
                        resIds.push(armName);
                    }
                }
                //引导妹
                resIds.push(res.cca_ui.npc);
                //主菜单动画
                resIds.push(res.cca_ui.mainMenu);
                uw.uiArmFactory.preload(resIds, cb);
            });
        };
        HomeScene.__className = "HomeScene";
        return HomeScene;
    })(uw.ModuleScene);
    uw.HomeScene = HomeScene;
    HomeScene.prototype.__class__ = "uw.HomeScene";
})(uw || (uw = {}));
