var uw;
(function (uw) {
    var HomeBaseLayer = (function (_super) {
        __extends(HomeBaseLayer, _super);
        function HomeBaseLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = HomeBaseLayer.prototype;
        __egretProto__.menuAddModule = function (sender, type) {
            var widgetName = sender.getName();
            uw.pushSubModule(widgetName);
        };
        HomeBaseLayer.__className = "HomeBaseLayer";
        return HomeBaseLayer;
    })(mo.DisplayLayer);
    uw.HomeBaseLayer = HomeBaseLayer;
    HomeBaseLayer.prototype.__class__ = "uw.HomeBaseLayer";
})(uw || (uw = {}));
