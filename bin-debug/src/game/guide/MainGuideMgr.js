var uw;
(function (uw) {
    uw.mainGuideMgr;
    var MainGuideMgr = (function (_super) {
        __extends(MainGuideMgr, _super);
        function MainGuideMgr() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = MainGuideMgr.prototype;
        MainGuideMgr.initGuide = function () {
            var guideMgr = uw.mainGuideMgr = uw.MainGuideMgr.create();
            mo.registerGuideMgr(uw.mainGuideMgr);
            var guideCfg = mo.getJSONWithFileName(uw.cfg_c_guide2);
            guideMgr.setCfgData(uw.parseGuideData(guideCfg));
            if (mo.project.option["guideId"]) {
                guideMgr.setCmd(mo.project.option["guideId"]);
            }
            else {
                var guide = uw.userDataCtrl.get(uw.dsConsts.UserEntity.guide);
                var groupId = guide[0] || 1, cmdIndex = guide[1] || 0;
                var groupData = guideMgr._cfgData[groupId]; //获取到数据
                if (groupData) {
                    var cmdData = groupData[cmdIndex];
                    if (cmdData) {
                        var Factory = mo._guideCmdFactoryClassMap[cmdData.type];
                        var cmd = Factory.getInstance().produce(cmdData);
                        if (!guideMgr.revertCmd(cmd)) {
                            guideMgr.setCmd(groupId, cmdIndex);
                        }
                    }
                }
            }
        };
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.net = uw.net;
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        //@override
        __egretProto__._doSubmit = function (curCmd, nextCmd) {
            //        return;
            //更新服务器数据
            var groupId = 1000, cmdIndex = 1000;
            if (nextCmd) {
                groupId = nextCmd.groupId;
                cmdIndex = nextCmd.cmdIndex;
            }
            var args = {};
            var argsKey = uw.iface.a_user_updateGuide_args;
            args[argsKey.guide] = [groupId, cmdIndex];
            mo.request(uw.iface.a_user_updateGuide, args, function () {
            });
        };
        MainGuideMgr.__className = "MainGuideMgr";
        return MainGuideMgr;
    })(mo.GuideMgr);
    uw.MainGuideMgr = MainGuideMgr;
    MainGuideMgr.prototype.__class__ = "uw.MainGuideMgr";
})(uw || (uw = {}));
