//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var as3;
(function (as3) {
    var BitmapData = (function (_super) {
        __extends(BitmapData, _super);
        function BitmapData(width, height, transparent, fillColor) {
            if (transparent === void 0) { transparent = true; }
            if (fillColor === void 0) { fillColor = 0xFFFFFFFF; }
            _super.call(this);
            this._lock = false;
            var graphics = BitmapData.shape.graphics;
            var alpha;
            if (transparent) {
                alpha = 1;
            }
            else {
                alpha = Math.floor(fillColor / Math.pow(2, 24)) / 255;
            }
            graphics.clear();
            graphics.beginFill(fillColor & 0xFFFFFF, alpha);
            graphics.drawRect(0, 0, width, height);
            graphics.endFill();
            this.drawToTexture(BitmapData.shape, new egret.Rectangle(0, 0, width, height));
        }
        var __egretProto__ = BitmapData.prototype;
        //public fillRect(rect:egret.Rectangle, color:number):void {
        //    this._fill(rect.x, rect.y, rect.width, rect.height, color);
        //}
        /**
         * 设置 BitmapData 对象的单个像素。
         * @method as3.BitmapData#setPixel
         */
        __egretProto__.setPixel = function (x, y, color) {
            this._fill(x, y, 1, 1, color, false, false);
        };
        //public setPixel32(x:number, y:number, color:number):void {
        //    this._fill(x, y, 1, 1, color);
        //}
        __egretProto__._fill = function (x, y, width, height, color, clear, hasAlpha) {
            if (clear === void 0) { clear = false; }
            if (hasAlpha === void 0) { hasAlpha = true; }
            var graphics = BitmapData.shape.graphics;
            var alpha;
            if (hasAlpha) {
                alpha = Math.floor(color / Math.pow(2, 24)) / 255;
            }
            else {
                alpha = 1;
            }
            graphics.clear();
            graphics.beginFill(color & 0xFFFFFF, alpha);
            graphics.drawRect(0, 0, width, height);
            graphics.endFill();
            BitmapData.renderTexture.drawToTexture(BitmapData.shape, new egret.Rectangle(0, 0, width, height));
            this.begin();
            var renderContext = this.renderContext;
            if (clear) {
            }
            renderContext.drawImage(BitmapData.renderTexture, 0, 0, width, height, x, y, width, height);
            this.end();
        };
        Object.defineProperty(__egretProto__, "width", {
            /**
             * 位图图像的宽度，以像素为单位。
             * @member {number} as3.BitmapData#width
             */
            get: function () {
                return this._textureWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "height", {
            /**
             * 位图图像的高度，以像素为单位。
             * @member {number} as3.BitmapData#height
             */
            get: function () {
                return this._textureHeight;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 为没有拉伸、旋转或色彩效果的图像之间的像素处理提供一个快速例程。此方法在目标 BitmapData 对象的目标点将源图像的矩形区域复制为同样大小的矩形区域。
         * @method as3.BitmapData#copyPixels
         * @param sourceBitmapData {as3.BitmapData} 要从中复制像素的输入位图图像。源图像可以是另一个 BitmapData 实例，也可以指当前 BitmapData 实例。
         * @param sourceRect {egret.Rectangle} 定义要用作输入的源图像区域的矩形。
         * @param destPoint {egret.Point} 目标点，它表示将在其中放置新像素的矩形区域的左上角。
         */
        __egretProto__.copyPixels = function (sourceBitmapData, sourceRect, destPoint, alphaBitmapData, alphaPoint, mergeAlpha) {
            if (alphaBitmapData === void 0) { alphaBitmapData = null; }
            if (alphaPoint === void 0) { alphaPoint = null; }
            if (mergeAlpha === void 0) { mergeAlpha = false; }
            var context = this.renderContext;
            this.begin();
            context.setAlpha(1, egret.BlendMode.NORMAL);
            context.drawImage(sourceBitmapData, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height, destPoint.x, destPoint.y, sourceRect.width, sourceRect.height);
            if (context instanceof egret.WebGLRenderer) {
                context["_drawWebGL"]();
            }
            this.end();
        };
        __egretProto__.lock = function () {
            this._lock = true;
        };
        __egretProto__.unlock = function (changeRect) {
            if (changeRect === void 0) { changeRect = null; }
            this._lock = false;
        };
        BitmapData.shape = new egret.Shape();
        BitmapData.renderTexture = new egret.RenderTexture();
        return BitmapData;
    })(egret.RenderTexture);
    as3.BitmapData = BitmapData;
    BitmapData.prototype.__class__ = "as3.BitmapData";
})(as3 || (as3 = {}));
