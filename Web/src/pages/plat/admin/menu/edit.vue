<template>
	<div class="edit-model clearfix">
		<div class="edit-model-content">
			<div class="fullline">
				<span class="w-65 must-star">菜单名称</span>
				<div class="right-box">
					<el-input id="MenuName" v-model.trim="editModel.MenuName" :maxlength="10"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65">菜单编号</span>
				<div class="right-box">
					<el-input v-model="editModel.MenuNo" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65">父级菜单</span>
				<div class="right-box drop-down-wrapper">
					<dropdown-tree empty="根节点" :expand-on-click-node="false" :is-tree="true" :except-id="option.MenuId" v-model="editModel.ParentMenuId" :data="treeData" :props="parentMenuProps" @change="selectParentMenu"></dropdown-tree>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65">链接地址</span>
				<div class="right-box">
					<el-input v-model="editModel.MenuPath" :maxlength="1000"></el-input>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65">菜单图标</span>
					<div class="right-box">
						<el-input v-model="editModel.IconPath" :maxlength="1000"></el-input>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65">显示菜单</span>
					<div class="right-box">
						<el-checkbox v-model="editModel.Enabled"></el-checkbox>
					</div>
				</div>
			</div>
			<div class="fullline">
				<span class="w-65">备注</span>
				<div class="right-box">
					<el-input v-model="editModel.Remark" type="textarea" :autosize="{minRows: 2, maxRows: 2}" :maxlength="2000"></el-input>
				</div>
			</div>
			<div class="fullline">
				<div class="wp-50">
					<span class="w-65">资源权限</span>
					<div class="right-box">
						<el-button size="small" :plain="true" @click.stop="setPermissions">设置权限资源</el-button>
					</div>
				</div>
				<div class="wp-50 float-right">
					<span class="w-65">行号</span>
					<div class="right-box">
						<el-input v-model="editModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
					</div>
				</div>
			</div>

			<div class="fullline">
				<menu-resource class="resource-wrap" @call-back="clickCallback" :editable="true" :resources="permissArr"></menu-resource>
			</div>
		</div>

		<div class="edit-footer">
			<el-button class="default-button padding-button" type="primary" size="small" @click="cancel">取消</el-button>
			<el-button class="blue-button padding-button" type="primary" :disabled="disabled" size="small" @click="submit">提交</el-button>
		</div>

		<component @call-back="callback" :is="currentView" v-model="dialogVisible" :index="componentIndex" :datas="datas" :option="componentOption"></component>
	</div>
</template>

<script>
	import dropdownTree from "@/components/sapi-select.vue";
	import tips from "@/components/sapi-tips.js";
	import resources from "./resources.vue";
	import permissions from "./permissions.vue";
	export default {
		data() {
			return {
				disabled: false,
				editModel: {
					ParentMenuId: null
				},
				parentMenuProps: {
					children: 'Children',
					label: 'MenuName',
					nodeKey: "MenuId",
				},
				permissArr: [],
				dialogVisible: false,
				currentView: "",
				permissArr: [],
				componentOption: {},
				componentIndex: [],
				datas: []
			}
		},
		props: ["option", "treeData"],
		components: {
			"menu-resource": resources,
			"menu-permissions": (resolve) => {
				require(['./permissions.vue'], resolve);
			},
			"menu-resource-path": (resolve) => {
				require(['./addPath.vue'], resolve);
			},
			"dropdown-tree": dropdownTree
		},
		methods: {
			cancel() {
				this.$emit('viewBack');
			},
			submit() {
				if(this.validate()) {
					this.disabled = true;
					this.$loadingOpen();
					this.editModel.Resources = this.permissArr;
					if(this.editModel.ParentMenuId === '') {
						this.editModel.ParentMenuId = null;
					}
					this.$put("/api/plat/menus",
						this.editModel,
						function(res) {
							this.$parent.getTree();
							Vue.successMsg(res.Message);
						},
						function(res) {
							Vue.errorMsg(res.Message);
							this.disabled = false;
						});
				}
			},
			setPermissions() {
				this.currentView = "menu-permissions";
				this.componentOption = this.permissArr;
				this.dialogVisible = true;
			},
			callback(arrs) {
				this.permissArr = arrs;
			},
			clickCallback(row, index) {
				this.datas = this.permissArr[index[0]].Paths;
				this.componentIndex = index;
				this.dialogVisible = true;
				this.componentOption = row;
				this.currentView = "menu-resource-path";
			},
			selectParentMenu(data) {
				this.editModel['ParentMenuName'] = data.MenuName;
			},
			validate() {
				if(!this.editModel.MenuName) {
					this.$errorTips("请填写菜单名称", "#MenuName", {
						isDown: true
					});
					return false;
				}

				return true;
			}
		},
		watch: {
			option(val) {
				if(val && typeof val === "object") {
					this.editModel = JSON.parse(JSON.stringify(val));
				} else {
					this.editModel = {};
				}
				this.editModel.ParentMenuId=this.editModel.ParentMenuId||"";
				this.permissArr = this.editModel.Resources;
			}
		},
		created() {
			Vue.use(tips);
		},
		mounted() {
			if(this.option && typeof this.option === "object") {
				this.editModel = JSON.parse(JSON.stringify(this.option));
			} else {
				this.editModel = {};
			}
			this.editModel.ParentMenuId=this.editModel.ParentMenuId||"";

			this.permissArr = this.editModel.Resources;
		}
	}
</script>

<style>
	.edit-model {
		height: 100%;
		position: relative;
	}
	
	.edit-model .edit-model-content {
		height: calc(100% - 58px);
		overflow: auto;
		padding: 30px 15px 15px 15px;
	}
	
	.edit-model .edit-footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 58px;
		text-align: center;
		padding-top: 15px;
		box-shadow: 5px 1px 5px 5px #eee;
	}
</style>