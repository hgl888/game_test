var mo;
(function (mo) {
    var Event = (function (_super) {
        __extends(Event, _super);
        function Event() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Event.prototype;
        Event.getBeforeEventType = function (eventType) {
            return "before_" + eventType;
        };
        Event.getAfterEventType = function (eventType) {
            return "after_" + eventType;
        };
        Event.__className = "Event";
        return Event;
    })(egret.Event);
    mo.Event = Event;
    Event.prototype.__class__ = "mo.Event";
})(mo || (mo = {}));
