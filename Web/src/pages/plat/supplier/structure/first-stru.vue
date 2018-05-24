<template>
	<div class="no-data-wrapper">
		<div class="structure-logo">
			<img src="../../../../static/images/structure_flag.png" />
		</div>
		<p class="stru-msg">{{$t('structure.listStructureTitle')}}</p>

		<div class="fullline">
			<span class="w-65 must-star" v-text="$t('structure.structureName')"></span>
			<div class="right-auto-box">
				<el-input id="structureName" v-model.trim="createModel.StruName"  :maxlength="100"></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65" v-text="$t('structure.struFullName')"></span>
			<div class="right-auto-box">
				<el-input  v-model="createModel.StruFullName" :maxlength="200"></el-input>
			</div>
		</div>
		<div class="fullline">
			<span class="w-65" v-text="$t('structure.struNo')"></span>
			<div class="right-auto-box">
				<el-input  v-model="createModel.StruNo" :maxlength="100"></el-input>
			</div>
		</div>
		<div class="stru-form-btn" @click="save" v-text="$t('structure.addCorp')"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				createModel: {
					StruId: "",
					StruName: "",
					StruFullName: "",
					StruNo: "",
					ParentStruId: null,
					ParentStruName: "",
					IconPath: "",
					RowIndex: "10",
					StruType: "0"
				},
			}
		},
		methods: {
			save() {
				if(this.validate()) {
					this.$loadingOpen();
					this.$post("/api/plat/structures",
						this.createModel,
						function(res) {
							if(res.Code == 0) {
								this.$parent.getTree();
								this.$loadingClose();
								Vue.successMsg(this.$t('structure.addCorpSuccess'));
							} else {
								this.$loadingClose();
								Vue.errorMsg(this.$t('structure.code.'+res.Code));
							}
						})
				}
			},
			validate() {
				if(!this.createModel.StruName) {
					this.$errorTips(this.$t('structure.struNameNotBeEmpty'), "#structureName");
					return false;
				} 
				return true;
			}
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
	
	.structure-logo>img {
		display: block;
		margin: 0 auto;
		padding-left: 65px;
	}
	
	.no-data-wrapper .stru-msg {
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
</style>