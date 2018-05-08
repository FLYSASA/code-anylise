**文件操作**部分，封装的是有关文件的操作，如：上传下载、压缩解压、读取创建删除文件等。调用方式：<br/>
`App.file.方法名(参数)`

### showFile (url)

在线预览文档，支持预览的文档类型有：
- 文档类：`doc`, `docx`, `xls`, `xlsx`, `ppt`, `pptx`, `pdf`, `txt`；
- 图片类：`jpg`, `jpeg`, `gif`, `png`, `bmp`, `tif`；
- 音频类：`mp3`, `m4a`, `midi`, `wma`；
- 压缩文件类：`zip`, `rar`, `tar`, `7z`；
- 图纸类：`dwg`, `dxf`, `dwf`；
- 编程类：`html`, `htm`, `xml`, `js`, `css`, `java`, `php`, `sql`。

``` js
App.file.showFile('http://rmis.ideasoft.net.cn:8402/view/dRzPhKw?url=eaptest_dir%252F2017%252F03%252FFImiw.doc&name=EAS&idocv_auth=sapi')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">url</span> | <span class="type type-string">String</span> | 文档预览全路径，进行URL编码 |

无返回值。


---


### downloadFile (options)

下载文件。

``` js
App.file.downloadFile({
    requestUrl: 'http://rmis.ideasoft.net.cn:8401/_Acc/Temp/Simulate/Download/1bfef967-1c87-402e-92d2-45057e3b55ec/1bfef967-1c87-402e-92d2-45057e3b55ec.zip',
    savePath: 'download/zsyf/abc.zip',
    success: function (data) {
        // data格式：{ path: 'sys:data/files/xxx', url : '../../xxx'}
        alert(data.path + '\n' + data.url)
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`requestUrl: 'xxx',`  // 要下载的文件路径<br/>　　`type: 'GET',`  // 请求方式，GET/POST/PUT/DELETE，默认GET方式<br/>　　`data: '{ id: "xxx" }',`  // 请求的参数数据，Json类型，键值对（可选）<br/>　　`savePath: 'xxx',`  // 文件保存路径，保存在sys:data/files目录下，建议根据业务指定保存目录名<br/>　　`showProgress: true,`  // 是否显示进度条（默认为true）<br/>　　`success: succFun`  // 下载成功回调函数，参数为下载文件的路径<br/>　　`fail: failFun`  // 下载失败回调函数，参数是异常信息（若无本参数，则alert提示异常信息）<br/>`}` |

无返回值。


---


### uploadFile (options)

上传文件。

``` js
App.file.uploadFile({
    requestUrl: 'http://172.56.4.140:83/api/app/uploadfiles',
    files: 'download/zsyf/abc.zip',
    success: function (data) {
        // data是由请求接口返回的结果
        alert(JSON.stringify(data))
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`requestUrl: 'xxx',`  // 上传文件的请求接口地址<br/>　　`type: 'GET',`  // 请求方式，GET/POST/PUT/DELETE，默认GET方式<br/>　　`files: 'xxx',`  // 要上传的文件路径，多个文件时为文件路径的数组<br/>　　`data: '{ id: "xxx" }',`  // 请求的参数数据，Json类型，键值对（可选）<br/>　　`showProgress: true,`  // 是否显示进度条（默认为true）<br/>　　`success: succFun`  // 请求成功回调函数，参数是请求结果（由接口返回）<br/>　　`fail: failFun`  // 请求失败回调函数，参数是异常信息（若无本参数，则alert提示异常信息）<br/>`}` |

无返回值。


---


### zipFile (options)

压缩文件。

``` js
App.file.zipFile({
    sourcePath: 'temp/zsyf',
    zipPath: 'temp/zsyf.zip',
    callback: function (result) {
        if (result.code === '0') {
            // 压缩后zip文件的路径，result.data格式：{ path: 'sys:data/files/xxx', url : '../../xxx'}
            alert(result.data.path + '\n' + result.data.url)
        } else {
            alert(result.msg)
        }
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`sourcePath: 'xxx',`  // 需要压缩的文件或文件夹的路径<br/>　　`zipPath: 'xxx',`  // 压缩后的zip文件路径，不提供时根据被源文件或文件夹生成压缩文件名<br/>　　`password: 'xxx',`  // 压缩密码，若压缩文件不带密码无须提供<br/>　　`callback: callbackFun`  // 压缩结果回调函数，参数是标准接口结果类型<br/>`}` |

无返回值。


---


### unZipFile (options)

解压文件。

``` js
App.file.unZipFile({
    sourcePath: 'download/zsyf/abc.zip',
    folderPath: 'temp/zsyf',
    callback: function (result) {
        if (result.code === '0') {
            // 解压后的文件夹路径，result.data格式：{ path: 'sys:data/files/xxx', url : '../../xxx'}
            alert(result.data.path + '\n' + result.data.url)
        } else {
            alert(result.msg)
        }
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`sourcePath: 'xxx',`  // 需要解压的zip文件路径<br/>　　`folderPath: 'xxx',`  // 压缩后的文件夹路径，不提供时根据zip文件自动生成解压文件夹<br/>　　`password: 'xxx',`  // 压缩密码，若压缩文件不带密码无须提供<br/>　　`callback: callbackFun`  // 解压结果回调函数，参数是标准接口结果类型<br/>`}` |

无返回值。


---


### createDir (path)

创建目录（若父目录不存在则同时创建父目录）。

``` js
if (App.file.createDir('dir/dir1')) {
    alert('创建成功。')
} else {
    alert('创建失败。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">path</span> | <span class="type type-string">String</span> | 要创建的目录路径，从根开始 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示创建成功，false表示创建失败 |


---


### createFile (path)

创建一个新的空文件。

``` js
if (App.file.createFile('file/file1.txt')) {
    alert('创建成功。')
} else {
    alert('创建失败。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">path</span> | <span class="type type-string">String</span> | 要创建的文件路径，从根开始 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示创建成功，false表示创建失败（若文件已存在则直接返回true） |


---


### deleteFile (path)

删除文件或文件夹。

``` js
if (App.file.deleteFile('dir/dir1')) {
    alert('删除成功。')
} else {
    alert('删除失败。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">path</span> | <span class="type type-string">String</span> | 要删除的文件或文件夹的路径，从根开始 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示删除成功，false表示删除失败（若文件或文件夹不存在，直接返回true） |


---


### readFile (path)

获取指定文件的内容。只能读取字符串类型，不支持对二进制文件读取。

``` js
var result = App.file.readFile('abc/7FE36678-A78B-4A2D-A229-BD5283F3BA2B.txt')
if (result.code === '0') {
    var data = JSON.parse(result.data)
    alert(data.downid)
} else {
    alert(data.msg)
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">path</span> | <span class="type type-string">String</span> | 文件路径，从根开始 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-object">Json</span> | 标准接口结果类型，读取成功时，data为文件内容 |


---


### writeFile (path, content, mode)

保存内容至指定路径文件。只能写入字符串类型，不支持对二进制文件写入。

``` js
if (App.file.writeFile('abc/txt1.txt', 'line2\r\n', 1)) {
    alert('写文件成功。')
} else {
    alert('写文件失败。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">path</span> | <span class="type type-string">String</span> | 文件路径，从根开始 |
| <span class="prop-key" style="white-space:nowrap;">content</span> | <span class="type type-string">String</span> | 要写入文件的数据 |
| <span class="prop-key" style="white-space:nowrap;">mode</span> | <span class="type type-number">Number</span> | 0:覆盖原文件内容/1:追加至原文件末尾 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-object">Json</span> | true表示写入成功，false表示写入失败 |


---


### moveFile (sourcePath, targetPath)

移动/重命名文件。

``` js
if (App.file.moveFile('abc/txt1.txt', 'download/txt1.txt')) {
    alert('移动文件成功。')
} else {
    alert('移动文件失败。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">sourcePath</span> | <span class="type type-string">String</span> | 源文件路径，从根开始 |
| <span class="prop-key" style="white-space:nowrap;">targetPath</span> | <span class="type type-string">String</span> | 目标文件路径，从根开始 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-object">Json</span> | true表示移动/重命名成功，false表示移动/重命名失败 |


---


### copyFile (sourcePath, targetPath)

复制文件文件。

``` js
if (App.file.copyFile('abc/txt1.txt', 'download/txt1.txt')) {
    alert('复制文件成功。')
} else {
    alert('复制文件成功。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">sourcePath</span> | <span class="type type-string">String</span> | 源文件路径，从根开始 |
| <span class="prop-key" style="white-space:nowrap;">targetPath</span> | <span class="type type-string">String</span> | 目标文件路径，从根开始 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-object">Json</span> | true表示复制成功，false表示复制失败 |


---


### selectFile (options)

选择文件。

``` js
App.file.selectFile({
    callback: function (path) {
        alert(path)
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`defaultPath: 'xxx',`  // 选择文件夹路径，不提供本参数时从sys:data/files目录打开<br/>　　`filter: 'xxx',`  // 选中文件时显示给用户的文件类型，支持以下格式：doc&#124;docx&#124;xls&#124;xlsx&#124;ppt&#124;pptx&#124;pdf&#124;txt&#124;html&#124;xml&#124;bmp&#124;jpg&#124;jpeg&#124;png&#124;rar&#124;zip，需过滤的文件以“&#124;”连接，如jpg&#124;png，说明过滤出后缀名为jpg或png的图片文件。默认为空串即不过滤<br/>　　`callback: callbackFun`  // 选择文件回调函数，参数为已选中文件路径，若未选择则是空串<br/>`}` |

无返回值。


---


### openFile (path)

调用系统第三方程序打开指定文件类型。支持打开word/excel/pdf/ppt/jpg/png/gif类型文件。

``` js
App.file.openFile('temp/zsyf/7FE36678-A78B-4A2D-A229-BD5283F3BA2B.txt')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">path</span> | <span class="type type-string">String</span> | 要打开的文件路径，从根开始 |

无返回值。


---


### exists (path)

文件或文件夹是否存在。

``` js
var isExist = App.file.exists('abc/txt1.txt')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">path</span> | <span class="type type-string">String</span> | 文件或文件夹路径，从根开始 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-object">Json</span> | true表示存在，false表示不存在 |


---


### 补充说明

文件路径，支持三种前缀：
- `res:`：用于访问App应用插件中的资源文件（页面、图片等），如：`res:page/login.uixml`表示`client/page/phone/default/login.uixml`，`res:image/about.png`表示`client/image/phone/default/about.png`；在本开发框架下，较少用到。
- `sys:`：用于访问App安装目录（ExMobi目录）下的文件，如：`sys:data`表示`ExMobi/data`，`sys:download/oa`表示`ExMobi/download/oa`；在本框架下，这种路径用得最多。`sys:`目录的主要结构如下：

``` markdown
Exmobi
|-- apps                    // 应用插件目录
|   |-- h5app               // App插件资源目录
|       |-- image           // App插件的图片目录
|       |-- page            // 客户端页面目录
|       |   |-- dist        // 用H5应用的代码包
|       |   |-- login.uixml // App登录页，用来内嵌H5登录页
|       |   |-- ...
|       |-- script          // App的js脚本目录
|       |-- config.xml      // App的配置文件
|-- data                    // 数据目录
|   |-- files               // 用来存储App产生的文件（自定义的目录），本框架规定本目录用来存储App产生的所有文件
|   |-- tmp                 // 用来临时存储文件，该目录在程序重启后会自动清理（如：选择图片、拍照，会默认将图片存放在该目录）
|   |-- ...
|-- ...
```
- `file:`：用于手机系统目录下的文件，如：非App应用插件的资源文件、非App安装目录下的文件。即无法用前`res:`和`sys:`来访问的文件，就用`file:`来访问。

本框架内置了默认的文件存储目录，即：`sys:data/files`，调用操作文件能力的方法时，请传递不带前缀的路径参数。不带前缀的路径参数，均会转换成`sys:data/files`下的路径。如：`download/oa`就是路径`sys:data/files/download/oa`，`db/oadb.db`就是文件`sys:data/files/db/oadb.db`。可以按照业务、功能规划存储目录。

在调用操作文件能力的方法时，也可以传递带前缀的路径参数（不推荐），如果带了以上三种前缀，则方法对路径参数不予处理。比如，选择文件方法，返回的路径就带有`file:`前缀，这是因为选择的文件可能是来自手机系统或者SD卡，其路径并非`res:`和`sys:`可以表示。这种路径可以直接作为参数使用。

如果在H5页面上要使用一些路径，如：
``` html
<img src="../../../data/files/download/oa/person.png" />
```
请使用不带前缀的相对路径，和普通Web开发完全一致。因此，有不少方法返回了两种路径，文件系统路径、基于当前页面的相对路径。如：下载、解压等方法。