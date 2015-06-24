var uw;
(function (uw) {
    var CalPropsHandler = (function () {
        function CalPropsHandler() {
            var self = this;
            var btn_calSelf = document.getElementById("btn_calSelf");
            btn_calSelf.onclick = function () {
                self.onCalSelfClick();
            };
            var btn_calSkills = document.getElementById("btn_calSkills");
            btn_calSkills.onclick = function () {
                self.onCalSkillsClick();
            };
            var btn_calTrain = document.getElementById("btn_calTrain");
            btn_calTrain.onclick = function () {
                self.onCalTrainClick();
            };
            var sglEquip = function () {
                var index = this.index;
                self.onSglEquipClick(index);
            };
            for (var i = 1; i <= 7; i++) {
                var equipBtn = document.getElementById("btn_calEquip" + i);
                equipBtn.onclick = sglEquip.bind({ index: i });
            }
            var btn_calEquips = document.getElementById("btn_calEquips");
            btn_calEquips.onclick = function () {
                self.onEquipsClick();
            };
            var btn_calAll = document.getElementById("btn_calAll");
            btn_calAll.onclick = function () {
                self.calAll();
            };
            var btn_calAllWithoutSkills = document.getElementById("btn_calAllWithoutSkills");
            btn_calAllWithoutSkills.onclick = function () {
                self.calAllWithoutSkills();
            };
            var btn_calCombatEff = document.getElementById("btn_calCombatEff");
            btn_calCombatEff.onclick = function () {
                self.calCombatEff();
            };
        }
        var __egretProto__ = CalPropsHandler.prototype;
        __egretProto__._getParam = function (parentId, cb, ctx) {
            var parent = document.getElementById(parentId);
            var inputs = parent.getElementsByTagName("input");
            var param = {};
            var msgs = [];
            for (var i = 0, l_i = inputs.length; i < l_i; i++) {
                var ele = inputs[i];
                var name = ele.getAttribute("name");
                if (name) {
                    var value = ele["value"];
                    var required = ele.getAttribute("required");
                    if (required && required != "false" && (value == null || value == "")) {
                        msgs.push(mo.formatStr("【%s.%s】是必填项！", parentId, name));
                    }
                    else {
                        if (value) {
                            var valid = ele.getAttribute("valid");
                            if (valid) {
                                if (valid == "int") {
                                    if (!value.match(/^\d+$/)) {
                                        msgs.push(mo.formatStr("【%s.%s】必须是int类型！", parentId, name));
                                    }
                                    value = parseInt(value);
                                }
                                else if (valid == "float") {
                                    if (!value.match(/^\d+.\d*$/)) {
                                        msgs.push(mo.formatStr("【%s.%s】必须是float类型！", parentId, name));
                                    }
                                    value = parseFloat(value);
                                }
                                else if (valid == "string") {
                                }
                            }
                            else {
                                if (value.match(/^\d+$/)) {
                                    value = parseInt(value);
                                }
                                else if (value.match(/^\d+.\d*$/)) {
                                    value = parseFloat(value);
                                }
                            }
                        }
                        param[name] = value;
                    }
                }
            }
            if (cb)
                cb.call(ctx, msgs.length > 0 ? msgs : null, param);
            return param;
        };
        __egretProto__.printProps = function (props) {
            if (!props)
                return uw.error("计算有误，请检查！");
            var arr1 = [uw.c_prop.heroProp1Key, uw.c_prop.heroProp2Key, uw.c_prop.heroProp3Key];
            var arr2 = [uw.c_prop.heroProp1, uw.c_prop.heroProp2, uw.c_prop.heroProp3];
            uw.debug("================英雄属性计算结果：==============");
            for (var pKey in props) {
                var pName = pKey;
                for (var i = 0; i < arr1.length; ++i) {
                    var keyMap = arr1[i];
                    var nameMap = arr2[i];
                    if (keyMap[pKey]) {
                        pName = nameMap[keyMap[pKey]];
                        break;
                    }
                }
                uw.debug(pName, "：", props[pKey]);
            }
        };
        __egretProto__._calSelf = function (tbl_hero, props) {
            if (props === void 0) { props = {}; }
            var heroTemp = uw.getHeroTempData(tbl_hero.tempId);
            if (!heroTemp)
                return uw.error("未找到模板id为【%s】的英雄配置数据！");
            if (tbl_hero.lvl < 1 || tbl_hero.lvl > 80) {
                return uw.error("【英雄等级】必须在1-80之间！");
            }
            return uw.calHeroSelfProps(tbl_hero, heroTemp, props);
        };
        __egretProto__.onCalSelfClick = function () {
            var self = this;
            self._getParam("tbl_hero", function (msgs, tbl_hero) {
                if (msgs) {
                    for (var i = 0, l_i = msgs.length; i < l_i; i++) {
                        var msg = msgs[i];
                        uw.error(msg);
                    }
                    return;
                }
                self.printProps(self._calSelf(tbl_hero));
            });
        };
        __egretProto__._calSkills = function (tbl_hero, tbl_skills, props) {
            if (props === void 0) { props = {}; }
            var heroTemp = uw.getHeroTempData(tbl_hero.tempId);
            if (!heroTemp)
                return uw.error("未找到模板id为【%s】的英雄配置数据！");
            if (tbl_hero.lvl < 1 || tbl_hero.lvl > 80) {
                return uw.error("【英雄等级】必须在1-80之间！");
            }
            var skillLvlsStr = tbl_skills.skillLvls || "";
            var skillLvls = [];
            if (skillLvlsStr != "") {
                var tempArr = skillLvlsStr.split(",");
                for (var i = 0, l_i = tempArr.length; i < l_i; i++) {
                    skillLvls.push(parseInt(tempArr[i]));
                }
            }
            var skillInfo = {};
            var warriorTemp = uw.getWarriorTempData(heroTemp.tid);
            var skillIds = warriorTemp.skills || [];
            var mixSkillId = warriorTemp.mixSkill;
            var mixSkillLvl = tbl_skills.mixSkillLvl || 0;
            tbl_skills.skillLvls = tbl_hero.skills = skillLvls;
            tbl_skills.mixSkillLvl = tbl_hero.mixSkill = mixSkillLvl;
            for (var i = 0, li = skillIds.length; i < li; ++i) {
                var skillId = skillIds[i];
                if (skillId && skillLvls[i])
                    skillInfo[skillId] = skillLvls[i];
            }
            if (mixSkillId && mixSkillLvl)
                skillInfo[mixSkillId] = mixSkillLvl;
            return uw.calHeroPropsBySkills(skillInfo, props);
        };
        __egretProto__.onCalSkillsClick = function () {
            var self = this, msgs = [];
            self._getParam("tbl_hero", function (msgs1, tbl_hero) {
                if (msgs1)
                    msgs = msgs.concat(msgs1);
                self._getParam("tbl_skills", function (msgs2, tbl_skills) {
                    if (msgs2)
                        msgs = msgs.concat(msgs2);
                    if (msgs.length > 0) {
                        for (var i = 0, l_i = msgs.length; i < l_i; i++) {
                            var msg = msgs[i];
                            uw.error(msg);
                        }
                        return;
                    }
                    self.printProps(self._calSkills(tbl_hero, tbl_skills));
                });
            });
        };
        __egretProto__._calTrain = function (tbl_hero, tbl_train, props) {
            if (props === void 0) { props = {}; }
            var heroTemp = uw.getHeroTempData(tbl_hero.tempId);
            if (!heroTemp)
                return uw.error("未找到模板id为【%s】的英雄配置数据！");
            if (tbl_hero.lvl < 1 || tbl_hero.lvl > 80) {
                return uw.error("【英雄等级】必须在1-80之间！");
            }
            tbl_hero.trainLvl = tbl_train.trainLvl;
            var potentialTrain = tbl_hero.potentialTrain = {};
            var trainTypeKey = uw.c_prop.trainPropKey;
            for (var key in trainTypeKey) {
                var kValue = trainTypeKey[key];
                if (tbl_train[key])
                    potentialTrain[kValue] = tbl_train[key];
            }
            return uw.calHeroSelfPropsByTrain(tbl_hero, heroTemp, props);
        };
        __egretProto__.onCalTrainClick = function () {
            var self = this, msgs = [];
            self._getParam("tbl_hero", function (msgs1, tbl_hero) {
                if (msgs1)
                    msgs = msgs.concat(msgs1);
                self._getParam("tbl_train", function (msgs2, tbl_train) {
                    if (msgs2)
                        msgs = msgs.concat(msgs2);
                    if (msgs.length > 0) {
                        for (var i = 0, l_i = msgs.length; i < l_i; i++) {
                            var msg = msgs[i];
                            uw.error(msg);
                        }
                        return;
                    }
                    self.printProps(self._calTrain(tbl_hero, tbl_train));
                });
            });
        };
        __egretProto__.onSglEquipClick = function (index) {
            var self = this;
            self._getParam("tr_equip" + index, function (msgs, tr_equip) {
                if (msgs) {
                    for (var i = 0, l_i = msgs.length; i < l_i; i++) {
                        var msg = msgs[i];
                        uw.error(msg);
                    }
                    return;
                }
                var equipInfo = tr_equip["equip" + index];
                if (!equipInfo.match(/^\d+:\d+$/)) {
                    return uw.error("装备参数格式必须为：【装备模板id:装备强化等级】");
                }
                var arr = equipInfo.split(":");
                var equipTempId = parseInt(arr[0]);
                var equipLvl = parseInt(arr[1]);
                var equips = [{ tempId: equipTempId, lvl: equipLvl }];
                var props = uw.calHeroPropsByEquips(equips, {});
                self.printProps(props);
            });
        };
        __egretProto__._calEquips = function (tbl_equip, props) {
            if (props === void 0) { props = {}; }
            var t_itemEquip = mo.getJSONWithFileName(uw.cfg_t_itemEquip);
            var equips = [];
            for (var i = 1; i <= 7; ++i) {
                var equipInfo = tbl_equip["equip" + i];
                if (!equipInfo || equipInfo == "")
                    continue;
                if (!equipInfo.match(/^\d+:\d+$/)) {
                    return uw.error("装备%s的装备参数格式必须为：【装备模板id:装备强化等级】", i);
                }
                var arr = equipInfo.split(":");
                var equipTempId = parseInt(arr[0]);
                if (!t_itemEquip[equipTempId]) {
                    return uw.error("装备%s的装备模板id填写有误！", i);
                }
                var equipLvl = parseInt(arr[1]);
                equips.push({ tempId: equipTempId, lvl: equipLvl });
            }
            return uw.calHeroPropsByEquips(equips, props);
        };
        __egretProto__.onEquipsClick = function () {
            var self = this;
            self._getParam("tbl_equip", function (msgs, tbl_equip) {
                if (msgs) {
                    for (var i = 0, l_i = msgs.length; i < l_i; i++) {
                        var msg = msgs[i];
                        uw.error(msg);
                    }
                    return;
                }
                self.printProps(self._calEquips(tbl_equip));
            });
        };
        __egretProto__._getAllParam = function (cb) {
            var parentIdArr = ["tbl_hero", "tbl_skills", "tbl_train", "tbl_equip"];
            var msgs = [];
            var self = this;
            async.map(parentIdArr, function (value, index, cb1) {
                self._getParam(value, function (msgs1, param) {
                    if (msgs1)
                        msgs = msgs.concat(msgs1);
                    cb1(null, param);
                });
            }, function (err, results) {
                if (msgs.length > 0) {
                    for (var i = 0, l_i = msgs.length; i < l_i; i++) {
                        var msg = msgs[i];
                        uw.error(msg);
                    }
                    return;
                }
                var tbl_hero = results[0];
                var tbl_skills = results[1];
                var tbl_train = results[2];
                var tbl_equip = results[3];
                cb(tbl_hero, tbl_skills, tbl_train, tbl_equip);
            });
        };
        __egretProto__._calProps = function (tbl_hero, tbl_skills, tbl_train, tbl_equip, withSkills) {
            var self = this;
            var props = {};
            if (self._calSelf(tbl_hero, props)) {
                if (!withSkills || self._calSkills(tbl_hero, tbl_skills, props)) {
                    if (self._calTrain(tbl_hero, tbl_train, props)) {
                        if (self._calEquips(tbl_equip, props)) {
                            return props;
                        }
                    }
                }
            }
            return null;
        };
        __egretProto__.calAll = function () {
            var self = this;
            self._getAllParam(function (tbl_hero, tbl_skills, tbl_train, tbl_equip) {
                var props = self._calProps(tbl_hero, tbl_skills, tbl_train, tbl_equip, true);
                self.printProps(props);
            });
        };
        __egretProto__.calAllWithoutSkills = function () {
            var self = this;
            self._getAllParam(function (tbl_hero, tbl_skills, tbl_train, tbl_equip) {
                var props = self._calProps(tbl_hero, tbl_skills, tbl_train, tbl_equip, false);
                self.printProps(props);
            });
        };
        __egretProto__.calCombatEff = function () {
            var self = this;
            self._getAllParam(function (tbl_hero, tbl_skills, tbl_train, tbl_equip) {
                var props = self._calProps(tbl_hero, tbl_skills, tbl_train, tbl_equip, false);
                var skillLvlsStr = tbl_skills.skillLvls || "";
                var skillLvls = [];
                if (skillLvlsStr != "") {
                    var tempArr = skillLvlsStr.split(",");
                    for (var i = 0, l_i = tempArr.length; i < l_i; i++) {
                        skillLvls.push(parseInt(tempArr[i]));
                    }
                }
                var mixSkillLvl = tbl_skills.mixSkillLvl || 0;
                uw.log(props);
                var combatEff = uw.calCombatEff(props.pAttack, props.pDefence, props.mAttack, props.mDefence, props.hp, props.hpRecovery, props.crit, props.reCrit, props.hit, props.reHit, props.pAttackMult, props.pDefenceMult, props.mAttackMult, props.mDefenceMult, props.suckBlood, props.ignoreDefence, (mixSkillLvl || 0), (skillLvls[0] || 0), (skillLvls[1] || 0), (skillLvls[2] || 0));
                uw.debug("战斗力计算结果：", combatEff);
            });
        };
        return CalPropsHandler;
    })();
    CalPropsHandler.prototype.__class__ = "uw.CalPropsHandler";
    function test_calProps() {
        res.root = "resource";
        res.load(res.cfgJsonArr, function () {
            new CalPropsHandler();
            uw.debug("加载完毕！");
        });
    }
    uw.test_calProps = test_calProps;
})(uw || (uw = {}));
