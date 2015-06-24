var uw;
(function (uw) {
    var FightScene = (function (_super) {
        __extends(FightScene, _super);
        function FightScene() {
            _super.apply(this, arguments);
            this._fightId = 0;
        }
        var __egretProto__ = FightScene.prototype;
        __egretProto__.init = function () {
            var self = this;
            _super.prototype.init.call(this);
            self._bgLayer = uw.FightBgLayer.create();
            self._bgLayer.setDelegate(self);
            self._uiLayer = uw.FightUILayer.create();
            self._uiLayer.setDelegate(self);
            self._mainLayer = uw.FightMainLayer.create();
            self._mainLayer.setDelegate(self);
            self._mainLayer.setPosition(mo.visibleRect.center());
            self._startLayer = uw.FightStartFightingLayer.create();
            self._startLayer.setDelegate(self);
            //监听
            self.registerClassByKey(uw.FightMainCtrl, uw.FightMainCtrl.ON_SHOW_RESULT, self.showResultLayer);
            uw.log("战斗场景 init");
        };
        __egretProto__.show = function () {
            _super.prototype.show.call(this);
            var self = this;
            self._bgLayer.show();
            self._mainLayer.show();
            self._uiLayer.show();
            self._startLayer.show();
            //统计是否进入了第一场战斗
            uw.RecordDataCtrl.addLoadRecord(uw.id_c_loadModule.firstFight);
        };
        __egretProto__.hide = function () {
            var self = this;
            self._bgLayer.hide();
            self._uiLayer.hide();
            self._mainLayer.hide();
            self._startLayer.hide();
        };
        __egretProto__.addFilmLayer = function () {
            var self = this;
            self._filmLayer = uw.FilmMainLayer.create();
            self._filmLayer.setDelegate(self);
            self._filmLayer.show();
            self.hide();
            return self._filmLayer;
        };
        __egretProto__.removeFilmLayer = function () {
            var self = this;
            self._filmLayer.close();
            self._filmLayer = null;
            self.show();
        };
        __egretProto__.initWithData = function (fightId, waveCount) {
            var self = this;
            self._fightId = fightId;
            this._uiLayer.setTotalWaveCount(waveCount);
            this.setCurWaveCount(0);
        };
        /**
         * 增加一个角色
         */
        __egretProto__.addChar = function (tempId, isSelf, cb) {
            return this._mainLayer.addChar(tempId, isSelf, cb);
        };
        /**
         * 设置现在是第几波
         * @param curIndex
         */
        __egretProto__.setCurWaveCount = function (curIndex) {
            this._uiLayer.setCurWaveCount(curIndex);
            this._bgLayer.reset(this._fightId, curIndex);
        };
        /**
         * 调出对话框
         */
        __egretProto__.callTalkLayer = function () {
            var self = this;
            var talkLayer = uw.FightTalkLayer.create(self._fightId);
            talkLayer.setDelegate(self);
            talkLayer.show();
            return talkLayer;
        };
        /**
         * 获取战斗层
         * @returns {null}
         */
        __egretProto__.getMainLayer = function () {
            return this._mainLayer;
        };
        /**
         * 获取UI操作层
         * @returns {null}
         */
        __egretProto__.getUILayer = function () {
            return this._uiLayer;
        };
        /**
         * 背景层
         * @returns {null}
         */
        __egretProto__.getBgLayer = function () {
            return this._bgLayer;
        };
        /**
         * 开场提示
         * @returns {uw.FightScene._startLayer|*}
         */
        __egretProto__.getStartLayer = function () {
            return this._startLayer;
        };
        /**
         * 获取结束画面
         * @returns {null}
         */
        __egretProto__.getResultLayer = function () {
            return this._resultLayer;
        };
        __egretProto__.showResultLayer = function (resultData) {
            var resultLayer = uw.FightResultLayer.create(resultData);
            resultLayer.setDelegate(this);
            resultLayer.show();
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            mo.playMusicById(res.audio_ui.bg_fight, true);
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            mo.playMusicById(res.audio_ui.bg_home, true);
        };
        __egretProto__.dtor = function () {
            _super.prototype.dtor.call(this);
            //销毁UI Arm
            uw.uiArmFactory.releaseAllProducts();
            //销毁特效
            uw.effectArmFactory.releaseAllProducts();
            //销毁角色
            uw.roleArmFactory.releaseAllProducts();
        };
        FightScene.__className = "FightScene";
        return FightScene;
    })(mo.Scene);
    uw.FightScene = FightScene;
    FightScene.prototype.__class__ = "uw.FightScene";
})(uw || (uw = {}));
