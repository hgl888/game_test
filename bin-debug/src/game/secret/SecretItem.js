/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var SecretItem = (function (_super) {
        __extends(SecretItem, _super);
        function SecretItem() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = SecretItem.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiSecretItem_ui;
        };
        __egretProto__._tpTouch = function (event) {
            var self = this;
            var sender = event.target;
            var opt = self._opts[sender.getParent().getName()];
            if (self._itemTouchCb)
                self._itemTouchCb.call(self._itemTouchTarget, sender, event.type, opt);
        };
        __egretProto__.init = function () {
            var self = this, clazz = self.__class;
            _super.prototype.init.apply(self, arguments);
            for (var i = 0; i < clazz.ITEM_COUNT; i++) {
                var item = self.getWidgetByName("item" + i);
                var touchPanel = item.getWidgetByName("touchPanel");
                touchPanel.addEventListener(mo.TouchEvent.NODE_BEGIN, self._tpTouch, self);
                touchPanel.addEventListener(mo.TouchEvent.NODE_END, self._tpTouch, self);
            }
            self._heroIconCtrlMap = {};
            self._equipIconCtrlMap = {};
            for (var i = 0; i < clazz.ITEM_COUNT; ++i) {
                var widgetName = mo.formatStr(clazz.PANEL_STUFF_TMP, i);
                var iconCtrl = uw.UIHeroIconCtrl.create(self.getWidgetByName(widgetName).getWidgetByName("panel_hero"));
                self._heroIconCtrlMap[widgetName] = iconCtrl;
                iconCtrl = uw.UIItemIconCtrl.create(self.getWidgetByName(widgetName).getWidgetByName("panel_equip"));
                self._equipIconCtrlMap[widgetName] = iconCtrl;
            }
            var size = self.getWidgetByName(clazz.LAYOUT_HERO).getSize();
            self._srcLayoutW = size.width;
            self._srcLayoutH = size.height;
        };
        __egretProto__.resetByData = function (info, index) {
            var self = this;
            self.setName("cell_initId" + info.initId);
            self._info = info;
            self._opts = {};
            self._drawHeroItem();
            self._drawSkill();
        };
        __egretProto__._drawSkill = function () {
            var self = this, clazz = self.__class;
            var info = self._info;
            var heroTids = info.heroTids;
            var lvl = info.lvl; //技能等级
            var maxLvl = heroTids.length + 1;
            var skillId = info.skillId;
            var openLvl = info.initLvl;
            var activated = lvl > 0;
            var skillData = uw.getSkillData(skillId, 0); //获取当前等级下的技能信息
            //设置icon
            var widget = self.getWidgetByName("secret_icon");
            widget.setInfoByName("icon", skillData.icon);
            widget.getWidgetByName("icon").setGray(!activated);
            widget.setVisibleByName("border", !activated);
            widget.setVisibleByName("halo", activated);
            self.setVisibleByName(clazz.IMG_TEXTURE, activated);
            self.setVisibleByName(clazz.LABEL_MAXLVL, false);
            //设置名称
            self.setInfoByName("name", skillData.name);
            self.enableStrokeByName("name", cc.c3b(22, 22, 22), 3);
            self.setVisibleByName(clazz.LABEL_PASSIVETYPE, info.passiveType > 0);
            if (activated) {
                //设置等级
                self.setInfoByName("rich_lvl", { value: mo.formatStr("[ubb color=#DBA500]Lv.  [/ubb][ubb color=%s]%s[/ubb][ubb color=#DBA500]/%s[/ubb]", activated ? "#DBA500" : "red", lvl, maxLvl), fontSize: 55 });
            }
            else {
                self.setInfoByName("rich_lvl", { value: mo.formatStr("[ubb color=#DBA500]领主[/ubb][ubb color=red]%s[/ubb][ubb color=#DBA500]级开启[/ubb]", openLvl), fontSize: 55 });
            }
            //设置背景
            var bg = self.getWidgetByName(clazz.PANEL_BG);
            bg.bgTexture = activated ? res.ui_panel.blk9_talent_png : res.ui_panel.blk9_talentg_png;
            self.getWidgetByName(clazz.IMG_TEXTURE).setHighLight();
            //设置当前等级秘术描述
            self.setInfoByName(clazz.RICH_CURDESC, { value: skillData.text, fontSize: 50, autoResize: true });
            self.doLayoutByName(clazz.LAYOUT_CURDESC);
            var panel_cur = self.getWidgetByName(clazz.PANEL_CUR);
            if (activated) {
                self.setInfoByName(clazz.LABEL_CURTITLE, "当前效果");
                panel_cur.setPosition(mo.p(panel_cur.getSrcPos().x, panel_cur.getSrcPos().y));
                if (lvl < maxLvl) {
                    //设置下一级秘术描述
                    var nextSkillData = uw.getSkillData(skillId + 1, 0);
                    self.setVisibleByName(clazz.PANEL_NEXT, true);
                    self.setInfoByName(clazz.RICH_NEXTDESC, { value: nextSkillData.text, fontSize: 50, autoResize: true });
                    self.doLayoutByName(clazz.LAYOUT_NEXTDESC);
                }
                else {
                    self.setVisibleByName(clazz.PANEL_NEXT, false);
                    self.setVisibleByName(clazz.LABEL_MAXLVL, true);
                }
            }
            else {
                //居中显示
                self.setVisibleByName(clazz.PANEL_NEXT, false);
                self.setInfoByName(clazz.LABEL_CURTITLE, "激活效果");
                panel_cur.setPosition(mo.p(panel_cur.getPosition().x, (bg.getSize().height + panel_cur.getSize().height) / 2));
            }
        };
        __egretProto__._drawHeroItem = function () {
            var self = this, clazz = self.__class;
            var info = self._info;
            var heroTids = info.heroTids;
            var inVisibleItemNum = clazz.ITEM_COUNT - heroTids.length;
            for (var i = 0; i < clazz.ITEM_COUNT; i++) {
                var item = self.getWidgetByName("item" + i);
                item.setVisible(false);
                var touchPanel = item.getWidgetByName("touchPanel");
                touchPanel.setTouchEnabled(false);
            }
            for (var index in heroTids) {
                var tid = heroTids[index];
                var itemName = mo.formatStr(clazz.PANEL_STUFF_TMP, index);
                var item = self.getWidgetByName(itemName);
                item.setVisible(true);
                // 画英雄ICON
                var heroIconCtrl = self._heroIconCtrlMap[itemName];
                heroIconCtrl.resetByData(tid);
                //是否已获得
                var hasHero = info.progress[index] == true;
                heroIconCtrl.setGrayByName(uw.UIHeroIconCtrl.IMG_ICON, !hasHero);
                // 保存数据
                var opt = {};
                opt.tid = tid;
                opt.hasHero = hasHero;
                opt.progress = info.progress[index];
                self._opts[item.getName()] = opt;
                // 已经获得该英雄则不再弹框
                var touchPanel = item.getWidgetByName("touchPanel");
                touchPanel.setTouchEnabled(!hasHero);
            }
            self.setSizeByName(clazz.LAYOUT_HERO, self._srcLayoutW - inVisibleItemNum * (180 + 40), self._srcLayoutH);
            self.doLayoutByName(clazz.LAYOUT_HERO);
        };
        __egretProto__.onItemTouch = function (cb, target) {
            var self = this;
            self._itemTouchCb = cb;
            self._itemTouchTarget = target;
        };
        SecretItem.__className = "SecretItem";
        SecretItem.ITEM_COUNT = 5;
        //下面是ui相关
        SecretItem.PANEL_STUFF_TMP = "item%s"; //英雄icon容器的名字模板
        SecretItem.IMG_WEARABLE = "wearable";
        SecretItem.RICH_CURDESC = "rich_curDesc"; //当前级别的描述
        SecretItem.RICH_NEXTDESC = "rich_nextDesc"; //下一阶的描述
        SecretItem.LAYOUT_CURDESC = "layout_curDesc";
        SecretItem.LAYOUT_NEXTDESC = "layout_nextDesc";
        SecretItem.LAYOUT_HERO = "layout_hero";
        SecretItem.PANEL_CUR = "panel_cur"; //当前描述区域
        SecretItem.PANEL_NEXT = "panel_next";
        SecretItem.PANEL_BG = "panel_bg"; //背景
        SecretItem.LABEL_CURTITLE = "label_curTitle"; //当前等级标题
        SecretItem.LABEL_MAXLVL = "label_maxLvl"; //满级时的提示文本
        SecretItem.LABEL_PASSIVETYPE = "label_passiveType"; //被动类型文本
        SecretItem.IMG_TEXTURE = "img_texture"; //秘术icon底纹
        return SecretItem;
    })(mo.GridViewCell);
    uw.SecretItem = SecretItem;
    SecretItem.prototype.__class__ = "uw.SecretItem";
})(uw || (uw = {}));
