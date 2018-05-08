<template>
	<div class="no-data-wrapper">
		<div class="structrue-logo">
			<img src="../../../../static/images/structure_flag.png" />
		</div>
		<p class="type-msg padding-left-55" v-text="$t('formType.firstTypeDesc')"></p>

		<div class="fullline">
			<span class="w-65 must-star" v-text="$t('formType.typeName')"></span>
			<div class="right-auto-box">
				<el-input id="txtTypeName" v-model.trim="createModel.TypeName"  :maxlength="100"></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65 must-star" v-text="$t('formType.baseFormType')"></span>
			<div class="right-auto-box">
				<sapi-select v-model="createModel.BaseFormType" :data="baseFormTypes" :props="{label:'BaseFormTypeName',value:'BaseFormTypeId'}"></sapi-select>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65" v-text="$t('formType.remark')"></span>
			<div class="right-auto-box">
                <el-input :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="createModel.Remark">
				</el-input>
			</div>
		</div>
		<div class="stru-form-btn" @click="save" v-text="$t('formType.addFormType')"></div>
	</div>
</template>

<script>
    import tips from "@/components/sapi-tips.js";
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
				baseFormTypes:basFormType.baseFormTypes
			}
        },
        components: {
            "sapi-select":select
        },
		methods: {
			save() {
                if(!this.validate())
                {
                    return;
                }
                this.$post("/api/plat/formTypes/", this.createModel, function(res) {
                    this.$parent.getFormTree();
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
			}
        },
        created() {
			Vue.use(tips);
		}
	}
</script>

<style>
	.no-data-module {
		width: 100%;
		height: 100%;
	}
	
	.no-data-wrapper {
		position: absolute;
		left: 50%;
		margin-left: -210px;
		top: 60px;
		width: 420px;
		height: 412px;
	}
	
	.structrue-logo>img {
		display: block;
		margin: 0 auto;
		padding-left: 65px;
	}
	
	.no-data-wrapper .type-msg {
		text-align: center;
		font-size: 14px;
		color: #999999;
		padding-left: 65px;
		margin: 50px 0 20px 0;
	}
	
	.no-data-wrapper .stru-form-btn {
		background-color: #6ecdfa;
		width: 350px;
		height: 38px;
		border-radius: 4px;
		text-align: center;
		color: #fff;
		font-size: 15px;
		line-height: 38px;
		margin: 56px 0 0 68px;
		cursor: pointer;
	}
	
	.no-data-wrapper .padding-left-55{
		padding-left: 55px;
	}
</style>