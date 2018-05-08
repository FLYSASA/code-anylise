import importLocale from "@/static/js/importLocale.js";
import {main,sapi} from "./locale-component.js";

var Confirm = {};
Confirm.install = function(Vue) {

	!Vue.toLocale&&Vue.use(importLocale);
	let obj=Vue.extendLangs(main,sapi);
	Vue.toLocale(obj);

	/**
	 * description $confirmTips 确认弹窗
	 * @params {String} content：显示内容(必填)
	 * @params {Function} confirmFunc: 确认回调方法(可选)
	 * @params {Function} cancelFunc：失败时的回调方法(可选)
	 * @params {Array} btnTexts：按钮文字(选填，从左到右，最多两个)
	 * @params {Object} option：其他参数class、align对齐、width:宽度、top：距离顶部高度、ok按钮文字、cancel按钮文字(选填)
	 * **/
	Vue.prototype.$confirmTips = function(content, confirmFunc, cancelFunc, btnTexts, option) {
		if(!content || typeof content !== "string") {
			Vue.msg(this.$t("sapiConfirm.contentEmpty"));
			return;
		}

		var arr = arguments[arguments.length - 1];
		if(this.$typeof(arr) === "object") {
			option = arr;
		} else {
			option = {};
		}

		var style = "";
		if(option.width || option.top || option.align) {
			option.width ? (style += "width:" + option.width + ";") : "";
			option.top ? (style += "top:" + option.top + ";") : "";
			option.align ? (style += "text-align:" + option.align + ";") : "";
			style = "style='" + style + "'";
		}

		var div = document.createElement("div");
		var id = "confirm-id-" + Math.ceil(Math.random() * 1000000);
		div.className = "sapi-confirm" + (option.className ? (" " + option.className) : "");
		div.id = id;
		div.innerHTML = '<div class="sapi-confirm-box"' + style + '><div class="sapi-confirm-box-text"></div><div class="sapi-confirm-box-btns"><span class="sapi-confirm-cancel-btn"></span><span class="sapi-confirm-ok-btn"></span></div></div>';
		document.body.appendChild(div);
		div = document.querySelector("#" + id);
		div.querySelector(".sapi-confirm-box-text").innerHTML = content;

		//按钮区
		var arrs = arguments[arguments.length - 2];
		if(this.$typeof(arrs) === "array" && arrs.length > 0) {
			btnTexts = arrs;
			option.ok = btnTexts[0];
			option.cancel = btnTexts[1];
		}

		option.ok = option.ok || this.$t("confirm");
		option.cancel = option.cancel || this.$t("cancel");
		var okBtn = div.querySelector(".sapi-confirm-ok-btn");
		var cancelBtn = div.querySelector(".sapi-confirm-cancel-btn");
		okBtn.innerText = option.ok;
		cancelBtn.innerText = option.cancel;
		var _this = this;

		okBtn.addEventListener("click", function() {
			if(typeof confirmFunc === "function") {
				confirmFunc.call(_this);
			}

			div.outerHTML = "";
		}, false);

		cancelBtn.addEventListener("click", function() {
			if(typeof cancelFunc === "function") {
				cancelFunc.call(_this);
			}

			div.outerHTML = "";
		}, false);

		cancelBtn = null;
		okBtn = null;
	}

	/**
	 * description $deleteTips 删除确认弹窗
	 * @params {String} content：显示内容(选填)
	 * @params {Function} confirmFunc: 确认回调方法(必填)
	 * @params {Function} cancelFunc：失败时的回调方法(可选)
	 * **/
	Vue.prototype.$deleteTips = function(confirmFunc, cancelFunc, content) {
		if(!confirmFunc || typeof confirmFunc !== "function") {
			return;
		}

		var text = arguments[arguments.length - 1];
		if(typeof text === "string") {
			content = text;
		} else {
			content = this.$t("sapiConfirm.deleteContent");
		}

		this.$confirmTips(content, confirmFunc, cancelFunc, [this.$t("sapiConfirm.confirmDelete")], {
			className: " sapi-confirm-delete"
		});
	}
}

export default Confirm;