import Vue from 'vue';
import elementModule from "./importElement.js";
import platLocale from "./importLocale.js";
import VueRouter from "vue-router";

import '@/static/css/normalize.css';
import '@/static/css/common.css';
import '@/static/css/theme.css';
import "@/static/css/sapi-dialog.css";
import '@/static/css/sapi-fonts/iconfont.css';

import common from "@/static/js/common.js";
import permissionsChecked from "@/static/js/permissionsChecked.js";
import menu from "@/components/sapi-tree-left-menu.vue";
import header from "@/pages/home/index/header.vue";

import "@/static/css/element-extend.css";

Vue.use(platLocale);

export default {
	init(routers, checkedPermission, langs,callback) {
		if(!globalConfig.webToken) {
			return;
		}


		//elementModule.init(Vue);
		Vue.use(common);
		Vue.use(VueRouter);
		var router = new VueRouter({
			routes: routers.routes
		});

		var vm = new Vue({
			router: router,
			components: {
				"web-header": header,
				"menu-aside": menu
			}
		}).$mount("#index");

		if(checkedPermission !== false) {
			permissionsChecked(router, vm);
		}

		if(typeof callback === "function") {
			callback.call(vm);
		}
		
		/*setTimeout(()=>{
			
		},10);*/

		if(langs){
			Vue.toLocale(langs);
		}
	}
}