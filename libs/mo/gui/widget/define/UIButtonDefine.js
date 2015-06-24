var mo;
(function (mo) {
    var _UIButtonOption = (function (_super) {
        __extends(_UIButtonOption, _super);
        function _UIButtonOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _UIButtonOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            if (!self.textures) {
                self.textures = [];
            }
            else {
                self.textures.length = 0;
            }
            self.textDirty = false;
            self.textWidth = 0;
            self.titlePosByPercent = mo.p(0.5, 0.5);
            self.pressedActionEnabled = false;
            self.isGray = false;
            self.currentIndex = null; //默认在图片还没加载的时候，是没有的
        };
        __egretProto__.setTexture = function (index, texture) {
            var self = this, textures = self.textures;
            textures[index] = texture;
        };
        return _UIButtonOption;
    })(mo.Option);
    mo._UIButtonOption = _UIButtonOption;
    _UIButtonOption.prototype.__class__ = "mo._UIButtonOption";
})(mo || (mo = {}));
