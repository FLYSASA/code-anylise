<template>
	<sapi-dialog class="msg-type-add" v-model="visible" width="700px" top="13%" @on-open="open" @on-close="close">
		<span slot="title" v-text="title"></span>
		<div class="form-error-tips"></div>
		<div class="form-content">
			<div class="fullline">
				<span class="w-80">父级类别</span>
				<div class="right-auto-box">
					<el-input v-model="createModel.ParentTypeName" disabled></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-80 must-star">类别名称</span>
				<div class="right-auto-box">
					<el-input id="MsgTypeName" v-model.trim="createModel.MsgTypeName" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-80">类别描述</span>
				<div class="right-auto-box">
					<el-input v-model="createModel.Remark" type="textarea" :autosize="{minRows: 2, maxRows: 2}" :maxlength="200"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-80">行号</span>
				<div class="right-auto-box">
					<el-input v-model="createModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
				</div>
			</div>
			<!--处理路径-->
			<div class="set-handleUrl-box">
				<span class="w-80 line-height">处理路径</span>
				<div class="right-auto-box width-p100">
					<div class="mb-10">
						<el-button size="small" :plain="true" @click="openAddDialog">添加处理路径</el-button>
					</div>
					<el-table class="common-table" v-show="createModel.HandleUrls" :data="createModel.HandleUrls">
						<el-table-column v-for="item in handleUrlHeaderData" :key="item.id" :prop="item.prop" :label="item.label" show-overflow-tooltip :width="item.width" :min-width="item.minWidth" :sortable="item.sortable">
						</el-table-column>
						<el-table-column label="操作" width="100">
							<template slot-scope="props">
                                <a class="table-btn" href="javascript:void(0)" @click.stop="editHandleUrl(props.row,props.$index)">修改</a>
                                <a v-if="!(props.row.DealTypeId == 'Read' || props.row.DealTypeId == 'Browse')" class="table-btn" href="javascript:void(0)" @click.stop="deleteHandleUrl(props.row,props.$index)">删除</a>
                            </template>
						</el-table-column>
					</el-table>
				</div>
			</div>

		</div>

		<div class="footer">
			<el-button size="small" class="default-button" @click="close">取消</el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit">提交</el-button>			
		</div>

		<!--添加、修改处理路径-->
		<component slot="moreDialog" v-bind:is="currentView" :index="rowIndex" :title="currentTitle" v-model="currentVisible" :option="currentModel" @callback="backModel"></component>

	</sapi-dialog>
</template>

<script>
	import tips from "@/components/sapi-tips.js";
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				handleUrlHeaderData: [{
					prop: "DealTypeId",
					label: "类型编码",
					sortable: false,
					width: 100
				}, {
					prop: "DealTypeName",
					label: "类型名称",
					sortable: false,
					width: 100
				}, {
					prop: "DealUrl",
					label: "处理路径",
					sortable: false,
					minWidth: 100
				}, {
					prop: "RowIndex",
					label: "行号",
					sortable: true,
					width: 90
				}],
				createModel: {
					MsgTypeId: "",
	                MsgTypeName: "",
	                ParentTypeId: "",
	                ParentTypeName: "",
	                RowIndex: "10",
	                Remark: "",
	                HandleUrls: [],         //处理路径数组                
				},
				disabled: false,
				visible: false,
				handleUrlModel: { //处理路径
					DealTypeId: "",
					DealTypeName: "",
					DealUrl: "",
					RowIndex: "10"
				},
				currentModel: {},
				currentView: null,
				currentVisible: false,
				rowIndex: 0,
				currentTitle: null,
				notificationTypeHandleUrls:[            //通知类别默认的处理路径
					{
						DealTypeId: "Read",
						DealTypeName: "阅读",
						DealUrl: "https://www.baidu.com",
						RowIndex: "10"
					}, {
						DealTypeId: "Browse",
						DealTypeName: "查看",
						DealUrl: "https://hao.360.cn",
						RowIndex: "20"
					}
            	],
				dealTypeHandleUrls: [ //事项类别默认的处理路径
					{
						DealTypeId: "Browse",
						DealTypeName: "阅读",
						DealUrl: "https://www.baidu.com",
						RowIndex: "10"
					}
				]
			}
		},
		props: ["option", "value", "title", "mode"],
		methods: {
			close() {
				this.$closeWaringTips(".form-error-tips");
				this.$emit('input', false);
			},
			open() {
				this.getData();
			},
			validate() {
				this.$closeWaringTips(".form-error-tips");
				if(!this.createModel.MsgTypeName) {
					this.$errorTips("请填写类别名称", "#MsgTypeName");
					return false;
				} 
				return true;
			},
			editHandleUrl(row,index){
				this.currentTitle = "修改路径";
				this.currentModel = this.createModel;
				this.currentView = "path-edit";
				this.currentVisible = true;
				this.rowIndex = index;
			},
			submit() {
				if(this.validate()) {
					this.disabled = true;
					this.$loadingOpen();
					this.$post("/api/plat/msgTypes/" + this.mode,
						this.createModel,
						function(res) {
							this.$parent.getTree();
							this.createModel.StruName = "";
							this.createModel.StruFullName = "";
							this.createModel.StruNo = "";
							this.close();
							this.$loadingClose();
							Vue.successMsg(res.Message);
						},
						function() {
							this.$loadingClose();
						});
				}
			},
			openAddDialog() {
				this.currentTitle = "添加路径";
				this.currentModel=this.createModel;
				this.currentView = "path-add";
				this.currentVisible = true;
			},
			backModel(data, isEditUrl) {
				if(isEditUrl === true) {
					this.$set(this.createModel.HandleUrls, this.rowIndex, data);
				} else {
					this.createModel.HandleUrls.push(data);
				}
			},
			deleteHandleUrl(row,i){
				this.createModel.HandleUrls.splice(i, 1);
			},
			getData() {
				this.$get("/api/plat/msgTypes/" + this.mode + "/createViewModel", {
					"parentTypeId": this.option.ParentTypeId
				}, function(res) {
					this.createModel=res;
					//当父级节点名称为空时，表示其父级节点为根节点
					if(this.createModel.ParentTypeName == null || this.createModel.ParentTypeName == "") {
						this.createModel.ParentTypeName = "根节点";
					}
					//通知类别
					if (this.mode == 0){
						this.createModel.HandleUrls = this.notificationTypeHandleUrls;
					} else {
						//事项类别
						this.createModel.HandleUrls = this.dealTypeHandleUrls;
					}					
				});
			}
		},
		components: {
			"sapi-dialog": dialog,
			"path-add": (resolve) => {
				require(['./path-add.vue'], resolve);
			},
			"path-edit": (resolve) => {
				require(['./path-edit.vue'], resolve);
			},
		},
		created() {
			Vue.use(tips);
		},
		mounted() {
			this.visible = this.value;

		},
		watch: {
			value(val) {
				this.visible = val;
			}
		}
	}
</script>

<style>
.msg-type-add .right-auto-box{
	display: inline-block;
	width: calc(100% - 90px);
	vertical-align: top;
}
.msg-type-add .line-height{
	line-height: 24px;
}
</style>