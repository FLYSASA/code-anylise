import Vue from 'vue'
import VueI18n from 'vue-i18n'
import utils from './utils.js'

Vue.use(VueI18n)
// 保存vue-i18n实例，在setI18nLocale方法中切换语言
var i18nInst = null

// 创建vue-i18n实例
export default function createI18n (messages) {
    const i18n = new VueI18n({
        locale: getI18nLocale(), // 语言标识
        fallbackLocale: 'zh-cn',
        messages
    })

    i18nInst = i18n
    return i18n
}

// 获知当前语言
export function getI18nLocale () {
    return i18nInst && i18nInst.locale || utils.localStorage.get('i18n-locale') || 'zh-cn'
}

// 设置当前语言
export function setI18nLocale (locale) {
    if (i18nInst && i18nInst.locale !== locale) {
        i18nInst.locale = locale
        document.querySelector('html').setAttribute('lang', locale)
        utils.localStorage.set('i18n-locale', locale)
    }
}

const loadedLanguages = ['zh-cn']

export function loadLanguageAsync (module, lang) {
    if (i18nInst && i18nInst.locale !== lang) {
        if (!loadedLanguages.includes(lang)) {
            return import(/* webpackChunkName: "lang-[request]" */ `@/static/i18n/${module}/${lang}`).then(msgs => {
                i18nInst.setLocaleMessage(lang, msgs.default)
                loadedLanguages.push(lang)
                return setI18nLocale(lang)
            })
        }
        return Promise.resolve(setI18nLocale(lang))
    }

    return Promise.resolve(lang)
}
