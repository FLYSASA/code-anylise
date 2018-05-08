import App from '@/static/js/app'
import '../../../static/css/base.css'
import './location.css'
import Vue from 'vue'

/* eslint-disable */
new Vue({
    el: '#app',
    methods: {
        back () {
            App.app.back()
        }
    }
})