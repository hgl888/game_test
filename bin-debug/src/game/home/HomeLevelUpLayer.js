/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var HomeLevelUpLayer = (function (_super) {
        __extends(HomeLevelUpLayer, _super);
        function HomeLevelUpLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HomeLevelUpLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHomeLevelUpLayer_ui;
            self._oldLordLevel = 0;
            self._oldMaxPower = 0;
            self._oldHeroMaxLevel = 0;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self.setZOrder(9999999);
            self.onClickByName("btnClose", self.close, self);
            self.setOldInfo();
        };
        __egretProto__._onClose = function () {
            var self = this;
            //激活秘术
            var initIds = uw.userDataCtrl.getLastOpenSecret();
            uw.userDataCtrl.catchSecretChangeBegin();
            for (var i = 0, li = initIds.length; i < li; i++) {
                uw.userDataCtrl.catchSecretChange(new uw.SecretChangeData(initIds[i], false));
            }
            var data = uw.userDataCtrl.getSecretChangeData();
            if (data.length > 0) {
                mo.addAfterEventListener(self, gEventType.invisible, function (event) {
                    var func = arguments.callee;
                    //现在游戏设定一次只会激活一个秘术
                    uw.SecretTipsDlg.create(data[0]).show();
                    mo.removeAfterEventListener(self, gEventType.invisible, func, self);
                }, self);
            }
            _super.prototype._onClose.call(this);
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            self._attr1 = self.getWidgetByName("attr1");
            self._attr2 = self.getWidgetByName("attr2");
            self._attr3 = self.getWidgetByName("attr3");
            self._attr4 = self.getWidgetByName("attr4");
            self._unlock = self.getWidgetByName("unlock");
            self._attr1.setOpacity(0);
            self._attr2.setOpacity(0);
            self._attr3.setOpacity(0);
            self._attr4.setOpacity(0);
            self._unlock.setOpacity(0);
            self.showTitle();
            self.unlockModule();
        };
        __egretProto__.onExit = function () {
            var self = this;
            _super.prototype.onExit.call(this);
            var titleWidget = self.getWidgetByName("title");
            titleWidget.removeChildren();
        };
        __egretProto__.showTitle = function () {
            var self = this;
            var titleWidget = self.getWidgetByName("title");
            uw.UpArmatureWithBegin.play(titleWidget, res.cca_ui.LevelUp, null, function () {
                self.refresh();
            }, self);
        };
        __egretProto__.refresh = function () {
            var self = this;
            var userInfo = uw.userDataCtrl;
            var levelUpHp = uw.calUpStrength(userInfo.getLvl());
            var curStrength = userInfo.getStrength();
            self.setInfoByName("oldLordLevel", this._oldLordLevel);
            self.setInfoByName("oldMaxPower", this._oldMaxPower);
            self.setInfoByName("oldHeroMaxLevel", this._oldHeroMaxLevel);
            self.setInfoByName("oldCurStrength", curStrength - levelUpHp);
            self.setInfoByName("newLordLevel", userInfo.getLvl());
            self.setInfoByName("newMaxPower", userInfo.getMaxStrength());
            self.setInfoByName("newHeroMaxLevel", userInfo.getHeroExpLimit());
            self.setInfoByName("newCurStrength", curStrength);
            self.setOldInfo();
            self.showActions();
        };
        __egretProto__.unlockModule = function () {
            var self = this;
            var modules = uw.subModuleDataCtrl.findUnlockModules();
            if (modules.length > 0) {
                self._unlock.setVisible(true);
                var m = modules[0];
                self.setInfoByName("unlockContent", m.moduleName);
                self.setSizeByName("headInfo", 1300, 940);
            }
            else {
                self._unlock.setVisible(false);
                self.setSizeByName("headInfo", 1300, 800);
            }
        };
        __egretProto__.setOldInfo = function () {
            var userInfo = uw.userDataCtrl;
            var self = this;
            self._oldLordLevel = userInfo.getLvl();
            self._oldMaxPower = userInfo.getMaxStrength();
            self._oldHeroMaxLevel = userInfo.getHeroExpLimit();
        };
        __egretProto__.showActions = function () {
            var self = this;
            var spawn = mo.spawn(mo.fadeIn(0.3), mo.moveBy(0.3, mo.p(0, -30)));
            var pos = self._attr1.getPosition();
            self._attr1.setOpacity(0);
            self._attr1.setPosition(mo.p(pos.x, pos.y + 30));
            self._attr1.runAction(spawn);
            var seq = mo.sequence(mo.delayTime(0.2), spawn.clone());
            pos = self._attr2.getPosition();
            self._attr2.setOpacity(0);
            self._attr2.setPosition(mo.p(pos.x, pos.y + 30));
            self._attr2.runAction(seq);
            seq = mo.sequence(mo.delayTime(0.4), spawn.clone());
            pos = self._attr3.getPosition();
            self._attr3.setOpacity(0);
            self._attr3.setPosition(mo.p(pos.x, pos.y + 30));
            self._attr3.runAction(seq.clone());
            seq = mo.sequence(mo.delayTime(0.6), spawn.clone());
            pos = self._attr4.getPosition();
            self._attr4.setOpacity(0);
            self._attr4.setPosition(mo.p(pos.x, pos.y + 30));
            self._attr4.runAction(seq.clone());
            seq = mo.sequence(mo.delayTime(0.8), spawn.clone());
            pos = self._unlock.getPosition();
            self._unlock.setOpacity(0);
            self._unlock.setPosition(mo.p(pos.x, pos.y + 30));
            self._unlock.runAction(seq.clone());
        };
        HomeLevelUpLayer.__className = "HomeLevelUpLayer";
        return HomeLevelUpLayer;
    })(mo.TopDlg);
    uw.HomeLevelUpLayer = HomeLevelUpLayer;
    HomeLevelUpLayer.prototype.__class__ = "uw.HomeLevelUpLayer";
})(uw || (uw = {}));
