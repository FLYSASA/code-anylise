## 通用方法（utils.js）
`utils`对象，包含数据类型判断、数字转换、日期转换、异步请求、`localStorage`(本地存储)等。

### 类型判断

#### `utils.isType`
`utils.isType`函数返回值为判定基本数据类型的函数，内部是通过`Object.prototype.toString`方法实现。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | &nbsp; | 可选值： `Object/String/Boolean/Function/Date/Number/Array` |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-function">Function</span> | &nbsp; | 返回值为判断参数类型的函数 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var isArray = utils.isType('Array')
console.log(isArray([])) // true
console.log(isArray({})) // false 
```

---

#### `utils.isArray`
`utils.isArray`函数用于数据判断是否数组类型。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是数组类型，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isArray([])) // true
console.log(utils.isArray({})) // false 
```

---

#### `utils.isString`
`utils.isString`函数用于判断数据是否字符串类型。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是字符串数据，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isString('')) // true
console.log(utils.isString([])) // false 
```

---

#### `utils.isFunction`
`utils.isFunction`函数用于判断数据是否函数类型。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是函数，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isFunction(function(){})) // true
console.log(utils.isFunction([])) // false 
```

---

#### `utils.isDate`
`utils.isDate`函数用于判断数据是否日期类型。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是日期类型，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isDate(new Date())) // true
console.log(utils.isDate('2017-09-10')) // false 
```

---

#### `utils.isNumber`
`utils.isNumber`函数用于判断数据是否数字类型。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是数字类型，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isNumber(5)) // true
console.log(utils.isNumber('5')) // false 
```

---

#### `utils.isNumeric`
`utils.isNumeric`函数用于判断数据是否数值型数据，包括可转换为数字的字符串。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是数值型数据，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isNumeric(5)) // true
console.log(utils.isNumeric('5.5')) // true 
console.log(utils.isNumeric('5a')) // false 
```

---

#### `utils.isInt`
`utils.isInt`函数用于判断数据是否整数，包括可转换为整数的字符串数据。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是整数或是可转换为整数的字符串，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isInt(5)) // true
console.log(utils.isInt('5')) // true 
console.log(utils.isInt('a')) // false 
```

---

#### `utils.isNull`
`utils.isNull`函数用于判断数据是否`null`值。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是`null`值，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isNull(null)) // true
console.log(utils.isNull(undefined)) // false 
console.log(utils.isNull('')) // false 
```

---

#### `utils.isUndefined`
`utils.isUndefined`函数用于判断数据是否`undefined`值。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是`undefined`值，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isUndefined(undefined)) // true
console.log(utils.isUndefined(null)) // false 
console.log(utils.isUndefined('')) // false 
```

---

#### `utils.isNullOrUndefined`
`utils.isNullOrUndefined`函数用于判断数据是否`undefined`或者`null`。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是`undefined`或`null`，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isNullOrUndefined(undefined)) // true
console.log(utils.isNullOrUndefined(null)) // true 
console.log(utils.isNullOrUndefined('')) // false 
```

---

#### `utils.isEmpty`
`utils.isEmpty`函数用于判断数据是否空数据（`null`、`undefined`、`空字符串`）。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是`null`、`undefined`、`空字符串`，返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

console.log(utils.isEmpty(undefined)) // true
console.log(utils.isEmpty(null)) // true 
console.log(utils.isEmpty('')) // true 
console.log(utils.isEmpty(5)) // true 
```

---

#### `utils.isPlainObject`
`utils.isPlainObject`函数用于判断数据是否普通对象，不包含数组和函数。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> | <span class="">any</span> | &nbsp; | nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是普通对象，返回`true`，否则返回`false`。 |

* 调用实例

``` js

import utils from '@/static/js/utils.js'

console.log(utils.isPlainObject({})) // true
console.log(utils.isPlainObject([])) // false 
console.log(utils.isPlainObject(function(){})) // false 


```

---

### html元素操作

#### `utils.query`
`utils.query`函数用于查找`html`元素，返回第一个符合的元素，内部用`document.querySelector`实现。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | <span class="type type-string">String</span> | &nbsp; | 合法的`CSS`选择语法 |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-object">HTMLElement</span><br/><span class="">el</span> | &nbsp; | 传入参数`el`为非字符串时会原样返回；不存在时返回`null`；如果存在多个，只返回第一个； |

* 调用实例

``` html
<div id="app">
    <div class="inner-div">
    </div>
</div>
```
``` js
import utils from '@/static/js/utils.js'

var app = utils.query('#app') // 获得id为app的元素
var innerDiv = utils.query('.inner-div') // 获得样式类为inner-div的元素
var innerDiv2 = utils.query('#app .inner-div') // 获取id为app元素下样式类为inner-div的元素
console.log(innerDiv === innerDiv2) // true
var app2 = utils.query('#app, .inner-div') // 返回符合的第一个
console.log(app === app2) // true
```

---

#### `utils.queryAll`
`utils.queryAll`函数用于查找多个`html`元素，内部用`document.querySelectorAll`实现。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | <span class="type type-string">String</span> | &nbsp; | 合法的`CSS`选择语法 |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-array">NodeList</span> | &nbsp; | 传入参数`el`为非字符串时会原样返回；不存在时返回`null`；存在返回`nodeList`类数组； |

* 调用实例

``` html
<div id="app">
    <div class="inner-div">
    </div>
    <div class="inner-div">
    </div>
</div>
```

``` js
import utils from '@/static/js/utils.js'

var innerDivs = utils.queryAll('.inner-div') // 获得样式类为inner-div的元素
var innerDivs2 = utils.queryAll('#app .inner-div') // 获取id为app元素下样式类为inner-div的元素
console.log(innerDiv.length === innerDiv2.length) // true
```

---

#### `utils.isDom`
`utils.isDom`用于判断是`html`元素。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | any | &nbsp; | &nbsp; |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果是`html`元素，返回`true`，否则返回`false`。 |

* 调用实例

``` html
<div id="app">
</div>
```

``` js
import utils from '@/static/js/utils.js'

var app = utils.query('#app') // 获得样式类为 
console.log(utils.isDom(app)) // true
console.log(utils.isDom([])) // false
```

---

#### `utils.on`
`utils.on`用于给元素添加监听事件，内部用`addEventListener`实现。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | <span class="type type-object">HTMLElement</span> | &nbsp; | 需绑定元素 |
| <span class="prop-key" style="white-space:nowrap;">event</span> | <span class="type type-string">String</span> | &nbsp; | 绑定事件名称 |
| <span class="prop-key" style="white-space:nowrap;">handler</span> | <span class="type type-function">Function</span> | &nbsp; | 取消绑定事件执行函数 |

* 调用实例

``` html
<div id="app">
</div>
```

``` js
import utils from '@/static/js/utils.js'

utils.on(utils.query('#app'), 'click', function(event){
    console.log(event.target)
})
```

---

#### `utils.off`
`utils.off`用于取消元素添加的监听事件，内部用`removeEventListener`实现。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | <span class="type type-object">HTMLElement</span> | &nbsp; | 需取消绑定元素 |
| <span class="prop-key" style="white-space:nowrap;">event</span> | <span class="type type-string">String</span> | &nbsp; | 取消绑定事件名称 |
| <span class="prop-key" style="white-space:nowrap;">handler</span> | <span class="type type-function">Function</span> | &nbsp; | 取消绑定事件执行函数（`utils.on`绑定同一个函数） |

* 调用实例

``` html
<div id="app">
</div>
```

``` js
import utils from '@/static/js/utils.js'

var app = utils.query('#app')

var handler = function(event){
    console.log(event.target)
    // 执行一次取消绑定
    utils.off(app, 'click', handler)
}

utils.on(app, 'click', handler)
```

---

#### `utils.once`
`utils.once`用于绑定一次监听事件，监听函数只执行一次。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | <span class="type type-object">HTMLElement</span> | &nbsp; | 需绑定元素 |
| <span class="prop-key" style="white-space:nowrap;">event</span> | <span class="type type-string">String</span> | &nbsp; | 绑定事件名称 |
| <span class="prop-key" style="white-space:nowrap;">handler</span> | <span class="type type-function">Function</span> | &nbsp; | 绑定事件执行函数 |

* 调用实例

``` html
<div id="app">
</div>
```

``` js
import utils from '@/static/js/utils.js'

var app = utils.query('#app')

var handler = function(event){
    console.log('#app is clicked')    
}

utils.once(app, 'click', handler)
```

---

#### `utils.hasClass`
`utils.hasClass`判断元素是否有某个样式类。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | <span class="type type-object">HTMLElement</span> | &nbsp; | html元素 |
| <span class="prop-key" style="white-space:nowrap;">cls</span> | <span class="type type-string">String</span> | &nbsp; | 查找样式类名称 |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果存在某个样式类，返回`true`，否则返回`false` |

* 调用实例

``` html
<div id="app" class="root">
</div>
```

``` js
import utils from '@/static/js/utils.js'

var app = utils.query('#app')
utils.hasClass(app, 'root') // true
utils.hasClass(app, 'red') // false 
```

---

#### `utils.addClass`
`utils.addClass`判断元素添加样式类。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | <span class="type type-object">HTMLElement</span> | &nbsp; | html元素 |
| <span class="prop-key" style="white-space:nowrap;">cls</span> | <span class="type type-string">String</span> | &nbsp; | 查找样式类名称 |

* 调用实例

``` html
<div id="app" class="root">
</div>
```

``` js
import utils from '@/static/js/utils.js'

var app = utils.query('#app')
utils.addClass(app, 'red')
```

---

#### `utils.removeClass`
`utils.removeClass`判断元素添加样式类。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | <span class="type type-object">HTMLElement</span> | &nbsp; | `html`元素 |
| <span class="prop-key" style="white-space:nowrap;">cls</span> | <span class="type type-string">String</span> | &nbsp; | 查找样式类名称 |

* 调用实例

``` html
<div id="app" class="root">
</div>
```

``` js
import utils from '@/static/js/utils.js'

var app = utils.query('#app')
utils.removeClass(app, 'root')
```

---

#### `utils.getStyle`
`utils.getStyle`判断元素是否有某个样式类。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | <span class="type type-object">HTMLElement</span> | &nbsp; | `html`元素 |
| <span class="prop-key" style="white-space:nowrap;">styleName</span> | <span class="type type-string">String</span> | &nbsp; | 样式属性名称，多单词用骆驼式命名法（`backgroundColor`） |
| <span class="prop-key" style="white-space:nowrap;">defaultVal</span> | <span class="">any</span> | &nbsp; | 元素不存在样式属性时，指定返回的默认值，否则返回`null` |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="">any</span> | &nbsp; | 元素存在指定样式属性值，则返回，否则返回`null`或者指定的默认值。 |

* 调用实例

``` html
<div id="app" style="background-color:red;">
</div>
```

``` js
import utils from '@/static/js/utils.js'

var app = utils.query('#app')
utils.getStyle(app, 'backgroundColor') // red
utils.getStyle(app, 'backgroundImage') // null 
utils.getStyle(app, 'backgroundImage', '') // '' 
```

---

#### `utils.setStyle`
`utils.setStyle`判断元素是否有某个样式类。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">el</span> | <span class="type type-object">HTMLElement</span> | &nbsp; | html元素 |
| <span class="prop-key" style="white-space:nowrap;">styleName</span> | <span class="type type-string">String</span><br/><span class="type type-object">Object</span> | &nbsp; | 字符串时为样式属性名称；当为对象时可设置多个样式值 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="">any</span> | &nbsp; | 设置样式值 |

* 调用实例

``` html
<div id="app">
</div>
```

``` js
import utils from '@/static/js/utils.js'

var app = utils.query('#app')
utils.setStyle(app, 'background-color', 'red') // red
utils.setStyle(app, 'backgroundColor', 'red') // red
utils.setStyle(app, {
    'backgroun-color':'red', 
    'height':'100%'
})
```

---

### url参数类

#### `utils.getQueryString`
`utils.getQueryString`获取`url`上`query`参数，没匹配到返回`null`

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">queryName</span> | <span class="type type-string">String</span> | &nbsp; | 参数名称 |
| <span class="prop-key" style="white-space:nowrap;">url</span> | <span class="type type-string">String</span> | &nbsp; | 可选，默认为当前`url`(`window.location.href`) |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回字符串，不存在则返回`null` |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var url = 'http://localhost:8080/index?name=test'
utils.getQueryString('name', url) // 'test'
```

---

#### `utils.setQueryString`
`utils.setQueryString`给`url`设置`params`参数。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">queryObj</span> | <span class="type type-object">Object</span> | &nbsp; | 参数键值对 |
| <span class="prop-key" style="white-space:nowrap;">url</span> | <span class="type type-string">String</span> | &nbsp; | 可选，默认为当前`url`(`window.location.href`) |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回添加`queryObj`后的`url` |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var url = 'http://localhost:8080/example'
var params = {
    name: 'test',
    keyword: 'testing'
}
utils.setQueryString(params, url) // 'http://localhost:8080/example?name=test&keyword=testing'
```

---

### 日期类
#### `utils.parseDate`
`utils.parseDate`字符串转换日期类型。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">strDate</span> | <span class="type type-number">String</span> | &nbsp; | 需转成日期类型的字符串数据 |
| <span class="prop-key" style="white-space:nowrap;">defaultValue</span> | <span class="">any</span> | &nbsp; | 转换失败返回的默认值，默认为`null` |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-Date">Date</span><br/><span class="type type-null">null</span> | &nbsp; | 返回转换后的日期类型，转换失败返回`null`或者指定的`defaultValue` |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

// 支持连字符：/和-
var date = utils.parseDate('2017-07-27')
console.log(date === new Date(2017, 6, 27, 0, 0, 0)) // true

date = utils.parseDate('2017/07/27')
console.log(date === new Date(2017, 6, 27, 0, 0, 0)) // true

date = utils.parseDate('2017-07-27 14:10:33')
console.log(date === new Date(2017, 6, 27, 14, 10, 33)) // true

// 指定转换失败默认值
date = utils.parseDate('20170727', '')
console.log(date === '') // true

date = utils.parseDate('7/27/2017', '无效日期')
console.log(date === '无效日期')
```

---

#### `utils.formatDate`
`utils.formatDate`日期类型按指定格式转换成字符串。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">date</span> | <span class="type type-date">Date</span><br /><span class="type type-string">String</span> | &nbsp; | 需转换的日期类型或日期格式的字符串 |
| <span class="prop-key" style="white-space:nowrap;">fmt</span> | <span class="type type-string">String</span> | &nbsp; | 指定需转换日期字符串的格式，默认是`'yyyy-MM-dd hh:mm:ss'` |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回转换后的字符串，转换失败返回空字符串 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'


var date = new Date(2017, 6, 27) // 月份从0开始算，第二个参数6表示7月

var strDate = utils.formatDate(date)

// 返回默认格式
console.log(strDate === '2017-07-27 00:00:00') // true

// 返回指定格式
strDate = utils.formatDate(date, 'yyyy-MM-dd')
console.log(strDate === '2017-07-27') // true

date = new Date(2017, 6, 27, 14, 27)
strDate = utils.formatDate(date)
console.log(strDate === '2017-07-27 14:27:00')

strDate = utils.formatDate(date, 'yyyy-MM-dd')
console.log(strDate === '2017-07-27')

// 也可传日期格式字符串
strDate = utils.formatDate('2017-07-27 08:00', 'yyyy-MM-dd')
console.log(strDate === '2017-07-27') // true
```

---

#### `utils.getDateInterval`
`utils.getDateInterval`获取两个时间差，不符合日期格式返回`-1`或者指定默认值。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">start</span> | <span class="type type-date">Date</span><br /><span class="type type-string">String</span> | &nbsp; | 比较开始时间，日期类型或者日期格式字符串 |
| <span class="prop-key" style="white-space:nowrap;">end</span> | <span class="type type-date">Date</span><br /><span class="type type-string">String</span> | &nbsp; | 比较结束时间，日期类型或者日期格式字符串 |
| <span class="prop-key" style="white-space:nowrap;">unit</span> | <span class="type type-string">String</span> | &nbsp; | 单元，默认是毫秒，可用值：d（日）/h（小时）/m（分钟）/s(秒)/ms(毫秒) |
| <span class="prop-key" style="white-space:nowrap;">defaultValue</span> | <span class="">any</span> | &nbsp; | 当日期格式无效时返回指定的默认值 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-number">number</span> | &nbsp; | 返回时间差值，不符合日期格式返回`-1` |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var diff = utils.getDateInterval('2017-07-27', '2017-07-27', 'ms')
console.log(diff === 0) // true

diff = utils.getDateInterval('2017-07-27', '2017-07-28', 'ms')
console.log(diff === 1000 * 60 * 60 * 24) // true

utils.getDateInterval('2017-07-27', '2017-07-28', 's') === 60 * 60 * 24
utils.getDateInterval('2017-07-27', '2017-07-28', 'm') === 60 * 24
utils.getDateInterval('2017-07-27', '2017-07-28', 'h') === 24
utils.getDateInterval('2017-07-27', '2017-07-28', 'd') === 1
var start = new Date(2017, 6, 27, 15)
var end = new Date(2017, 6, 27, 16)
utils.getDateInterval(start, start, 'ms') === 0
utils.getDateInterval(start, end, 'ms') === 1000 * 60 * 60
utils.getDateInterval(start, end, 's') === 60 * 60
utils.getDateInterval(start, end, 'm') === 60
utils.getDateInterval(start, end, 'h') === 1
utils.getDateInterval(start, end, 'd') === 1 / 24
```

---

#### `utils.getDateByDaysApart`
`utils.getDateByDaysApart`获取相隔几天后的日期。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">date</span> | <span class="type type-date">Date</span><br /><span class="type type-string">String</span> | &nbsp; | 指定计算的日期或日期格式的字符串 |
| <span class="prop-key" style="white-space:nowrap;">number</span> | <span class="type type-number">Number</span> | &nbsp; | 指定相隔的天数 |
| <span class="prop-key" style="white-space:nowrap;">defaultValue</span> | <span class="">any</span> | &nbsp; | 转换日期失败或者参数`number`非数字时返回指定的默认值，默认返回`null` |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-date">Date</span><br/><span class="type type-null">null</span> | &nbsp; | 返回指定日期相隔`number`天的日期，参数异常返回`null`或者指定的`defaultValue` |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.getDateByDaysApart('2017-07-27', 0) === new Date(2017, 6, 27)
utils.getDateByDaysApart('2017-07-27', 3) === new Date(2017, 6, 30)
utils.getDateByDaysApart('2017-07-27', -1) === new Date(2017, 6, 26)
utils.getDateByDaysApart('2017-07-27 18:00', -0.5) === new Date(2017, 6, 27, 6)
utils.getDateByDaysApart(new Date(2017, 6, 27), 0) === new Date(2017, 6, 27)
utils.getDateByDaysApart(new Date(2017, 6, 27), 3) === new Date(2017, 6, 30)
utils.getDateByDaysApart(new Date(2017, 6, 27), -1) === new Date(2017, 6, 26)
utils.getDateByDaysApart(new Date(2017, 6, 27, 18), -0.5) === new Date(2017, 6, 27, 6)
```

---

#### `utils.setWorkDays`
`utils.setWorkDays`设置工作日。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">days</span> | <span class="type type-array">Array</span> | &nbsp; | 指定工作日，可选值：0到6，0表示周日，1表示周一，依此类推。 |


* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.setWorkDays([1, 2, 3, 4, 5]) // 设置周一到周五为工作日
console.log(utils.isWorkDay('2017-07-24')) // true
console.log(utils.isWorkDay('2017-07-25')) // true
console.log(utils.isWorkDay('2017-07-26')) // true
console.log(utils.isWorkDay('2017-07-27')) // true
console.log(utils.isWorkDay('2017-07-28')) // true
console.log(utils.isWorkDay('2017-07-29')) // false
console.log(utils.isWorkDay('2017-07-30')) // false
```

---

#### `utils.isWorkDay`
`utils.isWorkDay`判断是否工作日。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">date</span> | <span class="type type-date">Date</span><br/><span class="type type-string">String</span> | &nbsp; | 日期类型或者日期字符串。 |


* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.setWorkDays([1, 2, 3, 4, 5, 6]) // 设置周一到周五为工作日
console.log(utils.isWorkDay('2017-07-24')) // true
console.log(utils.isWorkDay('2017-07-25')) // true
console.log(utils.isWorkDay('2017-07-26')) // true
console.log(utils.isWorkDay('2017-07-27')) // true
console.log(utils.isWorkDay('2017-07-28')) // true
console.log(utils.isWorkDay('2017-07-29')) // true
console.log(utils.isWorkDay('2017-07-30')) // false
```

---

### 数学类
#### `utils.amountToChinese`
`utils.amountToChinese`数字金额返回转换汉字大写金额。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">amount</span> | <span class="type type-number">Number</span><br/><span class="type type-string">String</span> | &nbsp; | 数字或者可转换为数字的字符串 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回转换汉字大写金额 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var amount = '100';
console.log(utils.amountToChinese(amount)) // '壹百元整'
var amount2 = 100;
console.log(utils.amountToChinese(amount2)) // '壹百元整'
```

---

#### `utils.parseDecimal`
`utils.parseDecimal`用于数字转换小数格式。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">number</span> | <span class="type type-number">Number</span><br/><span class="type type-string">String</span> | &nbsp; | 数字或者可转换为数字的字符串 |
| <span class="prop-key" style="white-space:nowrap;">places</span> | <span class="type type-number">Number</span> | &nbsp; | 小数点位数，默认是2 |
| <span class="prop-key" style="white-space:nowrap;">min</span> | <span class="type type-number">Number</span> | &nbsp; | 最小值，可选；当number小于最小值时返回最小值 |
| <span class="prop-key" style="white-space:nowrap;">max</span> | <span class="type type-number">Number</span> | &nbsp; | 最大值，可选；当number大于最大值时返回最大值 |
| <span class="prop-key" style="white-space:nowrap;">defaultValue</span> | <span class="">any</span> | &nbsp; | 可选，指定传入`number`参数非数字时返回值，默认是`'0.00'` |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 小数格式字符串 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.parseDecimal(8, 2) // '8.00'
utils.parseDecimal(8, 4) // '8.0000'
```

---

#### `utils.parsePercent`
`utils.parsePercent`用于转百分比字符串。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">number</span> | <span class="type type-number">Number</span><br/><span class="type type-string">String</span> | &nbsp; | 数字或者可转换为数字的字符串 |
| <span class="prop-key" style="white-space:nowrap;">places</span> | <span class="type type-number">Number</span> | &nbsp; | 小数点位数，默认没有小数位 |
| <span class="prop-key" style="white-space:nowrap;">defaultValue</span> | <span class="">any</span> | &nbsp; | 可选，指定传入`number`参数非数字时返回值，默认是`''` |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回转百分比字符串 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.parsePercent(0) // '0%'
utils.parsePercent('0') // '0%'
utils.parsePercent('1') // '100%'
utils.parsePercent('0.9333') // '93%'
utils.parsePercent('0.9333', 2) // 93.33%
```

---

#### `utils.toThousands`
`utils.toThousands`数字型数据转千分位格式

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">number</span> | <span class="type type-number">Number</span><br/><span class="type type-string">String</span> | &nbsp; | 数字或者可转换为数字的字符串 |
| <span class="prop-key" style="white-space:nowrap;">places</span> | <span class="type type-number">Number</span> | &nbsp; | 小数点位数，默认没有小数位 |
| <span class="prop-key" style="white-space:nowrap;">defaultValue</span> | <span class="">any</span> | &nbsp; | 可选，指定传入`number`参数非数字时返回值，默认是`''` |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回转百分比字符串 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.toThousands('1000') // '1,000'
utils.toThousands(1000.22) // '1,000'
utils.toThousands('1000.22') // '1,000'
// 保留小数位
utils.toThousands(100, 1) // '100.0'
utils.toThousands(100, 2) // '100.00'
```

---

### 字符串类

#### `utils.trim`
`utils.trim`返回清除两边空格的字符串，注意：对原字符串不起作用。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">string</span> | <span class="type type-string">String</span> | &nbsp; | 字符串 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回清除两边空格的字符串 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var str = ' abc ';
console.log(utils.trim(str)) // abc
```

---

#### `utils.capitalize`
`utils.capitalize`返回首字母大写的字符串，注意：对原字符串不起作用。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">letter</span> | <span class="type type-string">String</span> | &nbsp; | 字符串 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回首字母大写的字符串 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var str = 'name';
console.log(utils.capitalize(str)) // Abc
var str2 = 'last name';
console.log(utils.capitalize(str2)) // Last name，只对第一个单词有效
```

---

#### `utils.camelCase`
`utils.camelCase`返回`camel`风格字符串，注意：对原字符串不起作用。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">name</span> | <span class="type type-string">String</span> | &nbsp; | 字符串 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回`camel`风格字符串 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var str = 'first-name';
console.log(utils.camelCase(str)) // firstName
var str2 = 'first_name';
console.log(utils.camelCase(str2)) // firstName
```

---

#### `utils.escapeHtml`
`utils.escapeHtml`编码字符串中的`html`。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">target</span> | <span class="type type-string">String</span> | &nbsp; | 字符串 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回编码后的`html`字符串。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.escapeHtml('&<>"\'') // '&amp;&lt;&gt;&quot;&#39;'
utils.escapeHtml('<h1>title</h1>') // '&lt;h1&gt;title&lt;/h1&gt;'
```

---

#### `utils.unescapeHtml`
`utils.unescapeHtml`解码字符串中的`html`

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">target</span> | <span class="type type-string">String</span> | &nbsp; | 字符串 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span> | &nbsp; | 返回编码后的`html`字符串。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.unescapeHtml('&amp;&lt;&gt;&quot;&#39;') // '&<>"\''
utils.unescapeHtml('&lt;h1&gt;title&lt;/h1&gt;') // '<h1>title</h1>'
```

---

### 数组对象类
#### `utils.unique`
`utils.unique`数组去重，返回去重后的新数组，如果数组项为对象，则引用地址相同的对象视为重复对象。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">arr</span> | <span class="type type-array">Array</span> | &nbsp; | 需去重的数组 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-array">Array</span> | &nbsp; | 返回去重后的数组；参数为非数组类型返回空数组。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.unique(['1', 4, 1]) // ['1', 4, 1]
utils.unique(['1', 4, '1', 1]) // ['1', 4, 1]
var obj = { a: 1 }
utils.unique([obj, { a: 1 }]) // [{ a: 1 }, { a: 1 }]
utils.unique([obj, obj]) // [{ a: 1 }]
```

---

#### `utils.merge`
`utils.merge`合并数组，返回合并的新数组。最后一个参数为`boolean`类型，表示是否去重，默认是不去重。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">args</span> | <span class="">any</span> | &nbsp; | 任意个参数 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-array">Array</span> | &nbsp; | 返回合并的新数组。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.merge(1, 2, 3, 1, 2) // [1, 2, 3, 1, 2]
utils.merge(1, 2, 3, 1, 2, true) // [1, 2, 3]
utils.merge(['1', 4, '1', 1]) // ['1', 4, 1]
utils.merge([1, 2], [1, 2]) // [1, 2, 1, 2]
utils.merge([1, 2], [1, 2], true) // [1, 2]
```

---

#### `utils.transpose`
`utils.transpose`数组元素互换位置/对象属性值互换。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">arr</span> | <span class="type type-array">Array</span><br/><span class="type type-object">Object</span> | &nbsp; | 对象或数组 |
| <span class="prop-key" style="white-space:nowrap;">index1</span> | <span class="type type-number">Number</span><br/><span class="type type-string">String</span> | &nbsp; | 调换数组项索引或者对象属性名称 |
| <span class="prop-key" style="white-space:nowrap;">index2</span> | <span class="type type-number">Number</span><br/><span class="type type-string">String</span> | &nbsp; | 调换数组项索引或者对象属性名称 |


* 调用实例

``` js
import utils from '@/static/js/utils.js'

var arr = [1, 2]
utils.transpose(arr, 0, 1)
console.log(arr[0]) // 2
console.log(arr[1]) // 1
var obj = { a: 'a', b: 'b' }
utils.transpose(obj, 'a', 'b')
console.log(obj.a) // 'b'
console.log(obj.b) // 'a'
```

---

#### `utils.forEach`

`utils.forEach`遍历数组和对象属性。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">data</span> | <span class="type type-array">Array</span><br/><span class="type type-object">Object</span> | &nbsp; | 对象或数组 |
| <span class="prop-key" style="white-space:nowrap;">callback</span> | <span class="type type-function">Function</span> | &nbsp; | 遍历执行函数 |


* 调用实例

``` js
import utils from '@/static/js/utils.js'

var arr = [1, 2, 3]
var newArr = []
var callback = function (value, key) {
    newArr.push(value + 1)
}
utils.forEach(arr, callback)
console.log(newArr) // [2, 3, 4]
var obj = { a: 1, b: 2, c: 3}
var newObj  = {}
utils.forEach(obj, function(val, key){
    newObj[key] = val + 1;
})
console.log(newObj) // {a:2, b:3, c: 4}
```

---

#### `utils.assign`

`utils.assign`将obj属性并入`target`对象中，类似`Object.assign`，不同之处在于默认不覆盖已存在属性。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">target</span> |<span class="type type-object">Object</span> | &nbsp; | 目标对象 |
| <span class="prop-key" style="white-space:nowrap;">obj</span> |<span class="type type-object">Object</span> | &nbsp; | 需覆盖的对象 |
| <span class="prop-key" style="white-space:nowrap;">bCover</span> |<span class="type type-boolean">Boolean</span> | false | 是否target对象已有属性 |
| <span class="prop-key" style="white-space:nowrap;">bDepth</span> | <span class="type type-boolean">Boolean</span> | false | 是否深度覆盖，默认false |

* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-object">Object</span> | &nbsp; | 返回`target`对象，若参数`target`或`obj`非普通对象，则将参数`target`原样返回。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var target = {
    a: 1
}

var obj = {
    a: 2, 
    b: {
        c: 4
    }
}

utils.assign(target, obj)
// 默认不覆盖已有属性
console.log(target.a) // 1
// 浅赋值，引用同一个对象
console.log(target.b === obj.b) // true
console.log(target.b.c) // 4

target = {
    a: 1
}
utils.assign(target, obj, true, true)
// 覆盖已有属性
console.log(target.a) // 2
// 深赋值，b属性非同一引用
console.log(target.b !== obj.b) // true

```

---

#### `utils.hasOwn`

`utils.hasOwn`判断对象是否拥有非继承的属性。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> |<span class="type type-object">Object</span> | &nbsp; | 判断对象 |
| <span class="prop-key" style="white-space:nowrap;">prop</span> |<span class="type type-string">String</span> | &nbsp; | 需判断的属性名称 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果存在返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var obj = {
    a: 1,
    b: 2
}

utils.hasOwns(obj, ['a', 'b']) // true
utils.hasOwns(obj, ['b','c']) // false

```

---

#### `utils.hasOwns`

`utils.hasOwns`判断对象是否同时拥有多个非继承属性。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> |<span class="type type-object">Object</span> | &nbsp; | 判断对象 |
| <span class="prop-key" style="white-space:nowrap;">props</span> |<span class="type type-string">String</span> | &nbsp; | 需判断的属性名称 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 如果存在返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

var obj = {
    a: 1
}

utils.hasOwn(obj, 'a') // true
utils.hasOwn(obj, 'b') // false

```

---

### 异步请求

#### `utils.http`
`utils.http`发起异步请求方法。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Object</span> | &nbsp; | 请求配置项 |

* **参数options (`Props`)**

|  属性名称  | 类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">type</span> | <span class="type type-string">String</span> | 'get' | 请求类型，默认是'get'请求 |
| <span class="prop-key" style="white-space:nowrap;">url</span> | <span class="type type-string">String</span> | &nbsp; | 请求地址 |
| <span class="prop-key" style="white-space:nowrap;">contentType</span> | <span class="type type-string">String</span> | 'application/x-www-form-urlencoded' | 请求消息主体编码 |
| <span class="prop-key" style="white-space:nowrap;">data</span> | <span class="type type-object">Object</span><br/><span class="type type-string">String</span> | &nbsp; | 请求数据，适用于options.type为'PUT', 'POST', and 'PATCH' |
| <span class="prop-key" style="white-space:nowrap;">params</span> | <span class="type type-object">Object</span> | &nbsp; | url参数，键值对形式 |
| <span class="prop-key" style="white-space:nowrap;">beforeSend</span> | <span class="type type-function">Function</span> | &nbsp; | 请求前钩子函数，函数参数是当前options |
| <span class="prop-key" style="white-space:nowrap;">success</span> | <span class="type type-function">function</span> | &nbsp; | 请求成功函数，函数第一个参数是请求返回数据；第二个参数是axios的response对象 |
| <span class="prop-key" style="white-space:nowrap;">error</span> | <span class="type type-function">Function</span> | &nbsp; | 请求失败执行函数,函数参数是错误消息error |
| <span class="prop-key" style="white-space:nowrap;">complete</span> | <span class="type type-function">Function</span> | &nbsp; | 请求执行完成函数，不管成功失败都会执行，函数参数成功时是返回数据，失败时是错误信息error |
| <span class="prop-key" style="white-space:nowrap;">dataType</span> | <span class="type type-string">String</span> | JSON | 请求返回数据类型 |
| <span class="prop-key" style="white-space:nowrap;">timeout</span> | <span class="type type-number">Number</span> | 配置默认值 | 请求超时时间，单位毫秒 |
| <span class="prop-key" style="white-space:nowrap;">context</span> | <span class="type type-object">Object</span> | 默认是window | 相关回调函数上下文 |
| <span class="prop-key" style="white-space:nowrap;">headers</span> | <span class="type type-object">Object</span> | &nbsp; | 请求头信息，键值对形式 |
| <span class="prop-key" style="white-space:nowrap;">host</span> | <span class="type type-string">String</span> | &nbsp; | 请求host |
| <span class="prop-key" style="white-space:nowrap;">crossSite</span> | <span class="type type-boolean">Boolean</span> | false | 是否跨域访问 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-object">Promise</span> | &nbsp; | 返回`Promise`对象。 |


* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.http({
    url: 'http://172.56.10.62:8010/Authorize',
    data: JSON.stringify({
        grant_type: 'password',
        username: 'demo',
        password: '123456'
    }),
    headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' },
    type: 'POST',
    contentType: 'application/json',
    success: function (data, res) { console.log(data) }
})
```

---

### 本地存储 `localStorage`
客户端存储数据，没有时间限制的数据存储。

#### `utils.localStorage.set`

`utils.localStorage.set`设置本地存储值。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> |<span class="type type-string">key</span> | &nbsp; | 存储字段名称 |
| <span class="prop-key" style="white-space:nowrap;">value</span> |<span class="type type-string">String</span><br/><span class="type type-object">Object</span> | &nbsp; | 为对象自动`JSON.stringify`处理 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 设置成功返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

utils.localStorage.set('username', 'demo')
console.log(window.localStorage.getItem('username')) // demo

```

---

#### `utils.localStorage.get`

`utils.localStorage.get`获取本地存储值。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">obj</span> |<span class="type type-string">key</span> | &nbsp; | 获取存储字段名称 |
| <span class="prop-key" style="white-space:nowrap;">defaultValue</span> | <span class="">any</span> | null | 指定不存在返回默认值 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-string">String</span><br/><span class="type type-null">null</span> | &nbsp; | 如果存在，返回该数据；不存在则返回指定默认值或者`null`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

window.localStorage.setItem('username', 'demo')
utils.localStorage.get('username') // demo
```

---

#### `utils.localStorage.remove`

`utils.localStorage.remove`删除指定名称的本地存储。

* **函数参数 (`Params`)**

|  参数名称  | 参数类型  |  默认值   |  说明  |
|-------|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">key</span> |<span class="type type-string">String</span> | &nbsp; | 移除存储字段名称 |


* **函数返回值 (`Return`)**

| 返回值类型 |  默认值   |  说明  |
|-------|-------|-------|
| <span class="type type-boolean">Boolean</span> | &nbsp; | 删除成功返回`true`，否则返回`false`。 |

* 调用实例

``` js
import utils from '@/static/js/utils.js'

window.localStorage.setItem('username', 'demo')
utils.localStorage.remove('username')
window.localStorage.getItem('username') // null
```

---

#### `utils.localStorage.clear`

`utils.localStorage.clear`清除所有的本地存储数据。


* 调用实例

``` js
import utils from '@/static/js/utils.js'

window.localStorage.setItem('username', 'demo')
window.localStorage.setItem('login', 'demo')
utils.localStorage.clear()
window.localStorage.getItem('username') // null
window.localStorage.getItem('login') // null
```