var uw;
(function (uw) {
    function initGuideNode() {
        mo.guideCmdNodeMgr.set("btnBack", function (cmd, arg) {
            return mo.runningScene.backLayer.getBackBtnNode();
        });
        mo.guideCmdNodeMgr.set("cell_heroTid", function (cmd, arg) {
            var layer = cmd.layer;
            layer.jumpToCell(arg);
            var cell = layer.getWidgetByName("cell_heroTid_" + arg);
            if (cell)
                return cell.getWidgetByName(uw.UIHeroItemCell_new.PANEL_CLICK);
            return null;
        });
        mo.guideCmdNodeMgr.set("panel_equipItem", function (cmd, arg) {
            var heroEquipItem = cmd.layer.getWidgetByName("panel_equipItem" + arg);
            return heroEquipItem.getWidgetByName(uw.UIItemIconCtrl.PANEL_TOUCH);
        });
        mo.guideCmdNodeMgr.set("copyItem", function (cmd, arg) {
            return cmd.layer.getChildStageById(arg)._iconSprite;
        });
        mo.guideCmdNodeMgr.set("matrix", function (cmd, arg) {
            return cmd.layer.getHeroCardByHeroTid(arg);
        });
        mo.guideCmdNodeMgr.set("matrixIndex", function (cmd, arg) {
            return cmd.layer.getHeroCardByIndex(arg);
        });
        mo.guideCmdNodeMgr.set("btnGetReward", function (cmd, arg) {
            var cell = cmd.layer.getWidgetByName("cell_taskId_" + arg);
            if (cell)
                return cell.getWidgetByName("btnGetReward");
            mo_guide.warn("找不到对应的任务ID(%s)按钮", arg);
            return null;
        });
        mo.guideCmdNodeMgr.set("btnGoto", function (cmd, arg) {
            var cell = cmd.layer.getWidgetByName("cell_taskId_" + arg);
            if (cell)
                return cell.getWidgetByName("btnGoto");
            mo_guide.warn("找不到对应的任务ID(%s)按钮", arg);
            return null;
        });
        //第一个可召唤的英雄
        mo.guideCmdNodeMgr.set("firstCanCallHero", function (cmd, arg) {
            var heroTid = cmd.layer._heroDataCtrl._heroList[0].tid;
            var cell = cmd.layer.getWidgetByName("cell_heroTid_" + heroTid);
            if (cell)
                return cell.getWidgetByName(uw.UIHeroItemCell_new.PANEL_CLICK);
            return null;
        });
        //第一个未布阵的cell
        mo.guideCmdNodeMgr.set("firstMatrix", function (cmd, arg) {
            var heroCtrlList = uw.userDataCtrl.getHeroDataCtrlList();
            heroCtrlList.sort(function (a, b) {
                if (a.id > b.id)
                    return 1;
                if (a.id < b.id)
                    return -1;
                return 0;
            });
            var heroId = heroCtrlList[heroCtrlList.length - 1].tid;
            return cmd.layer.getHeroCardByHeroTid(heroId);
        });
        mo.guideCmdNodeMgr.set("cell", function (cmd, arg) {
            var cell = cmd.layer.getWidgetByName("cell_" + arg);
            if (cell)
                return cell.getWidgetByName(cell._clickWidgetName);
            return null;
        });
    }
    uw.initGuideNode = initGuideNode;
})(uw || (uw = {}));
