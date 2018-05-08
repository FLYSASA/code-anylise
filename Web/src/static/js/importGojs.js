let fns, isSucess;

function scriptLoad() {
	let script = document.createElement('script');
	let scriptPath = "/static/gojs/go.min.js";

	script.onload = function() {
		isSucess = true;
		if(typeof fns === "function") {
			fns();
		}
	}

	script.onerror = function() {
		isSucess = false;
	}

	script.src = scriptPath;
	document.body.appendChild(script);
}

scriptLoad();

export default {
	init(callback) {
		if(isSucess === true && typeof callback === "function") {
			callback();
		} else {
			fns = callback;
		}
	}
}