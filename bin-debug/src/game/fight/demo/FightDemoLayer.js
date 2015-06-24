var uw;
(function (uw) {
    var FightDemoLayer = (function (_super) {
        __extends(FightDemoLayer, _super);
        function FightDemoLayer() {
            _super.apply(this, arguments);
            this._isHeroList = true;
            this._selectIndex = -1;
        }
        var __egretProto__ = FightDemoLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._jsonPath = res.uiFightDemoLayer_ui;
        };
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            uw.FightDemoCtrl.create(self);
            var w = mo.visibleRect.getWidth() * 1.2, h = mo.visibleRect.getHeight() * 1.2;
            self._maskLayer = mo.UIPanel.create();
            self._maskLayer.setSize(mo.size(w, h));
            self._maskLayer.bgOpacity = 200;
            self._maskLayer.bgColor = mo.c3b(0, 0, 0);
            self._maskLayer.setPosition(mo.visibleRect.center());
            self._maskLayer.setAnchorPoint(0.5, 0.5);
            //self._maskLayer.ignoreAnchorPointForPosition(false);
            self._maskLayer.setZOrder(0);
            self._maskLayer.setVisible(false);
            self.addChild(self._maskLayer);
            self.initBg();
            self.initSkillBtn(null);
            var root = self.getWidgetByName("root");
            root.getParent().setZOrder(10000);
            root.setTouchEnabled(false);
            //切换文字
            var str = "    [ubb color=red]英雄[/ubb] / 怪物";
            var label_changeList = self.getWidgetByName("label_changeList");
            self.setInfoByName("label_changeList", { value: str, fontSize: 60 });
            label_changeList.onClick(this._onChangeList, self);
            self._initHeroes();
            self._initMonsters();
            self._initMixs();
            self._changeList();
            self._initAction();
        };
        __egretProto__._initAction = function () {
            var self = this;
            var btn_run = self.getWidgetByName("btn_run");
            var btn_hit = self.getWidgetByName("btn_hit");
            var btn_freeze = self.getWidgetByName("btn_freeze");
            var btn_dead = self.getWidgetByName("btn_dead");
            var btn_win = self.getWidgetByName("btn_win");
            btn_run.onClick(this._onClickRun, this);
            btn_hit.onClick(this._onClickHit, this);
            btn_freeze.onClick(this._onClickFreeze, this);
            btn_dead.onClick(this._onClickDead, this);
            btn_win.onClick(this._onClickWin, this);
            btn_run.setPressedActionEnabled(true);
            btn_hit.setPressedActionEnabled(true);
            btn_freeze.setPressedActionEnabled(true);
            btn_dead.setPressedActionEnabled(true);
            btn_win.setPressedActionEnabled(true);
        };
        __egretProto__._onClickRun = function () {
            uw.fightDemoCtr.onAction(uw.Fight.HeroAction.run);
        };
        __egretProto__._onClickHit = function () {
            uw.fightDemoCtr.onAction(uw.Fight.HeroAction.hit);
        };
        __egretProto__._onClickFreeze = function () {
            uw.fightDemoCtr.onAction(uw.Fight.HeroAction.freeze);
        };
        __egretProto__._onClickDead = function () {
            uw.fightDemoCtr.onAction(uw.Fight.HeroAction.dead);
        };
        __egretProto__._onClickWin = function () {
            uw.fightDemoCtr.onAction(uw.Fight.HeroAction.win);
        };
        __egretProto__.showMaskLayer = function () {
            this._maskLayer.setVisible(true);
        };
        __egretProto__.hideMaskLayer = function () {
            this._maskLayer.setVisible(false);
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            uw.fightDemoCtr.onExit();
            uw.fightScene = null;
        };
        __egretProto__.addChar = function (tempId, isSelf, cb, target) {
            var self = this;
            var heroRole = uw.FightHeroRole.create();
            heroRole.initWithData(tempId, isSelf, function () {
                cb.call(target, heroRole);
            });
            heroRole.setZOrder(-1);
            self.addChild(heroRole);
            return heroRole;
        };
        __egretProto__.showMixList = function () {
            var self = this;
            var root = self.getWidgetByName("root");
            self._listView_mixs.setVisible(false);
            self._listView_heroes.setVisible(false);
            self._listView_monsters.setVisible(false);
            self._curListView = self._listView_mixs;
            self._curListView.setVisible(true);
        };
        __egretProto__.initSkillBtn = function (member) {
            var self = this;
            //技能按钮
            var btn_normalAttack = self.getWidgetByName("btn_normalAttack");
            var btn_skill1 = self.getWidgetByName("btn_skill1");
            var btn_skill2 = self.getWidgetByName("btn_skill2");
            var btn_skill3 = self.getWidgetByName("btn_skill3");
            var btn_mixSkill = self.getWidgetByName("btn_mixSkill");
            this.enableBtnTouch(btn_normalAttack, false);
            this.enableBtnTouch(btn_skill1, false);
            this.enableBtnTouch(btn_skill2, false);
            this.enableBtnTouch(btn_skill3, false);
            this.enableBtnTouch(btn_mixSkill, false);
            if (!member)
                return;
            btn_normalAttack.onClick(this._onClickNormalSkill, this);
            btn_skill1.onClick(this._onClickSkill1, this);
            btn_skill2.onClick(this._onClickSkill2, this);
            btn_skill3.onClick(this._onClickSkill3, this);
            btn_mixSkill.onClick(this._onClickMixSkill, this);
            this.enableBtnTouch(btn_normalAttack, true, member.fightOption.curNormalSkill.skillDisplay[uw.t_skillDisplay_id]);
            for (var i = 0; i < member.curDemoFightSkills.length; i++) {
                var locFightSkill = member.curDemoFightSkills[i];
                if (!locFightSkill)
                    continue;
                var locAction = locFightSkill.skillDisplay[uw.t_skillDisplay_action];
                var locId = locFightSkill.skillDisplay[uw.t_skillDisplay_id];
                switch (locAction) {
                    case uw.skillAction.SKILL_ATTACK1:
                        this.enableBtnTouch(btn_skill1, true, locId);
                        break;
                    case uw.skillAction.SKILL_ATTACK2:
                        this.enableBtnTouch(btn_skill2, true, locId);
                        break;
                    case uw.skillAction.SKILL_ATTACK3:
                        this.enableBtnTouch(btn_skill3, true, locId);
                        break;
                }
            }
            if (member.fightOption.curMixSkill) {
                this.enableBtnTouch(btn_mixSkill, true, member.fightOption.curMixSkill.skillDisplay[uw.t_skillDisplay_id]);
            }
        };
        __egretProto__.enableBtnTouch = function (node, bool, id) {
            var labelId = node.getWidgetByName("label_id");
            if (bool) {
                node.setPressedActionEnabled(true);
                node.setTouchEnabled(true);
                node.setGray(false);
                node.setOpacity(250);
                labelId.setText("(" + id + ")");
            }
            else {
                node.setPressedActionEnabled(false);
                node.setTouchEnabled(false);
                node.setGray(true);
                node.setOpacity(50);
                labelId.setText("");
            }
        };
        __egretProto__._onClickNormalSkill = function () {
            uw.fightDemoCtr.onSkill(uw.skillAction.NORMAL_ATTACK);
        };
        __egretProto__._onClickSkill1 = function () {
            uw.fightDemoCtr.onSkill(uw.skillAction.SKILL_ATTACK1);
        };
        __egretProto__._onClickSkill2 = function () {
            uw.fightDemoCtr.onSkill(uw.skillAction.SKILL_ATTACK2);
        };
        __egretProto__._onClickSkill3 = function () {
            uw.fightDemoCtr.onSkill(uw.skillAction.SKILL_ATTACK3);
        };
        __egretProto__._onClickMixSkill = function () {
            uw.fightDemoCtr.onSkill(uw.skillAction.UNIQUE_ATTACK);
        };
        __egretProto__._onChangeList = function () {
            var self = this;
            self._selectIndex = -1;
            self._isHeroList = !self._isHeroList;
            self._changeList();
        };
        __egretProto__._changeList = function () {
            var self = this;
            var root = self.getWidgetByName("root");
            self._listView_mixs.setVisible(false);
            self._listView_heroes.setVisible(false);
            self._listView_monsters.setVisible(false);
            self._listView_mixs.setScrollViewTouchEnabled(false);
            self._listView_heroes.setScrollViewTouchEnabled(false);
            self._listView_monsters.setScrollViewTouchEnabled(false);
            var str = "";
            if (self._isHeroList) {
                str = "    [ubb color=red]英雄[/ubb] / 怪物";
                self._curListView = self._listView_heroes;
            }
            else {
                str = "    英雄 / [ubb color=red]怪物[/ubb]";
                self._curListView = self._listView_monsters;
            }
            //改变当前文字
            var label_changeList = self.getWidgetByName("label_changeList");
            self.setInfoByName("label_changeList", { value: str, fontSize: 60 });
            self._curListView.setVisible(true);
            self._curListView.setScrollViewTouchEnabled(true);
        };
        __egretProto__._initHeroes = function () {
            var self = this;
            self._listView_heroes = self._createGridScrollView("listView_heroes", uw.FightDemoCell, 1, self._onCellHeroDataSource);
            self._listView_heroes.parent.setTouchEnabled(false);
            self._listView_heroes.parent.bgOpacity = 30;
            self._listView_heroes.parent.bgColor = mo.c3b(255, 0, 0);
            var heroDataList = this._getHeroList(true);
            self._listView_heroes.myData = heroDataList;
            self._listView_heroes.setTotalCount(heroDataList.length);
        };
        __egretProto__._onCellHeroDataSource = function (cell, index) {
            var self = this;
            var myData = self._listView_heroes.myData;
            var info = myData[index];
            self._onCellDataSource(cell, info, false);
        };
        __egretProto__._initMonsters = function () {
            var self = this;
            self._listView_monsters = self._createGridScrollView("listView_monters", uw.FightDemoCell, 1, self._onCellMonsterDataSource);
            self._listView_monsters.parent.setTouchEnabled(false);
            var dataList = this._getHeroList(false);
            self._listView_monsters.myData = dataList;
            self._listView_monsters.setTotalCount(dataList.length);
        };
        __egretProto__._onCellMonsterDataSource = function (cell, index) {
            var self = this;
            var myData = self._listView_monsters.myData;
            var info = myData[index];
            self._onCellDataSource(cell, info, false);
        };
        __egretProto__._initMixs = function () {
            var self = this;
            //文字
            var str = "    秘术  ";
            var label_changeMix = self.getWidgetByName("label_changeMix");
            self.setInfoByName("label_changeMix", { value: str, fontSize: 60 });
            label_changeMix.onClick(this.showMixList, self);
            var self = this;
            self._listView_mixs = self._createGridScrollView("listView_mixs", uw.FightDemoCell, 1, self._onCellMixDataSource);
            self._listView_mixs.parent.setTouchEnabled(false);
            var dataList = this._getMixData();
            self._listView_mixs.myData = dataList;
            self._listView_mixs.setTotalCount(dataList.length);
        };
        __egretProto__._onCellMixDataSource = function (cell, index) {
            var self = this;
            var myData = self._listView_mixs.myData;
            var info = myData[index];
            self._onCellDataSource(cell, info, true);
        };
        __egretProto__._getMixData = function () {
            var items = [];
            var t_skillDisplay = mo.getJSONWithFileName(uw.cfg_t_skillDisplay);
            for (var key in uw.fightMixSkillEffectCtrl.mixSkillShowIds) {
                var dId = uw.fightMixSkillEffectCtrl.mixSkillShowIds[key];
                var skillDisplayData = t_skillDisplay[dId];
                items.push(skillDisplayData);
            }
            return items;
        };
        __egretProto__._onCellDataSource = function (cell, info, isMix) {
            cell.resetByData(info);
            if (!cell.listenerInited) {
                cell.listenerInited = true;
                cell.setTouchEnabled(true);
                if (!isMix)
                    cell.onClick(this._onRoleCellClick, this);
                else
                    cell.onClick(this._onMixCellClick, this);
            }
        };
        __egretProto__._onMixCellClick = function (cell, touchEvent, index) {
            this._onCellClick(cell, index, true);
        };
        __egretProto__._onRoleCellClick = function (cell, touchEvent, index) {
            this._onCellClick(cell, index, false);
        };
        __egretProto__._onCellClick = function (cell, index, isMix) {
            var self = this;
            if (self._curCell) {
                self._curCell.initStyle();
            }
            var myData = this._curListView.myData;
            if (index != null) {
                cell = myData[index];
            }
            cell.setCurStyle();
            if (self._curCell == cell)
                return;
            self._curCell = cell;
            if (!isMix)
                uw.fightDemoCtr.initSelfMember(cell.data);
            else
                uw.fightMainCtrl.onPlayMix(cell.data);
        };
        __egretProto__._getHeroList = function (isHero) {
            var t_warrior = mo.getJSONWithFileName(uw.cfg_t_warrior);
            var items = [];
            for (var key in t_warrior) {
                var warriorData = t_warrior[key];
                var id = warriorData[uw.t_warrior_id], isTest = warriorData[uw.t_warrior_isTest], audioDemo = warriorData[uw.t_warrior_audioDemo], name = warriorData[uw.t_warrior_name];
                if (isHero) {
                    if (id >= 10000)
                        break;
                }
                else {
                    if (id < 10000)
                        continue;
                }
                //naive下只显示音效需求
                var armatureDemoEnabled = mo.project.armatureDemoEnabled;
                if (armatureDemoEnabled == 1) {
                    if (!audioDemo)
                        continue;
                }
                else {
                    if (!isTest)
                        continue;
                }
                items.push(warriorData);
            }
            return items;
        };
        __egretProto__._updateItemColor = function (index) {
            var self = this;
            var items = self._curListView.items;
            for (var i = 0; i < items.length; i++) {
                var locItem = items[i];
                locItem.bgOpacity = 0;
                if (locItem.index == index) {
                    locItem.bgOpacity = 100;
                }
            }
        };
        __egretProto__.initBg = function () {
            var self = this;
            var copyId = uw.Fight.arenaCopyId;
            var resArr = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId)[uw.t_copy_copyBgId];
            var bgId = resArr[0];
            var bgPath = resHelper.getFightBgPath(bgId);
            res.load([bgPath], function () {
                var flipped = bgId > 0 ? 1 : -1;
                this._bgImage = mo.UIImage.create();
                this._bgImage.loadTexture(bgPath);
                //this._bgImage.setPosition(mo.visibleRect.top());
                this.addChild(this._bgImage);
                this._bgImage.zOrder = -99999999;
                self._bgImage.setAnchorPoint(0, 0);
                var size = self._bgImage.getSize();
                var scaleTimes = mo.visibleRect.getWidth() / size.width;
                if (scaleTimes > 1) {
                    self._bgImage.setScale(scaleTimes * flipped, 1);
                }
            }, self);
        };
        /**
         * debug技能目标范围
         * @param type 0:圆形, 1：多边形
         * @param data
         */
        __egretProto__.addSkillAreaDebug = function (type, data) {
            if (!mo.project.fightAreaEnabled)
                return;
            //todo ts
            /*var drawNode = cc.DrawNode.create();
             var vertices = [];
             if (type == 0) {
             var radius = data.radius, segments = 50, center = data.center;
             var coef = 2.0 * Math.PI / segments;
             for (var i = 0; i <= segments; i++) {
             var rads = i * coef;
             var j = radius * Math.cos(rads) + center.x;
             var k = radius * Math.sin(rads) + center.y;
             vertices.push(mo.p(j, k));
             }
             }
             if (type == 1) {
             vertices = data.vertices;
             }
             //var pos = data.pos;
             var pos = mo.p(0,0);
             var originPos = uw.fightUtils.originPos;
             pos.x += originPos.x;
             pos.y += originPos.y;
             drawNode.setPosition(pos);
             drawNode.drawPoly(vertices, mo.c4f(1, 0.1, 0.1, 0.1),2, mo.c4f(1, 0.1, 0.1, 1));
             this.addChild(drawNode);
             drawNode.zOrder = 2;
             var fade = mo.fadeOut(0.2);
             var s = mo.sequence(fade,mo.callFunc(function(){
             drawNode.removeFromParent(true);
             },this));
             drawNode.runAction(s);*/
        };
        __egretProto__.setLight = function () {
            var self = this;
            var w = mo.visibleRect.getWidth() * 1.2, h = mo.visibleRect.getHeight() * 1.2;
            var lightLayer = mo.UIPanel.create();
            lightLayer.setSize(mo.size(w, h));
            lightLayer.bgColor = mo.c3b(255, 255, 255);
            lightLayer.bgOpacity = 145;
            lightLayer.setPosition(mo.visibleRect.center());
            lightLayer.setAnchorPoint(0.5, 0.5);
            //lightLayer.ignoreAnchorPointForPosition(false);
            lightLayer.setZOrder(9999);
            self.addChild(lightLayer);
            var fade = mo.fadeIn(0.2);
            var func = mo.callFunc(function () {
                lightLayer.removeFromParent(true);
            }, self);
            lightLayer.runAction(mo.sequence(fade, func));
        };
        FightDemoLayer.__className = "FightDemoLayer";
        return FightDemoLayer;
    })(mo.DisplayLayer);
    uw.FightDemoLayer = FightDemoLayer;
    FightDemoLayer.prototype.__class__ = "uw.FightDemoLayer";
})(uw || (uw = {}));
