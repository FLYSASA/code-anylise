/* eslint-disable */
import base from './base'
import device from './device'

/**
 * 定位操作
 */
var position = {
    /**
     * 获取基站信息、GPS设备定位是否打开（true/false）、网络定位是否打开（true/false）
     */
    getPositionInfo () {
        if (!base.isApp()) {
            return null
        }

        var info = { cellInfo: GpsUtil.getCellIdInfo() }
        if (device.getOsName() === 'android') {
            info.gpsState = GpsUtil.getGpsState()
            info.netGpsState = GpsUtil.getNetGpsState()
        }

        return info
    },

    /**
     * 打开系统GPS定位设置界面
     */
    openGpsSetting () {
        if (base.isApp()) {
            GpsUtil.startGpsSetting()
        } else {
            alert('不支持定位。')
        }
    },

    /**
     * 定位（一般在首页调用）
     * @method App.position.startLocate
     * @param {function} callback 回调函数
     */
    startLocate (callback) {
        if (!base.isApp()) {
            callback({ code: '-1', msg: '不支持定位。' })
            return
        }
        var gps = window.gps
        if (!gps) {
            gps = new Gps()
            gps.onCallback = function () {
                var result = { code: '0' }
                if (gps.isSuccess()) {
                    result.data = {
                        latitude: gps.latitude,         // 纬度
                        longitude: gps.latitude,        // 经度
                        ocationtime: gps.locationtime,  // 定位成功时间
                        accuracy: gps.accuracy,         // 定位精度（单位：m，字符串类型，若获取失败则返回0）
                        altitude: gps.altitude,         // 定位高度（单位：m，字符串类型，若获取失败则返回0）
                        speed: gps.speed                // 移动速度（单位：m/s，字符串类型，若获取失败则返回0）
                    }
                } else {
                    gps.stopPosition()
                    result.code = '-1'
                    result.msg = '定位失败。'
                }
                callback(result)
            }
            gps.setTimeout(5000)    // 定位超时时间
            if (device.getOsName() === 'ios') {
                // gps.setLocationMode(2)  // 高精度定位模式（20米以内），本方法有bug，暂注释
            }
            window.gps = gps
        }
        gps.startPosition()
    }
}

export default position
