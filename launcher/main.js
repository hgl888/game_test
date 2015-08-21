

var LOGI = console.info;
var LOGD = console.debug;
var LOGW = console.warn;
var LOGE = console.error;

LOGI("main.js");
egret_native.loglevel = "all"; //["all"(default), "debug", "info", "warn", "error", "off"]

// global vars
var DEG2ARC = Math.PI / 180.0; // usage: degreeValue * DEG2ARC -> arcValue (0~360 deg -> 0~2*PI)

(function(Egret) { // egret_native
	Egret.egtMain = function() {
		LOGI("Log Info");
		LOGD("Log Debug");
		LOGW("Log Warn");
		LOGE("Log Error");

		LOGI("********************************");
		LOGI("* Launch mode: " + Egret.engine_name());
		LOGI("*     Version: " + Egret.getVersion());
		LOGI("********************************");
	};
	Egret.executeMainLoop(function(advancedTime) {
		// TODO: clear screen first!
		// TODO: do test logic here.
	}, this);

	Egret.resumeApp = function() {
		console.log("I'm resumed.");
	};

	Egret.pauseApp = function() {
		console.log("I'm about to be paused!");
	};

})(egret || egret_native);
