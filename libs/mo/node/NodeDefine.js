var mo;
(function (mo) {
    var _LastOption = (function (_super) {
        __extends(_LastOption, _super);
        function _LastOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _LastOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.map = {};
        };
        __egretProto__.initLastValue = function (key, newValue) {
            var self = this, info = self.map[key], node = self.node;
            self.resetToLast(key); //先重置到last
            if (!info) {
                info = self.map[key] = {};
            }
            info.value = node[key]; //保存last值
            node[key] = newValue; //设置成新值
            info.enabled = true; //启动
        };
        __egretProto__.setLastValue = function (key, value) {
            var self = this, info = self.map[key];
            if (info && info.enabled) {
                info.value = value;
            }
        };
        __egretProto__.resetToLast = function (key) {
            var self = this, info = self.map[key];
            if (!info)
                return; //如果没有就直接返回
            info.enabled = false; //停用
            if (info.value === undefined)
                return;
            self.node[key] = info.value; //设置成last值
            delete info.value; //清除
        };
        __egretProto__.isEnabled = function (key) {
            var self = this, info = self.map[key];
            if (!info)
                return false; //如果没有就直接返回
            return !!info.enabled;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this, map = self.map;
            self.node = null;
            for (var key in map) {
                delete map[key];
            }
        };
        return _LastOption;
    })(mo.Option);
    mo._LastOption = _LastOption;
    _LastOption.prototype.__class__ = "mo._LastOption";
    mo._node4Scroll;
    var _NodeOption = (function (_super) {
        __extends(_NodeOption, _super);
        function _NodeOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _NodeOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.tag = null;
            self.nodeSizeDirty = true; //起这个名字是因为egret已经把_sizeDirty设置成了private的了，没法继承
            self.clickData = null;
            self.zOrder = 0;
            //作为自身身体一部分的子节点映射，key为hashCode
            self.tempRect = mo.rect(0, 0, 0, 0);
            self.penetrable = false; //是否可穿透，默认为不可穿透
            self.clickCb = null;
            self.clickCtx = null;
            self.factory = null;
            self.delegate = null;
            self.canBeReclaimed = false;
            self.eventStoreForClass = {}; //DataController类的事件注册存储
            self.isReclaimed = false;
            self.isAutoDtor = true; //是否自动dtor，默认为ture
            self.hasDtored = false;
            self.scale9Grid = mo.rect(0, 0, 0, 0);
            self.scale9Enabled = false;
            self.fillMode = egret.BitmapFillMode.SCALE;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.clickCb = null;
            self.clickCtx = null;
            self.factory = null;
            self.delegate = null;
            self.clickData = null;
        };
        return _NodeOption;
    })(mo.Option);
    mo._NodeOption = _NodeOption;
    _NodeOption.prototype.__class__ = "mo._NodeOption";
    var _TouchOption = (function (_super) {
        __extends(_TouchOption, _super);
        function _TouchOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _TouchOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.touchBeganPoint = mo.p(0, 0);
            self.touchBeganStagePoint = mo.p(0, 0);
            self.touchMovedPoint = mo.p(0, 0);
            self.touchMovedStagePoint = mo.p(0, 0);
            self.touchMovingPoint = mo.p(0, 0);
            self.touchMovingStagePoint = mo.p(0, 0);
            self.touchEndedPoint = mo.p(0, 0);
            self.touchEndedStagePoint = mo.p(0, 0);
            self.bePressed = false;
            self.canTap = false;
            self.clickedThisTick = false;
            self.touchEventsInited = false;
            self.longTouchEventSelector = null;
            self.longTouchEventListener = null;
            self.isDoingLongEvent = false;
            self.respInterval = 100;
            self.startInterVal = 400;
            self.longTouchEnabled = false;
            self.longTouchEventInterValId = null;
            self.longTouchTimeoutId = null;
            self.movedDeltaSQ = 0; //点在local内移动距离的平方
            self.hitChildrenEnabled = true;
            self.hitEgretEnabled = false;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            this._initProp();
            var self = this;
            self.longTouchEventSelector = null;
            self.longTouchEventListener = null;
            self.longTouchEventInterValId = null;
            self.longTouchTimeoutId = null;
        };
        __egretProto__.clearPoints = function () {
            var self = this;
            self.touchBeganPoint._setX(0);
            self.touchBeganPoint._setY(0);
            self.touchBeganStagePoint._setX(0);
            self.touchBeganStagePoint._setY(0);
            self.touchMovedPoint._setX(0);
            self.touchMovedPoint._setY(0);
            self.touchMovedStagePoint._setX(0);
            self.touchMovedStagePoint._setY(0);
            self.touchMovingPoint._setX(0);
            self.touchMovingPoint._setY(0);
            self.touchMovingStagePoint._setX(0);
            self.touchMovingStagePoint._setY(0);
            self.touchEndedPoint._setX(0);
            self.touchEndedPoint._setY(0);
            self.touchEndedStagePoint._setX(0);
            self.touchEndedStagePoint._setY(0);
        };
        return _TouchOption;
    })(mo.Option);
    mo._TouchOption = _TouchOption;
    _TouchOption.prototype.__class__ = "mo._TouchOption";
    //拓展option，用于给对象加外部添加的拓展属性用，避免属性数量过大
    var _ExtendOption = (function (_super) {
        __extends(_ExtendOption, _super);
        function _ExtendOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _ExtendOption.prototype;
        return _ExtendOption;
    })(mo.Option);
    mo._ExtendOption = _ExtendOption;
    _ExtendOption.prototype.__class__ = "mo._ExtendOption";
})(mo || (mo = {}));
