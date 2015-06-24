/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SdkForgetPwdLayer = (function (_super) {
        __extends(SdkForgetPwdLayer, _super);
        function SdkForgetPwdLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SdkForgetPwdLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiIndexForgetPwdLayer_ui;
            self._emailReg = /^([a-zA-Z0-9]+[_|/_|/.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|/_|/.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            self.onClickByName("btnBack", this.menuBack, this);
            self.onClickByName("btnSend", this.menuSend, this);
            self._inputUser = this.getWidgetByName("inputUser");
        };
        __egretProto__.menuBack = function () {
            this.close();
        };
        __egretProto__.menuSend = function () {
            var email = this._inputUser.getText();
            if (email == null || email == "") {
                mo.showMsg(uw.id_c_msgCode.emailNotNull);
            }
            else if (!this._emailReg.test(email)) {
                mo.showMsg(uw.id_c_msgCode.emailValidErr);
            }
            else {
                var argsObj = uw.iface.h_account_getPwd_args, args = {};
                args[argsObj.email] = this._inputUser.getText();
                var self = this;
                mo.requestWaiting4Http(uw.iface.h_account_getPwd, args, function (result) {
                    mo.showMsg(uw.id_c_msgCode.sendPwdSucc);
                }, self);
            }
        };
        SdkForgetPwdLayer.__className = "SdkForgetPwdLayer";
        return SdkForgetPwdLayer;
    })(mo.UIModalLayer);
    uw.SdkForgetPwdLayer = SdkForgetPwdLayer;
    SdkForgetPwdLayer.prototype.__class__ = "uw.SdkForgetPwdLayer";
})(uw || (uw = {}));
