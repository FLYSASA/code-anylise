<template>
	<sapi-dialog v-model="visible" width="700px" top="26%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('station.addStationTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('station.stationName')"></span>
					<div class="right-auto-box">
						<el-input id="txtStationName" v-model.trim="createModel.StationName" :maxlength="50"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('station.stationNo')"></span>
					<div class="right-auto-box">
						<el-input v-model="createModel.StationNo" :disabled="true"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('station.corpName')"></span>
					<div class="right-auto-box">
						<el-input v-model="createModel.CorpName" :disabled="true"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('station.deptName')"></span>
					<div class="right-auto-box">
						<el-input v-model="createModel.DeptName" :disabled="true"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('station.higherStation')"></span>
				<div class="right-auto-box">
					<!--<el-input placeholder="点击右侧按钮选择上级岗位" :value="createModel.LeaderStationName">
						<el-button slot="append" icon="search" @click="selectStation"></el-button>
					</el-input>-->
					<sapi-select-btn v-model="items" :format="format" @select="selectStation"></sapi-select-btn>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('station.position')"></span>
					<div class="right-auto-box">
						<!--<el-select v-model="createModel.PositionId">
							<el-option v-for="item in createModel.Positions" :key="item.PositionId" :label="item.PositionName" :value="item.PositionId"></el-option>
						</el-select>-->
						<sapi-select clearable v-model="createModel.PositionId" :data="createModel.Positions" :props="{label:'PositionName',value:'PositionId'}"></sapi-select>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('rowIndex')"></span>
					<div class="right-auto-box">
						<el-input v-model="createModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65 lh-30" v-text="$t('station.description')"></span>
				<div class="right-auto-box">
					<el-input :maxlength="1000" type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="createModel.Description">
					</el-input>
				</div>
			</div>
		</div>
		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>			
		</div>
		
		<component :is="currentView" slot="moreDialog" :node-id="createModel.StationId" v-model="stationVisible" :call-back="selectedStation"></component>

	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
	import selectBtn from "@/components/sapi-select-btn.vue";
	import select from "@/components/sapi-select.vue";
	export default {
		data() {
			return {
				disabled: false,
				visible: false,
				stationVisible: false,
				createModel: {
					"CorpName":"",
					"DeptName":"",
					"StationId": "",
					"StationName": "",
					"StationNo": "",
					"DeptId": "",
					"LeaderStationId": "",
					"PositionId": "",
					"Description": "",
					"RowIndex": 0,
					LeaderStation:{}
				},
				items:[],
				currentView:""
				
			}
		},
		props: ["option", "value"],
		methods: {
			open() {
				this.items=[];
				this.$get("/api/plat/stations/createViewModel/",{deptId:this.option.StruId}, function(res) {
					this.createModel = res;
				});
			},
			close() {
				this.$emit("input", false);
			},
			submit() {
				this.createModel.LeaderStation = this.items[0];
				if(!this.validate()) {
					return;
				} 
				this.disabled = true;
				this.$post("/api/plat/stations/", this.createModel, function(res) {
					this.disabled = false;
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t("station.addStationSuccess"));
				});
			},
			selectStation() {
				this.stationVisible = true;
				this.currentView="station-select";
			},
			selectedStation(res) {
				this.items=[res];	
			},
			validate() {
				this.$closeWaringTips(".form-error-tips");
				if(!this.createModel.StationName) {
					this.$errorTips(this.$t("station.stationNameNotBeEmpty"), "#txtStationName");
					return false;
				}				
				return true;
			},
			format(item){
				return item.CorpName + "/" + item.DeptName + "/" + item.StationName;
			}
		},
		components: {
			"sapi-dialog": dialog,
			"sapi-select-btn":selectBtn,
			"sapi-select":select,
			"station-select": (resolve) => {
				require(['@/components/sapi-station-single.vue'], resolve);
			}
		},
		watch: {
			value(val) {
				this.visible = val;
			}
		},
		created() {
			Vue.use(tips);
			this.visible = this.value;
		}
	}
</script>

<style>

</style>