var mo;
(function (mo) {
    var action;
    (function (_action) {
        var ProgressTo = (function (_super) {
            __extends(ProgressTo, _super);
            function ProgressTo() {
                _super.call(this);
                this.__className = "ProgressTo";
                this._to = 0;
                this._from = 0;
                this._to = 0;
                this._from = 0;
            }
            var __egretProto__ = ProgressTo.prototype;
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                this._from = target.getPercent();
                if (this._from == 100)
                    this._from = 0;
            };
            __egretProto__.initWithDuration = function (duration, percent, cb, target) {
                _super.prototype.initWithDuration.call(this, duration);
                this._to = percent;
                this._cb = cb;
                this._cbTarget = target;
                return true;
            };
            __egretProto__.update = function (dt) {
                var target = this.target, self = this;
                if (target instanceof mo.UILoadingBar) {
                    var percent = self._from + (self._to - self._from) * dt;
                    target.setPercent(percent);
                    if (self.isDone() && self._cb) {
                        self._cb.call(self._cbTarget);
                    }
                }
            };
            __egretProto__.clone = function () {
                var action = new ProgressTo();
                action.initWithDuration(this._duration, this._to, this._cb, this._cbTarget);
                return action;
            };
            ProgressTo.create = function (duration, percent, cb, target) {
                var progressTo = new ProgressTo();
                progressTo.initWithDuration(duration, percent, cb, target);
                return progressTo;
            };
            return ProgressTo;
        })(egret.action.ActionInterval);
        _action.ProgressTo = ProgressTo;
        ProgressTo.prototype.__class__ = "mo.action.ProgressTo";
        var ProgressFromTo = (function (_super) {
            __extends(ProgressFromTo, _super);
            function ProgressFromTo() {
                _super.call(this);
                this.__className = "ProgressFromTo";
                this._to = 0;
                this._from = 0;
                this._to = 0;
                this._from = 0;
            }
            var __egretProto__ = ProgressFromTo.prototype;
            __egretProto__.initWithDuration = function (duration, fromPercentage, toPercentage, cb, target) {
                _super.prototype.initWithDuration.call(this, duration);
                this._to = toPercentage;
                this._from = fromPercentage;
                this._cb = cb;
                this._cbTarget = target;
                return true;
            };
            __egretProto__.update = function (dt) {
                var target = this.target, self = this;
                if (target instanceof mo.UILoadingBar) {
                    var percent = self._from + (self._to - self._from) * dt;
                    target.setPercent(percent);
                    if (self.isDone() && self._cb) {
                        self._cb.call(self._cbTarget);
                    }
                }
            };
            __egretProto__.clone = function () {
                var action = new ProgressFromTo();
                action.initWithDuration(this._duration, this._from, this._to, this._cb, this._cbTarget);
                return action;
            };
            __egretProto__.reverse = function () {
                return ProgressFromTo.create(this._duration, this._to, this._from, this._cb, this._cbTarget);
            };
            ProgressFromTo.create = function (duration, fromPercentage, toPercentage, cb, target) {
                var progressTo = new ProgressFromTo();
                progressTo.initWithDuration(duration, fromPercentage, toPercentage, cb, target);
                return progressTo;
            };
            return ProgressFromTo;
        })(egret.action.ActionInterval);
        _action.ProgressFromTo = ProgressFromTo;
        ProgressFromTo.prototype.__class__ = "mo.action.ProgressFromTo";
    })(action = mo.action || (mo.action = {}));
})(mo || (mo = {}));
