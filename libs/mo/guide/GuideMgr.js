var mo;
(function (mo) {
    /** 引导是否暂停 */
    mo.guidePaused = false;
    mo.guideRevert = {};
    mo.guideJudge = {};
    var GuideEvent = (function (_super) {
        __extends(GuideEvent, _super);
        function GuideEvent() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideEvent.prototype;
        GuideEvent.__className = "GuideEvent";
        GuideEvent.SHOW_CMD = "showCmd";
        GuideEvent.CLOSE_CMD = "closeCmd";
        return GuideEvent;
    })(mo.Event);
    mo.GuideEvent = GuideEvent;
    GuideEvent.prototype.__class__ = "mo.GuideEvent";
    var GuideMgr = (function (_super) {
        __extends(GuideMgr, _super);
        function GuideMgr() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideMgr.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._cfgData = {};
            self.cmdMap = {};
            self.showing = true;
            self._hideList = [];
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        __egretProto__._hideCmd = function (cmd) {
            cmd.hide();
            if (this._hideList.indexOf(cmd) < 0)
                this._hideList.push(cmd);
        };
        __egretProto__.hideAllCmd = function () {
            var map = this.cmdMap;
            for (var key in map) {
                var cmd = map[key];
                if (cmd.layer)
                    this._hideCmd(map[key]);
            }
        };
        __egretProto__.showAllCmd = function () {
            var list = this._hideList;
            while (list.length = 0) {
                var cmd = list.pop();
                cmd.reshow();
            }
        };
        __egretProto__.addShowCmdListener = function (cb, ctx) {
            this.addEventListener(GuideEvent.SHOW_CMD, cb, ctx);
        };
        __egretProto__.dispatchShowCmdEvent = function (cmd) {
            var self = this;
            var eventType = GuideEvent.SHOW_CMD;
            if (self.willTrigger(eventType)) {
                var event = new GuideEvent(eventType);
                event.cmd = cmd;
                self.dispatchEvent(event);
            }
        };
        __egretProto__.addCloseCmdListener = function (cb, ctx) {
            this.addEventListener(GuideEvent.CLOSE_CMD, cb, ctx);
        };
        __egretProto__.dispatchCloseCmdEvent = function (cmd) {
            var self = this;
            var eventType = GuideEvent.CLOSE_CMD;
            if (self.willTrigger(eventType)) {
                var event = new GuideEvent(eventType);
                event.cmd = cmd;
                self.dispatchEvent(event);
            }
        };
        __egretProto__.setCfgData = function (cfgData) {
            this._cfgData = cfgData;
        };
        __egretProto__.removeInvisibleCmd = function () {
            var self = this;
            var cmdMap = self.cmdMap;
            for (var key in cmdMap) {
                var cmd = cmdMap[key];
                if (cmd.endType == 3 && cmd.layer && !cmd.layer.isVisible()) {
                    self.removeCmd(cmd);
                }
            }
        };
        __egretProto__.hasCmdByGroupId = function (groupId) {
            var self = this;
            var cmdMap = self.cmdMap;
            for (var key in cmdMap) {
                if (key.indexOf(groupId + "_") == 0)
                    return true;
            }
            return false;
        };
        __egretProto__.hasCmd = function (groupId, cmdIndex) {
            var self = this;
            var cmdMap = self.cmdMap;
            return !!cmdMap[groupId + "_" + cmdIndex];
        };
        /**
         * 等待
         * @param arr 格式为：[groupId+"_"+cmdIndex]
         */
        __egretProto__.wait = function (arr) {
            if (arguments.length = 1) {
                for (var i = 0, li = arr.length; i < li; ++i) {
                    var cmdKey = arr[i];
                    var cmd = this.cmdMap[cmdKey];
                    if (cmd) {
                        cmd.wait();
                    }
                }
            }
            else {
                for (var cmdKey in this.cmdMap) {
                    var cmd = this.cmdMap[cmdKey];
                    cmd.wait();
                }
            }
        };
        /**
         * 等待结束
         * @param arr 格式为：[groupId+"_"+cmdIndex]
         */
        __egretProto__.waitDone = function (arr) {
            if (arguments.length = 1) {
                for (var i = 0, li = arr.length; i < li; ++i) {
                    var cmdKey = arr[i];
                    var cmd = this.cmdMap[cmdKey];
                    if (cmd) {
                        cmd.waitDone();
                    }
                }
            }
            else {
                for (var cmdKey in this.cmdMap) {
                    var cmd = this.cmdMap[cmdKey];
                    cmd.waitDone();
                }
            }
        };
        __egretProto__.dtor = function () {
            var self = this;
            self.isGuideFinished = true;
            //释放资源 TODO
        };
        __egretProto__.init = function () {
            this._hideList = [];
        };
        /**
         * 设置当前的命令
         *      两个参数：groupId、cmdIndex
         *      一个参数：groupId_cmdIndex
         * @param groupId   引导到步骤id
         * @param cmdIndex  引导小步骤下标
         */
        __egretProto__.setCmd = function (groupId, cmdIndex) {
            var self = this;
            if (self.isGuideFinished)
                return null; //如果引导已经结束了，就直接返回
            if (arguments.length == 1 && typeof groupId == "string") {
                var tempArr = groupId.split("_");
                groupId = parseInt(tempArr[0]);
                cmdIndex = parseInt(tempArr[1]);
            }
            if (typeof groupId == "string")
                groupId = parseInt(groupId);
            var groupData = self._cfgData[groupId]; //获取到数据
            var cmdKey = groupId + "_" + cmdIndex;
            delete self.cmdMap[cmdKey]; //先删除之前的映射
            if (groupData) {
                var cmdData = groupData[cmdIndex];
                if (cmdData) {
                    var Factory = mo._guideCmdFactoryClassMap[cmdData.type];
                    var cmd = Factory.getInstance().produce(cmdData);
                    cmd.guideMgr = self;
                    if (self.cmdMap[cmdKey])
                        self.removeCmd(self.cmdMap[cmdKey]); //如果已经存在就先移除
                    if (!cmd.judge())
                        return null; //如果判断不通过
                    self.cmdMap[cmdKey] = cmd;
                    cmd.addEventListeners4Layer(); //注册layer监听
                    var layer = searchLayer4Guide(cmd.layerName); //查询当前是否有对应的layer显示着
                    if (layer) {
                        process.nextTick(function () {
                            if (layer.showingWithAction)
                                return; //正在显示，则延迟到监听执行
                            if (!mo.guidePaused && cmd.canExec(layer)) {
                                mo_guide.debug("引导进入入口：直接进入");
                                cmd.exec(layer);
                            }
                        });
                    }
                    return cmd;
                }
                else {
                    var keys = Object.keys(self.cmdMap);
                    if (!keys || keys.length == 0)
                        self.doDtor();
                }
            }
            else {
                var keys = Object.keys(self.cmdMap);
                if (!keys || keys.length == 0)
                    self.doDtor();
            }
            return null;
        };
        __egretProto__.getCmd = function (groupId, cmdIndex) {
            if (arguments.length == 1 && typeof groupId == "string") {
                return this.cmdMap[groupId];
            }
            return this.cmdMap[groupId + "_" + cmdIndex];
        };
        __egretProto__.removeCmd = function (cmd) {
            delete this.cmdMap[cmd.groupId + "_" + cmd.cmdIndex];
            cmd.close();
            cmd.dispatchClearEvent();
            cmd.doDtor();
        };
        //如果返回了false，则表示不需要回退
        __egretProto__.revertCmd = function (cmd) {
            var self = this;
            if (self.isGuideFinished)
                return true; //已经结束了
            var revertCmdKey = cmd.revertCmdKey;
            if (!revertCmdKey)
                return false;
            self.removeCmd(cmd);
            if (revertCmdKey.match(/^\d+_\d+$/)) {
                var arr = revertCmdKey.split("_");
                var groupId = parseInt(arr[0]);
                var cmdIndex = parseInt(arr[1]);
                self.setCmd(groupId, cmdIndex);
                return true;
            }
            else {
                var argArr = revertCmdKey.split(":");
                var func = mo.guideRevert[argArr[0]];
                if (func) {
                    var cmdKey = func(self, argArr[1]);
                    self.setCmd(cmdKey);
                    return true;
                }
                else {
                    mo_guide.error("引导【】revert配置有误，请检查！", cmd.groupId + "_" + cmd.cmdIndex);
                    return false;
                }
            }
        };
        __egretProto__.goToNextCmd = function (cmd) {
            var self = this;
            self.removeCmd(cmd);
            var groupId = cmd.groupId, cmdIndex = cmd.cmdIndex;
            var nextGroupId = groupId, nextCmdIndex = cmdIndex + 1;
            if (cmd.nextCmdKey) {
                var nextCmdKey = cmd._doNextCmdGetter();
                if (nextCmdKey) {
                    var arr = nextCmdKey.split("_");
                    nextGroupId = parseInt(arr[0]);
                    nextCmdIndex = parseInt(arr[1]);
                }
                else {
                    nextGroupId = 11111;
                    nextCmdIndex = 11111;
                }
            }
            else {
                var groupData = self._cfgData[groupId];
                var cmdData = groupData[cmdIndex + 1];
                if (cmdData) {
                    nextGroupId = groupId;
                    nextCmdIndex = cmdIndex + 1;
                }
                else {
                    nextGroupId = groupId + 1;
                    nextCmdIndex = 0;
                }
            }
            var nextCmd = self.setCmd(nextGroupId, nextCmdIndex); //下一个引导
            self.submit(cmd, nextCmd); //需要传递两个参数
            self.refresh();
        };
        __egretProto__.jumpToNextGroup = function (cmd) {
            var self = this;
            self.removeCmd(cmd);
            var nextCmd = self.setCmd(cmd.groupId + 1, 0);
            self.submit(cmd, nextCmd); //需要传递两个参数
            self.refresh();
        };
        __egretProto__.refresh = function () {
            var self = this, cmdMap = self.cmdMap;
            if (self.isGuideFinished)
                return; //已经结束了
            for (var cmdKey in cmdMap) {
                var cmd = cmdMap[cmdKey];
                cmd.refresh();
            }
        };
        __egretProto__.refreshNextTick = function () {
            process.nextTick(this.refresh, this);
        };
        __egretProto__.submit = function (curCmd, nextCmd) {
            var self = this;
            var toSave = true;
            if (nextCmd) {
                toSave = !!nextCmd.toSave;
            }
            else {
                toSave = !!curCmd.toSave;
            }
            if (toSave) {
                self._doSubmit(curCmd, nextCmd);
            }
        };
        __egretProto__._doSubmit = function (curCmd, nextCmd) {
            //子类实现
        };
        GuideMgr.__className = "GuideMgr";
        return GuideMgr;
    })(mo.Class);
    mo.GuideMgr = GuideMgr;
    GuideMgr.prototype.__class__ = "mo.GuideMgr";
    mo._guideCmdFactoryClassMap = {}; //引导命令工厂类映射
    /** 注册引导命令工厂类 */
    function registerGuideCmdFactoryClass(factoryClass) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = 0; i < args.length; ++i) {
            mo._guideCmdFactoryClassMap[args[i]] = factoryClass;
        }
    }
    mo.registerGuideCmdFactoryClass = registerGuideCmdFactoryClass;
    /** 引导管理器列表 */
    mo._guideMgrList = [];
    /** 注册引导管理器 */
    function registerGuideMgr(guideMgr) {
        if (mo._guideMgrList.indexOf(guideMgr) >= 0)
            return;
        mo._guideMgrList.push(guideMgr);
    }
    mo.registerGuideMgr = registerGuideMgr;
    /** 移除不可见的引导 */
    function removeInvisibleCmd() {
        for (var i = 0, li = mo._guideMgrList.length; i < li; ++i) {
            mo._guideMgrList[i].removeInvisibleCmd();
        }
    }
    mo.removeInvisibleCmd = removeInvisibleCmd;
    /** 刷新引导 */
    function refreshGuide() {
        for (var i = 0, li = mo._guideMgrList.length; i < li; ++i) {
            mo._guideMgrList[i].refresh();
        }
    }
    mo.refreshGuide = refreshGuide;
    function searchLayer4Guide(layerClassName) {
        var scene = mo.runningScene;
        var arr = [
            scene.displayTray,
            scene.menuTray,
            scene.dlgTray,
            scene.msgTray
        ];
        for (var i = 0; i < arr.length; ++i) {
            var tray = arr[i];
            if (!tray.visible)
                continue; //不可见
            var children = tray.getChildren();
            for (var j = 0; j < children.length; ++j) {
                var child = children[j];
                if (child && layerClassName == child.__className) {
                    return child;
                }
            }
        }
        return null;
    }
    mo.searchLayer4Guide = searchLayer4Guide;
    var _isGuideVisible;
    function addGuidePauseListener(layerClassName) {
        //显示
        var func1 = function () {
            mo.removeBeforeEventListener(mo.visibleDispatcher, layerClassName, func1, null);
            //暂停引导
            mo.guidePaused = true;
            _isGuideVisible = mo.runningScene.guideTray.isVisible();
            if (_isGuideVisible) {
                mo.runningScene.guideTray.visible = false;
                mo.runningScene.guideTray.forceHidden = true;
            }
            mo_guide.debug("引导暂停【%s】", layerClassName);
        };
        mo.addBeforeEventListener(mo.visibleDispatcher, layerClassName, func1, null);
        //消失
        var func2 = function () {
            mo.removeAfterEventListener(mo.invisibleDispatcher, layerClassName, func2, null);
            //重启引导
            mo.guidePaused = false;
            if (_isGuideVisible) {
                mo.runningScene.guideTray.forceHidden = false;
                mo.runningScene.guideTray.visible = true;
            }
            mo.refreshGuide();
        };
        mo.addAfterEventListener(mo.invisibleDispatcher, layerClassName, func2, null);
    }
    mo.addGuidePauseListener = addGuidePauseListener;
})(mo || (mo = {}));
