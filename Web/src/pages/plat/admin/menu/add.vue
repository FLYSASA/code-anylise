<template>
	<sapi-dialog v-model="visible" width="800px" top="14%" @on-open="open" @on-close="close">
		<span slot="title" v-text="title"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65 must-star">菜单名称</span>
					<div class="right-auto-box">
						<el-input id="MenuName" v-model.trim="createModel.MenuName" :maxlength="10"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65">菜单编号</span>
					<div class="right-auto-box">
						<el-input v-model="createModel.MenuNo" :maxlength="100"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50"><span class="w-65">父级菜单</span>
					<div class="right-auto-box">
						<el-input :value="createModel.ParentMenuName||'根节点'" :disabled="true"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65">链接地址</span>
					<div class="right-auto-box">
						<el-input v-model="createModel.MenuPath" :maxlength="1000"></el-input>
					</div>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65">菜单图标</span>
					<div class="right-auto-box">
						<el-input v-model="createModel.IconPath" :maxlength="1000"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65">显示菜单</span>
					<div class="right-box">
						<el-checkbox v-model="createModel.Enabled"></el-checkbox>
					</div>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65">备注</span>
				<div class="right-auto-box">
					<el-input v-model="createModel.Remark" type="textarea" :autosize="{minRows: 2, maxRows: 2}" :maxlength="2000"></el-input>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65">资源权限</span>
					<div class="right-auto-box">
						<el-button size="small" :plain="true" @click.stop="setPermissions">设置权限资源</el-button>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65">行号</span>
					<div class="right-auto-box">
						<el-input v-model="createModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
					</div>
				</div>
			</div>

			<div class="fullline">
				<menu-resource @call-back="clickCallback" :editable="true" :resources="permissArr"></menu-resource>
			</div>
		</div>

		<div class="footer">
			<el-button size="small" class="default-button" @click="close">取消</el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit">提交</el-button>
		</div>

		<component slot="moreDialog" @call-back="callback" :is="currentView"  v-model="dialogVisible" :index="componentIndex" :datas="datas" :option="componentOption"></component>
	</sapi-dialog>
</template>

<script>
	import resources from "./resources.vue";
	import permissions from "./permissions.vue";
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				createModel: {
					Resources: []
				},
				disabled: false,
				visible: false,
				menutype: 0,
				dialogVisible: false,
				currentView: "",
				permissArr: [],
				componentOption:{},
				componentIndex:[],
				datas:[]
			}
		},
		props: ["option", "menuType", "value", "title"],
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit('input', false);
			},
			open() {
				this.createModel = this.option;
				this.createModel.Enabled = true;
				this.createModel.ClientId = "WebApp";
				this.permissArr = [{
					ResourceCode: "View",
					ResourceName: "浏览",
					Remark: "",
					RowIndex: "0",
					Paths: []
				}];

				this.createModel.RowIndex = 10;
				this.getMaxRowIndex();
			},
			setPermissions() {
				this.currentView = "menu-permissions";
				this.componentOption=this.permissArr;
				this.dialogVisible = true;
			},
			callback(arrs) {
				this.permissArr = arrs;
			},
			clickCallback(row, index) {
				this.datas=this.permissArr[index[0]].Paths;
				this.componentIndex=index;
				this.dialogVisible = true;
				this.componentOption=row;
				this.currentView = "menu-resource-path";
			},
			validate() {
				this.$closeWaringTips(".form-error-tips");
				if(!this.createModel.MenuName) {
					this.$errorTips("请填写菜单名称", "#MenuName");
					return false;
				}

				return true;
			},
			submit() {
				if(this.validate()) {
					this.createModel.Resources = this.permissArr;
					this.disabled = true;
					this.$loadingOpen();
					this.$post("/api/plat/menus",
						this.createModel,
						function(res) {
							this.$parent.getTree();
							this.$loadingClose();
							Vue.successMsg(res.Message);
							this.close();
						},
						function(res) {
							this.$loadingClose();
							this.disabled = false;
						});
				}
			},
			getMaxRowIndex() {
				this.$get("/api/plat/menus/maxRowIndex", {
					"parentMenuId": this.option.ParentMenuId
				}, function(res) {
					//实时更新createModel的行号
					this.createModel = Object.assign({}, this.createModel, {
						'RowIndex': res
					})
				});
			},
		},
		components: {
			"sapi-dialog": dialog,
			"menu-resource": resources,
			"menu-permissions": (resolve) => {
				require(['./permissions.vue'], resolve);
			},
			"menu-resource-path": (resolve) => {
				require(['./addPath.vue'], resolve);
			}
		},
		created() {
			Vue.use(tips);
		},
		mounted() {
			this.visible = this.value;

		},
		watch: {
			value(val) {
				this.visible = val;
			}
		}
	}
</script>

<style>

</style>