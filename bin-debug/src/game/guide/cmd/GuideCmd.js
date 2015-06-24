var uw;
(function (uw) {
    var GuideCmd = (function (_super) {
        __extends(GuideCmd, _super);
        function GuideCmd() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmd.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.lvlRequired = 0;
        };
        //@override
        __egretProto__._readyToExec = function (layer) {
            var self = this;
            if (self.lvlRequired && self.lvlRequired > uw.userDataCtrl.getLvl())
                return false;
            if (self.copyId && !uw.userDataCtrl.isCopyPassed(self.copyId))
                return false;
            if (self.taskId && !uw.userDataCtrl.isTaskDone(self.taskId))
                return false;
            return this._doCondition(layer);
        };
        GuideCmd.__className = "GuideCmd";
        return GuideCmd;
    })(mo.GuideCmd);
    uw.GuideCmd = GuideCmd;
    GuideCmd.prototype.__class__ = "uw.GuideCmd";
    var GuideCmdData = (function (_super) {
        __extends(GuideCmdData, _super);
        function GuideCmdData() {
            _super.apply(this, arguments);
            this.lvl = 0;
        }
        var __egretProto__ = GuideCmdData.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
        };
        //@override
        __egretProto__._init = function () {
            _super.prototype._init.call(this);
        };
        GuideCmdData.__className = "GuideCmdData";
        return GuideCmdData;
    })(mo.GuideCmdData);
    uw.GuideCmdData = GuideCmdData;
    GuideCmdData.prototype.__class__ = "uw.GuideCmdData";
    var GuideCmdFactory = (function (_super) {
        __extends(GuideCmdFactory, _super);
        function GuideCmdFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmdFactory.prototype;
        //@override
        __egretProto__._setCmdAttr = function (cmd, data) {
            _super.prototype._setCmdAttr.call(this, cmd, data);
            cmd.lvlRequired = data.lvl;
            cmd.copyId = data.copyId;
            cmd.taskId = data.taskId;
        };
        GuideCmdFactory.__className = "GuideCmdFactory";
        return GuideCmdFactory;
    })(mo.GuideCmdFactory);
    uw.GuideCmdFactory = GuideCmdFactory;
    GuideCmdFactory.prototype.__class__ = "uw.GuideCmdFactory";
})(uw || (uw = {}));
