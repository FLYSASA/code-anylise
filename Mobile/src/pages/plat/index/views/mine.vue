<template>
    <div>
        <group>
            <cell class="cell-value-img" :title="$t('plat.userAvatar')" :is-link="true">
                <img :src="headIconPath" />
            </cell>
            <cell :title="$t('plat.fullName')" :value="aliasName"></cell>
            <cell :title="$t('plat.company')" :value="corpName"></cell>
            <cell :title="$t('plat.department')" :value="deptName"></cell>
            <cell :title="$t('plat.station')" :value="defaultStationName"></cell>
        </group>

        <group>
            <popup-picker :title="$t('plat.language')" v-model="lang"
                :cancel-text="$t('base.btns.cancel')" :confirm-text="$t('base.btns.confirm')"
                :data="langList" @on-change="changeLang"></popup-picker>
        </group>

        <group>
            <cell :title="$t('plat.currVersion')" value="1.0.0"></cell>
            <cell>
                <span slot="title">
                    {{$t('plat.lineUpdate')}}
                    <img style="width:18px;" src="../../../../static/images/example/update.png" />
                </span>
            </cell>
        </group>

        <group>
            <cell class="icon-cell" :title="$t('plat.clearCache')" :is-link="true">
                <img src="../../../../static/images/example/clear.png" slot="icon" />
            </cell>
        </group>

        <group style="margin-bottom:10px;">
            <cell :title="$t('plat.signOut')" @click.native="confirmSignOut"></cell>
        </group>
    </div>
</template>

<script>
import { Group, Cell, XSwitch, PopupPicker } from 'vux'
import switchIconWidthAuto from '@/directives/switch-icon-width-atuo'
import { signOut, getLoginInfo } from '@/static/js/sign'
import { getUserBrief } from '../../api/user.js'
import {setI18nLocale} from '@/static/js/createI18n.js'

export default {
    name: 'mine',
    directives: {
        switchIconWidthAuto
    },
    components: {
        Group,
        Cell,
        XSwitch,
        PopupPicker
    },

    data () {
        return {
            aliasName: '',
            corpName: '',
            defaultStationName: '',
            deptName: '',
            headIconPath: require('@/static/images/plat/avatar.png')
        }
    },
    computed: {
        langList () {
            const langs = this.$t('base.languages')
            const rst = []
            for (var prop in langs) {
                if (langs.hasOwnProperty(prop)) {
                    rst.push(langs[prop])
                }
            }

            return [rst]
        },
        lang () {
            const langs = this.$t('base.languages')
            return [langs[this._i18n.locale]]
        }
    },
    methods: {
        getUserBrief () {
            let loginInfo = getLoginInfo()
            const _this = this
            if (loginInfo) {
                getUserBrief().then(function (data) {
                    _this.aliasName = data.AliasName
                    _this.corpName = data.CorpName
                    _this.defaultStationName = data.DefaultStationName
                    _this.deptName = data.DeptName

                    if (data.HeadIconPath) {
                        _this.headIconPath = data.HeadIconPath
                    }
                })
            }
        },
        changeLang (vals) {
            let langs = this.$t('base.languages')
            let lang = ''
            for (var prop in langs) {
                if (langs[prop] === vals[0]) {
                    lang = prop
                    break
                }
            }
            setI18nLocale(lang)
        },
        confirmSignOut () {
            this.$vux.confirm.show({
                title: this.$t('plat.inquire'),
                content: this.$t('plat.sureToQuit'),
                confirmText: this.$t('base.btns.confirm'),
                cancelText: this.$t('base.btns.cancel'),
                onConfirm () {
                    signOut()
                }
            })
        }
    },

    created () {
        this.getUserBrief()
    }
}
</script>
