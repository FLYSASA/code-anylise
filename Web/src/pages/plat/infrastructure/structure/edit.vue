<template>
	<div class="edit-model clearfix">
		<div class="edit-model-content">
			<div class="fullline" v-show="actStru.StruType==0&&actStru.ParentStruId!=null">
				<span class="w-80" v-text="$t('structure.parentStruName')"></span>
				<div class="right-box drop-down-wrapper">
					<dropdown-tree :url="url" :params="params" empty="根节点" v-model="editModel.ParentStruId" :expand-on-click-node="false" :is-tree="true" :data="companys" :props="struProps" :except-id="option.StruId"></dropdown-tree>
				</div>
			</div>
			<div class="fullline" v-show="(actStru.StruType!=0) || (actStru.StruType==0&&actStru.ParentStruId==null) ">
				<span class="w-80" v-text="$t('structure.parentStruName')"></span>
				<div class="right-box">
					<el-input :disabled="true" :value="editModel.ParentStruName ? editModel.ParentStruName : '根节点'"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-80" v-text="$t('structure.struType')"></span>
				<el-radio-group v-model="editModel.StruType">
					<el-radio class="radio" :label="0" :disabled="true">{{$t('structure.struTypeData.corp')}}</el-radio>
					<el-radio class="radio" :label="1" :disabled="true">{{$t('structure.struTypeData.dept')}}</el-radio>
				</el-radio-group>
			</div>
			<div class="fullline">
				<span class="w-80 must-star" v-text="$t('structure.structureName')"></span>
				<div class="right-box">
					<el-input id="StruName" v-model.trim="editModel.StruName" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-80" v-text="$t('structure.struFullName')"></span>
				<div class="right-box">
					<el-input v-model="editModel.StruFullName" :maxlength="200"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-80" v-text="$t('structure.struNo')"></span>
				<div class="right-box">
					<el-input v-model="editModel.StruNo" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline" v-if="editModel.StruType=='1'">
				<span class="w-80" v-text="$t('structure.deptHeaderName')"></span>
				<div class="right-box">
					<sapi-select v-model="deptHeaderItems" :format="format" @select="selectDeptHeader"></sapi-select>
				</div>
			</div>
			<div class="fullline" v-if="editModel.StruType=='1'">
				<span class="w-80" v-text="$t('structure.chargeLeaderName')"></span>
				<div class="right-box">
					<sapi-select v-model="chargeLeaderItems" :format="format" @select="selectChargeLeader"></sapi-select>
				</div>
			</div>
			<div class="fullline" v-if="editModel.StruType=='1'">
				<span class="w-80" v-text="$t('structure.functionHigherName')"></span>
				<div class="right-box">
					<sapi-select v-model="functionHigherItems" :format="format" @select="selectFunctionHigher"></sapi-select>
				</div>
			</div>
			<div class="fullline">
				<span class="w-80" v-text="$t('rowIndex')"></span>
				<div class="right-box">
					<el-input v-model="editModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
				</div>
			</div>
		</div>

		<div class="edit-footer">
			<el-button size="small" @click="cancel" class="default-button padding-button" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button padding-button" :disabled="disabled" size="small" @click="save" v-text="$t('submit')"></el-button>			
		</div>
		<station-select :node-id="editModel.StationId" v-model="stationVisible" :call-back="selectedStation"></station-select>
	</div>
</template>

<script>
	import dropdownTree from "@/components/sapi-select.vue";
	import stationSelect from "@/components/sapi-station-single.vue";
	import select from "@/components/sapi-select-btn.vue";
	export default {
		data() {
			return {
				editModel: {
					ParentStruId:""
				},
				isStruTypeDisabled: true,
				struProps: {
					children: 'Children',
					label: 'StruName',
					value:'StruId',
					hasChild:"HasChild"
				},
				companys: [],
				stationVisible:false,
				selectEventType:"",
				disabled: false,
				deptHeaderItems:[],
				chargeLeaderItems:[],
				functionHigherItems:[],
				url: "/api/plat/structures/brief",
				params: {
					"withDept": false,
					nodeIdKey: "parentStruId"
				}
			}
		},
		props: ["option", "actStru"],
		components: {
			"dropdown-tree": dropdownTree,
			"station-select":stationSelect,
			"sapi-select":select
		},
		methods: {
			cancel() {
				this.$emit('viewBack');
			},
			save() {
				this.editModel.DeptHeaderId = this.deptHeaderItems[0] ? this.deptHeaderItems[0].StationId : null;
				this.editModel.ChargeLeaderId = this.chargeLeaderItems[0] ? this.chargeLeaderItems[0].StationId : null;
				this.editModel.FunctionHigherId = this.functionHigherItems[0] ? this.functionHigherItems[0].StationId : null;
				if (this.editModel.ParentStruId==='') {
					this.editModel.ParentStruId=null;
				}
				if(this.validate()) {
					this.disabled = true;
					this.$loadingOpen();
					var struType = this.editModel.StruType;
					this.$put("/api/plat/structures",
						this.editModel,
						function(res) {
							this.$parent.getTree();
								this.$loadingClose();
								Vue.successMsg(struType != 1 ? this.$t('structure.editCorpSuccess') : this.$t('structure.editDeptSuccess'));								
						},
					function(res){
						this.$loadingClose();
						Vue.errorMsg(this.$t('structure.code.'+res.Code));
					});
				}
			},
			selectDeptHeader(){
				this.selectEventType = "DeptHeader";
				this.stationVisible=true;
			},
			selectChargeLeader(){
				this.selectEventType = "ChargeLeader";
				this.stationVisible=true;
			},
			selectFunctionHigher(){
				this.selectEventType = "FunctionHigher";
				this.stationVisible=true;
			},
			selectedStation(res){
				if(this.selectEventType == "DeptHeader"){
					this.deptHeaderItems = [res];
				}
				else if(this.selectEventType == "ChargeLeader"){
					this.chargeLeaderItems = [res];
				}
				else if(this.selectEventType == "FunctionHigher"){
					this.functionHigherItems = [res];
				}
			},
			format(item){
				return item.CorpName + "/" + item.DeptName + "/" + item.StationName;
			},
			validate() {
				if(!this.editModel.StruName) {
					this.$errorTips(this.$t("structure.struNameNotBeEmpty"), "#StruName");
					return false;
				} 				
				return true;
			},			
			getCompanys() {
				var nodeId = this.editModel.ParentStruId;
				var url = "/api/plat/structures/brief";
				if(nodeId) {
					url = "/api/plat/structures/{struId}/parentAndSiblings";
				}
				
				this.$get(url, {
					"withDept": false,
					struId:nodeId
				}, function(res) {
					
					this.companys = res;
					this.editModel.ParentStruId=nodeId||"";
					
				});
			},
			setEditModel(val){
			
				var obj=JSON.parse(JSON.stringify(val));
				this.editModel = obj;
				
				this.deptHeaderItems = this.editModel.DeptHeader ? [this.editModel.DeptHeader] : [];
				this.chargeLeaderItems = this.editModel.ChargeLeader ? [this.editModel.ChargeLeader] : [];
				this.functionHigherItems = this.editModel.FunctionHigher ? [this.editModel.FunctionHigher] : [];
				
				//在修改时，如果左侧选中的是公司，则重新加载父级架构的下拉列表数据
				if(this.actStru.StruType == 0 && this.companys.length === 0) {
					this.getCompanys();
				}
			}
		},
		watch: {
			option(val) {
				this.changeFlag = false;
				if(val && typeof val === "object") {
					this.setEditModel(val);
				} else {
					this.editModel = {};
				}
			}
		},
		mounted() {
			if(this.option && typeof this.option === "object") {
				this.setEditModel(this.option);
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