<template>
    <div>
        <group>
            <cell class="cell-value-img" title="用户头像" :is-link="true">
                <img src="../../../../static/images/example/avatar.png" />
            </cell>
            <cell title="姓名" value="Vivian"></cell>
            <cell title="公司" value="深圳分公司"></cell>
            <cell title="部门" value="成本管理部"></cell>
            <cell title="岗位" value="成本专员"></cell>
        </group>

        <group>
            <cell title="当前版本" value="6.0.3.14.08"></cell>
            <cell>
                <span slot="title">在线更新
                    <img style="width:18px;" src="../../../../static/images/example/update.png" />
                </span>
            </cell>
        </group>

        <group>
            <x-switch v-switch-icon-width-auto class="icon-switch" :title="`<img src=${require('../../../../static/images/example/wifi.png')} />wifi下使用`" @on-change="updateWifi"></x-switch>

            <cell class="icon-cell" title="清除缓存" :is-link="true">
                <img src="../../../../static/images/example/clear.png" slot="icon" />
            </cell>
        </group>

        <group style="margin-bottom:10px;">
            <cell title="退出当前账号" @click.native="confirmSignOut"></cell>
        </group>
    </div>
</template>

<script>
import { Group, Cell, XSwitch } from 'vux'
import switchIconWidthAuto from '../../../../directives/switch-icon-width-atuo'
import { signOut } from '../../common/sign'
export default {
    name: 'mine',
    directives: {
        switchIconWidthAuto
    },
    components: {
        Group,
        Cell,
        XSwitch
    },

    methods: {
        updateWifi (val) {
            this.$vux.toast.text(val)
        },
        confirmSignOut () {
            // var _this = this
            this.$vux.confirm.show({
                title: '询问',
                content: '确认要退出吗？',
                onConfirm () {
                    // _this.$store.dispatch(type.SIGN_OUT)
                    signOut()
                }
            })
        }
    }
}
</script>
