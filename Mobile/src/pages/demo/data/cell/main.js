// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Cell, CellBox, CellFormPreview, Group } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Cell, CellBox, CellFormPreview, Group },
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
        }],
        money: null,
        showContent001: false,
        showContent002: false,
        showContent003: false,
        showContent004: false
    },
    mounted () {
        setTimeout(() => {
            this.money = -1024
        }, 2000)
    },
    methods: {
        onClick () {
            console.log('on click')
        }
    }
})
