// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Search, XButton, Divider, XHeader } from 'vux'
import '@/pages/demo/static/js/loadcss.js'

function getResult (val) {
    let rs = []
    for (let i = 0; i < 20; i++) {
        rs.push({
            title: `${val} result: ${i + 1} `,
            other: i
        })
    }
    return rs
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { Search, XButton, Divider, XHeader },
    data: {
        results: [],
        value: 'test',
        autoFixed: false,
        value1: 'hello',
        value2: 'vux',
        imgUrl: require('../../static/images/filter_bg.jpg')
    },
    methods: {
        setFocus () {
            this.$refs.search.setFocus()
        },
        resultClick (item) {
            window.alert('you click the result item: ' + JSON.stringify(item))
        },
        onChange (val) {
            this.results = val ? getResult(this.value) : []
        },
        onSubmit () {
            this.$vux.toast.show({
                type: 'text',
                position: 'top',
                text: 'on submit'
            })
        },
        onFocus () {
            console.log('on focus')
        },
        onCancel () {
            console.log('on cancel')
        }
    }
})
