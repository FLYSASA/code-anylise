<template>
	<div class="header-msg-list-box" v-show="isMsgListShow" :class="{'child-hide':currentVisible}" @click.stop="cancelDisplay">
		<ul class="header-msg-list" @click.stop="" v-if="totalCount>0">
			<li class="header-msg-list-title">{{$t('messageReminding',{totalCount:totalCount})}}</li>
			<li v-for="item in msgList" class="header-msg-list-item clearfix" @click.stop="itemClick(item)">
				<span class="item-icon">
						<i :class="{'read-message':item.Type===0,'process-message':item.Type===1}"></i>
					</span>
				<span class="item-detail">{{item.ContentName}}</span>
				<span class="item-time">{{$dateFormat('hh:mm',item.CreateDate)}}</span>
			</li>
			<li class="header-msg-list-end" @click="readAll">{{$t('readAll')}}</li>
		</ul>
		<ul class="header-no-msg-list" v-else>
			<li>{{$t('noNews')}}</li>
		</ul>
		<div @click.stop="">
			<component :is="currentView" v-model="currentVisible" :option="option" @call-back="callBack"></component>
		</div>
	</div>
</template>

<script>
	import '@/pages/plat/static/css/index.css';
	import resolves from "@/static/js/notification-resolve.js";
	import components from "@/extend/notification.js";
	import importLocale from "@/static/js/importLocale.js";
	import {main,home} from "../js/locale-home.js";
	
	export default {
		data() {
			return {
				isMsgListShow: false,
				currentView: "",
				currentVisible: false,
				option: {},
				currentMenu: {
					MenuId: null,
					MainId: null,
					MenuName: this.$t('myNew'),
					MenuPath: "/plat/notification.html#/center"
				}
			}
		},
		components: {
			...components
		},
		props: ["value", "msgList", "totalCount"],
		methods: {
			/*dateFormat() {

			},*/
			getMenu() {
				var currentMenu = this.currentMenu;
				if(currentMenu.MenuId) {
					this.toReadAll();
					return;
				}

				var menu=this.$parent.getCurrentMenu("",currentMenu.MenuPath);
				if(menu.MenuId) {
					currentMenu.MenuId=menu.MenuId;
					currentMenu.MainId=menu.MainId;
					this.toReadAll();
				}
			},
			toReadAll() {
				var currentMenu = this.currentMenu;
				if(!currentMenu.MenuId) {
					return;
				}

				var query = "";
				if(currentMenu.MainId) {
					query = "?mainId=" + currentMenu.MainId + "&menuId=" + currentMenu.MenuId;
				} else {
					query = "?mainId=" + currentMenu.MenuId;
				}

				location.href = currentMenu.MenuPath + query;
			},
			itemClick(item) {
				this.currentVisible = true;
				var currentObj = resolves.resolveUrl(item.Url);
				var componentName = currentObj.component;
				var componentFunc = components[componentName];
				if(!componentFunc || !componentFunc()) {
					Vue.msg(this.$t('registerWhenComponentNoExists'));
					return;
				}

				this.option = currentObj.option;
				this.currentView = componentName;
			},
			readAll() {
				this.getMenu();
				this.cancelDisplay();
				//this.$emit("call-back", 1);
			},
			cancelDisplay() {
				this.currentView = "";
				this.currentVisible = false;
				this.$emit("input", false);
			},
			callBack() {
				this.cancelDisplay();
			}
		},
		mounted() {

		},
		created() {
			!Vue.toLocale&&Vue.use(importLocale);
			let obj=Object.assign({},main,home);
			Vue.toLocale(obj);
			
			this.isMsgListShow = this.value;
		},
		watch: {
			value(val) {
				this.isMsgListShow = val;
			},
			currentVisible(val) {
				if(val === false) {
					this.$emit("input", false);
				}
			}
		}
	}
</script>

<style>
	.header-msg-list-box {
		position: fixed;
		z-index: 30;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.header-no-msg-list {
		position: absolute;
		right: 45px;
		top: 76px;
		list-style: none;
		width: 132px;
		height: 46px;
		text-align: center;
		line-height: 46px;
		font-size: 12px;
		color: #c5c4c4;
		background-color: #fff;
		box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.07);
	}
	
	.header-msg-list-box .header-msg-list {
		position: absolute;
		width: 332px;
		right: 25px;
		top: 76px;
		list-style: none;
		box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.07);
	}
	
	.body-scale .header-msg-list-box .header-msg-list {
		top: 50px;
	}
	
	.body-scale .header-msg-list-box .header-msg-list:before {
		left: 78%;
	}
	
	.body-scale .header-msg-list-box .header-no-msg-list {
		top: 52px;
		right: 28px;
	}
	
	.header-msg-list-box .header-msg-list:before,
	.header-msg-list-box .header-no-msg-list:before {
		content: "";
		width: 0;
		height: 0;
		border: 8px;
		border-color: transparent transparent #f6f5f4 transparent;
		border-style: dashed dashed solid dashed;
		position: absolute;
		top: -16px;
		left: 73%;
		margin-left: -6px;
	}
	
	.header-msg-list-box .header-no-msg-list:before {
		left: 48%;
		border-color: transparent transparent #fff transparent;
	}
	
	.header-msg-list-box .header-msg-list-title {
		background-color: #f6f5f4;
		text-align: center;
		line-height: 55px;
		font-size: 14px;
		color: #c5c4c4;
		cursor: default;
	}
	
	.header-msg-list-box .header-msg-list-item {
		line-height: 55px;
		background-color: #fff;
		height: 55px;
		cursor: pointer;
	}
	
	.header-msg-list-box .header-msg-list-item>span {
		float: left;
	}
	
	.header-msg-list-box .header-msg-list-item:hover {
		background-color: #7cd1f9;
		color: #fff;
	}
	
	.header-msg-list-item>.item-icon {
		display: block;
		width: 60px;
		text-align: center;
		height: 55px;
	}
	
	.header-msg-list-item>.item-icon>.read-message {
		display: block;
		width: 28px;
		height: 28px;
		border-radius: 100%;
		background: url(../../../static/images/read-message.png) no-repeat center;
		background-color: #f3f3f3;
		vertical-align: middle;
		margin: 14px auto;
	}
	
	.header-msg-list-item>.item-icon>.process-message {
		display: block;
		width: 28px;
		height: 28px;
		border-radius: 100%;
		background: url(../../../static/images/process-message.png) no-repeat center;
		background-color: #f3f3f3;
		vertical-align: middle;
		margin: 14px auto;
	}
	
	.header-msg-list-item>.item-detail {
		display: block;
		width: calc(100% - 136px);
		padding-right: 10px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.header-msg-list-item>.item-time {
		display: block;
		width: 66px;
	}
	
	.header-msg-list-box .header-msg-list-end {
		background-color: #f6f5f4;
		text-align: center;
		line-height: 40px;
		font-size: 14px;
		color: #c5c4c4;
		cursor: pointer;
	}
	
	.header-msg-list-box.child-hide>ul {
		display: none;
	}
</style>