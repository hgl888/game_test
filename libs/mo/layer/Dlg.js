var mo;
(function (mo) {
    var Dlg = (function (_super) {
        __extends(Dlg, _super);
        function Dlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Dlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._closeWidgetName = "btn_close"; //默认给了这个名字，省的老是要编辑
            self._closeOutSide = true;
            self.anchorX = 0.5;
            self.anchorY = 0.5;
            self._removeFromParentWhenShow = true;
            this._setPenetrable(false); //托盘设置为可穿透
            self._showWithAction = true;
            self._setBlurMaskEnabled(true); //弹出框默认开启模糊遮罩
        };
        __egretProto__._init = function () {
            var self = this;
            _super.prototype._init.call(this);
            self._initCloseWidget();
            self._initCloseWidgetOutSide();
        };
        //@override
        __egretProto__._getTray = function () {
            var self = this;
            var scene = mo.runningScene;
            if (scene)
                return scene.dlgTray;
            return null;
        };
        //override
        __egretProto__.show = function () {
            var self = this;
            if (self._removeFromParentWhenShow) {
                self.removeFromParent();
            }
            _super.prototype.show.apply(self, arguments);
        };
        __egretProto__._initCloseWidget = function () {
            var self = this;
            if (self.rootWidget && self._closeWidgetName) {
                self.onClickByName(self._closeWidgetName, function () {
                    self.close();
                }, self);
            }
        };
        __egretProto__._initCloseWidgetOutSide = function () {
            //临时解决下点击窗口外部关闭的功能。
            var self = this;
            if (self.rootWidget && self._closeOutSide) {
                self.onClickByName(self._closeRootName ? self._closeRootName : "root", function () {
                    self.close();
                }, self);
            }
        };
        Dlg.__className = "Dlg";
        return Dlg;
    })(mo.UILayer);
    mo.Dlg = Dlg;
    Dlg.prototype.__class__ = "mo.Dlg";
})(mo || (mo = {}));
