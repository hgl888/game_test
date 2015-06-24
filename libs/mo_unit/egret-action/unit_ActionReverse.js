/**
 * Created by lihex on 1/7/15.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "mo";
    unit.registerTestBtn("moveBy reverse", function () {
        var panel = mo.UIPanel.create();
        panel.bgColor = 0xff0000;
        panel.bgOpacity = 255;
        panel.width = 200;
        panel.height = 200;
        panel.x = 100;
        panel.y = 100;
        unit.testContainer.addChild(panel);
        var act = mo.moveBy(0.5, mo.p(100, 0));
        panel.runAction(mo.sequence(act, act.reverse()));
    });
    unit.registerTestBtn("fadeOut reverse", function () {
        var panel = mo.UIPanel.create();
        panel.bgColor = 0xff0000;
        panel.bgOpacity = 255;
        panel.width = 200;
        panel.height = 200;
        panel.x = 100;
        panel.y = 100;
        unit.testContainer.addChild(panel);
        var act = mo.fadeOut(0.5);
        panel.runAction(mo.sequence(act, act.reverse()));
    });
    unit.registerTestBtn("fadeIn reverse", function () {
        var panel = mo.UIPanel.create();
        panel.bgColor = 0xff0000;
        panel.bgOpacity = 255;
        panel.alpha = 0;
        panel.width = 200;
        panel.height = 200;
        panel.x = 100;
        panel.y = 100;
        unit.testContainer.addChild(panel);
        var act = mo.fadeIn(0.5);
        panel.runAction(mo.sequence(act, act.reverse()));
    });
    unit.registerTestBtn("rotate reverse", function () {
        var panel = mo.UIPanel.create();
        panel.bgColor = 0xff0000;
        panel.bgOpacity = 255;
        panel.width = 200;
        panel.height = 200;
        panel.x = 200;
        panel.y = 200;
        panel.anchorX = 0.5;
        panel.anchorY = 0.5;
        unit.testContainer.addChild(panel);
        var act = mo.rotateBy(0.5, 180);
        panel.runAction(mo.sequence(act, act.reverse()));
    });
    unit.registerTestBtn("scale reverse", function () {
        var panel = mo.UIPanel.create();
        panel.bgColor = 0xff0000;
        panel.bgOpacity = 255;
        panel.width = 200;
        panel.height = 200;
        panel.x = 200;
        panel.y = 200;
        panel.anchorX = 0.5;
        panel.anchorY = 0.5;
        unit.testContainer.addChild(panel);
        var act = mo.scaleBy(0.5, 2);
        panel.runAction(mo.sequence(act, act.reverse()));
    });
})(unit || (unit = {}));
