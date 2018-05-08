**图片操作**部分，封装的是有关图片的操作，如：拍照、扫码、缩放、涂鸦等。调用方式：<br/>
`App.photo.方法名(参数)`

### camera (options)

拍照/摄像。

``` js
App.photo.camera({
    callback: function (data) {
        // data格式：{ path: 'sys:data/files/xxx', url : '../../xxx'}
        alert(data.path + '\n' + data.url)
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`pwidth: 'xxx',`  // 拍照后生成图片的宽度像素值，数字，若不提供则图片不进行尺寸压缩<br/>　　`compress: 'xxx',`  // 图片压缩后质量比，数字，取值[1~100]，默认100（1:按最高压缩比压缩/100:不压缩，不宜设置过小）<br/>　　`savePath: 'xxx',`  // 拍照后保存图片的临时目录（不指定时则默认为sys:data/tmp，该目录在程序重启后会自动清理）<br/>　　`callback: callbackFun`  // 拍照窗口结束回调函数，参数为所拍图片的路径<br/>`}` |

无返回值。


---


### scan (callback)

扫码。

``` js
App.photo.scan(function (data) {
    alert(data)
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`callback: callbackFun`  // 解码结束回调函数，参数为解码结果<br/>`}` |

无返回值。


---


### selectImage (options)

选择图片（首先将选中的图片复制（设置了pwidth则会转换图片尺寸）到临时路径，然后再用临时路径里的图片路径返回）。

``` js
App.photo.selectImage({
    callback: function (paths) {
        if (paths.length) {
            for (var data of paths) {
                // data格式：{ path: 'sys:data/files/xxx', url : '../../xxx'}
                alert(data.path + '\n' + data.url)
            }
        }
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`pwidth: 'xxx',`  // 选择图片后图片转换的宽度像素值，数字，若不提供则图片不进行尺寸压缩<br/>　　`nums: 'xxx',`  // 选择总图片最大张数限制，数字，默认值为1<br/>　　`savePath: xxx`  // 选择图片后图片复制到的临时目录（不指定时则默认为sys:data/tmp，该目录在程序重启后会自动清理）<br/>　　`callback: callbackFun`  // 选择图片完成后执行的回调函数，参数为已选中图片路径的数组（若未选择则是空数组）<br/>`}` |

无返回值。


---


### scaleImage (options)

缩放图片（首先将选中的图片复制（设置了pwidth则会转换图片尺寸）到临时路径，然后再用临时路径里的图片路径返回）。

``` js
App.photo.scaleImage({
    sourcePath: 'abc/def.jpg',
    savePath: 'imgs/mini',
    mode: '0',
    callback: function (result) {
        // result格式：
        // mode为'0'时： { code, source, target, width, compress }
        // mode为'1'时： { code, source, target, rate }
        // mode为'2'时： { code, source, target, size }
        // 说明：
        // code：回应状态码，数字[0,-1]。0：压缩图片成功；-1：压缩图片失败
        // source：需要转换原图片路径
        // target：生成压缩后图片路径
        // width：缩放后图片的宽度，单位px
        // compress：图片压缩后质量比，数字类型，取值[1~100]
        // rate：图片尺寸缩放比例，数字类型，取值[0-1]
        // size：压缩后图片尺寸，数字，以k为单位
        alert(JSON.stringify(result))
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`sourcePath: 'xxx',`  // 原图路径<br/>　　`savePath: 'xxx',`  // 生成缩放后图片路径，可以是目录或带路径的文件名，若不提供则原图压缩替换<br/>　　`mode: '0'`  // 图片缩放模式，0:按宽度缩放/1:按比例缩放/2:按图片文件大小缩放<br/>　　`width: 'xxx',`  // 缩放后图片的宽度，数字，单位px，图片高度会等比缩放（按宽度缩放）<br/>　　`compress: 'xxx',`  // 图片压缩后质量比，数字，取值[1~100]，若不设置则默认100质量不压缩（按宽度缩放）<br/>　　`rate: 'xxx',`  // 图片尺寸缩放比例，数字，取值[0-1]，若不设置则默认0.5（按比例缩放）<br/>　　`size: 'xxx',`  // 压缩后图片大小，数字，单位kb，实际的大小不会很准确，可能略大于或略小于目标大小（按文件大小缩放）<br/>　　`callback: callbackFun`  // 缩放结果回调函数，参数为缩放信息<br/>`}` |

无返回值。


---


### paintImage (options)

图片涂鸦。

``` js
App.photo.paintImage({
    sourcePath: 'abc/def.jpg',
    callback: function (data) {
        // data格式：{ path: 'sys:data/files/xxx', url : '../../xxx'}
        alert(data.path + '\n' + data.url)
    }
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`sourcePath: 'xxx',`  // 原图路径<br/>　　`savePath: 'xxx',`  // 生成图片文件路径（不指定时则默认为sys:data/tmp，该目录在程序重启后会自动清理）<br/>　　`callback: callbackFun`  // 涂鸦结果回调函数，参数为编辑后生成图片的路径<br/>`}` |

无返回值。


---


### openImage (path)

查看图片文件。支持查看jpg/jpeg/png/gif类型图片。

``` js
App.photo.openImage('abc/def.jpg')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">path</span> | <span class="type type-string">String</span> | 图片路径，从根开始 |

无返回值。


---


### openBase64Image (content)

调用系统图片查看器打开被base64编码过的图片数据。

``` js
App.photo.openBase64Image('iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAF5SURBVHja7JjdUcJAEIA/GAtICbEC2QqMHWAFkAqUCtAKHCqAErACoYLDCqSEdIAv6wyTUUNyOzkYdl8yc7kk++1fdm9wOBy4ZBly4XIT+wIRqS+NgAK4A3Jd2wGfwBqojjeHENICHEkBzPX62z2AJbACZnWQ1CH0Bnz8oXxdpsDXiXt7AVgCzy2fyRR4nBRARF7Uop3hRSRPAqAfnkcaMFMPJvHAk1Xyx3ghBmCMnUx7BVCL5YYA9317wFL5624lrhMghLAx1mOfwgNrQ4D3FAALK+uHENa9A2gYWYTSLGUSP0a2xasY60cDhBAq4KEjxAooz6GM7oDbFkldadiUFglkAZDpGLlQxfYNlatU6JEFwKDNqYSI1Oddi6mqUqAdsAU2Gpp2ADq4THrsgTbA6yk/zEYAEVlGTl1RVa6pSg0blC8SKv9zWBCVxJPEvVquedcZ4Bz6/uLS2+nM5wEHcAAHcAAHcAAHcAAHcAAH6DTUuwcc4H/5HgBxbV9G31j8nQAAAABJRU5ErkJggg==')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">content</span> | <span class="type type-string">String</span> | 图片的base64编码字符串 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | 若内容非base64编码的图片数据则返回false |