<template>
    <flexbox :gutter="0" orient="vertical" justify="center" class="spinner-panel">
        <spinner type="lines" size="40px"></spinner>
    </flexbox>
</template>

<script>
import { Spinner, Flexbox, FlexboxItem } from 'vux'
import { signIn } from '@/static/js/sign'
import { authorize } from '../api/authorize.js'
import utils from '@/static/js/utils.js'

export default {
    components: {
        Spinner, Flexbox, FlexboxItem
    },

    methods: {
        sso (params) {
            authorize(params).then(function (data) {
                // 登录成功
                signIn(data)
            }, function (error) {
                console.log(error)
            })
        },
        getParams () {
            // utils.getQueryString('redirect') 可设置登录成功后的跳转页面
            return {
                username: utils.getQueryString('username'),
                grant_type: utils.getQueryString('grant_type')
            }
        },
        valiParams (params) {
            let msg = ''
            if (utils.isPlainObject(params)) {
                if (utils.isEmpty(params.grant_type)) {
                    msg = '单点登录参数grant_type为空；'
                }
                if (utils.isEmpty(params.username)) {
                    msg += '单点登录参数username为空；'
                }
            } else {
                msg = '单点登录参数类型错误；'
            }

            if (msg) {
                utils.warn(msg, params)
                return false
            }

            return true
        }
    },

    created () {
        let params = this.getParams()
        if (this.valiParams(params)) {
            this.sso(params)
        } else {
            this.$vux.alert.show({
                content: '非法访问'
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
.spinner-panel{
    height: 100%;
    text-align: center;
}
</style>
