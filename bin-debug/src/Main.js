var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__._onAddToStage = function () {
        _super.prototype._onAddToStage.call(this);
        var self = this;
        //todo egret
        egret.MainContext.__use_new_draw = false;
        var stage = self.stage;
        self.width = stage.stageWidth;
        self.height = stage.stageHeight;
        mo.loadProject(function () {
            tm.init();
            mo.init();
            uw.init();
            mo._customStageGetter = function () {
                return self;
            };
            res.root = "resource";
            //添加游戏激活监听
            stage.addEventListener(egret.Event.ACTIVATE, function () {
                //h5太烦了，所以就不做判断了
                if (egret.MainContext.runtimeType == egret.MainContext.RUNTIME_NATIVE) {
                    mo.request4Http(uw.iface.h_server_getServerDate, function (serverDate) {
                        mo.debug("serverDate--->", serverDate);
                        Date.setStandard(serverDate);
                    });
                }
            }, self);
            //设置加载进度界面
            self._waitingIndex = true;
            self._waitingLogo = true;
            //统计是否已经加载完game zip
            uw.RecordDataCtrl.addLoadRecordWithoutLogined(uw.id_c_loadModule.gameZipLoaded);
            self.displayLogo();
            self.visible = false;
            res.mgr.loadToGolabel(res.getResArr("first"), function () {
                mo.sceneMgr.runScene(uw.IndexScene, mo.SceneMgr.LOADING_TYPE_CIRCLE, function () {
                    self._waitingIndex = false;
                    mo._customStageGetter = null;
                    if (!self._waitingLogo)
                        self.startGame(); //如果不用在等logo了
                });
            });
            //进行base的偷偷加载
            res.mgr.loadToGolabel(res.getResArr("base"), function () {
            });
        });
    };
    __egretProto__.startGame = function () {
        var self = this;
        console.log("--------startGame------");
        if (self._gameBegan)
            return;
        self._gameBegan = true;
        switch (global.testMode) {
            case "calProps": return uw.test_calProps();
        }
        //mo.runningScene.visible = false;
        var logoImg = self._logoImg;
        logoImg.runAction(mo.sequence(mo.fadeOut(0.5), mo.callFunc(function () {
            var scene = mo.runningScene;
            scene.setOpacity(0);
            scene.runAction(mo.fadeIn(0.5));
            self.visible = true;
            logoImg.removeFromParent();
            res.unload([res.logo_jpg]);
        })));
        uw.setMsgCode();
        //进行HomeScene的偷偷加载
        res.load(res.getResArr("HomeScene"), function () {
        });
        mo.request4Http(uw.iface.h_server_getServerDate, function (serverDate) {
            mo.debug("serverDate--->", serverDate);
            Date.setStandard(serverDate);
        });
    };
    __egretProto__.displayLogo = function () {
        var resArr = [res.logo_jpg];
        var self = this;
        self._waitingLogo = true;
        res.load(resArr, function () {
            var logoImg = self._logoImg = new mo.UIImage();
            logoImg.loadTexture(res.logo_jpg);
            var stage = self.stage;
            stage.addChild(logoImg);
            logoImg.setOpacity(0);
            var stageWidth = stage.stageWidth, stageHeight = stage.stageHeight;
            //            logoImg.scaleX = stageWidth/logoImg.width;
            //            logoImg.scaleY = stageHeight/logoImg.height;
            logoImg.x = stageWidth / 2;
            logoImg.y = stageHeight / 2;
            var act1 = mo.sequence(mo.fadeIn(0.5), mo.delayTime(2), mo.callFunc(function () {
                self._waitingLogo = false;
                if (!self._waitingIndex)
                    self.startGame(); //如果不用在等初始的资源加载了
            }));
            logoImg.runAction(act1);
        });
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
