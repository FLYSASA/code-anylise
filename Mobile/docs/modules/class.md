### 原子样式类

#### 填充/边距 `padding/margin`
项目框架默认提供了`0/5px/10px/15px/20px/25px`的`padding`和`margin`，可通过调整`@maxCount`（文件路径：`src/static/css/variable.less`）变量值改变值范围。相关样式类名称如下（`p`表示`padding`缩写；`m`表示`margin`缩写；）：

* `p-像素值/m-像素值`：设置元素上、下、左、右四个方向填充或边距，例如，`<div class="p-10 m-10"></div>`；
* `p-v-像素值/m-v-像素值`：设置元素垂直方向（vertical，上、下）填充或边距，例如，`<div class="p-v-10 m-v-10"></div>`；
* `p-h-像素值/m-h-像素值`：设置元素水平方向（horizontal，左右）填充或边距，例如，`<div class="p-h-10 m-h-10"></div>`；
* `p-t-像素值/m-t-像素值`：设置元素顶部（top，上）填充或边距，例如，`<div class="p-t-10 m-t-10"></div>`；
* `p-r-像素值/m-r-像素值`：设置元素右边（right）填充或边距，例如，`<div class="p-r-10 m-r-10"></div>`；
* `p-b-像素值/m-b-像素值`：设置元素底部（bottom）填充或边距，例如，`<div class="p-b-10 m-b-10"></div>`；
* `p-l-像素值/m-l-像素值`：设置元素左边（left）填充或边距，例如，`<div class="p-l-10 m-l-10"></div>`；

---

#### 边框 `vux-1px`
项目框架引入了`vux`框架`demo`站点的`vux-1px`样式类用于设置元素1px的边框。相关样式类名称如下：

* `vux-1px`：设置元素上、下、左、右的边框，例如，`<div class="vux-1px"></div>`;
* `vux-1px-t`：设置元素顶部边框，例如，`<div class="vux-1px-t"></div>`;
* `vux-1px-b`：设置元素底部边框，例如，`<div class="vux-1px-b"></div>`; 
* `vux-1px-tb`：设置元素顶部和底部边框，例如，`<div class="vux-1px-tb"></div>`; 
* `vux-1px-l`：设置元素左边边框，例如，`<div class="vux-1px-l"></div>`; 
* `vux-1px-r`：设置元素右边边框, 例如，`<div class="vux-1px-r"></div>`; 


---

#### 子元素对齐 `vux-center`
项目框架引入了`vux`框架`demo`站点的`vux-center`样式类用于设置元素内子元素的对齐方式。相关样式类名称如下：

* `vux-center`：设置元素内子元素水平垂直居中显示；
* `vux-center-h`：设置元素内子元素水平居中显示；
* `vux-center-v`：设置元素内子元素垂直居中显示；

``` html
<template>
    <div>
        <div class="vux-center-h" style="margin:15px;border:1px solid green;height:100px;border-radius:5px;">
            <div>水平居中显示</div>
        </div>
        <div class="vux-center-v" style="margin:15px;border:1px solid green;height:100px;border-radius:5px;">
            <div>垂直居中显示</div>
        </div>
        <div class="vux-center" style="margin:15px;border:1px solid green;height:100px;border-radius:5px;">
            <div>水平垂直居中显示</div>
        </div>
    </div>
</template>
```

---

#### 文本
项目框架提供了常用的文本对齐、文本粗体、文本截取样式。相关样式类名称如下：

* `text-center`：设置文本居中显示，设置样式`text-align:center`；
* `text-left`：设置文本居左显示，设置样式`text-align:left`；
* `text-right`：设置文本居右显示，设置样式`text-align:right`；
* `text-bold`：设置文本粗体显示，设置样式`text-weight:bold`；
* `text-nowrap`：设置单行文本截取超出内容，超出内容用省略号('...')替换；

``` less
.text-nowrap {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
```

---

#### 浮动

* `pull-right`：设置元素右浮动，设置样式`float:right`；
* `pull-left`：设置元素左浮动，设置样式`float:left`；

---

#### 元素显示隐藏

* `block`：设置块元素显示，设置样式`display:block`；
* `inline`：设置行内元素显示，设置样式`display:inline-block`；
* `hide`：隐藏元素，设置样式`display:none`；

---

#### 背景色

* `back-bg`：后置背景色，一般用于设置内容块容器的背景色;
* `front-bg`：前置背景色，一般用于设置内容块的背景色；

---

### vux组件特殊样式类
这些特殊样式类用于覆盖`vux`组件的样式（例如，取消Grid组件边框）或者添加`vux`组件额外的样式（例如，设置`Cell`组件`Icon`图标大小）

#### 取消`Grid`组件边框：`grid-noborder`
`Grid`组件默认都是有边框的，`grid-noborder`样式类用于取消`Grid`组件的边框样式。

``` html
<!-- 运用实例路径：src/pages/example/index/views/index.vue -->
<template>
    ...
    <grid rows="4" class="grid-noborder m-b-10 front-bg p-t-25">
        <grid-item :label="menu.label" :icon="menu.icon" v-for="(menu, i) in shortcutMenu" :key="menu.label">
        </grid-item>
    </grid>
    ...
</template>
```

---

#### 取消`Group`组件顶部边距：`group-no-m-t`
当`Group`组件无标题时会默认带有样式`margin-top:0.77em`，`group-no-m-t`用于取消该样式，设置为`margin-top:0`。

``` html
<!-- 运用实例路径：src/pages/example/pullList/views/customList.vue -->
<template>
    <pull-list @on-load="onLoad" :get-post-data="getPostData" :api-config="apiConfig">
        <!-- 取消group的顶部空白 -->
        <group class="group-no-m-t">
            <cell v-for="data in dataList" :key="data.UserId" @click.native="browse(data)">
                <img slot="icon" :src="data.HeadIconPath || require('../../../../static/images/example/user.gif')" style="width:60px;margin-right:10px;" />
                <span slot="title">{{data.UserName}}</span>
                <span slot="inline-desc" style="color:#666;font-size:14px;">{{data.UsedByCorpName}}</span>
                <span slot="default" style="color:#666;font-size:14px;">{{data.CreateDate|dateFormat('yyyy-MM-dd')}}</span>
            </cell>
        </group>
    </pull-list>
</template>
```

---


#### 设置`Cell`组件`value`插槽img大小： `cell-value-img`
`Cell`组件`value`插槽为图片时会按图片原始像素大小显示，图片过大造成布局混乱。`cell-value-img`样式类用于解决这类问题，限制了图片最大高度为`35px`。

``` html
<!-- 运用实例路径：src/pages/example/index/views/mine.vue -->
<template>
    <div class="back-bg">
        <group>
            <cell class="cell-value-img" title="用户头像" :is-link="true">
                <img src="../../../../static/images/example/avatar.png" />
            </cell>
            <cell title="姓名" value="Vivian"></cell>
            <cell title="公司" value="深圳分公司"></cell>
            <cell title="部门" value="成本管理部"></cell>
            <cell title="岗位" value="成本专员"></cell>
        </group>
        ...
    </div>
</template>
```

---


#### 设置`Cell`组件`Icon`插槽img大小且垂直居中：`cell-icon-middle`
`Cell`组件`Icon`插槽为img元素时显示为img的原始像素大小，并且没有右边填充。`cell-icon-middle`样式类可以限制`Icon`插槽内img元素的长宽及右边距。

``` html
<!-- 运用实例路径：src/pages/example/index/views/index.vue -->
<template>
    <div>
        ...
        <group class="index-group" :title="messageTitle">
            <cell class="cell-icon-middle p-v-20" v-for="message in messageList" :key="message.title" is-link :title="message.title">
                <img v-if="!!message.icon" slot="icon" :src="message.icon" />
                <div v-if="!!message.count" slot="value">
                    <badge :text="message.count"></badge>
                </div>
            </cell>
        </group>
        ...
    </div>
</template>
```

---

#### 设置`Switch`组件`title`插槽包含img大小及边距：`icon-switch`
`Switch`组件内置并不支持左侧icon图标，只能通过在`title`插槽中添加html代码，同时配合v-switch-icon-width-auto指令实现。`icon-switch`样式类用于设置`title`插槽中img的大小及左边距。

``` js
// 运用实例路径：src/pages/example/index/views/mine.vue
import switchIconWidthAuto from '../../../../directives/switch-icon-width-atuo'
export default {
    ...
    directives: {
        switchIconWidthAuto
    },
    ...
}
```

``` html
<!-- 运用实例路径：src/pages/example/index/views/mine.vue -->
<template>
    <div>
        ...
        <group>
            <x-switch v-switch-icon-width-auto class="icon-switch" :title="`<img src=${require('../../../../static/images/example/wifi.png')} />wifi下使用`" @on-change="updateWifi"></x-switch>
            ...
        </group>
        ...
    </div>
</template>
```

---

#### 设置`Cell`组件`icon`插槽img大小及边距：`icon-cell`
`Cell`组件`icon`插槽为img时img显示为原始像素大小且没有左边距，`icon-cell`样式类用于限制img显示大小及设置左边距。

``` html
<!-- 运用实例路径：src/pages/example/index/views/mine.vue -->
<template>
    <div>
        ...
        <group>
            ...
            <cell class="icon-cell" title="清除缓存" :is-link="true">
                <img src="../../../../static/images/example/clear.png" slot="icon" />
            </cell>
        </group>
        ...
    </div>
</template>
```

---

#### 设置`GridItem`组件`Icon`显示大尺寸：`grid-icon-large`
`GridItem`组件`Icon`图标只能支持`28px`的大小，`grid-icon-large`样式类用于设置`Icon`图标`50px`的大小。

``` html
<!-- 运用实例路径：src/pages/example/index/views/operation.vue -->
<template>
    <div class="back-bg">
        ...
        <grid class="grid-noborder">
            <grid-item class="grid-icon-large" @on-item-click="onItemClick(index)" :label="operation.label" :icon="operation.icon" v-for="(operation, index) in operationList" :key="operation.label">
            </grid-item>
        </grid>
    </div>
</template>
```