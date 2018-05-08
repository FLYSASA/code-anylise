<template>
    <sapi-dialog v-model="visible" width="900px" top="28%" @on-open="open" @on-close="close">
        <span slot="title" v-text="$t('building.editBuildingTitle')"></span>
        <div class="form-error-tips"></div>
        <div class="form-content">
            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65 must-star" v-text="$t('building.buildingName')"></span>
                    <div class="right-auto-box">
                        <el-input id="txtBuildingName" v-model.trim="editModel.BuildingName" :maxlength="100"></el-input>
                    </div>
                </div>
                <div class="wp-50 float-right">
                    <span class="w-65" v-text="$t('building.buildingNo')"></span>
                    <div class="right-auto-box">
                        <el-input v-model.trim="editModel.BuildingNo" :maxlength="100"></el-input>
                    </div>
                </div>
            </div>

            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65" v-text="$t('building.projectId')"></span>
                    <div class="right-auto-box">
                        <el-input v-model.trim="ProjectName" readonly disabled></el-input>
                    </div>
                </div>
                <div class="wp-50 float-right">
                    <span class="w-65 must-star" v-text="$t('building.floors')"></span>
                    <div class="right-auto-box">
                        <el-input id="txtBuildingFloors" v-model.trim="editModel.Floors" :min="0" :max="999" :controls="false" v-format.d="{default:0}"></el-input>
                    </div>
                </div>
            </div>
            
            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65 must-star" v-text="$t('building.formTypeName')"></span>
                    <div class="right-auto-box">
                        <sapi-select v-model="editModel.FormTypeId" :expand-on-click-node="false" 
                                :is-tree="true" :data="formTypes" :props="formTypeProps" :except-id="projectOption.FormTypeId" @change="FormTypesChange"></sapi-select>
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
                        <el-radio-group v-model="editModel.IsSell">
                            <el-radio class="radio" :label="true">{{$t('building.isSellData.isTrue')}}</el-radio>
                            <el-radio class="radio" :label="false">{{$t('building.isSellData.isFalse')}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="wp-50 float-right">
					<span class="w-65" v-text="$t('rowIndex')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="editModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
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
				formTypeProps: {
					children: 'Children',
					label: 'TypeName',
                    value: 'TypeId',
                    formType: 'BaseFormType'
				},
                ProjectName: null,
                projectOption: {},
                formTypes: [],
                baseFormTypeName: null,
				baseFormTypeValue: basFormType.baseFormTypeValue,
				editModel: {
                    BuildingId: null,
                    BuildingName: null,
                    BuildingNo: null,
					BaseFormType: null,
                    IsSell: null,
                    Floors: 0,
                    FormTypeId: null,
                    FormTypeName: null,
                    RowIndex: null
                }
            }
        },
        props: ["option","value"],
        methods: {
            open() {
                this.$get("/api/plat/buildings/" + this.option.BuildingId,{},function(res) {
                    this.editModel.BuildingId = res.BuildingId;                    
                    this.editModel.BuildingName = res.BuildingName;
                    this.editModel.BuildingNo = res.BuildingNo;
                    this.editModel.BaseFormType = res.BaseFormType;
                    this.editModel.IsSell = res.IsSell;
                    this.editModel.Floors = res.Floors;
                    this.editModel.FormTypeId = res.FormTypeId;
                    this.editModel.FormTypeName = res.FormTypeName;
                    this.editModel.RowIndex = res.RowIndex;
                    this.ProjectName = res.ProjectName;
                    this.baseFormTypeName = this.baseFormTypeValue[res.BaseFormType];
                });
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
                this.$put("/api/plat/buildings/", this.editModel, function(res) {
                    this.disabled = false;
                    this.$parent.loadData();
                    this.close();
                    Vue.successMsg(this.$t("building.editBuildingSuccess"));
                });
            },
            validate() {
				this.$closeWaringTips(".form-error-tips");						
				if(!this.editModel.BuildingName) {
					this.$errorTips(this.$t("building.buildingNameNotBeEmpty"), "#txtBuildingName");
					return false;
                }
                if(!this.editModel.Floors && this.editModel.Floors != 0) {
					this.$errorTips(this.$t("building.buildingFloorsNotBeEmpty"), "#txtBuildingFloors");
					return false;
				} 	
				if(!this.editModel.FormTypeId) {
					Vue.msg(this.$t("building.selectFormTypePlease"));
					return false;
                }
                return true;
            },
            FormTypesChange(formTypeProps) {
                this.editModel.FormTypeName = formTypeProps.TypeName;
				this.editModel.BaseFormType = formTypeProps.BaseFormType;
				this.baseFormTypeName = this.baseFormTypeValue[formTypeProps.BaseFormType];
			},
            getProjects() {
				this.$get("/api/plat/projects/tree", {}, function(res) {
					this.projects = res;
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

<style>

</style>