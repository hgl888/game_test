var uw;
(function (uw) {
    var FightShowBloodText = (function (_super) {
        __extends(FightShowBloodText, _super);
        function FightShowBloodText() {
            _super.apply(this, arguments);
            this._isDebuff = false;
        }
        var __egretProto__ = FightShowBloodText.prototype;
        __egretProto__.init = function (target, num, isHp, isCritical) {
            var absNum = Math.abs(num);
            this._strHp = num > 0 ? "+" + absNum : "-" + absNum;
            this._target = target;
            this._isHp = isHp;
            this._isCritical = isCritical;
            if (this._isHp) {
                this._isDebuff = this._strHp.substring(0, 1) == "-";
                this._preFrameName = this._isDebuff ? res.ui_fight.temp_fight_debuff_blood_png : res.ui_fight.temp_fight_buff_blood_png;
            }
            else {
                this._preFrameName = res.ui_fight.temp_fight_energy_png;
            }
            this.updateBloodText();
        };
        __egretProto__.updateBloodText = function () {
            var unSignX = Boolean(0 | (2 * Math.random())) ? -1 : 1, targetStatePos = this._target.getStatePos() || mo.p(0, 0), size, item, spriteName, sprite, diffX, diffY, preFrameName = this._preFrameName;
            if (this._isHp) {
                //            diffX = Math.random() * 50;
                //            diffY = 20 + Math.random() * 30;
                diffX = 0;
                diffY = 20;
            }
            else {
                diffX = 0;
                diffY = 0;
            }
            var node = new mo.Node();
            //todo ts
            //node.setCascadeOpacityEnabled(true);
            node.setPosition(targetStatePos.x + unSignX * diffX, targetStatePos.y + diffY);
            this._target.addEffectText(node, uw.roleZOrder.BLOOD);
            size = mo.size(0, 0);
            for (var i = 0; i < this._strHp.length; i++) {
                item = this._strHp[i];
                var ss = item == "-" ? "minus" : (item == "+" ? "plus" : item);
                spriteName = mo.formatStr(preFrameName, ss);
                sprite = mo.UIImage.create();
                sprite.loadTexture(spriteName);
                if (sprite) {
                    //sprite.setCascadeOpacityEnabled(true);
                    sprite.setAnchorPoint(0, 0.5);
                    sprite.setPosition(size.width, 0);
                    size.width += sprite.width;
                    node.addChild(sprite);
                }
            }
            node.setAnchorPoint(0.5, 0);
            node.width = size.width;
            node.height = size.height;
            var seq;
            //暴鸡
            if (this._isHp && this._isDebuff && this._isCritical) {
                seq = mo.spawn(mo.sequence(mo.scaleTo(0.1, 1.5).setEase(mo.Ease.sineOut), mo.delayTime(0.4), mo.spawn(mo.scaleTo(0.5, 1.2).setEase(mo.Ease.sineIn), mo.fadeOut(0.5)), mo.callFunc(this._target.removeEffectText, this._target, node)), mo.moveBy(1, mo.p(0, -120)));
            }
            else if (this._isHp && this._isDebuff) {
                node.setScale(0.55);
                node.setOpacity(100);
                seq = mo.sequence(mo.spawn(mo.moveBy(0.3, mo.p(0, -70)).setEase(mo.Ease.sineIn), mo.fadeIn(0.3), mo.scaleTo(0.3, 0.9)), mo.delayTime(0.4), mo.spawn(mo.moveBy(0.5, mo.p(0, -120)).setEase(mo.Ease.sineOut), mo.fadeOut(0.5)), mo.callFunc(this._target.removeEffectText, this._target, node));
            }
            else if (this._isHp && !this._isDebuff) {
                node.setScale(0.9);
                seq = mo.sequence(mo.spawn(mo.moveBy(0.3, mo.p(0, -50)), mo.fadeIn(0.3)), mo.moveBy(0.6, mo.p(0, -100)), mo.spawn(mo.moveBy(0.6, mo.p(0, -100)), mo.fadeOut(0.6)), mo.callFunc(this._target.removeEffectText, this._target, node));
            }
            else if (!this._isHp) {
                node.setOpacity(0);
                node.setScale(0.6);
                seq = mo.sequence(mo.delayTime(1.5), mo.spawn(mo.moveBy(0.2, mo.p(0, -25)), mo.fadeIn(0.2)), mo.moveBy(1.6, mo.p(0, -200)), mo.spawn(mo.moveBy(0.2, mo.p(0, -25)), mo.fadeOut(0.2)), mo.callFunc(this._target.removeEffectText, this._target, node));
            }
            node.runAction(seq);
        };
        FightShowBloodText.__className = "FightShowBloodText";
        return FightShowBloodText;
    })(mo.Class);
    uw.FightShowBloodText = FightShowBloodText;
    FightShowBloodText.prototype.__class__ = "uw.FightShowBloodText";
})(uw || (uw = {}));
