// 可返回mockModel
module.exports = {
    // '|100'返回100条数据
    'Data|100': [{
        'DynamicInfoID': '@guid', // 返回guid
        'DynamicInfoSubject': '@ctitle', // 返回英文姓名
        'ProjectName': function () { return this.City + '项目' }, // '@cname', // 返回中文姓名
        'CompanyName': function () { return this.City + '公司' },
        'City': '@city',
        'CreateTime': '@datetime("yyyy-MM-dd")'
    }]
}
