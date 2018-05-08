// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Group, XAddress, ChinaAddressV3Data, XButton, Cell, Value2nameFilter as value2name } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Group, XAddress, XButton, Cell },
    data: {
        title: '默认为空',
        value_0_1: [],
        value: [],
        title2: '设置值',
        value2: ['天津市', '市辖区', '和平区'],
        value3: ['广东省', '中山市', '--'],
        addressData: ChinaAddressV3Data,
        value4: [],
        value5: ['广东省', '深圳 市', '南山区']
    },
    methods: {
        changeData () {
            this.value2 = ['430000', '430400', '430407']
        },
        changeDataByLabels () {
            this.value2 = ['广东省', '广州市', '天河区']
        },
        changeDataByLabels2 () {
            this.value2 = ['广东省', '中山市', '--']
        },
        getName (value) {
            return value2name(value, ChinaAddressV3Data)
        },
        logHide (str) {
            console.log('on-hide', str)
        },
        logShow (str) {
            console.log('on-show')
        }
    }
})
