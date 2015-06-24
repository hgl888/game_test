/**
 * Created by huanghaiying on 14/12/24.
 */
var egret;
(function (egret) {
    var action;
    (function (action) {
        var JumpBy = (function (_super) {
            __extends(JumpBy, _super);
            function JumpBy() {
                _super.call(this);
                this._deltaX = 0;
                this._deltaY = 0;
                this._startX = 0;
                this._startY = 0;
                this._previousX = 0;
                this._previousY = 0;
                this._height = 0;
                this._jumps = 0;
            }
            var __egretProto__ = JumpBy.prototype;
            __egretProto__.initWithDuration = function (duration, x, y, height, jumps) {
                _super.prototype.initWithDuration.call(this, duration, x, y, height, jumps);
                this._deltaX = x;
                this._deltaY = y;
                this._height = height;
                this._jumps = jumps;
                return true;
            };
            /**
             * @param {Number} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                var locPosX = target.x;
                var locPosY = target.y;
                this._previousX = locPosX;
                this._previousY = locPosY;
                this._startX = locPosX;
                this._startY = locPosY;
            };
            /**
             * @param {Number} time time in seconds
             */
            __egretProto__.update = function (time) {
                var dt = _super.prototype.performEase.call(this, time);
                if (this.target) {
                    var frac = dt * this._jumps % 1.0;
                    var y = this._height * 4 * frac * (1 - frac);
                    y += this._deltaY * dt;
                    var x = this._deltaX * dt;
                    var locStartPositionX = this._startX;
                    var locStartPositionY = this._startY;
                    if (false) {
                    }
                    else {
                        this.target.x = locStartPositionX + x;
                        this.target.y = locStartPositionY + y;
                    }
                }
            };
            JumpBy.create = function (duration, x, y, height, jumps) {
                var rotateBy = new JumpBy();
                rotateBy.initWithDuration(duration, x, y, height, jumps);
                return rotateBy;
            };
            return JumpBy;
        })(action.ActionInterval);
        action.JumpBy = JumpBy;
        JumpBy.prototype.__class__ = "egret.action.JumpBy";
        var JumpTo = (function (_super) {
            __extends(JumpTo, _super);
            function JumpTo() {
                _super.call(this);
                this._endX = 0;
                this._endY = 0;
            }
            var __egretProto__ = JumpTo.prototype;
            __egretProto__.initWithDuration = function (duration, x, y, height, jumps) {
                _super.prototype.initWithDuration.call(this, duration, x, y, height, jumps);
                this._endX = x;
                this._endY = y;
                return true;
            };
            /**
             * @param {Number} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                this._deltaX = this._endX - this._startX;
                this._deltaY = this._endY - this._startY;
            };
            JumpTo.create = function (duration, x, y, height, jumps) {
                var rotate = new JumpTo();
                rotate.initWithDuration(duration, x, y, height, jumps);
                return rotate;
            };
            return JumpTo;
        })(JumpBy);
        action.JumpTo = JumpTo;
        JumpTo.prototype.__class__ = "egret.action.JumpTo";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));
