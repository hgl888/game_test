/**
 * Created by lihex on 12/24/14.
 */
var mo;
(function (mo) {
    var UbbTextElement = (function () {
        function UbbTextElement(text, color, fontSize, font) {
            if (text === void 0) { text = ""; }
            if (color === void 0) { color = 0xffffff; }
            if (fontSize === void 0) { fontSize = 42; }
            if (font === void 0) { font = "微软雅黑"; }
            this.text = text;
            this.color = color;
            this.fontSize = fontSize;
            this.font = font;
        }
        var __egretProto__ = UbbTextElement.prototype;
        __egretProto__.setValue = function (k, v) {
            var self = this;
            switch (k) {
                case "text":
                    this.text = v;
                    break;
                case "color":
                    this.color = self._convertColorFromStr(v);
                    break;
                case "size":
                    this.fontSize = v;
                    break;
                case "font":
                    this.font = v;
                    break;
                default:
                    mo.warn("未知的属性：", k);
                    break;
            }
        };
        __egretProto__.toTextFlowElement = function () {
            var e = {};
            if (this.text == UBBParser.LINE_BREAK_TAG) {
                e.text = "\n";
            }
            else {
                e.text = this.text;
                e.style = { "textColor": this.color, "size": this.fontSize, "fontFamily": this.font };
            }
            return e;
        };
        __egretProto__._convertColorFromStr = function (color) {
            switch (color.toLowerCase()) {
                case "white":
                    return cc.WHITE;
                    break;
                case "yellow":
                    return cc.YELLOW;
                    break;
                case "blue":
                    return cc.BLUE;
                    break;
                case "green":
                    return cc.GREEN;
                    break;
                case "red":
                    return cc.RED;
                    break;
                case "magenta":
                    return cc.MAGENTA;
                    break;
                case "black":
                    return cc.BLACK;
                    break;
                case "orange":
                    return cc.ORANGE;
                    break;
                case "gray":
                    return cc.GRAY;
                    break;
                default:
                    if (color.indexOf("#") != -1) {
                        return cc.hexToColor(color);
                    }
                    else {
                        return parseInt(color);
                    }
                    break;
            }
        };
        return UbbTextElement;
    })();
    mo.UbbTextElement = UbbTextElement;
    UbbTextElement.prototype.__class__ = "mo.UbbTextElement";
    var UBBParser = (function () {
        function UBBParser(defaultFntSize, defaultFntName, defaultColor) {
            if (defaultFntSize === void 0) { defaultFntSize = 42; }
            if (defaultFntName === void 0) { defaultFntName = "微软雅黑"; }
            if (defaultColor === void 0) { defaultColor = 0xffffff; }
            this.resetDefault(defaultFntSize, defaultFntName, defaultColor);
        }
        var __egretProto__ = UBBParser.prototype;
        UBBParser.getInstance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var Class = this;
            if (!Class._instance) {
                var instance = Class._instance = new UBBParser();
                instance.resetDefault.apply(instance, arguments);
                instance._isInstance = true;
            }
            return Class._instance;
        };
        __egretProto__.resetDefault = function (defaultFntSize, defaultFntName, defaultColor) {
            if (defaultFntSize === void 0) { defaultFntSize = 42; }
            if (defaultFntName === void 0) { defaultFntName = "微软雅黑"; }
            if (defaultColor === void 0) { defaultColor = 0xffffff; }
            this._defFontSize = defaultFntSize;
            this._defFontName = defaultFntName;
            this._defColor = defaultColor;
            this._ubbElements = [];
        };
        __egretProto__.ubb2TextFlow = function (str) {
            if (this.checkIsExitUBB(str)) {
                var arr = [];
                this._ubbElements = [];
                this._parseUBB(str);
                for (var i = 0, li = this._ubbElements.length; i < li; i++) {
                    arr.push(this._ubbElements[i].toTextFlowElement());
                }
                return arr;
            }
            else {
                return str;
            }
        };
        __egretProto__._parseUBB = function (str) {
            var ubbParseReg = /^[^\[]+|\[ubb[^\[]+\[\/ubb\]|[^\]]+$|[^\[\]]+/g;
            var brArr = str.split(UBBParser.LINE_BREAK_TAG), ubb;
            for (var i = 0; i < brArr.length; i++) {
                var br = brArr[i];
                if (br == null)
                    continue;
                // 需要换行
                if (i > 0)
                    this._ubbElements.push(new UbbTextElement(UBBParser.LINE_BREAK_TAG));
                if (br == "") {
                    this._ubbElements.push(new UbbTextElement(" "));
                    continue;
                }
                ubb = br.match(ubbParseReg);
                for (var j = 0; j < ubb.length; j++) {
                    var obj = ubb[j], eleObj;
                    if (this.checkIsExitUBB(obj)) {
                        eleObj = this._splitUbbAttr(obj);
                        eleObj["text"] = this._parseTextFromStr(obj);
                    }
                    else {
                        eleObj = new UbbTextElement(obj, this._defColor, this._defFontSize, this._defFontName);
                    }
                    this._ubbElements.push(eleObj);
                }
            }
        };
        __egretProto__._parseTextFromStr = function (ubbStr) {
            var ubbTextReg = /\](.+)\[/gi;
            var result = ubbTextReg.exec(ubbStr);
            return result ? result[1] : null;
        };
        __egretProto__._splitUbbAttr = function (str) {
            var ele = new UbbTextElement("", this._defColor, this._defFontSize, this._defFontName);
            var ubbStr = str.match(/[^\s]+=[^\s\]]+/ig);
            if (ubbStr) {
                for (var i = 0; i < ubbStr.length; i++) {
                    var str = ubbStr[i];
                    var attr = str.split("=");
                    ele.setValue(attr[0], attr[1]);
                }
            }
            return ele;
        };
        __egretProto__.checkIsExitUBB = function (str) {
            return (str.indexOf(UBBParser.UBB_TAG) !== -1) || (str.indexOf(UBBParser.LINE_BREAK_TAG) !== -1);
        };
        UBBParser.LINE_BREAK_TAG = "[/br]";
        UBBParser.UBB_TAG = "/ubb]";
        return UBBParser;
    })();
    mo.UBBParser = UBBParser;
    UBBParser.prototype.__class__ = "mo.UBBParser";
})(mo || (mo = {}));
