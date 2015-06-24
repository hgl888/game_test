var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/1/21.
 */
var createjs;
(function (createjs) {
    var Bitmap = (function (_super) {
        __extends(Bitmap, _super);
        function Bitmap(textureid) {
            _super.call(this, null);
            this._off = false;
            this._tid = textureid;
            this.id = G.getId();
        }
        Bitmap.prototype._onAddToStage = function () {
            _super.prototype._onAddToStage.call(this);
            var newImage = this._tid;
            if (newImage != this._imgUrl) {
                this._retryed = false;
                this._imgUrl = newImage;
                this.loadRes();
            }
        };
        Bitmap.prototype.loadRes = function () {
            if (!RES.getRes(this._imgUrl)) {
                RES.parseConfig({ "resources": [{ "name": this._imgUrl, "type": "image", "url": this._imgUrl }] }, "resource/");
                RES.getResAsync(this._imgUrl, this.onload, this);
            }
            else {
                this.showImage();
            }
        };
        Bitmap.prototype.showImage = function () {
            this.texture = RES.getRes(this._imgUrl);
            if (!this.texture) {
                if (!this._retryed) {
                    this._retryed = true;
                    this.loadRes();
                    return;
                }
                egret.Logger.info("BitmapTexture Not Found", this._imgUrl);
            }
            else {
                var o = this._parent;
                while (o) {
                    o['_setCacheDirty']();
                    o = o._parent;
                }
            }
        };
        Bitmap.prototype.onload = function (data, key) {
            this.showImage();
        };
        Bitmap.prototype.setBounds = function (x, y, width, height) {
            this.width = width;
            this.height = height;
        };
        Bitmap.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
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
        return Bitmap;
    })(egret.Bitmap);
    createjs.Bitmap = Bitmap;
    Bitmap.prototype.__class__ = "createjs.Bitmap";
})(createjs || (createjs = {}));
