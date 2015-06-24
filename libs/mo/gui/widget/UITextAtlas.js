var mo;
(function (mo) {
    var UITextAtlas = (function (_super) {
        __extends(UITextAtlas, _super);
        function UITextAtlas(str, textureFile, itemWidth, itemHeight, startCharMap) {
            _super.call(this);
            if (str != null)
                this.setProperty.apply(this, arguments);
        }
        var __egretProto__ = UITextAtlas.prototype;
        __egretProto__.setProperty = function (str, textureFile, itemWidth, itemHeight, startCharMap) {
            if (itemWidth === void 0) { itemWidth = 0; }
            if (itemHeight === void 0) { itemHeight = 0; }
            if (startCharMap === void 0) { startCharMap = " "; }
            var self = this, nodeOption = self._nodeOption;
            nodeOption.textureFile = textureFile;
            var texture = res.getRes(textureFile);
            nodeOption.spriteSheet = res.getRes(textureFile + ".SpriteSheet");
            nodeOption.string = str;
            nodeOption.itemWidth = itemWidth;
            nodeOption.itemHeight = itemHeight;
            nodeOption.mapStartChar = startCharMap;
            nodeOption.itemsPerColumn = Math.round(texture.textureHeight / nodeOption.itemHeight);
            nodeOption.itemsPerRow = Math.round(texture.textureWidth / nodeOption.itemWidth);
            self.setText(str);
            if (!nodeOption.spriteSheet) {
                nodeOption.spriteSheet = new egret.SpriteSheet(texture);
                self._updateSpriteSheet();
            }
        };
        __egretProto__._updateSpriteSheet = function () {
            var self = this, nodeOption = self._nodeOption, resKey = nodeOption.textureFile + ".SpriteSheet";
            if (res._pool[resKey])
                return;
            console.log("_updateSpriteSheet");
            var texture_scale_factor = egret.MainContext.instance.rendererContext.texture_scale_factor;
            var locItemWidth = nodeOption.itemWidth / texture_scale_factor, locItemHeight = nodeOption.itemHeight / texture_scale_factor, firstCharCode = nodeOption.mapStartChar.charCodeAt(0), itemsPerColumn = nodeOption.itemsPerColumn, itemsPerRow = nodeOption.itemsPerRow;
            var spriteSheet = nodeOption.spriteSheet, word;
            for (var i = 0; i < itemsPerColumn; i++) {
                for (var j = 0; j < itemsPerRow; j++) {
                    word = String.fromCharCode(firstCharCode + i * itemsPerRow + j);
                    spriteSheet.createTexture(word, j * locItemWidth, i * locItemHeight, locItemWidth, locItemHeight);
                }
            }
            res._pool[resKey] = spriteSheet;
        };
        __egretProto__._render = function (renderContext) {
            var self = this, nodeOption = self._nodeOption;
            var locString = nodeOption.string;
            var n = locString.length;
            var renderFilter = egret.RenderFilter.getInstance();
            var texture, spriteSheet = nodeOption.spriteSheet;
            var xPos = 0;
            for (var i = 0; i < n; i++) {
                var word = locString[i];
                texture = spriteSheet.getTexture(word);
                var bitmapWidth = texture._bitmapWidth || texture._textureWidth;
                var bitmapHeight = texture._bitmapHeight || texture._textureHeight;
                this._texture_to_render = texture;
                renderFilter.drawImage(renderContext, this, texture._bitmapX, texture._bitmapY, bitmapWidth, bitmapHeight, xPos + texture._offsetX, texture._offsetY, bitmapWidth, bitmapHeight);
                xPos += texture._textureWidth;
            }
            this._texture_to_render = null;
        };
        __egretProto__.getText = function () {
            return this._nodeOption.string;
        };
        __egretProto__.setText = function (label) {
            var self = this;
            var nodeOption = self._nodeOption;
            nodeOption.string = label;
            var locItemWidth = nodeOption.itemWidth, locItemHeight = nodeOption.itemHeight;
            var len = label.length;
            self._setWidth(len * locItemWidth);
            self._setHeight(locItemHeight);
        };
        __egretProto__.copySpecialProps = function (labelAtlas) {
            var nodeOption2 = labelAtlas._nodeOption;
            this.setProperty(nodeOption2.string, nodeOption2.textureFile, nodeOption2.itemWidth, nodeOption2.itemHeight, nodeOption2.mapStartChar);
        };
        __egretProto__.setOption = function (option) {
            if (option == null)
                return option;
            var self = this;
            option = _super.prototype.setOption.call(this, option);
            if (option.value != null)
                self.setText(option.value + "");
            return option;
        };
        UITextAtlas.__className = "UITextAtlas";
        UITextAtlas.NODE_OPTION_CLASS = mo._UITextAtlasOption;
        return UITextAtlas;
    })(mo.UIWidget);
    mo.UITextAtlas = UITextAtlas;
    UITextAtlas.prototype.__class__ = "mo.UITextAtlas";
})(mo || (mo = {}));
