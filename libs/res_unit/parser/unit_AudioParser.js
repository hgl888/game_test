/**
 * Created by SmallAiTT on 2015/3/14.
 */
var unit;
(function (unit) {
    unit.curRegisterModule = "res";
    unit.registerTestBtn("AudioParser", function () {
        var parser = new res.AudioParser();
        var resCfgItem = res.getResCfgItem(res_consts.audio.death_02000);
        parser.load(resCfgItem, function (data, resCfgItem) {
            unit.debug("audio resource loaded");
            //debug("data--->", data);
            //debug("resCfgItem--->", resCfgItem);
            unit.debug("play audio begin");
            data.play();
            unit.debug("play audio end");
        });
    });
    unit.registerTestBtn("AudioParser delay5s", function () {
        var parser = new res.AudioParser();
        var resCfgItem = res.getResCfgItem(res_consts.audio.death_02000);
        parser.load(resCfgItem, function (data, resCfgItem) {
            unit.debug("audio resource loaded");
            //debug("data--->", data);
            //debug("resCfgItem--->", resCfgItem);
            egret.setTimeout(function () {
                unit.debug("play audio begin");
                data.play();
                unit.debug("play audio end");
            }, null, 5000);
        });
    });
    unit.registerTestBtn("AudioParser music", function () {
        res.AudioParser.addForMusicType(res_consts.audio.death_02000);
        var parser = new res.AudioParser();
        var resCfgItem = res.getResCfgItem(res_consts.audio.death_02000);
        parser.load(resCfgItem, function (data, resCfgItem) {
            unit.debug("audio resource loaded");
            unit.debug("play audio begin");
            data.play();
            unit.debug("play audio end");
        });
    });
})(unit || (unit = {}));
