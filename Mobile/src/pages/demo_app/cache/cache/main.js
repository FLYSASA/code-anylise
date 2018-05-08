import App from '@/static/js/app'
import Vue from 'vue'
import utils from '../../../../static/js/utils'
import '../../static/css/base.css'

/* eslint-disable */
new Vue({
    el: '#app',
    methods: {
        back () {
            App.app.back()
        },
        setCache () {
            App.cache.set('name', '张三')
            App.cache.set('age', '18')
            App.cache.set('time', utils.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'))
            alert('设置成功')
        },
        getCache () {
            var info = {
                name: App.cache.get('name'),
                age: App.cache.get('age'),
                time: App.cache.get('time')
            }
            alert(JSON.stringify(info))
        }
    }
})