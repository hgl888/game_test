/**
 * Created by lihex on 12/19/14.
 */
var uw;
(function (uw) {
    var BagUseItemCell = (function (_super) {
        __extends(BagUseItemCell, _super);
        function BagUseItemCell() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = BagUseItemCell.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiUseItemCell_ui;
            self._count = 0;
            self._itemCount = 0;
            self._isRequesting = false;
            self._heroCtrl = null;
            self._itemCtrl = null;
            self._preLvl = null;
            self._expBar = null;
            self._heroIconCtrl = null;
        };
        //@override
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.call(this);
            self._heroIconCtrl = uw.UIHeroIconCtrl.create(self.getWidgetByName(clazz.PANEL_ICON));
            self.setVisibleByName(clazz.LABEL_USECOUNT, false);
            var TE = mo.TouchEvent;
            var clickWidget = self.getWidgetByName(self._clickWidgetName);
            clickWidget.enableLongTouch(200); // 一秒钟吃5个
            clickWidget.onClick(self._useOneByOne, self);
            clickWidget.addEventListener(TE.LONG_TOUCH_BEGIN, self._batchUseBegin, self);
            clickWidget.addEventListener(TE.LONG_TOUCH_END, self._batchUseEnd, self);
            // 设置经验条
            var c_lvl = mo.getJSONWithFileName(uw.cfg_c_lvl);
            var maxLvl = mo.getJSONWithFileNameAndID(uw.cfg_c_game, uw.id_c_game.maxLvl)[0]; //获取英雄最大等级
            var arr = [];
            for (var i = 1; i <= maxLvl; ++i) {
                arr.push(c_lvl[i][uw.c_lvl_expcToLvlUp]);
            }
            self.setProgressQueueBaseNumberByName(clazz.EXPBAR, arr);
            var expBar = self._expBar = self.getWidgetByName(clazz.EXPBAR);
            expBar.loadLightTexture(res.ui_common.bar_light1_png);
        };
        __egretProto__._useOneByOne = function () {
            var self = this;
            self._itemCtrl.use(self._useExpCallback, self, self._heroCtrl.id);
        };
        __egretProto__._batchUseBegin = function () {
            var self = this;
            self._itemCtrl.batchUseExpItemBegin(self._heroCtrl.id);
            self._itemCtrl.localUseExpItem(self._useExpCallback, self);
        };
        __egretProto__._batchUseEnd = function () {
            var self = this;
            self._itemCtrl.batchUseExpItemEnd();
        };
        __egretProto__.resetByData = function (heroCtrl) {
            var self = this, clazz = self.__class;
            self._oldExpc = heroCtrl.getExp(); //记录原来经验
            self._oldLvl = heroCtrl.getLvl(); //记录原来等级
            var heroKey = uw.dsConsts.HeroEntity;
            self._heroCtrl = heroCtrl;
            var name = heroCtrl.name, lvl = heroCtrl.get(heroKey.lvl);
            self._setLvl(lvl);
            self.setInfoByName("name", name);
            self.enableStrokeByName("name", mo.c3b(18, 18, 18), 3);
            // 设置Icon
            self._heroIconCtrl.resetByData(heroCtrl);
            // 设置经验条
            var expBar = self._expBar;
            expBar.stopQueueRunning();
            if (heroCtrl.getNextLvExp()) {
                expBar.setCurTargetValue(heroCtrl.getExpcCurLvlOwned(), heroCtrl.lvl - 1);
            }
            else {
                expBar.setProgress(heroCtrl.getExpcProgressOpt());
            }
            // 还原状态
            self.getWidgetByName(clazz.LVLUP).removeChildren();
            var heroLvlW = self.getWidgetByName(clazz.HERO_LVL);
            heroLvlW.stopAllActions();
            heroLvlW.setScale(1);
            var useCountW = self.getWidgetByName(clazz.LABEL_USECOUNT);
            useCountW.setVisible(false);
            useCountW.stopAllActions();
            useCountW.setOpacity(255);
            useCountW.setScale(1);
        };
        __egretProto__._setLvl = function (lvl) {
            var self = this, clazz = self.__class;
            ;
            self._preLvl = lvl;
            self.setInfoByName(clazz.HERO_LVL, "Lv." + lvl);
            self.enableStrokeByName(clazz.HERO_LVL, mo.c3b(94, 34, 10), 3);
        };
        __egretProto__._useExpCallback = function (opt) {
            var self = this, clazz = self.__class;
            if (opt) {
                // 显示使用量
                var action = mo.sequence(mo.scaleTo(0.1, 1.2), mo.scaleTo(0.2, 1), mo.fadeOut(1.5));
                var useCountW = self.getWidgetByName(clazz.LABEL_USECOUNT);
                useCountW.setVisible(true);
                useCountW.stopAllActions();
                useCountW.setOpacity(255);
                useCountW.setScale(1);
                var heroUseCountDict = self.getDelegate().heroUseCountDict;
                if (!heroUseCountDict[self._heroCtrl.id]) {
                    heroUseCountDict[self._heroCtrl.id] = 1;
                }
                else {
                    heroUseCountDict[self._heroCtrl.id] += 1;
                }
                self.formatByName(clazz.LABEL_USECOUNT, heroUseCountDict[self._heroCtrl.id]);
                useCountW.runAction(action);
                // 跑进度条
                self.runProgressQueueByName(clazz.EXPBAR, opt.deltaExp, function (index, baseNum) {
                    self.setInfoByName(clazz.HERO_LVL, "Lv." + (index + 1)); //设置等级
                    //播放等级的动画
                    var action = mo.sequence(mo.scaleTo(0.1, 1.2), mo.scaleTo(0.2, 1));
                    self.runActionByName(clazz.HERO_LVL, action);
                    uw.UpAction.playLvlUp(self.getWidgetByName(clazz.LVLUP));
                });
            }
        };
        __egretProto__.setItemToUse = function (itemCtrl) {
            var self = this;
            self._itemCtrl = itemCtrl;
        };
        __egretProto__.dtor = function () {
            var self = this;
            _super.prototype.dtor.call(this);
            var TE = mo.TouchEvent;
            var clickWidget = self.getWidgetByName(self._clickWidgetName);
            clickWidget.removeEventListener(TE.LONG_TOUCH_BEGIN, self._batchUseBegin, self);
            clickWidget.removeEventListener(TE.LONG_TOUCH_END, self._batchUseEnd, self);
        };
        BagUseItemCell.__className = "BagUseItemCell";
        BagUseItemCell.PANEL_ICON = "panel_icon"; //英雄图标容器
        BagUseItemCell.EXPBAR = "expBar"; //经验条
        BagUseItemCell.LVLUP = "lvlup";
        BagUseItemCell.HERO_LVL = "lv";
        BagUseItemCell.LABEL_USECOUNT = "label_useCount";
        return BagUseItemCell;
    })(mo.GridViewCell);
    uw.BagUseItemCell = BagUseItemCell;
    BagUseItemCell.prototype.__class__ = "uw.BagUseItemCell";
})(uw || (uw = {}));
