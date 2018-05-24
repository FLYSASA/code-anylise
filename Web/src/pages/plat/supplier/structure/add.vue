<template>
	<sapi-dialog v-model="visible" width="700px" top="26%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="title"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('structure.parentStruName')"></span>
					<div class="right-auto-box">
						<el-input :value="createModel.ParentStruName||'根节点'" :disabled="true"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('structure.struType')"></span>
					<div class="right-auto-box">
						<el-radio-group v-model="strutype" @change="changeStruType">
							<el-radio class="radio" :label="0" :disabled="isDisabledStruType">{{$t('structure.struTypeData.corp')}}</el-radio>
							<el-radio class="radio" :label="1" :disabled="isDisabledStruType">{{$t('structure.struTypeData.dept')}}</el-radio>
						</el-radio-group>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('structure.structureName')"></span>
					<div class="right-auto-box">
						<el-input id="StruName" v-model.trim="createModel.StruName" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 lh-30" v-text="$t('structure.struFullName')"></span>
					<div class="right-auto-box">
						<el-input  v-model="createModel.StruFullName" :maxlength="200"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline" >
				<div class="wp-50">
					<span class="w-65 lh-30" v-text="$t('structure.struNo')"></span>
					<div class="right-auto-box">
						<el-input  v-model="createModel.StruNo" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 lh-30" v-text="$t('rowIndex')"></span>
					<div class="right-auto-box">
						<el-input v-model="createModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
					</div>	
				</div>
			</div>
			<div class="fullline" v-if="strutype==1">
				<span class="w-65 lh-30" v-text="$t('structure.deptHeaderName')"></span>
				<div class="right-auto-box">
					<sapi-select v-model="deptHeaderItems" :format="format" @select="selectDeptHeader"></sapi-select>
				</div>
			</div>
			<div class="fullline" v-if="strutype==1">
				<span class="w-65 lh-30" v-text="$t('structure.chargeLeaderName')"></span>
				<div class="right-auto-box">
					<sapi-select v-model="chargeLeaderItems" :format="format" @select="selectChargeLeader"></sapi-select>
				</div>
			</div>
			<div class="fullline" v-if="strutype==1">
				<span class="w-65 lh-30" v-text="$t('structure.functionHigherName')"></span>
				<div class="right-auto-box">
					<sapi-select v-model="functionHigherItems" :format="format" @select="selectFunctionHigher"></sapi-select>
				</div>
			</div>
		</div>

		<div class="footer">			
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>
		</div>
		<station-select slot="moreDialog" :node-id="createModel.StationId" v-model="stationVisible" :call-back="selectedStation"></station-select>
	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
	import stationSelect from "@/components/sapi-station-single.vue";
	import select from "@/components/sapi-select-btn.vue";
	export default {
		data() {
			return {
				strutype: 0,
				createModel: {
					StruType: 0
				},
				disabled: false,
				stationVisible:false,
				selectEventType:"",
				visible: false,
				isDisabledStruType:false,	//是否禁用架构类型，默认值为false,
				deptHeaderItems:[],
				chargeLeaderItems:[],
				functionHigherItems:[]
			}
		},
		props: ["option", "value", "title"],
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit('input', false);
			},
			open() {
				//初始化createModel，option：本次新增对应的父级信息
				this.createModel = this.option;
				this.createModel.StruType = 0;		//默认选中公司类型
				this.createModel.StruName = "";
				this.createModel.StruFullName = "";
				this.createModel.StruNo = "";
				this.createModel.RowIndex = 10;
				this.deptHeaderItems = [];			//负责人
				this.chargeLeaderItems = [];		//分管领导
				this.functionHigherItems = [];		//职能上级
				this.isDisabledStruType = false;	//初始化是否禁用架构类型
				//设置是否禁用架构类型，以及默认的架构类型
				//父级架构不存在，则只能是公司
				if (this.createModel.ParentStruId == null){
					this.isDisabledStruType = true;
				} 								
				//父级架构为部门，则只能是部门
				if (this.createModel.ParentStruType == 1){
					this.isDisabledStruType = true;
					this.createModel.StruType = 1;
				}
				
				this.strutype = this.createModel.StruType;
				this.getMaxRowIndex();			
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
				if(!this.createModel.StruName) {
					this.$errorTips(this.$t("structure.struNameNotBeEmpty"), "#StruName");
					return false;
				} 				
				return true;
			},
			changeStruType() {
				for(var key in this.createModel) {
					if(key != "ParentStruId" && key != "ParentStruName" && key != "StruType") {
						this.createModel[key] = "";
					}
				}
				this.getMaxRowIndex();
				this.$closeWaringTips(".form-error-tips");
			},			
			getMaxRowIndex() {			
				this.$get("/api/plat/structures/maxRowIndex", {
					"parentStruId": this.option.ParentStruId,
					"childType": this.strutype
				}, function(res) {
					//实时更新createModel的行号
					this.createModel=Object.assign({},this.createModel,{'RowIndex':res})
				});
			},			
			submit() {
				this.$closeWaringTips(".form-error-tips");
				this.createModel.DeptHeaderId = this.deptHeaderItems[0] ? this.deptHeaderItems[0].StationId : null;
				this.createModel.ChargeLeaderId = this.chargeLeaderItems[0] ? this.chargeLeaderItems[0].StationId : null;
				this.createModel.FunctionHigherId = this.functionHigherItems[0] ? this.functionHigherItems[0].StationId : null;
				if(this.validate()) {
					this.createModel.StruType = this.strutype;
					this.disabled = true;
					this.$loadingOpen();
					this.$post("/api/plat/structures",
						this.createModel,
						function(res) {
							this.$parent.getTree();
							this.getMaxRowIndex();
							this.createModel.StruName = "";
							this.createModel.StruFullName = "";
							this.createModel.StruNo = "";
							this.close();
							this.$loadingClose();
							Vue.successMsg(this.strutype != 1 ? this.$t('structure.addCorpSuccess') : this.$t('structure.addDeptSuccess'));
						},
						function(res) {
							this.$loadingClose();
						});
				}
			},
		},
		components: {
			"sapi-dialog": dialog,
			"station-select":stationSelect,
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