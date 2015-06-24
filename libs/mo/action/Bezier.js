/**
 * Created by Administrator on 2014/12/29.
 */
var mo;
(function (mo) {
    var action;
    (function (_action) {
        var BezierBy = (function (_super) {
            __extends(BezierBy, _super);
            /**
             * Constructor
             */
            function BezierBy() {
                _super.call(this);
                this.__className = "BezierBy";
                this._config = [];
                this._startPosition = mo.p(0, 0);
                this._previousPosition = mo.p(0, 0);
            }
            var __egretProto__ = BezierBy.prototype;
            /**
             * @param {Number} t time in seconds
             * @param {Array} c Array of points
             * @return {Boolean}
             */
            __egretProto__.initWithDuration = function (t, c) {
                _super.prototype.initWithDuration.call(this, t, c);
                this._config = c;
                return true;
            };
            /**
             * returns a new clone of the action
             * @returns {cc.BezierBy}
             */
            __egretProto__.clone = function () {
                var action = new BezierBy();
                var newConfigs = [];
                for (var i = 0; i < this._config.length; i++) {
                    var selConf = this._config[i];
                    newConfigs.push(mo.p(selConf.x, selConf.y));
                }
                action.initWithDuration(this._duration, newConfigs);
                return action;
            };
            /**
             * @param {cc.Node} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                var locPosX = target.x;
                var locPosY = target.y;
                this._previousPosition.x = locPosX;
                this._previousPosition.y = locPosY;
                this._startPosition.x = locPosX;
                this._startPosition.y = locPosY;
            };
            /**
             * @param {Number} time
             */
            __egretProto__.update = function (time) {
                if (this.target) {
                    var locConfig = this._config;
                    var xa = 0;
                    var xb = locConfig[0].x;
                    var xc = locConfig[1].x;
                    var xd = locConfig[2].x;
                    var ya = 0;
                    var yb = locConfig[0].y;
                    var yc = locConfig[1].y;
                    var yd = locConfig[2].y;
                    var x = this._bezierAt(xa, xb, xc, xd, time);
                    var y = this._bezierAt(ya, yb, yc, yd, time);
                    var locStartPosition = this._startPosition;
                    if (false) {
                    }
                    else {
                        this.target.x = locStartPosition.x + x;
                        this.target.y = locStartPosition.y + y;
                    }
                }
            };
            __egretProto__._bezierAt = function (a, b, c, d, t) {
                return (Math.pow(1 - t, 3) * a + 3 * t * (Math.pow(1 - t, 2)) * b + 3 * Math.pow(t, 2) * (1 - t) * c + Math.pow(t, 3) * d);
            };
            /**
             * @return {cc.ActionInterval}
             */
            __egretProto__.reverse = function () {
                var locConfig = this._config;
                var r = [
                    mo.pAdd(locConfig[1], mo.pNeg(locConfig[2])),
                    mo.pAdd(locConfig[0], mo.pNeg(locConfig[2])),
                    mo.pNeg(locConfig[2])
                ];
                return BezierBy.create(this._duration, r);
            };
            BezierBy.create = function (t, c) {
                var bezierBy = new BezierBy();
                bezierBy.initWithDuration(t, c);
                return bezierBy;
            };
            return BezierBy;
        })(egret.action.ActionInterval);
        _action.BezierBy = BezierBy;
        BezierBy.prototype.__class__ = "mo.action.BezierBy";
        /** An action that moves the target with a cubic Bezier curve to a destination point.
         * @class
         * @extends cc.BezierBy
         */
        var BezierTo = (function (_super) {
            __extends(BezierTo, _super);
            function BezierTo() {
                _super.call(this);
                this._toConfig = [];
            }
            var __egretProto__ = BezierTo.prototype;
            /**
             * @param {Number} t time in seconds
             * @param {Array} c Array of points
             * @return {Boolean}
             */
            __egretProto__.initWithDuration = function (t, c) {
                _super.prototype.initWithDuration.call(this, t, c);
                this._toConfig = c;
                return true;
            };
            /**
             * returns a new clone of the action
             * @returns {cc.BezierTo}
             */
            __egretProto__.clone = function () {
                var action = new BezierTo();
                action.initWithDuration(this._duration, this._toConfig);
                return action;
            };
            /**
             * @param {cc.Node} target
             */
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
                var locStartPos = this._startPosition;
                var locToConfig = this._toConfig;
                var locConfig = this._config;
                locConfig[0] = mo.pSub(locToConfig[0], locStartPos);
                locConfig[1] = mo.pSub(locToConfig[1], locStartPos);
                locConfig[2] = mo.pSub(locToConfig[2], locStartPos);
            };
            /**
             * @param {Number} t
             * @param {Array} c array of points
             * @return {mo.BezierTo}
             * @example
             * // example
             * var bezier = [cc.p(0, windowSize.height / 2), cc.p(300, -windowSize.height / 2), cc.p(300, 100)];
             * var bezierTo = cc.BezierTo.create(2, bezier);
             */
            BezierTo.create = function (t, c) {
                var bezierTo = new BezierTo();
                bezierTo.initWithDuration(t, c);
                return bezierTo;
            };
            return BezierTo;
        })(BezierBy);
        _action.BezierTo = BezierTo;
        BezierTo.prototype.__class__ = "mo.action.BezierTo";
    })(action = mo.action || (mo.action = {}));
})(mo || (mo = {}));
