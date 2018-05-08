export default {
	permission: {
		//oper		

		//model
		roleName: "角色名称",
		roleNo: "角色编号",
		remark: "角色描述",
		userName: "用户帐号",
		aliasName: "用户实名",

		//msg		
		addRoleTitle: "新增角色",
		editRoleTitle: "修改角色",
		setRolePermissionTitle: "{roleName}权限设置",
		browsePermissionTitle: "查看权限设置",
		setUserTitle: "设置用户",
		addRoleSuccess: "新增角色成功",
		editRoleSuccess: "修改角色成功",
		delRoleSuccess: "删除角色成功",
		roleNameNotBeEmpty: "角色名称不能为空",
		moduleName: "模块名称",
		handlePermission: "操作权限",
		setSuccess: "设置成功",
		tabBasicInformation: "基本信息",
		tabPermissionSet: "权限设置",
		tabIncludeUsers: "包含用户",
		selectedUserDesc: "已选用户：{userCount}人",
		moreThanUpperLimit: "已经达到100人上限",

		search: "按名称、编号进行搜索",
		searchUser: "按用户帐号、用户实名进行搜索",

		//data		

		//code
		code: {
			104001: "已存在一个相同的角色名称",
			104002: "找不到可修改的角色，可能角色已被移除",
			104003: "找不到可设置的角色,可能角色已被移除",
			104004: "找不到可移除的角色，可能角色已被移除",
			104005: "移除失败，系统角色{0}不能移除",
		}
	}
}