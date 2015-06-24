var mo;
(function (mo) {
    var action;
    (function (action) {
        var Ellipse = (function (_super) {
            __extends(Ellipse, _super);
            function Ellipse() {
                _super.apply(this, arguments);
            }
            var __egretProto__ = Ellipse.prototype;
            __egretProto__.startWithTarget = function (target) {
                _super.prototype.startWithTarget.call(this, target);
            };
            __egretProto__.initWithDuration = function (duration, centerPosition, aLength, cLength) {
                _super.prototype.initWithDuration.call(this, duration);
                this._centerPosition = centerPosition;
                this._aLength = aLength;
                this._cLength = cLength;
                return true;
            };
            __egretProto__.update = function (dt) {
                if (this.target) {
                    var startPosition = this._centerPosition; //中心点坐标
                    var a = this._aLength;
                    var bx = this._centerPosition.x;
                    var by = this._centerPosition.y;
                    var c = this._cLength;
                    var x = this._ellipseX(a, bx, c, dt); //调用之前的坐标计算函数来计算出坐标值
                    var y = this._ellipseY(a, by, c, dt);
                    this.target.setPosition(mo.pAdd(startPosition, mo.p(x - a, y))); //由于我们画计算出的椭圆你做值是以原点为中心的，所以需要加上我们设定的中心点坐标
                }
            };
            __egretProto__._ellipseX = function (a, by, c, dt) {
                return -a * Math.cos(2 * Math.PI * dt) + a; //参数方程
            };
            __egretProto__._ellipseY = function (a, by, c, dt) {
                var b = Math.sqrt(Math.pow(a, 2) - Math.pow(c, 2)); //因为之前定义的参数是焦距c而不是短半轴b，所以需要计算出b
                return b * Math.sin(2 * Math.PI * dt);
            };
            Ellipse.create = function (duration, centerPosition, aLength, cLength) {
                var ret = new Ellipse();
                ret.initWithDuration(duration, centerPosition, aLength, cLength);
                return ret;
            };
            Ellipse.__className = "Ellipse";
            return Ellipse;
        })(egret.action.ActionInterval);
        action.Ellipse = Ellipse;
        Ellipse.prototype.__class__ = "mo.action.Ellipse";
    })(action = mo.action || (mo.action = {}));
})(mo || (mo = {}));
