<template>
	<sapi-dialog v-model="visible" class="employee-edit" width="800px" top="6%" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('employee.editEmployeeTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('employee.SupName')"></span>
					<div class="right-auto-box">
						<el-input id="editSupName" v-model.trim="editModel.SupName" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 must-star" v-text="$t('employee.SupNo')"></span>
					<div class="right-auto-box">
						<el-input  id="editSupNo" v-model.trim="editModel.SupNo" :maxlength="100"></el-input>
					</div>
				</div>
			</div>

			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('employee.ProvinceName')"></span>
					<div class="right-auto-box">
						<sapi-select v-model="editModel.ProvinceId" :data="provinces" :props="{label:'Name',value:'Id'}" @change="provinceChange"></sapi-select>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 must-star" v-text="$t('employee.CityName')"></span>
					<div class="right-auto-box">
						<sapi-select v-model="editModel.CityId" :data="citys" :props="{label:'Name',value:'Id'}" @change="cityChange"></sapi-select>
					</div>
				</div>	
			</div>

			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('employee.AreaName')"></span>
					<div class="right-auto-box">
						<sapi-select v-model="editModel.AreaId" :data="areas" :props="{label:'Name',value:'Id'}" @change="areaChange"></sapi-select>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 must-star" v-text="$t('employee.CreditCode')"></span>
					<div class="right-auto-box">
						<el-input id="editCreditCode" v-model.trim="editModel.CreditCode" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<!-- 供方分类 -->
			<div class="fullline">
				<div class="wp-100">
					<span class="w-65" v-text="$t('供方分类')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="editModel.supplierClasses" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<!-- 营业执照 -->
			<div class="fullline">
				<div class="wp-100">
					<span class="w-65" v-text="$t('employee.BusinessLicence')"></span>
					<div class="right-auto-box">
						<div>
							<sapi-upload v-model="list"></sapi-upload>
						</div>
					</div>
				</div>
			</div>
			<!-- 企业类型纳税人类型 -->
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.EnterpriseForm')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="editModel.EnterpriseForm === 1 ? '国有企业' : '民营企业'" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.TaxPayerId')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="editModel.TaxPayerId === 1 ? '一般纳税人' : '小规模纳税人'" :maxlength="100"></el-input>
					</div>
				</div>
			</div>

			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.LegalRepresentative')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="editModel.LegalRepresentative" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.RegisteredCapital')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="editModel.RegisteredCapital" :maxlength="100"></el-input>
					</div>
				</div>
			</div>

			
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.Address')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="editModel.Address" :maxlength="500"></el-input>
					</div>
				</div>
				<div class="wp-50  float-right">
					<span class="w-65" v-text="$t('employee.PostalCode')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="editModel.PostalCode" :maxlength="100"></el-input>
					</div>
				</div>
			</div>

			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.OfficePhone')"></span>
					<div class="right-auto-box">
						<el-input id="txtMobileTelephone" v-model.trim="editModel.OfficePhone" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.FaxNumber')"></span>
					<div class="right-auto-box">
						<el-input id="txtOfficePhone" v-model.trim="editModel.FaxNumber" :maxlength="100"></el-input>
					</div>
				</div>
			</div>

			<div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('employee.Email')"></span>
					<div class="right-auto-box">
						<el-input id="txtMobileTelephone" v-model.trim="editModel.Email" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('employee.OfficialWebsite')"></span>
					<div class="right-auto-box">
						<el-input id="txtOfficePhone" v-model.trim="editModel.OfficialWebsite" :maxlength="100"></el-input>
					</div>
				</div>
			</div>

			<div class="fullline">
				<div class="wp-100">
					<span class="w-65" v-text="$t('employee.Remark')"></span>
					<div class="right-auto-box">
						<el-input id="RoleName" v-model.trim="editModel.Remark" :maxlength="500"></el-input>
					</div>
				</div>
			</div>

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
					<!--供方联系人表格-->
					<div class="common-table width-p100">
						<el-table :data="editModel.SupplierContacts" @selection-change="selectionChange" border>
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
							<el-table-column prop="Sex" :label="$t('employee.contactSex')"  width="120" show-overflow-tooltip>
								<template slot-scope="props" >
									<!-- <el-input v-model.trim="props.row.Sex" :maxlength="100"></el-input> -->
									<el-radio-group v-model="props.row.Sex">
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
		<set-station slot="moreDialog" :node-id="editModel.EmployeeId" :node-datas="editModel.Stations" v-model="stationVisible" :call-back="callback"></set-station>
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
				operateText: {
					edit: this.$t('edit'),
					delete: this.$t('delete')					
				},
				disabled: false,
				visible: true,
				editModel: {},
				deleteIds: [],
				stationListShow: false,
				stationVisible: false,
				stationHeaderData: 
					[{
						prop: "ContactName",
						label: this.$t('employee.contactName'),
						sortable: false
					}, {
						prop: "PositionName",
						label: this.$t('employee.contactStation'),
						sortable: false
					}, {
						prop: "Sex",
						label: this.$t('employee.contactSex'),
						sortable: false
					}, {
						prop: "OfficePhone",
						label: this.$t('employee.contactPhone'),
						sortable: false
					}, {
						prop: "MobileTelephone",
						label: this.$t('employee.contactMobile'),
						sortable: false
					}, {
						prop: "Email",
						label: this.$t('employee.contactMail'),
						sortable: false
					}]
			}
		},
		props: ["value", "option"],
		methods: {
			 //省份
            getProvinces:function(){
                this.$get("/api/plat/areas/provinces", {}, function(res) {
					this.provinces = res;
                });
            },
            provinceChange:function(province)
            {
                this.editModel.ProvinceName = province.Name;
                this.editModel.CityId = null;
                this.editModel.CityName = null;
                this.editModel.AreaId = null;
                this.editModel.AreaName = null;
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
                this.editModel.CityName = city.Name;
                this.editModel.AreaId = null;
                this.editModel.AreaName = null;
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
                this.editModel.AreaName = area.Name;
            },
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			open() {
				this.getData();
			},
			/* 提交 */
			submit() {
				if(!this.validate()) {
					return;
				}
				
				if(this.editModel.SupId.length === 0) {
					this.editModel.DefaultSupId = null;
				}
				this.disabled = true;
				 console.log(this.editModel)
				this.$put("/api/plat/suppliers/", this.editModel, function(res) {
					this.disabled = false;
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t('employee.editEmployeeSuccess'));
				});
				
			},
			validate() {
				if(!this.editModel.SupName) {
					this.$errorTips(this.$t('employee.employeeNameNotBeEmpty'), "#editSupName");
					return false;
				}
				if(!this.editModel.SupNo){
					this.$errorTips(this.$t("employee.supNoNotBeEmpty"),"#editSupNo");
					return false;
                }						
				if(!this.editModel.ProvinceName) {
                    Vue.msg(this.$t("employee.selectProvinceName"));
					return false;
                } 		
                if(!this.editModel.CityName) {
                    Vue.msg(this.$t("employee.selectCityName"));
					return false;
				}
				if(!this.editModel.AreaName) {
                    Vue.msg(this.$t("employee.selectAreaName"));
					return false;
				}
				if(!this.editModel.CreditCode){
					this.$errorTips(this.$t("employee.creditCodeNotBeEmpty"),"#editCreditCode");
					return false;
                }	  						              
				return true;
			},
			changeDefaultStation(row) {
				this.editModel.DefaultStationId = row.StationId;
			},
			getData() {
				this.$get("/api/plat/suppliers/" + this.option.SupId, function(res) {
					this.editModel = res;
					// console.log(this.editModel)
					this.getCitys(res.ProvinceId);
                    this.getAreas(res.CityId);
				});
				this.getProvinces();
			},
			showStationPage() {
				// this.stationVisible = true;
				var addContact = {
					ContactId: null,
					SupId: null,
					ContactName: null,
					PositionName: null,
					Sex: 0,
					Email: null,
					OfficePhone: null,
					MobileTelephone: null,
					RowIndex: 0
				}
				this.editModel.SupplierContacts.push(addContact)
			},
			callback(res) {
				this.editModel.Stations = res;
				
				//edit by 杨俊  2018-03-22  禅道bug #9541 修改岗位选择页面删除默认岗位后，默认岗位没有的情况
				if (this.editModel.Stations == null || this.editModel.Stations.length == 0){
					this.editModel.DefaultStationId = null;
					return;
				}
				for (var i = 0; i < this.editModel.Stations.length; i++){
					if (this.editModel.DefaultStationId == this.editModel.Stations[i].StationId){
						return;
					}
				}

				this.editModel.DefaultStationId = this.editModel.Stations[0].StationId;		
			},
			selectionChange(datas) {
				this.deleteIds = [];
				if(datas.length > 0) {
					datas.forEach((data) => {
						this.deleteIds.push(data.StationId);
					});
				}
			},
			// loadData() {
			// 	var params = this.params;
			// 	this.$loadingOpen();
			// 	this.$get("/api/plat/suppliers/", params, function(res) {
			// 		this.tableData = res.Rows;
			// 		this.pageTotal = res.Total;
			// 	});
			// },

			/* 删除供方联系人 */
			deleteItem(row, index) {
				console.log(index)
				this.editModel.SupplierContacts.splice(index,1)
			},
			deleteItems() {
				var _this = this;
				var stations = this.editModel.Stations;

				if(this.deleteIds.length == 0) {
					Vue.msg(this.$t('selectOneWhenDeleted'));
					return false;
				}
				
				var defaultId = this.editModel.DefaultStationId;
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

				if(hasDeleteDefault && this.editModel.Stations[0]) {
					this.editModel.DefaultStationId = this.editModel.Stations[0].StationId;
				}
			}
		},
		components: {
			"sapi-dialog": dialog,
			"set-station": station,
			"sapi-upload": upload,
			"sapi-select": select
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
<style type="text/css">
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