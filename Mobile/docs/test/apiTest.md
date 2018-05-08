## 后端api接口测试
项目开发过程中，由于频繁修改数据库或者更新替换局部功能容易造成后端`api`接口访问异常。为快速检测定位异常接口，故此增加了后端`api`测试功能。添加测试用例如下：

``` js
// 接口定义 apiConfig.js
export const login = {
    url: '/Authorize',
    type: 'POST',
    data: {
        model: 'body|object|stringify'
    }
}

// 定义测试用例，test/api/demo/apiConfig.spec.js 
// 所有的测试用例文件必须在test/api目录下，且以'.spec.js'结尾命名。
import helper from '../helper.js'
import { login } from './apiConfig.js'

// 返回测试用例数组，每个数组项表示一个http请求，按数组顺序请求。
export default [
    {
        it: '用户登录',
        data: {
            model: {
                grant_type: 'password',
                username: 'sapiadmin',
                password: '123456'
            }
        },
        // 仅支持apiConfig参数，暂不支持type和url形式
        apiConfig: login,
        // 设置请求头
        headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' },
        // 发出请求前可以对请求添加额外信息，返回值必须是第一个参数
        beforeSend: function (request) {
            return request
        },
        // 请求成功
        success: function (res) {
            // 保存登录信息，后面请求自动带上
            helper.setHeader({ 'authorization': res.body.token_type + ' ' + res.body.access_token })
        },
        complete: function (err, res) {
            if (err) {
                return
            }
        }
    }
}

// 执行测试，在项目目录下打开cmd终端执行：
npm run test:api
```

---

### 实现

内部采用<a href="https://github.com/visionmedia/supertest" target="_blank">`supertest`</a>模拟真实的`http`请求，采用<a href="https://jasmine.github.io/2.4/node.html#section-Configuration" target="_blank">`jasmine`</a>测试框架。
在项目目录下打开`cmd`终端执行命令：`'npm run test:api'`，实际上执行了：`'jasmine JASMINE_CONFIG_PATH=test/api/jasmine.json`'。在测试入口`'test/api/index.js'`中查找所有`'test/api'`目录下以`'.spec.js'`结尾的文件，并且返回相应文件中测试用例数组进行测试（越外层的文件越早执行）。

<p class="tip demo-tip">
    封装和实现代码路径：`test/api/helper.js`
</p>

---

### 配置测试用例
添加`http api`测试文件注意事项：
1. `api`测试文件命名必须以`'.spec.js'`结尾；
2. `api`测试文件必须`export defualt` 测试用例数组；
3. `api`测试文件必须在跟目录`test/api`目录下；

* **配置对象属性 (`it`)**

|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">it</span> | <span class="type type-string">String</span> | &nbsp; | &nbsp; | 测试用例标题，必须项 |
| <span class="prop-key" style="white-space:nowrap;">apiConfig</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | `api`配置对象 |
| <span class="prop-key" style="white-space:nowrap;">data</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | 请求参数数据 |
| <span class="prop-key" style="white-space:nowrap;">headers</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | 请求头信息 |
| <span class="prop-key" style="white-space:nowrap;">timeout</span> | <span class="type type-number">Number</span> | &nbsp; | &nbsp; | 超时时间，默认配置时间取值于`'src/static/js/config.js'`中的`timeout` |
| <span class="prop-key" style="white-space:nowrap;">schema</span> | <span class="type type-object">Object</span> | &nbsp; | &nbsp; | 返回数据模型，可选，优于`apiConfig`定义的`schema` |
| <span class="prop-key" style="white-space:nowrap;">success</span> | <span class="type type-function">function</span> | &nbsp; | &nbsp; | 可选，请求成功调用，函数参数为`response` |
| <span class="prop-key" style="white-space:nowrap;">error</span> | <span class="type type-function">function</span> | &nbsp; | &nbsp; | 可选，已请求错误，包含超时及`status`不等于`200`。函数参数有两个，分别为`error`和`response` |
| <span class="prop-key" style="white-space:nowrap;">complete</span> | <span class="type type-function">function</span> | &nbsp; | &nbsp; | 可选，已请求错误，包含超时及`status`不等于`200`。函数参数有两个，分别为`error`和`response` |
| <span class="prop-key" style="white-space:nowrap;">beforeSend</span> | <span class="type type-function">function</span> | &nbsp; | &nbsp; | 可选，请求调用前可设置请求信息和`expect`判断，函数必须返回`agent`对象，需熟悉`supertest`接口。函数参数有两个，分别是`agent`对象和it选项 |

---

### 共享请求头信息
请求后端`api`接口时需要设置`'authorization'`授权信息，为了避免每次请求都手动设置，`helper`（路径：`test/api/helper.js`）对象提供了`setHeader`方法为后续请求设置`'authorization'`授权信息。

* **helper对象方法**
|  名称  | 类型  |  默认值  |  版本  |  说明  |
|-------|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">test</span> | <span class="type type-function">function</span> | &nbsp; | &nbsp; | 执行`api`测试用例，参数为测试用例数组 |
| <span class="prop-key" style="white-space:nowrap;">setHeader</span> | <span class="type type-function">function</span> | &nbsp; | &nbsp; | 设置共享请求头信息，参数请求头对象信息 |

<p class="tip demo-tip">
    设置共享请求头信息实例详见开头实例
</p>

---

### 请求返回数据模型校验
当将某个改进功能局部更新到某项目系统时，容易造成`api`接口返回数据字段的缺失，故此，`api`测试添加了对返回数据模型校验。

<p class="warning">
    数据模型校验并不能保证`100%`的校验，前提条件是后端接口必须有数据返回。
</p>

``` js
// *.spec.js文件
import helper from '../helper.js'

const login = {
    url: '/Authorize',
    type: 'POST',
    data: {
        model: 'body|object|stringify'
    },
    // 定义返回数据模型，当接口返回数据时会校验，判断是否包含这些属性及属性的类型
    // 返回数据是一个对象，并且包含access_token、expires_in、token_type、userId属性
    schema: {
        type: Object,
        properties: {
            access_token: String, // 定义属性值为字符串类型
            expires_in: Number,
            token_type: String,
            userId: String
        }
    }
}

const getClientList = {
    url: '/api/clients/{pageIndex}',
    type: 'GET',
    data: {
        pageIndex: 'path',
        pageSize: 'query',
        keyword: 'query'
    },
    schema: {
        // 校验返回数据的指定属性，这里是校验数组对象属性
        namespace: 'Data.Rows',
        type: Array,
        items: {
            type: Object,
            properties: {
                ClientId: String,
                ClientSecret: String,
                Name: String,
                Enabled: Boolean,
                RefreshTokenLifeTime: Number,
                CreateDate: String,
                IsSystem: Boolean
            }
        }
    }
}

export default [
    {
        it: '用户登录',
        data: {
            model: {
                grant_type: 'password',
                username: 'sapiadmin',
                password: '123456'
            }
        },
        apiConfig: login,
        // 可以在apiConfig统一设置，也可单独设置
        schema: {
            type: Object,
            properties: {
                access_token: String,
                expires_in: Number,
                token_type: String,
                userId: String
            }
        },
        headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' },
        success: function (res) {
            // 保存登录信息，后面请求自动带上
            helper.setHeader({ 'authorization': res.body.token_type + ' ' + res.body.access_token })
        }
    },
    {
        it: '获取列表页',
        data: {
            pageIndex: 1,
            pageSize: 10,
            keyword: ''
        },
        apiConfig: getClientList,
        success: function (res) {
            expect(res.body.Data.Rows.length < 10).toBeTruthy()
        }
    },
}
```

<p class="tip">
    常见类型属性值类型：`String、Number、Boolean、Object、Array`
</p>

<p class="tip">
    数据模型定义详见文档：`dataSchemaChecker`
</p>

---

### jasmine测试框架
详见单元测试文档