/**
 * Created by SmallAiTT on 2015/3/21.
 */
var uw;
(function (uw) {
    function initGuideJudge() {
        var guideJudge = mo.guideJudge;
        //抽奖判断，如果可以抽奖才是当前一步，否则就跳到指定的引导。
        //避免的是数据出现了混乱而导致引导进行不下去（就是点击抽奖进去后抽不了）
        //arg : 指定的cmdKey
        guideJudge["cntLottery"] = function (mgr, cmd, arg) {
            var ctrl = uw.lotteryDataCtrl;
            if (ctrl.isGoldLotteryCDOver() || ctrl.isDiamondLotteryCDOver()) {
                return true;
            }
            mgr.setCmd(arg);
            return false;
        };
        //TODO 这个暂时没有用
        //如果已经布阵了，那么就直接跳到指定的引导，
        //arg : matrixType,matrixLength,cmdKey
        guideJudge["hasMatrix"] = function (mgr, cmd, arg) {
            var arr = arg.split(",");
            var matrix = uw.userDataCtrl.getMatrixByType(arr[0]);
            if (matrix.length >= parseInt(arr[1])) {
                mgr.setCmd(arr[2]);
                return false;
            }
            return true;
        };
        //如果任务已经领取完了，那么就跳转到指定引导
        //arg : type,taskId,cmdKey;type,taskId,cmdKey
        //type : 1->待处理，2->待领取，3->已领取，4->待领取或者已赢取
        guideJudge["taskState"] = function (mgr, cmd, arg) {
            var strArr = arg.split(";");
            for (var i = 0, l_i = strArr.length; i < l_i; i++) {
                var str = strArr[i];
                if (!str || str == "")
                    continue;
                var arr = str.split(",");
                var type = parseInt(arr[0]);
                var taskId = arr[1];
                var cmdKey = arr[2];
                var udc = uw.userDataCtrl;
                if (type == 1) {
                    if (udc.isTaskToDo(taskId)) {
                        mgr.setCmd(cmdKey);
                        return false;
                    }
                }
                else if (type == 2) {
                    if (udc.isTaskFinished(taskId)) {
                        mgr.setCmd(cmdKey);
                        return false;
                    }
                }
                else if (type == 3) {
                    if (udc.isTaskDone(taskId)) {
                        mgr.setCmd(cmdKey);
                        return false;
                    }
                }
                else if (type == 4) {
                    if (udc.isTaskFinished(taskId) || udc.isTaskDone(taskId)) {
                        mgr.setCmd(cmdKey);
                        return false;
                    }
                }
            }
            return true;
        };
        //如果任务已经领取完了，那么就跳转到指定引导
        //arg : type,copyId,cmdKey;type,taskId,cmdKey
        //type : 1->还不能打，2->可以打但还没通过，3->已经通过，4->还不能打或者还没通过
        guideJudge["copyState"] = function (mgr, cmd, arg) {
            var strArr = arg.split(";");
            for (var i = 0, l_i = strArr.length; i < l_i; i++) {
                var str = strArr[i];
                if (!str || str == "")
                    continue;
                var arr = str.split(",");
                var type = parseInt(arr[0]);
                var copyId = arr[1];
                var cmdKey = arr[2];
                var udc = uw.userDataCtrl;
                var copyProgress = udc.getCopyProgressByCopyId(copyId);
                if (type == 1) {
                    if (copyProgress.isCopyLocked(copyId)) {
                        mgr.setCmd(cmdKey);
                        return false;
                    }
                }
                else if (type == 2) {
                    if (copyProgress.isCopyLocked(copyId) && !copyProgress.isCopyPassed(copyId)) {
                        mgr.setCmd(cmdKey);
                        return false;
                    }
                }
                else if (type == 3) {
                    if (copyProgress.isCopyPassed(copyId)) {
                        mgr.setCmd(cmdKey);
                        return false;
                    }
                }
                else if (type == 4) {
                    if (copyProgress.isCopyLocked(copyId) || !copyProgress.isCopyPassed(copyId)) {
                        mgr.setCmd(cmdKey);
                        return false;
                    }
                }
            }
            return true;
        };
        //如果已经穿戴了战魂，或者根本没有这个战魂，那么就跳转到指定的引导
        //arg : tid,wishId,cmdKey
        guideJudge["forWish"] = function (mgr, cmd, arg) {
            var arr = arg.split(",");
            var tId = parseInt(arr[0]), wishId = parseInt(arr[1]), cmdKey = arr[2];
            var udc = uw.userDataCtrl;
            var heroDataCtrl = udc.getHeroDataCtrlByTid(tId);
            var equip = heroDataCtrl.getEquipDataCtrlByPart(uw.c_prop.equipPartKey.wish);
            //如果已经有穿戴了或者没有这个战魂可以穿戴
            if ((equip && !equip.isTempOnly) || udc.getNotOnEquipNumByTempId(wishId) <= 0) {
                mgr.setCmd(cmdKey);
                return false;
            }
            return true;
        };
        //如果已经穿戴了专属，或者根本没有这个专属，那么就跳转到指定的引导
        //arg : tid,cmdKey
        guideJudge["forExclusive"] = function (mgr, cmd, arg) {
            var arr = arg.split(",");
            var tId = parseInt(arr[0]), cmdKey = arr[1];
            var udc = uw.userDataCtrl;
            var heroDataCtrl = udc.getHeroDataCtrlByTid(tId);
            var equip = heroDataCtrl.getEquipDataCtrlByPart(uw.c_prop.equipPartKey.exclusive);
            var equipTempId = equip.tempId;
            //如果已经有穿戴了或者没有这个专属可以穿戴
            if (!equip.isTempOnly || udc.getNotOnEquipNumByTempId(equipTempId) <= 0) {
                mgr.setCmd(cmdKey);
                return false;
            }
            return true;
        };
        //如果英雄已经强化过任意一件普通装备了，那么就调到下一组引导
        //arg : tid,cmdKey
        guideJudge["equipStrengthen"] = function (mgr, cmd, arg) {
            var arr = arg.split(",");
            var tid = parseInt(arr[0]), cmdKey = arr[1];
            var heroDataCtrl = uw.userDataCtrl.getHeroDataCtrlByTid(tid);
            for (var part = 1; part <= 5; ++part) {
                var equip = heroDataCtrl.getEquipDataCtrlByPart(part);
                if (!equip.isTempOnly && equip.lvl > 0) {
                    mgr.setCmd(cmdKey);
                    return false;
                }
            }
            return true;
        };
        //如果没有暗影石，则认为已经进行过了培养，直接跳到下一组。
        //arg : itemId,cmdKey
        guideJudge["noStone"] = function (mgr, cmd, arg) {
            var arr = arg.split(",");
            var itemId = parseInt(arr[0]), cmdKey = arr[1];
            if (uw.userDataCtrl.getItemNum(itemId) <= 0) {
                mgr.setCmd(cmdKey);
                return false;
            }
            return true;
        };
        //如果不能兑换该战魂了，那么就跳转到下一组引导
        //arg : exchangeId,cmdKey
        guideJudge["cntExchg"] = function (mgr, cmd, arg) {
            var arr = arg.split(",");
            var exchangeId = parseInt(arr[0]), cmdKey = arr[1];
            if (uw.exchangeDataCtrl.getExchangeState(exchangeId) != uw.ExchangeDataCtrl.EXCHANGABLE) {
                mgr.setCmd(cmdKey);
                return false;
            }
            return true;
        };
        //如果奎爷的专属已经锻造过了，则直接跳转到下一组
        //arg : tid,cmdKey
        guideJudge["forge"] = function (mgr, cmd, arg) {
            var arr = arg.split(",");
            var tid = parseInt(arr[0]), cmdKey = arr[1];
            var heroDataCtrl = uw.userDataCtrl.getHeroDataCtrlByTid(tid);
            var equip = heroDataCtrl.getEquipDataCtrlByPart(uw.c_prop.equipPartKey.exclusive);
            if (equip.isTempOnly || equip.lvl > 0) {
                mgr.setCmd(cmdKey);
                return false;
            }
            return true;
        };
        //如果指定的锻造材料不足，则直接跳转到下一组引导（结束）
        //arg : itemId,cmdKey
        guideJudge["noStuff"] = function (mgr, cmd, arg) {
            var arr = arg.split(",");
            var itemId = parseInt(arr[0]), cmdKey = arr[1];
            if (uw.userDataCtrl.getItemNum(itemId) <= 0) {
                mgr.setCmd(cmdKey);
                return false;
            }
            return true;
        };
    }
    uw.initGuideJudge = initGuideJudge;
})(uw || (uw = {}));
