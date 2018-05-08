const Lang = {};

import locale from 'element-ui/lib/locale';

const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g;

function hasOwn(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key);
};

function format(string, ...args) {
	if(args.length === 1 && typeof args[0] === 'object') {
		args = args[0];
	}

	if(!args || !args.hasOwnProperty) {
		args = {};
	}

	return string.replace(RE_NARGS, (match, prefix, i, index) => {
		let result;

		if(string[index - 1] === '{' &&
			string[index + match.length] === '}') {
			return i;
		} else {
			result = hasOwn(args, i) ? args[i] : null;
			if(result === null || result === undefined) {
				return '';
			}

			return result;
		}
	});
}

Lang.install = function(Vue, options) {
	let localLang = {};

	function t(path, options) {
		const array = path.split('.');
		let current = localLang;

		for(let i = 0, j = array.length; i < j; i++) {
			const property = array[i];
			let value = current[property];
			if(i === j - 1) {
				if(typeof value !== "string") {
					return path
				}
				return format(value, options);
			}
			if(!value) return path;
			current = value;
		}

		return path;
	}

	Vue.__t = Vue.prototype.$t = function(path, options) {
		return t(path || "", options);
	}

	Vue.extendLangs=function(...args) {
		if(arguments.length < 1) {
			return {};
		}

		if(arguments.length < 2) {
			return arguments[0];
		}

		let arg = arguments[0];
		let obj = {};
		for(let key in arg) {
			let lang = {};
			Object.assign(lang, arg[key]);
			for(let i = 1, ii = arguments.length; i < ii; i++) {
				Object.assign(lang, arguments[i][key]);
			}
			obj[key] = lang;
		}

		return obj;
	}

	Vue.toLocale = async function(langObj, isExtendLang) {
		if(!langObj || typeof langObj !== "object") {
			return;
		}

		const lang = "zh-cn";

		const fns = langObj[lang];
		if(typeof fns === "object" && fns.length === undefined) {
			if(isExtendLang === false) {
				localLang = fns;
			} else {
				Object.assign(localLang, fns);
			}

			return;
		}

		let promiseAll = [];
		if(Array.isArray(fns)) {
			fns.forEach(fn => {
				promiseAll.push(fn());
			});
		} else {
			if(typeof fns!=="function"){
				console.log("语言模块添加有问题");
				return ;
			}
			promiseAll.push(fns());
		}

		switch(lang) {
			case "zh-tw":
				promiseAll.push(
					import("element-ui/lib/locale/lang/zh-TW"));
				promiseAll.push(
					import("@/static/i18n/common/zh-tw/main.js"));
				break;
			default:
				promiseAll.push(
					import("element-ui/lib/locale/lang/zh-CN"));
				promiseAll.push(
					import("@/static/i18n/common/zh-cn/main.js"));
				break;
		}

		const res = await Promise.all(promiseAll);

		let elLang;
		res.forEach(data => {
			let obj = data.default;
			if(obj && obj.el) {
				elLang = obj;
			} else {
				Object.assign(localLang, obj);
			}
		});

		locale.use(elLang);
	}

}

export default Lang;