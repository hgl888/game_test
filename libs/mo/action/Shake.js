/**
 * Created by Administrator on 2014/12/29.
 */
var mo;
(function (mo) {
    var action;
    (function (action) {
        var Shake = (function (_super) {
            __extends(Shake, _super);
            function Shake() {
                _super.call(this);
                this.__className = "Shake";
                this._initialX = 0;
                this._initialY = 0;
                this._strengthX = 0;
                this._strengthY = 0;
                this._isInit = false;
            }
            var __egretProto__ = Shake.prototype;
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                if (!this._isInit) {
                    this._initialX = target.getPositionX();
                    this._initialY = target.getPositionY();
                    this._isInit = true;
                }
            };
            __egretProto__.initWithDuration = function (duration, strengthX, strengthY) {
                _super.prototype.initWithDuration.call(this, duration);
                this._strengthX = strengthX;
                this._strengthY = strengthY;
                return true;
            };
            __egretProto__.update = function (dt) {
                var randx = this._fgRangeRand(-this._strengthX, this._strengthX) * dt;
                var randy = this._fgRangeRand(-this._strengthY, this._strengthY) * dt;
                // move the target to a shaked position
                this.target.setPosition(this._initialX + randx, this._initialY + randy);
            };
            __egretProto__.stop = function () {
                this.target.setPosition(this._initialX, this._initialY);
                _super.prototype.stop.call(this);
            };
            __egretProto__._fgRangeRand = function (min, max) {
                return Math.random() * (max - min) + min;
            };
            Shake.create = function (duration, strengthX, strengthY) {
                strengthY = (strengthY == null) ? strengthX : strengthY;
                var ret = new Shake();
                ret.initWithDuration(duration, strengthX, strengthY);
                return ret;
            };
            return Shake;
        })(egret.action.ActionInterval);
        action.Shake = Shake;
        Shake.prototype.__class__ = "mo.action.Shake";
    })(action = mo.action || (mo.action = {}));
})(mo || (mo = {}));
