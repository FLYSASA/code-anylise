// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { PopupPicker, Group, Cell, Picker, XButton, Divider, XSwitch } from 'vux'
import '../../static/css/demo-icon.css'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { PopupPicker, Group, Cell, Picker, XButton, Divider, XSwitch },
    data: {
        title1: '手机机型',
        title2: '详细机型',
        title3: '联动显示值',
        title4: '联动显示文字',
        list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
        list2: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你'], ['小米1', 'iPhone2', '华为3', '情怀4', '三星5', '其他6', '不告诉你7']],
        list3: [{
            name: '中国',
            value: 'china',
            parent: 0
        }, {
            name: '美国',
            value: 'USA',
            parent: 0
        }, {
            name: '广东',
            value: 'china001',
            parent: 'china'
        }, {
            name: '广西',
            value: 'china002',
            parent: 'china'
        }, {
            name: '美国001',
            value: 'usa001',
            parent: 'USA'
        }, {
            name: '美国002',
            value: 'usa002',
            parent: 'USA'
        }, {
            name: '广州',
            value: 'gz',
            parent: 'china001'
        }, {
            name: '深圳',
            value: 'sz',
            parent: 'china001'
        }, {
            name: '广西001',
            value: 'gx001',
            parent: 'china002'
        }, {
            name: '广西002',
            value: 'gx002',
            parent: 'china002'
        }, {
            name: '美国001_001',
            value: '0003',
            parent: 'usa001'
        }, {
            name: '美国001_002',
            value: '0004',
            parent: 'usa001'
        }, {
            name: '美国002_001',
            value: '0005',
            parent: 'usa002'
        }, {
            name: '美国002_002',
            value: '0006',
            parent: 'usa002'
        }],
        value1: ['iPhone'],
        value1_1: ['iPhone'],
        value2: ['iPhone', '华为3'],
        value3: [],
        value4: [],
        showPopupPicker: false,
        value5: ['2'],
        switch6: false,
        value6: [],
        formatDemoValue: ['01', '12'],
        format: function (value, name) {
            return `${value[0]}:${value[1]}`
        }
    },
    methods: {
        onChange (val) {
            console.log('val change', val)
        },
        changeList10 () {
            this.list1 = [['小米1', 'iPhone1', '华为1', '情怀1', '三星1', '其他1', '不告诉你1']]
        },
        changeList11 () {
            this.list1[0].push('我是push条目')
        },
        changeList20 () {

        },
        changeList21 () {
            this.list3.push({
                name: '美国002_007',
                value: '0007',
                parent: 'usa002'
            })
        },
        onShow () {
            console.log('on show')
        },
        onHide (type) {
            console.log('on hide', type)
        }
    }
})
