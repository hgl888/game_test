var unit;
(function (unit) {
    unit.curRegisterModule = "egret";
    var MyEventDispatcher = (function (_super) {
        __extends(MyEventDispatcher, _super);
        function MyEventDispatcher() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MyEventDispatcher.prototype;
        return MyEventDispatcher;
    })(egret.EventDispatcher);
    MyEventDispatcher.prototype.__class__ = "unit.MyEventDispatcher";
    unit.registerTestBtn("study_EventDispatcher", function () {
        var EVENT_TYPE_1 = "fffff";
        var ed = new MyEventDispatcher();
        var func1 = function (event) {
            console.debug(event);
        };
        ed.addEventListener(EVENT_TYPE_1, func1, null);
        var event = new egret.Event(EVENT_TYPE_1);
        ed.dispatchEvent(event);
        ed.removeEventListener(EVENT_TYPE_1, func1, null);
    });
})(unit || (unit = {}));
