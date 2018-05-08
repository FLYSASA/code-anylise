// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/pages/demo/static/js/loadcss.js'

const list = [{
    name: 'Airyland',
    avatar: require('../../static/images/c1.jpg'),
    time: '昨天',
    like_num: 99,
    content: '沙发',
    has_praised: true,
    reply_list: [{
        content: '恭喜~',
        time: '今天早上'
    }]
}, {
    name: 'Vux',
    avatar: require('../../static/images/c2.jpg'),
    time: '未来时间',
    like_num: 0,
    content: '板凳'
}, {
    name: 'Secret',
    avatar: require('../../static/images/c3.jpg'),
    time: '未来时间',
    like_num: 99,
    content: '居然没抢到沙发'
}, {
    name: 'Secret',
    avatar: require('../../static/images/c4.jpg'),
    time: '未来时间',
    like_num: 99,
    content: '抢到板凳也不错'
}]

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        list: list
    },
    methods: {
        praise (item) {
            if (!item.has_praised) {
                item.like_num++
                item.has_praised = true
                console.log(JSON.stringify(item))
            }
        }
    }
})
