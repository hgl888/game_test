/**
 * Created by huanghaiying on 14/12/24.
 */
var egret;
(function (egret) {
    var action;
    (function (_action) {
        var FadeTo = (function (_super) {
            __extends(FadeTo, _super);
            function FadeTo() {
                _super.call(this);
                this._startFade = 0;
                this._endFade = 0;
            }
            var __egretProto__ = FadeTo.prototype;
            __egretProto__.initWithDuration = function (duration, alpha) {
                _super.prototype.initWithDuration.call(this, duration, alpha);
                this._endFade = alpha;
                return true;
            };
            /**
             * @param {Number} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                this._startFade = target.alpha;
            };
            /**
             * @param {Number} time time in seconds
             */
            __egretProto__.update = function (time) {
                var dt = _super.prototype.performEase.call(this, time);
                if (this.target) {
                    this.target.alpha = this._startFade + (this._endFade - this._startFade) * dt;
                }
            };
            __egretProto__.clone = function () {
                var action = new FadeTo();
                action.initWithDuration(this._duration, this._endFade);
                return action;
            };
            FadeTo.create = function (duration, opacity) {
                var alpha = opacity / 255;
                alpha = Math.max(0, alpha);
                alpha = Math.min(1, alpha);
                var fadeTo = new FadeTo();
                fadeTo.initWithDuration(duration, alpha);
                return fadeTo;
            };
            return FadeTo;
        })(_action.ActionInterval);
        _action.FadeTo = FadeTo;
        FadeTo.prototype.__class__ = "egret.action.FadeTo";
        var FadeIn = (function (_super) {
            __extends(FadeIn, _super);
            function FadeIn() {
                _super.call(this);
                this._reverseAction = null;
            }
            var __egretProto__ = FadeIn.prototype;
            FadeIn.create = function (duration) {
                var rotate = new FadeIn();
                rotate.initWithDuration(duration, 1);
                return rotate;
            };
            /**
             * @return {cc.ActionInterval}
             */
            __egretProto__.reverse = function () {
                var action = new FadeOut();
                action.initWithDuration(this._duration, 0);
                return action;
            };
            __egretProto__.clone = function () {
                var action = new FadeIn();
                action.initWithDuration(this._duration, this._endFade);
                return action;
            };
            __egretProto__.startWithTarget = function (target) {
                if (this._reverseAction)
                    this._endFade = this._reverseAction._startFade;
                _super.prototype.startWithTarget.call(this, target);
            };
            return FadeIn;
        })(FadeTo);
        _action.FadeIn = FadeIn;
        FadeIn.prototype.__class__ = "egret.action.FadeIn";
        var FadeOut = (function (_super) {
            __extends(FadeOut, _super);
            function FadeOut() {
                _super.apply(this, arguments);
            }
            var __egretProto__ = FadeOut.prototype;
            FadeOut.create = function (duration) {
                var rotate = new FadeOut();
                rotate.initWithDuration(duration, 0);
                return rotate;
            };
            __egretProto__.clone = function () {
                var action = new FadeOut();
                action.initWithDuration(this._duration, this._endFade);
                return action;
            };
            __egretProto__.reverse = function () {
                var action = new FadeIn();
                action._reverseAction = this;
                action.initWithDuration(this._duration, 255);
                return action;
            };
            return FadeOut;
        })(FadeTo);
        _action.FadeOut = FadeOut;
        FadeOut.prototype.__class__ = "egret.action.FadeOut";
    })(action = egret.action || (egret.action = {}));
})(egret || (egret = {}));
