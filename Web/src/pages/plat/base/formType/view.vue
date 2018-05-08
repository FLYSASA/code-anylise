<template>
	<div class="formType-view">
		<div class="fullline">
			<span class="w-80" v-text="$t('formType.typeName')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.TypeName" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80" v-text="$t('formType.baseFormType')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.BaseFormType" readonly></el-input>
			</div>
		</div>
        <div class="fullline" v-show="viewModel.Level > 1">
			<span class="w-80" v-text="$t('formType.parentType')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.ParentTypeName" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80" v-text="$t('rowIndex')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.RowIndex" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80" v-text="$t('formType.remark')"></span>
			<div class="right-box">
				 <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="viewModel.Remark" readonly>
				</el-input>
			</div>
		</div>
	</div>
</template>

<script>
    import basFormType from "../../static/js/basFormType.js";
	export default{
		data(){
			return{
				viewModel:{}
			}
		},
		props:["option"],
		methods:{
			getViewModel(val){
                this.viewModel=val;
                this.viewModel.BaseFormType = this.getBaseFormType(val.BaseFormType);
            },
            getBaseFormType(baseType)
            {
                return basFormType.baseFormTypeValue[baseType];
            }
		},
		mounted(){
			this.getViewModel(this.option);
		},
		watch:{
			option(val){
				this.getViewModel(val);
			}
		}
	}
</script>

<style>
	.formType-view{
		width: 100%;
		height: 100%;
		overflow: auto;
		padding: 30px 15px 15px 15px;
	}
</style>