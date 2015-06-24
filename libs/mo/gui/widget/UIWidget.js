/**
 * bright style
 * @type {Object}
 */
var mo;
(function (mo) {
    var BrightStyle;
    (function (BrightStyle) {
        BrightStyle.none = -1;
        BrightStyle.normal = 0;
        BrightStyle.high_light = 1;
    })(BrightStyle = mo.BrightStyle || (mo.BrightStyle = {}));
})(mo || (mo = {}));
/**
 * widget style
 * @type {Object}
 */
var mo;
(function (mo) {
    var WidgetType;
    (function (WidgetType) {
        WidgetType.widget = 0;
        WidgetType.container = 1;
    })(WidgetType = mo.WidgetType || (mo.WidgetType = {}));
})(mo || (mo = {}));
/**
 * texture resource type
 * @type {Object}
 */
var mo;
(function (mo) {
    var TextureResType;
    (function (TextureResType) {
        TextureResType.local = 0;
        TextureResType.plist = 1;
    })(TextureResType = mo.TextureResType || (mo.TextureResType = {}));
})(mo || (mo = {}));
/**
 * touch event type
 * @type {Object}
 */
var mo;
(function (mo) {
    var TouchEventType;
    (function (TouchEventType) {
        TouchEventType.began = 0;
        TouchEventType.moved = 1;
        TouchEventType.ended = 2;
        TouchEventType.canceled = 3;
        TouchEventType.lbegan = 4;
    })(TouchEventType = mo.TouchEventType || (mo.TouchEventType = {}));
})(mo || (mo = {}));
/**
 * size type
 * @type {Object}
 */
var mo;
(function (mo) {
    var SizeType;
    (function (SizeType) {
        SizeType.absolute = 0;
        SizeType.percent = 1;
    })(SizeType = mo.SizeType || (mo.SizeType = {}));
})(mo || (mo = {}));
/**
 * position type
 * @type {Object}
 */
var mo;
(function (mo) {
    var PositionType;
    (function (PositionType) {
        PositionType.absolute = 0;
        PositionType.percent = 1;
    })(PositionType = mo.PositionType || (mo.PositionType = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    /**
     * Widget的基类
     * @class
     * @extends Node
     */
    var UIWidget = (function (_super) {
        __extends(UIWidget, _super);
        function UIWidget() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIWidget.prototype;
        __egretProto__._setSizePercentX = function (sizePercentX) {
            var self = this, nodeOption = self._nodeOption;
            var sizePercent = nodeOption.sizePercent;
            sizePercent._setX(sizePercentX);
            if (sizePercent._xDirty) {
                self._dirty = true;
                var parent = self._parent;
                if (parent && nodeOption.sizeType == mo.SizeType.percent) {
                    self._setWidth(parent.width * sizePercentX);
                }
            }
        };
        Object.defineProperty(__egretProto__, "sizePercentX", {
            get: function () {
                return this._nodeOption.sizePercent.x;
            },
            set: function (sizePercentX) {
                this._setSizePercentX(sizePercentX);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setSizePercentY = function (sizePercentY) {
            var self = this, nodeOption = self._nodeOption;
            var sizePercent = nodeOption.sizePercent;
            sizePercent._setY(sizePercentY);
            if (sizePercent._yDirty) {
                self._dirty = true;
                var parent = self._parent;
                if (parent && nodeOption.sizeType == mo.SizeType.percent) {
                    self._setHeight(parent.height * sizePercentY);
                }
            }
        };
        Object.defineProperty(__egretProto__, "sizePercentY", {
            get: function () {
                return this._nodeOption.sizePercent.y;
            },
            set: function (sizePercentY) {
                this._setSizePercentY(sizePercentY);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.setSizePercent = function (percentX, percentY) {
            var self = this;
            if (arguments.length == 1) {
                percentY = percentX._y;
                percentX = percentX._x;
            }
            self._setSizePercentX(percentX);
            self._setSizePercentY(percentY);
            var widgetParent = self.getWidgetParent();
            if (widgetParent) {
                self._setWidth(widgetParent.width * percentX);
                self._setWidth(widgetParent.height * percentY);
            }
        };
        __egretProto__.getSizePercent = function (temp) {
            return this._nodeOption.sizePercent.clone(temp);
        };
        __egretProto__._updateSizeByPercent = function () {
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.sizeType == mo.SizeType.percent) {
                var parent = self.parent;
                if (parent) {
                    var sizePercent = nodeOption.sizePercent;
                    self._setWidth(parent.width * sizePercent._x);
                    self._setHeight(parent.height * sizePercent._y);
                }
            }
        };
        __egretProto__._setPosPercentX = function (posPercentX) {
            var self = this, nodeOption = self._nodeOption;
            var posPercent = nodeOption.posPercent;
            posPercent._setX(posPercentX);
            if (nodeOption.positionType == mo.PositionType.percent && posPercent._xDirty) {
                self._dirty = true;
            }
        };
        Object.defineProperty(__egretProto__, "posPercentX", {
            get: function () {
                return this._nodeOption.posPercent._x;
            },
            set: function (posPercentX) {
                this._setPosPercentX(posPercentX);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setPosPercentY = function (posPercentY) {
            var self = this, nodeOption = self._nodeOption;
            var posPercent = nodeOption.posPercent;
            posPercent._setY(posPercentY);
            if (nodeOption.positionType == mo.PositionType.percent && posPercent._yDirty) {
                self._dirty = true;
            }
        };
        Object.defineProperty(__egretProto__, "posPercentY", {
            get: function () {
                return this._nodeOption.posPercent._y;
            },
            set: function (posPercentY) {
                this._setPosPercentY(posPercentY);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._updatePosByPercent = function () {
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.positionType == mo.PositionType.percent) {
                var parent = self.parent;
                if (parent) {
                    var posPercent = nodeOption.posPercent;
                    self._setX(parent.width * posPercent._x);
                    self._setY(parent.height * posPercent._y);
                }
            }
        };
        __egretProto__.setPositionPercent = function (percentX, percentY) {
            var self = this;
            if (arguments.length == 1) {
                percentY = percentX._y;
                percentX = percentX._x;
            }
            self._setPosPercentX(percentX);
            self._setPosPercentY(percentY);
            var widgetParent = this.getWidgetParent();
            if (widgetParent) {
                self._setX(widgetParent.width * percentX);
                self._setY(widgetParent.height * percentX);
            }
        };
        __egretProto__.getPositionPercent = function (temp) {
            return this._nodeOption.posPercent.clone(temp);
        };
        //@override
        __egretProto__.setPosition = function (pos, posY) {
            var self = this;
            var parent = self.getWidgetParent();
            if (parent) {
                var w = parent.width, h = parent.height;
                var x = 0, y = 0;
                if (w > 0 && h > 0) {
                    if (posY !== undefined) {
                        x = pos / w;
                        y = posY / h;
                    }
                    else {
                        x = pos.x / w;
                        y = pos.y / h;
                    }
                }
                self._setPosPercentX(x);
                self._setPosPercentY(y);
            }
            _super.prototype.setPosition.apply(self, arguments);
        };
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.name = "default";
            self._dirty = true;
            self.anchorX = 0.5;
            self.anchorY = 0.5;
            self.width = 0;
            self.height = 0;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            this.initRenderer();
            this.setBright(true);
            this.ignoreContentAdaptWithSize(true);
        };
        /**
         * 初始化渲染
         */
        __egretProto__.initRenderer = function () {
            //override me, come on baby
        };
        __egretProto__.soundOnClick = function (clickAudioId) {
            if (clickAudioId == null)
                return;
            this._nodeOption.clickAudioId = clickAudioId;
        };
        __egretProto__._playDefaultSoundOnClick = function () {
            var audioId = this._nodeOption.getClickAudioId();
            if (audioId != null && mo.playUIAudio && this._nodeOption.clickCb) {
                mo.playUIAudio(audioId);
            }
        };
        __egretProto__.setOption = function (option) {
            if (option == null)
                return option;
            option = (typeof option == "string" || typeof option == "number") ? { value: option } : option;
            var self = this;
            if (option.visible != null)
                self.setVisible(option.visible);
            if (option.touchEnabled != null)
                self.touchEnabled = (option.touchEnabled);
            if (option.isGray != null) {
                self.setGray(option.isGray);
            }
            return option;
        };
        __egretProto__._doAddChild = function (widget, index, notifyListeners) {
            if (notifyListeners === void 0) { notifyListeners = true; }
            var self = this;
            if (!widget || widget == self)
                return widget; //如果不存在或者添加了自己
            var widget2 = widget;
            var nodeOption = self._nodeOption;
            if (widget2 instanceof UIWidget) {
                nodeOption.widgetChildren.push(widget2);
            }
            else {
                nodeOption.nodes.push(widget2);
            }
            if (widget2.sizeType == mo.SizeType.percent) {
                widget2._updateSizeByPercent();
                widget2.updateSizeByPercentForChildren(); //改变子节点百分比大小
            }
            _super.prototype._doAddChild.call(this, widget2, index, notifyListeners);
            return widget2;
        };
        __egretProto__._doRemoveChild = function (index, notifyListeners) {
            if (notifyListeners === void 0) { notifyListeners = true; }
            var nodeOption = this._nodeOption;
            var child = _super.prototype._doRemoveChild.call(this, index, notifyListeners);
            if (child) {
                var arr = child instanceof UIWidget ? nodeOption.widgetChildren : nodeOption.nodes;
                for (var i = arr.length - 1; i >= 0; i--) {
                    if (arr[i] == child) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            }
            return child;
        };
        __egretProto__.updateSizeByPercentForChildren = function () {
            var self = this;
            if (self._nodeOption.nodeSizeDirty) {
                var child;
                var children = self._children;
                for (var i = 0, l_i = children.length; i < l_i; i++) {
                    child = children[i];
                    if (child._sizeType == mo.SizeType.percent) {
                        child._updateSizeByPercent(); //改变自身大小
                        child.updateSizeByPercentForChildren(); //改变子节点百分比大小
                    }
                }
            }
        };
        __egretProto__.getWidgetParent = function () {
            var widget = this.getParent();
            if (widget instanceof UIWidget) {
                return widget;
            }
            return null;
        };
        __egretProto__._onNodeSizeDirty = function () {
            var children = this._children;
            for (var i = 0, l_i = children.length; i < l_i; i++) {
                var child = children[i];
                var cNodeOption = child._nodeOption;
                if (cNodeOption && cNodeOption.positionType == mo.PositionType.percent) {
                    var posPercent = cNodeOption.posPercent;
                    posPercent._setDirty(true);
                    child._dirty = true;
                }
            }
        };
        //@override
        __egretProto__._onBeforeVisit = function () {
            _super.prototype._onBeforeVisit.call(this);
            var self = this;
            var parent = self._parent;
            var nodeOption = self._nodeOption;
            var pNodeOption = parent._nodeOption;
            var pLayoutType = pNodeOption ? pNodeOption.layoutType : null;
            if (pLayoutType == null || pLayoutType == mo.LayoutType.absolute) {
                if (nodeOption.posPercent._dirty || (nodeOption.positionType == mo.PositionType.percent && parent._nodeOption.nodeSizeDirty)) {
                    self._updatePosByPercent();
                }
            }
        };
        //@override
        __egretProto__._onAfterVisit = function () {
            _super.prototype._onAfterVisit.call(this);
            var self = this;
            var nodeOption = self._nodeOption;
            nodeOption.sizePercent._setDirty(false);
            nodeOption.posPercent._setDirty(false);
        };
        __egretProto__.setSizeType = function (type) {
            this._nodeOption.sizeType = type;
        };
        __egretProto__.getSizeType = function () {
            return this._nodeOption.sizeType;
        };
        Object.defineProperty(__egretProto__, "sizeType", {
            get: function () {
                return this._nodeOption.sizeType;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.ignoreContentAdaptWithSize = function (ignore) {
            this._nodeOption.ignoreSize = ignore;
        };
        __egretProto__.isIgnoreContentAdaptWithSize = function () {
            return this._nodeOption.ignoreSize;
        };
        __egretProto__.isFocused = function () {
            return this._nodeOption.focus;
        };
        __egretProto__.setFocused = function (focus) {
            var self = this, nodeOption = self._nodeOption;
            if (focus == nodeOption.focus) {
                return;
            }
            nodeOption.focus = focus;
            if (nodeOption.bright) {
                if (focus) {
                    self.setBrightStyle(mo.BrightStyle.high_light);
                }
                else {
                    self.setBrightStyle(mo.BrightStyle.normal);
                }
            }
            else {
                self._onPressStateChanged(2);
            }
        };
        __egretProto__.setBright = function (bright) {
            var self = this, nodeOption = self._nodeOption;
            nodeOption.bright = bright;
            if (bright) {
                nodeOption.brightStyle = mo.BrightStyle.none;
                self.setBrightStyle(mo.BrightStyle.normal);
            }
            else {
                self._onPressStateChanged(2);
            }
        };
        __egretProto__.setBrightStyle = function (style) {
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.brightStyle == style) {
                return;
            }
            style = style || mo.BrightStyle.normal;
            nodeOption.brightStyle = style;
            switch (style) {
                case mo.BrightStyle.normal:
                    self._onPressStateChanged(0);
                    break;
                case mo.BrightStyle.high_light:
                    self._onPressStateChanged(1);
                    break;
                default:
                    break;
            }
        };
        /**
         * 0:normal, 1:pressed, 2:disabled
         * @param index
         * @private
         */
        __egretProto__._onPressStateChanged = function (index) {
        };
        //@override
        __egretProto__.onTouchLongClicked = function (event) {
            this.longClickEvent();
        };
        __egretProto__.longClickEvent = function () {
        };
        __egretProto__.setPositionType = function (type) {
            this._nodeOption.positionType = type;
        };
        __egretProto__.getPositionType = function () {
            return this._nodeOption.positionType;
        };
        __egretProto__.setFlippedX = function (flipX) {
            var self = this, nodeOption = self._nodeOption;
            if (flipX == nodeOption.flippedX)
                return;
            nodeOption.flippedX = flipX;
            self.scaleX = (flipX ? -1 : 1) * Math.abs(this.scaleX);
        };
        __egretProto__.isFlippedX = function () {
            return this._nodeOption.flippedX;
        };
        __egretProto__.setFlippedY = function (flipY) {
            var self = this, nodeOption = self._nodeOption;
            if (flipY == nodeOption.flippedY)
                return;
            nodeOption.flippedY = flipY;
            self.scaleY = (flipY ? -1 : 1) * self.scaleY;
        };
        __egretProto__.isFlippedY = function () {
            return this._nodeOption.flippedY;
        };
        __egretProto__.isBright = function () {
            return this._nodeOption.bright;
        };
        __egretProto__.getLeftInParent = function () {
            return this.x - this.anchorX * this.width;
        };
        __egretProto__.getBottomInParent = function () {
            return this.y + (1 - this.anchorY) * this.height;
        };
        __egretProto__.getRightInParent = function () {
            return this.x + (1 - this.anchorX) * this.width;
        };
        __egretProto__.getTopInParent = function () {
            return this.y - this.anchorY * this.height;
        };
        __egretProto__.setLayoutParameter = function (parameter) {
            this._nodeOption.layoutParameterDictionary[parameter.getType()] = parameter;
        };
        __egretProto__.getLayoutParameter = function (type) {
            return this._nodeOption.layoutParameterDictionary[type];
        };
        __egretProto__.setGray = function (isGray) {
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.isGray == isGray)
                return; //不变则直接返回
            nodeOption.isGray = isGray;
            if (isGray) {
                self.colorTransform = ColorTransformUtils.getTransform(ColorTransformType.gray);
            }
            else {
                self.colorTransform = null;
            }
        };
        __egretProto__.transColor = function (colorType) {
            var c = ColorTransformUtils.getTransform(colorType);
            if (!c) {
                return mo.warn("为找到颜色转换类型：【%s】，请检查！", colorType);
            }
            this.colorTransform = c;
        };
        __egretProto__.clone = function () {
            var clonedWidget = new this.__class();
            clonedWidget.copyProps(this);
            clonedWidget.copyClonedWidgetChildren(this);
            return clonedWidget;
        };
        __egretProto__.copyClonedWidgetChildren = function (model) {
            var children = model._nodeOption.widgetChildren;
            for (var i = 0; i < children.length; i++) {
                var locChild = children[i];
                if (locChild instanceof UIWidget) {
                    this.addChild(locChild.clone());
                }
            }
        };
        __egretProto__.copySpecialProps = function (model) {
        };
        __egretProto__.copyProps = function (widget) {
            var self = this, nodeOption = self._nodeOption, wNodeOption = widget._nodeOption;
            self.setVisible(widget.isVisible());
            self.setBright(widget.isBright());
            self._setTouchEnabled(widget.touchEnabled);
            self._setZOrder(widget.zOrder);
            self.setTag(widget.getTag());
            self.setName(widget.getName());
            nodeOption.ignoreSize = wNodeOption.ignoreSize;
            self.copySpecialProps(widget);
            self.setSizeType(widget.getSizeType());
            self.setPositionType(widget.getPositionType());
            self.setPosition(widget.getPosition());
            self.setAnchorPoint(widget.getAnchorPoint());
            self.setScaleX(widget.getScaleX());
            self.setScaleY(widget.getScaleY());
            self.setRotation(widget.getRotation());
            //            this.setRotationX(widget.getRotationX());
            //            this.setRotationY(widget.getRotationY());
            self.setFlippedX(widget.isFlippedX());
            self.setFlippedY(widget.isFlippedY());
            self.setOpacity(widget.getOpacity());
            var wDict = wNodeOption.layoutParameterDictionary;
            for (var key in wDict) {
                var parameter = wDict[key];
                if (parameter)
                    this.setLayoutParameter(parameter.clone());
            }
            this.setSize(widget.getSize());
        };
        __egretProto__._sortWidgetChildrenByPosX = function () {
            this._children.sort(function (w1, w2) {
                return w1.x >= w2.x ? 1 : -1;
            });
        };
        __egretProto__._sortWidgetChildrenByPosY = function () {
            this._children.sort(function (w1, w2) {
                return w1.y >= w2.y ? -1 : 1;
            });
        };
        __egretProto__.removeWidgets = function () {
            var arr = this._nodeOption.widgetChildren;
            for (var i = arr.length; i > 0; i--) {
                this.removeChild(arr.pop());
            }
        };
        __egretProto__.removeNodes = function () {
            var arr = this._nodeOption.nodes;
            for (var i = arr.length - 1; i >= 0; i--) {
                this.removeChild(arr.pop());
            }
        };
        /**
         * 通过widget的名称获取到widget对象。
         * 或则通过层级名字的获取widget对象，例如 aWidget.b.c
         * @param name
         * @returns {*}
         */
        __egretProto__.getWidgetByName = function (name) {
            if (name.indexOf(".") != -1) {
                var nameArr = name.split("."), widget;
                var baseWidget = this._seekWidgetByName(nameArr[0]);
                for (var i = 1; i < nameArr.length; i++) {
                    widget = baseWidget._seekWidgetByName(nameArr[i]);
                    if (widget) {
                        baseWidget = widget;
                    }
                    else {
                        mo.log("%s里找不到:%s", baseWidget.name, nameArr[i]);
                        return null;
                    }
                }
                return widget;
            }
            else {
                return this._seekWidgetByName(name);
            }
        };
        __egretProto__._seekWidgetByName = function (name) {
            var widgets = this._nodeOption.widgetChildren;
            for (var i = 0, li = widgets.length; i < li; ++i) {
                var widget = widgets[i];
                if (widget.name == name)
                    return widget;
            }
            for (var i = 0, li = widgets.length; i < li; ++i) {
                var target = widgets[i]._seekWidgetByName(name);
                if (target)
                    return target;
            }
            return null;
        };
        __egretProto__.onTouchBegan = function (event) {
            this.setFocused(true);
            event.stopPropagation();
        };
        __egretProto__._moving = function () {
            this.setFocused(true);
            _super.prototype._moving.call(this);
        };
        __egretProto__._end = function (event) {
            var self = this, touchOption = self._touchOption;
            self.setFocused(false);
            if (touchOption.isIn && touchOption.canTap) {
                //因为super里面需要对clickedThisTick做判断，所以不能将其赋值为true，而是要在最终点击时才赋值
                if (!touchOption.clickedThisTick)
                    self._playDefaultSoundOnClick();
                _super.prototype._end.call(this, event);
            }
        };
        __egretProto__.setPositionOffset = function (pos) {
            var curPos = this.getPosition();
            this.setPosition(curPos.x + pos.x, curPos.y + pos.y);
        };
        __egretProto__.onLongTouch = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this;
        };
        __egretProto__.setSrcPos = function (point, y) {
            var self = this;
            if (y != null) {
                //两个参数
                var x = point;
            }
            else {
                //一个参数时候
                var x = point.x;
                y = point.y;
            }
            var srcRect = self._nodeOption.srcRect;
            srcRect.x = x;
            srcRect.y = y;
        };
        __egretProto__.getSrcPos = function (temp) {
            return mo.p(this._nodeOption.srcRect, temp);
        };
        __egretProto__.setSrcSize = function (size, height) {
            var self = this;
            if (height != null) {
                //两个参数
                var width = size;
            }
            else {
                //一个参数时候
                var width = size.width;
                height = size.height;
            }
            var srcRect = self._nodeOption.srcRect;
            srcRect.width = width;
            srcRect.height = height;
        };
        __egretProto__.getSrcSize = function (temp) {
            var srcRect = this._nodeOption.srcRect;
            return mo.size(srcRect.width, srcRect.height, temp);
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
        UIWidget.__className = "UIWidget";
        UIWidget.NODE_OPTION_CLASS = mo._UIWidgetOption;
        return UIWidget;
    })(mo.Node);
    mo.UIWidget = UIWidget;
    UIWidget.prototype.__class__ = "mo.UIWidget";
})(mo || (mo = {}));
