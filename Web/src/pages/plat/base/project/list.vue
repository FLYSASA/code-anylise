<template>
	<div class="main">
		<div class="main-header">
            <div class="main-header-map main-header-map-extend">
                <span class="main-header-map-text"></span>
                <span class="main-header-map-description" v-if="params.corpId===null||params.corpId===''">
                    <span>{{$t('project.desc')}}</span>
				</span>
            </div>
			<div class="main-header-search">
				<div class="func-btns">
					<sapi-search v-model="params.keyword" :placeholder="$t('project.search')" @on-search="loadData"></sapi-search>
					<span v-if="permissions.Add" class="icon-btn" @click="openAddDialog" :title="$t('add')"><i class="icon-build"></i></span>
                    <span class="icon-btn icon-filter" :title="$t('filter')"></span>
				</div>
			</div>
		</div>
       
		<div class="main-table table-no-border width-p100">
			<el-table border :data="tableData" ref="bodyTable" @sort-change="sortChange" :height="maxBodyHeight">
				<el-table-column prop="ProjectName" :label="$t('project.projectName')" show-overflow-tooltip>
					<template slot-scope="props">
						<a href="javascript:void(0)" @click="openViewDialog(props.row)">{{props.row.ProjectName}}</a>
					</template>
				</el-table-column>
				<el-table-column prop="ProjectNo" :label="$t('project.projectNo')" width="150" show-overflow-tooltip>
				</el-table-column>
                <el-table-column prop="StatusName" :label="$t('project.status')" width="120" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="TypeName" :label="$t('project.type')" width="200"  show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="IsPurchased" :label="$t('project.isPurchased')" width="130" show-overflow-tooltip>
                    <template slot-scope="scope">
						<span v-if="scope.row.IsPurchased===true" v-text="isPurchasedText.isTrue"></span>
						<span v-if="scope.row.IsPurchased===false" v-text="isPurchasedText.isFalse"></span>
					</template>
				</el-table-column>
				
				<el-table-column prop="CreateDate" :label="$t('project.createDate')" width="140"  show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{$dateFormat('yyyy-MM-dd', scope.row.CreateDate)}}
                    </template>
				</el-table-column>
				<el-table-column :label="$t('handle')" fixed="right" width="200" v-if="permissions.Edit || permissions.Delete">
					<template slot-scope="props">
                        <a v-if="permissions.Edit" class="table-btn" href="javascript:void(0)" @click.stop="openEditDialog(props.row,props.$index)" v-text="operateText.edit"></a>
                        <a v-if="permissions.Delete" class="table-btn" href="javascript:void(0)" @click.stop="deleteItem(props.row,props.$index)" v-text="operateText.delete"></a>
                        <a v-if="permissions.Add && !props.row.ParentProjectId" class="table-btn" href="javascript:void(0)" @click.stop="openAddChildDialog(props.row,props.$index)" v-text="operateText.addChild"></a>
                    </template>
				</el-table-column>
			</el-table>
		</div>

		<div class="main-pager">
			<el-pagination @size-change="pageSizeChange" @current-change="pageCurrentChange" :current-page="params.pageIndex" :page-sizes="pageArr" :page-size="params.pageSize" :layout="layout" :total="pageTotal">
			</el-pagination>
		</div>

		<component v-bind:is="currentView" v-model="visible" :option="option"></component>

        <project-filter @on-confirm="loadData" :is-init="filterControlIsInit">
			<ul>
				<li>
					<span class="w-65">{{$t('project.corp')}}</span>
					<span class="right-auto-box">
                        <sapi-select :url="url" :params="struParams" prop="corpId" v-model="params.corpId" :expand-on-click-node="false" 
                                    :is-tree="true" :data="companys" :props="struProps" :except-id="option.StruId"
                                     options="data:seletedCompany,label:StruName,value:StruId" @change="changeCompany"></sapi-select>
                    </span>
				</li>
                <li>
					<span class="w-65">{{$t('project.status')}}</span>
					<span class="right-auto-box">
                        <sapi-select v-model="params.statusId" prop="statusId" :data="projectStatuss" options="data:projectStatuss,label:StatusName,value:StatusId" :props="{label:'StatusName',value:'StatusId'}" ></sapi-select>
                    </span>
				</li>
                <li>
					<span class="w-65">{{$t('project.type')}}</span>
					<span class="right-auto-box">
                        <sapi-select v-model="params.typeId" prop="typeId" :data="projectTypes" options="data:projectTypes,label:TypeName,value:TypeId" :props="{label:'TypeName',value:'TypeId'}"></sapi-select>
                    </span>
				</li>
			</ul>
		</project-filter>

	</div>
</template>

<script>
    import select from "@/components/sapi-select.vue";
	import confirm from "@/components/sapi-confirm.js";
    import search from "@/components/sapi-search.vue";
    import filter from "@/components/sapi-filter.vue";

	export default {
		data() {
			return {
                tipField:"项目",
				tableData: [],
				option: {},
				currentView: "",
                visible: false,
                companys: [],
                seletedCompany:[],
                projectStatuss:[],
                projectTypes:[],
				struProps:{
					children: 'Children',
					label: 'StruName',
                    value:'StruId',
                    hasChild:"HasChild"
                },
                url: "/api/plat/structures/brief",
				struParams: {
					withDept: false,
					nodeIdKey: "parentStruId"
                },
                params:{
                    corpId:undefined,
                    statusId:null,
                    typeId:null,
				},
				operateText:{
					edit: this.$t("edit"),
					delete: this.$t("delete"),
					addChild: this.$t("project.addChild")
				},
				isPurchasedText:{
					isTrue: this.$t("project.isPurchasedData.isTrue"),
					isFalse: this.$t("project.isPurchasedData.isFalse")
                },
                filterControlIsInit:false
			}
		},
		components: {
			"project-add": (resolve) => {
				require(['./add.vue'], resolve);
			},
			"project-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			},
			"project-view": (resolve) => {
				require(['./view.vue'], resolve);
			},
            "sapi-search": search,
            "sapi-select": select,
            "project-filter": filter
		},
        mixins: [getPagerMixin(), getTabMixin()],
		methods: {
			loadData() {
                var params = this.params;
                if(!params.corpId){
                	params.corpId="";
                }
                
				this.$get("/api/plat/projects", params, function(res) {
					this.tableData = res.Rows;
					this.pageTotal = res.Total;
				});
            },
			openAddDialog() {
                this.currentView = "project-add";
                this.option.AddChild = false;
                this.option.CorpId = this.params.corpId;
				this.visible = true;
            },
            openAddChildDialog(row,index){
                this.currentView = "project-add";
                this.option = row;
                this.option.AddChild = true;
				this.visible = true;
            },
			openEditDialog(row, index) {
				this.currentView = "project-edit";
                this.option = row;
                this.option.AddChild = true;
				this.visible = true;
			},
            deleteProjects(apiAddress, itemIds, successFunc) {
				if(itemIds.length == 0) {
					Vue.msg(this.$t("selectOneWhenDeleted"));
					return false;
				}

				this.$deleteTips(function() {
					this.$delete(apiAddress, JSON.stringify(itemIds), function(res) {
						successFunc(res);
						Vue.successMsg(this.$t("project.delProjectSuccess"));						
					});
				});
			},
			deleteItem(row, index) {
                var _this = this;
				this.deleteProjects(
					"/api/plat/projects/"+row.ProjectId,{},function(res) {
						_this.loadData();
					});
			},
			openViewDialog(row, index) {
				this.currentView = "project-view";
                this.option = row;
				this.visible = true;
            },
			sortChange(obj) {
				this.params.sortName = obj.prop;
				this.params.sortType = obj.order;
				this.pageCurrentChange(1);
            },
            getCompanys() {
                this.$get("/api/plat/structures/brief", {}, function(res) {
                    this.companys = res;
                    if(res.length >0 )
                    {
                        this.filterControlIsInit = true;
                        this.params.corpId = res[0].CorpId;
                        this.seletedCompany=[res[0]];
                    }
                    this.loadData();
                });
            },
            changeCompany(company){
                this.seletedCompany=[company];
            },
            getProjectStatuss(){
                this.$get("/api/plat/projectStatuses/brief", {}, function(res) {
                    this.projectStatuss = [];
                    this.projectStatuss.push({StatusId:"",StatusName:"全部"});
                    this.projectStatuss = this.projectStatuss.concat(res);
                    this.params.statusId = "";
				});
            },
            getProjectTypes(){
                this.$get("/api/plat/projectTypes/brief", {}, function(res) {
                    this.projectTypes = [];
                    this.projectTypes.push({TypeId:"",TypeName:"全部"});
                    this.projectTypes = this.projectTypes.concat(res);
                    this.params.typeId = "";
				});
            }
		},
		created() {
            Vue.use(confirm);
            this.getCompanys();
            this.getProjectStatuss();
            this.getProjectTypes();
			//pager改变时将要执行的函数，对该值进行初始化
            this.pageFunc = this.loadData;
			//初始化权限等
			this.$init();
		}
	}
</script>
