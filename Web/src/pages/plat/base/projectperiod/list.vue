<template>
	<div class="main">
      <div class="main-header">
          <div class="main-header-map"><span class="main-header-map-text"></span></div>
          <div class="main-header-search">
                <div class="func-btns">
                    <sapi-search v-model="params.keyword" :placeholder="$t('projectPeriod.search')" @on-search="loadData"></sapi-search>
                    <span v-if="permissions.Add" class="icon-btn" @click="openAddDialog" :title="$t('add')"><i class="icon-build"></i></span>
                    <span v-if="permissions.Delete" class="icon-btn" @click="deleteItems" :title="$t('delete')"><i class="icon-deleter"></i></span> 
                </div>
            </div>
        </div>

		<div class="main-table table-no-border width-p100">
			<el-table border :data="tableData" ref="bodyTable" @selection-change="rowSelect" :height="maxBodyHeight">				
				 <el-table-column v-if="permissions.Delete" type="selection" width="45"></el-table-column>
                <el-table-column prop="PeriodName" :label="$t('projectPeriod.periodName')" width="150" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="Remark" :label="$t('projectPeriod.remark')" min-width="180" show-overflow-tooltip>
				</el-table-column>				
				<el-table-column prop="RowIndex" :label="$t('rowIndex')" width="100" show-overflow-tooltip>
				</el-table-column>				
				<el-table-column :label="$t('handle')" fixed="right" width="100">
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

     <!-- 新增、修改组件 -->
     <component v-bind:is="currentView" v-model="visible" :option="option"></component>

	</div>
</template>

<script>
    import confirm from "@/components/sapi-confirm.js";
    import search from "@/components/sapi-search.vue";
    
	export default {
		data() {
			return {
				tableData: [],
				option: {PeriodId:""},
				currentView: "",
                visible: false,
                deleteIds:[],
                operateText:{
                	edit:this.$t('edit'),
                	delete:this.$t('delete')
                }
			}
		},		
        mixins: [getPagerMixin(), getTabMixin()],
		methods: {
			loadData() {
                var params = this.params;
				this.$loadingOpen();
				this.$get("/api/plat/projectPeriods", params, function(res) {
                    this.tableData = res.Rows;
                    this.pageTotal = res.Total;
				});
            },
            openAddDialog()
            {
                this.currentView="projectPeriod-add";
                this.visible=true;
            },
			openEditDialog(row, index) {
				 this.currentView = "projectPeriod-edit";
                 this.option.PeriodId=row.PeriodId;
				 this.visible = true;
            },
            deleteProjectPeriods(apiAddress, itemids, successFunc) 
            {
                if(itemids==null||itemids.length==0)
                {
                    Vue.msg(this.$t('selectOneWhenDeleted'));
                    return false;
                }

                this.$deleteTips(function(){
                    this.$delete(apiAddress, JSON.stringify(itemids),function(res){
                        successFunc(res);
                        Vue.successMsg(this.$t('projectPeriod.delProjectPeriodSuccess'));
                    });
                });
            },
            deleteItems()
            {
                var _this = this;
                this.deleteProjectPeriods(
                    "/api/plat/projectPeriods/",
                    _this.deleteIds,
                    function(res){
                        _this.loadData();
                    });  
            },
            deleteItem(row,index)
            {
                var _this=this;
                var deleteIds=[];
                deleteIds.push(row.PeriodId);
                this.deleteProjectPeriods("/api/plat/projectPeriods/",
                    deleteIds,
                    function(res){
                        _this.loadData();
                    });
            },
            rowSelect(datas) 
            {
               var _this=this;
               _this.deleteIds = [];
                if(datas.length > 0) {
                    datas.forEach(function(data) {
                        _this.deleteIds.push(data.PeriodId);
                    });
                }
            }
        },
        components: {
             "projectPeriod-add": (resolve) => {
                require(['./add.vue'], resolve);
             },
             "projectPeriod-edit": (resolve) => {
                require(['./edit.vue'], resolve);
             },
            "sapi-search": search
        },
		created() {
            Vue.use(confirm);
            //pager改变时将要执行的函数，对该值进行初始化
            this.pageFunc = this.loadData;
            this.loadData();
            //初始化权限等信息
            this.$init();
		}
	}
</script>