/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SecretIconGridCtrl = (function (_super) {
        __extends(SecretIconGridCtrl, _super);
        function SecretIconGridCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretIconGridCtrl.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            //self._containerH = 0;
            //self._containerW = 0;
            //self._itemH = 0;
            //self._cols = 1;
            //self._layout = 1;//默认为均分
            self._itemJsonPath = res.uiSecretItem2_ui;
        };
        __egretProto__._initItemWidget = function (widget) {
            var self = this, clazz = self.__class;
            //self.onClickByName(clazz.TOUCHPANEL, self.onClick, self);
        };
        __egretProto__.onClick = function () {
            var self = this, clazz = self.__class;
            uw.log('-->onClick');
        };
        //@override
        __egretProto__._createItemWidget = function () {
            var self = this;
            var cell = uw.SecretItem2.create();
            return cell;
        };
        //@override
        __egretProto__._resetItemByData = function (widget, info, index) {
            var self = this, clazz = self.__class;
            var cell = widget;
            cell.resetByData(info, index);
            var isSelected = self._delegate._skillAMatrix.indexOf(info) != -1 || self._delegate._skillPMatrix.indexOf(info) != -1;
            cell.setSelected(isSelected);
            cell.onClick(self._onCellClick, self);
        };
        __egretProto__._onCellClick = function (cell) {
            var self = this;
            self._delegate._onPutOnItem(cell);
        };
        __egretProto__.setDelegate = function (d) {
            this._delegate = d;
        };
        SecretIconGridCtrl.__className = "SecretIconGridCtrl";
        SecretIconGridCtrl.TOUCHPANEL = "touchPanel";
        return SecretIconGridCtrl;
    })(mo.GridController);
    uw.SecretIconGridCtrl = SecretIconGridCtrl;
    SecretIconGridCtrl.prototype.__class__ = "uw.SecretIconGridCtrl";
    var SecretTuneLayer = (function (_super) {
        __extends(SecretTuneLayer, _super);
        function SecretTuneLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretTuneLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSecretTuneDlg_ui;
        };
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            self._floatIcon = self.getWidgetByName(clazz.PANEL_FLOAT);
            self._floatIcon.setAnchorPoint(0, 0);
            self._floatIcon.setVisible(false);
            self._panel_bottom = self.getWidgetByName(clazz.PANEL_BOTTOM);
            self.onClickByName(clazz.BTN_SAVE, self.saveSkills, self);
            self.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.EXACT_FIT);
            var arr = uw.userDataCtrl.getOpenedSecretArr(0);
            self._skillActiveArr = arr;
            var itemW = 500;
            var itemListActive = self.getWidgetByName("itemListActive");
            itemListActive.width = itemW * arr.length;
            var arr = uw.userDataCtrl.getOpenedSecretArr(1);
            self._skillPassiveArr = arr;
            var itemListPassive = self.getWidgetByName("itemListPassive");
            itemListPassive.width = itemW * arr.length;
        };
        __egretProto__.onEnterNextTick = function () {
            var self = this;
            var ctrl = self._gridCtrlActive = SecretIconGridCtrl.create(self.getWidgetByName("itemListActive"), self._skillActiveArr.length);
            ctrl.setLayoutType(2);
            ctrl.setDelegate(self);
            self._gridCtrlActive.resetByData(self._skillActiveArr);
            var ctrl = self._gridCtrlPassive = SecretIconGridCtrl.create(self.getWidgetByName("itemListPassive"), self._skillPassiveArr.length);
            ctrl.setLayoutType(2);
            ctrl.setDelegate(self);
            self._gridCtrlPassive.resetByData(self._skillPassiveArr);
            var backLayer = mo.runningScene.backLayer;
            backLayer.onBack(self.checkChanged, self);
        };
        /**
         * 技能图标飞回
         * @param item
         * @param skillInfo
         * @private
         */
        __egretProto__._putBackSkill = function (item, skillInfo) {
            var self = this, clazz = self.__class;
            var skillArr = skillInfo.passiveType > 0 ? self._skillPassiveArr : self._skillActiveArr;
            var gridCtrl = skillInfo.passiveType > 0 ? self._gridCtrlPassive : self._gridCtrlActive;
            var skillPMatrix = skillInfo.passiveType > 0 ? self._skillPMatrix : self._skillAMatrix;
            var dataIndex = skillArr.indexOf(skillInfo);
            var floatIcon = self._floatIcon;
            floatIcon.setVisible(true);
            // 设置icon
            self._setFloatIcon(skillInfo, floatIcon);
            // 计算飞回的位置
            var panel = self._panel_bottom;
            var pos = mo.convertNodeToNodeSpace(panel, item, mo.p(0, 0));
            floatIcon.setPosition(mo.p(pos.x, pos.y));
            var cell = gridCtrl.cellAtIndex(dataIndex);
            if (skillPMatrix.indexOf(cell.getInfo()) != -1) {
                if (cell)
                    cell.setSelected(false);
            }
            var secretIcon = cell.getWidgetByName(clazz.IMG_SECRET_ICON);
            var pos2 = mo.convertNodeToNodeSpace(panel, secretIcon, mo.p(0, 0));
            self._flying = true;
            floatIcon.setOpacity(255);
            floatIcon.runAction(mo.sequence(mo.spawn(mo.moveTo(0.3, pos2).setEase(mo.Ease.sineIn), mo.fadeOut(0.25)), mo.callFunc(function (sender) {
                sender.setVisible(false);
                self._flying = false;
            }, self)));
        };
        /**
         * 取消一个技能槽
         * @param item
         * @param needRefresh 是否需要重新刷新可选秘术列表
         * @private
         */
        __egretProto__._onSlotSkillClick = function (item) {
            var self = this, clazz = self.__class;
            var startIndex, half = clazz.SLOT_NUM / 2;
            if (self._itemsAUsed.indexOf(item) >= 0) {
                self._setupTarget(0); //被动
                startIndex = 0;
            }
            else {
                self._setupTarget(1); //被动
                startIndex = half;
            }
            var itemsUsed = self._curItemsUsed;
            var itemsFreed = self._curItemsFreed;
            var skillMatrix = self._curSkillMatrix;
            for (var i = 0; i < half; i++) {
                if (itemsUsed[i] == item) {
                    item.setVisible(false);
                    item.setTouchEnabled(false);
                    itemsFreed.push(item);
                    self._putBackSkill(item, skillMatrix[i]);
                    for (var j = (i + 1); j < itemsUsed.length; j++) {
                        // 开始左移
                        var emptyIndex = j - 1;
                        var pos = self._slotWidgets[emptyIndex + startIndex].getPosition();
                        // 有弹性的移动
                        itemsUsed[j].stopAllActions();
                        itemsUsed[j].runAction(mo.moveTo(0.3, mo.p(pos.x, pos.y)).setEase(mo.Ease.backInOut));
                        // 数据左移
                        itemsUsed[j - 1] = itemsUsed[j];
                        skillMatrix[j - 1] = skillMatrix[j];
                    }
                    // 移除最后一个
                    skillMatrix.pop();
                    itemsUsed.pop();
                    break;
                }
            }
        };
        /**
         *  cell 点击时的回调
         * @param cell
         * @private
         */
        __egretProto__._onPutOnItem = function (cell) {
            var self = this, clazz = self.__class;
            if (self._flying)
                return;
            var info = cell.getInfo();
            var skillType = info.passiveType; //获得秘术类型：0主动 1被动
            self._setupTarget(skillType);
            var skillMatrix = self._curSkillMatrix, itemsUsed = self._curItemsUsed;
            var index = skillMatrix.indexOf(info);
            if (index != -1) {
                cell.setSelected(false);
                var skillItem = itemsUsed[index];
                self._onSlotSkillClick(skillItem);
            }
            else {
                if (skillMatrix.length >= 2) {
                    return self._playHaloEffect(skillType);
                }
                cell.setSelected(true);
                self._pushSkillToSlot(info, cell);
            }
        };
        __egretProto__._playHaloEffect = function (type) {
            var self = this, clazz = self.__class;
            if (type == 0) {
                mo.showMsg(uw.id_c_msgCode.noMoreThan2Activen);
            }
            else {
                mo.showMsg(uw.id_c_msgCode.noMoreThan2Passive);
            }
            var startIndex = type == 0 ? 0 : clazz.SLOT_NUM / 2;
            var endIndex = type == 0 ? clazz.SLOT_NUM / 2 : clazz.SLOT_NUM;
            var slotW, haloW;
            for (var i = startIndex, li = endIndex; i < li; i++) {
                slotW = self._slotWidgets[i];
                haloW = slotW.getWidgetByName(clazz.IMG_HALO);
                haloW.setVisible(true);
                haloW.stopAllActions();
                haloW.runAction(mo.sequence(mo.fadeIn(0.1), mo.fadeOut(0.1), mo.callFunc(function (sender) {
                    sender.setVisible(false);
                }, self)));
            }
        };
        /**
         * 根据类型设置当前要修改的值
         * @param skillType 0主动 >0被动
         * @private
         */
        __egretProto__._setupTarget = function (skillType) {
            var self = this, clazz = self.__class;
            if (skillType > 0) {
                self._curItemsUsed = self._itemsPUsed;
                self._curItemsFreed = self._itemsPFreed;
                self._curSkillMatrix = self._skillPMatrix;
            }
            else {
                self._curItemsUsed = self._itemsAUsed;
                self._curItemsFreed = self._itemsAFreed;
                self._curSkillMatrix = self._skillAMatrix;
            }
        };
        /**
         * 添加一个秘术到技能槽
         * @param skillInfo
         * @param cell 可选
         * @returns {*}
         * @private
         */
        __egretProto__._pushSkillToSlot = function (skillInfo, cell) {
            var self = this, clazz = self.__class;
            self._setupTarget(skillInfo.passiveType);
            self._curSkillMatrix.push(skillInfo);
            var startIndex = (skillInfo.passiveType > 0 ? clazz.SLOT_NUM / 2 : 0);
            var index = startIndex + self._curSkillMatrix.length - 1;
            var widgetName = clazz.PANEL_SLOT + (index);
            var slotW = self.getWidgetByName(widgetName);
            var skillData = uw.getSkillData(skillInfo.skillId, 1); //获取技能模板数据
            var skillW = self._curItemsFreed.pop();
            self._curItemsUsed.push(skillW);
            if (cell) {
                var floatIcon = self._floatIcon;
                self._setFloatIcon(skillInfo, floatIcon);
                floatIcon.setVisible(true);
                var pos = mo.convertNodeToNodeSpace(self._panel_bottom, cell.getWidgetByName(clazz.IMG_SECRET_ICON), mo.p(0, 0));
                floatIcon.setPosition(mo.p(pos.x, pos.y));
                var pos2 = mo.convertNodeToNodeSpace(self._panel_bottom, slotW, mo.p(0, 0));
                self._flying = true;
                floatIcon.setOpacity(128);
                floatIcon.runAction(mo.sequence(mo.spawn(mo.moveTo(0.20, mo.p(pos2.x, pos2.y)).setEase(mo.Ease.sineOut), mo.fadeIn(0.15)), mo.callFunc(function (sender) {
                    skillW.setVisible(true);
                    skillW.setTouchEnabled(true);
                    skillW.setInfoByName(clazz.IMG_ICON, skillData.icon);
                    skillW.setPosition(mo.p(slotW.getPosition().x, slotW.getPosition().y));
                    sender.setVisible(false);
                    self._flying = false;
                }, self)));
            }
            else {
                skillW.setVisible(true);
                skillW.setTouchEnabled(true);
                skillW.setInfoByName(clazz.IMG_ICON, skillData.icon);
                skillW.setPosition(mo.p(slotW.getPosition().x, slotW.getPosition().y));
            }
        };
        __egretProto__._setFloatIcon = function (skillInfo, floatIcon) {
            var self = this, clazz = self.__class;
            var skillData = uw.getSkillData(skillInfo.skillId, 1); //获取技能模板数据
            floatIcon.setInfoByName(clazz.IMG_ICON, skillData.icon);
        };
        __egretProto__.saveSkills = function () {
            var self = this;
            if (self._skillAMatrix.length < 2) {
                return mo.showMsg(uw.id_c_msgCode.lessThan2Activen);
            }
            self._saveSkills(function () {
                mo.sceneMgr.popScene();
            }, self);
        };
        __egretProto__._saveSkills = function (cb, target) {
            var self = this, clazz = self.__class;
            var ids = [], half = clazz.SLOT_NUM / 2;
            for (var i = 0, li = half; i < li; i++) {
                var aSkill = self._skillAMatrix[i];
                var pSkill = self._skillPMatrix[i];
                ids[i] = (aSkill != null) ? aSkill.initId : null;
                ids[i + half] = (pSkill != null) ? pSkill.initId : null;
            }
            uw.userDataCtrl.updateSecret(self._curSkillsType, ids, function () {
                mo.showMsg(uw.id_c_msgCode.saveSuccess);
                if (cb)
                    cb.call(target);
            });
        };
        /*
         * 秘术布阵类型
         * @param matrixType 类型
         */
        __egretProto__.setSecretMatrixType = function (type) {
            var self = this, clazz = self.__class;
            self._curSkillsType = type;
            self._skillAMatrix = [];
            self._skillPMatrix = [];
            self._itemsAUsed = [];
            self._itemsAFreed = [];
            self._itemsPUsed = [];
            self._itemsPFreed = [];
            self._curItemsUsed = null;
            self._curItemsFreed = null;
            self._curSkillMatrix = null;
            //报错技能槽的位置
            self._slotWidgets = [];
            var oldSkillMatrix = uw.userDataCtrl.getSecretMatrixByType(type);
            ;
            for (var i = 0; i < clazz.SLOT_NUM; i++) {
                var slotW = self.getWidgetByName(clazz.PANEL_SLOT + i);
                self._slotWidgets[i] = slotW;
            }
            var half = clazz.SLOT_NUM / 2;
            for (var i = 0; i < half; i++) {
                var name = clazz.PANEL_SKILL + i;
                var w = self.getWidgetByName(name);
                w.onClick(self._onSlotSkillClick, self);
                w.setVisible(false);
                self._itemsAFreed[i] = w;
            }
            for (var i = 0; i < half; i++) {
                var name = clazz.PANEL_SKILL + (i + half);
                var w = self.getWidgetByName(name);
                w.onClick(self._onSlotSkillClick, self);
                w.setVisible(false);
                self._itemsPFreed[i] = w;
            }
            for (var i = 0, li = oldSkillMatrix.length; i < li; i++) {
                if (oldSkillMatrix[i]) {
                    self._pushSkillToSlot(oldSkillMatrix[i]);
                }
            }
        };
        __egretProto__._checkChanged = function () {
            var self = this, clazz = self.__class;
            var oldSkillMatrix = uw.userDataCtrl.getSecretMatrixByType(self._curSkillsType);
            var combineArr = self._skillAMatrix.concat(self._skillPMatrix);
            for (var i = 0, li = oldSkillMatrix.length; i < li; i++) {
                if (combineArr[i] != oldSkillMatrix[i])
                    return true;
            }
            return false;
        };
        /**
         * 检查布阵是否有变化：有变化时弹出询问对话框
         * @param cancelCb
         * @param target
         */
        __egretProto__.checkChanged = function () {
            var self = this;
            var isChanged = self._checkChanged();
            if (isChanged) {
                mo.showMsg(uw.id_c_msgCode.ifSaveSkillSettings, function () {
                    self.saveSkills();
                }, self, function () {
                    mo.sceneMgr.popScene();
                }, self);
            }
            return !isChanged;
        };
        SecretTuneLayer.__className = "SecretTuneLayer";
        SecretTuneLayer.CELL_COLS = 5;
        SecretTuneLayer.CELL_ROWS = 3;
        SecretTuneLayer.SLOT_NUM = 4;
        SecretTuneLayer.ATK_SKILLS_TYPE = 0;
        SecretTuneLayer.DEF_SKILLS_TYPE = 1;
        SecretTuneLayer.IMG_ICON = "icon";
        SecretTuneLayer.IMG_HALO = "halo";
        SecretTuneLayer.IMG_SECRET_ICON = "secret_icon";
        SecretTuneLayer.PANEL_SLOT = "slot";
        SecretTuneLayer.PANEL_SKILL = "skill";
        SecretTuneLayer.PANEL_BOTTOM = "panel_bottom";
        SecretTuneLayer.PANEL_FLOAT = "float";
        SecretTuneLayer.BTN_SAVE = "btnSave";
        SecretTuneLayer.BTN_CLOSE = "btnClose";
        SecretTuneLayer.TAB_ATK = "atkType";
        SecretTuneLayer.TAB_DEF = "defType";
        SecretTuneLayer.ITEM_LIST = "itemList";
        return SecretTuneLayer;
    })(mo.DisplayLayer);
    uw.SecretTuneLayer = SecretTuneLayer;
    SecretTuneLayer.prototype.__class__ = "uw.SecretTuneLayer";
})(uw || (uw = {}));
