## vue-router路由
<a href="https://router.vuejs.org/zh-cn/" target="_blank">`vue-router`</a>用于创建单页应用（使用期间不会重新加载页面），能够将路由(`routes`)映射到组件(`components`)。当路由改变时，路由视图（`router-view`）会显示对应的组件内容。

<p class="tip">
    `<router-view>` 组件是一个 `functional` 组件，渲染路径匹配到的视图组件。
    `<router-view>` 渲染的组件还可以内嵌自己的 `<router-view>`，根据嵌套路径，渲染嵌套组件。
</p>

---

### 项目中如何使用vue-router？
项目中使用路由大致有四个步骤：
* 创建路由配置（`routes.js`）；
* 调用`createRouter`方法，参数为导入的路由配置对象；
* 调用`createMain`方法时，将执行`createRouter`方法返回结果作为第二个参数传入。
* 在路由组件中通过调用`this.$router`实例方法（比如，`this.$router.push`、`this.$router.replace`、`this.$router.back()`等等）进行路由跳转，`vux`部分组件内部实现了`link`功能，只需传入`locaition`信息对象（比如，`{ path: '/home' }`、`{ name: 'home'}`）即可实现路由跳转。

``` js
// main.js
import createMain from '@/static/js/createMain'
import createRouter from '@/static/js/createRouter'
import routes from './routes'
import App from './app.vue'

createMain(App, createRouter(routes))

// routes.js
// () => import(...)：webpack会分块打包
const List = () => import('./views/list.vue')
const Detail = () => import('./views/detail.vue')

const routes = [{
    // '/'表示进入时显示的默认组件
    path: '/',
    name: 'list',
    component: List
},{
    path: '/detail/:id',
    name: 'detail',
    component: Detail
}]

export default routes
```

``` html
<!-- app.vue模板中引入layout-router组件， layout-router组件包含vue-view组件 -->
<template>
    <layout-router :title="title" >
    </layout-router>
</template>
```

---

#### 路由配置
`routes.js`默认导出值类型为: `Array<RouteConfig>`

* **RouterConfig属性 (`Props`)**

|  属性名称  | 类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">path</span> | <span class="type type-string">String</span> | &nbsp; | 匹配路径 |
| <span class="prop-key" style="white-space:nowrap;">component</span> | <span class="type type-object">Component</span> | &nbsp; | 可选，匹配组件 |
| <span class="prop-key" style="white-space:nowrap;">components</span> | <span class="type type-object">Object</span> | &nbsp; | 可选，`{ [name: string]: Component }`，用于命名视图组件，用于同时存在多个`router-view`组件场景 |
| <span class="prop-key" style="white-space:nowrap;">name</span> | <span class="type type-string">String</span> | &nbsp; | 可选，命名路由名称 |
| <span class="prop-key" style="white-space:nowrap;">redirect</span> | <span class="type type-string">String</span><br/><span class="type type-function">Function</span><br/><span class="type type-object">Location</span> | &nbsp; | 可选，重定向；重定向路径：`{ path: '/a', redirect: '/b' }`；重定向路由名称： `{ path: '/a', redirect: { name: 'foo' }}`；动态重定向：`{ path: '/a', redirect: to => { // return 根据to对象 重定向 字符串路径/路径对象 }}` |
| <span class="prop-key" style="white-space:nowrap;">alias</span> | <span class="type type-string">String</span><br/><span class="type type-array">Array</span> | &nbsp; | 可选，别名，其功能让你可以自由地将 `UI` 结构映射到任意的 `URL`，而不是受限于配置的嵌套路由结构。 |
| <span class="prop-key" style="white-space:nowrap;">children</span> | <span class="type type-array">Array<RouteConfig></span> | &nbsp; | 可选，嵌套路由 |
| <span class="prop-key" style="white-space:nowrap;">beforeEnter</span> | <span class="type type-function">Function</span> | &nbsp; | 可选，`(to: Route, from: Route, next: Function) => void` 独享的钩子函数，用来拦截导航，让它完成跳转或取消。 |
| <span class="prop-key" style="white-space:nowrap;">meta</span> | <span class="type type-object">Object</span> | &nbsp; | 可选，元数据，可通过路由记录访问。 |

---

### 如何路由组件内访问路由？
当调用`createMain(App, createRouter(routes))`方法（实际上在App根实例的`router`配置传入`router`实例）后，有两个属性成员会被注入到每个子组件（包含路由配置上的组件），分别是`$router`（`router`实例，包含路由跳转的方法，比如，`this.$router.push`、`this.$router.back`等）和`$route`（路由信息对象，包含当前路由信息，`this.$route.params`、`this.$route.query`等）。


#### 路由实例对象
`$router`实例可访问属性和方法如下：

* **$Router属性 (`Props`)**

|  属性名称  | 类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">app</span> | <span class="type type-object">Object</span> | &nbsp; | 配置了router的vue根实例 |
| <span class="prop-key" style="white-space:nowrap;">mode</span> | <span class="type type-string">String</span> | hash | 项目统一采用hash模式 |
| <span class="prop-key" style="white-space:nowrap;">currentRoute</span> | <span class="type type-object">Route</span> | &nbsp; | 当前路由对应的路由信息对象 |

* **$Router常用方法 (`Methods`)**

|  方法名称  | 参数  |  返回值类型   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">push</span> | `(location, onComplete?, onAbort?)` | &nbsp; | 导航到指定`URL`，会向浏览器历史记录添加一条记录，跳转后点击浏览器“返回”能回到之前的`url`。  |
| <span class="prop-key" style="white-space:nowrap;">replace</span> | `(location, onComplete?, onAbort?)` | &nbsp; | 导航到指定URL，替换当前浏览器的历史记录，跳转后点击浏览器“返回”不能回到之前的url。 |
| <span class="prop-key" style="white-space:nowrap;">go</span> | `(n)` | &nbsp; | 参数n是一个整数，意思是在 `history` 记录中向前或者后退多少步，类似`window.history.go(n)` |
| <span class="prop-key" style="white-space:nowrap;">back</span> | &nbsp;| &nbsp; | 返回一步 |
| <span class="prop-key" style="white-space:nowrap;">forward</span> | &nbsp;| &nbsp; | 前进一步 |
| <span class="prop-key" style="white-space:nowrap;">addRoutes</span> | `(routes)` | &nbsp; | 动态添加更多的路由规则。参数必须是一个符合`routes`选项要求的数组。 |

``` js
// example/pullList.html
export default {
    methods: {
        browse (item) {
            // `/user/:id`
            // 查看用户明细页
            this.$router.push({ path: `/user/${item.UserId}` })
        },
    },
    ...
}
```

---

#### 路由信息对象
一个 `route object`（路由信息对象）表示当前激活的路由的状态信息，包含了当前`URL`解析得到的信息，还有`URL`匹配到的 `route records`（路由记录）。`route object`是`immutable`（不可变）的，每次成功的导航后都会产生一个新的对象。

* **路由信息对象属性 (`Props`)**

|  属性名称  | 类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">path</span> | <span class="type type-string">String</span> | &nbsp; | 当前路由的路径，总是解析为绝对路径，如 `/example/login` |
| <span class="prop-key" style="white-space:nowrap;">params</span> | <span class="type type-object">Object</span> | &nbsp;  | 一个`key/value`对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象，如 `/user/:id`，可通过this.$route.params.id访问 |
| <span class="prop-key" style="white-space:nowrap;">query</span> | <span class="type type-object">Object</span> | &nbsp; | 一个 `key/value `对象，表示 `URL` 查询参数。例如，对于路径 `/foo?user=1`，则有`$route.query.user == 1`，如果没有查询参数，则是个空对象。 |
| <span class="prop-key" style="white-space:nowrap;">hash</span> | <span class="type type-string">String</span> | &nbsp; | 当前路由的 `hash` 值 (带 #) ，如果没有`hash`值，则为空字符串 |
| <span class="prop-key" style="white-space:nowrap;">fullPath</span> | <span class="type type-string">String</span> | &nbsp; | 完成解析后的 `URL`，包含查询参数和 `hash` 的完整路径。 |
| <span class="prop-key" style="white-space:nowrap;">name</span> | <span class="type type-string">String</span> | &nbsp; | 当前路由的名称，如果有的话。 |
| <span class="prop-key" style="white-space:nowrap;">matched</span> |  `Array<RouteRecord>` | &nbsp; | 一个数组，包含当前路由的所有嵌套路径片段的 路由记录。 |

---

##### 使用路由信息对象
路由信息对象可出现多个地方：

* 组件内的`this.$route`和`$route watcher`回调（检测变化处理）

``` js
// 类似用户明细组件
export default {
    data () {
        return {
            title: ''
        }
    },
    created () {
        this.getUserInfo()
    },
    watch: {
        // $route watcher
        '$route': 'getUserInfo'
    },
    methods: {
        getUserInfo () {
            const _this = this
            request({
                data: { userId: this.$route.params.userId },
                loading: true
            }, getUser).then(function (data) {
                if (data) {
                    ...
                } else {
                    ...
                    _this.title = '不存在账号信息'
                }
            })
        }
    }
}

```

* 导航钩子的参数：`to`和`from`

``` js
// 全局路由的钩子，createRouter.js里设置
router.beforeEach((to, from, next) => {
  // to 和 from 都是 路由信息对象
})

// scrollBehavior 方法的参数，createRouter.js里设置
const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    // to 和 from 都是 路由信息对象
  }
})

// routes.js 路由配置
export default [
    {
        path: '/login',
        component: Login,
        beforeEnter: (to, from, next) => {
            // to 和 from 都是 路由信息对象
        }
    }
]

// 组件内钩子 
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // to 和 from 都是 路由信息对象
    // 注意：不能用this，组件还未实例化
  },
  beforeRouteUpdate (to, from, next) {
    // to 和 from 都是 路由信息对象
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候
  },
  beforeRouteLeave (to, from, next) {
    // to 和 from 都是 路由信息对象
  }
}

```

---

### 如何设置路由钩子？
`vue-router`提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的, 单个路由独享的, 或者组件级的。

#### 钩子函数参数
每个钩子方法接收三个参数：
* `to`: `Route`，即将要进入的目标路由信息对象

* `from`: `Route`，当前导航正要离开的路由信息对象

* `next`: `Function`，一定要调用该方法来`resolve`这个钩子。执行效果依赖`next`方法的调用参数。

    - `next()`: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是`confirmed`（确认的）。

    - `next(false)`: 中断当前的导航。如果浏览器的`URL`改变了（可能是用户手动或者浏览器后退按钮），那么`URL`地址会重置到 `from` 路由对应的地址。

    - `next('/')` 或者 `next({ path: '/' })`: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。

---

#### 全局路由钩子
可以使用`router.beforeEach`注册一个全局的`before`钩子：

``` js
// 全局路由的钩子，src/static/js/createRouter.js里设置
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
    // 加载组件时显示loading
    Vue.$vux.loading && Vue.$vux.loading.show('')
    // ...
})

// after 钩子没有 next 方法，不能改变导航
router.afterEach(route => {
    // 加载完成隐藏loading
    Vue.$vux.loading && Vue.$vux.loading.hide()
    // ...
})
```

当一个导航触发时，全局的`before`钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子`resolve`完之前一直处于等待中。确保要调用`next`方法，否则钩子就不会被`resolved`。

---

#### 路由配置中的路由钩子
某个路由独享的钩子， 你可以在路由配置上直接定义`beforeEnter`钩子：

``` js
const router = new VueRouter({
    routes: [
        {
            path: '/foo',
            component: Foo,
            beforeEnter: (to, from, next) => {
                // ...
            }
        }
    ]
})
```

这些钩子与全局`before`钩子的方法参数是一样的。

---

#### 组件内路由钩子
最后，你可以在路由组件内直接定义以下路由导航钩子：

* beforeRouteEnter
* beforeRouteUpdate (2.2 新增)
* beforeRouteLeave

``` js
const Foo = {
    template: `...`,
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
    },
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
    }
}
```

`beforeRouteEnter`钩子不能访问`this`，因为钩子在导航确认前被调用，因此即将登场的新组件还没被创建。不过，可以通过传一个回调给`next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

``` js
beforeRouteEnter (to, from, next) {
    next(vm => {
        // 通过 `vm` 访问组件实例
    })
}
```

`beforeRouteLeave`钩子通常用来禁止用户在还未保存修改前突然离开，可以通过`next(false)`来取消导航。

---

### `vue-router`使用中的问题

#### 组件懒加载
当打包构建应用时，`Javascript`包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
结合`Vue`的异步组件和`Webpack`的`code splitting feature`, 轻松实现路由组件的懒加载。在配置路由时，统一采用懒加载方式

``` js
const Foo = () => import('./Foo.vue') // returns a Promise
```

---

#### 路由动画

`LayoutRouter`组件内部实现了路由动画的功能，分为`to`组件右侧进入（`vux-pop-in`）、`from`组件右侧离开（`vux-pop-out`）两种动画。路由动画三种情况：

* 点击头部`‘返回’`按钮默认是组件离开动画；
* 非按钮‘返回’，`url`传参(`direction`，可选值：`forward`、`back`)指定动画，例如：{ path: `/user/${item.UserId}?direction=forward` } 为组件进入动画。
* 不属于前两种情况，则默认根据`to.path`和`from.path`的路径层级判断。若`to.path`层级少于`from.path`，则是组件离开动画，反之是组件进入动画。

``` js
// 关键代码 str/components/master/LayoutRouter.vue
export default {
    ...
    methods: {
        onClickBack () {
            this.back = true
            if (this.preventGoBack) {
                this.$emit('on-click-back')
            } else {
                this.$router.back()
            }
        }
    },
    watch: {
        '$route' (to, from) {
            if (this.back) {
                this.back = false
                this.transitionName = 'vux-pop-out'
            } else if (to.query.hasOwnProperty('direction')) {
                // forward / back
                this.transitionName = to.query.direction === 'back' ? 'vux-pop-out' : 'vux-pop-in'
            } else {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length

                this.transitionName = toDepth < fromDepth ? 'vux-pop-out' : 'vux-pop-in'
            }
        }
    }
}
```

<p class="tip">
    项目开发过程中尽量通过路由path的层级控制路由动画。
</p>

---

#### 组件缓存
在项目框架中使用`LayoutRouter`组件时需注意组件缓存：`路由加载的组件默认都会缓存`。而缓存的组件会额外添加了两个生命周期的钩子函数，分别为：`activated` 和 `deactivated`。当组件第一次加载进入，钩子的触发顺序：`created` -> `mounted` -> `activated`，退出时（切换到其他路由组件）触发`deactivated`。当再次进入（前进或者后退）时，只触发`activated`。

<p class="tip">
    缓存组件第一次进入钩子触发顺序：`created` -> `mounted` -> `activated`;
    <br/>
    缓存组件再次进入钩子触发顺序：`activated`;
</p>

``` html
<!-- Layoutrouter.vue 关键代码 -->
<transition :name="transitionName">
    <keep-alive :exclude="/^(?!Once)/">
        <router-view class="router-view"></router-view>
    </keep-alive>
</transition>
```

* 缓存组件刷新问题
缓存组件第二次进入不在重新解析`html`而是读取内存中的数据，只有当数据变化时，才使用`VirtualDOM`进行`diff`更新。如果缓存组件再次进入后需要强制刷新，必须在`activated`钩子函数中执行操作才有效，比如重新异步请求后端数据。

* 排除组件缓存
使用率不高的组件应该排除缓存，以`Once`命名结尾的组件（组件`name`属性）会排除缓存。

``` js
export default {
    // 以'Once'结尾排除缓存
    name: 'detailOnce',
    data () {
        ...
    },
    methods: {
        ...
    },
    components: {
        ...
    }
}
```

<p class="tip">
    路由加载匿名组件都会缓存。
</p>

---

#### 根组件与路由子组件通信
根组件通过`router-view`组件加载子组件的方式隔断了它们之间的联系，造成了彼此之间通信困难。为了解决组件间通信问题，提供了`dispatch`方法和`broadcast`方法，详细文档请查阅`mixins方法`。

