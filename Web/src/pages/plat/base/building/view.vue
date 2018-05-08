<template>
    <sapi-dialog v-model="visible" width="800px" top="28%" @on-open="open" @on-close="close">
        <span slot="title" v-text="$t('building.browseBuildingTitle')"></span>
        <div class="form-error-tips"></div>
        <div class="form-content">
            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65" v-text="$t('building.buildingName')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="viewModel.BuildingName" readonly></el-input>
                    </div>
                </div>
                <div class="wp-50 float-right">
                    <span class="w-65" v-text="$t('building.buildingNo')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="viewModel.BuildingNo" readonly></el-input>
                    </div>
                </div>
            </div>

            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65" v-text="$t('building.projectId')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="viewModel.ProjectName" readonly></el-input>
                    </div>
                </div>
                <div class="wp-50 float-right">
                    <span class="w-65" v-text="$t('building.floors')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="viewModel.Floors" readonly></el-input>
                    </div>
                </div>
            </div>
            
            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65" v-text="$t('building.formTypeName')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="viewModel.FormTypeName" readonly></el-input>
                    </div>
                </div>
                <div class="wp-50 float-right">
                    <span class="w-65" v-text="$t('building.baseFormTypeName')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="viewModel.BaseFormType" readonly></el-input>
                    </div>
                </div>
            </div>

            <div class="fullline">
                <div class="wp-50">
                    <span class="w-65" v-text="$t('building.isSell')"></span>
                    <div class="right-auto-box">
                        <el-radio-group v-model="viewModel.IsSell" disabled>
                            <el-radio class="radio" :label="true">{{$t('building.isSellData.isTrue')}}</el-radio>
                            <el-radio class="radio" :label="false">{{$t('building.isSellData.isFalse')}}</el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="wp-50 float-right">
					<span class="w-65" v-text="$t('rowIndex')"></span>
                    <div class="right-auto-box">
                        <el-input v-model="viewModel.RowIndex" readonly></el-input>
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
    import tips from "@/components/sapi-tips.js";
    import dialog from "@/components/sapi-dialog.vue";
    import selectBtn from "@/components/sapi-select-btn.vue";
    import basFormType from "../../static/js/basFormType.js";

    export default {
        data() {
            return {
                disabled: false,
                visible: false,
                baseFormTypeValue: basFormType.baseFormTypeValue,
				viewModel: {
                    BuildingId: null,
                    BuildingName: null,
                    BuildingNo: null,
                    ProjectId: null,
                    ProjectName: null,
                    BaseFormType: null,
                    IsSell: null,
                    Floors: null,
                    FormTypeId: null,
                    FormTypeName: null,
                    RowIndex: null
                }
            }
        },
        props: ["option","value"],
        methods: {
            open() {
                this.$get("/api/plat/buildings/" + this.option.BuildingId, {}, function(res) {
                    this.viewModel.BuildingId = res.BuildingId;                    
                    this.viewModel.BuildingName = res.BuildingName;
                    this.viewModel.BuildingNo = res.BuildingNo;
                    this.viewModel.ProjectId = res.ProjectId;
                    this.viewModel.ProjectName = res.ProjectName;
                    this.viewModel.BaseFormType = this.baseFormTypeValue[res.BaseFormType];
                    this.viewModel.IsSell = res.IsSell;
                    this.viewModel.Floors = res.Floors;
                    this.viewModel.FormTypeId = res.FormTypeId;
                    this.viewModel.FormTypeName = res.FormTypeName;
                    this.viewModel.RowIndex = res.RowIndex;
                });
            },
            close() {
                this.$closeWaringTips(".form-error-tips");
                this.$emit("input", false);
            }
        },
        components: {
            "sapi-dialog": dialog,
            "sapi-select-btn":selectBtn
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