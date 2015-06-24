var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by 晋 on 2015/3/18.
 */
var testSprite = (function (_super) {
    __extends(testSprite, _super);
    function testSprite() {
        _super.call(this);
        this.name = "testSprite";
        egret.Logger.info("new sprite");
    }
    testSprite.prototype._onAddToStage = function () {
        egret.Logger.info("name:", this.name);
    };
    return testSprite;
})(egret.Sprite);
testSprite.prototype.__class__ = "testSprite";
