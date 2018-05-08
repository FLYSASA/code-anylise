/**
 * 注释：填写后台路径时请填写完整名称
 * 比如：路由的路径/user，他在infrastructure目录下，那么完整名称为：/plat/infrastructure.html#/menu
 * 这样写的作用就是无论后台菜单移动到哪个模块下，都可以正常运行
 * **/
import menuRouters from "@/extend/menuRouter.js";
var routes=menuRouters["/plat/infrastructure.html#/"]||[];
var router = {
    routes: [
    ...routes,
    {
            path: '/',
            component: function(resolve) {
                require(['./index/index.vue'], resolve);
            }
        },
        {
            path: '/user',
            name: "user",
            component: function(resolve) {
                require(['./user/list.vue'], resolve);
            }
        },
        {
            path: '/structure',
            name: 'structure',
            component: function(resolve) {
                require(['./structure/main.vue'], resolve);
            }
        },
        {
            path: '/station',
            name: 'station',
            component: function(resolve) {
                require(['./station/main.vue'], resolve);
            }
        },
        {
            path: '/employee',
            name: 'employee',
            component: function(resolve) {
                require(['./employee/list.vue'], resolve);
            }
        },
        {
            path: "/position",
            name: 'position',
            component: function(resolve) {
                require(['./position/list.vue'], resolve);
            }
        },
        {
            path: "/permission",
            name: 'permission',
            component: function(resolve) {
                require(['./permission/list.vue'], resolve);
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