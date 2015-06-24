/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SecretLayer = (function (_super) {
        __extends(SecretLayer, _super);
        function SecretLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSecretLayer_ui;
        };
        //@override
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            this.currCell = null;
        };
        __egretProto__.init = function (changeData) {
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.EXACT_FIT);
            self.onClickByName("btnHelp", this.menuHelp, this);
            self._tipsLeft = self.getWidgetByName(clazz.TIPS_1);
            self._tipsLeft.setVisible(false);
            self._heroIconCtrl = uw.UIHeroIconCtrl.create(self._tipsLeft.getWidgetByName(clazz.PANEL_HERO_ICON));
            self._createGridScrollView("itemList", uw.SecretItem, 1, this._onCellDataSource, true);
            var secretArr = uw.userDataCtrl.getSecretArr();
            if (changeData) {
                self._changeData = changeData;
                //log("--->changeData = ", changeData);
                /*[
                    {initId: 500, isUpgrade: true},
                    {initId: 600, isUpgrade: true}
                ];*/
                //为实现升级激活效果：先退回到原来的状态，再还原当前状态
                //1.因为secretData是共享的，所以先把要修改的data装起来
                var editArr = [];
                for (var i = 0, li = changeData.length; i < li; i++) {
                    var data = changeData[i];
                    var initId = data.initId;
                    // 数据初始化
                    var editSecret = uw.userDataCtrl.getSecret(initId);
                    editArr.push(editSecret);
                }
                for (var i = 0, li = editArr.length; i < li; i++) {
                    var data = changeData[i];
                    var isUpgrade = data.isUpgrade;
                    var editSecret = editArr[i];
                    if (isUpgrade) {
                        //log("--->editSecret1.skillId = %s, editSecret.lvl = %s", editSecret.skillId, editSecret.lvl);
                        editSecret.skillId -= 1;
                        editSecret.lvl -= 1;
                    }
                    else {
                        editSecret._bakLvl = editSecret.lvl; //备份等级
                        editSecret.lvl = 0;
                    }
                }
            }
            self._initWithData(secretArr);
        };
        __egretProto__.onEnter = function () {
            var self = this;
            if (self._changeData && self._changeData.length > 0) {
                self._gridScrollView.addEventListener(mo.UIScrollView.SCROLL_END, self._onScrollEnd, self);
                process.nextTick(function () {
                    self.playEffect();
                });
            }
        };
        __egretProto__.getCellByInitId = function (initId) {
            var self = this;
            var cells = self._gridScrollView.getCells();
            for (var i = 0, li = cells.length; i < li; i++) {
                var cell = cells[i];
                if (cell._info.initId == initId)
                    return cell;
            }
        };
        __egretProto__._onScrollEnd = function () {
            var self = this;
            var data = self._changeData.shift();
            var initId = data.initId;
            var isUpgrade = data.isUpgrade;
            if (isUpgrade) {
                self.playUpgradeEffect(self.getCellByInitId(initId).getIdx());
            }
            else {
                self.playActiveEffect(self.getCellByInitId(initId).getIdx());
            }
        };
        __egretProto__.playEffect = function () {
            var self = this;
            if (self._changeData.length <= 0) {
                self._restoreBtns();
                self._gridScrollView.touchEnabled = true;
                self._gridScrollView.hitChildrenEnabled = true;
                self._gridScrollView.removeEventListener(mo.UIScrollView.SCROLL_END, self._onScrollEnd, self);
                return;
            }
            self._hideBtns();
            self._gridScrollView.touchEnabled = false;
            self._gridScrollView.hitChildrenEnabled = false;
            var data = self._changeData[0];
            var initId = data.initId;
            self.scrollToItem(initId);
        };
        __egretProto__._initWithData = function (data) {
            this._data = data;
            this._gridScrollView.setTotalCount(this._data.length);
        };
        __egretProto__._onCellDataSource = function (cell, index) {
            var info = this._data[index];
            cell.setDelegate(this);
            cell.resetByData(info, index);
            cell.onItemTouch(this._onItemTouched, this);
        };
        /**
         * 根据秘术id， 滚动scrollview
         * @param initId
         */
        __egretProto__.scrollToItem = function (initId) {
            var self = this;
            var cols = 1;
            var visualRowCount = 2;
            var totalRow = Math.ceil(self._data.length / cols);
            for (var i = 0, li = self._data.length; i < li; i++) {
                if (self._data[i].initId == initId) {
                    var row = Math.ceil(i / cols);
                    if (row >= visualRowCount) {
                        self._gridScrollView.scrollToPercentVertical((row - (visualRowCount - 1)) / (totalRow - visualRowCount) * 100, 2.5, true);
                    }
                    else {
                        self._gridScrollView.scrollToPercentVertical(0, 2.5, true);
                    }
                    self._gridScrollView.refresh();
                    break;
                }
            }
        };
        //激活特效
        __egretProto__.playActiveEffect = function (index) {
            var self = this;
            var cell = self._gridScrollView.cellAtIndex(index);
            var iconPanel = cell.getWidgetByName("secret_icon");
            var itemListPanel = self.getWidgetByName("itemList");
            var pos = mo.convertNodeToNodeSpace(itemListPanel, iconPanel, mo.p(iconPanel.width / 2, iconPanel.height / 2));
            self.currCell = cell; //引导需要用到这个cell，请不要随便改动
            uw.UpArmature.play(itemListPanel, res.cca_ui.secretIconOpen, pos, function () {
                var info = cell._info;
                info.lvl = info._bakLvl; //还原真实等级
                cell.resetByData(info, index);
                self.playEffect();
                //引导需要用到这个事件监听，请不要随意修改 zxj
                mo.dispatchEvent([
                    [mo.actionDispatcher, gEventType.secretEffEnd]
                ], function () {
                }, null);
            });
        };
        //升级特效
        __egretProto__.playUpgradeEffect = function (index) {
            var self = this;
            var cell = self._gridScrollView.cellAtIndex(index);
            var iconPanel = cell.getWidgetByName("secret_icon");
            var itemListPanel = self.getWidgetByName("itemList");
            var pos = mo.convertNodeToNodeSpace(itemListPanel, iconPanel, mo.p(iconPanel.width / 2, iconPanel.height / 2));
            uw.UpArmature.play(itemListPanel, res.cca_ui.effect_upSkill, pos, function () {
                self.playEffect();
            }, self);
            var info = cell._info;
            //log("--->info1.skillId = %s, info.lvl = %s", info.skillId, info.lvl);
            info.skillId += 1;
            info.lvl += 1;
            //log("--->info2.skillId = %s, info.lvl = %s", info.skillId, info.lvl);
            cell.resetByData(info, index);
        };
        __egretProto__._hideBtns = function () {
            var backLayer = mo.runningScene.backLayer;
            backLayer.hideBackBtn();
            this.setVisibleByName("btnHelp", false);
            uw.TopMaskLayer.getInstance().show();
        };
        __egretProto__._restoreBtns = function () {
            var backLayer = mo.runningScene.backLayer;
            backLayer.showBackBtn();
            this.setVisibleByName("btnHelp", true);
            uw.TopMaskLayer.getInstance().close();
        };
        __egretProto__._onItemTouched = function (sender, eventType, opt) {
            var self = this, clazz = self.__class;
            var tipsW = self._tipsLeft;
            //位置适配
            var pos = mo.convertNodeToNodeSpace(self.getWidgetByName("root"), sender, mo.p(0, 0));
            pos = mo.pAdd(pos, mo.p(sender.getSize().width / 2, 0));
            pos = mo.pAdd(pos, mo.p(-tipsW.getSize().width / 2, 0));
            pos = mo.p(pos.x < 0 ? 0 : pos.x, pos.y);
            var vH = mo.visibleRect.getHeight();
            var diffH = (pos.y + tipsW.getSize().height) - vH;
            if (diffH > 0) {
                pos.y = pos.y - diffH;
            }
            tipsW.setPosition(pos);
            if (eventType == mo.TouchEvent.NODE_BEGIN) {
                tipsW.setVisible(true);
                var warriorTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_warrior, opt.tid);
                self._heroIconCtrl.resetByData(opt.tid);
                tipsW.setInfoByName("label_heroName", warriorTemp[uw.t_warrior_name]);
                tipsW.setInfoByName("label_status", opt.hasHero ? "(已召唤)" : "(未召唤)");
                tipsW.setColorByName("label_status", opt.hasHero ? cc.GREEN : cc.RED);
                tipsW.getWidgetByName("bar_fragment").setProgress(opt.progress[0], opt.progress[1]);
                tipsW.doLayoutByName("panel_linearH");
            }
            else if (eventType == mo.TouchEvent.NODE_END) {
                tipsW.setVisible(false);
            }
        };
        __egretProto__.menuHelp = function () {
            var layer = uw.UIHelpLayer.create(res.uiSecretRuleLayer_ui);
            layer.show();
        };
        SecretLayer.__className = "SecretLayer";
        SecretLayer.TIPS_1 = "tips";
        SecretLayer.PANEL_HERO_ICON = "panel_heroIcon";
        SecretLayer.PANEL_EQUIP_ICON = "panel_equipIcon";
        return SecretLayer;
    })(mo.DisplayLayer);
    uw.SecretLayer = SecretLayer;
    SecretLayer.prototype.__class__ = "uw.SecretLayer";
})(uw || (uw = {}));
