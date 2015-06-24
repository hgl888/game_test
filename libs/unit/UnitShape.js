var unit;
(function (unit) {
    var UnitShape = (function (_super) {
        __extends(UnitShape, _super);
        function UnitShape(width, height, color, name) {
            if (width === void 0) { width = 100; }
            if (height === void 0) { height = 100; }
            if (color === void 0) { color = 0xff0000; }
            _super.call(this);
            this._panelSizeDirty = true;
            this.name = "";
            this.width = width;
            this.height = height;
            this.color = color;
            this.name = name || "Shape_" + this.hashCode;
        }
        var __egretProto__ = UnitShape.prototype;
        Object.defineProperty(__egretProto__, "color", {
            get: function () {
                return this._color;
            },
            set: function (color) {
                if (this._color == color)
                    return;
                this._panelSizeDirty = true;
                this._color = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "graphics", {
            get: function () {
                if (!this._graphics) {
                    this._graphics = new egret.Graphics();
                }
                return this._graphics;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._updateTransform = function () {
            if (this._panelSizeDirty) {
                this._panelSizeDirty = false;
                var gs = this.graphics;
                gs.beginFill(this._color);
                gs.drawRect(0, 0, this.width, this.height);
                gs.endFill();
            }
            _super.prototype._updateTransform.call(this);
        };
        __egretProto__._render = function (renderContext) {
            if (this._graphics)
                this._graphics._draw(renderContext);
        };
        __egretProto__._setWidth = function (width) {
            if (this.width == width)
                return;
            this._panelSizeDirty = true;
            _super.prototype._setWidth.call(this, width);
        };
        __egretProto__._setHeight = function (height) {
            if (this.height == height)
                return;
            this._panelSizeDirty = true;
            _super.prototype._setHeight.call(this, height);
        };
        return UnitShape;
    })(egret.DisplayObject);
    unit.UnitShape = UnitShape;
    UnitShape.prototype.__class__ = "unit.UnitShape";
})(unit || (unit = {}));
