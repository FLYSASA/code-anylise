import Vue from 'vue';
import elementModule from "@/static/js/importElement.js";
import '@/static/css/normalize.css';

import '@/static/css/common.css';
import '@/static/css/theme.css';
import '../css/login.css';
import '@/extend/static/css/login.css';
import tips from  "@/components/sapi-tips.js";
import common from  "@/static/js/common.js";
import login from './login.vue';
import importLocale from "@/static/js/importLocale.js";
Vue.use(importLocale);
sessionStorage.clear();
Vue.use(tips);
Vue.use(common);

import {home} from "../js/locale-home.js";
Vue.toLocale(home);

new Vue({
    el: '#index',
    render:function(h){
    	return h(login);
    }
});
