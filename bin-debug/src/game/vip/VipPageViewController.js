var uw;
(function (uw) {
    uw.vipDetailText = {};
    uw.vipDetailText[uw.c_vip_wipeCount] = "◇ 每天可免费领取扫荡券 [ubb color=red]%s[/ubb] 张。 "; //赠送扫荡符数量
    uw.vipDetailText[uw.c_vip_strengthCount] = "◇ 每天可购买体力 [ubb color=red]%s[/ubb] 次。 "; //体力购买次数
    uw.vipDetailText[uw.c_vip_goldCount] = "◇ 每天可购买金币 [ubb color=red]%s[/ubb] 次。"; //金币购买次数
    uw.vipDetailText[uw.c_vip_isWipeMore] = "◇ 解锁 [ubb color=red]多次扫荡[/ubb] 功能。 "; //是否可以多次扫荡
    uw.vipDetailText[uw.c_vip_isChapman] = "◇ 解锁 [ubb color=red]永久召唤神秘商人[/ubb] 功能。 "; //是否可以永久召唤神秘商人
    uw.vipDetailText[uw.c_vip_resetCopyCount] = "◇ 每天可重置精英关卡 [ubb color=red]%s[/ubb] 次。 "; //重置精英副本次数
    uw.vipDetailText[uw.c_vip_arenaCount] = "◇ 每天可额外购买竞技场 [ubb color=red]%s[/ubb] 次。 "; //竞技场购买次数
    uw.vipDetailText[uw.c_vip_isStrengthen] = "◇ 提前解锁 [ubb color=red]一键强化[/ubb] 功能功能。 "; //一键强化
    uw.vipDetailText[uw.c_vip_isForge] = "◇ 解锁 [ubb color=red]一键锻造专属装备[/ubb] 功能。 "; //是否开启一键煅造
    uw.vipDetailText[uw.c_vip_isTowerAuto] = "◇ 解锁 [ubb color=red]守卫塔免费自动战斗[/ubb] 功能。 "; //是否开启守卫塔免费自动挑战
    uw.vipDetailText[uw.c_vip_resetTowerCount] = "◇ 每天可免费重置守卫塔 [ubb color=red]%s[/ubb] 次。 "; //守卫塔免费重置次数
    uw.vipDetailText[uw.c_vip_skillPointLimit] = "◇ 技能点上限增加至 [ubb color=red]%s[/ubb] 点。 "; //技能点上限
    var VipPageViewController = (function (_super) {
        __extends(VipPageViewController, _super);
        function VipPageViewController() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = VipPageViewController.prototype;
        __egretProto__._resetItemByData = function (widget, vipInfo, index) {
            var self = this;
            //vip等级
            var vipId = vipInfo[uw.c_vip_id];
            widget.setInfoByName("curVipLevel", vipId);
            //累计消耗的钻石
            var diamond = vipInfo[uw.c_vip_score];
            uw.setDiamondColor(widget, "totalDiamond");
            widget.setInfoByName("totalDiamond", diamond);
            widget.enableStrokeByName("labelVipTitle", mo.c3b(0, 0, 0), 3);
            widget.enableStrokeByName("totalDiamond", mo.c3b(0, 0, 0), 3);
            widget.enableStrokeByName("totalChargeTitle", mo.c3b(0, 0, 0), 3);
            widget.enableStrokeByName("chargeDetail", mo.c3b(0, 0, 0), 3);
            //规则
            var totalStr = "", newStr, oldText, len = Object.keys(uw.vipDetailText).length, i = 1;
            for (var key in uw.vipDetailText) {
                var value = vipInfo[key];
                if (value != 0) {
                    oldText = uw.vipDetailText[key];
                    if (oldText.indexOf("%s") == -1) {
                        newStr = oldText;
                    }
                    else {
                        newStr = mo.formatStr(oldText, vipInfo[key]);
                    }
                    totalStr += newStr;
                    if (i < len) {
                        totalStr += "[/br]";
                    }
                    i++;
                }
            }
            var desc = widget.getWidgetByName("desc");
            desc.enableStroke(mo.c3b(0, 0, 0), 3);
            //            desc.setAutoSizeHeight(true);
            desc.setOption({
                value: totalStr,
                fontSize: 58,
                color: "#fca76c",
                hAlign: mo.ALIGN_H_LEFT,
                vAlign: mo.ALIGN_V_TOP,
                autoResize: true
            });
            //从上往下画
            var scv = widget.getWidgetByName("scv");
            var size = desc.getSize();
            var height = size.height < 770 ? 770 : size.height;
            scv.setInnerContainerSize(mo.size(size.width, height));
            scv.jumpToTop();
        };
        VipPageViewController.__className = "VipAndChargeItem";
        return VipPageViewController;
    })(mo.PageViewController);
    uw.VipPageViewController = VipPageViewController;
    VipPageViewController.prototype.__class__ = "uw.VipPageViewController";
})(uw || (uw = {}));
