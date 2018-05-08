// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

const baseList = [{
    url: 'javascript:',
    img: require('../../static/images/08.jpg'),
    title: '送你一朵花'
}, {
    url: 'javascript:',
    img: require('../../static/images/09.jpg'),
    title: '送你一辆车'
}, {
    url: 'javascript:',
    img: require('../../static/images/10.jpg'),
    title: '送你一次旅行'
}]

const imgList = [
    require('../../static/images/800_300_r.png'),
    require('../../static/images/800_300_y.png'),
    require('../../static/images/800_300_g.png')
]

const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    title: `(可点击)${item.title}`
}))

const demoList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
}))

const only2List = baseList.slice(0, 2)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Swiper, GroupTitle, SwiperItem, XButton, Divider },
    data: {
        demo01_list: baseList,
        demo02_list: demoList,
        demo03_list: demoList,
        demo04_list: imgList,
        demo05_list: [],
        demo06_list: urlList,
        demo07_list: only2List,
        demo01_index: 0,
        demo02_index: 1,
        demo05_index: 0,
        demo06_index: 0,
        demo07_index: 0,
        swiperItemIndex: 1
    },
    mounted () {

    },
    methods: {
        onSwiperItemIndexChange (index) {
            console.log('demo item change', index)
        },
        demo01_onIndexChange (index) {
            this.demo01_index = index
        },
        demo05_onIndexChange (index) {
            this.demo05_index = index
        },
        demo05_onLoad (id) {
            this.demo05_list = id === 1 ? baseList : demoList
        },
        demo06_onIndexChange (index) {
            this.demo06_index = index
        },
        demo07_onIndexChange (index) {
            this.demo07_index = index
        }
    }
})
