/**
 * Created by lihex on 12/18/14.
 */
var uw;
(function (uw) {
    var BagGridLayerCtrl = (function (_super) {
        __extends(BagGridLayerCtrl, _super);
        function BagGridLayerCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BagGridLayerCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._allItems = [];
            self._curItems = [];
            self._filterOptionMap = {};
            self._sortOptionMap = {};
        };
        //@override
        __egretProto__.init = function (widget) {
            uw.log("---->initBagGridLayerCtrl");
            _super.prototype.init.call(this);
            var self = this;
            var clazz = self.__class;
            self.widget = widget;
            self._createGridScrollView("container", uw.BagItemCell, 4, this._onItemCellDataSource);
            self._gridScrollView.ignoreNullCell(false);
            var bagTypeKey = uw.c_prop.bagTypeKey, filterKey = uw.BAG_FILTER_KEY;
            var filterOptionMap = self._filterOptionMap;
            filterOptionMap[clazz.SHOW_TYPE_ALL] = mo.filterOption;
            filterOptionMap[clazz.SHOW_TYPE_EQUIP] = mo.filterOption.bind({ list: [[filterKey, bagTypeKey.equip]] });
            filterOptionMap[clazz.SHOW_TYPE_ITEM] = mo.filterOption.bind({ list: [[filterKey, bagTypeKey.item]] });
            filterOptionMap[clazz.SHOW_TYPE_HERO] = mo.filterOption.bind({ list: [[filterKey, bagTypeKey.hero]] });
            filterOptionMap[clazz.SHOW_TYPE_MATE] = mo.filterOption.bind({ list: [[filterKey, bagTypeKey.material]] });
            var sortKey = uw.BAG_SORT_KEY;
            var sortOptMap = self._sortOptionMap;
            var sTempId = sortKey.SORT_TEMP_ID;
            var sLvl = sortKey.SORT_LVL;
            var sQuality = sortKey.SORT_QUALITY;
            var sCount = sortKey.SORT_COUNT;
            sortOptMap[clazz.SHOW_TYPE_ALL] = sortOptMap[clazz.SHOW_TYPE_ITEM] = mo.sortOption.bind({ list: [sTempId] });
            sortOptMap[clazz.SHOW_TYPE_EQUIP] = mo.sortOption.bind({ list: [sLvl, sQuality, sTempId] });
            sortOptMap[clazz.SHOW_TYPE_HERO] = mo.sortOption.bind({ list: [sCount, sTempId] });
            sortOptMap[clazz.SHOW_TYPE_MATE] = mo.sortOption.bind({ list: [sQuality, sTempId] });
            // 注册事件监听
            self.registerClassByKey(uw.HeroDataCtrl, uw.HeroDataCtrl.ON_EQUIP_CHANGED, self._onEquipChanged);
            self.registerClassByKey(uw.UserDataCtrl, uw.UserDataCtrl.ON_GET_BAG_ITEMS, self._onItemExtendItems);
            self.registerClassByKey(uw.UserDataCtrl, uw.UserDataCtrl.ON_GET_EQUIPS, self._onItemExtendEquips);
            self.registerClassByKey(uw.EquipDataCtrl, uw.EquipDataCtrl.ON_SOLD, self._onEquipSold);
            self.registerClassByKey(uw.BagDataCtrl, uw.BagDataCtrl.ON_COUNT_CHANGED, self._onItemCountChanged);
        };
        __egretProto__._onEquipChanged = function (part, curEquipCtrl, preEquipCtrl) {
            var self = this;
            //从背包中移除已经被穿戴的
            if (curEquipCtrl) {
                mo.ArrayRemoveObject(self._allItems, curEquipCtrl);
            }
            //添加被替换下来的，如果有且不是模板数据
            if (preEquipCtrl && !preEquipCtrl.isTempOnly) {
                mo.ArrayAppendObject(self._allItems, preEquipCtrl);
            }
            self.setCurList(self._curShowType, self._curOption);
        };
        __egretProto__._onItemExtendEquips = function (equipCtrlArr) {
            var self = this, equipCtrl;
            for (var i = 0, li = equipCtrlArr.length; i < li; i++) {
                equipCtrl = equipCtrlArr[i];
                self._allItems.push(equipCtrl);
            }
            self.setCurList(self._curShowType);
        };
        __egretProto__._onItemCountChanged = function (count, ctrl) {
            var self = this;
            if (count == 0) {
                mo.ArrayRemoveObject(self._allItems, ctrl);
                mo.ArrayRemoveObject(self._curItems, ctrl);
                self._gridScrollView.dropOneCell();
            }
        };
        __egretProto__._onEquipSold = function (ctrl) {
            var self = this;
            mo.ArrayRemoveObject(self._allItems, ctrl);
            mo.ArrayRemoveObject(self._curItems, ctrl);
            self._gridScrollView.dropOneCell();
        };
        __egretProto__._onItemExtendItems = function (items) {
            var self = this;
            var id, num;
            for (id in items) {
                num = items[id];
                uw.addItemIntoBagCtrlList(self._allItems, id, num);
            }
            self.setCurList(self._curShowType);
        };
        __egretProto__.resetData = function (noBagItems) {
            var self = this;
            self._allItems = [];
            self._getEquips();
            if (!noBagItems) {
                self._getItems();
            }
        };
        __egretProto__._getItems = function () {
            var self = this;
            var itemList = uw.getRepeatedBagDataCtrlList(uw.userDataCtrl.getItems());
            for (var i = 0, li = itemList.length; i < li; i++) {
                self._allItems.push(itemList[i]);
            }
        };
        __egretProto__._getEquips = function () {
            var self = this;
            var equipList = uw.userDataCtrl.getNotOnEquipList();
            var eqiupCtrl;
            for (var i = 0, li = equipList.length; i < li; i++) {
                eqiupCtrl = equipList[i];
                if (eqiupCtrl.part >= uw.c_prop.equipPartKey.exclusive) {
                    self._allItems.push(eqiupCtrl);
                }
            }
        };
        __egretProto__._onItemCellDataSource = function (cell, index) {
            var itemCtrl = this._curItems[index];
            cell.resetByData(itemCtrl);
            cell.onClick(this._onCellClick, this);
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            var idx = cell.getIdx();
            var curCtrl = self._curItems[idx];
            self._curItemCtrl = curCtrl;
            self._cellClickSelector.call(self._cellClickTarget, curCtrl);
        };
        __egretProto__.onCellClick = function (selector, target) {
            this._cellClickSelector = selector;
            this._cellClickTarget = target;
        };
        __egretProto__.setCurList = function (showType, option) {
            var self = this, filter, sorter;
            filter = self._filterOptionMap[showType];
            sorter = self._sortOptionMap[showType];
            self._curItems = self._allItems.filter(filter);
            if (option) {
                if (uw.BAG_SUB_FILTER_TYPE.EQUIP_PART == option.filterType) {
                    var filterOpt = [[uw.EquipDataCtrl.KEY_PART, option.part]];
                    // 专属的话还要根据英雄模板ID过滤
                    if (option.part == uw.c_prop.equipPartKey.exclusive) {
                        filterOpt.push([uw.EquipDataCtrl.KEY_HERO_TID, option.heroTid]);
                    }
                    self._curItems = self._curItems.filter(mo.filterOption.bind({ list: filterOpt }));
                }
            }
            self._curItems.sort(sorter);
            self._gridScrollView.setTotalCount(Math.max(self._curItems.length, 20));
            //
            if (self._curShowType != showType) {
                self._gridScrollView.stopAutoScrollChildren();
                self._gridScrollView.jumpToTop();
            }
            self._curShowType = showType;
            self._curOption = option;
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            var allItems = self._allItems;
            for (var i = 0, li = allItems.length; i < li; i++) {
                /* 因为equipDataCtrl是公用的，所以这里只对BagDataCrtl做dtor操作
                 效率起见，用part属性做判断
                 */
                if (!(allItems[i].part)) {
                    allItems[i].doDtor();
                }
            }
            self._allItems = null;
            self._curItems = null;
            self._filterOptionMap = null;
            self._sortOptionMap = null;
        };
        BagGridLayerCtrl.__className = "BagGridLayerCtrl";
        BagGridLayerCtrl.SHOW_TYPE_ALL = 1;
        BagGridLayerCtrl.SHOW_TYPE_EQUIP = 2;
        BagGridLayerCtrl.SHOW_TYPE_ITEM = 3;
        BagGridLayerCtrl.SHOW_TYPE_HERO = 4;
        BagGridLayerCtrl.SHOW_TYPE_MATE = 5;
        return BagGridLayerCtrl;
    })(mo.WidgetCtrl);
    uw.BagGridLayerCtrl = BagGridLayerCtrl;
    BagGridLayerCtrl.prototype.__class__ = "uw.BagGridLayerCtrl";
})(uw || (uw = {}));
