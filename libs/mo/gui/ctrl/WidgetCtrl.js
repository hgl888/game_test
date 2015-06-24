var mo;
(function (mo) {
    var WidgetCtrl = (function (_super) {
        __extends(WidgetCtrl, _super);
        function WidgetCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = WidgetCtrl.prototype;
        __egretProto__._setWidget = function (widget) {
            var self = this;
            var E = egret.Event;
            var oldWidget = self._widget;
            if (oldWidget) {
                oldWidget.controller = null; //强制赋值
                self._removeClickEvent();
                oldWidget.removeEventListener(E.ADDED_TO_STAGE, self.onEnter, self);
                oldWidget.removeEventListener(E.REMOVED_FROM_STAGE, self.onExit, self);
                oldWidget.removeEventListener("dtor", self.dtor, self);
                oldWidget.isAutoDtor = true; //统一转移给ctrl管理
            }
            self._widget = widget;
            if (!widget)
                return;
            widget.controller = self; //强制赋值
            self._initClickEvent();
            widget.addEventListener(E.ADDED_TO_STAGE, self.onEnter, self);
            widget.addEventListener(E.REMOVED_FROM_STAGE, self.onExit, self);
            //由于getInstance会在设置_isInstance之前就调用了该方法，所以要延迟到下一帧执行
            process.nextTick(function () {
                if (self._isInstance) {
                    widget.isAutoDtor = false;
                }
                if (!self._isInstance) {
                    widget.addEventListener("dtor", self.dtor, self);
                }
            });
        };
        Object.defineProperty(__egretProto__, "widget", {
            get: function () {
                return this._widget;
            },
            set: function (widget) {
                this._setWidget(widget);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isAutoDtor", {
            get: function () {
                return this.widget.isAutoDtor;
            },
            set: function (isAutoDtor) {
                var widget = this.widget;
                if (widget) {
                    widget.isAutoDtor = isAutoDtor;
                }
            },
            enumerable: true,
            configurable: true
        });
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        __egretProto__.resetByData = function (data) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            mo.warn(logCode.c_103);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            var eventStoreForClass = self._eventStoreForClass;
            if (eventStoreForClass) {
                var l = eventStoreForClass.length;
                for (var i = l - 1; i >= 0; --i) {
                    var info = eventStoreForClass[i];
                    info[0].unregisterByKey(info[1], info[2], self);
                }
                eventStoreForClass.length = 0;
            }
            self._setWidget(null);
        };
        __egretProto__.registerClassByKey = function (clazz, key, listener) {
            mo.registerClassByKey(this, clazz, key, listener);
        };
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
            if (self._jsonPath) {
                var widget = mo.uiReader.genWidget(self._jsonPath);
                self.widget = widget;
                self.setClickEnabled(false);
            }
        };
        __egretProto__.onEnter = function () {
            // do nothing
        };
        __egretProto__.onExit = function () {
        };
        __egretProto__.setClickEnabled = function (enabled) {
            var self = this;
            if (self._clickWidgetName) {
                self.setTouchEnabledByName(self._clickWidgetName, enabled);
            }
        };
        __egretProto__._initClickEvent = function () {
            var self = this;
            if (self._clickWidgetName) {
                self.widget.onClickByName(self._clickWidgetName, function (sender) {
                    if (self._clickFunc) {
                        mo.dispatchEvent([
                            [mo.widgetCtrlClickDispatcher, self.__className],
                        ], self._doClick, self, sender);
                    }
                }, self);
            }
        };
        __egretProto__._removeClickEvent = function () {
            var self = this;
            if (self._clickWidgetName) {
                self.widget.onClickByName(self._clickWidgetName, null, null);
            }
        };
        /**
         * 创建gridScrollView方法。不需要设置viewSize和cellSize。
         * @param panelName
         * @param cellClass
         * @param cols
         * @param onCellDataSource
         * @param autoCellWidth
         * @returns {mo.GridScrollView}
         * @private
         */
        __egretProto__._createGridScrollView = function (panelName, cellClass, cols, onCellDataSource, autoCellWidth) {
            var self = this;
            var panel = self.getWidgetByName(panelName);
            var viewSize = panel.getSize();
            var cell = cellClass.create();
            var cellSize = cell.getSize();
            cell.doDtor();
            if (autoCellWidth) {
                cellSize = mo.size(viewSize.width / cols, cellSize.height);
            }
            var gridScrollView = self._gridScrollView = mo.GridScrollView.create(viewSize, cellSize, cols, 0, onCellDataSource, self, cellClass);
            panel.addChild(gridScrollView);
            return gridScrollView;
        };
        __egretProto__.attachWidgetTo = function (parent, zorder, tag) {
            if (zorder === void 0) { zorder = 0; }
            var self = this;
            self.detachWidget();
            self.widget.zOrder = zorder;
            parent.addChild(self.widget);
        };
        __egretProto__.detachWidget = function () {
            if (this.widget)
                this.widget.removeFromParent();
        };
        __egretProto__.setLayoutAdaptive = function (widget, isAdaptiveChildren) {
            if (!widget)
                return;
            var oldWidth = widget.getSize().width;
            var oldHeight = widget.getSize().height;
            widget.setSize(mo.visibleRect.getSize());
            var newWidth = widget.getSize().width;
            var newHeight = widget.getSize().height;
            if (widget.getChildrenCount() > 0 && isAdaptiveChildren) {
                var children = widget.getChildren(), tmpChild;
                for (var i = 0; i < children.length; i++) {
                    tmpChild = children[i];
                    if (tmpChild instanceof mo.UIPanel) {
                        if (tmpChild.getSize().width == oldWidth) {
                            tmpChild.setSize(mo.size(newWidth, tmpChild.getSize().height));
                        }
                        else if (tmpChild.getSize().height == oldHeight) {
                            tmpChild.setSize(mo.size(tmpChild.getSize().width, newHeight));
                        }
                    }
                }
            }
        };
        __egretProto__._doClick = function (sender) {
            var self = this;
            self._clickFunc.call(self._clickTarget, self, sender, self._clickData);
        };
        __egretProto__.onClick = function (selector, target, data) {
            this._clickFunc = selector;
            this._clickTarget = target;
            this._clickData = data;
        };
        __egretProto__.getWidgetByName = function (name) {
            if (this.widget.name == name)
                return this.widget;
            return this.widget.getWidgetByName(name);
        };
        //@impl IWidgetByNameApi begin
        __egretProto__.getPositionByName = function (name) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                return widget.getPosition.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
            return null;
        };
        __egretProto__.setPositionByName = function (name, x, y) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.setPosition.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        __egretProto__.setPositionOffsetByName = function (name, x, y) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.setPositionOffset.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        __egretProto__.setScaleByName = function (name, scaleX, scaleY) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.setScale.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 缩放适配屏幕
         * @param widgetName
         * @param mode
         */
        __egretProto__.setAdaptiveScaleByName = function (widgetName, mode) {
            var widget = this.getWidgetByName(widgetName);
            if (widget) {
                var parentSize = widget.getParent().getSize();
                var widgetSize = widget.getSize(), scaleX, scaleY, scaleValue;
                scaleX = parentSize.width / widgetSize.width;
                scaleY = parentSize.height / widgetSize.height;
                switch (mode) {
                    case mo.RESOLUTION_POLICY.EXACT_FIT:
                        widget.setScaleX(scaleX);
                        widget.setScaleY(scaleY);
                        break;
                    case mo.RESOLUTION_POLICY.NO_BORDER:
                        scaleValue = Math.max(scaleX, scaleY);
                        widget.setScale(scaleValue);
                        break;
                    case mo.RESOLUTION_POLICY.SHOW_ALL:
                        scaleValue = Math.min(scaleX, scaleY);
                        widget.setScale(scaleValue);
                        break;
                    case mo.RESOLUTION_POLICY.FIXED_HEIGHT:
                        widget.setScaleY(scaleY);
                        break;
                    case mo.RESOLUTION_POLICY.FIXED_WIDTH:
                        widget.setScaleX(scaleX);
                        break;
                    default:
                        break;
                }
            }
            else {
                mo.warn(logCode.c_104, widgetName);
            }
        };
        __egretProto__.setSizeByName = function (name, width, height) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.setSize.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        __egretProto__.getSizeByName = function (name) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                return widget.getSize.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
            return null;
        };
        __egretProto__.setVisibleByName = function (name, visible) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.setVisible.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        __egretProto__.setGrayByName = function (name, isGray) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                if (widget.setGray)
                    widget.setGray.apply(widget, args);
                else
                    mo.warn("缺失api【%s#setGray】", this.__className);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        __egretProto__.transColorByName = function (name, colorType) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.transColor.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        __egretProto__.setButtonImgByName = function (name, frameName) {
            var self = this;
            var widget = self.getWidgetByName(name);
            if (widget) {
                widget.setButtonImg(frameName);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 通过名字为Widget设置信息。
         * @param name
         * @param option
         */
        __egretProto__.setInfoByName = function (name, option) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.setOption.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        __egretProto__.setInfo = function (info) {
        };
        /**
         * 通过名字设置widget颜色, widget通常是个Label。
         * @param name
         * @param color
         */
        __egretProto__.setColorByName = function (name, color) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.setColor.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 通过名字设置Widget是否可点击
         * @param name
         * @param touchEnabled
         */
        __egretProto__.setTouchEnabledByName = function (name, touchEnabled) {
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.touchEnabled = touchEnabled;
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 通过名称设置click监听
         * @param name
         * @param listener
         * @param target
         * @param data
         * @param audioId
         */
        __egretProto__.onClickByName = function (name, listener, target, data, audioId) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                if (target == null)
                    args.push(this);
                widget.onClick.apply(widget, args);
                widget.soundOnClick(audioId);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 通过名称设置longTouch监听
         * @param name
         * @param listener
         * @param target
         */
        __egretProto__.onLongTouchByName = function (name, listener, target, respInterval, startInterVal) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.onLongTouch.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 打开长按事件的支持
         * @param name
         * @param listener
         * @param target
         * @param respInterval
         * @param startInterVal
         */
        __egretProto__.enableLongTouchByName = function (name, respInterval, startInterVal) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.enableLongTouch.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 添加一个子节点。子节点可以是一个widget也可以是一个普通的node。在内部进行自动判断了。
         * @param name
         * @param child
         * @param tag
         */
        __egretProto__.addChildNodeByName = function (name, child, tag) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.addChild.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 根据名字设置其是否可见。与visible不同的是，会同时设置是否可点击。
         * @param name
         * @param disappeared
         */
        __egretProto__.setDisappearedByName = function (name, disappeared) {
            this.setVisibleByName(name, !disappeared);
            this.setTouchEnabledByName(name, !disappeared);
        };
        __egretProto__.setMaskEnabledByName = function (name, enable) {
            var self = this;
            var img = self.getWidgetByName(name);
            if (img instanceof mo.UIImage) {
                img.setMaskEnabled(enable);
            }
            else {
                mo.warn("[%s] is not a ccs.ImageView", name);
            }
        };
        __egretProto__.loadMaskTextureByName = function (name, textFileName) {
            var self = this;
            var img = self.getWidgetByName(name);
            if (img instanceof mo.UIImage) {
                var args = Array.prototype.slice.apply(arguments, [1]);
                img.loadMaskTexture.apply(img, args);
            }
            else {
                mo.warn("[%s] is not a ccs.ImageView", name);
            }
        };
        __egretProto__.formatByName = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var self = this;
            var widget = self.getWidgetByName(name);
            if (widget) {
                widget.format.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        __egretProto__.doLayoutByName = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var self = this;
            var widget = self.getWidgetByName(name);
            if (widget) {
                widget.doLayout.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        __egretProto__.setLayoutDirtyByName = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.setLayoutDirty.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 根据widget的名称设置描边。
         * @param name
         * @param strokeColor
         * @param strokeSize
         * @returns {*}
         */
        __egretProto__.enableStrokeByName = function (name, strokeColor, strokeSize) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.enableStroke.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 根据widget名字禁用描边。
         * @param name
         * @returns {*}
         */
        __egretProto__.disableStrokeByName = function (name) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.disableStroke.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 根据widget名字设置计时器。
         * 其中，widget必须为Label类型（有setText方法）。
         * 每次调用该方法，都为将起始时间设置为00:00。
         * @param name
         * @param {Function|null} cb  每秒的触发回调，可以不设置。参数为：millisecond(每次间隔的毫秒数，约等于1秒)； widget
         * @param {Function|null} target 回调函数的上下文，可以不设置
         * @returns {*}
         */
        __egretProto__.setIntervalByName = function (name, cb, target) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            var inv;
            if (widget) {
                inv = widget.setInterval.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
            return inv;
        };
        /**
         * 设置倒计时类型触发器。
         * 当参数个数为四个时，表示：name, millisecond, endCallback, endTarget。
         * @param {String} name widget的名称
         * @param {Number} millisecond   倒计时的毫秒数
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        __egretProto__.countdownByName = function (name, millisecond, callback, target, endCallback, endTarget) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            var inv;
            if (widget) {
                inv = widget.countdown.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
            return inv;
        };
        /**
         * 倒计时到某个时间点的触发器。
         * 当参数个数为四个时，表示：name, millisecond, endCallback, endTarget。
         * @param {String} name widget的名称
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} endCallback   倒计时结束的回调
         * @param {Object|null} endTarget       倒计时结束的回调函数的上下文
         * @returns {CountdownInvocation}
         */
        __egretProto__.countdownToEndTimeByName = function (name, endTime, callback, target, endCallback, endTarget) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            var inv;
            if (widget) {
                inv = widget.countdownToEndTime.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
            return inv;
        };
        /**
         * 循环方式的倒数计时。自动根据结束时间点算出循环次数。
         * @param {String} name widget的名称
         * @param {Date|Number} endTime 结束的时间点。如果是Number类型，则表示时间戳。
         * @param {Number} interval  每次循环的时间间隔
         * @param {Function|null} callback   每秒的回调
         * @param {Object|null} target       每秒的回调函数的上下文
         * @param {Function|null} intervalCallback  每次循环结束的回调
         * @param {Object|null} intervalTarget  每次循环结束的回调函数的上下文
         * @param {Function|null} endCallback   总倒计时结束的回调
         * @param {Object|null} endTarget   总倒计时结束的回调函数的上下文
         * @returns {LoopCountdownToEndTimeInvocation}
         */
        __egretProto__.countdownLoopToEndTimeByName = function (name, endTime, interval, callback, target, intervalCallback, intervalTarget, endCallback, endTarget) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            var inv;
            if (widget) {
                inv = widget.countdownLoopToEndTime.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
            return inv;
        };
        /**
         * 设置线性布局（水平）。
         * @param name
         * @param spacing   间距
         * @returns {*}
         */
        __egretProto__.setLinearLayoutByName = function (name, spacing, align) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.setLinearLayout.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 长按name1的widget显示name2的widget。
         * @param name1
         * @param name2
         * @returns {*}
         */
        __egretProto__.setTouchToShowByName = function (name1, name2) {
            var self = this;
            var widget1 = self.getWidgetByName(name1);
            if (!widget1)
                return mo.warn(logCode.c_104, name1);
            var widget2 = self.getWidgetByName(name2);
            if (widget2) {
                widget2.setVisible(false);
                var TE = mo.TouchEvent;
                widget1.removeEventListener(TE.NODE_BEGIN, self._onBegin4TouchToShowByName, widget1);
                widget1.removeEventListener(TE.NODE_END, self._onEnd4TouchToShowByName, widget1);
                widget1["_targetNodeWhenTouchToShow"] = widget2;
                widget1.addEventListener(TE.NODE_BEGIN, self._onBegin4TouchToShowByName, widget1);
                widget1.addEventListener(TE.NODE_END, self._onEnd4TouchToShowByName, widget1);
            }
            else {
                mo.warn(logCode.c_104, name2);
            }
        };
        __egretProto__._onBegin4TouchToShowByName = function () {
            this["_targetNodeWhenTouchToShow"].visible = true;
        };
        __egretProto__._onEnd4TouchToShowByName = function () {
            this["_targetNodeWhenTouchToShow"].visible = false;
        };
        /**
         * 底数，例如： [100,200,300]
         * @param {Array} arr
         */
        __egretProto__.setProgressQueueBaseNumberByName = function (name, arr) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.setProgressQueueBaseNumber.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**\
         * 单次增加多少
         * @param name
         * @param value
         * @param cb
         * @param ctx
         * @returns {*}
         */
        __egretProto__.runProgressQueueByName = function (name, value, cb, ctx) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.runProgressQueue.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 通过名称获得widget并执行动作。
         * @param name
         * @param action
         */
        __egretProto__.runActionByName = function (name, action) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.runAction.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 添加事件监听
         * @param name widget名
         * @param eventName 事件名
         * @param cb
         * @param cbtx
         */
        __egretProto__.addEventListenerByName = function (name, eventName, cb, cbtx) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.addEventListener.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        /**
         * 移除事件监听
         * @param name
         * @param eventName
         * @param cb
         * @param cbtx
         */
        __egretProto__.removeEventListenerByName = function (name, eventName, cb, cbtx) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            var widget = this.getWidgetByName(name);
            if (widget) {
                widget.removeEventListener.apply(widget, args);
            }
            else {
                mo.warn(logCode.c_104, name);
            }
        };
        WidgetCtrl.__className = "WidgetCtrl";
        return WidgetCtrl;
    })(mo.Class);
    mo.WidgetCtrl = WidgetCtrl;
    WidgetCtrl.prototype.__class__ = "mo.WidgetCtrl";
})(mo || (mo = {}));
