var mo;
(function (mo) {
    var TopLayer = (function (_super) {
        __extends(TopLayer, _super);
        function TopLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TopLayer.prototype;
        __egretProto__._init = function () {
            var self = this;
            _super.prototype._init.call(this);
        };
        //@override
        __egretProto__._getTray = function () {
            var self = this;
            var scene = mo.runningScene;
            if (scene)
                return scene.topTray;
            return null;
        };
        TopLayer.__className = "TopLayer";
        return TopLayer;
    })(mo.UILayer);
    mo.TopLayer = TopLayer;
    TopLayer.prototype.__class__ = "mo.TopLayer";
})(mo || (mo = {}));
