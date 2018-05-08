import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from './utils.js'
import {getLoginInfo} from './sign.js'
import {loginPage} from './config.js'
// 注册为全局组件
Vue.use(VueRouter)

export default function createRouter (routes, beforeEach, afterEach) {
    const router = new VueRouter({
        mode: 'hash',
        routes
    })

    let delay

    router.beforeEach((to, from, next) => {
        if (delay) {
            delay.stop()
        }

        delay = utils.delay(function () {
            Vue.$vux.loading && Vue.$vux.loading.show('')
        }, function () {
            Vue.$vux.loading && Vue.$vux.loading.hide()
        }, 500)

        delay.start()

        if (utils.isFunction(beforeEach)) {
            return beforeEach(to, from, next, delay)
        } else if (to.matched.some(record => { return utils.isBoolean(record.meta.requiresAuth) ? record.meta.requiresAuth : true })) {
            var loginInfo = getLoginInfo()
            if (loginInfo && !utils.isEmpty(loginInfo.access_token)) {
                next()
            } else {
                window.location.replace(utils.setQueryString({ redirect: window.location.href }, loginPage))
            }
        } else {
            next()
        }
    })

    router.afterEach(function (to) {
        delay.stop()
        delay = null

        if (utils.isFunction(afterEach)) {
            afterEach(to)
        }
    })

    return router
}
