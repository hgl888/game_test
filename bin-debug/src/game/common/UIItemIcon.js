/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var UIItemIconCtrl = (function (_super) {
        __extends(UIItemIconCtrl, _super);
        function UIItemIconCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIItemIconCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiItemIcon_ui;
            self.dataCtrl = null;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
            var self = this;
        };
        __egretProto__.init = function (container, dataCtrl, option) {
            var self = this;
            var clazz = self.__class;
            self._clickWidgetName = clazz.PANEL_TOUCH;
            _super.prototype.init.apply(this, arguments);
            self.loadMaskTextureByName(clazz.IMG_ICON, res.SpecialItemIcon.fragmentMask);
            //设置count的描边
            self.enableStrokeByName(clazz.LABEL_COUNT, mo.c3b(0, 0, 0), 3);
            self.resetByData(dataCtrl);
            self.setTouchEnabledByName(clazz.IMG_BORDER, false);
        };
        __egretProto__.setEquipUi = function (part, owned) {
            var self = this;
            self.part = part;
            if (!owned) {
                self.setInfoByName(self.__class.IMG_ICON, mo.formatStr(res.ui_panel.tmp_eqp_png, part));
                self.transColorByName(self.__class.IMG_BORDER, uw.getItemColorType(0));
            }
            self._setWhenEquipDataCtrl();
        };
        __egretProto__._setWhenEquipDataCtrl = function () {
            var self = this;
            self.setVisibleByName(self.__class.IMG_BG, true);
            self.setVisibleByName(self.__class.LABEL_COUNT, false);
            self.setVisibleByName(self.__class.IMG_FRAG, false);
            self.setMaskEnabledByName(self.__class.IMG_ICON, false);
        };
        __egretProto__._setWhenBagDataCtrl = function () {
            var self = this, clazz = self.__class;
            self.setCount(self.dataCtrl.count || 0);
            self.setVisibleByName(self.__class.IMG_BG, true);
            var isFragment = self.dataCtrl.isFragment;
            if (isFragment && self._fragmentType != self.dataCtrl.type) {
                self._fragmentType = self.dataCtrl.type;
                //设置碎片图标
                self.setInfoByName(clazz.IMG_FRAG, res.ui_common.fragmentTag[self._fragmentType]);
            }
            self.setVisibleByName(clazz.IMG_FRAG, isFragment); //是否显示碎片图标
            self.setVisibleByName(clazz.IMG_BG, !isFragment); //碎片不显示背景
            self.setMaskEnabledByName(clazz.IMG_ICON, isFragment); //是否设置mask
        };
        __egretProto__._setIconAndBorder = function (tempId) {
            var self = this, clazz = self.__class;
            var icon = resHelper.getItemIconPath(tempId);
            var qFrameName = uw.getItemBorderByTempId(tempId);
            self.getWidgetByName(clazz.IMG_BORDER).bgTexture = qFrameName; //边框
            self.transColorByName(clazz.IMG_BORDER, uw.getItemColorType(tempId));
            self.setInfoByName(clazz.IMG_ICON, icon); //图标
        };
        __egretProto__.resetByData = function (dataCtrl) {
            var self = this, clazz = self.__class;
            if (!dataCtrl)
                return;
            if (typeof dataCtrl == "number" || typeof dataCtrl == "string") {
                dataCtrl = uw.BagDataCtrl.create(new Number(dataCtrl));
            }
            self.dataCtrl = dataCtrl;
            self.setVisibleByName(clazz.IMG_ADD, false); //默认把加好图片设置不可见
            if (dataCtrl instanceof uw.EquipDataCtrl) {
                self._setWhenEquipDataCtrl();
            }
            else if (dataCtrl instanceof uw.BagDataCtrl) {
                self._setWhenBagDataCtrl();
            }
            //进行icon & 边框设置
            self._setIconAndBorder(dataCtrl.tempId);
        };
        __egretProto__.setCount = function (count) {
            var self = this;
            self.setVisibleByName(self.__class.LABEL_COUNT, count > 1);
            //逢10000则使用大写字母W代替，例如：500000=50W
            var oneW = 10000;
            self.setInfoByName(self.__class.LABEL_COUNT, (count >= oneW) ? mo.formatStr("%sW", Math.round(count / oneW)) : count);
        };
        __egretProto__.refreshMe = function () {
            if (!this.dataCtrl)
                return;
            this.resetByData(this.dataCtrl);
        };
        __egretProto__._readTipInfo = function () {
            //进行ui设置
            var self = this;
            var tipWidget = self.tipWidget;
            var dataCtrl = self.dataCtrl;
            var color = uw.getColorByQuality(dataCtrl.getTempValue(uw.t_item_quality));
            var totalStr = dataCtrl.explain + dataCtrl.useTxt;
            tipWidget.setColorByName(self.__class.LABEL_NAME, color);
            tipWidget.setInfoByName(self.__class.LABEL_NAME, dataCtrl.name);
            tipWidget.setInfoByName(self.__class.LABEL_DESC, totalStr);
            if (dataCtrl.price != 0) {
                tipWidget.setInfoByName(self.__class.LABEL_GOLD, dataCtrl.price);
                tipWidget.setVisibleByName(self.__class.LABEL_PRICE, true);
            }
            else {
                tipWidget.setVisibleByName(self.__class.LABEL_PRICE, false);
            }
            tipWidget.setVisibleByName(self.__class.LABEL_LEVEL, false);
            tipWidget.setVisibleByName(self.__class.LABEL_ISBOSS, false);
            tipWidget.setVisibleByName(self.__class.LABEL_TRAINLVL, false);
            var item = tipWidget.getWidgetByName(self.__class.PANEL_ITEM);
            var tipDataCtrl = uw.UIItemIconCtrl.create(item);
            tipDataCtrl.resetByData(self.dataCtrl);
            self._adapt(totalStr);
            if (self._noShowNames) {
                for (var i = 0, li = self._noShowNames.length; i < li; i++) {
                    tipWidget.setVisibleByName(self._noShowNames[i], false);
                }
            }
        };
        __egretProto__.showAddImg = function (visible, dark) {
            var self = this;
            self.setVisibleByName(self.__class.IMG_ADD, visible);
            if (visible) {
                var frame = dark ? res.ui_btn.ico_forpluslocked_png : res.ui_btn.ico_forplus_png;
                self.setInfoByName(self.__class.IMG_ADD, frame);
            }
        };
        UIItemIconCtrl.__className = "UIItemIconCtrl";
        UIItemIconCtrl.IMG_ICON = "img_icon"; //icon图标
        UIItemIconCtrl.IMG_BORDER = "img_border"; //边框
        UIItemIconCtrl.IMG_FRAG = "img_frag"; //碎片图标
        UIItemIconCtrl.IMG_BG = "img_bg"; //背景图片
        UIItemIconCtrl.LABEL_COUNT = "label_count"; //数量显示文字
        UIItemIconCtrl.PANEL_TOUCH = "panel_touch"; //点击区域
        UIItemIconCtrl.RICH_COUNT = "rich_count"; //显示富文本格式的数量
        UIItemIconCtrl.IMG_ADD = "img_add"; //加号图片
        return UIItemIconCtrl;
    })(uw.UIIconCtrl);
    uw.UIItemIconCtrl = UIItemIconCtrl;
    UIItemIconCtrl.prototype.__class__ = "uw.UIItemIconCtrl";
})(uw || (uw = {}));
