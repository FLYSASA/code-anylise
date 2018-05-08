## mixins方法

### emitter.js 事件传递
项目框架为了尽量简单好用，也为了减少学习成本，项目框架没有采用vuex状态管理。为了解决越级组件之间的通信，添加了`dispatch`（触发父辈级组件的自定义事件）和`broadcast`（触发子孙级组件的自定义事件）方法。特别注意的是，事件不会一直向上或向下触发，当某个父辈级组件或某些同级子孙组件存在对应的定义事件时，会触发自定义方法，并且停止向上或向下触发。

<p class="tip">
    代码路径：src/mixins/emitter.js
</p>


---

#### 事件冒泡执行 `dispatch`
`dispatch`方法用于解决组件与父辈级组件之间的通信。调用该方法时，它会从父组件开始逐层向上判断是否存在指定的自定义事件。若存在，则触发自定义事件，并且终止向上触发。`dispatch`方法适合于路由加载的组件向页面级组件发送信息，例如，当页面内容路由加载用户详细组件时需要将页面标题更新为用户的名称。看如下实例代码：

页面级组件关键`js`和`html`
``` js
export default {
    data () {
        return {
            ...
            title: ''
        }
    },
    ...
    methods: {
        ...
        updateTitle (title) {
            this.title = title
        }
    }
    ...
}
```

``` html
<layout-router ref="root" @on-dispatch-update-title="updateTitle" :title="title" @on-click-more="showMenus = !showMenus">
    <actionsheet slot="bottom" v-history-state="showMenus" v-model="showMenus" :menus="menus" @on-click-menu="changeMenus">
    </actionsheet>
</layout-router>
```

路由加载组件关键`js`
``` js
import Emitter from '@/mixins/emitter.js'
import request from '@/static/js/request.js'

export default {
    data () {
        return {
            ...
            userId: '',
            title: ''
        }
    },
    mixins: [Emitter],
    methods: {
        getUserInfo () {
            const _this = this
            request({
                data: { userId: this.userId },
                loading: true
            }, getUser).then(function (data) {
                if (data) {
                    ...
                    _this.title = data.Data.UserName
                } else {
                    ...
                    _this.title = '不存在账号信息'
                }
            })
        },
        ...
    },
    watch: {
        title (val) {
            // 触发LayoutRouter组件上定义的事件
            this.dispatch('on-dispatch-update-title', val)
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.userId = to.params.id
        })
    },
    beforeRouteUpdate (to, from, next) {
        this.userId = to.params.id
        next()
    },
    ...
}
```

* 参数
`dispatch`方法第一个参数必须为自定义事件名称，其他参数按需添加。在调用`dispatch`方法时，传了多少个参数，监听事件函数会接受到除事件名称以为的其他参数。

<p class="warning">
    为了其他开发人员更好理解代码，在定义越级事件时，统一规范为`'on-dispatch-自定义事件名称'`。
</p>

---


#### 事件捕获执行 `broadcast`
`broadcast`方法用于解决组件与子孙级组件之间的通信。调用该方法时，它会从子组件开始逐层向下遍历判断是否存在相应的自定义事件。若存在，则触发自定义事件，并且终止向下触发。与`dispatch`方法不同的是，`broadcast`方法可以使多个同层级组件触发自定义事件，而`dispatch`方法有且仅有一个父组件触发自定义事件。`broadcast`方法适合于页面级组件向路由加载的组件发送信息。例如，点击页面组件中的‘更多’按钮弹出`Actionsheet`组件选择不同类型值，改变路由加载组件显示列表的样式类别。看如下实例代码：

页面级组件关键`js`和`html`
``` js
import Emitter from '@/mixins/emitter'

export default {
    data () {
        return {
            menus: {
                '1': '默认PullList：type = 1',
                '2': '默认PullList：type = 2',
                '3': '默认PullList：type = 3',
                '4': '默认PullList：type = 4',
                '5': '默认PullList：type = 5',
                '6': '自定义PullList',
                '7': '自定义操作PullList'
            },
            showMenus: false,
            ...
        }
    },
    mixins: [Emitter],
    methods: {
        changeMenus (key) {
            if (key === '6') {
                this.$router.push({ name: 'customList' })
            } else if (key === '7') {
                this.$router.push({ name: 'customOperationList' })
            } else {
                this.$router.push({ name: 'list' })
                // 触发路由加载组件自定义事件
                this.broadcast('on-broadcast-panel-type', key)
            }
        },
        ...  
    },
    ...
}
```

``` html
<layout-router :title="title" @on-click-more="showMenus = !showMenus">
    <actionsheet slot="bottom" v-history-state="showMenus" v-model="showMenus" :menus="menus" @on-click-menu="changeMenus">
    </actionsheet>
</layout-router>
```

路由加载组件关键`js`和`html`

``` js
export default {
    data () {
        return {
            ...
            panelType: '1'
        }
    },
    methods: {
        ...
        onChangeType (type) {
            this.panelType = type
        }
    },
    ...
}
```

``` html
<pull-list @on-broadcast-panel-type="onChangeType" @on-click-item="browse" :panel-type="panelType" :match-props="matchProps" :get-post-data="getPostData" :api-config="apiConfig">
</pull-list>
```

* 参数
`broadcast`方法参数与`dispatch`方法相同，第一个参数必须为自定义事件名称，其他参数按需添加。在调用`broadcast`方法时，传了多少个参数，监听事件函数会接受到除事件名称以为的其他参数。

<p class="warning">
    为了其他开发人员更好理解代码，在定义越级事件时，统一规范为`'on-broadcast-自定义事件名称'`。
</p>