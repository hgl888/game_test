/**
 * Created by yangsong on 14/12/22.
 */
var uw;
(function (uw) {
    var EmbattleHeroCard = (function (_super) {
        __extends(EmbattleHeroCard, _super);
        function EmbattleHeroCard() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = EmbattleHeroCard.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._roleTempId = 0;
            self._isLeader = false;
            self._instanceId = 0;
            self._played = false;
            self._disabledColor = mo.c3b(126, 126, 126);
            self._colorBackup = mo.c3b(255, 255, 255);
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._headSprite = mo.UIImage.create();
            self._headSprite.setPosition(150, 150);
            self.addChild(self._headSprite);
            var border = self._borderSprite = mo.createS9GPanel(295, 295, res.ui_common.blk9_q_0_png);
            border.anchorX = 0.5;
            border.anchorY = 0.5;
            border.setPosition(150, 150);
            self.addChild(border);
            self._mark = mo.UIImage.create();
            self._mark.setPosition(210, 240);
            self._mark.setVisible(false);
            self._mark.loadTexture(res.ui_common.copy_choose_png);
            self.addChild(self._mark);
            self._levelBg = mo.UIImage.create();
            self._levelBg.loadTexture(res.ui_panel.copy_level_blanket_png);
            self._levelBg.setAnchorPoint(0, 1);
            self._levelBg.setPosition(30, 270);
            self.addChild(self._levelBg);
            self._level = mo.UIText.create();
            self._level.setText("0");
            self._level.setFontSize(52);
            self._level.setAnchorPoint(0, 1);
            self._level.setColor(mo.c3b(200, 200, 200));
            self._level.setPosition(10, 60);
            self._levelBg.addChild(self._level, 9);
            self.setLevelVisible(false);
            self.setTouchEnabled(true);
            //            self.setScale(0.95);
        };
        __egretProto__.resetByData = function (heroDataCtrl) {
            if (heroDataCtrl) {
                this._dataCtrl = heroDataCtrl;
                this._roleTempId = heroDataCtrl.tempId;
                this._instanceId = heroDataCtrl.id;
                var level = heroDataCtrl.getLvl();
                this._level.setText(level);
                this._borderSprite.transColor(heroDataCtrl.colorType);
                this._headSprite.loadTexture(heroDataCtrl.icon);
                var size = this._borderSprite.getSize();
                this.setSize(size);
            }
        };
        __egretProto__.getDataCtrl = function () {
            return this._dataCtrl;
        };
        __egretProto__.getPosZOrder = function () {
            return this._dataCtrl.warriorTemp[uw.t_warrior_posOrder];
        };
        __egretProto__.setSelected = function (isSelected) {
            var opacity = isSelected ? 100 : 255;
            this._headSprite.setOpacity(opacity);
            this._borderSprite.setOpacity(opacity);
            this._levelBg.setOpacity(opacity);
            this._level.setOpacity(opacity);
        };
        __egretProto__.setPlayed = function (isPlayed) {
            this._played = isPlayed;
            this.setSelected(isPlayed);
            this._mark.setVisible(isPlayed);
        };
        __egretProto__.getPlayed = function () {
            return this._played;
        };
        __egretProto__.setLevelVisible = function (isVisible) {
            this._levelBg.setVisible(isVisible);
        };
        __egretProto__.setTemplateId = function (_tempId) {
            this._roleTempId = _tempId;
        };
        __egretProto__.getTemplateId = function () {
            return this._roleTempId;
        };
        __egretProto__.setInstanceId = function (_instanceId) {
            this._instanceId = _instanceId;
        };
        __egretProto__.getInstanceId = function () {
            return this._instanceId;
        };
        __egretProto__.addPedestal = function (pedestal) {
            if (pedestal) {
                this._pedestal = pedestal;
                this._pedestal.hero = this;
            }
        };
        __egretProto__.removePedestal = function () {
            if (this._pedestal) {
                this._pedestal.hero = null;
                this._pedestal = null;
            }
        };
        __egretProto__.getPedestal = function () {
            return this._pedestal;
        };
        __egretProto__.backToOriginPosition = function () {
            if (this._pedestal) {
                var pos = this._pedestal.getPosition();
                var act = mo.moveTo(0.2, pos).setEase(mo.Ease.sineOut);
                this.runAction(act);
            }
        };
        return EmbattleHeroCard;
    })(mo.GridViewCell);
    uw.EmbattleHeroCard = EmbattleHeroCard;
    EmbattleHeroCard.prototype.__class__ = "uw.EmbattleHeroCard";
})(uw || (uw = {}));
