/**
 * Created by SmallAiTT on 2015/3/11.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "mo_arm";
    unit.registerTestBtn("armature", function () {
        res.load([res_consts.arm.role_02300], function () {
            var parent = unit.testContainer;
            var num = 10;
            for (var i = 0; i < num; ++i) {
                var node = mo.Armature.create(res_consts.arm.role_02300);
                node.x = (i + 1) * 200;
                node.y = 500;
                parent.addChild(node);
                node.playWithIndex(0);
            }
        });
    });
    unit.registerTestBtn("arm Dynamic", function () {
        var parent = unit.testContainer;
        var node = mo.Armature.createDynamic(res_consts.arm.ui_02025, function (arm) {
            arm.playWithIndex(0);
        });
        node.x = 800;
        node.y = 500;
        parent.addChild(node);
    });
    unit.registerTestBtn("armFactory produce ", function () {
        var parent = unit.testContainer;
        var fac = mo.ArmatureFactory.getInstance();
        var armPath = res_consts.arm.ui_02025;
        res.load([armPath], function () {
            var node = fac.produce(armPath);
            node.x = 800;
            node.y = 500;
            parent.addChild(node);
            node.playWithIndex(0);
        });
    });
    unit.registerTestBtn("armFactory Dynamic ", function () {
        var parent = unit.testContainer;
        var fac = mo.ArmatureFactory.getInstance();
        var armPath = res_consts.arm.ui_02025;
        res.load([armPath], function () {
            var node = fac.produceDynamic(armPath, function (arm) {
                arm.playWithIndex(0);
            });
            node.x = 800;
            node.y = 500;
            parent.addChild(node);
        });
    });
    unit.registerTestBtn("rm armature", function () {
        var container = new egret.DisplayObjectContainer();
        var resArr = ["arm/role_02000.arm", "arm/role_02050.arm", "arm/role_02100.arm", "arm/role_02150.arm", "arm/role_02200.arm", "arm/role_02250.arm", "arm/role_02300.arm", "arm/role_02350.arm", "arm/role_02400.arm", "arm/role_02450.arm"];
        var num = 5;
        var text1 = new egret.TextField();
        text1.text = "增加";
        text1.size = 100;
        text1.x = 10;
        text1.y = 10;
        text1.textColor = 0xff0000;
        text1.touchEnabled = true;
        container.addChild(text1);
        text1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            text1.text = "加载中";
            text2.text = "减少";
            res.load(resArr, function () {
                for (var i = 0; i < 10 * num; ++i) {
                    var node = mo.Armature.create(resArr[i % 10]);
                    node.x = ((i + 1) % 10) * 200;
                    node.y = 500 + 400 * Math.floor(i / 10);
                    container.addChild(node);
                    node.playWithIndex(0);
                }
            });
        }, this);
        var text2 = new egret.TextField();
        text2.text = "减少";
        text2.size = 100;
        text2.x = 10;
        text2.y = 380;
        text2.textColor = 0xff0000;
        text2.touchEnabled = true;
        container.addChild(text2);
        text2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            text2.text = "删除";
            text1.text = "增加";
            for (var j = 0; j < num; j++) {
                for (var i = 0; i < 10 && container.numChildren > 2; ++i) {
                    var node = container.getChildAt(2);
                    container.removeChild(node);
                }
                res.unload(resArr);
            }
        }, this);
        var parent = unit.testContainer;
        parent.addChild(container);
    });
    unit.registerTestBtn("dbarmature", function () {
        var container = new egret.DisplayObjectContainer();
        var resArr = ["role_02000"];
        var promise = new egret.PromiseObject();
        promise.onSuccessFunc = function (name) {
        };
        var factory = new egret_native.dragonBones.Factory();
        factory.loadTextureAtlas("resource/arm/" + resArr[0] + "_texture.json", "resource/arm/" + resArr[0] + "_texture.png", resArr[0]);
        factory["loadDragonBonesDataAsync"]("resource/arm/" + resArr[0] + "_ske.json", resArr[0], promise);
        var num = 1;
        var text1 = new egret.TextField();
        text1.text = "增加";
        text1.size = 100;
        text1.x = 10;
        text1.y = 10;
        text1.textColor = 0xff0000;
        text1.touchEnabled = true;
        container.addChild(text1);
        text1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            text1.text = "加载中";
            text2.text = "减少";
            for (var i = 0; i < 1 * num; ++i) {
                var armature = factory.buildArmatrue(resArr[0]);
                var node = armature.getDisplay();
                node.x = ((i + 1) % 10) * 200;
                node.y = 500 + 400 * Math.floor(i / 10);
                container.addChild(node);
                armature.animation.gotoAndPlay("steady", 0);
            }
        }, this);
        var text2 = new egret.TextField();
        text2.text = "减少";
        text2.size = 100;
        text2.x = 10;
        text2.y = 380;
        text2.textColor = 0xff0000;
        text2.touchEnabled = true;
        container.addChild(text2);
        text2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            text2.text = "删除";
            text1.text = "增加";
            for (var j = 0; j < num; j++) {
                for (var i = 0; i < 1 && container.numChildren > 2; ++i) {
                    container.removeChildAt(2);
                }
            }
        }, this);
        var parent = unit.testContainer;
        parent.addChild(container);
    });
})(unit || (unit = {}));
