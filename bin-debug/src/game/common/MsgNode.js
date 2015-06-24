/**
 * 走马灯
 */
/*MarqueeNode = cc.ClippingNode.extend({
    __className : "MarqueeNode",
    _strMsg1: null,
    _strMsg2: null,
    _msgPool: null,
    _width: 0,
    _runningMsg: null,
    ctor () {
        this._super();
        this._msgPool = [];
    },
    init () {
        var bg = cc.Sprite.create(res.marqueeBg_png);//TODO 这里有错，需要修改
        this.addChild(bg, 0);
        this._width = bg.getContentSize().width;

        this.setStencil(bg);
        this.setContentSize(bg.getContentSize());
    },
    onEnter () {
        this._super();
        var bg = this.getStencil();
        bg.setOpacity(255);
    },
    updateMsg () {
        if (this._msgPool.length > 0) {
            if (!this._runningMsg) {
                var msg, _strMsg1;
                msg = this._msgPool.shift() || "";
                _strMsg1 = cc.LabelTTF.create(msg, "Arial", 30);
                _strMsg1.setAnchorPoint(0, 0.5);
                _strMsg1.setPosition(this._width / 2, 0);
                this.addChild(_strMsg1, 100);

                var speed = 50,
                    w1 = msg.length * 30,
                    w2 = this._width + w1;
                var seq = mo.sequence(
                    mo.moveBy(w2 / speed, mo.p(-w2, 0)),
                    mo.callFunc(this._removeMsg, this)
                );
                _strMsg1.runAction(seq);

                seq = mo.sequence(
                    mo.delayTime((w1 + 50) / speed),
                    mo.callFunc(this.removeRunningMsg, this)
                );
                _strMsg1.runAction(seq);

                this._runningMsg = _strMsg1;
            }
        }
    },
    removeRunningMsg () {
        this._runningMsg = null;
        this.updateMsg();
    },
    _removeMsg (sender) {
        sender.removeFromParent(true);
        if (this._msgPool.length == 0) {
            var bg = this.getStencil();

            var seq1 = mo.sequence(
                mo.fadeOut(1),
                mo.callFunc(function(sender){
                    sender.removeFromParent(true);
                }, this)
            );
            bg.runAction(seq1);
        }
    },
    setMsg (msg, regionID) {
        if (regionID == 1 || regionID == 2) {
            cc.ArrayAppendObjectToIndex(this._msgPool, msg, 0);
        }
        else {
            this._msgPool.push(msg);
        }
        this.updateMsg();
    }
});*/
var uw;
(function (uw) {
    /**
     * 消息基类
     */
    var MsgDlg = (function (_super) {
        __extends(MsgDlg, _super);
        function MsgDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MsgDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._msgWidgetName = "textArea";
            self._time = 0;
        };
        /**
         *
         * @param msgData 消息体 ["消息","类型","持续的时间"]
         * @param args 最后4个分别是确定和取消的回调参数，之前的是要替换的字符串
         */
        __egretProto__.init = function (msgData) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _super.prototype.init.call(this);
            var self = this;
            var tmpOKSelector, tmpOKTarget, tmpNoSelector, tmpNoTarget;
            if (args.length > 0) {
                var tmpArgs = Array.prototype.slice.apply(args);
                if (tmpArgs.length >= 4) {
                    if (typeof tmpArgs[tmpArgs.length - 2] == "function" && (typeof tmpArgs[tmpArgs.length - 1] == "object")) {
                        tmpOKTarget = tmpArgs.pop();
                        tmpOKSelector = tmpArgs.pop();
                    }
                    if (typeof tmpArgs[tmpArgs.length - 2] == "function" && (typeof tmpArgs[tmpArgs.length - 1] == "object")) {
                        tmpNoTarget = tmpOKTarget;
                        tmpNoSelector = tmpOKSelector;
                        tmpOKTarget = tmpArgs.pop();
                        tmpOKSelector = tmpArgs.pop();
                    }
                }
                else {
                    if (typeof tmpArgs[tmpArgs.length - 1] == "function") {
                        tmpOKSelector = tmpArgs.pop();
                        tmpOKTarget = null;
                    }
                    else if (typeof tmpArgs[tmpArgs.length - 2] == "function") {
                        tmpOKTarget = tmpArgs.pop();
                        tmpOKSelector = tmpArgs.pop();
                    }
                }
                if (tmpOKSelector) {
                    self.setConfirmCallback(tmpOKSelector, tmpOKTarget);
                }
                if (tmpNoSelector) {
                    self.setCancelCallback(tmpNoSelector, tmpNoTarget);
                }
            }
            var textArgs = [msgData[uw.c_msgCode_text]];
            if (tmpArgs) {
                textArgs = textArgs.concat(tmpArgs);
            }
            self._time = msgData[uw.c_msgCode_time];
            self.msg = mo.formatStr.apply(mo, textArgs);
            self._isOnTop = !!msgData[uw.c_msgCode_onTop];
        };
        __egretProto__.setConfirmCallback = function (selector, target) {
            this._confirmSelector = selector;
            this._confirmTarget = target;
        };
        __egretProto__.doConfirmCallback = function () {
            if (this._confirmSelector) {
                this._confirmSelector.call(this._confirmTarget);
            }
        };
        __egretProto__.setCancelCallback = function (selector, target) {
            this._cancelSelector = selector;
            this._cancelTarget = target;
        };
        __egretProto__.doCancelCallback = function () {
            if (this._cancelSelector) {
                this._cancelSelector.call(this._cancelTarget);
            }
        };
        MsgDlg.__className = "MsgDlg";
        return MsgDlg;
    })(mo.MsgDlg);
    uw.MsgDlg = MsgDlg;
    MsgDlg.prototype.__class__ = "uw.MsgDlg";
    /**
     * 警告窗
     */
    var AlertDlg = (function (_super) {
        __extends(AlertDlg, _super);
        function AlertDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = AlertDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiTipLayer_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self.onClickByName("msgBox", self.close, self);
            self.onClickByName("btnYes", self.close, self);
            self.onClose(self.doConfirmCallback, self);
        };
        AlertDlg.__className = "AlertDlg";
        return AlertDlg;
    })(MsgDlg);
    uw.AlertDlg = AlertDlg;
    AlertDlg.prototype.__class__ = "uw.AlertDlg";
    /**
     * 断线重连
     */
    var RetryDlg = (function (_super) {
        __extends(RetryDlg, _super);
        function RetryDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = RetryDlg.prototype;
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            var btnYes = self.getWidgetByName("btnYes");
            btnYes.loadTextures(res.ui_btn.btn_retry_png);
        };
        RetryDlg.__className = "RetryDlg";
        return RetryDlg;
    })(AlertDlg);
    uw.RetryDlg = RetryDlg;
    RetryDlg.prototype.__class__ = "uw.RetryDlg";
    /**
     * 确认框基类
     */
    var ConfirmBaseDlg = (function (_super) {
        __extends(ConfirmBaseDlg, _super);
        function ConfirmBaseDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ConfirmBaseDlg.prototype;
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._btnYes = self.getWidgetByName("btnYes");
            self.onClickByName("btnNo", self.menuCancel, self);
            self.onClickByName("btnYes", self.menuConfirm, self);
        };
        __egretProto__.menuConfirm = function () {
            this.close();
            this.doConfirmCallback();
        };
        __egretProto__.menuCancel = function () {
            this.close();
            this.doCancelCallback();
            //取消是需要刷新当前的引导界面
            //mo.refreshGuide();
            //todo 引导没实现
            uw.warn("引导没实现");
        };
        ConfirmBaseDlg.__className = "ConfirmBaseDlg";
        return ConfirmBaseDlg;
    })(MsgDlg);
    uw.ConfirmBaseDlg = ConfirmBaseDlg;
    ConfirmBaseDlg.prototype.__class__ = "uw.ConfirmBaseDlg";
    /**
     * 取消/确认
     */
    var ConfirmDlg = (function (_super) {
        __extends(ConfirmDlg, _super);
        function ConfirmDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ConfirmDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiConfirmLayer_ui;
        };
        ConfirmDlg.__className = "ConfirmDlg";
        return ConfirmDlg;
    })(ConfirmBaseDlg);
    uw.ConfirmDlg = ConfirmDlg;
    ConfirmDlg.prototype.__class__ = "uw.ConfirmDlg";
    /**
     * 取消/充值
     */
    var ConfirmRechargeDlg = (function (_super) {
        __extends(ConfirmRechargeDlg, _super);
        function ConfirmRechargeDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ConfirmRechargeDlg.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiConfirmLayer_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._btnYes.loadTextures(res.ui_btn.btn_charge_png);
            //跳到充值
            self.setConfirmCallback(function () {
                uw.pushSubModule(uw.SubModule.Charge);
            }, self);
        };
        ConfirmRechargeDlg.__className = "ConfirmRechargeLayer";
        return ConfirmRechargeDlg;
    })(ConfirmBaseDlg);
    uw.ConfirmRechargeDlg = ConfirmRechargeDlg;
    ConfirmRechargeDlg.prototype.__class__ = "uw.ConfirmRechargeDlg";
    /**
     * 取消/购买
     */
    var ConfirmPurchaseDlg = (function (_super) {
        __extends(ConfirmPurchaseDlg, _super);
        function ConfirmPurchaseDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ConfirmPurchaseDlg.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiConfirmLayer_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._btnYes.loadTextures(res.ui_btn.btn_purchase_png);
        };
        ConfirmPurchaseDlg.__className = "ConfirmPurchaseDlg";
        return ConfirmPurchaseDlg;
    })(ConfirmBaseDlg);
    uw.ConfirmPurchaseDlg = ConfirmPurchaseDlg;
    ConfirmPurchaseDlg.prototype.__class__ = "uw.ConfirmPurchaseDlg";
    /**
     * 取消、使用
     */
    var ConfirmUseDlg = (function (_super) {
        __extends(ConfirmUseDlg, _super);
        function ConfirmUseDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ConfirmUseDlg.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiConfirmLayer_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._btnYes.loadTextures(res.ui_btn.btn_use_png);
            //跳到购买金币界面
            self.setConfirmCallback(function () {
                uw.pushSubModule(uw.SubModule.Alchemy);
            }, self);
        };
        ConfirmUseDlg.__className = "ConfirmUseDlg";
        return ConfirmUseDlg;
    })(ConfirmBaseDlg);
    uw.ConfirmUseDlg = ConfirmUseDlg;
    ConfirmUseDlg.prototype.__class__ = "uw.ConfirmUseDlg";
    /**
     * 取消、提升
     */
    var ConfirmUpgradeVipDlg = (function (_super) {
        __extends(ConfirmUpgradeVipDlg, _super);
        function ConfirmUpgradeVipDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ConfirmUpgradeVipDlg.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiConfirmLayer_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self._btnYes.loadTextures(res.ui_btn.btn_vipPrivilege_png);
            //跳到VIP界面
            self.setConfirmCallback(function () {
                uw.pushSubModule(uw.SubModule.VIP);
            }, self);
        };
        ConfirmUpgradeVipDlg.__className = "ConfirmUpgradeVipDlg";
        return ConfirmUpgradeVipDlg;
    })(ConfirmBaseDlg);
    uw.ConfirmUpgradeVipDlg = ConfirmUpgradeVipDlg;
    ConfirmUpgradeVipDlg.prototype.__class__ = "uw.ConfirmUpgradeVipDlg";
    /**
     * 倒计时确认框
     *
     */
    var ConfirmCountDownDlg = (function (_super) {
        __extends(ConfirmCountDownDlg, _super);
        function ConfirmCountDownDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ConfirmCountDownDlg.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiConfirmLayer_ui;
            self._waitingTime = 0;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.apply(self, arguments);
            self.setVisibleByName("label_countDown", true);
            self.setWaitingTime(self._time);
        };
        // 设置倒数时间，单位:秒
        __egretProto__.setWaitingTime = function (time) {
            var self = this;
            self._waitingTime = time;
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            if (self._waitingTime) {
                var now = Date.newDate();
                self._cdInv = self.countdownToEndTimeByName("label_countDown", now.addSeconds(self._waitingTime), self.menuConfirm, self);
            }
        };
        __egretProto__._onClose = function () {
            var self = this;
            _super.prototype._onClose.call(this);
            mo.timer.removeInvocation(self._cdInv);
            self._cdInv = null;
            self._waitingTime = null;
            self.setVisibleByName("label_countDown", false);
        };
        ConfirmCountDownDlg.__className = "ConfirmCountDownDlg";
        return ConfirmCountDownDlg;
    })(ConfirmBaseDlg);
    uw.ConfirmCountDownDlg = ConfirmCountDownDlg;
    ConfirmCountDownDlg.prototype.__class__ = "uw.ConfirmCountDownDlg";
})(uw || (uw = {}));
