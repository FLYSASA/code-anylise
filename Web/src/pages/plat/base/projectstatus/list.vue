<template>
	<div class="main">

      <div class="main-header">
            <div class="main-header-map"><span class="main-header-map-text"></span></div>
        </div>

		<div class="main-table table-no-border width-p100">
			<el-table border :data="tableData" ref="bodyTable" :height="maxBodyHeight">				
				<el-table-column prop="StatusName" label="状态名称" width="150" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="Remark" label="备注" min-width="180" show-overflow-tooltip>
				</el-table-column>				
				<el-table-column prop="RowIndex" label="行号" width="100" show-overflow-tooltip>
				</el-table-column>				
				<el-table-column label="操作" fixed="right" width="100">
					<template slot-scope="props">
                        <a class="table-btn" href="javascript:void(0)" @click.stop="openEditDialog(props.row,props.$index)">修改</a>
                    </template>
				</el-table-column>
			</el-table>
		</div>

     <!-- 新增、修改组件 -->
     <component v-bind:is="currentView" v-model="visible" :option="option"></component>

	</div>
</template>

<script>
    import confirm from "@/components/sapi-confirm.js";
    
	export default {
		data() {
			return {
				tableData: [],
				option: {"statusId":""},
				currentView: "",
                visible: false,
			}
		},
		components: {
            "projectStatus-edit": (resolve) => {
                require(['./edit.vue'], resolve);
           }
		},
		methods: {
			loadData() {
				this.$get("/api/plat/projectStatuses", {}, function(res) {
					this.tableData = res;
				});
            },
			openEditDialog(row, index) {
				 this.currentView = "projectStatus-edit";
                 this.option.statusId=row.StatusId;
				 this.visible = true;
			},
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
