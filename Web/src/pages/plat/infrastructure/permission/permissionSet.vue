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
				<el-tree :data="treeData" :indent="16" :render-content="renderListContent" :expand-on-click-node="false" empty-text="" :default-expand-all="true" :highlight-current="true" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
			</div>
		</div>
		<div class="role-set-right">
			<div class="role-set-right-header">
				<ul>
					<li>
						<el-checkbox :class="{visibility:!canSet}"  v-model="checkedAllFlag" @change="checkedAll"></el-checkbox>
						<span class="role-set-right-header-text" v-text="$t('permission.moduleName')"></span>
					</li>
					<li><span class="role-set-right-header-text" v-text="$t('permission.handlePermission')"></span></li>
				</ul>
			</div>
			<el-tree :data="roleData" :indent="16" :check-strictly="true" :expand-on-click-node="false" node-key="MenuId" ref="roleTree" :render-content="renderContent" :show-checkbox="canSet" empty-text="" :default-expand-all="true" :highlight-current="true" :props="defaultProps" @check-change="checkChange"></el-tree>
		</div>
		<div class="footer">
			<el-button size="small" class="default-button" @click="close" v-text="canSet!==true ? $t('close') : $t('cancel')"></el-button>
			<el-button v-if="canSet" class="blue-button" size="small" :disabled="disabled" @click="confirm" v-text="$t('determine')"></el-button>			
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
					children: "Children",
					disabled: false,
				},
				activeFlag: false,
				activeAllFlag: false,
				checkedAllFlag: false,
				beforeRoleId: ''
			}
		},
		props: ["roleId", "value", "canSet"],
		components: {

		},
		methods: {
			close() {
				this.$emit("call-back");
				//this.$parent.close();
			},
			confirm() {
				var datas = this.datas;
				var checkedList = [];
				var forEachNode = function(node) {
					var childs = node.Children,
						child;
					if(childs && childs.length > 0) {
						for(var i = 0, ii = childs.length; i < ii; i++) {
							child = childs[i];
							getResources(child.Resources);
							forEachNode(child);
						}
					} else {
						getResources(node.Resources);
					}
				}

				var getResources = function(resources) {
					if(resources && resources.length > 0) {
						for(var j = 0, jj = resources.length; j < jj; j++) {
							if(resources[j].Authorized === true) {
								checkedList.push(resources[j].ResourceId);
							}
						}
					}
				}

				for(var k = 0, kk = datas.length; k < kk; k++) {
					getResources(datas[k].Resources);
					forEachNode(datas[k]);
				}

				this.$request({
					method: "put",
					url: "/api/plat/roles/" + this.roleId + "/resources",
					data: JSON.stringify(checkedList),
					headers: {
						"Content-Type": "application/json"
					}
				}, function(res) {
					Vue.successMsg(this.$t('permission.setSuccess'));
				});

			},
			getTreeData() {
				this.selectData = [];
				this.roleData = [];
				this.datas = [];
				this.beforeRoleId = this.roleId;
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
					this.checkedAllFlag = false;
					setTimeout(() => {
						this.isCheckedAll(true);
					}, 50);
					//this.$emit('call-back', false);
				}, function(err) {
					//this.$emit('call-back', false);
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

				this.checkedAllFlag = false;
				setTimeout(() => {
					this.isCheckedAll(true);
				}, 50);
			},
			handleNodeClick(data) {
				if(this.roleData[0].MenuId===data.MenuId){
					return;
				}
				
				this.roleData = [data];
				this.checkedAllFlag = false;
				setTimeout(() => {
					this.isCheckedAll(true);
				}, 50);
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
						setTimeout(() => {
							this.isCheckedAll(flag);
						}, 50);
					}, 10);
				}

			},
			checkedNode(id, flag) {
				this.activeFlag = true;
				this.$refs.roleTree.setChecked(id, flag);
				setTimeout(() => {
					this.activeFlag = false;
					setTimeout(() => {
						this.isCheckedAll(flag);
					}, 50);
				}, 10);
			},
			isCheckedAll(activeFlag) {
				var flag = this.checkedAllFlag;
				if(this.canSet !== true || activeFlag === flag) {
					return;
				}

				if(flag === true) {
					this.checkedAllFlag = false;
					return;
				}

				var datas = this.roleData;
				var stopFlag = false;
				var forEachNode = function(items) {
					for(var i = 0, ii = items.length; i < ii; i++) {
						if(stopFlag === true) {
							return;
						}
						var item = items[i];
						var resources = item.Resources;
						if(resources && resources.length > 0) {
							for(var j = 0, jj = resources.length; j < jj; j++) {
								if(resources[j].Authorized === false) {
									stopFlag = true;
									break;
								}
							}

							if(stopFlag === true) {
								return;
							}
						}

						if(item.Children && item.Children.length > 0) {
							forEachNode(item.Children);
						}

					}
				}

				forEachNode(datas);
				if(stopFlag === false) {
					this.checkedAllFlag = true;
				}

			},
			checkedAll() {
				this.activeAllFlag = true;
				var keys=this.setTreeChecked(this.checkedAllFlag);
				
				setTimeout(() => {
					this.activeAllFlag = false;
				}, 50);
			},
			setTreeChecked(flag){
				var datas = this.roleData;
				var stopFlag = false;
				var keys=[];
				var tree=this.$refs.roleTree;
				function foreachNode(items){
					for(var i = 0, ii = items.length; i < ii; i++) {
						var item = items[i];
						tree.setChecked(item, flag, false)

						if(item.Children && item.Children.length > 0) {
							foreachNode(item.Children);
						}
					}	
				}
				
				foreachNode(datas);
				return keys;
			},
			renderContent(h, node) {
				var data = node.data;
				var treeChild = h("tree-checkbox", {
					props: {
						"data": data,
						"activeMenu": this.activeMenu,
						"canSet": this.canSet
					},
					on: {
						"on-checked": this.checkedNode
					}
				});

				var span = h("span", {
					"class": "role-tree-text",
					attrs: {
						title: data.MenuName
					}
				}, data.MenuName);

				return h("span", {
					"class": "role-tree-checkbox"
				}, [span, treeChild]);
			},
			renderListContent(h, node) {
				var data = node.data;
				return h("span", {
					attrs: {
						title: data.MenuName
					}
				}, data.MenuName);
			}
		},
		created() {
			this.getTreeData();
			Vue.component("tree-checkbox", checkbox);
			this.$emit("input", true);
			this.defaultProps.disabled = this.canSet;
		},
		watch: {
			value(val) {
				if(val === false) {
					this.treeData = [];
					this.getTreeData();
					this.$emit("input", true);
					/*this.$emit('call-back', false);*/
				}
			}
		}
	}
</script>