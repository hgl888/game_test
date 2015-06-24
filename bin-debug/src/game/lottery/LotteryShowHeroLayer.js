/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var LotteryShowHeroLayer = (function (_super) {
        __extends(LotteryShowHeroLayer, _super);
        function LotteryShowHeroLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = LotteryShowHeroLayer.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._jsonPath = res.uiLotteryShowHeroLayer_ui;
            self._showWithAction = false;
            this._heroActionsArr = [
                uw.Fight.HeroAction.normalAttack,
                uw.Fight.HeroAction.skillAttack1,
                uw.Fight.HeroAction.uniqueAttack,
                uw.Fight.HeroAction.run
            ];
        };
        __egretProto__.init = function (tempId, isGotHero) {
            _super.prototype.init.call(this);
            this._container = this.getWidgetByName("box");
            var self = this, pos = this.getPositionByName("stance");
            self.tempId = tempId;
            this.setVisibleByName("hadHero", isGotHero);
            var heroData = uw.getWarriorByTempId(tempId), heroName = heroData[uw.t_warrior_name];
            var armature = this._heroArmature = uw.roleArmFactory.produceDynamic(heroData[uw.t_warrior_id], function (sender) {
                sender.play(uw.Fight.HeroAction.normalAttack);
                sender.setMovementEventCallFunc(self.playActions, self);
            });
            armature.setPosition(pos);
            armature.setScale(1.3);
            armature.setZOrder(2);
            self._container.addChild(armature);
            this.setInfoByName("heroName", heroName);
            this.setAdaptiveScaleByName("bg", mo.RESOLUTION_POLICY.FIXED_WIDTH);
            this.enableStrokeByName("hadHero", mo.c3b(0, 0, 0), 3);
            this.setEffect();
            this.onClickByName("root", this.close, this);
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            mo.playUIAudio(res.audio_ui.getHero);
            var tid = mo.getJSONWithFileNameAndID(uw.cfg_t_hero, this.tempId)[uw.t_hero_tid];
            mo.playWalkWordAudio(tid, false);
        };
        __egretProto__.setEffect = function () {
            var armature = uw.uiArmFactory.produceDynamic(res.cca_ui.effect_getHero, function (arm) {
                arm.setPosition(mo.p(800, 700));
                arm.playWithIndex(0);
            });
            this._container.addChild(armature, 1);
        };
        __egretProto__.playActions = function (armature, movementType, movementID) {
            if (movementType == mo.Armature.MOVEMENT_TYPE.COMPLETE) {
                if (this._heroActionIndex < this._heroActionsArr.length - 1) {
                    this._heroActionIndex++;
                }
                else {
                    this._heroActionIndex = 0;
                }
                var actionName = this._heroActionsArr[this._heroActionIndex];
                armature.removeMovementEvent(this.playActions, this);
                armature.play(actionName);
                armature.setMovementEventCallFunc(this.playActions, this);
            }
        };
        LotteryShowHeroLayer.__className = "LotteryShowHeroLayer";
        return LotteryShowHeroLayer;
    })(mo.Dlg);
    uw.LotteryShowHeroLayer = LotteryShowHeroLayer;
    LotteryShowHeroLayer.prototype.__class__ = "uw.LotteryShowHeroLayer";
})(uw || (uw = {}));
