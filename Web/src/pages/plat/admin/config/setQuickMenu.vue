<template>
	<sapi-dialog v-model="visible" top="5%" @on-close="close">
		<span slot="title">快捷菜单选择</span>
		<div class="form-content">
			<el-tree ref="tree" :default-expand-all="true" :check-strictly="true" :data="datas" show-checkbox node-key="MenuId" :default-checked-keys="keys" :props="defaultProps">
		</el-tree>
		</div>
		<div class="footer">
			<el-button size="small" class="default-button" @click="close">取消</el-button>
			<el-button class="blue-button" size="small" :disabled="disabled" @click="submit">提交</el-button>
		</div>
		
	</sapi-dialog>
</template>

<script>
	import dialog from "@/components/sapi-dialog.vue";
	export default {
		data() {
			return {
				visible:true,
				datas: [],
				disabled:false,
				keys:[],
				defaultProps: {
					"label": "MenuName",
					"children": "Children"
				}
			}
		},
		props: ["option"],
		components: {
			"sapi-dialog": dialog,
		},
		methods: {
			close(){
				this.$emit("call-back");
			},
			submit(){
				var keys=this.$refs.tree.getCheckedNodes();
				if(keys.length>5){
					Vue.msg("菜单选择不能超过五个");
					return;
				}
				
				if(keys.length===0){
					Vue.msg("最少选择一个菜单");
					return;
				}
				
				this.$emit("call-back",keys);
			}
		},
		mounted() {
			var items=this.option||[]
			var keys=this.keys=[];
			items.forEach((item)=>{
				keys.push(item.MenuId);
			});
			this.datas = this.$root.$refs.header.menuList || [];
		}
	}
</script>

<style>

</style>