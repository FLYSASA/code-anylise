<template>
    <flexbox :gutter="0" orient="vertical" class="login-body">
        <flexbox-item :span="spans[0]" class="login-logo-wrap">
            <slot name="logo"></slot>
        </flexbox-item>
    
        <flexbox-item :span="spans[1]">
            <div class="login-form">
                <group>
                    <x-input ref="txtUsername" @on-focus="onInputFocus('username')" @on-blur="onInputBlur('username')" :is-type="usernameIsType" v-model="iUsername"  :placeholder="$t('enterAccount')" required>
                        <img v-if="!!usernameIcon" slot="label" class="input-icon" :class="[inputIconClass]" :src="usernameIcon">
                    </x-input>
                    <x-input ref="txtPassword" @on-focus="onInputFocus('password')" @on-blur="onInputBlur('password')" :is-type="passwordIsType" v-model="iPassword"  :placeholder="passwordPlaceholder" required type="password">
                        <img v-if="!!passwordIcon" slot="label" class="input-icon" :class="[inputIconClass]" :src="passwordIcon">
                    </x-input>
                </group>
                <x-button @click.native="login" class="m-t-20" :class="[submitClass]" :type="submitType">{{$t('base.signIn')}}</x-button>
            </div>
        </flexbox-item>
    
        <flexbox-item :span="spans[2]" v-if="spans[2] !== 0" class="relative bottom-slot">
            <slot name="bottom"></slot>
            <div class="login-copyright" v-if="!!copyright" :class="[copyrightClass]">{{copyright}}</div>
        </flexbox-item>
    </flexbox>
</template>

<script>
import { Flexbox, FlexboxItem, XInput, Group, XButton } from 'vux'

export default {
    name: 'login',

    components: {
        Flexbox,
        FlexboxItem,
        XInput,
        Group,
        XButton
    },

    props: {
        // logo/登陆框/copyright高度比例
        spans: {
            type: Array,
            default: [1 / 4, 1 / 2, 1 / 4]
        },
        // 底部版权信息
        copyright: {
            type: String,
            default: '赛普移动办公企业适配管理平台'
        },
        // 底部版权信息样式
        copyrightClass: String,
        // 用户名值
        username: String,
        // 密码值
        password: String,
        usernamePlaceholder: {
            type: String,
            default: '请输入账号'
        },
        // 验证username类型函数，需返回{valid:true}或者{valid:false, msg:错误信息}
        usernameIsType: Function,
        passwordPlaceholder: {
            type: String,
            default: '请输入密码'
        },
        // 同usernameIsType
        passwordIsType: Function,
        inputIconClass: String,
        // 用户名称输入框icon
        usernameIcon: String,
        passwordIcon: String,
        // 提交按钮type
        submitType: {
            type: String,
            default: 'primary'
        },
        submitClass: String
    },
    data () {
        return {
            iUsername: this.username,
            iPassword: this.password,
            isInputing: false
        }
    },
    methods: {
        login () {
            if (!this.$refs.txtUsername.valid) {
                this.$refs.txtUsername.focus()
                this.$emit('invalid', this.$refs.txtUsername.errors)
                return
            }
            if (!this.$refs.txtPassword.valid) {
                this.$refs.txtPassword.focus()
                this.$emit('invalid', this.$refs.txtPassword.errors)
                return
            }

            // 自定义submit事件，参数为username和password对象
            this.$emit('submit', {
                username: this.iUsername,
                password: this.iPassword
            })
        },
        onInputFocus (inputName) {
            if (!this.isInputing) {
                this.isInputing = true
                this.$emit('on-inputing-change', true)
            }
        },
        onInputBlur (inputName) {
            if (this.isInputing) {
                this.isInputing = false
                this.$emit('on-inputing-change', false)
            }
        }
    }
}
</script>

<style lang="less">
@login-body-padding: 20px;
.login-body {
    height: 100%;
    text-align: center;
    .login-logo {
        padding: @login-body-padding
    }
    .login-form {
        padding: @login-body-padding;
        display:flex;
        flex-direction:column;
        justify-content:center;
    }
    .login-submit {
        margin-top: 20px;
    }
    .login-copyright {
        position: absolute;
        bottom: @login-body-padding;
        width: 100%
    }
    .bottom-slot, .login-logo-wrap {
        display:flex;
    }
}

.relative {
    position: relative
}

.login-logo img {
    max-width: 100%;
    max-height: 100%;
}

.input-icon {
    padding-right: 10px;
    display: block;
    width: 20px;
    height: 20px;
}
</style>
