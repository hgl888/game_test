/**
 * Created by huanghaiying on 14/12/24.
 */
var egret;
(function (egret) {
    var action;
    (function (_action) {
        var ScaleTo = (function (_super) {
            __extends(ScaleTo, _super);
            function ScaleTo() {
                _super.call(this);
                this._startScaleX = 1;
                this._endScaleX = 0;
                this._startScaleY = 1;
                this._endScaleY = 0;
            }
            var __egretProto__ = ScaleTo.prototype;
            __egretProto__.initWithDuration = function (duration, sx, sy) {
                _super.prototype.initWithDuration.call(this, duration);
                this._endScaleX = sx;
                this._endScaleY = (sy != null) ? sy : sx;
                return true;
            };
            /**
             * @param {Number} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                this._startScaleX = target.scaleX;
                this._startScaleY = target.scaleY;
                this._deltaScaleX = this._endScaleX - this._startScaleX;
                this._deltaScaleY = this._endScaleY - this._startScaleY;
            };
            /**
             * @param {Number} time time in seconds
             */
            __egretProto__.update = function (time) {
                var dt = _super.prototype.performEase.call(this, time);
                if (this.target) {
                    this.target.scaleX = this._startScaleX + this._deltaScaleX * dt;
                    this.target.scaleY = this._startScaleY + this._deltaScaleY * dt;
                }
            };
            __egretProto__.clone = function () {
                var action = new ScaleTo();
                action.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
                action.setEase(this._easeFunction);
                return action;
            };
            ScaleTo.create = function (duration, sx, sy) {
                sy = (sy != null) ? sy : sx;
                var rotate = new ScaleTo();
                rotate.initWithDuration(duration, sx, sy);
                return rotate;
            };
            return ScaleTo;
        })(_action.ActionInterval);
        _action.ScaleTo = ScaleTo;
        ScaleTo.prototype.__class__ = "egret.action.ScaleTo";
        var ScaleBy = (function (_super) {
            __extends(ScaleBy, _super);
            function ScaleBy() {
                _super.apply(this, arguments);
            }
            var __egretProto__ = ScaleBy.prototype;
            /**
             * @param {Number} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                this._deltaScaleX = this._startScaleX * this._endScaleX - this._startScaleX;
                this._deltaScaleY = this._startScaleY * this._endScaleY - this._startScaleY;
            };
            __egretProto__.clone = function () {
                var action = new ScaleBy();
                action.initWithDuration(this._duration, this._endScaleX, this._endScaleY);
                return action;
            };
            __egretProto__.reverse = function () {
                return ScaleBy.create(this._duration, 1 / this._endScaleX, 1 / this._endScaleY);
            };
            ScaleBy.create = function (duration, sx, sy) {
                sy = (sy != null) ? sy : sx;
                var rotate = new ScaleBy();
                rotate.initWithDuration(duration, sx, sy);
                return rotate;
            };
            return ScaleBy;
        })(ScaleTo);
        _action.ScaleBy = ScaleBy;
        ScaleBy.prototype.__class__ = "egret.action.ScaleBy";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));
