/**
 * Created by lihex on 1/7/15.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "mo";
    unit.registerTestBtn("moveBy clone", function () {
        var panel = mo.UIPanel.create();
        panel.bgColor = 0xff0000;
        panel.bgOpacity = 255;
        panel.width = 200;
        panel.height = 200;
        panel.x = 100;
        panel.y = 100;
        unit.testContainer.addChild(panel);
        var act = mo.moveBy(0.5, mo.p(100, 0));
        panel.runAction(mo.sequence(act, mo.callFunc(function () {
            mo.log("--->run clone action");
        }), act.clone()));
    });
    unit.registerTestBtn("fadeOut clone", function () {
        var panel = mo.UIPanel.create();
        panel.bgColor = 0xff0000;
        panel.bgOpacity = 255;
        panel.alpha = 1;
        panel.width = 200;
        panel.height = 200;
        panel.x = 100;
        panel.y = 100;
        unit.testContainer.addChild(panel);
        var act = mo.fadeOut(0.5);
        panel.runAction(mo.sequence(act, mo.callFunc(function () {
            panel.alpha = 1;
            mo.log("--->run clone action");
        }), act.clone()));
    });
    unit.registerTestBtn("fadeIn clone", function () {
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
        panel.runAction(mo.sequence(act, mo.callFunc(function () {
            panel.alpha = 0;
            mo.log("--->run clone action");
        }), act.clone()));
    });
    unit.registerTestBtn("rotate clone", function () {
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
        panel.runAction(mo.sequence(act, mo.callFunc(function () {
            mo.log("--->run clone action");
        }), act.clone()));
    });
})(unit || (unit = {}));
