var mo;
(function (mo) {
    var GuideTray = (function (_super) {
        __extends(GuideTray, _super);
        function GuideTray() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideTray.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        __egretProto__.add = function (layer) {
            _super.prototype.add.call(this, layer);
            var self = this;
            self._interverId = tm.setInterval(function () {
                if (self.visible) {
                    var children = self.getChildren();
                    if (children.length == 0) {
                        self._setPenetrable(true);
                    }
                }
            }, self, 3000); //故意设置了长一点，3秒才校验
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            if (self._interverId) {
                tm.clearInterval(self._interverId);
            }
        };
        __egretProto__.showPre = function () {
            var self = this;
            self._setPenetrable(false); //设置为不可穿透
            self._setVisible(true);
        };
        __egretProto__._setPenetrable = function (penetrable) {
            _super.prototype._setPenetrable.call(this, penetrable);
            var self = this;
            mo.scrollEnabled = !self.visible || penetrable;
        };
        __egretProto__._setVisible = function (visible) {
            _super.prototype._setVisible.call(this, visible);
            mo.scrollEnabled = !visible || this.penetrable;
        };
        GuideTray.__className = "GuideTray";
        return GuideTray;
    })(mo.Tray);
    mo.GuideTray = GuideTray;
    GuideTray.prototype.__class__ = "mo.GuideTray";
})(mo || (mo = {}));
