/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var HomeMenuLayer = (function (_super) {
        __extends(HomeMenuLayer, _super);
        function HomeMenuLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HomeMenuLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHomeMenuLayer_ui;
            self._isMenuFolding = false;
            self._isMenuFold = false;
        };
        //@override
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self._menuBg = self.getWidgetByName("menuBg");
            self._btnFold = self.getWidgetByName("btnFold");
            self._btnFold.onClick(self.menuFold, self, null, 105);
            //设置转圈圈的动画哦亲
            var mainMenuSize = self._btnFold.getSize();
            var armature = self._mainMenuArm = uw.uiArmFactory.produce(res.cca_ui.mainMenu);
            armature.setPosition(mainMenuSize.width / 2, mainMenuSize.height / 2);
            armature.setMovementEventCallFunc(self._armMovementFunc, self);
            armature.setScale(1.3);
            self._btnFold.addChild(armature);
            self.initBtn();
            self.resetBtnState();
        };
        /**
         * 初始化按钮
         */
        __egretProto__.initBtn = function () {
            var btn, self = this;
            var unlockModules = uw.subModuleDataCtrl.unlockModules;
            for (var key in unlockModules) {
                var group = unlockModules[key];
                for (var i = 0; i < group.length; i++) {
                    var unlockMod = group[i];
                    btn = self.getWidgetByName(unlockMod.moduleId);
                    if (btn) {
                        btn.onClick(self.menuAddModule, self);
                    }
                }
            }
            var lockModules = uw.subModuleDataCtrl.lockModules;
            for (var i = 0; i < lockModules.length; i++) {
                var unlockMod = lockModules[i];
                btn = self.getWidgetByName(unlockMod.moduleId);
                if (btn) {
                    btn.setVisible(false);
                    btn.setTouchEnabled(false);
                    btn.onClick(self.menuAddModule, self);
                }
            }
        };
        __egretProto__.unlockModules = function () {
            var self = this;
            //找出哪些模块准备要开启了
            var willOpenArr = self._willOpenArr = uw.subModuleDataCtrl.findUnlockMenuModules();
            //在系统菜单按键要开始能飞的时候，需要发送监听
            mo.dispatchEvent([[mo.actionDispatcher, gEventType.beginOpenSysBtns]], function () {
                //如果菜单是收着的就展开
                if (willOpenArr.length > 0 && !self._isMenuFold) {
                    self.menuFold();
                    mo.schedule(self._showModuleOpenAction, self, 1000);
                    mo.Mask.getInstance().show();
                }
            }, self);
        };
        __egretProto__._showModuleOpenAction = function () {
            var self = this;
            if (self._willOpenArr && self._willOpenArr.length > 0) {
                var willOpenData = self._willOpenArr.pop();
                uw.subModuleDataCtrl.unlockByModules([willOpenData]);
                var subMod = self.getWidgetByName(willOpenData.moduleId);
                var center = mo.visibleRect.center();
                var pos = subMod.getParent().globalToLocal(center.x, center.y);
                subMod.setPosition(pos);
                subMod.setVisible(true);
                subMod.setOpacity(0);
                var data, seq, deltaPos;
                if (willOpenData.posType == uw.PosType.Bottom) {
                    deltaPos = mo.p(-260, 0);
                }
                else if (willOpenData.posType == uw.PosType.BottomRight) {
                    deltaPos = mo.p(0, -260);
                }
                else if (willOpenData.posType == uw.PosType.Left) {
                    deltaPos = mo.p(0, 230);
                }
                seq = mo.sequence(mo.delayTime(1.6), mo.moveBy(0.2, deltaPos).setEase(mo.Ease.sineOut));
                var btn, group = uw.subModuleDataCtrl.unlockModules[willOpenData.posType];
                for (var i = 0; i < group.length; i++) {
                    data = group[i];
                    if (data.index < willOpenData.index) {
                        btn = self.getWidgetByName(data.moduleId);
                        btn.runAction(seq.clone());
                    }
                }
                var ctrl = uw.UpArmatureWithBegin.play(subMod, res.cca_ui.openModule, null);
                ctrl.getArmature().setZOrder(-9999);
                var index = group.indexOf(willOpenData), originPos;
                if (group[index - 1]) {
                    originPos = self.getPositionByName(group[index - 1].moduleId);
                }
                else {
                    originPos = mo.pAdd(self.getPositionByName(group[1].moduleId), deltaPos);
                }
                seq = mo.sequence(mo.fadeIn(0.3), mo.delayTime(1), mo.jumpTo(0.5, originPos, -300, 1).setEase(mo.Ease.sineOut), mo.callFunc(function (sender) {
                    sender.setTouchEnabled(true);
                    ctrl.getArmature().removeFromParent(true);
                }, self));
                subMod.runAction(seq);
            }
            else {
                mo.unschedule(self._showModuleOpenAction, self);
                uw.fightUtils.delayCall(1, function () {
                    //新的系统按键飞出后的事件触发，引导需要用到 zxj
                    mo.dispatchEvent([[mo.actionDispatcher, gEventType.openSysBtns]], function () {
                        mo.Mask.getInstance().close();
                    }, self);
                }, self);
            }
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            this.resetBtnState();
        };
        /**
         * 充值按钮的位置
         */
        __egretProto__.resetBtnState = function () {
            var self = this;
            self._isMenuFold = false;
            var unlockModules = uw.subModuleDataCtrl.unlockModules;
            //左边
            var btn, data, originPos = mo.p(96, 107);
            group = unlockModules[uw.PosType.Left];
            for (var i = 0, len = group.length; i < len; i++) {
                data = group[i];
                btn = self.getWidgetByName(data.moduleId);
                btn.setPosition(mo.pAdd(originPos, mo.p(0, (len - i - 1) * 230)));
            }
            //右下角的
            var size = self._btnFold.getSize();
            var centerPos = mo.p(size.width / 2, -size.height / 2);
            var originPos = mo.pAdd(self._btnFold.getPosition(), centerPos);
            var group = unlockModules[uw.PosType.Bottom];
            for (var i = 0, len = group.length; i < len; i++) {
                data = group[i];
                btn = self.getWidgetByName(data.moduleId);
                btn.setPosition(mo.pSub(originPos, mo.p(0, 20)));
                btn.setTouchEnabled(false);
                btn.setOpacity(0);
            }
            group = unlockModules[uw.PosType.BottomRight];
            for (i = 0, len = group.length; i < len; i++) {
                data = group[i];
                btn = self.getWidgetByName(data.moduleId);
                btn.setPosition(originPos);
                btn.setTouchEnabled(false);
                btn.setOpacity(0);
            }
            this._menuBg.setOpacity(0);
            //todo           this._mainMenuArm.stopWithIndex(0);
        };
        __egretProto__._armMovementFunc = function (armature, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                var self = this;
                if (!self._isMenuFold) {
                    //触发拓展按键打开的事件，引导需要用到 zxj
                    var aed = mo.actionDispatcher;
                    if (aed.willTrigger(gEventType.homeFoldMenuOpen)) {
                        var event = new mo.Event(gEventType.homeFoldMenuOpen);
                        aed.dispatchEvent(event);
                    }
                }
                self._isMenuFold = movementID == "open";
                self._isMenuFolding = false;
            }
        };
        __egretProto__.menuFold = function () {
            var self = this;
            if (self._isMenuFolding)
                return;
            var seq, minus, opacity, opacity1, bool, btn;
            self._isMenuFolding = true;
            if (self._isMenuFold) {
                minus = 1;
                opacity = 0;
                opacity1 = 0;
                bool = true;
                self.setVisibleByName(HomeMenuLayer.NEW_MENU, self._isNewMenu);
                this._mainMenuArm.play("close");
            }
            else {
                minus = -1;
                opacity = 255;
                opacity1 = 100;
                bool = false;
                self.setVisibleByName(HomeMenuLayer.NEW_MENU, false);
                this._mainMenuArm.play("open");
            }
            var time = 0.5;
            //隐藏渐变底色
            seq = mo.fadeTo(time, opacity1);
            self._menuBg.runAction(seq);
            var unlockModules = uw.subModuleDataCtrl.unlockModules;
            //移动左下按钮
            var group = unlockModules[uw.PosType.Bottom];
            var n = group.length, data;
            for (var i = 0; i < n; i++) {
                data = group[i];
                btn = self.getWidgetByName(data.moduleId);
                btn.setVisible(true);
                seq = mo.sequence(mo.spawn(mo.moveBy(time, mo.p(minus * 260 * (n - i), 0)).setEase(mo.Ease.sineOut), mo.fadeTo(time, opacity)), mo.callFunc(function (sender) {
                    sender.setTouchEnabled(!bool);
                    sender.setVisible(!bool);
                }.bind(self)));
                btn.runAction(seq);
            }
            //移动右下按钮
            group = unlockModules[uw.PosType.BottomRight];
            var m = group.length;
            for (var j = 0; j < m; j++) {
                data = group[j];
                btn = self.getWidgetByName(data.moduleId);
                btn.setVisible(true);
                seq = mo.sequence(mo.spawn(mo.moveBy(time, mo.p(0, minus * 260 * (m - j))).setEase(mo.Ease.sineOut), mo.fadeTo(time, opacity)), mo.callFunc(function (sender) {
                    sender.setTouchEnabled(!bool);
                    sender.setVisible(!bool);
                }.bind(self)));
                btn.runAction(seq);
            }
        };
        __egretProto__.updateState = function (stateObj) {
            var self = this;
            //右下角
            var isNewMail = stateObj.isMailRed;
            var isNewHero = stateObj.isHeroRed;
            var isNewMix = stateObj.isMergeRed;
            self._isNewMenu = isNewMail || isNewHero || isNewMix;
            self.setVisibleByName(HomeMenuLayer.NEW_HERO, isNewHero);
            self.setVisibleByName(HomeMenuLayer.NEW_MIX, isNewMix);
            self.setVisibleByName(HomeMenuLayer.NEW_SECRET, false);
            self.setVisibleByName(HomeMenuLayer.NEW_MAIL, isNewMail);
            self.setVisibleByName(HomeMenuLayer.NEW_MENU, self._isNewMenu);
            //右上角
            var isNewTask = !!stateObj.isTaskRed;
            var isNewDaily = !!stateObj.isDailyTaskRed;
            var isNewSign = !!stateObj.isSignRed;
            self.setVisibleByName(HomeMenuLayer.NEW_TASK, isNewTask);
            self.setVisibleByName(HomeMenuLayer.NEW_DAILY, isNewDaily);
            self.setVisibleByName(HomeMenuLayer.NEW_SIGN, isNewSign);
            //运营活动
            var isFirstRechargeRed = stateObj.isFirstRechargeRed;
            var isSevenLoginRed = stateObj.isSevenLoginRed;
            var isWonderfulEventRed = stateObj.isWonderfulEventRed;
            /*self.setVisibleByName(HomeMenuLayer.NEW_FIRST_RECHARGE, isFirstRechargeRed);
            self.setVisibleByName(HomeMenuLayer.NEW_SEVEN_DAY, isSevenLoginRed);
            self.setVisibleByName(HomeMenuLayer.NEW_WONDERFUL, isWonderfulEventRed);*/
            //todo 1测时候去掉红点，因为有bug
            self.setVisibleByName(HomeMenuLayer.NEW_FIRST_RECHARGE, false);
            self.setVisibleByName(HomeMenuLayer.NEW_SEVEN_DAY, false);
            self.setVisibleByName(HomeMenuLayer.NEW_WONDERFUL, false);
            if (!isFirstRechargeRed) {
                var btn = self.getWidgetByName(HomeMenuLayer.BTN_EVENT_FIRST_RECHARGE);
                if (btn)
                    btn.removeFromParent(true);
            }
            if (!isSevenLoginRed) {
                var btn = self.getWidgetByName(HomeMenuLayer.BTN_EVENT_SEVEN_DAY);
                if (btn)
                    btn.removeFromParent(true);
            }
        };
        HomeMenuLayer.__className = "HomeMenuLayer";
        HomeMenuLayer.MASK = "mask";
        HomeMenuLayer.NEW_HERO = "newHero";
        HomeMenuLayer.NEW_MIX = "newMix";
        HomeMenuLayer.NEW_SECRET = "newSecret";
        HomeMenuLayer.NEW_MAIL = "newMail";
        HomeMenuLayer.NEW_MENU = "newMenu";
        HomeMenuLayer.NEW_TASK = "newTask";
        HomeMenuLayer.NEW_DAILY = "newDaily";
        HomeMenuLayer.NEW_SIGN = "newSign";
        HomeMenuLayer.NEW_FIRST_RECHARGE = "newFirstCharge";
        HomeMenuLayer.NEW_SEVEN_DAY = "newSeven";
        HomeMenuLayer.NEW_WONDERFUL = "newWonderful";
        HomeMenuLayer.BTN_EVENT_FIRST_RECHARGE = "btnEventFirstRecharge";
        HomeMenuLayer.BTN_EVENT_SEVEN_DAY = "btnEventSevenDay";
        return HomeMenuLayer;
    })(uw.HomeBaseLayer);
    uw.HomeMenuLayer = HomeMenuLayer;
    HomeMenuLayer.prototype.__class__ = "uw.HomeMenuLayer";
})(uw || (uw = {}));
