<template>
	<el-checkbox-group class="role-checkbox-group" v-model="checkList" @change="change">
		<el-checkbox :disabled="!canSet" :key="item.ResourceId" :label="item.ResourceId" v-for="item in checkResources">{{item.ResourceName}}</el-checkbox>
	</el-checkbox-group>
</template>

<script>
	export default {
		data() {
			return {
				resourceIds: [],
				checkList: [],
				checkResources: []
			}
		},
		props: ["data", "activeMenu", "canSet"],
		methods: {
			change(ids) {
				var resourceIds = this.resourceIds,
					flag = false,
					datas = this.checkResources,
					id, isAllFalse;
				//不选中
				if(resourceIds.length > ids.length) {
					for(var k=0,kk=resourceIds.length;k<kk;k++){
						if(ids.indexOf(resourceIds[k])===-1){
							id=resourceIds[k];
							break;
						}
					}
				} else {//选中
					flag = true;
					id = ids[ids.length - 1];
				}

				for(var i = 0, ii = datas.length; i < ii; i++) {
					var data = datas[i];

					if(data.ResourceCode === "View") {
						//点击view多选框时
						if(data.ResourceId === id) {
							//没选中
							if(flag === false) {
								for(var j = 0, jj = datas.length; j < jj; j++) {
									datas[j].Authorized = false;
								}
								ids = [];
								isAllFalse = true;
							}

						} else if(flag === true && data.Authorized === false) { //点击其他的选项时，view的选项为没选中，需要选中
							ids.push(data.ResourceId);
						}

						break;
					}
				}

				//除去view不选中情况下
				if(isAllFalse !== true) {
					for(var i = 0, ii = datas.length; i < ii; i++) {
						var data = datas[i];

						if(ids.indexOf(data.ResourceId) > -1) {
							data.Authorized = true;
						} else {
							data.Authorized = false;
						}
					}
				}

				if(this.checkResources.length === ids.length) {
					this.$emit("on-checked", this.data.MenuId, true);
				} else {
					this.$emit("on-checked", this.data.MenuId, false);
				}
				
				this.checkList=[].concat(ids);

				this.resourceIds = [].concat(ids);
			},
			checkedAll(flag) {
				this.checkList = [];
				var datas = this.checkResources;
				if(flag === true) {
					for(var i = 0, ii = datas.length; i < ii; i++) {
						datas[i].Authorized = flag;
						this.checkList.push(datas[i].ResourceId);
					}
				} else {
					for(var i = 0, ii = datas.length; i < ii; i++) {
						datas[i].Authorized = flag;
					}
				}
				
				this.resourceIds=[].concat(this.checkList);
			}
		},
		mounted() {
			if(!this.data.Resources || this.data.Resources.length === 0) {
				return;
			}

			this.checkList = [];
			var datas = this.checkResources = this.data.Resources;
			for(var i = 0, ii = datas.length; i < ii; i++) {
				if(datas[i].Authorized === true) {
					this.checkList.push(datas[i].ResourceId);
				}
			}

			if(datas.length === this.checkList.length) {
				this.$emit("on-checked", this.data.MenuId, true);
			}
			
			this.resourceIds=[].concat(this.checkList);
		},
		watch: {
			activeMenu(val) {
				if(this.data.MenuId === val.MenuId) {
					this.checkedAll(val.Flag);
				}
			}
		}
	}
</script>

<style>
	.role-checkbox-group {
		display: inline-block;
	}
</style>