export default {
	sapiConfirm: {
		contentEmpty: "提示内容不能为空",
		confirmDelete: "确认删除",
		deleteContent: "请确认是否要删除"
	},
	sapiAutocomplete: {
		curPropsTitle: "查找中...",
		noQuery: "查询不到",
		addDesc: "点击“添加”按钮即可添加。",
		startEnterDesc: "开始输入查找关键字...",
	},
	sapiExport: {
		exportDesc: "请选择所需要导出的数据范围，即将以Excel格式导出数据...",
		exportOptions: ["导出当前页", "导出全部（最多{maxCount}条）"],
	},
	sapiImport: {
		importDesc: ["首次{title}之前，",
			"请先",
			"点击此处",
			"下载模板，然后按照模板格式输入{title}的信息后导入。"
		],
	},
	sapiSelect: {
		currentNodeNotBeSelected: "不可选择当前值，请重新选择。",
	},
	sapiStationMultiline: {
		//model
		stationName: "岗位名称",
		stationNo: "岗位编号",

		//msg
		setStationTitle: "设置岗位",
		selectedDesc: "已选岗位：{stationCount}个",
		mapText: "{total}个",
	},
	sapiStationSingle: {
		//model
		stationName: "岗位名称",
		stationNo: "岗位编号",

		//msg
		setStationTitle: "设置岗位",
		mapText: "{total}个",
	},
	sapiStationUserSingle: {
		//model
		aliasName: "用户实名",
		stationName: "岗位名称",
		corpName: "公司名称",
		deptName: "部门名称",

		//msg
		setStationTitle: "设置岗位",

		search: "按用户实名、岗位名称搜索",
	},
	sapiTips: {
		inputSelectorPlease: "请输入选择器",
	},
	sapiTreeNav: {
		placeholder: "按公司或部门名称搜索",
	},
	sapiUpload: {
		//oper
		uploadWhenClick: "点击上传",
		uploading: "正在上传",
		
		//msg
		msgUploadCountLimit: "上传数量不能超过{count}个",
		unableUploadWhenFileFormatInvalid: "不能上传该格式文件",
		unableUploadWhenFileBeEmpty: "不能上传空文件",
		unableUploadWhenFileMoreThanSize: "不能上传大于{size}的文件",
		unableUploadWhenFileExists: "不能上传已存在文件",
	}
}