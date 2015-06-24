var uw;
(function (uw) {
    var FightShowBuffText = (function (_super) {
        __extends(FightShowBuffText, _super);
        function FightShowBuffText() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightShowBuffText.prototype;
        __egretProto__.init = function (target, showType) {
            if (!showType)
                return;
            var frameName = mo.formatStr(res.ui_fight.temp_fight_txt_png, showType);
            var seq;
            var statePos = target.getStatePos();
            var textNode = mo.UIImage.create();
            textNode.setAnchorPoint(0.5, 0.5);
            textNode.loadTexture(frameName);
            var __class = this.__class;
            if (showType == __class.magicAttackIncrease || showType == __class.magicDefenceIncrease || showType == __class.physicalAttackIncrease || showType == __class.physicalDefenceIncrease || showType == __class.bloodDrinkingIncrease || showType == __class.critDefenceIncrease || showType == __class.critIncrease || showType == __class.defenceOffsetIncrease || showType == __class.dodgeIncrease || showType == __class.hitIncrease || showType == __class.attackSpeedIncrease || showType == __class.movingSpeedIncrease) {
                target.addEffectText(textNode, uw.roleZOrder.WORD);
                //各种增益特效
                textNode.setPosition(statePos);
                textNode.setOpacity(100);
                seq = mo.sequence(mo.spawn(mo.moveBy(0.5, mo.p(0, -100)).setEase(mo.Ease.sineOut), mo.fadeIn(0.5)), mo.spawn(mo.moveBy(0.3, mo.p(0, -60)).setEase(mo.Ease.sineIn), mo.fadeOut(0.3)), mo.callFunc(target.removeEffectText, target, textNode));
                textNode.runAction(seq);
            }
            else if (showType == __class.magicAttackReduce || showType == __class.magicDefenceReduce || showType == __class.physicalAttackReduce || showType == __class.physicalDefenceReduce || showType == __class.critDefenceReduce || showType == __class.critReduce || showType == __class.dodgeReduce || showType == __class.hitReduce || showType == __class.attackSpeedReduce || showType == __class.movingSpeedReduce) {
                target.addEffectText(textNode, uw.roleZOrder.WORD);
                //各种减益特效
                textNode.setPosition(mo.pAdd(statePos, mo.p(0, -160)));
                textNode.setOpacity(100);
                seq = mo.sequence(mo.spawn(mo.moveBy(0.5, mo.p(0, 100)).setEase(mo.Ease.sineOut), mo.fadeIn(0.5)), mo.spawn(mo.moveBy(0.3, mo.p(0, 60)).setEase(mo.Ease.sineIn), mo.fadeOut(0.3)), mo.callFunc(target.removeEffectText, target, textNode));
                textNode.runAction(seq);
            }
            else if (showType == __class.physicalImmune || showType == __class.magicImmune || showType == __class.skillsImmune || showType == __class.addEnergy) {
                target.addEffectText(textNode, uw.roleZOrder.WORD);
                if (showType == __class.addEnergy) {
                    //7,击杀奖励
                    textNode.setPosition(mo.pAdd(statePos, mo.p(0, -100)));
                    textNode.setScale(2);
                    textNode.setOpacity(100);
                    seq = mo.sequence(mo.spawn(mo.scaleTo(0.4, 1).setEase(mo.Ease.sineOut), mo.fadeIn(0.4)), mo.delayTime(0.8), mo.spawn(mo.moveBy(0.3, mo.p(0, -40)).setEase(mo.Ease.sineOut), mo.fadeOut(0.3)), mo.callFunc(target.removeEffectText, target, textNode));
                    textNode.runAction(seq);
                }
                else if (showType == __class.physicalImmune || showType == __class.magicImmune || showType == __class.skillsImmune) {
                    //1,物理免疫,2,魔法免疫,6,技能免疫
                    textNode.setScale(0.6);
                    textNode.setPosition(mo.pAdd(statePos, mo.p(0, -50)));
                    textNode.setOpacity(100);
                    seq = mo.sequence(mo.spawn(mo.moveBy(0.4, mo.p(0, -40)).setEase(mo.Ease.sineOut), mo.fadeIn(0.4), mo.scaleTo(0.4, 1)), mo.moveBy(0.8, mo.p(0, -20)), mo.spawn(mo.moveBy(0.3, mo.p(0, -60)).setEase(mo.Ease.sineOut), mo.fadeOut(0.3)), mo.callFunc(target.removeEffectText, target, textNode));
                    textNode.runAction(seq);
                }
            }
            else {
                var bodyPos = target.getBodyPos();
                var textBg = mo.UIImage.create();
                textBg.loadTexture(res.ui_fight.battlestatus_under_png);
                textBg.setAnchorPoint(0.5, 0.5);
                target.addEffectText(textBg, uw.roleZOrder.WORD);
                var size = textBg.getSize(), minus = target.getIsSelf() ? 1 : -1;
                textBg.addChild(textNode);
                if (showType == 4) {
                    var x = target.getIsSelf() ? -70 : 70;
                    seq = mo.sequence(mo.moveBy(0.2, mo.p(x, 0)), mo.moveBy(0.2, mo.p(-x, 0)));
                    target.runAction(seq);
                }
                if (showType == __class.crit || showType == __class.armorbroke) {
                    //3,暴击,8,破甲
                    var randomHeight = Math.random() * 20;
                    textNode.setScale(2);
                    textNode.setPosition(size.width / 2, size.height / 2);
                    textNode.setOpacity(100);
                    seq = mo.sequence(mo.spawn(mo.scaleTo(0.4, 1).setEase(mo.Ease.bounceOut), mo.fadeIn(0.4)), mo.delayTime(0.8), mo.spawn(mo.scaleTo(0.3, 1.3).setEase(mo.Ease.sineIn), mo.fadeOut(0.3)));
                    textNode.runAction(seq);
                    textBg.setPosition(mo.pAdd(bodyPos, mo.p(minus * 40, -randomHeight)));
                    seq = mo.sequence(mo.delayTime(1.3), mo.fadeOut(0.2), mo.callFunc(target.removeEffectText, target, textBg));
                    textBg.runAction(seq);
                }
                else if (showType == __class.dodge) {
                    //4,闪避
                    var randomHeight = Math.random() * 50;
                    textNode.setPosition(size.width / 2 - 80, size.height / 2);
                    textNode.setOpacity(100);
                    seq = mo.sequence(mo.spawn(mo.moveBy(0.4, mo.p(80, 0)).setEase(mo.Ease.sineOut), mo.fadeIn(0.4)), mo.moveBy(0.8, mo.p(20, 0)), mo.spawn(mo.moveBy(0.3, mo.p(80, 0)).setEase(mo.Ease.sineIn), mo.fadeOut(0.3)));
                    textNode.runAction(seq);
                    textBg.setPosition(mo.pAdd(bodyPos, mo.p(minus * 100, 120 - randomHeight)));
                    seq = mo.sequence(mo.delayTime(1.3), mo.fadeOut(0.2), mo.callFunc(target.removeEffectText, target, textBg));
                    textBg.runAction(seq);
                }
                else if (showType == __class.rebound || showType == __class.aback) {
                    //5,反弹伤害, 9,击退
                    var randomHeight = Math.random() * 50;
                    textNode.setOpacity(100);
                    textNode.setPosition(size.width / 2 - 40, size.height / 2);
                    seq = mo.sequence(mo.spawn(mo.moveBy(0.4, mo.p(80, 0)).setEase(mo.Ease.bounceOut), mo.fadeIn(0.4)), mo.moveBy(0.8, mo.p(-20, 0)), mo.spawn(mo.moveBy(0.3, mo.p(-80, 0)).setEase(mo.Ease.sineIn), mo.fadeOut(0.3)), mo.callFunc(target.removeEffectText, target, textNode));
                    textNode.runAction(seq);
                    textBg.setPosition(mo.pAdd(bodyPos, mo.p(minus * 80, 100 - randomHeight)));
                    seq = mo.sequence(mo.delayTime(1.3), mo.fadeOut(0.2), mo.callFunc(target.removeEffectText, target, textBg));
                    textBg.runAction(seq);
                }
            }
        };
        FightShowBuffText.__className = "FightShowBuffText";
        FightShowBuffText.physicalImmune = "physicalImmune"; //物理免疫
        FightShowBuffText.magicImmune = "magicImmune"; //魔法免疫
        FightShowBuffText.crit = "crit"; //暴击
        FightShowBuffText.dodge = "dodge"; //闪避
        FightShowBuffText.rebound = "rebound"; //反弹伤害
        FightShowBuffText.skillsImmune = "skillsImmune"; //技能免疫
        FightShowBuffText.addEnergy = "addEnergy"; //击杀奖励
        FightShowBuffText.armorbroke = "armorbroke"; //破甲
        FightShowBuffText.aback = "aback"; //击退
        FightShowBuffText.magicAttackIncrease = "magicAttackIncrease"; //加魔攻
        FightShowBuffText.magicAttackReduce = "magicAttackReduce"; //减魔攻
        FightShowBuffText.magicDefenceIncrease = "magicDefenceIncrease"; //加魔防
        FightShowBuffText.magicDefenceReduce = "magicDefenceReduce"; //减魔防
        FightShowBuffText.physicalAttackIncrease = "physicalAttackIncrease"; //加物攻
        FightShowBuffText.physicalAttackReduce = "physicalAttackReduce"; //减物攻
        FightShowBuffText.physicalDefenceIncrease = "physicalDefenceIncrease"; //加物防
        FightShowBuffText.physicalDefenceReduce = "physicalDefenceReduce"; //减物防
        FightShowBuffText.attackSpeedIncrease = "attackSpeedIncrease"; //加攻速
        FightShowBuffText.attackSpeedReduce = "attackSpeedReduce"; //减攻速
        FightShowBuffText.bloodDrinkingIncrease = "bloodDrinkingIncrease"; //增加吸血
        FightShowBuffText.critDefenceIncrease = "critDefenceIncrease"; //抗暴增加
        FightShowBuffText.critDefenceReduce = "critDefenceReduce"; //抗暴减少
        FightShowBuffText.critIncrease = "critIncrease"; //暴击增加
        FightShowBuffText.critReduce = "critReduce"; //暴击减少
        FightShowBuffText.defenceOffsetIncrease = "defenceOffsetIncrease"; //增加无视防御
        FightShowBuffText.dodgeIncrease = "dodgeIncrease"; //闪避增加
        FightShowBuffText.dodgeReduce = "dodgeReduce"; //闪避减少
        FightShowBuffText.hitIncrease = "hitIncrease"; //命中增加
        FightShowBuffText.hitReduce = "hitReduce"; //命中减少
        FightShowBuffText.movingSpeedIncrease = "movingSpeedIncrease"; //加移速
        FightShowBuffText.movingSpeedReduce = "movingSpeedReduce"; //减移速
        return FightShowBuffText;
    })(mo.Class);
    uw.FightShowBuffText = FightShowBuffText;
    FightShowBuffText.prototype.__class__ = "uw.FightShowBuffText";
})(uw || (uw = {}));
