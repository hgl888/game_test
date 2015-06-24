var mo;
(function (mo) {
    var Tray = (function (_super) {
        __extends(Tray, _super);
        function Tray() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Tray.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.visible = false; //默认隐藏
            self._setTouchEnabled(true); //设置成可点击
            self._setPenetrable(true); //托盘设置为可穿透
            self.isAutoDtor = true; //都设置成自动释放
            self._layerStackToHide = [];
            self._instanceList = [];
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this, list = self._instanceList;
            while (list.length > 0) {
                var layer = list.pop();
                mo.removeAfterEventListener(layer, mo.Layer.PHASE_CLOSE, self._onLayerInvisible, self);
            }
        };
        __egretProto__._setForceHidden = function (forceHidden) {
            this._forceHidden = forceHidden;
        };
        Object.defineProperty(__egretProto__, "forceHidden", {
            get: function () {
                return this._forceHidden;
            },
            set: function (forceHidden) {
                this._setForceHidden(forceHidden);
            },
            enumerable: true,
            configurable: true
        });
        //判断当前托盘是否显示
        __egretProto__._judgeToShow = function () {
            var self = this;
            if (self._forceHidden) {
                if (self.visible)
                    self.hide();
                return;
            }
            var children = self._children;
            var visible = false;
            for (var i = 0, li = children.length; i < li; ++i) {
                if (children[i].parent != null && children[i].visible) {
                    visible = true;
                    break;
                }
            }
            if (!self.visible && visible)
                self.show();
            else if (self.visible && !visible)
                self.hide();
        };
        __egretProto__._onLayerInvisible = function (event) {
            var self = this;
            var layer = event.target;
            mo.removeAfterEventListener(layer, event.type, self._onLayerInvisible, self);
            if (layer.blurMaskEnabled) {
                self.recoverLayers();
                var parent = self.parent;
                if (parent)
                    parent.recoverTrays();
                var blurMaskLayer = layer["blurMaskLayer"];
                if (blurMaskLayer)
                    blurMaskLayer.removeFromParent();
                layer["blurMaskLayer"] = null;
            }
            else if (layer.isToHideTraysUnder) {
                var parent = self.parent;
                if (parent)
                    parent.recoverTrays();
            }
            self._judgeToShow();
        };
        __egretProto__.add = function (layer) {
            var self = this;
            //先移除一次，避免想单例这种重复添加的问题
            mo.removeAfterEventListener(layer, mo.Layer.PHASE_CLOSE, self._onLayerInvisible, self);
            layer.hideUnder = false;
            if (layer.blurMaskEnabled) {
                mo.debug("add blurMask");
                var oldBlurMaskLayer = layer["blurMaskLayer"];
                var blurMaskLayer = mo.BlurMaskLayer.create();
                layer["blurMaskLayer"] = blurMaskLayer;
                self.addChild(blurMaskLayer); //添加模糊蒙版到视图里面了
                self.parent.hideTraysUnder(self);
                self.hideLayersUnder(blurMaskLayer);
                if (oldBlurMaskLayer)
                    oldBlurMaskLayer.removeFromParent();
            }
            else if (layer.isToHideTraysUnder) {
                self.parent.hideTraysUnder(self);
            }
            self.addChild(layer);
            self._judgeToShow();
            mo.addAfterEventListener(layer, mo.Layer.PHASE_CLOSE, self._onLayerInvisible, self);
            if (layer._isInstance && self._instanceList.indexOf(layer) < 0) {
                self._instanceList.push(layer);
            }
        };
        __egretProto__._onNodeInvisible = function (event) {
            var self = this;
            var node = event.target;
            node.removeEventListener(event.type, self._onNodeInvisible, self);
            self._judgeToShow();
        };
        //让tray能够添加node
        __egretProto__.addNode = function (node) {
            var self = this;
            self.addChild(node);
            self._judgeToShow();
            node.addEventListener(mo.Node.REMOVE_FROM_PARENT, self._onNodeInvisible, self);
        };
        __egretProto__.hideLayersUnder = function (layer) {
            var children = this._children, li = children.length;
            var arr = [];
            for (var i = 0; i < li; ++i) {
                var child = children[i];
                if (child == layer) {
                    break;
                }
                if (child.visible) {
                    arr.push(child);
                    child.hideUnder = true; //设置成隐藏在后面
                    if (child instanceof mo.Layer) {
                        child.hide();
                    }
                    else {
                        child.visible = false;
                    }
                }
            }
            this._layerStackToHide.push(arr);
        };
        __egretProto__.recoverLayers = function () {
            var arr = this._layerStackToHide.pop();
            if (arr) {
                for (var i = 0; i < arr.length; ++i) {
                    var child = arr[i];
                    child.hideUnder = false; //设置成不隐藏在后面
                    if (child instanceof mo.Layer) {
                        child._showWithoutAction();
                    }
                    else {
                        arr[i].visible = true;
                    }
                }
            }
        };
        Tray.__className = "Tray"; //为了跟cocos方案保持一致所写
        return Tray;
    })(mo.Layer);
    mo.Tray = Tray;
    Tray.prototype.__class__ = "mo.Tray";
})(mo || (mo = {}));
