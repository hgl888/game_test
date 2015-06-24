/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var UserHeadCell = (function (_super) {
        __extends(UserHeadCell, _super);
        function UserHeadCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UserHeadCell.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiUserModifyHeadItem_ui;
            self._clickWidgetName = "panel_touch";
            self._useClickEffect = true;
            self._iconId = 0;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._mark = this.getWidgetByName("mark");
            self._headSprite = this.getWidgetByName("img_icon");
        };
        __egretProto__.getIconId = function () {
            return this._iconId;
        };
        __egretProto__.resetByData = function (headIconId) {
            var self = this;
            if (headIconId != null) {
                self._iconId = headIconId;
                var path = resHelper.getRoleIconPath(headIconId);
                self._headSprite.loadTexture(path);
            }
        };
        __egretProto__.setActive = function (isActive, isNow) {
            var self = this;
            if (isActive) {
                self._mark.setVisible(true);
                if (isNow) {
                    self._mark.setOpacity(255);
                    self._mark.setScale(1.4);
                }
                else {
                    self._mark.setOpacity(0);
                    self._mark.setScale(2);
                    var seq = mo.spawn(mo.fadeIn(0.3), mo.scaleTo(0.3, 1.4).setEase(mo.Ease.backOut));
                    self._mark.runAction(seq);
                }
            }
            else {
                if (isNow) {
                    self._mark.setOpacity(0);
                    self._mark.setScale(1);
                }
                else {
                    var seq = mo.spawn(mo.fadeOut(0.3), mo.scaleTo(0.3, 2).setEase(mo.Ease.backIn));
                    self._mark.runAction(seq);
                }
            }
        };
        UserHeadCell.__className = "UserHeadCell";
        return UserHeadCell;
    })(mo.GridViewCell);
    uw.UserHeadCell = UserHeadCell;
    UserHeadCell.prototype.__class__ = "uw.UserHeadCell";
})(uw || (uw = {}));
