<template>
	<sapi-dialog v-model="visible" width="1000px" top="10%" class="add" @on-open="open" @on-close="close">
		<span slot="title">{{$t('project.addProjectTitle')+tipField}}</span>
		<div class="form-error-tips"></div>
		<div class="form-content">
            <div class="form-collapses">
                <div class="form-collapses-item" :class="{'item-hide' : expand[0]===false}">
                    <div class="form-collapses-title" @click="expandClick(0)">
                        {{$t('project.group1')}}
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="form-collapses-content">
                        <div class="fullline">
                            <div class="wp-50">
                                <span class="w-65 must-star" v-text="$t('project.projectName')"></span>
                                <div class="right-auto-box">
                                    <el-input id="txtProjectName" v-model.trim="createModel.ProjectName" :maxlength="100"></el-input>
                                </div>
                            </div>
                            <div class="wp-50 float-right">
                                <span class="w-65 must-star" v-text="$t('project.projectNo')"></span>
                                <div class="right-auto-box">
                                    <el-input id="txtProjectNo" v-model.trim="createModel.ProjectNo" :maxlength="100"></el-input>
                                </div>
                            </div>  
                        </div>

                        <div class="fullline">
                            <div class="wp-50">
                                <span class="w-65 must-star" v-text="$t('project.corpName')"></span>
                                <div class="right-auto-box">
                                    <sapi-select :url="url" :params="struParams" empty="根节点" v-model="createModel.CorpId" :expand-on-click-node="false" 
                                    :is-tree="true" :data="companys" :props="struProps" :except-id="option.StruId"></sapi-select>
                                </div>
                            </div>
                            <div class="wp-50 float-right">
                                 <span class="w-65 must-star" v-text="$t('project.status')"></span>
                                <div class="right-auto-box">
                                    <sapi-select v-model="createModel.StatusId" :data="projectStatuss" :props="{label:'StatusName',value:'StatusId'}"></sapi-select>
                                </div>
                            </div>
                        </div>

                        <div class="fullline">
                            <div class="wp-50">
                                <span class="w-65" v-text="$t('project.type')"></span>
                                <div class="right-auto-box">
                                    <sapi-select v-model="createModel.TypeId" :data="projectTypes" :props="{label:'TypeName',value:'TypeId'}" @change="typeChange"></sapi-select>
                                </div>
                            </div>
                            <div class="wp-50 float-right">
                                <span class="w-65" v-text="$t('project.provinceName')"></span>
                                <div class="right-auto-box">
                                    <!-- <el-input v-model.trim="createModel.ProvinceCityAreaName" :maxlength="100"></el-input> -->
                                    <sapi-select v-model="createModel.ProvinceId" :data="provinces" :props="{label:'Name',value:'Id'}" @change="provinceChange"></sapi-select>
                                </div>
                            </div>  
                        </div>

                        <div class="fullline">
                            <div class="wp-50">
                                <span class="w-65" v-text="$t('project.cityName')"></span>
                                <div class="right-auto-box">
                                    <sapi-select v-model="createModel.CityId" :data="citys" :props="{label:'Name',value:'Id'}" @change="cityChange"></sapi-select>
                                </div>
                            </div>
                            <div class="wp-50 float-right">
                                <span class="w-65" v-text="$t('project.areaName')"></span>
                                <div class="right-auto-box">
                                    <sapi-select v-model="createModel.AreaId" :data="areas" :props="{label:'Name',value:'Id'}" @change="areaChange"></sapi-select>
                                </div>
                            </div>
                        </div>

                        <div class="fullline">
                            <div class="wp-50">
                                <span class="w-65" v-text="$t('project.isPurchased')"></span>
                                <div class="right-auto-box">
                                    <el-radio-group v-model="createModel.IsPurchased">
                                        <el-radio class="radio" :label="true">{{$t("project.isPurchasedData.isTrue")}}</el-radio>
                                        <el-radio class="radio" :label="false">{{$t("project.isPurchasedData.isFalse")}}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="wp-50 float-right" v-show="isShowParentProject">
                                <span class="w-65" v-text="$t('project.parentProjectName')"></span>
                                <div class="right-auto-box">
                                    <el-input v-model.trim="parentProjectName" readonly></el-input>
                                </div>
                            </div>
                        </div>

                        <div class="fullline">
                            <span class="w-65 lh-30" v-text="$t('project.projectLands')"></span>
                            <div class="right-auto-box">
                                <sapi-select-btn v-model="createModel.ProjectLands" :props="landProps" height="56px" :has-more="true" @select="selectLands"></sapi-select-btn>
                            </div>
                        </div>

                        <div class="fullline">
                            <span class="w-65 lh-30" v-text="$t('project.projectAddress')"></span>
                            <div class="right-auto-box">
                                <el-input id="txtLandAddress" v-model.trim="createModel.ProjectAddress" :maxlength="200"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-collapses-item" :class="{'item-hide' : expand[1]===false}">
                    <div class="form-collapses-title" @click="expandClick(1)">
                        {{$t('project.group2')}}
                        <i class="el-icon-arrow-down"></i>
                    </div>
                    <div class="form-collapses-content">
                        <div class="fullline">
                            <span class="w-65 lh-30" v-text="$t('project.imageModel')"></span>
                            <div class="right-auto-box">
                                <sapi-upload :count="1" type=".jpg,.gif,.png,.jpeg,.svg" :has-load="false" :has-date="false" 
                                v-model="imageModel" :has-size="false"></sapi-upload>
                            </div>
                        </div>

                        <div class="fullline">
                            <span class="w-65 lh-30" v-text="$t('project.remark')"></span>
                            <div class="right-auto-box">
                                <el-input :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="createModel.Remark">
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>

		<div class="footer">			
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>
		</div>

        <component :is="currentView" slot="moreDialog"  v-model="landVisible" :option="landOption" @call-back="selectedLands"></component>
	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
    import dialog from "@/components/sapi-dialog.vue";
    import select from "@/components/sapi-select.vue";
    import upload from "@/components/sapi-upload.vue";
    import selectBtn from "@/components/sapi-select-btn.vue";
    import address from '../../static/js/address.js';

    import '@/static/css/sapi-form-tab.css';

	export default {
		data() {
			return {
                tipField: this.$t('project.tipField'),
				disabled: false,
                visible: false,
                companys: [],      //公司
                projectStatuss:[], //项目状态
                projectTypes:[],   //项目类别
                imageModel:"",
                landProps:{
                    label:"LandName"
                },
                parentProjectName:"",
                isShowParentProject:false,
				createModel: {
                    ProjectName: null,
                    ProjectNo:null,
					StatusId: null,
                    ParentProjectId:null,
                    CorpId: null,
                    ProvinceId:null,
                    ProvinceName:null,
                    CityId:null,
                    CityName:null,
                    AreaId:null,
                    AreaName:null,
                    IsPurchased:null,
                    TypeId:null,
                    TypeName:null,
                    ProjectAddress:null,
                    ProjectMapPosition:null,
                    ProjectImgUrl1:null,
                    ProjectImgUrl2:null,
                    ProjectImgThumbnail:null,
                    Remark:null,
                    ProjectLands:[]
                },
                expand: {},
                currentView:"",
                landVisible:false,
				struProps:{
					children: 'Children',
					label: 'StruName',
					value:'StruId',
					hasChild:"HasChild"
                },
                url: "/api/plat/structures/brief",
				struParams: {
					withDept: false,
					nodeIdKey: "parentStruId"
                },
                provinces:[],
                citys:[],
                areas:[],
                landOption:{},
                lastSelectedLandIds:[]
			}
		},
		props: ["option","value"],
		methods: {
            open() {
                 this.tipField = this.option.AddChild ? this.$t('project.tipFieldChild'):this.$t('project.tipField');
                if(this.option.AddChild)
                {
                    this.$get("/api/plat/projects/"+this.option.ProjectId, {}, function(res) {
                        this.parentProjectName = res.ProjectName;
                        this.createModel.CorpId = res.CorpId;
                        this.createModel.StatusId = res.StatusId;
                        this.createModel.TypeId = res.TypeId;
                        this.createModel.TypeName = res.TypeName;
                        this.createModel.ProjectLands = res.ProjectLands;
                        this.createModel.ProjectAddress = res.ProjectAddress;
                        this.createModel.IsPurchased = res.IsPurchased;
                        this.createModel.ProjectName = null;
                        this.createModel.ProjectNo = null;
                        this.createModel.ParentProjectId = this.option.ProjectId,
                        this.createModel.ProjectImgUrl1 = null;
                        this.createModel.ProjectImgUrl2 = null;
                        this.createModel.ProjectImgThumbnail = null;
                        this.createModel.Remark = null;
                        this.createModel.ProvinceId = null;
                        this.createModel.ProvinceName = null;
                        this.createModel.CityId = null;
                        this.createModel.CityName = null;
                        this.createModel.AreaId = null;
                        this.createModel.AreaName = null;
                        
                        this.isShowParentProject = true;
                        this.getCorps(this.createModel.CorpId);
                        this.getProvinces();
                        this.getProjectStatuss(this.createModel.StatusId);
                        this.getProjectTypes(this.createModel.TypeId);
                    });
                }
                else
                {
                    this.createModel= {
                        ProjectName: null,
                        ProjectNo:null,
                        StatusId: null,
                        ParentProjectId:null,
                        CorpId: null,
                        ProvinceId:null,
                        ProvinceName:null,
                        CityId:null,
                        CityName:null,
                        AreaId:null,
                        AreaName:null,
                        IsPurchased:false,
                        TypeId:null,
                        TypeName:null,
                        ProjectAddress:null,
                        ProjectMapPosition:null,
                        ProjectImgUrl1:null,
                        ProjectImgUrl2:null,
                        ProjectImgThumbnail:null,
                        Remark:null,
                        ProjectLands:[]
                    }
                    this.parentProjectName = null;
                    this.isShowParentProject = false;
                    this.getCorps(this.option.CorpId);
                    this.getProvinces();
                    this.getProjectStatuss();
                    this.getProjectTypes();
                }
                this.imageModel = "";
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
                //原图地址
                if(this.imageModel.length >0)
                {
                    this.createModel.ProjectImgUrl1 = this.imageModel[0].FilePath;
                }
                //当类别选择“请选择”，提交时清空值
                if(!this.createModel.TypeId)
                {
                    this.createModel.TypeName = null;
                    this.createModel.TypeId = null;
                }
                //省份
                if(!this.createModel.ProvinceId)
                {
                    this.createModel.ProvinceId = null;
                    this.createModel.ProvinceName = null;
                }
                //城市
                if(!this.createModel.CityId)
                {
                    this.createModel.CityId = null;
                    this.createModel.CityName = null;
                }
                //区域
                if(!this.createModel.AreaId)
                {
                    this.createModel.AreaId = null;
                    this.createModel.AreaName = null;
                }

				this.$post("/api/plat/projects/", this.createModel, function(res) {
					this.disabled = false;
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t("project.addProjectSuccess"));
				});
            },
            validate() {							
				if(!this.createModel.ProjectName) {
					this.$errorTips(this.$t("project.projectNameNotBeEmpty"), "#txtProjectName");
					return false;
				} 				
				if(!this.createModel.ProjectNo) {
					this.$errorTips(this.$t("project.projectNoNotBeEmpty"), "#txtProjectNo");
					return false;
                }
                if(!this.createModel.CorpId) {
					Vue.msg(this.$t("project.selectCorpPlease"));
					return false;
                }
                if(!this.createModel.StatusId) {
					Vue.msg(this.$t("project.selectStatusPlease"));
					return false;
                }
				return true;
			},
            getCorps:function(corpId){
                if(corpId)
                {
                    this.$get("/api/plat/structures/"+corpId+"/parentAndSiblings", {}, function(res) {
                        this.companys = res;
                        this.createModel.CorpId = corpId;
                    });
                }
                else
                {
                    //如果没有公司Id，则取架构数据。
                    this.$get("/api/plat/structures/", {}, function(res) {
                        this.companys = res;
                        this.createModel.CorpId = "";
                    });
                }        
            },
            //省份
            getProvinces:function(){
                this.$get("/api/plat/areas/provinces", {}, function(res) {
                    this.provinces = res;
                    var province =  { Id:"", Name:"请选择" };
                    this.provinces.splice(0,0,province);
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
                if(province.Id)
                {
                    this.getCitys(province.Id);
                }
                else
                {
                    this.citys = [];
                }
            },
            //城市
            getCitys:function(provinceId)
            {
                this.$get("/api/plat/areas/"+provinceId+"/citys", {}, function(res) {
                    this.citys = res;
                    var city =  { Id:"", Name:"请选择" };
                    this.citys.splice(0,0,city);
                });
            },
            cityChange:function(city)
            {
                this.createModel.CityName = city.Name;
                this.createModel.AreaId = null;
                this.createModel.AreaName = null;
                if(city.Id)
                {
                    this.getAreas(city.Id);
                }
                else
                {
                    this.areas = [];
                }
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
            getProjectStatuss:function(statusId){
                this.$get("/api/plat/projectStatuses/brief", {}, function(res) {
                    this.projectStatuss = res;
                    if(this.option.AddChild)
                    {
                        this.createModel.StatusId = statusId;
                    }
				});
            },
            getProjectTypes:function(typeId){
                this.$get("/api/plat/projectTypes/brief", {}, function(res) {
                    this.projectTypes = res;
                    var projectType =  { TypeId:"", TypeName:"请选择" };
                    this.projectTypes.splice(0,0,projectType);

                    if(this.option.AddChild)
                    {
                        this.createModel.TypeId = typeId;
                    }
				});
            },
            expandClick(index){
				this.expand[index]=!this.expand[index];
            },
            //打开选择地块窗口
            selectLands(){
                this.landVisible = true;
                this.lastSelectedLands = this.createModel.ProjectLands;  //暂存已经选择的地块，再弹出选择后往后添加新选择的地块
                this.landOption.ProvinceId = this.createModel.ProvinceId;
                this.landOption.CityId = this.createModel.CityId;
                this.landOption.AreaId = this.createModel.AreaId;
                var lands = this.createModel.ProjectLands;
                this.lastSelectedLandIds = [];
                for(var i=0;i<lands.length;i++)
                {
                    this.lastSelectedLandIds.push(lands[i].LandId);
                }
                this.landOption.LastSelectedLandIds = this.lastSelectedLandIds;
                this.landOption.SelectedLands = lands;
                this.currentView="land-select";
            },
            getProvinceCityAreaName(){
                return address.getAddress(this.createModel.ProvinceName,this.createModel.CityName,this.createModel.AreaName);
            },
            selectedLands(res){
                for(var i=0;i<res.length;i++)
                {
                    var row = res[i];
                    if(this.lastSelectedLandIds.indexOf(row.LandId) == -1)
                    {
                        this.createModel.ProjectLands.push(row);
                    }
                }
            },
            //切换项目类别
            typeChange(res){
                if(res)
                {
                    this.createModel.TypeName = res.TypeName;
                }
            }
		},
		components: {
            "sapi-upload": upload,
            "sapi-dialog": dialog,
            "sapi-select": select,
            "sapi-select-btn":selectBtn,
            "land-select": (resolve) => {
				require(['../land/land-multi.vue'], resolve);
			}
		},
		watch: {
			value(val) {
				this.visible = this.value;
			}
		},
		created() {
            for(var i = 0; i < 2; i++) {
				this.$set(this.expand, i, true);
			}
			Vue.use(tips);
		},
		mounted(){
			this.visible=this.value;
		}
	}
</script>

