var tool = {
	min(minValue, value) {
		if(minValue !== null && value < minValue) {
			return false;
		}

		return true;
	},
	max(maxValue, value) {
		if(maxValue !== null && value > maxValue) {
			return false;
		}

		return true;
	},
	//转化为小数
	decimalNum(value, place, defaultValue) {
		if(place !== undefined) {
			return parseFloat(value).toFixed(place);
		}

		return value;
	},
	//数字格式转化为会计格式
	moneyNum(value, place, defaultValue) {
		if(!value) {
			return defaultValue === undefined ? "" : defaultValue;
		}

		var str = parseFloat((value + "").replace(/,/g, ""));
		if(!str) {
			return defaultValue === undefined ? "" : defaultValue;
		}

		var minus = "";
		str = (str + "").replace("-", function(arg) {
			minus = "-"
			return "";
		});

		var arrs = str.split(".");
		var arr = arrs[0];
		var fixed = "";
		if(arrs[1] !== undefined && place > 0) {
			fixed = "." + value.toFixed(place).split(".")[1]
		} else if(place) {
			var arrsCount = [];
			arrsCount.length = place - 1 + 2;
			fixed = "." + arrsCount.join("0");
		}

		//=  && place > 0 ? ("." + parseFloat("." + ) : "";

		if(arr.length < 4) {
			return minus + arr + fixed;
		}

		arr = arr.split("").reverse().join("");
		var returnStr = "";
		for(var i = 0, ii = arr.length; i < ii; i = i + 3) {
			returnStr += "," + arr.slice(i, i + 3);
		}

		returnStr = returnStr.split("").reverse().join("");

		returnStr = minus + returnStr.slice(0, returnStr.length - 1) + fixed;

		return returnStr;
	},
	//会计格式转化为数字
	parseNum(value, defaultValue) {
		return parseFloat((value + "").replace(/,/g, ""));
	}
}

var inputFormatMixin = {

	directives: {
		"format": {
			bind(el, binding, vnode, oldVnode) {
				var input = el.querySelector("input.el-input__inner");
				if(!input) {
					return;
				}

				var option = binding.value || {};
				var _this = vnode.componentInstance;
				var modifier = binding.rawName.split(".")[1];
				var defaultValue = option.default===undefined?"":option.default;
				var type, place;
				if(modifier) {
					type = modifier.replace(/\d*$/g, "").toLowerCase();
					place = modifier.replace(type, "");
				}

				var min = input.getAttribute("min");
				min = min !== undefined ? parseFloat(min) : null;
				var max = input.getAttribute("max");
				max = max !== undefined ? parseFloat(max) : null;

				input.addEventListener("blur", function() {
					var value = this.value;
					if(value === null || value === undefined || value === "") {
						if(option.default !== undefined) {
							//tool.setValue(_this, defaultValue);
							_this.$emit("input", defaultValue);
						}

						return;
					}
					var flag;

					switch(type) {
						case "d": //整数
							var val = value;
							value = parseInt(value);
							flag = !isNaN(value) && !isNaN(val) && tool.min(min, value) && tool.max(max, value);
							if(flag === false) {
								value = defaultValue;
							}

							break;
						case "c": //会计格式
							var val = tool.parseNum(value);
							value = parseFloat(val);
							flag = !isNaN(value) && !isNaN(val) && tool.min(min, value) && tool.max(max, value);
							if(flag === false) {
								value = defaultValue === undefined ? "" : (defaultValue + "");
							} else {
								value = tool.moneyNum(value, place) + "";
							}
							break;
						default: //浮点数
							var returnFlag, opt, fn = _this.formatExtendFn;

							//扩展函数
							if(typeof fn === "function") {
								opt = {
									...option,
									min: min,
									max: max,
									place: place,
								};

								returnFlag = fn(value, tool, opt).call(_this);
								if(returnFlag === true) {
									return;
								}
							}

							if(type && type != "f") {
								return;
							}
							var val = value;
							place = place === undefined ? 2 : place;
							value = parseFloat(value);
							flag =!isNaN(value) && !isNaN(val) && tool.min(min, value) && tool.max(max, value);
							if(flag === false) {
								value = defaultValue;
							} else {
								value = tool.decimalNum(value, place);
							}
					}

					_this.$emit("input", value);

					//tool.setValue(_this, value);
				});

			}
		}
	}

}

export default inputFormatMixin