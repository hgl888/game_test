/**
 * Created by huanghaiying on 14/12/24.
 */
var egret;
(function (egret) {
    var action;
    (function (action) {
        var SkewBy = (function (_super) {
            __extends(SkewBy, _super);
            function SkewBy() {
                _super.call(this);
                this._startSkewX = 0;
                this._deltaSkewX = 0;
                this._startSkewY = 0;
                this._deltaSkewY = 0;
            }
            var __egretProto__ = SkewBy.prototype;
            __egretProto__.initWithDuration = function (duration, skx, sky) {
                _super.prototype.initWithDuration.call(this, duration, skx, sky);
                this._deltaSkewX = skx;
                this._deltaSkewY = sky;
                return true;
            };
            /**
             * @param {Number} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                this._startSkewX = target.skewX;
                this._startSkewY = target.skewY;
            };
            /**
             * @param {Number} time time in seconds
             */
            __egretProto__.update = function (time) {
                var dt = _super.prototype.performEase.call(this, time);
                if (this.target) {
                    this.target.skewX = this._startSkewX + this._deltaSkewX * dt;
                    this.target.skewY = this._startSkewY + this._deltaSkewY * dt;
                }
            };
            SkewBy.create = function (duration, skx, sky) {
                var rotate = new SkewBy();
                rotate.initWithDuration(duration, skx, sky);
                return rotate;
            };
            return SkewBy;
        })(action.ActionInterval);
        action.SkewBy = SkewBy;
        SkewBy.prototype.__class__ = "egret.action.SkewBy";
        var SkewTo = (function (_super) {
            __extends(SkewTo, _super);
            function SkewTo() {
                _super.call(this);
                this._startSkewX = 0;
                this._endSkewX = 0;
                this._startSkewY = 0;
                this._endSkewY = 0;
            }
            var __egretProto__ = SkewTo.prototype;
            __egretProto__.initWithDuration = function (duration, skx, sky) {
                _super.prototype.initWithDuration.call(this, duration, skx, sky);
                this._endSkewX = skx;
                this._endSkewY = sky;
                return true;
            };
            /**
             * @param {Number} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                this._startSkewX = target.skewX;
                this._startSkewY = target.skewY;
            };
            /**
             * @param {Number} time time in seconds
             */
            __egretProto__.update = function (time) {
                var dt = _super.prototype.performEase.call(this, time);
                if (this.target) {
                    this.target.skewX = this._startSkewX + (this._endSkewX - this._startSkewX) * dt;
                    this.target.skewY = this._startSkewY + (this._endSkewY - this._startSkewY) * dt;
                }
            };
            SkewTo.create = function (duration, skx, sky) {
                var rotate = new SkewTo();
                rotate.initWithDuration(duration, skx, sky);
                return rotate;
            };
            return SkewTo;
        })(action.ActionInterval);
        action.SkewTo = SkewTo;
        SkewTo.prototype.__class__ = "egret.action.SkewTo";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));
