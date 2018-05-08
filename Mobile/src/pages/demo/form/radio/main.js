// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Radio, PopupRadio, Group } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Radio, PopupRadio, Group },
    data: {
        radio001: ['China', 'Japan'],
        radio001Value: 'China',
        radio002Value: 'Japan',
        radio003: [{
            icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
            key: '001',
            value: 'radio001'
        }, {
            icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
            key: '002',
            value: 'radio002'
        }],
        option1: 'A',
        options1: ['A', 'B', 'C'],
        option2: '',
        options2: [{
            key: 'A',
            value: 'label A'
        }, {
            key: 'B',
            value: 'label B'
        }]
    },
    methods: {
        change (value) {
            console.log('change:', value)
        }
    }
})
