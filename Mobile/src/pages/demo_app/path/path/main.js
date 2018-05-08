import App from '@/static/js/app'
import Vue from 'vue'
import baseUrl from './img'
import '../../static/css/base.css'

/* eslint-disable */
new Vue({
    el: '#app',
    data: {
        img2: require('../../static/images/gauge/gauge.png'),
        img3: require('../../static/images/gauge/gauge1.png'),
        img4: require('../../static/images/no.png'),
        img5: baseUrl.img3
    },
    methods: {
        back () {
            App.app.back()
        }
    }
})
