var unit;
(function (unit) {
    unit.curRegisterModule = "res";
    unit.registerTestBtn("res.SheetParser", function () {
        var parser = new res.SheetParser();
        var resCfgItem = res.getResCfgItem(res_consts.sheet.ui_panel);
        parser.load(resCfgItem, function (sheet, resCfgItem) {
            console.debug("sheet--->", sheet);
            console.debug("resCfgItem--->", resCfgItem);
            var img = new egret.Bitmap();
            img.texture = sheet.getTexture("bar_loading.png");
            unit.testContainer.addChild(img);
            img.x = 100;
            img.y = 100;
        });
    });
})(unit || (unit = {}));
