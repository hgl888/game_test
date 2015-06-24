/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var UIHeroListLayer_new = (function (_super) {
        __extends(UIHeroListLayer_new, _super);
        function UIHeroListLayer_new() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = UIHeroListLayer_new.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiHeroList_new_ui;
            self._heroList = [];
            self._posType = 0;
        };
        //@override
        __egretProto__.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            //适配
            var size = self.getSize();
            var width = size.width, height = size.height;
            var w1 = width - 244, w2 = w1 - 80;
            self.setSizeByName(clazz.PANEL_IMG, w1, height);
            self.setAdaptiveScaleByName(clazz.IMG_BG, mo.RESOLUTION_POLICY.EXACT_FIT);
            var scrollView = self.getWidgetByName(clazz.SCROLL_HEROS);
            //创建GridView视图
            var gridView = self._uiGridView = mo.UIGridView.create();
            gridView.setCellClass(uw.UIHeroItemCell_new);
            gridView.registerListenerIniter(self._cellListenerIniter, self);
            gridView.addToScrollView(scrollView);
            //按键组设置
            var tabList = uw.TabListCtrl.create(self.getWidgetByName(clazz.PANEL_BTN_LIST));
            tabList.onTabClicked(self._onTabClicked, self);
            var tabs = [
                { name: clazz.BTN_ALL, title: "全部" },
                { name: clazz.BTN_F, title: "前排" },
                { name: clazz.BTN_M, title: "中排" },
                { name: clazz.BTN_B, title: "后排" }
            ];
            tabList.resetByData(tabs);
            tabList.movePointerByName(clazz.BTN_ALL);
        };
        __egretProto__._onTabClicked = function (sender) {
            var self = this, clazz = self.__class;
            var name = sender.getName();
            var posType = 0;
            switch (name) {
                case clazz.BTN_ALL:
                    posType = 0;
                    break;
                case clazz.BTN_F:
                    posType = 1;
                    break;
                case clazz.BTN_M:
                    posType = 2;
                    break;
                case clazz.BTN_B:
                    posType = 3;
                    break;
            }
            self._posType = posType;
            self._heroList = uw.HeroCellDisplayData.getDisplayDatas(posType);
            self._uiGridView.load(self._heroList);
            self.getWidgetByName(clazz.SCROLL_HEROS).jumpToTop();
            return true;
        };
        __egretProto__._cellListenerIniter = function (cell) {
            var self = this;
            cell.onClick(self._onHeroItemClick, self);
        };
        __egretProto__._onHeroItemClick = function (cell) {
            var self = this;
            var cellData = cell._cellOption.data;
            var heroDataCtrl = cellData.heroDataCtrl;
            self._heroDataCtrl = heroDataCtrl;
            if (!heroDataCtrl) {
                if (cellData.fragOwned >= cellData.fragRequired) {
                    //碎片足够则进行兑换
                    uw.userDataCtrl.callHero(cellData, function () {
                        var tempId = cellData.tempId;
                        var layer = uw.LotteryShowHeroLayer.create(tempId);
                        //秘术已经激活过，则升级秘术
                        var sc = uw.userDataCtrl.getSecretByHeroTid(cellData.tid);
                        if (sc && sc.lvl > 0) {
                            var data = new uw.SecretChangeData(sc.initId, true);
                            uw.userDataCtrl.catchSecretChangeBegin();
                            uw.userDataCtrl.catchSecretChange(data);
                            mo.addAfterEventListener(layer, gEventType.invisible, function (event) {
                                var func = arguments.callee;
                                uw.SecretTipsDlg.create(data).show();
                                mo.removeAfterEventListener(layer, gEventType.invisible, func, layer);
                            }, layer);
                        }
                        layer.show();
                        self.refreshAll();
                    });
                }
                else {
                    var dlg = uw.GainInfoDlg.getInstance();
                    var t_hero = mo.getJSONWithFileName(uw.cfg_t_hero);
                    dlg.resetByData(uw.HeroDataCtrl.create(null, t_hero[cellData.tempId]).fragmentId);
                    dlg.show(true);
                }
            }
            else {
                var heroInfoLayer = uw.HeroInfoLayer.getInstance(self);
                heroInfoLayer.resetByData(heroDataCtrl);
                heroInfoLayer.show(true);
            }
        };
        __egretProto__.showBackBtn = function () {
            mo.runningScene.backLayer.showBackBtn();
        };
        __egretProto__.hideBackBtn = function () {
            mo.runningScene.backLayer.hideBackBtn();
        };
        __egretProto__.onEnter = function () {
            var self = this;
            _super.prototype.onEnter.call(this);
            self.registerClassByKey(uw.UserDataCtrl, uw.UserDataCtrl.ON_CALL_HERO, self.refreshAll); //召唤英雄后要刷新界面
        };
        __egretProto__.refreshAll = function () {
            var self = this;
            uw.debug("UIHeroList---->refreshAll");
            self._heroList = uw.HeroCellDisplayData.getDisplayDatas(self._posType);
            self._uiGridView.load(self._heroList);
            self.getWidgetByName(self.__class.SCROLL_HEROS).jumpToTop();
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            uw.HeroInfoLayer.purgeInstance();
            uw.GainInfoDlg.purgeInstance();
        };
        //引导相关，不可轻易修改
        __egretProto__.jumpToCell = function (heroTid) {
            var self = this, list = self._heroList, view = self._uiGridView;
            var cell = view.getChildren()[0];
            var cellHeight = cell.height; //cell高度
            var cols = view.getCols(); //列数
            var index = 0;
            heroTid = typeof heroTid == "string" ? parseInt(heroTid) : heroTid;
            for (var i = 0, l_i = list.length; i < l_i; i++) {
                var data = list[i];
                if (data.tid == heroTid) {
                    index = i;
                    break;
                }
            }
            var y = cellHeight * Math.floor(index / cols);
            var scrollView = self.getWidgetByName(self.__class.SCROLL_HEROS);
            scrollView.jumpToDestination(mo.p(0, -y));
            view.refresh(0, y);
        };
        UIHeroListLayer_new.__className = "UIHeroListLayer";
        UIHeroListLayer_new.IMG_BG = "img_bg"; //背景图片
        UIHeroListLayer_new.PANEL_IMG = ""; //小背景
        UIHeroListLayer_new.SCROLL_HEROS = "scroll_heros"; //列表容器
        UIHeroListLayer_new.PANEL_BTN_LIST = "panel_btnList"; //按键容器
        UIHeroListLayer_new.TAB_POINT = "tabPointer"; //红色按键图
        UIHeroListLayer_new.BTN_ALL = "panel_all"; //全部
        UIHeroListLayer_new.BTN_F = "panel_f"; //前排
        UIHeroListLayer_new.BTN_M = "panel_m"; //中排
        UIHeroListLayer_new.BTN_B = "panel_b"; //后排
        return UIHeroListLayer_new;
    })(mo.DisplayLayer);
    uw.UIHeroListLayer_new = UIHeroListLayer_new;
    UIHeroListLayer_new.prototype.__class__ = "uw.UIHeroListLayer_new";
})(uw || (uw = {}));
