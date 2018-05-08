### 开发工具

开发工具主要有：

- `VS Code`：用来开发H5页面，打包H5应用。

- `MBuilder`：用来开发和配置App项目、运行模拟器测试、导出完整应用插件包和客户端资源包。

- `Exmobi手机基座`：用来对App进行测试。


---


### 开发和打包H5

按照H5的开发流程来开发H5页面，请参考：[H5开发流程](/flow/h5)

H5应用开发完成之后，使用命令`npm run buildapp`进行打包，打包后的`dist`文件夹要导入到App项目中使用。


---


### 开发App

#### <span class="vux-component-name">1、导入App项目</span>

在`MBuilder`中导入`Exmobi应用插件`，然后选择我们的App模板项目`h5app`，进行导入。

#### <span class="vux-component-name">2、配置App项目</span>

- 修改项目名。选中项目根目录`h5app`，按`F2`对它进行重命名，改为真实的项目名，需要和应用插件id保持一致，遵循一般的标识符命名规则；
- 修改App的配置文件，项目根目录下的`config.xml`，其内容如下：

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<config scope="client" clientversion="4" devicetype="all" theme="skin-default" updaterestart="true"> 
    <appid>h5app</appid>  
    <appname>赛普H5APP</appname>  
    <description>基于exmobi平台hybird移动应用。</description>  
    <version>2.1.06</version>  
    <date>2017-08-14</date>  
    <homepage src="res:page/login.uixml"/>  
    <faultconfig src=""/>  
    <access network="true" gps="true" camera="true" certificate="true" land="false" orientation="port"/>  
    <vendor email="" url="http://www.chinasapi.com/">赛普爱德</vendor>  
    <icon main="res:image/main.png" logo="res:image/logo.png"/> 
</config>
```

|  配置项  |  说明  |
|-------|-------|
| <span class="prop-key" style="white-space:nowrap;">appid</span> | 应用插件id，和项目名保持一致 |
| <span class="prop-key" style="white-space:nowrap;">appname</span> | App的名称 |
| <span class="prop-key" style="white-space:nowrap;">description</span> | App的描述 |
| <span class="prop-key" style="white-space:nowrap;">version</span> | App的版本号 |
| <span class="prop-key" style="white-space:nowrap;">date</span> | App的创建日期 |
| <span class="prop-key" style="white-space:nowrap;">homepage</span> | App的首页地址，默认是登录页，不需要更改 |
| <span class="prop-key" style="white-space:nowrap;">vendor</span> | 开发者信息 |
| <span class="prop-key" style="white-space:nowrap;">icon</span> | App在基座里的图标 |

- 修改服务端配置文件，`server`目录下的`map.xml`，主要是配置消息接口。参考：[消息配置](/native/message?id=%E6%B6%88%E6%81%AF%E9%85%8D%E7%BD%AE)

#### <span class="vux-component-name">3、引入H5代码发布包</span>

将`VS Code`打包好的H5应用的代码发布包`dist`复制到`h5app`项目的`h5app/client/page/phone/default/`目录下，可在Windows资源管理器中操作。后期将改进为，在H5项目打包完成时自动将`dist`复制到App项目中。

最终的App项目代码结构如下：

``` markdown
h5app
|-- server                              // 服务端代码目录
|   |-- api
|   |   |-- push.ac                     // 消息接口
|   |-- jsp
|   |   |-- push.jsp                    // 消息接口的代码实现
|   |-- xls
|   |-- map.xml                         // 服务端配置文件，目前主要用来配置消息接口
|-- client                              // 客户端代码目录
|   |-- css
|   |-- image
|   |-- page                            // 客户端页面目录
|   |   |-- pad                         // 平板的页面目录
|   |   |-- phone                       // 手机的页面目录
|   |       |-- default
|   |           |-- dist                // 用VS Code打包H5应用的代码包
|   |           |-- index.uixml         // App主页，用来内嵌H5主页（登录成功跳转到的页面）
|   |           |-- login.uixml         // App登录页，用来内嵌H5登录页
|   |           |-- module.uixml        // App业务模块页，用来内嵌业务模块的H5页面
|   |           |-- viewfile.uixml      // App预览文档页，用来内嵌访问文档的在线预览地址
|   |-- script                          // js脚本目录
|   |   |-- pad                         // 平板的脚本目录
|   |   |-- phone                       // 手机的脚本目录
|   |       |-- default
|   |           |-- home
|   |           |   |-- index.js        // App主页引用的js文件
|   |           |   |-- login.js        // App登录页引用的js文件
|   |           |   |-- module.js       // App业务模块页引用的js文件
|   |           |   |-- viewfile.js     // App预览文档页引用的js文件
|   |           |-- config.js           // App的基本配置js文件，主要用来配置H5登录页、H5主页的路径，App页面均引用了此文件
|   |           |-- core.js             // App的核心js文件，App页面均引用了此文件
|   |-- theme
|-- config.xml                          // App项目的配置文件
```

#### <span class="vux-component-name">4、修改H5入口页面配置</span>

修改`client`目录下的`script/phone/default/config.js`，配置登录页和主页的路径，如下：

``` js
var config = {
    // 登录页地址（H5登录页面，从dist目录的子级开始）
    loginUrl: 'demo_app/index.html',
    
    // 主页地址（H5主页面，从dist目录的子级开始）
    mainUrl: 'demo_app/home/index.html'
}
```

#### <span class="vux-component-name">5、调试和测试</span>

调试和测试的手段有多种：

- `模拟器调试`：由开发工具`MBuilder`提供，适合开发人员调试程序和自测；
- `Exmobi手机基座测试`：适合开发人员、测试人员进行测试；
- `usb或wifi真机调试`：适合开发人员自测、开发人员和测试人员联合测试（实时更新）。

如果要修改H5代码，则修改完代码之后重新打包，然后把重新打包后的`dist`目录覆盖到App项目中。

如果是Exmobi手机基座测试，每次修改好代码之后，需要修改`config.xml`，增大App的版本号，手机基座里才会提示App有新版本，然后在基座里手动更新App进行测试。

---


### 打包App

测试完成之后，就要对App进行打包和部署。打包需要的是App项目的客户端资源包，然后把它上传到[App打包网站](https://www.exmobi.cn/)进行打包。

#### <span class="vux-component-name">1、导出客户端资源包（C）</span>

选中App项目名，然后点击`MBuilder`工具栏里的`导出应用插件-客户端资源包`按钮（该按钮图标上带有英文字母`C`），就打开了导出客户端资源包的对话框，选择保存路径之后就可以进行导出操作了。

导出的客户端资源包是一个名称为项目名的`.zip`压缩文件，如：`h5app.zip`。

#### <span class="vux-component-name">2、打安装包</span>

登录[App打包网站](https://www.exmobi.cn/)（开发人员可以自己注册一个账号，也可以使用公司提供的账号），在它的控制台的`Exmobi`菜单下，新建一个项目（名称是App的项目名）；然后进入这个项目，在这个项目之下创建两个应用，分别是Android和iOS应用；在应用之下，就可以上传App的客户端资源包，进行打包操作了。

提交打包操作之后，等待一段时间（几分钟到十几分钟不等），就可以在应用下面下载App的安装包了。下载的是`.zip`文件，解压后里面有App安装包文件。Android系统的App安装包的扩展名是`.apk`，iOS系统的App安装包的扩展名是`.ipa`。

注意：在打iOS系统的App安装包之前，还要将苹果App的证书上传到打包网站，证书扩展名是.mobileprovision，从苹果官网获取。比如，我们公司使用的是苹果的企业开发者账号，用这个账号登录[Apple Developer Enterprise Program](https://developer.apple.com/programs/enterprise/cn/)就可以进行相关App的证书申请和下载。

有关苹果证书的申请、App的打包，请参考之前的培训资料，这里不再详述。

---


### 部署App

部署App需要的是App项目完整的应用插件包，然后把它上传到App服务器进行部署。App服务器就是Exmobi移动应用平台，公司有三个App服务器，分别是：
- 用于产品开发和测试的App服务器（8005端口）
- 用于项目开发和测试的App服务器（8003端口）
- 为客户提供服务的的App服务器（部署在阿里云）

还有一个用于安装苹果企业版App的`.plist`文件的https站点（七牛空间）。

#### <span class="vux-component-name">1、导出应用插件包（S）</span>

选中App项目名，然后点击`MBuilder`工具栏里的`导出完整应用插件包`按钮（该按钮图标上带有英文字母`S`），就打开了导出应用插件包的对话框，选择保存路径之后就可以进行导出操作了。

导出的应用插件包是一个`.zip`压缩文件，如：`package&phone&default.zip`。

#### <span class="vux-component-name">2、部署应用插件包</span>

- 登录App服务器，进入`项目管理-项目管理`菜单，新建应用插件，将应用插件包进行上传，然后进行一些配置，即可完成应用插件的创建。
- 进入`推送通知服务-应用管理`菜单，创建两个应用，分别是Android和iOS应用，输入App的应用ID和名称，iOS应用还需要上传推送证书，即可完成应用的推送配置。

#### <span class="vux-component-name">3、部署App安装包</span>

- 从打包网站下载App安装包文件（下载的是`zip`压缩文件，解压后取里面的`.ipa`和`.apk`文件），上传到App服务器（或者客户的应用服务器）。
- 配置plist文件并部署为https地址（如上传到七牛空间）。
- 将`.apk`文件的地址、`.plist`文件的地址、App下载页的地址配置到应用系统中。

有关App部署的详细内容，请参考之前的培训资料，这里不再详述。

---


### 更新App

若App有更新，在完成代码的修改之后，按以下步骤进行操作：

- 修改`config.xml`，提升App的版本号；
- 导出应用插件包（S）；
- 部署应用插件包（S）。

后两步的操作和部署App的步骤基本一致（已经配置过的信息无需再次配置）。


---


### 安装测试

将打包好的App安装包（`.ipa`和`.apk`文件）上传到App服务器（如果是为客户部署App，则也可以放在客户的服务器上，如EAP站点上），配置好Android和iOS的App下载地址，然后就可以用手机访问App下载页进行App的下载安装，最后来进行真实的App测试。

有关配置App安装包路径、App下载路径，请参考之前的培训资料，这里不再详述。