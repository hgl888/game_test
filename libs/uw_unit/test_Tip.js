var unit;
(function (unit) {
    unit.curRegisterModule = "uw";
    unit.registerTestBtn("test_Tips", function () {
        res.root = "resource";
        res.load(["ui/uiGainTips.ui", "ui/ui_panel.json", "ui/ui_panel.png"], function () {
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                uw.Unit_ShowGainTips.show({ tempId: 1, count: 100 });
            }, this);
        }, this);
    });
})(unit || (unit = {}));
