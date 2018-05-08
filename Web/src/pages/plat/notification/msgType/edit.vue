<template>
	<div class="edit-model clearfix">
		<div class="edit-model-content">
			<div class="fullline">
				<span class="w-80">父级类别</span>
				<div class="right-auto-box drop-down-wrapper">
				
					<dropdown-tree :expandOnClickNode="false" empty="根节点" :is-tree="true" v-model="editModel.ParentTypeId" :data="forChooseMsgTypes" :props="msgTypeProps" @change="selectParentMsgType" :except-id="option.MsgTypeId"></dropdown-tree>
				</div>
			</div>
			<div class="fullline">
				<span class="w-80 must-star">类别名称</span>
				<div class="right-auto-box">
					<el-input id="MsgTypeName" v-model.trim="editModel.MsgTypeName" :maxlength="100"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-80">类别描述</span>
				<div class="right-auto-box">
					<el-input v-model="editModel.Remark" type="textarea" :autosize="{minRows: 2, maxRows: 2}" :maxlength="200"></el-input>
				</div>
			</div>
			<div class="fullline">
				<span class="w-80">行号</span>
				<div class="right-auto-box">
					<el-input v-model="editModel.RowIndex" :min="0" :max="999999999" :controls="false" v-format.d="{default:0}"></el-input>
				</div>
			</div>
			<!--处理路径-->
			<div class="set-handleUrl-box">
				<span class="w-80">处理路径</span>
				<div class="right-auto-box width-p100">
					<div class="mb-10">
						<el-button size="small" :plain="true"  @click="openAddDialog">添加处理路径</el-button>
					</div>
					<el-table class="common-table" v-show="editModel.HandleUrls" :data="editModel.HandleUrls">
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

		<!--添加、修改处理路径-->
		<component slot="moreDialog" v-bind:is="currentView" :title="title" v-model="visible" :index="rowIndex" :option="currentModel" @callback="backModel"></component>

		<div class="text-center btn-footer">
			<el-button class="default-button padding-button" type="primary" size="small" @click="cancel">取消</el-button>
			<el-button class="padding-button blue-button" :disabled="disabled" type="primary" size="small" @click="submit">提交</el-button>
		</div>
	</div>

</template>

<script>
	import dropdownTree from "@/components/sapi-select.vue";
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
				editModel: {

				},
				handleUrlModel: { //处理路径
					DealTypeId: "",
					DealTypeName: "",
					DealUrl: "",
					RowIndex: "10"
				},
				isStruTypeDisabled: true,
				companys: [],
				rootTypeName: '根节点',
				forChooseMsgTypes: [], //供选择的消息类别
				msgTypeProps: {
					children: 'Children',
					label: 'MsgTypeName',
					nodeKey: "MsgTypeId"
				},
				currentModel: {},
				currentView: null,
				visible: false,
				rowIndex: 0,
				title: null,
				disabled: false,
				isLoading:false
			}
		},
		props: ["option", "mode"],
		components: {
			"dropdown-tree": dropdownTree,
			"path-add": (resolve) => {
				require(['./path-add.vue'], resolve);
			},
			"path-edit": (resolve) => {
				require(['./path-edit.vue'], resolve);
			}
		},
		methods: {
			cancel() {
				this.$emit('viewBack');
			},
			submit() {

				if(this.validate()) {
					this.disabled = true;
					this.$loadingOpen();
					if (this.editModel.ParentTypeId==="") {
						this.editModel.ParentTypeId=null;
					}
					this.$put("/api/plat/msgTypes/" + this.mode,
						this.editModel,
						function(res) {
							this.$parent.getTree();
							this.$loadingClose();
							Vue.successMsg(res.Message);
						},
						function(res) {
							this.$loadingClose();
							Vue.errorMsg(res.Message);
						});
				}
			},
			selectParentMsgType(data) {
				if(data.MsgTypeId != this.option.MsgTypeId) {
					this.editModel['ParentTypeName'] = data.MsgTypeName;
				}
			},
			validate() {
				if(!this.editModel.MsgTypeName) {
					this.$errorTips("请填写类别名称", "#MsgTypeName");
					return false;
				}
				return true;
			},
			getData() {
				if(this.isLoading===true){
					return;
				}
				this.isLoading=true;
				this.$get('/api/plat/msgTypes/' + this.mode + '/editViewModel', {
					"msgTypeId": this.option.MsgTypeId
				}, function(res) {
					this.editModel = res;
					this.editModel.ParentTypeName = this.option.ParentTypeName;
					if(this.editModel.ParentTypeName == null || this.editModel.ParentTypeName == "") {
						this.editModel.ParentTypeName = this.rootTypeName;
					}
					
					this.editModel.ParentTypeId=this.editModel.ParentTypeId||"";
					
					//绑定父级类别下拉框数据
					this.forChooseMsgTypes = res.MsgTypes;
					var msgType = {
						MsgTypeId: "",
						MsgTypeName: this.rootTypeName
					};
					this.forChooseMsgTypes.splice(0, 0, msgType);
					this.isLoading=false;
				},function(){
					this.isLoading=false;
				});
			},
			editHandleUrl(row, index) {
				this.title = "修改路径";
				this.currentModel = this.editModel;
				this.currentView = "path-edit";
				this.visible = true;
				this.rowIndex = index;
			},
			openAddDialog() {
				this.title = "添加路径";
				this.currentModel=this.editModel;
				this.currentView = "path-add";
				this.visible = true;
			},
			backModel(data, isEditUrl) {				
				if(isEditUrl === true) {
					this.$set(this.editModel.HandleUrls, this.rowIndex, data);
				} else {
					this.editModel.HandleUrls.push(data);
				}
			},
			deleteHandleUrl(row, i) {
				this.editModel.HandleUrls.splice(i, 1);
			}
		},
		watch: {
			option(val) {
				this.changeFlag = false;
				if(val && typeof val === "object") {
					this.editModel = JSON.parse(JSON.stringify(val));
				} else {
					this.editModel = {};
				}
				
				this.getData();
				
			}
		},
		mounted() {
			if(this.option && typeof this.option === "object") {
				this.editModel = JSON.parse(JSON.stringify(this.option));
				this.getData();
			}
		}
	}
</script>

<style>
	.edit-model {
		height: 100%;
		position: relative;
	}
	
	.edit-model .edit-model-content {
		height: calc(100% - 58px);
		overflow: auto;
		padding: 30px 15px 15px 15px;
	}
	
	.edit-model .right-auto-box {
		display: inline-block;
		width: calc(100% - 90px);
		vertical-align: top;
	}
	
	.edit-model .btn-footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 58px;
		text-align: center;
		padding-top: 15px;
		box-shadow: 5px 1px 5px 5px #eee;
	}
</style>