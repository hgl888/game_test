/**
 * Created by lihex on 12/18/14.
 */
var uw;
(function (uw) {
    var ShowItemInfo = (function (_super) {
        __extends(ShowItemInfo, _super);
        function ShowItemInfo() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ShowItemInfo.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiInfoTip_ui;
            self.blurMaskEnabled = false;
        };
        __egretProto__.init = function (dataCtrl) {
            var self = this;
            _super.prototype.init.call(this);
            self.resetByData(dataCtrl);
            self.onClick(self.close, self);
            self.setTouchEnabled(true);
        };
        __egretProto__.resetByData = function (dataCtrl) {
            if (!dataCtrl)
                return;
            var self = this;
            if (typeof dataCtrl == "number" || typeof dataCtrl == "string") {
                dataCtrl = uw.BagDataCtrl.create(new Number(dataCtrl));
            }
            self.dataCtrl = dataCtrl;
            //进行ui设置
            self._readTipInfo();
        };
        __egretProto__._readTipInfo = function () {
            //进行ui设置
            var self = this;
            var dataCtrl = self.dataCtrl;
            var color = uw.getColorByQuality(dataCtrl.getTempValue(uw.t_item_quality));
            var clazz = self.__class;
            var oldDescHeight = self.getSizeByName(clazz.LABEL_DESC).height;
            var labelDesc = self.getWidgetByName(clazz.LABEL_DESC);
            labelDesc.setAutoSizeHeight(true);
            var useTxt = dataCtrl.useTxt;
            var explain = dataCtrl.explain;
            self.setColorByName(clazz.LABEL_NAME, color);
            self.setInfoByName(clazz.LABEL_NAME, dataCtrl.name);
            self.setInfoByName(clazz.LABEL_DESC, explain + useTxt);
            if (dataCtrl.price != 0) {
                self.setInfoByName(clazz.LABEL_GOLD, dataCtrl.price);
                self.setVisibleByName(clazz.LABEL_PRICE, true);
            }
            else {
                self.setVisibleByName(clazz.LABEL_PRICE, false);
            }
            self.setVisibleByName(clazz.LABEL_LEVEL, false);
            self.setVisibleByName(clazz.LABEL_ISBOSS, false);
            self.setVisibleByName(clazz.LABEL_TRAINLVL, false);
            var item = self.getWidgetByName(clazz.PANEL_ITEM);
            var tipDataCtrl = uw.UIItemIconCtrl.create(item);
            tipDataCtrl.resetByData(dataCtrl);
            var diffHeight = labelDesc.getSize().height - oldDescHeight;
            var container = self.getWidgetByName(clazz.PANEL_CONTAINER);
            container.setSize(mo.size(container.getSize().width, container.getSize().height + diffHeight));
        };
        ShowItemInfo.__className = "ShowItemInfo";
        ShowItemInfo.PANEL_ITEM = "item"; //物品
        ShowItemInfo.LABEL_NAME = "name"; //名字
        ShowItemInfo.LABEL_DESC = "desc"; //描述
        ShowItemInfo.LABEL_GOLD = "gold"; //金币
        ShowItemInfo.LABEL_LEVEL = "level"; //等级
        ShowItemInfo.LABEL_PRICE = "price"; //价格
        ShowItemInfo.LABEL_ISBOSS = "isBoss"; //是否是BOSS
        ShowItemInfo.LABEL_TRAINLVL = "trainLvl"; // 品阶等级
        ShowItemInfo.PANEL_CONTAINER = "container"; // 背景
        return ShowItemInfo;
    })(mo.MsgDlg);
    uw.ShowItemInfo = ShowItemInfo;
    ShowItemInfo.prototype.__class__ = "uw.ShowItemInfo";
})(uw || (uw = {}));
