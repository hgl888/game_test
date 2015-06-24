var uw;
(function (uw) {
    function initGuideAfterNext() {
        //继续游戏
        mo.guideCmdAfterNextMgr.set("resumeFight", function (cmd, arg) {
            uw.fightMainCtrl.resumeFight();
        });
        mo.guideCmdAfterNextMgr.set("waitingFight", function (cmd, arg) {
            var func = function (event) {
                var self = this;
                uw.net.removeEventListenerForRouteSuccess(event.type, func, self);
                var guideMgr = self.guideMgr;
                var cmd1 = guideMgr.getCmd(self.groupId, self.cmdIndex + 1);
                if (cmd1)
                    cmd1.waiting = false;
            };
            uw.net.addEventListenerForRouteSuccess(uw.iface.a_copy_fightEnd, func, cmd);
        });
        mo.guideCmdAfterNextMgr.set("waitingArena", function (cmd, arg) {
            var func = function (event) {
                var self = this;
                uw.net.removeEventListenerForRouteSuccess(event.type, func, self);
                var guideMgr = self.guideMgr;
                var cmd1 = guideMgr.getCmd(self.groupId, self.cmdIndex + 1);
                if (cmd1)
                    cmd1.waiting = false;
            };
            uw.net.addEventListenerForRouteSuccess(uw.iface.a_arena_fightEnd, func, cmd);
        });
        //第一场战斗
        mo.guideCmdAfterNextMgr.set("firstFight", function (cmd, arg) {
            //这里的arg为子引导的id
            uw.hideSkipBtn = true;
            uw.hidePauseBtn = true;
            var funcLight = function (event) {
                if (uw["skillBtnCmdShowed"])
                    return; //已经显示了，则不做任何处理
                var skillBtn = uw["skillBtn"];
                if (!skillBtn) {
                    //这里要开启一个子引导
                    var data = event.data;
                    skillBtn = data.skillBtn.getWidgetByName("icon");
                    uw["skillBtn"] = skillBtn;
                }
                uw["skillBtnCmdShowed"] = true;
                uw["cmd4FirstFight"] = uw.subGuideMgr.setCmd(arg);
            };
            var funcDark = function () {
                var cmd4FirstFight = uw["cmd4FirstFight"];
                if (cmd4FirstFight) {
                    uw.subGuideMgr.removeCmd(cmd4FirstFight);
                    delete uw["cmd4FirstFight"];
                    delete uw["skillBtnCmdShowed"];
                }
            };
            var funcPlayed = function () {
                //移除监听
                mo.actionDispatcher.removeEventListener(gEventType.skillLight, funcLight, null);
                mo.actionDispatcher.removeEventListener(gEventType.skillDark, funcDark, null);
                mo.actionDispatcher.removeEventListener(gEventType.skillPlayed, funcPlayed, null);
                mo.actionDispatcher.removeEventListener(gEventType.fightEnd, funcFightEnd, null);
                //移除引导
                var cmd4FirstFight = uw["cmd4FirstFight"];
                if (cmd4FirstFight) {
                    uw.subGuideMgr.removeCmd(cmd4FirstFight);
                    delete uw["cmd4FirstFight"];
                    delete uw["skillBtn"];
                    delete uw["skillBtnCmdShowed"];
                }
            };
            var funcFightEnd = function () {
                //移除监听
                mo.actionDispatcher.removeEventListener(gEventType.skillLight, funcLight, null);
                mo.actionDispatcher.removeEventListener(gEventType.skillDark, funcDark, null);
                mo.actionDispatcher.removeEventListener(gEventType.skillPlayed, funcPlayed, null);
                mo.actionDispatcher.removeEventListener(gEventType.fightEnd, funcFightEnd, null);
                //移除引导
                var cmd4FirstFight = uw["cmd4FirstFight"];
                if (cmd4FirstFight) {
                    uw.subGuideMgr.removeCmd(cmd4FirstFight);
                    delete uw["cmd4FirstFight"];
                    delete uw["skillBtn"];
                    delete uw["skillBtnCmdShowed"];
                }
            };
            mo.actionDispatcher.addEventListener(gEventType.skillLight, funcLight, null);
            mo.actionDispatcher.addEventListener(gEventType.skillDark, funcDark, null);
            mo.actionDispatcher.addEventListener(gEventType.skillPlayed, funcPlayed, null);
            mo.actionDispatcher.addEventListener(gEventType.fightEnd, funcFightEnd, null);
        });
    }
    uw.initGuideAfterNext = initGuideAfterNext;
})(uw || (uw = {}));
