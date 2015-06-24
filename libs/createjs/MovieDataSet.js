/**
 * Created by 晋 on 2015/2/10.
 */
var createjs;
(function (createjs) {
    var MovieDataSet = (function () {
        function MovieDataSet() {
            this.id = "";
            this.res = "";
            this.assetMap = {};
            //不需要用后销毁的动画才设为false
            this.needDestroyRes = true;
            this.dynamicRes = new Array();
        }
        MovieDataSet.prototype.getMovie = function () {
            return null;
        };
        MovieDataSet.prototype.registerRes = function () {
            RES.parseConfig({ "resources": [{ "name": "movie_" + this.id, "type": "sheet", "url": this.res }], "groups": [{ "name": "movie_res_" + this.id, "keys": "movie_" + this.id }] }, "resource/");
        };
        MovieDataSet.prototype.dealDynamicRes = function () {
            if (this.data && this.data.dynamicImages) {
                for (var i in this.data.dynamicImages) {
                    if (this.data.dynamicImages[i].src.indexOf(".") == -1 && this.data.dynamicImages[i].src.indexOf("/") == -1) {
                        this.data.dynamicImages[i].src = "movie_" + this.id + "." + this.data.dynamicImages[i].src;
                    }
                    if (this.data.dynamicImages[i].destroy) {
                        this.dynamicRes.push(this.data.dynamicImages[i].src);
                    }
                    this.assetMap[this.data.dynamicImages[i].id] = this.data.dynamicImages[i].src;
                }
            }
        };
        MovieDataSet.prototype.getRes = function (id) {
            if (this.assetMap[id]) {
                return this.assetMap[id];
            }
            return "movie_" + this.id + "." + id;
        };
        MovieDataSet.prototype.init = function () {
            G.data = new createjs.BaseData();
        };
        MovieDataSet.prototype.newData = function (data) {
            this.data = data;
            G.data.newData(data);
        };
        MovieDataSet.prototype.loadRes = function (callBack) {
            this._callBack = callBack;
            this.dealDynamicRes();
            this.loadMainRes();
        };
        MovieDataSet.prototype.loadMainRes = function () {
            this.registerRes();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoad, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoad, this);
            if (!RES.getRes("movie_" + this.id)) {
                createjs.Flash.timer.doFrameOnce(5, RES.loadGroup, ["movie_res_" + this.id], RES);
            }
            else {
                createjs.Flash.timer.doFrameOnce(2, this._callBack);
            }
        };
        MovieDataSet.prototype.destroyRes = function (force) {
            if (force === void 0) { force = false; }
            this.destroyDynamicRes();
            if (this.needDestroyRes || force) {
                RES.destroyRes("movie_" + this.id);
            }
        };
        MovieDataSet.prototype.destroyDynamicRes = function () {
            if (this.dynamicRes.length) {
                for (var i = 0; i < this.dynamicRes.length; i++) {
                    RES.destroyRes(this.dynamicRes[i]);
                }
                this.dynamicRes.length = 0;
            }
        };
        MovieDataSet.prototype.onResourceLoad = function (e) {
            if (e.type == RES.ResourceEvent.GROUP_PROGRESS) {
                return;
            }
            if (e.type == RES.ResourceEvent.GROUP_COMPLETE && e.groupName == "movie_res_" + this.id) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoad, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoad, this);
                this._callBack();
                this._callBack = null;
            }
        };
        MovieDataSet.prototype.webTo = function (to) {
            if (to === void 0) { to = ''; }
            G.data.webTo(to);
        };
        return MovieDataSet;
    })();
    createjs.MovieDataSet = MovieDataSet;
    MovieDataSet.prototype.__class__ = "createjs.MovieDataSet";
})(createjs || (createjs = {}));
