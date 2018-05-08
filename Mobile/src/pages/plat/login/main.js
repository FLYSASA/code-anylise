import createMain from '@/static/js/createMain.js'
import createI18n from '@/static/js/createI18n.js'
import {mergeImportsByModule} from '@/static/js/imports.js'
import Login from './app.vue'

// 引入平台模块的多语言信息，各个模块引用不同
const i18n = mergeImportsByModule(require.context('@/static/i18n/', true, /^\.\/plat\/.*\.js$/i))

createMain(Login, null, createI18n(i18n))
