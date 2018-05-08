import App from '@/static/js/app'
import Vue from 'vue'
import '../../static/css/base.css'

/* eslint-disable */
new Vue({
    el: '#app',
    methods: {
        back () {
            App.app.back()
        },
        tel (onlyOpenDialog) {
            var os = App.device.getOsName()
            if (os === 'ios' && onlyOpenDialog) {
                alert('苹果手机不支持。')
            }
            else {
                var phone = '13392433645'
                App.contact.tel(phone, onlyOpenDialog)
            }
        },
        sendSms (onlyOpenDialog) {
            var phone = '13392433645'
            var content = '你好，老大！'
            App.contact.sendSms(phone, content, onlyOpenDialog)
        },
        sendMail () {
            App.contact.sendMail({
                to: 'chengam@chinasap.cn;8045287@qq.com',
                cc: '8336085@qq.com',
                bcc: 'laughsky@126.com',
                subject: 'hello, world!',
                body: 'hello,world,678.yuie623485892347'
            })
        }
    }
})
