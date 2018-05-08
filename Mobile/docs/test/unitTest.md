## 单元测试 Karma
项目框架采用了`vue-cli`脚手架自带的`Karma`单元测试工具。`Karma`是一个基于`Node.js`的`JavaScript`测试执行过程管理工具（`Test Runner`），主要作用是将项目运行在各种主流`Web`浏览器进行测试。`Karma`提供了多种测试框架供选择（`jasmine`、`mocha`、`qunit`、`nodeunit`、`nunit`）。项目框架使用了`jasmine`作为测试框架，`jasmine`自带断言库，就不用引入其他库了。

先看单元测试实例：
``` js
// 测试公用函数
// test/unit/static/utils.spec.js
import utils from '@/static/js/utils.js'

describe('utils.isArray', () => {
    it('参数obj为各种数据类型', () => {
        // 当utils.isArray函数传入任何数据时都要保证符合预期
        expect(utils.isArray([])).toBeTruthy()
        expect(utils.isArray([1, 23, 3])).toBeTruthy()
        expect(utils.isArray(123)).toBeFalsy()
        expect(utils.isArray(new Date())).not.toBeTruthy()
        expect(utils.isArray(true)).not.toBeTruthy()
        expect(utils.isArray('123432')).not.toBeTruthy()
        expect(utils.isArray(function () { })).not.toBeTruthy()
        expect(utils.isArray(null)).not.toBeTruthy()
        expect(utils.isArray(undefined)).not.toBeTruthy()
    })
})

// 测试组件
import Vue from 'vue'
describe('Component', () => {
  it('static', () => {
    const vm = new Vue({
      template: '<test></test>',
      components: {
        test: {
          data () {
            return { a: 123 }
          },
          template: '<span>{{a}}</span>'
        }
      }
    }).$mount()
    expect(vm.$el.tagName).toBe('SPAN')
    expect(vm.$el.innerHTML).toBe('123')
})
```

---

### 编写单元测试用例
项目中编写的单元测试文件必须在根目录`'test/unit'`下，且文件名称必须以`'.spec.js'`结尾。按规范，文件名称要以测试文件名称或者测试组件名称开头（`utils.js`对应`utils.spec.js`），查找时一目了然。


#### `jasmine`
<a href="https://jasmine.github.io/" target="_blank">`Jasmine`</a>是一种`JavaScript`的测试框架，它不依赖于其他框架，也不依赖于`DOM`结构。其语法特点在于简单清晰。

##### `jasmine`核心
`Suites(describe)`是`Jasmine`的核心，是一个测试集，里面包括多个`specs(it)`，而每个`specs`里面可能包含多个断言(`expect`)。

* `Suites`
`Suites`使用`describe()`来定义，其中传递两个参数为： 
    - `string`：用于描述测试组的名称 
    - 主体还包括四个全局函数`function`：是测试组的主体函数 

``` js
describe('This is a suite', function() {
    it('This is a specs', function() {
        expect('specs').toEqual('specs')
    })
});
```

* `beforeEach`测试初始化、`afterEach`测试结束清理。
为了能够在测试开始前先进行部分初始化，或者在测试结束后对一些内容进行销毁，主体还包括四个全局函数： 

    - `beforeEach()`：在`describe`函数中每个`Spec`执行之前执行。 
    - `afterEach()`：在`describe`函数中每个`Spec`数执行之后执行。 
    - `beforeAll()`：在`describe`函数中所有的`Specs`执行之前执行，但只执行一次，在`Sepc`之间并不会被执行。 
    - `afterAll()`：在`describe`函数中所有的`Specs`执行之后执行，但只执行一次，在`Sepc`之间并不会被执行。 

``` js
describe('utils.http', function() {
    beforeEach(function () {
        // 每个Spec数执行之后安装
        jasmine.Ajax.install()
    })

    afterEach(function () {
        // 每个Spec数执行之后卸载
        jasmine.Ajax.uninstall()
    })

    it('请求参数', (done) => {
        var response
        utils.http({
            url: 'http://localhost:8087/api/example/authorize',
            data: JSON.stringify({
                grant_type: 'password',
                username: 'demo',
                password: '123456'
            }),
            headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' },
            type: 'POST',
            contentType: 'application/json',
            success: function (data, res) { response = res }
        })

        getAjaxRequest().then(function (request) {
            // 模拟返回内容
            request.respondWith({
                status: 200,
                statusText: 'OK',
                responseText: '{"access_token": "access_token", "expires_in": 12342, "token_type": "password", "userId": "demo"}',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            expect(request.url).toBe('http://localhost:8087/api/example/authorize')
            expect(request.method).toBe('POST')
            expect(request.requestHeaders['authorization']).toEqual('Basic V2ViQXBwOnNhcGlAMTIzNA==')

            setTimeout(function () {
                expect(response.data.access_token).toEqual('access_token')
                expect(response.status).toEqual(200)
                expect(response.statusText).toEqual('OK')
                expect(response.headers['content-type']).toEqual('application/json')
                done()
            }, 100)
        })
    })
});
```

* `Specs(it)`
`Specs`是测试组里的每个测试体，其中用`it()`函数定义测试体，传递两个参数： 
    - `string`：用于描述测试体的名称 
    - `function`：测试体的主体内容 

每个测试组`Suites`可以包含多个测试体

``` js
describe('utils.escapeHtml', () => {
    const fun = utils.escapeHtml
    
    it('参数target为非字符串，返回空字符串且抛出警告', () => {
        // 监听utils.warn是否执行
        spyOn(utils, 'warn')
        expect(fun()).toBe('')
        expect(fun(null)).toBe('')
        expect(fun(undefined)).toBe('')
        expect(fun(5)).toBe('')
        expect(fun(true)).toBe('')
        expect(fun(false)).toBe('')
        expect(fun({})).toBe('')
        expect(fun([])).toBe('')
        expect(fun(function () { })).toBe('')
        // 判断执行
        expect(utils.warn).toHaveBeenCalled()
    })

    it('参数target为字符串，返回处理过字符串', () => {
        spyOn(utils, 'warn')
        expect(fun('abc')).toBe('abc')
        expect(fun('&')).toBe('&amp;')
        expect(fun('<')).toBe('&lt;')
        expect(fun('>')).toBe('&gt;')
        expect(fun('"')).toBe('&quot;')
        expect(fun('\'')).toBe('&#39;')
        expect(fun('&<>"\'')).toBe('&amp;&lt;&gt;&quot;&#39;')
        expect(fun('<h1>title</h1>')).toBe('&lt;h1&gt;title&lt;/h1&gt;')
        expect(utils.warn).not.toHaveBeenCalled()
    })
})
```

* `Expect` 断言
`Specs`里面可能包含多个断言，只有在所有的断言都返回`true`时才会通过，否则测试失败。`expect()`传递一个参数，为实际值，而后面紧跟着一个`Matchers`传递一个值（或没有），来进行判断是否通过。

``` js
describe('undefined', () => {
    var a

    it('变量a未赋值为undefined', () => {
        // a为实际值，断言a等于undefined
        expect(a).toBeUndefined()
    })
})
```

* `Matchers`
常见`matchers`

    - `toBe()`：判断两个变量是否全等，类似于`“===”`； 
    - `toNotBe()`：与上一个相反，判断两个变量是否不全等，类似于`“!==”`； 
    - `toBeDefined()`：检查变量或属性是否已声明且赋值； 
    - `toBeUndefined()`：与上一个相反； 
    - `toBeNull()`：判断变量是否为`null`； 
    - `toBeTruthy()`：判断变量如果转换为布尔值，是否为`true`； 
    - `toBeFalsy()`：与上一个相反； 
    - `toBeLessThan()`：与数值比较，是否小于； 
    - `toBeGreaterThan()`：与数值比较，是否大于； 
    - `toEqual()`：判断变量是否相等，相当于`“==”`； 
    - `toContain()`：判断一个数组中是否包含元素（值）。只能用于数组，不能用于对象； 
    - `toBeCloseTo()`：数值比较时定义精度，先四舍五入后再比较； 
    - `toMatch()`：按正则表达式匹配； 
    - `toNotMatch()`：与上一个相反； 
    - `toThrow()`：检验一个函数是否会抛出一个错误。

* 自定义`Matchers`
用户可以自定义`Matchers`。在`beforeEach()`或`it()`函数里调用`Jasmine.addMatchers()`。
例如添加一个判断字符串时间格式`Matchers`：

``` js
beforeEach(function(){
    jasmine.addMatchers({
        // 定义断言的名字
        toBeSomeThing: function() {  
            return {
                // compare是必须的
                compare: function (actual, expected) {  
                    var foo = actual;
                    return { 
                        // 要返回一个带pass属性的对象，pass就是需要返回的布尔值
                        pass: foo === expected || 'something' ,
                        message: "error message here"  
                    }  
                }
            }
        }
    })
})
```

---

#### 启动测试
在项目目录下打开`cmd`终端执行命令：`'npm run test:unit'`

单元测试配置文件为：`'build/karma.base.conf.js'`和`'build/karma.unit.conf.js'`

``` js
// 'build/karma.base.conf.js' 关键代码
module.exports = {
    frameworks: ['jasmine'], // 采用jasmine框架
    files: [
        '../test/unit/index.js' // 测试文件列表
    ],
    // 预处理
    preprocessors: {
        '../test/unit/index.js': ['webpack', 'sourcemap', 'coverage']
    },
    ...
}

// 'build/karma.unit.conf.js' 关键代码
// http://karma-runner.github.io/0.8/config/coverage.html
module.exports = function (config) {
    config.set(Object.assign(base, {
        browsers: ['Chrome'],
        reporters: ['progress', 'coverage'],
        // 覆盖率报表配置
        coverageReporter: {
            // 指定生成报表目录
            dir: '../coverage',
            // 生成报表类型
            reporters: [
                { type: 'lcov', subdir: '.' },
                { type: 'text-summary' }

                // 可配置
                // reporters not supporting the `file` property
                // { type: 'html', subdir: 'report-html' },
                // { type: 'lcov', subdir: 'report-lcov' },
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                // { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                // { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                // { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                // { type: 'text', subdir: '.', file: 'text.txt' },
                // { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
            ]
        },
        singleRun: false,
        plugins: base.plugins.concat([
            'karma-chrome-launcher'
        ])
    }))
}

```