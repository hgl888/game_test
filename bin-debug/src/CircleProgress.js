var CircleMaskContainer = (function (_super) {
    __extends(CircleMaskContainer, _super);
    function CircleMaskContainer() {
        _super.call(this);
        this._degrees = 0;
        this._sdeg = 0;
    }
    var __egretProto__ = CircleMaskContainer.prototype;
    Object.defineProperty(__egretProto__, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (value) {
            this._offset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "bitmap", {
        set: function (value) {
            this._bgBitmap = value;
            this.width = value.width;
            this.height = value.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "degrees", {
        get: function () {
            return this._degrees;
        },
        set: function (value) {
            this._degrees = value;
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__._render = function (context) {
        var ctx;
        if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5) {
            ctx = context["drawCanvasContext"];
            context["_transformTx"] = context["_transformTy"] = 0;
            var worldTransform = this._worldTransform;
            ctx.setTransform(worldTransform.a, worldTransform.b, worldTransform.c, worldTransform.d, worldTransform.tx, worldTransform.ty);
        }
        else {
            ctx = __global["egret_native"]["rastergl"];
        }
        var deg = Math.PI / 180;
        var whalf = this._bgBitmap.width / 2;
        var hhalf = this._bgBitmap.height / 2;
        var w = this._bgBitmap.width;
        var h = this._bgBitmap.height;
        var x = whalf + this._offset.x;
        var y = hhalf + this._offset.y;
        this.sector(ctx, x, y, Math.max(w, h), this._sdeg * deg, (((this._edeg - this._sdeg) * (1 - this._degrees / 360)) + this._sdeg) * deg);
    };
    Object.defineProperty(__egretProto__, "sdeg", {
        get: function () {
            return this._sdeg;
        },
        set: function (value) {
            this._sdeg = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "edeg", {
        get: function () {
            return this._edeg;
        },
        set: function (value) {
            this._edeg = value;
        },
        enumerable: true,
        configurable: true
    });
    __egretProto__.sector = function (ctx, x, y, radius, sdeg, edeg) {
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, sdeg, edeg);
        ctx.fill();
    };
    return CircleMaskContainer;
})(egret.DisplayObjectContainer);
CircleMaskContainer.prototype.__class__ = "CircleMaskContainer";
var CircleProgress = (function (_super) {
    __extends(CircleProgress, _super);
    function CircleProgress() {
        _super.apply(this, arguments);
        this._degrees = 0;
        this._offset = new egret.Point();
    }
    var __egretProto__ = CircleProgress.prototype;
    Object.defineProperty(__egretProto__, "bitmap", {
        set: function (value) {
            this._bitmap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "percentage", {
        get: function () {
            return this._degrees;
        },
        set: function (value) {
            if (this.texture) {
                this.texture.dispose();
            }
            this._degrees = value;
            value = value * 3.6;
            var container = new CircleMaskContainer();
            container.bitmap = this._bitmap;
            container.degrees = value;
            container.sdeg = this._sdeg;
            container.edeg = this._edeg;
            container.offset = this._offset;
            var r = new egret.RenderTexture();
            r.drawToTexture(container, new egret.Rectangle(0, 0, this._bitmap.width, this._bitmap.height));
            var c = new egret.DisplayObjectContainer();
            c.addChild(this._bitmap);
            var mask = new egret.Bitmap(r);
            mask.blendMode = egret.BlendMode.ERASE_REVERSE;
            c.addChild(mask);
            var result = new egret.RenderTexture();
            result.drawToTexture(c);
            this.texture = result;
            r.dispose();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (value) {
            this._offset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "sdeg", {
        get: function () {
            return this._sdeg;
        },
        set: function (value) {
            this._sdeg = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(__egretProto__, "edeg", {
        get: function () {
            return this._sdeg;
        },
        set: function (value) {
            this._edeg = value;
        },
        enumerable: true,
        configurable: true
    });
    return CircleProgress;
})(egret.Bitmap);
CircleProgress.prototype.__class__ = "CircleProgress";
