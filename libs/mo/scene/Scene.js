var mo;
(function (mo) {
    var Scene = (function (_super) {
        __extends(Scene, _super);
        function Scene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Scene.prototype;
        __egretProto__._createTray = function (TrayClass) {
            var self = this;
            var tray = new TrayClass();
            self.addChild(tray);
            tray._setWidth(self.width);
            tray._setHeight(self.height);
            return tray;
        };
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._trayStackToHide = [];
            self.anchorX = 0;
            self.anchorY = 0;
            self.isAutoDtor = false; //都设置成不自动释放
            var stage = mo.getStage();
            var width = stage.width;
            var height = stage.height;
            self._setWidth(width);
            self._setHeight(height);
            //显示层
            self.displayTray = self._createTray(mo.DisplayTray);
            //菜单层
            self.menuTray = self._createTray(mo.MenuTray);
            //弹窗层
            self.dlgTray = self._createTray(mo.DlgTray);
            //消息层
            self.msgTray = self._createTray(mo.MsgTray);
            //引导层
            self.guideTray = self._createTray(mo.GuideTray);
            //加载层
            self.loadingTray = self._createTray(mo.LoadingTray);
            //顶层
            self.topTray = self._createTray(mo.TopTray);
        };
        __egretProto__.show = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        __egretProto__.hideTraysUnder = function (tray) {
            var children = this._children, li = children.length;
            var arr = [];
            for (var i = 0; i < li; ++i) {
                var child = children[i];
                if (child == tray) {
                    break;
                }
                if (child.visible) {
                    arr.push(child);
                    child.visible = false; //设置成不可见
                    mo.dispatchEvent([
                        [mo.invisibleDispatcher, child.__className],
                        [child, gEventType.invisible]
                    ], child._onHide, child);
                    mo.dispatchLayerInvisible(child);
                }
            }
            this._trayStackToHide.push(arr);
        };
        __egretProto__.recoverTrays = function () {
            var arr = this._trayStackToHide.pop();
            if (arr) {
                for (var i = 0; i < arr.length; ++i) {
                    var tray = arr[i];
                    tray.visible = true;
                    mo.dispatchEvent([
                        [mo.visibleDispatcher, tray.__className],
                        [tray, gEventType.visible]
                    ], tray._onShowReady, tray);
                    mo.dispatchLayerVisible(arr[i]);
                }
            }
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.removeChildren();
            self._trayStackToHide = null;
            self.displayTray = null;
            self.menuTray = null;
            self.dlgTray = null;
            self.msgTray = null;
            self.guideTray = null;
            self.loadingTray = null;
            self.topTray = null;
        };
        Scene.preload = function (cb) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            cb();
        };
        Scene.__className = "Scene";
        return Scene;
    })(mo.Node);
    mo.Scene = Scene;
    Scene.prototype.__class__ = "mo.Scene";
    function dispatchLayerVisible(parent) {
        var children = parent.getChildren();
        for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            if (child && !child.visible && child instanceof mo.Layer) {
                mo.dispatchEvent([
                    [mo.visibleDispatcher, child.__className],
                    [child, gEventType.visible]
                ], child._onShowReady, child);
                mo.dispatchLayerVisible(child);
            }
        }
    }
    mo.dispatchLayerVisible = dispatchLayerVisible;
    function dispatchLayerInvisible(parent) {
        var children = parent.getChildren();
        for (var i = 0; i < children.length; ++i) {
            var child = children[i];
            if (child && child.visible && child instanceof mo.Layer) {
                mo.dispatchEvent([
                    [mo.invisibleDispatcher, child.__className],
                    [child, gEventType.invisible]
                ], child._onHide, child);
                mo.dispatchLayerInvisible(child);
            }
        }
    }
    mo.dispatchLayerInvisible = dispatchLayerInvisible;
})(mo || (mo = {}));
