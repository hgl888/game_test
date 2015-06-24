/**
 * Created by Administrator on 14-9-12.
 */
var uw;
(function (uw) {
    var buffShowBiz;
    (function (buffShowBiz) {
        /**
         * 根据buff添加表现
         * @param member
         * @param buffData
         */
        function addByBuff(member, buffData) {
            var showTypeArr = buffData.showType;
            for (var i = 0; i < showTypeArr.length; i++) {
                var locShowType = showTypeArr[i];
                if (!locShowType)
                    continue;
                this.setShow(member, locShowType, true);
            }
            this.calPriority(member, showTypeArr);
        }
        buffShowBiz.addByBuff = addByBuff;
        /**
         * 设置表现
         * @param member
         * @param showType
         * @param bool
         */
        function setShow(member, showType, bool) {
            if (!showType)
                return;
            var node = member.fightOption.curController.display;
            if (member.isDeath())
                return;
            if (!node.getHeroArmature()) {
                //已经死亡被移除
                return;
            }
            switch (showType) {
                case uw.c_prop.buffShowTypeKey.increase:
                    node.setUpState();
                    break;
                case uw.c_prop.buffShowTypeKey.reduce:
                    node.setDownState();
                    break;
                case uw.c_prop.buffShowTypeKey.forbidden:
                    node.setForbidden(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.stun:
                    node.setStun(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.magicShield:
                    node.setMagicShield(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.physicsShield:
                    node.setPhysicsShield(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.crow:
                    node.setCrow(bool);
                    //如果已经换armature,则需要重新设置事件
                    if (bool) {
                        member.fightOption.curController.initEvent();
                    }
                    break;
                case uw.c_prop.buffShowTypeKey.chaos:
                    node.setChaos(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.defend:
                    node.setDefend(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.curse:
                    node.setCurse(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.poison:
                    node.setPoison(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.blind:
                    node.setBlind(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.dkShield:
                    node.setDKShield(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.bounce:
                    node.setBounce(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.freeze:
                    node.setFreeze(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.stone:
                    node.setStone(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.limitMove:
                    node.setLimitMove(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.shareHp:
                    node.setShareHp(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.burn:
                    node.setBurn(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.freezeNoIce:
                    node.setFreezeNoIce(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.sleep:
                    node.setSleep(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.space:
                    node.setSpace(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.addAttack:
                    node.setAddAttack(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.mirror:
                    node.setMirror(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.wine:
                    node.setWine(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.magicShield1:
                    node.setMagicShield1(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.backShadow:
                    node.setBackShadow(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.hellFire:
                    node.setHellFire(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.magicShield2:
                    node.setMagicShield2(bool);
                    break;
                case uw.c_prop.buffShowTypeKey.secret1:
                    if (bool) {
                        node.addCharm(uw.Fight.Charm.upMagicAttack);
                    }
                    else {
                        node.removeCharm(uw.Fight.Charm.upMagicAttack);
                    }
                    break;
                case uw.c_prop.buffShowTypeKey.secret2:
                    if (bool) {
                        node.addCharm(uw.Fight.Charm.upPhysicalAttack);
                    }
                    else {
                        node.removeCharm(uw.Fight.Charm.upPhysicalAttack);
                    }
                    break;
                case uw.c_prop.buffShowTypeKey.secret3:
                    if (bool) {
                        node.addCharm(uw.Fight.Charm.downMagicDefend);
                    }
                    else {
                        node.removeCharm(uw.Fight.Charm.downMagicDefend);
                    }
                    break;
                case uw.c_prop.buffShowTypeKey.secret4:
                    if (bool) {
                        node.addCharm(uw.Fight.Charm.downPhysicalDefend);
                    }
                    else {
                        node.removeCharm(uw.Fight.Charm.downPhysicalDefend);
                    }
                    break;
                case uw.c_prop.buffShowTypeKey.secret5:
                    if (bool) {
                        node.addCharm(uw.Fight.Charm.upCrit);
                    }
                    else {
                        node.removeCharm(uw.Fight.Charm.upCrit);
                    }
                    break;
            }
        }
        buffShowBiz.setShow = setShow;
        /**
         * 根据buff移除表现
         * @param member
         * @param buffData
         */
        function removeByBuff(member, buffData) {
            var showTypeArr = buffData.showType;
            for (var i = 0; i < showTypeArr.length; i++) {
                var locShowType = showTypeArr[i];
                if (!locShowType)
                    continue;
                this.removeShow(member, locShowType);
            }
        }
        buffShowBiz.removeByBuff = removeByBuff;
        /**
         * 移除表现
         * @param member
         * @param showType
         */
        function removeShow(member, showType) {
            //获取现目前中的状态拥有的showType
            var showTypeArr = this.getShowTypes(member);
            //非持续类不需要移除
            if (showType == uw.c_prop.buffShowTypeKey.increase || showType == uw.c_prop.buffShowTypeKey.reduce || showType == uw.c_prop.buffShowTypeKey.bounce) {
                return;
            }
            //判断是否有一样的表现，如果有就不移除
            if (showTypeArr.indexOf(showType) > -1) {
                return;
            }
            //移除
            this.setShow(member, showType, false);
            this.calPriority(member, showTypeArr);
        }
        buffShowBiz.removeShow = removeShow;
        /**
         * 计算优先级
         */
        function calPriority(member, showTypeArr) {
            //重新计算优先级,晕->睡->冰冻->定身->石化->中毒
            //晕
            if (showTypeArr.indexOf(uw.c_prop.buffShowTypeKey.stun) > -1) {
                this.setShow(member, uw.c_prop.buffShowTypeKey.stun, true);
            }
            //睡
            if (showTypeArr.indexOf(uw.c_prop.buffShowTypeKey.sleep) > -1) {
                this.setShow(member, uw.c_prop.buffShowTypeKey.sleep, true);
            }
            //动作冻住，没冰块效果
            if (showTypeArr.indexOf(uw.c_prop.buffShowTypeKey.freezeNoIce) > -1) {
                this.setShow(member, uw.c_prop.buffShowTypeKey.freezeNoIce, true);
            }
            //冰冻
            if (showTypeArr.indexOf(uw.c_prop.buffShowTypeKey.freeze) > -1) {
                this.setShow(member, uw.c_prop.buffShowTypeKey.freeze, true);
            }
            //定身
            if (showTypeArr.indexOf(uw.c_prop.buffShowTypeKey.limitMove) > -1) {
                this.setShow(member, uw.c_prop.buffShowTypeKey.limitMove, true);
            }
            //石化
            if (showTypeArr.indexOf(uw.c_prop.buffShowTypeKey.stone) > -1) {
                this.setShow(member, uw.c_prop.buffShowTypeKey.stone, true);
            }
            //中毒
            if (showTypeArr.indexOf(uw.c_prop.buffShowTypeKey.poison) > -1) {
                this.setShow(member, uw.c_prop.buffShowTypeKey.poison, true);
            }
        }
        buffShowBiz.calPriority = calPriority;
        /**
         * 获取当前所有的表现
         * @param member
         * @returns {Array}
         */
        function getShowTypes(member) {
            var showTypeArr = [];
            for (var key in member.fightOption.curFightBuffDic) {
                var locFightBuff = member.fightOption.curFightBuffDic[key];
                var locShowTypeArr = locFightBuff.buffData.showType;
                for (var j = 0; j < locShowTypeArr.length; j++) {
                    var locShowType = locShowTypeArr[j];
                    if (!locShowType)
                        continue;
                    showTypeArr.push(locShowType);
                }
            }
            return showTypeArr;
        }
        buffShowBiz.getShowTypes = getShowTypes;
    })(buffShowBiz = uw.buffShowBiz || (uw.buffShowBiz = {}));
})(uw || (uw = {}));
