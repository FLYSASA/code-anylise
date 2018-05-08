import base from './base'
import device from './device'
import app from './app'
import cache from './cache'
import contact from './contact'
import position from './position'
import file from './file'
import photo from './photo'
import db from './db'
import media from './media'
import net from './net'
import message from './message'
import third from './third'

/**
 * App处理
 * @author chengam
 * @date 2017-08-15
 */
var App = {
    /**
     * 是否内嵌于App
     */
    isApp: base.isApp,

    /**
     * 是否桥接完成
     */
    isReady: base.isReady,

    /**
     * 执行App脚本
     */
    execScript: base.execScript,

    /**
     * 执行调用本地能力的方法（保证在桥接完成后执行）
     */
    execMethod: base.execMethod,

    /**
     * 打开业务模块页面
     */
    openModule: base.openModule,

    /**
     * 打开页面
     */
    openPage: base.openPage,

    /**
     * 设备操作
     */
    device,

    /**
     * 应用操作
     */
    app,

    /**
     * 缓存操作
     */
    cache,

    /**
     * 通讯操作
     */
    contact,

    /**
     * 定位操作
     */
    position,

    /**
     * 文件操作
     */
    file,

    /**
     * 图片操作
     */
    photo,

    /**
     * 数据库操作
     */
    db,

    /**
     * 多媒体操作
     */
    media,

    /**
     * 网络操作
     */
    net,

    /**
     * 消息处理
     */
    message,

    /**
     * 交互集成操作
     */
    third
}

export default App
