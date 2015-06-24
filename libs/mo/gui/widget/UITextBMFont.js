var mo;
(function (mo) {
    var UITextBMFont = (function (_super) {
        __extends(UITextBMFont, _super);
        function UITextBMFont() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UITextBMFont.prototype;
        //@override
        __egretProto__._initProp = function () {
            var self = this;
            self._bitmapTextRenderer = new egret.BitmapText();
            self._bitmapTextRenderer._setAnchorX(0);
            self._bitmapTextRenderer._setAnchorY(0);
            _super.prototype._initProp.call(this);
            self._fntFileName = "";
        };
        __egretProto__.initRenderer = function () {
            this.addChild(this._bitmapTextRenderer);
        };
        __egretProto__.setFntFile = function (fileName) {
            this._fntFileName = fileName;
            this._bitmapTextRenderer.font = res.getRes(fileName);
            this._labelBMFontScaleChangedWithSize();
            this.setText(this._bitmapTextRenderer.text);
        };
        __egretProto__.setText = function (value) {
            this._bitmapTextRenderer.text = value;
            this._labelBMFontScaleChangedWithSize();
        };
        __egretProto__.getText = function () {
            return this._bitmapTextRenderer.text;
        };
        __egretProto__._onNodeSizeDirty = function () {
            _super.prototype._onNodeSizeDirty.call(this);
            this._labelBMFontScaleChangedWithSize();
        };
        __egretProto__.getRenderer = function () {
            return this._bitmapTextRenderer;
        };
        __egretProto__._labelBMFontScaleChangedWithSize = function () {
            var self = this;
            if (self._nodeOption.ignoreSize) {
                self._bitmapTextRenderer.scaleX = 1;
                self._bitmapTextRenderer.scaleY = 1;
                var labelBmfont = self._bitmapTextRenderer;
                self.width = labelBmfont.width;
                self.height = labelBmfont.height;
            }
            else {
                var labelBmfont = self._bitmapTextRenderer;
                var scaleX = self.width / labelBmfont.width;
                var scaleY = self.height / labelBmfont.height;
                self._bitmapTextRenderer.scaleX = scaleX;
                self._bitmapTextRenderer.scaleY = scaleY;
            }
        };
        __egretProto__.copySpecialProps = function (labelBMFont) {
            this.setFntFile(labelBMFont._fntFileName);
            this.setText(labelBMFont._bitmapTextRenderer.text);
        };
        UITextBMFont.__className = "UITextBMFont";
        return UITextBMFont;
    })(mo.UIWidget);
    mo.UITextBMFont = UITextBMFont;
    UITextBMFont.prototype.__class__ = "mo.UITextBMFont";
})(mo || (mo = {}));
