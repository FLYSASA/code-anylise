var demoUrl = 'http://172.56.2.230:83/demo'
var config = {
    // home: '/README.md',
    nav: [
        {
            title: '首页', path: '/'
        }, {
            title: '组件',
            type: 'dropdown',
            items: [
                { title: '表单组件', path: '/components/form' },
                { title: '布局组件', path: '/components/layout' },
                { title: '数据组件', path: '/components/data' },
                { title: '交互组件', path: '/components/interaction' },
                { title: '其他效果示例', path: '/components/other' },
                { title: '自定义组件', path: '/components/custom' }
            ]
        }, {
            title: '公共模块',
            type: 'dropdown',
            items: [
                { title: 'request异步请求', path: '/modules/request' },
                { title: '公共核心方法', path: '/modules/core' },
                { title: '公共注入类方法', path: '/modules/mixin' },
                { title: '公共指令', path: '/modules/directives' },
                { title: '数据模型效验', path: '/modules/dataSchemaChecker' },
                { title: '树形数据代理', path: '/modules/treeDataProxy' },
                { title: 'vue-router', path: '/modules/router' },
                { title: 'vux组件配色', path: '/modules/theme' },
                { title: '原子样式类', path: '/modules/class' }
            ]
        }, {
            title: 'h5测试',
            type: 'dropdown',
            items: [
                { title: '单元测试', path: '/test/unitTest' },
                { title: '后端api测试', path: '/test/apiTest' },
                { title: 'e2e测试', path: '/test/e2eTest' }
            ]
        }, {
            title: '本地能力',
            type: 'dropdown',
            items: [
                { title: '概述', path: '/native/desc' },
                { title: '基本操作', path: '/native/base' },
                { title: '设备操作', path: '/native/device' },
                { title: '应用操作', path: '/native/app' },
                { title: '缓存操作', path: '/native/cache' },
                { title: '通讯操作', path: '/native/contact' },
                { title: '定位操作', path: '/native/position' },
                { title: '文件操作', path: '/native/file' },
                { title: '图片操作', path: '/native/photo' },
                { title: '数据库操作', path: '/native/db' },
                { title: '多媒体操作', path: '/native/media' },
                { title: '网络操作', path: '/native/net' },
                { title: '消息处理', path: '/native/message' },
                { title: '第三方集成', path: '/native/third' }
            ]
        }, {
            title: 'H5开发流程',
            path: '/flow/h5'
        }, {
            title: 'APP开发流程',
            path: '/flow/app'
        }
    ]
}

function showInlineDemo (demo, url) {
    return function () {
        var divDemo = document.getElementById('divDemo')
        var divQRCode = document.getElementById('divQRCode')
        if (!divDemo) {
            divDemo = document.createElement('div')
            divDemo.setAttribute('id', 'divDemo')
            divDemo.setAttribute('style', 'width:377px;height:667px;border:1px dashed #666;border-radius:5px;overflow:hidden;')
            divDemo.innerHTML = '<iframe id="ifrDemo" width="375" height="667" border="0" frameborder="0"></iframe>'
            document.body.appendChild(divDemo)
        }
        divQRCode && (divQRCode.style.display = 'none')

        var ifrDemo = document.getElementById('ifrDemo')
        if (ifrDemo.src !== url) {
            divDemo.style.display = ''
            demo.insertAdjacentElement('afterEnd', divDemo)
            ifrDemo.src = url
        } else {
            divDemo.style.display = divDemo.style.display === 'none' ? '' : 'none'
        }
    }
}

function showDemoQRCode (demo, url) {
    return function () {
        var divQRCode = document.getElementById('divQRCode')
        var divDemo = document.getElementById('divDemo')
        if (!divQRCode) {
            divQRCode = document.createElement('div')
            divQRCode.setAttribute('id', 'divQRCode')
            divQRCode.setAttribute('style', 'width:220px;height:220px;border:1px solid #666;border-radius:5px;padding:10px;overflow:hidden;')
            document.body.appendChild(divQRCode)
        }
        divDemo && (divDemo.style.display = 'none')

        if (divQRCode.getAttribute('url') !== url) {
            divQRCode.style.display = ''
            divQRCode.innerHTML = ''

            /* eslint-disable */
            new QRCode(divQRCode, {
                text: url,
                correctLevel: QRCode.CorrectLevel.L,
                width: 200,
                height: 200
            })

            divQRCode.setAttribute('url', url)
            demo.insertAdjacentElement('afterEnd', divQRCode)
        } else {
            divQRCode.style.display = divQRCode.style.display === 'none' ? '' : 'none'
        }
    }
}

function initDemo () {
    var demos = document.getElementsByClassName('demo-tip')
    if (demos.length && !demos[0].getAttribute('inited')) {
        for (var i = 0; i < demos.length; i++) {
            var demo = demos[i]
            var btn = demo.getElementsByTagName('button')
            var aHref = demo.getElementsByTagName('a')
            var url = demoUrl + demo.getAttribute('key') + '.html'
            aHref.length && (aHref[0].href = url)
            btn.length && (btn[0].onclick = showInlineDemo(demo, url))
            btn.length > 1 && (btn[1].onclick = showDemoQRCode(demo, url))
            demo.setAttribute('inited', '1')
        }
    }
}

/* eslint-disable */
Vue.mixin({
    updated: function () {
        if (/components\/(form|layout|data|interaction|other)/.test(this.$route.path)) {
            initDemo()
        }
    }
})

docute.init(config)
