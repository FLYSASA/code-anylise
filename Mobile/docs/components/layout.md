### 分隔线 `Divider`

`Divider`，非常简单的一种分隔线组件，支持设置标题。

``` js
import { Divider } from 'vux'
```

``` html
<divider>我是有底线的</divider>
```

<p class="warning">
    不支持配置分隔线颜色，因为线条是通过图片来实现的。好处是在任何背景颜色下都可以适应。如果需要配置颜色，请使用交互组件里的`LoadMore`组件。
</p>

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 分隔线标题 | &nbsp; |

<p class="tip demo-tip" key="/layout/divider">
    示例代码路径：`demo/layout/divider`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 网格 `Grid`

网格组件，由`Grid`组件和它的子组件`GridItem`组成。`Grid`组件上设置列数，而一个`GridItem`子组件就是一个网格。
比如：`Grid`组件上设置的列数是`3`、里面放了`12`个子组件`GridItem`，则呈现的是`4`行`3`列的九宫格样子。

``` js
import { Grid, GridItem } from 'vux'
```

``` html
<grid :rows="3">
    <grid-item label="Grid" v-for="i in 12">
        <img slot="icon" src="../assets/grid_icon.png">
    </grid-item>
</grid>
```

<span class="vux-component-name">Grid</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">rows</span> | <span class="type type-number">Number</span> | 3 | <span style="font-size:12px;white-space:nowrap;">v2.2.0</span> | 宫格列数，建议少于`5` |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 用于`grid-item`的插槽 | &nbsp; |

<span class="vux-component-name">GridItem</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">icon</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 图标地址，如果是线上地址，推荐使用该prop。如果是本地图标资源，使用`slot=icon`可以保证资源被正确打包 |
| <span class="prop-key" style="white-space:nowrap;">label</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | `label` 文字 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">icon</span> | 图标内容，`直接使用<img>标签` | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">label</span> | label文字的slot，作用同prop:label | &nbsp; |

<p class="tip demo-tip" key="/layout/grid">
    示例代码路径：`demo/layout/grid`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 粘滞 `Sticky`

`Sticky`粘滞组件，实现的效果是：在页面内容往上滚动的过程中，某部分内容在到达页面顶部后会停留在那，以达到固顶的效果。
比如：在看淘宝商品信息时往下滚屏，`宝贝详情`和`累计评价`的选项卡在滚到页面顶部后，会粘滞在页面顶部。

``` js
import { Sticky } from 'vux'
```

如果你没有使用`100%`的布局，也没有头部可以直接这样使用：
``` html
<sticky>
    <div>Blabla</div>
</sticky>
```

如果你像demo一样使用`view-box`和`x-header`，那么需要这样：

``` html
<sticky scroll-box="vux_view_box_body" :offset="46">
    <div>Blabla</div>
</sticky>
```

建议外围加一个`div`高度为内容高度，这样可以避免当定位为`sticky`时下面的元素会突然向上走。

``` html
<div style="height:44px;">
    <sticky scroll-box="vux_view_box_body" :offset="46">
        <div>Blabla</div>
    </sticky>
</div>
```

<p class="warning">
    在Chrome模拟器运行时你可能会发现没有效果，这是因为Chrome并不支持原生sticky实现而模拟器环境是iPhone，目前程序是根据Safari版本来判断是否原生支持sticky。因此你可以切换到Android系统进行测试，但是真机上是完全正常的交互。
    <br/>
    <br/>
    你也可以设置禁用原生支持检测以获得相同的效果：`:check-sticky-support="false"`
</p>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">scroll-box</span> | <span class="type type-string">String</span> | window | &nbsp; | 滚动容器，默认为`window`，如果你使用了viewbox，那么你需要指定容器id：`vux_view_box_body` |
| <span class="prop-key" style="white-space:nowrap;">check-sticky-support</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否检测当前浏览器是否支持sticky特性，禁用则在`iPhone`设置上也使用`scroll`实现 |
| <span class="prop-key" style="white-space:nowrap;">offset</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 距离顶部高度，在存在头部（如使用了`x-header`）的情况下需要设置一个距离 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 内容插槽 | &nbsp; |

<p class="tip demo-tip" key="/layout/sticky">
    示例代码路径：`demo/layout/sticky`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 显示容器 `ViewBox`

`ViewBox`是最基本的用于布局容器组件，它包含三部分：顶部内容（如标题栏`XHeader`）、中间区域、底部内容（如工具栏`Tabbar`）。
顶部和底部内容是固定的，不可滚动，而中间区域里的内容可以滚动。顶部和底部是可选的。
`ViewBox`组件常用于带标题栏、工具栏的页面布局，如：App首页、子模块首页、清单列表页等。

``` js
import { ViewBox } from 'vux'
```

该组件为`100%高`布局，可以解决部分键盘输入的问题，但是同时会在safari中出现向下滚动时无法自动隐藏url工具栏和底部栏的问题。

在`viewBox`里元素定位为`absolute`，效果等同于`fixed`。

使用时需要设置 html, body 高为100%:

``` css
html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
```

 view-box父div也需要为100%高度：

 ``` html
 <div style="height:100%;">
    <view-box ref="viewBox">
        <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header>
        <router-view></router-view>
        <tabbar slot="bottom"></tabbar>
    </view-box>
 </div>
 ```

如果你想保存滚动距离，推荐使用`vuex`实现，在特定`path`对`scrollBody`监听`scroll`事件，并获取滚动距离保存到`vuex`的`state`里。示例可以参考vux源码的`App.vue`

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">body-padding-top</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 主体的`padding-top`值，当顶部存在`x-header`等`absolute`定位元素时需要设置 |
| <span class="prop-key" style="white-space:nowrap;">body-padding-bottom</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 主体的`padding-bottom`值，当底部存在`tabbar`等`absolute`定位元素时需要设置 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">header</span> | 顶部区域，如果要使用统一的XHeader，可以使用该slot | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">default</span> | 主体内容，可滚动的区域 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">bottom</span> | 底部区域，Tabbar可以使用该slot | &nbsp; |

* **方法 (`Methods`)**

|  名称  |  参数  |  说明  |  版本  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">scrollTo</span> |   `(top)` | 滚动到指定位置 | &nbsp; | 
| <span class="prop-key" style="white-space:nowrap;">getScrollTop</span> |   &nbsp; | 获取当前滚动距离 | &nbsp; | 
| <span class="prop-key" style="white-space:nowrap;">getScrollBody</span> |   &nbsp; | 获取滚动`div`, 也可以直接用组件引用的`.$refs.viewBoxBody` | &nbsp; | 

<p class="tip demo-tip" key="/layout/viewbox">
    示例代码路径：`demo/layout/viewbox`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 标题栏 `XHeader`

`XHeader`标题栏组件，标题栏最多可以有`5`个部分：返回、左侧部分、标题、更多、右侧部分。

``` js
import { XHeader } from 'vux'
```

``` html
<x-header>This is the page title.</x-header>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">left-options.showBack</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示返回文字 |
| <span class="prop-key" style="white-space:nowrap;">left-options.backText</span> | <span class="type type-string">String</span> | Back | &nbsp; | 返回文字 |
| <span class="prop-key" style="white-space:nowrap;">left-options.preventGoBack</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否阻止返回 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标题 |
| <span class="prop-key" style="white-space:nowrap;">transition</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 标题出现的动画，其实就是`Vue`组件`transition`的`name`属性 |
| <span class="prop-key" style="white-space:nowrap;">right-options.showMore</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示右侧的更多图标 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 标题 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">left</span> | 左侧部分插槽，在返回文字后，不会影响到原有的图标 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">overwrite-left</span> | 重写左侧部分的返回文字及图标 | <span style="font-size:12px;white-space:nowrap;">v2.2.2</span> |
| <span class="prop-key" style="white-space:nowrap;">right</span> | 右侧部分插槽 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">overwrite-title</span> | 标题插槽，用于自定义标题位置内容 | <span style="font-size:12px;white-space:nowrap;">v2.5.3</span> |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-click-more</span> |   &nbsp; | 点击右侧更多时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-click-back</span> |   &nbsp; | 当left-options.preventGoBack为true,点击左边返回时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-click-title</span> |   &nbsp; | 点击标题时触发 |

<p class="tip demo-tip" key="/layout/header">
    示例代码路径：`demo/layout/header`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 选项卡 `Tab`

选项卡组件，由`Tab`组件和它的子组件`TabItem`组成，一个子组件`TabItem`，就是一个选项。

``` js
import { Tab, TabItem } from 'vux'
```

如果需要监听`tab-item`的点击事件，请使用`on-item-click`事件:

``` html
<tab>
    <tab-item @on-item-click="handler"></tab-item>
</tab>
```

<span class="vux-component-name">Tab</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">line-width</span> | <span class="type type-number">Number</span> | 3 | &nbsp; | 线条宽度（选中选项卡的线条宽度） |
| <span class="prop-key" style="white-space:nowrap;">active-color</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 选中时文字颜色 |
| <span class="prop-key" style="white-space:nowrap;">defaultColor</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 默认文字颜色 |
| <span class="prop-key" style="white-space:nowrap;">disabled-color</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 不可点击时文字颜色 |
| <span class="prop-key" style="white-space:nowrap;">bar-active-color</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 设置底部`bar`颜色，该颜色也可以通过`less`变量`@tab-bar-active-color`设置。 |
| <span class="prop-key" style="white-space:nowrap;">animate</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 切换时是否需要动画 |
| <span class="prop-key" style="white-space:nowrap;">custom-bar-width</span> | <span class="type type-string">String</span><br/><span class="type type-function">Function</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.7</span> | 设置底部`bar`宽度，默认宽度是整体tab宽度平分，比如`50px`。使用函数时参数为当前索引`index`，你可以定义不同`tab-item`对应的`bar`宽度。 |
| <span class="prop-key" style="white-space:nowrap;">badge-label</span> | <span class="type type-string">String</span> | &nbsp; | <span style="font-size:12px;white-space:nowrap;">v2.3.5</span> | 徽标文字 |
| <span class="prop-key" style="white-space:nowrap;">badge-background</span> | <span class="type type-string">String</span> | null | <span style="font-size:12px;white-space:nowrap;">v2.3.5</span> | 徽标背景颜色 |
| <span class="prop-key" style="white-space:nowrap;">badge-color</span> | <span class="type type-string">String</span> | null | <span style="font-size:12px;white-space:nowrap;">v2.3.5</span> | 徽标文字颜色 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 用于`tab-item`的插槽 | &nbsp; |

<span class="vux-component-name">TabItem</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">disabled</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否不可选 |
| <span class="prop-key" style="white-space:nowrap;">active-class</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 当前项选中时的class |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 标题 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-item-click</span> |   `(index)` | 当前 tabItem 被点击时触发 |

<p class="tip demo-tip" key="/layout/tab">
    示例代码路径：`demo/layout/tab`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 按钮选项卡 `ButtonTab`

按钮选项卡组件，由`ButtonTab`组件和它的子组件`ButtonTabItem`组成，一个子组件`ButtonTabItem`，就是一个选项按钮。

``` js
import { ButtonTab, ButtonTabItem } from 'vux'
```

``` html
<button-tab>
    <button-tab-item>今天</button-tab-item>
    <button-tab-item selected>本周</button-tab-item>
    <button-tab-item>本月</button-tab-item>
</button-tab>
```

<span class="vux-component-name">ButtonTab</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-number">Number</span> | 0 | &nbsp; | 当前选中索引值，从0开始，使用 `v-model` 绑定 |
| <span class="prop-key" style="white-space:nowrap;">height</span> | <span class="type type-number">Number</span> | 30 | &nbsp; | 高度值, 单位为像素 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 用于`button-tab-item`的插槽 | &nbsp; |


<span class="vux-component-name">ButtonTabItem</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">selected</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否选中 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 标题 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-item-click</span> |   (index) | 当前按钮点击时触发 |

<p class="tip demo-tip" key="/layout/buttontab">
    示例代码路径：`demo/layout/buttontab`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 工具栏 `Tabbar`

`Tabbar`工具栏组件，由`Tabbar`组件和它的子组件`TabbarItem`组成，一个子组件`TabbarItem`，就是一个工具栏菜单项。
建议放在`ViewBox`组件的`bottom`插槽中，它一般用来实现App首页底部的一级菜单，如微信首页的底部菜单。

``` js
import { Tabbar, TabbarItem } from 'vux'
```

``` html
<tabbar>
    <tabbar-item>
        <img slot="icon" :src="url1">
        <span slot="label">Wechat</span>
    </tabbar-item>
    <tabbar-item show-dot>
        <img slot="icon" :src="url2">
        <span slot="label">Message</span>
    </tabbar-item>
    <tabbar-item selected>
        <img slot="icon" :src="url3">
        <span slot="label">Explore</span>
    </tabbar-item>
    <tabbar-item badge="2">
        <img slot="icon" :src="url4">
        <span slot="label">News</span>
    </tabbar-item>
</tabbar>
```

支持简单模式，即不指定`icon`，`label`将垂直居中显示。

<span class="vux-component-name">Tabbar</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">icon-class</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 图标的class名 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | tabbar主体内容，只允许tabbar-item | &nbsp; |

<span class="vux-component-name">TabbarItem</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">selected</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否选中当前项，你也可以使用`v-model`来指定选中的`tabbar-item`的`index` |
| <span class="prop-key" style="white-space:nowrap;">badge</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 徽标文字，不指定则不显示 |
| <span class="prop-key" style="white-space:nowrap;">show-dot</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示红点 |
| <span class="prop-key" style="white-space:nowrap;">link</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 链接，可以为普通url或者用`vue-link`的路径写法 |
| <span class="prop-key" style="white-space:nowrap;">icon-class</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 图标类名，如果tabbar也同时定义了icon-class, 会使用tabbar-item的 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">icon</span> | 图标区域 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">icon-active</span> | 如果存在，当前 tabbar-item 点击时会显示，用于切换图标 | <span style="font-size:12px;white-space:nowrap;">v2.1.1-rc.8</span> |
| <span class="prop-key" style="white-space:nowrap;">label</span> | 图标下方文字 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-item-click</span> |   &nbsp; | 点击菜单项时触发 |

<p class="tip demo-tip" key="/layout/tabbar">
    示例代码路径：`demo/layout/tabbar`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


#### 工具栏（icon）

工具栏项`TabbarItem`使用图标的效果。

``` js
import { Tabbar, TabbarItem } from 'vux'
```

``` html
<tabbar>
    <tabbar-item>
        <img slot="icon" :src="url1">
        <img slot="icon-active" :src="url2">
        <span slot="label">one</span>
    </tabbar-item>
    <tabbar-item>
        <img slot="icon" :src="url3">
        <img slot="icon-active" :src="url4">
        <span slot="label">two</span>
    </tabbar-item>
</tabbar>
```

<p class="tip demo-tip" key="/layout/tabbaricon">
    示例代码路径：`demo/layout/tabbaricon`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


#### 工具栏（link）

工具栏使用`link`链接属性的效果。

``` js
import { Tabbar, TabbarItem } from 'vux'
```

``` html
<tabbar>
    <!-- use v-link -->
    <tabbar-item v-link="{path:'../data/cell.html'}">
        <img slot="icon" :src="img1">
        <span slot="label">Wechat</span>
    </tabbar-item>
    <!-- use http link -->
    <tabbar-item show-dot link="../data/cell.html">
        <img slot="icon" :src="img2">
        <span slot="label">Message</span>
    </tabbar-item>
    <!-- use vue-router link -->
    <tabbar-item selected link="../data/cell.html">
        <img slot="icon" :src="img3">
        <span slot="label">Explore</span>
    </tabbar-item>
    <!-- use vue-router object link -->
    <tabbar-item :link="{path:'../data/cell.html'}">
        <img slot="icon" :src="img4">
        <span slot="label">News</span>
    </tabbar-item>
</tabbar>
```

<p class="tip demo-tip" key="/layout/tabbarlink">
    示例代码路径：`demo/layout/tabbarlink`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


#### 工具栏（simple）

简单的文字工具栏效果。

``` js
import { Tabbar, TabbarItem } from 'vux'
```

``` html
<tabbar>
    <tabbar-item>
        <span slot="label">Wechat</span>
    </tabbar-item>
    <tabbar-item show-dot>
        <span slot="label">Message</span>
    </tabbar-item>
    <tabbar-item selected link="../other/demo.html">
        <span slot="label">Explore</span>
    </tabbar-item>
    <tabbar-item badge="2">
        <span slot="label">News</span>
    </tabbar-item>
</tabbar>
```

<p class="tip demo-tip" key="/layout/tabbarsimple">
    示例代码路径：`demo/layout/tabbarsimple`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>


---


### 弹性布局 `Flexbox`

`Flexbox`弹性布局组件，由`Flexbox`组件和它的子组件`FlexboxItem`组成，一个子组件`FlexboxItem`，就是一个布局区块。
`Flexbox`弹性布局是`CSS3`中一种新的布局模式，有关它的更多信息，请参考[Flexbox布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)。

``` js
import { Flexbox } from 'vux'
```

``` html
<flexbox>
    <flexbox-item>
        <div class="flex-demo">1</div>
    </flexbox-item>
    <flexbox-item>
        <div class="flex-demo">2</div>
    </flexbox-item>
</flexbox>
```

<span class="vux-component-name">Flexbox</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">gutter</span> | <span class="type type-number">Number</span> | 8 | &nbsp; | 间隙像素大小 |
| <span class="prop-key" style="white-space:nowrap;">justify</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | `flex`的 `justify-content`属性 |
| <span class="prop-key" style="white-space:nowrap;">align</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | `flex`的`align-items`属性 |
| <span class="prop-key" style="white-space:nowrap;">wrap</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | `flex`的`flex-wrap`属性 |
| <span class="prop-key" style="white-space:nowrap;">direction</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | `flex`的`flex-direction`属性 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | `flexbox-item`的内容插槽 | &nbsp; |

<span class="vux-component-name">FlexboxItem</span>

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">span</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 占用宽度，如果不设，所有flexbox-item将平分 |
| <span class="prop-key" style="white-space:nowrap;">order</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | `flex`的`order`属性 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 内容插槽 | &nbsp; |

<p class="tip demo-tip" key="/layout/flexbox">
    示例代码路径：`demo/layout/flexbox`
    <br/><br/>
    <button class="docute-button docute-button-success">快速运行示例</button>
    <a class="docute-button docute-button-primary" target="_blank">在新窗口中打开</a>
    <button class="docute-button docute-button-qrcode" target="_blank">显示二维码</button>
</p>