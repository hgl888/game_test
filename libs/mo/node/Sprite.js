/**
 * Created by Administrator on 2014/12/22.
 */
var mo;
(function (mo) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(texture) {
            _super.call(this);
            /**
             * 单个Bitmap是否开启DEBUG模式
             * @member {boolean} egret.Bitmap#debug
             * @private
             */
            this.debug = false;
            /**
             * debug边框颜色，默认值为红色
             * @member {number} egret.Bitmap#debugColor
             * @private
             */
            this.debugColor = 0xff0000;
            /**
             * 矩形区域，它定义位图对象的九个缩放区域。此属性仅当fillMode为BitmapFillMode.SCALE时有效。
             * scale9Grid的x、y、width、height分别代表九宫图中中间那块的左上点的x、y以及中间方块的宽高。
             * @member {egret.Texture} egret.Bitmap#scale9Grid
             */
            this.scale9Grid = null;
            /**
             * 确定位图填充尺寸的方式。
             * 设置为 BitmapFillMode.REPEAT时，位图将重复以填充区域；BitmapFillMode.SCALE时，位图将拉伸以填充区域。
             * 默认值：BitmapFillMode.SCALE。
             * @member {egret.Texture} egret.Bitmap#fillMode
             */
            this.fillMode = "scale";
            var self = this;
            if (texture) {
                self._texture = texture;
                self._setSizeDirty();
                self._nodeOption.nodeSizeDirty = true;
                self._dirty = true;
            }
        }
        var __egretProto__ = Sprite.prototype;
        __egretProto__.init = function (fileName) {
            var texture = res.getRes(fileName);
            this.texture = texture;
        };
        Object.defineProperty(__egretProto__, "texture", {
            /**
             * 渲染纹理
             * @member {egret.Texture} egret.Bitmap#texture
             */
            get: function () {
                return this._texture;
            },
            set: function (value) {
                var self = this;
                if (value == self._texture) {
                    return;
                }
                self._setSizeDirty();
                self._texture = value;
                self._nodeOption.nodeSizeDirty = true;
                self._dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._render = function (renderContext) {
            var texture = this._texture;
            if (!texture) {
                this._texture_to_render = null;
                return;
            }
            this._texture_to_render = texture;
            var destW = this._hasWidthSet ? this._explicitWidth : texture._textureWidth;
            var destH = this._hasHeightSet ? this._explicitHeight : texture._textureHeight;
            egret.Bitmap._drawBitmap(renderContext, destW, destH, this);
        };
        Sprite.__className = "Sprite";
        /**
         * 全部Bitmap是否开启DEBUG模式
         * @member {boolean} egret.Bitmap.debug
         * @private
         */
        Sprite.debug = false;
        Sprite.renderFilter = egret.RenderFilter.getInstance();
        return Sprite;
    })(mo.Node);
    mo.Sprite = Sprite;
    Sprite.prototype.__class__ = "mo.Sprite";
})(mo || (mo = {}));
