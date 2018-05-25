<template>
	<sapi-dialog v-model="visible" width="800px" top="6%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('employee.addEmployeeTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('employee.SupName')"></span>
					<div class="right-auto-box">
						<el-input id="addSupName" v-model.trim="createModel.SupName" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 must-star" v-text="$t('employee.SupNo')"></span>
					<div class="right-auto-box">
						<el-input id="addSupNo" v-model.trim="createModel.SupNo" :maxlength="100"></el-input>
					</div>
				</div>
			</div>

			<!-- 省 城市 区域 -->
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('employee.ProvinceName')"></span>
					<div class="right-auto-box">
						<sapi-select v-model="createModel.ProvinceName" :data="provinces" :props="{label:'Name',value:'Id'}" @change="provinceChange"></sapi-select>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 must-star" v-text="$t('employee.CityName')"></span>
					<div class="right-auto-box">
						<sapi-select v-model="createModel.CityId" :data="citys" :props="{label:'Name',value:'Id'}" @change="cityChange"></sapi-select>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('employee.AreaName')"></span>
					<div class="right-auto-box">
						<sapi-select v-model="createModel.AreaId" :data="areas" :props="{label:'Name',value:'Id'}" @change="areaChange"></sapi-select>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 must-star" v-text="$t('employee.SupId')"></span>
					<div class="right-auto-box">
						<el-input id="addSupId" v-model.trim="createModel.SupId" :maxlength="100"></el-input>
					</div>
				</div>
			</div>	
			<!-- 供方分类 -->
			<div class="fullline">
				<div class="wp-100">
					<span class="w-65 must-star" v-text="$t('供方分类')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="createModel.supplierClasses" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<!-- 营业执照 -->
			<!-- <div class="fullline">
				<div class="wp-100">
					<span class="w-65 must-star" v-text="$t('employee.BusinessLicence')"></span>
					<div class="right-auto-box">
						<div>
							<sapi-upload v-model="list"></sapi-upload>
						</div>
					</div>
				</div>
			</div> -->
			<!-- 企业类型纳税人类型 -->
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.EnterpriseForm')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="createModel.EnterpriseForm" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.TaxPayerId')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="createModel.TaxPayerId" :maxlength="100"></el-input>
					</div>
				</div>
			</div>

			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.LegalRepresentative')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="createModel.LegalRepresentative" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.RegisteredCapital')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="createModel.RegisteredCapital" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
		
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.Address')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="createModel.Address" :maxlength="500"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.PostalCode')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="createModel.PostalCode" :maxlength="100"></el-input>
					</div>
				</div>
			</div>	
			
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.OfficePhone')"></span>
					<div class="right-auto-box">
						<el-input id="txtMobileTelephone" v-model.trim="createModel.OfficePhone" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.FaxNumber')"></span>
					<div class="right-auto-box">
						<el-input id="txtOfficePhone" v-model.trim="createModel.FaxNumber" :maxlength="100"></el-input>
					</div>
				</div>
			</div>	

			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.Email')"></span>
					<div class="right-auto-box">
						<el-input id="txtMobileTelephone" v-model.trim="createModel.Email" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.OfficialWebsite')"></span>
					<div class="right-auto-box">
						<el-input id="txtOfficePhone" v-model.trim="createModel.OfficialWebsite" :maxlength="100"></el-input>
					</div>
				</div>
			</div>	
			<div class="fullline">
				<div class="wp-100">
					<span class="w-65" v-text="$t('employee.Remark')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="createModel.Remark" :maxlength="500"></el-input>
					</div>
				</div>
			</div>					
			<!-- 性别选择 备用 -->
			<!-- <div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.sex')"></span>
					<el-radio-group v-model="createModel.Sex">
						<el-radio class="radio" :label="0">{{$t('employee.sexData.man')}}</el-radio>
						<el-radio class="radio" :label="1">{{$t('employee.sexData.woman')}}</el-radio>
					</el-radio-group>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.birthday')"></span>
					<div class="right-auto-box" style="position: relative;">
						<el-date-picker style="width: 100%;" v-model="createModel.birthday" type="date" :placeholder="$t('selectDate')">
						</el-date-picker>
					</div>
				</div>
			</div> -->
			
			<div class="fullline">
				<span class="w-65" v-text="$t('employee.contactMsg')"></span>
				<div class="right-auto-box">
					<div class="fullline">
						<div class="wp-50">
						</div>
						<div class="wp-50 float-right btn-outer">
							<ul class="btn-wrap">
								<li class="icon-build" @click="showStationPage"></li>
								<li class="icon-deleter" @click="deleteItems"></li>
							</ul>
						</div>
					</div>
					<!--岗位列表-->
					<div class="common-table width-p100">
						<el-table :data="createModel.SupplierContacts" @selection-change="selectionChange" border>
							<el-table-column type="selection" width="45">
							</el-table-column>
							<el-table-column prop="ContactName" :label="$t('employee.contactName')" show-overflow-tooltip>
								<template slot-scope="props" >
									<el-input v-model.trim="props.row.ContactName" :maxlength="100"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="PositionName" :label="$t('employee.contactStation')"  show-overflow-tooltip>
								<template slot-scope="props" >
									<el-input v-model.trim="props.row.PositionName" :maxlength="100"></el-input>
								</template>
							</el-table-column>
							<!-- 性别 -->
							<el-table-column prop="Sex" :label="$t('employee.contactSex')"  show-overflow-tooltip>
								<template slot-scope="props" >
									<!-- <el-input v-model.trim="props.row.Sex" :maxlength="100"></el-input> -->
									<el-radio-group v-model="createModel.Sex">
										<el-radio class="radio" :label="0">{{$t('employee.sexData.man')}}</el-radio>
										<el-radio class="radio" :label="1">{{$t('employee.sexData.woman')}}</el-radio>
									</el-radio-group>
								</template>
							</el-table-column>

							<el-table-column prop="OfficePhone" :label="$t('employee.contactPhone')"  show-overflow-tooltip>
								<template slot-scope="props" >
									<el-input v-model.trim="props.row.OfficePhone" :maxlength="100"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="MobileTelephone" :label="$t('employee.contactMobile')"  show-overflow-tooltip>
								<template slot-scope="props" >
									<el-input v-model.trim="props.row.MobileTelephone" :maxlength="100"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="Email" :label="$t('employee.contactMail')"  show-overflow-tooltip>
								<template slot-scope="props" >
									<el-input v-model.trim="props.row.Email" :maxlength="100"></el-input>
								</template>
							</el-table-column>
							<!-- 操作 -->
							<el-table-column :label="$t('handle')" fixed="right" width="100">
								<template slot-scope="props">   
									<a  class="table-btn" href="javascript:void(0)" @click.stop="deleteItem(props.row,props.$index)" v-text="operateText.delete"></a>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div>
			</div>
		</div>

		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>
		</div>
		<set-station slot="moreDialog" :node-id="createModel.EmployeeId" :node-datas="createModel.Stations" v-model="stationVisible" :call-back="callback"></set-station>
	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
	import station from "@/components/sapi-station-multiline.vue";
	import upload from "@/components/sapi-upload.vue";
	import select from "@/components/sapi-select.vue";
	export default {
		data() {
			return {
				provinces:[],
                citys:[],
                areas:[],
				list: [],
				disabled: false,
				visible: true,
				stationVisible: false,
				createModel: {
					SupName: null,
					SupNo: null,
					ProvinceId: null,
					ProvinceName: null,
					CityId: null,
					CityName: null,
					AreaId: null,
					AreaName: null,
					TaxPayerId: null,
					EnterpriseForm: null,
					CreditCode: null,
					LegalRepresentative: null,
					RegisteredCapital: null,
					Address: null,
					Postalcode: null,
					OfficePhone: null,
					FaxNumber: null,
					Email: null,
					OfficialWebsite: null,
					BusinessLicence: null,
					Remark: null,
				},

				stationHeaderData: 
					[{
						prop: "StationName",
						label: this.$t('employee.stationName'),
						sortable: false
					}, {
						prop: "StationNo",
						label: this.$t('employee.stationNo'),
						sortable: false
					}, {
						prop: "CorpName",
						label: this.$t('employee.stationCorpName'),
						sortable: false
					}, {
						prop: "DeptName",
						label: this.$t('employee.stationDeptName'),
						sortable: false
					}]
			}
		},
		props: ["value"],
		methods: {
			//省份
            getProvinces:function(){
                this.$get("/api/plat/areas/provinces", {}, function(res) {
					this.provinces = res;
                });
            },
            provinceChange:function(province)
            {
                this.createModel.ProvinceName = province.Name;
                this.createModel.CityId = null;
                this.createModel.CityName = null;
                this.createModel.AreaId = null;
                this.createModel.AreaName = null;
                this.areas = [];
                this.getCitys(province.Id);
            },
            //城市
            getCitys:function(provinceId)
            {
                this.$get("/api/plat/areas/"+provinceId+"/citys", {}, function(res) {
                    this.citys = res;
                });
            },
            cityChange:function(city)
            {
                this.createModel.CityName = city.Name;
                this.createModel.AreaId = null;
                this.createModel.AreaName = null;
                this.getAreas(city.Id);
            },
            //区域
            getAreas:function(cityId)
            {
                this.$get("/api/plat/areas/"+cityId+"/areas", {}, function(res) {
                    this.areas = res;
                    var area =  { Id:"", Name:"请选择" };
                    this.areas.splice(0,0,area);
                });
            },
            areaChange:function(area)
            {
                this.createModel.AreaName = area.Name;
            },
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			open() {
				this.createModel= {
					SupName: null,
					SupNo: null,
					ProvinceId: null,
					ProvinceName: null,
					CityId: null,
					CityName: null,
					AreaId: null,
					AreaName: null,
					TaxPayerId: null,
					EnterpriseForm: null,
					CreditCode: null,
					LegalRepresentative: null,
					RegisteredCapital: null,
					Address: null,
					Postalcode: null,
					OfficePhone: null,
					FaxNumber: null,
					Email: null,
					OfficialWebsite: null,
					BusinessLicence: null,
					Remark: null,
                };
				this.getProvinces();
                this.citys = [];
                this.areas = [];
			},
			// getData(){
			// 	this.$get("/api/plat/suppliers/create", function(res) {
			// 		this.createModel = res;
			// 	});
			// },
			submit() {
				if(!this.validate()) {
					return;
				}
				this.disabled = true;
				// if(!this.createModel.SupId)
                // {
                //     this.createModel.SupId = null;
                //     this.createModel.SupName = null;
                // }
				
				this.$post("/api/plat/suppliers", this.createModel, function(res) {
					this.disabled = false;
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t('employee.addEmployeeSuccess'));
				});
			},
			validate() {
				this.$closeWaringTips(".form-error-tips");
				if(!this.createModel.SupName) {
					this.$errorTips(this.$t('employee.employeeNameNotBeEmpty'), "#addSupName");
					return false;
				}
				if(!this.createModel.SupNo){
					this.$errorTips(this.$t("employee.supNoNotBeEmpty"),"#addSupNo");
					return false;
                }						
				if(!this.createModel.ProvinceName) {
                    Vue.msg(this.$t("employee.selectProvinceName"));
					return false;
                } 		
                if(!this.createModel.CityName) {
                    Vue.msg(this.$t("employee.selectCityName"));
					return false;
				}
				if(!this.createModel.AreaName) {
                    Vue.msg(this.$t("employee.selectAreaName"));
					return false;
				}  						              
				return true;
			},
			changeDefaultStation(row) {
				this.createModel.DefaultStationId = row.StationId;
			},
			// getData() {
			// 	this.$get("/api/plat/suppliers/create", function(res) {
			// 		this.createModel = res;
			// 		this.getCitys(res.ProvinceId);
            //         this.getAreas(res.CityId);
			// 	});
			// 	this.getProvinces();
			// },
			showStationPage() {
				this.stationVisible = true;
			},

			callback(res) {
				this.createModel.Stations = res;
				
				//edit by 杨俊  2018-03-22  禅道bug #9541 修改岗位选择页面删除默认岗位后，默认岗位没有的情况
				if (this.createModel.Stations == null || this.createModel.Stations.length == 0){
					this.createModel.DefaultStationId = null;
					return;
				}
				for (var i = 0; i < this.createModel.Stations.length; i++){
					if (this.createModel.DefaultStationId == this.createModel.Stations[i].StationId){
						return;
					}
				}

				this.createModel.DefaultStationId = this.createModel.Stations[0].StationId;				
			},
			deleteItems() {
				var stations = this.createModel.Stations;
				if(this.deleteIds.length == 0) {
					Vue.msg(this.$t('selectOneWhenDeleted'));
					return false;
				}

				var defaultId = this.createModel.DefaultStationId;
				var hasDeleteDefault = false;
				var ids=this.deleteIds;
				for(var i=stations.length-1; i>-1 ; i--) {
					var stationId = stations[i].StationId;
					var index=ids.indexOf(stationId);
					if(index>-1){
						stations.splice(i,1);
						ids.splice(index,1);
						if(defaultId === stationId) {
							hasDeleteDefault = true;
						}
					}
				}

				//禅道bug8461，如果之前已有默认岗位，则该员工的默认岗位应该还为之前的岗位。
				if(hasDeleteDefault && this.createModel.Stations[0]) {
					this.createModel.DefaultStationId = this.createModel.Stations[0].StationId;
				}
			},
			selectionChange(datas) {
				this.deleteIds = [];
				if(datas.length > 0) {
					datas.forEach((data) => {
						this.deleteIds.push(data.StationId);
					});
				}
			}
		},
		components: {
			"sapi-dialog": dialog,
			"set-station": station,
			"sapi-upload": upload,
			"sapi-select": select
		},
		watch: {
			value(val) {
				this.visible = val;
				console.log(this.createModel)
			},
		},
		created() {
			Vue.use(tips);
		},
		mounted() {
			this.visible = this.value;
		}
	}
</script>

<style>
	.btn-outer .btn-wrap {
		list-style: none;
		border: 1px solid #bfbfbf;
		font-size: 0;
		border-radius: 2px;
		display: inline-block;
		height: 28px;
		position: absolute;
		right: 0;
		overflow: hidden;
	}
	
	.btn-outer .btn-wrap>li {
		display: inline-block;
		width: 28px;
		height: 28px;
		font-size: 16px;
		text-align: center;
		line-height: 28px;
		cursor: pointer;
	}
	
	.btn-outer .btn-wrap>li:first-child {
		border-right: 1px solid #bfbfbf;
	}
	
	.btn-outer {
		position: relative;
	}
</style>