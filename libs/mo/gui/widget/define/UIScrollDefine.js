var mo;
(function (mo) {
    var ScrollViewDir;
    (function (ScrollViewDir) {
        ScrollViewDir.none = 0;
        ScrollViewDir.vertical = 1;
        ScrollViewDir.horizontal = 2;
        ScrollViewDir.both = 3;
    })(ScrollViewDir = mo.ScrollViewDir || (mo.ScrollViewDir = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    var ScrollViewEventType;
    (function (ScrollViewEventType) {
        ScrollViewEventType.scrollToTop = 0;
        ScrollViewEventType.scrollToBottom = 1;
        ScrollViewEventType.scrollToLeft = 2;
        ScrollViewEventType.scrollToRight = 3;
        ScrollViewEventType.scrolling = 4;
        ScrollViewEventType.bounceTop = 5;
        ScrollViewEventType.bounceBottom = 6;
        ScrollViewEventType.bounceLeft = 7;
        ScrollViewEventType.bounceRight = 8;
    })(ScrollViewEventType = mo.ScrollViewEventType || (mo.ScrollViewEventType = {}));
})(mo || (mo = {}));
var mo;
(function (mo) {
    mo.AUTOSCROLLMAXSPEED = 1000;
    mo.SCROLLDIR_UP = mo.p(0, 1);
    mo.SCROLLDIR_DOWN = mo.p(0, -1);
    mo.SCROLLDIR_LEFT = mo.p(-1, 0);
    mo.SCROLLDIR_RIGHT = mo.p(1, 0);
    var _ScrollOption = (function (_super) {
        __extends(_ScrollOption, _super);
        function _ScrollOption() {
            _super.apply(this, arguments);
            this.bounceDir = mo.p(0, 0);
        }
        var __egretProto__ = _ScrollOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.innerContainer = new mo.UIPanel();
            self.innerContainer.setName("innerContainer");
            self.innerContainer.touchEnabled = false; //设置成不可点击
            self.direction = mo.ScrollViewDir.both;
            self.scrollDir = mo.p(0, 0);
            self.autoScrollDir = mo.p(0, 0);
            self.topBoundary = 0; //test
            self.bottomBoundary = 0; //test
            self.leftBoundary = 0;
            self.rightBoundary = 0;
            self.bounceTopBoundary = 0;
            self.bounceBottomBoundary = 0;
            self.bounceLeftBoundary = 0;
            self.bounceRightBoundary = 0;
            self.autoScroll = false;
            self.autoScrollAddUpTime = 0;
            self.autoScrollOriginalSpeed = 0;
            self.autoScrollAcceleration = -1000;
            self.isAutoScrollSpeedAttenuated = false;
            self.needCheckAutoScrollDestination = false;
            self.autoScrollDestination = mo.p(0, 0);
            self.slidTime = 0;
            self.moveChildPoint = mo.p(0, 0);
            self.childFocusCancelOffset = 5;
            self.leftBounceNeeded = false;
            self.topBounceNeeded = false;
            self.rightBounceNeeded = false;
            self.bottomBounceNeeded = false;
            self.bounceEnabled = false;
            self.bouncing = false;
            self.bounceDir = mo.p(0, 0);
            self.bounceOriginalSpeed = 0;
            self.inertiaScrollEnabled = true;
            self.scrollViewEventListener = null;
            self.scrollViewEventSelector = null;
            self.longTouchWhenScrollingEnabled = false;
            self.maxMovedDeltaSQ = 100;
            self.scrollEnabled = true;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.scrollViewEventListener = null;
            self.scrollViewEventSelector = null;
        };
        return _ScrollOption;
    })(mo.Option);
    mo._ScrollOption = _ScrollOption;
    _ScrollOption.prototype.__class__ = "mo._ScrollOption";
})(mo || (mo = {}));
