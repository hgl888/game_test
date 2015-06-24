var unit;
(function (unit) {
    unit.log;
    unit.debug;
    unit.info;
    unit.warn;
    unit.error;
    logger.initLogger(unit, "unit");
    unit.curRegisterModule = "unit";
    unit.menuMap = {};
    unit.testContainer;
    unit.testTitle;
    unit.testButton;
    unit.testMenu;
    unit.subTestMenu;
    function init() {
        //init_egret();
        //init_mo();
        //init_game();
        var stage = egret.MainContext.instance.stage;
        stage.removeChildren();
        var sW = stage.stageWidth, sH = stage.stageHeight;
        unit.testContainer = new egret.DisplayObjectContainer();
        unit.testContainer.width = sW;
        unit.testContainer.height = sH;
        stage.addChild(unit.testContainer);
        unit.testTitle = new egret.TextField();
        unit.testTitle.size = 80;
        unit.testTitle.anchorX = 0.5;
        unit.testTitle.x = sW / 2;
        stage.addChild(unit.testTitle);
        unit.testButton = new egret.TextField();
        unit.testButton.size = 120;
        unit.testButton.text = "撸";
        unit.testButton.anchorX = 1;
        unit.testButton.anchorY = 0.5;
        unit.testButton.touchEnabled = true;
        unit.testButton.textColor = 0xff0000;
        unit.testButton.x = sW;
        unit.testButton.y = sH / 2;
        stage.addChild(unit.testButton);
        unit.testButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            unit.testContainer.visible = false;
            unit.testMenu.visible = true;
            unit.subTestMenu.visible = false;
        }, this);
        //menu创建
        unit.testMenu = new Menu();
        unit.testMenu.visible = false; //先设置成不可见
        stage.addChild(unit.testMenu);
        unit.testMenu.setMenus(unit.menuMap);
        //menu创建
        unit.subTestMenu = new SubMenu();
        unit.subTestMenu.visible = false; //先设置成不可见
        stage.addChild(unit.subTestMenu);
    }
    unit.init = init;
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.call(this);
            var stage = egret.MainContext.instance.stage;
            var sW = stage.stageWidth, sH = stage.stageHeight;
            this.width = sW;
            this.height = sH;
        }
        var __egretProto__ = Menu.prototype;
        __egretProto__.setMenus = function (menuMap) {
            var self = this;
            self.removeChildren();
            var width = self.width, height = self.height;
            var beginX = 400, beginY = 100, btnW = 350, btnH = 160;
            var xTotal = beginX, yTotal = beginY;
            var row = 0;
            for (var key in menuMap) {
                var buttonInfo = menuMap[key];
                var text = key;
                var btn = new egret.TextField();
                btn.text = text;
                btn.size = 100;
                btn.touchEnabled = true;
                btn.x = xTotal;
                btn.y = yTotal;
                self.addChild(btn);
                if (xTotal + btnW + btnW > width) {
                    xTotal = beginX;
                    row++;
                    yTotal += btnH;
                }
                else {
                    xTotal += btnW;
                }
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    var info = this;
                    self.visible = false;
                    unit.subTestMenu.visible = true;
                    unit.subTestMenu.setButtons(info.buttonInfo);
                }, { buttonInfo: buttonInfo });
            }
        };
        return Menu;
    })(egret.DisplayObjectContainer);
    unit.Menu = Menu;
    Menu.prototype.__class__ = "unit.Menu";
    var SubMenu = (function (_super) {
        __extends(SubMenu, _super);
        function SubMenu() {
            _super.call(this);
            var stage = egret.MainContext.instance.stage;
            var sW = stage.stageWidth, sH = stage.stageHeight;
            this.width = sW;
            this.height = sH;
        }
        var __egretProto__ = SubMenu.prototype;
        __egretProto__.setButtons = function (buttonInfoArr) {
            var self = this;
            self.removeChildren();
            unit.subTestMenu.visible = true;
            var width = self.width, height = self.height;
            var beginX = 400, beginY = 100, btnW = 650, btnH = 120;
            var xTotal = beginX, yTotal = beginY;
            var row = 0;
            for (var i = 0, l_i = buttonInfoArr.length; i < l_i; i++) {
                var buttonInfo = buttonInfoArr[i];
                var text = buttonInfo.text;
                var btn = new egret.TextField();
                btn.text = text;
                btn.size = 80;
                btn.touchEnabled = true;
                btn.x = xTotal;
                btn.y = yTotal;
                self.addChild(btn);
                if (xTotal + btnW + btnW > width) {
                    xTotal = beginX;
                    row++;
                    yTotal += btnH;
                }
                else {
                    xTotal += btnW;
                }
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, onTestBtnClick, buttonInfo);
            }
        };
        return SubMenu;
    })(egret.DisplayObjectContainer);
    unit.SubMenu = SubMenu;
    SubMenu.prototype.__class__ = "unit.SubMenu";
    var _curUnloadFn = null;
    var _curUnLoadFnCtx = null;
    var _curParam = null;
    function splitLine(name) {
        unit.debug("------------------", name, "------------------");
    }
    unit.splitLine = splitLine;
    function registerTestBtn(name, click, unload, ctx) {
        var cfg = { text: name, cb: click, unload: unload, ctx: ctx };
        var arr = unit.menuMap[unit.curRegisterModule];
        if (!arr) {
            arr = unit.menuMap[unit.curRegisterModule] = [];
        }
        arr.push(cfg);
    }
    unit.registerTestBtn = registerTestBtn;
    unit.resRoot = "resource";
    function resetStage() {
        res.root = unit.resRoot; //重置资源根路径
        //TODO
        //mo.timer.clear();//清除所有timer注册的invocation
        //mo.clearAllTimeout();//清除所有的timeout
        unit.testContainer.removeChildren();
    }
    unit.resetStage = resetStage;
    function onTestBtnClick() {
        resetStage();
        unit.testContainer.visible = true;
        unit.testMenu.visible = false;
        unit.subTestMenu.visible = false;
        if (_curUnloadFn)
            _curUnloadFn.call(_curUnLoadFnCtx, _curParam);
        var cfg = this;
        splitLine(cfg.text);
        unit.testTitle.text = cfg.text;
        _curUnloadFn = cfg.unload;
        _curUnLoadFnCtx = cfg.ctx;
        _curParam = {};
        cfg.cb.call(cfg.ctx, _curParam);
        return false;
    }
    unit.onTestBtnClick = onTestBtnClick;
})(unit || (unit = {}));
