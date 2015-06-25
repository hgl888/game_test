/**
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        egret.Profiler.getInstance().run();
        this.gamesample = new TriangleSample();
    }
    Main.prototype._onAddToStage = function () {
        _super.prototype._onAddToStage.call(this);
        console.log(this);
    };
    Main.prototype.onAddToStage = function (event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     */
    Main.prototype.createGameScene = function () {
        //var pgame = new egret_native.EgretGameTriangle();
        //pgame.initialize();
        //egret_native.EgretGameTriangle.test();

        //箭头
        //var shape_38 = new CreateJSGraphics(  );
        //shape_38.graphics.beginLinearGradientFill(["#00FFEE", "#00AAFF"], [0.494, 1], -28.6, 0, 28.8, 0).beginStroke().moveTo(28.7, -44.7).lineTo(28.7, 44.7).lineTo(-28.7, -0).closePath();
        //shape_38.setTransform(100 + 27.6, 100);
        //this.addChild(shape_38);

        //var n = gametri.pgame.num;
        //gametri.pgame.num = 100;
        this.gamesample.initialize();

    };

    Main.prototype.onTouchesBegin = function() {
        console.log( "onTouchesBegin" );
        this.gamesample.onTouchesBegin();
    };
    Main.prototype.onTouchesEnd = function() {
        console.log( "onToucesEnd" );
        this.gamesample.onTouchesEnd();
    };

    Main.prototype.onTouchesMove = function() {
        console.log( "onTouchesMove" );
    };

    Main.prototype.onTouchesCancel = function() {
        console.log( "onTouchesCancel" );
    };

    Main.prototype.parseRGBA = function (str) {
        var index = str.indexOf("(");
        str = str.slice(index + 1, str.length - 1);
        var arr = str.split(",");
        var a = parseInt((arr[3] * 255)).toString(16);
        var r = (parseInt(arr[0])).toString(16);
        var g = (parseInt(arr[1])).toString(16);
        var b = (parseInt(arr[2])).toString(16);
        var fill = function (s) {
            if (s.length < 2) {
                s = "0" + s;
            }
            return s;
        };
        str = "#" + fill(a) + fill(r) + fill(g) + fill(b);
        return str;
    };
    Main.prototype.parseRGB = function (str) {
        var index = str.indexOf("(");
        str = str.slice(index + 1, str.length - 1);
        var arr = str.split(",");
        var r = (parseInt(arr[0])).toString(16);
        var g = (parseInt(arr[1])).toString(16);
        var b = (parseInt(arr[2])).toString(16);
        var fill = function (s) {
            if (s.length < 2) {
                s = "0" + s;
            }
            return s;
        };
        str = "#" + fill(r) + fill(g) + fill(b);
        return str;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     */
    Main.prototype.startAnimation = function (result) {
        var textContainer = this.textContainer;
        var count = -1;
        var self = this;
        var change = function () {
            count++;
            if (count >= result.length) {
                count = 0;
            }
            var lineArr = result[count];
            self.changeDescription(textContainer, lineArr);
            var tw = egret.Tween.get(textContainer);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };
        change();
    };
    /**
     * 切换描述内容
     */
    Main.prototype.changeDescription = function (textContainer, lineArr) {
        textContainer.removeChildren();
        var w = 0;
        for (var i = 0; i < lineArr.length; i++) {
            var info = lineArr[i];
            var colorLabel = new egret.TextField();
            colorLabel.x = w;
            colorLabel.anchorX = colorLabel.anchorY = 0;
            colorLabel.textColor = parseInt(info["textColor"]);
            colorLabel.text = info["text"];
            colorLabel.size = 40;
            textContainer.addChild(colorLabel);
            w += colorLabel.width;
        }
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
