**基本操作**部分，封装的是最基本的操作，如：判断是否App、是否桥接完成、执行App脚本、打开App窗口等。调用方式：<br/>
`App.方法名(参数)`

### isApp ()

当前`HTML`页面是否内嵌于`App`。

``` js
App.isApp()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | `true`：内嵌于`App`<br/>`false`：普通页面（未内嵌于`App`） |


---


### isReady ()

`App`的`Webview`框架中内嵌`HTML`页面时，如果`HTML`页面需要调用`App`本地能力，则要加载桥接类。本方法的返回值可用来判断桥接类是否加载完成。

只有桥接完成，才能在`HTML`页面中调用操作本地能力的方法。当`HTML`页面并非内嵌于`Webview`时，本方法则返回页面文档是否加载完成（`readyState == 'complete'`）。

``` js
App.isReady()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | `true`：桥接（或文档加载）完成<br/>`false`：桥接（或文档加载）未完成 |


---


### execScript (script)

执行`App`中定义的脚本（`App`的`uixml`文件中的脚本或它引用的`js`文件里的脚本方法），只有`App.isApp()`返回`true`（当前`HTML`页面是`App`内嵌页面）时才可调用本方法。

``` js
// 登录成功，跳转到首页
if (App.isApp()) {
    App.execScript('login()')
} else {
    window.location = './home/index.html'
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">script</span> | <span class="type type-string">String</span> | 要执行的脚本 |

无返回值。


---


### execMethod (method, inApp)

`App`内嵌页面，在桥接完成后，执行方法（一般是操作本地能力的方法）；普通`HTML`页面，在文档加载完成后执行方法。

``` js
function loadData () {
    var userData = App.cache.get('user')    // 获取App缓存
    var user = JSON.parse(userData)
    var ens = App.device.getEsn()   // 获取设备序列号
    var clientId = App.app.getClientId()    // 获取应用标识

    new Vue({
        el: "#app",
        data: {
            ens,
            clientId,
            user
        }
    })
}

App.execMethod(loadData)
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">method</span> | <span class="type type-function">Function</span> | 要在桥接完成（或文档加载文成）执行的`js`函数 |
| <span class="prop-key" style="white-space:nowrap;">inApp</span> | <span class="type type-boolean">Boolean</span> | 是否只判断App桥接状态（如果确定是App内嵌页面，请指定本参数为true） |

无返回值。


---


### openModule (moduleUrl, hasActiveEvent)

进入`App`某个业务模块页面的步骤是这样的：进入登录页`->`跳转到首页`->`跳转到业务模块页面。第二步跳转（从首页到业务模块页面的跳转），可以调用本方法来实现。

<p class="warning">
    本方法会打开App里内置的业务模块窗口（`module.uixml`），然后将业务模块页面内嵌于其中，进行显示。
    <br/>
    一般情况下，业务模块页面是一个单页，不再有真实的页面路径跳转。
    <br/>
    `App`的`Webview`中，不建议进行真实的页面路径跳转；若需要跳转，通过`App`打开新窗口来跳转。
</p>

``` js
// 进入成本系统的合同管理
App.openModule('ccmp/contact.html')

// 进入成本系统的付款管理
App.openModule('ccmp/pay.html')

// 进入运营系统的计划管理
App.openModule('pom/plan.html')
```

``` js
if (App.isApp()) {
    App.openModule('pom/plan.html')
} else {
    window.location = './pom/plan.html'
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">moduleUrl</span> | <span class="type type-string">String</span> | 模块页面地址，从`src/page`（或发布后的`dist`）目录的子级开始 |
| <span class="prop-key" style="white-space:nowrap;">hasActiveEvent</span> | <span class="type type-boolean">Boolean</span> | 页面是否支持激活事件，默认false；若设为true，则页面可以定义全局的激活事件，有关激活事件，请参考本页的window.onactive一节 |

无返回值。


---


### openPage (pageUrl, hasActiveEvent)

用`App`打开窗口的形式来打开内部的`HTML`页面（非网络路径），和`openModule`方法类似。

<p class="warning">
    本方法会创建一个`App`新窗口（动态构造.uixml），然后将`HTML`页面内嵌于新窗口中，进行显示。
    <br/>
    `App`的`Webview`中，不建议进行真实的页面路径跳转；若需要跳转，可以通过本方法来实现。
</p>

``` js
App.openPage('system/about/about.html')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">pageUrl</span> | <span class="type type-string">String</span> | 内部页面地址，从`src/page`（或发布后的`dist`）目录的子级开始 |
| <span class="prop-key" style="white-space:nowrap;">hasActiveEvent</span> | <span class="type type-boolean">Boolean</span> | 页面是否支持激活事件，默认false；若设为true，则页面可以定义全局的激活事件，有关激活事件，请参考本页的window.onactive一节 |

无返回值。


---


### window.onactive

页面激活事件。主页（登录成功后跳转到的页面）默认支持激活事件；App.openModule和App.openPage打开的页面，也可以根据参数决定是否支持激活事件。
若页面需要激活事件，则可以定义全局的window.onactive来进行处理。

``` js
// 页面激活事件
window.onactive = function (type) {
    var status
    if (type === '0') {
        status = '从非激活转为激活'
    } else if (type === '1') {
        status = '从后台转为前台'
    }
    vm ? (vm.status = status) : toast(status)
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | 激活动作，如：<br/>0：页面从非激活转为激活<br/>1：程序从后台切换到前台时 |

<p class="tip">
    一般主页需要定义激活事件，用来触发更新页面上的待办消息数量为最新值。
</p>


---


### window.onpush

消息推送事件。iOS系统下所有页面、Android系统下的主页（登录成功后跳转到的页面），支持消息推送事件。在有消息到达的时候，这些页面将触发全局事件window.onpush。

``` js
// 消息推送事件
window.onpush = function (msg) {
    // 提示消息
    alert(msg + '--- from SAPI')

    // 一般有以下处理步骤：
    // (1) 如果是苹果系统页面或者安卓系统的主页，则获取用户的最新的待办工作数量
    // (2) 如果当前页是主页面，则用获取到的数量来更新主页面上的待办工作数量
    // (3) 如果是iOS系统，则用获取到的数量来更新桌面App图标右上角的气泡角标数字
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">msg</span> | <span class="type type-string">String</span> | 推送消息的文本内容 |

<p class="tip">
    一般主页需要定义消息推送事件，用来触发更新页面上的待办消息数量为最新值；iOS系统的所有页面，都应定义消息推送事件，用来触发更新桌面上App图标右上角的气泡角标数字（可以在公共js中定义）。
</p>
