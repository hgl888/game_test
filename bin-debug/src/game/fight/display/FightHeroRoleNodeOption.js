/**
 * Created by Administrator on 2015/2/13.
 */
var uw;
(function (uw) {
    var _FightHeroRoleNodeOption = (function (_super) {
        __extends(_FightHeroRoleNodeOption, _super);
        function _FightHeroRoleNodeOption() {
            _super.apply(this, arguments);
            this._tempId = 0;
            this._isChangeBody = false;
        }
        var __egretProto__ = _FightHeroRoleNodeOption.prototype;
        __egretProto__.dtor = function () {
            this._heroArmature = null;
            this._originalArmature = null;
            this._crowArmature = null;
            this._charmMap = null;
            _super.prototype.dtor.call(this);
        };
        return _FightHeroRoleNodeOption;
    })(mo.Option);
    uw._FightHeroRoleNodeOption = _FightHeroRoleNodeOption;
    _FightHeroRoleNodeOption.prototype.__class__ = "uw._FightHeroRoleNodeOption";
})(uw || (uw = {}));
