/*菜单注册,运行其他模块注册到新平台下面*/

export default{
	//注册到后台管理模块下
	"/plat/admin.html#/":[
		{
            path: '/msgType',
            component: function(resolve) {
            	//let path = "";
				return import(`@/pages/plat/notification/msgType/main.vue`);
            }
		},
		{
            path: '/projectStatus',
            component: function(resolve) {
            	//let path = "";
				return import(`@/pages/plat/base/projectstatus/list.vue`);
            }
        }
	]
}
