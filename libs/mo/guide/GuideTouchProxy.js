var mo;
(function (mo) {
    var GuideTouchProxy = (function (_super) {
        __extends(GuideTouchProxy, _super);
        function GuideTouchProxy() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideTouchProxy.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        __egretProto__._setCmd = function (cmd) {
            this._cmd = cmd;
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
        __egretProto__._dispatchTouchEventToTargetNode = function (event) {
            var self = this;
            if (!self._canDispatch)
                return;
            var node = self._cmd.getTargetNode();
            //下面进行事件的再次传递。传递给指定的node
            var evt = new egret.TouchEvent(event.type);
            var point = node.globalToLocal(event.stageX, event.stageY);
            evt.touchPointID = event.touchPointID;
            evt.stageX = event.stageX;
            evt.stageY = event.stageY;
            evt.ctrlKey = event.ctrlKey;
            evt.altKey = event.altKey;
            evt.shiftKey = event.shiftKey;
            evt.touchDown = event.touchDown;
            evt._isDefaultPrevented = false;
            evt._target = event._target;
            evt.localX = point.x;
            evt.localY = point.y;
            node.dispatchEvent(event);
        };
        __egretProto__.onTouchBegan = function (event) {
            _super.prototype.onTouchBegan.call(this, event);
            var self = this;
            var node = self._cmd.getTargetNode();
            if (!node)
                return; //如果不存在
            var point = node.globalToLocal(event.stageX, event.stageY);
            if (node.hitTest(point.x, point.y)) {
                self._canDispatch = true;
                self._dispatchTouchEventToTargetNode(event);
            }
            else {
                self._canDispatch = false;
            }
        };
        GuideTouchProxy.__className = "GuideTouchProxy";
        return GuideTouchProxy;
    })(mo.Node);
    mo.GuideTouchProxy = GuideTouchProxy;
    GuideTouchProxy.prototype.__class__ = "mo.GuideTouchProxy";
})(mo || (mo = {}));
