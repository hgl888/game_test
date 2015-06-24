/**
 * Created by lihex on 12/19/14.
 */
var uw;
(function (uw) {
    var NumMonitorCtrl = (function (_super) {
        __extends(NumMonitorCtrl, _super);
        function NumMonitorCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = NumMonitorCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._num = 1;
            self._maxNum = 1;
        };
        __egretProto__.init = function (monitorWidget, maxNum) {
            if (maxNum === void 0) { maxNum = 1; }
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            var widget = self.widget = monitorWidget;
            widget.onClickByName(clazz.BTN_MAX, self._onMax, self);
            widget.onClickByName(clazz.BTN_INCREASE, self._onIncrease, self);
            widget.onClickByName(clazz.BTN_REDUCE, self._onReduce, self);
            self.enableLongTouchByName(clazz.BTN_INCREASE);
            self.enableLongTouchByName(clazz.BTN_REDUCE);
            self.addEventListenerByName(clazz.BTN_INCREASE, mo.TouchEvent.LONG_TOUCH_BEGIN, self._onIncrease, self);
            self.addEventListenerByName(clazz.BTN_REDUCE, mo.TouchEvent.LONG_TOUCH_BEGIN, self._onReduce, self);
            self._maxNum = maxNum;
            self._updateMonitor();
        };
        __egretProto__.resetSelf = function (maxNum) {
            if (maxNum === void 0) { maxNum = 1; }
            this._num = 1;
            this._maxNum = maxNum;
            this._updateMonitor();
        };
        __egretProto__.onNumChangedEvent = function (selector, target) {
            this._onNumChangedSelector = selector;
            this._onNumChangedTarget = target;
        };
        __egretProto__._changNum = function (num) {
            var self = this;
            self._num = num;
            self._updateMonitor();
        };
        __egretProto__._updateMonitor = function () {
            var self = this;
            self.setInfoByName("monitor", self._num);
            if (self._onNumChangedSelector && self._onNumChangedTarget) {
                self._onNumChangedSelector.call(self._onNumChangedTarget, self._num);
            }
        };
        __egretProto__._onIncrease = function () {
            var self = this, count = self._num, maxCount = self._maxNum;
            count += 1;
            count = count > maxCount ? maxCount : count;
            self._changNum(count);
        };
        __egretProto__._onReduce = function () {
            var self = this, count = self._num, maxCount = self._maxNum;
            count -= 1;
            count = count < 1 ? 1 : count;
            self._changNum(count);
        };
        __egretProto__._onMax = function () {
            this._changNum(this._maxNum);
        };
        __egretProto__.setEnabled = function (enable) {
            var self = this, clazz = self.__class;
            self.widget.setVisible(enable);
            self.setTouchEnabledByName(clazz.BTN_MAX, enable);
            self.setTouchEnabledByName(clazz.BTN_REDUCE, enable);
            self.setTouchEnabledByName(clazz.BTN_INCREASE, enable);
        };
        __egretProto__.dtor = function () {
            var self = this, clazz = self.__class;
            self.removeEventListenerByName(clazz.BTN_INCREASE, mo.TouchEvent.LONG_TOUCH_BEGIN, self._onIncrease, self);
            self.removeEventListenerByName(clazz.BTN_REDUCE, mo.TouchEvent.LONG_TOUCH_BEGIN, self._onReduce, self);
            _super.prototype.dtor.call(this);
        };
        NumMonitorCtrl.__className = "NumMonitorCtrl";
        NumMonitorCtrl.BTN_INCREASE = "btnIncrease";
        NumMonitorCtrl.BTN_REDUCE = "btnReduce";
        NumMonitorCtrl.BTN_MAX = "btnMax";
        return NumMonitorCtrl;
    })(mo.WidgetCtrl);
    uw.NumMonitorCtrl = NumMonitorCtrl;
    NumMonitorCtrl.prototype.__class__ = "uw.NumMonitorCtrl";
})(uw || (uw = {}));
