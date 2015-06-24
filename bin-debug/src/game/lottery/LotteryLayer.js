/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var LotteryLayer = (function (_super) {
        __extends(LotteryLayer, _super);
        function LotteryLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LotteryLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiLotteryLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._armatureContainer = self.getWidgetByName("armatureContainer");
            self._goldLottery = self.getWidgetByName("goldLottery");
            self._diamondLottery = self.getWidgetByName("diamondLottery");
            self.setGoldInfo();
            self.setDiamondInfo();
            self.registerClassByKey(uw.LotteryDataCtrl, uw.LotteryDataCtrl.ON_GOLD_LAST_TIME_CHANGED, self.setGoldInfo);
            self.registerClassByKey(uw.LotteryDataCtrl, uw.LotteryDataCtrl.ON_DIAMOND_LAST_TIME_CHANGED, self.setDiamondInfo);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.gold.toString(), self.setGoldInfo);
            self.registerClassByKey(uw.UserDataCtrl, uw.dsConsts.UserEntity.diamond.toString(), self.setDiamondInfo);
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.FIXED_WIDTH);
            self.setEffect();
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            if (self._goldLottery)
                self._goldLottery.doDtor();
            if (self._diamondLottery)
                self._diamondLottery.doDtor();
        };
        __egretProto__.setGoldInfo = function () {
            var ldCtrl = uw.lotteryDataCtrl;
            var gold = ldCtrl.gold, self = this;
            var goldForTen = ldCtrl.goldForTen;
            var todayCount = ldCtrl.getGoldLotteryTodayCount();
            var freeCount = ldCtrl.maxReGoldNum - todayCount;
            if (freeCount > 0) {
                if (ldCtrl.isGoldLotteryCDOver()) {
                    var str = mo.formatStr("今日免费：%s/%s", freeCount, ldCtrl.maxReGoldNum);
                    self._goldLottery.setInfoByName("cdTime1", str);
                    self._goldLottery.setVisibleByName("pricebox1", false);
                    self._goldLottery.setVisibleByName("free1", true);
                }
                else {
                    self._goldLottery.countdownToEndTimeByName("cdTime1", ldCtrl.goldCDOverTime, this._resetText, this, this.setGoldInfo, this);
                    self._goldLottery.setVisibleByName("pricebox1", true);
                    self._goldLottery.setVisibleByName("free1", false);
                }
            }
            else {
                self._goldLottery.setInfoByName("cdTime1", "今日已无免费次数");
                self._goldLottery.setVisibleByName("pricebox1", true);
                self._goldLottery.setVisibleByName("free1", false);
            }
            this._goldLottery.setInfoByName("price1", gold);
            this._goldLottery.onClickByName("btnGoldLottery1", this.menuGoldShowResult, this, uw.LotteryDataCtrl.ONCE);
            this._goldLottery.setInfoByName("price2", goldForTen);
            this._goldLottery.setInfoByName("cdTime2", "必得蓝色物品");
            this._goldLottery.onClickByName("btnGoldLottery2", this.menuGoldShowResult, this, uw.LotteryDataCtrl.TEN_TIMES);
            var priceOnce = this._goldLottery.getWidgetByName("price1");
            var priceTenTimes = this._goldLottery.getWidgetByName("price2");
            uw.userDataCtrl.setGoldTxt(priceOnce, gold);
            uw.userDataCtrl.setGoldTxt(priceTenTimes, goldForTen);
        };
        __egretProto__._resetText = function (leftMillisecond, widget) {
            var str = widget.getText();
            widget.setText(str + "后免费");
        };
        __egretProto__.setDiamondInfo = function () {
            var ldCtrl = uw.lotteryDataCtrl;
            var diamond = ldCtrl.diamond, self = this;
            var diamondForTen = ldCtrl.diamondForTen;
            if (ldCtrl.isDiamondLotteryCDOver()) {
                self._diamondLottery.setInfoByName("cdTime1", "免费");
                self._diamondLottery.setVisibleByName("pricebox1", false);
                self._diamondLottery.setVisibleByName("free1", true);
            }
            else {
                self._diamondLottery.countdownToEndTimeByName("cdTime1", ldCtrl.diamondCDOverTime, this._resetText, this, this.setDiamondInfo, this);
                self._diamondLottery.setVisibleByName("pricebox1", true);
                self._diamondLottery.setVisibleByName("free1", false);
            }
            this._diamondLottery.setInfoByName("price1", diamond);
            this._diamondLottery.onClickByName("btnDiamondLottery1", this.menuDiamondShowResult, this, uw.LotteryDataCtrl.ONCE);
            this._diamondLottery.setInfoByName("price2", diamondForTen);
            this._diamondLottery.setInfoByName("cdTime2", "必得英雄");
            this._diamondLottery.onClickByName("btnDiamondLottery2", this.menuDiamondShowResult, this, uw.LotteryDataCtrl.TEN_TIMES);
            var priceOnce = this._diamondLottery.getWidgetByName("price1");
            var priceTenTimes = this._diamondLottery.getWidgetByName("price2");
            uw.userDataCtrl.setDiamondTxt(priceOnce, diamond);
            uw.userDataCtrl.setDiamondTxt(priceTenTimes, diamondForTen);
        };
        __egretProto__.setEffect = function () {
            var act = mo.repeatForever(mo.sequence(mo.scaleTo(1, 2.4).setEase(mo.Ease.sineInOut), mo.scaleTo(1, 2).setEase(mo.Ease.sineInOut)));
            var goldLight = this._goldLottery.getWidgetByName("light");
            goldLight.runAction(act);
            act = mo.repeatForever(mo.rotateBy(4.6, 360));
            var diamondLight = this._diamondLottery.getWidgetByName("light");
            diamondLight.runAction(act);
            var armature = uw.uiArmFactory.produce(res.cca_ui.effect_water);
            armature.setPosition(mo.p(0, 300));
            armature.playWithIndex(0);
            this._armatureContainer.addChild(armature);
        };
        __egretProto__.menuGoldShowResult = function (sender, event, timesType) {
            var self = this, moneyType = uw.LotteryDataCtrl.TYPE_GOLD;
            if (timesType == uw.LotteryDataCtrl.ONCE) {
                uw.lotteryDataCtrl.takeOnce(moneyType, function (data) {
                    self.showResult(timesType, moneyType, data);
                }, this);
            }
            else {
                uw.lotteryDataCtrl.takeTenTimes(moneyType, function (data) {
                    self.showResult(timesType, moneyType, data);
                }, this);
            }
        };
        __egretProto__.menuDiamondShowResult = function (sender, event, timesType) {
            var self = this, moneyType = uw.LotteryDataCtrl.TYPE_DIAMOND;
            if (timesType == uw.LotteryDataCtrl.ONCE) {
                uw.lotteryDataCtrl.takeOnce(moneyType, function (data) {
                    self.showResult(timesType, moneyType, data);
                }, this);
            }
            else {
                uw.lotteryDataCtrl.takeTenTimes(moneyType, function (data) {
                    self.showResult(timesType, moneyType, data);
                }, this);
            }
        };
        __egretProto__.showResult = function (timesType, moneyType, data) {
            var layer = uw.LotteryResultLayer.create(timesType, moneyType, data);
            layer.onShow(this.hideBoxContainer, this);
            layer.onClose(this.showBoxContainer, this);
            layer.show();
        };
        __egretProto__.showBoxContainer = function () {
            this.setVisibleByName("box", true);
            mo.runningScene.backLayer.showBackBtn();
        };
        __egretProto__.hideBoxContainer = function () {
            this.setVisibleByName("box", false);
            mo.runningScene.backLayer.hideBackBtn();
        };
        LotteryLayer.__className = "LotteryLayer";
        return LotteryLayer;
    })(mo.DisplayLayer);
    uw.LotteryLayer = LotteryLayer;
    LotteryLayer.prototype.__class__ = "uw.LotteryLayer";
})(uw || (uw = {}));
