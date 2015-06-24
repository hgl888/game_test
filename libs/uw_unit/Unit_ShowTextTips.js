var uw;
(function (uw) {
    var Unit_TipsLayer = (function (_super) {
        __extends(Unit_TipsLayer, _super);
        function Unit_TipsLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Unit_TipsLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._tipsArr = [];
            self._tipsRunning = false;
            self._interval = 600;
            self.blurMaskEnabled = false;
            self._showWithAction = false;
        };
        __egretProto__.setTips = function (arg) {
            var self = this;
            if (typeof arg == "string") {
                self._tipsArr.push(arg);
            }
            else {
                self._tipsArr = self._tipsArr.concat(arg);
            }
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this;
            if (!self._tipsRunning) {
                self._tipsRunning = true;
                mo.schedule(self._runActionQueue, self, self._interval, true);
            }
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            var self = this;
            self._tipsArr = [];
            self.removeChildren();
            if (self._tipsRunning) {
                self._tipsRunning = false;
                mo.unschedule(self._runActionQueue, self);
                self.close();
            }
        };
        __egretProto__._runActionQueue = function () {
            var self = this, tip;
            if (self._tipsArr.length > 0) {
                tip = self._tipsArr.shift();
                self.createNode(tip);
            }
        };
        __egretProto__.createNode = function (text) {
        };
        __egretProto__.isNeedToClose = function () {
            var self = this;
            if (self.getChildrenCount() == 0 && self._tipsArr.length == 0 && self._tipsRunning) {
                self._tipsRunning = false;
                mo.unschedule(self._runActionQueue, self);
                self.close();
            }
        };
        Unit_TipsLayer.show = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var _instance = this.getInstance();
            _instance.setTips.apply(_instance, args);
            if (!_instance.getParent()) {
                _instance.show();
            }
        };
        Unit_TipsLayer.close = function () {
            var _instance = this.getInstance();
            if (_instance.getParent()) {
                _instance.close();
            }
        };
        Unit_TipsLayer.__className = "Unit_TipsLayer";
        return Unit_TipsLayer;
    })(mo.MsgDlg);
    uw.Unit_TipsLayer = Unit_TipsLayer;
    Unit_TipsLayer.prototype.__class__ = "uw.Unit_TipsLayer";
})(uw || (uw = {}));
