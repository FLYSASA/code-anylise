export default {
	employee: {
		//oper

		//model
		// employeeName: "员工名称",
		// employeeNo: "员工编号",
		// userName: "用户帐号",
		// defaultStationName: "默认岗位",
		// positionName: "职位名称",
		// corpName: "公司名称",
		// deptName: "部门名称",

		// sex: "性别",
		// birthday: "生日",
		// originPlace: "籍贯",
		// entryDate: "入职日期",
		// address: "地址",
		// mobileTelephone: "移动电话",
		// officePhone: "办公电话",
		// weChat: "微信",
		// microBlog: "新浪微博",
		// stationName: "岗位名称",
		// stationNo: "岗位编号",
		// stationCorpName: "所属公司",
		// stationDeptName: "所属部门",

		

		// supplier	一览	
		SupName: "供方名称",
		SupNo: "供方编号",
		TaxPayerId: "纳税类型",
		EnterpriseForm: "企业类型",
		RegisteredCapital: "注册资本",
		Remark: "备注",
				
		ProvinceName: "省份",
		CityName: "城市",
		AreaName: "区域",
		CreditCode: "信用代码",
		supplierClasses: "供方分类",
		BusinessLicence: "营业执照",

		EnterpriseForm: "企业类型",
		LegalRepresentative: "法人代表",
		RegisteredCapital: "注册资本",
		Address: "公司地址",
		PostalCode: "邮政编码",
		OfficePhone: "公司电话",
		FaxNumber: "公司传真",
		Email: "电子邮箱",
		OfficialWebsite: "公司网页",


		contactName: "姓名",
		contactStation: "职级",
		contactSex: "性别",
		contactPhone: "公司电话",
		contactMobile: "手机号码",
		contactMail: "电子邮箱",
		contactMsg: "联系人信息",
		



		// entryDate: "入职日期",
		// address: "地址",
		// mobileTelephone: "移动电话",
		// officePhone: "办公电话",
		// weChat: "微信",
		// microBlog: "新浪微博",
		// stationName: "岗位名称",
		// stationNo: "岗位编号",
		// stationCorpName: "所属公司",
		// stationDeptName: "所属部门",

		//msg
		// addEmployeeTitle: "新增员工",
		// editEmployeeTitle: "修改员工",
		// browseEmployeeTitle: "查看员工",
		// importEmployeeTitle: "导入企业员工",
		// exportEmployeeTitle: "导出企业员工",
		// addEmployeeSuccess: "新增员工成功",
		// editEmployeeSuccess: "修改员工成功",
		// delEmployeeSuccess: "删除员工成功",
		// setStation: "设置岗位",
		// employeeNameNotBeEmpty: "员工名称不能为空",
		// station: "岗位",

		// search: "按员工名称、员工编号、用户帐号、公司名称、部门名称进行搜索",

		// supplier msg
		addEmployeeTitle: "新增供方",
		editEmployeeTitle: "修改供方",
		browseEmployeeTitle: "查看供方",
		importEmployeeTitle: "导入供方",
		exportEmployeeTitle: "导出供方",
		addEmployeeSuccess: "新增供方成功",
		editEmployeeSuccess: "修改供方成功",
		delEmployeeSuccess: "删除供方成功",
		setStation: "设置岗位",

		employeeNameNotBeEmpty: "供方名称不能为空",
		supNoNotBeEmpty: "请填写供方编号",
        selectProvinceName: "请选择省份",
		selectCityName: "请选择城市",
		selectAreaName: "请选择区域",
		creditCodeNotBeEmpty: "请填写信用代码",
        landAddressNotBeEmpty: "请填写区域",
        landMapPositionCheckedASCII: "地块地图位置可由字母、数字、英文标点及常用特殊字符(@#等)组成",
        selectIsBidInvitationPlease: "请选择获取方式",
		station: "岗位",

		search: "按供方名称、供方编号、用户帐号、公司名称、部门名称进行搜索",

		//data
		sexData: {
			man: "男",
			woman: "女"
		},
		taxPayerData: {
			common: "一般纳税人",
			location: "小规模纳税人"
		},

		//code
		code: {
			108001: "已存在一个相同的员工编号",
			108002: "找不到可修改的员工",
			108003: "找不到可移除的员工",
			108004: "员工不存在",
			108005: "员工已被使用",
			108006: "新增失败，员工的默认岗位不存在",
			108007: "修改失败，员工的默认岗位不存在",
			108008: "导入员工数据失败，导入数据为空",
			108009: "导入员工数据失败，导入数据列名与模板不一致",
			108010: "导入员工数据失败，第{0}行员工名称为空",
			108011: "导入员工数据失败，第{0}行员工名称格式不正确",
			108012: "导入员工数据失败，第{0}行员工编号为空",
			108013: "导入员工数据失败，第{0}行员工编号格式不正确",
			108014: "导入员工数据失败，第{0}行员工编号在当前文档中已存在，不允许重复添加",
			108015: "导入员工数据失败，第{0}行员工编号在数据库中已存在，不允许重复添加",
			108016: "导入员工数据失败，第{0}行用户名格式不正确",
			108017: "导入员工数据失败，第{0}行用户名在当前文档中已存在，不允许重复添加",
			108018: "导入员工数据失败，第{0}行员工生日格式不正确",
			108019: "导入员工数据失败，第{0}行员工入司时间格式不正确",
			108020: "导入员工数据失败，第{0}行员工性别为空",
			108021: "导入员工数据失败，第{0}行员工性别格式不正确",
			108022: "导入员工数据失败，第{0}行用户名已经绑定员工",
			108023: "导入员工数据失败，第{0}行用户已被移除",
			108024: "导入员工数据失败，第{0}行用户名在当前文档中已经存在",
			108025: "导入员工数据失败，第{0}行默认岗位所属公司为空",
			108026: "导入员工数据失败，第{0}行默认岗位所属公司格式不正确",
			108027: "导入员工数据失败，第{0}行默认岗位所属公司不存在",
			108028: "导入员工数据失败，第{0}行默认岗位所属部门为空",
			108029: "导入员工数据失败，第{0}行默认岗位所属部门格式不正确",
			108030: "导入员工数据失败，第{0}行默认岗位的岗位名称格式不正确",
			108031: "导入员工数据失败，第{0}行默认岗位的岗位编号格式不正确",
			108032: "导入员工数据失败，第{0}行默认岗位所属部门在当前公司下不存在",
			108033: "导入员工数据失败，第{0}行默认岗位不存在",
			108034: "新增员工失败，员工生日不能大于今天",
			108035: "修改员工失败，员工生日不能大于今天",
			108036: "导入员工数据失败，第{0}行员工生日不能大于今天",
		}
	}
}