var mo;
(function (mo) {
    var _UITextAtlasOption = (function (_super) {
        __extends(_UITextAtlasOption, _super);
        function _UITextAtlasOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _UITextAtlasOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.string = "";
            self.mapStartChar = "";
            self.itemWidth = 0;
            self.itemHeight = 0;
            self.itemsPerRow = 0;
            self.itemsPerColumn = 0;
            self.itemWidth = 0;
            self.textureFile = "";
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.spriteSheet = null;
        };
        return _UITextAtlasOption;
    })(mo._UIWidgetOption);
    mo._UITextAtlasOption = _UITextAtlasOption;
    _UITextAtlasOption.prototype.__class__ = "mo._UITextAtlasOption";
})(mo || (mo = {}));
