<template>
	<div class="role-set">
		<div class="role-set-left">
			<div class="role-set-left-down">
				<el-select @change="select" v-model="MenuId" :placeholder="$t('selectOne')">
					<el-option v-for="item in selectData" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="role-set-left-tree">
				<el-tree :data="treeData" :expand-on-click-node="false" empty-text="" :default-expand-all="true" :highlight-current="true" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</div>
		</div>
		<div class="role-set-right">
			<div class="role-set-right-header view">
				<ul>
					<li>
						<span class="role-set-right-header-text" v-text="$t('permission.moduleName')"></span>
					</li>
					<li><span class="role-set-right-header-text" v-text="$t('permission.handlePermission')"></span></li>
				</ul>
			</div>
			<el-tree :data="roleData" :check-strictly="true" :expand-on-click-node="false" node-key="MenuId" ref="roleTree" :render-content="renderContent" empty-text="" :default-expand-all="true" :highlight-current="true" :props="defaultProps" @check-change="checkChange"></el-tree>
		</div>
		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="$t('close')"></el-button>
		</div>
	</div>
</template>

<script>
	import checkbox from "./role-checkbox-group.vue"
	export default {
		data() {
			return {
				disabled: false,
				MenuId: '',
				activeMenu: {},
				datas: [],
				treeData: [],
				selectData: [],
				roleData: [],
				defaultProps: {
					label: "MenuName",
					children: "Children"
				},
				activeFlag: false,
				activeAllFlag: false
			}
		},
		props: ["roleId"],
		components: {

		},
		methods: {
			close() {
				this.$parent.close();
			},
			getTreeData() {
				///api/plat/roles/" + _this.actRole.RoleId + "/resources"
				this.$get("/api/plat/roles/" + this.roleId + "/resources", {
					"menuId": ""
				}, function(res) {
					var datas = res.Permissions;
					this.datas = datas;
					if(!datas || datas.length === 0) {
						return;
					}

					var arrs = [];
					var obj = {};
					for(var i = 0, ii = datas.length; i < ii; i++) {
						obj = {};
						obj.value = datas[i].MenuId;
						obj.label = datas[i].MenuName;
						arrs.push(obj);
					}

					this.selectData = arrs;
					this.MenuId = this.selectData[0].value;
					this.treeData = [this.datas[0]];
					this.roleData = this.treeData;
				});
			},
			select(id) {
				var datas = this.datas;
				for(var i = 0, ii = datas.length; i < ii; i++) {
					if(datas[i].MenuId === id) {
						this.roleData = this.treeData = [this.datas[i]];
						break;
					}
				}
			},
			handleNodeClick(data) {
				this.roleData = [data];
			},
			checkChange(data, flag) {
				if(this.activeAllFlag === true) {
					this.activeMenu = {
						MenuId: data.MenuId,
						Flag: flag
					};
				} else if(this.activeFlag === false) {
					this.activeFlag = true;
					setTimeout(() => {
						this.activeFlag = false;
						this.activeMenu = {
							MenuId: data.MenuId,
							Flag: flag
						};
					}, 10);
				}

			},
			checkedNode(id, flag) {
				this.activeFlag = true;
				this.$refs.roleTree.setChecked(id, flag);
				setTimeout(() => {
					this.activeFlag = false;
				}, 10);
			},
			renderContent(h, node) {
				var data = node.data;
				var treeChild = h("tree-checkbox", {
					props: {
						"data": data,
						"activeMenu": this.activeMenu,
						"canSet":false
					},
					on: {
						"on-checked": this.checkedNode
					}
				});

				var span = h("span", {
					"class": "role-tree-text"
				}, data.MenuName);

				return h("span", {
					"class": "role-tree-checkbox"
				}, [span, treeChild]);
			}
		},
		created() {
			this.getTreeData();
			Vue.component("tree-checkbox", checkbox);
		}
	}
</script>
