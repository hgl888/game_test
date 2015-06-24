/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SdkRegisterLayer = (function (_super) {
        __extends(SdkRegisterLayer, _super);
        function SdkRegisterLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SdkRegisterLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiIndexRegisterLayer_ui;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            self.onClickByName("btnRegister", self.menuRegister, self);
            self.onClickByName("btnBack", self.menuBack, self);
            self._inputUser = this.getWidgetByName("inputUser");
            self._inputPwd = this.getWidgetByName("inputPwd");
            self._inputConfirmPwd = this.getWidgetByName("inputConfirmPwd");
        };
        __egretProto__.onLoginSucc = function (cb, cbTarget) {
            var self = this;
            self._cbOnloginSucc = cb;
            self._cbTargetOnloginSucc = cbTarget;
        };
        __egretProto__.menuRegister = function (sender) {
            var self = this, userName = self._inputUser.getText(), pwd1 = self._inputPwd.getText(), pwd2 = self._inputConfirmPwd.getText();
            if (userName == null || pwd1 == null || pwd2 == null || userName == "" || pwd1 == "" || pwd2 == "") {
                mo.showMsg(uw.id_c_msgCode.loginNotNull);
            }
            else if (userName.length < 6 || userName.length > 12) {
                mo.showMsg(uw.id_c_msgCode.accountLengthNotCorrect);
            }
            else if (pwd1.length < 6 || pwd1.length > 12) {
                mo.showMsg(uw.id_c_msgCode.pwdLengthNotCorrect);
            }
            else if (pwd1 !== pwd2) {
                mo.showMsg(uw.id_c_msgCode.pwdNotSame);
            }
            else {
                var args = {};
                var argsKeys = uw.iface.h_account_register_args;
                args[argsKeys.name] = userName;
                args[argsKeys.password] = pwd1;
                args[argsKeys.channelId] = mo.project.channelId;
                args[argsKeys.deviceId] = mo.getDeviceId();
                mo.requestWaiting4Http(uw.iface.h_account_register, args, function (data) {
                    self._cbOnloginSucc.call(self._cbTargetOnloginSucc, data);
                    self.close();
                }, self);
            }
        };
        __egretProto__.menuBack = function (sender) {
            var self = this;
            self.close();
            uw.SdkLoginLayer.login(self._cbOnloginSucc, self._cbTargetOnloginSucc);
        };
        SdkRegisterLayer.__className = "SdkRegisterLayer";
        return SdkRegisterLayer;
    })(mo.UIModalLayer);
    uw.SdkRegisterLayer = SdkRegisterLayer;
    SdkRegisterLayer.prototype.__class__ = "uw.SdkRegisterLayer";
})(uw || (uw = {}));
