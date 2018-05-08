//注册到common.js文件里面
export default{
	//common.js 里的全局globalConfig
	init(globalConfig){
		//发起工作配置项，使用到的时候，需要到notification.js、header-btns.vue配置具体项
		globalConfig.hasFlow=false;
		globalConfig.authorization = "Basic V2ViQXBwOnNhcGlAMTIzNA==";
		
		//globalConfig.defaultUrl  登录之后调整页面
		//globalConfig.bodyImage   主页的背景图片
		
	}
}
