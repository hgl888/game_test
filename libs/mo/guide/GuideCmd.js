var mo_guide;
(function (mo_guide) {
    mo_guide.log;
    mo_guide.debug;
    mo_guide.info;
    mo_guide.warn;
    mo_guide.error;
    logger.initLogger(mo_guide, "mo_guide");
})(mo_guide || (mo_guide = {}));
var mo;
(function (mo) {
    var GuideCmd = (function (_super) {
        __extends(GuideCmd, _super);
        function GuideCmd() {
            _super.apply(this, arguments);
            this.END_TYPE_NOT_SAVE = 1; //退出当前界面就结束，不保存
            this.END_TYPE_NEXT = 2; //退出当前界面就直接进入到下一个
            this.EVENT_TYPE_CLEAR_EVENT = "eventType_clearEvent"; //清除事件
            this.judgeContent = "";
        }
        var __egretProto__ = GuideCmd.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.groupId = 0;
            self.cmdIndex = 0;
            self.countdown = 0;
            self.delayTimeToShow = 0;
            self.toSave = true;
            self.actions = [];
            self._isExecing = false;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        __egretProto__.onCondition = function (handler, ctx, arg) {
            this._onCondition = handler;
            this._onConditionCtx = ctx;
            this._onConditionArg = arg;
        };
        __egretProto__._doCondition = function (layer) {
            var self = this;
            if (self._onCondition)
                return self._onCondition.call(self._onConditionCtx, self, self._onConditionArg, layer);
            return true;
        };
        __egretProto__.judge = function () {
            var self = this;
            var judgeContent = self.judgeContent;
            if (judgeContent) {
                var arr = judgeContent.split(":");
                var judgeFuncName = arr[0];
                var argStr = arr[1];
                var func = mo.guideJudge[judgeFuncName];
                if (func) {
                    return func(self.guideMgr, self, argStr);
                }
            }
            return true;
        };
        __egretProto__.onNodeGetter = function (handler, ctx, args) {
            this._onNodeGetter = handler;
            this._onNodeGetterCtx = ctx;
            this._onNodeGetterArg = args;
        };
        __egretProto__._doNodeGetter = function () {
            var self = this;
            if (!self.node) {
                if (self._onNodeGetter) {
                    self.node = self._onNodeGetter.call(self._onNodeGetterCtx, self, self._onNodeGetterArg);
                }
                else {
                    if (!self.nodeName)
                        return null;
                    var arr = self.nodeName.split(".");
                    var node = self.layer;
                    for (var i = 0, li = arr.length; i < li; ++i) {
                        node = node.getWidgetByName(arr[i]);
                        if (!node)
                            return null;
                    }
                    self.node = node;
                }
            }
            return self.node;
        };
        __egretProto__.onRectNodeGetter = function (handler, ctx, arg) {
            this._onRectNodeGetter = handler;
            this._onRectNodeGetterCtx = ctx;
            this._onRectNodeGetterArg = arg;
        };
        __egretProto__._doRectNodeGetter = function () {
            var self = this;
            if (self._onRectNodeGetter) {
                self.rectNode = self._onRectNodeGetter.call(self._onRectNodeGetterCtx, self, self._onRectNodeGetterArg);
            }
            else if (self.rectNodeName) {
                var arr = self.rectNodeName.split(".");
                var node = self.layer;
                for (var i = 0, li = arr.length; i < li; ++i) {
                    node = node.getWidgetByName(arr[i]);
                    if (!node)
                        break;
                }
                self.rectNode = node;
            }
            self.rectNode = self.rectNode || self._doNodeGetter();
            return self.rectNode;
        };
        __egretProto__.getRectNode = function () {
            return this._doRectNodeGetter();
        };
        //获取目标节点的rect
        __egretProto__.getNodeRect = function () {
            var rectNode = this._doRectNodeGetter();
            if (!rectNode)
                return null;
            return rectNode.getWorldBoxWithoutChildren();
        };
        __egretProto__.onBeforeShow = function (func, ctx, arg) {
            this._onBeforeShow = func;
            this._onBeforeShowCtx = ctx;
            this._onBeforeShowArg = arg;
        };
        __egretProto__._doBeforeShow = function (cb) {
            //显示之前的处理，返回false则为不显示
            var self = this;
            if (self._onBeforeShowDoing)
                return; //如果正在处理，就直接返回，这时候就避免了反复执行
            if (self._onBeforeShow) {
                self._onBeforeShowDoing = true;
                self._onBeforeShow.call(self._onBeforeShowCtx, self, self._onBeforeShowArg, cb);
            }
            else
                cb();
        };
        __egretProto__.onAfterShow = function (func, ctx, arg) {
            this._onAfterShow = func;
            this._onAfterShowCtx = ctx;
            this._onAfterShowArg = arg;
        };
        __egretProto__._doAfterShow = function () {
            //显示之后的处理
            var self = this;
            if (self._onAfterShow)
                self._onAfterShow.call(self._onAfterShowCtx, self, self._onAfterShowArg);
        };
        __egretProto__.onBeforeNext = function (func, ctx, arg) {
            this._onBeforeNext = func;
            this._onBeforeNextCtx = ctx;
            this._onBeforeNextArg = arg;
        };
        __egretProto__._doBeforeNext = function (cb) {
            //提交命令前的处理，返回false为不提交
            var self = this;
            if (self._onBeforeNext)
                self._onBeforeNext.call(self._onBeforeNextCtx, self, self._onBeforeNextArg, cb);
            else
                cb();
        };
        __egretProto__.onAfterNext = function (func, ctx, arg) {
            this._onAfterNext = func;
            this._onAfterNextCtx = ctx;
            this._onAfterNextArg = arg;
        };
        __egretProto__._doAfterNext = function () {
            var self = this;
            if (self._onAfterNext)
                self._onAfterNext.call(self._onAfterNextCtx, self, self._onAfterNextArg);
            self._removeActionEvents();
        };
        __egretProto__.onNodeClickBefore = function (handler, ctx) {
            this._onNodeClickBefore = handler;
            this._onNodeClickBeforeCtx = ctx;
        };
        __egretProto__._doNodeClickBefore = function (event) {
            var self = this;
            var sender = event.sender;
            if (sender == self.getTargetNode()) {
                if (self._onNodeClickBefore)
                    self._onNodeClickBefore.call(self._onNodeClickBeforeCtx);
                else
                    self.hide();
            }
        };
        __egretProto__.onNodeClickAfter = function (handler, ctx) {
            this._onNodeClickAfter = handler;
            this._onNodeClickAfterCtx = ctx;
        };
        __egretProto__._doNodeClickAfter = function (event) {
            var self = this;
            var sender = event.sender;
            if (sender == self.getTargetNode()) {
                if (self._onNodeClickAfter)
                    self._onNodeClickAfter.call(self._onNodeClickAfterCtx, self);
                else
                    self._next();
            }
        };
        __egretProto__.onNextCmdGetter = function (handler, ctx, arg) {
            this._onNextCmdGetter = handler;
            this._onNextCmdGetterCtx = ctx;
            this._onNextCmdGetterArg = arg;
        };
        __egretProto__._doNextCmdGetter = function () {
            var self = this;
            if (self._onNextCmdGetter)
                return self._onNextCmdGetter.call(self._onNextCmdGetterCtx, self, self._onNextCmdGetterArg);
            return self.nextCmdKey;
        };
        __egretProto__._doShow = function () {
            //显示引导视图
            var self = this;
            if (self.countdown) {
                if (self._countdownKey)
                    mo.clearTimeout(self._countdownKey);
                self._countdownKey = mo.setTimeout(function () {
                    self._countdownKey = null;
                    self._doNext();
                }, self, self.countdown);
            }
            self.reshow(); //先reshow一下，为的是设置visible属性
            var ui = self.ui;
            if (ui && !ui.getParent()) {
                mo.runningScene.guideTray.penetrable = self.penetrable;
                ui.show();
            }
            var rectNode = self._doRectNodeGetter() || self.node;
            var hookUI = self.hookUI;
            if (rectNode && hookUI && !hookUI.getParent()) {
                if (self.isHook) {
                    rectNode.addChild(self.hookUI);
                    hookUI.zOrder = 99999; //将ui添加到该节点最上层
                    hookUI.x = rectNode.width / 2;
                    hookUI.y = rectNode.height / 2;
                }
                else {
                    ui.addWidget(hookUI);
                    var rect = self.getNodeRect();
                    if (rect) {
                        hookUI.setPosition(rect.x + rect.width / 2 - ui.width * ui.anchorX, rect.y + rect.height / 2 - ui.height * ui.anchorY);
                    }
                }
            }
            self.guideMgr.dispatchShowCmdEvent(self);
            if (!self.guideMgr.showing)
                self.guideMgr._hideCmd(self);
        };
        __egretProto__._doNext = function () {
            var self = this;
            if (self._countdownKey) {
                mo.clearTimeout(self._countdownKey);
                self._countdownKey = null;
            }
            self.close();
            self.guideMgr.goToNextCmd(self);
        };
        __egretProto__._createUI = function () {
            //在这里对ui进行实例化
            var self = this;
            if (self._uiCreated)
                return;
            if (self._UIClass) {
                var ui = self.ui = self._UIClass.create();
                ui.setCmd(self);
            }
            if (self._HookUIClass) {
                self.hookUI = self._HookUIClass.create();
                self.hookUI.setCmd(self);
            }
            self._uiCreated = true;
        };
        __egretProto__.hide = function () {
            //隐藏掉ui，并没有进行ui清空操作
            var self = this;
            if (self.ui) {
                self.ui.setVisible(false);
            }
            if (self.hookUI) {
                self.hookUI.setVisible(false);
            }
        };
        __egretProto__.reshow = function () {
            //重新显示ui
            var self = this;
            if (self.ui) {
                mo.runningScene.guideTray.penetrable = self.penetrable;
                //self.ui.setTouchEnabled(true);
                self.ui.setVisible(true);
            }
            if (self.hookUI) {
                //self.hookUI.setTouchEnabled(true);
                self.hookUI.setVisible(true);
            }
        };
        __egretProto__.close = function () {
            //关闭引导视图
            var self = this;
            var ui = self.ui, hookUI = self.hookUI;
            if (ui)
                ui.close();
            if (hookUI)
                hookUI.removeFromParent();
            if (self.guideMgr)
                self.guideMgr.dispatchCloseCmdEvent(self);
        };
        __egretProto__._doInitNode = function (cb) {
            var self = this;
            if (self.nodeName || self.rectNodeName) {
                var rect = self.getNodeRect();
                if (!rect) {
                    mo_guide.warn("【%s】引导命令【%s_%s】未能发现rect！", self.guideMgr.__className, self.groupId, self.cmdIndex);
                    self._isExecing = false;
                    return; //就不再执行了
                }
            }
            self._isExecing = true;
            cb();
        };
        __egretProto__._show = function () {
            var self = this;
            if (self._isExecing)
                return; //正在执行
            self._doBeforeShow(function () {
                if (self._isExecing)
                    return; //正在执行
                self._doInitNode(function () {
                    self._createUI();
                    self._initTouchEvents(); //放在显示前初始化点击事件
                    self._doShow();
                    self._doAfterShow();
                    if (self.route) {
                        self._initRouteEvents();
                    }
                });
            });
        };
        __egretProto__._initRouteEvents = function () {
            var self = this;
            if (self._initRouteEventsInited)
                return;
            self._initRouteEventsInited = true;
            //这里需要注册路由成功与失败的接口
            if (!self.guideMgr)
                return;
            var net = self.guideMgr.net;
            net.addEventListenerForRouteSuccess(self.route, self._onRouteSuccess, self);
            net.addEventListenerForRouteError(self.route, self._onRouteError, self);
        };
        __egretProto__._next = function (withoutRoute) {
            if (withoutRoute === void 0) { withoutRoute = false; }
            var self = this;
            if (self.route && !withoutRoute) {
                self._initRouteEvents();
            }
            else {
                self._doBeforeNext(function () {
                    self._doNext();
                    self._doAfterNext();
                });
            }
        };
        __egretProto__._removeNetEventListeners = function () {
            var self = this;
            if (!self.guideMgr)
                return;
            var net = self.guideMgr.net;
            net.removeEventListenerForRouteSuccess(self.route, self._onRouteSuccess, self);
            net.removeEventListenerForRouteError(self.route, self._onRouteError, self);
        };
        //路由成功
        __egretProto__._onRouteSuccess = function () {
            var self = this;
            self._removeNetEventListeners();
            self._doBeforeNext(function () {
                self._doNext();
                self._doAfterNext();
            });
        };
        //路由失败
        __egretProto__._onRouteError = function () {
            var self = this;
            self._removeNetEventListeners();
        };
        __egretProto__.next = function (withoutRoute) {
            if (withoutRoute === void 0) { withoutRoute = false; }
            this._next(withoutRoute);
        };
        //获取目标节点
        __egretProto__.getTargetNode = function () {
            return this._doNodeGetter();
        };
        //判断是否准备好打开了
        __egretProto__._readyToExec = function (layer) {
            return this._doCondition(layer);
        };
        /**
         * 等待
         * @param map 格式为：{groupId:cmdIndex}
         */
        __egretProto__.wait = function () {
            var self = this;
            self.waiting = true; //设置waiting为true
        };
        /**
         * 等待结束
         * @param map 格式为：{groupId:cmdIndex}
         */
        __egretProto__.waitDone = function () {
            var self = this;
            if (self.waiting == false)
                return; //如果没有等待，则直接返回了
            process.nextTick(function () {
                if (self.waiting == false)
                    return; //如果没有等待，则直接返回了
                var layer = mo.searchLayer4Guide(self.layerName);
                if (!layer)
                    return; //这时候证明还没有注册进来
                self.waiting = false; //设置waiting为false
                self.exec(self.layer); //重新调用下执行接口
            });
        };
        __egretProto__._initTouchEvents = function () {
            var self = this;
            if (self._touchEventsInited)
                return;
            self._touchEventsInited = true;
            var node = self.getTargetNode();
            if (node) {
                mo.addBeforeEventListener(mo.clickDispatcher, node.name, self._doNodeClickBefore, self);
                mo.addAfterEventListener(mo.clickDispatcher, node.name, self._doNodeClickAfter, self);
            }
        };
        __egretProto__._onLayerVisible = function () {
            var self = this;
            var endType = self.endType;
            mo.removeAfterEventListener(self.layer, gEventType.invisible, self._onLayerVisible, self);
            if (endType == 1) {
                process.nextTick(function () {
                    if (self._hasDtored)
                        return;
                    self.guideMgr.removeCmd(self);
                });
            }
        };
        __egretProto__.canExec = function (layer) {
            var self = this;
            var cmd = self.guideMgr.getCmd(self.groupId, self.cmdIndex);
            if (!cmd)
                return false; //这时候已经被移除了，所以直接返回false
            if (!self._readyToExec(layer))
                return false; //如果还没达到显示的要求，则直接返回
            self.layer = layer; //在这里保存，以后可能要对oldLayer进行监听释放
            //在这里进行layer不见了的监听注册
            if (!self["_hasOnLayerInvisible"]) {
                self["_hasOnLayerInvisible"] = true;
                mo.addAfterEventListener(layer, gEventType.invisible, self._onLayerVisible, self);
            }
            self._initActionEvents(); //初始化actions的事件
            if (self.waiting)
                return false; //如果正在等待则直接返回
            return true;
        };
        __egretProto__._getActionDispatcher = function (type) {
            switch (type) {
                case "1":
                    return mo.visibleDispatcher;
                case "2":
                    return mo.invisibleDispatcher;
                case "3":
                    return mo.actionDispatcher;
            }
            return null;
        };
        __egretProto__._initActionEvents = function () {
            var self = this;
            if (self._actionEventsInited)
                return;
            self._actionEventsInited = true;
            var actions = self.actions;
            if (actions) {
                for (var i = 0, li = actions.length; i < li; ++i) {
                    var action = actions[i];
                    if (action.indexOf("${layer}.") == 0) {
                        var eventType = action.substring(9);
                        self.layer.addEventListener(eventType, self.waitDone, self);
                    }
                    else if (action.match(/^\$\{[\w_\d]+\}./)) {
                        var type = action.substring(action.indexOf("{") + 1, action.indexOf("}"));
                        var eventType = action.substring(action.indexOf(".") + 1);
                        var dispatcher = self._getActionDispatcher(type);
                        if (dispatcher) {
                            mo.addAfterEventListener(dispatcher, eventType, self.waitDone, self);
                        }
                        else {
                            mo_guide.warn("为找到【%s】对应的dispatcher", action);
                        }
                    }
                    else {
                        mo.actionDispatcher.addEventListener(action, self.waitDone, self);
                    }
                }
            }
        };
        __egretProto__._removeActionEvents = function () {
            var self = this;
            var actions = self.actions;
            if (actions) {
                for (var i = 0, li = actions.length; i < li; ++i) {
                    var action = actions[i];
                    if (action.indexOf("${layer}.") == 0) {
                        var eventType = action.substring(9);
                        self.layer.removeEventListener(eventType, self.waitDone, self);
                    }
                    else if (action.match(/^\$\{[\w_\d]+\}./)) {
                        var type = action.substring(action.indexOf("{") + 1, action.indexOf("}"));
                        var eventType = action.substring(action.indexOf(".") + 1);
                        var dispatcher = self._getActionDispatcher(type);
                        if (dispatcher) {
                            mo.removeAfterEventListener(dispatcher, eventType, self.waitDone, self);
                        }
                        else {
                            mo_guide.warn("为找到【%s】对应的dispatcher", action);
                        }
                    }
                    else {
                        mo.actionDispatcher.removeEventListener(action, self.waitDone, self);
                    }
                }
            }
            self._actionEventsInited = false;
        };
        //执行命令
        __egretProto__.exec = function (layer) {
            var self = this;
            if (mo.guidePaused)
                return; //引导暂停了
            if (self._isExecing)
                return; //如果正在执行就直接返回
            if (!self.canExec(layer))
                return;
            if (self.delayTimeToShow) {
                mo.setTimeout(self._show, self, self.delayTimeToShow);
            }
            else {
                self._show();
            }
        };
        __egretProto__.ctor = function () {
        };
        __egretProto__.unbindNodes = function () {
            var self = this;
            self.node = null;
            self.rectNode = null;
            self._touchEventsInited = false;
        };
        __egretProto__.dtor = function () {
            var self = this, ui = self.ui, hookUI = self.hookUI;
            if (self.layer)
                mo.removeAfterEventListener(self.layer, gEventType.invisible, self._onLayerVisible, self);
            self.removeEventListeners4Layer();
            self._removeNetEventListeners();
            if (self.layer) {
                var node = self.getTargetNode();
                if (node) {
                    mo.removeBeforeEventListener(mo.clickDispatcher, node.name, self._doNodeClickBefore, self);
                    mo.removeAfterEventListener(mo.clickDispatcher, node.name, self._doNodeClickAfter, self);
                }
            }
            if (ui) {
                ui.doDtor();
                self.ui = null;
            }
            if (hookUI) {
                hookUI.doDtor();
                self.hookUI = null;
            }
            self._uiCreated = false;
            self.dispatchDtorEvent();
            self.dispatchClearEvent();
            self.unbindNodes();
            mo.removeEventListeners(self);
        };
        __egretProto__.dispatchDtorEvent = function () {
            var self = this;
            if (self.willTrigger("dtor")) {
                var event = new mo.Event("dtor");
                self.dispatchEvent(event);
            }
        };
        //添加清除事件
        __egretProto__.addClearEventListener = function (listener, ctx) {
            var self = this;
            var clear = function (event) {
                this.removeEventListener(event.type, listener, ctx); //只进行一次监听
                listener.apply(ctx, arguments);
            };
            self.addEventListener(self.EVENT_TYPE_CLEAR_EVENT, clear, self);
        };
        //分发清除事件
        __egretProto__.dispatchClearEvent = function () {
            var self = this, eventType = self.EVENT_TYPE_CLEAR_EVENT;
            if (self.willTrigger(eventType)) {
                var event = new mo.Event(eventType);
                self.dispatchEvent(event);
            }
        };
        //为引导注册绑定layer的监听
        __egretProto__.addEventListeners4Layer = function () {
            var self = this;
            mo.addBeforeEventListener(mo.visibleDispatcher, self.layerName, self._onBeforeLayerVisible, self);
            mo.addAfterEventListener(mo.visibleDispatcher, self.layerName, self._onAfterLayerVisible, self);
        };
        __egretProto__.removeEventListeners4Layer = function () {
            var self = this;
            mo.removeBeforeEventListener(mo.visibleDispatcher, self.layerName, self._onBeforeLayerVisible, self);
            mo.removeAfterEventListener(mo.visibleDispatcher, self.layerName, self._onAfterLayerVisible, self);
        };
        __egretProto__._onBeforeLayerVisible = function (event) {
            var self = this;
            if (self.waiting)
                return;
            var layer = event.sender;
            if (!mo.guidePaused && self.canExec(layer)) {
                mo.runningScene.guideTray.showPre();
            }
        };
        __egretProto__._onAfterLayerVisible = function (event) {
            var self = this;
            process.nextTick(function () {
                process.nextTick(function () {
                    mo_guide.debug("引导进入入口：监听进入");
                    var layer = event.sender;
                    if (!mo.guidePaused && self.canExec(layer)) {
                        mo.runningScene.guideTray.penetrable = self.penetrable;
                        self.exec(layer);
                    }
                });
            });
        };
        __egretProto__.refresh = function () {
            var self = this;
            if (self.waiting || self._isExecing || mo.guidePaused)
                return; //如果还在等待或者正在执行，直接返回
            process.nextTick(function () {
                if (self.waiting || self._isExecing || mo.guidePaused)
                    return; //如果还在等待或者正在执行，直接返回
                var layer = mo.searchLayer4Guide(self.layerName);
                if (!layer)
                    return; //这时候证明还没有注册进来
                if (layer.showingWithAction)
                    return; //layer正在显示，则交给注册的监听进行显示
                if (self.canExec(layer)) {
                    mo_guide.debug("引导进入入口：刷新进入");
                    self.exec(layer); //重新调用下执行接口
                }
            });
        };
        GuideCmd.__className = "GuideCmd";
        return GuideCmd;
    })(mo.Class);
    mo.GuideCmd = GuideCmd;
    GuideCmd.prototype.__class__ = "mo.GuideCmd";
})(mo || (mo = {}));
