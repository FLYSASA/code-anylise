<template>
	<sapi-dialog v-model="visible" width="500px" top="25%" class="add" @on-open="open" @on-close="close">

		<span slot="title" v-text="$t('permission.addRoleTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<span class="w-65 must-star" v-text="$t('permission.roleName')"></span>
				<div class="right-auto-box">
					<el-input id="RoleName" v-model.trim="createModel.RoleName" :maxlength="200"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('permission.roleNo')"></span>
				<div class="right-auto-box">
					<el-input v-model="createModel.RoleNo" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('rowIndex')"></span>
				<div class="right-auto-box">
					<el-input v-model="createModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65 lh-30" v-text="$t('permission.remark')"></span>
				<div class="right-auto-box">
					<el-input :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="createModel.Remark"> </el-input>
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
				disabled: false,
				visible: false,
				createModel: {}
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
				this.option && (this.createModel = this.option);
				this.$get("/api/plat/roles/maxRowIndex",function(res){					
					this.createModel=Object.assign({},this.createModel,{'RowIndex':res});
				});
			},
			submit() {
				this.$closeWaringTips(".form-error-tips");
				if(!this.validate()) {
					return;
				}

				this.disabled = true;
				this.$post("/api/plat/roles/", this.createModel, function(res) {
					this.disabled = false;
					this.$parent.getTableData();
					this.close();
					Vue.successMsg(this.$t('permission.addRoleSuccess'));
				});
			},
			validate() {
				if(!this.createModel.RoleName) {
					this.$errorTips(this.$t('permission.roleNameNotBeEmpty'), "#RoleName");
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
				this.visible = this.value;
			}
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

</style>