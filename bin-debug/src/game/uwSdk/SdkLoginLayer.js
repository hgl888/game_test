/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SdkLoginLayer = (function (_super) {
        __extends(SdkLoginLayer, _super);
        function SdkLoginLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SdkLoginLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiIndexLoginLayer_ui;
            self._inputBgArr = [];
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            self.onClickByName("btnLogin", self.menuLogin, self);
            self.onClickByName("btnRegister", self.menuShowRegister, self);
            self.onClickByName("btnForgetPwd", self.menuShowForgetPwd, self);
            self.onClickByName("btnRemember", self.menuRemember, self);
            self.onClickByName("btnQuickLogin", self.menuQuickLogin, self);
            self._inputUser = this.getWidgetByName("inputUser");
            self._inputPwd = this.getWidgetByName("inputPwd");
            self._markRemember = this.getWidgetByName("markRemember");
            var accountName = mo.getLocalStorageItem(uw.Keys.accountName, true) || "test0", pwd = mo.getLocalStorageItem(uw.Keys.password, true) || "111111";
            self._inputUser.setText(accountName);
            self._inputPwd.setText(pwd);
        };
        __egretProto__.onLoginSucc = function (cb, cbTarget) {
            var self = this;
            self._cbOnloginSucc = cb;
            self._cbTargetOnloginSucc = cbTarget;
        };
        //快速登陆
        __egretProto__.menuQuickLogin = function (sender) {
            var self = this;
            var argsObj = uw.iface.h_account_autoRegister_args, args = {};
            args[argsObj.deviceId] = mo.getDeviceId();
            args[argsObj.channelId] = mo.project.channelId;
            mo.requestWaiting4Http(uw.iface.h_account_autoRegister, args, function (data) {
                self.close();
                SdkLoginLayer.saveUserAndPwd(data);
                self._cbOnloginSucc.call(self._cbTargetOnloginSucc, data);
            }, self);
        };
        //点击登陆
        __egretProto__.menuLogin = function (sender) {
            var self = this, userName = self._inputUser.getText(), pwd = self._inputPwd.getText();
            if (userName == null || userName == "" || pwd == null || pwd == "") {
                mo.showMsg(uw.id_c_msgCode.loginNotNull);
            }
            else {
                var argsObj = uw.iface.h_account_login_args, args = {};
                args[argsObj.name] = userName;
                args[argsObj.password] = pwd;
                args[argsObj.channelId] = mo.project.channelId;
                mo.requestWaiting4Http(uw.iface.h_account_login, args, function (data) {
                    self.close();
                    SdkLoginLayer.saveUserAndPwd(data);
                    self._cbOnloginSucc.call(self._cbTargetOnloginSucc, data);
                });
            }
        };
        __egretProto__.menuShowRegister = function (sender) {
            var self = this;
            var indexRegisterLayer = uw.SdkRegisterLayer.create();
            indexRegisterLayer.show();
            indexRegisterLayer.onLoginSucc(self._cbOnloginSucc, self._cbTargetOnloginSucc);
            self.close();
        };
        __egretProto__.menuShowForgetPwd = function (sender) {
            var self = this;
            var indexForgetPwdLayer = uw.SdkForgetPwdLayer.create();
            indexForgetPwdLayer.show();
            indexForgetPwdLayer.onClose(function () {
                SdkLoginLayer.login(self._cbOnloginSucc, self._cbTargetOnloginSucc);
            }, self);
            self.close();
        };
        __egretProto__.menuRemember = function () {
            SdkLoginLayer.isRememberPwd = !SdkLoginLayer.isRememberPwd;
            this._markRemember.setVisible(SdkLoginLayer.isRememberPwd);
        };
        SdkLoginLayer.saveUserAndPwd = function (data) {
            if (SdkLoginLayer.isRememberPwd) {
                //记住已经登陆过了和用户密码
                var accountData = data[uw.dsConsts.LoginData.account];
                var accountEntity = uw.dsConsts.AccountEntity;
                var strUser = accountData[accountEntity.name];
                var strPwd = accountData[accountEntity.pwd];
                mo.setLocalStorageItem(uw.Keys.logined, true, true);
                mo.setLocalStorageItem(uw.Keys.accountName, strUser, true);
                mo.setLocalStorageItem(uw.Keys.password, strPwd, true);
            }
        };
        SdkLoginLayer.checkLogin = function (cb, cbTarget) {
            var logined = mo.getLocalStorageItem(uw.Keys.logined, true);
            if (logined) {
                var accountName = mo.getLocalStorageItem(uw.Keys.accountName, true), pwd = mo.getLocalStorageItem(uw.Keys.password, true);
                var argsObj = uw.iface.h_account_login_args, args = {};
                args[argsObj.name] = accountName;
                args[argsObj.password] = pwd;
                args[argsObj.channelId] = mo.project.channelId;
                mo.request4Http(uw.iface.h_account_login, args, function (data) {
                    SdkLoginLayer.saveUserAndPwd(data);
                    cb.call(cbTarget, data);
                });
            }
            else {
                cb.call(cbTarget);
            }
        };
        SdkLoginLayer.login = function (cb, cbTarget) {
            var indexLoginLayer = SdkLoginLayer.create();
            indexLoginLayer.onLoginSucc(cb, cbTarget);
            indexLoginLayer.show();
        };
        SdkLoginLayer.logout = function (cb, cbTarget) {
            mo.removeLocalStorageItem(uw.Keys.logined, true);
            SdkLoginLayer.login(cb, cbTarget);
        };
        SdkLoginLayer.__className = "SdkLoginLayer";
        SdkLoginLayer.isRememberPwd = true;
        return SdkLoginLayer;
    })(mo.DisplayLayer);
    uw.SdkLoginLayer = SdkLoginLayer;
    SdkLoginLayer.prototype.__class__ = "uw.SdkLoginLayer";
})(uw || (uw = {}));
