<template>
	<sapi-dialog v-model="visible" width="500px" top="25%" class="add" @on-open="open" @on-close="close">
		<span slot="title" v-text="$t('permission.editRoleTitle')"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<span class="w-65 must-star" v-text="$t('permission.roleName')"></span>
				<div class="right-auto-box">
					<el-input :maxlength="200" id="RoleName" v-model.trim="editModel.RoleName"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('permission.roleNo')"></span>
				<div class="right-auto-box">
					<el-input v-model="editModel.RoleNo" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('rowIndex')"></span>
				<div class="right-auto-box">
					<el-input v-model="editModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65" v-text="$t('permission.remark')"></span>
				<div class="right-auto-box">
					<el-input :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"  v-model="editModel.Remark"></el-input>
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
				editModel: {}
			}
		},
		props: ["value","option"],
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit("input", false);
			},
			open() {
				if(this.option && typeof this.option === "object") {
					this.editModel = JSON.parse(JSON.stringify(this.option));
				} else {
					this.editModel = this.option;
				}
			},
			submit() {
				if(!this.validate()) {
					return;
				}

				this.disabled = true;
				this.$put("/api/plat/roles/", this.editModel, function(res) {
					this.disabled = false;
					this.$parent.getTableData();
					this.close();
					Vue.successMsg(this.$t('permission.editRoleSuccess'));
				});
			},
			validate() {
				this.$closeWaringTips(".form-error-tips");
				if(!this.editModel.RoleName) {
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
