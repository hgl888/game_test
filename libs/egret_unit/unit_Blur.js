/**
 * Created by SmallAiTT on 2015/3/6.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "egret";
    unit.registerTestBtn("Blur", function () {
        res.load([res_consts.img.icon_win, res_consts.img.icon_lose], function (err, textureArr) {
            var parent = unit.testContainer;
            var filter = new egret.BlurFilter(3, 3);
            var icon_win = new egret.Bitmap;
            icon_win.texture = textureArr[0];
            icon_win.filter = filter;
            icon_win.x = 300;
            icon_win.y = 300;
            // 1.截取整个场景
            // 缩小4倍
            var bounds = new egret.Rectangle();
            bounds.x = 0;
            bounds.y = 0;
            bounds.width = icon_win.width;
            bounds.height = icon_win.height;
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(icon_win, bounds, 1);
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
            var finallyTexture = new egret.RenderTexture();
            finallyTexture.drawToTexture(bitmap);
            // 4.加到场景里
            bitmap.texture = finallyTexture;
            bitmap.anchorX = 0.5;
            bitmap.anchorY = 0.5;
            bitmap.x = unit.testContainer.width / 2;
            bitmap.y = unit.testContainer.width / 2;
            parent.addChild(bitmap);
            bitmap.filter = null;
            // 6.释放临时rendertexture
            renderTexture.dispose();
            renderTexture1.dispose();
        });
    });
})(unit || (unit = {}));
