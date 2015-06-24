var mo;
(function (mo) {
    var _UIWidgetOption = (function (_super) {
        __extends(_UIWidgetOption, _super);
        function _UIWidgetOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _UIWidgetOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            if (!self.widgetChildren) {
                self.widgetChildren = [];
            }
            else {
                self.widgetChildren.length = 0;
            }
            if (!self.nodes) {
                self.nodes = [];
            }
            else {
                self.nodes.length = 0;
            }
            self.layoutParameterDictionary = {};
            self.bright = true;
            self.brightStyle = mo.BrightStyle.none;
            self.sizeType = mo.SizeType.absolute;
            self.positionType = mo.PositionType.absolute;
            self.srcRect = mo.rect(0, 0, 0, 0);
            self.sizePercent = mo.p(0, 0);
            self.posPercent = mo.p(0, 0);
            self.isGray = false;
        };
        __egretProto__.clone = function (temp) {
            var self = this;
            temp = _super.prototype.clone.call(this, temp);
            temp.ignoreSize = self.ignoreSize;
            temp.sizeType = self.sizeType;
            temp.positionType = self.positionType;
            return temp;
        };
        __egretProto__.getClickAudioId = function () {
            return this.clickAudioId == null ? mo.audioIdOnClick : this.clickAudioId;
        };
        return _UIWidgetOption;
    })(mo._NodeOption);
    mo._UIWidgetOption = _UIWidgetOption;
    _UIWidgetOption.prototype.__class__ = "mo._UIWidgetOption";
})(mo || (mo = {}));
