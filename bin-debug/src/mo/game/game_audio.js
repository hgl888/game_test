var mo;
(function (mo) {
    /**
     * 播放技能音效
     * @param skillId
     * @param loop
     */
    function playSkillAudio(skillId, loop) {
        var audioPath = resHelper.getSkillAudioPath(skillId);
        if (!audioPath)
            return;
        return mo.playAudio(audioPath, loop);
    }
    mo.playSkillAudio = playSkillAudio;
    /**
     * 播放命中音效
     * @param skillId
     * @param loop
     */
    function playSkillHitAudio(skillId, loop) {
        var audioPath = resHelper.getSkillHitAudioPath(skillId);
        if (!audioPath)
            return;
        return mo.playAudio(audioPath, loop);
    }
    mo.playSkillHitAudio = playSkillHitAudio;
    /**
     * 播放死亡音效
     * @param warriorId
     * @param loop
     */
    function playDeathAudio(warriorId, loop) {
        var audioPath = resHelper.getDeathAudioPath(warriorId);
        if (!audioPath)
            return;
        return mo.playAudio(audioPath, loop);
    }
    mo.playDeathAudio = playDeathAudio;
    /**
     * 播放角色上阵台词音效
     * @param warriorId
     * @param loop
     */
    function playRoleMatrixWordAudio(warriorId, loop) {
        var audioPath = resHelper.getRoleMatrixWordAudioPath(warriorId);
        if (!audioPath)
            return;
        return mo.playAudio(audioPath, loop);
    }
    mo.playRoleMatrixWordAudio = playRoleMatrixWordAudio;
    /**
     * 播放角色行走台词音效
     * @param warriorId
     * @param loop
     */
    function playWalkWordAudio(warriorId, loop) {
        var audioPath = resHelper.getWalkWordAudioPath(warriorId);
        if (!audioPath)
            return;
        return mo.playAudio(audioPath, loop);
    }
    mo.playWalkWordAudio = playWalkWordAudio;
    /**
     * 通过id播放一个cfg_t_audio配置表里的背景音乐
     * @param audioId
     * @param loop
     */
    function playMusicById(audioId, loop) {
        var audioPath = resHelper.getUIAudioPath(audioId);
        if (!audioPath)
            return;
        mo.playMusic(audioPath, loop);
    }
    mo.playMusicById = playMusicById;
    function initAudio() {
        /**
         * 播放UI音效
         * @param audioId
         * @param loop
         */
        mo.playUIAudio = function (audioId, loop) {
            var audioPath = resHelper.getUIAudioPath(audioId);
            if (!audioPath)
                return;
            return mo.playAudio(audioPath, loop);
        };
    }
    mo.initAudio = initAudio;
})(mo || (mo = {}));
