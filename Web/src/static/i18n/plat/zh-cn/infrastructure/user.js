export default {
	user: {
		//oper
		resetPw: "重置密码",

		//model
		userName: "用户帐号",
		userStatus: "用户状态",
		userType: "用户类型",
		aliasName: "用户实名",
		mobileTelephone: "移动电话",
		officePhone: "办公电话",
		weChat: "微信",
		microBlog: "新浪微博",
		usedByDefaultStationName: "默认岗位",
		usedByCorpName: "公司名称",
		usedByDeptName: "部门名称",
		enabled: "启用",

		//msg		
		addUserTitle: "新增用户",
		editUserTitle: "修改用户",
		browseUserTitle: "查看用户",
		importUserTitle: "导入系统用户",
		exportUserTitle: "导出系统用户",
		addUserSuccess: "新增用户成功",
		editUserSuccess: "修改用户成功",
		delUserSuccess: "删除用户成功",
		resetPwSuccess: "重置密码成功",
		resetPwConfirm: "请确认是否重置该用户的密码？",
		userNameNotBeEmpty: "用户帐号不能为空",
		aliasNameNotBeEmpty: "用户实名不能为空",
		selectEmployeePlease: "请选择企业员工",

		search: "按帐号、实名进行搜索",
		desc: ["系统授权用户数无限制，当前有效用户数",
			"{count}",
			"个。",
			"系统授权用户数",
			"{authUserCount}",
			"个，当前有效用户数",
			"{validUserCount}",
			"个。"
		],

		//data
		enabledData: {
			isTrue: "是",
			isFalse: "否"
		},
		userTypeData: {
			system: "系统",
			employee: "职员",
			other: "其他"
		},
		userStatusData: {
			enabled: "启用",
			disabled: "禁用"
		},

		//code
		code: {
			101001: "用户帐号不能为空",
			101002: "用户帐号不存在",
			101003: "密码错误",
			101004: "确认密码错误",
			101005: "已存在一个相同的用户帐号",
			101006: "找不到可修改的用户",
			101007: "用户数已达最大数量",
			101008: "用户已被使用",
			101009: "导入用户数据失败，导入数据为空",
			101010: "导入用户数据失败，导入数据列名与模板不一致",
			101011: "导入用户数据失败，第{0}行用户帐号为空",
			101012: "导入用户数据失败，第{0}行用户帐号格式不正确",
			101013: "导入用户数据失败，第{0}行用户帐号在当前文档中已存在，不允许重复添加",
			101014: "导入用户数据失败，第{0}行用户帐号在数据库中已存在，不允许重复添加",
			101015: "导入用户数据失败，第{0}行用户没有关联员工",
			101016: "导入用户数据失败，第{0}行员工名称格式不正确",
			101017: "用户未关联员工",
			101018: "导入用户数据失败，第{0}行员工编号格式不正确",
			101019: "导入用户数据失败，第{0}行员工不存在",
			101020: "导入用户数据失败，第{0}行员工在当前文档中已绑定用户",
			101021: "导入用户数据失败，第{0}行员工在数据库中已绑定用户",
			101022: "导入用户数据失败，第{0}行用户实名格式不正确",
			101023: "用户不存在",
			101024: "用户{0}所选的员工已被其他用户使用",
		}
	}
}