/**
 * Copyright (c) 2015, Egret Technologies.
 * All rights reserved.
 * 
 * lib-h5-support.js - HTML5 support library. This will create some configurations or class members for the tests.
 * 
 * Created by Derek Leng (lengdakun@egret.com)
 */
var egret; // = document.getElementById("egretCanvas");
(function(egret) {
	var requestAnimationFrame = window["requestAnimationFrame"]
			|| window["webkitRequestAnimationFrame"]
			|| window["mozRequestAnimationFrame"]
			|| window["oRequestAnimationFrame"]
			|| window["msRequestAnimationFrame"];
	if (!requestAnimationFrame) {
		requestAnimationFrame = function(callback) {
			return window.setTimeout(callback, 1000 / 60);
		};
	}
	var cxt = document.getElementById("egretCanvas");
	egret.engine_name = function() {
		return "HTML5";
	};
	egret.rastergl = cxt.getContext("2d");
	egret.getVersion = function() {
		return "HTML5 mode";
	};
	egret.setSearchPaths = function() {
	};
	egret.egtMain = function() {
	};
	egret.Graphics.clearScreen = function(r, g, b) {
		egret.Graphics.fillStyle = "#000028";
		egret.Graphics.fillRect(0, 0, 480, 800);
	};
	egret.Graphics.lineStyle = function(thickness, color) {
		egret.Graphics.fillStyle = "#ffffff"; // + color.toString;
	};

	egret.executeMainLoop = function(callback, thisObject) {
		//_tick++;
		//var now = Date.now();
		//_totalDeltaTime += now - time;
		//time = now;
		//if (_totalDeltaTime > _maxDeltaTime) {
		//	frameStr = Math.floor(_tick * 1000 / _totalDeltaTime).toString();
		//	_tick = 0;
		//	_totalDeltaTime = 0;
		//}
        //
		//ctx.fillStyle = "#000000";
		//ctx.fillRect(0, 0, width, height);
        //
		//var size = 40;
		//var fontFamily = "Arial";
		//var font = size + "px " + fontFamily;
		//ctx.font = font;
        //
		//ctx.fillStyle = "#00ff00";
        //
		//ctx.fillText(txt, 0, 100, 0xFFFF);
		//requestAnimationFrame(egret.executeMainLoop);
		callback(1);
	};
	egret.executeMainLoop();

	egret.setDesignSize = function() {
	};
	egret.setFrameRate = function() {
	};
})(egret || (egret = {}));
