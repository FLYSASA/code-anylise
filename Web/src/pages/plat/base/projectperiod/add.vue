<template>
    <sapi-dialog v-model="visible" width="500px" top="26%" class="add" @on-open="open" @on-close="close">
        <span slot="title" v-text="$t('projectPeriod.addProjectPeriodTitle')"></span>
        <div class="form-error-tips"></div>
        <div class="form-content">
            <div class="fullline">
                <span class="w-65 must-star" v-text="$t('projectPeriod.periodName')"></span>
                <div class="right-auto-box">
                    <el-input id="txtPeriodName"  v-model.trim="createModel.PeriodName" :maxlength="100"></el-input>
                </div>
            </div>
            <div class="fullline">
                <span class="w-65 lh-30" v-text="$t('projectPeriod.remark')"></span>
                <div class="right-auto-box">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="createModel.Remark" :maxlength="200"></el-input>
                </div>
            </div>
        </div>

        <div class="footer">
            <el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
            <el-button size="small" class="blue-button" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>
        </div>
    </sapi-dialog>
</template>

<script>
    import tips from "@/components/sapi-tips.js";
    import dialog from "@/components/sapi-dialog.vue";

    export default {
        data() {
            return {
                disabled: false,
                visible: false,
                createModel: {              
                    PeriodName: "",
                    Remark: ""
                }             
            }
        },
        props: ["value"],
        methods: {
            close() {
                this.$closeWaringTips(".form-error-tips");
                this.$emit("input", false);
            },
            open() {
                this.createModel.PeriodName = "";
                this.createModel.Remark = "";               
            },
            submit() {
                if (!this.validate()) {
                    return;
                }
                this.disabled = true;
                this.$post("/api/plat/projectPeriods/", this.createModel, function (res) {
                    this.$parent.loadData();
                    this.disabled=false;
                    this.close();
                    Vue.successMsg(this.$t('projectPeriod.addProjectPeriodSuccess'));
                });
            },
            validate() {
                this.$closeWaringTips(".form-error-tips");
                if(!this.createModel.PeriodName) {
                    this.$errorTips(this.$t('projectPeriod.periodNameNotBeEmpty'),"#txtPeriodName");
                    return false;
                }
                return true;
            }
        },
        components: {
            "sapi-dialog": dialog
        },
        watch: {
            value(val) {
                this.visible = val;
            }
        },
        created() {
            Vue.use(tips);
        },
        mounted() {
            this.visible = this.value;
        }
    }
</script>
