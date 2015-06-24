var mo;
(function (mo) {
    var Point = (function (_super) {
        __extends(Point, _super);
        function Point() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Point.prototype;
        __egretProto__._setXDirty = function (xDirty) {
            if (xDirty) {
                this._dirty = xDirty;
            }
            this._xDirty = xDirty;
        };
        Object.defineProperty(__egretProto__, "xDirty", {
            get: function () {
                return this._xDirty;
            },
            set: function (xDirty) {
                this._setXDirty(xDirty);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setYDirty = function (yDirty) {
            if (yDirty) {
                this._dirty = yDirty;
            }
            this._yDirty = yDirty;
        };
        Object.defineProperty(__egretProto__, "yDirty", {
            get: function () {
                return this._yDirty;
            },
            set: function (yDirty) {
                this._setYDirty(yDirty);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setDirty = function (dirty) {
            this._xDirty = dirty;
            this._yDirty = dirty;
            this._dirty = dirty;
        };
        Object.defineProperty(__egretProto__, "dirty", {
            get: function () {
                return this._dirty;
            },
            set: function (dirty) {
                this._setDirty(dirty);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setX = function (x) {
            var self = this;
            if (self._x != x) {
                self._setXDirty(true);
                self._x = x;
            }
        };
        Object.defineProperty(__egretProto__, "x", {
            get: function () {
                return this._x;
            },
            set: function (x) {
                this._setX(x);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setY = function (y) {
            var self = this;
            if (self._y != y) {
                self._setYDirty(true);
                self._y = y;
            }
        };
        Object.defineProperty(__egretProto__, "y", {
            get: function () {
                return this._y;
            },
            set: function (y) {
                this._setY(y);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.clone = function (point) {
            if (!point) {
                point = new Point();
            }
            var self = this;
            point._x = self._x;
            point._y = self._y;
            point._xDirty = self._xDirty;
            point._yDirty = self._yDirty;
            point._dirty = self._dirty;
            return point;
        };
        /**
         * 返回该点的相反点
         * @returns {Point}
         */
        __egretProto__.neg = function () {
            return mo.p(-this.x, -this.y);
        };
        /**
         * 加上某个点所得到的点
         * @param point
         * @returns {Point}
         */
        __egretProto__.add = function (point) {
            return mo.p(this.x + point.x, this.y + point.y);
        };
        /**
         * 检出某个点所得到的点
         * @param point
         * @returns {Point}
         */
        __egretProto__.sub = function (point) {
            return mo.p(this.x - point.x, this.y - point.y);
        };
        /**
         * 乘以一个系数所得到的点
         * @param floatVar
         * @returns {Point}
         */
        __egretProto__.mult = function (floatVar) {
            return mo.p(this.x * floatVar, this.y * floatVar);
        };
        /**
         * 和某个点的中心点
         * @param point
         * @returns {Point}
         */
        __egretProto__.midPoint = function (point) {
            return this.add(point).mult(0.5);
        };
        /**
         * 和某个点的点乘积
         * @param point
         * @returns {number}
         */
        __egretProto__.dot = function (point) {
            return this.x * point.x + this.y * point.y;
        };
        /**
         * 和某个点的差乘积
         * @param point
         */
        __egretProto__.cross = function (point) {
            return this.x * point.y - this.y * point.x;
        };
        /**
         * 绕着原点顺时针旋转90°后得到的点。
         * @returns {Point}
         */
        __egretProto__.perp = function () {
            return mo.p(this.y, -this.x);
        };
        /**
         * 绕着原点逆时针时针旋转90°后得到的点。
         * @returns {Point}
         */
        __egretProto__.rPerp = function () {
            return mo.p(-this.y, this.x);
        };
        /**
         * 获取该点在point点上的投影。
         * @param point
         * @returns {Point}
         */
        __egretProto__.project = function (point) {
            return point.mult(this.dot(point) / point.dot(point));
        };
        /**
         * 绕着某个点旋转的到的新点？ TODO
         * @param point
         * @returns {Point}
         */
        __egretProto__.rotate = function (point) {
            return mo.p(this.x * point.x - this.y * point.y, this.x * point.y + this.y * point.x);
        };
        /**
         * 绕着某个点旋转的到的新点？ TODO
         * @param point
         * @returns {Point}
         */
        __egretProto__.unrotate = function (point) {
            return mo.p(this.x * point.x + this.y * point.y, this.y * point.x - this.x * point.y);
        };
        Object.defineProperty(__egretProto__, "lengthSQ", {
            /**
             * 计算点到原点的距离平方？
             * @returns {number}
             */
            get: function () {
                return this.dot(this);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 到某个点的距离平方。
         * @param point
         * @returns {number}
         */
        __egretProto__.distanceSQTo = function (point) {
            return this.sub(point).lengthSQ;
        };
        /**
         * @deprecated
         * @param point
         * @returns {number}
         */
        __egretProto__.distanceSQ = function (point) {
            mo.warn("Point#distanceSQ已经废弃，请使用Point#distanceSQTo");
            return this.sub(point).lengthSQ;
        };
        Object.defineProperty(__egretProto__, "length", {
            /**
             * 获取点到原点的距离。
             * @returns {number}
             */
            get: function () {
                return Math.sqrt(this.lengthSQ);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取该点到某点的距离。
         * @param point
         * @returns {number}
         */
        __egretProto__.distanceTo = function (point) {
            return Math.sqrt(this.distanceSQTo(point));
        };
        /**
         * @deprecated
         * @param point
         * @returns {number}
         */
        __egretProto__.distance = function (point) {
            mo.warn("Point#distance已经废弃，请使用Point#distanceTo");
            return Math.sqrt(this.distanceSQTo(point));
        };
        /**
         * 获取单位向量。
         * @returns {Point}
         */
        __egretProto__.normalize = function () {
            if (!this.length)
                return mo.p(0, 0); //如果长度为0
            return this.mult(1.0 / this.length);
        };
        __egretProto__.toAngle = function () {
            return Math.atan2(this.y, this.x);
        };
        return Point;
    })(egret.Point);
    mo.Point = Point;
    Point.prototype.__class__ = "mo.Point";
    function p(x, y, resultPoint) {
        var xValue = 0, yValue = 0, result;
        if (arguments.length == 1) {
            xValue = x.x;
            yValue = x.y;
        }
        else if (arguments.length == 2) {
            if (typeof y == "number") {
                xValue = x;
                yValue = y;
            }
            else {
                result = arguments[1];
                xValue = x.x;
                yValue = x.y;
            }
        }
        else {
            xValue = x;
            yValue = y;
        }
        if (!result) {
            result = new Point();
        }
        result._setX(xValue);
        result._setY(yValue);
        return result;
    }
    mo.p = p;
})(mo || (mo = {}));
