/**
 * h5_loader.js - HTML5 mode loader.
 * Created by Derek Leng (lengdakun@egret.com)
 * Copyright (c) 2015, Egret Technologies.
 */
console.log("h5_loader.js");

var require = function(url) {
	if (url.length > 0) {
		var s = document.createElement('script');
		s.src = url;
		document.body.appendChild(s);
	}
};

require("libs/lib-h5-support.js");
require("launcher/main.js");
