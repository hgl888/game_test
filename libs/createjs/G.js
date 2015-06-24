/**
 * Created by 晋 on 2015/1/20.
 */
var G = (function () {
    function G() {
    }
    G.getId = function () {
        return G.uid++;
    };
    G.getRes = function (id) {
        if (G.dataSet) {
            id = G.dataSet.getRes(id);
            return RES.getRes(id);
        }
        return RES.getRes(id);
    };
    G.int = function (value) {
        return parseInt(value);
    };
    G.isPackageImage = function (img) {
        if (img.lastIndexOf('/')) {
            return false;
        }
        var index = img.lastIndexOf('.');
        if (index != -1) {
            var ext = img.substr(index + 1);
            if (G.images.indexOf(ext) != -1) {
                return false;
            }
        }
        return true;
    };
    G.showMovie = function (id, data, holder) {
        if (data === void 0) { data = null; }
        if (holder === void 0) { holder = null; }
        if (!holder)
            holder = G.movieHolder;
        G.holder = holder;
        //销毁之前的
        G.disposeNowMovie();
        if (G.movieId != id && G.dataSet) {
            G.dataSet.destroyRes();
        }
        G.dataSet = createjs.MovieLib.getData(id);
        if (!G.dataSet) {
            throw Error('this movie has no dataset! id=' + id);
            return;
        }
        G.movieId = id;
        G.showLoading(G.holder);
        G.dataSet.init();
        //TODO：跟服务器获取数据
        G.dataSet.newData(data);
        G.dataSet.loadRes(G.toShowMovie);
    };
    G.disposeNowMovie = function () {
        if (G.exportRoot && G.exportRoot != G.loading) {
            createjs.Flash.stopFlash();
            if (G.exportRoot.parent) {
                G.exportRoot.parent.removeChild(G.exportRoot);
            }
            G.exportRoot.dispose();
        }
    };
    G.hideMovie = function () {
        if (G.holder) {
            G.disposeNowMovie();
            if (G.dataSet)
                G.dataSet.destroyRes();
            if (G.holder.contains(G.headMask))
                G.holder.removeChild(G.headMask);
            if (G.holder.contains(G.footMask))
                G.holder.removeChild(G.footMask);
        }
    };
    G.showLoading = function (holder) {
        if (G.loading) {
            holder.addChild(G.loading);
            G.exportRoot = G.loading;
            createjs.Flash.startFlash(G.loading);
            G.loading.gotoAndPlay(0);
        }
    };
    G.hideLoading = function () {
        if (G.loading && G.loading.parent) {
            G.loading.parent.removeChild(G.loading);
        }
    };
    G.toShowMovie = function () {
        createjs.Flash.stopFlash();
        G.hideLoading();
        G.exportRoot = G.dataSet.getMovie();
        G.holder.addChild(G.exportRoot);
        G.holder.addChild(G.headMask);
        G.holder.addChild(G.footMask);
        createjs.Flash.startFlash(G.exportRoot);
    };
    G.webTo = function (to) {
        if (to === void 0) { to = ''; }
        if (G.dataSet) {
            G.dataSet.webTo(to);
        }
    };
    G.uid = 0;
    G.data = {};
    G.MOVIE_HEIGHT = 720;
    G.sound = { playSE: function (se) {
    } };
    G.images = ['jpg', 'png'];
    return G;
})();
G.prototype.__class__ = "G";
