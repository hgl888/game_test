/**
 * Created by SmallAiTT on 2015/3/6.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "egret";
    unit.registerTestBtn("DisplayObject", function () {
        res.load([res_consts.img.icon_win, res_consts.img.icon_lose], function (err, textureArr) {
            var parent = unit.testContainer;
            var num = 400;
            var pWidth = parent.width, pHeight = parent.height;
            for (var i = 0; i < num; ++i) {
                var rand1 = Math.random(), rand2 = Math.random();
                var texture = textureArr[i % 2];
                var node = new egret.DisplayObject();
                node.x = rand1 * pWidth;
                node.y = rand2 * pHeight;
                node.width = texture.textureWidth;
                node.height = texture.textureHeight;
                parent.addChild(node);
            }
        });
    });
})(unit || (unit = {}));
