var mo;
(function (mo) {
    var UIPanel = (function (_super) {
        __extends(UIPanel, _super);
        function UIPanel(width, height) {
            _super.call(this);
            var self = this;
            self._setWidth(width || 0);
            self._setHeight(height || 0);
            self.ignoreContentAdaptWithSize(false);
            self.setBright(true);
            self.setAnchorPoint(0, 0);
        }
        var __egretProto__ = UIPanel.prototype;
        __egretProto__._setClippingEnabled = function (clippingEnabled) {
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.clippingEnabled == clippingEnabled)
                return;
            nodeOption.clippingEnabled = clippingEnabled;
            nodeOption.clippingDirty = true;
            self._dirty = true;
        };
        Object.defineProperty(__egretProto__, "clippingEnabled", {
            get: function () {
                return this._nodeOption.clippingEnabled;
            },
            set: function (clippingEnabled) {
                this._setClippingEnabled(clippingEnabled);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setLayoutType = function (layoutType) {
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.layoutType == layoutType)
                return; //直接返回
            nodeOption.layoutType = layoutType;
            var layoutChildrenArray = self._nodeOption.widgetChildren;
            var locChild = null;
            for (var i = 0; i < layoutChildrenArray.length; i++) {
                locChild = layoutChildrenArray[i];
                self.supplyTheLayoutParameterLackToChild(locChild);
            }
            nodeOption.doLayoutDirty = true;
            self._dirty = true;
        };
        Object.defineProperty(__egretProto__, "layoutType", {
            get: function () {
                return this._nodeOption.layoutType;
            },
            set: function (layoutType) {
                this._setLayoutType(layoutType);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.getLayoutType = function () {
            return this._nodeOption.layoutType;
        };
        __egretProto__.setLayoutType = function (layoutType) {
            this._setLayoutType(layoutType);
        };
        Object.defineProperty(__egretProto__, "bgOpacity", {
            get: function () {
                return this._nodeOption.bgOpacity;
            },
            set: function (bgOpacity) {
                this._nodeOption.bgOpacity = bgOpacity;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "bgColor", {
            get: function () {
                return this._nodeOption.bgColor;
            },
            set: function (color) {
                var self = this, nodeOption = self._nodeOption;
                if (!nodeOption.bgColorDirty && color != nodeOption.bgColor) {
                    nodeOption.bgColorDirty = true;
                    self._dirty = true;
                }
                nodeOption.bgColor = color;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 是否开启九宫格
         */
        __egretProto__._setScale9Enabled = function (scale9Enabled) {
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.scale9Enabled == scale9Enabled)
                return;
            nodeOption.scale9Enabled = scale9Enabled;
        };
        Object.defineProperty(__egretProto__, "scale9Enabled", {
            get: function () {
                return this._nodeOption.scale9Enabled;
            },
            set: function (scale9Enabled) {
                this._setScale9Enabled(scale9Enabled);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * scale9Grid
         */
        __egretProto__._setScale9Grid = function (scale9Grid) {
            this._nodeOption.scale9Grid = scale9Grid;
        };
        Object.defineProperty(__egretProto__, "scale9Grid", {
            get: function () {
                var nodeOption = this._nodeOption;
                return nodeOption.scale9Enabled ? nodeOption.scale9Grid : null;
            },
            set: function (scale9Grid) {
                this._setScale9Grid(scale9Grid);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * fillMode
         */
        __egretProto__._setFillMode = function (fillMode) {
            this._nodeOption.fillMode = fillMode;
        };
        Object.defineProperty(__egretProto__, "fillMode", {
            get: function () {
                return this._nodeOption.fillMode;
            },
            set: function (fillMode) {
                this._setFillMode(fillMode);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "bgTexture", {
            /**
             * 设置背景纹理
             * @param texture
             */
            set: function (texture) {
                var self = this, nodeOption = self._nodeOption;
                if (texture == null) {
                    nodeOption.bgTexture = null;
                    return;
                }
                res.getStatusRes(texture, function (resData) {
                    nodeOption.bgTexture = resData;
                }, self, egret.Texture);
            },
            enumerable: true,
            configurable: true
        });
        //override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._dirty = true;
        };
        __egretProto__.addChild = function (widget) {
            var self = this;
            if (widget instanceof mo.UIWidget)
                self.supplyTheLayoutParameterLackToChild(widget);
            var result = _super.prototype.addChild.call(this, widget);
            self._nodeOption.doLayoutDirty = true;
            self._dirty = true;
            return result;
        };
        __egretProto__.removeChild = function (widget) {
            var result = _super.prototype.removeChild.call(this, widget);
            this._nodeOption.doLayoutDirty = true;
            this._dirty = true;
            return result;
        };
        __egretProto__.removeChildren = function () {
            _super.prototype.removeChildren.call(this);
            this._nodeOption.doLayoutDirty = true;
            this._dirty = true;
        };
        //将自身的布局传递到没有布局参数的child中
        __egretProto__.supplyTheLayoutParameterLackToChild = function (locChild) {
            if (!locChild) {
                return;
            }
            switch (this._nodeOption.layoutType) {
                case mo.LayoutType.absolute:
                    break;
                case mo.LayoutType.linearHorizontal:
                case mo.LayoutType.linearVertical:
                    var layoutParameter = locChild.getLayoutParameter(mo.LayoutParameterType.linear);
                    if (!layoutParameter) {
                        locChild.setLayoutParameter(new mo.LinearLayoutParameter());
                    }
                    break;
                case mo.LayoutType.relative:
                    var layoutParameter = locChild.getLayoutParameter(mo.LayoutParameterType.relative);
                    if (!layoutParameter) {
                        locChild.setLayoutParameter(new mo.RelativeLayoutParameter());
                    }
                    break;
                default:
                    break;
            }
        };
        /**
         * 请求进行layout。其实只是设置了个flag为true而已。
         */
        __egretProto__.setLayoutDirty = function () {
            this._nodeOption.doLayoutDirty = true;
            this._dirty = true;
        };
        /**
         * 是否启用自动大小设置。只有当其为线性布局是才有用。
         */
        __egretProto__._setAutoSizeEnabled = function (autoSizeEnabled) {
            this._nodeOption.autoSizeEnabled = autoSizeEnabled;
        };
        Object.defineProperty(__egretProto__, "autoSizeEnabled", {
            get: function () {
                return this._nodeOption.autoSizeEnabled;
            },
            set: function (autoSizeEnabled) {
                this._setAutoSizeEnabled(autoSizeEnabled);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 进行线性布局。
         */
        __egretProto__._doLayout_linear = function (linearType) {
            if (linearType === void 0) { linearType = 1; }
            var self = this, nodeOption = self._nodeOption;
            var isVertical = linearType == mo.LayoutType.linearVertical;
            //this._sortWidgetChildrenByPosY();
            var layoutChildrenArray = nodeOption.widgetChildren; //TODO 这里需要根据排序权重重新获取children
            var width = self.width, height = self.height;
            var layoutParm = self.getLayoutParameter(mo.LayoutParameterType.linear);
            var padding = layoutParm ? layoutParm.getPadding() : new mo.Padding();
            var sumX = padding.left || 0, sumY = padding.top || 0;
            var autoSizeEnabled = nodeOption.autoSizeEnabled;
            for (var i = 0; i < layoutChildrenArray.length; ++i) {
                var locChild = layoutChildrenArray[i];
                var locLayoutParameter = locChild.getLayoutParameter(mo.LayoutParameterType.linear);
                if (locLayoutParameter) {
                    var locChildGravity = locLayoutParameter.gravity;
                    var lax = locChild.anchorX, lay = locChild.anchorY;
                    var lw = locChild.width * locChild.scaleX, lh = locChild.height * locChild.scaleY;
                    var posType = locChildGravity ? (locChildGravity - 1) % 3 : 0;
                    var xPosType = isVertical ? posType : 0;
                    var yPosType = isVertical ? 0 : posType;
                    var mx = 0, my = 0, locMargin = locLayoutParameter.getMargin(), mxc = 0, myc = 0;
                    if (isVertical) {
                        my = locMargin.top;
                        if (xPosType == 0)
                            mx = locMargin.left;
                        else if (xPosType == 2)
                            mx = -(locMargin.right);
                        else
                            mxc = locMargin.left;
                    }
                    else {
                        mx = locMargin.left;
                        if (yPosType == 0)
                            my = locMargin.top;
                        else if (yPosType == 2)
                            my = -(locMargin.bottom);
                        else
                            myc = locMargin.top;
                    }
                    locChild.x = mo.calLayoutXOrY(width, lw, lax, xPosType) + mx + sumX + mxc;
                    locChild.y = mo.calLayoutXOrY(height, lh, lay, yPosType) + my + sumY + myc;
                    if (isVertical) {
                        sumY += lh + my + locMargin.bottom;
                    }
                    else {
                        sumX += lw + mx + locMargin.right;
                    }
                }
                if (autoSizeEnabled) {
                    if (isVertical) {
                        self._setHeight(sumY + padding.bottom);
                    }
                    else {
                        self._setWidth(sumX + padding.right);
                    }
                }
            }
        };
        /**
         * 进行相对布局
         */
        __egretProto__._doLayout_relative = function () {
            var self = this;
            var layoutChildrenArray = self._nodeOption.widgetChildren;
            var length = layoutChildrenArray.length;
            var width = self.width, height = self.height;
            for (var i = 0; i < length; i++) {
                var locChild = layoutChildrenArray[i];
                var locLayoutParameter = locChild.getLayoutParameter(mo.LayoutParameterType.relative);
                if (locLayoutParameter) {
                    var lax = locChild.anchorX, lay = locChild.anchorY;
                    var locAlign = locLayoutParameter.align;
                    var locFinalPosX = 0;
                    var locFinalPosY = 0;
                    var xPosType = locAlign ? (locAlign - 1) % 3 : 0;
                    var yPosType = locAlign ? Math.floor((locAlign - 1) / 3) : 0;
                    var mw = 0, mh = 0, locMargin = locLayoutParameter.getMargin();
                    if (xPosType == 0)
                        mw = locMargin.left || 0;
                    else if (xPosType == 2)
                        mw = -(locMargin.right || 0);
                    if (yPosType == 0)
                        mh = locMargin.top || 0;
                    else if (yPosType == 2)
                        mh = -(locMargin.bottom || 0);
                    locFinalPosX = mo.calLayoutXOrY(width, locChild.width, lax, xPosType) + mw;
                    locFinalPosY = mo.calLayoutXOrY(height, locChild.height, lay, yPosType) + mh;
                    locChild.setPosition(mo.p(locFinalPosX, locFinalPosY));
                }
            }
        };
        /**
         * 进行布局
         */
        __egretProto__._doLayout = function () {
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.childSrcSizeMap) {
                self._calcTotalSrcSizeChanged();
            }
            switch (nodeOption.layoutType) {
                case mo.LayoutType.absolute:
                    break;
                case mo.LayoutType.linearVertical:
                    self._doLayout_linear(mo.LayoutType.linearVertical);
                    break;
                case mo.LayoutType.linearHorizontal:
                    self._doLayout_linear(mo.LayoutType.linearHorizontal);
                    break;
                case mo.LayoutType.relative:
                    self._doLayout_relative();
                    break;
                default:
                    break;
            }
        };
        __egretProto__.doLayout = function (layoutDirty) {
            if (layoutDirty === void 0) { layoutDirty = false; }
            this._doLayout();
            this._nodeOption.doLayoutDirty = layoutDirty;
            if (layoutDirty)
                this._dirty = true;
        };
        __egretProto__._updateGraphics = function () {
            var self = this, nodeOption = self._nodeOption;
            var gs = nodeOption.graphics;
            if (!gs) {
                gs = nodeOption.graphics = new egret.Graphics();
            }
            gs.clear();
            gs.beginFill(nodeOption.bgColor, nodeOption.bgOpacity / 255);
            gs.drawRect(0, 0, self.width, self.height);
            gs.endFill();
        };
        __egretProto__._updateClipping = function () {
            var self = this;
            if (self._nodeOption.clippingEnabled)
                self.mask = mo.rect(0, 0, self.width, self.height);
            else
                self.mask = null;
        };
        __egretProto__._onNodeSizeDirty = function () {
            _super.prototype._onNodeSizeDirty.call(this);
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.richText) {
                nodeOption.richText.setAreaSize(self.width, self.height);
                return;
            }
            var children = self._children, l = children.length;
            for (var i = 0; i < l; ++i) {
                var child = children[i];
                var cNodeOption = child._nodeOption;
                if (cNodeOption && cNodeOption.sizeType == mo.SizeType.percent) {
                    if (child._updateSizeByPercent)
                        child._updateSizeByPercent();
                }
            }
        };
        //@override
        __egretProto__._onVisit = function () {
            _super.prototype._onVisit.call(this);
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.nodeSizeDirty || nodeOption.doLayoutDirty)
                self._doLayout();
        };
        //@override
        __egretProto__._onUpdateView = function () {
            _super.prototype._onUpdateView.call(this);
            var self = this, nodeOption = self._nodeOption, nodeSizeDirty = nodeOption.nodeSizeDirty;
            if (nodeOption.bgOpacity != 0 && (nodeSizeDirty || nodeOption.bgColorDirty || !nodeOption.graphics))
                self._updateGraphics();
            else if (nodeOption.bgOpacity == 0) {
                nodeOption.graphics = null;
            }
            if (nodeOption.clippingDirty)
                self._updateClipping();
        };
        //@override
        __egretProto__._onAfterVisit = function () {
            _super.prototype._onAfterVisit.call(this);
            var self = this, nodeOption = self._nodeOption;
            nodeOption.doLayoutDirty = false;
            nodeOption.bgColorDirty = false;
            nodeOption.clippingDirty = false;
        };
        //@override
        __egretProto__.setLayoutParameter = function (parameter) {
            _super.prototype.setLayoutParameter.call(this, parameter);
            var parent = this._parent;
            if (parent && parent instanceof UIPanel)
                parent.setLayoutDirty();
        };
        //@override
        __egretProto__._render = function (renderContext) {
            var self = this, nodeOption = self._nodeOption;
            var graphics = nodeOption.graphics;
            if (graphics) {
                graphics._draw(renderContext);
            }
            var texture = nodeOption.bgTexture;
            self._texture_to_render = texture;
            if (texture) {
                var destW = self._hasWidthSet ? self._explicitWidth : texture._textureWidth;
                var destH = self._hasHeightSet ? self._explicitHeight : texture._textureHeight;
                egret.Bitmap._drawBitmap(renderContext, destW, destH, self);
            }
            _super.prototype._render.call(this, renderContext);
        };
        __egretProto__.setLinearLayout = function (spacing, align) {
            spacing = spacing || 0;
            var self = this;
            var children = self.getChildren();
            children.sort(_sortFuncByX);
            var p;
            align = align || mo.LayoutParameter.LINEAR_ALIGN_HT_LEFT;
            switch (align) {
                case mo.LayoutParameter.LINEAR_ALIGN_HT_LEFT:
                    for (var i = 0, li = children.length; i < li; i++) {
                        var child = children[i];
                        if (!child.isVisible())
                            continue;
                        var pos = child.getPosition();
                        var w = child.getSize().width;
                        var anchorX = child.getAnchorPoint().x;
                        if (p == null) {
                            p = pos.x; // 以最左边的child的x坐标为起始点
                        }
                        else {
                            p += w * anchorX;
                            pos.x = p;
                            child.setPosition(pos);
                        }
                        p += w * (1 - anchorX) + spacing;
                    }
                    break;
                case mo.LayoutParameter.LINEAR_ALIGN_HT_RIGHT:
                    for (var i = children.length - 1, li = 0; i >= li; i--) {
                        var child = children[i];
                        if (!child.isVisible())
                            continue;
                        var pos = child.getPosition();
                        var cw = self.getSize().width;
                        var w = child.getSize().width;
                        var anchorX = child.getAnchorPoint().x;
                        if (p == null) {
                            pos.x = cw - (1 - anchorX) * w;
                            child.setPosition(pos); // 将最右边的child移动到容器的最右边，紧贴容器右边界
                            p = pos.x;
                        }
                        else {
                            p -= w * (1 - anchorX);
                            pos.x = p;
                            child.setPosition(pos);
                            mo.log("p.x = ", pos.x, "p.y = ", pos.y);
                        }
                        p -= w * anchorX + spacing;
                    }
                    break;
            }
        };
        __egretProto__.copySpecialProps = function (layout) {
            var self = this;
            self.clippingEnabled = layout.clippingEnabled;
            self.layoutType = layout.layoutType;
            self.bgOpacity = layout.bgOpacity;
            self.bgColor = layout.bgColor;
            self.scale9Enabled = layout.scale9Enabled;
            self.bgTexture = layout._nodeOption.bgTexture;
        };
        /** widget extend begin **/
        __egretProto__.setOption = function (option) {
            if (option == null)
                return option;
            var self = this, nodeOption = self._nodeOption;
            self.removeChildren();
            nodeOption.richText = null;
            option = _super.prototype.setOption.call(this, option);
            nodeOption.bgOpacity = 0; //设置为无色
            if (option.value != null) {
                var richText, autoResize = option.autoResize;
                option.hAlign = option.hAlign || mo.ALIGN_H_LEFT;
                option.vAlign = option.vAlign || mo.ALIGN_V_MIDDLE;
                richText = mo.UIText.create();
                richText.setAnchorPoint(0, 0);
                richText.setAreaSize(self.width, self.height);
                richText.setOption(option);
                //重新设置容器panel的大小
                if (autoResize)
                    self.setSize(richText.width, richText.height);
                self.addChild(richText);
                nodeOption.richText = richText;
            }
            return option;
        };
        __egretProto__.enableStroke = function (strokeColor, strokeSize) {
            var richText = this._nodeOption.richText;
            if (richText)
                richText.enableStroke.apply(richText, arguments);
        };
        __egretProto__.disableStroke = function (mustUpdateTexture) {
            var richText = this._nodeOption.richText;
            if (richText)
                richText.disableStroke.apply(richText, arguments);
        };
        __egretProto__.setWidth = function (width) {
            var mySize = this.getSize(), newSize = mo.size(width, mySize.height);
            this.setSize(newSize);
        };
        __egretProto__.setHeight = function (height) {
            var mySize = this.getSize(), newSize = mo.size(mySize.width, height);
            this.setSize(newSize);
        };
        /**
         * 注册要监听原始大小变化的子widget
         * @param name
         */
        __egretProto__.registerSrcSizeByName = function (name) {
            var self = this;
            var map = self._nodeOption.childSrcSizeMap;
            if (!map) {
                map = self._nodeOption.childSrcSizeMap = {};
            }
            map[name] = self.getWidgetByName(name).getSrcSize();
        };
        /**
         * 累加子项原始大小的变化--为实现自动大小dlg效果
         * @private
         */
        __egretProto__._calcTotalSrcSizeChanged = function () {
            var self = this, nodeOption = self._nodeOption;
            var w = 0, h = 0, widget, srcSize;
            var map = nodeOption.childSrcSizeMap;
            for (var key in map) {
                widget = self.getWidgetByName(key);
                srcSize = map[key];
                w += widget.width - srcSize.width;
                h += widget.height - srcSize.height;
            }
            var srcRect = nodeOption.srcRect;
            self._setWidth(srcRect.width + w);
            self._setHeight(srcRect.height + h);
        };
        __egretProto__.setPadding = function (top, right, bottom, left) {
            if (right === void 0) { right = 0; }
            if (bottom === void 0) { bottom = 0; }
            if (left === void 0) { left = 0; }
            var self = this;
            var para = self.getLayoutParameter(mo.LayoutParameterType.linear);
            if (!para)
                return;
            if (typeof top == "object") {
                para.setPadding(top);
            }
            else {
                para.setPadding(new mo.Padding(top || 0, right, bottom, left));
            }
        };
        UIPanel.__className = "UIPanel";
        UIPanel.NODE_OPTION_CLASS = mo._UIPanelOption;
        return UIPanel;
    })(mo.UIWidget);
    mo.UIPanel = UIPanel;
    UIPanel.prototype.__class__ = "mo.UIPanel";
    /**
     * 通过x排序
     * @param node1
     * @param node2
     * @returns {number}
     * @private
     */
    function _sortFuncByX(node1, node2) {
        return node1.getSrcPos().x >= node2.getSrcPos().x ? 1 : -1;
    }
    mo._sortFuncByX = _sortFuncByX;
})(mo || (mo = {}));
