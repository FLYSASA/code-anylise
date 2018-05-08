**缓存操作**部分，封装的是有关缓存的操作，如：缓存的设置、获取、清空等。调用方式：<br/>
`App.cache.方法名(参数)`

### set (key, value)

设置本地缓存（默认缓存3天，打包时可设置缓存天数）。

``` js
App.cache.set('token', 'Xh9iZmzLaDNRJAiUvw5ia37WXLIi13LPNEfwKWTGqpS')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">key</span> | <span class="type type-string">String</span> | 缓存数据的键值 |
| <span class="prop-key" style="white-space:nowrap;">value</span> | <span class="type type-string">String</span> | 缓存数据的值 |

无返回值。


---


### get (key)

获取本地缓存。

``` js
App.cache.get('token')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">key</span> | <span class="type type-string">String</span> | 缓存数据的键值 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-string">String</span> | 缓存数据的值 |


---


### remove (key)

移除缓存数据中保存的指定key的数据值。

``` js
App.cache.remove('token')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">key</span> | <span class="type type-string">String</span> | 要清理的缓存数据的键值 |

无返回值。


---


### clear ()

清理缓存数据中保存的所有数据。

``` js
App.cache.clear()
```

无返回值。


---


### clearAppCache ()

清理App缓存（清理网络图片缓存，预览缓存等一系列缓存数据）。

``` js
App.cache.clearAppCache()
```

无返回值。


---


### clearWebviewCache ()

清理Webview浏览器缓存。

``` js
App.cache.clearWebviewCache()
```

无返回值。