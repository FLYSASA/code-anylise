<template>
	<sapi-dialog v-model="visible" width="500px" top="26%" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('position.editPositionTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
            <div class="fullline">
				<span class="w-65 must-star" v-text="$t('position.positionName')"></span>
				<div class="right-auto-box">
					<el-input id="txtPositionName" v-model.trim="editModel.PositionName" :maxlength="200"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('position.positionNo')"></span>
				<div class="right-auto-box">
					<el-input v-model="editModel.PositionNo" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65 must-star" v-text="$t('position.grade')"></span>
				<div class="right-auto-box">
					<el-input id="txtGrade" v-model="editModel.Grade" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('rowIndex')"></span>
				<div class="right-auto-box">
					<el-input v-model="editModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65 lh-30" v-text="$t('position.description')"></span>
				<div class="right-auto-box">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="editModel.Description" :maxlength="200" >
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
	export default {
		data() {
			return {
				disabled:false,
				visible: false,
				editModel: {}
			}
		},
		props:["option","value"],   
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input",false);
			},
			open(){
				this.getEditModel();
			},
			getEditModel(){	
				var params = {};
				params.positionId = this.option.positionId;			
                this.$get("/api/plat/positions/editViewModel", params, function(res) {
					this.editModel = res;
				});
            },
			submit() {
				if(!this.validate()){
					return;
				}
				this.disabled=true;
				this.$put("/api/plat/positions/", this.editModel, function(res) {
					this.$parent.loadData();
					this.close();
					Vue.successMsg(this.$t("position.editPositionSuccess"));
				});
            },            
			validate(){
				this.$closeWaringTips(".form-error-tips");
                if (!this.editModel.PositionName) {
					this.$errorTips(this.$t('position.positionNameNotBeEmpty'),"#txtPositionName");
					return false;
                }
                if (!this.editModel.Grade) {
                    this.$errorTips(this.$t('position.gradeNotBeEmpty'), "#txtGrade");
                    return false;
                }
                return true;				
			}
		},
		components: {
			"sapi-dialog": dialog
		},
		created(){
			Vue.use(tips);
		},
		mounted(){
			this.visible=this.value;
		},
		watch:{
			value(val){
				this.visible=val;
			}
		}
	}
</script>
<style>
</style>