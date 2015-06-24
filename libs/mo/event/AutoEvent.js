var mo;
(function (mo) {
    var _ = mo;
    /**
     * 数据控制器事件类。
     */
    var AutoEvent = (function (_super) {
        __extends(AutoEvent, _super);
        function AutoEvent(type, bubbles, cancelable) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            _super.call(this, type, bubbles, cancelable);
            this.param = {}; //参数
        }
        var __egretProto__ = AutoEvent.prototype;
        return AutoEvent;
    })(egret.Event);
    mo.AutoEvent = AutoEvent;
    AutoEvent.prototype.__class__ = "mo.AutoEvent";
    /**
     * Lazy模式的EventDispatcher类，默认开启的是下一帧自动执行dispatch操作。
     */
    var AutoEventDispatcher = (function (_super) {
        __extends(AutoEventDispatcher, _super);
        function AutoEventDispatcher(target) {
            _super.call(this, target);
            this._data = {}; //存储的数据
            this._autoNotify = true; //是否自动通知
            this.__class = this["constructor"];
        }
        var __egretProto__ = AutoEventDispatcher.prototype;
        AutoEventDispatcher.getDispatcher = function () {
            var self = this;
            self._dispatcher = self._dispatcher || new egret.EventDispatcher();
            return self._dispatcher;
        };
        AutoEventDispatcher.addEventListener = function (eventType, listener, ctx) {
            var dispatcher = this.getDispatcher();
            dispatcher.addEventListener.apply(dispatcher, arguments);
        };
        AutoEventDispatcher.removeEventListener = function (eventType, listener, ctx) {
            var dispatcher = this.getDispatcher();
            dispatcher.removeEventListener.apply(dispatcher, arguments);
        };
        /**
         * 创建event对象
         * @param eventType
         * @returns {AutoEvent}
         * @private
         */
        __egretProto__._createEvent = function (eventType) {
            var event = new AutoEvent(eventType);
            event.param = this._data[eventType];
            return event;
        };
        /**
         * 进行分发
         * @param eventType
         */
        __egretProto__.dispatch = function (eventType) {
            var self = this;
            var event = self._createEvent(eventType);
            self.dispatchEvent(event);
            self.__class.getDispatcher().dispatchEvent(event);
        };
        /**
         * 设置改变
         * @param eventType
         * @private
         */
        __egretProto__._setChanged = function (eventType) {
            if (!eventType)
                return; //未空则不推送
            if (this._autoNotify)
                mo.autoEventDispatcherHandler.push(this, eventType);
        };
        /**
         * 设置数据。
         * @param key
         * @param value
         */
        __egretProto__.set = function (key, value) {
            if (value === undefined) {
            }
            else if (typeof value != "object" && value == this._data[key]) {
                return; //未改变则返回
            }
            this._data[key] = value;
            this._setChanged(key);
        };
        /**
         * 获取数据。
         * @param key
         * @returns {any}
         */
        __egretProto__.get = function (key) {
            return this._data[key];
        };
        return AutoEventDispatcher;
    })(egret.EventDispatcher);
    mo.AutoEventDispatcher = AutoEventDispatcher;
    AutoEventDispatcher.prototype.__class__ = "mo.AutoEventDispatcher";
    var AutoEventDispatcherHandler = (function () {
        function AutoEventDispatcherHandler() {
            this._dispatchers = [];
            this._eventsInArr = [];
            this._isTicking = false;
        }
        var __egretProto__ = AutoEventDispatcherHandler.prototype;
        __egretProto__.push = function (dispatcher, event) {
            if (!dispatcher) {
                _.error("AutoEventDispatcherHandler#push 的【dispatcher】参数不能为空！");
                return;
            }
            var self = this;
            var dispatchers = self._dispatchers;
            var index = dispatchers.indexOf(dispatcher);
            var arr;
            if (index >= 0) {
                arr = self._eventsInArr[index];
            }
            else {
                index = dispatchers.length;
                dispatchers.push(dispatcher);
                arr = self._eventsInArr[index] = [];
            }
            if (arr.indexOf(event) < 0)
                arr.push(event);
            if (!self._isTicking) {
                self._isTicking = true;
                _.tick(self._mainLoop, self);
            }
        };
        __egretProto__._mainLoop = function () {
            var self = this;
            var dispatchers = self._dispatchers;
            var dispatchersTemp = [];
            var eventsInArr = self._eventsInArr;
            var eventsInArrTemp = [];
            for (var i = 0, li = dispatchers.length; i < li; ++i) {
                dispatchersTemp.push(dispatchers[i]);
                eventsInArrTemp.push(eventsInArr[i]);
            }
            //清空当前的列表
            dispatchers.length = 0;
            eventsInArr.length = 0;
            for (var i = 0, li = dispatchersTemp.length; i < li; ++i) {
                var dispatcher = dispatchersTemp[i];
                var events = eventsInArrTemp[i];
                for (var i = 0, li = events.length; i < li; ++i) {
                    dispatcher.dispatch(events[i]);
                }
            }
            if (dispatchers.length == 0) {
                _.clearTick(self._mainLoop, self);
                self._isTicking = false;
            }
        };
        return AutoEventDispatcherHandler;
    })();
    mo.AutoEventDispatcherHandler = AutoEventDispatcherHandler;
    AutoEventDispatcherHandler.prototype.__class__ = "mo.AutoEventDispatcherHandler";
    /**
     * 事件自动分发器的处理器。
     * @type {mo.AutoEventDispatcherHandler}
     */
    mo.autoEventDispatcherHandler = new AutoEventDispatcherHandler();
})(mo || (mo = {}));
