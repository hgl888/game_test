var unit;
(function (unit) {
    unit.curRegisterModule = "res";
    unit.registerTestBtn("res.ImageParser", function () {
        var parser = new res.ImageParser();
        var resCfgItem = res.getResCfgItem(res_consts.img.icon_win);
        parser.load(resCfgItem, function (data, resCfgItem) {
            console.debug("data--->", data);
            console.debug("resCfgItem--->", resCfgItem);
            var bitmap = new egret.Bitmap();
            bitmap.texture = data;
            unit.testContainer.addChild(bitmap);
        });
    });
})(unit || (unit = {}));
