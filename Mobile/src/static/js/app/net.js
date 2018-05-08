/* eslint-disable */
import base from './base'

/**
 * 网络操作
 */
var net = {
    /**
     * 判断是否有网络连接
     * @method App.net.isNetConnected
     */
    isNetConnected () {
        return base.isApp() ? NetworkUtil.getConnectState() : navigator.onLine
    },

    /**
     * 获取设备当前网络连接类型（返回：0:无网络/1:WIFI/2:移动网络）
     * @method App.net.getConnectionType
     */
    getConnectionType () {
        return base.isApp() ? NetworkUtil.getConnectionType() : ''
    },

    /**
     * 获取当前网络分配的ip地址
     * @method App.net.getConnectionType
     */
    getNetIp () {
        return base.isApp() ? NetworkUtil.getNetIp() : ''
    },

    /**
     * 打开系统的网络设置界面
     */
    openNetSetting () {
        if (base.isApp()) {
            NetworkUtil.startConnectSetting()
        } else {
            alert('不支持网络设置。')
        }
    }
}

export default net
