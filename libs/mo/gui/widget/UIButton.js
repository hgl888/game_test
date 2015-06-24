var mo;
(function (mo) {
    var UIButton = (function (_super) {
        __extends(UIButton, _super);
        function UIButton() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIButton.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._buttonOption = new mo._UIButtonOption();
            self._properties = new egret.TextFieldProperties;
            self._setTouchEnabled(true);
        };
        /**
         * 加载资源
         * @param normal
         * @param selected
         * @param disabled
         */
        __egretProto__.loadTextures = function (normal, selected, disabled) {
            if (selected == null || selected == "") {
                selected = normal;
            }
            if (disabled == null || disabled == "") {
                disabled = normal;
            }
            var self = this;
            async.parallel([
                function (cb1) {
                    self.loadTextureNormal(normal, cb1);
                },
                function (cb1) {
                    self.loadTexturePressed(selected, cb1);
                },
                function (cb1) {
                    self.loadTextureDisabled(disabled, cb1);
                }
            ], function () {
                var buttonOption = self._buttonOption;
                var currIndex = buttonOption.currentIndex;
                currIndex = currIndex == null ? 0 : currIndex;
                var texture = buttonOption.textures[currIndex];
                self._buttonTexture = texture;
                self._setWidth(texture.textureWidth);
                self._setHeight(texture.textureHeight);
            });
        };
        /**
         * @param texture
         * @param index
         * @param cb
         * @param ctx
         * @private
         */
        __egretProto__._setBitmapTexture = function (texture, index, cb, ctx) {
            var self = this, buttonOption = self._buttonOption;
            res.getStatusRes(texture, function (resData) {
                buttonOption.setTexture(index, resData);
                self.setSize(resData.textureWidth, resData.textureHeight);
                if (cb)
                    cb.call(ctx);
            }, self, egret.Texture);
        };
        /**
         * 加载正常状态资源
         * @param texture
         * @param cb
         * @param ctx
         */
        __egretProto__.loadTextureNormal = function (texture, cb, ctx) {
            this._setBitmapTexture(texture, 0, cb, ctx);
        };
        /**
         * 加载被按下去状态资源
         * @param texture
         * @param cb
         * @param ctx
         */
        __egretProto__.loadTexturePressed = function (texture, cb, ctx) {
            this._setBitmapTexture(texture, 1, cb, ctx);
        };
        /**
         * 加载禁用状态资源
         * @param texture
         * @param cb
         * @param ctx
         */
        __egretProto__.loadTextureDisabled = function (texture, cb, ctx) {
            this._setBitmapTexture(texture, 2, cb, ctx);
        };
        /**
         * @Override
         */
        __egretProto__._onPressStateChanged = function (index) {
            var self = this, buttonOption = self._buttonOption;
            var textures = buttonOption.textures;
            if (textures.length > 0) {
                var texture = textures[index] || textures[0];
                self._buttonTexture = texture;
                self._setWidth(texture.textureWidth);
                self._setHeight(texture.textureHeight);
            }
            buttonOption.currentIndex = index;
            if (buttonOption.pressedActionEnabled) {
                var seq;
                if (index == 0) {
                    var oldScale = buttonOption.oldScale || mo.p(1, 1);
                    var scaleToAct = mo.scaleTo(0.03, oldScale.x, oldScale.y);
                    var callFunc = mo.callFunc(function () {
                        buttonOption.act = null;
                    });
                    if (buttonOption.act) {
                        self.stopAction(buttonOption.act);
                    }
                    seq = buttonOption.act = mo.sequence(scaleToAct, callFunc);
                    self.runAction(seq);
                }
                else if (index == 1) {
                    var oldScale = buttonOption.oldScale;
                    if (buttonOption.act) {
                        self.stopAction(buttonOption.act);
                        if (oldScale) {
                            self.scaleX = oldScale.x;
                            self.scaleY = oldScale.y;
                        }
                    }
                    if (!oldScale) {
                        oldScale = buttonOption.oldScale = mo.p(0, 0);
                        oldScale.x = self.scaleX;
                        oldScale.y = self.scaleY;
                    }
                    seq = buttonOption.act = mo.scaleTo(0.03, 1.1 * self.scaleX, 1.1 * self.scaleY);
                    self.runAction(seq);
                }
            }
        };
        /**
         * @Override
         */
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            var self = this, oldScale = self._buttonOption.oldScale;
            if (oldScale) {
                self.scaleX = oldScale.x;
                self.scaleY = oldScale.y;
                self._buttonOption.oldScale = null;
            }
        };
        /**
         * 按钮被点击是否能缩放
         * @param {Boolean} enabled
         */
        __egretProto__.setPressedActionEnabled = function (enabled) {
            this._buttonOption.pressedActionEnabled = enabled;
        };
        /**
         * 标题的位置百分比
         * @param point
         * @param y
         */
        __egretProto__.setTitlePosByPercent = function (point, y) {
            var self = this, buttonOption = self._buttonOption;
            if (arguments.length === 1) {
                y = point.y;
                point = point.x;
            }
            var titlePosByPercent = buttonOption.titlePosByPercent;
            titlePosByPercent._setX(point);
            titlePosByPercent._setY(y);
            buttonOption.textDirty = true;
        };
        /**
         * 设置标题文本
         * @param {String} text
         */
        __egretProto__.setTitleText = function (text) {
            var self = this, buttonOption = self._buttonOption, properties = self._properties;
            properties._text = text;
            buttonOption.textDirty = true;
        };
        /**
         * 获取标题文本
         * @returns {String} text
         */
        __egretProto__.getTitleText = function () {
            return this._properties._text;
        };
        __egretProto__._setStroke = function (value, lineSize) {
            var self = this, buttonOption = self._buttonOption, properties = self._properties;
            if (properties._strokeColor != value) {
                properties._strokeColor = value;
                properties._strokeColorString = egret.toColorString(value);
                buttonOption.textDirty = true;
            }
            properties._stroke = lineSize;
        };
        /**
         * 设置标题颜色
         * @param {number} color
         */
        __egretProto__.setTitleColor = function (color) {
            var self = this, buttonOption = self._buttonOption, properties = self._properties;
            if (properties._textColor != color) {
                properties._textColor = color;
                properties._textColorString = egret.toColorString(color);
            }
            buttonOption.textDirty = true;
        };
        /**
         * 获取标题颜色
         * @returns {number}
         */
        __egretProto__.getTitleColor = function () {
            return this._properties._textColor;
        };
        /**
         * 设置标题描边颜色，颜色值同setColor
         * @param color
         * @param lineSize
         */
        __egretProto__.enableStroke = function (color, lineSize) {
            if (lineSize === void 0) { lineSize = 2; }
            this._setStroke(color, lineSize);
        };
        /**
         * 禁用标题描边
         */
        __egretProto__.disableStroke = function () {
            this._setStroke(0, 0);
        };
        /**
         * 设置标题字体大小
         * @param {Number} size
         */
        __egretProto__.setTitleFontSize = function (size) {
            var self = this, buttonOption = self._buttonOption, properties = self._properties;
            properties._size = size;
            buttonOption.textDirty = true;
        };
        /**
         * 获取标题字体大小
         * @returns {Number}
         */
        __egretProto__.getTitleFontSize = function () {
            return this._properties._size;
        };
        /**
         * 设置标题字体大小
         * @param {String} fontName
         */
        __egretProto__.setTitleFontName = function (fontName) {
            var self = this, buttonOption = self._buttonOption, properties = self._properties;
            properties._fontFamily = fontName;
            buttonOption.textDirty = true;
        };
        /**
         * 获取标题字体大小
         * @returns {String}
         */
        __egretProto__.getTitleFontName = function () {
            return this._properties._fontFamily;
        };
        /**
         * 置灰
         * @param isGray
         */
        __egretProto__.setGray = function (isGray) {
            _super.prototype.setGray.call(this, isGray);
            var self = this;
            self.touchEnabled = !isGray;
        };
        /**
         * 专门给WEBGL用的啊亲，这是一个HACK!
         * @returns {boolean}
         */
        __egretProto__._makeBitmapCache = function () {
            return egret.TextField.prototype._makeBitmapCache.call(this);
        };
        __egretProto__._draw = function (renderContext) {
            var self = this, buttonOption = self._buttonOption, properties = self._properties;
            if (properties._text && buttonOption.textDirty) {
                buttonOption.textDirty = false;
                var rendererContext = egret.MainContext.instance.rendererContext;
                rendererContext.setupFont(self);
                buttonOption.textWidth = rendererContext.measureText(properties._text);
                var mc = egret.MainContext;
                if (mc.runtimeType == mc.RUNTIME_HTML5) {
                    self._cacheAsBitmap = true;
                }
            }
            egret.DisplayObject.prototype._draw.call(self, renderContext);
        };
        __egretProto__._render = function (renderContext) {
            var self = this, texture = self._buttonTexture;
            if (!texture) {
                self._texture_to_render = null;
                return;
            }
            self._texture_to_render = texture;
            var buttonOption = self._buttonOption, properties = self._properties;
            var destW = self._hasWidthSet ? self._explicitWidth : texture._textureWidth;
            var destH = self._hasHeightSet ? self._explicitHeight : texture._textureHeight;
            //画按钮纹理
            if (texture) {
                egret.Bitmap._drawBitmap(renderContext, destW, destH, self);
            }
            //画按钮文本
            var text = properties._text;
            if (text && text != "") {
                var posPercent = buttonOption.titlePosByPercent;
                var x = destW * posPercent.x - buttonOption.textWidth / 2;
                var y = destH * posPercent.y;
                renderContext.drawText(self, text, x, y, 0);
            }
            _super.prototype._render.call(this, renderContext);
        };
        /**
         * @Override
         * 设置特殊属性
         */
        __egretProto__.copySpecialProps = function (uiButton) {
            var self = this, buttonOption1 = self._buttonOption, buttonOption2 = uiButton._buttonOption;
            var textures1 = buttonOption1.textures, textures2 = buttonOption2.textures;
            textures1[0] = textures2[0];
            textures1[1] = textures2[1];
            textures1[2] = textures2[2];
            self.setTitleText(uiButton.getTitleText());
            self.setTitleFontName(uiButton.getTitleFontName());
            self.setTitleFontSize(uiButton.getTitleFontSize());
            self.setTitleColor(uiButton.getTitleColor());
            self.setPressedActionEnabled(buttonOption2.pressedActionEnabled);
        };
        //+++++++++++++++++++++++++++extend 开始++++++++++++++++++++++++
        __egretProto__.setOption = function (option) {
            if (option == null)
                return option;
            var self = this;
            option = _super.prototype.setOption.call(this, option);
            if (option.value != null) {
                var value = option.value;
                self.setTitleText(value);
            }
            return option;
        };
        __egretProto__.setButtonImg = function (frameName) {
            var self = this;
            self.loadTextures(frameName, frameName, frameName);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            this._buttonOption.doDtor();
        };
        __egretProto__.reset = function () {
            _super.prototype.reset.call(this);
            this._buttonOption.reset();
        };
        UIButton.__className = "UIButton";
        return UIButton;
    })(mo.UIWidget);
    mo.UIButton = UIButton;
    UIButton.prototype.__class__ = "mo.UIButton";
})(mo || (mo = {}));
