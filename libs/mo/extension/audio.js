var mo;
(function (mo) {
    /**
     * 是否开启音效
     */
    mo._audioEnabled;
    mo.audioEnabled;
    /** 默认的点击按键的音效id */
    mo.audioIdOnClick = 101;
    mo._playingMusic;
    var musicVolume = 1;
    /**
     * 播放一个音效
     * @param audioPath
     * @param isBgMusic
     * @param cb
     * @param {Boolean|null} loop
     */
    function playAudio(audioPath, loop, isBgMusic, cb) {
        if (!mo._audioEnabled)
            return;
        if (loop == null)
            loop = false;
        res.getStatusRes(audioPath, function (audio) {
            if (isBgMusic == true) {
                audio.type = egret.Sound.MUSIC;
            }
            audio.play(loop);
            cb && cb(audio);
        }, null);
    }
    mo.playAudio = playAudio;
    /**
     * 停止一个音效
     * @param audioPath
     */
    function pauseAudio(audioPath) {
        if (!mo._audioEnabled)
            return;
        res.getStatusRes(audioPath, function (audio) {
            audio.pause();
        }, null);
    }
    mo.pauseAudio = pauseAudio;
    /**
     * 播放一个背景音乐
     * @param audioPath
     * @param loop
     */
    function playMusic(audioPath, loop) {
        if (!mo._audioEnabled)
            return;
        playAudio(audioPath, loop, true, function (au) {
            if (au != mo._playingMusic) {
                au.setVolume(musicVolume);
                pauseMusic();
                mo._playingMusic = au;
            }
        });
    }
    mo.playMusic = playMusic;
    /**
     * 暂停背景音乐
     */
    function pauseMusic() {
        if (mo._playingMusic) {
            mo._playingMusic.pause();
        }
    }
    mo.pauseMusic = pauseMusic;
    /**
     * 恢复背景音乐
     */
    function resumeMusic() {
        if (mo._playingMusic) {
            mo._playingMusic.play();
        }
    }
    mo.resumeMusic = resumeMusic;
    /**
     * 设置背景音乐音量
     * @param volume
     */
    function setMusicVolume(volume) {
        if (!mo._audioEnabled)
            return;
        musicVolume = volume;
        if (mo._playingMusic) {
            mo._playingMusic.setVolume(volume);
        }
    }
    mo.setMusicVolume = setMusicVolume;
    mo.playUIAudio;
})(mo || (mo = {}));
Object.defineProperty(mo, "audioEnabled", {
    get: function () {
        if (mo._audioEnabled == null) {
            mo._audioEnabled = mo.getLocalStorageItem("AudioEnabled", true);
        }
        return mo._audioEnabled;
    },
    set: function (isEnabled) {
        mo._audioEnabled = isEnabled;
        mo.setLocalStorageItem("AudioEnabled", isEnabled, true);
        res.setParserEnabled(res.AudioParser.TYPE, mo.audioEnabled);
    },
    enumerable: true,
    configurable: true
});
