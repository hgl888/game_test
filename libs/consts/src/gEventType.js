var gEventType;
(function (gEventType) {
    //项目相关的全局事件类型配置常量
    gEventType.homeFoldMenuOpen = "homeFoldMenuOpen";
    gEventType.showLotteryBtns = "showLotteryBtns";
    gEventType.appearRandSkillsWhenEnter = "appearRandSkillsWhenEnter";
    gEventType.nextRound = "nextRound";
    gEventType.appearRandSkill = "appearRandSkill";
    gEventType.openSysBtns = "openSysBtns";
    gEventType.refreshTasks = "refreshTasks";
    gEventType.starAction = "starAction"; //评星的action
    gEventType.showHeroLeft = "showHeroLeft"; //显示影响信息的左侧
    gEventType.switchCopyDifficulty = "switchCopyDifficulty";
    gEventType.beginOpenSysBtns = "beginOpenSysBtns";
    gEventType.skillLight = "skillLight"; //战斗技能亮起
    gEventType.skillDark = "skillDark"; //战斗技能暗掉
    gEventType.skillPlayed = "skillPlayed"; //播放战斗技能
    gEventType.fightEnd = "fightEnd";
    gEventType.secretEffEnd = "secretEffEnd"; //秘术特效播放完毕动画
})(gEventType || (gEventType = {}));
