### 表单分组 `Group`

**`Group`**是一个特殊的表单包装组件，主要用于将表单分组，单个表单元素也可以算一组。常见的表单组件都必须作为`Group`的子组件。 属于`Group`子组件的有：`Cell`, `XInput`, `XTextarea`, `XSwitch`, `Calendar`, `XNumber`, `Radio`, `XAddress`, `Datetime`, `Selector`。

``` js
import { Group } from 'vux'
```

``` html
<group label-width="4.5em" label-margin-right="2em" label-align="right" title="分组2" title-color="green">
    <x-number title="Quantity" align="left" v-model="numberValue" button-style="round" :min="0" :max="5"></x-number>
    <datetime title="时&emsp;&emsp;&nbsp;间" v-model="time1" value-text-align="left"></datetime>
    <selector title="隐患类别" :options="['工艺技术', '其他']" v-model="value2"></selector>
    <selector title="隐患类别" placeholder="Placeholder" :options="['工艺技术', '其他']" v-model="value7"></selector>
    <selector title="隐患类别" :options="['工艺技术', '其他']" v-model="value8"></selector>
    <x-input title="隐患部位" placeholder="必填" v-model="value3"></x-input>
    <x-input title="密码" type="password" placeholder="必填" v-model="value4"></x-input>
    <popup-picker title="请选择" :data="list" v-model="value5" value-text-align="left"></popup-picker>
    <popup-picker title="请选择" placeholder="Required" :data="list" v-model="value6" value-text-align="left"></popup-picker>
    <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" value-text-align="left"></x-address>
    <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
    <x-textarea placeholder="请填写详细信息" :show-counter="false" :rows="3">
        <img slot="restricted-label" style="display:inline-block;vertical-align:middle;" :src="imgUrl" width="24" height="24">
    </x-textarea>
</group>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 分组标题 |
| <span class="prop-key" style="white-space:nowrap;">titleColor</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 分组标题文字颜色 |
| <span class="prop-key" style="white-space:nowrap;">labelWidth</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 为子元素设定统一label宽度 |
| <span class="prop-key" style="white-space:nowrap;">labelAlign</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 为子元素设定统一对齐方式 |
| <span class="prop-key" style="white-space:nowrap;">labelMarginRight</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 为子元素设定统一的右边margin |
| <span class="prop-key" style="white-space:nowrap;">gutter</span> | <span class="type type-string">String</span><br/><span class="type type-number">Number</span> | &nbsp; | &nbsp; | 设定group的上边距，只能用于没有标题时，设为数字时单位是px |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 子组件插槽 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">title</span> | 标题插槽 | <span style="font-size:12px;white-space:nowrap;">v2.5.1</span> |

<p class="tip demo-tip" key="/form/group">
    示例代码路径：`demo/form/group`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 单行文本框 `XInput`

`XInput`单行文本框，自带label标签，可以定义标签样式。支持必填和数据类型的验证，可以自定义验证函数。

``` js
import { XInput } from 'vux'
```

```html
<group>
    <x-input title="title" v-model="value"></x-input>
</group>
```

<p class="warning">
    `x-input`只能在`Group`中使用。
</p>

如果你想实现在输入框右边按钮切换密码明文，请使用`slot=right`实现`type`切换。

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单值，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | text | &nbsp; | 即input的`type`属性，目前支持 `text`,`number`,`email`,`password`,`tel` |
| <span class="prop-key" style="white-space:nowrap;">is-type</span> | <span class="type type-string">String</span><br/><span class="type type-function">Function</span> | &nbsp; | &nbsp; | 内置验证器，支持`email`,`china-name`,`china-mobile`, 同样也支持直接传函数, 需要同步返回一个对象`{valid:true}`或者`{valid:false, msg:错误信息}` |
| <span class="prop-key" style="white-space:nowrap;">required</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否必填，如果不禁用验证，当没有填写时会在右侧显示错误icon |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | label文字 |
| <span class="prop-key" style="white-space:nowrap;">placeholder</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | placeholder 提示 |
| <span class="prop-key" style="white-space:nowrap;">show-clear</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示清除icon |
| <span class="prop-key" style="white-space:nowrap;">min</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 最小输入字符限制 |
| <span class="prop-key" style="white-space:nowrap;">max</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 最大输入字符限制，等同于`maxlength`，达到限制到不能再输入 |
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否禁用填写 |
| <span class="prop-key" style="white-space:nowrap;">readonly</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 同input的标准属性readonly |
| <span class="prop-key" style="white-space:nowrap;">debounce</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 用户停止输入等待的毫秒数，用以限制`on-change`事件触发。如果你需要根据用户输入做`ajax`请求，建议设置它以节省无效请求和服务器资源，比如可设为500 |
| <span class="prop-key" style="white-space:nowrap;">placeholder-align</span> | <span class="type type-string">String</span> | left | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.8</span> | placeholder 文字对齐方式 |
| <span class="prop-key" style="white-space:nowrap;">text-align</span> | <span class="type type-string">String</span> | left | &nbsp; | 值对齐方式 |
| <span class="prop-key" style="white-space:nowrap;">label-width</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.4</span> | label 宽度，权重比 group 的 labelWidth 高。不设定时将进行自动宽度计算，但超过15个字符时不会进行宽度设定。 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">label</span> | 用于自定义`label`(即 title)部分内容，比如使用`icon` | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">restricted-label</span> | 用于自定义`label`部分，和`slot=label`不同的是，该slot宽度受到父组件`group`的限制 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">right</span> | 用以在输入框右边显示内容，比如验证码图片，单位，切换密码显示方式等 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-blur</span> |   `(value)` | input的`blur`事件 |
| <span class="prop-key" style="white-space:nowrap;">on-focus</span> |   `(value)` | input的`focus`事件 |
| <span class="prop-key" style="white-space:nowrap;">on-enter</span> |   `(value)` | input输入完成后点击`enter(确认)`事件 |
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | 输入值变化时触发。如果你使用了`debounce`，那么触发将不会是实时的。 |

* **方法 (`Methods`)**

|  名称  |  参数  |  说明  |  版本  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">focus</span> |   &nbsp; | 手动获得焦点 | &nbsp; | 
| <span class="prop-key" style="white-space:nowrap;">blur</span> |   &nbsp; | 手动设置 input 失去焦点 | &nbsp; | 
| <span class="prop-key" style="white-space:nowrap;">reset</span> |   `(value = '')` | 重置输入框值，清除错误信息 |<span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.10</span> | 

<p class="tip demo-tip" key="/form/input">
    示例代码路径：`demo/form/input`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 多行文本框 `XTextarea`

`XTextarea`多行文本框，自带label标签，支持输入计数。

``` js
import { XTextarea } from 'vux'
```

```html
<group>
    <x-textarea title="title" v-model="value"></x-textarea>
</group>
```

<p class="warning">
    `x-textarea`只能在`Group`中使用。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.8</span> | label文字 |
| <span class="prop-key" style="white-space:nowrap;">inline-desc</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.8</span> | 位于标题下的描述文字，副标题 |
| <span class="prop-key" style="white-space:nowrap;">show-counter</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示计数 |
| <span class="prop-key" style="white-space:nowrap;">max</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 最大长度限制 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单值, 使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">name</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单名字 |
| <span class="prop-key" style="white-space:nowrap;">placeholder</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 没有值时的提示文字 |
| <span class="prop-key" style="white-space:nowrap;">rows</span> | <span class="type type-number">Number</span> | 3 | &nbsp; | textarea 标准属性 rows |
| <span class="prop-key" style="white-space:nowrap;">cols</span> | <span class="type type-number">Number</span> | 30 | &nbsp; | textarea 标签属性 cols |
| <span class="prop-key" style="white-space:nowrap;">height</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 高度 |
| <span class="prop-key" style="white-space:nowrap;">readonly</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | textarea 标签属性 readonly |
| <span class="prop-key" style="white-space:nowrap;">autosize</span> | <span class="type type-boolean">Boolean</span> | false | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.6</span> | 是否根据内容自动设置高度 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">label</span> | 用于自定义`label`(即 title)部分内容，比如使用`icon` | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.8</span> |
| <span class="prop-key" style="white-space:nowrap;">restricted-label</span> | 用于自定义`label`部分，和`slot=label`不同的是，该slot宽度受到父组件`group`的限制 | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.8</span> |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | 表单值变化时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-focus</span> |   &nbsp; | focus 事件 |
| <span class="prop-key" style="white-space:nowrap;">on-blur</span> |   &nbsp; | blur 事件 |

* **方法 (`Methods`)**

|  名称  |  参数  |  说明  |  版本  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">updateAutosize</span> |   &nbsp; | 重置 autosize 高度，如果绑定值不为空，需要调用该函数进行高度重置 |<span style="font-size:12px;white-space:nowrap;">v2.5.1</span> | 

<p class="tip demo-tip" key="/form/textarea">
    示例代码路径：`demo/form/textarea`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 数字输入框 `XNumber`

`XNumber`数字输入框，通过加减按钮实现数字的快速录入，这对于录入限制在小范围之内的数字比较有用。也支持直接手动输入。

``` js
import { XNumber } from 'vux'
```

```html
<group>
    <x-number title="title" v-model="value"></x-number>
</group>
```

<p class="warning">
    `x-number`只能在`Group`中使用。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 表单值，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标题 |
| <span class="prop-key" style="white-space:nowrap;">min</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 最小值 |
| <span class="prop-key" style="white-space:nowrap;">max</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 最大值 |
| <span class="prop-key" style="white-space:nowrap;">step</span> | <span class="type type-number">Number</span> | 1 | &nbsp; | 步长 |
| <span class="prop-key" style="white-space:nowrap;">fillable</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否可填写 |
| <span class="prop-key" style="white-space:nowrap;">width</span> | <span class="type type-string">String</span> | 50px | &nbsp; | 输入框宽度 |
| <span class="prop-key" style="white-space:nowrap;">button-style</span> | <span class="type type-string">String</span> | square | &nbsp; | 按钮样式，可选值为`square`或者`round` |
| <span class="prop-key" style="white-space:nowrap;">align</span> | <span class="type type-string">String</span> | right | &nbsp; | 按钮部分位置，默认在右边(right)，可选值为`left`和`right` |

<p class="tip demo-tip" key="/form/number">
    示例代码路径：`demo/form/number`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 范围数字输入框 `Range`

`Range`范围数字输入框，支持在一个限定范围内，通过拖动滑块的形式，快速选定数字。

``` js
import { Range } from 'vux'
```

``` html
<cell title="change min and max" primary="content">
    <range v-model="dynamiValue" :min="min" :max="max" :step="step"></range>
</cell>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 表单值，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">decimal</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否在变化时显示小数 |
| <span class="prop-key" style="white-space:nowrap;">min</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 可选最小值 |
| <span class="prop-key" style="white-space:nowrap;">max</span> | <span class="type type-number">Number</span> | 100 | &nbsp; | 可选最大值 |
| <span class="prop-key" style="white-space:nowrap;">step</span> | <span class="type type-number">Number</span> | 1 | &nbsp; | 步长 |
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否禁用 |
| <span class="prop-key" style="white-space:nowrap;">minHTML</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 最小值显示的html模板 |
| <span class="prop-key" style="white-space:nowrap;">maxHTML</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 最大值显示的html模板 |
| <span class="prop-key" style="white-space:nowrap;">disabled-opacity</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 禁用样式的透明度 |
| <span class="prop-key" style="white-space:nowrap;">rangeBarHeight</span> | <span class="type type-number">Number</span> | 1 | &nbsp; | 高度 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | 绑定值变化时触发事件 |

<p class="tip demo-tip" key="/form/numberrange">
    示例代码路径：`demo/form/numberrange`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 按钮 `XButton`

`XButton`按钮组件，支持多种按钮类型和尺寸。它其实是`button`元素的再封装，所以支持自定义样式（通过`style`或`class`）。支持设置路由地址，也支持组件的原生点击事件。

``` js
import { XButton } from 'vux'
```

``` html
<x-button type="warn" action-type="reset">reset</x-button>
```

<p class="warning">
    按照[`Vue`文档](https://cn.vuejs.org/v2/guide/components.html#使用-v-on-绑定自定义事件)，在组件上绑定点击事件请使用`@click.native`。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | default | &nbsp; | 按钮类型，可选值为 `default,primary,warn` |
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否不可点击 |
| <span class="prop-key" style="white-space:nowrap;">text</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 按钮文字，同默认slot |
| <span class="prop-key" style="white-space:nowrap;">mini</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否为mini类型，即小尺寸的按钮 |
| <span class="prop-key" style="white-space:nowrap;">plain</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否是plain样式，没有背景色 |
| <span class="prop-key" style="white-space:nowrap;">action-type</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | `button`的type属性，默认为浏览器默认(submit)，可选为 `submit` `button` `reset` |
| <span class="prop-key" style="white-space:nowrap;">link</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.3.5</span> | vue-router 路由, 值为 `BACK` 等同于 `go(-1)` |
| <span class="prop-key" style="white-space:nowrap;">show-loading</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 显示加载图标 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 按钮文字 | &nbsp; |

<p class="tip demo-tip" key="/form/button">
    示例代码路径：`demo/form/button`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 日期选择框

#### <span class="vux-component-name">Datetime</span>

`Datetime`，功能强大的日期选择框，支持选择日期、时间、日期和时间范围设定等。

``` js
import { Datetime } from 'vux'
```

``` html
<group title="默认格式：YYYY-MM-DD">
    <datetime v-model="value1" @on-change="change" title="生日"></datetime>
</group>
```

<p class="warning">
    `Datetime`只能在`Group`组件中使用。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">format</span> | <span class="type type-string">String</span> | YYYY-MM-DD | &nbsp; | 时间格式 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标题 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单值，`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">inline-desc</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 描述字符 |
| <span class="prop-key" style="white-space:nowrap;">placeholder</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 提示文字 |
| <span class="prop-key" style="white-space:nowrap;">min-year</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 可选择的最小年份 |
| <span class="prop-key" style="white-space:nowrap;">max-year</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 可选择的最大年份 |
| <span class="prop-key" style="white-space:nowrap;">confirm-text</span> | <span class="type type-string">String</span> | ok(确认) | &nbsp; | 确认按钮文字 |
| <span class="prop-key" style="white-space:nowrap;">cancel-text</span> | <span class="type type-string">String</span> | cancel(取消) | &nbsp; | 取消按钮文字 |
| <span class="prop-key" style="white-space:nowrap;">clear-text</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 显示在中间的自定义按钮的文字 |
| <span class="prop-key" style="white-space:nowrap;">year-row</span> | <span class="type type-string">String</span> | {value} | &nbsp; | 年份的渲染模板。选择框内的年份默认只显示数字，如渲染模版设置为：{value}年，则选择框内的年份后有“年”字，下同 |
| <span class="prop-key" style="white-space:nowrap;">month-row</span> | <span class="type type-string">String</span> | {value} | &nbsp; | 月份的渲染模板 |
| <span class="prop-key" style="white-space:nowrap;">day-row</span> | <span class="type type-string">String</span> | {value} | &nbsp; | 日期的渲染模板 |
| <span class="prop-key" style="white-space:nowrap;">hour-row</span> | <span class="type type-string">String</span> | {value} | &nbsp; | 小时的渲染模板 |
| <span class="prop-key" style="white-space:nowrap;">minute-row</span> | <span class="type type-string">String</span> | {value} | &nbsp; | 分钟的渲染模板 |
| <span class="prop-key" style="white-space:nowrap;">min-hour</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 限定小时最小值 |
| <span class="prop-key" style="white-space:nowrap;">max-hour</span> | <span class="type type-number">Number</span> | 23 | &nbsp; | 限定小时最大值 |
| <span class="prop-key" style="white-space:nowrap;">start-date</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 限定最小日期，注意该限制只能限定到日期，不能限定到小时分钟。小时限定请使用`min-hour`和`max-hour` |
| <span class="prop-key" style="white-space:nowrap;">end-date</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 限定最大日期，注意该限制只能限定到日期，不能限定到小时分钟 |
| <span class="prop-key" style="white-space:nowrap;">required</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否必填 |
| <span class="prop-key" style="white-space:nowrap;">display-format</span> | <span class="type type-function">Function</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.11</span> | 自定义显示值 |
| <span class="prop-key" style="white-space:nowrap;">readonly</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.3.6</span> | 只读模式，显示类似于 cell |
| <span class="prop-key" style="white-space:nowrap;">show</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.3.7</span> | 控制显示，要求 vue^2.3 |
| <span class="prop-key" style="white-space:nowrap;">default-selected-value</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.4.1</span> | 设置默认选中日期，当前 value 为空时有效 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">title</span> | title slot | <span style="font-size:12px;white-space:nowrap;">v2.3.6</span> |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | 表单值变化时触发, 参数 `(newVal)` |

#### <span class="vux-component-name">DatetimeRange</span>

`DatetimeRange`是一个简易的选择时间的组件，它与`Datetime`不同的地方是`年月日`集中显示在一栏，适合范围不大的日期选择。

``` js
import { DatetimeRange } from 'vux'
```

``` html
<group :title="'datatime-range：' + value + ''">
    <datetime-range title="选择" start-date="2017-01-01" end-date="2017-02-02" format="YYYY年MM月DD日" v-model="value"
        @on-change="onChange">
    </datetime-range>
</group>
```

<p class="warning">
    需要在`Group`组件里使用。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标题文字 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单值，`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">inline-desc</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 描述字符 |
| <span class="prop-key" style="white-space:nowrap;">placeholder</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 提示文字 |
| <span class="prop-key" style="white-space:nowrap;">start-date</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 限定最小日期，注意该限制只能限定到日期，不能限定到小时分钟 |
| <span class="prop-key" style="white-space:nowrap;">end-date</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 限定最大日期，注意该限制只能限定到日期，不能限定到小时分钟 |
| <span class="prop-key" style="white-space:nowrap;">format</span> | <span class="type type-string">String</span> | YYYY-MM-DD | &nbsp; | 日期栏的显示格式 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | 表单值变化时触发, 参数 `(newVal)` |

<p class="tip demo-tip" key="/form/datetime">
    示例代码路径：`demo/form/datetime`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 日历（内联） `InlineCalendar`

`InlineCalendar`，功能强大的日历组件，在页面上内联显示。

``` js
import { InlineCalendar } from 'vux'
```

``` html
<inline-calendar class="inline-calendar-demo" :show.sync="show" v-model="value" start-date="2016-04-01" end-date="2018-05-30"
    :range="range" :show-last-month="showLastMonth" :show-next-month="showNextMonth" :highlight-weekend="highlightWeekend"
    :return-six-rows="return6Rows" :hide-header="hideHeader" :hide-week-list="hideWeekList" :replace-text-list="replaceTextList"
    :weeks-list="weeksList" :render-function="buildSlotFn" :disable-past="disablePast" :disable-future="disableFuture">
</inline-calendar>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 当前选中日期，使用`v-model`绑定，默认为空，即选中当天日期 |
| <span class="prop-key" style="white-space:nowrap;">render-month</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 指定渲染日期，如 [2018, 8] |
| <span class="prop-key" style="white-space:nowrap;">start-date</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 起始日期，格式为 `YYYY-MM-dd` |
| <span class="prop-key" style="white-space:nowrap;">end-date</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 结束日期，格式为`YYYY-MM-dd` |
| <span class="prop-key" style="white-space:nowrap;">show-last-month</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示上个月的日期 |
| <span class="prop-key" style="white-space:nowrap;">show-next-month</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示下个月的日期 |
| <span class="prop-key" style="white-space:nowrap;">highlight-weekend</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否高亮周末 |
| <span class="prop-key" style="white-space:nowrap;">return-six-rows</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否总是渲染6行日期 |
| <span class="prop-key" style="white-space:nowrap;">hide-header</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否隐藏日历头部 |
| <span class="prop-key" style="white-space:nowrap;">hide-week-list</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否隐藏星期列表 |
| <span class="prop-key" style="white-space:nowrap;">replace-text-list</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | 替换列表，可以将默认的日期换成文字，比如今天的日期替换成今，{'TODAY':'今'} |
| <span class="prop-key" style="white-space:nowrap;">weeks-list</span> | <span class="type type-array">Array</span> | ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] | &nbsp; | 星期列表，从周日开始 |
| <span class="prop-key" style="white-space:nowrap;">render-function</span> | <span class="type type-function">Function</span> | &nbsp; | &nbsp; | 用于为特定日期添加额外的html内容，参数为(行index,列index,日期详细属性) |
| <span class="prop-key" style="white-space:nowrap;">render-on-value-change</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 当日期变化时是否重新渲染日历，如果是渲染了多个日历的话需要设为false |
| <span class="prop-key" style="white-space:nowrap;">disable-past</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 禁止选择过去的日期，该选项可以与start-date同时使用 |
| <span class="prop-key" style="white-space:nowrap;">disable-future</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 禁止选择未来的日期，该选项可以end-date同时使用 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">each-day</span> | 用以自定义每一天的显示渲染，使用该 slot 就不需要 render-function 了 | <span style="font-size:12px;white-space:nowrap;">v2.3.5</span> |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   &nbsp; | 值变化时触发 |

<p class="tip demo-tip" key="/form/inlinecalendar">
    示例代码路径：`demo/form/inlinecalendar`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 日历 `Calendar`

`Calendar`，日历组件，上拉弹出显示，除了`title`和 `value`, 其他`props`和`inline-calendar`完全一致。

``` js
import { Calendar } from 'vux'
```

```html
<group>
    <calendar title="title" v-model="value"></calendar>
</group>
```

<p class="warning">
    `calendar`只能在`Group`中使用。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单值, `v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | label文字 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   (value) | 值改变时触发 |

<p class="tip demo-tip" key="/form/calendar">
    示例代码路径：`demo/form/calendar`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 复选按钮 `Checker`

`Checker`复选按钮，支持单选或多选，是比`Radio`或者`Checklist`更加灵活的选择组件，可以自定义需要的布局样式。

``` js
import { Checker, CheckerItem } from 'vux'
```

``` html
<checker v-model="demo1" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
    <checker-item value="1">潘</checker-item>
    <checker-item value="2">闲</checker-item>
    <checker-item value="3">邓</checker-item>
    <checker-item value="4">小</checker-item>
    <checker-item value="5">驴</checker-item>
</checker>
```

<span class="vux-component-name">Checker</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default-item-class</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 默认状态class |
| <span class="prop-key" style="white-space:nowrap;">selected-item-class</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 选中样式class |
| <span class="prop-key" style="white-space:nowrap;">disabled-item-class</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 不可选样式class |
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | radio | &nbsp; | 类型，单选为`radio`, 多选为`checkbox` |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 表单值，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">max</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 最多可选个数，多选时可用 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | value值变化时触发 |

<span class="vux-component-name">CheckerItem</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 当前项的值 |
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否为不可选 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-item-click</span> |   `(itemValue, itemDisabled)` | 当前项被点击时触发 |

<p class="tip demo-tip" key="/form/checker">
    示例代码路径：`demo/form/checker`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 复选按钮列表 `Checklist`

`Checklist`复选按钮列表，勾选效果。

``` js
import { Checklist } from 'vux'
```

``` html
<checklist title="基本用法" :label-position="labelPosition" required :options="commonList" v-model="checklist001"
    @on-change="change">
</checklist>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 表单值 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标题 |
| <span class="prop-key" style="white-space:nowrap;">required</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否为必填 |
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 选项列表，可以为`[{key:'name',value:'value',inlineDesc:'inlineDesc'}]`的形式 |
| <span class="prop-key" style="white-space:nowrap;">max</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 最多可选个数 |
| <span class="prop-key" style="white-space:nowrap;">min</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 最少可选个数 |
| <span class="prop-key" style="white-space:nowrap;">random-order</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否随机打乱选项顺序 |
| <span class="prop-key" style="white-space:nowrap;">check-disabled</span> | <span class="type type-boolean">Boolean</span> | true | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.1</span> | 是否进行可选检测，默认情况下当选择个数等于可选个数(max)时，其他项不可选择。该选项主要适用于从多个选项列表中收集值的场景。注意的该选项设为 false 时 max 设置将失效。 |
| <span class="prop-key" style="white-space:nowrap;">label-position</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.4</span> | label 位置，可以设置为 left |
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.3.8</span> | 是否禁用操作 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   (value) | 值变化时触发，参数为 (value) |

<p class="tip demo-tip" key="/form/checkerlist">
    示例代码路径：`demo/form/checkerlist`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 单选按钮

#### <span class="vux-component-name">Radio</span>

`Radio`单选按钮，勾选效果，支持填写文本（用于选项列表中没有一项合适的场景）。

``` js
import { Radio } from 'vux'
```

```html
<group>
    <radio title="title" :options="options" v-model="value"></radio>
</group>
```

可选列表`options`可以为简单数组，也可以为`key=>value`形式键值对。

``` js
const options = [ 'China', 'Japan' ]

const options2 = [{
    icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
    key: '001',
    value: 'radio001'
},
{
    icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
    key: '002',
    value: 'radio002'
}]
```

<p class="warning">
    `radio`只能在`Group`中使用。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单值，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 可选列表，可以用字符串组成的数组或者 `key=>value` 的形式 |
| <span class="prop-key" style="white-space:nowrap;">fill-mode</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否可填写 |
| <span class="prop-key" style="white-space:nowrap;">fill-placeholder</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 可填写时的提示文字 |
| <span class="prop-key" style="white-space:nowrap;">fill-label</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 可填写时的label文字 |
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-boolean">Boolean</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.3.8</span> | 禁用操作 |
| <span class="prop-key" style="white-space:nowrap;">selected-label-style</span> | <span class="type type-object">Object</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.4.0</span> | 设置选中时的 label 样式，比如使用其他颜色更容易区分是否为选中项 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">each-item</span> | 自定义如何显示每一项 | <span style="font-size:12px;white-space:nowrap;">v2.3.5</span> |

#### <span class="vux-component-name">PopupRadio</span>

`PopupRadio`，上拉弹出式单选按钮，属性同`cell`和`Radio`的属性，需要注意的是不支持`fillMode`。

``` js
import { PopupRadio } from 'vux'
```

``` html
<group title="popup-radio">
    <popup-radio title="options" :options="options2" v-model="option2"></popup-radio>
</group>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">readonly</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.3.6</span> | 只读样式，类似于 cell |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">popup-header</span> | 弹窗顶部 | <span style="font-size:12px;white-space:nowrap;">v2.3.3</span> |
| <span class="prop-key" style="white-space:nowrap;">each-item</span> | 自定义每个条目显示内容 | <span style="font-size:12px;white-space:nowrap;">v2.3.7</span> |

<p class="tip demo-tip" key="/form/radio">
    示例代码路径：`demo/form/radio`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 开关按钮 `XSwitch`

`XSwitch`开关按钮，绑定的值为布尔类型。

``` js
import { XSwitch } from 'vux'
```

```html
<group>
    <x-switch title="title" v-model="value"></x-switch>
</group>
```

<p class="warning">
    `x-switch`只能在`Group`中使用。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | label文字 |
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否不可点击 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 表单值, 使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">inline-desc</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标签下文字 |
| <span class="prop-key" style="white-space:nowrap;">prevent-default</span> | <span class="type type-boolean">Boolean</span> | false | <span style="font-size:12px;white-space:nowrap;">v2.5.0</span> | 阻止点击时自动设定值 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | 值变化时触发，参数为 (currentValue) |
| <span class="prop-key" style="white-space:nowrap;">on-click</span> |   `(newVal, oldVal)` | 点击组件时触发 |

<p class="tip demo-tip" key="/form/switch">
    示例代码路径：`demo/form/switch`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 选择框 `Selector`

`Selector`是基于`select`元素封装的选择组件。

``` js
import { Selector } from 'vux'
```

```html
<group>
    <selector title="title" v-model="value"></selector>
</group>
```
<p class="warning">
    `Selector`只能在`Group`中使用。
    <br/>
    在`iOS`上，如果没有指定`placeholder`也没有指定`value`，会出现弹出选择框时默认选中第一个值，但是确定后依然没有选中的情况。 <br/> 因此对于`iOS`，组件内部在列表项前面增加了一个空的`option`，强制用户滑动选择一次以避免上面的问题。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span><br/><span class="type type-number">Number</span><br/><span class="type type-object">Object</span> | &nbsp; | &nbsp; | 表单值，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标题 |
| <span class="prop-key" style="white-space:nowrap;">direction</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 选项对齐方式，是`css`属性，值有：`ltr`（左对齐，默认）、`rtl`（右对齐）、`inherit`（继承父元素）等 |
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 选项列表，可以为简单数组，或者 `{ key: KEY, value: VALUE }` 结构的键值对数组。当使用键值对时，返回的`value`为`key`的值。 |
| <span class="prop-key" style="white-space:nowrap;">name</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单的name名字 |
| <span class="prop-key" style="white-space:nowrap;">placeholder</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 提示文字 |
| <span class="prop-key" style="white-space:nowrap;">readonly</span> | <span class="type type-string">String</span> | false | &nbsp; | 是否不可选择 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | 值变化时触发 |

<p class="tip demo-tip" key="/form/select">
    示例代码路径：`demo/form/select`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 选择器 `Picker`

`Picker`，功能强大的选择器，支持单列、多列选择，多列选择时，支持联动（联动时列表项数据要提供parent属性）。

``` js
import { Picker } from 'vux'
```

``` html
<picker :data='years001' v-model='year001' @on-change='change'></picker>
```

<p class="warning">
    请确保列表项的`value`值是字符串，使用数字会出错。
    <br />
    如果你的业务接口返回数字值为数字，需要你先处理成数字；同样，获取到值时为字符串，你需要自己转换成数字。
</p>

非联动情况下，列表数据格式示例：

``` js
// data
[['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你'], ['小米1', 'iPhone2', '华为3', '情怀4', '三星5', '其他6', '不告诉你7']]

// 或者使用 name => value 的形式
[[{
    name: '2019届5班',
    value: '1'
},
{
    name: '2019届4班',
    value: '2'
}]]

// value
['小米', '小米1']
```

联动时，列表数据格式示例：

``` js
// data
[{
    name: '中国',
    value: 'china',
    parent: 0
},
{
    name: '美国',
    value: 'USA',
    parent: 0
},
{
    name: '广东',
    value: 'china001',
    parent: 'china'
},
{
    name: '广西',
    value: 'china002',
    parent: 'china'
},
{
    name: '美国001',
    value: 'usa001',
    parent: 'USA'
},
{
    name: '美国002',
    value: 'usa002',
    parent: 'USA'
},
{
    name: '广州',
    value: 'gz',
    parent: 'china001'
},
{
    name: '深圳',
    value: 'sz',
    parent: 'china001'
},
{
    name: '广西001',
    value: 'gx001',
    parent: 'china002'
},
{
    name: '广西002',
    value: 'gx002',
    parent: 'china002'
},
{
    name: '美国001_001',
    value: '0003',
    parent: 'usa001'
},
{
    name: '美国001_002',
    value: '0004',
    parent: 'usa001'
},
{
    name: '美国002_001',
    value: '0005',
    parent: 'usa002'
},
{
    name: '美国002_002',
    value: '0006',
    parent: 'usa002'
}]
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 表单值，使用 `v-model` 绑定 |
| <span class="prop-key" style="white-space:nowrap;">data</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 选项列表数据 |
| <span class="prop-key" style="white-space:nowrap;">columns</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 指定联动模式下的列数，当不指定时表示非联动 |
| <span class="prop-key" style="white-space:nowrap;">fixed-columns</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 指定显示多少列，隐藏多余的 |
| <span class="prop-key" style="white-space:nowrap;">column-width</span> | <span class="type type-array">Array</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.2.0</span> | 定义每一列宽度，只需要定义除最后一列宽度，最后一列自动宽度， 比如对于3列选择，可以这样：[1/2, 1/5] |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | 选择值变化时触发 |

* **方法 (`Methods`)**

|  名称  |  参数  |  说明  |  版本  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">getNameValues</span> |   &nbsp; | 根据 value 获取字面值 |<span style="font-size:12px;white-space:nowrap;">v2.3.1</span> | 

<p class="tip demo-tip" key="/form/picker">
    示例代码路径：`demo/form/picker`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 选择框 `PopupPicker`

`PopupPicker`，以上拉弹框的形式显示选择区域，其他基本与`picker`一致。

``` js
import { PopupPicker } from 'vux'
```

``` html
<popup-picker :title="title1" :data="list1" v-model="value1" @on-show="onShow" @on-hide="onHide" @on-change="onChange"
    placeholder="请选择">
</popup-picker>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 表单值，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标题 |
| <span class="prop-key" style="white-space:nowrap;">cancel-text</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 弹窗的取消文字 |
| <span class="prop-key" style="white-space:nowrap;">confirm-text</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 弹窗的确认文字 |
| <span class="prop-key" style="white-space:nowrap;">placeholder</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 提示文字 |
| <span class="prop-key" style="white-space:nowrap;">show-name</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示文字值而不是key |
| <span class="prop-key" style="white-space:nowrap;">inline-desc</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | Cell的描述文字 |
| <span class="prop-key" style="white-space:nowrap;">value-text-align</span> | <span class="type type-string">String</span> | right | <span style="font-size:12px;white-space:nowrap;">v2.1.0-rc.3</span> | value 对齐方式(text-align) |
| <span class="prop-key" style="white-space:nowrap;">display-format</span> | <span class="type type-function">Function</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.7</span> | 自定义在cell上的显示格式，参数为当前 value，使用该属性时，show-name 属性将失效 |
| <span class="prop-key" style="white-space:nowrap;">popup-style</span> | <span class="type type-object">Object</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.5.2</span> | 弹窗样式，可以用于强制指定 z-index |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">title</span> | 标题插槽，使用 scope.labelClass 和 scope.labelStyle 继承原有样式(实现样式受控于 group label 设置) | <span style="font-size:12px;white-space:nowrap;">v2.3.7</span> |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | 值变化时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-show</span> |   &nbsp; | 弹窗出现时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-hide</span> |   `(closeType)` true表示confirm(选择确认), false表示其他情况的关闭 | 弹窗关闭时触发 |

<p class="tip demo-tip" key="/form/pickerpopup">
    示例代码路径：`demo/form/pickerpopup`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 颜色选择 `ColorPicker`

`ColorPicker`，一个简单的颜色选择组件。

``` js
import { ColorPicker } from 'vux'
```

``` html
<color-picker :colors="colors1" v-model="color1" size="middle"></color-picker>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单值，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">colors</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 可选颜色列表 |
| <span class="prop-key" style="white-space:nowrap;">size</span> | <span class="type type-string">String</span> | large | &nbsp; | 按钮大小，可选值有 `large`、`middle`、`small` |

<p class="tip demo-tip" key="/form/colorpicker">
    示例代码路径：`demo/form/colorpicker`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 上传框

用`weui`的样式实现的上传框，使用的是`input:file`元素，`accept="image/*"`，手机调用时效果是选择照片或拍照。

``` js
import 'vux/src/styles/weui/widget/weui-uploader/index.less'
```

``` html
<div class="weui-uploader__input-box">
    <input class="weui-uploader__input" type="file" accept="image/*" multiple />
</div>
```

<p class="tip demo-tip" key="/form/uploader">
    示例代码路径：`demo/form/uploader`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 地址输入 `XAddress`

``` js
import { XAddress } from 'vux'

// ChinaAddressV3Data是最新版的地址数据
import { XAddress, ChinaAddressV3Data } from 'vux'

// 如果需要引入旧版数据
import { XAddress, ChinaAddressV2Data } from 'vux'
```

```html
<group>
    <x-address title="title" v-model="value"></x-address>
</group>
```

<p class="warning">
    `ChinaAddressV3Data`和`ChinaAddressV2Data`都是`json`地址数据。
    <br/>
    如果你需要单独引入地址数据，可以在源码[src/datas](https://github.com/airyland/vux/tree/v2/src/datas)找到。
    <br/>
    不同版本数据差异可以从[这里](https://github.com/airyland/china-area-data)找到。
    <br/>
    `x-address`只能在`Group`中使用。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">raw-value</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 指定初始化时绑定的数据是否为文本(即省市名，而不是id)类型，即对于非id值组件内部会转换为id。如果是异步设置value，只能使用id赋值。 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单标题 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 表单值, 使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">list</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 地址列表, 可以引入内置地址数据或者用自己的数据，但是需要按照一致的数据结构。 |
| <span class="prop-key" style="white-space:nowrap;">inline-desc</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标题下的描述 |
| <span class="prop-key" style="white-space:nowrap;">placeholder</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 没有值时的提示文字 |
| <span class="prop-key" style="white-space:nowrap;">hide-district</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否隐藏区，即只显示省份和城市 |
| <span class="prop-key" style="white-space:nowrap;">value-text-align</span> | <span class="type type-string">String</span> | right | &nbsp; | value 对齐方式(text-align), `v2.1.0-rc.49`开始支持 |
| <span class="prop-key" style="white-space:nowrap;">popup-style</span> | <span class="type type-object">Object</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.5.2</span> | 弹窗样式，可以用于强制指定 z-index |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">title</span> | title 插槽，可以使用它来添加 icon 等自定义样式，受控于 group 需要从 scope 里继承 class 和 样式 | <span style="font-size:12px;white-space:nowrap;">v2.3.8</span> |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-hide</span> |   &nbsp; | 关闭后触发，当非确定时，参数为false，反之为true |
| <span class="prop-key" style="white-space:nowrap;">on-show</span> |   &nbsp; | 显示时触发 |

<p class="tip demo-tip" key="/form/address">
    示例代码路径：`demo/form/address`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 评星 `Rater`

`Rater`，简单的评星组件，支持自定义星星字符、星星数量。

``` js
import { Rater } from 'vux'
```

``` html
<cell title="set default score = 5" inline-desc="total 5 stars if not specified">
    <rater v-model="data3" slot="value"></rater>
</cell>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">max</span> | <span class="type type-number">Number</span> | 5 | &nbsp; | 最多可选个数 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 值，使用 v-model 绑定 |
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否禁用 |
| <span class="prop-key" style="white-space:nowrap;">star</span> | <span class="type type-string">String</span> | ★ | &nbsp; | 字符 |
| <span class="prop-key" style="white-space:nowrap;">active-color</span> | <span class="type type-string">String</span> | <span class="type" style="width:65px;background-color:#fc6">#fc6</span> | &nbsp; | 选中时的颜色 |
| <span class="prop-key" style="white-space:nowrap;">margin</span> | <span class="type type-number">Number</span> | 2 | &nbsp; | 间隙值 |
| <span class="prop-key" style="white-space:nowrap;">font-size</span> | <span class="type type-number">Number</span> | 25 | &nbsp; | 字体大小 |

<p class="tip demo-tip" key="/form/rater">
    示例代码路径：`demo/form/rater`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>