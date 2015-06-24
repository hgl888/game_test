var uw;
(function (uw) {
    var ShopScene = (function (_super) {
        __extends(ShopScene, _super);
        function ShopScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ShopScene.prototype;
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.ShopLayer.create();
            var layer = self.layer;
            mo.addAfterEventListener(layer, gEventType.visible, function (event) {
                var func = arguments.callee;
                // 弹出杂物物品
                if (uw.userDataCtrl.getSundries().length > 0) {
                    uw.SaleSundryDlg.create().show();
                }
                mo.removeAfterEventListener(layer, gEventType.visible, func, layer);
            }, layer);
            self.layer.show();
        };
        ShopScene.__className = "ShopScene";
        return ShopScene;
    })(uw.ModuleScene);
    uw.ShopScene = ShopScene;
    ShopScene.prototype.__class__ = "uw.ShopScene";
})(uw || (uw = {}));
