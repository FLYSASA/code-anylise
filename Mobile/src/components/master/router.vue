<template>
    <transition :name="transitionName" @before-leave="beforeEnter" mode="in-out" @after-leave="afterEnter">
        <keep-alive :exclude="/(?!Once)$/">
            <router-view class="router-view"></router-view>
        </keep-alive>
    </transition>
</template>

<script>
import utils from '@/static/js/utils.js'
import { triggerHTBResize } from '@/directives/height-to-bottom'
import RouterDirection from '@/mixins/routerDirection.js'
export default {
    name: 'router',
    mixins: [RouterDirection],

    data () {
        return {
            transitionName: 'vux-pop-out'
        }
    },
    methods: {
        afterEnter (el) {
            if (this.headerBackdrop) {
                utils.setStyle(this.headerBackdrop, 'display', 'none')
            }

            triggerHTBResize()
        },
        beforeEnter (el) {
            if (this.headerBackdrop) {
                utils.setStyle(this.headerBackdrop, 'display', 'block')
            }
        }
    },
    watch: {
        $route (to, from) {
            this.updateDirection()
            if (to.meta && to.meta.hasOwnProperty('transitionName')) {
                this.transitionName = to.meta.transitionName
                return
            }
            if (this.back) {
                this.back = false
                this.transitionName = 'vux-pop-out'
            } else {
                this.transitionName = 'vux-pop-in'
            }
        }
    },

    mounted () {
        this.headerBackdrop = utils.query('#headerBackdrop')
    }
}
</script>
