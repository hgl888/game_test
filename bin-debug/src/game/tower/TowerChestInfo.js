/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var TowerChestInfo = (function (_super) {
        __extends(TowerChestInfo, _super);
        function TowerChestInfo() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = TowerChestInfo.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiChestInfo_ui;
            self.blurMaskEnabled = false;
        };
        __egretProto__._readTipInfo = function () {
            //进行ui设置
            var self = this;
            var dataCtrl = self.dataCtrl;
            var explain = dataCtrl.explain;
            self.setInfoByName(self.__class.LABEL_DESC, explain);
            var tempId = self.dataCtrl.tempId;
            var itemLogic = mo.getJSONWithFileName(uw.cfg_t_itemLogic);
            var itemLogic_create = itemLogic[tempId][uw.t_itemLogic_create];
            var goldCount = 0;
            for (var i = 0; i < itemLogic_create.length; i++) {
                var item = itemLogic_create[i];
                if (item[0] == uw.c_prop.spItemIdKey.gold) {
                    goldCount = item[1];
                    break;
                }
            }
            self.setInfoByName(self.__class.LABEL_GOLD, goldCount);
            var item = self.getWidgetByName(self.__class.PANEL_ITEM);
            var tipDataCtrl = uw.UIItemIconCtrl.create(item);
            tipDataCtrl.resetByData(self.dataCtrl);
            var descHeight = self.getSizeByName(self.__class.LABEL_DESC).height;
            var labelDesc = self.getWidgetByName(self.__class.LABEL_DESC);
            labelDesc.setAutoSizeHeight(true);
            var diffHeight = labelDesc.getSize().height - descHeight;
            var container = self.getWidgetByName(self.__class.PANEL_CONTAINER);
            container.setSize(mo.size(container.getSize().width, container.getSize().height + diffHeight));
        };
        TowerChestInfo.__className = "TowerChestInfo";
        return TowerChestInfo;
    })(uw.ShowItemInfo);
    uw.TowerChestInfo = TowerChestInfo;
    TowerChestInfo.prototype.__class__ = "uw.TowerChestInfo";
})(uw || (uw = {}));
