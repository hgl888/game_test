/**
 * native_loader.js - Native mode loader.
 * Created by Derek Leng (lengdakun@egret.com)
 * Copyright (c) 2015, Egret Technologies.
 */
console.log("native_loader.js");
require("libs/lib-runtime-support.js");

(function(egret){
    egret.engine_name = function() { return "native"; };
})(egret || egret_native);

require("launcher/main.js");
