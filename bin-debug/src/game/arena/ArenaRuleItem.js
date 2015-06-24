/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArenaRuleItemCell = (function (_super) {
        __extends(ArenaRuleItemCell, _super);
        function ArenaRuleItemCell() {
            _super.call(this);
        }
        var __egretProto__ = ArenaRuleItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiArenaRuleItem_ui;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        ArenaRuleItemCell.__className = "ArenaRuleItemCell";
        return ArenaRuleItemCell;
    })(mo.GridViewCell);
    uw.ArenaRuleItemCell = ArenaRuleItemCell;
    ArenaRuleItemCell.prototype.__class__ = "uw.ArenaRuleItemCell";
})(uw || (uw = {}));
