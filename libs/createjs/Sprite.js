var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/1/21.
 */
var createjs;
(function (createjs) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            _super.call(this);
        }
        return Sprite;
    })(createjs.DisplayObjectContainer);
    createjs.Sprite = Sprite;
    Sprite.prototype.__class__ = "createjs.Sprite";
})(createjs || (createjs = {}));
