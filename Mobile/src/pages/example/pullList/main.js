import createMain from '@/static/js/createMain.js'
import createRouter from '@/static/js/createRouter'
import routes from './routers'
import App from './app.vue'
import createI18n from '@/static/js/createI18n.js'
import {mergeImportsByModule} from '@/static/js/imports.js'
// 引入平台模块的多语言信息，各个模块引用不同，通过'@/static/i18n/plat/'来指定目录
const i18n = mergeImportsByModule(require.context('@/static/i18n/', true, /^\.\/plat\/.*\.js$/i))

createMain(App, createRouter(routes), createI18n(i18n))
