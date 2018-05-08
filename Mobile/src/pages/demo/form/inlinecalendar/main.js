// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { InlineCalendar, Group, XSwitch, Radio, XButton, Cell, Divider } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { InlineCalendar, Group, XSwitch, Radio, XButton, Cell, Divider },
    data: {
        show: true,
        value: '',
        listValue: '',
        range: false,
        showLastMonth: true,
        showNextMonth: true,
        highlightWeekend: false,
        return6Rows: true,
        hideHeader: false,
        hideWeekList: false,
        replaceTextList: {},
        replace: false,
        changeWeeksList: false,
        weeksList: [],
        useCustomFn: false,
        buildSlotFn: () => '',
        disablePast: false,
        disableFuture: false
    },
    watch: {
        replace (val) {
            this.replaceTextList = val ? {
                'TODAY': '今'
            } : {}
        },
        useCustomFn (val) {
            this.buildSlotFn = val ? (line, index, data) => {
                return /8/.test(data.day) ? '<div style="font-size:12px;text-align:center;"><span style="display:inline-block;width:5px;height:5px;background-color:red;border-radius:50%;"></span></div>' : ''
            } : () => ''
        },
        changeWeeksList (val) {
            this.weeksList = val ? ['日', '一', '二', '三', '四', '五', '六 '] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
        }
    }
})
