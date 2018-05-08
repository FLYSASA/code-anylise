### 列表视图 `Cell`

`Cell`列表视图组件，常用于有更多操作（有向右的箭头）的菜单项，或者单条表单信息的内容显示（可隐藏箭头）。

``` js
import { Cell } from 'vux'
```

``` html
<group>
    <cell title="title" value="value"></cell>
</group>
```
<p class="warning">
    `Cell`只能在`Group`中使用
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 左边标题文字 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 右侧文字，复杂的样式布局请使用slot |
| <span class="prop-key" style="white-space:nowrap;">inline-desc</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标题下面文字，一般为说明文字 |
| <span class="prop-key" style="white-space:nowrap;">link</span> | <span class="type type-string">String</span><br/><span class="type type-object">Object</span> | &nbsp; | &nbsp; | 点击链接，可以为http(s)协议，也可以是 vue-router 支持的地址形式 |
| <span class="prop-key" style="white-space:nowrap;">is-link</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否为链接，如果是，右侧将会出现指引点击的右箭头 |
| <span class="prop-key" style="white-space:nowrap;">primary</span> | <span class="type type-string">String</span> | title | &nbsp; | 可选值为 [`'title'`, `'content'`]，内容较长时，建议设为`content`，这时对应的div会加上`weui-cell-primary`类名实现内容宽度自适应 |
| <span class="prop-key" style="white-space:nowrap;">is-loading</span> | <span class="type type-boolean">Boolean</span> | false | <span style="font-size:12px;white-space:nowrap;">v2.2.0</span> | 是否显示加载图标，适用于异步加载数据的场景 |
| <span class="prop-key" style="white-space:nowrap;">value-align</span> | <span class="type type-string">String</span> | right | <span style="font-size:12px;white-space:nowrap;">v2.2.0</span> | 文字值对齐方式，当设为 left 时，primary 值将会设为 `content`（内容宽度自适应） |
| <span class="prop-key" style="white-space:nowrap;">border-intent</span> | <span class="type type-boolean">Boolean</span> | true | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.1</span> | 是否显示边框与左边的间隙 |
| <span class="prop-key" style="white-space:nowrap;">arrow-direction</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.1</span> | 右侧箭头方向，可选值有 `up`、`down` |
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-boolean">Boolean</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.2.2</span> | 对 label 和箭头(如果使用 is-link)显示不可操作样式 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 右侧内容，相比于value的优点是可以用复杂的样式或者调用组件 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">value</span> | [废弃] 同默认slot | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">icon</span> | 标题左侧的图像位置 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">after-title</span> | 标题右侧位置 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">child</span> | cell的直接子元素，因此可以添加一个相对于cell绝对定位的元素 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">inline-desc</span> | inline-desc 内容，和 prop:inline-desc 功能一样，但是可以使用 html | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.6</span> |
| <span class="prop-key" style="white-space:nowrap;">title</span> | title 插槽，方便自定义样式 | <span style="font-size:12px;white-space:nowrap;">v2.3.3</span> |

<p class="tip demo-tip" key="/data/cell">
    示例代码路径：`demo/data/cell`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 自定义列表视图 `CellBox`

 `CellBox`是可自定义的`Cell`，内容区域由插槽来自定义。

``` js
import { CellBox } from 'vux'
```

``` html
<group>
    <cell-box is-link>
        <!-- anything -->
    </cell-box>
</group>
```
<p class="warning">
    与`cell`相比，`cell-box`更自由和灵活，只提供`is-link`和`link`属性，内容直接使用默认slot定义。
    <br/> 
    `cell-box`同样只能在`Group`中使用。
</p>


* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">is-link</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否为链接，如果是，右侧将会出现指引点击的右箭头 |
| <span class="prop-key" style="white-space:nowrap;">link</span> | <span class="type type-string">String</span><br/><span class="type type-object">Object</span> | &nbsp; | &nbsp; | 点击链接，可以为http(s)协议，也可以是 vue-router 支持的地址形式 |
| <span class="prop-key" style="white-space:nowrap;">border-intent</span> | <span class="type type-boolean">Boolean</span> | true | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.1</span> | 是否显示边框与左边的间隙 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 内容区域 | &nbsp; |


<p class="tip demo-tip" key="/data/cellbox">
    示例代码路径：`demo/data/cellbox`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 内容列表 `CellFormPreview`

`CellFormPreview`内容列表组件，用于显示明细表内容（数组数据）。

``` js
import { CellFormPreview } from 'vux'
```

``` html
<group>
    <cell title="合计" value="￥1024"></cell>
    <cell-form-preview :list="list"></cell-form-preview>
</group>
```

list的数据示例如图：

``` js
[{
    label: 'Apple',
    value: '3.29'
},
{
    label: 'Banana',
    value: '1.04'
},
{
    label: 'Fish',
    value: '8.00'
}]
```

<p class="warning">
    `CellFromPreview` 需要在 `Group` 组件中使用。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">list</span> | <span class="type type-array">Array</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.2.0</span> | 内容列表，格式见示例代码 |
| <span class="prop-key" style="white-space:nowrap;">border-intent</span> | <span class="type type-boolean">Boolean</span> | true | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.1</span> | 是否显示边框与左边的间隙 |

<p class="tip demo-tip" key="/data/cellfrompreview">
    示例代码路径：`demo/data/cellfrompreview`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 表单预览 `FormPreview`

`FormPreview`表单预览组件，用于显示某条表单信息及它的明细表内容（数组数据）、底部按钮列表（数组数据）。它相当于`Cell` + `CellFormPreview` + `操作按钮`。

``` js
import { FormPreview } from 'vux'
```

``` html
<form-preview header-label="付款金额" header-value="¥2400.00" :body-items="list" :footer-buttons="buttons1">
</form-preview>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">header-label</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 头部标题 |
| <span class="prop-key" style="white-space:nowrap;">header-value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 头部内容 |
| <span class="prop-key" style="white-space:nowrap;">body-items</span> | <span class="type type-array">Array</span> | [] | &nbsp; | 主体内容列表， [{label:'label',value:'value'}] |
| <span class="prop-key" style="white-space:nowrap;">footer-buttons</span> | <span class="type type-array">Array</span> | [] | &nbsp; | 底部按钮列表，default为灰色样式，primary文字为高亮颜色， [{style: "primary", text: "text", onButtonClick: fn(prop:name), link: "/path"}] |

<p class="tip demo-tip" key="/data/frompreview">
    示例代码路径：`demo/data/frompreview`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 表格 `XTable`

`XTable`表格组件，是对`table`元素的再封装，和普通`table`用法基本一致。由于表格内容是使用默认插槽来实现，`thead`、`tbody`等标签并非`x-table`的合法子标签，不被正常解析，所以`XTable`组件，只能在`.vue`文件中使用。

``` js
import { XTable } from 'vux'
```

``` html
<x-table :cell-bordered="false" style="background-color:#fff;">
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Apple</td>
            <td>$1.25</td>
            <td> x 1</td>
        </tr>
        <tr>
            <td>Banana</td>
            <td>$1.20</td>
            <td> x 2</td>
        </tr>
    </tbody>
</x-table>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">full-bordered</span> | <span class="type type-boolean">Boolean</span> | false | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.4</span> | 是否显示表格左右边框 |
| <span class="prop-key" style="white-space:nowrap;">content-bordered</span> | <span class="type type-boolean">Boolean</span> | true | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.4</span> | 是否显示 body tr 的下边框 |
| <span class="prop-key" style="white-space:nowrap;">cell-bordered</span> | <span class="type type-boolean">Boolean</span> | true | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.4</span> | 是否显示表格的右边边框 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 表格内容 | <span style="font-size:12px;white-space:nowrap;">v2.2.1-rc.4</span> |

<p class="tip demo-tip" key="/data/table">
    示例代码路径：`demo/data/table`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 微章/角标 `Badge`

`Badge`微章/角标组件，用圆形（或椭圆形）红色背景+白色文字，显著显示文本信息（一般是数字），它较常用于显示`Cell`内容的提醒数字。

``` js
import { Badge } from 'vux'
```

``` html
<cell title="个位数" is-link>
    <div class="badge-value" slot="value">
        <span class="vertical-middle">新消息 &nbsp;</span>
        <badge text="8"></badge>
    </div>
</cell>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">text</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 显示的文字 |

<p class="tip demo-tip" key="/data/badge">
    示例代码路径：`demo/data/badge`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 卡片 `Card`

`Card`卡片组件，卡片的头部、底部信息可以设置，也可以自定义，但内容区域则只能自定义。

``` js
import { Card } from 'vux'
```

``` html
<card :header="{title:'商品详情'}" :footer="{title:'查看更多',link:'/component/panel'}">
    <p slot="content" class="card-padding">custom content</p>
</card>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">header.title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 头部标题，不指定则不显示 |
| <span class="prop-key" style="white-space:nowrap;">footer.title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 底部标题，不指定则不显示 |
| <span class="prop-key" style="white-space:nowrap;">footer.link</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 底部链接，普通url或者v-link参数 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">header</span> | 头部位置 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">content</span> | 中间主体位置 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">footer</span> | 底部位置 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-click-footer</span> |   &nbsp; | 点击底部时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-click-header</span> |   &nbsp; | 点击头部时触发 |

<p class="tip demo-tip" key="/data/card">
    示例代码路径：`demo/data/card`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 组合列表 `Panel`

`Panel`组合列表组件，提供多种模式展示清单列表，支持图标、主副标题（标题、描述）、其他信息（如：日期、作者等）

``` js
import { Panel } from 'vux'
```

``` html
<panel header="图文组合列表" :footer="footer" :list="list" :type="type"></panel>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">header</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 头部文字 |
| <span class="prop-key" style="white-space:nowrap;">footer</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | 尾部配置，`{url: url, title: title}` |
| <span class="prop-key" style="white-space:nowrap;">list</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 内容列表，`[{title, desc, src, url, meta: {source, date, other}}]` |
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | 1 | &nbsp; | 布局类型，可选值 ['1', '2', '3', '4', '5']，如下：<br/>1：图标 + 标题 + 描述<br/>2：标题 + 描述<br/>3：图标 + 标题（有向右箭头）<br/>4：标题 + 描述 + 其他信息<br/>5：图标 + 标题 + 描述 + 其他信息 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-click-header</span> |   &nbsp; | 点击头部时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-click-item</span> |   `(item)` | 点击内容列表时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-click-footer</span> |   &nbsp; | 点击尾部时触发 |

<p class="tip demo-tip" key="/data/panel">
    示例代码路径：`demo/data/panel`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 搜索框 `Search`

`Search`搜索框组件，一般用于清单列表页，支持在输入过程中根据输入内容动态显示搜索结果。

``` js
import { Search } from 'vux'
```

``` html
<search @on-submit="onSubmit" :auto-fixed="autoFixed" @on-focus="onFocus" @on-cancel="onCancel"></search>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">placeholder</span> | <span class="type type-string">String</span> | 搜索(search) | &nbsp; | 提示文字 |
| <span class="prop-key" style="white-space:nowrap;">cancel-text</span> | <span class="type type-string">String</span> | 取消(cancel) | &nbsp; | 取消文字 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 表单值，`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">results</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 指定搜索结果, 为带有 title key 的对象组成的数组，如 [{title: 'hello', otherData: otherValue}] |
| <span class="prop-key" style="white-space:nowrap;">autoFixed</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否自动固定在顶端 |
| <span class="prop-key" style="white-space:nowrap;">top</span> | <span class="type type-string">String</span> | 0px | &nbsp; | 自动固定时距离顶部的距离 |
| <span class="prop-key" style="white-space:nowrap;">position</span> | <span class="type type-string">String</span> | fixed | &nbsp; | 自动固定时的定位，一些布局下可能需要使用其他定位，比如`absolute` |
| <span class="prop-key" style="white-space:nowrap;">auto-scroll-to-top</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | `Safari`下弹出键盘时可能会出现看不到input，需要手动滚动，启用该属性会在fix时滚动到顶端 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">right</span> | 输入框右侧 slot | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">left</span> | 输入框左侧 slot | <span style="font-size:12px;white-space:nowrap;">v2.3.5</span> |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-submit</span> |   &nbsp; | 表单提交时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-cancel</span> |   &nbsp; | 点击`取消`按钮时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-change</span> |   `(value)` | 输入文字变化时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-result-click</span> |   `(item)` | 点击结果条目时触发，原来的`result-click`事件不符合规范已经废弃 |
| <span class="prop-key" style="white-space:nowrap;">on-focus</span> |   &nbsp; | 输入框获取到焦点时触发 |

* **方法 (`Methods`)**

|  名称  |  参数  |  说明  |  版本  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">setFocus</span> |   &nbsp; | 获取 input 焦点，在 Safari 上你必须在 click 事件回调里使用才能生效 | &nbsp; | 
| <span class="prop-key" style="white-space:nowrap;">setBlur</span> |   &nbsp; | 手动设置 input 失去焦点，一般用于在 on-submit 事件中实现隐藏手机键盘 |<span style="font-size:12px;white-space:nowrap;">v2.3.6</span> | 

<p class="tip demo-tip" key="/data/search">
    示例代码路径：`demo/data/search`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 图片查看/预览 `Previewer`

`Previewer`图片预览组件，用来放大查看图片，一般在点击缩略图时调用本组件来查看原图。

``` js
import { Previewer } from 'vux'
```

``` html
<previewer :list="list" ref="previewer" :options="options"></previewer>
```

list的数据示例如图：

``` js
[{
    src: 'https://placekitten.com/800/400',
    w: 600,
    h: 400
},
{
    src: 'https://placekitten.com/1200/900',
    w: 1200,
    h: 900
}]
```

显示特定index的图片，使用`ref`:

``` js
this.$refs.previewer.show(index)
```


* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">list</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 图片列表 |
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | `photoswipe`的设置 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-close</span> |   &nbsp; | 关闭时触发 |

<p class="tip demo-tip" key="/data/preview">
    示例代码路径：`demo/data/preview`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 图片 `XImg`

`XImg`图片组件，适合于原图（大图）的直接查看，如果有滚动条，还支持在图片滚动进入屏幕时才加载图片。

``` js
import { XImg } from 'vux'
```

``` html
<view-box>
    <div v-for="src in list" style="background-color:yellow;text-align:center;">
        <span style="font-size:20px;">Loading</span>
        <x-img :src="src" :webp-src="src+'?type=webp'" @on-success="success" @on-error="error" class="ximg-demo"
            error-class="ximg-error" :offset="-100" container="#vux_view_box_body">
        </x-img>
    </div>
</view-box>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default-src</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 默认显示的图片地址 |
| <span class="prop-key" style="white-space:nowrap;">src</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 最终加载的图片地址 |
| <span class="prop-key" style="white-space:nowrap;">webp-src</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | webp 格式的图片地址，如果当前浏览器支持webp，则加载该地址 |
| <span class="prop-key" style="white-space:nowrap;">error-class</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 加载失败时添加到 img 元素上的类名 |
| <span class="prop-key" style="white-space:nowrap;">success-class</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 加载成功时添加到 img 元素上的类名 |
| <span class="prop-key" style="white-space:nowrap;">offset</span> | <span class="type type-number">Number</span> | 100 | &nbsp; | 距离多远时开始加载 |
| <span class="prop-key" style="white-space:nowrap;">container</span> | <span class="type type-string">String</span> | window | &nbsp; | 当图片是在一个容器里滚动时(比如demo站点100%高度的布局)，你需要指定容器的选择器 |
| <span class="prop-key" style="white-space:nowrap;">delay</span> | <span class="type type-number">Number</span> | 100 | &nbsp; | 延迟执行，在存在路由过渡时立即执行可能会导致进入页面后并不会正确加载图片 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-success</span> | `(src, ele)` | 成功加载图片时触发（ele是图片img的dom元素） |
| <span class="prop-key" style="white-space:nowrap;">on-error</span> | `(src, ele, msg)` | 图片加载失败时触发 |

<p class="tip demo-tip" key="/data/img">
    示例代码路径：`demo/data/img`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 图标/表情

#### <span class="vux-component-name">Icon</span>

`Icon`图标组件，通过它可以使用常用的微信字体图标，通过设置`type`属性来调用不同的微信字体样式。

``` js
import { Icon } from 'vux'
```

``` html
<icon type="success"></icon>
<icon type="info"></icon>
<icon type="info-circle"></icon>
<icon type="warn"></icon>
<icon type="waiting"></icon>
<icon type="waiting-circle"></icon>
<icon type="safe-success"></icon>
<icon type="safe-warn"></icon>
<icon type="success-circle"></icon>
<icon type="success-no-circle"></icon>
<icon type="circle"></icon>
<icon type="download"></icon>
<icon type="cancel"></icon>
<icon type="search"></icon>
<icon type="clear"></icon>
<icon type="success" is-msg></icon>
<icon type="info" is-msg></icon>
<icon type="safe-success" is-msg></icon>
<icon type="safe-warn" is-msg></icon>
......
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 图标名字，可选值见demo |
| <span class="prop-key" style="white-space:nowrap;">is-msg</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否用作消息提示页面图标，图标尺寸会使用93px |

#### <span class="vux-component-name">XIcon</span>

`XIcon`图标组件的标签`x-icon`，是一个虚拟(占位)组件，你不需要引入`XIcon` 组件，但`x-icon`标签并非`html`的合法标签，不被正常解析，所以`XIcon`组件，只能在`.vue`文件中使用。
<br/><br/>当调用`XIcon`时，`vux-loader`会自动将它转换成 `inline svg`。你可以根据类名来设置样式(fill)。目前并不支持 `svg sprite`，将在后面版本支持。

``` html
<x-icon type="ios-arrow-up" class="icon-red"></x-icon>
<x-icon type="ios-arrow-up" size="30"></x-icon>
<x-icon type="ios-checkmark" size="30"></x-icon>
<x-icon type="ios-plus-empty" size="30"></x-icon>
<x-icon type="ios-plus-outline" size="30"></x-icon>
<x-icon type="ios-plus" size="30"></x-icon>
<x-icon type="ios-close-empty" size="30"></x-icon>
<x-icon type="ios-close-outline" size="30"></x-icon>
<x-icon type="ios-close" size="30"></x-icon>
......
```

<p class="warning">
    组件来自于 [Ionicons(MIT)](http://ionicons.com/)，你可以在网站上面看到所有的图标。
    <br />
    该组件无法在`script`引入的方式中使用，需要自行拷贝 svg 资源。
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 图标名字，常用的type见demo |
| <span class="prop-key" style="white-space:nowrap;">size</span> | <span class="type type-string">String</span> | 24 | &nbsp; | 尺寸大小 |

#### <span class="vux-component-name">WechatEmotion</span>

`WechatEmotion`微信表情组件，通过它可以调用微信的表情，设置它的文本值即可。

``` js
import { WechatEmotion as Emotion } from 'vux'
```

``` html
<emotion>微笑</emotion>
<emotion is-gif>微笑</emotion>
<emotion>撇嘴</emotion>
<emotion is-gif>撇嘴</emotion>
<emotion>发呆</emotion>
<emotion is-gif>发呆</emotion>
<emotion>流泪</emotion>
<emotion is-gif>流泪</emotion>
......
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">is-gif</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否动态表情 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 表情文本，可选值见demo | &nbsp; |

<p class="tip demo-tip" key="/data/icon">
    示例代码路径：`demo/data/icon`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 消息提示页 `Msg`

`Msg`消息提示组件，非常简单好用的一个消息提示的组件，常用于一些操作之后的信息提示页面。

``` js
import { Msg } from 'vux'
```

``` html
<msg description='内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现<a href="javascript:void(0);">文字链接</a>'
    title="操作成功" :buttons="buttons" :icon="icon">
</msg>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 操作状态提示文字 |
| <span class="prop-key" style="white-space:nowrap;">description</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 描述文字 |
| <span class="prop-key" style="white-space:nowrap;">icon</span> | <span class="type type-string">String</span> | success | &nbsp; | 图标类型，可选值有 `success`, `warn`, `info`, `waiting` |
| <span class="prop-key" style="white-space:nowrap;">buttons</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 操作按钮列表，一个按钮对象包含`text`, `type`(和x-button组件type一致), `link`, `onClick` |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">buttons</span> | 自定义按钮区域元素 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">description</span> | 自定义描述文字内容 | &nbsp; |

<p class="tip demo-tip" key="/data/msg">
    示例代码路径：`demo/data/msg`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 流程图 `Flow`

流程图组件，由`Flow`组件和它的子组件`FlowState`、 `FlowLine`组成。在`Flow`组件上设置流程图方向和样式，而一个`FlowState`子组件就是一个流程节点，一个`FlowLine`是一段节点之间的连线。

``` js
import { Flow, FlowState, FlowLine } from 'vux'
```

``` html
<flow>
    <flow-state state="1" title="已付款" is-done></flow-state>
    <flow-line is-done></flow-line>
    <flow-state state="2" title="已发货" is-done></flow-state>
    <flow-line tip="进行中"></flow-line>
    <flow-state state="3" title="待收货"></flow-state>
    <flow-line></flow-line>
    <flow-state state="4" title="完成"></flow-state>
</flow>
```

<span class="vux-component-name">Flow</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">orientation</span> | <span class="type type-string">String</span> | horizontal | &nbsp; | 流程图方向，可选值有 `horizontal`、`vertical` |

<span class="vux-component-name">FlowState</span>

`FlowState`，流程节点组件，表现形式主要为一个圆点。

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">state</span> | <span class="type type-string">String</span><br/><span class="type type-number">Number</span> | &nbsp; | &nbsp; | 节点状态码，显示在代表节点的圆点内，一般设为节点的数字或字母序号 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 节点的标题，显示在节点圆点下边或右边 |
| <span class="prop-key" style="white-space:nowrap;">isDone</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 节点是否通过（完成），通过则显示为绿色，否则为浅灰色 |

<span class="vux-component-name">FlowLine</span>

`FlowLine`，流程节点连线组件。

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">tip</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 提示信息，一般在进行中的节点线上设置此属性 |
| <span class="prop-key" style="white-space:nowrap;">tipDirection</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 提示信息方向，可选值有 `left`、`top`、`right`、`bottom`，一般不需要设置此属性，组件会根据`Flow`组件的`orientation`属性自动取值 |
| <span class="prop-key" style="white-space:nowrap;">isDone</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否通过（完成），通过则连线显示为绿色，否则为浅灰色 |
| <span class="prop-key" style="white-space:nowrap;">lineSpan</span> | <span class="type type-string">String</span><br/><span class="type type-number">Number</span> | &nbsp; | &nbsp; | 连线的宽度，设为数字时为百分比，如`30`表示`30%` |
| <span class="prop-key" style="white-space:nowrap;">processSpan</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 提示信息的宽度，设为数字时为百分比，如`30`表示`30%` |

<p class="tip demo-tip" key="/data/flow">
    示例代码路径：`demo/data/flow`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 步骤图 `Step`

步骤图组件，由`Step`组件和它的子组件`StepItem`组成。在`Step`组件上设置或获取当前步骤节点，而一个`StepItem`是一个步骤节点。

``` js
import { Step, StepItem } from 'vux'
```

``` html
<step v-model="step1" background-color='#fbf9fe'>
    <step-item title="步骤1" description="step 1"></step-item>
    <step-item title="步骤2" description="step 2"></step-item>
    <step-item title="步骤3" description="step 3"></step-item>
</step>
```

<span class="vux-component-name">Step</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 当前步骤索引，从0开始，使用`v-model`绑定 |
| <span class="prop-key" style="white-space:nowrap;">backgroundColor</span> | <span class="type type-string">String</span> | #fff | &nbsp; | 背景色 |
| <span class="prop-key" style="white-space:nowrap;">gutter</span> | <span class="type type-number">Number</span> | 10px | &nbsp; | 步骤节点与线条之间的间隙像素大小 |

<span class="vux-component-name">StepItem</span>

`StepItem`，步骤节点组件。

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 步骤节点标题 |
| <span class="prop-key" style="white-space:nowrap;">description</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 步骤节点描述 |

<p class="tip demo-tip" key="/data/step">
    示例代码路径：`demo/data/step`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 时间线 `Timeline`

时间线组件，由`Timeline`组件和它的子组件`TimelineItem`组成。在`Step`组件上设置或获取当前步骤节点，而一个`StepItem`是一个步骤节点。

``` js
import { Timeline, TimelineItem } from 'vux'
```

``` html
<timeline>
    <timeline-item>
        <h4 class="recent">【广东】 广州市 已发出</h4>
        <p class="recent">2016-04-17 12:00:00</p>
    </timeline-item>
    <timeline-item>
        <h4> 申通快递员 广东广州 收件员 xxx 已揽件</h4>
        <p>2016-04-16 10:23:00</p>
    </timeline-item>
    <timeline-item>
        <h4> 商家正在通知快递公司揽件</h4>
        <p>2016-04-15 9:00:00</p>
    </timeline-item>
</timeline>
```

<span class="vux-component-name">Timeline</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">color</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 节点和连线的颜色 |
| <span class="prop-key" style="white-space:nowrap;">isShowIcon</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示当前节点里的勾选图标（不显示则当前节点只有圆点） |

<span class="vux-component-name">TimelineItem</span>

`TimelineItem`，时间线节点组件。

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 节点内容 | &nbsp; |

<p class="tip demo-tip" key="/data/timeline">
    示例代码路径：`demo/data/timeline`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 圆形进度 `XCircle`

`XCircle`圆形进度组件，用来显示一个百分比数字或比例。

``` js
import { XCircle } from 'vux'
```

``` html
<x-circle :percent="percent1" :stroke-width="10" stroke-color="#04BE02">
    <span>{{percent1}}</span>
</x-circle>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">stroke-width</span> | <span class="type type-number">Number</span> | 1 | &nbsp; | 线条宽度 |
| <span class="prop-key" style="white-space:nowrap;">stroke-color</span> | <span class="type type-string">String</span> | <span class="type" style="width:65px;background-color:#3FC7FA">#3FC7FA</span> | &nbsp; | 线条颜色 |
| <span class="prop-key" style="white-space:nowrap;">trail-width</span> | <span class="type type-number">Number</span> | 1 | &nbsp; | 背景线条宽度 |
| <span class="prop-key" style="white-space:nowrap;">trail-color</span> | <span class="type type-string">String</span> | <span class="type" style="width:65px;background-color:#D9D9D9">#D9D9D9</span> | &nbsp; | 背景线条颜色 |
| <span class="prop-key" style="white-space:nowrap;">percent</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 进度百分比 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 圆形图形内的内容 | &nbsp; |

<p class="tip demo-tip" key="/data/circle">
    示例代码路径：`demo/data/circle`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 线形进度 `XProgress`

`XProgress`线形进度组件， 用来简单显示一个比例，需要引入微信字体图标样式使用。

``` js
import { XProgress } from 'vux'
import 'vux/src/styles/weui/icon/weui_icon_font.less'
```

``` html
<x-progress :percent="percent1"></x-progress>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">percent</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 进度值，0到100 |
| <span class="prop-key" style="white-space:nowrap;">show-cancel</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示取消按钮 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-cancel</span> |   &nbsp; | 点击取消按钮时触发 |

<p class="tip demo-tip" key="/data/progress">
    示例代码路径：`demo/data/progress`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 倒计时时钟 `Clocker`

`Clocker`倒计时时钟组件，提供距离某个结束时间的倒计时的时钟功能。

``` js
import { Clocker } from 'vux'
```

``` html
<clocker :time="time1"></clocker>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">time</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 结束时间 |
| <span class="prop-key" style="white-space:nowrap;">format</span> | <span class="type type-string">String</span> | %D 天 %H 小时 %M 分 %S 秒 | &nbsp; | 显示格式，格式符号如下：<br/>`%D` 天数<br/>`%H` 小时数<br/>`%M` 分钟数<br/>`%S` 秒数<br/>`%_D1` 天数（十位）<br/>`%_D2` 天数（个位）<br/>`%_H1` 小时数（十位）<br/>`%_H2` 小时数（个位）<br/>`%_M1` 分钟数（十位）<br/>`%_M2` 分钟数（个位）<br/>`%_S1` 秒数（十位）<br/>`%_S2` 秒数（个位） |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 若存在，则作为最终显示出来的格式模板 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-tick</span> |   &nbsp; | 时间计算时触发，但非精确每1s触发 |
| <span class="prop-key" style="white-space:nowrap;">on-finish</span> |   &nbsp; | 时间结束时触发 |

<p class="tip demo-tip" key="/data/clocker">
    示例代码路径：`demo/data/clocker`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 计数/计时

#### <span class="vux-component-name">Countup</span>

`Countup`计数组件，提供计数功能，可正计数（从小到大），也可以反计数（从大到小）。

``` js
import { Countup } from 'vux'
```

``` html
<countup :start-val="1388" :end-val="2" :duration="2" class="demo1"></countup>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">start-val</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 开始数字 |
| <span class="prop-key" style="white-space:nowrap;">end-val</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 结束数字 |
| <span class="prop-key" style="white-space:nowrap;">decimals</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 小数点位数 |
| <span class="prop-key" style="white-space:nowrap;">duration</span> | <span class="type type-number">Number</span> | 2 | &nbsp; | 计数周期（秒），在这个周期内完成计数 |
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | `countup.js`的设置项，属于高级用法，[查看详情](https://github.com/inorganik/CountUp.js) |
| <span class="prop-key" style="white-space:nowrap;">start</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否自动开始计数 |

#### <span class="vux-component-name">Countdown</span>

`Countdown`倒计时组件，提供基于秒的倒计时功能，算是`Clocker`的简化版。

``` js
import { Countdown } from 'vux'
```

``` html
<countdown slot="value" v-model="time1" @on-finish="finish" v-show="show"></countdown>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-number">number</span> | &nbsp; | &nbsp; | 时间，秒为单位 |
| <span class="prop-key" style="white-space:nowrap;">start</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否开始计数 |

<p class="tip demo-tip" key="/data/counttime">
    示例代码路径：`demo/data/counttime`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 跑马灯 `Marquee`

简单的跑马灯组件，支持上下滚动。由`Marquee`组件和它的子组件`MarqueeItem`组成，跑马灯组件在多个`MarqueeItem`子组件之间滚动，每次滚动只显示当前的一个`MarqueeItem`。

``` js
import { Marquee, MarqueeItem } from 'vux'
```

``` html
<marquee>
    <marquee-item v-for="i in 5" :key="i" @click.native="onClick(i)" class="align-middle">hello world {{i}}</marquee-item>
</marquee>
```

<span class="vux-component-name">Marquee</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">interval</span> | <span class="type type-number">Number</span> | 2000 | &nbsp; | 切换时间间隙（毫秒） |
| <span class="prop-key" style="white-space:nowrap;">duration</span> | <span class="type type-number">Number</span> | 300 | &nbsp; | 切换动画时间（毫秒） |
| <span class="prop-key" style="white-space:nowrap;">direction</span> | <span class="type type-string">String</span> | up | &nbsp; | 切换方向，可选值有 `up`、`down` |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 内容插槽 | &nbsp; |


<span class="vux-component-name">MarqueeItem</span>

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 内容插槽 | &nbsp; |

<p class="tip demo-tip" key="/data/marquee">
    示例代码路径：`demo/data/marquee`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 二维码 `Qrcode`

`Qrcode`二维码组件，能够根据内容生成二维码。

``` js
import { Qrcode } from 'vux'
```

``` html
<qrcode value="http://m.baidu.com" type="img"></qrcode>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 编码内容，如果为链接，请保证有http(s)协议名 |
| <span class="prop-key" style="white-space:nowrap;">size</span> | <span class="type type-number">Number</span> | 80 | &nbsp; | 尺寸大小 |
| <span class="prop-key" style="white-space:nowrap;">bg-color</span> | <span class="type type-string">String</span> | <span class="type" style="width:65px;background-color:#FFFFFF">#FFFFFF</span> | &nbsp; | 背景颜色 |
| <span class="prop-key" style="white-space:nowrap;">fg-color</span> | <span class="type type-string">String</span> | <span class="type" style="width:65px;background-color:#000000">#000000</span> | &nbsp; | 二维码着色 |
| <span class="prop-key" style="white-space:nowrap;">level</span> | <span class="type type-string">String</span> | L | &nbsp; | 容错等级，可选值有 `L`、`M`、`Q`、`H`，纠错能力（二维码部分污染或损毁时被读取的机会）依次增高，一般使用默认值即可 |
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | img | &nbsp; | 渲染类型，可以为`img`(适合需要在微信需要长按识别的场景)和`canvas` |

<p class="tip demo-tip" key="/data/qrcode">
    示例代码路径：`demo/data/qrcode`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>
