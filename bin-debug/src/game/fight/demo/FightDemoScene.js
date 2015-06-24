/**
 * Created by Administrator on 2014/12/29.
 */
var uw;
(function (uw) {
    var FightDemoScene = (function (_super) {
        __extends(FightDemoScene, _super);
        function FightDemoScene() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightDemoScene.prototype;
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            this._mainLayer = uw.FightDemoLayer.create();
        };
        __egretProto__.getMainLayer = function () {
            return this._mainLayer;
        };
        __egretProto__.show = function () {
            this._mainLayer.show();
        };
        __egretProto__.addChar = function (member, pos, cb) {
            return this._mainLayer.addChar(member, pos, cb);
        };
        FightDemoScene.__className = "FightDemoScene";
        return FightDemoScene;
    })(mo.Scene);
    uw.FightDemoScene = FightDemoScene;
    FightDemoScene.prototype.__class__ = "uw.FightDemoScene";
})(uw || (uw = {}));
