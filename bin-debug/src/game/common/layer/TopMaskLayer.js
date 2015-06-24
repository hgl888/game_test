/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var TopMaskLayer = (function (_super) {
        __extends(TopMaskLayer, _super);
        function TopMaskLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TopMaskLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._setTouchEnabled(true);
            self._setPenetrable(false);
        };
        TopMaskLayer.__className = "TopMaskLayer";
        return TopMaskLayer;
    })(mo.TopLayer);
    uw.TopMaskLayer = TopMaskLayer;
    TopMaskLayer.prototype.__class__ = "uw.TopMaskLayer";
})(uw || (uw = {}));
