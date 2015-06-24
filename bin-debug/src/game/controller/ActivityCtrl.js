var uw;
(function (uw) {
    var ActivityCtrl = (function (_super) {
        __extends(ActivityCtrl, _super);
        function ActivityCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ActivityCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.DATA_KEY = uw.dsConsts.ActivityData;
        };
        __egretProto__.init = function (data) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var self = this;
            _super.prototype.init.apply(self, arguments);
            var KEY = self.DATA_KEY;
            self.id = data[KEY.id];
            var startTime = data[KEY.startTime], endTime = data[KEY.endTime];
            if (startTime) {
                startTime = data[KEY.startTime] = Date.newDate(startTime);
            }
            if (endTime) {
                endTime = data[KEY.endTime] = Date.newDate(endTime);
            }
            self.startTime = startTime;
            self.endTime = endTime;
            self.opened = !!data[KEY.isOpen]; //是否开启活动
            self.items = data[KEY.items];
            self.type = data[KEY.type];
        };
        ActivityCtrl.__className = "ActivityCtrl";
        return ActivityCtrl;
    })(mo.DataController);
    uw.ActivityCtrl = ActivityCtrl;
    ActivityCtrl.prototype.__class__ = "uw.ActivityCtrl";
})(uw || (uw = {}));
