var uw;
(function (uw) {
    function initGuideCondition() {
        mo.guideCmdConditionMgr.set("copyFinished", function (cmd, arg, layer) {
            return uw.userDataCtrl.isCopyPassed(arg);
        });
        mo.guideCmdConditionMgr.set("taskFinished", function (cmd, arg, layer) {
            var taskList = layer._data;
            for (var i = 0, li = taskList.length; i < li; ++i) {
                var taskCtrl = taskList[i];
                if (taskCtrl.id == arg) {
                    return taskCtrl.isFinished();
                }
            }
            return false;
        });
        mo.guideCmdConditionMgr.set("taskToDo", function (cmd, arg, layer) {
            var taskList = layer._data;
            for (var i = 0, li = taskList.length; i < li; ++i) {
                var taskCtrl = taskList[i];
                if (taskCtrl.id == arg) {
                    return !taskCtrl.isFinished();
                }
            }
            return false;
        });
        mo.guideCmdConditionMgr.set("mainTaskTo", function (cmd, arg, layer) {
            var taskList = uw.userDataCtrl.getTaskDataCtrlList();
            for (var i = 0, li = taskList.length; i < li; ++i) {
                var taskCtrl = taskList[i];
                if (taskCtrl.id == arg) {
                    return !taskCtrl.isFinished();
                }
            }
            return false;
        });
        //英雄数量达到指定条件
        mo.guideCmdConditionMgr.set("heroCount", function (cmd, arg) {
            var heroCtrlList = uw.userDataCtrl.getHeroDataCtrlList();
            return heroCtrlList.length >= arg;
        });
        //有英雄可以召唤
        mo.guideCmdConditionMgr.set("hasHeroToCall", function (cmd, arg) {
            return uw.userDataCtrl.hasHeroToCall();
        });
        //在英雄模块中有物品
        mo.guideCmdConditionMgr.set("hasExpcItem", function (cmd, arg) {
            var expItems = uw.userDataCtrl.getItemInfoByType(uw.c_prop.itemTypeKey.heroExpItem);
            var count = 0;
            for (var key in expItems) {
                count += expItems[key];
            }
            return count > 0;
        });
        mo.guideCmdConditionMgr.set("onSkill", function (cmd, arg, layer) {
            var heroDataCtrlList = uw.userDataCtrl.getHeroDataCtrlList();
            var flag = true;
            for (var i = 0, l_i = heroDataCtrlList.length; i < l_i; i++) {
                var heroDataCtrl = heroDataCtrlList[i];
                for (var j = 0; j < 4; ++j) {
                    if (heroDataCtrl.getSkillLvl(j) > 1) {
                        flag = false;
                        break;
                    }
                }
                if (!flag)
                    break;
            }
            if (!flag) {
                var guideMgr = cmd.guideMgr;
                cmd.nextCmdKey = arg;
                guideMgr.goToNextCmd(cmd);
            }
            return flag;
        });
        mo.guideCmdConditionMgr.set("lvlInTask", function (cmd, arg, layer) {
            var arr = arg.split(",");
            return uw.userDataCtrl.getLvl() == parseInt(arr[0]) && uw.mainGuideMgr.hasCmd(arr[1], 0);
        });
        mo.guideCmdConditionMgr.set("notFrom", function (cmd, arg, layer) {
            var arr = arg.split(",");
            var fromWhere = mo.runningScene.fromWhere;
            return arr.indexOf(fromWhere) < 0;
        });
        mo.guideCmdConditionMgr.set("onSecret", function (cmd, arg, layer) {
            //获取当前激活/升级的秘书initId
            var data = uw.userDataCtrl.getSecretChangeData()[0];
            if (!data)
                mo_guide.error("error，没有找到当前变化的秘术！");
            return data.initId == arg;
        });
        mo.guideCmdConditionMgr.set("onSecret2", function (cmd, arg, layer) {
            var secretData = uw.userDataCtrl.getSecret(arg);
            return secretData.lvl > 0;
        });
        mo.guideCmdConditionMgr.set("cream", function (cmd, arg, layer) {
            var fromWhere = mo.runningScene.fromWhere;
            if (fromWhere == "task")
                return false;
            return !uw.userDataCtrl.isCopyPassed(arg);
        });
        //子引导10级升级装备的时候，如果材料不足则不显示。
        //材料不足的时候，则按键不可点，根据这个来判断。
        mo.guideCmdConditionMgr.set("eStuffEnough", function (cmd, arg, layer) {
            var btn = layer.getWidgetByName(uw.HeroEquipShop.BTN_UP_LVL);
            return btn.touchEnabled;
        });
    }
    uw.initGuideCondition = initGuideCondition;
})(uw || (uw = {}));
