<template>
    <login @submit="login" :copyright="''" :spans="[0.3, 0.4, 0.3]">
        <div slot="logo" class="logo-wrap">
            <img class="logo" src="../../../static/images/home/sapi_logo.png" />
        </div>
    </login>
</template>

<script>
import login from '@/components/master/login.vue'
import { LoadMore } from 'vux'
import { signIn } from '@/static/js/sign'
import { authorize } from '@/pages/plat/api/authorize.js'

export default {
    components: {
        login,
        LoadMore
    },

    methods: {
        login ({ username, password }) {
            authorize({
                grant_type: 'password',
                username: username,
                password: password
            }, void 0, true).then(function (data) {
                signIn(data)
            })
        }
    }
}
</script>

<style lang="less">
html,
body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
}
.logo-wrap{
    text-align:center;
    width:100%;
    align-self:center;
}
.bottom-wrap {
    text-align:center;
    width:100%;
}
img.logo {
    max-width: 318px;
    max-height: 40px;
}
</style>
