
// @date("yyyy-MM-dd")
// @datetime("yyyy-MM-dd A HH:mm:ss")
// @guid
// Random.float( min, max, dmin, dmax )
// Random.integer( min, max )
// Random.natural( min, max )
// Random.boolean()

// 可返回mockModel
module.exports = {
    // '|100'返回100条数据
    'Data|100': [{
        'UserId': '@guid', // 返回guid
        'UserName': '@name', // 返回英文姓名
        'AliasName': '@cname', // 返回中文姓名
        'UsedById': '@id', // "420000198303026369"
        'UsedByName': '@cname',
        'UsedByNo': '@string("upper", 2)@string("number", 3)', // 返回5位字符串数字
        // 'UsedByNo': '@natural(10000, 100000)',
        'UsedByDefaultStationId': '@id',
        'UsedByDefaultStationName': '@cname',
        'UsedByPositionId': '@id',
        'UsedByPositionName': '@cname',
        'UsedByCorpId': '@id',
        // 从数组中随机取值
        'UsedByCorpName|1': [
            '集团公司',
            '深圳分公司',
            '上海分公司',
            '北京分公司'
        ],
        'UsedByDeptId': '@id',
        // 按顺序取值
        'UsedByDeptName|+1': [
            '财务部',
            '人事部',
            '研发部',
            '总监办'
        ],
        'Enabled': '@boolean', // 返回boolean值
        'RowIndex|+1': 1, // 返回递增数字
        // 'RowIndex': @increment(), // 递增数字，也可以@increment(2)，每次递增2
        'HeadIconPath': '@image("200x100")', // 返回图片，200（宽）x100（高），单位px
        // 'HeadIconPath': '@dataImage("200x100")' // 需要安装node-canvas，否则报错
        'CreateDate': '@datetime("yyyy-MM-dd HH:mm:ss")', // 返回时间
        // CreateDate: '@date("yyyy-MM-dd")' // 返回日期
        // CreateDate: '@now' // 返回当前时间
        'EnabledName': function () {
            // 可通过this返回
            return this.Enabled ? '是' : '否'
        },
        'IsEmployeeDeleted': '@boolean',
        'Money|1-100000.2': 1, // 返回数字1到100000且存在两位小数
        'Remark': '@paragraph', // 生成英文段落，类似有@sentence/@word/@title
        'Description': '@cparagraph', // 生成中文段落，类似有@csentence/@cword/@ctitle
        'Email': '@email', // 邮箱
        'ClientId': '@ip', // 客户端ip
        'Region': '@region', // 区域
        'Province': '@province', // 省份
        'City': '@city' // 城市，@city(true)参数true表示带省份前缀："江苏省 扬州市"
    }]
}
