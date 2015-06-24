var mo;
(function (mo) {
    var Size = (function (_super) {
        __extends(Size, _super);
        function Size(width, height) {
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            _super.call(this);
            this.width = width;
            this.height = height;
        }
        var __egretProto__ = Size.prototype;
        /**
         * 克隆点对象
         * @method mo.Size#clone
         * @returns {mo.Size}
         */
        __egretProto__.clone = function () {
            return new Size(this.width, this.height);
        };
        /**
         * 确定两个Size是否相同。如果两个Size具有相同的 width 和 height 值，则它们相同。
         * @method mo.Size#equals
         * @param {mo.Size} toCompare 要比较的Size。
         * @returns {boolean} 如果该对象与此 Point 对象相同，则为 true 值，如果不相同，则为 false。
         */
        __egretProto__.equals = function (toCompare) {
            return this.width == toCompare.width && this.height == toCompare.height;
        };
        return Size;
    })(egret.HashObject);
    mo.Size = Size;
    Size.prototype.__class__ = "mo.Size";
    function size(width, height, resultSize) {
        var wValue = 0, hValue = 0, result;
        if (arguments.length == 1) {
            wValue = width.width;
            hValue = width.height;
        }
        else if (arguments.length == 2) {
            if (typeof height == "number") {
                wValue = width;
                hValue = height;
            }
            else {
                result = arguments[1];
                wValue = width.width;
                hValue = width.height;
            }
        }
        else {
            wValue = width;
            hValue = height;
        }
        result = result || new mo.Size();
        result.width = wValue;
        result.height = hValue;
        return result;
    }
    mo.size = size;
})(mo || (mo = {}));
