var mo;
(function (mo) {
    var _UIImageOption = (function (_super) {
        __extends(_UIImageOption, _super);
        function _UIImageOption() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = _UIImageOption.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.scale9Enabled = false; //是否开启九宫格
            self.scale9Grid = mo.rect(0, 0, 0, 0); //九宫格区域
            self.prevIgnoreSize = true;
            self.texture = null; //这个只是用于内部进行保存，没有实际去绘制
            self.maskTextureFile = null;
            self.maskEnabled = false;
            self.textureInfo = [];
            self.lastTextureInfo = [];
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            var self = this;
            self.scale9Grid = null; //九宫格区域
            self.texture = null; //这个只是用于内部进行保存，没有实际去绘制
            self.maskTextureFile = null;
            if (self.maskTexture)
                self.maskTexture.dispose();
            self.maskTexture = null;
            self.textureInfo.length = 0;
            self.lastTextureInfo.length = 0;
        };
        return _UIImageOption;
    })(mo._UIWidgetOption);
    mo._UIImageOption = _UIImageOption;
    _UIImageOption.prototype.__class__ = "mo._UIImageOption";
})(mo || (mo = {}));
