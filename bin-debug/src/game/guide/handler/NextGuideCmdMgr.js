var uw;
(function (uw) {
    function initNextGuideCmd(mgr) {
        //如果英雄已经有普通装备，就跳转到数组中的第二个命令
        mgr.set("startFight", function (cmd, arg) {
            var arr = arg.split(",");
            var heroes = uw.userDataCtrl.getMatrixByType(uw.c_prop.matrixTypeKey.copy);
            return heroes.length < 3 ? arr[0] : arr[1];
        });
        mgr.set("equipToBuy", function (cmd, arg) {
            var layer = cmd.layer;
            var heroCtrl = layer._heroDataCtrl, curPart = layer._curPart || layer.equipPartClicked;
            if (heroCtrl.isNormalEquipFull())
                return null; //结束了
            else if (heroCtrl.isNormalEquipEmptyByPart(curPart)) {
                return "1_3";
            }
            else
                return "1_2"; //选中空装备tab
        });
        mgr.set("equipToStrength", function (cmd, arg) {
            var count = 0;
            var heroCtrls = uw.userDataCtrl.getHeroDataCtrlList();
            for (var i = 0; i < heroCtrls.length; ++i) {
                var hc = heroCtrls[i];
                var equipCtrls = hc.getAllEquipDataCtrl();
                for (var j = 0; j < equipCtrls.length; ++j) {
                    var ec = equipCtrls[j];
                    if (ec && !ec.isTempOnly && ec.lvl > 0)
                        count++;
                    if (count >= 5)
                        break;
                }
                if (count >= 5)
                    break;
            }
            if (count >= 5)
                return null; //结束了
            var layer = cmd.layer;
            var heroCtrl = layer._heroDataCtrl, curPart = layer._curPart || layer.equipPartClicked;
            if (heroCtrl.isNormalEquipEmptyByPart(curPart)) {
                return "11_3";
            }
            var equipCtrl = heroCtrl.getEquipDataCtrlByPart(curPart);
            if (!equipCtrl || equipCtrl.isTempOnly || equipCtrl.lvl == 0) {
                return "11_4";
            }
            return "11_2"; //选中空装备tab
        });
        mgr.set("equipToUp", function (cmd, arg) {
            var arr = arg.split(",");
            var layer = cmd.layer;
            var heroCtrl = layer._heroDataCtrl, curPart = layer._curPart || layer.equipPartClicked;
            var t_itemEquip = mo.getJSONWithFileName(uw.cfg_t_itemEquip);
            for (var i = 1; i < 6; ++i) {
                var equipCtrl = heroCtrl.getEquipDataCtrlByPart(i);
                if (!equipCtrl || equipCtrl.isTempOnly)
                    continue;
                var tempId = equipCtrl.tempId;
                if (t_itemEquip[tempId - 1])
                    return null; //已经有一个升阶了，就可以了
            }
            if (heroCtrl.isNormalEquipEmptyByPart(curPart)) {
                return arr[0];
            }
            else
                return arr[1]; //选中【升阶】
        });
        mgr.set("doneWhenLvl", function (cmd, arg) {
            var arr = arg.split(",");
            var heroCtrl = cmd.layer._heroDataCtrl;
            return heroCtrl.getLvl() >= parseInt(arr[0]) ? arr[1] : arr[2];
        });
        //如果英雄已经有普通装备，就跳转到数组中的第二个命令
        mgr.set("jumpWhenEquipGot", function (cmd, arg) {
            var arr = arg.split(",");
            var heroCtrl = cmd.layer._heroDataCtrl;
            var list = heroCtrl.getAllEquipDataCtrl();
            var count = 0;
            for (var i = 0; i < list.length; ++i) {
                var edc = list[i];
                if (edc && !edc.isTempOnly && edc.part < 6) {
                    count++;
                }
            }
            return count == 0 ? arr[0] : arr[1];
        });
        //TODO 这个修改了judge之后就没用到了，今后删除
        //如果英雄已经有普通装备，就跳转到数组中的第二个命令
        mgr.set("continueCopy", function (cmd, arg) {
            var arr = arg.split(",");
            return uw.userDataCtrl.isCopyPassed(parseInt(arr[0])) ? arr[2] : arr[1];
        });
        mgr.set("forLottery", function (cmd, arg) {
            var arr = arg.split(",");
            return uw.lotteryDataCtrl.isGoldLotteryCDOver() ? arr[0] : arr[1];
        });
    }
    uw.initNextGuideCmd = initNextGuideCmd;
})(uw || (uw = {}));
