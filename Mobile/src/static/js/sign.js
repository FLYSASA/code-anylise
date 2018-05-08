import utils from '@/static/js/utils.js'
import {homePage, loginPage} from './config.js'

const loginKey = 'loginInfo'
export function signOut () {
    utils.localStorage.remove(loginKey)
    window.location.replace(loginPage)
}

export function signIn (data) {
    utils.localStorage.set(loginKey, JSON.stringify(data))
    let redirect = utils.getQueryString('redirect')
    if (!redirect) {
        redirect = homePage
    }

    window.location.replace(redirect)
}

export function isSignIn () {
    let loginInfo = utils.localStorage.get(loginKey)

    if (utils.isEmpty(loginInfo)) {
        return false
    }

    return true
}

export function getLoginInfo () {
    let loginInfo = utils.localStorage.get(loginKey)

    if (utils.isEmpty(loginInfo)) {
        return null
    }

    return JSON.parse(loginInfo)
}

