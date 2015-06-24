/**
 * Created by SmallAiTT on 2015/3/26.
 */
var netLogger;
(function (netLogger) {
    netLogger.log;
    netLogger.debug;
    netLogger.info;
    netLogger.warn;
    netLogger.error;
    logger.initLogger(netLogger, "netLogger");
    logger.setLvl("netLogger", 4);
})(netLogger || (netLogger = {}));
var mo;
(function (mo) {
    var _NetRequestInfo = (function () {
        function _NetRequestInfo() {
        }
        var __egretProto__ = _NetRequestInfo.prototype;
        return _NetRequestInfo;
    })();
    mo._NetRequestInfo = _NetRequestInfo;
    _NetRequestInfo.prototype.__class__ = "mo._NetRequestInfo";
    var _waitingView = { show: function () {
    }, close: function () {
    } };
    var _reccnView = { show: function (onOk) {
    } };
    var _kickView = { show: function (onOk) {
    } };
    var _recnnFailed = function () {
    };
    var _netErrorView = { show: function () {
    } };
    function registerWaiting(opt) {
        _net = opt.net || _net;
        _waitingView = opt.waitingView || _waitingView;
        _reccnView = opt.reccnView || _reccnView;
        _kickView = opt.kickView || _kickView;
        _recnnFailed = opt.recnnFailed || _recnnFailed;
        _netErrorView = opt.netErrorView || _netErrorView;
    }
    mo.registerWaiting = registerWaiting;
    mo._waitingPlayCount = 0;
    /**
     * 播放等待画面
     */
    function playWaiting() {
        mo._waitingPlayCount++;
        if (mo._waitingPlayCount != 1)
            return; //已经显示了
        process.nextTick(function () {
            if (mo._waitingPlayCount <= 0)
                return; //如果在这一时刻已经关闭了，就没必要在打开了
            _waitingView.show();
        });
    }
    mo.playWaiting = playWaiting;
    /**
     * 停止等待画面
     */
    function stopWaiting() {
        mo._waitingPlayCount--;
        if (mo._waitingPlayCount > 0)
            return; //还在显示
        if (mo._waitingPlayCount < 0) {
            mo._waitingPlayCount = 0;
        }
        _waitingView.close();
    }
    mo.stopWaiting = stopWaiting;
    /**
     * 强制停止等待画面
     */
    function stopWaitingForce() {
        mo._waitingPlayCount = 0;
        process.nextTick(function () {
            _waitingView.close();
        });
    }
    mo.stopWaitingForce = stopWaitingForce;
    /**
     * Net的事件。
     */
    var NetEvent = (function (_super) {
        __extends(NetEvent, _super);
        function NetEvent() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = NetEvent.prototype;
        return NetEvent;
    })(mo.Event);
    mo.NetEvent = NetEvent;
    NetEvent.prototype.__class__ = "mo.NetEvent";
    var Net = (function (_super) {
        __extends(Net, _super);
        function Net() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = Net.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self._requestIdCounter = 1;
            self._waitingRequestMap = {};
            self._connected = false; //还没进行连接
            self._waitingQueue = [];
            self._waitingReq4PomeloQueue = [];
            self._connectType = 0;
        };
        //进行服务器连接
        __egretProto__.connect = function (cb, playWaiting) {
            if (playWaiting === void 0) { playWaiting = true; }
            var self = this;
            if (self._connecting)
                return;
            self._connecting = true;
            if (playWaiting)
                mo.playWaiting(); //先播放等待
            var host = mo.getLocalStorageItem(self.key_host, true);
            var port = mo.getLocalStorageItem(self.key_port, true);
            self._initConnectEvents();
            netLogger.info("connect host【%s】:port【%s】", host, port);
            //重新请求
            pomelo.init({
                host: host,
                port: port,
                log: self.logServer,
                //                reconnect:true,
                maxReconnectAttempts: 20
            }, function () {
                self._kicked = false; //没有被踢出
                self._connecting = false; //连接完成
                self._connected = true; //已经连接
                self._connectType = 1; //设置成正常连接
                if (playWaiting)
                    mo.stopWaiting();
                cb();
                //执行之前等待执行的
                var queue = self._waitingReq4PomeloQueue;
                while (queue.length > 0) {
                    var func = queue.pop();
                    if (func)
                        func();
                }
            });
        };
        //断开连接
        __egretProto__.disconnect = function () {
            pomelo.disconnect();
        };
        //同步账户
        __egretProto__.asyncAccount = function (strUser, strPwd, cb, toPlayWaiting, toResetAsyncFlag) {
            if (toPlayWaiting === void 0) { toPlayWaiting = true; }
            if (toResetAsyncFlag === void 0) { toResetAsyncFlag = true; }
            //TODO 子类在此实现登录的请求
            this._reconnecting = false;
            if (toResetAsyncFlag)
                this._hasAsyncAccount = true;
            cb();
        };
        //重连
        __egretProto__._reconnect = function (requestInfo) {
            var self = this, queue = self._waitingQueue;
            if (requestInfo)
                queue.push(requestInfo); //如果有就推送进来
            if (self._reconnecting)
                return; //正在连接则直接返回
            self._reconnecting = true;
            var onCnnCucess = function () {
                netLogger.info("重连成功！");
                while (queue.length > 0) {
                    self._doRequest(queue.pop());
                }
            };
            var connectType = self._connectType;
            netLogger.info("connectType------>", connectType);
            if (connectType == 1) {
                self._connectType = 2; //设置成正在偷偷重连
                self.asyncAccount(null, null, onCnnCucess, false, false);
            }
            else if (connectType == 2) {
                //显示重连视图
                var reccnStartTime = Date.newDate();
                _reccnView.show(function () {
                    var now = Date.newDate();
                    netLogger.info(now.getTime(), reccnStartTime.getTime());
                    if (now.getTime() - reccnStartTime.getTime() > 10000) {
                        self.reset();
                        _recnnFailed();
                    }
                    else {
                        self._connectType = 3; //设置成正在等待手动重连
                        self.asyncAccount(null, null, onCnnCucess, true, false); //重连
                    }
                });
            }
            else if (connectType == 3) {
                //显示重连视图
                self._connecting = true;
                _reccnView.show(function () {
                    self.reset();
                    _recnnFailed();
                });
            }
        };
        //请求连接，不带waiting的方式
        __egretProto__.request = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = false;
            self._request(requestInfo);
        };
        //请求连接，带waiting的方式
        __egretProto__.requestWaiting = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = true;
            mo.playWaiting(); //先播放等待
            self._request(requestInfo);
        };
        //pomelo模式请求连接，不带waiting的方式，这种可以在没同步时就进行请求，是属于强制模式
        __egretProto__.request4Pomelo = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = false;
            self._request(requestInfo, true);
        };
        //pomelo模式请求连接，带waiting的方式，这种可以在没同步时就进行请求，是属于强制模式
        __egretProto__.requestWaiting4Pomelo = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = true;
            mo.playWaiting(); //先播放等待
            self._request(requestInfo, true);
        };
        //由于http可以直接请求，所以可以不需要连接就可以发送了，这个接口是为了处理不需要实时连接服务器用的
        __egretProto__.request4Http = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = false;
            delete self._waitingRequestMap[requestInfo.requestId];
            self._requestHttp(requestInfo);
        };
        //由于http可以直接请求，所以可以不需要连接就可以发送了，这个接口是为了处理不需要实时连接服务器用的
        __egretProto__.requestWaiting4Http = function (route, args, cb, ctx) {
            var self = this;
            var requestInfo = self._getRequestInfo.apply(self, arguments);
            requestInfo.toPlayWaiting = true;
            delete self._waitingRequestMap[requestInfo.requestId];
            mo.playWaiting(); //先播放等待
            self._requestHttp(requestInfo);
        };
        //获取请求信息
        __egretProto__._getRequestInfo = function (route, args, cb, target, option) {
            var self = this;
            var l = arguments.length;
            if (l < 2 || l > 6)
                throw "Arguments error for request!";
            var locArgs, locCb, locOption;
            for (var i = 1; i < l; i++) {
                var arg = arguments[i];
                if ((typeof arg == "object" || arg == null) && !locCb)
                    locArgs = arg;
                else if (typeof arg == "function" && !locCb)
                    locCb = arg;
                else if ((typeof arg == "object" || arg == null) && locCb && !locOption)
                    locOption = { target: arg };
                else if (locOption) {
                    arg.target = locOption.target;
                    locOption = arg;
                }
                else
                    throw "Arguments error for request!";
            }
            locOption = locOption || {};
            locOption.cb = locCb;
            var requestId = self._requestIdCounter++;
            var requestInfo = new _NetRequestInfo();
            requestInfo.requestId = requestId;
            requestInfo.route = route;
            requestInfo.args = locArgs;
            requestInfo.cb = locOption.cb;
            requestInfo.ctx = locOption.target;
            requestInfo.isHttp = route.split(".")[0] == self.httpKey_handler;
            requestInfo.toPlayWaiting = false;
            self._waitingRequestMap[requestId] = requestInfo;
            return requestInfo;
        };
        //请求的中间层，用于处理重连
        __egretProto__._request = function (requestInfo, force) {
            if (force === void 0) { force = false; }
            var self = this;
            if (self._kicked)
                return; //已经被踢出去了
            if (!self._waitingRequestMap[requestInfo.requestId])
                return; //已经没了
            if (force || !self._hasAsyncAccount || self._connected) {
                self._doRequest(requestInfo);
            }
            else {
                self._reconnect(requestInfo);
            }
        };
        //请求的统一接口
        __egretProto__._doRequest = function (requestInfo) {
            var self = this;
            if (self._kicked)
                return; //已经被踢出去了
            if (!self._waitingRequestMap[requestInfo.requestId])
                return; //已经没了
            if (requestInfo.isHttp) {
                self._requestHttp(requestInfo);
            }
            else {
                self._requestPomelo(requestInfo);
            }
        };
        //获取http的参数
        __egretProto__._getHttpParams = function (route, args) {
            var self = this;
            var params = "/?";
            params += self.httpKey_route + "=" + route; //TODO
            params += "&" + self.httpKey_args + "=" + JSON.stringify(args || {}); //TODO
            return params;
        };
        //http模式的请求
        __egretProto__._requestHttp = function (requestInfo) {
            var self = this;
            var route = requestInfo.route, args = requestInfo.args;
            var httpUrl = "http://" + self.httpHost + ":" + self.httpPort + self._getHttpParams(route, args);
            netLogger.info("http模式请求开始：%s", httpUrl);
            //先这么实现下，以后会继续优化
            var urlLoader = new egret.URLLoader();
            var urlRequest = new egret.URLRequest(httpUrl);
            urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            urlLoader.load(urlRequest);
            var onComplete = function (event) {
                //netLogger.info(route, "--->", event.type, urlLoader.data);
                urlLoader.removeEventListener(egret.Event.COMPLETE, onComplete, self);
                urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
                self._handlerRequestResult(requestInfo, JSON.parse(urlLoader.data));
            };
            var onError = function (event) {
                urlLoader.removeEventListener(egret.Event.COMPLETE, onComplete, self);
                urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
                netLogger.error(route, "--->", event.type, urlLoader.data);
                self._onClose(event);
            };
            urlLoader.addEventListener(egret.Event.COMPLETE, onComplete, self);
            urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, self);
        };
        //pomelo模式的请求
        __egretProto__._requestPomelo = function (requestInfo) {
            var self = this;
            var route = requestInfo.route, args = requestInfo.args, argsContent = JSON.stringify(args);
            var func = function () {
                netLogger.info("pomelo模式请求开始：%s ? %s", route, argsContent);
                pomelo.request(route, args || {}, function (result) {
                    self._handlerRequestResult(requestInfo, result);
                });
            };
            if (self._connected) {
                func();
            }
            else if (self._connecting) {
                netLogger.info("pomelo模式请求【%s ? %s】等待connect！", route, argsContent);
                self._waitingReq4PomeloQueue.push(func);
                self.connect(function () {
                });
            }
            else {
                netLogger.info("pomelo模式请求【%s ? %s】先进行connect！", route, argsContent);
                self.connect(func);
            }
        };
        //处理请求结果
        __egretProto__._handlerRequestResult = function (requestInfo, result) {
            var self = this, clazz = self.__class, map = self._waitingRequestMap;
            var requestId = requestInfo.requestId;
            delete map[requestId]; //从等待中移除
            if (requestInfo.toPlayWaiting)
                mo.stopWaiting();
            var route = requestInfo.route, cb = requestInfo.cb, ctx = requestInfo.ctx;
            var msgCode = result[self.respKey_msgCode];
            if (msgCode == null) {
                var value = result[self.respKey_value];
                if (cb)
                    cb.call(ctx, value);
                self._dispatchNetEvent(clazz.ON_ROUTE_SUCCESS + "_" + route, value);
            }
            else {
                //显示错误消息
                var msgArgs = result[self.respKey_msgArgs];
                var tempArr = msgArgs || [];
                tempArr.splice(0, 0, msgCode);
                mo.showMsg.apply(mo, tempArr);
                self._dispatchNetEvent(clazz.ON_ROUTE_ERROR + "_" + route, null, msgCode, msgArgs);
            }
        };
        __egretProto__._showNetErrMsg = function () {
            var self = this;
            if (self._netErrShown)
                return;
            self._netErrShown = true;
            _netErrorView.show(function () {
                self._netErrShown = false;
                self._waitingReq4PomeloQueue.length = 0;
                stopWaitingForce();
            });
        };
        __egretProto__._initConnectEvents = function () {
            var self = this, clazz = self.__class;
            if (self._connectEventsInited)
                return; //如果已经初始化过了，就直接返回
            //----------------------------监听消息--------------------------
            self._connectEventsInited = true;
            pomelo.on("io-error", function (event) {
                mo.stopWaiting();
                netLogger.error("net#链接出错!");
                self._connected = false;
                self._connecting = false;
                self._reconnecting = false;
                //pomelo.disconnect();
                self._dispatchNetEvent(clazz.ON_ERROR);
                if (!self._hasAsyncAccount) {
                    self._showNetErrMsg();
                }
            });
            //POMELO_ON_KEY_SYSMSG
            pomelo.on("a", function (data) {
                netLogger.info(data);
            });
            pomelo.on("close", function (event) {
                netLogger.error("net#链接断开!");
                self._onClose(event);
            });
            pomelo.on("onKick", function (event) {
                netLogger.debug("被踢出!");
                mo.stopWaiting();
                self._kicked = true;
                self._connected = false;
                self._dispatchNetEvent(clazz.ON_CLOSE);
                _kickView.show(function () {
                    self.reset();
                });
            });
        };
        __egretProto__._dispatchNetEvent = function (eventType, value, msgCode, msgArgs) {
            var self = this;
            if (self.willTrigger(eventType)) {
                var event = new mo.NetEvent(eventType);
                event.route_value = value;
                event.route_msgCode = msgCode;
                event.route_msgArgs = msgArgs;
                self.dispatchEvent(event);
            }
        };
        __egretProto__._onClose = function (event) {
            mo.stopWaiting();
            var self = this, clazz = self.__class;
            self._connected = false;
            self._connecting = false;
            self._dispatchNetEvent(clazz.ON_CLOSE);
            if (self._hasAsyncAccount) {
                var connectType = self._connectType;
                if (connectType == 2 || connectType == 3) {
                    // 需要跳转到显示reconnect窗口
                    self._reconnect();
                }
            }
            else {
                self._showNetErrMsg();
            }
        };
        __egretProto__.addEventListenerForRouteSuccess = function (route, cb, ctx) {
            this.addEventListener(this.__class.ON_ROUTE_SUCCESS + "_" + route, cb, ctx);
        };
        __egretProto__.removeEventListenerForRouteSuccess = function (route, cb, ctx) {
            this.removeEventListener(this.__class.ON_ROUTE_SUCCESS + "_" + route, cb, ctx);
        };
        __egretProto__.addEventListenerForRouteError = function (route, cb, ctx) {
            this.addEventListener(this.__class.ON_ROUTE_ERROR + "_" + route, cb, ctx);
        };
        __egretProto__.removeEventListenerForRouteError = function (route, cb, ctx) {
            this.removeEventListener(this.__class.ON_ROUTE_ERROR + "_" + route, cb, ctx);
        };
        //++++++++++++++++事件注册相关 结束++++++++++++++++++
        __egretProto__.reset = function () {
            var self = this;
            self._kicked = false; //设置成未被踢出
            self._connected = false; //设置成未连接
            self._connecting = false; //设置正在连接为false
            self._hasAsyncAccount = false; //重新设置成未同步过账号
            self._connectType = 0; //设置成未连接
            //清空缓存的请求
            self._waitingQueue.length = 0;
            var map = self._waitingRequestMap;
            for (var key in map) {
                delete map[key];
            }
            self._requestIdCounter = 0;
            //关闭等待框
            stopWaitingForce();
        };
        Net.__className = "Net";
        Net.ON_ERROR = "error";
        Net.ON_CLOSE = "close";
        Net.ON_KICK = "kick";
        Net.ON_SUCCESS = "success";
        Net.ON_ROUTE_ERROR = "resultError";
        Net.ON_ROUTE_SUCCESS = "resultSuccess";
        return Net;
    })(mo.Class);
    mo.Net = Net;
    Net.prototype.__class__ = "mo.Net";
    var _net = new Net();
    function request(route, args, cb, ctx) {
        _net.request.apply(_net, arguments);
    }
    mo.request = request;
    function requestWaiting(route, args, cb, ctx) {
        _net.requestWaiting.apply(_net, arguments);
    }
    mo.requestWaiting = requestWaiting;
    function request4Pomelo(route, args, cb, ctx) {
        _net.request4Pomelo.apply(_net, arguments);
    }
    mo.request4Pomelo = request4Pomelo;
    function requestWaiting4Pomelo(route, args, cb, ctx) {
        _net.requestWaiting4Pomelo.apply(_net, arguments);
    }
    mo.requestWaiting4Pomelo = requestWaiting4Pomelo;
    function request4Http(route, args, cb, ctx) {
        _net.request4Http.apply(_net, arguments);
    }
    mo.request4Http = request4Http;
    function requestWaiting4Http(route, args, cb, ctx) {
        _net.requestWaiting4Http.apply(_net, arguments);
    }
    mo.requestWaiting4Http = requestWaiting4Http;
    function connect(cb, playWaiting) {
        if (playWaiting === void 0) { playWaiting = true; }
        _net.connect.apply(_net, arguments);
    }
    mo.connect = connect;
    function disconnect() {
        _net.disconnect();
    }
    mo.disconnect = disconnect;
})(mo || (mo = {}));
