**网络操作**部分，封装的是有关网络的操作。调用方式：<br/>
`App.net.方法名(参数)`

### isNetConnected ()

判断是否有网络连接。

``` js
App.net.isNetConnected()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | 是否有可用网络连接，true/false |


---


### getConnectionType ()

获取设备当前的网络连接类型。

``` js
App.net.getConnectionType()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-number">Number</span> | 当前的网络连接类型，0:无网络连接/1:WIFI无线网络/2:移动网络 |


---


### getNetIp ()

获取当前网络分配的ip地址。

``` js
App.net.getNetIp()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 当前网络分配的ip地址 |


---


### openNetSetting ()

打开安卓系统的网络设置界面。

``` js
App.net.openNetSetting()
```

无返回值。