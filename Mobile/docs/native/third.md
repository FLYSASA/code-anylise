**第三方集成**部分，封装的是有关第三方交互集成的操作，如：调用第三方App和地址、获取第三方传递的参数、一键分享等。调用方式：<br/>
`App.third.方法名(参数)`

### browseUrl (url)

调用系统浏览器打开指定url。

``` js
App.third.browseUrl('http://www.baidu.com')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">url</span> | <span class="type type-string">String</span> | 页面url地址 |

无返回值。


---


### openUrl (options)

用webview打开网络页面。

``` js
App.third.openUrl({
    url: 'http://m.chinasapi.com'
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`url: 'xxx',`  // 需要打开的网络页面的url地址<br/>　　`zoom: 0,`  // 页面是否支持缩放（数字，0:不支持缩放/1:支持缩放，默认0）<br/>　　`showProgress: 1`  // url加载时顶部进度条是否显示（0:不显示进度条/1:显示进度条，默认1）<br/>　　`showBack: 1`  // 标题栏是否显示返回按钮（0:不显示/1:显示，默认1）<br/>　　`showClose: 1`  // 标题栏是否显示关闭按钮（0:不显示/1:显示，默认1）<br/>　　`showMenu: 1`  // 标题栏右侧是否显示菜单按钮（0:不显示/1:显示，默认1）<br/>　　`showImShare: 1`  // 分享菜单是否显示IM分享（0:不显示/1:显示，默认0）<br/>`}` |

无返回值。


---


### openApp (options)

打开第三方App。

``` js
// 打开微信
var os = App.device.getOsName()
if (os === 'ios') {
    App.third.openApp({
        url: 'weixin'
    })
}
else if (os === 'android') {
    App.third.openApp({
        package: 'com.tencent.mm',
        activity: 'com.tencent.mm.ui.LauncherUI'
    })
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`url: 'xxx',`  // 苹果App的注册名（快捷名称）<br/>　　`package: 'xxx',`  // 安卓App的包名<br/>　　`activity: 'xxx'`  // 安卓App的入口activity名<br/>　　`data: {xxx:'value'}`  // 传递的参数值，参数的key和value不能包含字符&=&#124;<br/>　　`downloadUrl: 'xxx'`  // 第三方App的下载地址<br/>　　`isExmobi: false`  // 第三方App是否Exmobi应用<br/>`}` |

无返回值。


---


### getThirdParams ()

获取第三方应用传递参数集合。

``` js
var params = App.third.getThirdParams()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-array">Array</span> | 键值对数组 |


---


### getThirdParam (key)

获取第三方应用传递参数指定key的value值。

``` js
var userId = App.third.getThirdParam('userid')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">key</span> | <span class="type type-string">String</span> | 第三方native应用传递参数的key值 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 指定key值参数的值 |


---


### openShare (options)

一键分享，支持分享到：QQ好友、QQ空间、微信好友、微信朋友圈、新浪微博

``` js
App.third.openShare({
    type: 'news',
    title: 'iPhone8发布会前亮点汇总 苹果8将会有哪些黑科技？',
    url: 'http://m.techweb.com.cn/article/2017-09-06/2582660.shtml',
    text: '美国西部时间9月12日上午10点（北京时间9月13日凌晨1点），苹果将第一次在全新建造的史蒂夫·乔布斯剧院举行新品发布会。',
    imgPath: 'temp/zsyf/planimg/4aa0c930-b95f-498e-8063-029485f3e2f0.jpg'
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`type: 'xxx',`  // 分享类型（text:文本/image:图片/news:图文）<br/>　　`title: 'xxx',`  // 分享标题（news）<br/>　　`url: 'xxx'`  // 分享链接地址（news）<br/>　　`text: 'xxx'`  // 分享的文本内容（text/news）<br/>　　`imgPath: 'xxx'`  // 分享的图片路径，只支持本地图片（image/news）<br/>`}` |

无返回值。