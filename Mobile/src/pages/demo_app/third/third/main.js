import App from '@/static/js/app'
import Vue from 'vue'
import '../../static/css/base.css'

/* eslint-disable */
new Vue({
    el: '#app',
    data: {
        url: 'http://www.baidu.com',
        shareData: {
            type: 'news',
            title: 'iPhone8发布会前亮点汇总 苹果8将会有哪些黑科技？',
            url: 'http://m.techweb.com.cn/article/2017-09-06/2582660.shtml',
            text: '美国西部时间9月12日上午10点（北京时间9月13日凌晨1点），苹果将第一次在全新建造的史蒂夫·乔布斯剧院举行新品发布会。',
            imgPath: 'temp/zsyf/planimg/4aa0c930-b95f-498e-8063-029485f3e2f0.jpg'
        }
    },
    methods: {
        back () {
            App.app.back()
        },
        openPage () {
            App.openPage('demo_app/about/about.html')
        },
        browseUrl () {
            App.third.browseUrl(this.url)
        },
        openUrl () {
            App.third.openUrl({
                url: 'http://m.chinasapi.com'
            })
        },
        openApp () {
            var os = App.device.getOsName()
            if (os === 'ios') {
                App.third.openApp({
                    url: 'weixin'
                })
            }
            else if (os === 'android') {
                App.third.openApp({
                    package: 'com.tencent.mm',
                    activity: 'com.tencent.mm.ui.LauncherUI'
                })
            }
        },
        shareMe () {
            App.third.openShare(this.shareData)
        }
    }
})
