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
                //ctx = egret_native.rastergl;
                egret_native.rastergl.beginPath();
                egret_native.rastergl.lineWidth = 5;
                egret_native.rastergl.strokeStyle = "#ff00ff";
                egret_native.rastergl.rect(10,10,100,100);
                egret_native.rastergl.stroke();
                //egret_native.rastergl.fill();
                //this._graphics.draw(ctx);
            }
        }
    };
    return CreateJSGraphics;
})(egret.DisplayObject);
CreateJSGraphics.prototype.__class__ = "CreateJSGraphics";
