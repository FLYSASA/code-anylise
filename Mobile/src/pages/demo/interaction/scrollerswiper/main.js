// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Scroller, Swiper } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Scroller, Swiper },
    data: {
        list: [{
            url: '',
            img: require('../../static/images/08.jpg'),
            title: '如何手制一份秋意的茶？'
        }, {
            url: '',
            img: require('../../static/images/09.jpg'),
            title: '茶包VS原叶茶'
        }, {
            url: '',
            img: require('../../static/images/10.jpg'),
            title: '播下茶籽，明春可发芽？'
        }]
    },
    mounted () {
        this.$nextTick(() => {
            this.$refs.scroller.reset()
        })
    },
    methods: {
        load (uuid) {
            setTimeout(() => {
                this.$refs.scroller.donePulldown()
            }, 1000)
        }
    }
})
