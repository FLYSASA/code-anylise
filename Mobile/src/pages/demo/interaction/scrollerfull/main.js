// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Scroller, Masker } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Scroller, Masker },
    data: {
        list: [{
            title: '洗颜新潮流！人气洁面皂排行榜',
            img: require('../../static/images/02.jpg')
        }, {
            title: '美容用品 & 日用品（上）',
            img: require('../../static/images/03.jpg')
        }, {
            title: '日本车载空气净化器精选',
            img: require('../../static/images/04.jpg')
        }, {
            title: '洗颜新潮流！人气洁面皂排行榜',
            img: require('../../static/images/05.jpg')
        }, {
            title: '美容用品 & 日用品（上）',
            img: require('../../static/images/06.jpg')
        }, {
            title: '日本车载空气净化器精选',
            img: require('../../static/images/07.jpg')
        }, {
            title: '新华社发文警告印度越界：不要执迷不悟',
            img: require('../../static/images/11.jpg')
        }, {
            title: '朝鲜被指钻制裁空子向中国出口铁矿石',
            img: require('../../static/images/12.jpg')
        }, {
            title: '深圳打造“大前海” 自贸片区规划出炉',
            img: require('../../static/images/13.jpg')
        }, {
            title: '奔驰宝马奥迪半年总销量超85万',
            img: require('../../static/images/14.jpg')
        }, {
            title: '减速带是如何教跑车做人的',
            img: require('../../static/images/15.jpg')
        }, {
            title: '高铁网上订餐7月17日开起',
            img: require('../../static/images/16.jpg')
        }, {
            title: '中国制造迎来新契机',
            img: require('../../static/images/17.jpg')
        }]
    }
})
