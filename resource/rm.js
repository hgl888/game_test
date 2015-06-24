var fs = require("fs");
var path = require("path");

var dir = path.join(__dirname, "dynamic");
var files = fs.readdirSync(dir);
for(var i = 0; i < files.length; ++i){
    var file = files[i];
    var extname = path.extname(file);
    if(extname && extname.toLowerCase() == ".exportjson"){
        var basename = path.basename(file, extname);
        fs.unlinkSync(path.join(dir, file));
        fs.unlinkSync(path.join(dir, basename+".png"));
        fs.unlinkSync(path.join(dir, basename+".plist"));
    }
}