const Index = () => import('./views/index')
const Operation = () => import('./views/operation')
const Mine = () => import('./views/mine')

const routers = [{
    path: '/', // 首页默认显示
    name: 'index',
    component: Index,
    meta: {
        tabbarIndex: 0,
        title: ''
    }
},
{
    path: '/operation',
    name: 'operation',
    component: Operation,
    meta: {
        tabbarIndex: 1,
        title: '设置'
    }
},
{
    path: '/mine',
    name: 'mine',
    component: Mine,
    meta: {
        tabbarIndex: 2,
        title: '赛普ERP'
    }
}, {
    path: '*',
    redirect: { name: 'index' }
}]

export default routers
