<template>
    <div class="main">
        <div class="main-header">
            <div class="main-header-map"><span class="main-header-map-text"></span></div>
            <div class="main-header-search">
                <div class="func-btns">
                    <sapi-search v-model="params.keyword" :placeholder="$t('projectType.search')" @on-search="loadData"></sapi-search>
                    <span v-if="permissions.Add" class="icon-btn" @click="openAddDialog" :title="$t('add')"><i class="icon-build"></i></span>
                    <span v-if="permissions.Delete" class="icon-btn" @click="deleteItems" :title="$t('delete')"><i class="icon-deleter"></i></span> 
                </div>
            </div>
        </div>

        <div class="main-table table-no-border width-p100">
            <el-table border :data="tableData" ref="badyTable" @selection-change="rowSelect" :height="maxBodyHeight">
                <el-table-column v-if="permissions.Delete" type="selection" width="45"></el-table-column>
                <el-table-column prop="TypeName" :label="$t('projectType.typeName')" width="240" show-overflow-tooltip></el-table-column>
                <el-table-column prop="Remark" :label="$t('projectType.remark')" show-overflow-tooltip></el-table-column>
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
                visible: false,          //                
                TypeId: "",
                option: {
                    TypeId: ""
                },
                operateText: {
					edit: this.$t("edit"),
					delete: this.$t("delete")
				},
            }
        },
        mixins: [getPagerMixin(), getTabMixin()],
        methods: {
            loadData() {
                var params = this.params;
                this.$loadingOpen();        //延迟加载打开
                this.$get("/api/plat/projectTypes", params, function(res) {
                    this.tableData = res.Rows;
                    this.pageTotal = res.Total;
                });
            },
            openAddDialog() {
                this.currentView = "projectType-add";
                this.visible = true;
            },
            openEditDialog(row, index) {
                this.currentView = "projectType-edit";
                this.visible = true;
                this.option.TypeId = row.TypeId;
            },
            deleteProjectTypes(apiAddress, itemids, successFunc) {
                if(itemids == null || itemids.length == 0) {
                    Vue.msg(this.$t("selectOneWhenDeleted"));
                    return false;
                }

                this.$deleteTips(function() {
                    this.$delete(apiAddress, JSON.stringify(itemids), function(res) {
                        successFunc(res);
                        Vue.successMsg(this.$t("projectType.delTypeSuccess"));
                    });
                });
            },
            deleteItem(row, index) {
                var _this = this;
                var deleteIds = [];
                deleteIds.push(row.TypeId);
                this.deleteProjectTypes(
                    "/api/plat/projectTypes/",
                    deleteIds,
                    function(res) {
                        _this.loadData();
                    });
            },
            deleteItems() {
                var _this = this;
                this.deleteProjectTypes(
                    "/api/plat/projectTypes/",
                    _this.deleteIds,
                    function(res) {
                        _this.loadData();
                    });                
            },
            rowSelect(datas) {
                var _this = this;
                _this.deleteIds = [];
                if(datas.length > 0) {
                    datas.forEach(function(data) {
                        _this.deleteIds.push(data.TypeId);
                    });
                }
            }
        },
        components: {
            "projectType-add": (resolve) => {
                require(['./add.vue'], resolve);
            },
            "projectType-edit": (resolve) => {
                require(['./edit.vue'], resolve);
            },
            "sapi-search": search
        },
        created() {
            Vue.use(confirm);
            //pager改变时将要执行的函数,对该值进行初始化
            this.pageFunc = this.loadData;
            this.loadData();
            //初始化权限信息
            this.$init();
        },
        mounted() {

        }
    }
</script>