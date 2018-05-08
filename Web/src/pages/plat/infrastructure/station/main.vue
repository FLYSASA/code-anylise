<template>
	<div class="body-content" v-cloak>
		<div class="main-header" v-if="treeData.length===0">
			<div class="main-header-map"><span class="main-header-map-text"></span></div>
		</div>
		<div class="body-content-box" :class="{active:true}">
			<div class="left-side-drag drag-element-left drag-reset"></div>
			<div class="left-side tree-wrapper left-side-border">
				<!--树形结构-->
				<sapi-tree ref="treeNav" :url="url" :render-content="renderContent" :params="params" :props="struProps" :data="treeData" @on-click="treeNodeClick">
				</sapi-tree>
			</div>
			<div class="right-side">
				<component v-bind:is="currentView" :option="stationOption"></component>
			</div>
		</div>
	</div>
</template>
<script>
	/*import "@/static/css/fonts/iconfont.css";*/
	import tree from "@/components/sapi-tree.vue";
	import tips from "@/components/sapi-tips.js";
	import drag from "@/components/sapi-move-module.js";

	export default {
		data() {
			return {
				currentView: "",
				stationOption: {},
				treeId: null,
				treeData: [],
				struProps: {
					children: 'Children',
					label: 'StruName',
					parentId: "ParentStruId",
					value: "StruId",
					hasChild: "HasChild"
				},
				url: "/api/plat/structures/brief",
				params: {
					"withDept": true,
					nodeIdKey: "parentStruId"
				}
			}
		},
		methods: {
			loadData() {
				this.$get(this.url, {
					"withDept": true
				}, function(res) {
					this.treeData = res;
					if(!this.treeData||this.treeData.length===0){
						return;
					}
					setTimeout(() => {
						this.$el.querySelector('.left-side .tree-ul>.tree-node .tree-node-label').click();
					}, 50)
				});
			},
			treeNodeClick(data) {
				this.currentView = "station-list";
				this.stationOption = data;
			},
			setMapOffsetPosition(width, boxWidth) {
				var dom = this.$el.querySelector(".right-side .main-header-offset-position");
				if(!dom) {
					return;
				}

				dom.style.left = "-" + width + "px";
				dom.style.width = "calc(100% + " + width + "px)";
			},
			renderContent(data) {
				var className = "";
				if(data.StruType === 0) {
					className = "icon-company";
				} else {
					className = "icon-department";
				}

				return "<i class='" + className + " pr-6'></i>" + data.StruName;
			},
		},
		components: {
			"station-list": (resolve) => {
				require(['./list.vue'], resolve);
			},
			"sapi-tree": tree
		},
		created() {
			Vue.use(tips);
			this.$init();
			this.loadData();
		},
		mounted() {
			this.$nextTick(function() {
				var _this = this;
				drag.move(this, ".left-side", ".right-side", ".left-side-drag", {
					type: 2,
					offsetHeight: 102,
					callback(leftWidth, boxWidth) {
						_this.setMapOffsetPosition(leftWidth, boxWidth);
					}
				});
			});
		},
		watch: {}
	}
</script>
<style>
.pr-6{
	padding-right: 6px;
}
</style>