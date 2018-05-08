<template>
	<div class="main">
		<div class="main-header">
            <div class="main-header-map main-header-map-extend">
                <span class="main-header-map-text"></span>
                <span class="main-header-map-description" v-show="params.projectId===''||params.projectId===null">
                    <span>{{$t('building.desc')}}</span>
				</span>
            </div>
			
			<div class="main-header-search">
				<div class="func-btns">
					<sapi-search v-model="params.keyword" :placeholder="$t('building.search')" @on-search="loadData"></sapi-search>
					<span v-if="permissions.Add" class="icon-btn" @click="openAddDialog" :title="$t('add')"><i class="icon-build"></i></span>
					<span v-if="permissions.Delete" class="icon-btn" @click="deleteItems" :title="$t('delete')"><i class="icon-deleter"></i></span> 
					<span class="icon-btn icon-filter" :title="$t('filter')"></span>
				</div>
			</div>
		</div>

		<div class="main-table table-no-border width-p100">
			<el-table border :data="tableData" ref="bodyTable" @selection-change="rowSelect" @sort-change="sortChange" :height="maxBodyHeight">
				<el-table-column v-if="permissions.Delete" type="selection" width="45"></el-table-column>
				<el-table-column prop="BuildingName" :label="$t('building.buildingName')" show-overflow-tooltip sortable>
					<template slot-scope="props">
						<a href="javascript:void(0)" @click="openViewDialog(props.row)">{{props.row.BuildingName}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="BuildingNo" :label="$t('building.buildingNo')" width="120" sortable show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="FormTypeName" :label="$t('building.formTypeName')" width="120"  sortable show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="BaseFormTypeName" :label="$t('building.baseFormTypeName')" width="180" sortable show-overflow-tooltip>
					<template slot-scope="props">
						{{baseFormTypeValue[props.row.BaseFormTypeName]}}
					</template>
				</el-table-column>
                <el-table-column prop="IsSell" :label="$t('building.isSell')" width="100">
                     <template slot-scope="scope">
						<span v-if="scope.row.IsSell===true" v-text="isSellData.isTrue"></span>
						<span v-else v-text="isSellData.isFalse"></span>
					</template>
				</el-table-column>
				<el-table-column :label="$t('handle')" fixed="right" width="180" v-if="permissions.Edit || permissions.Delete">
					<template slot-scope="props">
                        <a v-if="permissions.Edit" class="table-btn" href="javascript:void(0)" @click.stop="openEditDialog(props.row,props.$index)" v-text="operateText.edit"></a>
                        <a v-if="permissions.Delete" class="table-btn" href="javascript:void(0)" @click.stop="deleteItem(props.row,props.$index)" v-text="operateText.delete"></a>
                    </template>
				</el-table-column>
			</el-table>
		</div>

		<div class="main-pager">
			<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
			</el-pagination>
		</div>

		<component v-bind:is="currentView" v-model="visible" :option="option"></component>

		<building-filter @on-confirm="loadData" :is-init="filterControlIsInit">
			<ul>
				<li>
					<span class="w-65" v-text="$t('building.project')"></span>
					<span class="right-auto-box">
						<sapi-select v-model="params.projectId" prop="projectId" :expand-on-click-node="false" 
                                    :is-tree="true" :data="projects" :props="projectProps" 
									options="data:selectedProject,label:ProjectName,value:ProjectId" @change="changeProject"></sapi-select>
					</span>
				</li>
			</ul>
		</building-filter>
	</div>
</template>

<script>
	import confirm from "@/components/sapi-confirm.js";
	import search from "@/components/sapi-search.vue";
	import filter from "@/components/sapi-filter.vue";
	import select from "@/components/sapi-select.vue";
	import basFormType from "../../static/js/basFormType.js";
	
	export default {
		data() {
			return {
				tableData: [],			//列表数据
				deleteIds: [],          //需要被删除的Ids
				currentView: "",		//组件名称
				visible: false,
				option: {},
				params: {
					projectId: undefined,
					sortName: "",
                    sortType: ""
				},
				baseFormTypeValue: basFormType.baseFormTypeValue,
				projects: [],
				selectedProject: [],
				projectProps: {
					children: 'Children',
					label: 'ProjectName',
					value: 'ProjectId',
					hasChild: "HasChild"
				},
				projectOption: {},
				operateText: {
					edit: this.$t("edit"),
					delete: this.$t("delete")
				},
				isSellData: {
					isTrue: this.$t("building.isSellData.isTrue"),
					isFalse: this.$t("building.isSellData.isFalse")
                },
                filterControlIsInit: false
			}
		},
		components: {
			"building-add": (resolve) => {
				require(['./add.vue'], resolve);
			},
			"building-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			},
			"building-view": (resolve) => {
				require(['./view.vue'], resolve);
			},
			"building-filter": filter,
			"sapi-search": search,
			"sapi-select": select
		},
		mixins: [getPagerMixin(), getTabMixin()],
		methods: {
			loadData() {
                var params = this.params;
                if(!params.projectId){
                	params.projectId="";
                }
				this.$get("/api/plat/buildings", params, function(res) {
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
				});
			},
			openAddDialog() {
                this.currentView = "building-add";
                this.option.ProjectId = this.params.projectId;
				this.visible = true;
			},
			openEditDialog(row, index) {
				this.currentView = "building-edit";
				this.option = row;
				this.visible = true;
			},
			deleteBuildings(apiAddress, itemids, successFunc) {
                if(itemids == null || itemids.length == 0) {
                    Vue.msg(this.$t("selectOneWhenDeleted"));
                    return false;
                }

                this.$deleteTips(function() {
                    this.$delete(apiAddress, JSON.stringify(itemids), function(res) {
						successFunc(res);
						Vue.successMsg(this.$t("building.delBuildingSuccess"));
                    });
                });
            },
			deleteItem(row, index) {
				var _this = this;
                var deleteIds = [];
                deleteIds.push(row.BuildingId);
                this.deleteBuildings(
                    "/api/plat/buildings/",
                    deleteIds,
                    function(res) {
                        _this.loadData();
                    });
			},
			deleteItems() {
                var _this = this;
                this.deleteBuildings(
                    "/api/plat/buildings/",
                    _this.deleteIds,
                    function(res) {
                        _this.loadData();
                    });                
			},
			openViewDialog(row, index) {
				this.currentView = "building-view";
				this.option = row;
				this.visible = true;
			},
			rowSelect(datas) {
                var _this = this;
                _this.deleteIds = [];
                if(datas.length > 0) {
                    datas.forEach(function(data) {
                        _this.deleteIds.push(data.BuildingId);
                    });
                }
            },
			sortChange(obj) {
				this.params.sortName = obj.prop;
				this.params.sortType = obj.order;
				this.pageCurrentChange(1);
			},
			changeProject(project) {
				this.selectedProject=[project];
			},
			getProjects() {
				this.$get("/api/plat/projects/tree", {}, function(res) {
                    this.projects = res;
                    if(res.length > 0) {
                        this.filterControlIsInit = true;
                        this.params.projectId = res[0].ProjectId;
						this.selectedProject=[res[0]];
						this.loadData();
                    }
				});
			}
		},
		created() {
			Vue.use(confirm);
			this.getProjects();
			//pager改变时将要执行的函数，对该值进行初始化
			this.pageFunc = this.loadData;
			//初始化权限等
			this.$init();
		}
	}
</script>
