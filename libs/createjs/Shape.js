var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/1/22.
 */
var createjs;
(function (createjs) {
    var Shape = (function (_super) {
        __extends(Shape, _super);
        function Shape() {
            _super.call(this);
            this._off = false;
            this.isMaskGlobal = false;
            this.id = G.getId();
        }
        Shape.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (scaleX === void 0) { scaleX = 1; }
            if (scaleY === void 0) { scaleY = 1; }
            if (rotation === void 0) { rotation = 0; }
            if (skewX === void 0) { skewX = 0; }
            if (skewY === void 0) { skewY = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            this.x = x || 0;
            this.y = y || 0;
            this.scaleX = scaleX == null ? 1 : scaleX;
            this.scaleY = scaleY == null ? 1 : scaleY;
            this.rotation = rotation || 0;
            this.skewX = skewX || 0;
            this.skewY = skewY || 0;
            this.anchorX = (regX || 0) / this.width;
            this.anchorY = (regY || 0) / this.height;
            return this;
        };
        Object.defineProperty(Shape.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                if (this._x != value) {
                    this._setX(value);
                    this.tellChange();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                if (this._y != value) {
                    this._setY(value);
                    this.tellChange();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "graphics", {
            get: function () {
                if (!this._graphics) {
                    this._graphics = new createjs.Graphics();
                    this.needDraw = true;
                }
                return this._graphics;
            },
            set: function (value) {
                if (this._graphics != value) {
                    this._graphics = value;
                    if (value) {
                        this.needDraw = true;
                    }
                    else {
                        this.needDraw = false;
                    }
                    this.tellChange();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Shape.prototype, "maskTarget", {
            set: function (value) {
                this._maskTarget = value;
            },
            enumerable: true,
            configurable: true
        });
        Shape.prototype.tellChange = function () {
            if (this._maskTarget) {
                this._maskTarget.maskChange();
            }
        };
        Shape.prototype._render = function (renderContext) {
            if (this._graphics) {
                var ctx;
                if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5) {
                    ctx = renderContext["drawCanvasContext"];
                    renderContext["_transformTx"] = renderContext["_transformTy"] = 0;
                    var worldTransform = this._worldTransform;
                    ctx.setTransform(worldTransform.a, worldTransform.b, worldTransform.c, worldTransform.d, worldTransform.tx, worldTransform.ty);
                    this._graphics.draw(ctx);
                }
                else {
                    ctx = window["nativeCtx"];
                    this._graphics.draw(ctx);
                }
            }
        };
        Shape.prototype._measureBounds = function () {
            if (this._graphics) {
                return this._graphics._measureBounds();
            }
            return _super.prototype._measureBounds.call(this);
        };
        return Shape;
    })(egret.DisplayObject);
    createjs.Shape = Shape;
    Shape.prototype.__class__ = "createjs.Shape";
})(createjs || (createjs = {}));
