// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Group, Checklist, Cell, Divider, XButton, CheckIcon } from 'vux'
import '@/pages/demo/static/js/loadcss.js'
import _ from 'lodash'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Group, Checklist, Cell, Divider, XButton, CheckIcon },
    data: {
        labelPosition: '',
        error: '',
        commonList: ['China', 'Japan', 'America'],
        checklist001: [],
        checklist0011: [],
        checklist002: ['China', 'Japan'],
        checklist003: ['China', 'Japan'],
        checklist005: ['01', '02', '03'],
        checklist005Value: [],
        objectList: [{ key: '1', value: '001 value' }, { key: '2', value: '002 value' }, { key: '3', value: '003 value' }],
        objectListValue: ['1', '2'],
        asyncList: [],
        asyncListValue: [],
        demo1: false,
        demo2: true
    },
    methods: {
        change (val) {
            console.log('change', val)
        },
        onError (errors) {
            console.log(errors)
            this.error = errors
        },
        onNoError () {
            this.error = null
        },
        selectFirst () {
            this.checklist001 = ['China']
        },
        selectFirstTwo () {
            this.checklist001 = ['China', 'Japan']
        },
        selectLeft () {
            const left = _.without.apply(_, [this.commonList].concat(this.checklist001))
            this.checklist001 = left
        }
    },
    mounted () {
        setTimeout(() => {
            this.asyncList = ['A', 'B', 'C', 'D']
        }, 3000)
    }
})
