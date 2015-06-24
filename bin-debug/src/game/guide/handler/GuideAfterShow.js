var uw;
(function (uw) {
    function initGuideAfterShow() {
        //暂停游戏
        mo.guideCmdAfterShowMgr.set("pauseFight", function (cmd, arg) {
            uw.fightMainCtrl.pauseFight();
        });
        //显示或隐藏任务引导
        mo.guideCmdAfterShowMgr.set("displayTask", function (cmd, arg, cb) {
            var eventType = uw.GetItemDlg.__className;
            mo.addBeforeEventListener(mo.visibleDispatcher, eventType, cmd.hide, cmd);
            mo.addBeforeEventListener(mo.visibleDispatcher, eventType, cmd.reshow, cmd);
            cmd.addClearEventListener(function () {
                mo.removeBeforeEventListener(mo.visibleDispatcher, eventType, cmd.hide, cmd);
                mo.removeBeforeEventListener(mo.visibleDispatcher, eventType, cmd.reshow, cmd);
            }, cmd);
        });
    }
    uw.initGuideAfterShow = initGuideAfterShow;
})(uw || (uw = {}));
