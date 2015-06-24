var mo;
(function (mo) {
    var GuideCmdData = (function (_super) {
        __extends(GuideCmdData, _super);
        function GuideCmdData() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmdData.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            self.countdown = 0;
            self.endType = 0;
            self.toSave = true;
            self.delayTimeToShow = 0;
        };
        GuideCmdData.__className = "GuideCmdData";
        return GuideCmdData;
    })(mo.Class);
    mo.GuideCmdData = GuideCmdData;
    GuideCmdData.prototype.__class__ = "mo.GuideCmdData";
})(mo || (mo = {}));
var mo;
(function (mo) {
    var GuideCmdFactory = (function (_super) {
        __extends(GuideCmdFactory, _super);
        function GuideCmdFactory() {
            _super.apply(this, arguments);
        }
        var __egretProto__ = GuideCmdFactory.prototype;
        //@override
        __egretProto__._initProp = function () {
            _super.prototype._initProp.call(this);
            var self = this;
            this._CmdClass = mo.GuideCmd;
        };
        __egretProto__.produce = function (data) {
            var cmd = new this._CmdClass();
            this._setCmdAttr(cmd, data);
            return cmd;
        };
        __egretProto__._setHandler = function (cmd, handlerName, onHandler, handlerMgr) {
            if (!handlerName)
                return;
            var index = handlerName.indexOf(":");
            var arg = null;
            if (index > 0) {
                var argContent = handlerName.substring(index + 1);
                try {
                    argContent = argContent.replace(/'/g, '"');
                    arg = JSON.parse(argContent);
                }
                catch (e) {
                    if (argContent.search(/^\d+$/) == 0) {
                        arg = parseInt(argContent);
                    }
                    else if (argContent.search(/^\d+\.\d+$/) == 0) {
                        arg = parseFloat(argContent);
                    }
                    else {
                        arg = argContent;
                    }
                }
                handlerName = handlerName.substring(0, index);
            }
            var handler = handlerMgr.get(handlerName);
            if (handler)
                onHandler.call(cmd, handler.func, handler.ctx, arg);
        };
        __egretProto__._setCmdAttr = function (cmd, data) {
            var self = this;
            cmd.type = data.type;
            cmd.groupId = data.groupId;
            cmd.cmdIndex = data.cmdIndex;
            cmd.judgeContent = data.judge;
            cmd.bubbleText = data.bubbleText;
            cmd.nextCmdKey = data.nextCmd;
            cmd.revertCmdKey = data.revertCmd;
            cmd.penetrable = data.penetrable;
            cmd.countdown = data.countdown;
            cmd.endType = data.endType;
            cmd.toSave = data.toSave;
            cmd.talk = data.talk;
            cmd.npcIndex = data.npcIndex;
            cmd.layerName = data.layer;
            cmd.nodeName = data.node;
            cmd.rectNodeName = data.rectNode;
            cmd.waiting = data.waiting;
            cmd.route = data.route;
            cmd.delayTimeToShow = data.delayTimeToShow;
            self._setHandler(cmd, data.condition, cmd.onCondition, mo.guideCmdConditionMgr);
            self._setHandler(cmd, data.node, cmd.onNodeGetter, mo.guideCmdNodeMgr);
            self._setHandler(cmd, data.rectNode, cmd.onRectNodeGetter, mo.guideCmdRectNodeMgr);
            self._setHandler(cmd, data.beforeShow, cmd.onBeforeShow, mo.guideCmdBeforeShowMgr);
            self._setHandler(cmd, data.afterShow, cmd.onAfterShow, mo.guideCmdAfterShowMgr);
            self._setHandler(cmd, data.beforeNext, cmd.onBeforeNext, mo.guideCmdBeforeNextMgr);
            self._setHandler(cmd, data.afterNext, cmd.onAfterNext, mo.guideCmdAfterNextMgr);
            self._setHandler(cmd, data.nextCmd, cmd.onNextCmdGetter, mo.nextGuideCmdMgr);
            cmd.actions = data.actions;
            cmd.isHook = data.isHook;
            cmd.option = data.option;
        };
        GuideCmdFactory.__className = "GuideCmdFactory";
        return GuideCmdFactory;
    })(mo.Class);
    mo.GuideCmdFactory = GuideCmdFactory;
    GuideCmdFactory.prototype.__class__ = "mo.GuideCmdFactory";
})(mo || (mo = {}));
