var mo;
(function (mo) {
    var GuideHookUI = (function (_super) {
        __extends(GuideHookUI, _super);
        function GuideHookUI() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideHookUI.prototype;
        Object.defineProperty(__egretProto__, "touchProxy", {
            get: function () {
                return this._touchProxy;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__._setCmd = function (cmd) {
            var self = this;
            self._cmd = cmd;
            if (cmd.isHook) {
                var node = cmd.getTargetNode();
                if (node) {
                    var rect = cmd.getNodeRect();
                    var touchProxy = self._touchProxy;
                    if (!touchProxy) {
                        touchProxy = self._touchProxy = new mo.GuideTouchProxy();
                        self.addChild(touchProxy);
                        touchProxy.zOrder = 9999;
                        touchProxy.touchEnabled = true;
                    }
                    touchProxy.anchorX = 0.5;
                    touchProxy.anchorY = 0.5;
                    touchProxy.width = rect.width;
                    touchProxy.height = rect.height;
                    touchProxy.cmd = cmd;
                }
            }
        };
        Object.defineProperty(__egretProto__, "cmd", {
            get: function () {
                return this._cmd;
            },
            set: function (cmd) {
                this._setCmd(cmd);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         * @param cmd
         */
        __egretProto__.setCmd = function (cmd) {
            this._setCmd(cmd);
        };
        /**
         * @deprecated
         */
        __egretProto__.getCmd = function () {
            return this._cmd;
        };
        GuideHookUI.__className = "GuideHookUI";
        return GuideHookUI;
    })(mo.UIWidget);
    mo.GuideHookUI = GuideHookUI;
    GuideHookUI.prototype.__class__ = "mo.GuideHookUI";
})(mo || (mo = {}));
