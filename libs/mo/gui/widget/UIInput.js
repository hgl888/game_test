var mo;
(function (mo) {
    /**
     * 输入框基类
     * @class
     */
    var UIInput = (function (_super) {
        __extends(UIInput, _super);
        function UIInput() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIInput.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            mo.UIWidget.prototype._initProp.call(self);
            self._touchOption.hitEgretEnabled = true;
        };
        /**
         * @private
         */
        __egretProto__.initRenderer = function () {
            _super.prototype.initRenderer.call(this);
            this._nodeOption.textRenderer.type = egret.TextFieldType.INPUT;
            this.addChild(this._nodeOption.textRenderer);
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            this._nodeOption.textRenderer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            this._nodeOption.textRenderer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapHandler, this);
        };
        __egretProto__.onTapHandler = function (e) {
            var self = this;
            var placeHolder = self._nodeOption.placeHolder;
            if (placeHolder == self.getText()) {
                self.setText("");
            }
        };
        /**
         * 开启密码样式
         * @param {Boolean} enable
         */
        __egretProto__.setPasswordEnabled = function (enable) {
            this._nodeOption.textRenderer.displayAsPassword = enable;
        };
        __egretProto__.setPlaceHolder = function (placeText) {
            var self = this;
            self._nodeOption.placeHolder = placeText;
            var text = self.getText();
            if (text.length == 0) {
                self.setText(placeText);
            }
        };
        __egretProto__.getPlaceHolder = function () {
            return this._nodeOption.placeHolder;
        };
        __egretProto__.setAreaSize = function (width, height) {
            this._nodeOption.textRenderer.multiline = true;
            _super.prototype.setAreaSize.call(this, width, height);
        };
        /**
         * 是否开启密码样式
         * @returns {Boolean}
         */
        __egretProto__.isPasswordEnabled = function () {
            return this._nodeOption.textRenderer.displayAsPassword;
        };
        //@override
        __egretProto__._setTouchEnabled = function (enable) {
            _super.prototype._setTouchEnabled.call(this, enable);
            this._nodeOption.textRenderer.touchEnabled = enable;
        };
        /**
         * 复制特殊属性
         * @param textField
         */
        __egretProto__.copySpecialProps = function (textField) {
            _super.prototype.copySpecialProps.call(this, textField);
            this.setPasswordEnabled(textField.isPasswordEnabled());
        };
        __egretProto__._render = function (renderContext) {
            egret.DisplayObjectContainer.prototype._render.call(this, renderContext);
        };
        //++++++++++++++++++++++extend 开始======================
        __egretProto__.setOption = function (option) {
            if (option == null)
                return option;
            option = _super.prototype.setOption.call(this, option);
            if (option.value != null) {
                var value = option.value;
                this.setText(value);
            }
            return option;
        };
        UIInput.__className = "UIInput";
        return UIInput;
    })(mo.UIText);
    mo.UIInput = UIInput;
    UIInput.prototype.__class__ = "mo.UIInput";
})(mo || (mo = {}));
