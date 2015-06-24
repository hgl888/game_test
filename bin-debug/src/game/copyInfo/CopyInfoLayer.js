/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var CopyInfoLayer = (function (_super) {
        __extends(CopyInfoLayer, _super);
        function CopyInfoLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = CopyInfoLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiCopyInfo_ui;
            self._swipeCount = 0;
            self._buffArr = [];
        };
        //@override
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self.onClickByName("btnContinue", self.menuEnterCopyStage, self);
        };
        __egretProto__.setCopyInfo = function (copyId) {
            var self = this;
            self._copyId = copyId;
            self._dataCtrl = uw.userDataCtrl.getCopyProgressByCopyId(copyId);
            for (var i = 0; i < 2; i++) {
                var item = self.getWidgetByName("buff" + i);
                item.setVisible(false);
                self._buffArr.push(item);
            }
            var primaryData = mo.getJSONWithFileName(uw.cfg_t_copyPrimary);
            var copysData = mo.getJSONWithFileName(uw.cfg_t_copy);
            var copyData = copysData[this._copyId];
            this.formatByName("mainTitle", primaryData[copyData[uw.t_copy_pCopyId]][uw.t_copyPrimary_name]);
            this.setInfoByName("subTitle", copyData[uw.t_copy_remark]);
            this.setInfoByName("desc", copyData[uw.t_copy_explain]);
            this.setInfoByName("labelStrength", copyData[uw.t_copy_strength]);
            this._setTicketCountLabel();
            this.onClickByName("btnContinue", this.menuEnterCopyStage, this);
            //画星星
            self.showCopySkill(copyData);
            //画星星
            self.showStar();
            //画怪物
            self.showMonster();
            //画掉落
            self.showDropItem();
            //画剩余次数
            self.showCreamInfo();
            //设置扫荡信息
            self.showWipeInfo();
            //画背景
            self.showBg();
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.FIXED_WIDTH);
        };
        __egretProto__.showBg = function () {
            var self = this;
            var copyTemp = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, self._copyId);
            var copyType = copyTemp[uw.t_copy_type];
            var pangBg = self.getWidgetByName(self.__class.PANEL_9BG);
            var isCream = copyType == uw.c_prop.copyTypeKey.cream;
            if (isCream) {
                pangBg.bgTexture = res.ui_panel.blk9_transparentred_png;
            }
            else {
                pangBg.bgTexture = res.ui_panel.blk9_transparent_png;
            }
            for (var i = 0; i < 4; i++) {
                self.setVisibleByName(mo.formatStr(self.__class.IMG_CORNER_TEMP, i), isCream);
            }
        };
        __egretProto__.showCopySkill = function (copyData) {
            var skillIds = copyData[uw.t_copy_copySkillIds];
            var id, widget, self = this;
            for (var i = 0; i < self._buffArr.length; i++) {
                widget = self._buffArr[i];
                id = skillIds[i];
                if (widget && id) {
                    var ctrl = uw.SkillIconCtrl.create(widget, id);
                    ctrl.showTip(true);
                }
                else {
                    widget.setVisible(false);
                }
            }
        };
        __egretProto__.showWipeInfo = function () {
            var self = this;
            var swipeCount = 0, texName;
            var wipeTimesBtn = self.getWidgetByName(self.__class.BTN_WIPETIMES);
            wipeTimesBtn.enableStroke(cc.c3b(0, 0, 0), 3);
            var wipeTimesBtnOpen = false;
            // 设置扫荡按钮是否可见
            if (!self._dataCtrl.canWipe(self._copyId)) {
                self.getWidgetByName("wipe").removeFromParent(true);
            }
            else {
                self.onClickByName(self.__class.BTN_WIPE, self.menuWipeOutOnce, self);
                self.onClickByName(self.__class.BTN_WIPETIMES, self.menuWipeNTimes, self);
                var isCream = self._dataCtrl.isCream(self._copyId);
                if (isCream) {
                    var opt = uw.userDataCtrl.getResetCopyCountOpt(self._copyId);
                    swipeCount = opt.leftTimes;
                    // 设置多次扫荡的按钮, N=0时，ICON显示为【无法扫荡】
                    wipeTimesBtn.setTitleText(mo.formatStr("   %s", swipeCount));
                    wipeTimesBtnOpen = swipeCount > 0;
                }
                else {
                    wipeTimesBtn.setTitleText("   10");
                    swipeCount = 10;
                    wipeTimesBtnOpen = true;
                }
                self._swipeCount = swipeCount;
                var showWipeBtn = swipeCount > 0;
                self.setVisibleByName(self.__class.IMG_NOWIPE, !showWipeBtn);
                self.setVisibleByName(self.__class.BTN_WIPE, showWipeBtn);
                self.setTouchEnabledByName(self.__class.BTN_WIPE, showWipeBtn);
                self.setVisibleByName(self.__class.BTN_WIPETIMES, showWipeBtn);
                wipeTimesBtn.setTouchEnabled(showWipeBtn && wipeTimesBtnOpen);
            }
        };
        __egretProto__.showStar = function () {
            if (this._dataCtrl.isTrial() || this._dataCtrl.isMirror()) {
                this.setVisibleByName("rank", false);
                return;
            }
            var _starCount = this._dataCtrl.getStar(this._copyId);
            for (var i = uw.CopyMaxStars - _starCount; i > 0; i--) {
                // 把红色的星星设置不可见
                this.setVisibleByName("star" + i, false);
            }
        };
        __egretProto__.showCreamInfo = function () {
            var self = this;
            var opt = uw.userDataCtrl.getResetCopyCountOpt(self._copyId);
            var restPanel = self.getWidgetByName("restPanel");
            var restPanelBuy = self.getWidgetByName("restPanelBuy");
            if (opt.isShow) {
                var flag = opt.hasTimes;
                restPanel.setVisible(flag);
                restPanelBuy.setVisible(!flag);
                self.setTouchEnabledByName("btnBuy", !flag);
                var w = flag ? restPanel : restPanelBuy;
                var str;
                if (flag) {
                    str = mo.formatStr("[ubb color=#e79057]%s[/ubb][ubb color=#e79057]/%s[/ubb]", opt.leftTimes, opt.totalTimes);
                }
                else {
                    str = mo.formatStr("[ubb color=red]%s[/ubb][ubb color=#e79057]/%s[/ubb]", opt.leftTimes, opt.totalTimes);
                }
                w.setInfoByName("restToday", { value: str, fontSize: 50 });
                self.onClickByName("btnBuy", self.onBtnBuy, self);
                self.setVisibleByName("btnBuy", opt.resetCountLeft != 0);
            }
            else {
                restPanel.setVisible(false);
                restPanelBuy.setVisible(false);
                self.setTouchEnabledByName("btnBuy", false);
            }
        };
        __egretProto__.onBtnBuy = function () {
            uw.log("onBtnBuy");
            var self = this;
            var opt = uw.userDataCtrl.getResetCopyCountOpt(self._copyId);
            uw.userDataCtrl.resetCopyCount(opt, function () {
                self.showCreamInfo();
                //设置扫荡信息
                self.showWipeInfo();
            }, self);
        };
        __egretProto__.menuWipeOutOnce = function (sender) {
            var self = this;
            if (self._copyWipeOutLayer)
                return;
            var opt = uw.userDataCtrl.getWipeCopyOpt(self._copyId, 1);
            uw.userDataCtrl.wipeCopy(opt, self.checkResult, self);
        };
        __egretProto__.menuWipeNTimes = function (sender) {
            var self = this;
            if (self._copyWipeOutLayer)
                return;
            var opt = uw.userDataCtrl.getWipeCopyOpt(self._copyId, self._swipeCount);
            uw.userDataCtrl.wipeCopy(opt, self.checkResult, self);
        };
        __egretProto__.checkResult = function (data) {
            var self = this;
            var _copyWipeOutLayer = self._copyWipeOutLayer = uw.CopyWipeOutLayer.create(self._copyId);
            _copyWipeOutLayer.setWipeData(data);
            _copyWipeOutLayer.show();
            _copyWipeOutLayer.onClose(function () {
                self._copyWipeOutLayer = null;
                //画剩余次数
                self.showCreamInfo();
                //设置扫荡信息
                self.showWipeInfo();
            });
            self._setTicketCountLabel();
            self.showCreamInfo();
        };
        __egretProto__.showMonster = function () {
            var self = this;
            var uiBorderArr = [];
            for (var i = uw.MonsterAppearMaxium; i > 0; i--) {
                var char = this.getWidgetByName("char" + i);
                uiBorderArr.push(char);
            }
            var ctrl, monsterW;
            if (self._dataCtrl.isMirror()) {
                while (uiBorderArr.length) {
                    monsterW = uiBorderArr.pop();
                    ctrl = uw.UICopyHeroIconCtrl.create(monsterW);
                    var c_mirror = mo.getJSONWithFileName(uw.cfg_c_mirror);
                    var firstCfg;
                    for (var heroId in c_mirror) {
                        firstCfg = c_mirror[heroId];
                        break;
                    }
                    //获取难度
                    var difficulty = self._dataCtrl.getIndexOfCopyId(self._copyId);
                    var monsterIds;
                    monsterIds = firstCfg[uw.c_mirror_monsterIds];
                    var monsterId = monsterIds[difficulty];
                    ctrl.resetByData(monsterId);
                    ctrl.setInfoByName(ctrl.__class.IMG_ICON, res.ui_panel.heroIcon_jpg);
                    ctrl.showTip(true);
                }
            }
            else {
                var monsterData = mo.getJSONWithFileName(uw.cfg_t_monster);
                var allMonsters = self._dataCtrl.getCombatInfo(self._copyId);
                var monsters = allMonsters[allMonsters.length - 1];
                var keyTempId, monType;
                for (var i = 0; i < monsters.length; i++) {
                    keyTempId = monsters[i];
                    if (keyTempId == 0)
                        continue;
                    monType = monsterData[keyTempId][uw.t_monster_type];
                    if (uw.isBoss(monType)) {
                        monsterW = this.getWidgetByName("charBoss");
                        monsterW.setVisible(true);
                    }
                    else {
                        monsterW = uiBorderArr.pop();
                    }
                    ctrl = uw.UIHeroIconCtrl.create(monsterW);
                    ctrl.resetByData(parseInt(keyTempId));
                    ctrl.showTip(true);
                }
                // 把boos的边框移动到第一个没有用到的小怪边框位置
                var lastUnUsedBorder = uiBorderArr[uiBorderArr.length - 1];
                if (lastUnUsedBorder) {
                    var pos = lastUnUsedBorder.getPosition();
                    this.setPositionByName("charBoss", pos);
                }
                while (uiBorderArr.length) {
                    uiBorderArr.pop().setVisible(false);
                }
            }
        };
        __egretProto__.showDropItem = function () {
            var self = this;
            var items = self._dataCtrl.getShowLootsByCopyId(self._copyId);
            var itemId, name, itemW, itemCtrl;
            for (var i = 0, li = items.length; i < li; i++) {
                itemId = items[i];
                name = "item" + i;
                itemW = self.getWidgetByName(name);
                itemCtrl = uw.UIItemIconCtrl.create(itemW);
                itemCtrl.resetByData(itemId);
                itemCtrl.showTip(true);
                itemW.setVisible(true);
            }
        };
        __egretProto__.menuEnterCopyStage = function (sender) {
            var self = this;
            var opt = uw.userDataCtrl.getResetCopyCountOpt(self._copyId);
            if (opt.isShow && !opt.hasTimes)
                return mo.showMsg(uw.id_c_msgCode.noCopyTimes);
            opt = uw.userDataCtrl.getWipeCopyOpt(self._copyId, 1);
            if (!opt.strengthEnough)
                return uw.userDataCtrl.showBuyStrength();
            //判断副本类型
            var pCopyType = self._dataCtrl.type, matrixType;
            var pCopyTypeKey = uw.c_prop.pCopyTypeKey, matrixTypeKey = uw.c_prop.matrixTypeKey;
            //副本
            if (pCopyType == pCopyTypeKey.normal) {
                matrixType = matrixTypeKey.copy;
            }
            else if (pCopyType == pCopyTypeKey.trial) {
                matrixType = matrixTypeKey.trial;
            }
            else if (pCopyType == pCopyTypeKey.tower) {
                matrixType = matrixTypeKey.tower;
            }
            else if (pCopyType == pCopyTypeKey.mirror) {
                matrixType = matrixTypeKey.mirrorA;
            }
            uw.pushSubModule(uw.SubModule.Embattle, matrixType, self._copyId);
        };
        __egretProto__._setTicketCountLabel = function () {
            var ticketCount = uw.userDataCtrl.getItemNum(uw.c_prop.spItemIdKey.sweepingTickets);
            this.setInfoByName(this.__class.LABEL_TICKETCOUNT, ticketCount);
            this.setColorByName(this.__class.LABEL_TICKETCOUNT, ticketCount > 0 ? cc.hexToColor("#d2904e") : cc.RED);
        };
        CopyInfoLayer.__className = "CopyInfoLayer";
        CopyInfoLayer.BTN_WIPE = "btn_wipeOnce";
        CopyInfoLayer.BTN_WIPETIMES = "btn_wipeTimes";
        CopyInfoLayer.LABEL_TICKETCOUNT = "label_ticketCount";
        CopyInfoLayer.PANEL_9BG = "panel_9bg";
        CopyInfoLayer.IMG_CORNER_TEMP = "img_corner%s";
        CopyInfoLayer.IMG_NOWIPE = "img_noWipe";
        return CopyInfoLayer;
    })(mo.DisplayLayer);
    uw.CopyInfoLayer = CopyInfoLayer;
    CopyInfoLayer.prototype.__class__ = "uw.CopyInfoLayer";
})(uw || (uw = {}));
