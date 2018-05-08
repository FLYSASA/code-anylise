// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Checker, CheckerItem, Divider, Group, Cell, Popup } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Checker, CheckerItem, Divider, Group, Cell, Popup },
    data: {
        items1: [{
            key: '1',
            value: 'A'
        }, {
            key: '2',
            value: 'B'
        }, {
            key: '3',
            value: 'C'
        }],
        demo1: '',
        demo11: null,
        demo12: { key: '2', value: 'B' },
        demo21: null,
        demo22: [{ key: '2', value: 'B' }],
        demo23: null,
        demo1Checkbox: [2, 1],
        demo1CheckboxMax: ['2', '3'],
        demo2: '2',
        demo3: '',
        demo4: '花跟叶',
        showPopup: false,
        demo5: 1,
        demo6: [2, 3]
    },
    methods: {
        onItemClick (value, disabled) {
            console.log(value, disabled)
            if (!this.disabled) {
                this.showPopup = false
            }
        }
    }
})
