var uw;
(function (uw) {
    function getValueByLvl(valArr, lvl) {
        if (!valArr)
            return 0;
        var baseValue = valArr[0], addValue = valArr[1] || 0;
        if (!baseValue)
            return 0;
        lvl = lvl == 0 ? 0 : lvl - 1;
        return baseValue + addValue * (lvl);
    }
    uw.getValueByLvl = getValueByLvl;
    var BuffData = (function () {
        function BuffData(buffTemp, lvl) {
            var self = this;
            self.id = self["id"] = buffTemp[uw.t_buff_id];
            self.content = self["content"] = buffTemp[uw.t_buff_content];
            self.stateType = self["stateType"] = buffTemp[uw.t_buff_stateType] || 0;
            self.valueType = self["valueType"] = buffTemp[uw.t_buff_valueType] || 0;
            self.value = self["value"] = getValueByLvl(buffTemp[uw.t_buff_value], lvl) || 0;
            self.conNum = self["conNum"] = buffTemp[uw.t_buff_conNum] || 0;
            self.interval = self["interval"] = buffTemp[uw.t_buff_interval] || 0;
            self.conTime = self["conTime"] = buffTemp[uw.t_buff_conTime] || 0;
            self.effectType = self["effectType"] = buffTemp[uw.t_buff_effectType] || 0;
            self.showType = self["showType"] = buffTemp[uw.t_buff_showType] || [];
            self.conTime = self["conTime"] = buffTemp[uw.t_buff_conTime] || 0;
            self.side = self["side"] = buffTemp[uw.t_buff_side] || 0;
            self.lvl = lvl; //buff等级等于技能等级
        }
        var __egretProto__ = BuffData.prototype;
        return BuffData;
    })();
    uw.BuffData = BuffData;
    BuffData.prototype.__class__ = "uw.BuffData";
    var SkillData = (function () {
        function SkillData(skillTemp, lvl) {
            var self = this;
            self.id = self["id"] = skillTemp[uw.t_skill_id];
            self.name = self["name"] = skillTemp[uw.t_skill_name];
            self.skillType = self["skillType"] = skillTemp[uw.t_skill_skillType];
            self.percentValue = self["percentValue"] = getValueByLvl(skillTemp[uw.t_skill_percentValue], lvl);
            self.addValue = self["addValue"] = getValueByLvl(skillTemp[uw.t_skill_addValue], lvl);
            self.cd = self["cd"] = skillTemp[uw.t_skill_cd];
            self.targetType = self["targetType"] = skillTemp[uw.t_skill_targetType];
            self.targets = self["targets"] = skillTemp[uw.t_skill_targets];
            self.targetArea = self["targetArea"] = skillTemp[uw.t_skill_targetArea];
            self.propHurtType = self["propHurtType"] = skillTemp[uw.t_skill_propHurtType];
            self.propHurtMult = self["propHurtMult"] = getValueByLvl(skillTemp[uw.t_skill_propHurtMult], lvl);
            self.props = self["props"] = self.getProps(skillTemp[uw.t_skill_props], lvl);
            self.buffNeedLvl = self["buffNeedLvl"] = getValueByLvl(skillTemp[uw.t_skill_buffNeedLvl], lvl);
            var tempTrigger = skillTemp[uw.t_skill_buffTrigger];
            var resultTrigger = [];
            if (tempTrigger) {
                for (var i = 0, li = tempTrigger.length; i < li; ++i) {
                    var arr = tempTrigger[i];
                    if (arr.length == 2)
                        resultTrigger.push(getValueByLvl(arr, lvl));
                    else if (arr[0] == 0)
                        continue;
                    else if (arr[0] == -1)
                        resultTrigger.push(-1);
                    else
                        resultTrigger.push(arr[0]);
                }
            }
            self.buffTrigger = self["buffTrigger"] = resultTrigger;
            self.buffIds = self["buffIds"] = skillTemp[uw.t_skill_buffIds] || [];
            self.energyNeed = self["energyNeed"] = skillTemp[uw.t_skill_energyNeed];
            self.energyReply = self["energyReply"] = skillTemp[uw.t_skill_energyReply];
            self.showId = self["showId"] = skillTemp[uw.t_skill_showId];
            self.passiveType = self["passiveType"] = skillTemp[uw.t_skill_passiveType];
            self.actionRule = self["actionRule"] = skillTemp[uw.t_skill_actionRule] || 0;
            self.exValue = self["exValue"] = skillTemp[uw.t_skill_exValue];
            self.noMiss = self["noMiss"] = skillTemp[uw.t_skill_noMiss];
            self.lvl = self["lvl"] = lvl;
            self.icon = resHelper.getSkillIconPath(self.showId);
            self.buffs = [];
            for (var i = 0, li = self.buffIds.length; i < li; ++i) {
                var buffId = self.buffIds[i];
                if (!buffId)
                    continue;
                var buffData = getBuffData(buffId, lvl);
                if (buffData)
                    self.buffs.push(buffData);
            }
            self.isLocked = !lvl;
            self.text = self["text"] = self.getDesc(skillTemp[uw.t_skill_text], self);
        }
        var __egretProto__ = SkillData.prototype;
        __egretProto__.getProps = function (arr, lvl) {
            if (!arr)
                return {};
            var obj = {};
            for (var i = 0, li = arr.length; i < li; ++i) {
                var propArr = arr[i];
                var propId = propArr[0];
                obj[propId] = getValueByLvl([propArr[1], propArr[2]], lvl);
            }
            return obj;
        };
        __egretProto__.getDesc = function (descTemp, skillData) {
            if (!descTemp)
                return descTemp;
            var func1 = function (str) {
                var tempStr = str.substring(2, str.length - 1);
                var index = tempStr.indexOf("/");
                var num = 0;
                if (index > 0) {
                    num = parseInt(tempStr.substring(index + 1));
                    tempStr = tempStr.substring(0, index);
                }
                if (num)
                    return skillData[tempStr] / num; //如果需要除
                return skillData[tempStr];
            };
            var func2 = function (str) {
                var tempStr = str.substring(2, str.length - 1);
                var index = tempStr.indexOf("/");
                var num = 0;
                if (index > 0) {
                    num = parseInt(tempStr.substring(index + 1));
                    tempStr = tempStr.substring(0, index);
                }
                index = parseInt(tempStr.substring(6, 7));
                var key = tempStr.substring(9);
                var buff = skillData.buffs[index] || {};
                if (num)
                    return buff[key] / num;
                return buff[key];
            };
            var func3 = function (str) {
                var tempStr = str.substring(2, str.length - 1);
                var index = tempStr.indexOf("/");
                var num = 0;
                if (index > 0) {
                    num = parseInt(tempStr.substring(index + 1));
                }
                var props = skillData.props || {};
                for (var key in props) {
                    if (num)
                        return props[key] / num;
                    return props[key];
                }
                return "";
            };
            var func4 = function (str) {
                var tempStr = str.substring(2, str.length - 1);
                var num = parseInt(tempStr.substring(12, tempStr.length - 1));
                return (skillData.buffTrigger[num] / 100) + "%";
            };
            descTemp = descTemp.replace(/\$\{buffTrigger\[\d+\]\}/g, func4);
            descTemp = descTemp.replace(/\$\{props(\/\d*)?\}/g, func3);
            descTemp = descTemp.replace(/\$\{buffs\[\d\]\.[a-zA-Z0-9_\-]+(\/\d*)?\}/g, func2);
            descTemp = descTemp.replace(/\$\{[a-zA-Z0-9_\-]+(\/\d*)?\}/g, func1);
            return descTemp;
        };
        return SkillData;
    })();
    uw.SkillData = SkillData;
    SkillData.prototype.__class__ = "uw.SkillData";
    uw._skillDataCache = {};
    uw._buffDataCache = {};
    function getBuffData(buffId, lvl) {
        var key = buffId + "-" + lvl;
        if (uw._buffDataCache[key])
            return uw._buffDataCache[key];
        var t_buff = mo.getJSONWithFileName(uw.cfg_t_buff);
        var buffTemp = t_buff[buffId];
        if (!buffTemp) {
            uw.error("不存在buff【%s】，请检查！", buffId);
            return null;
        }
        var data = new BuffData(buffTemp, lvl);
        uw._buffDataCache[key] = data;
        return data;
    }
    uw.getBuffData = getBuffData;
    function getSkillData(skillId, lvl) {
        if (lvl === void 0) { lvl = 0; }
        var key = skillId + "-" + lvl;
        if (uw._skillDataCache[key])
            return uw._skillDataCache[key];
        var t_skill = mo.getJSONWithFileName(uw.cfg_t_skill);
        var skillTemp = t_skill[skillId];
        if (!skillTemp) {
            uw.error("不存在技能【%s】，请检查！", skillId);
            return null;
        }
        var data = new SkillData(skillTemp, lvl);
        uw._skillDataCache[key] = data;
        return data;
    }
    uw.getSkillData = getSkillData;
})(uw || (uw = {}));
