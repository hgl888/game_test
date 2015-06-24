/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        egret.Profiler.getInstance().run();
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        var sp =new egret.Sprite();
        sp.graphics.beginFill(0xFFFF00);
        sp.graphics.drawRect(0,0,1000,1000);
        sp.graphics.endFill();
        this.addChild(sp);
        var map=new lib.monkey();
        G.exportRoot=map;
        this.addChild(map);
        createjs.Flash.init(24);
        createjs.Flash.startFlash(map);
      
        // var e = new lib.m1leg1(1, 2);
        // e.x = e.y = 100;
        // this.addChild(e);
        return;
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
        var sp = new egret.Sprite();
        sp.graphics.beginFill(0xFFFF00);
        sp.graphics.drawRect(0, 0, 100, 100);
        sp.graphics.endFill();
        sp.x = sp.y = 400;
        sp.touchEnabled = true;
        this.addChild(sp);
        sp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        var t = new createjs.Shape();
        t.graphics.beginFill("rgba(255,255,0,0.4)").beginStroke().moveTo(-26.5, -15.7).lineTo(0.1, -31.5).lineTo(26.5, -15.7).lineTo(26.5, 15.7).lineTo(0.6, 31.5).lineTo(-26.5, 15.8).closePath();
        t.x = 400;
        t.y = 100;
        this.addChild(t);
        var arr = new gr_swipe_arr("synched", 0);
        arr.setTransform(100, 600, 0.73, 0.73, -89.9, 0, 0, 1.1, 0);
        arr.alpha = 0.289;
        this.addChild(arr);
        var touch = new mc_touch();
        touch.y = 444;
        this.addChild(touch);
        var bg_red = new gr_bg_red("synched", 0);
        bg_red.setTransform(240, 360, 1, 1, 0, 0, 0, 240, 360);
        this.addChild(bg_red);
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     */
    __egretProto__.onResourceLoadComplete = function (event) {
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
    __egretProto__.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     */
    __egretProto__.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     */
    __egretProto__.createGameScene = function () {
        //var map:createjs.MovieClip=new libmap.lib.DocumentMain();
        //G.exportRoot=map;
        //this.addChild(map);
        //createjs.Flash.init(12);
        //createjs.Flash.startFlash(map);
    };
    __egretProto__.onClick = function (e) {
        G.exportRoot.gotoAndPlay('open');
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
var gr_bg_red = (function (_super) {
    __extends(gr_bg_red, _super);
    function gr_bg_red(mode, startPostion) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        _super.call(this);
        this.setBounds(0, -9.9, 480, 730);
        this.init();
    }
    var __egretProto__ = gr_bg_red.prototype;
    __egretProto__.init = function () {
        this.shape = new createjs.Shape();
        this.shape.graphics.beginLinearGradientFill(["#CC0000", "rgba(204,0,0,0)"], [0, 1], 0, 99.6, 0, -80.3).beginStroke().moveTo(-240, -110.5).lineTo(240, -110.5).lineTo(240, 110.5).lineTo(-240, 110.5).closePath();
        this.shape.setTransform(240, 609.5);
        this.shape_1 = new createjs.Shape();
        this.shape_1.graphics.beginLinearGradientFill(["#CC0000", "rgba(204,0,0,0)"], [0, 0.824], 0, -81.9, 0, 98).beginStroke().moveTo(240, -78).lineTo(240, 78).lineTo(-240, 78).lineTo(-240, -78).closePath();
        this.shape_1.setTransform(240, 68);
        this.addChild(this.shape_1);
        this.addChild(this.shape);
    };
    return gr_bg_red;
})(createjs.Sprite);
gr_bg_red.prototype.__class__ = "gr_bg_red";
var gr_swipe_arr = (function (_super) {
    __extends(gr_swipe_arr, _super);
    function gr_swipe_arr(mode, startPostion) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        _super.call(this);
        this.setBounds(-54.2, -63.1, 110.6, 126.5);
        this.init();
    }
    var __egretProto__ = gr_swipe_arr.prototype;
    __egretProto__.init = function () {
        this.shape_38 = new createjs.Shape();
        this.shape_38.graphics.lf(["#00FFEE", "rgba(0,182,255,0.498)"], [0.494, 1], -28.6, 0, 28.8, 0).s().p("AEfm+IAAN9Io9m/II9m+").cp();
        this.shape_38.setTransform(27.6, 0);
        this.shape_39 = new createjs.Shape();
        this.shape_39.graphics.lf(["#00FFEE", "rgba(0,182,255,0.498)"], [0.494, 1], -40.5, 0, 40.6, 0).s().p("AGWp3IAAEqImsFNIGsFOIAAEqIsrp4IMrp3").cp();
        this.shape_39.setTransform(-13.6, 0);
        this.addChild(this.shape_39);
        this.addChild(this.shape_38);
    };
    return gr_swipe_arr;
})(createjs.Sprite);
gr_swipe_arr.prototype.__class__ = "gr_swipe_arr";
var mc_touch = (function (_super) {
    __extends(mc_touch, _super);
    function mc_touch(mode, startPostion, loop) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        if (loop === void 0) { loop = null; }
        _super.call(this, mode, startPostion, loop, {});
        this.setBounds(0, 0, 480, 40);
        this.init();
    }
    var __egretProto__ = mc_touch.prototype;
    __egretProto__.init = function () {
        this.instance_171 = new gr_touch_line("synched", 0);
        this.instance_171.setTransform(-379.9, 0.5, 1, 1, 0, 0, 0, 0, 0.5);
        this.instance_172 = new gr_touch_line("synched", 0);
        this.instance_172.setTransform(380, 40.5, 1, 1, 0, 0, 0, 0, 0.5);
        this.instance_173 = new gr_touch_arr("synched", 0);
        this.instance_173.setTransform(332, 21.2, 1, 1, 0, 0, 180, 8, 11.2);
        this.instance_174 = new gr_touch_arr("synched", 0);
        this.instance_174.setTransform(149, 21.2, 1, 1, 0, 0, 0, 8, 11.2);
        this.instance_175 = new gr_touch_mozi_h("synched", 0);
        this.instance_175.setTransform(291, 20.5, 1, 1, 0, 0, 0, 13, 11.5);
        this.instance_176 = new gr_touch_mozi_c("synched", 0);
        this.instance_176.setTransform(267.5, 21, 1, 1, 0, 0, 0, 11.5, 12);
        this.instance_177 = new gr_touch_mozi_u("synched", 0);
        this.instance_177.setTransform(240, 20.5, 1, 1, 0, 0, 0, 12, 11.5);
        this.instance_178 = new gr_touch_mozi_o("synched", 0);
        this.instance_178.setTransform(213.5, 21, 1, 1, 0, 0, 0, 12.5, 12);
        this.instance_179 = new gr_touch_mozi_t("synched", 0);
        this.instance_179.setTransform(189, 21, 1, 1, 0, 0, 0, 12, 12);
        this.instance_180 = new gr_touch_base("synched", 0);
        this.addChild(this.instance_180);
        this.addChild(this.instance_179);
        this.addChild(this.instance_178);
        this.addChild(this.instance_177);
        this.addChild(this.instance_176);
        this.addChild(this.instance_175);
        this.addChild(this.instance_174);
        this.addChild(this.instance_173);
        this.addChild(this.instance_172);
        this.addChild(this.instance_171);
    };
    return mc_touch;
})(createjs.MovieClip);
mc_touch.prototype.__class__ = "mc_touch";
var gr_touch_line = (function (_super) {
    __extends(gr_touch_line, _super);
    function gr_touch_line(mode, startPostion) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        _super.call(this);
        this.setBounds(0, 0, 480, 1);
        this.init();
    }
    var __egretProto__ = gr_touch_line.prototype;
    __egretProto__.init = function () {
        this.shape_35 = new createjs.Shape();
        this.shape_35.graphics.lf(["rgba(255,255,255,0)", "rgba(255,255,255,0.749)", "#FFFFFF", "rgba(255,255,255,0.749)", "rgba(255,255,255,0)"], [0, 0.251, 0.498, 0.749, 1], -239.9, 0, 240, 0).s().p("EAlgAAFMhK/AAAIAAgJMBK/AAAIAAAJ").cp();
        this.shape_35.setTransform(240, 0.5);
        this.addChild(this.shape_35);
    };
    return gr_touch_line;
})(createjs.Sprite);
gr_touch_line.prototype.__class__ = "gr_touch_line";
var gr_touch_base = (function (_super) {
    __extends(gr_touch_base, _super);
    function gr_touch_base(mode, startPostion) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        _super.call(this);
        this.setBounds(0, 0, 480, 40);
        this.init();
    }
    var __egretProto__ = gr_touch_base.prototype;
    __egretProto__.init = function () {
        this.shape_36 = new createjs.Shape();
        this.shape_36.graphics.lf(["rgba(255,0,0,0.4)", "rgba(255,0,0,0.698)", "rgba(255,0,0,0.898)", "rgba(255,0,0,0.698)", "rgba(255,0,0,0.4)"], [0, 0.2, 0.498, 0.8, 1], -239.9, 0, 240, 0).s().p("EAlgADIMhK/AAAIAAmPMBK/AAAIAAGP").cp();
        this.shape_36.setTransform(240, 20);
        this.addChild(this.shape_36);
    };
    return gr_touch_base;
})(createjs.Sprite);
gr_touch_base.prototype.__class__ = "gr_touch_base";
var gr_touch_arr = (function (_super) {
    __extends(gr_touch_arr, _super);
    function gr_touch_arr(mode, startPostion) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        _super.call(this);
        this.setBounds(0, 0, 16, 22.4);
        this.init();
    }
    var __egretProto__ = gr_touch_arr.prototype;
    __egretProto__.init = function () {
        this.shape_37 = new createjs.Shape();
        this.shape_37.graphics.f("#F39800").s().p("AAghvIhvBvIBvBwIAAg4Ig4g4IA4g3IAAg4AAOAAIBCBBIAAiAIhCA/").cp();
        this.shape_37.setTransform(8, 11.2);
        this.addChild(this.shape_37);
    };
    return gr_touch_arr;
})(createjs.Sprite);
gr_touch_arr.prototype.__class__ = "gr_touch_arr";
var gr_touch_mozi_u = (function (_super) {
    __extends(gr_touch_mozi_u, _super);
    function gr_touch_mozi_u(mode, startPostion) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        _super.call(this);
        this.setBounds(0, 0, 23.5, 23.9);
        this.init();
    }
    var __egretProto__ = gr_touch_mozi_u.prototype;
    __egretProto__.init = function () {
        this.shape_30 = new createjs.Shape();
        this.shape_30.graphics.f("#FFFFFF").s().p("ABXBGIAeiuIhDgLIAOCvIh2gEIgKiuIg0DOIA8AfICPgx").cp();
        this.shape_30.setTransform(11.7, 11.9);
        this.addChild(this.shape_30);
    };
    return gr_touch_mozi_u;
})(createjs.Sprite);
gr_touch_mozi_u.prototype.__class__ = "gr_touch_mozi_u";
var gr_touch_mozi_t = (function (_super) {
    __extends(gr_touch_mozi_t, _super);
    function gr_touch_mozi_t(mode, startPostion) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        _super.call(this);
        this.setBounds(0, 0, 24.9, 24);
        this.init();
    }
    var __egretProto__ = gr_touch_mozi_t.prototype;
    __egretProto__.init = function () {
        this.shape_31 = new createjs.Shape();
        this.shape_31.graphics.f("#FFFFFF").s().p("AgLhLICHgOIjegeIgZA0IBpgJIgcDEIBDgIIggi7").cp();
        this.shape_31.setTransform(12.4, 12);
        this.addChild(this.shape_31);
    };
    return gr_touch_mozi_t;
})(createjs.Sprite);
gr_touch_mozi_t.prototype.__class__ = "gr_touch_mozi_t";
var gr_touch_mozi_o = (function (_super) {
    __extends(gr_touch_mozi_o, _super);
    function gr_touch_mozi_o(mode, startPostion) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        _super.call(this);
        this.setBounds(0, 0, 22.9, 24.9);
        this.init();
    }
    var __egretProto__ = gr_touch_mozi_o.prototype;
    __egretProto__.init = function () {
        this.shape_32 = new createjs.Shape();
        this.shape_32.graphics.f("#FFFFFF").s().p("AByguIiBhNIAMAQIhuBVIAABJICEBJIgMgRIBqhYIABhBAABhiIBGBXIhHBuIhGhWIBHhv").cp();
        this.shape_32.setTransform(11.5, 12.4);
        this.addChild(this.shape_32);
    };
    return gr_touch_mozi_o;
})(createjs.Sprite);
gr_touch_mozi_o.prototype.__class__ = "gr_touch_mozi_o";
var gr_touch_mozi_h = (function (_super) {
    __extends(gr_touch_mozi_h, _super);
    function gr_touch_mozi_h(mode, startPostion) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        _super.call(this);
        this.setBounds(0, 0, 24.2, 23.2);
        this.init();
    }
    var __egretProto__ = gr_touch_mozi_h.prototype;
    __egretProto__.init = function () {
        this.shape_33 = new createjs.Shape();
        this.shape_33.graphics.f("#FFFFFF").s().p("ABbhzIgWBzIgSgqIhjAgIAehVIhKgQIADBsIgfANIAfACIACBjIAfhhIB1AJIgJBdIBFgEIgejj").cp();
        this.shape_33.setTransform(12.1, 11.6);
        this.addChild(this.shape_33);
    };
    return gr_touch_mozi_h;
})(createjs.Sprite);
gr_touch_mozi_h.prototype.__class__ = "gr_touch_mozi_h";
var gr_touch_mozi_c = (function (_super) {
    __extends(gr_touch_mozi_c, _super);
    function gr_touch_mozi_c(mode, startPostion) {
        if (mode === void 0) { mode = null; }
        if (startPostion === void 0) { startPostion = 0; }
        _super.call(this);
        this.setBounds(0, 0, 21.2, 23);
        this.init();
    }
    var __egretProto__ = gr_touch_mozi_c.prototype;
    __egretProto__.init = function () {
        this.shape_34 = new createjs.Shape();
        this.shape_34.graphics.f("#FFFFFF").s().p("AgfALICCh9IjMBRIAJBMIDKBIIiJho").cp();
        this.shape_34.setTransform(10.6, 11.5);
        this.addChild(this.shape_34);
    };
    return gr_touch_mozi_c;
})(createjs.Sprite);
gr_touch_mozi_c.prototype.__class__ = "gr_touch_mozi_c";
