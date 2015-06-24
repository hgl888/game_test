/**
* Created by huanghaiying on 14/12/16.
*/
var uw;
(function (uw) {
    var MailDataCtrl = (function (_super) {
        __extends(MailDataCtrl, _super);
        function MailDataCtrl() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MailDataCtrl.prototype;
        __egretProto__.init = function (data) {
            _super.prototype.init.call(this, data);
            if (!data)
                return;
            this._initFromCfg();
        };
        /**
         * 获取列表
         * @returns {Array}
         */
        __egretProto__.getList = function () {
            //判断是否删除
            this._calAllDel();
            this._sort();
            return this._data;
        };
        /**
         * 获取详细
         * @param id
         * @returns {*}
         */
        __egretProto__.getInfoById = function (id) {
            var idConst = uw.dsConsts.MailEntity.id;
            for (var i = 0; i < this._data.length; i++) {
                var obj = this._data[i];
                if (obj[idConst] == id) {
                    return obj;
                }
            }
        };
        /**
         * 设置阅读
         * @param id
         * @param cb
         * @param target
         */
        __egretProto__.setRead = function (id, cb, target) {
            var self = this;
            var info = self.getInfoById(id);
            //已经阅读就不用再请求
            if (info[uw.dsConsts.MailEntity.isRead]) {
                if (cb)
                    cb.call(target);
                return;
            }
            info[uw.dsConsts.MailEntity.isRead] = 1;
            self._calExpireDel(id, self.__class.OPERATE_READ);
            self._setChanged(self.__class.MAIL_INFO + id);
            if (cb)
                cb.call(target);
            var args = {};
            var argsKey = uw.iface.a_mail_setRead_args;
            args[argsKey.mailId] = id;
            mo.request(uw.iface.a_mail_setRead, args, function () {
            });
        };
        /**
         * 删除邮件
         * @param id
         * @param cb
         * @param target
         */
        __egretProto__.del = function (id, cb, target) {
            var self = this;
            var args = {};
            var argsKey = uw.iface.a_mail_del_args;
            args[argsKey.mailId] = id;
            mo.requestWaiting(uw.iface.a_mail_del, args, function () {
                if (cb)
                    return cb.call(target);
                self._del(id);
            });
        };
        /**
         * 提取附件物品
         * @param id
         * @param cb
         * @param target
         * @returns 返回是否删除,true:已经删除，false:木有删除
         */
        __egretProto__.pickItems = function (id, cb, target) {
            var self = this;
            var args = {};
            var argsKey = uw.iface.a_mail_pickItems_args;
            args[argsKey.mailId] = id;
            mo.requestWaiting(uw.iface.a_mail_pickItems, args, function (useItemInfo) {
                uw.userDataCtrl.handleUseItemInfo(useItemInfo);
                uw.showGainTips(useItemInfo);
                self._calExpireDel(id, self.__class.OPERATE_PICK);
                var info = self.getInfoById(id);
                if (info) {
                    info[uw.dsConsts.MailEntity.isPicked] = 1;
                    self._setChanged(self.__class.MAIL_INFO + id);
                }
                if (cb)
                    return cb.call(target, !info);
            });
        };
        /**
         * 获取是否存在需要阅读或者提取物品的邮件
         * @param cb
         * @param target
         */
        __egretProto__.isNeedOperate = function (cb, target) {
            mo.request(uw.iface.a_mail_getIsNeedOperate, {}, function (data) {
                //todo 这里需要做提示有新邮件的标志
                if (cb)
                    return cb.call(target, data);
            });
        };
        /******************************************************************private********************************************************************/
        /**
         * 计算操作后是否过期删除
         * @param id
         * @param type
         * @private
         */
        __egretProto__._calExpireDel = function (id, type) {
            var self = this;
            var info = this.getInfoById(id);
            if (type == self.__class.OPERATE_READ) {
                //没有物品则设置删除时间
                if (!info[uw.dsConsts.MailEntity.items]) {
                    info[uw.dsConsts.MailEntity.delTime] = (Date.newDate()).addHours(info[uw.dsConsts.MailEntity.delHours]);
                }
            }
            else if (type == self.__class.OPERATE_PICK) {
                //设置删除时间
                info[uw.dsConsts.MailEntity.delTime] = (Date.newDate()).addHours(info[uw.dsConsts.MailEntity.delHours]);
            }
            if (self._isNeedToDel(id)) {
                self._del(id);
            }
        };
        /**
         * 是否需要删除
         * @param id
         * @returns {boolean}
         * @private
         */
        __egretProto__._isNeedToDel = function (id) {
            var self = this;
            var info = self.getInfoById(id);
            var expireTime = info[uw.dsConsts.MailEntity.expireTime];
            if (expireTime && typeof expireTime == "string")
                expireTime = Date.newDate(expireTime);
            var delTime = info[uw.dsConsts.MailEntity.delTime];
            var nowTime = Date.newDate();
            //判断是否已经过期,或者到达删除时间
            if (expireTime.isBefore(nowTime) || expireTime.equals(nowTime)) {
                return true;
            }
            if (delTime && typeof delTime == "string")
                delTime = Date.newDate(delTime);
            if (delTime && (delTime.isBefore(nowTime) || delTime.equals(nowTime))) {
                return true;
            }
            return false;
        };
        /**
         * 重新排序
         * @private
         */
        __egretProto__._sort = function () {
            //未查看，已查看但未领取，已查看且已领取
            var arr1 = [], arr2 = [], arr3 = [];
            var mailArr = this._data;
            for (var i = 0; i < mailArr.length; i++) {
                var mailData = mailArr[i];
                var isRead = mailData[uw.dsConsts.MailEntity.isRead];
                var isPicked = mailData[uw.dsConsts.MailEntity.isPicked];
                var items = mailData[uw.dsConsts.MailEntity.items];
                if (items && Object.keys(items).length <= 0) {
                    mailData[uw.dsConsts.MailEntity.items] = null;
                }
                if (!isRead) {
                    arr1.push(mailData);
                }
                else {
                    if (!isPicked) {
                        arr2.push(mailData);
                    }
                    else {
                        arr3.push(mailData);
                    }
                }
            }
            var idKey = uw.dsConsts.MailEntity.id;
            var sortFunc = function (a, b) {
                return a[idKey] > b[idKey] ? -1 : 1;
            };
            arr1.sort(sortFunc);
            arr2.sort(sortFunc);
            arr3.sort(sortFunc);
            this._data = arr1.concat(arr2).concat(arr3);
        };
        /**
         * 剔除删除的
         * @private
         */
        __egretProto__._calAllDel = function () {
            var self = this;
            var mailArr = this._data;
            for (var i = 0, l = mailArr.length; i < l; i++) {
                var id = mailArr[i][uw.dsConsts.MailEntity.id];
                if (self._isNeedToDel(id)) {
                    mailArr.splice(i, 1);
                    i--;
                }
            }
        };
        /**
         * 删除条记录
         * @param id
         * @private
         */
        __egretProto__._del = function (id) {
            var mailArr = this._data;
            for (var i = 0, l = mailArr.length; i < l; i++) {
                if (mailArr[i][uw.dsConsts.MailEntity.id] == id) {
                    mailArr.splice(i, 1);
                    break;
                }
            }
        };
        __egretProto__._initFromCfg = function () {
            var mailArr = this._data;
            var c_mail = mo.getJSONWithFileName(uw.cfg_c_mail);
            for (var i = 0, l = mailArr.length; i < l; i++) {
                var locMailData = mailArr[i];
                var c_mailData = c_mail[locMailData[uw.dsConsts.MailEntity.type]];
                if (c_mailData) {
                    locMailData[uw.dsConsts.MailEntity.fromName] = c_mailData[uw.c_mail_fromName];
                    locMailData[uw.dsConsts.MailEntity.title] = c_mailData[uw.c_mail_title];
                    var locContent = c_mailData[uw.c_mail_content];
                    var locReplaceArgs = locMailData[uw.dsConsts.MailEntity.replaceArgs];
                    if (locReplaceArgs) {
                        locContent = mo.formatStr.apply(null, [locContent].concat(locReplaceArgs));
                    }
                    locMailData[uw.dsConsts.MailEntity.content] = locContent;
                }
            }
        };
        MailDataCtrl.__className = "MailDataCtrl";
        MailDataCtrl.MAIL_INFO = "MailEntity";
        MailDataCtrl.OPERATE_READ = 1; //读操作
        MailDataCtrl.OPERATE_PICK = 2; //提取物品操作
        /**
         * 通过服务端进行数据初始化
         * @param cb
         */
        MailDataCtrl.initByServer = function (cb) {
            if (!uw.mailDataCtrl) {
                uw.mailDataCtrl = uw.MailDataCtrl.getInstance();
            }
            mo.request(uw.iface.a_mail_getList, {}, function (data) {
                uw.mailDataCtrl.init(data);
                if (cb) {
                    cb();
                }
            });
        };
        return MailDataCtrl;
    })(mo.DataController);
    uw.MailDataCtrl = MailDataCtrl;
    MailDataCtrl.prototype.__class__ = "uw.MailDataCtrl";
    uw.mailDataCtrl;
})(uw || (uw = {}));
