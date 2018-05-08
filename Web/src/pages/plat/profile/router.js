/**
 * 注释：填写后台路径时请填写完整名称
 * 比如：路由的路径/user，他在infrastructure目录下，那么完整名称为：/plat/infrastructure.html#/menu
 * 这样写的作用就是无论后台菜单移动到哪个模块下，都可以正常运行
 * **/

var router = {
    routes: [{
            path: '/',
            component: function(resolve) {
                require(['./basic/main.vue'], resolve);
            }
        },
        {
            path: '/basic',
            name: 'basic',
            component: function(resolve) {
                require(['./basic/main.vue'], resolve);
            }
        },
        {
            path: '/avatar',
            name: 'avatar',
            component: function(resolve) {
                require(['./avatar/main.vue'], resolve);
            }
        },
        {
            path: '/account',
            name: 'account',
            component: function(resolve) {
                require(['./account/main.vue'], resolve);
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