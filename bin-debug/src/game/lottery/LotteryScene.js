var uw;
(function (uw) {
    var LotteryScene = (function (_super) {
        __extends(LotteryScene, _super);
        function LotteryScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LotteryScene.prototype;
        LotteryScene.preload = function (cb1) {
            var cca_ui = [
                res.cca_ui.effect_water,
                res.cca_ui.effect_getHero,
                res.cca_ui.goldChest,
                res.cca_ui.diamondChest,
                res.cca_ui.chestItemLight
            ];
            var uiArmFactory = uw.uiArmFactory;
            uiArmFactory.preload(cca_ui, function (err, result) {
                //预创建特效先啊
                uw.log(result);
                //                uiArmFactory.initObject(res.cca_ui.effect_water);
                cb1();
            });
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.LotteryLayer.create();
            self.layer.show();
            //统计是否进入了抽奖
            uw.RecordDataCtrl.addLoadRecord(uw.id_c_loadModule.lottery);
        };
        LotteryScene.__className = "LotteryScene";
        return LotteryScene;
    })(uw.ModuleScene);
    uw.LotteryScene = LotteryScene;
    LotteryScene.prototype.__class__ = "uw.LotteryScene";
})(uw || (uw = {}));
