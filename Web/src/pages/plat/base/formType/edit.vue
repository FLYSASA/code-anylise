<template>
	<div class="edit-model clearfix">
		<div class="edit-model-content">
			<div class="fullline">
                <span class="w-80 must-star" v-text="$t('formType.typeName')"></span>
                <div class="right-box">
                    <el-input id="txtTypeName" v-model.trim="editModel.TypeName"  :maxlength="100"></el-input>
                </div>
            </div>
            <div class="fullline">
                <span class="w-80" :class="{'must-star':!isChild}" v-text="$t('formType.baseFormType')"></span>
                <div class="right-box">
                    <sapi-select v-model="editModel.BaseFormType" :data="baseFormTypes" :readonly="isChild"
                        :props="{label:'BaseFormTypeName',value:'BaseFormTypeId'}" ></sapi-select>
                </div>
            </div>
            <div class="fullline" v-show="editModel.Level > 1">
                <span class="w-80" v-text="$t('formType.parentType')"></span>
                <div class="right-box">
                    <el-input v-model="editModel.ParentTypeName" readonly></el-input>
                </div>
            </div>
            <div class="fullline">
                <span class="w-80" v-text="$t('rowIndex')"></span>
                <div class="right-box">
                	<el-input v-model="editModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
                </div>
            </div>
            <div class="fullline">
                <span class="w-80" v-text="$t('formType.remark')"></span>
                <div class="right-box">
                    <el-input :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="editModel.Remark">
                    </el-input>
                </div>
            </div>
		</div>

		<div class="edit-footer">
			<el-button size="small" @click="cancel" class="default-button padding-button" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button padding-button" :disabled="disabled" size="small" @click="save" v-text="$t('submit')"></el-button>			
		</div>
	</div>
</template>

<script>
    import select from "@/components/sapi-select.vue";
    import formatMixin from "@/components/sapi-directive-input.js"
    import basFormType from "../../static/js/basFormType.js";

	export default {
		data() {
			return {
				editModel: {
                    TypeId: null,
					TypeName: null,
					ParentTypeId: null,
                    BaseFormType: null,
                    RowIndex:null,
					Remark: null
                },
                baseFormTypes:basFormType.baseFormTypes,
                disabled:false,
                isChild:false
			}
		},
        props: ["option"],
        mixins: [formatMixin],
		components: {
			 "sapi-select":select
		},
		methods: {
			save() {
                if(!this.validate()) {
					return;
                }
                this.disabled = false;
                this.$put("/api/plat/formTypes/", this.editModel, 
                    function(res) {
                        this.disabled = false;
                        this.$parent.getFormTree();
                        this.editModel = {
                            TypeId: null,
                            TypeName: null,
                            ParentTypeId: null,
                            BaseFormType: null,
                            Remark: null
                        };
                        Vue.successMsg(this.$t('formType.editTypeSuccess'));
                    },
                    function(res){
						this.$loadingClose();
						Vue.errorMsg(this.$t('formType.code.'+res.Code));
                    }
                );
			},
			validate() {
				if(!this.editModel.TypeName) {
					this.$errorTips(this.$t('formType.writeTypeNamePlease'), "#txtTypeName");
					return false;
                } 
                if(!this.editModel.BaseFormType) {
                    Vue.msg(this.$t('formType.selectTypePlease'));
					return false;
                }                 
				return true;
            },	
            cancel() {
				this.$emit('viewBack');
			},
            //初始化模型		
			initEditModel(val){
                this.editModel = val;
                if(val.ParentTypeId){
                    this.isChild = true;
                }
                else{
                    this.isChild = false;
                }
			}
		},
		watch: {
			option(val) {
				this.changeFlag = false;
				if(val && typeof val === "object") {
					this.initEditModel(val);
				} else {
					this.editModel = {};
				}
			}
		},
		mounted() {
			if(this.option && typeof this.option === "object") {
				this.initEditModel(this.option);
			}
		}
	}
</script>

<style>
	.edit-model {
		height: 100%;
		position: relative;
	}
	
	.edit-model .edit-model-content {
		height: calc(100% - 58px);
		overflow: auto;
		padding: 30px 15px 15px 15px;
	}
	
	.edit-model .edit-footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 58px;
		text-align: center;
		padding-top: 15px;
		box-shadow: 5px 1px 5px 5px #eee;
	}
</style>