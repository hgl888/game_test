var uw;
(function (uw) {
    var SecretShopScene = (function (_super) {
        __extends(SecretShopScene, _super);
        function SecretShopScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretShopScene.prototype;
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self.layer = uw.SecretShopLayer.create();
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
        SecretShopScene.__className = "SecretShopScene";
        return SecretShopScene;
    })(uw.ModuleScene);
    uw.SecretShopScene = SecretShopScene;
    SecretShopScene.prototype.__class__ = "uw.SecretShopScene";
})(uw || (uw = {}));
