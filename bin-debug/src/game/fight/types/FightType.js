var uw;
(function (uw) {
    var Fight;
    (function (Fight) {
        Fight.ColorTransformType = {
            frozen: 10001,
            stone: 10002,
            poison: 10003,
            mirror: 10004
        };
        Fight.AttackType = {
            shortRange: 1,
            remote: 2
        };
        Fight.BuffStateType = {
            stun: 10,
            forbidden: 11,
            repel: 13,
            physicalImmune: 16,
            magicImmune: 17
        };
        Fight.Anger = {
            normal: res.cca_buff.normalSkill,
            super: res.cca_buff.normalUnique
        };
        Fight.Charm = {
            normal: res.ui_fight.normalAnger_png,
            super: res.ui_fight.superAnger_png,
            upMagicAttack: res.ui_fight.hermiMagic_png,
            upPhysicalAttack: res.ui_fight.hermiRoar_png,
            downMagicDefend: res.ui_fight.hermiPressure_png,
            downPhysicalDefend: res.ui_fight.hermiCorrosion_png,
            upCrit: res.ui_fight.hermiViolent_png
        };
        Fight.Shield = {
            normal: res.cca_buff.physicalShield,
            magic: res.cca_buff.magicShield
        };
        Fight.ShieldCharm = {
            normal: res.ui_fight.normalShieldCharm_png,
            magic: res.ui_fight.magicShieldCharm_png
        };
        Fight.ArmatureName = {
            begin: "begin",
            loop: "loop",
            end: "end"
        };
        Fight.Energy = {
            begin: "guangqiu",
            end: "xishou"
        };
        Fight.RoundType = {
            begin: 99,
            end: 100,
            gameOver: 101
        };
        Fight.HeroAction = {
            steady: "steady",
            run: "run",
            normalAttack: "normalAttack",
            skillAttack1: "skillAttack1",
            skillAttack2: "skillAttack2",
            skillAttack3: "skillAttack3",
            uniqueAttack: "uniqueAttack",
            hit: "hit",
            dead: "dead",
            stun: "stun",
            win: "win",
            freeze: "freeze",
            jump: "jump",
            chant: "chant" //不要了
        };
        /**
         * 英雄事件
         * @type {{attack: string, effect: string, uniquePauseEnd: string}}
         */
        Fight.HeroEvent = {
            attack: "attackEvent",
            effect: "effectEvent",
            uniquePauseEnd: "uniquePauseEndEvent",
            shake: "shakeEvent",
            //不要了
            normal: "normalEvent",
            skill: "skillEvent",
            unique: "uniqueEvent",
            preNormal: "preNormalEvent",
            preSkill: "preSkillEvent",
            preUnique: "preUniqueEvent",
            jumpBeginEvent: "jumpBeginEvent",
            jumpEndEvent: "jumpEndEvent",
            slowMotionEventBegin: "slowMotionEventBegin",
            slowMotionEventEnd: "slowMotionEventEnd",
            hit: "hitEvent"
        };
        /**
         * 英雄特效事件
         * @type {{attack: string}}
         */
        Fight.EffectEvent = {
            attack: "attackEvent"
        };
        Fight.HeroBody = {
            none: 0,
            head: 1,
            body: 2,
            foot: 3
        };
        Fight.HeroBodykey = {
            head: "head",
            body: "body",
            foot: "foot"
        };
        Fight.ResType = {
            armature: 1,
            buff: 2
        };
        function Res(type, path, id) {
            this.type = type || 0;
            this.path = path || "";
            this.id = 0;
        }
        Fight.Res = Res;
        ;
        Fight.maxZOrder = 999999;
        Fight.moveSpeed = 470;
        Fight.omega = 500;
        Fight.assisters = [];
        Fight.uncorrelatedChars = [];
        Fight.isDebug = true; //设置调试模式
        Fight.isDemo = false;
        Fight.isDebug = true;
        if (egret.MainContext.runtimeType != egret.MainContext.RUNTIME_NATIVE) {
            Fight.isDebug = false;
        }
        Fight.unitPixel = 50; //格子单位像素
        Fight.isExit = true; //战斗是否退出
        Fight.noSkill = res.ui_fight.ico_enegry_png;
        Fight.arenaCopyId = 70001;
    })(Fight = uw.Fight || (uw.Fight = {}));
})(uw || (uw = {}));
ColorTransformUtils.addTransform(uw.Fight.ColorTransformType.frozen, [1, 0, 0, 0.2, 0, 0, 1, 0, 0.4, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(uw.Fight.ColorTransformType.stone, [0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0.3086, 0.6094, 0.082, 0, 0, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(uw.Fight.ColorTransformType.poison, [1, 0, 0, 0.4, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0.7, 0, 0, 0, 0, 1, 0]);
ColorTransformUtils.addTransform(uw.Fight.ColorTransformType.mirror, [5.55111512312578e-17, 0, 1, 0, 0, 0.356, 0.855, -0.211, 0, 0, -0.574, 1.43, 0.144, 0, 0, 0, 0, 0, 1, 0]);
