/**
 * Created by yjtx
 */
var uw;
(function (uw) {
    var UIIconCountCtrl = (function (_super) {
        __extends(UIIconCountCtrl, _super);
        function UIIconCountCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIIconCountCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            _super.prototype._initProp.call(this);
            self._marginLeft = 10;
            self._fontSize = 45;
            self._panelIconSize = mo.size(62, 62);
        };
        __egretProto__.init = function (tempId, count) {
            var self = this;
            var layout = self.widget = mo.UIPanel.create();
            layout.setLayoutType(mo.LayoutType.linearHorizontal);
            /** for debug **/
            //        layout.setBackGroundColorType(ccs.LayoutBackGroundColorType.solid);
            //        layout.setBackGroundColor(cc.hexToColor("#FF96C8"));
            //        layout.setBackGroundColorOpacity(128);
            if (arguments.length > 0) {
                self.resetByData.apply(self, arguments);
            }
        };
        __egretProto__.resetByData = function (tempId, count) {
            var self = this;
            var count = count || 0;
            var layout = self.widget;
            var itemId = parseInt(tempId);
            var icon;
            switch (itemId) {
                case uw.c_prop.spItemIdKey.diamond:
                case uw.c_prop.spItemIdKey.gold:
                case uw.c_prop.spItemIdKey.userExpc:
                case uw.c_prop.spItemIdKey.strength:
                    if (self._iconCtrl) {
                        self._iconCtrl.detachWidget();
                        self._iconCtrl = null;
                    }
                    // 普通图片icon
                    icon = self._imgIcon;
                    if (!icon) {
                        icon = self._imgIcon = mo.UIImage.create();
                        // 设置居中对齐
                        var parameter = mo.LinearLayoutParameter.create();
                        var gravity = mo.LinearGravity.centerVertical;
                        parameter.setGravity(gravity);
                        icon.setLayoutParameter(parameter);
                        layout.addChild(icon);
                    }
                    if (self._tempId != tempId)
                        icon.setOption(resHelper.getUIIconPath(tempId));
                    break;
                default:
                    if (self._imgIcon) {
                        self._imgIcon.removeFromParent(true);
                        self._imgIcon = null;
                    }
                    // panel_icon
                    var iconCtrl = self._iconCtrl;
                    if (!iconCtrl) {
                        icon = mo.UIPanel.create();
                        // 设置居中对齐
                        var parameter = mo.LinearLayoutParameter.create();
                        var gravity = mo.LinearGravity.bottom;
                        parameter.setGravity(gravity);
                        icon.setLayoutParameter(parameter);
                        icon.setSize(self._panelIconSize.width, self._panelIconSize.height);
                        layout.addChild(icon);
                        iconCtrl = self._iconCtrl = uw.UIItemIconCtrl.create(icon);
                        iconCtrl.showTip(true);
                    }
                    else {
                        icon = self._iconCtrl._container;
                    }
                    if (self._tempId != tempId)
                        iconCtrl.resetByData(tempId);
                    break;
            }
            // count
            var label = self._countLabel;
            if (!label) {
                label = self._countLabel = mo.UIText.create();
                label.setFontSize(self._fontSize);
                label.enableStroke(0x131313, 2);
                // 设置左右对齐
                var parameter = mo.LinearLayoutParameter.create();
                var gravity = mo.LinearGravity.bottom;
                parameter.setGravity(gravity);
                parameter.setMargin(new mo.Margin(0, 0, 0, self._marginLeft));
                label.setLayoutParameter(parameter);
                layout.addChild(label);
            }
            if (self._count != count)
                label.setText(mo.formatStr("x%s", count));
            var iconSize = icon.getSize(), labelSize = label.getSize();
            layout.setSize(iconSize.width + labelSize.width + self._marginLeft, Math.max(iconSize.height, labelSize.height));
            self._tempId = tempId;
            self._count = count;
        };
        UIIconCountCtrl.__className = "UIIconCountCtrl";
        return UIIconCountCtrl;
    })(mo.WidgetCtrl);
    uw.UIIconCountCtrl = UIIconCountCtrl;
    UIIconCountCtrl.prototype.__class__ = "uw.UIIconCountCtrl";
})(uw || (uw = {}));
