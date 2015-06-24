var mo;
(function (mo) {
    var GuideUI = (function (_super) {
        __extends(GuideUI, _super);
        function GuideUI() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideUI.prototype;
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
            if (!cmd.isHook) {
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
                    touchProxy.x = rect.x;
                    touchProxy.y = rect.y;
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
        //@override
        __egretProto__._getTray = function () {
            var self = this;
            var scene = mo.runningScene;
            if (scene)
                return scene.guideTray;
            return null;
        };
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._setPenetrable(false); //设置成不可穿透
        };
        GuideUI.__className = "GuideUI";
        return GuideUI;
    })(mo.UILayer);
    mo.GuideUI = GuideUI;
    GuideUI.prototype.__class__ = "mo.GuideUI";
})(mo || (mo = {}));
