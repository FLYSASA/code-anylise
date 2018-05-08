/* eslint-disable */
var dataPath = 'sys:data/files' // 文件存储目录
var sysFilePath = 'file:'       // 手机系统目录
var bridgeState = '0'           // 桥接状态（0:初始状态/1:桥接完成）
var readyState = '0'            // 页面文档状态（0:初始状态/1:载入完成）
var timer

// 桥接js加载完成事件
document.addEventListener('plusready', function () {
    bridgeState = '1'
}, false)

// 页面加载状态改变事件
document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        readyState = '1'
    }
}

// 将页面的alert转为App的alert
var _windowAlert = window.alert
window.alert = function (msg) {
    isApp() ? ExMobiWindow.alert(msg) : _windowAlert(msg)
    // 页面应封装alert公共方法，以备调用
}

// 显示自隐藏消息
window.toast = function (msg) {
    isApp() ? execScript(`App.toast("${msg}") `) : _windowAlert(msg)
    // 页面应封装toast公共方法，以备调用
}

// 全局异常处理
window.onerror = function (err, file, line) {
    var msg = `发生异常：${err}\n位于：${file}\n第${line}行`
    console.error(msg)
    // 页面应封装记录异常的公共方法，以备调用
}

/**
 * 是否内嵌于App
 * @method App.isReady()
 */
function isApp () {
    return typeof (nativePage) !== 'undefined'
}

/**
 * 是否桥接完成
 * @method App.isReady()
 * @param {boolean} inApp 是否强制判断App桥接完成与否（不兼容HTML文档状态）
 */
function isReady (inApp) {
    if (inApp) {
        return isApp() && bridgeState === '1'
    }

    return isApp() ? (bridgeState === '1') : (readyState === '1')
}

/**
 * 执行App脚本
 * @method App.execScript
 * @param {string} script 要执行的脚本
 */
function execScript (script) {
    if (isApp()) {
        nativePage.executeScript(script)
    } else {
        // new Function(script)()
    }
}

/**
 * 执行调用本地能力的方法
 * @method App.execMethod
 * @param {function} method 要执行的函数句柄
 * @param {boolean} inApp 是否强制判断App桥接完成与否（不兼容HTML文档状态）
 */
function execMethod (method, inApp) {
    if (isReady(inApp)) {
        if (timer) {
            clearTimeout(timer)
        }
        method()
    } else {
        timer = setTimeout(function () {
            execMethod(method, inApp)
        }, 10)
    }
}

/**
 * 打开业务模块页面
 * @method App.openModule
 * @param {string} menuUrl 模块页面地址
 */
function openModule (moduleUrl) {
    if (isApp()) {
        execScript(`App.openModule("${moduleUrl}") `)
    } else {
        window.location = moduleUrl
    }
}

/**
 * 用webview打开页面
 * @method App.openPage
 * @param {string} menuUrl HTML页面地址
 */
function openPage (pageUrl) {
    if (isApp()) {
        execScript(`App.openPage("${pageUrl}") `)
    } else {
        window.location = pageUrl
    }
}

/**
 * 将路径转为sys:data路径，可用于ExMobi目录下的文件路径的处理
 * @method base.getSysPath
 * @param {string} originalPath 路径参数，一般是用户定义的存储文件的路径，如:oa/mail/xxx
 */
function getSysPath (originalPath) {
    if (originalPath.substr(0, 4) === 'sys:' || originalPath.substr(0, 4) === 'res:' || originalPath.substr(0, 5) === 'file:') {
        return originalPath
    } else if (originalPath) {
        return `${dataPath}/${originalPath}`
    }

    return ''
}

/**
 * 将路径转为file:手机系统目录文件的路径形式，可用于非ExMobi目录下的文件路径处理，如：选择文件后的路径处理
 * @method base.getFilePath
 * @param {string} originalPath 路径参数
 */
function getFilePath (originalPath) {
    if (originalPath.substr(0, 4) === 'sys:' || originalPath.substr(0, 4) === 'res:' || originalPath.substr(0, 5) === 'file:') {
        return originalPath
    } else if (originalPath) {
        return `${sysFilePath}${originalPath}`
    }

    return ''
}

/**
 * 根据文件或文件夹的原始路径（如：C:/MBuilder-IDE/plugins/.../ExMobi/data/xxx）获取系统路径（如：sys:data/xxx）和相对路径（如：../../../data/xxx）
 * @method base.getPaths
 * @param {string} originalPath 原始路径
 */
function getPaths (originalPath) {
    var startIdx = originalPath.indexOf('/ExMobi') + 7
    while (true) {
        if (originalPath.charAt(startIdx) === '/' || startIdx + 1 >= originalPath.length) {
            startIdx++
            break
        }
        startIdx++
    }

    var filePath = originalPath.substr(startIdx)
    var path = 'sys:' + filePath
    var url = ''

    startIdx = document.URL.indexOf('/ExMobi') + 7
    while (true) {
        if (document.URL.charAt(startIdx) === '/' || startIdx + 1 >= document.URL.length) {
            startIdx++
            break
        }
        startIdx++
    }

    var steps = document.URL.substr(startIdx).split('/').length - 1
    while (steps > 0) {
        url += '../'
        steps--
    }
    url += filePath

    return {
        path,
        url
    }
}

export default {
    dataPath,
    getPaths,
    getSysPath,
    getFilePath,
    isApp,
    isReady,
    execScript,
    execMethod,
    openModule,
    openPage
}
