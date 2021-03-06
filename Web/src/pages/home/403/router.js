/**
 * 注释：填写后台路径时请填写完整名称
 * 比如：路由的路径/menu，他在admin目录下，那么完整名称为：/plat/admin.html#/menu
 * 这样写的作用就是无论后台菜单移动到哪个模块下，都可以正常运行
 * **/

var router = {
    routes: [
        {
            path: '/',
            component: function(resolve) {
                require(['./403.vue'], resolve);
            }
        },
        {
            path: '*',
            component: function(resolve) {
                require(['../404/404.vue'], resolve);
            }
        }

    ]
};



export default router;