

var LOGI = console.info;
var LOGD = console.debug;
var LOGW = console.warn;
var LOGE = console.error;

LOGI("main.js");
//egret_native.loglevel = "all"; //["all"(default), "debug", "info", "warn", "error", "off"]

// global vars
var DEG2ARC = Math.PI / 180.0; // usage: degreeValue * DEG2ARC -> arcValue (0~360 deg -> 0~2*PI)

(function(Egret) { // egret_native
	Egret.egtMain = function() {
		console.log("Egret.egtMain");
		this.canvas = new egret.canvas();
	};
	Egret.executeMainLoop = function(advancedTime) {
		// TODO: clear screen first!
		// TODO: do test logic here.
		console.log("Egret.executeMainLoop");
		this.canvas.beginPath();
		var grd = this.canvas.createLinearGradient( 0, 0, 170, 0 );
		grd.addColorStop( 0, "green");
		grd.addColorStop( 1, "red");
		this.canvas.setLineWidth( 10);
		this.canvas.moveTo( 20, 20 );
		this.canvas.lineTo( 200, 100);
		this.canvas.stroke();
	};

	Egret.resumeApp = function() {
		console.log("I'm resumed.");
	};

	Egret.pauseApp = function() {
		console.log("I'm about to be paused!");
	};

})(egret);
