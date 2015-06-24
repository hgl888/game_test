var res;
(function (res) {
    var _recycler = [];
    function getURLLoader(dataFormat) {
        var loader = _recycler.pop();
        if (!loader) {
            loader = new egret.URLLoader();
        }
        else {
        }
        loader.dataFormat = dataFormat;
        return loader;
    }
    res.getURLLoader = getURLLoader;
})(res || (res = {}));
