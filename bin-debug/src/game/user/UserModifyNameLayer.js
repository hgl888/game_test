/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var UserModifyNameLayer = (function (_super) {
        __extends(UserModifyNameLayer, _super);
        function UserModifyNameLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UserModifyNameLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiUserModifyNameLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            this.onClickByName("btnCancel", this.close, this);
            this.onClickByName("btnConfirm", this.menuConfirm, this);
            this.onClickByName("btnDice", this.menuGetRandomName, this);
            var userData = uw.userDataCtrl;
            this.setInfoByName("labelOldName", userData.getName());
            this._inputNewName = this.getWidgetByName("inputNewName");
            //todo this._inputNewName.addEventListenerTextField(this.textFieldEvent, this);
            this.menuGetRandomName();
            if (userData.getChangeNameCount() > 0) {
                this.setVisibleByName("tips", false);
            }
            this._sensitiveArr = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fuckWord)[0].split(",");
        };
        __egretProto__.textFieldEvent = function (sender, type) {
            //todo
            //            if (type == mo.TextFiledEventType.insert_text) {
            //                var newName = this._inputNewName.getText();
            //                if (mo.getStringLength(newName) > 14) {
            //                    this._inputNewName.setText(mo.subStr(newName, 0, 16));
            //                }
            //            }
        };
        __egretProto__.menuConfirm = function () {
            var newName = this._inputNewName.getText();
            if (newName == null || newName == "") {
                mo.showMsg(uw.id_c_msgCode.inputRoleName);
            }
            else if (mo.getStringLength(newName) > 14) {
                this._inputNewName.setText();
                mo.showMsg(uw.id_c_msgCode.roleNameOutLenght);
            }
            else if (mo.checkSensitiveWord(newName, this._sensitiveArr)) {
                mo.showMsg(uw.id_c_msgCode.sensitiveInRoleName);
            }
            else {
                if (uw.userDataCtrl.getChangeNameCount() > 0) {
                    var needDiamond = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.changeNameDiamond)[0];
                    mo.showMsg(uw.id_c_msgCode.modifyNameTips, needDiamond, newName, this._requestModifyName, this);
                }
                else {
                    this._requestModifyName();
                }
            }
        };
        __egretProto__._requestModifyName = function () {
            var self = this;
            var newName = this._inputNewName.getText();
            uw.userDataCtrl.modifyName(newName, function () {
                self.close();
            }, self);
        };
        __egretProto__.menuGetRandomName = function () {
            var randomName = uw.getRandomName();
            this._inputNewName.setText(randomName);
        };
        UserModifyNameLayer.__className = "UserModifyNameLayer";
        return UserModifyNameLayer;
    })(mo.UIModalLayer);
    uw.UserModifyNameLayer = UserModifyNameLayer;
    UserModifyNameLayer.prototype.__class__ = "uw.UserModifyNameLayer";
})(uw || (uw = {}));
