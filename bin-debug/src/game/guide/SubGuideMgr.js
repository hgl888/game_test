var uw;
(function (uw) {
    uw.subGuideMgr;
    var SubGuideMgr = (function (_super) {
        __extends(SubGuideMgr, _super);
        function SubGuideMgr() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SubGuideMgr.prototype;
        SubGuideMgr.initGuide = function () {
            //        return;
            var guideMgr = uw.subGuideMgr = uw.SubGuideMgr.create();
            mo.registerGuideMgr(uw.subGuideMgr);
            var guideCfg = mo.getJSONWithFileName(uw.cfg_c_subGuide);
            guideMgr.setCfgData(uw.parseGuideData(guideCfg));
            var subGuide = uw.userDataCtrl.get(uw.dsConsts.UserEntity.subGuide) || [];
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            var subGuideCfg = c_game[uw.id_c_game.subGuide];
            for (var i = 0, li = subGuideCfg.length; i < li; ++i) {
                var groupId = subGuideCfg[i];
                if (subGuide.indexOf(groupId) < 0) {
                    guideMgr.setCmd(groupId, 0);
                }
            }
            uw._initGoToTaskForSubGuide();
            var arr = [31, 41, 61, 71, 81, 91];
            for (var i = 0; i < arr.length; ++i) {
                uw._initLvlUpEvents(arr[i], 0);
            }
            uw._refreshSubGuideWhenTaskRefreshed(guideMgr);
            var lvlInTaskInfoArr = [
                [221, 6],
                [231, 15],
                [241, 20],
                [251, 45]
            ];
            var uLvl = uw.userDataCtrl.getLvl();
            for (var i = 0, l_i = lvlInTaskInfoArr.length; i < l_i; i++) {
                var info = lvlInTaskInfoArr[i];
                var groupId = info[0], lvl = info[1];
                if (lvl > uLvl) {
                    uw.subGuideMgr.setCmd(groupId, 0);
                }
            }
        };
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.net = uw.net;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            if (uw.mainGuideMgr) {
                uw.mainGuideMgr.addShowCmdListener(self.hideAllCmd, self);
                uw.mainGuideMgr.addCloseCmdListener(self.showAllCmd, self);
            }
        };
        __egretProto__.hideAllCmd = function () {
            this.showing = false;
            _super.prototype.hideAllCmd.apply(this, arguments);
        };
        __egretProto__.showAllCmd = function () {
            this.showing = true;
            _super.prototype.showAllCmd.apply(this, arguments);
        };
        __egretProto__._doSubmit = function (curCmd, nextCmd) {
            //        return;
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            var subGuideCfg = c_game[uw.id_c_game.subGuide];
            var groupId = curCmd.groupId;
            if (subGuideCfg.indexOf(groupId) >= 0) {
                mo_guide.debug("submit subGuide--->", groupId);
                //            return;
                //更新服务器数据
                var args = {};
                var argsKey = uw.iface.a_user_updateSubGuide_args;
                args[argsKey.groupId] = groupId;
                mo.request(uw.iface.a_user_updateSubGuide, args, function () {
                });
            }
        };
        SubGuideMgr.__className = "SubGuideMgr";
        return SubGuideMgr;
    })(mo.GuideMgr);
    uw.SubGuideMgr = SubGuideMgr;
    SubGuideMgr.prototype.__class__ = "uw.SubGuideMgr";
    uw._curTaskIdForSubGuide;
    function _initGoToTaskForSubGuide() {
        //任务“前往”按键
        mo.addAfterEventListener(mo.clickDispatcher, uw.QuestItem.BTN_GOTO, function (event) {
            var btn = event.sender;
            var parent = btn.getParent();
            var questItem;
            while (!!parent) {
                if (parent instanceof uw.QuestItem) {
                    questItem = parent;
                    break;
                }
                parent = parent.getParent();
            }
            if (questItem) {
                var taskCtrl = questItem._taskCtrl;
                uw._curTaskIdForSubGuide = taskCtrl.id;
                var guideGroupId = taskCtrl.getTempValue(uw.t_task_guideGroupId);
                if (guideGroupId) {
                    uw.subGuideMgr.setCmd(guideGroupId, 0);
                }
            }
        }, null);
    }
    uw._initGoToTaskForSubGuide = _initGoToTaskForSubGuide;
    function _initCopyFailedEvents() {
        var cmd = uw.subGuideMgr.getCmd("21_0");
        if (!cmd)
            return; //已经做过了
        var func = function (event) {
            var layer = event.sender;
            if (layer._rankArr.length < 3) {
                var arr = cmd.option["copyIds"].split("-");
                var minCopyId = parseInt(arr[0]), maxCopyId = parseInt(arr[1]);
                var copyId = uw.fightMainCtrl.copyId;
                if (copyId > maxCopyId || copyId < minCopyId)
                    return; //不在指定副本内 TODO
                mo.actionDispatcher.removeEventListener(gEventType.starAction, func, cmd);
                //                cmd.waiting = false;
                cmd.waitDone();
            }
        };
        mo.actionDispatcher.addEventListener(gEventType.starAction, func, cmd);
    }
    uw._initCopyFailedEvents = _initCopyFailedEvents;
    function _initLvlUpEvents(groupId, cmdIndex) {
        var cmd = uw.subGuideMgr.getCmd(groupId, cmdIndex);
        if (!cmd)
            return;
        var udc = uw.userDataCtrl;
        if (cmd.lvlRequired <= udc.getLvl())
            return; //如果等级已经足够了就不用注册了
        var func = function () {
            if (this.lvlRequired > udc.getLvl())
                return;
            udc.unregisterByKey(uw.dsConsts.UserEntity.lvl, func, this);
            cmd.refresh();
        };
        udc.registerByKey(uw.dsConsts.UserEntity.lvl, func, cmd);
    }
    uw._initLvlUpEvents = _initLvlUpEvents;
    function _refreshSubGuideWhenTaskRefreshed(guideMgr) {
        var groupIds = [23, 151];
        var ids = [];
        for (var i = 0, li = groupIds.length; i < li; ++i) {
            if (guideMgr.getCmd(groupIds[0], 0))
                ids.push(groupIds[0]);
        }
        if (ids.length > 0) {
            mo.addBeforeEventListener(mo.invisibleDispatcher, uw.GetItemDlg.__className, function () {
                for (var i = ids.length - 1; i >= 0; --i) {
                    var cmd = guideMgr.getCmd(ids[i], 0);
                    if (cmd) {
                        cmd.refresh();
                    }
                }
            }, guideMgr);
        }
    }
    uw._refreshSubGuideWhenTaskRefreshed = _refreshSubGuideWhenTaskRefreshed;
})(uw || (uw = {}));
