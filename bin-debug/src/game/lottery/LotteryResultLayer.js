var uw;
(function (uw) {
    var LotteryResultLayer = (function (_super) {
        __extends(LotteryResultLayer, _super);
        function LotteryResultLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LotteryResultLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiLotteryResultLayer_ui;
            self._dataIndex = 0;
            self._price = 0;
            self._itemArr = [];
            self._itemIconCtrPool = [];
            self._heroIconCtrlPool = [];
            self._secretChangeList = [];
            self._showWithAction = false;
            self.blurMaskEnabled = false;
            self._closeOutSide = false;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            self.onClickByName("btnConfirm", self.close, self);
            self.onClickByName("btnTryAgain", self.menuShowResult, self);
        };
        __egretProto__.init = function (timesType, moneyType, data) {
            _super.prototype.init.call(this);
            var self = this;
            self._timesType = timesType;
            self._moneyType = moneyType;
            self._data = data;
            var itemArr = self._itemArr = [], item;
            for (var j = 0; j < 10; j++) {
                item = self.getWidgetByName("item" + j);
                var size = item.getSize();
                var pos = mo.p(size.width / 2, -size.height / 2);
                item.setVisible(false);
                item.setAnchorPoint(0.5, 0.5);
                item.setTouchEnabled(false);
                item.setPositionOffset(pos);
                itemArr.push(item);
            }
            self._lightBox = self.getWidgetByName("lightBox");
            self.setVisibleByName("btnsContainer", false);
            self.setVisibleByName("btnFirstRechargeContainer", false);
            self.setEffect();
        };
        __egretProto__.setPrice = function () {
            var self = this;
            var timesType = self._timesType;
            var moneyType = self._moneyType;
            var resIcon, price, priceForTen;
            var info = uw.lotteryDataCtrl;
            var widget = self.getWidgetByName("retryPrice");
            if (moneyType == uw.LotteryDataCtrl.TYPE_GOLD) {
                resIcon = resHelper.getUIIconPath(uw.c_prop.spItemIdKey.gold);
                price = info.gold;
                priceForTen = info.goldForTen;
                uw.userDataCtrl.setGoldTxt(widget, price);
            }
            else {
                resIcon = resHelper.getUIIconPath(uw.c_prop.spItemIdKey.diamond);
                price = info.diamond;
                priceForTen = info.diamondForTen;
                uw.userDataCtrl.setDiamondTxt(widget, price);
            }
            price = (timesType == uw.LotteryDataCtrl.ONCE) ? price : priceForTen;
            var frame = (timesType == uw.LotteryDataCtrl.ONCE) ? res.ui_btn.btn_sommononemore_png : res.ui_btn.btn_10more_png;
            self.setInfoByName("resIcon", resIcon);
            self.setInfoByName("retryPrice", price);
            self.setButtonImgByName("btnTryAgain", frame);
        };
        __egretProto__.setEffect = function () {
            var self = this;
            var ccaId;
            if (self._moneyType == uw.LotteryDataCtrl.TYPE_GOLD) {
                ccaId = res.cca_ui.goldChest;
            }
            else {
                ccaId = res.cca_ui.diamondChest;
            }
            var lightBox = self._lightBox;
            var prePos = self._lightBox.getPosition();
            lightBox.setScale(1);
            lightBox.removeChildren();
            lightBox.setPosition(mo.pAdd(prePos, mo.p(0, 400)));
            mo.playUIAudio(res.audio_ui.lottery);
            uw.UpArmatureWithBegin.play(lightBox, ccaId, mo.p(0, 0), function () {
                var lightBoxAct = mo.sequence(mo.spawn(mo.moveBy(0.3, mo.p(0, -400)), mo.scaleTo(0.3, 0.6)), mo.callFunc(function () {
                    //开始捕捉秘术变化
                    uw.userDataCtrl.catchSecretChangeBegin();
                    self.showItems();
                }, self));
                lightBox.runAction(lightBoxAct);
            }, self);
        };
        __egretProto__.showItems = function () {
            var self = this;
            if (self._dataIndex < self._data.length) {
                var lotteryInfo = self._data[self._dataIndex];
                if (self.checkIsHero(lotteryInfo)) {
                    self.showHero(lotteryInfo);
                }
                else {
                    var self = self;
                    uw.fightUtils.delayCall(0.5, function () {
                        self.showItems();
                    }, self);
                }
                var index = (self._timesType == uw.LotteryDataCtrl.ONCE) ? 7 : self._dataIndex;
                var item = self._itemArr[index];
                var itemInfo = self._data[self._dataIndex][uw.dsConsts.UseItemInfo.items];
                var heroInfo = self._data[self._dataIndex][uw.dsConsts.UseItemInfo.hero];
                self.setInfoByItem(item, itemInfo, heroInfo);
                self._dataIndex++;
            }
            else {
                self._dataIndex = 0;
                self._secretChangeList = uw.userDataCtrl.getSecretChangeData();
                self.showSecretTips();
                self.showButtons();
            }
        };
        /**
         * 获得英雄，秘术升级
         */
        __egretProto__.showSecretTips = function () {
            var self = this;
            //如果已经跳转过秘术界面则不再弹出提示框
            if (mo.runningScene.__className == "SecretScene") {
                self._secretChangeList.length = 0;
                return;
            }
            if (self._secretChangeList.length) {
                var changData = self._secretChangeList.pop();
                var layer = uw.SecretTipsDlg.create(changData);
                layer.onClose(function () {
                    if (self._secretChangeList.length > 0) {
                        self.showSecretTips();
                    }
                }, self);
                layer.show();
            }
        };
        __egretProto__.getIconCtrl = function (iconType) {
            var self = this;
            var iconCtrl;
            if (iconType == 1) {
                iconCtrl = self._itemIconCtrPool.pop();
                if (!iconCtrl)
                    iconCtrl = uw.UIItemIconCtrl.create();
            }
            else {
                iconCtrl = self._heroIconCtrlPool.pop();
                if (!iconCtrl)
                    iconCtrl = uw.UIHeroIconCtrl.create();
            }
            iconCtrl.isAutoDtor = true;
            return iconCtrl;
        };
        __egretProto__.pushBackIconCtrl = function (iconCtrl) {
            var self = this;
            iconCtrl.isAutoDtor = false;
            if (iconCtrl instanceof uw.UIItemIconCtrl) {
                self._itemIconCtrPool.push(iconCtrl);
            }
            else {
                self._heroIconCtrlPool.push(iconCtrl);
            }
        };
        __egretProto__.setInfoByItem = function (widget, itemInfo, heroInfo) {
            var self = this, clazz = self.__class;
            if (itemInfo == null)
                return;
            widget.setVisible(true);
            var len = Object.keys(itemInfo);
            var widgetCtrl;
            if (len.length > 0) {
                widgetCtrl = self.getIconCtrl(clazz.ITEM_ICON);
                widgetCtrl.showTip(true);
                widgetCtrl.attachWidgetTo(widget);
                for (var tempId in itemInfo) {
                    var num = itemInfo[tempId];
                    widgetCtrl.resetByData(tempId);
                    widgetCtrl.setCount(num);
                }
            }
            else {
                var heroTempId = heroInfo[uw.dsConsts.HeroEntity.tempId];
                widgetCtrl = self.getIconCtrl(clazz.HERO_ICON);
                widgetCtrl.resetByData(heroTempId);
                widgetCtrl.attachWidgetTo(widget);
            }
            //设置动画
            var originPosition = widget.getPosition();
            var newPosition = self._lightBox.getPosition();
            widget.setScale(0.2);
            widget.setOpacity(50);
            widget.setPosition(newPosition);
            widget.setTouchEnabled(true);
            widget.setVisible(true);
            var seq = mo.sequence(mo.spawn(mo.scaleTo(0.12, 1).setEase(mo.Ease.backOut), mo.rotateBy(0.12, 720), mo.fadeIn(0.12), mo.moveTo(0.12, originPosition)), mo.callFunc(function (sender) {
                var qualityKey = uw.c_prop.heroQualityKey;
                var quality = widgetCtrl.dataCtrl.quality;
                if (quality == qualityKey.qualityBlue || quality == qualityKey.qualityPurple) {
                    var ctrl = uw.UpArmatureWithBegin.play(sender, res.cca_ui.chestItemLight, mo.p(100, 100), null, null);
                    var arm = sender.arm = ctrl.getArmature();
                    arm.setZOrder(-100);
                }
                var action = mo.sequence(mo.fadeIn(0.15), mo.fadeOut(0.1), mo.callFunc(function (sender1) {
                    sender1.removeFromParent();
                }, self));
                var light = mo.UIImage.create();
                light.loadTexture(res.ui_common.cov_lotteryitem_png);
                light.setZOrder(99);
                light.setOpacity(0);
                light.setPosition(widget.width / 2, widget.height / 2);
                light.runAction(action);
                widget.addChild(light);
            }, this));
            widget.runAction(seq);
        };
        __egretProto__.showButtons = function () {
            var self = this;
            if (self._timesType == 0 && self._moneyType == 0) {
                self.setVisibleByName("btnsContainer", false);
                self.setVisibleByName("btnFirstRechargeContainer", true);
                self.setDisappearedByName("btnTryAgain", true);
                self.setDisappearedByName("btnConfirm", true);
                self.onClickByName("btnFirstRechargeConfirm", self.close, self);
            }
            else {
                self.setVisibleByName("btnsContainer", true);
                self.setVisibleByName("btnFirstRechargeContainer", false);
                self.setDisappearedByName("btnTryAgain", false);
                self.setDisappearedByName("btnConfirm", false);
                self.onClickByName("btnConfirm", self.close, self);
                self.onClickByName("btnTryAgain", self.menuShowResult, self);
                self.setPrice();
            }
            //触发按键显示的事件，引导需要用到 zxj
            var aed = mo.actionDispatcher;
            if (aed.willTrigger(gEventType.showLotteryBtns)) {
                var event = new mo.Event(gEventType.showLotteryBtns);
                aed.dispatchEvent(event);
            }
        };
        __egretProto__.checkIsHero = function (itemInfo) {
            return itemInfo.hasOwnProperty(uw.dsConsts.UseItemInfo.hero);
        };
        __egretProto__.showHero = function (lotteryInfo) {
            var self = this;
            var heroInfo = lotteryInfo[uw.dsConsts.UseItemInfo.hero], tempId = heroInfo[uw.dsConsts.HeroEntity.tempId];
            var isGotHero = !heroInfo.hasOwnProperty(uw.dsConsts.HeroEntity.id);
            if (!isGotHero) {
                var sc = uw.userDataCtrl.getSecretByHeroTid(uw.convertTempIdToWarriorId(tempId));
                if (sc && sc.lvl > 0) {
                    uw.userDataCtrl.catchSecretChange(new uw.SecretChangeData(sc.initId, true));
                }
            }
            var layer = uw.LotteryShowHeroLayer.create(tempId, isGotHero);
            layer.onClose(self.showItems, self);
            layer.show();
        };
        __egretProto__.menuShowResult = function () {
            var self = this;
            var timesType = this._timesType;
            var moneyType = this._moneyType;
            if (timesType == uw.LotteryDataCtrl.ONCE) {
                uw.lotteryDataCtrl.takeOnce(moneyType, function (data) {
                    self.showResult(data);
                }, this);
            }
            else {
                uw.lotteryDataCtrl.takeTenTimes(moneyType, function (data) {
                    self.showResult(data);
                }, this);
            }
        };
        __egretProto__.showResult = function (data) {
            this._data = data;
            var widget;
            for (var i = 0; i < this._itemArr.length; i++) {
                widget = this._itemArr[i];
                widget.setVisible(false);
                widget.setTouchEnabled(false);
                if (widget.arm) {
                    widget.removeChild(widget.arm);
                    widget.arm = null;
                }
                if (widget.iconCtrl) {
                    this.pushBackIconCtrl(widget.iconCtrl);
                    widget.iconCtrl.detachWidget();
                }
            }
            //
            this.setDisappearedByName("btnTryAgain", true);
            this.setDisappearedByName("btnConfirm", true);
            this.setEffect();
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            for (var i = 0, li = self._itemIconCtrPool.length; i < li; i++) {
                self._itemIconCtrPool[i].dtor();
            }
            for (var i = 0, li = self._heroIconCtrlPool.length; i < li; i++) {
                self._heroIconCtrlPool[i].dtor();
            }
        };
        LotteryResultLayer.__className = "LotteryResultLayer";
        LotteryResultLayer.ON_HERO_LAYER_CLOSE = "onHeroLayerClose";
        LotteryResultLayer.GOLD_TREASURE = res.ui_lottery.normalbox_png;
        LotteryResultLayer.DIAMOND_TREASURE = res.ui_lottery.superbox_png;
        LotteryResultLayer.ITEM_ICON = 1;
        LotteryResultLayer.HERO_ICON = 2;
        return LotteryResultLayer;
    })(mo.Dlg);
    uw.LotteryResultLayer = LotteryResultLayer;
    LotteryResultLayer.prototype.__class__ = "uw.LotteryResultLayer";
})(uw || (uw = {}));
