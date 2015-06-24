/**
 * Created by 晋 on 2015/2/10.
 */
var createjs;
(function (createjs) {
    var MovieLib = (function () {
        function MovieLib() {
        }
        MovieLib.addMovie = function (id, dataSet) {
            MovieLib.map[id] = dataSet;
        };
        MovieLib.getData = function (id) {
            return MovieLib.map[id];
        };
        MovieLib.map = {};
        return MovieLib;
    })();
    createjs.MovieLib = MovieLib;
    MovieLib.prototype.__class__ = "createjs.MovieLib";
})(createjs || (createjs = {}));
