/**
 * Created by Administrator on 2015/1/28.
 */
var mo;
(function (mo) {
    var action;
    (function (action) {
        var Track = (function (_super) {
            __extends(Track, _super);
            function Track() {
                _super.apply(this, arguments);
                this.__className = "Track";
                this._omega = 500;
                this._trackSpeed = 0;
            }
            var __egretProto__ = Track.prototype;
            __egretProto__.initWithTarget = function (trackTarget, trackSpeed, callback, callTarget) {
                this._trackTarget = trackTarget;
                this._trackSpeed = trackSpeed;
                this._callback = callback;
                this._callTarget = callTarget;
            };
            __egretProto__.step = function (dt) {
                var trackTarget = this._trackTarget;
                var moveTarget = this.target;
                var dx = moveTarget.x - trackTarget.x;
                var dy = trackTarget.y - moveTarget.y;
                var angle = (270 + Math.atan2(dy, dx) * 180 / Math.PI) % 360;
                var crtangle = (angle - moveTarget.getRotation() + 360) % 360;
                var dir = crtangle <= 180 ? 1 : -1;
                var rotation = (crtangle < 180 && crtangle > this._omega * dt || crtangle > 180 && 360 - crtangle > this._omega * dt) ? (moveTarget.getRotation() + this._omega * dir * dt) : angle;
                var x = this._trackSpeed * Math.sin(rotation * Math.PI / 180) * dt;
                var y = this._trackSpeed * Math.cos(rotation * Math.PI / 180) * dt;
                moveTarget.rotation = rotation;
                moveTarget.x += x;
                moveTarget.y += y;
            };
            /**
             * @return {Boolean}
             */
            __egretProto__.isDone = function () {
                var trackTarget = this._trackTarget;
                var moveTarget = this.target;
                var dx = moveTarget.x - trackTarget.x;
                var dy = moveTarget.y - trackTarget.y;
                var isDone = Math.abs(dx) < 50 && Math.abs(dy) < 50;
                if (isDone) {
                    this._duration = 0;
                    this._callback && this._callback(this._callTarget);
                }
                return isDone;
            };
            __egretProto__.stop = function () {
                _super.prototype.stop.call(this);
                this._trackTarget = null;
                this._callback = null;
                this._callTarget = null;
            };
            Track.create = function (trackTargett, trackSpeed, callback, callTarget) {
                var ret = new Track();
                ret.initWithTarget(trackTargett, trackSpeed, callback, callTarget);
                return ret;
            };
            return Track;
        })(egret.action.ActionInterval);
        action.Track = Track;
        Track.prototype.__class__ = "mo.action.Track";
    })(action = mo.action || (mo.action = {}));
})(mo || (mo = {}));
