<template>
    <div class="main">
        <div class="main-header">
            <div class="main-header-map"><span class="main-header-map-text"></span></div>
            <div class="main-header-search">
                <div class="func-btns">
                    <sapi-search v-model="params.keyword" :placeholder="$t('position.search')" @on-search="loadData"></sapi-search>
                    <span v-if="permissions.Add" class="icon-btn" @click="openAddDialog" :title="$t('add')"><i class="icon-build"></i></span>
                    <span v-if="permissions.Delete" class="icon-btn" @click="deleteItems" :title="$t('delete')"><i class="icon-deleter"></i></span>
                    <span v-if="permissions.Import" class="icon-btn" @click="importDialog" :title="$t('import')"><i class="icon-import"></i></span>
                    <span v-if="permissions.Export" class="icon-btn" @click="exportDialog" :title="$t('export')"><i class="icon-export"></i></span>
                </div>            
            </div>
        </div>
    
        <div class="main-table table-no-border width-p100">
            <el-table border :data="tableData" ref="bodyTable" @sort-change="sortChange" @selection-change="rowSelect" :height="maxBodyHeight">
                <el-table-column v-if="permissions.Delete" type="selection" width="45">
                </el-table-column>
                <el-table-column prop="PositionName" :label="$t('position.positionName')" width="220" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="PositionNo" :label="$t('position.positionNo')" width="150" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="Grade" :label="$t('position.grade')" width="150" show-overflow-tooltip sortable>
                </el-table-column>
                <el-table-column prop="Description" :label="$t('position.description')" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="RowIndex" :label="$t('rowIndex')" width="100" sortable>
                </el-table-column>
                <el-table-column :label="$t('handle')" fixed="right" width="100" v-if="permissions.Edit || permissions.Delete"> 
                    <template slot-scope="props">
                        <a v-if="permissions.Edit" class="table-btn" href="javascript:void(0)" @click="openEditDialog(props.row,props.$index)" v-text="operateText.edit"></a>
                        <a v-if="permissions.Delete" class="table-btn" href="javascript:void(0)" @click="deleteItem(props.row,props.$index)" v-text="operateText.delete"></a>
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
        
        <!-- 导入企业职位组件 -->
        <import-position v-model="importVisible" template-url="/Templates/Excel/Import/企业职位导入模板.xlsx" :title="$t('position.importPositionTitle')" confirm-api="/api/plat/positions/import" @callback="loadData">
        </import-position>

        <!-- 导出企业职位组件 -->
        <export-position v-model="exportVisible" :title="$t('position.exportPositionTitle')" confirm-api="/api/plat/positions/import" export-url="/api/plat/positions/export">
        </export-position>    
    </div>
</template>
<script>

    import confirm from "@/components/sapi-confirm.js";
    import search from "@/components/sapi-search.vue";

    import positionImport from "@/components/sapi-import.vue";
	import positionExport from "@/components/sapi-export.vue";

    export default {
        data() {
            return {
                tableData: [],          //列表数据
                deleteIds: [],          //需要被删除的Ids
                currentView: "",        //组件名称
                visible:false,          //
                importVisible: false,   //导入组件是否可见
                exportVisible: false,   //导出组件是否可见
                params: {               //列表参数
                    sortName: "",
                    sortType: ""
                },
                positionId:"",
                option:{
                    positionId:""
                },
                operateText:{
					edit: this.$t("edit"),
					delete:this.$t("delete")
				}
            }
        },

        mixins: [getPagerMixin(),getTabMixin()],
        methods: {
            loadData() {
                var params = this.params;
                this.$loadingOpen();        //延迟加载打开
                this.$get("/api/plat/positions/", params, function (res) {
                    this.tableData = res.Rows;
                    this.pageTotal = res.Total;
                });
            },
            openAddDialog() {
                this.currentView = "position-add";
                this.visible = true;
            },
            openEditDialog(row, index){
                this.currentView = "position-edit";
                this.visible = true;
                this.option.positionId = row.PositionId;
            },
            deletePositions(apiAddress, itemIds, successFunc){
                if (itemIds == null || itemIds.length == 0){
                    Vue.msg(this.$t("selectOneWhenDeleted"));
                    return false;
                }

                this.$deleteTips(function(){
                    this.$delete(apiAddress, JSON.stringify(itemIds),function(res){
                        successFunc(res);
                        Vue.successMsg(this.$t("position.delPositionSuccess"));
                    });
                });
            },
            deleteItem(row, index){
                var _this = this;
                var deleteIds = [];
                deleteIds.push(row.PositionId);
                this.deletePositions(
                    "/api/plat/positions/",
                    deleteIds,
                    function(res){
                        _this.loadData();
                    });
            },
            deleteItems(){
                var _this = this;
                this.deletePositions(
                    "/api/plat/positions/",
                    _this.deleteIds,
                    function(res){
                        _this.loadData();
                    });                
            },
            importDialog(){
                this.importVisible = true;
            },
            exportDialog(){
                this.exportVisible = true;
            },
            sortChange(obj){
                this.params.sortName = obj.prop;
                this.params.sortType = obj.order;
                this.pageCurrentChange(1);
            },
            rowSelect(datas){
                var _this = this;
				_this.deleteIds = [];
				if(datas.length > 0) {
					datas.forEach(function(data) {
						_this.deleteIds.push(data.PositionId);
					});
				}
            }            
        },
        components: {
           "position-add": (resolve) => {
                require(['./add.vue'], resolve);
           },
           "position-edit": (resolve) => {
                require(['./edit.vue'], resolve);
           },
           "import-position": positionImport,
            "export-position": positionExport,     
            "sapi-search": search,
        },
        created() {
            Vue.use(confirm);
            //pager改变时将要执行的函数，对该值进行初始化
            this.pageFunc = this.loadData;
            this.loadData();
            //初始化权限等信息
            this.$init();
        },
        mounted() {

        }
    }

</script>