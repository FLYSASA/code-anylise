import utils from '../../../static/js/utils.js'
const loginInfo = 'loginInfo'
import * as filenames from '../config/filenames'

export function signOut () {
    utils.localStorage.remove(loginInfo)
    window.location.replace('../' + filenames.LOGIN)
}

export function signIn (data) {
    utils.localStorage.set(loginInfo, JSON.stringify(data))
    let redirect = utils.getQueryString('redirect')
    if (!redirect) {
        redirect = filenames.INDEX
    }

    window.location.replace('../' + redirect)
}
