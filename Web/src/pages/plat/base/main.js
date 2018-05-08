import routers from './router.js';
import '../static/css/index.css';

import initImport from "@/static/js/mainBaseImport.js";

var lang={
	"zh-cn":function (){
		return import("@/static/i18n/plat/zh-cn/base.js");
	},
	"zh-tw":function(){
		return import("@/static/i18n/plat/zh-tw/base.js");
	}
}

//这里接收三个参数，路由routers(Object)，第二个是是否需要验证权限(boolean)，第三个为回调函数(Function)
//element的模块现在改成按需加载，如果系统现在配置的模块还不存在，可以在第三个参数回调函数里面进行注册
initImport.init(routers,true,lang);


