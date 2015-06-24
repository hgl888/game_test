var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Test = (function (_super) {
    __extends(Test, _super);
    function Test() {
        _super.call(this);
    }
    Object.defineProperty(Test.prototype, "source", {
        set: function (value) {
            this._source = value;
            if (this._source) {
                this.width = this._source.width;
                this.height = this._source.height;
            }
        },
        enumerable: true,
        configurable: true
    });
    Test.prototype.ac = function () {
        var r = new egret.RenderTexture();
        r.drawToTexture(new Mask(), new egret.Rectangle(0, 0, this.width, this.height));
        this.texture = r;
        return;
        var c = new egret.DisplayObjectContainer();
        c.addChild(this._source);
        var mask = new egret.Bitmap(r);
        mask.blendMode = egret.BlendMode.ERASE_REVERSE;
        c.addChild(mask);
        var result = new egret.RenderTexture();
        result.drawToTexture(c);
        this.texture = result;
    };
    return Test;
})(egret.Bitmap);
Test.prototype.__class__ = "Test";
var Mask = (function (_super) {
    __extends(Mask, _super);
    function Mask() {
        _super.call(this);
        this.needDraw = true;
    }
    Mask.prototype._render = function (renderContext) {
        var ctx;
        if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5) {
            ctx = renderContext["drawCanvasContext"];
        }
        else {
            ctx = window["nativeCtx"];
        }
        ctx.beginPath();
        ctx.moveTo(20, 150);
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#ff0000";
        ctx.quadraticCurveTo(-20, 65, 40, 35);
        ctx.stroke();
    };
    return Mask;
})(egret.DisplayObject);
Mask.prototype.__class__ = "Mask";
