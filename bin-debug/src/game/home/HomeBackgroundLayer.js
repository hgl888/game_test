/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var HomeBackgroundLayer = (function (_super) {
        __extends(HomeBackgroundLayer, _super);
        function HomeBackgroundLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HomeBackgroundLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHomeBackgroundLayer_ui;
            self._isInitPos = false;
            self._isSecretShopOpen = false;
            self._buildingArmMap = {};
        };
        //@override
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._light = mo.UIImage.create();
            self._light.loadTexture(res.ui_homebg.ntc_selectbud_png);
            self._light.setVisible(false);
            self._touchLayer = self.getWidgetByName("touchLayer");
            self.setVisibleByName(uw.SubModule.Merchant, false);
            var allBuildingModules = uw.subModuleDataCtrl.getAllBuildingModules(), armature, data, bd, titleWidget, titleBgWidget;
            for (var i = 0; i < allBuildingModules.length; i++) {
                data = allBuildingModules[i];
                bd = self.getWidgetByName(data.moduleId);
                var TE = mo.TouchEvent;
                bd.addEventListener(TE.NODE_BEGIN, self.menuAddModule4Display, self);
                bd.addEventListener(TE.NODE_END, self.menuAddModule4Display, self);
                bd.onClick(self.menuAddModule, self);
                bd.bgOpacity = 0;
                armature = uw.uiArmFactory.produce(data.armName);
                armature.playWithIndex(0);
                armature.setPosition(data.pos.x, bd.height - data.pos.y);
                armature.setZOrder(1);
                bd.addChild(armature);
                self._buildingArmMap[data.moduleId] = armature;
                var isUnLock = uw.subModuleDataCtrl.checkUnlock(data);
                titleWidget = bd.getWidgetByName("title");
                titleBgWidget = bd.getWidgetByName("titleBg");
                titleWidget.setVisible(isUnLock);
                titleBgWidget.setVisible(isUnLock);
            }
        };
        __egretProto__.getArmByBuildingName = function (armName) {
            return this._buildingArmMap[armName];
        };
        __egretProto__.scrollBuildingToCenter = function (bName, isJump, cb, target) {
            var building = this.getWidgetByName(bName);
            var buildingPos = building.getPosition();
            var percent = 0 | (buildingPos.x / this._touchLayer.getSize().width * 100);
            this._scrollBuilding(percent, isJump, cb, target);
        };
        __egretProto__._scrollBuilding = function (percent, isJump, cb, target) {
            var touchLayer = this._touchLayer;
            if (isJump) {
                touchLayer.jumpToPercentHorizontal(percent);
                if (cb)
                    process.nextTick(cb, target);
            }
            else {
                touchLayer.scrollToPercentHorizontal(percent, 0.5, true);
                if (cb) {
                    uw.fightUtils.delayCall(0.5, cb, target);
                }
            }
        };
        __egretProto__.setScrollEnabled = function (enabled) {
            var touchLayer = this._touchLayer;
            touchLayer.setTouchEnabled(enabled);
        };
        __egretProto__.menuAddModule4Display = function (event) {
            var menuItem = event.target;
            var type = event.type;
            if (type == mo.TouchEvent.NODE_BEGIN) {
                var size = menuItem.getSize();
                this._light.setVisible(true);
                this._light.setPosition(size.width / 2, size.height / 2);
                menuItem.addChild(this._light);
                this._light.setZOrder(-1);
            }
            else {
                this._light.setVisible(false);
                this._light.removeFromParent(false);
            }
        };
        __egretProto__.menuAddModule = function (menuItem) {
            mo.playUIAudio(mo.audioIdOnClick);
            _super.prototype.menuAddModule.call(this, menuItem);
        };
        __egretProto__.unlockModules = function () {
            var self = this;
            var buildingModules = uw.subModuleDataCtrl.findUnlockBuildingModules();
            uw.subModuleDataCtrl.unlockByModules(buildingModules);
            async.mapLimit(buildingModules, 1, function (data, index, cb) {
                self.unlockModuleByData(data);
                cb(null);
            }, function (err, results) {
            });
        };
        __egretProto__.unlockModuleByData = function (data) {
            var self = this;
            var bName = data.moduleId;
            if (bName == uw.SubModule.SecretShop)
                return; //如果是神秘商店不解锁
            self.scrollBuildingToCenter(bName, false, function () {
                var bd = self.getWidgetByName(bName);
                var titleWidget = bd.getWidgetByName("title");
                var titleBgWidget = bd.getWidgetByName("titleBg");
                //播放开启模块的动画
                var size = titleBgWidget.getSize();
                var pos = titleBgWidget.getPosition();
                pos = mo.p(pos.x - size.width / 2, pos.y + size.height / 2);
                var ctrl = uw.UpArmature.playWithEvent(bd, res.cca_ui.showBuildingTitle, pos, "event", function () {
                    titleWidget.setVisible(true);
                    titleBgWidget.setVisible(true);
                    mo.showMsg(uw.id_c_msgCode.openModule, data.moduleName);
                    bd.open = true;
                }, self);
                ctrl.getArmature().setZOrder(999);
            }, self);
        };
        __egretProto__.onExit = function () {
            var self = this;
            _super.prototype.onExit.call(this);
            var armMap = this._buildingArmMap;
            for (var key in armMap) {
                var arm = armMap[key];
            }
        };
        __egretProto__.onEnter = function () {
            var self = this;
            if (!self._isInitPos) {
                self._isInitPos = true;
                self.scrollBuildingToCenter(uw.SubModule.Copy, true);
            }
            _super.prototype.onEnter.call(this);
            var armMap = this._buildingArmMap;
            for (var key in armMap) {
                var arm = armMap[key];
            }
        };
        __egretProto__.updateState = function (stateObj) {
            var self = this;
            var isNewLottery = !!stateObj.isLotteryRed;
            self.setVisibleByName(HomeBackgroundLayer.NEW_LOTTERY, isNewLottery);
            //更新神秘商店信息
            self._checkSecretShop();
        };
        /** 处理神秘商店 **/
        __egretProto__._checkSecretShop = function () {
            var self = this;
            var bd = self.getWidgetByName(uw.SubModule.Merchant);
            //常在
            var secretShop1OffenIn = uw.shopDataCtrl.secretShop1OffenIn();
            if (secretShop1OffenIn) {
                self._playSecretShopAppearEffect();
                return;
            }
            /*是否播放神秘商店出现的动画
             * 1.如果播放过了，就不再播放
             * 2.如果神秘商店已经出现，则不再播放*/
            var s1Appeared = uw.shopDataCtrl.traderStatus[uw.c_prop.shopTypeKey.secret1];
            var s2Appeared = uw.shopDataCtrl.traderStatus[uw.c_prop.shopTypeKey.secret2];
            var hasSecretShop = uw.shopDataCtrl.hasSecretShop();
            //神秘商人入口已经打开
            if (s1Appeared) {
                if (self._inv1)
                    mo.timer.removeInvocation(self._inv1);
                self._inv1 = mo.timer.countdownToEndTime(uw.shopDataCtrl.getDisappearTime(uw.c_prop.shopTypeKey.secret1), null, null, function () {
                    uw.log("--->神秘商店1消失了");
                    uw.shopDataCtrl.traderStatus[uw.c_prop.shopTypeKey.secret1] = false;
                    self._inv1 = null;
                    mo.showMsg(uw.id_c_msgCode.traderLeft, uw.ShopDataCtrl.TRADER_01);
                }, self);
            }
            if (s2Appeared) {
                if (self._inv2)
                    mo.timer.removeInvocation(self._inv2);
                self._inv2 = mo.timer.countdownToEndTime(uw.shopDataCtrl.getDisappearTime(uw.c_prop.shopTypeKey.secret2), null, null, function () {
                    uw.log("--->神秘商店2消失了");
                    uw.shopDataCtrl.traderStatus[uw.c_prop.shopTypeKey.secret2] = false;
                    self._inv2 = null;
                    mo.showMsg(uw.id_c_msgCode.traderLeft, uw.ShopDataCtrl.TRADER_02);
                }, self);
            }
            //检查是否需要播放打开特效
            if (hasSecretShop) {
                self._playSecretShopAppearEffect();
            }
            else {
                bd.setVisible(false);
            }
        };
        __egretProto__._playSecretShopAppearEffect = function () {
            var self = this;
            var bd = self.getWidgetByName(uw.SubModule.Merchant);
            var arm = self.getArmByBuildingName(uw.SubModule.Merchant);
            /*是否播放神秘商店出现的动画
             * 1.如果播放过了，就不再播放
             * 2.如果神秘商店已经出现，则不再播放*/
            var played1 = mo.getLocalStorageItem(HomeBackgroundLayer.KEY_IS_PLAYED_SECRET1);
            var played2 = mo.getLocalStorageItem(HomeBackgroundLayer.KEY_IS_PLAYED_SECRET2);
            var played = played1 || played2;
            if (played) {
                return bd.setVisible(true);
            }
            //保存播放状态
            mo.setLocalStorageItem(HomeBackgroundLayer.KEY_IS_PLAYED_SECRET1, uw.shopDataCtrl.secretShop1Exist());
            mo.setLocalStorageItem(HomeBackgroundLayer.KEY_IS_PLAYED_SECRET2, uw.shopDataCtrl.secretShop2Exist());
            var pos = mo.pAdd(bd.getPosition(), mo.p(160, -60));
            self.scrollBuildingToCenter(uw.SubModule.Merchant, false, function () {
                var ctrl = uw.UpArmature.playWithEvent(self._touchLayer, res.cca_ui.showSecretShop, pos, "event", function (ctrl, upArm) {
                    bd.setOpacity(0);
                    bd.setVisible(true);
                    bd.runAction(mo.fadeIn(1));
                    arm.setOpacity(0);
                    arm.runAction(mo.fadeIn(1));
                    uw.log("神秘商人出现啦~");
                }, self);
                ctrl.getArmature().setZOrder(999);
            }, self);
        };
        /** 停止监听神秘商店 **/
        __egretProto__.stopSecretShopCountDown = function () {
            var self = this;
            uw.log("stopSecretShopCountDown---->");
            if (self._inv1) {
                mo.timer.removeInvocation(self._inv1);
                self._inv1 = null;
            }
            if (self._inv2) {
                mo.timer.removeInvocation(self._inv2);
                self._inv2 = null;
            }
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            self.stopSecretShopCountDown();
        };
        HomeBackgroundLayer.__className = "HomeBackgroundLayer";
        HomeBackgroundLayer.NEW_LOTTERY = "newLottery";
        HomeBackgroundLayer.KEY_IS_PLAYED_SECRET1 = "key_isPlayedSecretShopArm1";
        HomeBackgroundLayer.KEY_IS_PLAYED_SECRET2 = "key_isPlayedSecretShopArm2";
        return HomeBackgroundLayer;
    })(uw.HomeBaseLayer);
    uw.HomeBackgroundLayer = HomeBackgroundLayer;
    HomeBackgroundLayer.prototype.__class__ = "uw.HomeBackgroundLayer";
})(uw || (uw = {}));
