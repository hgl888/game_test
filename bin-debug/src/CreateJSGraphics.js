var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CreateJSGraphics = (function (_super) {
    __extends(CreateJSGraphics, _super);
    function CreateJSGraphics() {
        _super.apply(this, arguments);
        //this.pgame = pgame;
    }
    Object.defineProperty(CreateJSGraphics.prototype, "graphics", {
        get: function () {
            if (!this._graphics) {
                this._graphics = new createjs.Graphics();
                this.needDraw = true;
            }
            return this._graphics;
        },
        enumerable: true,
        configurable: true
    });
    CreateJSGraphics.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
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
    CreateJSGraphics.prototype._render = function (renderContext) {
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
        //this.pgame.render( 10 );
    };
    return CreateJSGraphics;
})(egret.DisplayObject);
CreateJSGraphics.prototype.__class__ = "CreateJSGraphics";
