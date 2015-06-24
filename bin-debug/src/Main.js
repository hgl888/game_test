var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__._onAddToStage = function () {
        _super.prototype._onAddToStage.call(this);
        egret.MainContext.__use_new_draw = false;
        egret.Profiler.getInstance().run();
        egret.Profiler.getInstance()._setTxtFontSize(60);
        var self = this, stage = self.stage;
        self.width = stage.stageWidth;
        self.height = stage.stageHeight;
        mo.loadProject(function () {
            mo.init();
            unit.init();
            //res.root = "resource";
            //var arr = [
            //    "json/c_arenaHighRankAward.json",
            //    "json/c_exchange.json",
            //    "json/c_game.json",
            //    "json/c_guide2.json",
            //    "json/c_heroCall.json",
            //    "json/c_loadingTips.json",
            //    "json/c_loadModule.json",
            //    "json/c_lottery.json",
            //    "json/c_lvl.json",
            //    "json/c_mail.json",
            //    "json/c_mirror.json",
            //    "json/c_msgCode.json",
            //    "json/c_nameData.json",
            //    "json/c_open.json",
            //    "json/c_payInfo.json",
            //    "json/c_rankReward.json",
            //    "json/c_recharge.json",
            //    "json/c_secret.json",
            //    "json/c_shop.json",
            //    "json/c_sign.json",
            //    "json/c_simulateFight.json",
            //    "json/c_subGuide.json",
            //    "json/c_vip.json",
            //    "json/t_buff.json",
            //    "json/t_combat.json",
            //    "json/t_copy.json",
            //    "json/t_copyLoot.json",
            //    "json/t_copyPrimary.json",
            //    "json/t_hero.json",
            //    "json/t_item.json",
            //    "json/t_itemEquip.json",
            //    "json/t_itemEquipExclusive.json",
            //    "json/t_itemLogic.json",
            //    "json/t_monster.json",
            //    "json/t_serverLoot.json",
            //    "json/t_skill.json",
            //    "json/t_skillDisplay.json",
            //    "json/t_task.json",
            //    "json/t_warrior.json"
            //];
            //res.load(arr, function(){
            //    console.log("-------------------配置文件加载完毕！----------")
            //});
        });
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
