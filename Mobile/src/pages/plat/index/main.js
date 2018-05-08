import createMain from '@/static/js/createMain.js'
import createRouter from '@/static/js/createRouter'
import routes from './routes'
import createI18n from '@/static/js/createI18n.js'
import App from './app.vue'
import {mergeImportsByModule} from '@/static/js/imports.js'
import utils from '@/static/js/utils.js'
import {getLoginInfo} from '@/static/js/sign.js'
import {loginPage, homePage} from '@/static/js/config.js'

// 引入平台模块的多语言信息，各个模块引用不同，通过'@/static/i18n/plat/'来指定目录
const i18n = mergeImportsByModule(require.context('@/static/i18n/', true, /^\.\/plat\/.*\.js$/i))

let beforeEach = function (to, from, next, delay) {
    if (homePage !== 'index.html') {
        window.location.replace('/' + homePage)
        return
    }

    if (to.matched.some(record => { return utils.isBoolean(record.meta.requiresAuth) ? record.meta.requiresAuth : true })) {
        var loginInfo = getLoginInfo()
        if (loginInfo && !utils.isEmpty(loginInfo.access_token)) {
            next()
        } else {
            window.location.replace(utils.setQueryString({ redirect: window.location.href }, loginPage))
        }
    }
}

createMain(App, createRouter(routes, beforeEach), createI18n(i18n))
