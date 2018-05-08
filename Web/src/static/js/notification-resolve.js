export default {
	resolveUrl(url) {
		if(!url) {
			return {};
		}

		var arrs = url.split("?");
		var component = arrs[0];
		var option = {};
		if(arrs[1]) {
			var params = arrs[1].split("&");
			for(var i = 0, ii = params.length; i < ii; i++) {
				var arr = params[i].split("=");
				option[arr[0]] = arr[1];
			}
		}

		return {
			component: component,
			option: option
		}
	}
};