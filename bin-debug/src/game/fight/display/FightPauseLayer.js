var uw;
(function (uw) {
    var FightPauseLayer = (function (_super) {
        __extends(FightPauseLayer, _super);
        function FightPauseLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = FightPauseLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._maskMode = 1;
            this._jsonPath = res.uiFightPauseLayer_ui;
            this._closeOutSide = false;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            this.onClickByName("btnContinue", this.menuContinue, this);
            this.onClickByName("btnQuit", this.menuQuit, this);
            this._btnSound = this.getWidgetByName("btnSound");
            this._btnSound.onClick(this.menuSound, this);
            this._btnSound.setBright(!mo.audioEnabled);
        };
        __egretProto__.menuContinue = function () {
            this.close();
            uw.fightMainCtrl.resumeFight();
        };
        __egretProto__.menuQuit = function () {
            uw.fightMainCtrl.exitFight();
        };
        __egretProto__.menuSound = function () {
            if (!mo.audioEnabled) {
                mo.audioEnabled = true;
                mo.playMusicById(res.audio_ui.bg_fight, true);
                mo.setMusicVolume(0.3);
                this._btnSound.setBright(false);
            }
            else {
                mo.audioEnabled = false;
                mo.pauseMusic();
                this._btnSound.setBright(true);
            }
        };
        FightPauseLayer.__className = "FightPauseLayer";
        return FightPauseLayer;
    })(mo.Dlg);
    uw.FightPauseLayer = FightPauseLayer;
    FightPauseLayer.prototype.__class__ = "uw.FightPauseLayer";
})(uw || (uw = {}));
