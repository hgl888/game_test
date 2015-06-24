/**
 * Created by huanghaiying on 14/12/16.
 */
var uw;
(function (uw) {
    var ArmatureLoaderLayer = (function (_super) {
        __extends(ArmatureLoaderLayer, _super);
        function ArmatureLoaderLayer() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ArmatureLoaderLayer.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            this._jsonPath = res.uiLoadingLayer_ui;
            this.isToHideTraysUnder = true;
        };
        __egretProto__.init = function () {
            _super.prototype.init.call(this);
            var self = this;
            self._tips = self.getWidgetByName("tips");
            self._heroContainer = self.getWidgetByName("heroContainer");
            self._monsterContainer = self.getWidgetByName("monsterContainer");
            self._loadingbar = self.getWidgetByName("loadingbar");
            self._loadingbar.setPercent(0);
            self._hero = uw.uiArmFactory.produce(res.cca_ui.runningMan);
            self._monster = uw.uiArmFactory.produce(res.cca_ui.runningDragon);
            self._heroContainer.addChild(self._hero);
            self._monsterContainer.addChild(self._monster);
        };
        __egretProto__.onEnter = function () {
            _super.prototype.onEnter.call(this);
            var self = this;
            var heroArm = self._hero, monster = self._monster;
            heroArm.playWithIndex(0);
            heroArm.setPosition(0, 200);
            monster.playWithIndex(0);
            monster.setPosition(0, 200);
            self.runProgress();
        };
        __egretProto__.runProgress = function () {
            var self = this;
            var randomProgressTime = mo.random(1, 4);
            self._loadingbar.runProgressTo(randomProgressTime, 100, function () {
                self.runProgress();
                uw.log("加载跑完一次了");
            });
            self.showTips();
        };
        __egretProto__.showTips = function () {
            var self = this;
            var tips = mo.getJSONWithFileName(uw.cfg_c_loadingTips);
            var arr = Object.keys(tips);
            var key = mo.randomFromArr(arr);
            var text = tips[key][uw.c_loadingTips_text];
            self._tips.setText("小贴士：" + text);
        };
        __egretProto__.onExit = function () {
            _super.prototype.onExit.call(this);
            var self = this;
            self._loadingbar.setPercent(0);
        };
        ArmatureLoaderLayer.__className = "ArmatureLoaderLayer";
        return ArmatureLoaderLayer;
    })(mo.LoadingLayer);
    uw.ArmatureLoaderLayer = ArmatureLoaderLayer;
    ArmatureLoaderLayer.prototype.__class__ = "uw.ArmatureLoaderLayer";
})(uw || (uw = {}));
