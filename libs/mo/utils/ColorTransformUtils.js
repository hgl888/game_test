/**
 * Created by huanghaiying on 15/1/9.
 */
var ColorTransformUtils = (function () {
    function ColorTransformUtils() {
    }
    var __egretProto__ = ColorTransformUtils.prototype;
    ColorTransformUtils.getTransform = function (type) {
        if (ColorTransformUtils._transformMatrix == null) {
            ColorTransformUtils._transformMatrix = {};
        }
        if (!ColorTransformUtils._transformCache.hasOwnProperty(type)) {
            var transform = new egret.ColorTransform();
            transform.matrix = ColorTransformUtils._transformMatrix[type];
            ColorTransformUtils._transformCache[type] = transform;
        }
        return ColorTransformUtils._transformCache[type];
    };
    ColorTransformUtils.addTransform = function (type, matrix) {
        if (ColorTransformUtils._transformMatrix == null) {
            ColorTransformUtils._transformMatrix = {};
        }
        ColorTransformUtils._transformMatrix[type] = matrix;
    };
    ColorTransformUtils._transformCache = {};
    ColorTransformUtils._transformMatrix = null;
    return ColorTransformUtils;
})();
ColorTransformUtils.prototype.__class__ = "ColorTransformUtils";
var ColorTransformType = (function () {
    function ColorTransformType() {
    }
    var __egretProto__ = ColorTransformType.prototype;
    ColorTransformType.gray = 1;
    ColorTransformType.clone = 2;
    ColorTransformType.skillDisabled = 3;
    ColorTransformType.light = 4;
    ColorTransformType.green = 5;
    ColorTransformType.blue = 6;
    ColorTransformType.purple = 7;
    ColorTransformType.fightMask = 8;
    ColorTransformType.death = 9;
    return ColorTransformType;
})();
ColorTransformType.prototype.__class__ = "ColorTransformType";
ColorTransformUtils.addTransform(ColorTransformType.clone, [-0.133425167215474, 0.135020903628126, 0.998404263587348, 0, 0, 0.390814570523802, 0.803383354786634, -0.194197925310436, 0, 0, -0.525056639777552, 1.54329599043558, -0.0182393506580324, 0, 0, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(ColorTransformType.skillDisabled, [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 150, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(ColorTransformType.gray, [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(ColorTransformType.death, [0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(ColorTransformType.light, [1, 0, 0, 0, 120, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(ColorTransformType.green, [0, 0, 0, 0, 0, 0, 1, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(ColorTransformType.blue, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 255, 0, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(ColorTransformType.purple, [1, 0, 0, 255, 0, 0, 0, 0, 0, 0, 0, 0, 1, 255, 0, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(ColorTransformType.fightMask, [0.15, 0, 0, 0, 53.975, 0, 0.15, 0, 0, 53.975, 0, 0, 0.15, 0, 53.975, 0, 0, 0, 1, 0]);
