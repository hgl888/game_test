/**
 * Created by SmallAiTT on 2015/4/21.
 */
var uw;
(function (uw) {
    /**
     * 分享功能控制器
     */
    var SharedCtrl = (function (_super) {
        __extends(SharedCtrl, _super);
        function SharedCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SharedCtrl.prototype;
        __egretProto__.init = function () {
            _super.prototype.init.call(this, {});
            var self = this;
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            var sharedCfg = c_game[uw.id_c_game.sharedCfg];
            var lvls = self._userLvlsToShared = sharedCfg[0].split(",");
            var tids = self._tidsToShared = sharedCfg[1].split(",");
            for (var i = 0, l_i = lvls.length; i < l_i; i++) {
                lvls[i] = parseInt(lvls[i]);
            }
            for (var i = 0, l_i = tids.length; i < l_i; i++) {
                tids[i] = parseInt(tids[i]);
            }
            uw.UserDataCtrl.registerByKey(uw.dsConsts.UserEntity.lvl, self._onShared4Lvl, self);
            uw.TowerDataCtrl.registerByKey(uw.TowerDataCtrl.ON_HIGHER_LAYER, self._onShared4Tower, self);
            uw.ArenaDataCtrl.registerByKey(uw.ArenaDataCtrl.ON_HIGHER_RANK, self._onShared4Arena, self);
            uw.UserDataCtrl.registerByKey(uw.UserDataCtrl.ON_CALL_HERO, self._onShared4NewHero, self);
            uw.UserDataCtrl.registerByKey(uw.UserDataCtrl.ON_GET_EQUIPS, self._onShared4Exclusive, self);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            uw.UserDataCtrl.unregisterByKey(uw.dsConsts.UserEntity.lvl, self._onShared4Lvl, self);
            uw.TowerDataCtrl.unregisterByKey(uw.TowerDataCtrl.ON_HIGHER_LAYER, self._onShared4Tower, self);
            uw.ArenaDataCtrl.unregisterByKey(uw.ArenaDataCtrl.ON_HIGHER_RANK, self._onShared4Arena, self);
            uw.UserDataCtrl.unregisterByKey(uw.UserDataCtrl.ON_CALL_HERO, self._onShared4NewHero, self);
            uw.UserDataCtrl.unregisterByKey(uw.UserDataCtrl.ON_GET_EQUIPS, self._onShared4Exclusive, self);
        };
        //领主等级分享
        __egretProto__._onShared4Lvl = function (lvl) {
            var lvls = []; //TODO 要分享的等级
            if (lvls.indexOf(lvl) >= 0) {
                //TODO 领主等级升级，进行分享弹框操作
                uw.debug("领主等级升级，进行分享弹框操作", lvl);
            }
        };
        //守卫塔分享
        __egretProto__._onShared4Tower = function (layer) {
            //第一次通关要分享
            if (layer == 1) {
                //TODO 守卫塔第一次通关，进行分享弹框操作
                uw.debug("守卫塔第一次通关，进行分享弹框操作");
            }
            else if ((layer + 1) % 5 == 0) {
                //TODO 守卫塔，进行分享弹框操作
                uw.debug("守卫塔，进行分享弹框操作", layer);
            }
        };
        //竞技场历史最高排名分享
        __egretProto__._onShared4Arena = function (rank) {
            //TODO 竞技场获得历史最高排名，进行分享弹框操作
            uw.debug("竞技场获得历史最高排名，进行分享弹框操作", rank);
        };
        //获得新英雄分享
        __egretProto__._onShared4NewHero = function (heroCtrl) {
            var tids = []; //TODO 需要分享的英雄列表
            if (tids.indexOf(heroCtrl.tid) >= 0) {
                //TODO 这里获得了新的英雄了，进行分享弹框操作
                uw.debug("这里获得了新的英雄了，进行分享弹框操作", heroCtrl);
            }
        };
        //获得专属分享
        __egretProto__._onShared4Exclusive = function (equipCtrls) {
            for (var i = 0, l_i = equipCtrls.length; i < l_i; i++) {
                var equipCtrl = equipCtrls[i];
                if (equipCtrl.part == uw.c_prop.equipPartKey.exclusive) {
                    //TODO 这里获得了专属装备了，进行分享弹框操作
                    uw.debug("这里获得了专属装备了，进行分享弹框操作");
                    return;
                }
            }
        };
        SharedCtrl.__className = "SharedCtrl";
        return SharedCtrl;
    })(mo.DataController);
    uw.SharedCtrl = SharedCtrl;
    SharedCtrl.prototype.__class__ = "uw.SharedCtrl";
    uw.sharedCtrl;
})(uw || (uw = {}));
