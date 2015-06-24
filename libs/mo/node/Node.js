var mo;
(function (mo) {
    var Node = (function (_super) {
        __extends(Node, _super);
        function Node() {
            _super.call(this);
            var self = this;
            self.__class = self["constructor"];
            self.__className = self.__class.__className;
            self._initProp();
            self._init();
        }
        var __egretProto__ = Node.prototype;
        Node.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return mo._baseConstFuncPrototype.create.apply(this, arguments);
        };
        Node.createDynamic = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return mo._baseConstFuncPrototype.createDynamic.apply(this, arguments);
        };
        Node.getInstance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return mo._baseConstFuncPrototype.getInstance.apply(this, arguments);
        };
        Node.purgeInstance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return mo._baseConstFuncPrototype.purgeInstance.apply(this, arguments);
        };
        __egretProto__._setZOrder = function (zOrder) {
            if (this._parent) {
                this._parent._reorderChildrenDirty = true;
            }
            this._nodeOption.zOrder = zOrder;
        };
        Object.defineProperty(__egretProto__, "zOrder", {
            get: function () {
                return this._nodeOption.zOrder;
            },
            set: function (zOrder) {
                this._setZOrder(zOrder);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         * @param zOrder
         */
        __egretProto__.setZOrder = function (zOrder) {
            this._setZOrder(zOrder);
        };
        /**
         * @deprecated
         * @returns {number}
         */
        __egretProto__.getZOrder = function () {
            return this._nodeOption.zOrder;
        };
        //@override
        __egretProto__._setVisible = function (value) {
            this._lastOption.setLastValue("visible", !!value);
            _super.prototype._setVisible.call(this, !!value);
        };
        /**
         * 请注意，子类所有的成员属性都必须在这里赋值，不能直接在声明时候也附上值。
         * @private
         */
        __egretProto__._initProp = function () {
            var self = this, clazz = self.__class;
            self._nodeOption = new clazz.NODE_OPTION_CLASS();
            self._touchOption = new clazz.TOUCH_OPTION_CLASS();
            self.extendOption = new mo._ExtendOption();
            self._lastOption = new mo._LastOption();
            self._lastOption.node = self;
        };
        __egretProto__._init = function () {
        };
        //@override
        __egretProto__._setWidth = function (width) {
            var self = this;
            if (self._explicitWidth == width)
                return;
            _super.prototype._setWidth.call(this, width);
            self._nodeOption.nodeSizeDirty = self._dirty = true;
        };
        //@override
        __egretProto__._setHeight = function (height) {
            var self = this;
            if (self._explicitHeight == height)
                return;
            _super.prototype._setHeight.call(this, height);
            self._nodeOption.nodeSizeDirty = self._dirty = true;
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        /**
         * 获取shader
         * @return any
         */
        __egretProto__.getShaderProgram = function () {
            //todo
            return null;
        };
        __egretProto__.setParent = function (parent) {
            this._parent = parent;
        };
        __egretProto__.getParent = function () {
            return this.parent;
        };
        __egretProto__.setRotation = function (rotation) {
            this.rotation = rotation;
        };
        __egretProto__.getRotation = function () {
            return this.rotation;
        };
        __egretProto__.setOpacity = function (opacity) {
            this.alpha = opacity / 255;
        };
        __egretProto__.getOpacity = function () {
            return this.alpha * 255;
        };
        __egretProto__.setScale = function (scaleX, scaleY) {
            if (scaleY == null) {
                scaleY = scaleX;
            }
            this.scaleX = scaleX;
            this.scaleY = scaleY;
        };
        __egretProto__.setScaleX = function (scaleX) {
            this.scaleX = scaleX;
        };
        __egretProto__.setScaleY = function (scaleY) {
            this.scaleY = scaleY;
        };
        __egretProto__.getScale = function () {
            return this.getScaleX();
        };
        __egretProto__.getScaleY = function () {
            return this.scaleY;
        };
        __egretProto__.getScaleX = function () {
            return this.scaleX;
        };
        __egretProto__.setName = function (name) {
            this.name = name;
        };
        __egretProto__.getName = function () {
            return this.name;
        };
        __egretProto__.setTag = function (tag) {
            this._nodeOption.tag = tag;
        };
        __egretProto__.getTag = function () {
            return this._nodeOption.tag;
        };
        __egretProto__.setSkewY = function (skewY) {
            this.skewY = skewY;
        };
        __egretProto__.getSkewY = function () {
            return this.skewY;
        };
        __egretProto__.setSkewX = function (skewX) {
            this.skewX = skewX;
        };
        __egretProto__.getSkewX = function () {
            return this.skewX;
        };
        __egretProto__.setPosition = function (pos, posY) {
            if (posY != null) {
                //两个参数
                var x = pos;
                var y = posY;
            }
            else {
                //一个参数时候
                var x = pos.x, y = pos.y;
            }
            this._setX(x);
            this._setY(y);
        };
        __egretProto__.getPosition = function () {
            return mo.p(this.x, this.y);
        };
        __egretProto__.setPositionX = function (x) {
            this.x = x;
        };
        __egretProto__.getPositionX = function () {
            return this.x;
        };
        __egretProto__.setPositionY = function (y) {
            this.y = y;
        };
        __egretProto__.getPositionY = function () {
            return this.y;
        };
        __egretProto__.setVisible = function (visible) {
            this.visible = visible;
        };
        __egretProto__.isVisible = function () {
            return this.visible;
        };
        __egretProto__.setAnchorPoint = function (pos, posY) {
            if (posY != null) {
                //两个参数
                var anchorX = pos;
                var anchorY = posY;
            }
            else {
                //一个参数时候
                var anchorX = pos.x, anchorY = pos.y;
            }
            this._setAnchorX(anchorX);
            this._setAnchorY(anchorY);
        };
        __egretProto__.getAnchorPoint = function () {
            return mo.p(this.anchorX, this.anchorY);
        };
        __egretProto__.getAnchorPointInPoints = function () {
            return mo.p(this.anchorX * this.width, this.anchorY * this.height);
        };
        __egretProto__.setSize = function (size, height) {
            if (height != null) {
                //两个参数
                var width = size;
            }
            else {
                //一个参数时候
                var width = size.width;
                height = size.height;
            }
            this._setWidth(width);
            this._setHeight(height);
        };
        __egretProto__.getSize = function () {
            return mo.size(this.width, this.height);
        };
        /**
         * 获取子节点
         * @return {Array<egret.DisplayObject>}
         */
        __egretProto__.getChildren = function () {
            return this._children;
        };
        /**
         * 获取Widget的子节点数量
         * @returns {Number}
         */
        __egretProto__.getChildrenCount = function () {
            return this.numChildren;
        };
        __egretProto__.getChildByTag = function (tag) {
            var child;
            var children = this.getChildren();
            for (var i = 0; i < children.length; i++) {
                child = children[i];
                if (child && child.getTag() == tag) {
                    return child;
                }
            }
        };
        __egretProto__.removeChildByTag = function (tag) {
            var child = this.getChildByTag(tag);
            if (child) {
                this.removeChild(child);
            }
            else {
                mo.log("亲，找不到TAG:%s的Child", tag);
            }
        };
        //todo Shader
        __egretProto__.setShaderProgram = function () {
        };
        /**=========== Action相关 ===========*/
        /**
         * Action管理器
         * @returns {any}
         */
        __egretProto__.getActionManager = function () {
            return egret.action.Manager.getInstance();
        };
        __egretProto__.runAction = function (action) {
            this.getActionManager().addAction(this, action);
        };
        __egretProto__.pauseSchedulerAndActions = function () {
            this.getActionManager().pauseTarget(this);
        };
        __egretProto__.resumeSchedulerAndActions = function () {
            this.getActionManager().resumeTarget(this);
        };
        __egretProto__.numberOfRunningActions = function () {
            return this.getActionManager().numberOfRunningActionsInTarget(this);
        };
        __egretProto__.stopAllActions = function () {
            this.getActionManager().removeAllActionsFromTarget(this);
        };
        __egretProto__.stopActionByTag = function (tag) {
            this.getActionManager().removeActionByTag(tag, this);
        };
        __egretProto__.getActionByTag = function (tag) {
            return this.getActionManager().getActionByTag(tag, this);
        };
        __egretProto__.stopAction = function (action) {
            this.getActionManager().removeAction(action);
        };
        /**
         * @deprecated
         * @returns {boolean}
         */
        __egretProto__.isRunning = function () {
            return true;
        };
        /*public draw() {
        }*/
        __egretProto__.update = function (dt) {
        };
        //TODO
        __egretProto__.setColor = function (color) {
        };
        //TODO
        __egretProto__.getColor = function () {
        };
        //@override
        __egretProto__._parentChanged = function (parent) {
            _super.prototype._parentChanged.call(this, parent);
            if (!parent) {
                var self = this, nodeOption = self._nodeOption;
                var eventType = self.__class.REMOVE_FROM_PARENT;
                if (self.willTrigger(eventType)) {
                    var event = new mo.Event(eventType);
                    self.dispatchEvent(event);
                }
                if (!self._isInstance && self.isAutoDtor) {
                    self.doDtor();
                }
                else if (!self._isInstance) {
                    var factory = nodeOption.factory;
                    if (factory) {
                        factory.reclaim(self);
                    }
                }
            }
        };
        //@override
        __egretProto__.addChild = function (child) {
            this._reorderChildrenDirty = true;
            return _super.prototype.addChild.call(this, child);
        };
        /**
         * 对子类进行排序
         */
        __egretProto__.sortChildren = function () {
            this._children.sort(function (node1, node2) {
                if ((node1.zOrder || 0) > (node2.zOrder || 0))
                    return 1;
                if ((node1.zOrder || 0) < (node2.zOrder || 0))
                    return -1;
                return 0;
            });
            this._reorderChildrenDirty = false;
        };
        __egretProto__._onNodeSizeDirty = function () {
        };
        //=================与cocos想对应的一些回调的整理 开始==============
        //@override 有点类似visit，但又有些不同，这里做了改造，子类统一都不能覆盖这个方法
        __egretProto__._updateTransform = function () {
            var self = this;
            if (!self._visible || !self._parent)
                return;
            if (self._reorderChildrenDirty)
                self.sortChildren();
            self._touchOption.clickedThisTick = false; //设置成当前帧还没点击
            if (self._dirty) {
                self._onBeforeVisit();
                if (self._nodeOption.nodeSizeDirty)
                    self._onNodeSizeDirty();
                self._onVisit();
                self._onUpdateView();
                _super.prototype._updateTransform.call(this);
                self._onAfterVisit();
            }
            else {
                _super.prototype._updateTransform.call(this);
            }
        };
        __egretProto__._onBeforeVisit = function () {
        };
        __egretProto__._onVisit = function () {
        };
        __egretProto__._onUpdateView = function () {
        };
        __egretProto__._onAfterVisit = function () {
            var self = this;
            self._nodeOption.nodeSizeDirty = false;
            self._dirty = false;
        };
        //@override _draw 有点类似visit，但又有些不同。在_updateTransform后面执行
        //@override _onAddToStage 相当于onEnter，现在由于移植，还是加上了onEnter，以后考虑删除onEnter。
        __egretProto__._onAddToStage = function () {
            _super.prototype._onAddToStage.call(this);
            var self = this;
            if (self._touchEnabled)
                self._initTouchEvents(); //如果可点击，则在进入舞台是自动加上所有的点击事件监听
            self.onEnter(); //在这里加上onEnter的定义
            process.nextTick(self.onEnterNextTick, self);
        };
        __egretProto__.onEnter = function () {
            var self = this;
            if (self.touchEnabled) {
                self._initTouchEvents();
            }
            self.resumeSchedulerAndActions();
        };
        __egretProto__.onEnterNextTick = function () {
        };
        //@override _onRemoveFromStage 相当于onExit，现在由于移植，还是加上了onExit，以后考虑删除onExit。
        __egretProto__._onRemoveFromStage = function () {
            _super.prototype._onRemoveFromStage.call(this);
            this.onExit(); //在这里加上onExit的定义
        };
        __egretProto__.onExit = function () {
            var self = this;
            self.pauseSchedulerAndActions();
            self.stopAllActions();
            self._removeTouchEvents();
        };
        __egretProto__.getWorldBoxWithoutChildren = function () {
            var self = this;
            var gp = self.localToGlobal();
            var bounds = egret.DisplayObject.getTransformBounds(self._getSize(self._nodeOption.tempRect), self._worldTransform);
            return mo.rect(gp.x, gp.y, bounds.width, bounds.height);
        };
        //@override
        __egretProto__.getBounds = function (resultRect, calculateAnchor) {
            if (calculateAnchor === void 0) { calculateAnchor = true; }
            var rect = _super.prototype.getBounds.apply(this, arguments);
            if (resultRect)
                return rect;
            return mo.rect(rect.x, rect.y, rect.width, rect.height);
        };
        __egretProto__.localToGlobal = function (x, y, resultPoint) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var point = _super.prototype.localToGlobal.call(this, x, y, resultPoint);
            if (resultPoint)
                return point;
            return mo.p(point.x, point.y);
        };
        //=================与cocos想对应的一些回调的整理 结束==============
        //=============事件设置相关 开始==========================
        //@override
        __egretProto__._setTouchEnabled = function (touchEnabled) {
            if (this.touchEnabled == touchEnabled)
                return;
            _super.prototype._setTouchEnabled.call(this, touchEnabled);
            if (touchEnabled) {
                this._initTouchEvents();
            }
            else {
                this._removeTouchEvents();
            }
        };
        /**
         * @deprecated
         * @param touchEnabled
         */
        __egretProto__.setTouchEnabled = function (touchEnabled) {
            this._setTouchEnabled(touchEnabled);
        };
        /**
         * @deprecated
         * @returns {boolean}
         */
        __egretProto__.isTouchEnabled = function () {
            return this.touchEnabled; //TODO 是否加上visible
        };
        __egretProto__._setPenetrable = function (penetrable) {
            this._nodeOption.penetrable = penetrable;
        };
        Object.defineProperty(__egretProto__, "penetrable", {
            get: function () {
                return this._nodeOption.penetrable;
            },
            set: function (penetrable) {
                this._setPenetrable(penetrable);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         * @param penetrable
         */
        __egretProto__.setPenetrable = function (penetrable) {
            this._setPenetrable(penetrable);
        };
        /**
         * @deprecated
         */
        __egretProto__.isPenetrable = function () {
            return this._nodeOption.penetrable;
        };
        Object.defineProperty(__egretProto__, "longTouchEnabled", {
            get: function () {
                return this._touchOption.longTouchEnabled;
            },
            set: function (enabled) {
                this._touchOption.longTouchEnabled = enabled;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.enableLongTouch = function (respInterval, startInterVal) {
            if (respInterval === void 0) { respInterval = 100; }
            if (startInterVal === void 0) { startInterVal = 400; }
            var self = this, touchOption = self._touchOption;
            self.longTouchEnabled = true;
            touchOption.respInterval = respInterval;
            touchOption.startInterVal = startInterVal;
        };
        __egretProto__._scheduleLongTouchCheck = function (respInterval, delayTime) {
            var self = this, touchOption = self._touchOption;
            touchOption.canLongTouch = true;
            touchOption.longTouchTimeoutId = mo.setTimeout(function () {
                touchOption.canTap = false;
                touchOption.longTouchTimeoutId = null;
                if (touchOption.canLongTouch) {
                    touchOption.longTouchEventInterValId = mo.setInterval(self._emitLongTouchBegan, self, respInterval);
                }
                else {
                    touchOption.longTouchEventInterValId = null;
                }
            }, self, delayTime);
        };
        __egretProto__._unscheduleLongTouchCheck = function () {
            var self = this, touchOption = self._touchOption;
            if (touchOption.longTouchTimeoutId != null) {
                mo.clearTimeout(touchOption.longTouchTimeoutId);
                touchOption.longTouchTimeoutId = null;
            }
            if (touchOption.longTouchEventInterValId != null) {
                mo.clearInterval(touchOption.longTouchEventInterValId);
                touchOption.longTouchEventInterValId = null;
            }
            if (touchOption.isDoingLongEvent) {
                touchOption.isDoingLongEvent = false;
                var eventType = mo.TouchEvent.LONG_TOUCH_END;
                if (self.willTrigger(eventType)) {
                    var event = new mo.TouchEvent(eventType);
                    self.dispatchEvent(event);
                }
            }
        };
        __egretProto__._emitLongTouchBegan = function () {
            var self = this, touchOption = self._touchOption;
            var isDoingLongEvent = touchOption.isDoingLongEvent;
            var canLongTouch = touchOption.canLongTouch;
            if (isDoingLongEvent && !canLongTouch) {
                //这时候已经不能再继续长按了并且需要相应长按结束事件
                touchOption.isDoingLongEvent = false;
                var endType = mo.TouchEvent.LONG_TOUCH_END;
                if (self.willTrigger(endType)) {
                    var event = new mo.TouchEvent(endType);
                    self.dispatchEvent(event);
                }
                return;
            }
            else if (!canLongTouch) {
            }
            else {
                touchOption.isDoingLongEvent = true;
                var eventType = mo.TouchEvent.LONG_TOUCH_BEGIN;
                if (self.willTrigger(eventType)) {
                    var event = new mo.TouchEvent(eventType);
                    self.dispatchEvent(event);
                }
            }
        };
        Object.defineProperty(__egretProto__, "hitChildrenEnabled", {
            get: function () {
                return this._touchOption.hitChildrenEnabled;
            },
            set: function (hitChildrenEnabled) {
                this._touchOption.hitChildrenEnabled = hitChildrenEnabled;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.hitTest = function (x, y, ignoreTouchEnabled) {
            if (ignoreTouchEnabled === void 0) { ignoreTouchEnabled = false; }
            var self = this, result = null;
            if (!self._visible) {
                return result;
            }
            var touchOption = self._touchOption, nodeOption = self._nodeOption;
            var hitChildrenEnabled = touchOption.hitChildrenEnabled;
            if (hitChildrenEnabled) {
                var children = self._children, l = children.length, hitEgretEnabled = touchOption.hitEgretEnabled;
                for (var i = l - 1; i >= 0; i--) {
                    var child = children[i];
                    if (!hitEgretEnabled && !child._nodeOption) {
                        continue;
                    }
                    var mtx = child._getMatrix();
                    mtx.invert();
                    var point = egret.Matrix.transformCoords(mtx, x, y);
                    var childHitTestResult = child.hitTest(point.x, point.y, true);
                    if (childHitTestResult && childHitTestResult._touchEnabled) {
                        return childHitTestResult;
                    }
                }
            }
            if (!ignoreTouchEnabled && !this._touchEnabled) {
                return null;
            }
            if (!nodeOption.penetrable) {
                var bound = this._getSize(egret.Rectangle.identity);
                if (0 <= x && x < bound.width && 0 <= y && y < bound.height) {
                    result = self;
                }
            }
            return result;
        };
        __egretProto__._initTouchEvents = function () {
            var self = this, touchOption = self._touchOption;
            if (touchOption.touchEventsInited)
                return; //已经初始化过了就不再初始化了
            touchOption.touchEventsInited = true;
            touchOption.bePressed = false;
            var TE = egret.TouchEvent;
            self.addEventListener(TE.TOUCH_BEGIN, self._onTouchBegin, self);
        };
        __egretProto__.__resetDownEvent = function () {
            var self = this, stage = mo.getStage();
            self._touchOption.bePressed = false;
            var TE = egret.TouchEvent;
            self.addEventListener(TE.TOUCH_BEGIN, self._onTouchBegin, self);
            stage.removeEventListener(TE.TOUCH_MOVE, self._onTouchMoveInStage, self, true);
            stage.removeEventListener(TE.TOUCH_END, self._onTouchEndInStage, self, true);
        };
        __egretProto__.__resetOtherEvents = function () {
            var self = this, stage = mo.getStage();
            self._touchOption.bePressed = true;
            var TE = egret.TouchEvent;
            self.removeEventListener(TE.TOUCH_BEGIN, self._onTouchBegin, self);
            stage.addEventListener(TE.TOUCH_MOVE, self._onTouchMoveInStage, self, true);
            stage.addEventListener(TE.TOUCH_END, self._onTouchEndInStage, self, true);
        };
        __egretProto__._onTouchMoveInStage = function (event) {
            var self = this, touchOption = self._touchOption;
            var touchMovingPoint = touchOption.touchMovingPoint;
            self.globalToLocal(event.localX, event.stageY, touchMovingPoint);
            touchOption.touchMovingStagePoint.x = event.stageX;
            touchOption.touchMovingStagePoint.y = event.stageY;
            var x = touchMovingPoint.x, y = touchMovingPoint.y;
            var bound = this._getSize(egret.Rectangle.identity);
            if (0 <= x && x < bound.width && 0 <= y && y < bound.height) {
                touchOption.isIn = true;
            }
            else {
                touchOption.isIn = false;
            }
            self._moving();
            var eventType = mo.TouchEvent.NODE_MOVE;
            if (self.willTrigger(eventType)) {
                var tempEvent = new mo.TouchEvent(eventType);
                //TODO 这里需要做坐标赋值
                self.dispatchEvent(tempEvent);
            }
            touchOption.touchMovedPoint.x = touchMovingPoint.x;
            touchOption.touchMovedPoint.y = touchMovingPoint.y;
            touchOption.touchMovedStagePoint.x = event.stageX;
            touchOption.touchMovedStagePoint.y = event.stageY;
        };
        __egretProto__._moving = function () {
        };
        __egretProto__._onTouchEndInStage = function (event) {
            var self = this, touchOption = self._touchOption;
            var touchEndedPoint = touchOption.touchEndedPoint;
            touchOption.touchEndedStagePoint.x = event.stageX;
            touchOption.touchEndedStagePoint.y = event.stageY;
            self.globalToLocal(event.localX, event.stageY, touchEndedPoint);
            self._unscheduleLongTouchCheck();
            self._end(event);
            var eventType = mo.TouchEvent.NODE_END;
            if (self.willTrigger(eventType)) {
                var tempEvent = new mo.TouchEvent(eventType);
                //TODO 这里需要做坐标赋值
                self.dispatchEvent(tempEvent);
            }
            self.__resetDownEvent();
        };
        __egretProto__._end = function (event) {
            var self = this, touchOption = self._touchOption;
            //当前帧已经点击过一次，就不再让他重复点击，避免快速点击导致的一些bug
            //mo.info("click---> %s  %s", self.__className, touchOption.clickedThisTick);
            if (touchOption.clickedThisTick)
                return;
            touchOption.clickedThisTick = true;
            if (touchOption.isIn && touchOption.canTap) {
                mo.info("click--->", self.__className, self.hashCode, self.name);
                if (self._nodeOption.clickCb != null) {
                    mo.dispatchEvent([
                        [mo.clickDispatcher, self.name]
                    ], self._doClick, self, event);
                }
            }
        };
        __egretProto__._removeTouchEvents = function () {
            var self = this, self2 = self, TE = egret.TouchEvent, stage = mo.getStage();
            mo.removeEventListeners(self2, TE.TOUCH_BEGIN);
            mo.removeEventListeners(self2, TE.TOUCH_MOVE);
            mo.removeEventListeners(self2, TE.TOUCH_END);
            mo.removeEventListeners(self2, TE.TOUCH_RELEASE_OUTSIDE);
            mo.removeEventListeners(self2, TE.TOUCH_TAP);
            stage.removeEventListener(TE.TOUCH_MOVE, self._onTouchMoveInStage, self, true);
            stage.removeEventListener(TE.TOUCH_END, self._onTouchEndInStage, self, true);
            self._unscheduleLongTouchCheck();
            self._touchOption.touchEventsInited = false;
        };
        __egretProto__._onTouchBegin = function (event) {
            var self = this, touchOption = self._touchOption;
            if (!self._touchEnabled)
                return;
            touchOption.bePressed = true;
            touchOption.isIn = true;
            touchOption.canTap = true;
            touchOption.clearPoints();
            self.__resetOtherEvents();
            touchOption.touchMovedPoint.x = touchOption.touchBeganPoint.x = event.localX;
            touchOption.touchMovedPoint.y = touchOption.touchBeganPoint.y = event.localY;
            touchOption.touchMovedStagePoint.x = touchOption.touchBeganStagePoint.x = event.stageX;
            touchOption.touchMovedStagePoint.y = touchOption.touchBeganStagePoint.y = event.stageY;
            self.onTouchBegan(event);
            if (touchOption.longTouchEnabled) {
                self._scheduleLongTouchCheck(touchOption.respInterval, touchOption.startInterVal);
            }
            var eventType = mo.TouchEvent.NODE_BEGIN;
            if (self.willTrigger(eventType)) {
                var tempEvent = new mo.TouchEvent(eventType);
                //TODO 这里需要做坐标赋值
                self.dispatchEvent(tempEvent);
            }
        };
        __egretProto__.onTouchBegan = function (event) {
            event.stopPropagation();
        };
        __egretProto__.onClick = function (cb, ctx) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var nodeOption = this._nodeOption;
            nodeOption.clickCb = cb;
            nodeOption.clickCtx = ctx;
            nodeOption.clickData = args[0];
        };
        __egretProto__._doClick = function (event) {
            var self = this, nodeOption = self._nodeOption;
            nodeOption.clickCb.call(nodeOption.clickCtx, self, event, nodeOption.clickData);
        };
        //=============事件设置相关 结束==========================
        //+++++++++++++++mo._baseNodePrototype 开始++++++++++++++++++++++
        __egretProto__.doDtor = function () {
            var self = this;
            var nodeOption = self._nodeOption;
            if (nodeOption.hasDtored)
                return; //证明已经释放过了
            nodeOption.hasDtored = true;
            var children = self._children;
            for (var i = 0, li = children.length; i < li; ++i) {
                var child = children[i];
                if (child && child.isAutoDtor && !child._isInstance && child.doDtor) {
                    child.doDtor();
                }
                else if (child && !child.isAutoDtor && !child._isInstance) {
                    //if(child.__className == "Armature") debugger;
                    var childNodeOption = child._nodeOption;
                    if (childNodeOption) {
                        var factory = childNodeOption.factory;
                        if (factory) {
                            factory.reclaim(child);
                        }
                    }
                }
            }
            process.nextTick(self.dtor, self); //将真正的释放逻辑延迟到下一帧才释放。目的是为了解决一些监听事件在dtor的时候已经被移除掉的问题
        };
        __egretProto__.dtor = function () {
            var self = this;
            self._removeTouchEvents();
            mo.removeEventListeners(self); //是否所有注册在本身的监听
            mo.unregisterClass(self);
            var eventType = "dtor";
            if (self.willTrigger(eventType)) {
                var event = new mo.Event(eventType);
                self.dispatchEvent(event);
            }
            self._parent = null; //解除父节点绑定
            var factory = self._nodeOption.factory;
            if (factory) {
                factory.releaseProduct(self);
            }
            //记得释放对象！！！
            self._nodeOption.doDtor();
            self._touchOption.doDtor();
            self._lastOption.doDtor();
        };
        __egretProto__.registerClassByKey = function (clazz, key, listener) {
            mo.registerClassByKey(this, clazz, key, listener);
        };
        __egretProto__.getFactory = function () {
            return this._nodeOption.factory;
        };
        __egretProto__.setFactory = function (factory) {
            this._nodeOption.factory = factory;
        };
        __egretProto__.getDelegate = function () {
            return this._nodeOption.delegate;
        };
        __egretProto__.setDelegate = function (delegate) {
            this._nodeOption.delegate = delegate;
        };
        __egretProto__.removeFromParent = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
            var parent = self.getParent();
            if (parent)
                parent.removeChild(self);
        };
        //removeSelf():void{
        //    var self:any = this;
        //    if(self._hasDtored){
        //        mo.warn("【%s】【%s】已经被释放掉了！", self.__className, self._hashCode);
        //        return;
        //    }
        //    self.removeFromParent();
        //}
        __egretProto__.addShader = function (shader) {
            //todo
            mo.warn("addShader木有实现");
        };
        __egretProto__.removeShader = function () {
            //todo
            mo.warn("removeShader木有实现");
        };
        __egretProto__.canBeReclaimed = function () {
            return this._nodeOption.canBeReclaimed;
        };
        __egretProto__.reset = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this._nodeOption.reset();
            this._touchOption.reset();
        };
        Object.defineProperty(__egretProto__, "isAutoDtor", {
            get: function () {
                return this._nodeOption.isAutoDtor;
            },
            set: function (isAutoDtor) {
                if (this._nodeOption) {
                    this._nodeOption.isAutoDtor = isAutoDtor;
                }
            },
            enumerable: true,
            configurable: true
        });
        Node.__className = "Node";
        Node.NODE_OPTION_CLASS = mo._NodeOption;
        Node.TOUCH_OPTION_CLASS = mo._TouchOption;
        Node.CLICK_NODE = "clickNode";
        Node.NODE_TOUCH_BEGIN = "nodeTouchBegin";
        Node.REMOVE_FROM_PARENT = "removeFromParent";
        return Node;
    })(egret.DisplayObjectContainer);
    mo.Node = Node;
    Node.prototype.__class__ = "mo.Node";
})(mo || (mo = {}));
