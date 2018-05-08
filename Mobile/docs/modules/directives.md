## 自定义指令

### `height-to-bottom`指令
`height-to-bottom`指令的作用是使元素从元素当前位置开始占满屏幕下方，一般用于`PullPanel`组件外层元素。

``` js
import heightToBottom from '@/directives/height-to-bottom'

export default {
    ...
    directives: {
        heightToBottom
    },
    ...
}
```

``` html
<div v-height-to-bottom>
    <pull-panel ref="pullPanel" :auto-fill="autoFill" :api-config="apiConfig" :page-size="pageSize" :get-post-data="setPostData" @on-load="onLoad" @on-click-item="onClickItem" :panel-type="panelType" :match-props="matchProps">
        <template>
            <slot name="default">
            </slot>
        </template>
    </pull-panel>
</div>
```

---

### `history-state`指令
`history-state`指令作用是模拟安卓返回键功能，用于场景：一个隐藏元素由隐藏状态变显示状态（例如：弹出左侧菜单），用户按“返回”键自动隐藏该元素。指令值必须是`boolean`值，一般是控制组件隐藏状态的双向绑定属性，当用户按“返回”键时指令内部将绑定属性设为`false`。

``` js
import historyState from '@/directives/history-state'

export default {
    ...
    directives: {
        historyState
    },
    ...
}
```

``` html
<layout-router ref="root" @view-custom-event="updateTitle" :title="title" @on-click-more="showMenus = !showMenus">
    <!-- showMenus用于控制Actionsheet组件显示隐藏状态 -->
    <actionsheet slot="bottom" v-history-state="showMenus" v-model="showMenus" :menus="menus" @on-click-menu="changeMenus">
    </actionsheet>
</layout-router>
```

---

### `switch-icon-width-auto`指令
`switch-icon-width-auto`指令用于解决`vux`的`XSwitch`组件左侧`label`文字限定宽度的问题，特别是`XSwitch`组件存在左侧图标的情况下，造成`label`文字换行。

``` js
import switchIconWidthAuto from '@/directives/switch-icon-width-atuo'

export default {
    ...
    directives: {
        switchIconWidthAuto
    },
    ...
}
```

``` html
<group>
    <x-switch v-switch-icon-width-auto class="icon-switch" :title="`<img src=${require('../../../../static/images/example/wifi.png')} />wifi下使用`" @on-change="updateWifi"></x-switch>

    <cell class="icon-cell" title="清除缓存" :is-link="true">
        <img src="../../../../static/images/example/clear.png" slot="icon" />
    </cell>
</group>
```