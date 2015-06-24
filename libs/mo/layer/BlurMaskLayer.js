var mo;
(function (mo) {
    var BlurMaskLayer = (function (_super) {
        __extends(BlurMaskLayer, _super);
        function BlurMaskLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BlurMaskLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._setPenetrable(true); //托盘设置为可穿透
        };
        __egretProto__.init = function (tray) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _super.prototype.init.call(this);
            var self = this;
            // 1.截取整个场景
            // 缩小4倍
            var scale = 0.25;
            var scene = mo.runningScene;
            var bounds = new egret.Rectangle();
            var p = scene.globalToLocal(0, 0);
            var stage = mo.getStage();
            bounds.x = p.x;
            bounds.y = p.y;
            bounds.width = stage.stageWidth * scale;
            bounds.height = stage.stageHeight * scale;
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(scene, bounds, scale);
            // 2.水平像素模糊
            var filter = new egret.BlurFilter(1, 0);
            var bitmap = new egret.Bitmap();
            bitmap.texture = renderTexture;
            bitmap.filter = filter;
            var renderTexture1 = new egret.RenderTexture();
            renderTexture1.drawToTexture(bitmap);
            // 3.垂直像素模糊
            filter.blurX = 0;
            filter.blurY = 1;
            bitmap.texture = renderTexture1;
            var finallyTexture = self._finallyTexture = new egret.RenderTexture();
            finallyTexture.drawToTexture(bitmap);
            // 4.加到场景里
            bitmap.texture = finallyTexture;
            bitmap.anchorX = 0.5;
            bitmap.anchorY = 0.5;
            bitmap.x = stage.stageWidth / 2;
            bitmap.y = stage.stageHeight / 2;
            self.addChild(bitmap);
            bitmap.filter = null;
            // 5.缩放到正常大小
            bitmap.scaleX *= self.width / bitmap.width;
            bitmap.scaleY *= self.height / bitmap.height;
            // 6.释放临时rendertexture
            renderTexture.dispose();
            renderTexture1.dispose();
        };
        //@override
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            this._finallyTexture.dispose();
        };
        BlurMaskLayer.__className = "BlurMaskLayer";
        return BlurMaskLayer;
    })(mo.Layer);
    mo.BlurMaskLayer = BlurMaskLayer;
    BlurMaskLayer.prototype.__class__ = "mo.BlurMaskLayer";
})(mo || (mo = {}));
