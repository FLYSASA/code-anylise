// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
require('@/pages/demo/static/js/loadcss.js')
import 'vux/src/styles/center.less'

const list = () => ['精选', '美食', '电影', '酒店', '外卖']

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem },
    data: {
        list2: list(),
        demo2: '美食',
        list3: ['收到的消息', '发出的消息'],
        demo3: '收到的消息',
        list4: ['正在正映', '即将上映'],
        demo4: '即将上映',
        demoDisabled: 'A',
        index: 0,
        getBarWidth: function (index) {
            return (index + 1) * 22 + 'px'
        }
    },
    methods: {
        onItemClick (index) {
            console.log('on item click:', index)
        },
        addTab () {
            if (this.list2.length < 5) {
                this.list2 = list().slice(0, this.list2.length + 1)
            }
        },
        removeTab () {
            if (this.list2.length > 1) {
                this.list2 = list().slice(0, this.list2.length - 1)
            }
        },
        next () {
            if (this.index === this.list2.length - 1) {
                this.index = 0
            } else {
                ++this.index
            }
        },
        prev () {
            if (this.index === 0) {
                this.index = this.list2.length - 1
            } else {
                --this.index
            }
        }
    }
})
