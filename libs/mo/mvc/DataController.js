var mo;
(function (mo) {
    var _DataControllerApi = (function () {
        function _DataControllerApi() {
        }
        var __egretProto__ = _DataControllerApi.prototype;
        __egretProto__._initBase = function () {
            var self = this;
            if (self.__baseInited) {
                return;
            }
            if (!self.__registers) {
                self.__registers = [];
            }
            if (!self.__registerTargets) {
                self.__registerTargets = [];
            }
            if (!self.__registersForKey) {
                self.__registersForKey = {};
            }
            self.__baseInited = true;
        };
        __egretProto__.register = function (selector, target) {
            var clazz = this;
            clazz._initBase();
            var registers = clazz.__registers;
            var registerTargets = clazz.__registerTargets;
            for (var i = 0, li = registers.length; i < li; ++i) {
                if (registers[i] == selector && (target == registerTargets[i])) {
                    return;
                }
            }
            registers.push(selector);
            registerTargets.push(target);
        };
        __egretProto__.registerByKey = function (key, selector, target) {
            this._initBase();
            var registersForKey = this.__registersForKey;
            if (!registersForKey[key]) {
                registersForKey[key] = { registers: [], registerTargets: [] };
            }
            var registers = registersForKey[key].registers;
            var registerTargets = registersForKey[key].registerTargets;
            for (var i = 0, li = registers.length; i < li; ++i) {
                if (registers[i] == selector && (target == registerTargets[i])) {
                    return;
                }
            }
            registers.push(selector);
            registerTargets.push(target);
        };
        __egretProto__.unregister = function (selector, target) {
            var self = this;
            if (!self.__baseInited) {
                return;
            }
            var registers = self.__registers;
            var registerTargets = self.__registerTargets;
            for (var i = 0, li = registers.length; i < li; i++) {
                if (registers[i] == selector && (!target || target == registerTargets[i])) {
                    registers[i] = null;
                    registerTargets[i] = null;
                    mo.DataController._pushResetTarget(self);
                }
            }
        };
        __egretProto__.unregisterByKey = function (key, selector, target) {
            var self = this;
            if (!self.__baseInited) {
                return;
            }
            var registersForKey = self.__registersForKey;
            var info = registersForKey[key];
            if (!info)
                return;
            var registers = info.registers;
            var registerTargets = info.registerTargets;
            for (var i = 0; i < registers.length; ++i) {
                if (registers[i] == selector && (!target || target == registerTargets[i])) {
                    registers[i] = null;
                    registerTargets[i] = null;
                    mo.DataController._pushResetTarget(self);
                }
            }
        };
        __egretProto__.unregisterAll = function () {
            var self = this;
            self.__registers.length = 0;
            self.__registerTargets.length = 0;
            var map = self.__registersForKey;
            for (var key in map) {
                delete map[key];
            }
            self._changed = false;
        };
        return _DataControllerApi;
    })();
    _DataControllerApi.prototype.__class__ = "mo._DataControllerApi";
    var DataController = (function (_super) {
        __extends(DataController, _super);
        function DataController() {
            _super.call(this);
            _startScheduler4DataController();
        }
        var __egretProto__ = DataController.prototype;
        __egretProto__._initProp = function () {
            var self = this;
            self._keyChangedMap = {};
            self._customArgMap = {};
            self._autoNotify = true;
            self._changed = false;
            self._initBase();
        };
        __egretProto__.reset = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.init.apply(this, arguments);
            this.pushNotify(this.__class.ON_RESET);
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            self.setAutoNotify(false);
            self.unregisterAll();
            if (self.resModuleName != null) {
                //                mo.resMgr.exitModule();//TODO
                self.resModuleName = null;
            }
            self._eventTarget = null;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this._data = args[0];
            this.setAutoNotify(true);
        };
        __egretProto__.setAutoNotify = function (isAuto) {
            if (this._autoNotify == isAuto)
                return;
            this._autoNotify = isAuto;
        };
        __egretProto__.isAutoNotify = function () {
            return this._autoNotify;
        };
        __egretProto__._notifyArr = function (selectors, targets, args) {
            if (!selectors)
                return;
            for (var i = 0, li = selectors.length; i < li; ++i) {
                if (selectors[i])
                    selectors[i].apply(targets[i], args);
            }
            for (var i = 0; i < selectors.length;) {
                if (!selectors[i]) {
                    selectors.splice(i, 1);
                    targets.splice(i, 1);
                }
                else {
                    ++i;
                }
            }
        };
        __egretProto__._setChanged = function (key) {
            var self = this;
            self._changed = true;
            var eventName = "*";
            if (key != null) {
                self._keyChangedMap[key] = true;
                eventName = key;
            }
            if (self._autoNotify)
                mo.DataController._pushInv(self, eventName);
        };
        __egretProto__.get = function (key) {
            return this._data[key];
        };
        __egretProto__.set = function (key, value) {
            if (typeof value != "object" && value == this._data[key]) {
                return;
            }
            this._setChanged(key);
            this._data[key] = value;
        };
        __egretProto__.add = function (key, value) {
            var oldValue = this.get(key) || 0;
            this.set(key, oldValue + value);
        };
        __egretProto__.getData = function () {
            return this._data;
        };
        __egretProto__._cloneObj = function (obj) {
            var result = {};
            for (var key in obj) {
                result[key] = obj[key];
            }
            return result;
        };
        __egretProto__.pushNotify = function (key, value) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var arr = Array.prototype.slice.apply(arguments);
            key = arr[0];
            arr.splice(0, 1);
            this._customArgMap[key] = arr;
            this._setChanged(key);
        };
        __egretProto__.pushNotifyAtOnce = function (eventName, value) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var self = this;
            var arr = Array.prototype.slice.apply(arguments);
            eventName = arr[0];
            arr.splice(0, 1);
            var customArgMap = {};
            customArgMap[eventName] = arr;
            self._notifyEvent(eventName, self.__registersForKey, customArgMap);
            self._notifyEvent(eventName, self.__class.__registersForKey, customArgMap);
        };
        __egretProto__._notifyEvent = function (eventName, registersForKey, customArgMap) {
            if (!registersForKey)
                return;
            var self = this;
            var map = registersForKey[eventName];
            if (map && map.registers && map.registers.length > 0) {
                var args = customArgMap[eventName];
                args = (args == null && self._data != null) ? [self._data[eventName]] : args;
                args = args || [];
                args.push(self);
                self._notifyArr(map.registers, map.registerTargets, args);
            }
        };
        __egretProto__.notifyEvent = function (eventName) {
            var self = this;
            if (self._changed) {
                var keyChangeMap = self._keyChangedMap;
                var customArgMap = self._customArgMap;
                delete keyChangeMap[eventName]; //从对象中移除
                self._notifyEvent(eventName, self.__registersForKey, customArgMap);
                self._notifyEvent(eventName, self.__class.__registersForKey, customArgMap);
                var keys = Object.keys(keyChangeMap);
                if (!keys || keys.length == 0) {
                    self._changed = false;
                    self._notifyArr(self.__registers, self.__registerTargets, [null, self]); //通知全属性变化事件（实例注册级别）
                    self._notifyArr(self.__class.__registers, self.__class.__registerTargets, [null, self]); //通知全属性变化事件（类注册级别）
                }
            }
        };
        __egretProto__.notifyAll = function () {
            var self = this;
            var keyChangeMap = self._cloneObj(self._keyChangedMap);
            for (var eventName in keyChangeMap) {
                self.notifyEvent(eventName);
            }
        };
        __egretProto__._initBase = function () {
            _DataControllerApi.prototype._initBase.apply(this, arguments);
        };
        __egretProto__.register = function (selector, target) {
            _DataControllerApi.prototype.register.apply(this, arguments);
        };
        __egretProto__.registerByKey = function (key, selector, target) {
            _DataControllerApi.prototype.registerByKey.apply(this, arguments);
        };
        __egretProto__.unregister = function (selector, target) {
            _DataControllerApi.prototype.unregister.apply(this, arguments);
        };
        __egretProto__.unregisterByKey = function (key, selector, target) {
            _DataControllerApi.prototype.unregisterByKey.apply(this, arguments);
        };
        __egretProto__.unregisterAll = function () {
            _DataControllerApi.prototype.unregisterAll.apply(this, arguments);
        };
        DataController._initBase = function () {
            _DataControllerApi.prototype._initBase.apply(this, arguments);
        };
        DataController.register = function (selector, target) {
            _DataControllerApi.prototype.register.apply(this, arguments);
        };
        DataController.registerByKey = function (key, selector, target) {
            _DataControllerApi.prototype.registerByKey.apply(this, arguments);
        };
        DataController.unregister = function (selector, target) {
            _DataControllerApi.prototype.unregister.apply(this, arguments);
        };
        DataController.unregisterByKey = function (key, selector, target) {
            _DataControllerApi.prototype.unregisterByKey.apply(this, arguments);
        };
        DataController.unregisterAll = function () {
            _DataControllerApi.prototype.unregisterAll.apply(this, arguments);
        };
        DataController._pushInv = function (target, eventName) {
            var queue = mo.DataController._registerQueue;
            for (var i = 0; i < queue.length; i++) {
                var info = queue[i];
                if (info.target == target && eventName == info.eventName)
                    return; //已经存在直接返回
            }
            queue.push({ target: target, eventName: eventName });
        };
        DataController._pushResetTarget = function (target) {
            var list = this._resetList;
            if (list.indexOf(target) < 0)
                list.push(target);
        };
        DataController.__className = "DataController";
        DataController.ON_RESET = "onReset";
        DataController._registerQueue = [];
        DataController._resetList = [];
        return DataController;
    })(mo.Class);
    mo.DataController = DataController;
    DataController.prototype.__class__ = "mo.DataController";
    mo._isScheduler4DataControllerStarted = false;
    function _startScheduler4DataController() {
        if (mo._isScheduler4DataControllerStarted)
            return;
        mo._isScheduler4DataControllerStarted = true; //这个一定要放在前面
        mo.tick(function () {
            var resetList = mo.DataController._resetList;
            while (resetList.length) {
                var obj = resetList.pop();
                mo.resetArr(obj.__registers);
                mo.resetArr(obj.__registerTargets);
                var registersForKey = obj.__registersForKey;
                for (var key in registersForKey) {
                    var info = registersForKey[key];
                    if (!info)
                        return;
                    mo.resetArr(info.registers);
                    mo.resetArr(info.registerTargets);
                }
            }
            var arr = mo.DataController._registerQueue;
            while (arr.length > 0) {
                var info = arr.shift();
                if (info.eventName == "*")
                    info.target.notifyAll();
                else
                    info.target.notifyEvent(info.eventName);
            }
        }, mo.DataController);
    }
    mo._startScheduler4DataController = _startScheduler4DataController;
    function registerClassByKey(target, clazz, key, listener) {
        var eventStoreForClass = target._eventStoreForClass = target._eventStoreForClass || [];
        for (var i = 0, li = eventStoreForClass.length; i < li; i++) {
            var info = eventStoreForClass[i];
            if (clazz == info[0] && key == info[1] && listener == info[2])
                return;
        }
        eventStoreForClass.push([clazz, key, listener]);
        clazz.registerByKey(key, listener, target);
    }
    mo.registerClassByKey = registerClassByKey;
    function unregisterClass(target) {
        var eventStoreForClass = target._eventStoreForClass;
        while (eventStoreForClass && eventStoreForClass.length > 0) {
            var info = eventStoreForClass.pop();
            info[0].unregisterByKey(info[1], info[2], target);
        }
    }
    mo.unregisterClass = unregisterClass;
})(mo || (mo = {}));
