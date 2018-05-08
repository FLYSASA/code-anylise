export default {
	formType: {
		//oper
		addFormType: "新建物业形态",

		//model
		typeName: "形态名称",
		baseFormType: "类型",
		parentType: "父级形态",
		remark: "备注",

		//msg
		addTypeSuccess: "新增物业形态成功",
		editTypeSuccess: "修改物业形态成功",
		delTypeSuccess: "删除物业形态成功",

		writeTypeNamePlease: "请填写物业形态名称",

		selectTypePlease: "请选择类型",
		firstTypeDesc: "暂无物业形态，您可以新建物业形态，开始编辑物业形态！",

		//data
		baseFormTypeData: {
			aboveground: "地上建筑",
			underground: "地下区域",
			publicArea: "公共区域"
		},

		//code
		code: {
			116001: "新增失败，已存在一个相同的物业形态名称",
			116002: "修改失败，已存在一个相同的物业形态名称",
			116003: "找不到可修改的物业形态，可能物业形态已被删除",
			116004: "移除失败，找不到可移除的物业形态",
		}
	}
}