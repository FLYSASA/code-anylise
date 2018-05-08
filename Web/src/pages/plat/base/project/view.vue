<template>
	<sapi-dialog v-model="visible" width="1000px" top="10%" class="add" @on-open="open" @on-close="close">
		<span slot="title">{{$t('project.browseProjectTitle')+tipField}}</span>
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
                                <span class="w-65" v-text="$t('project.projectName')"></span>
                                <div class="right-auto-box">
                                    <el-input v-model.trim="viewModel.ProjectName" readonly></el-input>
                                </div>
                            </div>
                            <div class="wp-50 float-right">
                                <span class="w-65" v-text="$t('project.projectNo')"></span>
                                <div class="right-auto-box">
                                    <el-input v-model.trim="viewModel.ProjectNo" readonly></el-input>
                                </div>
                            </div>  
                        </div>

                        <div class="fullline">
                            <div class="wp-50">
                                <span class="w-65" v-text="$t('project.corpName')"></span>
                                <div class="right-auto-box">
                                     <el-input v-model.trim="viewModel.CorpName" readonly></el-input>
                                </div>
                            </div>
                            <div class="wp-50 float-right">
                                <span class="w-65" v-text="$t('project.status')"></span>
                                <div class="right-auto-box">
                                    <el-input v-model.trim="viewModel.StatusName" readonly></el-input>
                                </div>
                            </div>
                        </div>

                        <div class="fullline">
                            <div class="wp-50">
                                <span class="w-65" v-text="$t('project.type')"></span>
                                <div class="right-auto-box">
                                    <el-input v-model.trim="viewModel.TypeName" readonly></el-input>
                                </div>
                            </div>
                            <div class="wp-50 float-right">
                                <span class="w-65" v-text="$t('project.provinceCityAreaName')"></span>
                                <div class="right-auto-box">
                                    <el-input :value="getProvinceCityAreaName()" readonly></el-input>
                                </div>
                            </div>
                        </div>

                        <div class="fullline">
                            <div class="wp-50">
                                <span class="w-65" v-text="$t('project.isPurchased')"></span>
                                <div class="right-auto-box">
                                    <el-radio-group v-model="viewModel.IsPurchased" disabled>
                                        <el-radio class="radio" :label="true">{{$t('project.isPurchasedData.isTrue')}}</el-radio>
                                        <el-radio class="radio" :label="false">{{$t('project.isPurchasedData.isFalse')}}</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="wp-50 float-right">
                                <span class="w-65" v-text="$t('rowIndex')"></span>
                                <div class="right-auto-box">
                                    <el-input v-model.trim="viewModel.RowIndex" readonly></el-input>
                                </div>
                            </div>
                        </div>

                        <div class="fullline" v-show="isShowParentProject">
                            <div class="wp-50" >
                                <span class="w-65" v-text="$t('project.parentProjectName')"></span>
                                <div class="right-auto-box">
                                    <el-input v-model.trim="parentProjectName" readonly></el-input>
                                </div>
                            </div>
                        </div>

                        <div class="fullline">
                            <span class="w-65 lh-30" v-text="$t('project.projectLands')"></span>
                            <div class="right-auto-box">
                                <sapi-select-btn v-model="viewModel.ProjectLands" :props="landProps" height="56px" :has-more="true" :readonly="true"></sapi-select-btn>
                            </div>
                        </div>

                        <div class="fullline">
                            <span class="w-65 lh-30" v-text="$t('project.projectAddress')"></span>
                            <div class="right-auto-box">
                                <el-input v-model.trim="viewModel.ProjectAddress" readonly></el-input>
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
                                v-model="imageModel" :readonly="true" :has-size="false"></sapi-upload>
                            </div>
                        </div>

                        <div class="fullline">
                            <span class="w-65 lh-30" v-text="$t('project.remark')"></span>
                            <div class="right-auto-box">
                                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="viewModel.Remark" readonly>
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>

		<div class="footer">			
			<el-button size="small" class="default-button" @click="close" v-text="$t('close')"></el-button>
		</div>
        
	</sapi-dialog>
</template>

<script>
    import dialog from "@/components/sapi-dialog.vue";
    import selectBtn from "@/components/sapi-select-btn.vue";
    import upload from "@/components/sapi-upload.vue";
	import tips from "@/components/sapi-tips.js";
    import '@/static/css/sapi-form-tab.css';
    import address from '../../static/js/address.js';

	export default {
		data() {
			return {
                tipField: this.$t('project.tipField'),
				disabled: false,
                visible: false,
                imageModel:{
                    Extension:"",
                    FileName:"",
                    FilePath:"",
                    FileSize:"",
                    UploadDate:"",
                    Uploader:"",
                    UploaderId:""
                },
                landProps:{
                    label:"LandName"
                },
                parentProjectName:"",
                isShowParentProject:false,
				viewModel: {
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
                expand: {}
			}
		},
		props: ["option","value"],
		methods: {
            open() {
                this.tipField = this.option.ParentProjectId?this.$t('project.tipFieldChild'):this.$t('project.tipField');
                this.isShowParentProject = !!this.option.ParentProjectId;
				this.getProject();
            },
            getProject:function(){
                this.$get("/api/plat/projects/"+this.option.ProjectId, {}, function(res) {
                    this.parentProjectName = res.ParentProjectName;
                    this.viewModel = res;
                    if(!res.ProjectImgUrl1)
                    {
                        this.imageModel = null
                    }
                    else
                    {
                        this.imageModel = {
                            Extension:"."+res.ProjectImgUrl1.split(".")[1],
                            FileName:"封面图",
                            FilePath:res.ProjectImgUrl1,
                            Uploader:res.LastEditByName,
                            UploaderId:res.LastEditBy,
                            UploadDate:res.LastEditDate
                        }
                    }
				});
            },
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
            expandClick(index){
				this.expand[index]=!this.expand[index];
            },
            getProvinceCityAreaName()
            {
                return address.getAddress(this.viewModel.ProvinceName,this.viewModel.CityName,this.viewModel.AreaName);
            }
        },
        components: {
            "sapi-upload": upload,
            "sapi-dialog": dialog,
            "sapi-select-btn":selectBtn
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
