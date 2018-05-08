<template>
    <login @submit="login" :copyright="''" :spans="[0.3, 0.4, 0.3]">
        <div slot="logo" class="logo-wrap">
            <img class="logo" src="../../../static/images/home/sapi_logo.png" />
        </div>
        <div slot='bottom' class="bottom-wrap">
            <load-more :show-loading="false" tip="使用社交账号登录"></load-more>
            <img src="../../../static/images/example/we-chat.png" width="50" />
        </div>
    </login>
</template>

<script>
import login from '@/components/master/login.vue'
import utils from '@/static/js/utils.js'
import { LoadMore } from 'vux'
import request from '@/static/js/request'
import { signIn } from '../common/sign'
import Vue from 'vue'

export default {
    components: {
        login,
        LoadMore
    },
    methods: {
        login ({ username, password }) {
            request({
                // url: '/api/example/authorization',
                url: '/Authorize',
                type: 'POST',
                data: {
                    model: {
                        grant_type: 'password',
                        username: username, // 'demo',
                        password: password // '123456'
                    }
                },
                // 指定mock服务处理js
                // mock: 'mock/js/example/login.js',
                mock: 'mock/js/example/login.js',
                loading: true,
                headers: { 'authorization': 'Basic V2ViQXBwOnNhcGlAMTIzNA==' }
            }, { model: 'body|stringify' }).then(function (data) {
                if (!utils.isUndefined(data)) {
                    if (data.Code === -1) {
                        Vue.$vux.toast.text(data.Msg, 'bottom')
                    } else {
                        signIn(data)
                    }
                }
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
