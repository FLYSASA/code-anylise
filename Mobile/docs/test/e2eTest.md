## e2e（端对端）集成测试
开发框架集成了`Nightwatch`自动化测试框架，使用`Node.js`编写， 基于`Selenium WebDriver API`。它是一个完整的浏览器端真实用户场景测试解决方案， 致力于简化继续集成和编写自动化测试。它提供了简单的语法，支持使用`JavaScript`和`CSS`选择器，来编写运行在`Selenium`服务器上的端到端测试。

### `Nightwatch`特点

* 简单但强大的语法。只需要使用`JavaScript`和`CSS`选择器，开发者就能够非常迅捷地撰写测试。开发者也不必初始化其他对象和类，只需要编写测试规范即可。
* 使用CSS选择器或`Xpath`，定位并验证页面中的元素或是执行命令。

实例：
``` js
// test/e2e/specs/login.js
module.exports = {
    'login': function (browser) {
        browser
            // 浏览器访问
            .url('http://localhost:8080/example/#/')
            // 断言：等待1秒钟后'body'可见
            .waitForElementVisible('body', 1000)
            // 账号输入框设置值
            .setValue('input[placeholder=请输入账号]', 'sapiadmin')
            // 密码输入框设置值
            .setValue('input[placeholder=请输入密码]', '123456')
            // 点击'登录'
            .click('.weui-btn')
            // 等待三秒
            .waitFor(3000)
            // 进入主页后，断言：存在tab选项卡
            .assert.visible('.weui-bar__item_on')
            // 点击第二个tab选项卡菜单
            .click('.weui-tabbar__item:nth-child(2)')
            // 等待1秒
            .waitFor(1000)
            // 断言：存在.vux-swiper元素
            .assert.visible('.vux-swiper')
            // 点击第三个tab选项卡菜单
            .click('.weui-tabbar__item:nth-child(3)')
            // 等待1秒钟
            .waitFor(1000)
            // 断言：存在.vux-label元素内容为‘个人头像’
            .assert.containsText('.vux-label', '个人头像')
            // 为了保证Selenium会话被正确地关闭，最后一定要调用end方法结束测试
            .end()
    }
}

// 也可以分步骤
module.exports = {
    'login': function(browser) {
         browser
            .url('http://localhost:8080/example/#/')
            .waitForElementVisible('body', 1000)
            .setValue('input[placeholder=请输入账号]', 'sapiadmin')
            .setValue('input[placeholder=请输入密码]', '123456')
            .click('.weui-btn')
    },
    'index_tab1': function(browser) {
        browser.waitFor(3000)
            .assert.visible('.weui-bar__item_on')
    },
    'index_tab2':function(browser){
        browser.click('.weui-tabbar__item:nth-child(2)')
            .waitFor(1000)
            .assert.visible('.vux-swiper')
    },
    'index_tab3':function(browser){
        browser.click('.weui-tabbar__item:nth-child(3)')
            .waitFor(1000)
            .assert.containsText('.vux-label', '个人头像')
            // 为了保证Selenium会话被正确地关闭，最后一定要调用end方法结束测试
            .end()
    }
}
```

<p class="tip">
更多`api`请查看：<a href="http://nightwatchjs.org/api#expect-api" target="_blank">`nightwatch.js`</a>
</p>

---

### 调用测试

* 文件目录
所有的`e2e`测试文件放到根路径`'test/e2e/specs'`文件夹下，

* 调用测试
在项目目录下打开cmd终端执行命令：`'npm run test:e2e'`

<p class="tip">
    在执行命令测试前，请确保您测试的站点可正常访问。
</p>

---

### 相关配置
`nightwatch`配置文件路径：`'build/nightwatch.config.js'`
`nightwatch`启动文件路径：`'test/e2e/runner.js'`