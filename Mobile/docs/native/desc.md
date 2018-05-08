### 概述

本部分文档，主要介绍在使用混合模式开发`App`时，内嵌于`App`中的`HTML`页面对手机本地能力的调用和操作方法。
`src/static/js/app/index.js`就是对本地能力调用的一个封装，在`HTML`页面的`js`里引入这个`js`文件，就可以使用它封装的方法来调用手机的本地能力。

``` js
import App from '@/static/js/app'
```

<p class="warning">
    `@`是`webpack`的`resolve`中配置的一个变量，指向`src`目录。
</p>

### 范围清单

主要是以下本地能力：
- [基本操作](/native/base)
- [设备操作](/native/device)
- [应用操作](/native/app)
- [缓存操作](/native/cache)
- [通讯操作](/native/contact)
- [定位操作](/native/position)
- [文件操作](/native/file)
- [图片操作](/native/photo)
- [数据库操作](/native/db)
- [多媒体操作](/native/media)
- [网络操作](/native/net)
- [消息处理](/native/message)
- [第三方集成](/native/third)