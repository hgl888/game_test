var uw;
(function (uw) {
    function _handleEquipShop3(cmd, cmdKeys) {
        //有两个命令
        var heroCtrl = cmd.layer._heroDataCtrl, curPart = cmd.layer._curPart;
        var cmd1 = cmd["cmd_" + cmdKeys[0]]; //购买
        if (!cmd1) {
            cmd1 = cmd["cmd_" + cmdKeys[0]] = uw.subGuideMgr.setCmd(cmdKeys[0], 0);
        }
        var cmd2 = cmd["cmd_" + cmdKeys[1]]; //升阶
        if (!cmd2) {
            cmd2 = cmd["cmd_" + cmdKeys[1]] = uw.subGuideMgr.setCmd(cmdKeys[1], 0);
            cmd2._doAfterNext = function () {
                cmd._isThisGuideDone = true;
                mo.GuideCmd.prototype._doAfterNext.apply(cmd, arguments);
            };
        }
        //先将所有命令都关闭
        cmd1.close();
        cmd2.close();
        cmd1.waiting = true;
        cmd2.waiting = true;
        cmd1.unbindNodes();
        cmd2.unbindNodes();
        if (cmd._isThisGuideDone) {
        }
        else if (heroCtrl.isNormalEquipEmptyByPart(curPart)) {
            cmd1.waiting = false;
            cmd1.exec(cmd.layer);
        }
        else {
            cmd2.waiting = false;
            cmd2.exec(cmd.layer);
        }
    }
    uw._handleEquipShop3 = _handleEquipShop3;
    function initGuideBeforeShow() {
        //主页滚动
        mo.guideCmdBeforeShowMgr.set("scrollHome", function (cmd, arg, cb) {
            cmd.layer.scrollBuildingToCenter(cmd.nodeName, true, function () {
                cmd.layer.setScrollEnabled(false);
                cmd.onAfterNext(function () {
                    cmd.layer.setScrollEnabled(true);
                });
                cb();
            });
        });
        //点击cell进入到下一个
        mo.guideCmdBeforeShowMgr.set("clickCellToNext", function (cmd, arg, cb) {
            var eventType = arg;
            var func = function () {
                mo.removeAfterEventListener(mo.cellClickDispatcher, eventType, func, cmd);
                cmd.next(true);
            };
            mo.addAfterEventListener(mo.cellClickDispatcher, eventType, func, cmd);
            cmd.addClearEventListener(function () {
                mo.removeAfterEventListener(mo.cellClickDispatcher, eventType, func, cmd);
            }, cmd);
            cb();
        });
        //子任务的时候，点击任意一个普通装备栏将会跳到下一个引导命令
        mo.guideCmdBeforeShowMgr.set("clickEquipItemToNext", function (cmd, arg, cb) {
            var eventType = uw.UIItemIconCtrl.__className;
            var func = function () {
                mo.removeAfterEventListener(mo.widgetCtrlClickDispatcher, eventType, func, cmd);
                cmd.next(true);
            };
            mo.addAfterEventListener(mo.widgetCtrlClickDispatcher, eventType, func, cmd);
            cmd.addClearEventListener(function () {
                mo.removeAfterEventListener(mo.widgetCtrlClickDispatcher, eventType, func, cmd);
            }, cmd);
            cb();
        });
        //如果任务完成，就可以到下一步
        mo.guideCmdBeforeShowMgr.set("heroEquipItemToNext", function (cmd, arg, cb) {
            var eventType = uw.UIItemIconCtrl.__className;
            var func = function () {
                mo.removeAfterEventListener(mo.widgetCtrlClickDispatcher, eventType, func, cmd);
                cmd.next(true);
            };
            mo.addAfterEventListener(mo.widgetCtrlClickDispatcher, eventType, func, cmd);
            cmd.addClearEventListener(function () {
                mo.removeAfterEventListener(mo.widgetCtrlClickDispatcher, eventType, func, cmd);
            }, cmd);
            cb();
        });
        //随机技能后继续游戏
        mo.guideCmdBeforeShowMgr.set("pauseInitRandomSkill", function (cmd, arg, cb) {
            cmd.layer.hideSkipBtn();
            cmd.layer.hidePauseBtn();
            cmd.layer.pauseInitRandomSkill();
            cb();
        });
        mo.guideCmdBeforeShowMgr.set("scrollToTask", function (cmd, arg, cb) {
            cmd.layer.scrollToItem(arg);
            process.nextTick(function () {
                process.nextTick(cb);
            }); //下一帧才执行
        });
        mo.guideCmdBeforeShowMgr.set("bbb3", function (cmd, arg, cb) {
            if (cmd.isDoing)
                return;
            cmd.isDoing = true;
            uw._handleEquipShop3(cmd, arg);
            var map = {};
            for (var part = 1; part <= 5; part++) {
                var eventType = "tab_" + part;
                var func = function () {
                    uw._handleEquipShop3(cmd, arg);
                };
                map[eventType] = func;
                mo.addBeforeEventListener(mo.clickDispatcher, eventType, func, cmd);
            }
            //购买装备成功是刷新下引导
            var func2 = function () {
                uw._handleEquipShop3(cmd, arg);
            };
            uw.net.addEventListenerForRouteSuccess(uw.iface.a_hero_buyNormalEquip, func2, cmd);
            var eventType3 = uw.HeroEquipShop.__className;
            var func3 = function () {
                //这里要关掉附加引导
                mo.removeBeforeEventListener(mo.invisibleDispatcher, eventType3, func3, cmd);
                if (!cmd._isThisGuideDone) {
                    if (cmd.layer.getParent() && cmd.layer.getParent().isRunning()) {
                        uw.subGuideMgr.setCmd(cmd.groupId, cmd.cmdIndex - 1);
                        uw.subGuideMgr.refreshNextTick();
                    }
                }
                for (var key in map) {
                    mo.addBeforeEventListener(mo.invisibleDispatcher, key, map[key], cmd);
                }
                uw.net.removeEventListenerForRouteSuccess(uw.iface.a_hero_buyNormalEquip, func2, cmd);
            };
            mo.addBeforeEventListener(mo.invisibleDispatcher, eventType3, func3, cmd);
        });
        mo.guideCmdBeforeShowMgr.set("waitWhenFold", function (cmd, arg, cb) {
            var func = function () {
                cmd.close();
                cmd.waiting = true;
                cmd.unbindNodes();
            };
            mo.addAfterEventListener(mo.clickDispatcher, "btnFold", func, cmd);
            cmd.addClearEventListener(function () {
                mo.removeAfterEventListener(mo.clickDispatcher, "btnFold", func, cmd);
                mo.GuideCmd.prototype._doAfterNext.apply(this, arguments);
            }, cmd);
            cb();
        });
        mo.guideCmdBeforeShowMgr.set("trialCopyItem", function (cmd, arg, cb) {
            for (var i = 0; i < 6; ++i) {
                mo.addAfterEventListener(mo.clickDispatcher, "trialCopyItem_" + i, cmd.next, cmd);
            }
            cmd.addClearEventListener(function () {
                for (var i = 0; i < 6; ++i) {
                    mo.removeAfterEventListener(mo.clickDispatcher, "trialCopyItem_" + i, cmd.next, cmd);
                }
            }, cmd);
            cb();
        });
        //如果等级达到arg传进来的值，则跳到下一组
        mo.guideCmdBeforeShowMgr.set("jumpNextGroupIfLvl", function (cmd, arg, cb) {
            var heroDataCtrl = cmd.layer._heroDataCtrl;
            if (heroDataCtrl.getLvl() >= arg) {
                var guideMgr = cmd.guideMgr;
                guideMgr.removeCmd(cmd);
                var cmd1 = guideMgr.setCmd(cmd.groupId + 1, 0);
                cmd1.exec(cmd.layer);
            }
            else {
                cb();
            }
        });
        //判断任务
        mo.guideCmdBeforeShowMgr.set("judgeTask", function (cmd, arg, cb) {
            if (uw.userDataCtrl.isTaskDone(arg)) {
                cmd.next(true);
            }
            else {
                var eventType = gEventType.refreshTasks;
                var func = function () {
                    var self = this;
                    if (uw.userDataCtrl.isTaskDone(arg)) {
                        mo.actionDispatcher.removeEventListener(eventType, func, cmd);
                        self.next(true);
                    }
                };
                mo.actionDispatcher.addEventListener(eventType, func, cmd);
                cmd.addClearEventListener(function () {
                    mo.actionDispatcher.removeEventListener(eventType, func, cmd);
                }, cmd);
                cmd.layer.scrollToItem(arg);
                process.nextTick(cb);
            }
        });
        //判断系统按键是否准备完毕
        mo.guideCmdBeforeShowMgr.set("judgeSysBtns", function (cmd, arg, cb) {
            var layer = cmd.layer;
            var dispatcher = mo.actionDispatcher;
            var flag = false;
            if (arg != null) {
                var node = layer.getWidgetByName(arg);
                flag = !node || !node.visible;
            }
            if (flag || uw.subModuleDataCtrl.findUnlockMenuModules().length > 0) {
                var eventType = gEventType.openSysBtns;
                var openSysBtns = function () {
                    mo.removeAfterEventListener(dispatcher, eventType, openSysBtns, cmd);
                    cb(); //这时候才继续往下执行
                };
                mo.addAfterEventListener(dispatcher, eventType, openSysBtns, cmd);
                cmd.addClearEventListener(function () {
                    mo.removeAfterEventListener(dispatcher, eventType, openSysBtns, cmd);
                }, cmd);
            }
            else {
                cb();
            }
        });
        //判断任务
        mo.guideCmdBeforeShowMgr.set("ifSkillHasUp", function (cmd, arg, cb) {
            var layer = cmd.layer;
            var heroDataCtrl = layer._heroDataCtrl;
            var mixSkillLvl = heroDataCtrl.getSkillLvl(3);
            if (mixSkillLvl > 1) {
                cmd.guideMgr.jumpToNextGroup(cmd);
            }
            else {
                cb();
            }
        });
        //隐藏副本界面的手指
        mo.guideCmdBeforeShowMgr.set("hideCopyFinger", function (cmd, arg, cb) {
            var helper = cmd.layer.getChildHelper();
            helper.disablePointer();
            helper.showShineEffect(false); //关闭shine效果
            cb();
        });
        //点击任意一个equipTab就到下一个
        mo.guideCmdBeforeShowMgr.set("clickEquipTabToNext", function (cmd, arg, cb) {
            var map = {};
            for (var part = 1; part <= 5; part++) {
                var eventType = "tab_" + part;
                var func = function () {
                    for (var key in map) {
                        mo.removeAfterEventListener(mo.clickDispatcher, key, map[key], cmd);
                    }
                    cmd.next(true);
                };
                map[eventType] = func;
                mo.addAfterEventListener(mo.clickDispatcher, eventType, func, cmd);
                cmd.addClearEventListener(function () {
                    for (var key in map) {
                        mo.removeAfterEventListener(mo.clickDispatcher, key, map[key], cmd);
                    }
                }, cmd);
            }
            cb();
        });
        mo.guideCmdBeforeShowMgr.set("scrollToItem", function (cmd, arg, cb) {
            cmd.layer.scrollToItem(arg);
            process.nextTick(function () {
                process.nextTick(cb);
            }); //下一帧才执行
        });
        mo.guideCmdBeforeShowMgr.set("enterCopyFight", function (cmd, arg, cb) {
            var func = function () {
                var flag = false;
                var taskList = uw.userDataCtrl.getTaskDataCtrlList();
                for (var i = 0, li = taskList.length; i < li; ++i) {
                    var taskCtrl = taskList[i];
                    if (taskCtrl.id == arg && taskCtrl.isFinished()) {
                        flag = true;
                        break;
                    }
                }
                if (flag) {
                    mo.removeAfterEventListener(mo.visibleDispatcher, cmd.layerName, func, cmd);
                    cmd.next();
                }
            };
            mo.addAfterEventListener(mo.visibleDispatcher, cmd.layerName, func, cmd);
            cb();
        });
    }
    uw.initGuideBeforeShow = initGuideBeforeShow;
})(uw || (uw = {}));
