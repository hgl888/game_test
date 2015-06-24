console.log("test_assetLoad.js");
var EgretTest;
(function test_assetLoad(egret) {
	var x = 20, y = 20;

	// define tests
	var tests = new Array();
	var textureIcon = null;
	var totalTimer = 0;
	var url = "http://wiki.corp.egret.com/static/egret_icon.png";

	tests.push({
		name : "load Image",
		test : function(advancedTime) {
			totalTimer += advancedTime;
			if (totalTimer>2000 || textureIcon == null) {
				// load image
				textureIcon = egret.download(url, url);
			} else if (totalTimer > 4000) {
				totalTimer = 0;
				textureIcon = null;
			} else {
				egret.Graphics.drawImage(textureIcon, 0, 0, 218, 295, x, y, 218, 295);
			}
		}
	});

	EgretTest = tests;
})(egret || (egret = {}));
