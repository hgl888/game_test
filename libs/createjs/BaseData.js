/**
 * Created by 晋 on 2015/3/4.
 */
var createjs;
(function (createjs) {
    var BaseData = (function () {
        function BaseData() {
        }
        BaseData.prototype.newData = function (data) {
        };
        BaseData.prototype.webTo = function (to) {
            if (to === void 0) { to = ""; }
            egret.Logger.info("WebTo", to);
        };
        return BaseData;
    })();
    createjs.BaseData = BaseData;
    BaseData.prototype.__class__ = "createjs.BaseData";
})(createjs || (createjs = {}));
