// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Masker } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Masker },
    data: {
        list: [{
            title: '洗颜新潮流！人气洁面皂排行榜',
            img: require('../../static/images/02.jpg')
        }, {
            title: '美容用品 & 日用品（上）',
            img: require('../../static/images/03.jpg')
        }, {
            title: '远离车内毒气，日本车载空气净化器精选',
            img: require('../../static/images/04.jpg')
        }],
        imgUrl: require('../../static/images/05.jpg')
    }
})
