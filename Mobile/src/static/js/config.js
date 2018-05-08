let apiUrl = 'http://172.56.4.111:1006'
let isApp = false
const timeout = 20000
const pageSize = 15
const tokenExpireInterval = 1800
// 登录授权
const loginAuthorization = 'TW9iaWxlQXBwOnNhcGlAMTIzNA=='
// 指定跳转首页：默认是平台的首页
const homePage = 'index.html'
// 指定登录页面
const loginPage = 'login.html'
// 默认显示标题栏底边框
const showHeaderBorderBottom = true
// 默认启用标题栏和首页底部tabbar透明磨砂效果
const useFrosted = true

export {
    apiUrl,
    isApp,
    timeout,
    pageSize,
    tokenExpireInterval,
    loginAuthorization,
    homePage,
    loginPage,
    showHeaderBorderBottom,
    useFrosted
}

