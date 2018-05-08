<template>
	<div class="structrue-view">
		<div class="fullline">
			<span class="w-80" v-text="$t('structure.structureName')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.StruName" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80" v-text="$t('structure.struFullName')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.StruFullName" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80" v-text="$t('structure.struNo')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.StruNo" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80" v-text="$t('structure.struType')"></span>
			<div class="right-box">
				<el-input :value="(viewModel.StruType=='0'?$t('structure.struTypeData.corp'):$t('structure.struTypeData.dept'))" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80" v-text="$t('structure.parentStruName')"></span>
			<div class="right-box">
				<el-input :value="viewModel.ParentStruName ? viewModel.ParentStruName : '根节点'" readonly></el-input>
			</div>
		</div>
		<div class="fullline" v-if="viewModel.StruType=='1'">
			<span class="w-80" v-text="$t('structure.corpName')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.CorpName" readonly></el-input>
			</div>
		</div>
		<div class="fullline" v-if="viewModel.StruType=='1'">
			<span class="w-80" v-text="$t('structure.deptHeaderName')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.DeptHeaderName" readonly></el-input>
			</div>
		</div>
		<div class="fullline" v-if="viewModel.StruType=='1'">
			<span class="w-80" v-text="$t('structure.chargeLeaderName')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.ChargeLeaderName" readonly></el-input>
			</div>
		</div>
		<div class="fullline" v-if="viewModel.StruType=='1'">
			<span class="w-80" v-text="$t('structure.functionHigherName')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.FunctionHigherName" readonly></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-80" v-text="$t('rowIndex')"></span>
			<div class="right-box">
				<el-input v-model="viewModel.RowIndex" readonly></el-input>
			</div>
		</div>
	</div>
</template>

<script>
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
				this.viewModel.DeptHeaderName = this.getFullStationName(this.viewModel.DeptHeader);
				this.viewModel.ChargeLeaderName = this.getFullStationName(this.viewModel.ChargeLeader);
				this.viewModel.FunctionHigherName = this.getFullStationName(this.viewModel.FunctionHigher);
			},
			getFullStationName(item){
				if (item){
					return item.CorpName + "/" + item.DeptName + "/" + item.StationName;
				}
				return "";
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
	.structrue-view{
		width: 100%;
		height: 100%;
		overflow: auto;
		padding: 30px 15px 15px 15px;
	}
</style>