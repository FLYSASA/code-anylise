/* eslint-disable */
import base from './base'

/**
 * 获取录音对象
 */
function getRecord () {
    if (!base.isApp()) {
        return null
    }

    if (!window.appRcord) {
        window.appRcord = MediaUtil.getRecord()
    }
    return window.appRcord
}

/**
 * 获取音频播放对象
 */
function getPlayer () {
    if (!base.isApp()) {
        return null
    }

    if (!window.appPlayer) {
        window.appPlayer = MediaUtil.getAudioPlayer()
    }
    return window.appPlayer
}

var media = {
    /**
     * 开始录音
     * @method App.media.startRecord
     * @param {json} options 选项参数
     * @param {string} options.path 生成文件的目录路径（不指定时则默认为sys:data/tmp，该目录在程序重启后会自动清理）
     * @param {number} options.maxtime 最大支持录音时间，单位：秒，范围：1-3600，默认60
     */
    startRecord (options) {
        var record = getRecord()
        if (record) {
            if (options.path) {
                record.path = base.getSysPath(options.path)
            }
            if (options.maxtime) {
                record.maxtime = options.maxtime
            }

            record.startRecord()
        } else {
            alert('不支持录音。')
        }
    },

    /**
     * 是否正在录音
     * @method App.media.isRecord
     */
    isRecord () {
        var record = getRecord()

        return record ? record.isRecord() : false
    },

    /**
     * 停止录音
     * @param {function} callback 停止录音回调函数，参数是录音文件信息
     */
    stopRecord (callback) {
        var record = getRecord()
        if (record) {
            record.stopRecord()
        }
    },

    /**
     * 获取录音文件信息（录音停止后，也可以手动获取录音文件信息）
     */
    getRecordInfo () {
        var record = getRecord()
        return record ? {
            path: base.getPaths(record.value).path,
            time: record.recordtime
        } : null
    },

    /**
     * 播放提示音
     * App.media.beep
     * @param {string} audioPath 需播放声音文件路径，若不提供则播放平台自带提示音，文件格式只支持wav
     */
    beep (audioPath) {
        if (base.isApp()) {
            if (audioPath) {
                audioPath = base.getSysPath(audioPath)
                MediaUtil.beep(audioPath)
            } else {
                MediaUtil.beep()
            }
        } else {
            alert('不支持播放提示音。')
        }
    },

    /**
     * 调用系统视频播放器打开视频文件，支持播放本地及网络视频；Android支持播放mp4/wmv/3gp格式的视频，根据手机系统版本不同，支持播放的视频文件类型不同；iOS播放本地视频文件和流媒体文件，支持格式均是mp4/mov
     * App.media.playVideo
     * @param {string} videoPath 视频文件路径
     */
    playVideo (videoPath) {
        if (base.isApp()) {
            if (videoPath.substr(0, 7) !== 'http://') {
                videoPath = base.getSysPath(videoPath)
            }
            MediaUtil.openVideo(videoPath)
        } else {
            alert('不支持播放视频。')
        }
    },

    /**
     * 播放本地音频
     * App.media.playAudio
     * @param {string} audioPath 需要播放的本地音频地址
     * @param {boolean} isLooping 是否循环播放，true循环播放，false只播放一次
     */
    playAudio (audioPath, isLooping) {
        var player = getPlayer()
        if (player) {
            audioPath = base.getSysPath(audioPath)
            return player.start(audioPath, !!isLooping)
        } else {
            alert('不支持播放音频。')
        }
        return false
    },

    /**
     * 定位到音频的某一点并播放
     * App.media.seekTo
     * @param {number} position 毫秒数，取值范围大于0小于音频文件时长
     */
    seekTo (position) {
        var player = getPlayer()
        return player ? player.seekTo(position) : false
    },

    /**
     * 暂停播放音频
     * App.media.pause
     */
    pause () {
        var player = getPlayer()
        return player ? player.pause() : false
    },

    /**
     * 从暂停状态恢复
     * App.media.resume
     */
    resume () {
        var player = getPlayer()
        return player ? player.resume() : false
    },

    /**
     * 停止播放音频
     * App.media.stop
     */
    stop () {
        var player = getPlayer()
        return player ? player.stop() : false
    },

    /**
     * 调高音量，每次调整增加一格音量
     * App.media.volumeUp
     */
    volumeUp () {
        var player = getPlayer()
        return player ? player.volumeUp() : -1
    },

    /**
     * 降低音量，每次调整减少一格音量
     * App.media.volumeDown
     */
    volumeDown () {
        var player = getPlayer()
        return player ? player.volumeDown() : -1
    },

    /**
     * 设置播放音频的音量
     * App.media.setVolume
     * @param {number} volume 0到10的整数，代表静音到最大音量之间的位置
     */
    setVolume (volume) {
        var player = getPlayer()
        return player ? player.setVolume(volume) : false
    },

    /**
     * 获取当前设置播放音频的音量
     * App.media.getVolume
     */
    getVolume () {
        var player = getPlayer()
        return player ? player.getVolume() : -1
    },

    /**
     * 读取当前播放的音频的总长度，毫秒数
     * App.media.getDuration
     */
    getDuration () {
        var player = getPlayer()
        return player ? player.getDuration() : -1
    },

    /**
     * 获取音频当前播放状态（0:未播放状态/1:正在播放状态/2:暂停状态）
     * App.media.getStatus
     */
    getStatus () {
        var player = getPlayer()
        return player ? player.getStatus() : 0
    },

    /**
     * 获取当前音频目前播放到的位置，毫秒数
     * App.media.getCurrentPosition
     */
    getCurrentPosition () {
        var player = getPlayer()
        return player ? player.getCurrentPosition() : -1
    },

    /**
     * 当前播放的音频是否设置为循环播放
     * App.media.isLooping
     */
    isLooping () {
        var player = getPlayer()
        return player ? player.isLooping() : false
    }
}

export default media