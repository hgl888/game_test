/**
 * Created by SmallAiTT on 2015/3/6.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "mo_ui";
    unit.registerTestBtn("UIPanel", function () {
        res.load([res_consts.img.icon_win, res_consts.img.icon_lose], function (err, textureArr) {
            var parent = unit.testContainer;
            var num = 400;
            var pWidth = parent.width, pHeight = parent.height;
            for (var i = 0; i < num; ++i) {
                var rand1 = Math.random(), rand2 = Math.random();
                var texture = textureArr[i % 2];
                var node = new mo.UIPanel();
                node.x = rand1 * pWidth;
                node.y = rand2 * pHeight;
                node.width = texture.textureWidth;
                node.height = texture.textureHeight;
                node.bgTexture = texture;
                parent.addChild(node);
            }
        });
    });
    unit.registerTestBtn("UIPanel2", function () {
        res.load([res_consts.img.icon_win, res_consts.img.icon_lose], function (err, textureArr) {
            var parent = unit.testContainer;
            var num = 400;
            var pWidth = parent.width, pHeight = parent.height;
            for (var i = 0; i < num; ++i) {
                var rand1 = Math.random(), rand2 = Math.random();
                var texture = textureArr[i % 2];
                var node = new mo.UIPanel();
                node.x = rand1 * pWidth;
                node.y = rand2 * pHeight;
                node.width = texture.textureWidth;
                node.height = texture.textureHeight;
                node.bgColor = i % 2 == 0 ? 0xff0000 : 0x0000ff;
                node.bgOpacity = 255;
                parent.addChild(node);
            }
        });
    });
})(unit || (unit = {}));
