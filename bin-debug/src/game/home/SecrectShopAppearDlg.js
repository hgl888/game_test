/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SecretShopAppearDlg = (function (_super) {
        __extends(SecretShopAppearDlg, _super);
        function SecretShopAppearDlg() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretShopAppearDlg.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSecretShopAppearDlg_ui;
        };
        //@override
        __egretProto__.init = function (shopFlag) {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            var shopMsg;
            if (shopFlag == 1) {
                shopMsg = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.secretShop1)[4];
            }
            if (shopFlag == 2) {
                shopMsg = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.secretShop2)[4];
            }
            if (shopFlag == 4) {
                shopMsg = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.secretShop1)[5];
            }
            self.setInfoByName(clazz.LABEL_MSG, shopMsg);
        };
        SecretShopAppearDlg.__className = "SecretShopAppearDlg";
        SecretShopAppearDlg.LABEL_MSG = "label_msg";
        return SecretShopAppearDlg;
    })(mo.UIModalLayer);
    uw.SecretShopAppearDlg = SecretShopAppearDlg;
    SecretShopAppearDlg.prototype.__class__ = "uw.SecretShopAppearDlg";
})(uw || (uw = {}));
