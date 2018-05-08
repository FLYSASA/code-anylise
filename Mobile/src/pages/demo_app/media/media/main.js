import App from '@/static/js/app'
import Vue from 'vue'
import '../../static/css/base.css'

/* eslint-disable */
var vm = new Vue({
    el: '#app',
    data: {
        maxtime: 10,
        manuallyStop: false,
        recordState: false,
        recordDir: 'audio',
        audioPath: '',
        videoPath: ''
    },
    methods: {
        back () {
            App.app.back()
        },
        showRecord () {
            if (App.media.isRecord()) {
                setTimeout(this.showRecord, 200);
            } else if (!this.manuallyStop) {
                App.media.stopRecord()
                var audio = App.media.getRecordInfo()
                this.audioPath = audio.path
                alert(JSON.stringify(audio))
                this.recordState = false
            }
        },
        startRecord () {
            App.media.startRecord({
                path: this.recordDir,
                maxtime: this.maxtime
            })
            this.manuallyStop = false
            this.recordState = true

            this.showRecord()
        },

        stopRecord () {
            if (App.media.isRecord()) {
                App.media.stopRecord()
                var audio = App.media.getRecordInfo()
                this.audioPath = audio.path
                alert(JSON.stringify(audio))
                this.manuallyStop = true
                this.recordState = false
            } else {
                alert('已经停止录音。')
            }
        },

        beep () {
            App.media.beep()
        },

        selectVideo () {
            App.file.selectFile({
                filter: 'mp4|wmv|3gp|move',
                callback: function (path) {
                    vm.videoPath = path
                }
            })
        },

        playVideo () {
            alert('开始播放：' + this.videoPath)
            App.media.playVideo(this.videoPath)
        },

        playAudio () {
            alert('开始播放：' + this.audioPath)
            App.media.playAudio(this.audioPath)
        },

        seekTo () {
            if (App.media.getStatus() === 0) {
                this.playAudio()
                this.pause()
            }

            var totaltime = App.media.getDuration()
            App.media.seekTo(totaltime / 2)
        },

        pause () {
            App.media.pause()
        },

        resume () {
            App.media.resume()
        },

        stop () {
            App.media.stop()
        },

        volumeUp () {
            App.media.volumeUp()
        },

        volumeDown () {
            App.media.volumeDown()
        },

        getVolume () {
            var volumn = App.media.getVolume()
            alert(volumn)
        }
    }
})