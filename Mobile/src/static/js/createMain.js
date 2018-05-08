// 直接babel-polyfill填充所有功能会导致文件过大
// import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import FastClick from 'fastclick'
import { ToastPlugin, ConfirmPlugin, LoadingPlugin, AlertPlugin } from 'vux'
import '@/static/css/common.less'

// 注册为全局组件
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)

FastClick.attach(document.body)

Vue.config.productionTip = false

/**
 * 程序创建路口
 * @param {vue component} App 跟组件
 * @param {Router instance} router 路由对象
 * @param {VueI18n} i18n 多语言实例对象
 */
export default function createMain (App, router, i18n) {
    const options = {
        el: '#app',
        render: h => h(App)
    }

    if (router) {
        options['router'] = router
    }

    if (i18n) {
        options['i18n'] = i18n
    }

    /* eslint-disable no-new */
    return new Vue(options)
}
