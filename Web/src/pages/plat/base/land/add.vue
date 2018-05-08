<template>
	<sapi-dialog v-model="visible" width="800px" top="28%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('land.addLandTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
            <div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('land.landName')"></span>
					<div class="right-auto-box">
						<el-input id="txtLandName" v-model.trim="createModel.LandName" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 must-star" v-text="$t('land.landNo')"></span>
					<div class="right-auto-box">
						<el-input id="txtLandCode" v-model.trim="createModel.LandNo" :maxlength="100"></el-input>
					</div>
				</div>
			</div>

            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65 must-star" v-text="$t('land.provinceName')"></span>
                    <div class="right-auto-box">
                        <sapi-select v-model="createModel.ProvinceId" :data="provinces" :props="{label:'Name',value:'Id'}" @change="provinceChange"></sapi-select>
                    </div>
                </div>
                <div class="wp-50 float-right">
                    <span class="w-65 must-star" v-text="$t('land.cityName')"></span>
                    <div class="right-auto-box">
                        <sapi-select v-model="createModel.CityId" :data="citys" :props="{label:'Name',value:'Id'}" @change="cityChange"></sapi-select>
                    </div>
                </div>  
            </div>

            <div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('land.areaName')"></span>
					<div class="right-auto-box">
						<sapi-select v-model="createModel.AreaId" :data="areas" :props="{label:'Name',value:'Id'}" @change="areaChange"></sapi-select>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 must-star" v-text="$t('land.landAddress')"></span>
					<div class="right-auto-box">
						<el-input id="txtLandAddress" v-model.trim="createModel.LandAddress" :maxlength="200"></el-input>
					</div>
				</div>
			</div>

            <div class="fullline">
				<div class="wp-50">
                    <span class="w-65 must-star" v-text="$t('land.isBidInvitation')"></span>
					<div class="right-auto-box">
					    <el-radio-group v-model="createModel.IsBidInvitation">
                            <el-radio class="radio" :label="true">{{$t("land.isBidInvitationData.isTrue")}}</el-radio>
                            <el-radio class="radio" :label="false">{{$t("land.isBidInvitationData.isFalse")}}</el-radio>
					    </el-radio-group>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('land.landUsage')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="createModel.LandUsage" :maxlength="20"></el-input>
					</div>
				</div>
			</div>

            <div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('land.landArea')"></span>
					<div class="right-auto-box">
						<el-input id="txtLandArea" v-model.trim="createModel.LandArea" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('land.grantYear')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="createModel.GrantYear" :maxlength="10"></el-input>
					</div>
				</div>
			</div>

            <div class="fullline">
				<span class="w-65 lh-30" v-text="$t('land.remark')"></span>
				<div class="right-auto-box">
					<el-input  v-model="createModel.Remark" :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}">
					</el-input>
				</div>
			</div>
		</div>

		<div class="footer">			
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>
		</div>
	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
    import dialog from "@/components/sapi-dialog.vue";
    import select from "@/components/sapi-select.vue";

	export default {
		data() {
			return {
				disabled: false,
				visible: false,
				createModel: {
					LandName: null,
                    LandAddress: null,
                    ProvinceId:null,
                    ProvinceName:null,
                    CityId:null,
                    CityName:null,
                    AreaId:null,
                    AreaName:null,
                    LandNo:null,
                    LandMapPosition:"",
                    LandArea:null,
                    IsBidInvitation:null,
                    LandUsage:null,
                    GrantYear:null,
                    Remark:null
                },
                provinces:[],
                citys:[],
                areas:[]
			}
		},
		props: ["value"],
		methods: {
            open() {
				this.createModel= {
					LandName: null,
                    LandAddress: null,
                    ProvinceId:null,
                    ProvinceName:null,
                    CityId:null,
                    CityName:null,
                    AreaId:null,
                    AreaName:null,
                    LandNo:null,
                    LandMapPosition:"",
                    LandArea:null,
                    IsBidInvitation:null,
                    LandUsage:null,
                    GrantYear:null,
                    Remark:null
                };
                this.getProvinces();
                this.citys = [];
                this.areas = [];
            },
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			submit() {
				if(!this.validate()) {
					return;
                }
                this.disabled = true;
                //区域
                if(!this.createModel.AreaId)
                {
                    this.createModel.AreaId = null;
                    this.createModel.AreaName = null;
                }
				this.$post("/api/plat/lands/", this.createModel, function(res) {
					this.disabled = false;
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t("land.addLandSuccess"));
				});
			},
			validate() {	
                if(!this.createModel.LandName) {
					this.$errorTips(this.$t("land.landNameNotBeEmpty"), "#txtLandName");
					return false;
				}
				if(!this.createModel.LandNo){
					this.$errorTips(this.$t("land.landNoNotBeEmpty"), "#txtLandCode");
					return false;
                }						
				if(!this.createModel.ProvinceName) {
                    Vue.msg(this.$t("land.selectProvinceName"));
					return false;
                } 		
                if(!this.createModel.CityName) {
                    Vue.msg(this.$t("land.selectCityName"));
					return false;
				} 		
				if(!this.createModel.LandAddress) {
					this.$errorTips(this.$t("land.landAddressNotBeEmpty"), "#txtLandAddress");
					return false;
                }
                if (!this.$checkedASCII(this.createModel.LandMapPosition)){
					this.$errorTips(this.$t("land.landMapPositionCheckedASCII"), "#txtLandAddress");
					return false;
				}	
                if(this.createModel.IsBidInvitation === null || this.createModel.IsBidInvitation === undefined)
                {
                    Vue.msg(this.$t("land.selectIsBidInvitationPlease"));
                    return false;
                }
                
				return true;
			},
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
            }
		},
		components: {
            "sapi-dialog": dialog,
            "sapi-select": select
		},
		watch: {
			value(val) {
				this.visible = this.value;
			}
		},
		created() {
			Vue.use(tips);
		},
		mounted(){
			this.visible=this.value;
		}
	}
</script>
