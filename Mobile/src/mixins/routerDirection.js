import utils from '@/static/js/utils.js'
// 集中路由方向的操作
export default {
    methods: {
        goBack (backFun) {
            // 返回默认设置为back
            utils.localStorage.set('routerDirection', 'back')
            if (utils.isFunction(backFun)) {
                backFun.apply(this, [].slice.call(arguments, 1))
            } else {
                this.$router.back()
            }
        },
        updateDirection () {
            let direction = utils.localStorage.get('routerDirection')
            if (!utils.isEmpty(direction)) {
                this.back = direction === 'back'
                utils.localStorage.remove('routerDirection')
            } else {
                this.back = false
            }

            utils.localStorage.set('currentRouterDirection', this.back ? 'back' : 'forward')
        },
        isBack () {
            return utils.localStorage.get('currentRouterDirection') === 'back'
        }
    }
}
