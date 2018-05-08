/* eslint-disable */
import base from './base'

/**
 * 联系/沟通
 */
var contact = {
    /**
     * 打电话
     * @method App.contact.tel
     * @param {string} phone 电话号码
     * @param {boolean} onlyOpenDialog 是否仅打开拨号界面
     */
    tel (phone, onlyOpenDialog) {
        if (base.isApp()) {
            if (onlyOpenDialog) {
                PhoneUtil.openSystemDial(phone)
            } else {
                PhoneUtil.tel(phone)
            }
        } else {
            alert('不支持拨号。')
        }
    },

    /**
     * 发短信
     * @method App.contact.sendSms
     * @param {string} phone 手机号码，多个号码之间用逗号分隔
     * @param {string} content 发送短信内容
     * @param {boolean} onlyOpenDialog 是否仅打开发短信界面
     */
    sendSms (phone, content, onlyOpenDialog) {
        if (base.isApp()) {
            if (onlyOpenDialog) {
                SmsUtil.openSystemSms(phone, content)
            } else {
                SmsUtil.sendSms(phone, content)
            }
        } else {
            alert('不支持发短信。')
        }
    },

    /**
     * 发邮件
     * @method App.contact.sendMail
     * @param {josn} mailInfo 邮件对象，格式：{to,cc,bcc,subject,body}
     * @param {string} mailInfo.to 收件人地址列表，多个用;分隔
     * @param {boolean} mailInfo.cc 抄送地址列表，多个用;分隔
     * @param {boolean} mailInfo.bcc 暗送地址列表，多个用;分隔
     * @param {boolean} mailInfo.subject 主题，邮件的标题会变成主题设置的文字，默认会提示“新邮件”
     * @param {boolean} mailInfo.body 邮件正文内容
     */
    sendMail (mailInfo) {
        if (base.isApp()) {
            var mail = new MailObject() // 创建一个MAILOBJECT对象
            mail.to = mailInfo.to
            mail.cc = mailInfo.cc
            mail.bcc = mailInfo.bcc
            mail.subject = mailInfo.subject
            mail.body = mailInfo.body
            mail.show()     // 调出系统邮件界面
        } else {
            alert('不支持发邮件。')
        }
    }
}

export default contact