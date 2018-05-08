// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Selector, Group } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Selector, Group },
    data: {
        demo01: '',
        demo02: '',
        defaultValue: '',
        plainList: ['广东', '广西'],
        list: [{ key: 'gd', value: '广东' }, { key: 'gx', value: '广西' }],
        list2: [{ key: true, value: '是' }, { key: false, value: '否' }],
        value1: '广西',
        value2: 'gd',
        value3: true,
        list1: ['A', 'B', 'C']
    },
    methods: {
        onChange (val) {
            console.log(val)
        }
    }
})
