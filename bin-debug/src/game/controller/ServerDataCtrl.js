/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var ServerDataCtrl = (function (_super) {
        __extends(ServerDataCtrl, _super);
        function ServerDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = ServerDataCtrl.prototype;
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._myServerIds = [];
        };
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            var self = this;
        };
        __egretProto__.getAllServerList = function () {
            return this._data;
        };
        __egretProto__.getServerInfoById = function (id) {
            var self = this;
            var _data = self._data;
            var serverInfoIdConst = uw.dsConsts.ServerInfoEntity.id;
            for (var i = 0; i < _data.length; i++) {
                var d = _data[i];
                if (d[serverInfoIdConst] == id) {
                    return d;
                }
            }
        };
        __egretProto__.setMyServerIds = function (myServerIds) {
            this._myServerIds = myServerIds || [];
        };
        __egretProto__.getMyServerList = function () {
            return this._myServerList;
        };
        __egretProto__.updateMyServerList = function (cb) {
            var self = this;
            var argsObj = uw.iface.h_server_getServersByIds_args, args = {};
            args[argsObj.ids] = self._myServerIds;
            mo.requestWaiting(uw.iface.h_server_getServersByIds, args, function (data) {
                self._myServerList = data;
                cb();
            });
        };
        ServerDataCtrl.__className = "ServerDataCtrl";
        /**
         * 通过服务端进行数据初始化
         * @param cb
         * @param cbTarget
         */
        ServerDataCtrl.initByServer = function (cb, cbTarget) {
            if (!uw.serverDataCtrl) {
                uw.serverDataCtrl = uw.ServerDataCtrl.create();
                mo.request4Http(uw.iface.h_server_getServerList, {}, function (data) {
                    uw.serverDataCtrl.init(data);
                    cb.call(cbTarget);
                });
            }
            else {
                cb.call(cbTarget);
            }
        };
        return ServerDataCtrl;
    })(mo.DataController);
    uw.ServerDataCtrl = ServerDataCtrl;
    ServerDataCtrl.prototype.__class__ = "uw.ServerDataCtrl";
    uw.serverDataCtrl;
})(uw || (uw = {}));
