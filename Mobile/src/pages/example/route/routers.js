
const routers = [{
    path: '/',
    name: 'line',
    component: () => import('./views/tabList.vue')
},
{
    path: '/radius',
    name: 'radius',
    component: () => import('./views/tabList2.vue')
}]

export default routers
