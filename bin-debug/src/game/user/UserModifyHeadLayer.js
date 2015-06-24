/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var UserModifyHeadLayer = (function (_super) {
        __extends(UserModifyHeadLayer, _super);
        function UserModifyHeadLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UserModifyHeadLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiUserModifyHeadLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            this.onClickByName("btnClose", this.close, this);
            this.showHeadIcon();
        };
        //获取所有英雄tid
        __egretProto__._getIconsIds = function () {
            var heroList = uw.userDataCtrl.getHeroDataCtrlList();
            var iconsIds = [];
            for (var i = 0; i < heroList.length; i++) {
                var locHero = heroList[i];
                iconsIds.push(locHero.tid);
            }
            return iconsIds;
        };
        __egretProto__.showHeadIcon = function () {
            var self = this;
            self._heroDataArr = self._getIconsIds();
            self._gridScrollView = self._createGridScrollView("headListContainer", uw.UserHeadCell, 4, self._gridviewDataSource);
            self._gridScrollView.setTotalCount(self._heroDataArr.length);
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this;
            self._gridScrollView.scrollToTop(0.016, false);
        };
        __egretProto__._gridviewDataSource = function (convertView, idx, gridView) {
            var cell = convertView, self = this;
            var headIconId = self._heroDataArr[idx];
            cell.resetByData(headIconId);
            if (headIconId == uw.userDataCtrl.getIconId()) {
                cell.setActive(true, true);
                self._curSelected = cell;
            }
            else {
                cell.setActive(false, true);
            }
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.onClick(self._setHeadInfo, self);
            }
        };
        __egretProto__._setHeadInfo = function (sender) {
            var self = this;
            if (sender != self._curSelected) {
                var argsObj = uw.iface.a_user_changeIcon_args, args = {};
                args[argsObj.iconId] = sender.getIconId(); //英雄id
                mo.request(uw.iface.a_user_changeIcon, args, function (result) {
                    if (self._curSelected) {
                        self._curSelected.setActive(false);
                    }
                    sender.setActive(true);
                    self._curSelected = sender;
                    uw.userDataCtrl.setIconId(self._curSelected.getIconId());
                }, this);
            }
        };
        UserModifyHeadLayer.__className = "UserModifyHeadLayer";
        return UserModifyHeadLayer;
    })(mo.UIModalLayer);
    uw.UserModifyHeadLayer = UserModifyHeadLayer;
    UserModifyHeadLayer.prototype.__class__ = "uw.UserModifyHeadLayer";
})(uw || (uw = {}));
