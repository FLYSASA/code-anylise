// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { XInput, Group, XButton, Cell } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { XInput, Group, XButton, Cell },
    data: {
        password: '123465',
        password2: '',
        valid1: false,
        valid2: false,
        iconType: '',
        be2333: function (value) {
            return {
                valid: value === '2333',
                msg: 'Must be 2333'
            }
        },
        style: '',
        disabledValue: 'hello',
        debounceValue: '',
        maxValue: ''
    },
    methods: {
        getValid1 () {
            this.valid1 = this.$refs.input01.valid
        },
        getValid2 () {
            this.valid2 = this.$refs.input02.valid
        },
        change (val) {
            console.log(val)
        },
        onBlur (val) {
            console.log('on blur', val)
        },
        onFocus (val) {
            console.log('on focus', val)
        }
    }
})
