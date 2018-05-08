/**
 * 注释：填写后台路径时请填写完整名称
 * 比如：路由的路径/role，他在system目录下，那么完整名称为：/system/index.html#/role
 * 而企业员工可以写成：/system/index.html#/employee
 * 这样写的作用就是无论后台菜单移动到哪个模块下，都可以正常运行
 * **/

var router = {
    routes: [{
        path: '/',
        component: function (resolve) {
            require(['./index/index.vue'], resolve);
        }
    },
    {
        path: '/land',
        name: 'land',
        component: function (resolve) {
            require(['./land/list.vue'], resolve);
        }
    },
    {
        path: '/project',
        name: 'project',
        component: function (resolve) {
            require(['./project/list.vue'], resolve);
        }
    },
    {
        path: '/projectType',
        name: 'projectType',
        component: function (resolve) {
            require(['./projectType/list.vue'], resolve);
        }
    },
    {
        path: '/building',
        name: 'building',
        component: function (resolve) {
            require(['./building/list.vue'], resolve);
        }
    },
    {
        path: '/formType',
        name: 'formType',
        component: function (resolve) { 
            require(['./formType/main.vue'], resolve);
        }
    },
    {
        path: '/projectstatus',
        name: 'projectstatus',
        component: function (resolve) {
            require(['./projectstatus/list.vue'], resolve);
        }
    },
    {
        path: '/projectperiod',
        name: 'projectPeriod',
        component: function (resolve) {
            require(['./projectperiod/list.vue'], resolve);
        }
    },
    {
        path: '/professionalType',
        name: 'professionalType',
        component: function (resolve) {
            require(['./professionalType/list.vue'], resolve);
        }
    },
    {
        path: '/403',
        component: function (resolve) {
            require(['../../home/403/403.vue'], resolve);
        }
    },
    {
        path: '*',
        component: function (resolve) {
            require(['../../home/404/404.vue'], resolve);
        }
    }

    ]
};
export default router;