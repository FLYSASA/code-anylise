// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { querystring } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

console.log(querystring.parse())

/* eslint-disable no-new */
new Vue({
    el: '#app',
    filters: querystring,
    data: {
        query1: {
            name: '张三',
            age: 18
        },
        query2: 'name=李四&age=20',
        query3: '王五',
        query4: '%E5%BC%A0%E4%B8%89'
    }
})
