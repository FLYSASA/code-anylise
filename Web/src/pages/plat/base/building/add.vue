<template>
	<sapi-dialog v-model="visible" width="900px" top="28%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('building.addBuildingTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
            <div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('building.buildingName')"></span>
					<div class="right-auto-box">
						<el-input id="txtBuildingName" v-model.trim="createModel.BuildingName" :maxlength="100"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('building.buildingNo')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="createModel.BuildingNo" :maxlength="100"></el-input>
					</div>
				</div>
			</div>

            <div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('building.projectId')"></span>
					<div class="right-auto-box">
						 <sapi-select v-model="createModel.ProjectId" :expand-on-click-node="false" 
                                    :is-tree="true" :data="projects" :props="projectProps" :except-id="projectOption.ProjectId"></sapi-select>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65 must-star" v-text="$t('building.floors')"></span>
					<div class="right-auto-box">
					    <el-input id="txtBuildingFloors" v-model.trim="createModel.Floors" :min="0" :max="999" :controls="false" v-format.d="{default:0}"></el-input>
					</div>
				</div>
			</div>

            <div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star" v-text="$t('building.formTypeName')"></span>
					<div class="right-auto-box">						
						<sapi-select v-model="createModel.FormTypeId" :expand-on-click-node="false" 
                                    :is-tree="true" :data="formTypes" :props="formTypeProps" :except-id="projectOption.FormTypeId" @change="formTypesChange"></sapi-select>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65" v-text="$t('building.baseFormTypeName')"></span>
					<div class="right-auto-box">
						<el-input v-model.trim="baseFormTypeName" readonly disabled></el-input>
					</div>
				</div>
			</div>

            <div class="fullline">
				<div class="wp-50">
					<span class="w-65" v-text="$t('building.isSell')"></span>
					<div class="right-auto-box">
						<el-radio-group v-model="createModel.IsSell">
                            <el-radio class="radio" :label="true">{{$t('building.isSellData.isTrue')}}</el-radio>
                            <el-radio class="radio" :label="false">{{$t('building.isSellData.isFalse')}}</el-radio>
                        </el-radio-group>
					</div>
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
	import basFormType from "../../static/js/basFormType.js";

	export default {
		data() {
			return {
				disabled: false,
                visible: false,
                projectProps: {
					children: 'Children',
					label: 'ProjectName',
					value: 'ProjectId',
					hasChild: "HasChild"
				},
				formTypeProps: {
					children: 'Children',
					label: 'TypeName',
					value: 'TypeId',
					formType: 'BaseFormType'
				},
                projects: [],
                projectOption: {},
				formTypes: [],
				baseFormTypeName: null,
				baseFormTypeValue: basFormType.baseFormTypeValue,
				createModel: {
					ProjectId: null,
                    BuildingName: null,
                    BuildingNo: null,
					BaseFormType: null,
                    IsSell: null,
                    Floors: 0,
                    FormTypeId: null,
                    FormTypeName: null
                }
			}
		},
		props: ["option","value"],
		methods: {
			open() {
				this.createModel= {
					ProjectId: null,
                    BuildingName: null,
                    BuildingNo: null,
					BaseFormType: null,
                    IsSell: true,
                    Floors: 0,
                    FormTypeId: null,
                    FormTypeName: null
				}
				this.baseFormTypeName = null;
				this.getProjects();
				this.getFormTypes();
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

				this.$post("/api/plat/buildings/", this.createModel, function(res) {
					this.disabled = false;
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t("building.addBuildingSuccess"));
				});
			},
			validate() {
				this.$closeWaringTips(".form-error-tips");						
				if(!this.createModel.BuildingName) {
					this.$errorTips(this.$t("building.buildingNameNotBeEmpty"), "#txtBuildingName");
					return false;
				} 				
				if(!this.createModel.ProjectId) {
					Vue.msg(this.$t("building.selectProjectPlease"));
					return false;
				}
				if(!this.createModel.Floors && this.createModel.Floors != 0) {
					this.$errorTips(this.$t("building.buildingFloorsNotBeEmpty"), "#txtBuildingFloors");
					return false;
				} 	
				if(!this.createModel.FormTypeId) {
					Vue.msg(this.$t("building.selectFormTypePlease"));
					return false;
                }
				return true;
			},
			formTypesChange(formTypeProps) {
				this.createModel.FormTypeName = formTypeProps.TypeName;
				this.createModel.BaseFormType = formTypeProps.BaseFormType;
				this.baseFormTypeName = this.baseFormTypeValue[formTypeProps.BaseFormType];
			},
			getProjects() {
				this.$get("/api/plat/projects/tree", {}, function(res) {
                    this.projects = res;
                    if(this.option.ProjectId) {
                        this.createModel.ProjectId = this.option.ProjectId;
                    }
				});
			},
			getFormTypes() {
				this.$get("/api/plat/formTypes/brief", {}, function(res) {
					this.formTypes = res;
				});
			},
		},
		components: {
            "sapi-dialog": dialog,
            "sapi-select": select,
		},
		watch: {
			value(val) {
				this.visible = this.value;
			}
		},
		created() {
			Vue.use(tips);
		},
		mounted() {
			this.visible=this.value;
		}
	}
</script>
