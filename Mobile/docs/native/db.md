**数据库操作**部分，封装的是有关SQLite数据库的操作。调用方式：<br/>
`App.db.方法名(参数)`

### open (options)

打开或新建并打开数据库。

``` js
var dbIsCrypt = false   // 数据库是否需要加密
var options = { name: 'oadb.db' }
if (dbIsCrypt) {
    options.key = 'sapi@2017'
}
if (App.db.open(options)) {
    alert('建库或打开库成功。')
} else {
    alert('建库或打开库失败。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`name: "oadb.db",`// 需要打开的数据库名称，若不存在该数据库则新建并打开<br/>　　`path: "db/oa"`// 数据库文件的存放目录，默认保存在sys:data/files/db目录下，也可根据业务指定保存目录名<br/>　　`key: "sapi@2017",`// 数据库密码，支持英文、数字、中文及其他特殊字符；需要加密数据库时提供，否则不提供<br/>`}` |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示打开指定数据库成功，false表示打开指定数据库失败 |


---


### openAsyn (options)

异步方式打开或新建并打开加密数据库。若加密数据库较大（大于15M），建议用异步打开方式。本方法仅支持加密数据库（必须提供密码参数key）。

``` js
var options = { 
    name: 'oadb.db',
    key: 'sapi@2017',
    callback: function (result) {
        if (result.code === '0') {
            alert('建库或打开库成功。')
            // 其他操作
        } else {
            alert(result.msg)
        }
    }
}
App.db.openAsyn(options)
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`name: "oadb.db",`// 需要打开的数据库名称，若不存在该数据库则新建并打开<br/>　　`path: "db/oa"`// 数据库文件的存放目录，默认保存在sys:data/files/db目录下，也可根据业务指定保存目录名<br/>　　`key: "sapi@2017",`// 数据库密码，支持英文、数字、中文及其他特殊字符<br/>　　`callback: callbackFun,`// 回调函数，参数是标准接口结果类型<br/>`}` |

无返回值。


---


### isOpen ()

当前数据库是否处于打开状态。

``` js
if (!App.db.isOpen()) {
    // 打开数据库
}
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示数据库处于打开状态，false表示数据库处于关闭状态 |

---


### close ()

关闭当前已打开的数据库

``` js
var dbIsClose = App.db.close()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示关闭指定数据库成功，false表示关闭指定数据库失败 |


---


### createTable (tableName, cols)

在数据库中创建指定数据表。如果不使用此方法，也可以用执行SQL语句的方式来创建表。

``` js
// 此方法相当于执行SQL语句：CREATE TABLE TUser (Name VARCHAR(50), EmployeeName NVARCHAR(20), Age INT)
if (App.db.createTable('TUser', ['Name VARCHAR(50)', 'EmployeeName NVARCHAR(20)', 'Age INT'])) {
    alert('建表成功。')
} else {
    alert('建表失败。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">tableName</span> | <span class="type type-string">String</span> | 数据表名称 |
| <span class="prop-key" style="white-space:nowrap;">cols</span> | <span class="type type-array">Array</span> | 包含需要构建所有数据表列名，列数据类型的字符串数组 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示创建指定数据表成功，false表示创建指定数据表失败 |


---


### dropTable (tableName)

在数据库中移除指定数据表。如果不使用此方法，也可以用执行SQL语句的方式来删除表。

``` js
// 此方法相当于执行SQL语句：DROP TABLE TUser
var result = App.db.dropTable('TUser')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">tableName</span> | <span class="type type-string">String</span> | 数据表名称 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示删除指定数据表成功，false表示删除指定数据表失败 |


---


### isTableExist (tableName)

数据库中是否存在指定表名的数据表。

``` js
var tableName = 'TUser'
if (App.db.isTableExist(tableName)) {
    if (App.db.dropTable(tableName)) {
        alert('删表成功。')
    } else {
        alert('删表失败。')
    }
} else {
    alert('表不存在。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">tableName</span> | <span class="type type-string">String</span> | 数据表名称 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示存在指定数据表，false表示不存在指定数据表 |


---


### getTableCols (tableName)

获取指定表的列名数组。

``` js
var cols = App.db.getTableCols('TUser')

// 输出：[ "name", "employeename", "age" ]
alert(JSON.stringify(cols))
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">tableName</span> | <span class="type type-string">String</span> | 数据表名称 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示存在指定数据表，false表示不存在指定数据表 |


---


### query (sql)

执行查询语句，返回查询结果集数组（数组每项均为json对象）。

``` js
var data = App.db.query('SELECT * FROM TUser')

// 输出：[ { "name": "lisi", "employeename": "李四", "age": "41" }, { "name": "zhangsan", "employeename": "张三", "age": "25" } ]
alert(JSON.stringify(data))
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">sql</span> | <span class="type type-string">String</span> | 需要执行的select查询SQL语句 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-array">Array</span> | 查询结果集数组，数组每项均为json对象 |


---


### exec (sql)

执行单条插入insert，更新update或删除delete语句。

``` js
var sql = "INSERT INTO TUser VALUES ('zhangsan','张三',25)"
if (App.db.exec(sql)) {
    alert('执行sql成功。')
} else {
    alert('执行sql失败。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">sql</span> | <span class="type type-string">String</span> | 需要执行的insert/update/delete SQL语句 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示执行指定SQL语句成功，false表示执行指定SQL语句失败 |


---


### batchExec (sqls)

以事务方式执行多条插入insert、更新update或删除delete语句。

``` js
var sqls = ["INSERT INTO TUser VALUES ('lisi','李四',41)", "DELETE FROM TUser WHERE name='zhangsan'"]
if (App.db.batchExec(sqls)) {
    alert('批量执行sql成功。')
} else {
    alert('批量执行sql失败。')
}
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">sqls</span> | <span class="type type-array">Array</span> | 包含多条需要执行的insert/update/delete SQL语句的数组 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示事务方式执行sql语句集成功，false表示事务方式执行sql语句集失败 |


---


### 数据库操作流程

#### 1、打开数据库

写一个公共的打开数据库的方法，每次打开数据前判断打开状态。

``` js
function openDb () {
    return App.db.open({ name: 'oadb.db' })
}

// 打开数据库
if (!App.db.isOpen()) {
    openDb()
}
```

#### 2、数据库操作

在打开数据后进行：建表、删表、执行SQL语句、获取表删除状态等操作。

``` js
var flag = App.db.isOpen()
if (!flag) {
    flag = openDb()
}

if (flag) {
    var data = App.db.query('SELECT * FROM TUser')

    // 处理数据data

    App.db.close()
}
```

#### 3、关闭数据库

在数据库操作完毕之后，要关闭当前数据库。

``` js
App.db.close()
```

### 补充说明

- 在查询或执行SQL语句时，如果值包含双引号`"`，请先将值进行base64编码，取值时再解码。
- 不能同时操作两个数据库，open数据库之后，在close之前，数据相关的操作都是在这个数据库上进行。
- 安卓手机若要使用加密数据库，请在打包App的时候，勾选`是否加密数据库`的`是`。
- 如果App初始化时需要创建数据库表，内置一些数据，并且数据量大的话，通过js去操作会降低效率和性能。这时，我们可以在服务器上内置一个SQLite数据库文件，App初始化的时候把它下载下来即可；当然，也可以把数据库文件内置在App中。这里是一个简单好用的SQLite数据库操作工具：[Navicat SQLite](https://bbs.exmobi.cn/thread-234-1.html)。
- 如果需要初始化一个内置大量数据的加密数据库，这里也有一个工具，可以将SQLite数据库文件转换成加密数据库文件：[SqlCipher数据库加密工具](https://bbs.exmobi.cn/thread-5401-1-1.html)。
- 操作SQLite数据库的语句和操作SQL Server数据库的语句相似，基本的数据类型、增删改语句、语法也基本相同。有关SQLite数据库的更多知识，请参考：[SQLite 教程](http://www.runoob.com/sqlite/sqlite-tutorial.html)。