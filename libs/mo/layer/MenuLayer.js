var mo;
(function (mo) {
    var MenuLayer = (function (_super) {
        __extends(MenuLayer, _super);
        function MenuLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MenuLayer.prototype;
        __egretProto__._getTray = function () {
            //这个是单例，每次的tray可能不同场景
            var self = this;
            var scene = mo.runningScene;
            if (scene)
                return scene.menuTray;
            return null;
        };
        MenuLayer.__className = "MenuLayer";
        return MenuLayer;
    })(mo.UILayer);
    mo.MenuLayer = MenuLayer;
    MenuLayer.prototype.__class__ = "mo.MenuLayer";
})(mo || (mo = {}));
