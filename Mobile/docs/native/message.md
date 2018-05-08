**消息处理**部分，封装的是有关消息推送和接收的操作。

### 消息配置

有关消息的配置，在App项目代码的`server/map.xml`文件中定义，其内容如下：

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<maxml version="2.0" xmlns="http://www.nj.fiberhome.com.cn/map"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.nj.fiberhome.com.cn/map maxml-2.0.xsd">
    <services>
        <http-service-ext extfile="push.ac" />
    </services>
	<config>
        <htmlformat wellformat="true" />
        <session type="stateless" />
        <!-- 消息类型描述，用|连接，顺序索引和推送的新消息的索引保持一致 -->
        <customparam name="msg_type" value="待模拟验房|交付验房待接单|模拟验房问题待整改|交付验房问题待整改" />
        <!-- 消息数量的单位，如：项、条、个，默认为项  -->
        <customparam name="msg_unit" value="项" />
        <!-- 消息标题（iOS无效）  -->
        <customparam name="msg_title" value="消息" />
        <!-- 消息的内容模板，{0}是新消息内容，其中{1}是消息总数，消息内容如：模拟验房12项,交付验房20项 -->
        <customparam name="msg_template" value="您有新到工作：{0}；您的待办工作一共有{1}项。" />
        <!-- 消息内容的字节上限（iOS消息限制较小）  -->
        <customparam name="msg_limit_size" value="176" />
	</config>
</maxml>
```

|  配置项  |  说明  |
|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">msg_type</span> | 消息类型的名称，用 &#124; 连接，顺序索引和推送消息的索引保持一致；App接收的所有消息种类，全部配置在这里，如： `待模拟验房`&#124;`交付验房待接单`&#124;`模拟验房问题待整改`&#124;`交付验房问题待整改`|
| <span class="prop-key" style="white-space:nowrap;">msg_unit</span> | 消息数量的单位，如：项、条、个，默认为：`项` |
| <span class="prop-key" style="white-space:nowrap;">msg_title</span> | 推送消息的标题（iOS无效），默认为：`消息` |
| <span class="prop-key" style="white-space:nowrap;">msg_template</span> | 消息的内容模板，默认为：`您有新到工作：{0}；您的待办工作一共有{1}项。`，其中`{0}`是新消息内容，`{1}`是消息总数，消息内容的格式：`消息类型+消息数量+单位`，如果一次推送多种消息，则用逗号连接，如：`模拟验房12项,交付验房20项` |
| <span class="prop-key" style="white-space:nowrap;">msg_limit_size</span> | 消息内容的字节上限（iOS消息限制较小），默认为iOS允许的最大值：`176`（iOS允许的消息字节数最大值是256，App平台会占用一部分，实际的消息字节限制只有176）；消息的内容如果超出这个限制，超出部分会显示为`...` |

<p class="tip">
    一般情况下，只需要配置`msg_type`即可。
</p>


---


### 消息接口


消息接口，接收业务系统传输的消息数据，将消息数据进行处理（根据`server/map.xml`文件中定义的消息配置），再推送给手机。

- 消息接口地址，如：`http://rmis.ideasoft.net.cn:8005/process/service/h5app/push`，其中`rmis.ideasoft.net.cn:8005`为App服务器地址（如阿里云上的App服务器地址），`h5app`应用插件id，其他部分固定
- 请求方式，固定为`POST`
- 参数，消息参数名固定为`data`，是将消息数据包装为json数组，然后进行序列化后得到的字符串；消息数据的格式如下：

``` js
[{
    "device": "861337031369386",
    "clientid": "gaeaclient-android-000004",
    "cnt": 43,
    "new": [{
        "0": 3
    },
    {
        "1": 5
    },
    {
        "3": 8
    }]
},
{
    "device": "udid8f2158ab9e9603ce",
    "clientid": "gaeaclient-ios-000007",
    "cnt": 27,
    "new": [{
        "4": 4
    },
    {
        "6": 2
    },
    {
        "7": 3
    }]
}]
```

|  参数  |  类型  |  说明  |
|-------|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">device</span> | <span class="type type-string">String</span> | ens，设备序列号 |
| <span class="prop-key" style="white-space:nowrap;">clientid</span> | <span class="type type-string">String</span> | 客户端id |
| <span class="prop-key" style="white-space:nowrap;">cnt</span> | <span class="type type-number">Number</span> | 消息总数量，如待办工作的总数量 |
| <span class="prop-key" style="white-space:nowrap;">new</span> | <span class="type type-array">Array</span> | 本次新消息的数量集合，是键值对的数组，每个数组元素表示一种新消息，key是消息类型索引（和消息配置项`msg_type`定义的消息类型的顺序索引一致），value是新消息数量 |

- 返回值，为xml格式，如下：

``` xml
<rsp>
    <pushnotifyrsp>
        <pnsIdentifier>d67d568a-7ada-44da-8117-0028993bfb47</pnsIdentifier>
        <msg>成功</msg>
        <result>0</result>
        <title>您有新到工作：模拟验房问题待整改10项,日常检查问题待甲方复验73项,安全文明问题待整改34项,验收单待阅读54项,待模拟验房9项,日...</title>
        <esn>861337031369386</esn>
    </pushnotifyrsp>
</rsp>
<rsp>
    <pushnotifyrsp>
        <pnsIdentifier>39473239-dcf0-4b8e-b52c-66261c353b57</pnsIdentifier>
        <msg>成功</msg>
        <result>0</result>
        <title>您有新到工作：交付验房问题待整改6项,安全文明问题待整改25项；您的待办工作一共有48项。</title>
        <esn>udid8f2158ab9e9603ce</esn>
    </pushnotifyrsp>
</rsp>
```

|  节点名称  |  说明  |
|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">rsp</span> | 响应体节点 |
| <span class="prop-key" style="white-space:nowrap;">pushnotifyrsp</span> | 单条推送消息的推送报告节点 |
| <span class="prop-key" style="white-space:nowrap;">pnsIdentifier</span> | PNS推送标识，可凭此标识获取推送状态报告 |
| <span class="prop-key" style="white-space:nowrap;">msg</span> | 具体推送结果描述 |
| <span class="prop-key" style="white-space:nowrap;">result</span> | 0：正常，其他都为失败 |
| <span class="prop-key" style="white-space:nowrap;">title</span> | 推送消息标题 |
| <span class="prop-key" style="white-space:nowrap;">clientid</span> | 客户端id |
| <span class="prop-key" style="white-space:nowrap;">esn</span> | 推送消息填入的esn信息，推送请求中设置了esn，响应中也会有esn |

<p class="tip">
    当手机不在线或安卓手机未启动App时，消息接口返回失败消息，但并不意味着消息就不会推送到手机。推送失败的消息会暂存在App服务器上，默认1天有效期。当手机在有效期内重新上线或安卓手机启动了App，App服务器会重新将消息推送到手机。更准确的推送结果，请进入App服务器管理平台查看。
</p>


---


### 消息推送

消息的推送，由业务系统来完成，一般是在Windows服务中来推送。用户有新消息时，将向App服务器的消息接口发起请求，将消息数据作为参数传递给消息接口。

消息接口接收的参数data，是消息数据，格式在消息接口一节已有说明。调用消息接口，进行消息推送的关键代码如下：

``` c#
// 构造POST参数，发起推送请求（msgs是消息数据对象数组，格式符合消息接口一节中有关data参数的说明）
string strPushUrl = "http://rmis.ideasoft.net.cn:8005/process/service/h5app/push";
Dictionary<string, string> param = new Dictionary<string, string> { { "data", Newtonsoft.Json.JavaScriptConvert.SerializeObject(msgs) } };
string strResult;
if (HttpHelper.HttpPost(strPushUrl, param, null, out strResult))
{
    // 请求成功，分析推送结果

    // 
    // 此处由业务系统后端开发人员对推送结果进行分析和处理（如记录日志）
    // （推送日志在App服务器已有记录，此处也可暂不处理）
    // 
}
else
{
    strResult = "任务:" + context.JobDetail.Description + "[App端]执行失败，" + strResult;
    Logger.Error(new Exception(strResult), strResult);
}
```

<p class="tip">
    目前已开发的几个产品（如：EAP、数字品质）的消息推送服务，都是定期（如每5分钟）获取本周期内用户的新消息，然后再调用消息接口进行消息推送。虽然可以通过配置更短的推送周期（如每1分钟）来使消息推送更加及时，但仍然还不是实时的消息推送。
    <br/><br/>
    一种建议的消息推送的方式是：业务系统中一产生消息，就立刻将消息推入消息队列；消息推送服务实时监控消息队列，只要有消息入列，就调用消息接口进行消息推送。
</p>


---


### 消息接收

定义全局的window.onpush事件，用来接收消息进行提示，或者触发更新页面上的消息数量、App桌面图标右上角的气泡角标数字。请参考消息推送事件：[window.onpush](/native/base?id=window-onpush)

如果手机收不到推送消息，从以下方面对手机设置进行排查：

- 允许显示通知；
- 允许锁屏时显示通知；
- 允许通知时亮屏；
- 允许指示灯闪烁、显示通知内容预览、在屏幕顶部悬浮显示通知等（按需设置）；
- 允许后台运行；
- 允许锁屏后保持运行；
- 允许锁屏后保持连接；
- 允许开机启动，以免手动关闭进程或者重启机器后，进程无法开启；
- 设为受保护的软件或信任软件；
- 耗电应用管理里设置允许应用待机（若支持）；
- 将应用添加到一键清理、一键加速、一键优化、清理内存、内存加速等的白名单中。

更多信息，请参考：[Android推送常见问题](https://bbs.exmobi.cn/notice/detail.html?id=28KRoL6X9jx3uQCZ)


---


### 消息交互逻辑

#### <span class="vux-component-name">待办数字</span>

待办工作数字，一般是在主页显示。在使用App过程中，经常要进行页面的切换、程序的最小化等操作，可以通过以下这些处理来保证主页的待办数字永远是最新的：

- 登录成功进入首页时，获取待办数量，在首页红框中显示待办数量；
- 从内页返回到首页时，获取待办数量，更新主页上的待办数字；
- 在主页最小化后再次激活App回到主页时，获取待办数量，更新主页上的待办数字；
- 在主页停留时，如果有推送消息到达，获取待办数量，更新主页上的待办数字。


#### <span class="vux-component-name">待办工作清单页</span>

待办工作清单，如：待审批清单、新邮件清单、待整改问题、待填报进度的计划等等。在这些待办工作的清单页面，点击一条记录，进入工作明细页面进行办理操作，办理完再回到清单页面。
从清单页进入明细页，并不是关闭清单页，而是滑动进入清单页上方。
如果办理成功，那么这条工作就算完成了，应该从待办工作清单中去除，回到清单页面将看不到这条待办工作记录；如果办理不成功，那么回到清单页，待办工作清单记录没有变化。
通过以下的处理可以来实现这样的要求：

- 在待办工作清单页面进入明细页面之前，将清单页面的当前页码记录下来（如第3页）；
- 在办理工作明细页面，提交办理操作，获取操作结果；
- 如果明细页的办理操作成功，则返回到清单页面后，重新获取并刷新待办工作清单（获取数据的页码和之前一致，如获取前3页数据）；
- 如果明细页的办理操作失败，则返回到清单页面后，不需要做任何操作；
- 在待办工作清单页面停留时，如果有推送消息到达，重新获取并刷新待办工作清单（获取数据的页码和当前一致，如获取前3页数据）。

#### <span class="vux-component-name">带状态的清单页</span>

收件箱、新闻清单、公告清单等页面，一般带了是否阅读的状态图标。点击一条记录，进入明细页面，则清单页面的记录改变阅读状态（将未阅图标换成已阅图标）。

#### <span class="vux-component-name">注意事项</span>

- 待办工作数字的显示和刷新，遵循的原则是：`从隐藏到显示`（如进入页面时）、`在显示状态下直接更新数字`（如在已打开的页面上刷新数字）。千万不要有：`显示->隐藏->显示`这样的过程（有闪烁现象，极不友好）；
- 清单页面数据的刷新，遵循的原则是：`从无到有`（如进入页面时）、`在显示已有清单数据的情况下直接更新清单`(如在已打开的页面上刷新清单数据，更佳的做法是：`刷新清单之后，内容滚动到之前的scrollTop`)；
- 更多的效果，应该由业务需求来定。