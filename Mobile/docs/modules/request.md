## `request.js` 异步请求
`request.js`是异步请求插件，支持类似`ajax`的回调函数`success/error/complete`，也支持返回`Promise`。它是对`utils.http`方法的进一步封装，添加了如下功能：
* 参数校验替换；
* 请求时效验`authorization`请求头信息（登录页一般需自带）；
* 请求时`loading`状态；
* `mock`功能；

<p class="tip demo-tip">
    代码路径：`src/static/js/request.js`
</p>

先来看下调用实例
``` js
import request from '@/static/js/request.js'

// 分页请求用户数据
request({
    url: 'api/example/users/1',
    type: 'GET',
    // 指向mock数据的js，可批量生成伪数据；也可以直接指定json文件，返回json对象。
    mock: 'mock/js/example/user.js',
    // url传参
    params: {
        pageSize: 20,
        isEnabled: true  
    },
    // 请求成功执行
    success: function(data, res){
        console.log(data)
    },
    // request内部实现了请求异常处理，一般不需要
    error: function(error){
    }
})
```

### `request`函数定义
`request`函数有两个参数，第一个参数是请求选项（`options`），为必选；第二个参数是请求配置（`apiConfig`），可选。`request`函数定义注释如下：

```
/**
 * @param options {object}请求配置
 *  @param options.url {string} 请求url
 *  @param options.type {string} 请求类型：GET/POST/PUT/DELTE
 *  @param options.data {any} 请求数据，适用于options.type为'PUT', 'POST', 'PATCH', GET默认转成params
 *  @param options.params {object} url参数，键值对形式，{keyword:'test'} 转成 ?keyword=test
 *  @param options.loading {boolean|string} 登录状态，字符串为登录状态信息
 *  @param options.success {function} 请求成功回调
 *  @param options.error {function} 错误回调
 *  @param options.complete {function} 请求完成回调，不管成功还是失败都执行
 *  @param options.dataType {string} 请求返回数据类型，默认‘json'
 *  @param options.headers {object} 请求头信息
 *  @param options.mock {boolean|string} 指定mock数据
 *  @param options.schema {object} 返回数据模型定义
 * @param apiConfig {object} api配置，可选
 *  @param apiConfig.url {string} 接口url
 *  @param apiConfig.type {string} 请求方式
 *  @param apiConfig.mock {boolean|string} 统一mock数据
 *  @param apiConfig.data {object} 接口参数定义
*   @param apiConfig.schema {object} 返回数据模型定义
 * @return Promise对象
 */
export default function request (options, apiConfig) {
    ...
}
```

<p class="warning">
    `request`调用时不传`apiConfig`参数，请区分`options.data`和`options.params`参数。
</p>

---

### 参数校验替换

#### 参数apiConfig 
同一个`api`接口可能需要在多处调用，为了更好维护`api`，可将`api`提前定义好，调用时再`imoprt`。`request`内部实现了对`path`、`query`、`body`参数的自动替换，调用时只需按照定义的`apiConfig.data`传参即可。调用实例如下：

``` js
// apiConfig.js 
// 获取用户信息
export const getUser = {
    url: 'api/example/users/{userId}',
    type: constants.GET,
    mock: true
    data: {
        userId: 'required|path|string'
    }
}

// 调用
import request from '@/static/js/request.js'
import { getUser } from './apiConfig'

request({
    data: {
        userId:'154e85528a06984c0a9f9e442da9eac7'
    },
    success: function(data, res){
        console.log(data)
    }
}, getUser)
```

---

#### `apiConfig.data`定义

`apiConfig.data` 是对请求参数的定义和约束，为键值对形式，键（`key`）为参数名称，属性值为（`value`）参数特性，符合多个特性用`|`分割。参数类型有：

* `required` 必须项，调用时若缺少此项，开发环境下会抛出警告（开发人员工具可见）；
* `path/query/body` 参数类型，`path`表示参数为`url`字符串上参数，类似`'api/example/users/{userId}'`；`query`表示`url`参数，以`?key=value`形式附加在`url`后；`body` 表示请求主体参数；
* `stringify` 对参数值进行`qs.stringify`转换，并且将转换结果赋值给请求主体(`options.data`)，以便后端能识别；一般来说有且仅有一个参数需要`stringify`处理，因为请求主体只有一个；
* `boolean/object/number/array/string` 参数数据类型校验，调用时不符合当前类型，开发环境下会抛出警告（开发人员工具可见）；

当不需要`apiConfig`时，也可用参数定义（`apiConfig.data`）做简单的替换和校验。实例如下：

``` js
// 调用
import request from '@/static/js/request.js'

// 当apiConfig参数不含url和data属性时会被当做是参数定义对象处理
request({
    url: 'api/example/users/{pageIndex}',
    type: 'GET',
    mock: 'mock/js/example/user.js',
    data: {
        pageIndex: 1,
        pageSize: 20,
        isEnabled: true
    },
    success: function(data, res){
        console.log(data)
    }
}, {
    pageIndex: 'path|required|number',
    pageSize: 'query|required|number'
    isEnabled: 'boolean'
})
```

---

### `authorization`请求头信息
`request`在发出请求前会判断`options.headers`中是否存在`authorization`请求授权信息。如果不存在，`request`会尝试从`localStorage`中取`loginInfo`信息（登录成功后将返回结果保存在`localStorage`中），提取`loginInfo`中的`token_type`和`access_token`作为`options.headers.authorization`。如果`options.headers`没有`authorization`，`localStorage`中也不存在`loginInfo`信息，调用时，开发环境下会抛出警告（开发人员工具可见），最终请求返回状态码也会是`401`，此时，`request`会将页面跳转至登陆页。

``` js
import request from '@/static/js/request.js'
import utils from '@/static/js/utils.js'
// example站点，登录时处理
request({
    url: 'api/example/authorization',
    type: 'POST',
    data: {
        model: {
            grant_type: 'password',
            username: 'demo',
            password: '123456'
        }
    },
    // 指定mock服务处理js
    mock: 'mock/js/example/login.js',
    headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' }
}, { model: 'body|stringify' }).then(function (data) {
    // 采用Promise形式时，异步异常时data为undefined值
    if (!utils.isUndefined(data)) {
        if(data && data.Code === -1) {
            Vue.$vux.toast.text(data.Msg, 'bottom')
        } else {
            utils.localStorage.set('loginInfo', JSON.stringify(data))
            let redirect = utils.getQueryString('redirect')
            if (!redirect) {
                redirect = 'example/login.html'
            }

            window.location.replace('/' + redirect)
        }
    }
})
```

---

### `loading`状态
`request`的`options`参数提供了`loading`属性用于显示加载状态。`loading`属性值可为`boolean`值，为`true`表示启动`loading`，为`false`表示不启动。`loading`属性值也可以是字符串，显示加载状态提示内容。`request`内部是通过`Vue.$vux.loading`插件来显示`loading`功能，当`loading`无效时，请确认入口`js`是否有`Vue.use`相应的`Loading`插件。

<p class="tip">
    同样的，异步信息弹出也需要引入`Toast`插件
</p>

``` js
// 入口文件 createMain.js
import { ToastPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
// 注册为全局组件
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(ConfirmPlugin)
// use之后通过Vue.$vux访问相应组件实例
Vue.$vux.loading.show('')

// example站点，登录
import request from '@/static/js/request.js'
import utils from '@/static/js/utils.js'

request({
    url: 'api/example/authorization',
    type: 'POST',
    data: {
        model: {
            grant_type: 'password',
            username: 'demo',
            password: '123456'
        }
    },
    // 显示loading
    loading: true,
    // 也可显示提示内容
    // loading: '登录中'
    mock: 'mock/js/example/login.js',
    headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' }
}, { model: 'body|stringify' }).then(function (data) {
    if (!utils.isUndefined(data)) {
        if(data && data.Code === -1) {
            Vue.$vux.toast.text(data.Msg, 'bottom')
        } else {
            utils.localStorage.set('loginInfo', JSON.stringify(data))
            let redirect = utils.getQueryString('redirect')
            if (!redirect) {
                redirect = 'example/login.html'
            }

            window.location.replace('/' + redirect)
        }
    }
})
```

---

### `mock`数据
当后端`api`未开发完成时，开发人员可通过`mock`功能来模拟相应的数据，以确保前端开发工作顺利进行。`mock`功能只在开发环境有效，打包生成环境时无效，尽管如此，发布生成环境，开发人员尽量去掉`mock`属性，防止多余代码。

<p class="tip">
    当后端`api`还未开发完成时，最好将所有`api`定义写到一个文件里，方便`mock`维护及修改。
</p>

#### 返回指定`json`文件数据
通过将`mock`属性值指向一个`json`文件路径，即可返回对应的`json`数据。`json`文件路径必须从跟路径开始。

``` js
import request from '@/static/js/request.js'
// example站点请求员工信息
request({
    url: 'api/example/employees/1',
    type: 'GET',
    // 指定返回json文件数据
    mock: 'mock/json/example/employee.json',
    params: {
        pageSize: 20,
        keyword: ''
    },
    success: function(data){
        console.log(data)
    }
})
```

<p class="warning">
    所有的`mock`数据默认都是挂在对象`{Code, Message, Data}`的`Data`属性上，如果需要将`mock`数据直接返回，只需在`mock`属性值后添加`'?nowrap'`，例如，`'mock/json/example/employee.json?nowrap'`
</p>

---

#### 返回指定`js`路径`mock`数据
通过将`mock`属性值指向一个`js`文件路径，即可返回对应的`js`生成的数据（实际上是执行后端js代码生成数据）。同样的，`js`文件路径必须从跟路径开始。执行指向路径的`js`返回值必须返回一个对象(`module.exports = {...}`)或者是一个函数(`module.exports = function(req, res){...}`)。

``` js
// 这是example站点例子
// 分页获取用户信息， 代码路径：src/pages/example/config/apiConfig.js
export const getUserList = {
    url: 'api/example/users/{pageIndex}',
    type: 'GET',
    mock: 'mock/js/example/user.js',
    data: {
        pageIndex: 'required|path|number',
        pageSize: 'required|query|number',
        sortName: 'query|string',
        sortType: 'query|string',
        keyword: 'query|string',
        isEnabled: 'query|boolean'
    }
}

request({
    data:{
        pageIndex: 1,
        pageSize: 20
    }
}, getUserList)

// mockjs 常用占位符如下
// 可返回mockModel, 代码路径：mock/js/example/user.js
module.exports = {
    // '|100'返回100条数据
    'Data|100': [{
        'UserId': '@guid', // 返回guid
        'UserName': '@name', // 返回英文姓名
        'AliasName': '@cname', // 返回中文姓名
        'UsedById': '@id', // "420000198303026369"
        'UsedByName': '@cname',
        'UsedByNo': '@string("upper", 2)@string("number", 3)', // 返回5位字符串数字
        // 'UsedByNo': '@natural(10000, 100000)',
        'UsedByDefaultStationId': '@id',
        'UsedByDefaultStationName': '@cname',
        'UsedByPositionId': '@id',
        'UsedByPositionName': '@cname',
        'UsedByCorpId': '@id',
        // 从数组中随机取值
        'UsedByCorpName|1': [
            '集团公司',
            '深圳分公司',
            '上海分公司',
            '北京分公司'
        ],
        'UsedByDeptId': '@id',
        // 按顺序取值
        'UsedByDeptName|+1': [
            '财务部',
            '人事部',
            '研发部',
            '总监办'
        ],
        'Enabled': '@boolean', // 返回boolean值
        'RowIndex|+1': 1, // 返回递增数字
        // 'RowIndex': @increment(), // 递增数字，也可以@increment(2)，每次递增2
        'HeadIconPath': '@image("200x100")', // 返回图片，200（宽）x100（高），单位px
        // 'HeadIconPath': '@dataImage("200x100")' // 需要安装node-canvas，否则报错
        'CreateDate': '@datetime("yyyy-MM-dd HH:mm:ss")', // 返回时间
        // CreateDate: '@date("yyyy-MM-dd")' // 返回日期
        // CreateDate: '@now' // 返回当前时间
        'EnabledName': function () {
            // 可通过this返回
            return this.Enabled ? '是' : '否'
        },
        'IsEmployeeDeleted': '@boolean',
        'Money|1-100000.2': 1, // 返回数字1到100000且存在两位小数
        'Remark': '@paragraph', // 生成英文段落，类似有@sentence/@word/@title
        'Description': '@cparagraph', // 生成中文段落，类似有@csentence/@cword/@ctitle
        'Email': '@email', // 邮箱
        'ClientId': '@ip', // 客户端ip
        'Region': '@region', // 区域
        'Province': '@province', // 省份
        'City': '@city' // 城市，@city(true)参数true表示带省份前缀："江苏省 扬州市"
    }]
}
```

<p class="tip">
    开发服务用了`mockjs`来生成模拟数据，更多例子查看这里：<a href="http://mockjs.com/examples.html" target="_blank">`mockjs`例子</a>。
</p>

<p class="warning">
    由于`mock`数据不能直接返回数组，需要挂在对象属性上。所以，当需要`mock`数组对象时，必须将`mock`数组数据挂在对象`'Data'`属性上，数据生成后`mock`服务会将对象`Data`值作为返回值。
</p>


当需要模拟业务操作时，适合采用返回函数形式，在函数内进行业务操作，根据请求条件返回不同数据。实例如下：

``` js
// 模拟登录操作
request({
    url: '/api/example/authorization',
    type: 'POST',
    data: {
        model: {
            grant_type: 'password',
            username: username, // 'demo',
            password: password // '123456'
        }
    },
    // 指定mock服务处理js
    mock: 'mock/js/example/login.js',
    loading: true,
    headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' }
}, { model: 'body|stringify' }).then(function (data) {
    console.log(data)
})

// mockjs，代码路径：mock/js/example/login.js
module.exports = function (req, res, nowrap) {
    var utils = require('../../utils.js')
    // 获取请求头信息
    var auth = req.get('authorization')
    // 简单效验：判断是否带authorization请求头
    if (!auth) {
        return res.status(403).send('未授权访问').end()
    }

    // req.body 获取请求主体信息（经过'body-parser'处理，默认会将json转成对象）
    if (req.body.username === 'demo' && req.body.password === '123456') {
        return res.json({
            access_token: 'uL_W8c0ifhWeFqoDCuc0QrjWzYVZdXp62zgsxJwq7iFzr1cM32FbITmBxrtm',
            expires_in: 17999,
            token_type: 'bearer',
            userId: 'demo'
        })
    } else {
        return res.json(utils.getResData(null, -1, '账号或密码错误'))
    }
}
```

---

##### `request`和`response`

模拟后端业务操作需要了解`express`的<a class="docute-button docute-button-primary" target="_blank" src ="http://www.expressjs.com.cn/4x/api.html#req">`request`</a>和<a class="docute-button docute-button-primary" target="_blank" src ="http://www.expressjs.com.cn/4x/api.html#res">`response`</a>

`request`常用属性：
* `req.body`  {`object`} 请求主体，经过`'body-parser'`处理为一个对象
* `req.query`  {`object`} `url`参数，是一个键值对象

`request`常用方法：
* `req.get(headersname)` {`string`} 获取请求头信息，忽略大小写, `req.get('Content-Type')`与`req.get('content-type')`通用
* `req.is(contentType)` {`boolean`} 判断请求`MIME`类型，`req.is('html')`、`req.is('json')`;

`response`常用属性：
* `res.headersSent` {`boolean`} 是否发送请求头，用于判断是否回发请求端。

`response`常用方法：
* `res.get(field)` {`string`} 获取请求头信息，`res.get('Content-Type')`;
* `res.set(field [, value])` 设置请求头信息，`res.set('Content-Type', 'text/plain')`;
* `res.json([body])` 请求发送`json`数据，`res.json({ user: 'demo' })`
* `res.send([body])` 参数`body`可以是`Buffer`对象、字符串、对象或者数组
* `res.status(code)` 返回请求状态码，`res.status(400).send('Bad Request')`;
* `res.end([data] [, encoding])` 结束`response`处理，`res.end(); res.status(404).end()`;

---

#### 配置`express`路由

配置`express`路由可统一对`api`子路径做一些权限验证等访问控制。由于前面两种`mock`方式已经满足开发需求，且简单快速，而配置`express`路由略复杂（可统一对子路径做一些权限验证等访问控制），掌握这部分内容需了解`express`的<a href="http://www.expressjs.com.cn/4x/api.html#router" target="_blank">`Router`</a>知识，欢迎有兴趣同学深入了解，在此不做深入阐述。

<p class="tip">
    配置路由实例代码：`mock/routes/example/index.js`
</p>

---

#### 请求代理，多机联调

当不同模块的后端接口分配给不同的开发人员开发时，可以通过配置`proxyTable`属性将不同`mock`接口指向不同的后端服务。

``` js
// 代码路径：config/index.js dev.proxyTable属性
// 假设场景：开发经理分别将roles接口和customers接口分配给了A和B。A和B接口开发完成，前端开发人员同时与A、B联调。配置如下：
{
    dev: {
        proxyTable: {
            '/mock/api/roles': {
                // 指向A的api服务
                target: 'http://172.56.10.62:8040',
                pathRewrite: {
                    // 移除'/mock'路径
                    '^/mock': ''
                }
            },
            '/mock/api/customers': {
                // 指向B的api服务
                target: 'http://172.56.10.69:8080',
                pathRewrite: {
                    '^/mock': ''
                }
            }
        }
    }
}

// 前端调用
import request from '@/static/js/request.js'
// 获取分页获取角色信息
const getRoleList = {
    url: 'api/roles/{pageIndex}',
    type: 'GET',
    data: {
        pageIndex: 'required|path|number',
        pageSize: 'required|query|number',
        sortName: 'query|string',
        sortType: 'query|string',
        keyword: 'query|string'
    }
}

request({
    data: {
        pageIndex: 1,
        pageSize: 20
    },
    // 必须加mock属性将请求的baseUrl指向dev服务，dev服务会先匹配proxyTable的url，
    // 如果存在，请求会指向相应的目标地址；不存在，则继续匹配mock路由，返回相应的json数据。
    mock: 'mock/json/roles.json',
    success: function (data) {
        console.log(data)
    }
}, getRoleList)

const getCustomerList = {
    url: 'api/customers/{pageIndex}',
    type: 'GET',
    data: {
        pageIndex: 'required|path|number',
        pageSize: 'required|query|number',
        sortName: 'query|string',
        sortType: 'query|string',
        keyword: 'query|string'
    }
}

request({
    data: {
        pageIndex: 1,
        pageSize: 20
    },
    mock: 'mock/json/customers.json',
    success: function (data) {
        console.log(data)
    }
}, getCustomerList)
```

---

### `mock`实现原理
当调用`request`参数`options`添加`mock`属性时，`request`会将请求`baseUrl`转向`http://localhost:dev端口/mock/`。当`mock`属性值为字符串时，会将属性值以`url`参数形式（`?mock=mock`属性值）传到`dev`服务中（`express`服务），`dev`服务根据`mock`路径参数，读取并返回相应的`json`数据或执行相应路径的`js`代码返回数据。关键代码如下：

``` js
// build/dev-server.js
// require配置的mock路由
var mockRoutes = require('../mock/routes')
// 注册mock路由 /mock
app.use('/mock', mockRoutes)

// mock/routes.js 关键代码
router.use(function (req, res, next) {
    // mock参数处理
    if (req.query.hasOwnProperty('mock')) {
        var mockUrl = path.resolve(__dirname, '../' + req.query.mock) // 以跟路径开始
        var reg = /(\.json|\.js)(\?nowrap)?$/
        var result = mockUrl.match(reg)
        var isNoWrap = false
        if (result) {
            isNoWrap = !!result[2]
            if (isNoWrap) {
                mockUrl = mockUrl.replace('?nowrap', '')
            }
        }

        if (fs.existsSync(mockUrl)) {
            // 判定是否有分页
            var isPageReq = req.query.hasOwnProperty('pageSize') && req.query.hasOwnProperty('pageIndex')
            if (result.length > 0) {
                var resData
                if (result[1] === '.json') {
                    resData = JSON.parse(fs.readFileSync(mockUrl))
                } else {
                    var dataModel = require(mockUrl)
                    try {
                        if (typeof dataModel === 'function') {
                            dataModel = dataModel(req, res, isNoWrap)
                            // 指定的js函数必须要有返回值
                            if (typeof dataModel === 'undefined') {
                                return res.status(500).json(uitls.getResData(null, -1, mockUrl + '返回值必须是mock数据或者res对象'))
                            } else if (dataModel === res && res.headersSent) {
                                // 返回是res对象，说明函数内部已做处理
                                return res
                            }
                        }

                        // mock占位符处理，生成伪数据
                        resData = Mock.mock(dataModel)

                        // mock只能生成普通对象，如果需要返回数组数据，需挂在Data属性上，生成完成后再替换
                        if (resData.hasOwnProperty('Data')) {
                            resData = resData.Data
                        }
                    } catch (err) {
                        return res.status(500).json(uitls.getResData(err, -1, mockUrl + '：mock生成数据出现异常，请检查mock占位符是否正确'))
                    }
                }

                if (isPageReq) {
                    // 分页处理，注意，分页时'?nowrap'无效
                    return res.json(uitls.getPageData(req, resData)).end()
                } else {
                    return res.json(isNoWrap ? resData : uitls.getResData(resData, 0, '请求成功')).end()
                }
            } else {
                return res.status(404).json(uitls.getResData(null, -1, '暂时只支持js和json文件'))
            }
        } else {
            return res.status(404).json(uitls.getResData(null, -1, '不存在指定json或js')).end()
        }
    }

    // 不存在mock参数，跳转到下一个中间件
    next()
})
```
