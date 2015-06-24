/**
 * Created by wander on 14-12-22.
 */
var egret;
(function (egret) {
    var action;
    (function (_action) {
        var MoveBy = (function (_super) {
            __extends(MoveBy, _super);
            function MoveBy() {
                _super.call(this);
                this._deltaX = 0;
                this._startX = 0;
                this._previousX = 0;
                this._deltaY = 0;
                this._startY = 0;
                this._previousY = 0;
            }
            var __egretProto__ = MoveBy.prototype;
            __egretProto__.initWithDuration = function (duration, x, y) {
                _super.prototype.initWithDuration.call(this, duration, x, y);
                this._deltaX = x;
                this._deltaY = y;
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
                    var x = this._deltaX * dt;
                    var y = this._deltaY * dt;
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
            __egretProto__.clone = function () {
                var action = new MoveBy();
                action.initWithDuration(this._duration, this._deltaX, this._deltaY);
                return action;
            };
            /**
             * MoveTo reverse is not implemented
             */
            __egretProto__.reverse = function () {
                return MoveBy.create(this._duration, -this._deltaX, -this._deltaY);
            };
            MoveBy.create = function (duration, x, y) {
                var moveBy = new MoveBy();
                moveBy.initWithDuration(duration, x, y);
                return moveBy;
            };
            return MoveBy;
        })(_action.ActionInterval);
        _action.MoveBy = MoveBy;
        MoveBy.prototype.__class__ = "egret.action.MoveBy";
        var MoveTo = (function (_super) {
            __extends(MoveTo, _super);
            function MoveTo() {
                _super.call(this);
                this._endX = 0;
                this._endY = 0;
            }
            var __egretProto__ = MoveTo.prototype;
            __egretProto__.initWithDuration = function (duration, x, y) {
                _super.prototype.initWithDuration.call(this, duration, x, y);
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
            __egretProto__.clone = function () {
                var action = new MoveTo();
                action.initWithDuration(this._duration, this._endX, this._endY);
                return action;
            };
            MoveTo.create = function (duration, x, y) {
                var rotate = new MoveTo();
                rotate.initWithDuration(duration, x, y);
                return rotate;
            };
            return MoveTo;
        })(MoveBy);
        _action.MoveTo = MoveTo;
        MoveTo.prototype.__class__ = "egret.action.MoveTo";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));
