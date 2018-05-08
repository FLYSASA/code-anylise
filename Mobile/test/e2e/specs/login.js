module.exports = {
    'login': function (browser) {
        browser.url('http://localhost:8087/example/login.html')
            .waitForElementVisible('body', 1000)
            .setValue('input[placeholder=请输入账号]', 'demo')
            .setValue('input[placeholder=请输入密码]', '123456')
            .click('.weui-btn')
            .waitFor(3000)
            .assert.visible('.weui-bar__item_on')
            .click('.weui-tabbar__item:nth-child(2)')
            .waitFor(1000)
            .assert.visible('.vux-swiper')
            .click('.weui-tabbar__item:nth-child(3)')
            .waitFor(1000)
            .assert.containsText('.vux-label', '用户头像')
            .end()
    }
}
