<template>
    <div class="body-content" v-cloak>
        <div class="main-header">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
			<div class="main-header-search">
			</div>
		</div>

        <div class="body-content-box" :class="{active:hasData}">
            <div class="left-side-drag drag-element-left drag-reset"></div>
            <div class="left-side tree-wrapper">
                <!-- 树状结构 -->
                <type-tree ref="formTypeTree" :node-id="curNodeId" node-key="TypeId" :tree-data="treeData" 
                :tree-prop="formTypeProps" @change-handle="changeHandleType" @on-click="showFormType"></type-tree>
            </div>
            <div class="right-side">
                <!-- 修改、查看组件 -->
                <component v-bind:is="currentView" :option="formTypeDetail" @viewBack="getViewBack"></component>
            </div>
        </div>

        <!--无数据页面-->
		<div class="no-data-module">
			<component v-bind:is="firstView"></component>
		</div>

        <!--添加同级、子级-->
		<component v-bind:is="addView" v-model="addVisible" :option="addOption" :isAddChild="isAddChild" :title="addTitle"></component>
    </div>
</template>

<script>
    import typeTree from "@/components/sapi-tree-left-side.vue";
    import tips from "@/components/sapi-tips.js";
    import confirm from "@/components/sapi-confirm.js";
    import drag from "@/components/sapi-move-module.js";

    export default {
		data() {
			return {
                firstView:"",
                addView:"",
                addVisible:false,
                addOption:{},
                addTitle:"",
                isAddChild:false,
                treeData:{},
                formTypeProps:{
                    children: 'Children',
					label: 'TypeName',
					parentId: "ParentTypeId",
					nodeKey: "TypeId",
					hasChild: "HasChild"
                },
                parentTypeId:null,
                hasData:false,
                //物业形态详细信息,用于查看页
                formTypeDetail:{
                    TypeName:"",
                    BaseFormType:"",
                    RowIndex:"",
                    Remark:""
                },
                curNodeId:null,
                nodeId: null,
                currentView:"",
            }
        },
        mixins: [getTabMixin()],
        components: {
			"type-add": (resolve) => {
				require(['./add.vue'], resolve);
			},
			"type-edit": (resolve) => {
				require(['./edit.vue'], resolve);
			},
			"type-view": (resolve) => {
				require(['./view.vue'], resolve);
            },
            "type-first": (resolve) => {
				require(['./first-type.vue'], resolve);
			},
			"type-tree": typeTree
        },
        methods:{
            //获取左侧树状列表
            getFormTree(){
                
                this.$get("/api/plat/formTypes/brief", {}, function(res) {
                    this.treeData = res;
                    //但没有数据时，显示新增页面
                    if(!this.treeData || this.treeData.length ===0)
                    {
                        this.firstView = "type-first";
                        this.hasData = false;
                        return;
                    }

                    this.firstView = "";
                    this.hasData = true;
                    this.curNodeId = this.formTypeDetail.TypeId||this.parentTypeId;
                    if(this.curNodeId)
                    {
                        this.nodeId = this.curNodeId;
                    }
                    else
                    {
                        this.curNodeId = this.nodeId = this.treeData[0].TypeId;
                    }
                    this.getFormTypeDetail();
					this.currentView = "type-view";
                });
            },
            //查看明细
            getFormTypeDetail(){
                this.$get("/api/plat/formTypes/" + this.nodeId, {}, function(res) {
                    this.formTypeDetail = res;
                });
            },
            //点击树状节点查看明细
            showFormType(data,node)
            {
				this.nodeId = data.TypeId;
				this.getFormTypeDetail();
				this.currentView = "type-view";
            },
            //修改页取消修改回调
            getViewBack(){
                this.currentView = "type-view";
            },
            //删除物业形态
            deleteFormType(){
                this.$deleteTips(function() {
					this.$delete("/api/plat/formTypes/" + this.nodeId, function(res) {
                        //删除后，将父级节点赋值给noedId
                        this.parentTypeId = this.formTypeDetail.ParentTypeId;
                        this.formTypeDetail = {};
						this.getFormTree();
						Vue.successMsg(this.$t('formType.delTypeSuccess'));
                    });
                });
            },
            //左侧树状结构可操作按钮
            changeHandleType(i)
            {
                //修改
				if(i == 0) {
					this.getFormTypeDetail();
					this.currentView = "type-edit";
				}
				//删除
				else if(i === 3) {
					this.deleteFormType();
				} else { //新增下级、同级
                    this.addOption = {};
					if(i == 1) {
                        //第一级物业形态需要选择基础类型，子级由父级带出
                        this.isAddChild = false;
                        if(this.formTypeDetail.ParentTypeId)
                        {
                            this.isAddChild = true;
                            this.addOption.ParentTypeId = this.formTypeDetail.ParentTypeId;
                            this.addOption.BaseFormType = this.formTypeDetail.BaseFormTypeValue;
                        }
						this.addTitle = this.$t('addSiblingTitle');
					} else {
                        this.addOption.ParentTypeId = this.nodeId;
                        this.addOption.BaseFormType = this.formTypeDetail.BaseFormTypeValue;
                        this.isAddChild = true;
						this.addTitle = this.$t('addChildTitle');
					}

					this.addView = "type-add";
					this.addVisible = true;
				}
            }
        },
        created() {
            Vue.use(tips);
            Vue.use(confirm);
            this.$init();
			this.getFormTree();
        },
        mounted() {
			this.$nextTick(function() {
				drag.move(this, ".left-side", ".right-side", ".left-side-drag", {
					type: 2,
					offsetHeight: 102
				});
			});
		}
    }
</script>

<style>
    .body-content-box {
		display: none;
	}
	
	.body-content-box.active {
		display: block;
	}
</style>