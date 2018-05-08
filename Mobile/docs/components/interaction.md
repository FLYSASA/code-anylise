### 上拉菜单 `Actionsheet`

`Actionsheet`上拉菜单组件，通常用于提交操作确认、更多操作等。

``` js
import { Actionsheet } from 'vux'
```

``` html
<actionsheet v-model="show4" :menus="menus1" :close-on-clicking-mask="false" show-cancel></actionsheet>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示, 使用`v-model`绑定变量 |
| <span class="prop-key" style="white-space:nowrap;">show-cancel</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示取消菜单 |
| <span class="prop-key" style="white-space:nowrap;">cancel-text</span> | <span class="type type-string">String</span> | 取消 | &nbsp; | 取消菜单文字 |
| <span class="prop-key" style="white-space:nowrap;">theme</span> | <span class="type type-string">String</span> | ios | &nbsp; | 菜单风格，可选值有 `ios`、`android`，前者从页面底部上拉显示，后者从页面中间弹出 |
| <span class="prop-key" style="white-space:nowrap;">menus</span> | <span class="type type-object">Object</span><br/><span class="type type-array">Array</span> | {} | &nbsp; | 菜单项列表，举例：`{menu1: '删除'}`，如果名字上带有`.noop`表明这是纯文本(HTML)展示，不会触发事件，用于展示描述或者提醒。<br/>从`v2.1.0`开始支持数组类型的菜单，见下面说明。 |
| <span class="prop-key" style="white-space:nowrap;">close-on-clicking-mask</span> | <span class="type type-boolean">Boolean</span> | true | <span style="font-size:12px;white-space:nowrap;">v2.0.0</span> | 点击遮罩时是否关闭菜单，适用于一些进入页面时需要强制选择的场景。 |
| <span class="prop-key" style="white-space:nowrap;">close-on-clicking-menu</span> | <span class="type type-boolean">Boolean</span> | true | <span style="font-size:12px;white-space:nowrap;">v2.3.8</span> | 点击菜单时是否自动隐藏 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-click-menu</span> |   (menuKey) | 点击菜单时触发，参数为当前菜单项对象 |
| <span class="prop-key" style="white-space:nowrap;">on-click-menu-{menuKey}</span> |   (menuKey) | 点击事件的快捷方式, 如果你有一个菜单名字为`delete`, 那么你可以监听 `on-click-menu-delete` |
| <span class="prop-key" style="white-space:nowrap;">on-click-menu-cancel</span> |   &nbsp; | 点击取消菜单时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-click-mask</span> |   &nbsp; | 点击遮罩时触发 |

从`v2.1.0`开始支持数组类型的菜单。

`label`: 菜单名字，支持文字及`html`。

`value`: 英文字符，表示触发事件的名字，如果不设置不会触发`on-click-menu`事件。

`type`: 类型，可选值如下：

- `primary` 主色
- `warn` 警告色
- `disabled` 不可操作，灰色。点击时不会关闭
- `info ` 信息提示，点击时不会关闭。作用同对象类型的`key.noop`。

``` js
[{
    label: 'Are you sure?<br/><span style="color:#666;font-size:12px;">Once deleted, you will never find it.</span>',
    type: 'info'
},
{
    label: 'Primary',
    type: 'primary',
    value: 'primary'
},
{
    label: 'Warn',
    type: 'warn'
},
{
    label: 'Disabled',
    type: 'disabled'
},
{
    label: 'Default'
}]
```

<p class="tip demo-tip" key="/interaction/actionsheet">
    示例代码路径：`demo/interaction/actionsheet`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 提示框 `Alert`

`Alert`提示框组件，和原生alert效果类似。

``` js
import { Alert } from 'vux'
```

``` html
<alert v-model="show" title="恭喜" @on-show="onShow" @on-hide="onHide">消息已成功发送</alert>
```

<p class="warning">
    该组件支持以插件形式调用。以插件形式调用时，和`template`中使用不同，属性名请使用`小驼峰式`，比如`buttonText`而不是`button-text`。
    <br/>
    <br/>
    在 `ViewBox` 或者 `overflow-scrolling:touch` 的容器中使用时，请引入指令 `transfer-dom` 以解决其带来的 `z-index` 失效问题。详细参考 demo。
    <br/>
    <br/>
    以插件形式调用的方式如下：
</p>

``` js
import  { AlertPlugin } from 'vux'
Vue.use(AlertPlugin)
```

``` js
// 显示
this.$vux.alert.show({
    title: 'Vux is Cool',
    content: 'Do you agree?',
    onShow () {
        console.log('Plugin: I\'m showing')
    },
    onHide () {
        console.log('Plugin: I\'m hiding')
    }
})
// 隐藏
this.$vux.alert.hide()
```

<p class="warning">
    如果你想实现在`vue-router`的`beforeEach`或者`afterEach`事件里关闭，可以使用 `Vue.$vux.alert.hide()`
</p>


* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示, 使用`v-model`绑定变量 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 弹窗标题 |
| <span class="prop-key" style="white-space:nowrap;">content</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.2.0</span> | 提示内容，作为 slot:default 的默认内容，如果使用 slot:default, 将会失效 |
| <span class="prop-key" style="white-space:nowrap;">button-text</span> | <span class="type type-string">String</span> | ok(确定) | &nbsp; | 按钮文字 |
| <span class="prop-key" style="white-space:nowrap;">mask-transition</span> | <span class="type type-string">String</span> | vux-fade | &nbsp; | 遮罩动画 |
| <span class="prop-key" style="white-space:nowrap;">dialog-transition</span> | <span class="type type-string">String</span> | vux-dialog | &nbsp; | 弹窗主体动画 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 提示内容 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-show</span> |   &nbsp; | 弹窗显示时触发 |

<p class="tip demo-tip" key="/interaction/alert">
    示例代码路径：`demo/interaction/alert`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 自隐藏提示框 `Toast`

`Toast`自隐藏提示框组件，和`Alert`组件的区别是：可以自隐藏、无操作按钮。

``` js
import { Toast } from 'vux'
```

``` html
<toast v-model="showPositionValue" type="text" :time="800" is-show-mask text="Hello World" :position="position">基本用法</toast>
```

<p class="warning">
    该组件支持以插件形式调用。以插件形式调用时，和`template`中使用不同，属性名请使用`小驼峰式`，比如`isShowMask`而不是`is-show-mask`。
    <br/>
    <br/>
    以插件形式调用的方式如下：
</p>

``` js
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
```

``` js
// 显示
this.$vux.toast.show({
    text: 'Loading'
})

// 显示文字
this.$vux.toast.text('hello', 'top')

// 隐藏
this.$vux.toast.hide()
```


* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示, 使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">time</span> | <span class="type type-number">Number</span> | 2000 | &nbsp; | 显示时间（毫秒） |
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | success | &nbsp; | 类型，可选值 `success`、`warn`、`cancel`、`text` |
| <span class="prop-key" style="white-space:nowrap;">width</span> | <span class="type type-string">String</span> | 7.6em | &nbsp; | 宽度 |
| <span class="prop-key" style="white-space:nowrap;">is-show-mask</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示遮罩，如果显示，用户将不能点击页面上其他元素 |
| <span class="prop-key" style="white-space:nowrap;">text</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 提示内容，支持 html，和默认slot同样功能 |
| <span class="prop-key" style="white-space:nowrap;">position</span> | <span class="type type-string">String</span> | default | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.4</span> | 显示位置，可选值 `default`、`top`、`middle`、`bottom` |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 默认slot, 提示内容 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-show</span> |   &nbsp; | 提示弹出时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-hide</span> |   &nbsp; | 提示隐藏时触发 |

<p class="tip demo-tip" key="/interaction/toast">
    示例代码路径：`demo/interaction/toast`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 确认框 `Confirm`

`Confirm`确认框组件，有确认和取消两个按钮，支持promt效果（带文本框）。

``` js
import { Confirm } from 'vux'
```

``` html
<confirm v-model="show" title="操作提示" @on-cancel="onCancel" @on-confirm="onConfirm" @on-show="onShow"
    @on-hide="onHide">
    <p style="text-align:center;">确定吗？</p>
</confirm>
```

<p class="warning">
    该组件支持以插件形式调用。以插件形式调用时，和`template`中使用不同，属性名请使用`小驼峰式`，比如`confirmText`而不是`confirm-text`。
    <br/>
    <br/>
    以插件形式调用的方式如下：
</p>

``` js
import  { ConfirmPlugin } from 'vux'
Vue.use(ConfirmPlugin)
```

``` js
// 显示
const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
this.$vux.confirm.show({
    // 组件除show外的属性
    onCancel () {
        console.log(this) // 非当前 vm
        console.log(_this) // 当前 vm
    },
    onConfirm () {}
})
// 隐藏
this.$vux.confirm.hide()
// prompt形式调用
this.$vux.confirm.prompt('placeholder', {
    onCancel () {}
    onConfirm () {}
})
```


* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">show</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">show-input</span> | <span class="type type-boolean">Boolean</span> | false | <span style="font-size:12px;white-space:nowrap;">v2.5.0</span> | 是否显示输入框，如果为true，slot会失效 |
| <span class="prop-key" style="white-space:nowrap;">placeholder</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.5.0</span> | 输入框的提示（仅在showInput为true的情况下有效） |
| <span class="prop-key" style="white-space:nowrap;">theme</span> | <span class="type type-string">String</span> | ios | &nbsp; | 弹窗风格，可以是ios或android |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 弹窗标题 |
| <span class="prop-key" style="white-space:nowrap;">content</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 弹窗内容，作为slot默认内容，可以是html片段，如果使用slot该字段会失效 |
| <span class="prop-key" style="white-space:nowrap;">confirm-text</span> | <span class="type type-string">String</span> | 确认(confirm) | &nbsp; | 确认按钮文字 |
| <span class="prop-key" style="white-space:nowrap;">cancel-text</span> | <span class="type type-string">String</span> | 取消(cancel) | &nbsp; | 取消按钮文字 |
| <span class="prop-key" style="white-space:nowrap;">mask-transition</span> | <span class="type type-string">String</span> | vux-fade | &nbsp; | 遮罩动画 |
| <span class="prop-key" style="white-space:nowrap;">dialog-transition</span> | <span class="type type-string">String</span> | vux-dialog | &nbsp; | 弹窗动画 |
| <span class="prop-key" style="white-space:nowrap;">close-on-confirm</span> | <span class="type type-boolean">Boolean</span> | true | <span style="font-size:12px;white-space:nowrap;">v2.5.0</span> | 是否在点击确认按钮时自动关闭 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 弹窗主体内容 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-cancel</span> |   &nbsp; | 点击取消按钮时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-confirm</span> |   (value) | 点击确定按钮时触发, 参数为prompt中输入的值 |

<p class="tip demo-tip" key="/interaction/confirm">
    示例代码路径：`demo/interaction/confirm`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 对话框 `XDialog`

`XDialog`对话框组件，高度自定义的弹窗组件，内容和操作按钮均可自定义。

``` js
import { XDialog } from 'vux'
```

``` html
<x-dialog v-model="show" class="dialog-demo">
    <div class="img-box">
        <img :src="url" style="max-width:100%">
    </div>
    <div @click="show=false">
        <span class="vux-close"></span>
    </div>
</x-dialog>
```

<p class="warning">
    如果当前组件所在位置某一父级使用了 `ViewBox` 组件或者直接使用了 Safari 的 `overflowScrolling:touch`，请引入指令 `transfer-dom` 以解决其带来的 `z-index` 失效问题。
    <br/>
    <br/>
    如果你没有使用，那么不需要参照 demo 加上`v-transfer-dom`
</p>

``` js
import { TransferDomDirective as TransferDom } from 'vux'

export default {
    directives: {
        TransferDom
    }
}
```

``` html
<div v-transfer-dom>
    <x-dialog></x-dialog>
</div>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 弹窗是否可见，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">mask-transition</span> | <span class="type type-string">String</span> | vux-mask | &nbsp; | 遮罩层动画 |
| <span class="prop-key" style="white-space:nowrap;">dialog-transition</span> | <span class="type type-string">String</span> | vux-dialog | &nbsp; | 弹窗动画 |
| <span class="prop-key" style="white-space:nowrap;">hide-on-blur</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否在点击遮罩时自动关闭弹窗 |
| <span class="prop-key" style="white-space:nowrap;">scroll</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否在弹窗上滚动时 body 内容也滚动 |
| <span class="prop-key" style="white-space:nowrap;">dialog-style</span> | <span class="type type-object">Object</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.2.2</span> | 设置内部弹窗样式，覆盖原有的宽度、背景颜色等样式 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 弹窗的主体内容 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-show</span> |   &nbsp; | 弹窗可见时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-hide</span> |   &nbsp; | 弹窗关闭时触发 |

<p class="tip demo-tip" key="/interaction/dialog">
    示例代码路径：`demo/interaction/dialog`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 加载效果

#### <span class="vux-component-name">Loading</span>

`Loading`加载中组件，表现形式类似于方形弹窗效果，可用于等待操作时的显示进度效果，可设置在操作完隐藏。

``` js
import { Loading } from 'vux'
```

``` html
<loading v-model="show1" :text="text1"></loading>
```

<p class="warning">
    该组件支持以插件形式调用，调用方式如下：
</p>

``` js
import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
```

``` js
// 显示
this.$vux.loading.show({
    text: 'Loading'
})
// 隐藏
this.$vux.loading.hide()
```
<p class="warning">
    `loading`同样支持在`vue`外直接使用，[请参照这里](https://github.com/airyland/vux/blob/v2/docs/examples/loading.html)
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 显示状态，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">text</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 提示文字 |
| <span class="prop-key" style="white-space:nowrap;">position</span> | <span class="type type-string">String</span> | fixed | &nbsp; | 定位方式，默认为`fixed`，在100%的布局下用`absolute`可以避免抖动 |
| <span class="prop-key" style="white-space:nowrap;">transition</span> | <span class="type type-string">String</span> | vux-mask | &nbsp; | 显示动画名字 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 提示文字区域 | &nbsp; |

#### <span class="vux-component-name">InlineLoading</span>

`InlineLoading`是基于微信样式实现的一个圆形滚动图标，无任何属性，如果需要文字则需要自定义。

``` js
import { InlineLoading } from 'vux'
```

``` html
<inline-loading></inline-loading>
```

#### <span class="vux-component-name">LoadMore</span>

`LoadMore`加载更多组件，适用于需要加载更多数据的场景，从开始加载数据到请求完成的过程中效果（如：开始加载时显示滚动图标+加载中提示；加载完成后隐藏该组件；如果加载完无数据，可以隐藏图标+无数据提示，稍后隐藏该组件等等），可以用代码自定义实现。

``` js
import { LoadMore } from 'vux'
```

``` html
<load-more :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">show-loading</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示 loading 图标 |
| <span class="prop-key" style="white-space:nowrap;">tip</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 提示文字，如果没有显示图标也没有显示文字，则显示点 |
| <span class="prop-key" style="white-space:nowrap;">background-color</span> | <span class="type type-string">String</span> | <span class="type" style="width:65px;background-color:#ffffff">#ffffff</span> | &nbsp; | 背景颜色，需要配置以让文字与背景完全融合 |

<p class="tip demo-tip" key="/interaction/loading">
    示例代码路径：`demo/interaction/loading`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 旋转图标 `Spinner`

`Spinner`旋转图标组件。

``` js
import { Spinner } from 'vux'
```

``` html
<group>
    <cell v-for="type in types" :title="type" :key="type">
        <spinner :type="type" slot="value"></spinner>
    </cell>
</group>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | ios | &nbsp; | 图标类型，可选值有 `android`、`ios`、`ios-small`、`bubbles`、`circles`、`crescent`、`dots`、`lines`、`ripple`、`spiral` |
| <span class="prop-key" style="white-space:nowrap;">size</span> | <span class="type type-string">String</span> | 28px | &nbsp; | 图标大小 |

<p class="tip demo-tip" key="/interaction/spinner">
    示例代码路径：`demo/interaction/spinner`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 遮罩 `Masker`

`Masker`遮罩组件，提供半透明的遮挡效果，遮罩颜色和透明度均可自定义。

``` js
import { Masker } from 'vux'
```

``` html
<masker style="border-radius: 2px;">
    <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"> </div>
    <div slot="content" class="m-title">
        {{item.title}}
        <br/>
        <span class="m-time">2016-03-18</span>
    </div>
</masker>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">color</span> | <span class="type type-string">String</span> | 0, 0, 0 | &nbsp; | 遮罩颜色，rgb值，'0, 0, 0' |
| <span class="prop-key" style="white-space:nowrap;">opacity</span> | <span class="type type-number">Number</span> | 0.5 | &nbsp; | 遮罩透明度 |
| <span class="prop-key" style="white-space:nowrap;">fullscreen</span> | <span class="type type-boolean">Boolean</span> | false | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.14</span> | 遮罩是否全屏 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 背景内容，位于遮罩下方，一般为图片 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">content</span> | 遮罩上方内容，一般显示标题消息 | &nbsp; |

<p class="tip demo-tip" key="/interaction/masker">
    示例代码路径：`demo/interaction/masker`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 单击提示 `Popover`

`Popover`单击提示组件，用于需要提供提示信息的场景，类似于`html`元素的`title`属性，只不过在移动端需要手指点击才显示提示信息。

``` js
import { Popover } from 'vux'
```

``` html
<popover placement="bottom" style="margin: 20px;">
    <div slot="content" class="popover-demo-content">
        hello world
    </div>
    <button class="btn btn-default">下方出现</button>
</popover>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">content</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 弹出窗口内容 |
| <span class="prop-key" style="white-space:nowrap;">placement</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 弹出窗口位置，可选值有 `top`、`left`、`right`、`bottom` |
| <span class="prop-key" style="white-space:nowrap;">gutter</span> | <span class="type type-number">Number</span> | 5 | &nbsp; | 箭头和触发元素之间的距离 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 触发元素 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">content</span> | 弹窗内容 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-show</span> |   &nbsp; | 弹窗显示时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-hide</span> |   &nbsp; | 弹窗隐藏时触发 |

<p class="tip demo-tip" key="/interaction/popover">
    示例代码路径：`demo/interaction/popover`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 弹窗 `Popup`

`Popup`弹窗组件，可以从屏幕四个方向滑出弹窗，从底部滑出时效果类似上拉菜单`Actionsheet`，弹窗的内容完全自定义。

``` js
import { Popup } from 'vux'
```

``` html
<popup v-model="show1" height="100%">
    <div class="popup1">
        <group>
            <x-switch title="Another XSwitcher" v-model="show1"></x-switch>
        </group>
    </div>
</popup>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-boolean">Boolean</span> | &nbsp; | &nbsp; | 是否关闭，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">height</span> | <span class="type type-string">String</span> | auto | &nbsp; | 高度，设置`100%`为整屏高度。当 position 为 top 或者 bottom 时有效。 |
| <span class="prop-key" style="white-space:nowrap;">hide-on-blur</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 点击遮罩时是否自动关闭 |
| <span class="prop-key" style="white-space:nowrap;">is-transparent</span> | <span class="type type-boolean">Boolean</span> | false | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.9</span> | 是否为透明背景 |
| <span class="prop-key" style="white-space:nowrap;">width</span> | <span class="type type-string">String</span> | auto | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.6</span> | 设置 100% 宽度必须使用该属性。在 position 为 left 或者 right 时有效。 |
| <span class="prop-key" style="white-space:nowrap;">position</span> | <span class="type type-string">String</span> | bottom | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.6</span> | 位置，可取值 [`'left'`, `'right'`, `'top'`, `'bottom'`] |
| <span class="prop-key" style="white-space:nowrap;">show-mask</span> | <span class="type type-boolean">Boolean</span> | true | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.6</span> | 是否显示遮罩 |
| <span class="prop-key" style="white-space:nowrap;">popup-style</span> | <span class="type type-object">Object</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.5.2</span> | 弹窗样式，可以用于强制指定 z-index |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 弹窗主体内容 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-hide</span> |   &nbsp; | 关闭时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-show</span> |   &nbsp; | 显示时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-first-show</span> |   &nbsp; | 第一次显示时触发，可以在该事件回调里初始化数据或者界面 |

<p class="tip demo-tip" key="/interaction/popup">
    示例代码路径：`demo/interaction/popup`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 侧边抽屉 `Drawer`

`Drawer`侧边抽屉组件，效果和弹窗组件`Popup`的左右侧弹窗效果类似。有类似抽屉效果的场景，一般建议使用`Popup`组件，除非你有特殊要求（比如`push`的滑入方式）。

``` js
import Drawer from '@/components/control/drawer/Drawer.vue'
```

``` html
<drawer :show="drawerShow" :pos="pos" :tran="tran" @change-show="changeDrawerShow" @on-hide="onHide"
    @on-show="onShow">
    <div class="layout" slot="drawer">
        <h2><a href="#">bajian drawer</a></h2>
        <ul>
            <li v-for="item in navItems"><a :href="'#'+item">{{item}}</a></li>
        </ul>
    </div>
    <button v-on:click="directionFlip">directionChange</button><br><br>
    <button v-on:click="tranFlip">tranChange</button><br><br>
    <button v-on:click="drawerToggle">toggle</button>
</drawer>
```

<p class="warning">
    当前组件来自[这里](https://github.com/bajian/vue-drawer)。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">show</span> | <span class="type type-boolean">Boolean</span> | false | <span style="font-size:12px;white-space:nowrap;">v2.4.0</span> | 是否展开，使用 :show.sync 绑定(vue@^2.3.3) |
| <span class="prop-key" style="white-space:nowrap;">drawer-style</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.4.0</span> | 菜单样式 |
| <span class="prop-key" style="white-space:nowrap;">show-mode</span> | <span class="type type-string">String</span> | overlay | <span style="font-size:12px;white-space:nowrap;">v2.4.0</span> | 展示方式，`push`（推开内容区域）或者`overlay`（在内容上显示） |
| <span class="prop-key" style="white-space:nowrap;">placement</span> | <span class="type type-string">String</span> | left | <span style="font-size:12px;white-space:nowrap;">v2.4.0</span> | 显示位置，可以为`left`或者`right`|

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 主体内容插槽 | <span style="font-size:12px;white-space:nowrap;">v2.4.0</span> |
| <span class="prop-key" style="white-space:nowrap;">drawer</span> | 侧边栏内容插槽 | <span style="font-size:12px;white-space:nowrap;">v2.4.0</span> |

<p class="tip demo-tip" key="/interaction/drawer">
    示例代码路径：`demo/interaction/drawer`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 滚屏效果 `Scroller`

`Scroller`，功能强大的滚屏组件，可以实现多种滚屏效果，请参考demo。

``` js
import { Scroller } from 'vux'
```

``` html
<scroller lock-y :scrollbar-x="false">
    <div class="box1">
        <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
    </div>
</scroller>
```

<p class="warning">
    `Scroller`的内容必须是一个`div`，并且只能有一个`div`
    <br/>
    `Scroller` 希望解决的是简单的列表问题而不是一个内嵌各种复杂标签交互的容器，很容易发生性能或者交互问题。
    <br/>
    <br/>
    默认高度为整个视口高度，如果你加了`x-header`，那么你需要减去一个`x-header`的高度: `height="-46"`。
    <br/>
    <br/>
    请确保在你的数据更新后进行`reset`操作(参考下面文档)。
</p>


* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-object">Object</span> | {pulldownStatus:'', pullupStatus:''} | &nbsp; | 对象，上拉或者下拉的状态双向绑定，使用`v-model`绑定，`pulldownStatus` 及 `pullupStatus`，它们的值有 `default`/刷新操作完成、`enabled`/启用、`disabled`/禁用（`pulldownStatus`暂时不支持`disabled`） |
| <span class="prop-key" style="white-space:nowrap;">height</span> | <span class="type type-string">String</span> | viewport height | &nbsp; | 容器高度，默认为整个viewport高度，注意，该属性接受的是 String 类型，比如 200px，如果你希望scroller自动计算除去头部尾部的高度，请这样设置让组件自动计算，如`height="-40"` |
| <span class="prop-key" style="white-space:nowrap;">lock-x</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 锁定X方向（X方向无法滚动） |
| <span class="prop-key" style="white-space:nowrap;">lock-y</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 锁定Y方向（Y方向无法滚动） |
| <span class="prop-key" style="white-space:nowrap;">scrollbar-x</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示横向滚动条 |
| <span class="prop-key" style="white-space:nowrap;">scrollbar-y</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示垂直方向滚动条 |
| <span class="prop-key" style="white-space:nowrap;">bounce</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示边缘回弹效果 |
| <span class="prop-key" style="white-space:nowrap;">use-pulldown</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否使用下拉组件 |
| <span class="prop-key" style="white-space:nowrap;">use-pullup</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否使用上拉组件（使用上拉组件后，才可通过`v-model`绑定的`pullupStatus`来启用或禁用上拉刷新） |
| <span class="prop-key" style="white-space:nowrap;">pulldown-config</span> | <span class="type type-object">Object</span> | see below | &nbsp; | 下拉组件配置 |
| <span class="prop-key" style="white-space:nowrap;">pullup-config</span> | <span class="type type-object">Object</span> | see below | &nbsp; | 上拉组件配置 |
| <span class="prop-key" style="white-space:nowrap;">scroll-bottom-offset</span> | <span class="type type-number">Number</span> | 0 | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.6</span> | 在距离底部多长距离时触发事件`on-scroll-bottom` |
| <span class="prop-key" style="white-space:nowrap;">enable-horizontal-swiping</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否允许水平滑动，如果内容里包含水平的`swiper`组件时请启用该属性 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | scroller 内容，必须是一个 `div` 元素 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-scroll</span> |   `(position)` | 容器滚动时触发，参数为`top`和`left`位置 |
| <span class="prop-key" style="white-space:nowrap;">on-scroll-bottom</span> |   &nbsp; | 滚动到距离底部一段距离（`scroll-bottom-offset`设置）时触发，该事件可用于在滚动到底部之前刷新数据，实现一种无感知的用户体验（注意事件会触发多次，如果你需要进行数据获取，记得设置一个状态值） |
| <span class="prop-key" style="white-space:nowrap;">on-pulldown-loading</span> |   &nbsp; | 用户触发下拉刷新状态，监听该事件以获取加载新数据 |
| <span class="prop-key" style="white-space:nowrap;">on-pullup-loading</span> |   &nbsp; | 用户触发上拉加载状态，监听该事件以加载新数据 |

* **方法 (`Methods`)**

|  名称  |  参数  |  说明  |  版本  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">reset</span> |   `(position, duration, easing)` | 在内容变化(v-for渲染，异步数据加载)后需要调用，用以重新渲染，避免新加的内容无法上拉看到，一般在 $nextTick 回调里调用。easing 可以为 ease-in, ease-in-out, ease, bezier(n, n, n, n) | &nbsp; | 
| <span class="prop-key" style="white-space:nowrap;">donePullup</span> |   &nbsp; | 设置上拉刷新操作完成（会设置`pullupStatus`为`default`），在数据加载后执行 | &nbsp; | 
| <span class="prop-key" style="white-space:nowrap;">disablePullup</span> |   &nbsp; | 禁用上拉刷新（会设置`pullupStatus`为`disabled`），在没有更多数据时执行 | &nbsp; | 
| <span class="prop-key" style="white-space:nowrap;">enablePullup</span> |   &nbsp; | 启用上拉刷新插件（会设置`pullupStatus`为`default`） | &nbsp; | 
| <span class="prop-key" style="white-space:nowrap;">donePulldown</span> |   &nbsp; | 设置下拉刷新操作完成（会设置`pulldownStatus`为`default`），在数据加载后执行 | &nbsp; | 

`pulldown-config`配置的默认值是:

``` js
{
    content: 'Pull Down To Refresh',
    height: 60,
    autoRefresh: false,
    downContent: 'Pull Down To Refresh',
    upContent: 'Release To Refresh',
    loadingContent: 'Loading...',
    clsPrefix: 'xs-plugin-pulldown-'
}
```

`pullup-config`配置的默认值是:

``` js
{
    content: 'Pull Up To Refresh',
    pullUpHeight: 60,
    height: 40,
    autoRefresh: false,
    downContent: 'Release To Refresh',
    upContent: 'Pull Up To Refresh',
    loadingContent: 'Loading...',
    clsPrefix: 'xs-plugin-pullup-'
}
```

<span class="vux-qa">QA：如何更新数据</span>

如果展示内容只是简单的增加或者减少，直接调用`reset`方法即可

``` js
this.$nextTick(() => {
    this.$refs.scroller.reset()
})
```

如果展示内容完全重载，那么需要主动设置位置让其能正确回到顶部。适用于改变筛选条件后重载数据的情况

``` js
this.$nextTick(() => {
    this.$refs.scroller.reset({
        top: 0
    })
})
```

<span class="vux-qa">QA：如何设置pullup完成</span>

方法1，直接调用ref的`donePullup`方法

``` js
this.$refs.demo2.donePullup()
```

方法2，绑定value, 重置状态

<p class="warning">
    自定义`pullup`模板同样是用`v-model`来绑定以获取状态变化
</p>

``` html
<scroller v-model="status"></scroller>
```

``` js
data () {
    return {
        status: {
            pullupStatus: 'default'
        }
    }
}
```

``` js
// 重置状态为default
this.status.pullupStatus = 'default
```

<span class="vux-qa">QA：如何设置pulldown完成</span>

参照`pullup`, 使用方法`donePulldown`或者绑定`pulldownStatus`然后重置为`default`。

<span class="vux-qa">QA：如何禁用或者启用pullup</span>

在有些情况下，比如数据不多不需要上拉加载或者已经加载完成，我们需要禁用pullup
同样可以调用方法 `disablePullup` 或者设置`pullupStatus`为`disabled`

反之，则调用方法 `enablePullup` 或者设置`pullupStatus`为`enabled`

<span class="vux-qa">QA：启用keep-alive后滚动有问题</span>

需要在调用`Scroller`的页面上`activated`事件上执行`reset`

``` js
activated () {
    this.$refs.scroller.reset()
}
```

<p class="tip demo-tip" key="/interaction/scroller">
    综合示例的代码路径：`demo/interaction/scroller`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


#### 上拉加载更多

上拉加载更多效果，首先设置`Scroller`组件的`use-pullup`为`true`（使用上拉组件），然后通过`on-pullup-loading`事件来刷新数据，通过方法（或`v-model`绑定的`pullupStatus`）来启用或禁用上拉刷新。

``` js
import { Scroller } from 'vux'
```

``` html
<scroller lock-x scrollbar-y use-pullup height="200px" @on-pullup-loading="load1" ref="demo1"
    :pullup-config="{loadingContent: '努力加载中'}">
    <div class="box2">
        <p v-for="i in n1">占位 {{i}}</p>
    </div>
</scroller>
```

<p class="tip demo-tip" key="/interaction/pullup">
    示例代码路径：`demo/interaction/pullup`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


#### 下拉刷新

下拉刷新效果，首先设置`Scroller`组件的`use-pulldown`为`true`（使用下拉组件），然后通过`on-pulldown-loading`事件来刷新数据，通过`donePulldown`方法来完成刷新操作。

``` js
import { Scroller } from 'vux'
```

``` html
<scroller lock-x scrollbar-y use-pulldown height="200px" @on-pulldown-loading="load1" ref="demo1">
    <div class="box2">
        <p v-for="i in n1">placeholder {{i}}</p>
    </div>
</scroller>
```

<p class="tip demo-tip" key="/interaction/pulldown">
    示例代码路径：`demo/interaction/pulldown`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


#### 下拉刷新和上拉加载更多组合

同时设置`Scroller`组件的`use-pullup`和`use-pulldown`为`true`（使用上拉和下拉组件），实现上拉和下拉组合使用的效果。

``` js
import { Scroller } from 'vux'
```

``` html
<scroller lock-x scrollbar-y use-pullup use-pulldown height="200px" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh"
    v-model="status" ref="scroller">
    <div class="box2">
        <p v-for="i in n">placeholder {{i}}</p>
    </div>
    <!-- pullup slot -->
    <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px;
        bottom: -40px; text-align: enter;">
        <span v-show="status.pullupStatus === 'default'"></span>
        <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'"
            :class="{'rotate': status.pullupStatus === 'up'}">↑</span>
        <span v-show="status.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
    </div>
</scroller>
```

<p class="tip demo-tip" key="/interaction/pulldownpullup">
    示例代码路径：`demo/interaction/pulldownpullup`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


#### 滚屏/滚动效果（Full）

不设置`Scroller`组件的`height`属性（容器高度不设置时，默认为整个viewport高度），实现满屏滚动效果。

``` js
import { Scroller } from 'vux'
```

``` html
<scroller lock-x>
    <div class="box1">
        <ul>
            <li class="vux-1px-b"><span>热搜推荐</span></li>
            <li class="vux-1px-b"><span>手机数码</span></li>
            <li class="vux-1px-b"><span>家用电器</span></li>
            <li class="vux-1px-b"><span>女装内衣</span></li>
            <li class="vux-1px-b"><span>男装内衣</span></li>
            <li class="vux-1px-b"><span>鞋靴箱包</span></li>
            <li class="vux-1px-b"><span>电脑办公</span></li>
            <li class="vux-1px-b"><span>运动户外</span></li>
            <li class="vux-1px-b"><span>个护化妆</span></li>
            <li class="vux-1px-b"><span>家具建材</span></li>
            <li class="vux-1px-b"><span>家居家纺</span></li>
            <li class="vux-1px-b"><span>母婴玩具</span></li>
            <li class="vux-1px-b"><span>食品生鲜</span></li>
            <li class="vux-1px-b"><span>酒水饮料</span></li>
            <li class="vux-1px-b"><span>钟表奢品</span></li>
            <li class="vux-1px-b"><span>汽车用品</span></li>
            <li class="vux-1px-b"><span>医药保健</span></li>
            <li class="vux-1px-b"><span>珠宝饰品</span></li>
            <li class="vux-1px-b"><span>图书音像</span></li>
            <li class="vux-1px-b"><span>全球购</span></li>
        </ul>
    </div>
</scroller>
```

<p class="tip demo-tip" key="/interaction/scrollerfull">
    示例代码路径：`demo/interaction/scrollerfull`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


#### 滚屏/滚动效果（Header）

如果页面包含标题栏（46px），设置`Scroller`组件的`height`属性为`-46`或`-46px`，实现在标题栏下的内容区内滚动（有工具栏时的处理类似）。

``` js
import { Scroller } from 'vux'
```

``` html
<div class="vux-scroller-header-box">
    <div style="height:46px;">
        <x-header class="vux-scroller-header">I'm header</x-header>
    </div>
    <scroller lock-x ref="scroller" height="-46">
        <div class="box2">
            <p v-for="i in 80">placeholder {{i}}</p>
        </div>
    </scroller>
</div>
```

<p class="tip demo-tip" key="/interaction/scrollerheader">
    示例代码路径：`demo/interaction/scrollerheader`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


#### 滚屏/滚动效果（Swiper）

设置`Scroller`组件的`enable-horizontal-swiping`属性为`true`，实现上拉下拉和`Swiper`组件的组合使用效果。

``` js
import { Scroller, Swiper } from 'vux'
```

``` html
<scroller lock-x scrollbar-y use-pulldown @on-pulldown-loading="load" enable-horizontal-swiping ref="scroller" height="400px">
    <div class="box2">
        <div style="height:180px;">
            <swiper :list="list" direction="horizontal" auto height="180px"></swiper>
        </div>
        <p v-for="i in 80">placeholder {{i}}</p>
    </div>
</scroller>
```

<p class="tip demo-tip" key="/interaction/scrollerswiper">
    示例代码路径：`demo/interaction/scrollerswiper`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


#### 图片滚动批量查看

在`Scroller`组件里使用`XImg`组件，实现多张图片滚动显示的效果。

``` js
import { Scroller, XImg } from 'vux'
```

``` html
<scroller lock-x scrollbar-y height="600px" ref="scroller" style="border-bottom:1px solid green">
    <div>
        <div v-for="src in list" style="background-color:yellow;text-align:center;">
            <span style="font-size:20px;">Loading</span>
            <x-img style="min-height:100px;" :src="src" v-if="render" :scroller="$refs.scroller" @on-success="success"
                @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="300"></x-img>
        </div>
    </div>
</scroller>
```

<p class="tip demo-tip" key="/interaction/imgscroller">
    示例代码路径：`demo/interaction/imgscroller`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 滚动数字 `NumberRoller`

`NumberRoller`滚动数字组件，使用动态的效果来显示数字，在初始化显示或者数值改变的时候，采用动态的效果来呈现。动态效果由组件内部实现数字，暂不支持自定义。

``` js
import { NumberRoller } from 'vux'
```

``` html
<number-roller :number="number" :width="6" class="vux-center-h"></number-roller>
<number-roller :number="number1" :width="4" class="vux-center-h"></number-roller>
<number-roller :number="number2" :width="length" class="vux-center-h"></number-roller>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">number</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 数字值 |
| <span class="prop-key" style="white-space:nowrap;">width</span> | <span class="type type-number">Number</span> | 3 | &nbsp; | 数字的字符个数 |

<p class="tip demo-tip" key="/interaction/numberroller">
    示例代码路径：`demo/interaction/numberroller`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 轮播 `Swiper`

普通的轮播场景，使用`Swiper`组件就可以；若需要自定义一些样式，或者内容并不为纯图片可以结合`SwiperItem`子组件来使用。

<span class="vux-component-name">Swiper</span>

`Swiper`，功能强大的轮播组件，支持水平、垂直两个方向的图片、文字等轮播。

``` js
import { Swiper } from 'vux'
```

``` html
<swiper :list="demo01_list" v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
```

<p class="warning">
    `list`为图片列表快捷设置。
    <br/>
    不要在`swiper`里嵌套`scroller`，在`web`上过于复杂化而且手势会有冲突。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">list</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 图片列表，格式：`{ url: '跳转路径或者js代码如javascript:xxx', img: '图片路径', title: '文字说明' }` |
| <span class="prop-key" style="white-space:nowrap;">direction</span> | <span class="type type-string">String</span> | horizontal | &nbsp; | 方向， 可选值有 `horizontal`、`vertical` |
| <span class="prop-key" style="white-space:nowrap;">show-dots</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示提示点 |
| <span class="prop-key" style="white-space:nowrap;">show-desc-mask</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示描述半透明遮罩 |
| <span class="prop-key" style="white-space:nowrap;">dots-position</span> | <span class="type type-string">String</span> | right | &nbsp; | 提示点位置，可选值有 `right`、`left` |
| <span class="prop-key" style="white-space:nowrap;">dots-class</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 提示className |
| <span class="prop-key" style="white-space:nowrap;">auto</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否自动轮播 |
| <span class="prop-key" style="white-space:nowrap;">loop</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否循环 |
| <span class="prop-key" style="white-space:nowrap;">interval</span> | <span class="type type-number">Number</span> | 3000 | &nbsp; | 轮播停留时长 |
| <span class="prop-key" style="white-space:nowrap;">threshold</span> | <span class="type type-number">Number</span> | 50 | &nbsp; | 当滑动超过这个距离时才滑动 |
| <span class="prop-key" style="white-space:nowrap;">duration</span> | <span class="type type-number">Number</span> | 300 | &nbsp; | 切换动画时间 |
| <span class="prop-key" style="white-space:nowrap;">height</span> | <span class="type type-string">String</span> | 180px | &nbsp; | 高度值。如果为`100%`宽度并且知道宽高比，可以设置`aspect-ratio`自动计算高度 |
| <span class="prop-key" style="white-space:nowrap;">aspect-ratio</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 用以根据当前可用宽度计算高度值 |
| <span class="prop-key" style="white-space:nowrap;">min-moving-distance</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 超过这个距离时才滑动 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | index 绑定，使用`v-model`，一般不需要绑定 |

<span class="vux-component-name">SwiperItem</span>

如果你需要自定义一些样式，或者内容并不为纯图片，不要使用`list`图片列表，可使用`SwiperItem`子组件来自定义。

``` js
import { Swiper, SwiperItem } from 'vux'
```

``` html
<swiper auto height="100px">
    <swiper-item class="black">
        <h2 class="title fadeInUp animated">它无孔不入</h2>
    </swiper-item>
    <swiper-item class="black">
        <h2 class="title fadeInUp animated">你无处可藏</h2>
    </swiper-item>
    <swiper-item class="black">
        <h2 class="title fadeInUp animated">不是它可恶</h2>
    </swiper-item>
</swiper>
```
<p class="warning">
    该组件场景是固定高度的内容列表，不支持为不同`swiper-item`设置不同高度。
    <br/>
    如果确实需要设置不同高度，可以通过`ref`获取`swiper`, 通过`this.$refs.swiper.xheight = '100px'`设置。 切记，需要放在`$nextTick`中执行。
</p>

<p class="tip demo-tip" key="/interaction/swiper">
    示例代码路径：`demo/interaction/swiper`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 滑指操作（左滑/右滑） `Swipeout`

滑指操作组件，由`Swipeout`组件和它的子组件`SwipeoutItem`、孙组件`SwipeoutButton`组成。`Swipeout`组件是一个包装组件，`SwipeoutItem`子组件是滑指内容（表现形式是一个行记录），而`SwipeoutButton`孙组件是滑指打开的菜单里的一个菜单按钮。

``` js
import { Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
```

``` html
<swipeout>
    <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
        <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('fav')" type="primary">是的</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete')" type="warn">正确</swipeout-button>
        </div>
        <div slot="content" class="demo-content vux-1px-t">
            JavaScript 是最好的语言
        </div>
    </swipeout-item>

    <!-- 第2个swipeout-item -->
</swipeout>
```

<span class="vux-component-name">Swipeout</span>

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 子组件插槽 | &nbsp; |

<span class="vux-component-name">SwipeoutItem</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">sensitivity</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 滑动多少距离后开始触发菜单显示 |
| <span class="prop-key" style="white-space:nowrap;">auto-close-on-button-click</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 点击按钮后是否收回菜单 |
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否不可滑动 |
| <span class="prop-key" style="white-space:nowrap;">threshold</span> | <span class="type type-number">Number</span> | 0.3 | &nbsp; | 滑动多少距离后自动打开菜单，否则收回。可以为小于1的比例或者宽度值 |
| <span class="prop-key" style="white-space:nowrap;">transition-mode</span> | <span class="type type-string">String</span> | reveal | &nbsp; | 菜单打开方式，`reveal`表示菜单不动内容滑出，`follow`表示菜单随内容滑出 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">left-menu</span> | 左菜单 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">right-menu</span> | 右菜单 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-open</span> |   &nbsp; | 菜单完全打开时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-close</span> |   &nbsp; | 菜单完全关闭时触发 |

* **方法 (`Methods`)**

|  名称  |  参数  |  说明  |  版本  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">open</span> |   `(direction)` | 打开菜单，参数为方向，有 `right`、`left` | &nbsp; | 
| <span class="prop-key" style="white-space:nowrap;">close</span> |   &nbsp; | 关闭菜单 | &nbsp; | 


<span class="vux-component-name">SwipeoutButton</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">text</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 按钮文字，同`slot=default` |
| <span class="prop-key" style="white-space:nowrap;">background-color</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 背景颜色 |
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 内置的颜色类型，可选`primary`, `warn` |
| <span class="prop-key" style="white-space:nowrap;">width</span> | <span class="type type-string">String</span> | 80 | &nbsp; | 按钮宽度 |

<p class="tip demo-tip" key="/interaction/swipeout">
    示例代码路径：`demo/interaction/swipeout`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 毛玻璃（高斯模糊） `Blur`

`Blur`毛玻璃组件，能够对图片进行模糊化显示处理（高斯模糊效果）。

``` js
import { Blur } from 'vux'
```

``` html
<blur :blur-amount="5" :url="url">
    <p class="center"><img :src="url"></p>
</blur>
```

<p class="warning">
    当前组件使用`svg`实现模糊效果。如果在手机上渲染过慢，可以尝试直接使用css3的`blur filter`。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">blur-amount</span> | <span class="type type-number">Number</span> | 10 | &nbsp; | 模糊程度 |
| <span class="prop-key" style="white-space:nowrap;">url</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 图片地址 |
| <span class="prop-key" style="white-space:nowrap;">height</span> | <span class="type type-number">Number</span> | 200 | &nbsp; | 容器高度 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 容器内容，显示在模糊内容上层 | &nbsp; |

<p class="tip demo-tip" key="/interaction/blur">
    示例代码路径：`demo/interaction/blur`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>
