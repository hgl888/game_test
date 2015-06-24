var mo;
(function (mo) {
    var Rect = (function (_super) {
        __extends(Rect, _super);
        function Rect() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Rect.prototype;
        /**
         * 判断是否包含一个矩形区域
         * @param rect
         * @returns {boolean}
         */
        __egretProto__.containsRect = function (rect) {
            if (!rect)
                return false;
            var self = this;
            return !((self.x >= rect.x) || (self.y >= rect.y) || (self.x + self.width <= rect.x + rect.width) || (self.y + self.height <= rect.y + rect.height));
        };
        Object.defineProperty(__egretProto__, "maxX", {
            /**
             * 获取最大的x值
             * @returns {number}
             */
            get: function () {
                return this.x + this.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "midX", {
            /**
             * 获取中间的x值
             * @returns {number}
             */
            get: function () {
                return this.x + this.width / 2;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "maxY", {
            /**
             * 获取最大的y值
             * @returns {number}
             */
            get: function () {
                return this.y + this.height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "midY", {
            /**
             * 获取中间的y值
             * @returns {number}
             */
            get: function () {
                return this.y + this.height / 2;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 判断两个矩形框是否有交集
         * @param rect
         * @returns {boolean}
         */
        __egretProto__.overlaps = function (rect) {
            var self = this;
            return !((self.x + self.width < rect.x) || (rect.x + rect.width < self.x) || (self.y + self.height < rect.y) || (rect.y + rect.height < self.y));
        };
        /**
         * 和矩形框求并集。
         * @param rect
         * @returns {mo.Rect}
         */
        __egretProto__.union = function (rect) {
            var self = this;
            var rect = mo.rect(0, 0, 0, 0);
            rect.x = Math.min(self.x, rect.x);
            rect.y = Math.min(self.y, rect.y);
            rect.width = Math.max(self.x + self.width, rect.x + rect.width) - rect.x;
            rect.height = Math.max(self.y + self.height, rect.y + rect.height) - rect.y;
            return rect;
        };
        __egretProto__.getIntersection = function (rect) {
            var self = this;
            var intersection = mo.rect(Math.max(self.x, rect.x), Math.max(self.y, rect.y), 0, 0);
            intersection.width = Math.min(self.maxX, rect.maxX) - intersection.x;
            intersection.height = Math.min(self.maxY, rect.maxY) - intersection.y;
            return intersection;
        };
        __egretProto__.clone = function (temp) {
            var self = this;
            if (!temp) {
                temp = new Rect();
            }
            temp.x = self.x;
            temp.y = self.y;
            temp.width = self.width;
            temp.height = self.height;
            return temp;
        };
        return Rect;
    })(egret.Rectangle);
    mo.Rect = Rect;
    Rect.prototype.__class__ = "mo.Rect";
    function rect(x, y, width, height, resultRect) {
        if (resultRect) {
            resultRect.x = x;
            resultRect.y = y;
            resultRect.width = width;
            resultRect.height = height;
            return resultRect;
        }
        return new Rect(x, y, width, height);
    }
    mo.rect = rect;
})(mo || (mo = {}));
