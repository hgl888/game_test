var mo;
(function (mo) {
    var UILayer = (function (_super) {
        __extends(UILayer, _super);
        function UILayer(jsonPath) {
            if (jsonPath)
                this._jsonPath = jsonPath;
            _super.call(this);
        }
        var __egretProto__ = UILayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._showWithAction = false;
        };
        //@override
        __egretProto__._init = function () {
            var self = this;
            this.initRootWidget(self._jsonPath);
        };
        __egretProto__.initRootWidget = function (uiData) {
            var self = this;
            if (!uiData)
                return false;
            self._setRootWidget(mo.uiReader.genWidget(uiData));
            return true;
        };
        __egretProto__._setRootWidget = function (rootWidget) {
            var self = this;
            if (self._rootWidget)
                self.removeChild(self._rootWidget); //如果已经存在了，就先进行移除操作
            self._rootWidget = rootWidget;
            self.addChild(rootWidget);
            self.setLayoutAdaptive(rootWidget, true);
            rootWidget.updateSizeByPercentForChildren();
            rootWidget.doLayout();
        };
        Object.defineProperty(__egretProto__, "rootWidget", {
            get: function () {
                return this._rootWidget;
            },
            set: function (rootWidget) {
                this._setRootWidget(rootWidget);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.addWidget = function (widget) {
            var self = this;
            if (self._rootWidget == null) {
                mo.warn("请先初始化rootWidget之后，方可进行UILayer#addWidget操作！");
            }
            else {
                self._rootWidget.addChild(widget);
            }
        };
        //该layer对应的托盘对象
        __egretProto__._getTray = function () {
            return null;
        };
        Object.defineProperty(__egretProto__, "tray", {
            get: function () {
                return this._getTray();
            },
            enumerable: true,
            configurable: true
        });
        //@override
        __egretProto__.show = function () {
            var self = this;
            var tray = this._getTray();
            if (tray)
                tray.add(this);
            else
                mo.getStage().addChild(this); //如果没有托盘，则使用stage作为托盘
            self.x = self.width * self.anchorX;
            self.y = self.height * self.anchorY;
            this._doShow();
        };
        __egretProto__.getWidgetByName = function (name) {
            var rootWidget = this._rootWidget;
            if (rootWidget.name == name)
                return rootWidget;
            if (!rootWidget)
                return null;
            return rootWidget.getWidgetByName(name);
        };
        //++++++++++++++GridView 开始++++++++++++++++++++
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
            panel.bgOpacity = 0;
            var viewSize = panel.getSize();
            var cell = cellClass.create();
            var cellSize = cell.getSize();
            cell.doDtor();
            if (autoCellWidth) {
                cols = Math.floor(viewSize.width / cellSize.width);
                cellSize = mo.size(viewSize.width / cols, cellSize.height);
            }
            var gridScrollView = self._gridScrollView = mo.GridScrollView.create(viewSize, cellSize, cols, 0, onCellDataSource, self, cellClass);
            panel.addChild(gridScrollView);
            return gridScrollView;
        };
        __egretProto__._createGridView = function (panelName, cellClass, cols, onCellDataSource, autoCellWidth) {
            var self = this;
            var panel = self.getWidgetByName(panelName);
            panel.bgOpacity = 0;
            var viewSize = panel.getSize();
            var cell = cellClass.create();
            var cellSize = cell.getSize();
            if (autoCellWidth) {
                cellSize = mo.size(viewSize.width / cols, cellSize.height);
            }
            var gridView = self._gridView = mo.GridView.create(cellSize, cols, 0, onCellDataSource, self, cellClass);
            panel.addChild(gridView);
            return gridView;
        };
        //++++++++++++++GridView 结束++++++++++++++++++++
        /** ************************************************************************/
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
                mo.warn(logCode.c_104, name);
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
        UILayer.__className = "UILayer";
        return UILayer;
    })(mo.Layer);
    mo.UILayer = UILayer;
    UILayer.prototype.__class__ = "mo.UILayer";
})(mo || (mo = {}));
