
const routers = [{
    path: '/',
    name: 'list',
    component: () => import('./views/nestData.vue')
}, {
    path: '/other',
    name: 'other',
    component: () => import('./views/notNestData.vue')
}]

export default routers
