export default {
    project: {
        //oper
        addChild: "新增分期",

        //model
        projectName: "项目名称",
        projectNo: "项目编号",
        status: "项目状态",
        parentProjectName: "所属项目",
        corpName: "所在公司",
        provinceName: "省份",
        cityName: "城市",
        areaName: "区域",
        provinceCityAreaName:"所在城市",
        isPurchased: "收购项目",
        type: "项目类别",
        projectAddress: "项目地址",
        imageModel: "封面图",
        remark: "项目描述",
        projectLands: "地块信息",
        createByName: "创建人",
        createDate: "创建日期",
        corp: "公司",
        group1: "基本信息",
        group2: "封面图及项目描述",
        tipField: "项目",
        tipFieldChild: "项目（分期）",

        //msg
        addProjectTitle: "新增",
        editProjectTitle: "修改",
        browseProjectTitle: "查看",
        addProjectSuccess: "新增项目成功",
        editProjectSuccess: "修改项目成功",
        delProjectSuccess: "删除项目成功",
        projectNameNotBeEmpty: "请填写项目名称",
        projectNoNotBeEmpty: "请填写项目编号",
        selectCorpPlease: "请选择所在公司",
        selectStatusPlease: "请选择项目状态",


        search: "按项目名称、项目编号进行搜索",
        desc:"请至少选择一个公司进行查看",

        //data
        isPurchasedData: {
            isTrue: "是",
			isFalse: "否"
        },

        //code
        code: {
            112001: "新增失败，该公司已存在一个相同的项目名称",
            112002: "修改失败，该公司已存在一个相同的项目名称",
            112003: "移除失败，找不到可移除的项目",
            112004: "移除失败，找不到可移除的项目",
            112005: "移除失败，该项目存在子级项目"
        }
    }
}