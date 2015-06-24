/**
 * Created by SmallAiTT on 2015/3/6.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "egret";
    unit.registerTestBtn("UrlGet", function () {
        var container = unit.testContainer;
        var text = new egret.TextField();
        container.addChild(text);
        text.text = "start";
        text.size = 60;
        text.width = 800;
        text.x = 300;
        text.y = 300;
        var loader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function (e) {
            text.text = "complete" + e.currentTarget.data;
        }, this);
        loader.load(new egret.URLRequest("http://112.124.106.143:7100/?r=h.s.a&a={}"));
    });
})(unit || (unit = {}));
