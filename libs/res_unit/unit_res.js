/**
 * Created by SmallAiTT on 2015/3/14.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "res";
    unit.registerTestBtn("loadResCfgItem", function () {
        var resCfgItem = res.getResCfgItem(res_consts.img.icon_win);
        res.loadResCfgItem(resCfgItem, function (data, resCfgItem) {
            unit.debug("加载完毕!");
            if (data) {
                var bmp = new egret.Bitmap();
                bmp.texture = data;
                unit.testContainer.addChild(bmp);
                bmp.x = 500;
                bmp.y = 500;
            }
        }, null);
    });
    unit.registerTestBtn("loadResCfgItem 1", function () {
        var resCfgItem = new res.ResCfgItem();
        resCfgItem.name = "test";
        resCfgItem.url = "project.json";
        resCfgItem.type = "json";
        res.loadResCfgItem(resCfgItem, function (data, resCfgItem) {
            console.debug("data--->", data);
            console.debug("resCfgItem--->", resCfgItem);
        });
    });
    unit.registerTestBtn("loadResCfgItem 2", function () {
        var resCfgItem = new res.ResCfgItem();
        resCfgItem.url = "project.json";
        resCfgItem.type = "json";
        res.loadResCfgItem(resCfgItem, function (data, resCfgItem) {
            console.debug("data--->", data);
            console.debug("resCfgItem--->", resCfgItem);
        });
    });
    unit.registerTestBtn("loadWidthOption", function () {
        var parent = unit.testContainer;
        var pWidth = parent.width, pHeight = parent.height;
        var resCfgItem1 = res.getResCfgItem(res_consts.img.icon_win);
        var resCfgItem2 = res.getResCfgItem(res_consts.img.icon_win);
        resCfgItem2.name = "iconWin";
        var loadOpt4Res = {
            onEnd: function (err, results) {
                for (var i = 0, l_i = results.length; i < l_i; i++) {
                    var texture = results[i];
                    var bmp = new egret.Bitmap();
                    bmp.texture = texture;
                    var rand1 = Math.random(), rand2 = Math.random();
                    bmp.x = rand1 * pWidth;
                    bmp.y = rand2 * pHeight;
                    parent.addChild(bmp);
                }
            },
            onEach: function (data, rci) {
                console.log("onEach---->", rci.name, rci.url);
            }
        };
        res.loadWidthOption([resCfgItem1, resCfgItem2, res_consts.img.icon_win], loadOpt4Res);
    });
    unit.registerTestBtn("load", function () {
        var parent = unit.testContainer;
        var pWidth = parent.width, pHeight = parent.height;
        var resCfgItem1 = res.getResCfgItem(res_consts.img.icon_win);
        var resCfgItem2 = res.getResCfgItem(res_consts.img.icon_win);
        resCfgItem2.name = "iconWin";
        res.load([resCfgItem1, resCfgItem2, res_consts.img.icon_win], function (err, results) {
            for (var i = 0, l_i = results.length; i < l_i; i++) {
                var texture = results[i];
                var bmp = new egret.Bitmap();
                bmp.texture = texture;
                var rand1 = Math.random(), rand2 = Math.random();
                bmp.x = rand1 * pWidth;
                bmp.y = rand2 * pHeight;
                parent.addChild(bmp);
            }
        });
    });
    unit.registerTestBtn("same audio", function () {
        var url = res_consts.audio.death_02000;
        unit.debug("正在加载两个相同路径的audio：%s", url);
        res.load([url, url], function () {
            unit.debug("加载成功！");
            var audio = res.getRes(url);
            audio.play();
        });
    });
    unit.registerTestBtn("load unload load", function () {
        var resArr = [res_consts.img.icon_win];
        res.load(resArr, function (err, results) {
            unit.debug("res.load 第一次 数量---->【%s】", results.length);
            res.unload(resArr);
            res.load(resArr, function (err, results) {
                unit.debug("res.load 卸载后再次加载 数量---->【%s】", results.length);
            });
        });
    });
    unit.registerTestBtn("t_monster.json", function () {
        var resArr = [res_consts.json.t_monster];
        res.load(resArr, function () {
            unit.debug("加载完毕！");
        });
    });
})(unit || (unit = {}));
