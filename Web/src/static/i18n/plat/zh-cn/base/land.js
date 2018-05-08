export default {
    land: {
        //oper

        //model
        landName: "地块名称",
        landNo: "地块编号",
        landAddress: "地块位置",
        grantYear: "出让年限",
        landArea: "地块面积",
        city: "所在城市",
        provinceName: "省份",
        cityName: "城市",
        areaName: "区域",
        landUsage: "用地性质",
        isBidInvitation: "获取方式",
        remark: "地块描述",


        //msg
        addLandTitle: "新增地块",
        editLandTitle: "修改地块",
        browseLandTitle: "查看地块",
        choiceLandTitle: "地块选择",
        addLandSuccess: "添加地块成功",
        editLandSuccess: "修改地块成功",
        delLandSuccess: "删除地块成功",
        landNameNotBeEmpty: "请填写地块名称",
        landNoNotBeEmpty: "请填写地块编号",
        selectProvinceName: "请选择省份",
        selectCityName: "请选择城市",
        landAddressNotBeEmpty: "请填写地块位置",
        landMapPositionCheckedASCII: "地块地图位置可由字母、数字、英文标点及常用特殊字符(@#等)组成",
        selectIsBidInvitationPlease: "请选择获取方式",

        search: "按地块名称、地块编号进行搜索",
        
        //data
        isBidInvitationData: {
            isTrue: "招拍挂",
			isFalse: "非招拍挂"
        },
        
        //code
        code: {
            111001: "新增失败，已存在一个相同的地块名称",
            111002: "修改失败，已存在一个相同的地块名称",
            111003: "修改失败，找不到可移除的地块",
            111004: "移除失败，找不到可移除的地块"
        }
    }
}