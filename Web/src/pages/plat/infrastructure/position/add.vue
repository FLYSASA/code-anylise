<template>
	<sapi-dialog v-model="visible" width="500px" top="26%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('position.addPositionTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<span class="w-65 must-star" v-text="$t('position.positionName')"></span>
				<div class="right-auto-box">
					<el-input id="txtPositionName" v-model.trim="createModel.PositionName" :maxlength="200"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('position.positionNo')"></span>
				<div class="right-auto-box">
					<el-input v-model="createModel.PositionNo" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65 must-star" v-text="$t('position.grade')"></span>
				<div class="right-auto-box">
					<el-input id="txtGrade" v-model="createModel.Grade" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('rowIndex')"></span>
				<div class="right-auto-box">
					<el-input v-model="createModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65 lh-30" v-text="$t('position.description')"></span>
				<div class="right-auto-box">
					<el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="createModel.Description" :maxlength="200"></el-input>
				</div>
			</div>
		</div>
	
		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('cancel')"></el-button>
			<el-button size="small" class="blue-button" :disabled="disabled" @click="submit" v-text="$t('submit')"></el-button>			
		</div>
	</sapi-dialog>
</template>

<script>
import tips from "@/components/sapi-tips.js";
import dialog from "@/components/sapi-dialog.vue";

export default {
	data() {
		return {
			disabled: false,
			visible: false,
			createModel: {},			//新增模型		
		}
	},
	props: ["value"],   
	methods: {
		close() {
			this.$closeWaringTips(".form-error-tips");
			this.$emit("input", false);
		},		
		open() {
			this.createModel = {};
			this.$get("/api/plat/positions/createViewModel", function(res){
				this.createModel = res;
			});
		},
		submit() {
			this.$closeWaringTips(".form-error-tips");
			if (!this.validate()) {
				return;
			}

			this.disabled = true;
			this.$post("/api/plat/positions/", this.createModel, function (res) {				
				this.$parent.loadData();
				this.close();
				Vue.successMsg(this.$t("position.addPositionSuccess"));
			});
		},		
		validate() {
			if (!this.createModel.PositionName) {
				this.$errorTips(this.$t("position.positionNameNotBeEmpty"), "#txtPositionName");
				return false;
			}
			if (!this.createModel.Grade) {
				this.$errorTips(this.$t("position.gradeNotBeEmpty"), "#txtGrade");
				return false;
			}			
			return true;
		}
	},
	components: {
		"sapi-dialog": dialog
	},
	watch: {
		value(val) {
			this.visible = val;
		}
	},
	created() {
		Vue.use(tips);
	},
	mounted(){
		this.visible = this.value;
	}
}
</script>
<style>

</style>