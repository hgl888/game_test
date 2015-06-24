/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var RankGuildInfoLayer = (function (_super) {
        __extends(RankGuildInfoLayer, _super);
        //        static __className:string = "RankGuildInfoLayer";
        function RankGuildInfoLayer() {
            _super.call(this);
        }
        var __egretProto__ = RankGuildInfoLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiRankGuildInfoLayer_ui;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
            self.onClickByName("btnBack", self.close, self);
        };
        return RankGuildInfoLayer;
    })(mo.UIModalLayer);
    uw.RankGuildInfoLayer = RankGuildInfoLayer;
    RankGuildInfoLayer.prototype.__class__ = "uw.RankGuildInfoLayer";
})(uw || (uw = {}));
