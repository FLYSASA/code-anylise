## 数据模型效验器(dataSchemaChecker.js)

### 目的
用于效验数据是否与定义的数据模型一致，若不一致会抛出相关错误信息。可在模型中配置默认值，当效验该数据属性为`null`或`undefined`时会用默认值替代。主要用于请求参数校验和请求返回值效验，可提高开发体验和开发效率。

* 一般数据效验

``` js
import dataSchemaChecker from 'src/static/js/dataSchemaChecker.js'
import utils from 'src/static/js/utils.js'

const data = {
    Code: 200,
    Data: [
        {
            Name: '张三',
            Mobile: 1512603921
        }
    ],
    Message: '获取成功'
}

const schema = {
    // 可构造函数（Object)或者'Object'、'object'或者自定义的模型
    type: Object, 
    properties: {
        Code: Number,
        Data: {
            type: Array,
            items: {
                type: Object,
                properties: {
                    Name: String,
                    Mobile: Number
                }
            }
        },
        Message: String
    }
}

dataSchemaChecker.check(data, schema) 
// 判断是否有错误信息
console.log(dataSchemaChecker.getWarnMsg().length === 0) // true：data符合schema
```

* 指定命名空间效验

``` js
import dataSchemaChecker from 'src/static/js/dataSchemaChecker.js'
import utils from 'src/static/js/utils.js'
const data = {
    Code: 200,
    Data: [
        {
            Name: '张三',
            Mobile: 1512603921
        }
    ],
    Message: '获取成功'
}
// 验证data.Data
var schema = {
    type: Array,
    // namespace属性指定data.Data
    namespace: 'Data', 
    items: {
        type: 'Object',
        properties: {
            Name: ['String', 'Number'], // 满足其中一个
            Mobile: 'Number',
            Address: 'String' // data.Data数组项没有Address属性，所以校验发出警告
        }
    }
}

dataSchemaChecker.check(data, schema)
console.log(dataSchemaChecker.getWarnMsg().length === 0) // false：data.Data数组项没有Address
```

* 指定默认值

``` js
var data = null
var schema = {
    type: Object,
    properties: {
        Code: Number,
        Data: Array,
        Message: String
    },
    default: {
        Code: 200,
        Data: [],
        Message: '获取成功'
    }
}

var data2 = dataSchemaChecker.check(data, schema)
// 校验根数据（不指定命名空间），模型指定默认值，校验data为null或者undefined时，返回值是模型指定默认值
console.log(data2 === schema.default) // true

******************** 分割线 ***********************

var data3 = {
    Code: 200,
    Data: [
        {
            Name: '张三',
            Mobile: 1512603922
        }
    ],
    Message: '获取成功'
}

var schema3 = {
    type: Array,
    namespace: 'Data', // 验证data.Data
    items: {
        type: 'Object',
        properties: {
            Name: ['String', 'Number'], // 满足其中一个
            Mobile: 'Number',
            Address: {
                type: 'String',
                default: '广东深圳'
            }
        }
    }
}

var data4 = dataSchemaChecker.check(data3, schema3)
console.log(dataSchemaChecker.getWarnMsg().length === 0) // false ：data3.Data数组项缺少Address字段，校验失败
console.log(data4 === data3) // true：有命名空间的情况下，返回的是原数据
console.log(data3.Data[0].Address === '广东深圳') // true：取指定默认值
```

* 添加自定义模型类别

``` js
 var data = {
    Code: 200,
    Data: [
        {
            Name: '张三',
            Mobile: 1512603921
        }
    ],
    Message: '获取成功'
}
var personListSchema = {
    name: 'personList',
    type: Array,
    items: {
        type: Object,
        properties: {
            Name: String,
            Mobile: Number
        }
    }
}
var schema = {
    type: Object,
    properties: {
        Code: Number,
        // 指明定义模型
        Data: 'personList',
        Message: String
    }
}
console.log(dataSchemaChecker.addSchema(personListSchema)) // true 表示添加成功
dataSchemaChecker.check(data, schema) // 校验成功
console.log(dataSchemaChecker.getWarnMsg().length === 0) // true 
```
