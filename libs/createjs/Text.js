var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/1/22.
 */
var createjs;
(function (createjs) {
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text(text, font, color) {
            if (text === void 0) { text = ''; }
            if (font === void 0) { font = ''; }
            if (color === void 0) { color = '#0'; }
            _super.call(this);
            this.id = G.getId();
            this.multiline = true;
            this.text = text;
            var mycolor = Text.parseColor(color);
            this.textColor = mycolor.color;
            var ar = font.match(/(\d{1,})px (.*)/);
            if (ar[1])
                this.size = parseInt(ar[1]);
            if (ar[2])
                this.fontFamily = ar[2];
        }
        Object.defineProperty(Text.prototype, "color", {
            set: function (value) {
                var mycolor = Text.parseColor(value);
                this.textColor = mycolor.color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "shadow", {
            set: function (param) {
                var mycolor = Text.parseColor(param.color);
                this.strokeColor = mycolor.color;
                this.stroke = Math.max(1, param.blur - 4);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "lineHeight", {
            set: function (value) {
                //this.size=value-2;
                //this.height=value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "lineWidth", {
            set: function (value) {
                //this.size=value-2;
                this.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Text.prototype, "x", {
            set: function (value) {
                if (this.textAlign == 'center') {
                    _super.prototype._setX.call(this, value - this.width * 0.5);
                }
                else {
                    _super.prototype._setX.call(this, value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Text.prototype.setTransform = function (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
            if (skewX === void 0) { skewX = 0; }
            if (skewY === void 0) { skewY = 0; }
            if (regX === void 0) { regX = 0; }
            if (regY === void 0) { regY = 0; }
            this.x = x || 0;
            this.y = y || 0;
            this.scaleX = scaleX == null ? 1 : scaleX;
            this.scaleY = scaleY == null ? 1 : scaleY;
            this.rotation = rotation || 0;
            this.skewX = skewX || 0;
            this.skewY = skewY || 0;
            this.anchorX = (regX || 0) / this.width;
            this.anchorY = (regY || 0) / this.height;
            return this;
        };
        Text.parseColor = function (color) {
            var mycolor = { color: 0x0, alpha: 1 };
            if (color.charAt(0) == '#') {
                mycolor.color = parseInt(color.substr(1, 6), 16);
            }
            else {
                var temp = color.substring(color.indexOf('(') + 1, color.indexOf(')'));
                var ar = temp.split(",");
                mycolor.color = parseInt(ar[0]) * 0x010000 + parseInt(ar[1]) * 0x000100 + parseInt(ar[2]);
                mycolor.alpha = parseFloat(ar[3]);
            }
            return mycolor;
        };
        return Text;
    })(egret.TextField);
    createjs.Text = Text;
    Text.prototype.__class__ = "createjs.Text";
    var Shadow = (function () {
        function Shadow(color, offsetX, offsetY, blur) {
            this.color = color;
            this.offsetX = offsetX;
            this.offsetY = offsetY;
            this.blur = blur;
        }
        return Shadow;
    })();
    createjs.Shadow = Shadow;
    Shadow.prototype.__class__ = "createjs.Shadow";
})(createjs || (createjs = {}));
