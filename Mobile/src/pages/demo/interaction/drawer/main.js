// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Drawer from '@/components/control/drawer/Drawer.vue'
import '@/pages/demo/static/js/loadcss.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Drawer },
    data: {
        pos: 'left',
        tran: 'overlay',
        drawerShow: false,
        navItems: [
            'decide the width u like',
            'Item2',
            'Item3',
            'Item4',
            'Item5'
        ]
    },
    methods: {
        directionFlip () {
            this.pos = this.pos === 'left' ? 'right' : 'left'
            setTimeout(() => {
                this.drawerToggle()
            }, 500)
        },
        tranFlip () {
            this.tran = this.tran === 'overlay' ? 'push' : 'overlay'
            setTimeout(() => {
                this.drawerToggle()
            }, 0)
        },
        drawerToggle () {
            this.drawerShow = !this.drawerShow
        },
        onHide () {
            console.log('hide')
        },
        changeDrawerShow (state) {
            this.drawerShow = state
            console.log('drawer was changed from components')
        },
        onShow () {
            console.log('show')
        }
    }
})
