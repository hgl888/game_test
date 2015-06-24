/**
 * Created by SmallAiTT on 2015/3/14.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "egret";
    unit.registerTestBtn("Shape", function () {
        var container = unit.testContainer;
        var rectShp1 = new egret.Shape();
        rectShp1.graphics.beginFill(0xff0000, 1);
        rectShp1.graphics.drawRect(600, 0, 100, 200);
        rectShp1.graphics.endFill();
        container.addChild(rectShp1);
        var rectShp2 = new egret.Shape();
        rectShp2.x = 100;
        rectShp2.y = 100;
        rectShp2.graphics.beginFill(0x00ff00, 1);
        rectShp2.graphics.drawRect(600, 0, 100, 200);
        rectShp2.graphics.endFill();
        container.addChild(rectShp2);
        var circleShp = new egret.Shape();
        circleShp.x = 200;
        circleShp.y = 200;
        circleShp.graphics.lineStyle(10, 0x00ff00);
        circleShp.graphics.beginFill(0xff0000, 1);
        circleShp.graphics.drawCircle(0, 0, 50);
        circleShp.graphics.endFill();
        container.addChild(circleShp);
        var lineShp1 = new egret.Shape();
        lineShp1.x = 400;
        lineShp1.y = 400;
        lineShp1.graphics.lineStyle(2, 0x00ff00);
        lineShp1.graphics.moveTo(10, 10);
        lineShp1.graphics.lineTo(100, 20);
        lineShp1.graphics.endFill();
        container.addChild(lineShp1);
        //北斗星
        var lineShp2 = new egret.Shape();
        lineShp2.x = 600;
        lineShp2.y = 600;
        lineShp2.graphics.lineStyle(2, 0x00ff00);
        lineShp2.graphics.moveTo(68, 84);
        lineShp2.graphics.lineTo(167, 76);
        lineShp2.graphics.lineTo(221, 118);
        lineShp2.graphics.lineTo(290, 162);
        lineShp2.graphics.lineTo(297, 228);
        lineShp2.graphics.lineTo(412, 250);
        lineShp2.graphics.lineTo(443, 174);
        lineShp2.graphics.endFill();
        container.addChild(lineShp2);
        //曲线
        var lineShp3 = new egret.Shape();
        lineShp3.x = 800;
        lineShp3.y = 800;
        lineShp3.graphics.lineStyle(2, 0x00ff00);
        lineShp3.graphics.moveTo(50, 50);
        lineShp3.graphics.curveTo(100, 100, 200, 50);
        lineShp3.graphics.endFill();
        container.addChild(lineShp3);
    });
})(unit || (unit = {}));
