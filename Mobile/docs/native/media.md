**多媒体操作**部分，封装的是有关音视频的操作等。调用方式：<br/>
`App.media.方法名(参数)`

### startRecord (options)

开始录音。

``` js
App.media.startRecord({
    path: 'audio/oa',
    maxtime: 120
})
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">options</span> | <span class="type type-object">Json</span> | 参数，格式如下：<br/>`{`<br/>　　`path: "audio/oa",`// 生成文件的目录路径（不指定时则为sys:data/tmp，该目录在程序重启后会自动清理）<br/>　　`maxtime: 120`// 最大支持录音时间，单位：秒，范围：1-3600，默认60。如果指定本参数，建议给大一些，然后在想要的时间到达时手动调用stopRecord来停止录音，如：本来只想录音10秒，则参数可以给15秒，然后在10秒时手动停止录音（如果让录音在到达参数设定的时间自动停止，则部分手机上有可能获取不到音频文件的时长）。<br/>`}` |

无返回值。


---


### isRecord ()

是否正在录音。

``` js
App.media.isRecord()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | 若正在录音，返回true，否则返回false |


---


### stopRecord (callback)

停止录音。

``` js
App.media.stopRecord()
var audio = App.media.getRecordInfo()
// 输出：{ "path": "sys:data/tmp/record20171110174105.mp4", "time": 15}
alert(JSON.stringify(audio))
```

无返回值。


---


### getRecordInfo ()

获取录音文件信息。如果不通过回调函数获取录音文件，则也可以在录音停止后，通过本方法来手动获取录音文件信息。

``` js
var audio = App.media.getRecordInfo()

// 输出：{ "path": "sys:data/tmp/record20171110174105.mp4", "time": 15}
alert(JSON.stringify(audio))
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-object">Json</span> | 录音文件信息，格式如下：<br/>`{`<br/>　　`path: "xxx",`// 录音文件的路径<br/>　　`time: "xxx"`// 录音文件的时长，单位：秒<br/>`}` |


---


### beep (audioPath)

播放提示音。

``` js
App.media.beep('audio/oa/beep.wav')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">audioPath</span> | <span class="type type-string">String</span> | 需播放声音文件路径，若不提供则播放平台自带提示音，文件格式只支持wav |

无返回值。


---


### playVideo (videoPath)

调用系统视频播放器打开视频文件，支持播放本地及网络视频；Android支持播放mp4/wmv/3gp格式的视频，根据手机系统版本不同，支持播放的视频文件类型不同；iOS播放本地视频文件和流媒体文件，支持格式均是mp4/mov。

``` js
App.media.playVideo('audio/oa/users.mp4')
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">videoPath</span> | <span class="type type-string">String</span> | 视频文件路径 |

无返回值。


---


### playAudio (audioPath, isLooping)

播放本地音频。

``` js
App.media.playAudio('audio/oa/words.wav', false)
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">audioPath</span> | <span class="type type-string">String</span> | 需要播放的本地音频地址 |
| <span class="prop-key" style="white-space:nowrap;">isLooping</span> | <span class="type type-boolean">Boolean</span> | 是否循环播放，true循环播放，false只播放一次 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示文件存在且播放成功，false表示文件不存在或播放失败 |


---


### seekTo (position)

定位到音频的某一点并播放。

``` js
App.media.seekTo(300000)
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">position</span> | <span class="type type-number">Number</span> | 毫秒数，取值范围大于0小于音频文件时长 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示定位且播放成功，false表示定位播放失败 |


---


### pause ()

暂停播放音频。若已处于暂停状态或还未开始播放，调用该函数则返回false。

``` js
App.media.pause()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示暂停播放成功，false表示暂停播放失败 |


---


### resume ()

从暂停播放音频状态恢复播放。若已处于播放状态或还未开始播放，调用该函数则返回false。

``` js
App.media.resume()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示恢复播放成功，false表示恢复播放失败 |


---


### stop ()

停止播放音频。执行该函数后将清空音频播放配置项。若还未开始播放，调用该函数则返回false。

``` js
App.media.stop()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示停止播放成功，false表示停止播放失败 |


---


### volumeUp ()

调高音量，每次调整增加一格音量。

``` js
App.media.volumeUp()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-number">Number</span> | 调整后音量值 |


---


### volumeDown ()

降低音量，每次调整减少一格音量。

``` js
App.media.volumeDown()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-number">Number</span> | 调整后音量值 |


---


### setVolume (volume)

设置播放音频的音量。初始时若未通过该函数设置音量，则默认采用系统音量设置。

``` js
App.media.setVolume(5)
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">volume</span> | <span class="type type-number">Number</span> | 0到10的整数，代表静音到最大音量之间的位置 |

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示设置音量成功，false表示设置音量失败 |


---


### getVolume ()

获取当前设置播放音频的音量。

``` js
App.media.getVolume()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-number">Number</span> | 当前设置音量0-10的整数，初始时默认采用系统音量设置 |


---


### getDuration ()

读取当前播放的音频的总长度。

``` js
App.media.getDuration()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-number">Number</span> | 音频的长度，毫秒数；若未开始播放调用该函数返回0 |


---


### getStatus ()

获取音频当前播放状态。

``` js
App.media.getStatus()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-number">Number</span> | 0：未播放状态，1：正在播放状态，2：暂停状态 |


---


### getCurrentPosition ()

获取当前音频目前播放到的位置。

``` js
App.media.getCurrentPosition()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-number">Number</span> | 目前播放到的位置，毫秒数；若未开始播放调用该函数返回0 |


---


### isLooping ()

当前播放的音频是否设置为循环播放。

``` js
App.media.isLooping()
```

|  返回值  |  说明  |
|-------|-------|
| <span class="type type-boolean">Boolean</span> | true表示循环播放，false表示非循环播放；若未开始播放调用该函数返回false |