为了满足开发需求，在`vux`组件的基础上封装了一些常用的页面级组件和内容组组件。

## 自定义页面级组件

### 登录页组件 `Login`
`Login`登录组件采用了`flexbox`布局，分为`上、中、下`三部分。上部可显示`Logo`，中部显示登陆框，下部可显示`copyright`。

``` js
import Login from '@/component/master/Login.vue'
```

``` html
<login @submit="login" :copyright="''" :spans="[0.3, 0.4, 0.3]">
    <img slot='logo' class="logo" src="../../../static/images/home/sapi_logo.png" />
    <div slot='bottom'>
        <load-more :show-loading="false" tip="使用社交账号登录"></load-more>
        <img src="../../../static/images/example/we-chat.png" width="50" />
    </div>
</login>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">spans</span> | <span class="type type-array">Array</span> | [1/4, 1/2, 1/4] | &nbsp; | 上中下部分的比例 |
| <span class="prop-key" style="white-space:nowrap;">copyright</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 底部版权信息，默认是`'赛普移动办公企业适配管理平台'` |
| <span class="prop-key" style="white-space:nowrap;">copyrightClass</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 底部版权信息样式类 |
| <span class="prop-key" style="white-space:nowrap;">username</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 初始化登录用户框值 |
| <span class="prop-key" style="white-space:nowrap;">password</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 初始化密码框值 |
| <span class="prop-key" style="white-space:nowrap;">usernamePlaceholder</span> | <span class="type type-string">String</span> | '请输入账号' | &nbsp; | 用户输入框`placeholder`提示 |
| <span class="prop-key" style="white-space:nowrap;">usernameIsType</span> | <span class="type type-function">Function</span> | &nbsp; | &nbsp; | 验证`username`类型函数，需返回`{valid:true}`或者`{valid:false, msg:错误信息}` |
| <span class="prop-key" style="white-space:nowrap;">passwordPlaceholder</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 密码输入框`placeHolder`提示 |
| <span class="prop-key" style="white-space:nowrap;">passwordIsType</span> | <span class="type type-function">Function</span> |  &nbsp;  |  &nbsp;  | 验证`password`类型函数，需返回`{valid:true}`或者`{valid:false, msg:错误信息}` |
| <span class="prop-key" style="white-space:nowrap;">inputIconClass</span> | <span class="type type-string">String</span> | &nbsp; |  &nbsp; | 设置输入框左侧图片的样式类 |
| <span class="prop-key" style="white-space:nowrap;">usernameIcon</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp | 登录用户输入框的左侧图标`src` |
| <span class="prop-key" style="white-space:nowrap;">passwordIcon</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp | 登录密码输入框的左侧图标`src` |
| <span class="prop-key" style="white-space:nowrap;">submitType</span> | <span class="type type-string">String</span> | 'primary' | &nbsp | 提交登录按钮的类型，default,primary,warn |
| <span class="prop-key" style="white-space:nowrap;">submitClass</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp | 提交登录按钮的样式类 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">logo</span> | `logo`插槽，存放`logo`图片 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">bottom</span> | 添加底部额外的内容 | &nbsp; |


* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">submit</span> |   `{username, password}`对象 | 登录提交事件 |
| <span class="prop-key" style="white-space:nowrap;">invalid</span> |   错误消息 | 输入框验证失败事件|

<p class="tip">
    示例代码路径：`src/page/example/login/login.vue`
</p>

---

### 布局组件 `Layout`
`Layout`布局组件内部使用了`vux`的`view-box`组件和`x-header`组件布局。

``` js
import Layout from '@/component/master/Layout.vue'
```

``` html
<layout :title="title" @on-click-more="showTabType = !showTabType">
    <tab-pull-list :panel-list="panelList" :tab-type="tabType" @on-click-item="browse" :get-post-data="getPostData">
    </tab-pull-list>

    <actionsheet slot="bottom" v-history-state="showTabType" v-model="showTabType" :menus="tabTypes" @on-click-menu="changeType">
    </actionsheet>
</layout>
```
* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">headerStyle</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | 顶部标题框样式，可设置透明属性等 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 页面标题，必须 |
| <span class="prop-key" style="white-space:nowrap;">bodyPaddingTop</span> | <span class="type type-string">String</span> | '46px' | &nbsp; | 顶部填充，用于显示`XHeader` |
| <span class="prop-key" style="white-space:nowrap;">bodyPaddingBottom</span> | <span class="type type-string">String</span> | '0' | &nbsp; | 底部填充，用显示tabbar |
| <span class="prop-key" style="white-space:nowrap;">showBack</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示返回，默认不显示 |
| <span class="prop-key" style="white-space:nowrap;">preventGoBack</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否阻止返回，默认为false |
| <span class="prop-key" style="white-space:nowrap;">showMore</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示顶部右侧“更多”按钮，可指定`@on-show-more`事件 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 内容插槽 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">bottom</span> | 底部插槽，一般用于存放弹出显示的组件（类似`actionsheet`）  | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">header-right</span> | 顶部标题右侧插槽，可自定义内容或按钮 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">header-left</span> | 顶部标题左侧插槽，可自定义内容或按钮 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-click-more</span> |   &nbsp; | `showMore`为`true`，点击`‘更多’`事件 |
| <span class="prop-key" style="white-space:nowrap;">on-click-back</span> |   &nbsp; | 当`preventGoBack`为`true`，点击左边返回时触发 |

<p class="tip">
    示例代码路径：`src/page/example/tabList/app.vue`
</p>

---

### 布局路由组件 `LayoutRouter`
`LayoutRouter`组件只是在`Layout`组件基础上添加了路由功能。

``` js
import LayoutRouter from '@/component/master/LayoutRouter.vue'
```

``` html
<layout-router :title="title" @on-click-more="showMenus = !showMenus">
    <actionsheet slot="bottom" v-history-state="showMenus" v-model="showMenus" :menus="menus" @on-click-menu="changeMenus">
    </actionsheet>
</layout-router>
```
* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">headerStyle</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | 顶部标题框样式，可设置透明属性等 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 页面标题，必须 |
| <span class="prop-key" style="white-space:nowrap;">bodyPaddingTop</span> | <span class="type type-string">String</span> | '46px' | &nbsp; | 顶部填充，用于显示`XHeader` |
| <span class="prop-key" style="white-space:nowrap;">bodyPaddingBottom</span> | <span class="type type-string">String</span> | '0' | &nbsp; | 底部填充，用显示`tabbar` |
| <span class="prop-key" style="white-space:nowrap;">showBack</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示返回，默认不显示 |
| <span class="prop-key" style="white-space:nowrap;">preventGoBack</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否阻止返回，默认为`false` |
| <span class="prop-key" style="white-space:nowrap;">showMore</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示顶部右侧`“更多”`按钮，可指定`@on-show-more`事件 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 内容插槽 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">bottom</span> | 底部插槽，一般用于存放弹出显示的组件（类似`actionsheet`）  | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">header-right</span> | 顶部标题右侧插槽，可自定义内容或按钮 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">header-left</span> | 顶部标题左侧插槽，可自定义内容或按钮 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-click-more</span> |   &nbsp; | `showMore`为`true`，点击`‘更多’`事件 |
| <span class="prop-key" style="white-space:nowrap;">on-click-back</span> |   &nbsp; | 当`preventGoBack`为`true`，点击左边返回时触发 |

<p class="tip">
    示例代码路径：`src/page/example/pullList/app.vue`
</p>

---

### 主页组件 `Home`
`Home`主页组件分为顶部标题、中间内容区域、底部`tabbar`。

``` js
import Home from '@/component/master/Home.vue'
```

``` html
<home :body-padding-top="bodyPaddingTop" :title="title" :tabbar-items="tabbarItems" :showBack="showBack" :header-style="headerStyle" @on-tabbar-index-change="onTabbarIndexChange">
    <img slot="header-right" v-if="showScan" style="width:30px;margin-top:-5px;" src="../../../static/images/example/scan.png" />
    <span slot="header-left" v-if="showDrawerIcon" @click="drawerVisibility = !drawerVisibility">
        <x-icon type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
    </span>
</home>
```
* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">headerStyle</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | 顶部标题框样式 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 页面标题，必须 |
| <span class="prop-key" style="white-space:nowrap;">bodyPaddingTop</span> | <span class="type type-string">String</span> | '46px' | &nbsp; | 顶部填充，用于显示`XHeader` |
| <span class="prop-key" style="white-space:nowrap;">bodyPaddingBottom</span> | <span class="type type-string">String</span> | '55px' | &nbsp; | 底部填充，用显示`tabbar` |
| <span class="prop-key" style="white-space:nowrap;">showBack</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示返回，默认不显示 |
| <span class="prop-key" style="white-space:nowrap;">preventGoBack</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否阻止返回，默认为`false` |
| <span class="prop-key" style="white-space:nowrap;">showMore</span> | <span class="type type-boolean">Boolean</span> | false | &nbsp; | 是否显示顶部右侧`“更多”`按钮，可指定`@on-show-more`事件 |
| <span class="prop-key" style="white-space:nowrap;">tabbarIconClass</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 指定`tabbaritem icon`样式类 |
| <span class="prop-key" style="white-space:nowrap;">tabbarShowIcon</span> | <span class="type type-boolean">Boolean</span> |  true  |  &nbsp;  | 是否显示`tabbar-item`的`icon` |
| <span class="prop-key" style="white-space:nowrap;">tabbarShowLabel</span> | <span class="type type-boolean">Boolean</span> | true |  &nbsp; | 是否显示`tabbar-item`的`label` |
| <span class="prop-key" style="white-space:nowrap;">tabbarItems</span> | <span class="type type-array">Array</span> | [] | &nbsp | 底部`tabbaritems`对象数组，item对象格式：`{ key:'唯一标识', label:'选项卡名称', icon:'选项卡图标', icon-active:'选中状态图标', link:'普通url或者用vue-link；object写法指定replace为true可实现replace跳转', badge:'徽标文字', title:'指定标题，内容切换改变标题' }`|

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">header-right</span> | 顶部标题右侧插槽，可自定义内容或按钮 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">header-left</span> | 顶部标题左侧插槽，可自定义内容或按钮 | &nbsp; |


* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-click-more</span> |   &nbsp; | `showMore`为`true`，点击`‘更多’`事件 |
| <span class="prop-key" style="white-space:nowrap;">on-click-back</span> |   &nbsp; | 当`preventGoBack`为`true`，点击左边返回时触发 |
| <span class="prop-key" style="white-space:nowrap;">on-tabbar-item-click</span> | 参数分别为`index`, `tabbarItems[index]` | 点击`tabbar`选项触发 |
| <span class="prop-key" style="white-space:nowrap;">on-tabbar-index-change</span> | 参数分别为`index`（当前选项卡在`tabbarItems`位置）, `prevIndex`（头一次改变的时候为-1） | `tabbar-index`改变事件 |

<p class="tip">
    示例代码路径：`src/page/example/index/app.vue`
</p>

---

## 自定义内容组件

### 下拉刷新列表组件 `PullPanel`
`PullPanel`下拉刷新列表组件内部采用了自定义的`PullLoad`组件，该组件进一步对异步加载数据、分页处理数据进行了封装，开发人员只需传入`apiConfig`（请求接口配置）和`matchProps`（返回数据匹配对象）即可实现拉下刷新功能，同时支持自定义列表。

<p class="tip">
    `PullLoad`参考了`mint`库`load-more`组件来实现。由于该组件使用相对复杂，不推荐使用，故此不做介绍。欢迎有兴趣同学研究，代码路径：src/components/control/PullLoad.vue。
    <br/>
    `PullPanel`使用时需设置外层容器（一般是div元素）高度值，可为外层元素添加`v-height-to-bottom`指令实现。推荐优先使用自带搜索框的`PullList`组件。
</p>

<p class="warning">
    尽量不要使用vux的`Scroller`组件，该组件已经不再维护。
</p>

``` js
import PullPanel from '@/component/control/PullPanel.vue'
```

``` html
<pull-panel :auto-fill="autoFill" :api-config="apiConfig" :page-size="pageSize" :get-post-data="setPostData" @on-load="onLoad" @on-click-item="onClickItem" :panel-type="panelType" :match-props="matchProps">
</pull-panel>
```
* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">autoFill</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 数据是否自动填满 |
| <span class="prop-key" style="white-space:nowrap;">apiConfig</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | 调用接口配置，接口配置详见`request`异步请求文档 |
| <span class="prop-key" style="white-space:nowrap;">pageSize</span> | <span class="type type-number">Number</span> | 默认配置`pageSize（src/static/js/config.js）` | &nbsp; | 分页条数 |
| <span class="prop-key" style="white-space:nowrap;">getPostData</span> | <span class="type type-function">Function</span> | &nbsp; | &nbsp; | 若不指定，则异步请求参数默认为`{pageIndex, pageSize, keyword:''}`对象；若指定，该函数参数是`{pageIndex, pageSize, keyword:''}`，函数的返回值必须为改造过的异步请求参数对象（添加额外的参数） |
| <span class="prop-key" style="white-space:nowrap;">panelType</span> | <span class="type type-string">String</span> | '1' | &nbsp; | 当default插槽为空时，默认显示`Panel`组件，此时`panelType`有效，`panelType`可选值：`'1'、'2'、'3'、'4'、'5'` |
| <span class="prop-key" style="white-space:nowrap;">matchProps</span> | <span class="type type-object">Object</span><br/><span class="type type-function">Function</span> | &nbsp; | &nbsp; | 当`defualt`插槽采用默认的`Panel`组件时，异步返回数据需要做字段配置。`matchProps`为`Object`时，对象属性：`{title:'返回数据项指定的标题属性', desc:'返回数据项指定的描述属性', src:'返回数据项指定的左侧图标路径属性'}`；当`matchProps`为`Function`时，函数参数为请求返回每条数据项，函数返回值必须包含属性`title、desc、src`。 |


* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 内容插槽，默认是`Panel`组件 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">pull-load-top</span> | 下拉时顶部提示内容，一般不需要设置。如必要，需配合`@load-status-change`事件实现。 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">pull-load-bottom</span> | 上拉时底部提示内容，一般不需要设置。如必要，需配合`@load-status-change`事件实现。  | &nbsp; |


* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">load-status-change</span> |  两个参数：`status`（三种值：拉取状态`pull`、回缩状态`drop`、加载状态`loading`）、`direction`（拉取风向：往下拉`down`、往上拉：`up`）。 | 上下拉取状态改变事件 |
| <span class="prop-key" style="white-space:nowrap;">on-load</span> |  异步请求的数据  | 自定义列表时需监听该事件，获取数据绑定到自定义列表上。 |
| <span class="prop-key" style="white-space:nowrap;">on-click-item</span> |  点击当前项的数据  | 点击当前项的事件 |

---

### 下拉刷新列表（包含搜索框） `PullList`
`PullList`组件在`PullPanel`组件基础上添加了`Search`组件。

``` js
import PullList from '@/component/control/PullList.vue'
```

``` html
<pull-list @on-click-item="browse" :panel-type="panelType" :match-props="matchProps" :get-post-data="getPostData" :api-config="apiConfig">
</pull-list>
```
* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">showSearch</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示搜索框 |
| <span class="prop-key" style="white-space:nowrap;">autoFill</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 数据是否自动填满 |
| <span class="prop-key" style="white-space:nowrap;">apiConfig</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | 调用接口配置，接口配置详见`request`异步请求文档 |
| <span class="prop-key" style="white-space:nowrap;">pageSize</span> | <span class="type type-number">Number</span> | 默认配置`pageSize（src/static/js/config.js）` | &nbsp; | 分页条数 |
| <span class="prop-key" style="white-space:nowrap;">getPostData</span> | <span class="type type-function">Function</span> | &nbsp; | &nbsp; | 若不指定，则异步请求参数默认为`{pageIndex, pageSize, keyword:''}`对象；若指定，该函数参数是`{pageIndex, pageSize, keyword:''}`，函数的返回值必须为改造过的异步请求参数对象（添加额外的参数） |
| <span class="prop-key" style="white-space:nowrap;">panelType</span> | <span class="type type-string">String</span> | '1' | &nbsp; | 当`default`插槽为空时，默认显示`Panel`组件，此时`panelType`有效，`panelType`可选值：`'1'、'2'、'3'、'4'、'5'` |
| <span class="prop-key" style="white-space:nowrap;">matchProps</span> | <span class="type type-object">Object</span><br/><span class="type type-function">Function</span> | &nbsp; | &nbsp; | 当`defualt`插槽采用默认的`Panel`组件时，异步返回数据需要做字段配置。`matchProps`为`Object`时，对象属性：`{title:'返回数据项指定的标题属性', desc:'返回数据项指定的描述属性', src:'返回数据项指定的左侧图标路径属性'}`；当`matchProps`为`Function`时，函数参数为请求返回每条数据项，函数返回值必须包含属性`title、desc、src`。 |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 内容插槽，默认是`Panel`组件 | &nbsp; |
| <span class="prop-key" style="white-space:nowrap;">list-top</span> | 列表顶部插槽，默认是`Search`组件 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-load</span> |  异步请求的数据  | 自定义列表时需监听该事件，获取数据绑定到自定义列表上。 |
| <span class="prop-key" style="white-space:nowrap;">on-click-item</span> |  点击当前项的数据  | 点击当前项的事件 |

<p class="tip demo-tip">
    示例代码路径：`src/page/example/pullList/view/list.vue`
    <br/>
    自定义列表路径：`src/page/example/pullList/view/customList.vue`
    <br/><br/>
</p>

---

### 选项卡下拉刷新组件 `TabPullList`
`TabPullList`选项卡下拉刷新组件内部采用了`vux`的`Swiper`组件，可左右滑动切换列表。

``` js
import TabPullList from '@/component/control/TabPullList.vue'
```

``` html
<tab-pull-list :panel-list="panelList" :tab-type="tabType" @on-click-item="browse" :get-post-data="getPostData">
</tab-pull-list>
```
* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">showSearch</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示搜索框 |
| <span class="prop-key" style="white-space:nowrap;">autoFill</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 数据是否自动填满 |
| <span class="prop-key" style="white-space:nowrap;">getPostData</span> | <span class="type type-function">Function</span> | &nbsp; | &nbsp; | 若不指定，则异步请求参数默认为`{pageIndex, pageSize, keyword:''}`对象；若指定，该函数参数是`{pageIndex, pageSize, keyword:''}`，函数的返回值必须为改造过的异步请求参数对象（添加额外的参数） |
| <span class="prop-key" style="white-space:nowrap;">tabType</span> | <span class="type type-string">String</span> | '1' | &nbsp; | 可选值：'1'和'2'。默认选项卡组件是`ButtonTab`组件， 否则是`Tab`组件。|
| <span class="prop-key" style="white-space:nowrap;">panelList</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 数组项为对象，对象包含属性：`title`(`tab`标题)、`apiConfig`（接口配置）、`panelType`（列表默认`Panel`组件时`panelType`，可选值：`'1'、'2'、'3'、'4'、'5'`）、`matchProps`（列表默认`Panel`组件时匹配返回数据属性对象，`{title:'请求数据对应属性名称', desc: '请求数据对应属性名称', src:'请求数据对应属性名称'}`;也可以指定函数，参数为返回数据项，函数返回值必须包含属性：`title、desc、src`。） |

* **插槽 (`Slots`)**

|  名称  |  说明  |  版本  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">default</span> | 列表内容插槽，默认是`Panel`组件 | &nbsp; |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-load</span> |  两个参数，分别是：异步请求的数据、当前活动选项卡的序号  | 自定义列表时需监听该事件，获取数据绑定到自定义列表上。 |
| <span class="prop-key" style="white-space:nowrap;">on-click-item</span> |  两个参数，分别是：点击当前项的数据、当前活动选项卡的序号  | 点击当前项的事件 |
| <span class="prop-key" style="white-space:nowrap;">on-tab-index-change</span> |  两个参数，分别是：点击当前项卡的序号、前一个选项卡的序号  | 切换`tab`列表事件 |

<p class="tip">
    示例代码路径：`src/page/example/tabList/app.vue`
</p>

---

### 二级菜单组件 `CellGroup`
`CellGroup`内部用`Group`和`Cell`组件实现，适合用于简单的分组二级菜单页面。


``` js
import CellGroup from '@/component/control/CellGroup.vue'
```

``` html
<cell-group :group-list="groups" @on-menu-click="menuClick">
</cell-group>
```

* **属性 (`Props`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">groupList</span> | <span class="type type-array">Array</span> | &nbsp; | &nbsp; | 每个数组项是对象，表示一个`group`组，对象结构：`{ title: 'group标题', menus: [{ title: 'cell标题', icon: 'cell左侧图标', link: {是否连接，右侧是否显示'>'符号} }]}` |
| <span class="prop-key" style="white-space:nowrap;">showIcon</span> | <span class="type type-boolean">Boolean</span> | true | &nbsp; | 是否显示左侧图标 |

* **事件 (`Events`)**

|  名称  |  参数  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">on-item-click</span> |  三个参数，分别是：`item`（`menus`数组中的数组项）、`groupIndex`（`groupList`序号）、`itemIndex`（`menus`中的序号）  | `cell`点击事件 |
