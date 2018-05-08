**应用操作**部分，封装的是有关App应用的操作，如：获取App的版本、获取客户端ID、更新关闭App等。调用方式：<br/>
`App.app.方法名(参数)`

### getAppId ()

获取当前页面所属App的ID。

``` js
App.app.getAppId()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 应用插件的id标识，如：h5app |


---


### getAppName (appId)

根据App的ID获取App的名称。

``` js
App.app.getAppName('h5app')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">appId</span> | <span class="type type-string">String</span> | 应用插件id，不指定时获取当前App的名称 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 应用插件的名称，如：赛普H5APP |


---


### getAppVersion (appId)

根据App的ID获取App的（本地）版本号。

``` js
App.app.getAppVersion('h5app')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">appId</span> | <span class="type type-string">String</span> | 应用插件id，不指定时获取当前App的版本号 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 应用插件的版本号，如：1.1.34 |


---


### getAppServerVersion (options)

根据App的ID获取App的服务器端版本号。

``` js
App.app.getAppServerVersion({
    appID: 'h5app',
    callback: function(result) {
        if (result.code === '0') {
            alert(result.data)  // App的服务端版本号，如：2.1.3
        } else {
            alert(result.msg)
        }
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`appId: 'h5app',`  // 应用插件id，不指定时获取当前App的服务器端版本号<br/>　　`callback: callbackFun`  // 回调函数，参数是标准接口结果类型<br/>`}` |

无返回值。


---


### getExmobiVersion ()

获取客户端引擎的版本号。

``` js
App.app.getExmobiVersion()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 当前客户端所依赖基座的版本号，如：5.15.1.0 |


---


### getClientId ()

获取App的客户端标识、客户端ID。

``` js
App.app.getClientId()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 客户端ID，如：gaeaclient-android-000004、gaeaclient-ios-edn17136 |


---


### getBadge ()

iOS版App获取桌面应用图标气泡角标数字。

``` js
App.app.getBadge()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-number">Number</span> | 气泡角标数字，非iOS版App获取时为0 |


---


### setBadge (number)

设置iOS版App桌面应用图标气泡角标数字。

``` js
App.app.setBadge(8)
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">number</span> | <span class="type type-number">Number</span> | 气泡角标数字 |

无返回值。


---


### updateApp ()

更新App，一般在App的服务器端版本高于本地版本时调用本方法进行App更新。

``` js
App.app.updateApp()
```

无返回值。


---


### back ()

回退，`HTML`页面内嵌于`Webview`时如要回退，请调用本方法。

``` js
App.app.back()
```

无返回值。


---


### quit ()

退出App登录，回到登录页。

``` js
App.app.quit()
```

无返回值。


---


### exit (msg)

关闭App。

``` js
App.app.exit(msg)
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">msg</span> | <span class="type type-string">String</span> | 关闭App时的alert弹出提示文本，若不提供则直接关闭 |

无返回值。


---


### restart ()

重新启动App。

``` js
App.app.restart()
```

无返回值。