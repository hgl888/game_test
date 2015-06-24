var uw;
(function (uw) {
    var EquipPropGridCtrl = (function (_super) {
        __extends(EquipPropGridCtrl, _super);
        function EquipPropGridCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EquipPropGridCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._fontSize = 55;
            self._layoutW = 730;
            self._layoutH = 58;
            self._marginH = 8;
        };
        __egretProto__.init = function (container, fontSize) {
            _super.prototype.init.call(this, container, 1, true);
            container.bgOpacity = 0;
            fontSize = fontSize || this._fontSize;
            this._fontSize = fontSize;
            var widget = this.widget;
            widget.setLayoutType(mo.LayoutType.linearVertical);
            this.setLayoutType(mo.GridController.LAYOUT_TOP);
        };
        __egretProto__._createItemWidget = function () {
            var widget = mo.UIPanel.create();
            widget.setSize(mo.size(this._layoutW, this._layoutH));
            return widget;
        };
        __egretProto__._initItemWidget = function (widget) {
            // 设置左右对齐
            var parameter = mo.LinearLayoutParameter.create();
            var gravity = this._contentAlign == uw.EquipPropGridCtrl.ALIGN_RIGHT ? mo.LinearGravity.right : mo.LinearGravity.left;
            parameter.setGravity(gravity);
            widget.setLayoutParameter(parameter);
        };
        __egretProto__._setPosByAvg = function (widget, row, col) {
            var cH = this._containerH, iH = this._itemH;
            var marginTop = (cH - iH * this._rows) / (this._rows + 1);
            var parameter = widget.getLayoutParameter(mo.LayoutParameterType.linear);
            parameter.setMargin(new mo.Margin(marginTop, 0, 0, 0));
        };
        __egretProto__._setPosByTop = function (widget, row, col) {
            var parameter = widget.getLayoutParameter(mo.LayoutParameterType.linear);
            // 第一行的上边距设置为0
            parameter.setMargin(new mo.Margin(row == 1 ? 0 : this._marginH, 0, 0, 0));
        };
        /**
         * 获取总行数累加的高度
         */
        __egretProto__.getRowTotalHeight = function () {
            return this._rows * this._itemH + (this._rows - 1) * this._marginH;
        };
        /**
         *
         * @param widget
         * @param data :
         *    {
     *        name : "Name",
     *        value : 11,
     *        normalValue : 444,//只存在value或者normalValue其中一个
     *        valueUp : 123,
     *        valuePerTime : 10
     *    }
         * @param index
         * @private
         */
        __egretProto__._resetItemByData = function (widget, data, index) {
            var fontSize = this._fontSize;
            var name = data.name;
            var value = data.value;
            var addValue = data.addValue || 0;
            var equipProp = uw.c_prop.equipProp, equipPropKey = uw.c_prop.equipPropKey;
            if (name != equipProp[equipPropKey.pAttackMult] && name != equipProp[equipPropKey.pDefenceMult] && name != equipProp[equipPropKey.mAttackMult] && name != equipProp[equipPropKey.mDefenceMult]) {
                value = Math.round(value);
                addValue = Math.round(addValue);
            }
            else {
                value = Math.round(value * 100) / 100;
                addValue = Math.round(addValue * 100) / 100;
            }
            var labelStr = mo.formatStr("[ubb color=#D3D3D3]%s：  [/ubb][ubb color=#FFAF32]%s[/ubb]", name, value);
            if (addValue)
                labelStr = mo.formatStr("[ubb color=#D3D3D3]%s：  [/ubb][ubb color=#FFAF32]%s[/ubb]    [ubb color=#8DCB04]+%s[/ubb]", name, value, addValue);
            widget.setOption({ value: labelStr, fontSize: fontSize, autoResize: true });
            widget.enableStroke(cc.c3b(73, 33, 23), 2);
            this._itemH = widget.getSize().height;
        };
        /**
         * 设置属性水平对齐方式, 支持左右两种对齐
         * @param align
         */
        __egretProto__.setContentAlign = function (align) {
            var self = this;
            self._contentAlign = align || uw.EquipPropGridCtrl.ALIGN_LEFT;
        };
        EquipPropGridCtrl.__className = "EquipPropGridCtrl";
        EquipPropGridCtrl.LABEL_VALUE_UP = "label_valueUp";
        EquipPropGridCtrl.PANEL_VALUE = "panel_value";
        EquipPropGridCtrl.LABEL_VALUE_PER_TIME = "label_valuePerTime";
        EquipPropGridCtrl.ALIGN_LEFT = 0;
        EquipPropGridCtrl.ALIGN_RIGHT = 1;
        return EquipPropGridCtrl;
    })(mo.GridController);
    uw.EquipPropGridCtrl = EquipPropGridCtrl;
    EquipPropGridCtrl.prototype.__class__ = "uw.EquipPropGridCtrl";
})(uw || (uw = {}));
