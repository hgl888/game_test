/**
 * lib-runtime-support.js - Runtime support library. This will create some configurations or class members for the tests.
 * Created by Derek Leng (lengdakun@egret.com)
 * Copyright (c) 2015, Egret Technologies.
 */
var egret = egret_native;
(function(egret){
	egret.setSearchPaths([""]);
	egret.engine_name = function() { return "Native"; };
	egret.setSearchPaths = function() {};
})(egret);
