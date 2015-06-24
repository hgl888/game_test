var uw;
(function (uw) {
    function parseGuideData(guideCfg) {
        var cfgData = {};
        for (var groupIdKey in guideCfg) {
            var groupId = parseInt(groupIdKey);
            var cmdDatas = [];
            var cmdCfgs = guideCfg[groupId];
            for (var i = 0, li = cmdCfgs.length; i < li; ++i) {
                var cmdCfg = cmdCfgs[i];
                var cmdData = new uw.GuideCmdData();
                cmdData.groupId = groupId;
                cmdData.cmdIndex = i;
                cmdData.type = cmdCfg[uw.c_guide2_type];
                cmdData.penetrable = cmdCfg[uw.c_guide2_penetrable] || cmdData.penetrable;
                cmdData.endType = cmdCfg[uw.c_guide2_endType];
                cmdData.toSave = cmdCfg[uw.c_guide2_toSave] || cmdData.toSave;
                cmdData.countdown = cmdCfg[uw.c_guide2_countdown] || cmdData.countdown;
                cmdData.condition = cmdCfg[uw.c_guide2_condition];
                cmdData.nextCmd = cmdCfg[uw.c_guide2_nextCmd];
                cmdData.judge = cmdCfg[uw.c_guide2_judge];
                cmdData.revertCmd = cmdCfg[uw.c_guide2_revertCmd];
                cmdData.lvl = cmdCfg[uw.c_guide2_lvl];
                cmdData.layer = cmdCfg[uw.c_guide2_layer];
                cmdData.node = cmdCfg[uw.c_guide2_node];
                cmdData.rectNode = cmdCfg[uw.c_guide2_rectNode];
                cmdData.waiting = cmdCfg[uw.c_guide2_waiting];
                cmdData.route = cmdCfg[uw.c_guide2_route];
                cmdData.delayTimeToShow = cmdCfg[uw.c_guide2_delayTimeToShow];
                cmdData.beforeShow = cmdCfg[uw.c_guide2_beforeShow];
                cmdData.afterShow = cmdCfg[uw.c_guide2_afterShow];
                cmdData.beforeNext = cmdCfg[uw.c_guide2_beforeNext];
                cmdData.afterNext = cmdCfg[uw.c_guide2_afterNext];
                cmdData.talk = cmdCfg[uw.c_guide2_talk];
                cmdData.option = cmdCfg[uw.c_guide2_option] || {};
                cmdData.copyId = cmdCfg[uw.c_guide2_copyId];
                cmdData.taskId = cmdCfg[uw.c_guide2_taskId];
                cmdData.bubbleText = cmdCfg[uw.c_guide2_bubbleText];
                cmdData.actions = cmdCfg[uw.c_guide2_actions];
                if (cmdData.actions)
                    cmdData.waiting = true;
                cmdData.isHook = cmdCfg[uw.c_guide2_isHook];
                cmdData.npcIndex = cmdCfg[uw.c_guide2_npcIndex];
                cmdDatas.push(cmdData);
            }
            cfgData[groupId] = cmdDatas;
        }
        return cfgData;
    }
    uw.parseGuideData = parseGuideData;
})(uw || (uw = {}));
