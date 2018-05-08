<template>
	<sapi-dialog v-model="visible" width="600px" top="26%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="title"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
                <span class="w-80 must-star" v-text="$t('formType.typeName')"></span>
                <div class="right-box">
                    <el-input id="txtTypeName" v-model.trim="createModel.TypeName"  :maxlength="100"></el-input>
                </div>
            </div>
            <div class="fullline">
                <span class="w-80" :class="{'must-star':!bChild}" v-text="$t('formType.baseFormType')"></span>
                <div class="right-box" v-if="!bChild">
                    <sapi-select v-model="createModel.BaseFormType" :data="baseFormTypes"
                    :props="{label:'BaseFormTypeName',value:'BaseFormTypeId'}"></sapi-select>
                </div>
                <div class="right-box" v-else>
                    <sapi-select v-model="createModel.BaseFormType" :data="baseFormTypes" :readonly="true" 
                    :props="{label:'BaseFormTypeName',value:'BaseFormTypeId'}"></sapi-select>
                </div>
            </div>
            <div class="fullline">
                <span class="w-80" v-text="$t('formType.remark')"></span>
                <div class="right-box">
                    <el-input :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="createModel.Remark">
                    </el-input>
                </div>
            </div>
        </div>
		<div class="footer">			
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>
		</div>
	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
    import dialog from "@/components/sapi-dialog.vue";
    import select from "@/components/sapi-select.vue";
    import basFormType from "../../static/js/basFormType.js";

	export default {
		data() {
			return {
				createModel: {
                    TypeId: null,
					TypeName: null,
					ParentTypeId: null,
					BaseFormType: null,
					Remark: null
                },
				baseFormTypes:basFormType.baseFormTypes,
                visible:false,
                disabled:false,
                bChild:false
			}
		},
		props: ["option", "value", "title","isAddChild"],
		methods: {
			open() {
                this.bChild = this.isAddChild;
                this.createModel = this.option;
			},	
			submit() {
                if(!this.validate()) {
					return;
                }

                this.disabled = true;
                this.$post("/api/plat/formTypes/", this.createModel, function(res) {
                    this.disabled = false;
                    this.$parent.getFormTree();
                    this.createModel = {
                        TypeId: null,
                        TypeName: null,
                        ParentTypeId: null,
                        BaseFormType: null,
                        Remark: null
                    };
                    this.close();
                    Vue.successMsg(this.$t('formType.addTypeSuccess'));
                });
        
            },
            validate() {
				if(!this.createModel.TypeName) {
					this.$errorTips(this.$t('formType.writeTypeNamePlease'), "#txtTypeName");
					return false;
                } 
                if(!this.createModel.BaseFormType) {
                    Vue.msg(this.$t('formType.selectTypePlease'));
					return false;
				} 
				return true;
			},	
            close() {
                this.$closeWaringTips(".form-error-tips");
				this.$emit('input', false);
			}
		},
		components: {
            "sapi-dialog": dialog,
            "sapi-select":select
		},
		created() {
			Vue.use(tips);
		},
		mounted() {
			this.visible = this.value;
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		}
	}
</script>

<style>

</style>