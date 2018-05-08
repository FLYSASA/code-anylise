// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Datetime, DatetimeRange, Group, XButton } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Datetime, DatetimeRange, Group, XButton },
    data: {
        format: 'YYYY-MM-DD HH:mm',
        value1: '2015-11-12',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '2016-08-18',
        value7: '',
        value8: '',
        limitHourValue: '',
        startDate: '2015-11-11',
        endDate: '2017-10-11',
        formatValue: '2017-10-11',
        formatValueFunction (val) {
            return val.replace(/-/g, '$')
        },
        value: ['2017-01-15', '03', '05']
    },
    methods: {
        toggleFormat () {
            this.format = this.format === 'YYYY-MM-DD HH:mm' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'
        },
        reRender () {
            this.startDate = '2016-11-11'
            this.endDate = '2018-10-11'
        },
        change (value) {
            console.log('change', value)
        },
        clearValue (value) {
            this.$data.value6 = ''
        },
        clearValue8 (value) {
            this.$data.value8 = ''
        },
        setToday (value) {
            let now = new Date()
            let cmonth = now.getMonth() + 1
            let day = now.getDate()
            if (cmonth < 10) cmonth = '0' + cmonth
            if (day < 10) day = '0' + day
            this.$data.value7 = now.getFullYear() + '-' + cmonth + '-' + day
            console.log('set today ok')
        },
        onChange (val) {
            console.log('change', val)
        }
    }
})
