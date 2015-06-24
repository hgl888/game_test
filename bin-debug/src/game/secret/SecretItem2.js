/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SecretItem2 = (function (_super) {
        __extends(SecretItem2, _super);
        function SecretItem2() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretItem2.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSecretItem2_ui;
            self._clickWidgetName = "touchPanel";
            self._useClickEffect = true;
        };
        __egretProto__.resetByData = function (info, index) {
            var self = this;
            self._info = info;
            var lvl = info.lvl; //技能等级
            var skillData = uw.getSkillData(info.skillId, 1); //获取技能模板数据
            var skillDisplayTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_skillDisplay, skillData.showId);
            self.setInfoByName("icon", skillData.icon);
            self.setInfoByName("name", skillDisplayTemp[uw.t_skillDisplay_name]);
            self.enableStrokeByName("name", cc.c3b(22, 22, 22), 3);
            self.formatByName("lvl", lvl);
            self.enableStrokeByName("lvl", mo.c3b(64, 44, 0), 3);
            self.setSelected(false);
            self.name = "cell_" + info.initId;
        };
        __egretProto__.getInfo = function () {
            return this._info;
        };
        __egretProto__.setSelected = function (selected) {
            var self = this;
            var bg = self.getWidgetByName("skillBg");
            self.setGrayByName("icon", selected);
            self.setVisibleByName("selected", selected);
        };
        SecretItem2.__className = "SecretItem2";
        return SecretItem2;
    })(mo.GridViewCell);
    uw.SecretItem2 = SecretItem2;
    SecretItem2.prototype.__class__ = "uw.SecretItem2";
})(uw || (uw = {}));
