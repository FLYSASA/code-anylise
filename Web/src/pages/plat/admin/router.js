/**
 * 注释：填写后台路径时请填写完整名称
 * 比如：路由的路径/menu，他在admin目录下，那么完整名称为：/plat/admin.html#/menu
 * 这样写的作用就是无论后台菜单移动到哪个模块下，都可以正常运行
 * **/
import menuRouters from "@/extend/menuRouter.js";
var routes=menuRouters["/plat/admin.html#/"]||[];
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
            path: '/config',
            component: function(resolve) {
                require(['./config/main.vue'], resolve);
            }
        },
        {
            path: '/log/login',
            component: function(resolve) {
                require(['./log/login.vue'], resolve);
            }
        },
        {
            path: '/log/access',
            component: function(resolve) {
                require(['./log/access.vue'], resolve);
            }
        },
        {
            path: '/log/operate',
            component: function(resolve) {
                require(['./log/operate.vue'], resolve);
            }
        },
        {
            path: '/log/exception',
            component: function(resolve) {
                require(['./log/exception.vue'], resolve);
            }
        },
        {
            path: '/client',
            component: function(resolve) {
                require(['./client/list.vue'], resolve);
            }
        },
        {
            path: '/menu',
            component: function(resolve) {
                require(['./menu/main.vue'], resolve);
            }
        },
        {
            path: '/register',
            component: function(resolve) {
                require(['./register/main.vue'], resolve);
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



