import configUrl from "./../config.js";
import extendConfig from "@/extend/extend-config.js";
import "babel-polyfill";
import axios from "axios";
import importLocale from "@/static/js/importLocale.js";
import formatMixin from "@/components/sapi-directive-input.js";

window.globalConfig = {
	loginUrl: "/login.html",
	loginMode: webConfig.loginMode,
	userId: window.sessionStorage.getItem("userId"),
	baseUrl: webConfig.baseUrl,
	maxExportNumber: 2000,
	fileSize: 20 * 1024,
	fileUrl: "/api/plat/shares/upload"
}

extendConfig.init(globalConfig);

window.isIE = function() {
	if(!!window.ActiveXObject || "ActiveXObject" in window || navigator.userAgent.indexOf("Edge") > -1)
		return true;
	else
		return false;
}

window.getPagerMixin = function() {
	return {
		data: function() {
			return {
				params: {
					pageIndex: 1,
					pageSize: 20,
					keyword: ""
				},
				pageTotal: 0,
				pageArr: [10, 20, 40, 60, 100],
				pageFunc: null,
				layout: "total, sizes, next, pager, prev"
			}
		},
		methods: {
			pageSizeChange: function(val) {
				this.params.pageSize = val;
				if(this.params.pageIndex !== 1) {
					this.params.pageIndex = 1;
				} else {
					if(typeof this.pageFunc === "function") {
						this.pageFunc();
					}
				}
			},
			pageCurrentChange: function(val) {
				this.params.pageIndex = val;
				if(typeof this.pageFunc === "function") {
					this.pageFunc();
				}
			}
		}
	}
}

window.getTabMixin = function() {
	return {
		mounted() {
			var tabList = this.$el.querySelectorAll('.func-btns>span');
			for(var i = 0; i < tabList.length; i++) {
				tabList[i].index = i;
				tabList[i].onclick = function(evt) {
					//evt.stopPropagation();
					for(var j = 0; j < tabList.length; j++) {
						if(this.index == j) {
							tabList[j].className += ' btn-active';
						} else {
							tabList[j].className = tabList[j].className.replace(/\s*btn\-active/g, '');
						}
					}
				}
			}
			/*document.addEventListener("click", function() {
				for(var i=0;i<tabList.length;i++){
					tabList[i].className=tabList[i].className.replace(/\s*btn\-active/g,'');
				}
			},false)*/
		}
	}
}

//获取Token
function getAccToken() {
	if(location.href.indexOf(globalConfig.loginUrl) > -1) {
		return;
	}

	if(webConfig.ssoUrl && location.href.indexOf(webConfig.ssoUrl) > -1) {
		return;
	}

	var ws = window.sessionStorage;
	if(ws.getItem("access_token") && ws.getItem("baseUrl") === globalConfig.baseUrl) {
		return ws.getItem("token_type") + ' ' + ws.getItem("access_token");
	}

	ws.clear();
	window.location.href = globalConfig.loginUrl + "?time=" + new Date().getTime();
}

var token = globalConfig.webToken = getAccToken();

var plugin = {};
plugin.install = function(Vue, options) {
	//注册全局性的Vue
	window.Vue = Vue;
	Vue.mixin(formatMixin);
	var clearTime, clearMsgTime;
	!Vue.toLocale&&Vue.use(importLocale);
	

	//常用方法封装

	/*axios 方法初始化,封装*/
	axios.defaults.baseURL = globalConfig.baseUrl;
	axios.defaults.headers.common['Authorization'] = token;
	axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
	axios.defaults.headers.delete['Content-Type'] = 'application/json';

	function error403(error) {
		if(!error || !error.response) {
			if(!error.response) {
				console.error(error);
			}

			return;
		}

		var status = error.response.status;
		if(status == 403 && this.$router) {
			this.$router.push("/403");
		}
	}

	//拦截器全局初始化
	axios.interceptors.response.use(function(response) {

		//对响应数据做些事
		return response;
	}, function(error) {
		var errorFn = function(text1, text2) {
			var dom = document.querySelector("body>.dialog-error");

			var clickFn = function() {
				if(!dom) {
					return;
				}
				dom.outerHTML = "";
				dom.removeEventListener("click", clickFn);
				dom = null;
			}

			if(!dom) {
				var div = document.createElement("div");
				var id = "dialog-error-id-" + Math.ceil(Math.random() * 1000000);

				div.id = id;
				div.className = "dialog-error";
				div.innerHTML = '<div class="dialog-error-box"><div class="dialog-error-box-close"><i class="el-icon-close dialog-error-box-close-btn"></i></div><div class="dialog-error-box-text1"></div><div class="dialog-error-box-text2"></div></div>';
				document.body.appendChild(div);
				dom = document.getElementById(id);

				dom.querySelector(".dialog-error-box-close").addEventListener("click", clickFn, false);
			}

			dom.querySelector(".dialog-error-box-text1").innerText = text1;
			dom.querySelector(".dialog-error-box-text2").innerText = text2;

			setTimeout(function() {
				clickFn();
			}, 60000);
		}

		var status = error.response?error.response.status:"";
		if(status == 401 && location.href.indexOf(globalConfig.loginUrl) === -1) {
			window.location.href = globalConfig.loginUrl;
		} else if(status == 403) {

		} else if(status!==""){
			var errorText1=Vue.__t("ajaxCallError.0");
			var errorText2=Vue.__t("ajaxCallError.1");
			errorFn(errorText1==="ajaxCallError.0"?"系统错误":errorText1, errorText2==="ajaxCallError.1"?"请联系管理员":errorText2);
		}else{
			console.log(error)
		}

		//请求错误时做些事
		return Promise.reject(error);
	});

	/**success 只有Code===0时才会执行，其他都为error**/

	function ajaxMethod(url, data, success, error, method) {
		var _this = this,
			sParams = {},
			autoCloseLoading = true,
			sSuccess = success || function() {},
			sError = error || function() {};
		if(!url) {
			console.error("请输入链接");
			return;
		}
		
		var isUpdate=method === "post" || method === "put";

		if(isUpdate && !data) {
			console.error("请输入参数");
			return;
		}

		if(data) {
			if(typeof data == "function") {
				sSuccess = data;
				sError = success || sError;
			} else {
				sParams = data;
			}
		}

		var menuid = "";
		var route=this.$route;
		var routeName;
		if(route) {
			menuid = route.query.menuId;
			routeName=route.name;
		}

		if(sParams.autoOpenLoading !== false) {
			_this.$loadingOpen();
		}else{
			autoCloseLoading=false;
			delete sParams.autoOpenLoading;
		}

		var config = {
			headers: {
				"MenuId": menuid
			}
		}
		var arrs = [];
		arrs.push(url);
		if(isUpdate) {
			_this.disabled !== undefined ? _this.disabled = true : "";
			arrs.push(sParams);
		} 
		else if(method==="delete"){
			arrs.push({data:sParams});
		}
		else {
			config.params = sParams;
		}
		arrs.push(config);

		axios[method].apply(null, arrs).then(function(data) {
			
			var res = data.data;
			if(res.Code === 0) {
				if(method==="get"){
					sSuccess.call(_this, res.Data, res);
				}
				else{
					sSuccess.call(_this, res, res);
				}
				
			} else {
				if(res.Code>0){
					var resData=res.Data;
				var resOption;
				if(typeof resData==="number"){
					resOption={
						0:resData
					}
				}else if(Array.isArray(resData)){
					resOption={};
					resData.forEach(function(data,index){
						resOption[index]=data;
					});
				}
				
				let errorMsg=_this.$t(routeName+".code."+res.Code,resOption);
				errorMsg=errorMsg.indexOf("undefined.")===0?res.Message:errorMsg;
				
				if(isUpdate&&_this.$waringTips) {
					_this.$waringTips(errorMsg, ".form-error-tips");
				}else{
					Vue.msg(errorMsg);
				}
				}
				

				sError.call(_this, res);
			}
			
			_this.disabled !== undefined ? _this.disabled = false : "";
			autoCloseLoading && _this.$loadingClose();
		}).catch(function(err) {
			error403.call(_this, err);
			sError.call(_this, err);
			_this.disabled !== undefined ? _this.disabled = false : "";
			autoCloseLoading && _this.$loadingClose();
		});
	}

	/**
	 * description get获取数据
	 * @params {String} url：链接(必填)
	 * @params {Object} params：参数(可选)
	 * @params {Function} success: 成功回调方法(可选)
	 * @params {Function} error：失败时的回调方法(可选)
	 * **/
	Vue.prototype.$get = function(url, params, success, error) {
		ajaxMethod.call(this,url, params, success, error, "get");
	}

	/**
	 * description 数据添加
	 * @params {String} url：链接(必填)
	 * @params {Object} data：参数(必填)
	 * @params {Function} success: 成功回调方法(可选)
	 * @params {Function} error：失败时的回调方法(可选)
	 * **/
	Vue.prototype.$post = function(url, data, success, error) {
		ajaxMethod.call(this,url, data, success, error,"post");
		/*var _this = this,
			sParams = data,
			sSuccess = success || function() {},
			sError = error || function() {};

		if(!url) {
			console.error("请输入链接");
			return;
		}

		if(!data) {
			Vue.msg("请输入参数");
			return;
		}

		var menuid = "";
		if(this.$route) {
			menuid = this.$route.query.menuId;
		}

		_this.$loadingOpen();
		_this.disabled !== undefined ? _this.disabled = true : "";
		axios.post(url, data, {
			headers: {
				"MenuId": menuid
			}
		}).then(function(data) {
			var res = data.data;
			if(res.Code === 0) {
				sSuccess.call(_this, res);
			} else {
				if(_this.$waringTips) {
					_this.$waringTips(res.Message, ".form-error-tips");
				} else {
					Vue.errorMsg(res.Message);
				}
				sError.call(_this, res);
			}
			_this.disabled !== undefined ? _this.disabled = false : "";
			_this.$loadingClose();
		}).catch(function(err) {
			error403.call(_this, err);
			sError.call(_this, err);
			_this.disabled !== undefined ? _this.disabled = false : "";
			_this.$loadingClose();
		});*/
	}

	/**
	 * description 数据修改
	 * @params {String} url：链接(必填)
	 * @params {Object} data：参数(必填)
	 * @params {Function} success: 成功回调方法(可选)
	 * @params {Function} error：失败时的回调方法(可选)
	 * **/
	Vue.prototype.$put = function(url, data, success, error) {
		ajaxMethod.call(this,url, data, success, error,"put");
		/*var _this = this,
			sParams = data,
			sSuccess = success || function() {},
			sError = error || function() {};

		if(!url) {
			console.error("请输入链接");
		}

		if(!data) {
			Vue.msg("请输入参数");
			return;
		}

		var menuid = "";
		if(this.$route) {
			menuid = this.$route.query.menuId;
		}

		_this.$loadingOpen();
		_this.disabled !== undefined ? _this.disabled = true : "";
		axios.put(url, data, {
			headers: {
				"MenuId": menuid
			}
		}).then(function(data) {
			var res = data.data;
			if(res.Code === 0) {
				sSuccess.call(_this, res);
			} else {
				if(_this.$waringTips) {
					_this.$waringTips(res.Message, ".form-error-tips");
				} else {
					Vue.errorMsg(res.Message);
				}

				sError.call(_this, res);
			}

			_this.disabled != undefined ? _this.disabled = false : "";
			_this.$loadingClose();
		}).catch(function(err) {
			error403.call(_this, err);
			sError.call(_this, err);
			_this.disabled !== undefined ? _this.disabled = false : "";
			_this.$loadingClose();
		});*/
	}

	/**
	 * description 数据删除
	 * @params {String} url：链接(必填)
	 * @params {Object} data：参数(选填)
	 * @params {Function} success: 成功回调方法(可选)
	 * @params {Function} error：失败时的回调方法(可选)
	 * **/
	Vue.prototype.$delete = function(url, data, success, error) {
		ajaxMethod.call(this,url, data, success, error,"delete");
		/*var _this = this,
			sParams = {},
			headres = {},
			sSuccess = function() {},
			sError = function() {};
		if(!url) {
			console.error("请输入链接");
		}

		if(data) {
			if(typeof data === "function") {
				sSuccess = data;
				sError = success || error;
			} else {
				sParams = {
					data: data
				}

				sSuccess = success || function() {},
					sError = error || function() {};
			}
		}

		var menuid = "";
		if(this.$route) {
			menuid = this.$route.query.menuId;
		}

		axios.delete(url, sParams, {
			headers: {
				"MenuId": menuid
			}
		}).then(function(data) {
			var res = data.data;
			if(res.Code === 0) {
				sSuccess.call(_this, res);
			} else {
				Vue.errorMsg(res.Message);
				sError.call(_this, res);
			}

			_this.disabled !== undefined ? _this.disabled = false : "";
		}).catch(function(err) {
			error403.call(_this, err);
			sError.call(_this, err);
			_this.disabled !== undefined ? _this.disabled = false : "";
		});*/
	}

	/**
	 * description 数据请求
	 * @params {Object} config：参数(必填)
	 * @params {Function} success: 成功回调方法(可选)
	 * @params {Function} error：失败时的回调方法(可选)
	 * **/
	Vue.prototype.$request = function(config, success, error) {
		if(!config) {
			return "";
		}

		var _this = this;

		var sSuccess = success || function() {},
			sError = error || function() {};

		var menuid = "";
		if(this.$route) {
			menuid = this.$route.query.menuId;
		}

		config.headers = config.headers || {};
		config.headers.MenuId = menuid;

		_this.$loadingOpen();
		_this.disabled !== undefined ? _this.disabled = true : "";
		axios(config).then(function(data) {
			var res = data.data;
			if(res.Code === 0) {
				sSuccess.call(_this, res);
			} else {
				if(_this.$waringTips) {
					_this.$waringTips(res.Message, ".form-error-tips");
				} else {
					Vue.errorMsg(res.Message);
				}

				sError.call(_this, res);
			}
			_this.disabled !== undefined ? _this.disabled = false : "";
			_this.$loadingClose();
		}).catch(function(err) {
			error403.call(_this, err);
			sError.call(_this, err);
			_this.disabled !== undefined ? _this.disabled = false : "";
			_this.$loadingClose();
		});
	}

	/**axios方法封装结束**/

	/**
	 * $getUrlParams 获取url参数
	 * @params {String} name：获取的参数名称
	 ***/
	Vue.prototype.$getUrlParams = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) return(r[2]);
		return null;
	}

	/**
	 * $getHashParams 获取路由的参数
	 * @params {String} name：获取的参数名称
	 ***/
	Vue.prototype.$getHashParams = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var arrs = window.location.hash.split("?");
		if(arrs.length < 2) {
			return "";
		}

		var r = arrs[1].match(reg);
		if(r != null) return(r[2]);
		return "";
	}

	//重写时间转换为字符串方法
	Date.prototype.toJSON = function() {
		return this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
	}

	/**
	 * dateFormat 时间转换格式
	 * @params {String} fmt：时间格式
	 * @params {String|Date} date：时间字符串、时间
	 * description 使用实例：如果做实体内使用，this.$dateFormat("yyyy-MM-dd hh:mm:ss",date)  实体外调用：Vue.dateFormat("yyyy-MM-dd hh:mm:ss",date)
	 ***/
	Vue.dateFormat = Vue.prototype.$dateFormat = function(fmt, date) {
		if(!date || !fmt) {
			return "";
		}

		if(!date.getFullYear) {
			if(date.indexOf("1753") > -1) {
				return "";
			}

			date = date.replace("T", " ").replace(/-/g, "/").replace((/\.\d+(\+.+)?$/), "");
			date = new Date(date);
		} else if(date.getFullYear() === 1753) {
			return "";
		}

		var o = {
			"M+": date.getMonth() + 1, //月份 
			"d+": date.getDate(), //日 
			"h+": date.getHours(), //小时 
			"m+": date.getMinutes(), //分 
			"s+": date.getSeconds() //秒 
		};

		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	/**
	 * $checkedASCII检查是否有中文字符
	 * **/
	Vue.prototype.$checkedASCII = function(val) {
		if(!val) {
			return true;
		}

		/*var reg=new RegExp()*/

		return /^[\x00-\x7F]+$/.test(val);
	}

	/**
	 * msg 提示信息
	 * @params {String} text：提示的内容
	 * @params {Object} option：option.type:info、error、success
	 ***/
	var msg = function(text, option) {
		if(!text) {
			return;
		}
		
		option = option || {};

		var dom = document.querySelector(".dialog-msg-box");
		if(!dom) {
			var style="";
			if(option.width){
				style=" style='width:"+option.width+"'";
			}
			var div = document.createElement("div");
			div.className = "dialog-msg";
			div.innerHTML = '<div class="dialog-msg-box dialog-msg-info"'+style+'><i class="dialog-msg-flag-icon"></i><span class="dialog-msg-box-text"></span></div>';
			document.querySelector("body").appendChild(div);
			dom = document.querySelector(".dialog-msg-box");
		}

		var textDom = dom.querySelector(".dialog-msg-box-text");
		textDom.innerHTML = text;

		dom.className = dom.className.replace(/\s*?(dialog-msg-error|dialog-msg-success|dialog-msg-info)/g, "");
		if(option.type === "error") {
			dom.className = dom.className + " dialog-msg-error";
		} else if(option.type === "success") {
			dom.className = dom.className + " dialog-msg-success";
		} else {
			dom.className = dom.className + " dialog-msg-info";
		}

		var parentNode = dom.parentNode;
		parentNode.className = parentNode.className + " show";

		textDom.removeAttribute("style", "lineHeight");
		if(textDom.clientHeight > 48) {
			textDom.style.lineHeight = "24px";
		}

		clearTimeout(clearMsgTime);
		clearMsgTime = setTimeout(function() {
			parentNode.className = parentNode.className.replace(/\s*?show/g, "");
			parentNode = null;
		}, option.timeout || 2000);

		var eventFunc = function() {
			if(!parentNode) {
				return;
			}

			clearTimeout(clearMsgTime);
			this.removeEventListener("click", eventFunc);
			parentNode.className = parentNode.className.replace(/\s*?show/g, "");
			parentNode = null;
		}

		parentNode.addEventListener("click", eventFunc, false);
	}

	/**
	 * successMsg 成功提示信息
	 * @params {String} text：提示的内容
	 * @params {Object} option：option.type:info、error、success
	 ***/
	Vue.successMsg = function(text, option) {
		option = option || {};
		option.type = "success";
		msg(text, option);
	}

	/**
	 * errorMsg 失败提示信息
	 * @params {String} text：提示的内容
	 * @params {Object} option：option.type:info、error、success
	 ***/
	Vue.errorMsg = Vue.msg = function(text, option) {
		option = option || {};
		option.type = "error";
		msg(text, option);
	}

	/**
	 * $loadingOpen 延迟加载打开
	 * @params {Object} option：属性shade:蒙层的透明度；color：蒙层的背景颜色，color的格式为：255,255,255；默认值是rgba(255,255,255,0.05)
	 ***/
	Vue.prototype.$loadingOpen = function(option) {
		var loadElem = document.querySelector("body>div.simple-loading");

		if(!loadElem) {
			var div = document.createElement("div");
			div.className = "simple-loading";
			document.body.appendChild(div);
			loadElem = document.querySelector("body>div.simple-loading");
			var sysConfig = JSON.parse(localStorage["sysConfigSet"] || "{}");
			if(sysConfig.loading) {
				loadElem.style.backgroundImage = "url(" + sysConfig.loading + ")";
			}
		}

		/*if(loadElem.className.indexOf("ring") == -1) {
			loadElem.className = loadElem.className + " ring";
		}*/

		/*option = option || {};

		if(option.shade !== undefined || option.color !== undefined) {
			var shade = typeof option.shade === "number" ? option.shade : 0.05;
			var color = option.color || "255,255,255";
			loadElem.setAttribute("style", "background-color: rgba(" + color + "," + shade + ");");
		} else {
			loadElem.setAttribute("style", "background-color: rgba(255,255,255,0.05)");
		}*/

		loadElem.className = loadElem.className.replace(/\s*?hide(?=\s*?)?/g, "");
	}

	/**
	 * $loadingClose 延迟加载关闭  页面加载时load图标，需要在页面添加标签，这里只是关闭load图标，作用是，做html、js等没有加载完成之前就显示该图标
	 ***/
	Vue.prototype.$loadingClose = function() {
		clearTimeout(clearTime);
		clearTime = setTimeout(function() {
			var dom = document.querySelector("body>div.simple-loading");
			if(dom) {
				var className = dom.className;
				if(!(className.search(/\b(hide)\b/i) > -1)) {
					dom.className = className + " hide";
				}
			}
		}, 100);
	}

	//这个与上面的有些不一样，上面的一般是数据加载或者数据提交的时候显示loadding，数据获取完毕会关闭，而这里的不同就在于此，只能自己关闭或者打开
	Vue.prototype.$loading = function(flag) {
		var loadElem = document.querySelector("body>div.simple-loading");

		if(!loadElem) {
			var div = document.createElement("div");
			div.className = "simple-loading";
			document.body.appendChild(div);
			loadElem = document.querySelector("body>div.simple-loading");
		}

		if(flag === true) {
			loadElem.className = loadElem.className + " show";
		} else {
			loadElem.className = loadElem.className.replace(/\s*?show(?=\s*?)?/g, "");
			if(loadElem.className.search(/\b(hide)\b/i) === -1) {
				dom.className = className + " hide";
			}
		}
	}

	/**
	 * 判断数据类型
	 * @params {Object|Number|Array...} 所有类型数据
	 * @return {object|number|array...}
	 * **/
	Vue.prototype.$typeof = function(val) {
		return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
	}

	Vue.prototype.$setTitle = function(name) {
		document.title = name;
	}

	//设置main模块里面的map
	function setBodyMap() {
		if(!this.$root.menuName) {
			return;
		}

		var dom = this.$el.querySelector(".main-header-map>.main-header-map-text");
		if(dom) {
			dom.innerText = this.$root.menuName || "";
		}
	}

	//从sessionStorage获取权限
	Vue.prototype.$init = function(option) {
		option = option || {};

		if(option.noPermission !== true) {
			//初始化权限
			var str = sessionStorage["permissions"];
			this.permissions = JSON.parse(str || "{}");
		}

		//初始化表格最大高度
		if(option.noTable !== true) {
			var clientHeight = document.querySelector(".index-body-box-content").clientHeight;
			option.subHeight = option.subHeight || 108;
			var maxHeight = clientHeight - option.subHeight;
			this.maxBodyHeight = maxHeight > 0 ? maxHeight : 100;
		}

		//设置map
		if(option.notMap !== true) {
			this.$nextTick(() => {
				setTimeout(() => {
					setBodyMap.call(this);
				}, 50);
			});
		}
	}
}

export default plugin;