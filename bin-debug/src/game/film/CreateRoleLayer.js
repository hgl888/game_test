var uw;
(function (uw) {
    var CreateRoleLayer = (function (_super) {
        __extends(CreateRoleLayer, _super);
        function CreateRoleLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CreateRoleLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiCreateRoleLayer_ui;
            self.blurMaskEnabled = false;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self.rootWidget.setVisible(false);
            self.showCreateRole();
        };
        __egretProto__.showCreateRole = function () {
            var self = this;
            self._sensitiveArr = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.fuckWord)[0].split(",");
            self._inputNickName = self.getWidgetByName("inputNickName");
            self._inputNickName.setTouchEnabled(true);
            //todo self._inputNickName.addEventListenerTextField(self.textFieldEvent, self);
            self._btnStartGame = self.getWidgetByName("btnStartGame");
            self._btnStartGame.setTouchEnabled(true);
            self._btnStartGame.onClick(self.menuStartGame, self);
            self._btnGetRandomName = self.getWidgetByName("btnGetRandomName");
            self._btnGetRandomName.setTouchEnabled(true);
            self._btnGetRandomName.onClick(self.menuGetRandomName, self);
            var channelInfo = channelCfg.getCurChannel();
            var name = channelInfo.name != "" ? channelInfo.name : uw.getRandomName();
            self._inputNickName.setText(name);
            var root = self.rootWidget;
            root.setVisible(true);
        };
        __egretProto__.textFieldEvent = function (sender, type) {
            //todo ts
            /*if (type == ccs.TextFiledEventType.insert_text) {
                var newName = this._inputNickName.getText();
                if (mo.getStringLength(newName) > 14) {
                    this._inputNickName.setText(mo.subStr(newName, 0, 16));
                }
            }*/
        };
        __egretProto__._showRandomName = function () {
            var name = uw.getRandomName();
            this._inputNickName.setText(name);
        };
        __egretProto__.menuGetRandomName = function () {
            var self = this;
            self._btnGetRandomName.setTouchEnabled(false);
            var dice = self.getWidgetByName("dice");
            dice.setVisible(false);
            uw.UpArmature.play(self._btnGetRandomName, res.cca_ui.dice, dice.getPosition(), function () {
                self._showRandomName();
                dice.setVisible(true);
                self._btnGetRandomName.setTouchEnabled(true);
            }, self);
        };
        __egretProto__.menuStartGame = function (sender) {
            var newName = this._inputNickName.getText();
            if (newName == null || newName == "") {
                mo.showMsg(uw.id_c_msgCode.inputRoleName);
            }
            else if (mo.getStringLength(newName) > 14) {
                this._inputNickName.setText();
                mo.showMsg(uw.id_c_msgCode.roleNameOutLenght);
            }
            else if (mo.checkSensitiveWord(newName, this._sensitiveArr)) {
                mo.showMsg(uw.id_c_msgCode.sensitiveInRoleName);
            }
            else {
                var self = this;
                self._btnStartGame.setTouchEnabled(false);
                var argsObj = uw.iface.a_user_createUser_args, args = {};
                args[argsObj.name] = newName;
                mo.requestWaiting(uw.iface.a_user_createUser, args, function () {
                    uw.UpArmature.play(self._btnStartGame, res.cca_ui.contract, null, function () {
                        self.checkResult();
                    }, self);
                }, this);
            }
        };
        __egretProto__.checkResult = function () {
            mo.sceneMgr.runScene(uw.HomeScene, mo.SceneMgr.LOADING_TYPE_ARMATURE, function () {
            });
        };
        CreateRoleLayer.__className = "CreateRoleLayer";
        return CreateRoleLayer;
    })(mo.Dlg);
    uw.CreateRoleLayer = CreateRoleLayer;
    CreateRoleLayer.prototype.__class__ = "uw.CreateRoleLayer";
})(uw || (uw = {}));
