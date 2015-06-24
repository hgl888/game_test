var mo;
(function (mo) {
    var _EventStore4Once = (function () {
        function _EventStore4Once() {
        }
        var __egretProto__ = _EventStore4Once.prototype;
        return _EventStore4Once;
    })();
    _EventStore4Once.prototype.__class__ = "mo._EventStore4Once";
    function removeEventListeners(dispatcher, eventType, useCapture) {
        var eventsMap = dispatcher._eventsMap, captureEventsMap = dispatcher._captureEventsMap;
        if (arguments.length == 1) {
            if (eventsMap) {
                for (var key in eventsMap) {
                    delete eventsMap[key];
                }
            }
            if (captureEventsMap) {
                for (var key in captureEventsMap) {
                    delete eventsMap[key];
                }
            }
        }
        else if (arguments.length == 2) {
            if (typeof eventType == "string") {
                if (eventsMap && eventsMap[eventType]) {
                    delete eventsMap[eventType];
                }
                if (captureEventsMap && captureEventsMap[eventType]) {
                    delete captureEventsMap[eventType];
                }
            }
            else {
                var map = !!eventType ? captureEventsMap : eventsMap;
                if (map) {
                    for (var key in map) {
                        delete map[key];
                    }
                }
            }
        }
        else if (arguments.length == 3) {
            var map = useCapture ? captureEventsMap : eventsMap;
            if (map) {
                delete map[eventType];
            }
        }
    }
    mo.removeEventListeners = removeEventListeners;
    //添加只执行一次的监听，监听响应之后就会被立即移除，注意，这种监听没办法重复添加，后续添加的会将之前添加的覆盖掉
    function addEventListenerOnce(dispatcher, eventType, listener, ctx) {
        mo.removeEventListenerOnce.apply(mo, arguments); //如果之前已经有注册了，就先移除掉
        var map = dispatcher._eventsMap4Once; //
        if (!map) {
            map = dispatcher._eventsMap4Once = {}; //动态赋值
        }
        var tempListener = function (event) {
            mo.removeEventListenerOnce(dispatcher, eventType, listener, ctx);
            listener.apply(ctx, arguments);
        };
        var eventStore = new _EventStore4Once();
        eventStore.ctx = ctx;
        eventStore.listener = listener;
        eventStore.eventType = eventType;
        eventStore.tempListener = tempListener;
        var arr = map[eventType];
        if (!arr) {
            arr = map[eventType] = [];
        }
        arr.push(eventStore);
        dispatcher.addEventListener(eventType, tempListener, null);
    }
    mo.addEventListenerOnce = addEventListenerOnce;
    //移除只执行一次的监听
    function removeEventListenerOnce(dispatcher, eventType, listener, ctx) {
        var map = dispatcher._eventsMap4Once; //
        if (!map) {
            map = dispatcher._eventsMap4Once = {}; //动态赋值
        }
        //如果之前已经有注册了，就先移除掉
        var eventStoreArr = map[eventType];
        if (eventStoreArr) {
            for (var i = 0; i < eventStoreArr.length; ++i) {
                var eventStore = eventStoreArr[i];
                if (eventStore.listener == listener && eventStore.ctx == ctx) {
                    dispatcher.removeEventListener(eventType, eventStore.tempListener, null);
                    eventStoreArr.splice(i, 1);
                    break;
                }
            }
        }
    }
    mo.removeEventListenerOnce = removeEventListenerOnce;
    function addBeforeEventListener(dispatcher, eventType, listener, ctx, useCapture, priority) {
        var args = Array.prototype.slice.call(arguments, 1);
        args[0] = mo.Event.getBeforeEventType(eventType);
        dispatcher.addEventListener.apply(dispatcher, args);
    }
    mo.addBeforeEventListener = addBeforeEventListener;
    function addAfterEventListener(dispatcher, eventType, listener, ctx, useCapture, priority) {
        var args = Array.prototype.slice.call(arguments, 1);
        args[0] = mo.Event.getAfterEventType(eventType);
        dispatcher.addEventListener.apply(dispatcher, args);
    }
    mo.addAfterEventListener = addAfterEventListener;
    function removeBeforeEventListener(dispatcher, eventType, listener, ctx, useCapture) {
        var args = Array.prototype.slice.call(arguments, 1);
        args[0] = mo.Event.getBeforeEventType(eventType);
        dispatcher.removeEventListener.apply(dispatcher, args);
    }
    mo.removeBeforeEventListener = removeBeforeEventListener;
    function removeAfterEventListener(dispatcher, eventType, listener, ctx, useCapture) {
        var args = Array.prototype.slice.call(arguments, 1);
        args[0] = mo.Event.getAfterEventType(eventType);
        dispatcher.removeEventListener.apply(dispatcher, args);
    }
    mo.removeAfterEventListener = removeAfterEventListener;
    function dispatchEvent(dispatcherInfoArr, dstFunc, sender) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var length = dispatcherInfoArr.length;
        for (var i = 0; i < length; ++i) {
            var info = dispatcherInfoArr[i];
            var dispatcher = info[0];
            var eventType = info[1];
            var beforeType = mo.Event.getBeforeEventType(eventType);
            if (dispatcher.willTrigger(beforeType)) {
                var beforeEvent = new mo.Event(beforeType);
                beforeEvent.sender = sender;
                beforeEvent.data = info[3];
                dispatcher.dispatchEvent(beforeEvent);
            }
        }
        var result = dstFunc.apply(sender, args);
        if (result && result.broken)
            return; //这时候认为要阻止掉下面的分发
        for (var i = length - 1; i >= 0; --i) {
            var info = dispatcherInfoArr[i];
            var dispatcher = info[0];
            var eventType = info[1];
            var afterType = mo.Event.getAfterEventType(eventType);
            if (dispatcher.willTrigger(afterType)) {
                var afterEvent = new mo.Event(afterType);
                afterEvent.sender = sender;
                afterEvent.data = result;
                dispatcher.dispatchEvent(afterEvent);
            }
        }
    }
    mo.dispatchEvent = dispatchEvent;
    function dispatchEventWidthCallback(dispatcherInfoArr, dstFunc, sender) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args[_i - 3] = arguments[_i];
        }
        var length = dispatcherInfoArr.length;
        for (var i = 0; i < length; ++i) {
            var info = dispatcherInfoArr[i];
            var dispatcher = info[0];
            var eventType = info[1];
            var beforeType = mo.Event.getBeforeEventType(eventType);
            if (dispatcher.willTrigger(beforeType)) {
                var beforeEvent = new mo.Event(beforeType);
                beforeEvent.sender = sender;
                dispatcher.dispatchEvent(beforeEvent);
            }
        }
        args.push(function () {
            for (var i = length - 1; i >= 0; --i) {
                var info = dispatcherInfoArr[i];
                var dispatcher = info[0];
                var eventType = info[1];
                var afterType = mo.Event.getAfterEventType(eventType);
                if (dispatcher.willTrigger(afterType)) {
                    var afterEvent = new mo.Event(afterType);
                    afterEvent.sender = sender;
                    dispatcher.dispatchEvent(afterEvent);
                }
            }
        });
        dstFunc.apply(sender, args);
    }
    mo.dispatchEventWidthCallback = dispatchEventWidthCallback;
})(mo || (mo = {}));
