/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SkillIconCtrl = (function (_super) {
        __extends(SkillIconCtrl, _super);
        function SkillIconCtrl() {
            _super.call(this);
        }
        var __egretProto__ = SkillIconCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSkillIcon_ui;
            self._infoJsonPath = res.uiSkillInfoTip_ui;
            self._clickWidgetName = SkillIconCtrl.PANEL_TOUCH;
        };
        __egretProto__.init = function (container, skillData, option) {
            var self = this;
            _super.prototype.init.call(this, container, skillData, option);
            self._container.setVisible(true);
            self.resetByData(skillData);
        };
        __egretProto__.resetByData = function (skillData) {
            var self = this;
            self.skillData = skillData;
            if (!skillData)
                return;
            if (typeof skillData == "number" || typeof skillData == "string") {
                skillData = uw.getSkillData(Number(skillData), 0);
            }
            self.skillData = skillData;
            //进行ui设置
            var icon = skillData.icon;
            self.setInfoByName(SkillIconCtrl.IMG_ICON, icon);
        };
        __egretProto__._readTipInfo = function () {
            //进行ui设置
            var self = this;
            var tipWidget = self.tipWidget;
            var skillData = self.skillData;
            tipWidget.setInfoByName(SkillIconCtrl.LABEL_NAME, skillData.name);
            tipWidget.setInfoByName(SkillIconCtrl.LABEL_DESC, skillData.text);
            self._adapt(skillData.text);
        };
        __egretProto__._adapt = function (str) {
            //自适应高度
            var self = this;
            var tipWidget = self.tipWidget;
            var labelDesc = tipWidget.getWidgetByName(SkillIconCtrl.LABEL_DESC);
            var diffHeight = labelDesc.getSize().height - self._descHeight;
            var container = tipWidget.getWidgetByName(SkillIconCtrl.PANEL_CONTAINER);
            container.setSize(mo.size(container.getSize().width, container.getSize().height + diffHeight));
            //适应位置
            var size = self._container.getSize(), originWorldPos = self._container.localToGlobal(0, 0);
            var containerSize = self.tipWidget.getSizeByName(SkillIconCtrl.PANEL_CONTAINER);
            var x = originWorldPos.x - containerSize.width / 2;
            var y = originWorldPos.y - size.height / 2 + containerSize.height / 2;
            var diffX1 = x - containerSize.width / 2;
            var diffX2 = mo.visibleRect.getWidth() - x - containerSize.width / 2;
            if (diffX1 < 0) {
                x = x + Math.abs(diffX1);
            }
            else if (diffX2 < 0) {
                x = x + diffX2;
            }
            if (y < 0) {
                y = 0;
            }
            self.tipWidget.setPosition(x, y);
        };
        SkillIconCtrl.__className = "SkillIconCtrl";
        SkillIconCtrl.IMG_ICON = "img_icon"; //icon图标
        SkillIconCtrl.IMG_BORDER = "img_border"; //边框
        SkillIconCtrl.PANEL_TOUCH = "panel_touch"; //点击区域
        return SkillIconCtrl;
    })(uw.UIIconCtrl);
    uw.SkillIconCtrl = SkillIconCtrl;
    SkillIconCtrl.prototype.__class__ = "uw.SkillIconCtrl";
})(uw || (uw = {}));
