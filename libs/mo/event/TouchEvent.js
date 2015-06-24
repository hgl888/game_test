var mo;
(function (mo) {
    var TouchEvent = (function (_super) {
        __extends(TouchEvent, _super);
        function TouchEvent() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TouchEvent.prototype;
        //@override
        TouchEvent.dispatchTouchEvent = function (target, type, touchPointID, stageX, stageY, ctrlKey, altKey, shiftKey, touchDown) {
            if (touchPointID === void 0) { touchPointID = 0; }
            if (stageX === void 0) { stageX = 0; }
            if (stageY === void 0) { stageY = 0; }
            if (ctrlKey === void 0) { ctrlKey = false; }
            if (altKey === void 0) { altKey = false; }
            if (shiftKey === void 0) { shiftKey = false; }
            if (touchDown === void 0) { touchDown = false; }
            var eventClass = mo.TouchEvent;
            var props = mo.Event._getPropertyData(eventClass);
            props.touchPointID = touchPointID;
            props._stageX = stageX;
            props._stageY = stageY;
            props.ctrlKey = ctrlKey;
            props.altKey = altKey;
            props.shiftKey = shiftKey;
            props.touchDown = touchDown;
            mo.Event._dispatchByTarget(eventClass, target, type, props, true, true);
        };
        TouchEvent.LONG_TOUCH_BEGIN = "longTouchBegin"; //长按开始
        TouchEvent.LONG_TOUCH_END = "longTouchEnd"; //长按结束
        TouchEvent.NODE_BEGIN = "nodeBegin";
        TouchEvent.NODE_END = "nodeEnd";
        TouchEvent.NODE_MOVE = "nodeMove";
        return TouchEvent;
    })(egret.TouchEvent);
    mo.TouchEvent = TouchEvent;
    TouchEvent.prototype.__class__ = "mo.TouchEvent";
})(mo || (mo = {}));
