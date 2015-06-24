/**
 * Created by huanghaiying on 14/12/24.
 */
var egret;
(function (egret) {
    var action;
    (function (_action) {
        var RotateBy = (function (_super) {
            __extends(RotateBy, _super);
            function RotateBy() {
                _super.call(this);
                this._startAngle = 0;
                this._diffAngle = 0;
            }
            var __egretProto__ = RotateBy.prototype;
            __egretProto__.initWithDuration = function (duration, rotate) {
                _super.prototype.initWithDuration.call(this, duration, rotate);
                this._diffAngle = rotate;
                return true;
            };
            /**
             * @param {Number} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                this._startAngle = target._rotation;
            };
            /**
             * @param {Number} time time in seconds
             */
            __egretProto__.update = function (time) {
                var dt = _super.prototype.performEase.call(this, time);
                if (this.target) {
                    this.target.rotation = this._startAngle + this._diffAngle * dt;
                }
            };
            /**
             * returns a new clone of the action
             * @returns {cc.RotateBy}
             */
            __egretProto__.clone = function () {
                var action = new RotateBy();
                action.initWithDuration(this._duration, this._diffAngle);
                return action;
            };
            __egretProto__.reverse = function () {
                return RotateBy.create(this._duration, -this._diffAngle);
            };
            RotateBy.create = function (duration, rotate) {
                var rotateBy = new RotateBy();
                rotateBy.initWithDuration(duration, rotate);
                return rotateBy;
            };
            return RotateBy;
        })(_action.ActionInterval);
        _action.RotateBy = RotateBy;
        RotateBy.prototype.__class__ = "egret.action.RotateBy";
        var RotateTo = (function (_super) {
            __extends(RotateTo, _super);
            function RotateTo() {
                _super.call(this);
                this._startAngle = 0;
                this._desAngle = 0;
            }
            var __egretProto__ = RotateTo.prototype;
            __egretProto__.initWithDuration = function (duration, rotate) {
                _super.prototype.initWithDuration.call(this, duration, rotate);
                this._desAngle = rotate;
                return true;
            };
            /**
             * @param {Number} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                this._startAngle = target._rotation;
            };
            /**
             * @param {Number} time time in seconds
             */
            __egretProto__.update = function (time) {
                var dt = _super.prototype.performEase.call(this, time);
                if (this.target) {
                    this.target.rotation = this._startAngle + (this._desAngle - this._startAngle) * dt;
                }
            };
            /**
             * returns a new clone of the action
             * @returns {cc.RotateTo}
             */
            __egretProto__.clone = function () {
                var action = new RotateTo();
                action.initWithDuration(this._duration, this._desAngle);
                return action;
            };
            /**
             * RotateTo reverse not implemented
             */
            __egretProto__.reverse = function () {
                console.warn("cc.RotateTo.reverse(): it should be overridden in subclass.");
            };
            RotateTo.create = function (duration, deltaRotation) {
                var rotate = new RotateTo();
                rotate.initWithDuration(duration, deltaRotation);
                return rotate;
            };
            return RotateTo;
        })(_action.ActionInterval);
        _action.RotateTo = RotateTo;
        RotateTo.prototype.__class__ = "egret.action.RotateTo";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));
