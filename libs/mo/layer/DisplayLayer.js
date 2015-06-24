var mo;
(function (mo) {
    var DisplayLayer = (function (_super) {
        __extends(DisplayLayer, _super);
        function DisplayLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = DisplayLayer.prototype;
        __egretProto__._getTray = function () {
            var self = this;
            var scene = mo.runningScene;
            if (scene)
                return scene.displayTray;
            return null;
        };
        DisplayLayer.__className = "DisplayLayer";
        return DisplayLayer;
    })(mo.UILayer);
    mo.DisplayLayer = DisplayLayer;
    DisplayLayer.prototype.__class__ = "mo.DisplayLayer";
})(mo || (mo = {}));
