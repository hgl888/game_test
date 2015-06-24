var uw;
(function (uw) {
    var SimulateFightScene = (function (_super) {
        __extends(SimulateFightScene, _super);
        function SimulateFightScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SimulateFightScene.prototype;
        __egretProto__.onEnter = function () {
            mo.Scene.prototype.onEnter();
            mo.playMusicById(res.audio_ui.bg_fight, true);
            //统计是否进入了模拟战斗
            uw.RecordDataCtrl.addLoadRecord(uw.id_c_loadModule.simulateFight);
        };
        SimulateFightScene.__className = "SimulateFightScene";
        return SimulateFightScene;
    })(uw.FightScene);
    uw.SimulateFightScene = SimulateFightScene;
    SimulateFightScene.prototype.__class__ = "uw.SimulateFightScene";
})(uw || (uw = {}));
