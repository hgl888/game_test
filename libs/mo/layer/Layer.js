var mo;
(function (mo) {
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Layer.prototype;
        __egretProto__._setShowingWithAction = function (showingWithAction) {
            this._showingWithAction = showingWithAction;
        };
        Object.defineProperty(__egretProto__, "showingWithAction", {
            get: function () {
                return this._showingWithAction;
            },
            set: function (showingWithAction) {
                this._setShowingWithAction(showingWithAction);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setBlurMaskEnabled = function (blurMaskEnabled) {
            this._blurMaskEnabled = blurMaskEnabled;
        };
        Object.defineProperty(__egretProto__, "blurMaskEnabled", {
            get: function () {
                return this._blurMaskEnabled;
            },
            set: function (blurMaskEnabled) {
                this._setBlurMaskEnabled(blurMaskEnabled);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._onCloseFunc = function () {
        };
        __egretProto__._onShowFunc = function () {
        };
        __egretProto__._onHideFunc = function () {
        };
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.anchorX = 0;
            self.anchorY = 0;
            var stage = mo.getStage();
            self.width = stage.stageWidth;
            self.height = stage.stageHeight;
            self._setPenetrable(true); //托盘设置为可穿透
            self._showWithAction = false;
            self._showingWithAction = false;
            self._setBlurMaskEnabled(false); //默认是不自动缓存背景texture
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self._onShowFunc = null;
            self._onShowTarget = null;
            self._onHideFunc = null;
            self._onHideTarget = null;
            self._onCloseFunc = null;
            self._onCloseTarget = null;
            var moduleInfo = self.moduleInfo;
            if (moduleInfo) {
                self.moduleInfo = null;
                res.mgr.releaseSubModule(moduleInfo.moduleName, moduleInfo.subModuleName);
            }
        };
        __egretProto__._getShowAction = function (cb) {
            var self = this;
            var scaleTime = self.getScale();
            self.setScale(scaleTime * 0.85);
            var scaleTo = mo.scaleTo(0.4, scaleTime).setEase(mo.Ease.backOut);
            return mo.sequence(scaleTo, mo.callFunc(cb));
        };
        __egretProto__._onShowReady = function () {
            //子类在此处理显示完毕的操作
            this._showingWithAction = false;
            this.visible = true;
        };
        __egretProto__._doShow = function () {
            var self = this;
            if (self._showWithAction) {
                self._showingWithAction = true;
                self.setScale(1, 1); //先在action执行的时候，将scale设置回1,1
                var runAction = function () {
                    var cb = arguments[arguments.length - 1];
                    var action = self._getShowAction(function () {
                        self._onShowReady();
                        cb();
                    });
                    self.visible = true;
                    self.runAction(action);
                };
                mo.dispatchEventWidthCallback([
                    [mo.visibleDispatcher, self.__className],
                    [self, Layer.PHASE_SHOW],
                    [self, gEventType.visible]
                ], runAction, self);
            }
            else {
                mo.dispatchEvent([
                    [mo.visibleDispatcher, self.__className],
                    [self, Layer.PHASE_SHOW],
                    [self, gEventType.visible]
                ], self._onShowReady, self);
            }
        };
        __egretProto__.show = function () {
            this._doShow();
        };
        __egretProto__._showWithoutAction = function () {
            var self = this;
            mo.dispatchEvent([
                [mo.visibleDispatcher, self.__className],
                [self, Layer.PHASE_SHOW],
                [self, gEventType.visible]
            ], self._onShowReady, self);
        };
        __egretProto__._onHide = function () {
            //子类在此处理隐藏完毕的操作
            this.visible = false;
            this.stopAllActions(); //隐藏的时候结束掉所有的动画
        };
        __egretProto__._doHide = function () {
            var self = this;
            mo.dispatchEvent([
                [mo.invisibleDispatcher, self.__className],
                [self, Layer.PHASE_HIDE],
                [self, gEventType.invisible]
            ], self._onHide, self);
        };
        __egretProto__.hide = function () {
            this._doHide();
        };
        __egretProto__._onClose = function () {
            var self = this;
            self.removeFromParent();
            var moduleInfo = self.moduleInfo;
            if (moduleInfo) {
                self.moduleInfo = null;
                res.mgr.releaseSubModule(moduleInfo.moduleName, moduleInfo.subModuleName);
            }
        };
        __egretProto__._doClose = function () {
            var self = this;
            mo.dispatchEvent([
                [mo.invisibleDispatcher, self.__className],
                [self, Layer.PHASE_CLOSE],
                [self, gEventType.invisible]
            ], self._onClose, self);
        };
        //关闭，改方法会将自身从父节点移除
        __egretProto__.close = function () {
            this._doClose();
        };
        //注册关闭回调 只能先这样先改成any型
        __egretProto__.onClose = function (listener, ctx) {
            var self = this, clazz = self.__class;
            if (self._onCloseFunc) {
                mo.removeAfterEventListener(self, clazz.PHASE_CLOSE, self._onCloseFunc, self._onCloseTarget);
            }
            self._onCloseFunc = listener;
            self._onCloseTarget = ctx;
            mo.addAfterEventListener(self, clazz.PHASE_CLOSE, listener, ctx);
        };
        //注册显示回调 只能先这样先改成any型
        __egretProto__.onShow = function (listener, ctx) {
            var self = this, clazz = self.__class;
            if (self._onShowFunc) {
                mo.removeAfterEventListener(self, clazz.PHASE_SHOW, self._onShowFunc, self._onShowTarget);
            }
            self._onShowFunc = listener;
            self._onShowTarget = ctx;
            mo.addAfterEventListener(self, clazz.PHASE_SHOW, listener, ctx);
        };
        //注册隐藏回调 只能先这样先改成any型
        __egretProto__.onHide = function (listener, ctx) {
            var self = this, clazz = self.__class;
            if (self._onHideFunc) {
                mo.removeAfterEventListener(self, clazz.PHASE_HIDE, self._onHideFunc, self._onHideTarget);
            }
            self._onHideFunc = listener;
            self._onHideTarget = ctx;
            mo.addAfterEventListener(self, clazz.PHASE_HIDE, listener, ctx);
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
        Layer.__className = "Layer";
        Layer.PHASE_SHOW = "show";
        Layer.PHASE_HIDE = "hide";
        Layer.PHASE_CLOSE = "close";
        return Layer;
    })(mo.Node);
    mo.Layer = Layer;
    Layer.prototype.__class__ = "mo.Layer";
})(mo || (mo = {}));
