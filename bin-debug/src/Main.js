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
    }
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
        var sky = this.createBitmapByName("bgImage");
        this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        //var topMask = new egret.Shape();
        //topMask.graphics.beginFill(0x000000, 0.5);
        //topMask.graphics.drawRect(0, 0, stageW, stageH);
        //topMask.graphics.endFill();
        //topMask.width = stageW;
        //topMask.height = stageH;
        //this.addChild(topMask);
        //var g = new CreateJSGraphics();
        //g.x = g.y = 180;
        //g.graphics.beginFill("#ff0000");
        //g.graphics.drawRect(0, 0, 100, 100);
        //g.graphics.endFill();
        //this.addChild(g);
        //var shape_38 = new CreateJSGraphics();
        //shape_38.graphics.beginLinearGradientFill(["#00FFEE", "#00AAFF"], [0.494, 1], -28.6, 0, 28.8, 0).beginStroke().moveTo(28.7, -44.7).lineTo(28.7, 44.7).lineTo(-28.7, -0).closePath();
        //shape_38.setTransform(100 + 27.6, 100);
        //
        //var shape_39 = new CreateJSGraphics();
        //shape_39.graphics.beginLinearGradientFill(["#00FFEE", "rgba(0,182,255,0.498)"], [0.494, 1], -40.5, 0, 40.6, 0).beginStroke().moveTo(40.6, -63.2).lineTo(40.6, -33.4).lineTo(-2.3, -0).lineTo(40.6, 33.4).lineTo(40.6, 63.2).lineTo(-40.6, -0).closePath();
        //shape_39.setTransform(100 - 13.6, 100);
        //
        //this.addChild(shape_39);
        //this.addChild(shape_38);
        var shape_8 = new CreateJSGraphics();
        //shape_8.graphics.beginStroke( "#ff00ff");
        //shape_8.graphics.setStrokeStyle( 1 );
        shape_8.graphics.beginFill("#ff0000");
        shape_8.graphics.moveTo(53.5, -102.5);
        shape_8.graphics.curveTo(19.2, -84.3, -13.5, -72.5);
        shape_8.graphics.curveTo(-9.3, -69.6, -0.9, -66.6);
        shape_8.graphics.curveTo(9.7, -62.9, 12.5, -61.5);
        shape_8.graphics.curveTo(7.2, -57.7, -3.9, -55.4);
        shape_8.graphics.curveTo(-16.6, -53.1, -22.5, -51.5).curveTo(-23.7, -45.2, -21.1, -40.9).curveTo(-21, -40.8, -15.5, -34.5).curveTo(-16.2, -33.3, -18.2, -32.8);
        shape_8.graphics.curveTo(-20.8, -32.3, -22, -32).curveTo(-26.6, -31.1, -25.5, -26.5).curveTo(-15, -30.8, 1.1, -41.7);
        shape_8.graphics.curveTo(10, -47.7, 27.5, -59.5).curveTo(24.5, -49.7, 14.3, -34.5).curveTo(1.3, -15, -1.5, -9.5).curveTo(8.5, -11.6, 28.7, -18.6).curveTo(50.6, -26.1, 60.5, -28.5).curveTo(54, -21.8, 41.1, -10.4).curveTo(27.2, 1.7, 21.5, 7.5);
        shape_8.graphics.curveTo(34.7, 19.1, 57.9, 27.6);
        shape_8.graphics.curveTo(69.5, 31.9, 101.5, 40.5).curveTo(112.7, 33.7, 122.5, 24.5).curveTo(126.7, 25.3, 130, 29.5).curveTo(135.3, 36.3, 135.5, 36.5).curveTo(132.5, 40.6, 126.3, 45.8).curveTo(118.5, 52.4, 116.5, 54.5).curveTo(108.8, 55, 96.2, 53.6).curveTo(81.8, 51.8, 74.7, 51.1).curveTo(48.8, 48.6, 38.5, 56.5).curveTo(56.8, 53.6, 77.6, 59.4).curveTo(79.5, 59.9, 95.1, 64.7).curveTo(105.8, 68, 113.5, 69.5).curveTo(118.2, 80.7, 118.1, 92.5).curveTo(118.1, 99.6, 116.5, 115.5).curveTo(115.2, 114.5, 113.7, 110.8).curveTo(112.3, 107.3, 110.5, 106.5).curveTo(108.3, 106.7, 107.9, 110.4).curveTo(107.3, 114.7, 106.5, 115.5).curveTo(104.5, 113.9, 103.6, 109.8).curveTo(102.9, 104.9, 102.5, 102.5).curveTo(106.5, 103.3, 109.4, 100.8).curveTo(113, 97.8, 114.5, 97.5).curveTo(112.3, 89.4, 110.5, 75.5).curveTo(84.4, 66.5, 69.6, 64);
        shape_8.graphics.curveTo(45.1, 59.8, 23.5, 65.5).curveTo(25.1, 68.3, 30.4, 71.6).curveTo(35.8, 74.9, 37.5, 77.5).curveTo(32.7, 82.3, 23.7, 86.3).curveTo(23.3, 86.4, 7.5, 92.5).curveTo(-10, 99.1, -17.6, 101).curveTo(-32.6, 104.6, -49.5, 103.5).curveTo(-50.4, 105, -50.9, 108.1).curveTo(-51.1, 109.8, -51.5, 113.5).curveTo(-52, 110.2, -54.4, 107.6).curveTo(-56.7, 105, -59.3, 104.4).curveTo(-62.1, 103.7, -63.8, 105.8).curveTo(-65.7, 108.1, -65.5, 113.5).curveTo(-69.9, 109.8, -69.5, 98.5).curveTo(-62.3, 96.8, -47.4, 97.6).curveTo(-31.4, 98.5, -24.5, 97.5).curveTo(-13.7, 95.9, 2.4, 88.3).curveTo(22.7, 78.7, 26.5, 77.5).curveTo(25.7, 75.6, 22.9, 74.1).curveTo(19.3, 72.3, 18.5, 71.5).curveTo(10.2, 76.6, -7.2, 74.4).curveTo(-27, 70.9, -35.5, 70.5).curveTo(-40, 66, -44.3, 58.8).curveTo(-46.3, 55.6, -51.5, 45.5).curveTo(-57, 49.7, -63.8, 60.1)
        shape_8.graphics.curveTo(-71.4, 71.6, -75.5, 75.5).curveTo(-82.2, 75.4, -88, 72.5).curveTo(-90.7, 71.2, -97.5, 66.5).curveTo(-104.8, 71.4, -116.2, 80.8).curveTo(-129.5, 91.8, -134.5, 95.5).curveTo(-143, 92.9, -152.2, 88.7).curveTo(-158.9, 85.6, -168.5, 80.5).curveTo(-169.6, 81.1, -172.1, 86).curveTo(-174.1, 89.8, -176.5, 88.5).curveTo(-177.4, 73.4, -180.5, 44.5).curveTo(-177.8, 43.2, -171.6, 43.4).curveTo(-162.9, 43.6, -161.5, 43.5).curveTo(-160, 40.7, -159.6, 33.9).curveTo(-159.1, 25.8, -158.5, 23.5).curveTo(-155.8, 23.5, -153.1, 25.1).curveTo(-149.3, 27.2, -148.5, 27.5).curveTo(-147.7, 19.9, -147.3, 16.1).curveTo(-146.6, 9.7, -145.5, 5.5).curveTo(-141.1, 6.2, -136.7, 8.7);
        shape_8.graphics.curveTo(-134.2, 10.2, -129.5, 13.5);
        shape_8.graphics.curveTo(-123.2, 8.8, -115.8, -1.8).curveTo(-106.6, -15.1, -103.5, -18.5).curveTo(-101.5, -13.8, -102.2, -2.1).curveTo(-103, 12.6, -102.5, 17.5).curveTo(-100.8, 15.5, -91.5, 8.7).curveTo(-83.5, 2.9, -80.5, -2.5).curveTo(-77.5, -7.9, -75.7, -19.8).curveTo(-73.6, -33.2, -71.5, -38.5).curveTo(-84.5, -43.4, -106.6, -49.9).curveTo(-135.7, -58.3, -142.5, -60.5).curveTo(-133.1, -66.3, -117.9, -70.6);
        shape_8.graphics.curveTo(-109.2, -73, -91.5, -77.5).curveTo(-59.2, -86.9, -10.6, -97.5).curveTo(17.2, -103.6, 73.5, -115.5).curveTo(70.7, -111.3, 64.4, -107.9).curveTo(56.9, -104.3, 53.5, -102.5);
        shape_8.graphics.closePath();
        shape_8.graphics.moveTo(42.5, -103.5).curveTo(-15.1, -90.8, -43.5, -84.1).curveTo(-92.8, -72.3, -125.5, -60.5).curveTo(-118.7, -58.3, -108.2, -55.5).curveTo(-102.3, -54, -90.5, -50.9).curveTo(-69.5, -45.2, -58.5, -38.5).curveTo(-58.5, -38.3, -61.3, -20.6).curveTo(-63.1, -9.5, -61.5, -2.5).curveTo(-54, -5.4, -39.5, -7.5).curveTo(-42.1, -13.3, -43.2, -15.3).curveTo(-45.3, -19.6, -47.5, -22.5).curveTo(-47.7, -21.5, -49.3, -18.3).curveTo(-50.4, -15.8, -50.5, -13.5).curveTo(-45.7, -13.9, -44.5, -11.5).curveTo(-45.8, -8.8, -51.1, -7.7).curveTo(-56.6, -6.5, -58.5, -9.5).curveTo(-54.8, -23.8, -48.5, -31.5).curveTo(-45.3, -33, -36.9, -34.4).curveTo(-28.7, -35.8, -25.5, -37.5).curveTo(-26.9, -38.8, -34.4, -44.6).curveTo(-40, -48.8, -42.5, -52.5).curveTo(-37.1, -54.5, -22.2, -57.2).curveTo(-8.6, -59.6, -2.5, -62.5).curveTo(-12.7, -64.3, -24.5, -70.5).curveTo(-13.6, -77.4, 8.7, -87.3).curveTo(32.9, -97.9, 42.5, -103.5).closePath();
        shape_8.graphics.moveTo(133.5, -14.5).curveTo(142.9, -14, 149.5, -10.5).curveTo(148.4, -7.8, 145.3, -5.7).curveTo(141.4, -3.6, 139.5, -2.5).curveTo(136.8, -3.5, 135.5, -7.5).curveTo(134.4, -12.4, 133.5, -14.5).closePath();
        shape_8.graphics.moveTo(115.5, -1.5).curveTo(123.8, -1.2, 134.5, 1.5).curveTo(131.5, 7.9, 129.8, 10.8).curveTo(126.8, 15.9, 122.5, 17.5).curveTo(121.9, 13.9, 118.9, 8.1).curveTo(115.9, 2.5, 115.5, -1.5).closePath();
        shape_8.graphics.moveTo(149.1, 10.4).curveTo(153.9, 15.2, 155.5, 20.5).curveTo(151.1, 23.1, 144.8, 18.6).curveTo(138, 12.6, 135.5, 10.5).curveTo(135.9, 8.5, 137.8, 6.3).curveTo(140, 3.8, 140.5, 2.5).curveTo(143.2, 5.2, 149.1, 10.4).closePath();
        shape_8.graphics.moveTo(15.5, 5.5).curveTo(17.4, 5.3, 21.5, 0.4).curveTo(27.2, -6.3, 27.5, -6.5).curveTo(27.5, -6.6, 34.9, -11.9).curveTo(38.4, -14.4, 37.5, -16.5).curveTo(31.8, -14.2, 18.4, -10.1).curveTo(5.6, -6.3, -0.5, -3.5).curveTo(3.3, -3.3, 7.8, 1.4).curveTo(12.1, 5.8, 15.5, 5.5).closePath();
        shape_8.graphics.moveTo(2.8, -26.9).curveTo(10, -37.7, 12.5, -43.5).curveTo(1.6, -35.7, -5.3, -31.3).curveTo(-15.3, -24.9, -24.5, -20.5).curveTo(-22.4, -16.8, -17.5, -14).curveTo(-16.3, -13.3, -8.5, -9.5).curveTo(-6.7, -12.6, 2.8, -26.9).closePath();
        shape_8.graphics.moveTo(30.3, 50.3).curveTo(26.9, 55.8, 22.5, 58.5).curveTo(22.1, 58.1, 16, 53.5).curveTo(12, 50.5, 11.5, 46.5).curveTo(13.1, 45.9, 16.2, 44.7).curveTo(19, 43.6, 21.5, 43.5).curveTo(21.5, 44.5, 19.3, 47.4).curveTo(18, 49, 21.5, 49.5).curveTo(23.6, 50.9, 25.8, 47.5).curveTo(27.4, 45.1, 28.5, 41.5).curveTo(21.6, 39.7, 18.2, 38.8).curveTo(12.1, 37.1, 7.5, 36.5).curveTo(7.4, 39, 6.3, 45.3).curveTo(5.3, 50.6, 5.5, 54.5).curveTo(7.3, 55.4, 12.3, 58.7).curveTo(16.4, 61.4, 19.5, 62.5).curveTo(26.6, 57.3, 44.5, 45.5).curveTo(60.7, 45, 79.6, 46.4).curveTo(88.5, 47.1, 112.5, 49.5).curveTo(112.6, 48.7, 120.8, 43.1).curveTo(128.6, 37.7, 128.5, 35.5).curveTo(128, 29.1, 116.7, 36.4).curveTo(104.8, 45.3, 103.5, 45.5).curveTo(99.4, 46.1, 91.2, 43.8).curveTo(81.8, 40.7, 77.5, 39.5).curveTo(51.4, 32, 14.1, 10.9).curveTo(-5.3, -0.3, -14.3, -5.4).curveTo(-29.8, -14.2, -39.5, -18.5).curveTo(-38.2, -16.1, -35, -12).curveTo(-32.4, -8, -32.5, -3.5).curveTo(-39.5, -2.8, -49.8, -0.3).curveTo(-62.4, 2.8, -66.5, 3.5).curveTo(-68, 3.7, -68.3, 1.8).curveTo(-68.6, -0.4, -69.5, -0.5).curveTo(-68.5, 7.5, -63.3, 17.2).curveTo(-61.4, 20.9, -53.5, 33.5).curveTo(-42.4, 51.2, -32.5, 65.5).curveTo(-27.8, 65.2, -20.5, 66.4).curveTo(-16.3, 67.1, -8, 68.8).curveTo(7, 71.3, 12.5, 66.5).curveTo(11.7, 65.8, 5.4, 62.1).curveTo(0.9, 59.5, -0.5, 56.5).curveTo(-0.1, 54.9, 1.4, 42.4).curveTo(2.4, 33.7, 5.5, 30.5).curveTo(7.6, 31.2, 21.2, 34.3).curveTo(30.8, 36.5, 35.5, 39.5).curveTo(32.2, 47, 30.3, 50.3).closePath();
        shape_8.graphics.moveTo(149.5, 26.5).curveTo(149.1, 29.2, 147.3, 31.3).curveTo(146.2, 32.5, 143.5, 34.5).curveTo(139.1, 33, 134.7, 29.2).curveTo(130, 24.7, 127.5, 22.5).curveTo(130.5, 16.2, 137.4, 20).curveTo(139.4, 21, 143.4, 23.7).curveTo(147.1, 26, 149.5, 26.5).closePath();
        shape_8.graphics.moveTo(162, -14).curveTo(165.6, -15.5, 167.5, -16.5).curveTo(170.3, -15.5, 169.6, -10.3).curveTo(169.2, -7.5, 168.5, -2.5).curveTo(164, -4, 161.3, -5.9).curveTo(158, -8.2, 156.5, -11.5).curveTo(158.1, -12.4, 162, -14).closePath();
        shape_8.graphics.moveTo(161.5, 12.5).curveTo(157.4, 11.7, 153.3, 6.7).curveTo(148.9, 1.5, 145.5, 0.5).curveTo(148.7, -7.4, 155.6, -4).curveTo(159.5, -2, 165.5, 4.5).curveTo(165.4, 6.6, 163.7, 8.7).curveTo(161.8, 11.2, 161.5, 12.5).closePath();
        shape_8.graphics.moveTo(176, 10.5).curveTo(177.8, 13, 180.5, 17.5).lineTo(165.5, 17.5).curveTo(167.4, 9.5, 170.5, 4.5).curveTo(173.3, 6.8, 176, 10.5).closePath();
        shape_8.graphics.moveTo(166.4, 29.1).curveTo(170, 35.7, 172.5, 37.5).curveTo(168.5, 39.2, 161.2, 38).curveTo(151.6, 36.4, 149.5, 36.5).curveTo(149.2, 33.7, 153.5, 29.3).curveTo(158.6, 24.1, 159.5, 21.5).curveTo(163.1, 23, 166.4, 29.1).closePath();
        shape_8.graphics.moveTo(-26.5, -50.5).curveTo(-28.8, -50.7, -29.9, -50.4).curveTo(-31.4, -50, -31.5, -48.5).curveTo(-31, -48.4, -29.5, -47).curveTo(-28.3, -46, -26.5, -46.5).closePath();
        shape_8.graphics.moveTo(-65.9, -38.1).curveTo(-66.6, -38.7, -67.5, -38.5).curveTo(-67.6, -33.2, -70.2, -23).curveTo(-72.6, -13.3, -72.5, -9.5).curveTo(-67.8, -10, -66.5, -20.3).curveTo(-65.7, -32.9, -64.5, -37.5).curveTo(-65, -37.5, -65.9, -38.1).closePath();
        shape_8.graphics.moveTo(-75.5, 6.5).curveTo(-76.2, 9.1, -79.1, 17.9).curveTo(-81.3, 24.9, -82.5, 29.5).curveTo(-79.5, 29.1, -79, 29.1).curveTo(-78.5, 29.1, -75.5, 29.5).curveTo(-74.9, 26.7, -72.1, 23.3).curveTo(-69.2, 19.8, -68.5, 17.5).curveTo(-70, 16.2, -71.8, 11.8).curveTo(-73.5, 7.7, -75.5, 6.5).closePath();
        shape_8.graphics.moveTo(-29.4, -27.7).curveTo(-28.9, -30.7, -30.5, -31.5).curveTo(-31.5, -30.4, -35.5, -30).curveTo(-39.4, -29.6, -40.5, -28.5).curveTo(-38.8, -27.9, -35.5, -25.9).curveTo(-32.5, -24.1, -30.5, -23.5).curveTo(-29.7, -26.1, -29.4, -27.7).closePath();
        shape_8.graphics.moveTo(-142.5, 11.5).curveTo(-142, 14.9, -143.2, 24).curveTo(-144.2, 31.5, -142.5, 35.5).curveTo(-141.2, 32.5, -136.7, 26.8).curveTo(-132.6, 21.6, -131.5, 17.5).curveTo(-133.6, 16.8, -136.9, 14.4).curveTo(-140.2, 12.1, -142.5, 11.5).closePath();
        shape_8.graphics.moveTo(-108.5, -5.5).curveTo(-110.6, -0.8, -115, 4.9).curveTo(-117.5, 8.1, -122.5, 14.5).curveTo(-131, 26.4, -130.5, 40.5).curveTo(-137.8, 39.2, -142, 42.5).curveTo(-144.6, 44.5, -147.5, 50.5).curveTo(-144.6, 49.7, -139.5, 47.5).curveTo(-134.4, 45.3, -131.5, 44.5).curveTo(-130, 45.6, -128.4, 48.9).curveTo(-126.6, 52.4, -125.5, 53.5).curveTo(-124.7, 52.7, -121.8, 46.6).curveTo(-119.7, 42.3, -116.5, 41.5).curveTo(-111.2, 43.6, -102.4, 47.9).curveTo(-92.6, 52.7, -88.5, 54.5).curveTo(-87.2, 52.4, -80.6, 43.8).curveTo(-75.7, 37.4, -73.5, 32.5).curveTo(-78.4, 33.9, -81.4, 34.4).curveTo(-86.7, 35.2, -89.5, 33.5).curveTo(-84.1, 16.9, -81.5, 6.5).curveTo(-86.1, 9, -93.7, 17.2).curveTo(-100.9, 25, -106.5, 27.5).curveTo(-107.9, 23.1, -107.5, 11).curveTo(-107, -1.1, -108.5, -5.5).closePath();
        shape_8.graphics.moveTo(-132.5, 50.5).curveTo(-157.2, 56.5, -165.5, 76.5).curveTo(-161.2, 75.8, -150.9, 75.6).curveTo(-141, 75.3, -136.5, 74.5).curveTo(-136.6, 73.9, -138.7, 65.9).curveTo(-140.1, 60.5, -139.5, 58.5).curveTo(-139.4, 58.5, -133.4, 58.4).curveTo(-129.8, 58.4, -128.5, 59.5).curveTo(-128.4, 56.8, -129.9, 54.4).curveTo(-131.7, 51.9, -132.5, 50.5).closePath();
        shape_8.graphics.moveTo(-117.5, 58.5).curveTo(-118.9, 58.6, -118.5, 55.5).curveTo(-118.1, 52.4, -119.5, 52.5).curveTo(-119.5, 54.1, -121.1, 55.9).curveTo(-122.6, 57.6, -122.5, 59.5).curveTo(-122.1, 59.4, -119.4, 59.6).curveTo(-117.4, 59.7, -117.5, 58.5).closePath();
        shape_8.graphics.moveTo(-113.5, 65.5).curveTo(-122.1, 63.8, -123.6, 63.6).curveTo(-129.4, 62.6, -134.5, 62.5).curveTo(-134, 65.5, -132.5, 70.5).curveTo(-131, 75.9, -130.5, 78.5).curveTo(-134.1, 79.9, -142.8, 80.2).curveTo(-152.1, 80.5, -155.5, 81.5).curveTo(-152.1, 82.5, -145.1, 85.6).curveTo(-138.6, 88.5, -134.5, 89.5).curveTo(-132.9, 88.1, -114.6, 73.3).curveTo(-102.6, 63.6, -95.5, 56.5).curveTo(-98.3, 56.1, -105.2, 52).curveTo(-111, 48.6, -114.5, 49.5).curveTo(-113, 56.2, -112.8, 57.6).curveTo(-112.1, 63, -113.5, 65.5).closePath();
        shape_8.graphics.moveTo(-135.5, 34).curveTo(-136.8, 35, -136.5, 36.5).lineTo(-132.5, 36.5).curveTo(-132.9, 34.6, -133.1, 33.6).curveTo(-133.5, 32, -134.5, 31.5).curveTo(-134.1, 33, -135.5, 34).closePath();
        shape_8.graphics.moveTo(-148.5, 32.5).curveTo(-149.6, 32.3, -151.3, 30.8).curveTo(-152.9, 29.5, -154.5, 29.5).curveTo(-154.2, 32, -155, 35.9).curveTo(-155.9, 39.7, -155.5, 42.5).lineTo(-150.5, 42.5).curveTo(-149.7, 41, -149.3, 37.7).curveTo(-148.8, 33.6, -148.5, 32.5).closePath();
        shape_8.graphics.moveTo(-64.5, 28.5).curveTo(-68.8, 34.4, -75.8, 47.6).curveTo(-82.9, 58.6, -92.5, 61.5).curveTo(-87, 67.9, -76.5, 70.5).curveTo(-73.9, 64.9, -66.4, 55.1).curveTo(-59.1, 45.6, -56.5, 39.5).curveTo(-56.6, 39.3, -59.7, 33.2).curveTo(-61.6, 29.4, -64.5, 28.5).closePath();
        shape_8.setTransform(250, 300);
        this.addChild(shape_8);
  
  
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
