var mo;
(function (mo) {
    var LoadingLayer = (function (_super) {
        __extends(LoadingLayer, _super);
        function LoadingLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LoadingLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        __egretProto__._getTray = function () {
            //这个是单例，每次的tray可能不同场景
            var self = this;
            var scene = mo.runningScene;
            if (scene)
                return scene.loadingTray;
            return null;
        };
        LoadingLayer.__className = "LoadingLayer";
        return LoadingLayer;
    })(mo.UILayer);
    mo.LoadingLayer = LoadingLayer;
    LoadingLayer.prototype.__class__ = "mo.LoadingLayer";
})(mo || (mo = {}));
