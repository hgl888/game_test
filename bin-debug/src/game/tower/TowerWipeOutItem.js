/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var TowerWipeOutItem = (function (_super) {
        __extends(TowerWipeOutItem, _super);
        function TowerWipeOutItem() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TowerWipeOutItem.prototype;
        __egretProto__.init = function (index, info, level) {
            var self = this;
            _super.prototype.init.call(this, index, info, level);
            self.setVisibleByName("iconTeamExpc", false);
            self.setVisibleByName("labelTeamExpc", false);
            self.setVisibleByName("iconGold", false);
            self.setVisibleByName("labelGold", false);
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var itemContainer = this._fightResult.getWidgetByName("itemContainer");
            itemContainer.setPositionY(itemContainer.getPositionY() - 20);
        };
        TowerWipeOutItem.__className = "TowerWipeOutItem";
        return TowerWipeOutItem;
    })(uw.CopyWipeOutItem);
    uw.TowerWipeOutItem = TowerWipeOutItem;
    TowerWipeOutItem.prototype.__class__ = "uw.TowerWipeOutItem";
})(uw || (uw = {}));
