<template>
    <div class="main">
        <div class="main-header">
            <div class="main-header-map"><span class="main-header-map-text"></span></div>
            <div class="main-header-search">
                <div class="func-btns">
                    <sapi-search v-model="params.keyword" :placeholder="$t('professionalType.search')" @on-search="loadData"></sapi-search>
                    <span v-if="permissions.Add" class="icon-btn" @click="openAddDialog" :title="$t('add')"><i class="icon-build"></i></span>
                    <span v-if="permissions.Delete" class="icon-btn" @click="deleteItems" :title="$t('delete')"><i class="icon-deleter"></i></span> 
                </div>
            </div>
        </div>
        <div class="main-table table-no-border width-p100">
            <el-table border :data="tableData" ref="badyTable" @selection-change="rowSelect" :height="maxBodyHeight">
                <el-table-column v-if="permissions.Delete" type="selection" width="45"></el-table-column>
                <el-table-column prop="TypeName" :label="$t('professionalType.typeName')" width="240" show-overflow-tooltip></el-table-column>
                <el-table-column prop="Remark" :label="$t('professionalType.remark')" show-overflow-tooltip></el-table-column>
                <el-table-column prop="RowIndex" :label="$t('rowIndex')" width="100"></el-table-column>
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

    </div>
</template>
<script>

    import confirm from "@/components/sapi-confirm.js";
    import search from "@/components/sapi-search.vue";

    export default { 
        data() {
            return {
                tableData: [],          //列表数据
                deleteIds: [],          //需要被删除的Ids
                currentView: "",        //组件名称
                visible:false,          //                
                TypeId: "",
                option:{
                    TypeId: ""
                },
                operateText:{
                	edit: this.$t('edit'),
                	delete: this.$t('delete')
                }
            }
        },
        mixins: [getPagerMixin(), getTabMixin()],
        methods:{
            loadData(){
                var params = this.params;
                this.$loadingOpen();        //延迟加载打开
                this.$get("/api/plat/professionalTypes", params, function(res) {
                    this.tableData = res.Rows;
                    this.pageTotal = res.Total;
                });
            },
             openAddDialog() {
                this.currentView = "professionalType-add";
                this.visible = true;
            },
            deleteItems(){
                var _this = this;
                this.delete(
                    "/api/plat/professionalTypes/",
                    _this.deleteIds,
                    function(res){
                        _this.loadData();
                    }); 
            },
            openEditDialog(row, index) {
                this.currentView = "professionalType-edit";
                this.visible = true;
                this.option.TypeId = row.TypeId;
            },
            deleteItem(row,index){
                var _this = this;
                var deleteIds = [];
                deleteIds.push(row.TypeId);
                this.delete(
                    "/api/plat/professionalTypes/",
                    deleteIds,
                    function(res){
                        _this.loadData();
                    });
            },
            rowSelect(datas){
                var _this = this;
                _this.deleteIds = [];
                if(datas.length > 0) {
                    datas.forEach(function(data) {
                        _this.deleteIds.push(data.TypeId);
                    });
                }
            },
            delete(apiAddress, itemids, successFunc){
                if(itemids == null || itemids.length == 0){
                    Vue.msg(this.$t('selectOneWhenDeleted'));
                    return false;
                }

                this.$deleteTips(function(){
                    this.$delete(apiAddress, JSON.stringify(itemids),function(res){
                        successFunc(res);
                        Vue.successMsg(this.$t('professionalType.delTypeSuccess'));
                    });
                });
            },

        },
        components:{
            "sapi-search": search,
            "professionalType-add": (resolve) => {
                require(['./add.vue'], resolve);
            },
            "professionalType-edit": (resolve) => {
                require(['./edit.vue'], resolve);
            }
        },
        created(){
            Vue.use(confirm);
            //pager改变时将要执行的函数,对该值进行初始化
            this.pageFunc = this.loadData;
            this.loadData();
            //初始化权限信息
            this.$init();
        }
    }
</script>