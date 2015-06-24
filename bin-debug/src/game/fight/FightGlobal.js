/**
 * Created by Administrator on 14-7-28.
 * 战斗全局数据
 */
var uw;
(function (uw) {
    uw.fightMainCtrl = null;
    uw.fightMainCtrl = null; //主控制器
    uw.fightRoundCtrl = null; //战斗回合控制器
    uw.fightSelfHandSkillCtrl = null; //己方手动技能控制器
    uw.fightEnemyHandSkillCtrl = null; //己方手动技能控制器
    uw.fightEnergyCtrl = null; //能量控制器
    uw.fightActionPauseCtrl = null; //动作暂停
    uw.fightHeroHpCtrl = null; //血量UI控制器
    uw.fightHeroEnergyCtrl = null; //英雄能量UI控制器
    uw.fightUserEnergyCtrl = null; //秘术能量UI控制器
    uw.fightActionManager = null; //action控制器
    uw.fightScene = null; //战斗Scene
    uw.fightDemoCtr = null; //战斗Scene
    uw.fightUtils = null; //战斗Scene    放到uw.init中进行初始化
    uw.fightSimulateCtr = null; //模拟战斗控制器
    uw.fightSimulateUtils = null; //模拟战斗工具
})(uw || (uw = {}));
