var uw;
(function (uw) {
    function initGuideRectNode() {
        mo.guideCmdRectNodeMgr.set("getHeroEquipItem", function (cmd, arg) {
            var layer = cmd.layer;
            var heroCtrl = layer._heroDataCtrl;
            var part = 1; //默认为1
            for (var i = 1; i < 6; ++i) {
                if (arg == 1) {
                    if (heroCtrl.isNormalEquipEmptyByPart(i)) {
                        part = i;
                        break;
                    }
                }
                else {
                    var equipCtrl = heroCtrl.getEquipDataCtrlByPart(i);
                    if (!equipCtrl || equipCtrl.isTempOnly || equipCtrl.lvl == 0) {
                        part = i;
                        break;
                    }
                }
            }
            var widgetName = uw.HeroInfoLayer.PANEL_EQUIP_ITEM_PRE + part;
            var node = layer.getWidgetByName(widgetName);
            node.setZOrder(100);
            return node;
        });
        //子引导获取EquipShop的tab按键区域对象
        //arg = 1：购买全套普通装备
        //arg = 2：强化全套普通装备
        //arg = 3：升阶全套普通装备
        mo.guideCmdRectNodeMgr.set("equipTab", function (cmd, arg) {
            var layer = cmd.layer;
            var heroCtrl = layer._heroDataCtrl;
            var part = 1; //默认为1
            for (var i = 1; i < 6; ++i) {
                if (arg == 1) {
                    if (heroCtrl.isNormalEquipEmptyByPart(i)) {
                        part = i;
                        break;
                    }
                }
                else if (arg == 2) {
                    var equipCtrl = heroCtrl.getEquipDataCtrlByPart(i);
                    if (!equipCtrl || equipCtrl.isTempOnly || equipCtrl.lvl == 0) {
                        part = i;
                        break;
                    }
                }
                else if (arg == 3) {
                    var equipCtrl = heroCtrl.getEquipDataCtrlByPart(i);
                    var nextEquipDataCtrl = equipCtrl.getNext();
                    if (nextEquipDataCtrl) {
                        var opt = nextEquipDataCtrl.getUpgradeToThisOpt(heroCtrl);
                        if (opt.isEnough && opt.canWare) {
                            part = i;
                            break;
                        }
                    }
                }
            }
            var widgetName = "tab_" + part;
            return layer.getWidgetByName(widgetName);
        });
        mo.guideCmdRectNodeMgr.set("skillBtn", function (cmd, arg) {
            return uw["skillBtn"];
        });
        mo.guideCmdRectNodeMgr.set("secretCell", function (cmd, arg) {
            var layer = cmd.layer;
            return layer.currCell;
        });
        mo.guideCmdRectNodeMgr.set("secretHeroPanel", function (cmd, arg) {
            var layer = cmd.layer;
            return layer.currCell.getWidgetByName("layout_hero");
        });
    }
    uw.initGuideRectNode = initGuideRectNode;
})(uw || (uw = {}));
