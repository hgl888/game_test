/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var TowerLayer = (function (_super) {
        __extends(TowerLayer, _super);
        function TowerLayer() {
            _super.call(this);
            this._buffArr = [];
        }
        var __egretProto__ = TowerLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiTowerLayer_ui;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._heroContainer = self.getWidgetByName("heroContainer");
            self.onClickByName("btnReset", self.menuReset, self); //重置
            self.onClickByName("btnScoreShop", self.menuScoreShop, self); //积分商店
            self.onClickByName("btnGetGift", self.menuGetGift, self); //宝箱
            self.onClickByName("btnHelp", self.menuShowRuleLayer, self); //规则
            self.onClickByName("btnAutoFight", self.menuShowAutoFightLayer, self); //自动挑战
            self.onClickByName("btnFight", self.menuShowFightLayer, self); //挑战
            for (var i = 0; i < 2; i++) {
                var item = self.getWidgetByName("buff" + i);
                item.setVisible(false);
                self._buffArr.push(item);
            }
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.EXACT_FIT);
        };
        __egretProto__.setTowerInfo = function () {
            var self = this;
            var towerDataCtrl = uw.towerDataCtrl, userDataCtrl = uw.userDataCtrl;
            //当前层数
            self.setInfoByName("level", towerDataCtrl.getLayer() + 1);
            //塔主信息
            self.setInfoByName("champion", towerDataCtrl.maxRankUserName);
            self.formatByName("championLvl", towerDataCtrl.maxRankUserLayer);
            //历史最高
            var itemKey = uw.c_prop.spItemIdKey.towerPoints;
            var itemPath = resHelper.getItemIconPath(itemKey);
            self.setInfoByName("highest", towerDataCtrl.getHighLayer());
            self.formatByName("scoreCount", userDataCtrl.getTowerPoints());
            self.setInfoByName("scoreItem", itemPath);
            //剩余次数
            itemKey = uw.c_prop.spItemIdKey.towerInvite;
            itemPath = resHelper.getItemIconPath(itemKey);
            self.formatByName("remainCount", towerDataCtrl.getReNum(), towerDataCtrl.getMaxReNum());
            self.formatByName("invitationCount", userDataCtrl.getItemNum(itemKey));
            self.setInfoByName("invitationItem", itemPath);
            //显示获取奖励
            self.showGif();
            //设置右边的信息
            self.setTowerLevelInfo();
        };
        __egretProto__.setTowerLevelInfo = function () {
            var self = this;
            var towerDataCtrl = uw.towerDataCtrl;
            var isNeedOpenChest = towerDataCtrl.isNeedOpenChest();
            var highestLevel = towerDataCtrl.getHighLayer();
            var curLevel = towerDataCtrl.getLayer();
            var isValid = towerDataCtrl.getLayer() == 0 || isNeedOpenChest;
            self.setGrayByName("btnReset", isValid);
            self.setTouchEnabledByName("btnReset", !isValid);
            var isHighest = towerDataCtrl.isHighestLayer();
            if (isHighest) {
                var time = mo.millisecondToDate(towerDataCtrl.getClearSpend());
                self.formatByName("labelTime", time);
                self.setGrayByName("btnAutoFight", true);
                self.setTouchEnabledByName("btnAutoFight", false);
                self.setGrayByName("btnFight", true);
                self.setTouchEnabledByName("btnFight", false);
            }
            else {
                isValid = isNeedOpenChest || highestLevel <= curLevel;
                self.setGrayByName("btnAutoFight", isValid);
                self.setTouchEnabledByName("btnAutoFight", !isValid);
                self.setGrayByName("btnFight", isNeedOpenChest);
                self.setTouchEnabledByName("btnFight", !isNeedOpenChest);
            }
            self.setVisibleByName("btnAutoFight", !isHighest);
            self.setVisibleByName("btnFight", !isHighest);
            self.setVisibleByName("labelTime", isHighest);
            self.setVisibleByName("lvlInfo", !isHighest);
            self.setVisibleByName("clear", isHighest);
            //显示怪物boss
            self._showBoss();
            //buff
            self._showCopySkill();
        };
        __egretProto__.showGif = function () {
            var self = this;
            var towerDataCtrl = uw.towerDataCtrl;
            var info = towerDataCtrl.getNextChest() || [];
            var level = info[0];
            var giftTitle = self.getWidgetByName("giftTitle");
            var btnGetGift = self.getWidgetByName("btnGetGift");
            var light = self.getWidgetByName("light");
            if (level) {
                self.setInfoByName("giftLevel", level);
            }
            else {
                self.setInfoByName("giftLevel", "?");
            }
            if (towerDataCtrl.isNeedOpenChest()) {
                light.setVisible(true);
                var actRotation = mo.repeatForever(mo.rotateBy(3, 360));
                light.runAction(actRotation);
                var actScale = mo.repeatForever(mo.sequence(mo.scaleTo(0.75, 1.2), mo.scaleTo(0.75, 1)));
                light.runAction(actScale);
                giftTitle.setBright(true);
                var seq = mo.repeatForever(mo.sequence(mo.rotateBy(0.06, -5), mo.rotateBy(0.06, 10), mo.rotateBy(0.06, -10), mo.rotateBy(0.06, 10), mo.rotateBy(0.06, -10), mo.rotateBy(0.06, 10), mo.rotateBy(0.06, -10), mo.rotateBy(0.06, 10), mo.rotateBy(0.06, -10), mo.rotateBy(0.06, 5), mo.delayTime(2.5)));
                btnGetGift.runAction(seq);
            }
            else {
                giftTitle.setBright(false);
                light.setVisible(false);
                light.stopAllActions();
                btnGetGift.stopAllActions();
                btnGetGift.setRotation(0);
            }
        };
        __egretProto__._showBoss = function () {
            var self = this;
            if (self._bossArm) {
                self._bossArm.removeFromParent(true);
                self._bossArm = null;
            }
            var curCopyId = uw.towerDataCtrl.getCurCopyId();
            var monsters = uw.getCombatInfo(curCopyId);
            var monsterIds, monType, bossId;
            var monsterData = mo.getJSONWithFileName(uw.cfg_t_monster);
            for (var i = 0; i < monsters.length; i++) {
                monsterIds = monsters[i];
                for (var j = 0; j < monsterIds.length; j++) {
                    var id = monsterIds[j];
                    if (!id)
                        continue;
                    monType = monsterData[id][uw.t_monster_type];
                    if (monType == uw.c_prop.bossTypeKey.twBoss) {
                        bossId = monsterData[id][uw.t_monster_tid];
                    }
                }
            }
            if (!bossId) {
                bossId = id;
                uw.error("守卫塔%s：没有配置BOSS", uw.towerDataCtrl.getCurCopyId());
            }
            var armature = uw.roleArmFactory.produceDynamic(bossId);
            armature.y = 200;
            if (uw.towerDataCtrl.isHighestLayer()) {
                armature.play(uw.Fight.HeroAction.stun);
            }
            else {
                armature.play(uw.Fight.HeroAction.steady);
            }
            self._heroContainer.addChild(armature);
            self._bossArm = armature;
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this;
            self.setTowerInfo();
        };
        __egretProto__.menuShowRuleLayer = function () {
            var layer = uw.TowerRuleLayer.create();
            layer.show();
        };
        __egretProto__.menuShowAutoFightLayer = function () {
            var self = this;
            uw.towerDataCtrl.autoFight(function (data, level) {
                var layer = uw.TowerWipeOutLayer.create();
                layer.setWipeData(data, level);
                layer.onClose(self.setTowerInfo, self);
                layer.show();
            }, self);
        };
        __egretProto__.menuShowFightLayer = function () {
            var curCopyId = uw.towerDataCtrl.getCurCopyId();
            uw.pushSubModule(uw.SubModule.CopyInfo, curCopyId);
        };
        __egretProto__.menuReset = function () {
            var self = this;
            uw.towerDataCtrl.resetLayer(self.setTowerInfo, self);
        };
        __egretProto__.menuScoreShop = function () {
            var self = this;
            var layer = uw.TowerShopLayer.create();
            layer.show();
            layer.onClose(self.setTowerInfo, self);
        };
        __egretProto__.menuGetGift = function () {
            var self = this;
            var towerDataCtrl = uw.towerDataCtrl;
            if (towerDataCtrl.isNeedOpenChest()) {
                towerDataCtrl.openChest(self.setTowerInfo, self);
            }
            else {
                var tempId = towerDataCtrl.getNextChest()[1];
                var layer = uw.TowerChestInfo.create(tempId);
                layer.show();
            }
        };
        __egretProto__._showCopySkill = function () {
            var self = this;
            var copyId = uw.towerDataCtrl.getCurCopyId();
            var skillIds = mo.getJSONWithFileNameAndID(uw.cfg_t_copy, copyId)[uw.t_copy_copySkillIds];
            var id, widget;
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
        TowerLayer.__className = "TowerLayer";
        return TowerLayer;
    })(mo.DisplayLayer);
    uw.TowerLayer = TowerLayer;
    TowerLayer.prototype.__class__ = "uw.TowerLayer";
})(uw || (uw = {}));
