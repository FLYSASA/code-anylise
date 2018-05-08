// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Msg, Divider, XButton } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Msg, Divider, XButton },
    data: {
        description: 'msg description',
        icon: ''
    },
    computed: {
        buttons: function () {
            return [{
                type: 'primary',
                text: '推荐操作',
                onClick: this.changeIcon
            }, {
                type: 'default',
                text: '辅助操作',
                link: '/demo.html'
            }]
        }
    },
    methods: {
        changeIcon () {
            if (!this.icon || this.icon === 'success') {
                this.icon = 'warn'
                return
            }
            if (this.icon === 'warn') {
                this.icon = 'info'
                return
            }
            if (this.icon === 'info') {
                this.icon = 'waiting'
                return
            }
            if (this.icon === 'waiting') {
                this.icon = 'success'
            }
        }
    }
})
