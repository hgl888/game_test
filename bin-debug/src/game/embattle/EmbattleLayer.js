/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var EmbattleLayer = (function (_super) {
        __extends(EmbattleLayer, _super);
        function EmbattleLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EmbattleLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiEmbattleLayer_ui;
            self._fightId = 0;
            self._matrixType = 0;
            self._matrixChanged = false;
            self._flying = false;
            self._pedestalHash = {};
            self._pedestalWarnHash = {};
            self._matrixHash = {};
            self._cardHash = {};
            self._curHeroData = [];
            self._allHeroData = [];
            self._secretHash = {};
            self._filterOptionMap = {};
            self._sortOptionMap = {};
        };
        __egretProto__.init = function (matrixType, copyId) {
            _super.prototype.init.call(this);
            var self = this;
            //清除PVP的布阵
            uw.userDataCtrl.clearMatrixPVP();
            var c_game = mo.getJSONWithFileName(uw.cfg_c_game);
            var heroSort = this._heroSort = c_game[uw.id_c_game.heroSort];
            var filterOptionMap = self._filterOptionMap;
            filterOptionMap[self.__class.SHOW_TYPE_ALL] = function (heroCtrl, index, arr) {
                return true;
            };
            filterOptionMap[self.__class.SHOW_TYPE_FRONT] = function (heroCtrl, index, arr) {
                var posZOrder = heroCtrl.warriorTemp[uw.t_warrior_posOrder];
                return posZOrder <= heroSort[0];
            };
            filterOptionMap[self.__class.SHOW_TYPE_MID] = function (heroCtrl, index, arr) {
                var posZOrder = heroCtrl.warriorTemp[uw.t_warrior_posOrder];
                return posZOrder > heroSort[0] && posZOrder <= heroSort[1];
            };
            filterOptionMap[self.__class.SHOW_TYPE_BACK] = function (heroCtrl, index, arr) {
                var posZOrder = heroCtrl.warriorTemp[uw.t_warrior_posOrder];
                return posZOrder > heroSort[1];
            };
            var sortOptMap = self._sortOptionMap;
            var HeroDataCtrl = uw.HeroDataCtrl;
            var sQuality = HeroDataCtrl.SORT_QUALITY;
            var sLvl = HeroDataCtrl.SORT_LVL;
            var sTempId = HeroDataCtrl.SORT_TEMP_ID;
            sortOptMap[self.__class.SORT_TYPE_MAIN] = mo.sortOption.bind({ list: [sLvl, sQuality, sTempId] });
            self._heroContainer = this.getWidgetByName("heroContainer");
            self._embattleContainer = this.getWidgetByName("panelBattle");
            self._labelCapacity = this.getWidgetByName("labelFightNum");
            self._panelBattle = this.getWidgetByName("panelBattle");
            self.onClickByName("btnAdjust", self.menuAdjust, self);
            //自适应
            this.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.EXACT_FIT);
            var scrollView = this.getWidgetByName("scrollView");
            var scrollViewbg = this.getWidgetByName("scrollViewbg");
            var width = ((mo.visibleRect.getSize().width - 920) - self._panelBattle.getSize().width) / 2;
            //            scrollViewbg.setScaleX(width/scrollViewbg.getSize().width);
            //            self._heroContainer.setSize(mo.size(width - 110, self._heroContainer.getSize().height));
            //            self._panelBattle.setSize(mo.size(width - 110, self._panelBattle.getSize().height));
            //
            var parameter = scrollView.getLayoutParameter(mo.LayoutParameterType.relative);
            parameter.getMargin().left += width;
            parameter = self._panelBattle.getLayoutParameter(mo.LayoutParameterType.relative);
            parameter.getMargin().left += width;
            self._fightId = copyId;
            self._matrixType = matrixType || uw.c_prop.matrixTypeKey.copy;
            // 镜像世界PVP
            if (self._matrixType == uw.c_prop.matrixTypeKey.mirrorPVPA) {
                var allHeroData = uw.userDataCtrl.getHeroDataCtrlList();
                var enemyMatrix = uw.mirrorDataCtrl.getEnemyHeros();
                var heroEntityKey = uw.dsConsts.HeroEntity;
                self._allHeroData = allHeroData.filter(function (heroCtrl, index, arr) {
                    for (var i = 0, li = enemyMatrix.length; i < li; i++) {
                        if (heroCtrl.tid == enemyMatrix[i][heroEntityKey.tempTid])
                            return true;
                    }
                });
            }
            else {
                self._allHeroData = uw.userDataCtrl.getHeroDataCtrlList();
            }
            //初始化UI
            self._initUI();
            //初始化widget
            self._initWidgetData();
            self.setGridView();
            //设置已经上阵的英雄
            self.setRolesMatrix();
            //设置小伙伴啦
            self.selectHeroList();
            //设置按钮的状态
            var frameName = this._matrixIsAttack() ? res.ui_common.btn_embattle_png : res.ui_common.btn_save_png;
            var startFightBtn = this.getWidgetByName(self.__class.BTN_START_FIGHT);
            startFightBtn.onClick(this.menuStartFight, this, null, 114);
            startFightBtn.loadTextures(frameName);
        };
        __egretProto__._initUI = function () {
            var self = this;
            self._detailInfo = self.getWidgetByName("detailInfo");
            var _matrixType = self._matrixType;
            if (_matrixType == uw.c_prop.matrixTypeKey.mirrorA || _matrixType == uw.c_prop.matrixTypeKey.mirrorPVPA) {
                self.setVisibleByName(self.__class.LABEL_MIRROR_TIPS, true);
                self.setInfoByName(self.__class.LABEL_MIRROR_TIPS, (_matrixType == uw.c_prop.matrixTypeKey.mirrorA) ? "镜像会复制相同英雄作为敌人" : "只可选择与对手防守阵容相同的英雄");
                self.enableStrokeByName(self.__class.LABEL_MIRROR_TIPS, mo.c3b(115, 37, 12), 3);
                return;
            }
            self.setVisibleByName(self.__class.LABEL_MIRROR_TIPS, false);
        };
        __egretProto__._matrixIsAttack = function () {
            var _matrixType = this._matrixType;
            if (_matrixType == uw.c_prop.matrixTypeKey.copy || _matrixType == uw.c_prop.matrixTypeKey.arenaA || _matrixType == uw.c_prop.matrixTypeKey.mirrorA || _matrixType == uw.c_prop.matrixTypeKey.mirrorPVPA || _matrixType == uw.c_prop.matrixTypeKey.tower || _matrixType == uw.c_prop.matrixTypeKey.trial) {
                return true;
            }
            else if (_matrixType == uw.c_prop.matrixTypeKey.arenaD || _matrixType == uw.c_prop.matrixTypeKey.mirrorD) {
                return false;
            }
        };
        __egretProto__._initWidgetData = function () {
            var widget;
            for (var j = 0; j < 5; j++) {
                widget = this.getWidgetByName("pedestal" + j);
                widget.posId = j;
                this._pedestalHash[j] = widget;
            }
            for (var k = 0; k < 5; k++) {
                widget = this.getWidgetByName("pedestalWarn" + k);
                widget.setVisible(false);
                this._pedestalWarnHash[k] = widget;
            }
            for (var h = 0; h < 4; h++) {
                widget = this.getWidgetByName("skill" + h);
                this._secretHash[h] = widget;
            }
        };
        __egretProto__.selectHeroList = function () {
            // 选择器
            var self = this;
            var tabList = uw.TabListCtrl.create(self.getWidgetByName("tabEmbattle"));
            tabList.onTabClicked(self._onTabClicked, self);
            var tabs = [
                { name: self.__class.BTN_ALL, title: "全部" },
                { name: self.__class.BTN_FRONT, title: "前排" },
                { name: self.__class.BTN_MID, title: "中排" },
                { name: self.__class.BTN_BACK, title: "后排" }
            ];
            tabList.resetByData(tabs);
            tabList.movePointerByName(self.__class.BTN_ALL);
        };
        __egretProto__.setCurList = function (showType) {
            var self = this;
            if (self._curShowType != showType) {
                var filter = self._filterOptionMap[showType];
                self._cardHash = {};
                self._curHeroData = self._allHeroData.filter(filter);
                self._curHeroData.sort(self._sortOptionMap[self.__class.SORT_TYPE_MAIN]);
                self._gridScrollView.setTotalCount(self._curHeroData.length);
                self._gridScrollView.stopAutoScrollChildren();
                self._gridScrollView.jumpToTop();
                self._curShowType = showType;
            }
        };
        __egretProto__._onTabClicked = function (sender) {
            var self = this;
            var name = sender.getName();
            var showType = self.__class.SHOW_TYPE_ALL;
            switch (name) {
                case self.__class.BTN_ALL:
                    showType = self.__class.SHOW_TYPE_ALL;
                    break;
                case self.__class.BTN_FRONT:
                    showType = self.__class.SHOW_TYPE_FRONT;
                    break;
                case self.__class.BTN_MID:
                    showType = self.__class.SHOW_TYPE_MID;
                    break;
                case self.__class.BTN_BACK:
                    showType = self.__class.SHOW_TYPE_BACK;
                    break;
            }
            self.setCurList(showType);
            return true;
        };
        __egretProto__.setGridView = function () {
            var viewSize = this._heroContainer.getSize();
            var cellSize = mo.size(viewSize.width / 5, 268);
            this._gridScrollView = mo.GridScrollView.create(viewSize, cellSize, 5, 0, this._gridviewDataSource, this);
            this._gridScrollView.setDirection(mo.ScrollViewDir.vertical);
            this._gridScrollView.setBounceEnabled(false);
            this._gridScrollView.jumpToTop();
            this._heroContainer.addChild(this._gridScrollView);
        };
        __egretProto__._gridviewDataSource = function (convertView, idx, gridView) {
            var cell = convertView;
            var heroDataCtrl = this._curHeroData[idx];
            if (heroDataCtrl) {
                var card = cell.getChildByTag(1);
                if (!card) {
                    var cellSize = cell.getCellSize();
                    card = uw.EmbattleHeroCard.create();
                    card.setTag("1");
                    card.setLevelVisible(true);
                    card.setPosition(cellSize.width / 2, cellSize.height / 2);
                    card.onClick(this._gridCardTouchEvent, this);
                    cell.addChild(card);
                }
                card.resetByData(heroDataCtrl);
                var matrixCard = this.getMatrixCardByInstanceId(card.getInstanceId());
                if (matrixCard) {
                    card.setPlayed(true);
                }
                else {
                    card.setPlayed(false);
                }
                //装到_cardArr里
                this._cardHash[card.getInstanceId()] = card;
            }
            return cell;
        };
        __egretProto__.setRolesMatrix = function () {
            var self = this;
            var heroDataCtrlList = uw.userDataCtrl.getMatrixByType(self._matrixType);
            var heroDataCtrl, pedestal, rolePos;
            for (var i = 0; i < heroDataCtrlList.length; i++) {
                heroDataCtrl = heroDataCtrlList[i];
                if (heroDataCtrl != null) {
                    rolePos = i;
                    pedestal = self._pedestalHash[rolePos];
                    var matrixCard = uw.EmbattleHeroCard.create();
                    matrixCard.resetByData(heroDataCtrl);
                    matrixCard.onClick(this._matrixTouchEvent, this);
                    matrixCard.setPosition(pedestal.getPosition());
                    matrixCard.addPedestal(pedestal);
                    matrixCard.setLevelVisible(true);
                    matrixCard.setZOrder(99);
                    self._embattleContainer.addChild(matrixCard);
                    self._matrixHash[matrixCard.getInstanceId()] = matrixCard;
                }
            }
            this.setCombatInfo();
        };
        /**
         * 引导用的
         * @param heroTid
         * @returns {*}
         */
        __egretProto__.getHeroCardByHeroTid = function (heroTid) {
            var heroDataCtrl = uw.userDataCtrl.getHeroDataCtrlByTid(heroTid);
            return this._cardHash[heroDataCtrl.id];
        };
        __egretProto__.getPedestalByPId = function (pId) {
            return this._pedestalHash[pId];
        };
        __egretProto__.getHeroCardByInstanceId = function (instanceId) {
            return this._cardHash[instanceId];
        };
        __egretProto__.getMatrixCardByInstanceId = function (instanceId) {
            return this._matrixHash[instanceId];
        };
        __egretProto__.getHeroCardByIndex = function (index) {
            var heroDataCtrl = this._curHeroData[index];
            return this.getHeroCardByHeroTid(heroDataCtrl.tid);
        };
        __egretProto__.setCombatInfo = function () {
            var hero, powerCount = 0;
            for (var key in this._pedestalHash) {
                hero = this._pedestalHash[key].hero;
                if (hero) {
                    powerCount += hero.getDataCtrl().combatEff;
                }
            }
            this._labelCapacity.setText(powerCount);
        };
        __egretProto__._newCard = function (heroInfo, top) {
            var card = uw.EmbattleHeroCard.create();
            card.setLevelVisible(true);
            card.resetByData(heroInfo);
            card.onClick(this._matrixTouchEvent, this);
            if (!top) {
                card.setZOrder(99);
                this._embattleContainer.addChild(card);
            }
            else {
                card.setZOrder(999999999);
                mo.runningScene.addChild(card);
            }
            return card;
        };
        __egretProto__._isFlyingState = function () {
            if (!this._flying) {
                this._flying = true;
                return false;
            }
            else {
                return true;
            }
        };
        __egretProto__._gridCardTouchEvent = function (gridCard) {
            if (this._isFlyingState()) {
                return;
            }
            var isPlayed = gridCard.getPlayed();
            if (isPlayed) {
                var matrixCard = this._matrixHash[gridCard.getInstanceId()];
                this._jumpToGrid(matrixCard, gridCard);
            }
            else {
                if (this._getCountOfPlayed() >= 5) {
                    this._matrixWarn();
                    this._flying = false;
                    return;
                }
                var size = gridCard.getSize();
                var nodePos = mo.convertNodeToNodeSpace(this._embattleContainer, gridCard, mo.p(size.width / 2, size.height / 2));
                var heroInfo = gridCard.getDataCtrl();
                var matrixCard = this._newCard(heroInfo);
                matrixCard.setPosition(nodePos);
                matrixCard.setOpacity(128);
                this._jumpToSlot(matrixCard, gridCard);
                mo.playRoleMatrixWordAudio(heroInfo.tid);
            }
        };
        __egretProto__._matrixTouchEvent = function (matrixCard) {
            if (this._isFlyingState()) {
                return;
            }
            var gridCard = this.getHeroCardByInstanceId(matrixCard.getInstanceId());
            this._jumpToGrid(matrixCard, gridCard);
        };
        __egretProto__._matrixWarn = function () {
            var pedestalWarn;
            for (var key in this._pedestalWarnHash) {
                pedestalWarn = this._pedestalWarnHash[key];
                pedestalWarn.setVisible(true);
                pedestalWarn.setOpacity(0);
                var seq = mo.sequence(mo.fadeIn(0.13), mo.callFunc(function (sender) {
                    sender.setVisible(false);
                }, this));
                pedestalWarn.runAction(seq);
            }
        };
        __egretProto__._copyACard = function (oldCard) {
            var heroInfo = oldCard.getDataCtrl();
            return this._newCard(heroInfo, true);
        };
        __egretProto__._jumpToGrid = function (matrixCard, gridCard) {
            var self = this;
            var curPosZOrder = matrixCard.getPosZOrder(), targetPos;
            if (gridCard) {
                gridCard.setPlayed(false);
                var size = gridCard.getSize();
                targetPos = mo.convertNodeToNodeSpace(this._embattleContainer, gridCard, mo.p(size.width / 2, size.height / 2));
            }
            else {
                targetPos = mo.p(716, 500);
            }
            //移动格子
            var pedestal, hero, arr = [];
            for (var key in self._pedestalHash) {
                pedestal = self._pedestalHash[key];
                hero = pedestal.hero;
                if (hero) {
                    if (hero.getPosZOrder() > curPosZOrder) {
                        arr.push(pedestal);
                    }
                }
            }
            var prePedestal, curHero, originPedestal = matrixCard.getPedestal();
            matrixCard.removePedestal();
            for (var i = 0; i < arr.length; i++) {
                pedestal = arr[i];
                curHero = pedestal.hero;
                if (!prePedestal) {
                    prePedestal = originPedestal;
                }
                if (curHero) {
                    curHero.removePedestal();
                    curHero.addPedestal(prePedestal);
                    self.moveMatrixCard(curHero, prePedestal);
                }
                prePedestal = pedestal;
            }
            delete self._matrixHash[matrixCard.getInstanceId()];
            self.setCombatInfo();
            self._matrixChanged = true;
            var seq = mo.sequence(mo.spawn(mo.moveTo(0.1, targetPos).setEase(mo.Ease.sineIn), mo.fadeOut(0.07)), mo.callFunc(function (senderHero) {
                senderHero.removeFromParent(true);
                self._flying = false;
            }, this));
            matrixCard.stopAllActions();
            matrixCard.setTouchEnabled(false);
            matrixCard.runAction(seq);
        };
        __egretProto__._jumpToSlot = function (matrixCard, gridCard) {
            var self = this;
            gridCard.setPlayed(true);
            var curPosZOrder = matrixCard.getPosZOrder(), hero, pedestal, arr = [];
            for (var key in self._pedestalHash) {
                pedestal = self._pedestalHash[key];
                hero = pedestal.hero;
                if (hero) {
                    if (hero.getPosZOrder() > curPosZOrder) {
                        arr.push(pedestal);
                    }
                }
                else {
                    arr.push(pedestal);
                }
            }
            var preHero, curHero, targetPedestal;
            for (var i = 0; i < arr.length; i++) {
                pedestal = arr[i];
                if (!preHero) {
                    if (!targetPedestal) {
                        targetPedestal = pedestal;
                    }
                    preHero = pedestal.hero;
                    if (preHero) {
                        preHero.removePedestal();
                    }
                }
                else {
                    curHero = pedestal.hero;
                    if (curHero) {
                        curHero.removePedestal();
                    }
                    preHero.addPedestal(pedestal);
                    self.moveMatrixCard(preHero, pedestal);
                    preHero = curHero;
                }
            }
            self._matrixHash[matrixCard.getInstanceId()] = matrixCard;
            matrixCard.addPedestal(targetPedestal);
            self.setCombatInfo();
            self._matrixChanged = true;
            var seq = mo.sequence(mo.spawn(mo.moveTo(0.1, targetPedestal.getPosition()).setEase(mo.Ease.sineOut), mo.fadeIn(0.1)), mo.callFunc(function (senderHero) {
                senderHero.setTouchEnabled(true);
                self._flying = false;
            }, this));
            matrixCard.stopAllActions();
            matrixCard.setTouchEnabled(false);
            matrixCard.runAction(seq);
        };
        __egretProto__.moveMatrixCard = function (heroCard, pedestal) {
            if (!pedestal)
                return;
            var seq = mo.sequence(mo.moveTo(0.09, pedestal.getPosition()).setEase(mo.Ease.backInOut));
            heroCard.runAction(seq);
        };
        __egretProto__._getCountOfPlayed = function () {
            var hero, count = 0;
            for (var key in this._pedestalHash) {
                hero = this._pedestalHash[key].hero;
                if (hero) {
                    count++;
                }
            }
            return count;
        };
        __egretProto__.saveMatrix = function () {
            var self = this;
            if (self._matrixChanged) {
                var posDic = {}, pedestal;
                for (var key in self._pedestalHash) {
                    pedestal = self._pedestalHash[key];
                    if (pedestal.hero) {
                        posDic[pedestal.posId] = pedestal.hero.getInstanceId();
                    }
                }
                if (self._matrixType == uw.c_prop.matrixTypeKey.mirrorPVPA) {
                    //镜像世界PVP服务端不需要保存布阵
                    uw.userDataCtrl.setMatrixPVP(posDic);
                    self.saveMatrixSucc();
                }
                else {
                    uw.userDataCtrl.saveMatrixByType(self._matrixType, posDic, function () {
                        self.saveMatrixSucc();
                        uw.log("保存布阵成功!");
                    }, self);
                }
            }
            else {
                self.saveMatrixSucc();
            }
        };
        __egretProto__.saveMatrixSucc = function () {
            var isAttack = this._matrixIsAttack(), self = this;
            if (isAttack) {
                if (self._matrixType == uw.c_prop.matrixTypeKey.arenaA) {
                    uw.FightMainCtrl.pk(self._matrixType, self._fightId, function () {
                    }, self);
                }
                else {
                    uw.FightMainCtrl.fight(self._matrixType, self._fightId, function () {
                    }, self);
                }
            }
            else {
                mo.sceneMgr.popScene();
            }
        };
        __egretProto__.menuStartFight = function () {
            var self = this;
            if (self._getCountOfPlayed() == 0)
                return mo.showMsg(uw.id_c_msgCode.noMatrix);
            //镜像世界需要判断布阵人数
            if ((self._matrixType == uw.c_prop.matrixTypeKey.mirrorA || self._matrixType == uw.c_prop.matrixTypeKey.mirrorD) && self._getCountOfPlayed() < 5)
                return mo.showMsg(uw.id_c_msgCode.cantLessThan5);
            self.saveMatrix();
        };
        __egretProto__.setSecretData = function () {
            var self = this;
            var iconData = uw.userDataCtrl.getSecretMatrixByType(self._matrixType);
            var _secretHash = this._secretHash, secretW, secretData;
            for (var key in _secretHash) {
                secretW = _secretHash[key];
                secretData = iconData[key];
                if (secretData) {
                    var skillData = uw.getSkillData(secretData.skillId, 0);
                    secretW.setInfoByName("skill", skillData.icon);
                    secretW.setVisibleByName("skill", true);
                    secretW.secretData = secretData;
                    var TE = mo.TouchEvent;
                    secretW.addEventListener(TE.NODE_BEGIN, self.menuShowSecretSkillInfo, self);
                    secretW.addEventListener(TE.NODE_END, self.menuShowSecretSkillInfo, self);
                }
                else {
                    secretW.setVisibleByName("skill", false);
                }
            }
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            this.setSecretData();
        };
        __egretProto__.menuShowSecretSkillInfo = function (event) {
            var menuItem = event.target;
            var type = event.type;
            var self = this, secretData = menuItem.secretData;
            var skillData = uw.getSkillData(secretData.skillId, 0);
            if (type == mo.TouchEvent.NODE_BEGIN) {
                var size = menuItem.getSize();
                self._detailInfo.setVisible(true);
                self._detailInfo.setInfoByName("icon", skillData.icon);
                self._detailInfo.formatByName("lvl", secretData.lvl);
                self._detailInfo.setInfoByName("name", skillData.name);
                var desc = self._detailInfo.getWidgetByName("desc");
                var originHeight = desc.getSize().height;
                desc.setAutoSizeHeight(true);
                desc.setOption(skillData.text);
                var diffHeight = originHeight - desc.getSize().height;
                self._detailInfo.setSize(self._detailInfo.getSize().width, self._detailInfo.getSize().height - diffHeight);
            }
            else {
                self._detailInfo.setVisible(false);
            }
        };
        __egretProto__.menuAdjust = function () {
            var self = this;
            uw.pushSubModule(uw.SubModule.SecretTune, self._matrixType);
        };
        EmbattleLayer.__className = "EmbattleLayer";
        EmbattleLayer.BTN_ALL = "btnAll";
        EmbattleLayer.BTN_FRONT = "btnFront";
        EmbattleLayer.BTN_MID = "btnMid";
        EmbattleLayer.BTN_BACK = "btnBack";
        EmbattleLayer.SHOW_TYPE_ALL = 1;
        EmbattleLayer.SHOW_TYPE_FRONT = 2;
        EmbattleLayer.SHOW_TYPE_MID = 3;
        EmbattleLayer.SHOW_TYPE_BACK = 4;
        EmbattleLayer.SORT_TYPE_MAIN = 1001;
        EmbattleLayer.LABEL_MIRROR_TIPS = "label_mirrorTips";
        EmbattleLayer.BTN_START_FIGHT = "btnStartFight"; //出战按键
        return EmbattleLayer;
    })(mo.DisplayLayer);
    uw.EmbattleLayer = EmbattleLayer;
    EmbattleLayer.prototype.__class__ = "uw.EmbattleLayer";
})(uw || (uw = {}));
