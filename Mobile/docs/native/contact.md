**通讯操作**部分，封装的是有关通讯的操作，如：打电话、发短信、发邮件等。调用方式：<br/>
`App.contact.方法名(参数)`

### tel (phone, onlyOpenDialog)

拨号，打电话。

``` js
App.contact.tel('13896582547', true)
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">phone</span> | <span class="type type-string">String</span> | 电话号码 |
| <span class="prop-key" style="white-space:nowrap;">onlyOpenDialog</span> | <span class="type type-boolean">Boolean</span> | 是否仅启动拨号界面（并不拨出） |

无返回值。


---


### sendSms (phone, content, onlyOpenDialog)

发送短信。

``` js
App.contact.sendSms('13896582547', '你好，周六在家吗？', true)
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">phone</span> | <span class="type type-string">String</span> | 手机号码，多个号码之间用逗号分隔 |
| <span class="prop-key" style="white-space:nowrap;">content</content> | <span class="type type-string">String</span> | 要发送的短信内容 |
| <span class="prop-key" style="white-space:nowrap;">onlyOpenDialog</span> | <span class="type type-boolean">Boolean</span> | 是否仅启动短信发送界面（并不发出） |

无返回值。


---


### sendMail (mailInfo)

发送邮件（实际效果是，弹出手机上支持本操作的App选择界面）。

``` js
App.contact.sendMail({
    to: 'chengam@chinasap.cn;8045287@qq.com',   // 收件人地址列表，多个用;分隔
    cc: '8336085@qq.com',   // 抄送地址列表，多个用;分隔
    bcc: 'laughsky@126.com',    // 暗送地址列表，多个用;分隔
    subject: 'hello, world!',   // 主题，邮件的标题会变成主题设置的文字，默认会提示“新邮件”
    body: 'hello,world! 你好，深圳！' // 邮件正文内容
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">mailInfo</span> | <span class="type type-object">Json</span> | 邮件内容，格式参考示例代码 |

无返回值。