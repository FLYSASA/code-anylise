import Vue from 'vue';
import elementModule from "@/static/js/importElement.js";
import '@/static/css/normalize.css';
import '@/static/css/common.css';
import '@/static/css/theme.css';
import '../css/index.css';

import common from "@/static/js/common.js";
import index from './index.vue';

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

