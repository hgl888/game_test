var mo;
(function (mo) {
    /**
     * @class UIText
     * 文本类
     */
    var UIText = (function (_super) {
        __extends(UIText, _super);
        function UIText() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIText.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var mc = egret.MainContext, self = this;
            if (mc.runtimeType == mc.RUNTIME_HTML5) {
                self._cacheAsBitmap = true;
            }
        };
        /**
         * 设置文本内容
         * @param {String} text
         */
        __egretProto__.setText = function (text) {
            var self = this;
            var textRenderer = self._nodeOption.textRenderer;
            if (textRenderer) {
                if (text instanceof Array) {
                    textRenderer.textFlow = text;
                    self._nodeOption.isFlow = true;
                }
                else {
                    textRenderer.text = text;
                    self._nodeOption.isFlow = false;
                }
                this._labelScaleChangedWithSize();
            }
        };
        /**
         * 获取文本内容
         * @returns {String}
         */
        __egretProto__.getText = function () {
            return this._nodeOption.textRenderer.text;
        };
        /**
         * 获取文本长度
         * @returns {Number}
         */
        __egretProto__.getTextLength = function () {
            var str = this.getText();
            return str.length || 0;
        };
        /**
         * 设置字体大小
         * @param {Number} fontSize
         */
        __egretProto__.setFontSize = function (fontSize) {
            var self = this, textRenderer = self._nodeOption.textRenderer;
            textRenderer.size = fontSize;
            textRenderer.lineSpacing = textRenderer.size * 0.3;
            self.height = fontSize; //此时若没有设置文本时，width和height可能都为零
            self._labelScaleChangedWithSize();
        };
        /**
         * 获取字体大小
         * @returns {Number}
         */
        __egretProto__.getFontSize = function () {
            return this._nodeOption.textRenderer.size;
        };
        /**
         * 设置字体
         * @param {String} name
         */
        __egretProto__.setFontName = function (name) {
            this._nodeOption.textRenderer.fontFamily = name;
            this._labelScaleChangedWithSize();
        };
        /**
         * 获取字体
         * @returns {String}
         */
        __egretProto__.getFontName = function () {
            return this._nodeOption.textRenderer.fontFamily;
        };
        /**
         * 设置文本域宽度
         * @param {Number} width
         * @param {Number} height
         */
        __egretProto__.setAreaSize = function (width, height) {
            var self = this, textRenderer = self._nodeOption.textRenderer;
            textRenderer.width = width;
            textRenderer.height = height;
            self._labelScaleChangedWithSize();
        };
        /**
         * 获取文本域大小
         * @returns {mo.Size}
         */
        __egretProto__.getAreaSize = function () {
            var self = this, textRenderer = self._nodeOption.textRenderer;
            return mo.size(textRenderer.width, textRenderer.height);
        };
        /**
         * 设置文本的横向对齐方式
         * @param {ALIGN_H_LEFT | ALIGN_H_CENTER | ALIGN_H_RIGHT} hAlign Horizontal Alignment
         */
        __egretProto__.setHAlign = function (hAlign) {
            this._nodeOption.textRenderer.textAlign = hAlign;
        };
        /**
         * 获取文本的横向对齐方式
         * @returns {ALIGN_H_LEFT | ALIGN_H_CENTER | ALIGN_H_RIGHT}
         */
        __egretProto__.getHAlign = function () {
            return this._nodeOption.textRenderer.textAlign;
        };
        /**
         * 设置文本的垂直对齐方式
         * @param {ALIGN_V_TOP|ALIGN_V_MIDDLE|ALIGN_V_BOTTOM} vAlign
         */
        __egretProto__.setVAlign = function (vAlign) {
            this._nodeOption.textRenderer.verticalAlign = vAlign;
        };
        /**
         * 获取文本的垂直对齐方式
         * @returns {ALIGN_V_TOP|ALIGN_V_MIDDLE|ALIGN_V_BOTTOM}
         */
        __egretProto__.getVAlign = function () {
            return this._nodeOption.textRenderer.verticalAlign;
        };
        /**
         * 设置斜体
         * @param isItalic
         */
        __egretProto__.setItalic = function (isItalic) {
            this._nodeOption.textRenderer.italic = isItalic;
        };
        /**
         * 是否斜体
         * @returns {boolean}
         */
        __egretProto__.getItalic = function () {
            return this._nodeOption.textRenderer.italic;
        };
        /**
         * 设置粗体
         * @param bold
         */
        __egretProto__.setBold = function (bold) {
            this._nodeOption.textRenderer.bold = bold;
        };
        /**
         * 是否粗体
         * @returns {boolean}
         */
        __egretProto__.getBold = function () {
            return this._nodeOption.textRenderer.bold;
        };
        /**
         * 包含三个 8 位 RGB 颜色成分的数字；例如，0xFF0000 为红色，0x00FF00 为绿色。
         */
        __egretProto__._setColor = function (color) {
            var nodeOption = this._nodeOption;
            nodeOption.color = color;
            if (color != null)
                nodeOption.textRenderer.textColor = color;
        };
        Object.defineProperty(__egretProto__, "color", {
            get: function () {
                return this._nodeOption.color;
            },
            set: function (color) {
                this._setColor(color);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         * @param color
         */
        __egretProto__.setColor = function (color) {
            this._setColor(color);
        };
        /**
         * @deprecated
         */
        __egretProto__.getColor = function () {
            return this._nodeOption.color;
        };
        /**
         * 设置描边颜色，颜色值同setColor
         * @param color
         * @param lineSize
         */
        __egretProto__.enableStroke = function (color, lineSize) {
            var self = this, textRenderer = self._nodeOption.textRenderer;
            if (lineSize == null)
                lineSize = 2;
            textRenderer.strokeColor = color;
            textRenderer.stroke = lineSize;
        };
        /**
         * 禁用描边
         */
        __egretProto__.disableStroke = function () {
            this._nodeOption.textRenderer.stroke = 0;
        };
        /**
         * 获取行数
         * @returns {number}
         */
        __egretProto__.getNumLines = function () {
            return this._nodeOption.textRenderer.numLines;
        };
        /**
         * 设置行距
         * @param value
         */
        __egretProto__.setLineSpacing = function (value) {
            this._nodeOption.textRenderer.lineSpacing = value;
        };
        /**
         * 获取行距
         * @returns {number}
         */
        __egretProto__.getLineSpacing = function () {
            return this._nodeOption.textRenderer.lineSpacing;
        };
        /**
         * 设置点击时候是否可放大
         * @param {Boolean} enable
         */
        __egretProto__.setTouchScaleEnabled = function (enable) {
            this._nodeOption.touchScaleEnabled = enable;
        };
        /**
         * 点击时是否可放大
         * @returns {Boolean}
         */
        __egretProto__.isTouchScaleEnabled = function () {
            return this._nodeOption.touchScaleEnabled;
        };
        /**
         * 设置单行最大长度（单位：像素）
         * @param {Number} length
         */
        __egretProto__.setMaxLength = function (length) {
            this._nodeOption.textRenderer.maxWidth = length;
        };
        /**
         * 获取单行最大宽度（单位：像素）
         * @returns {Number} length
         */
        __egretProto__.getMaxLength = function () {
            return this._nodeOption.textRenderer.maxWidth;
        };
        /**
         * @Override
         */
        __egretProto__._onPressStateChanged = function (index) {
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.touchScaleEnabled) {
                var textRenderer = nodeOption.textRenderer, nsx = nodeOption.normalScaleValueX, nsy = nodeOption.normalScaleValueY;
                if (index == 0) {
                    textRenderer.scaleX = nsx;
                    textRenderer.scaleY = nsy;
                }
                else if (index == 1) {
                    textRenderer.scaleX = nsx + nodeOption.onSelectedScaleOffset;
                    textRenderer.scaleY = nsy + nodeOption.onSelectedScaleOffset;
                }
            }
        };
        /**
         * @Override
         */
        __egretProto__._onNodeSizeDirty = function () {
            _super.prototype._onNodeSizeDirty.call(this);
            this._labelScaleChangedWithSize();
        };
        /**
         * @private
         */
        __egretProto__._labelScaleChangedWithSize = function () {
            var self = this, nodeOption = self._nodeOption, textRenderer = nodeOption.textRenderer;
            var rendererWidth = Math.max(self.width, textRenderer.width);
            var rendererHeight = Math.max(self.height, textRenderer.height);
            if (nodeOption.autoSizeWidth) {
                self._setWidth(textRenderer.width);
                self._setHeight(rendererHeight);
            }
            else if (nodeOption.autoSizeHeight) {
                self._setWidth(rendererWidth);
                self._setHeight(textRenderer.height);
            }
            else {
                self._setWidth(rendererWidth);
                self._setHeight(rendererHeight);
            }
            self._cacheDirty = true;
        };
        /**
         * 专门给WEBGL用的啊亲，这是一个HACK!
         * @returns {boolean}
         */
        __egretProto__._makeBitmapCache = function () {
            return egret.TextField.prototype._makeBitmapCache.call(this);
        };
        __egretProto__._render = function (renderContext) {
            var self = this, nodeOption = self._nodeOption, textRenderer = nodeOption.textRenderer, properties = textRenderer._properties;
            //单行并且不是富文本走这个逻辑
            if (properties._numLines == 1 && !nodeOption.isFlow && properties._text && properties._text != "") {
                var destW = self._explicitWidth;
                var destH = self._explicitHeight;
                //y
                var y, valign = 0;
                if (properties._verticalAlign == mo.ALIGN_V_MIDDLE)
                    valign = 0.5;
                else if (properties._verticalAlign == mo.ALIGN_V_BOTTOM)
                    valign = 1;
                y = valign * destH - properties._size * (valign - 0.5);
                //x
                var x, halign = 0;
                if (properties._textAlign == mo.ALIGN_H_CENTER) {
                    halign = 0.5;
                }
                else if (properties._textAlign == mo.ALIGN_H_RIGHT) {
                    halign = 1;
                }
                x = halign * destW - properties._textMaxWidth * halign;
                renderContext.drawText(textRenderer, properties._text, x, y, 0);
            }
            else {
                //多行或则富文本走原来逻辑
                egret.TextField.prototype._render.call(textRenderer, renderContext);
            }
            _super.prototype._render.call(this, renderContext);
        };
        //@override
        __egretProto__.copySpecialProps = function (uiLabel) {
            _super.prototype.copySpecialProps.call(this, uiLabel);
            this.setFontName(uiLabel.getFontName());
            this.setFontSize(uiLabel.getFontSize());
            this.setAreaSize(uiLabel.width, uiLabel.height);
            this.setHAlign(uiLabel.getHAlign());
            this.setVAlign(uiLabel.getVAlign());
            this.color = uiLabel.color;
            this.setText(uiLabel.getText());
            this.setAutoSizeWidth(uiLabel._nodeOption.autoSizeWidth);
            this.setAutoSizeHeight(uiLabel._nodeOption.autoSizeHeight);
        };
        __egretProto__.format = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, nodeOption = self._nodeOption;
            var str = nodeOption.str4Format;
            if (!str) {
                str = nodeOption.str4Format = self.getText();
            }
            var arr = Array.prototype.slice.apply(arguments);
            arr.splice(0, 0, str);
            str = mo.formatStr.apply(mo, arr);
            self.setText(str);
        };
        __egretProto__.setOption = function (option) {
            if (option == null)
                return option;
            var self = this, nodeOption = self._nodeOption;
            var ubbParser = nodeOption.ubbParser;
            if (!ubbParser) {
                ubbParser = nodeOption.ubbParser = new mo.UBBParser();
            }
            var option = _super.prototype.setOption.call(this, option);
            if (option.value != null) {
                var value = option.value.toString();
                if (option.autoResize != null)
                    self.setAutoSizeHeight(option.autoResize);
                var color;
                if (option.color != null) {
                    if (typeof option.color == "string") {
                        color = cc.hexToColor(option.color);
                    }
                    else {
                        color = option.color;
                    }
                }
                if (option.fontSize != null)
                    self.setFontSize(option.fontSize);
                if (color != null)
                    self.color = color;
                if (option.fontName)
                    self.setFontName(option.fontName);
                if (ubbParser.checkIsExitUBB(value)) {
                    ubbParser.resetDefault(self.getFontSize(), self.getFontName(), self.color);
                    value = ubbParser.ubb2TextFlow(value);
                }
                if (option.hAlign)
                    self.setHAlign(option.hAlign);
                if (option.vAlign)
                    self.setVAlign(option.vAlign);
                self.setText(value);
            }
            return option;
        };
        __egretProto__.setAutoSizeHeight = function (aH) {
            var self = this, nodeOption = self._nodeOption;
            nodeOption.autoSizeHeight = aH;
            if (aH) {
                nodeOption.textRenderer.height = NaN;
            }
        };
        __egretProto__.setAutoSizeWidth = function (aW) {
            var self = this, nodeOption = self._nodeOption;
            nodeOption.autoSizeWidth = aW;
            if (aW) {
                nodeOption.textRenderer.width = NaN;
            }
        };
        __egretProto__.setInterval = function (cb, target) {
            var self = this, nodeOption = self._nodeOption, inv = nodeOption.inv;
            mo.debug("setInterval", self.__className, self.name);
            if (inv)
                mo.timer.removeInvocation(inv);
            nodeOption.passedMillisecond = 0; //强制赋值
            self.setText("00:00");
            var inv = nodeOption.inv = mo.timer.setInterval(function (millisecond) {
                nodeOption.passedMillisecond += millisecond;
                this.setText(mo.getTimeStr(nodeOption.passedMillisecond));
                if (cb)
                    cb.call(target, millisecond, this);
            }, self);
            return inv;
        };
        __egretProto__.countdown = function (millisecond, callback, target, endCallback, endTarget) {
            var self = this, nodeOption = self._nodeOption, inv = nodeOption.inv;
            mo.debug("countdown", self.__className, self.name);
            var l = arguments.length;
            if (l == 3) {
                endTarget = target;
                endCallback = callback;
                callback = null;
                target = null;
            }
            else if (l == 2) {
                endTarget = null;
                endCallback = callback;
                target = null;
                callback = null;
            }
            if (inv)
                mo.timer.removeInvocation(inv);
            var inv = nodeOption.inv = mo.timer.countdown(millisecond, function (leftMillisecond) {
                self.setText(mo.getTimeStr(leftMillisecond));
                if (callback)
                    callback.call(target, leftMillisecond, this);
            }, self, endCallback, endTarget);
            return inv;
        };
        __egretProto__.countdownToEndTime = function (endTime, callback, target, endCallback, endTarget) {
            var self = this, nodeOption = self._nodeOption, inv = nodeOption.inv;
            mo.debug("countdownToEndTime", self.__className, self.name);
            var l = arguments.length;
            if (l == 3) {
                endCallback = callback;
                endTarget = target;
                callback = null;
                target = null;
            }
            if (inv)
                mo.timer.removeInvocation(inv);
            var inv = nodeOption.inv = mo.timer.countdownToEndTime(endTime, function (leftMillisecond) {
                self.setText(mo.getTimeStr(leftMillisecond));
                if (callback)
                    callback.call(target, leftMillisecond, this);
            }, self, endCallback, endTarget);
            return inv;
        };
        __egretProto__.countdownLoopToEndTime = function (endTime, interval, callback, target, intervalCallback, intervalTarget, endCallback, endTarget) {
            var self = this, nodeOption = self._nodeOption, inv = nodeOption.inv;
            mo.debug("countdownLoopToEndTime", self.__className, self.name);
            if (inv)
                mo.timer.removeInvocation(inv);
            var inv = nodeOption.inv = mo.timer.countdownLoopToEndTime(endTime, interval, function (leftMillisecond) {
                self.setText(mo.getTimeStr(leftMillisecond));
                if (callback)
                    callback.call(target, leftMillisecond, this);
            }, self, intervalCallback, intervalTarget, endCallback, endTarget);
            return inv;
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this, nodeOption = self._nodeOption, inv = nodeOption.inv;
            if (inv) {
                mo.timer.removeInvocation(inv);
                mo.debug("mo.timer.removeInvocation(inv)", self.__className, self.name);
            }
            nodeOption.inv = null;
        };
        UIText.__className = "UIText";
        UIText.NODE_OPTION_CLASS = mo._UITextOption;
        return UIText;
    })(mo.UIWidget);
    mo.UIText = UIText;
    UIText.prototype.__class__ = "mo.UIText";
})(mo || (mo = {}));
