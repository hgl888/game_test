var mo;
(function (mo) {
    var UIImage = (function (_super) {
        __extends(UIImage, _super);
        function UIImage() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIImage.prototype;
        /**
         * fillMode
         */
        __egretProto__._setFillMode = function (fillMode) {
            this._nodeOption.fillMode = fillMode;
        };
        Object.defineProperty(__egretProto__, "fillMode", {
            get: function () {
                return this._nodeOption.fillMode;
            },
            set: function (fillMode) {
                this._setFillMode(fillMode);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 是否开启蒙版
         */
        __egretProto__._setMaskEnabled = function (maskEnabled) {
            this._nodeOption.maskEnabled = maskEnabled;
        };
        Object.defineProperty(__egretProto__, "maskEnabled", {
            get: function () {
                return this._nodeOption.maskEnabled;
            },
            set: function (maskEnabled) {
                this._setMaskEnabled(maskEnabled);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @deprecated
         * @param maskEnabled
         */
        __egretProto__.setMaskEnabled = function (maskEnabled) {
            this._setMaskEnabled(maskEnabled);
        };
        /**
         * @deprecated
         */
        __egretProto__.isMaskEnabled = function () {
            return this._nodeOption.maskEnabled;
        };
        __egretProto__._onStatic4Img = function (texture) {
            var self = this, nodeOption = self._nodeOption, lastOption = self._lastOption, visibleKey = "visible", ltInfo = nodeOption.lastTextureInfo;
            lastOption.resetToLast(visibleKey);
            nodeOption.texture = texture;
            self._makeMaskedTexture();
            var cb = ltInfo[1], ctx = ltInfo[1];
            while (ltInfo.length > 1) {
                ltInfo.pop();
            }
            if (cb)
                cb.call(ctx);
        };
        __egretProto__._onBeforeLoad4Img = function () {
            var self = this, lastOption = self._lastOption, nodeOption = self._nodeOption;
            if (!nodeOption.isTextureFade) {
                lastOption.initLastValue("visible", false);
            }
        };
        __egretProto__._onAfterLoad4Img = function (texture) {
            var self = this, nodeOption = self._nodeOption, lastOption = self._lastOption, visibleKey = "visible", ltInfo = nodeOption.lastTextureInfo;
            //if(!lastOption.isEnabled(visibleKey)) {
            //    return;
            //}
            lastOption.resetToLast(visibleKey);
            nodeOption.texture = texture;
            self._setWidth(texture.textureWidth);
            self._setHeight(texture.textureHeight);
            self._makeMaskedTexture();
            //if(!nodeOption.isTextureFade){
            //    var fadeTextureAct:egret.action.Action = nodeOption.fadeTextureAct;
            //    if(fadeTextureAct){
            //        self.stopAction(fadeTextureAct);
            //        delete nodeOption.fadeTextureAct;
            //    }
            //}
            if (self.visible && !nodeOption.fadeTextureAct) {
                nodeOption.oldAlpha = self.alpha;
                self.setOpacity(0);
                nodeOption.isTextureFade = true;
                var fadeTextureAct = nodeOption.fadeTextureAct = mo.sequence(mo.fadeIn(0.2), mo.callFunc(function () {
                    nodeOption.isTextureFade = false;
                    nodeOption.fadeTextureAct = null;
                    nodeOption.oldAlpha = null;
                }));
                self.runAction(fadeTextureAct);
            }
            var cb = ltInfo[1], ctx = ltInfo[1];
            while (ltInfo.length > 1) {
                ltInfo.pop();
            }
            if (cb)
                cb.call(ctx);
        };
        /**
         * 加载资源，可以是egret.Texture或路径
         * @param {String||egret.Texture} fileName
         * @param {Function} cb
         * @param {Function} target
         */
        __egretProto__.loadTexture = function (fileName, cb, target) {
            var self = this, nodeOption = self._nodeOption;
            var tInfo = nodeOption.textureInfo, ltInfo = nodeOption.lastTextureInfo;
            var preUrl = nodeOption.currUrl;
            var url = fileName == null ? null : (typeof fileName == "string" ? fileName : fileName.url);
            if (!url)
                return;
            var resData = fileName instanceof egret.Texture ? fileName : res.getRes(fileName);
            if (resData) {
                if (preUrl == url) {
                    nodeOption.currUrl = url;
                    if (nodeOption.oldAlpha) {
                        self.alpha = nodeOption.oldAlpha;
                        nodeOption.oldAlpha = null;
                    }
                    if (cb)
                        cb.call(target);
                    return;
                }
                //如果资源已经存在，则设置大小
                self._setWidth(resData.textureWidth);
                self._setHeight(resData.textureHeight);
            }
            ltInfo[0] = fileName;
            ltInfo[1] = cb;
            ltInfo[2] = target;
            if (!nodeOption.isEnter) {
                tInfo[0] = fileName;
                tInfo[1] = cb;
                tInfo[2] = target;
                return;
            }
            else {
                tInfo.length = 0;
            }
            nodeOption.currUrl = url;
            res.load4Dynamic(self, self.__className, url, preUrl);
        };
        //@override
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this, nodeOption = self._nodeOption, tInfo = nodeOption.textureInfo;
            nodeOption.isExit = false;
            //nodeOption.isEnter = true;
            //if(tInfo.length > 0){//如果有，则进行加载
            //    self.loadTexture.apply(self, tInfo);
            //}
            egret.callLater(function () {
                if (nodeOption.isExit)
                    return;
                nodeOption.isEnter = true;
                if (tInfo.length > 0) {
                    //var fadeTextureAct = nodeOption.fadeTextureAct;
                    //if (fadeTextureAct) {
                    //    self.stopAction(fadeTextureAct);
                    //    delete nodeOption.fadeTextureAct;
                    //}
                    //nodeOption.isTextureFade = false;
                    self.loadTexture.apply(self, tInfo);
                }
            }, null);
        };
        //@override
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            //如果加载了个动态图了，那么就先进行一次释放
            var self = this, nodeOption = self._nodeOption, tInfo = nodeOption.textureInfo, ltInfo = nodeOption.lastTextureInfo;
            nodeOption.isEnter = false;
            nodeOption.isExit = true;
            tInfo.length = 0;
            while (ltInfo.length > 1) {
                ltInfo.pop();
            }
            tInfo[0] = ltInfo[0];
            var fadeTextureAct = nodeOption.fadeTextureAct;
            if (fadeTextureAct) {
                self.stopAction(fadeTextureAct);
                delete nodeOption.fadeTextureAct;
            }
            nodeOption.isTextureFade = false;
            if (nodeOption.oldAlpha) {
                self.alpha = nodeOption.oldAlpha;
                nodeOption.oldAlpha = null;
            }
            var currUrl = nodeOption.currUrl;
            if (currUrl) {
                nodeOption.currUrl = null;
                res.unload4Dynamic(self, self.__className, currUrl);
            }
        };
        /**
         * 设置蒙版Texture
         * @param fileName
         */
        __egretProto__.loadMaskTexture = function (fileName) {
            var self = this, nodeOption = self._nodeOption;
            nodeOption.maskTextureFile = fileName;
        };
        /**
         * @private
         */
        __egretProto__._makeMaskedTexture = function () {
            var self = this, nodeOption = self._nodeOption;
            if (nodeOption.maskTexture) {
                nodeOption.maskTexture.dispose();
                nodeOption.maskTexture = null;
            }
            if (!nodeOption.maskTextureFile || !nodeOption.maskEnabled)
                return;
            var renderTextureContainer = new egret.DisplayObjectContainer();
            var maskSprite = new egret.Bitmap();
            maskSprite.texture = res.getRes(nodeOption.maskTextureFile);
            maskSprite.blendMode = "clear";
            renderTextureContainer.addChild(maskSprite);
            var image = new egret.Bitmap();
            image.texture = nodeOption.texture;
            image.blendMode = "mask";
            renderTextureContainer.addChild(image);
            var renderTexture = new egret.RenderTexture();
            renderTexture.drawToTexture(renderTextureContainer);
            nodeOption.maskTexture = nodeOption.texture = renderTexture;
            return renderTexture;
        };
        //@override
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var rt = this._nodeOption.texture;
            if (rt instanceof egret.RenderTexture) {
                rt.dispose();
            }
        };
        /**
         * 设置特殊属性
         * @Override
         * @param imageView
         */
        __egretProto__.copySpecialProps = function (imageView) {
            var self = this, nodeOption2 = imageView._nodeOption, textureName = nodeOption2.lastTextureInfo[0];
            if (textureName)
                self.loadTexture(textureName);
        };
        //===============extend 开始============
        __egretProto__.setOption = function (option) {
            if (option == null)
                return option;
            var self = this;
            option = _super.prototype.setOption.call(self, option);
            if (option.value) {
                self.loadTexture(option.value);
            }
            return option;
        };
        __egretProto__.setHighLight = function () {
            this.blendMode = egret.BlendMode.ADD;
        };
        __egretProto__._render = function (renderContext) {
            var self = this, texture = self._nodeOption.texture;
            if (texture) {
                self._texture_to_render = texture;
                var destW = self._hasWidthSet ? self._explicitWidth : texture._textureWidth;
                var destH = self._hasHeightSet ? self._explicitHeight : texture._textureHeight;
                egret.Bitmap._drawBitmap(renderContext, destW, destH, self);
            }
            _super.prototype._render.call(this, renderContext);
        };
        UIImage.__className = "UIImage";
        UIImage.NODE_OPTION_CLASS = mo._UIImageOption;
        return UIImage;
    })(mo.UIWidget);
    mo.UIImage = UIImage;
    UIImage.prototype.__class__ = "mo.UIImage";
    res.register4Dynamic(UIImage.__className, "_onStatic4Img", "_onBeforeLoad4Img", "_onAfterLoad4Img");
})(mo || (mo = {}));
