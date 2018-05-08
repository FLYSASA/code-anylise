// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { CellFormPreview, Group, Cell } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { CellFormPreview, Group, Cell },
    data: {
        list: [{
            label: 'Apple',
            value: '3.29'
        }, {
            label: 'Banana',
            value: '1.04'
        }, {
            label: 'Fish',
            value: '8.00'
        }]
    }
})
