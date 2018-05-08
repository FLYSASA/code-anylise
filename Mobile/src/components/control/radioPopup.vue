<template>
	<custom-popup v-model="visible" :header-height="65" 
        @on-show="$emit('on-show')" @on-hide="hide" :footer-height="50">
        <div slot="header" class="radio-popup-title" v-html="title"></div>
        <scroller height="100%" lock-x :scrollbar-y="true">
            <radio style="background-color:#FFF;" :options="sheetMenus" @on-change="change" v-model="radioValue"></radio>
        </scroller>
        <div slot="footer">
            <div class="weui-dialog__ft" style="background-color:#F8F8F8;">
                <a href="javascript:;" @click="cancel" class="text-center weui-dialog__btn weui-dialog__btn_default">取消</a> 
                <a href="javascript:;" @click="confirm" class="text-center weui-dialog__btn weui-dialog__btn_primary">确定</a>
            </div>
        </div>
    </custom-popup>
</template>

<script>
    import { Radio, Popup, Group, Scroller } from 'vux'
    import CustomPopup from '@/components/control/customPopup.vue'
    import utils from '@/static/js/utils'

    export default {
        name: 'radio-popup',

        components: {
            Radio, Popup, Group, Scroller, CustomPopup
        },

        model: {
            prop: 'value',
            event: 'value-change'
        },
        props: {
            /**
             * 可选项数组集合
             */
            menus: {
                default () {
                    return []
                },
                type: Array
            },
            /**
             * radio组件绑定menus需要{key,value}对象集合
             * 通过设置{key: 'id', value: 'name'}来匹配对应的属性值
             */
            mapProp: Object,
            // 弹出层显示隐藏，默认是隐藏
            visible: {
                default: false,
                type: Boolean
            },
            // 弹出层标题
            title: {
                default: '',
                type: String
            },
            // 指定选中值
            value: String,
            // 按确定是无选中值时提示
            noChooseMsg: {
                type: String,
                default: '请选择一项数据。'
            }
        },
        data () {
            return {
                // 选中值
                radioValue: ''
            }
        },
        computed: {
            sheetMenus () {
                if (!utils.isArray(this.menus)) {
                    return []
                }

                if (this.mapProp && this.mapProp.hasOwnProperty('key') &&
                    this.mapProp.hasOwnProperty('value')) {
                    const arr = []
                    const _this = this
                    this.menus.forEach(function (item) {
                        var m = {}
                        for (var prop in _this.mapProp) {
                            m[prop] = item[_this.mapProp[prop]]
                        }
                        arr.push(m)
                    })

                    return arr
                } else {
                    return this.menus.slice(0)
                }
            }
        },
        methods: {
            change (val, label) {
                this.val = val
                this.label = label
            },
            confirm () {
                if (!this.val) {
                    this.$vux.alert.show({
                        content: this.noChooseMsg
                    })
                    return
                }

                this.visible = false
                this.$emit('value-change', this.val)
                this.$emit('on-confirm', this.val, this.label)
            },
            hide () {
                this.visible = false
                this.$emit('on-hide')
            },
            cancel () {
                this.visible = false
                this.$emit('on-cancel')
            }
        },

        watch: {
            value (val) {
                this.radioValue = val
            }
        }
    }
</script>

<style>
    .radio-popup-title{
        border-bottom:1px solid #D5D5D6;
        height: 64px;
        text-align: center;
        vertical-align: middle;
        line-height: 64px;
        color: #888;
    }
</style>