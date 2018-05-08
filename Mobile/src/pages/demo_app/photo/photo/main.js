import App from '@/static/js/app'
import Vue from 'vue'
import '../../static/css/base.css'

/* eslint-disable */
var vm = new Vue({
    el: '#app',
    data: {
        sourcePath: '',
        savePaths: {
            '0': 'imgs1',
            '1': 'imgs2',
            '2': 'imgs3'
        },
        imgPath: 'temp/zsyf/planimg/4aa0c930-b95f-498e-8063-029485f3e2f0.jpg',
        imgBase64: 'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAF5SURBVHja7JjdUcJAEIA/GAtICbEC2QqMHWAFkAqUCtAKHCqAErACoYLDCqSEdIAv6wyTUUNyOzkYdl8yc7kk++1fdm9wOBy4ZBly4XIT+wIRqS+NgAK4A3Jd2wGfwBqojjeHENICHEkBzPX62z2AJbACZnWQ1CH0Bnz8oXxdpsDXiXt7AVgCzy2fyRR4nBRARF7Uop3hRSRPAqAfnkcaMFMPJvHAk1Xyx3ghBmCMnUx7BVCL5YYA9317wFL5624lrhMghLAx1mOfwgNrQ4D3FAALK+uHENa9A2gYWYTSLGUSP0a2xasY60cDhBAq4KEjxAooz6GM7oDbFkldadiUFglkAZDpGLlQxfYNlatU6JEFwKDNqYSI1Oddi6mqUqAdsAU2Gpp2ADq4THrsgTbA6yk/zEYAEVlGTl1RVa6pSg0blC8SKv9zWBCVxJPEvVquedcZ4Bz6/uLS2+nM5wEHcAAHcAAHcAAHcAAHcAAH6DTUuwcc4H/5HgBxbV9G31j8nQAAAABJRU5ErkJggg=='
    },
    methods: {
        back () {
            App.app.back()
        },
        takePhoto () {
            App.photo.camera({
                callback: function (path) {
                    alert(JSON.stringify(data))
                    vm.sourcePath = data.path
                }
            })
        },
        scanQRCode () {
            App.photo.scan(function (data) {
                alert(data)
            })
        },
        selectImage () {
            App.photo.selectImage({
                callback: function (paths) {
                    if (paths.length) {
                        alert(JSON.stringify(paths))
                        vm.sourcePath = paths[0].path
                    }
                }
            })
        },
        scaleImage (mode) {
            if (this.sourcePath === '') {
                alert('请先拍一张照片或者选一张图片。')
            } else {
                var params = {
                    sourcePath: this.sourcePath,
                    savePath: this.savePaths[mode],
                    mode: mode,
                    callback: function (result) {
                        alert(JSON.stringify(result))
                    }
                }
                switch (mode) {
                    case '0':
                        params.width = 400
                        params.compress = 50
                        break
                    case '1':
                        params.rate = 0.4
                        break
                    case '2':
                        params.size = 500
                        break
                }
                try {
                    App.photo.scaleImage(params)
                } catch (err) {
                    alert(err.message)
                }
            }
        },
        paintImage () {
            if (this.sourcePath === '') {
                alert('请先拍一张照片或者选一张图片。')
            } else {
                var params = {
                    sourcePath: this.sourcePath,
                    callback: function (result) {
                        alert(JSON.stringify(result))
                    }
                }
                App.photo.paintImage(params)
            }
        },
        openImage () {
            App.photo.openImage(this.imgPath)
        },
        openBase64Image () {
            App.photo.openBase64Image(this.imgBase64)
        }
    }
})
