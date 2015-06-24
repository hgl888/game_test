/**
 * Created by Administrator on 14-9-12.
 */
var uw;
(function (uw) {
    var heroActionBiz;
    (function (heroActionBiz) {
        /**
         * 受击
         * @param member
         */
        function hit(member) {
            var display = member.fightOption.curController.display;
            //只有常态动作或者跑动中，才会受击
            if (display.getAnimationId() == uw.Fight.HeroAction.steady || display.getAnimationId() == uw.Fight.HeroAction.run || display.getAnimationId() == uw.Fight.HeroAction.stun || display.getAnimationId() == uw.Fight.HeroAction.hit) {
                this.play(member, uw.Fight.HeroAction.hit);
            }
        }
        heroActionBiz.hit = hit;
        /**
         * 普通攻击
         * @param member
         */
        function normalAttack(member) {
            this.play(member, uw.Fight.HeroAction.normalAttack);
        }
        heroActionBiz.normalAttack = normalAttack;
        /**
         * 技能1
         * @param member
         */
        function skillAttack1(member) {
            this.play(member, uw.Fight.HeroAction.skillAttack1);
        }
        heroActionBiz.skillAttack1 = skillAttack1;
        /**
         * 技能2
         * @param member
         */
        function skillAttack2(member) {
            this.play(member, uw.Fight.HeroAction.skillAttack2);
        }
        heroActionBiz.skillAttack2 = skillAttack2;
        /**
         * 技能3
         * @param member
         */
        function skillAttack3(member) {
            this.play(member, uw.Fight.HeroAction.skillAttack3);
        }
        heroActionBiz.skillAttack3 = skillAttack3;
        /**
         * 大招
         * @param member
         */
        function uniqueAttack(member) {
            this.play(member, uw.Fight.HeroAction.uniqueAttack);
        }
        heroActionBiz.uniqueAttack = uniqueAttack;
        /**
         * 胜利
         * @param member
         */
        function win(member) {
            this.play(member, uw.Fight.HeroAction.win);
        }
        heroActionBiz.win = win;
        /**
         * 死亡
         * @param member
         */
        function death(member) {
            this.play(member, uw.Fight.HeroAction.dead);
        }
        heroActionBiz.death = death;
        /**
         * 计算动作
         * @param member
         */
        function calAction(member, isComplete) {
            var display = member.fightOption.curController.display;
            if (!display.getHeroArmature()) {
                //已经死亡被移除
                return;
            }
            //根据状态播放动作
            //判断是否有晕,冰封,石化等buff状态则不需要改变
            var showTypeArr = uw.buffShowBiz.getShowTypes(member);
            if (showTypeArr.indexOf(uw.c_prop.buffShowTypeKey.freeze) > -1 || showTypeArr.indexOf(uw.c_prop.buffShowTypeKey.stone) > -1) {
                return;
            }
            //重生中
            if (member.fightOption.curRevivalBuff) {
                return;
            }
            var isHiting = display.getAnimationId() == uw.Fight.HeroAction.hit;
            var isSteady = display.getAnimationId() == uw.Fight.HeroAction.steady;
            //如果不是动作结束过来，并且目前处于受击动作
            if (!isComplete && isHiting)
                return;
            display.setSpeedScale(1);
            switch (member.fightOption.curStatus) {
                case uw.memberStatus.NORMAL:
                    if (!isSteady) {
                        this.play(member, uw.Fight.HeroAction.steady);
                    }
                    break;
                case uw.memberStatus.RUN:
                    if (display.getAnimationId() != uw.Fight.HeroAction.run) {
                        this.play(member, uw.Fight.HeroAction.run);
                    }
                    display.setSpeedScale(member.fightOption.curController.moveMult);
                    break;
                case uw.memberStatus.SKILL:
                    break;
                case uw.memberStatus.DEATH:
                    break;
            }
        }
        heroActionBiz.calAction = calAction;
        /**
         * 播放动作
         * @param member
         * @param action
         */
        function play(member, action) {
            //uw.fightUtils.log("%s,播放动作%s",member.name,action);
            var display = member.fightOption.curController.display;
            if (!display.getHeroArmature()) {
                //已经死亡被移除
                return;
            }
            display.setSpeedScale(1);
            var actionId = display.getAnimationId();
            //受击动作可以多次播放，其他唯一
            if (actionId != uw.Fight.HeroAction.hit) {
                if (actionId == action)
                    return;
            }
            switch (action) {
                case uw.Fight.HeroAction.steady:
                    display.steady();
                    break;
                case uw.Fight.HeroAction.run:
                    display.run();
                    break;
                case uw.Fight.HeroAction.normalAttack:
                    display.normalAttack();
                    break;
                case uw.Fight.HeroAction.skillAttack1:
                    display.skillAttack1();
                    break;
                case uw.Fight.HeroAction.skillAttack2:
                    display.skillAttack2();
                    break;
                case uw.Fight.HeroAction.skillAttack3:
                    display.skillAttack3();
                    break;
                case uw.Fight.HeroAction.uniqueAttack:
                    display.uniqueAttack();
                    break;
                case uw.Fight.HeroAction.hit:
                    display.hit();
                    break;
                case uw.Fight.HeroAction.stun:
                    display.setStun(true);
                    break;
                case uw.Fight.HeroAction.freeze:
                    display.setFreezeNoIce(true);
                    break;
                case uw.Fight.HeroAction.dead:
                    display.dead();
                    break;
                case uw.Fight.HeroAction.win:
                    display.win();
                    break;
            }
        }
        heroActionBiz.play = play;
    })(heroActionBiz = uw.heroActionBiz || (uw.heroActionBiz = {}));
})(uw || (uw = {}));
