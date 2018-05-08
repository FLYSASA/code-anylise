const List = () => import('./views/list.vue')

const CustomList = () => import('./views/customList.vue')

const Detail = () => import('./views/detail.vue')

const CustomOperationList = () => import('./views/customOperationList.vue')

const routers = [{
    path: '/',
    name: 'list',
    component: List
}, {
    path: '/customList',
    name: 'customList',
    component: CustomList
}, {
    path: '/customOperationList',
    name: 'customOperationList',
    component: CustomOperationList
}, {
    path: '/user/:id',
    name: 'detail',
    component: Detail
}]

export default routers
