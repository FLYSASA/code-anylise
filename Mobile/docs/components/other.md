### 同意/不同意

非常简单的复选框效果，使用了`Agree`组件。

``` js
import { Agree } from 'vux'
```

``` html
<agree v-model="valueTrue">阅读并同意<a href="javascript:void(0);">《相关条款》</a></agree>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否勾选同意，使用 `v-model` 绑定 |

<p class="tip demo-tip" key="/other/agree">
    示例代码路径：`demo/other/agree`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 静态提示文本

使用`Tip`组件来显示提示文本、副标题等。

``` js
import { Tip } from 'vux'
```

``` html
<tip>I am a tip.</tip>
<tip align="center">I am a tip align center.</tip>
```

<p class="warning">
    `Cell`组件和大部分表单组件都有`inline-desc`属性，已具备提示文本/副标题作用。非使用这些组件的场景如果需要提示文本，可以使用`Tip`组件。
</p>

<p class="tip demo-tip" key="/other/tip">
    示例代码路径：`demo/other/tip`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 居中效果

使用居中效果，需要引用样式`center.less`。

``` js
import 'vux/src/styles/center.less'
```

``` html
<div style="margin:15px;border:1px solid green;height:100px;border-radius:5px;" class="vux-center-h">
    <div style="text-align:center;">
        <div style="color:red;">.vux-center-h</div>
        <div>Be Cool with Vue and WeUI</div>
    </div>
</div>
```

三种居中class说明如下：

- `vux-center-h` 水平居中
- `vux-center-v` 垂直居中
- `vux-center` 水平和垂直都居中

<p class="tip demo-tip" key="/other/center">
    示例代码路径：`demo/other/center`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 关闭图标（css实现）

使用关闭图片，需要引用样式`close.less`，可以自定义关闭图标的大小和颜色。

``` js
import 'vux/src/styles/close.less'
```

``` html
<span class="vux-close" style="width:30px;height:30px;color:#ccc;"></span>
```

<p class="tip demo-tip" key="/other/close">
    示例代码路径：`demo/other/close`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 小红点（css实现）

引用样式`reddot.less`实现在文本右上角添加红点的功能。

``` js
import 'vux/src/styles/reddot.less'
```

``` html
<div class="reddot-demo vux-reddot">新消息红点</div>
<div class="reddot-demo vux-reddot-s">新消息小点</div>
```

<p class="tip demo-tip" key="/other/reddot">
    示例代码路径：`demo/other/reddot`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 加载图标（css实现）

引用样式`loading.less`实现的加载中图标。

``` js
import 'vux/src/styles/loading.less'
```

``` html
<span class="vux-loading"></span>
```

<p class="tip demo-tip" key="/other/iconloading">
    示例代码路径：`demo/other/iconloading`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 设备信息

使用插件`DevicePlugin`来获取设备信息，引入这个插件之后，可以访问对象`$device`来获取设备的信息，有：`isAndroid`、`isIpad`、`isIpod`、`isIphone`、`isWechat`等。

``` js
import { DevicePlugin } from 'vux'
Vue.use(DevicePlugin)
```

``` html
<group>
    <cell v-for="(item, key) in $device" :key="key" :title="key">{{item}}</cell>
</group>
```

<p class="tip demo-tip" key="/other/device">
    示例代码路径：`demo/other/device`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 时间日期格式

使用过滤器`FormatTimeFilter`来实现日期和时间数据的格式化。

``` js
import { FormatTimeFilter } from 'vux'
```

``` html
<div class="center">{{ new Date() | FormatTimeFilter('YYYY-MM-DD E') }}</div>
```

各种格式字符串说明如下：

- `Y` 年
- `M` 月
- `D` 日
- `H` 时（24小时制）
- `h` 时（12小时制）
- `m` 分
- `s` 秒
- `S` 毫秒
- `q` 季度（数字1到4）
- `E` 星期（如：五）
- `EE` 星期（如：周五）
- `EEE` 星期（如：星期五）

<p class="tip demo-tip" key="/other/timeformatter">
    示例代码路径：`demo/other/timeformatter`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### url和查询字符串的常用处理

使用过滤器`querystring`来实现`json`对象和查询字符串之间的互相转换、`url`编码和解码。

``` js
import { querystring } from 'vux'
```

``` js
// Vue实例里注册过滤器：
filters: querystring
```

``` html
<div>对象转字符串： {{ query1 | stringify }}</div>
<div>字符串转对象： {{ query2 | parse }}</div>
<div>编码： {{ query3 | escape }}</div>
<div>解码： {{ query4 | unescape }}</div>
```

`querystring`过滤器提供了4个方法：

- `stringify` 将`json`对象转为字符串，如：将`{ "name": "张三", "age": "18" }`转为`name=%E5%BC%A0%E4%B8%89&age=18`
- `parse` 将查询字符串转为对象，如：将`name=李四&age=20`转为`{ "name": "李四", "age": "20" }`
- `escape` 使用`encodeURIComponent`方法对`url`进行编码
- `unescape` 使用`decodeURIComponent`方法对编码的`url`进行解码

<p class="tip demo-tip" key="/other/querystring">
    示例代码路径：`demo/other/querystring`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 1像素问题（手机看效果）

一般在移动端，由于dpr（设备像素比）不为1，在PC端显示1像素的边框，在移动端其实显示为2px。引用样式`1px.less`可以解决这个问题。

``` js
import 'vux/src/styles/1px.less'
```

``` html
<div style="height:10px;" class="vux-1px"></div>
```

1像素`class`说明如下：

- `vux-1px` 边框宽度1像素
- `vux-1px-t` 上边框宽度1像素
- `vux-1px-b` 下边框宽度1像素
- `vux-1px-tb` 上下边框宽度1像素
- `vux-1px-l` 左边框宽度1像素
- `vux-1px-r` 右边框宽度1像素

<p class="warning">
    一般，页面的公共样式会将`1px.less`引入，请确保不会重复引用。
    <br/><br/>
    请使用手机查看效果。
</p>

<p class="tip demo-tip" key="/other/onepx">
    示例代码路径：`demo/other/onepx`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 手机旋转效果（手机看效果）

引入自定义指令`orientation`实现手机旋转效果，`v-orientation`指令的值有`landscape`和`portrait`，分别适用于水平和垂直模式的内容。

``` js
import Orientation from '@/directives/orientation'
```

``` html
<div>
    <div v-orientation="'landscape'" class="landscape">
        <div>竖屏观看更合适哦</div>
    </div>
    <div v-orientation="'portrait'" class="portrait">
        <div>翻转手机看效果</div>
    </div>
</div>
```

<p class="warning">
    `v-orientation`指令的值必须是字符串`landscape`和`portrait`，可以这样设置：`v-orientation="'landscape'"`，也可以绑定data里的变量，如：`data: { horizontal: 'landscape' }`，然后`v-orientation="horizontal"`。
    <br/><br/>
    请启用手机的`自动旋转`后查看效果。
</p>

<p class="tip demo-tip" key="/other/orientation">
    示例代码路径：`demo/other/orientation`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 摇一摇效果（手机看效果）

使用`Shake`组件，实现摇一摇效果。

``` js
import { Shake } from 'vux'
```

``` html
<shake @on-shake="shakeDevice" threshold="5"></shake>
```

<p class="warning">
    请使用手机查看效果。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">stop</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否停用摇一摇事件 |
| <span class="prop-key" style="white-space:nowrap;">threshold</span> | <span class="type type-number">Number</span> | 15 | &nbsp; | 摇动强度阀值，数字越小越敏感 |
| <span class="prop-key" style="white-space:nowrap;">timeout</span> | <span class="type type-number">Number</span> | 1000 | &nbsp; | 事件之间的默认间隔（毫秒），可选。摇一摇事件触发之后，在这个间隔时间内再次摇动，事件不会触发。 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-shake</span> | &nbsp | 摇一摇事件 |

<p class="tip demo-tip" key="/other/shake">
    示例代码路径：`demo/other/shake`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 字体图标效果

这个示例演示了字体图标的效果。

``` html
<span class="demo-icon">&#xe636;</span>
<span class="demo-icon">&#xe638;</span>
<span class="demo-icon" style="color: #000;">&#xe639;</span>
<span class="demo-icon">&#xe619;</span>
```

<p class="tip demo-tip" key="/other/thank">
    示例代码路径：`demo/other/thank`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 九宫格页面效果

这个示例演示了弹性布局、字体图标、1像素边框、自定义过滤器的效果。

``` html
<flexbox :gutter="0" v-for="(list, index) in components" :key="index">
    <flexbox-item :span="1/3" v-for="component in list" :key="component.name" class="cbox vux-1px-t vux-tap-active">
        <div class="vux-1px-r cbox-inner">
            <span class="demo-icon demo-icon-big" v-html="component.icon" :style="{color: component.color}"></span>
            <br>
            <span :style="{fontSize: component.name.length > 12 ? '12px' : ''}">{{component.name | camelCase}}</span>
        </div>
    </flexbox-item>
</flexbox>
```

<p class="tip demo-tip" key="/other/demo">
    示例代码路径：`demo/other/demo`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 回帖评论效果

一个简单的回帖评论的效果，详情请参考demo代码。

<p class="tip demo-tip" key="/other/comment">
    示例代码路径：`demo/other/comment`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>