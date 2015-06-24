var uw;
(function (uw) {
    function initGuideBeforeNext() {
        //随机技能后继续游戏
        mo.guideCmdBeforeNextMgr.set("resumeInitRandomSkill", function (cmd, arg, cb) {
            cmd.layer.resumeInitRandomSkill();
            cb();
        });
        //当对应的layer关闭的时候，自动跳到下一个引导命令
        mo.guideCmdBeforeNextMgr.set("goNextWhenClose", function (cmd, arg, cb) {
            var func = function () {
                var self = this;
                self.layer.removeEventListener("exit", func, self);
                if (self.guideMgr.getCmd(self.groupId, self.cmdIndex)) {
                    cb();
                }
            };
            cmd.layer.addEventListener("exit", func, cmd);
        });
        //当指定参数【arg--__className】对应的layer关闭的时候，自动跳到下一个引导命令
        mo.guideCmdBeforeNextMgr.set("goNextWhenLayerClose", function (cmd, arg, cb) {
            var func = function (event) {
                mo.removeBeforeEventListener(mo.invisibleDispatcher, event.type, func, cmd);
                if (cmd.guideMgr.getCmd(cmd.groupId, cmd.cmdIndex)) {
                    cb();
                }
            };
            mo.addBeforeEventListener(mo.invisibleDispatcher, arg, func, cmd);
        });
    }
    uw.initGuideBeforeNext = initGuideBeforeNext;
})(uw || (uw = {}));
