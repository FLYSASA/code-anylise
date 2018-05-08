/* eslint-disable */
import base from './base'

/**
 * 设备操作
 */
var device = {
    /**
     * 获取操作系统（返回：ios/android/wp8等）
     * @method App.device.getOsName
     */
    getOsName () {
        return base.isApp() ? DeviceUtil.getOs() : 'pc'
    },

    /**
     * 获取操作系统版本
     * @method App.device.getOsVersion
     */
    getOsVersion () {
        return base.isApp() ? DeviceUtil.getOsVersion() : ''
    },

    /**
     * 获取设备类型（返回：phone:手机/pad:平板/pc:电脑）
     * @method App.device.getType
     */
    getType () {
        return base.isApp() ? DeviceUtil.getDeviceType() : 'pc'
    },

    /**
     * 获取设备型号（如：htc 6950）
     * @method App.device.getModel
     */
    getModel () {
        return base.isApp() ? DeviceUtil.getPhoneModel() : 'pc'
    },

    /**
     * 获取设备的设备序列号（iphone、wp8无法获得，返回的是内部自定义字符串）
     * @method App.device.getEsn
     */
    getEsn () {
        return base.isApp() ? DeviceUtil.getEsn() : ''
    },

    /**
     * 获取设备mac值
     * @method App.device.getMac
     */
    getMac () {
        return base.isApp() ? DeviceUtil.getMac() : ''
    },

    /**
     * 根据appid获取App信息
     * @method App.device.getApp
     */
    getApp (appId) {
        return base.isApp() ? ClientUtil.getApplicationInfo(appId) : null
    },

    /**
     * 终端设备注册
     * @method App.app.register
     * @param {json} options 注册信息
     * @param {string} options.name 注册名，一般为用户名
     * @param {string} options.phone 手机号码
     * @param {string} options.company 企业标识
     * @param {string} options.success 注册成功回调
     * @param {string} options.error 注册失败回调
     */
    register (options) {
        if (base.isApp()) {
            var registerInfo = ClientUtil.getRegister()
            if (!registerInfo) {
                registerInfo = new RegisterInfo()
            }
            if (options.name) {
                registerInfo.username = options.name.replace(/[^a-z_0-9]/gi, '')
            }
            if (options.phone) {
                registerInfo.phone = options.phone
            }
            if (options.company) {
                registerInfo.ec = options.company
            }

            ClientUtil.setRegister(registerInfo, function (response) {
                if (options.success) {
                    options.success(response)
                }
            }, function (response) {
                var msg
                switch (response.status) {
                    case 101:
                    case 1011:
                        msg = `cmd指令不存在`
                        break
                    case 121:
                    case 2004:
                        msg = `基座鉴权失败`
                        break
                    case 130:
                    case 2008:
                        msg = `用户审核中`
                        break
                    case 131:
                    case 2009:
                        msg = `用户审核不通过`
                        break
                    default:
                        msg = ''
                        break
                }
                msg = `设备注册失败，${msg}，${response.responseText}（代码：${response.status}）。`
                if (options.error) {
                    options.error(msg)
                }
            })
        }
    }
}

export default device
