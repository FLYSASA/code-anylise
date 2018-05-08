import Vue from 'vue';
import elementModule from "@/static/js/importElement.js";
import VueRouter from "vue-router";
import '@/static/css/normalize.css';
import '@/static/css/common.css';
import '@/static/css/theme.css';
import '../static/css/index.css';
import '../static/css/tree-color.css';
import "@/static/css/sapi-dialog.css";
import	'@/static/css/sapi-fonts/iconfont.css';
import	'@/static/css/element-extend.css';

import common from "@/static/js/common.js";
import menu from "@/pages/plat/components/user-info-left-menu.vue";
import routers from './router.js';
import header from "@/pages/home/index/header.vue";

import importLocale from "@/static/js/importLocale.js";

var lang={
	"zh-cn":function (){
		return import("@/static/i18n/plat/zh-cn/profile.js");
	},
	"zh-tw":function(){
		return import("@/static/i18n/plat/zh-tw/profile.js");
	}
}



Vue.use(common);
Vue.use(VueRouter);
Vue.use(importLocale);
var router = new VueRouter({
    routes: routers.routes
});

Vue.toLocale(lang);

var vm = new Vue({
    router: router,
    components: {
        "web-header": header,
        "menu-aside": menu
    }
}).$mount("#index");
