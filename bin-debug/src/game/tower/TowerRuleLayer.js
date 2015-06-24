/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var TowerRuleLayer = (function (_super) {
        __extends(TowerRuleLayer, _super);
        function TowerRuleLayer() {
            _super.call(this);
        }
        var __egretProto__ = TowerRuleLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiTowerRuleLayer_ui;
        };
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self.onClickByName("btnBack", self.close, self); //关闭
            var hours = mo.getJSONWithFileName(uw.cfg_c_open)[uw.id_c_game.towerConfig][uw.c_open_refreshTime];
            var formatStr = Date.today().addHours(hours).toFormat("HH:MI");
            var vipLevel = uw.getVipOpenLevel(uw.c_vip_isTowerAuto);
            self.formatByName("towerCount", formatStr);
            self.formatByName("vipLevel", vipLevel);
        };
        TowerRuleLayer.__className = "TowerRuleLayer";
        return TowerRuleLayer;
    })(mo.UIModalLayer);
    uw.TowerRuleLayer = TowerRuleLayer;
    TowerRuleLayer.prototype.__class__ = "uw.TowerRuleLayer";
})(uw || (uw = {}));
