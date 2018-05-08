**定位操作**部分，封装的是有关定位的操作。调用方式：<br/>
`App.position.方法名(参数)`

### getPositionInfo ()

获取定位信息。

``` js
App.position.getPositionInfo()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-object">Json</span> | 定位信息，格式如下：<br/>`{`<br/>　　`"cellInfo":{`<br/>　　　　`"cellId": "16960",`// 基站号<br/>　　　　`"countryCode": "460",`// 国家码<br/>　　　　`"networkCode": "00",`// 网络码<br/>　　　　`"locationAreaCode": "20989",`// 位置区域码<br/>　　　　`"radioType": "gsm",`// 无线网络类型，gsm/cdma<br/>　　`},`<br/>　　`"gpsState": true,`// 系统GPS选项是否打开，true/false<br/>　　`"netGpsState": true`// 无线网络定位功能是否打开，true/false<br/>`}` |


---


### openGpsSetting ()

打开系统GPS定位设置界面。

``` js
App.position.openGpsSetting()
```

无返回值。


---


### startLocate (callback)

开始定位。

<p class="warning">
    暂时全部采用卫星定位，安卓在室内或封闭的场所会定位失败，后期改进（室内采用基站定位，室外采用卫星定位）。
</p>

``` js
App.position.startLocate(function (data) {
    if (data.code === "0") {
        alert(JSON.stringify(data.data))
    } else {
        alert(data.msg)
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">callback</span> | <span class="type type-function">Function</span> | 定位回调函数，参数是标准接口结果类型，格式如下：<br/>`{`<br/>　　`code: "-1",`// 定位是否成功，0或-1<br/>　　`data: {`// 定位成功，data有值<br/>　　　　`latitude: "",`// 经度<br/>　　　　`longitude: "",`// 经度<br/>　　　　`ocationtime: "",`// 定位成功时间<br/>　　　　`accuracy: "",`// 定位精度（单位：m）<br/>　　　　`altitude: "",`// 定位高度（单位：m）<br/>　　　　`speed: ""`// 移动速度（单位：m/s）<br/>　　`}`,<br/>　　`msg: "定位失败。"`// 定位失败的提示信息<br/>`}` |

无返回值。