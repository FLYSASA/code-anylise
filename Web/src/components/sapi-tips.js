import importLocale from "@/static/js/importLocale.js";
import {main} from "./locale-component.js";

var Tips = {};
Tips.install = function(Vue, options) {	
	
	!Vue.toLocale&&Vue.use(importLocale);
	Vue.toLocale(main);
	var clearTimeObj = {};
	var removeObj = {};

	/**
	 * $tips 信息提示
	 * @params {String} content：提示内容(选填)
	 * @params {String} selector：css选择器(必填)
	 * @params {Object} option: 可选参数(可选) option.error===true为错误提示，高亮  ；
	 * **/
	Vue.prototype.$tips = function(content, selector, option) {	
		if(!selector) {
			Vue.errorMsg(this.$t('sapiTips.inputSelectorPlease'));
//			Vue.errorMsg("请输入选择器");
			return;
		}

		var dom = this.$el.querySelector(selector);

		if(!dom) {
			return;
		}

		option = option || {};
		option.append = option.append || true;

		var parent = dom.parentNode;
		var tipDoms = parent.querySelectorAll(".sapi-tips");
		if(tipDoms) {
			for(var i = 0, ii = tipDoms.length; i < ii; i++) {
				tipDoms[i].outerHTML = "";
			}
			removeObj[selector] = [];
		}

		if(option.append && parent.className.search(/\s*?relative/) === -1) {
			parent.className = parent.className + " relative";
		}

		/*if(typeof option.beforeShow === "function") {
			option.beforeShow(dom);
		}*/

		var style = "";

		/*if(typeof option.right === "number") {
			style += "right:" + option.right + "px;";
		}

		if(typeof option.left === "number") {
			var left = dom.offsetLeft;

			if(typeof option.left === "number") {
				left = option.left;
				style += "left:" + option.left + "px;";
			}
		}*/

		var top = dom.offsetTop - 40;
		if(option.isDown){
			top = dom.offsetTop + 40;
			parent.className=parent.className+" tips-down";
		}
		/*if(typeof option.top === "number") {
			top = option.top;
		}*/

		style += "top:" + top + "px;";

		var className = option.className || "";
		var id = "tips-id-" + Math.ceil(Math.random() * 100000);

		var html = '<div id=' + id + ' class="sapi-tips ' + className + '" style="' + style + '"><label>' + content + '</label><span></span></div>';

		var div = document.createElement("div");
		div.innerHTML = html;

		var firstChild = div.firstChild;
		firstChild.className = firstChild.className + " absolute";
		if(option.error) {
			parent.className = parent.className + " tips-error";
		}

		parent.appendChild(firstChild);

		/*if(typeof option.afterShow === "function") {
			option.afterShow(document.getElementById(id));
		}*/

		removeObj[selector] = removeObj[selector] || [];
		removeObj[selector].push(id);

		clearTimeout(clearTimeObj[selector]);
		var _this = this;
		clearTimeObj[selector] = setTimeout(function() {
			var myselector = removeObj[selector];
			if(!myselector) {
				return;
			}

			var el = _this.$el.querySelector("#" + myselector[0]);
			if(el) {
				if(option.error) {
					var elParent = el.parentNode;
					elParent.className = elParent.className.replace(/\s*?tips-error|\s*?relative|\*?tips-down/g, "");
				}

				if(removeObj[selector].length > 1) {
					elParent = elParent || el.parentNode;
					removeObj[selector].forEach(function(id) {
						var ele = elParent.querySelector("#" + id);
						if(ele) {
							ele.outerHTML = "";
						}
					});
				} else {
					el.outerHTML = "";
				}
			}
			removeObj[selector] = null;
			clearTimeObj[selector] = null;
		}, option.timeout || 5000);
	}

	//错误信息提示
	Vue.prototype.$errorTips = function(content, selector, option) {
		option = option || {};
		option.error = true;
		this.$tips(content, selector, option);
	}

	//清除所有的表单提示信息
	Vue.prototype.$closeWaringTips = function(selector) {
		for(var key in removeObj) {
			var arr = removeObj[key];
			if(!arr || arr.length === 0) {
				continue;
			}

			var ele = this.$el.querySelector("#" + arr[0]);
			if(ele) {
				var elParent = ele.parentNode;
				elParent.className = elParent.className.replace(/\s*?tips-error|\s*?relative|\*?tips-down/g, "");
				ele.outerHTML = "";
			}
		}

		removeObj = {};

		var dom = this.$el.querySelector(selector);
		if(!dom) {
			return;
		}

		dom.innerHTML = "";
		dom.className = dom.className.replace(/\s*?active/g, "");
	}

	var waringTimeout;
	//服务端校验返回的信息
	Vue.prototype.$waringTips = function(content, selector) {
		if(!selector) {
			return;
		}

		var dom = this.$el.querySelector(selector);
		if(!dom) {
			return;
		}

		dom.className = dom.className + " active";

		dom.innerHTML = "<div class='sapi-waring-tip' ><p><label title='" + content + "'>" + content + "</label></p>" + "<i class='waring-tip-close'></i><div>";
		dom.querySelector(".waring-tip-close").addEventListener("click", function() {
			clearTimeout(waringTimeout);
			if(dom) {
				dom.innerHTML = "";
				dom.className = dom.className.replace(/\s*?active/g, "");
				dom = null;
			}
		}, false);

		clearTimeout(waringTimeout);
		waringTimeout = setTimeout(function() {
			if(!dom) {
				return;
			}
			dom.innerHTML = "";
			dom.className = dom.className.replace(/\s*?active/g, "");
			dom = null;
		}, 120000);
	}
}

export default Tips;