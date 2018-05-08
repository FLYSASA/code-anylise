// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Panel, Group, Radio } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Panel, Group, Radio },
    data: {
        type: '1',
        list: [{
            src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
            title: '标题一',
            desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
            url: '/component/cell',
            meta: {
                source: '新华社',
                date: '2017-07-30',
                other: '中国发布'
            }
        }, {
            src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
            title: '标题二',
            desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
            url: {
                path: '/component/radio',
                replace: false
            },
            meta: {
                source: '新华社',
                date: '2017-07-30',
                other: '中国发布'
            }
        }],
        footer: {
            title: '查看更多',
            url: 'http://vux.li'
        }
    }
})
