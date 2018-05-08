import Vue from 'vue';
import '@/static/css/normalize.css';
import '@/static/css/common.css';
import '@/static/css/theme.css';
import '@/pages/plat/static/css/index.css';
import "@/static/css/sapi-dialog.css";
import '@/static/css/sapi-fonts/iconfont.css';
import elementModule from "@/static/js/importElement.js";

import common from "@/static/js/common.js";
import index from './main.vue';

Vue.use(common);

new Vue({
	el: '#index',
	render(h) {
		if(!globalConfig.webToken){
			return h("");
		}
		
		return h(index);
	}
});
