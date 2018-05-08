/**
 * 注释：填写后台路径时请填写完整名称
 * 比如：路由的路径/role，他在system目录下，那么完整名称为：/system/index.html#/role
 * 而企业员工可以写成：/system/index.html#/employee
 * 这样写的作用就是无论后台菜单移动到哪个模块下，都可以正常运行
 * **/

var router = {
    routes: [{
            path: '/',
            component: function(resolve) {
                require(['./index/index.vue'], resolve);
            }
        },
        {
            path: '/center',
            name: 'center',
            component: function(resolve) {
                require(['./center/main.vue'], resolve);
            }
        },

        {
            path: '/403',
            component: function(resolve) {
                require(['../../home/403/403.vue'], resolve);
            }
        },
        {
            path: '*',
            component: function(resolve) {
                require(['../../home/404/404.vue'], resolve);
            }
        }

    ]
};



export default router;