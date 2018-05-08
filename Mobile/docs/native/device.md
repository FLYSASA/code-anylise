**设备操作**部分，封装的是有关设备的操作，如：获取设备型号、获取设备序列号、获取操作系统信息、注册终端等。调用方式：<br/>
`App.device.方法名(参数)`

### getOsName ()

获取操作系统平台。

``` js
App.device.getOsName()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | `ios`：苹果系统<br/>`android`：安卓系统<br/>`wp8`：微软手机8系统 |


---


### getOsVersion ()

获取操作系统版本。

``` js
App.device.getOsVersion()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 操作系统的版本号 |


---


### getType ()

获取设备类型。

``` js
App.device.getType()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | `phone`：手机<br/>`pad`：平板<br/>`pc`：电脑 |


---


### getModel ()

获取设备型号。

``` js
App.device.getModel()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 设备型号，如：htc6950 |


---


### getEsn ()

获取设备序列号（iphone、wp8无法获得，返回的是内部自定义字符串）。

``` js
App.device.getEsn()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 设备序列号，如：863817032137021（安卓）、udid67fdcf375f7c2a05（苹果） |


---


### getMac ()

获取设备mac值（若不支持则返回null）。

``` js
App.device.getMac()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 设备mac值 |


---


### getApp (appId)

获取AppID获取App信息对象。

``` js
App.device.getApp('h5app')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">appId</span> | <span class="type type-string">String</span> | 应用插件id |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-object">Json</span> | App信息，格式如下：<br/>`{`<br/>　　`"status": "setup",`<br/>　　`"type": "client",`<br/>　　`"appid": "h5app",`<br/>　　`"appname": "赛普H5APP",`<br/>　　`"description": "hybird移动应用。",`<br/>　　`"localVersion": "1.1.34",`<br/>　　`"serverVersion": "1.1.34",`<br/>　　`"date": "2017-08-14"`<br/>`}` |


---


### register (options)

终端设备注册。

``` js
App.device.register({
    name: 'zhangsan',
    company: 'sapi',
    success: function (rsp) {
        // alert(JSON.stringify(rsp))
    },
    error: function (msg) {
        alert(msg)
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 注册信息参数，格式如下：<br/>`{`<br/>　　`name: 'zhangsan',`  // 注册名，一般为用户名<br/>　　`phone: '18632789568',`  // 手机号码<br/>　　`company: 'sapi',`  // 企业标识<br/>　　`success: succFun`  // 注册成功回调函数，参数是响应对象，一般不提供本回调函数<br/>　　`error: errFun`  // 注册失败回调函数，参数是错误信息<br/>`}` |

无返回值。