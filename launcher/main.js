/**
 * main.js - Main entry for the test framework. Created by Derek Leng
 * (lengdakun@egret.com) Copyright (c) 2015, Egret Technologies.
 */
console.log("main.js");
// require("libs/PromiseObject.js");
require("tests/test_rastergl.js");

// global vars
var DEG2ARC = Math.PI / 180;
var screenSize = {
	width : 1080 / 2,
	height : 1920 / 2
};

(function(egret) {

	egret.egtMain = function() {
		console.log("********************************");
		console.log("* Launch mode: " + egret.engine_name());
		console.log("*     Version: " + egret.getVersion());
		console.log("********************************");

		egret.setDesignSize(screenSize.width, screenSize.height);
		egret.Graphics.setTransform(1, 0, 0, 1, 0, 0);
		egret.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "");
		// var promise = new egret.PromiseObject();
		// var url = "http://wiki.corp.egret.com/static/egret_icon.png";
		// promise.onSuccessFunc = function() {
		// console.log("download texture: ok, verify: " +
		// egret.isFileExists(url));
		// textureIcon = egret.Texture.addTexture(url);
		// };
		// promise.onErrorFunc = function() {
		// console.log("download texture ERROR");
		// // textureIcon = null;
		// };
		// // textureIcon =
		// // egret.Texture.addTexture("resource/assets/egret_icon.png");
		// egret.download(url, url, promise);
	};

	var fps = new Array(10);
	var afps = 0;
	var cntT = 0;
	var test_id = 0;
	for ( var i = 0; i < 10; i++) {
		fps[i] = 0;
	}
	function showFPS(advancedTime) {
		fps.shift();
		fps[9] = Math.round(1000 / advancedTime);
		cntT += advancedTime;
		if (cntT > 500) {
			cntT = 0;
			afps = 0;
			for ( var i = 0; i < 10; i++)
				afps += fps[i];
			afps /= 10;
			afps = Math.round(afps * 10) / 10;
			// console.log("FPS: " + afps);
		}
		egret.Graphics.setGlobalAlpha(0.5);
		egret.Label.setTextColor(0xffffff);
		egret.Label.drawText("FPS:" + afps, 5, 13);
		egret.Graphics.setGlobalAlpha(1);
	}
	;

	function showLabel(x, y, msg) {
		egret.Graphics.setGlobalAlpha(0.5);
		egret.Label.setTextColor(0xffffff);
		egret.Label.drawText(msg, x, y);
		egret.Graphics.setGlobalAlpha(1);
	}

	console.log("Now loading: " + EgretTest[test_id].name);

	function glDrawBackground() {
		var size = 20;
		var gl = egret.rastergl;
		gl.beginPath();
		egret.Graphics.clearScreen(0, 0, 40);
		gl.strokeStyle = "#7FFF00FF";
		gl.lineWidth = 1;
		for ( var i = 0; i < screenSize.width; i += size) {
			gl.moveTo(i, 0);
			gl.lineTo(i, screenSize.height);
		}
		for ( var i = 0; i < screenSize.height; i += size) {
			gl.moveTo(0, i);
			gl.lineTo(screenSize.width, i);
		}
		gl.stroke();
		gl.beginPath();
	}
	;

	test_id = 2;
	egret.executeMainLoop(function(advancedTime) {
		glDrawBackground();
		EgretTest[test_id].test();
		showLabel(5, screenSize.height - 20, test_id + ": "
				+ EgretTest[test_id].name);
		showFPS(advancedTime);
	}, this);

	egret.onTouchesBegin = function() {
		// console.log("onTouchesBegin");
	};
	egret.onTouchesEnd = function() {
		// console.log("onTouchesEnd");
		test_id++;
		if (test_id >= EgretTest.length) {
			test_id = 0;
		}
		console.log("Now loading: " + EgretTest[test_id].name);
	};
	egret.onTouchesMove = function() {
		// console.log("onTouchesMove");
	};
	egret.onTouchesCancel = function() {
		// console.log("onTouchesCancel");
	};

})(egret);// || (egret = {}));
