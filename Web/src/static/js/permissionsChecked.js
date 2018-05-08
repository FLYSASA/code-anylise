export default function(router, that) {

	function checked(to, from, next) {
		if(!sessionStorage["access_token"]) {
			next(globalConfig.loginUrl);
			return;
		}

		/*setTimeout(function() {
			var dom = document.querySelector(".dialog-min-box");
			if(dom) {
				dom.innerHTML = "";
			}
		}, 10);*/

		if(to.path == "/403" || to.path == "/404") {
			next();
			return;
		}

		if(!to.query.menuId && to.path == "/") {
			sessionStorage["permissions"] = "";
			next();
			return;
		}

		if(!to.query.menuId) {
			sessionStorage["permissions"] = "";
			next("/");
			return;
		}

		that.$get("/api/plat/users/" + globalConfig.userId + "/menuResources", {
			menuId: to.query.menuId
		}, function(res) {
			sessionStorage["permissions"] = JSON.stringify(res || {});
			if(res.View === true) {
				next();
			} else {
				next("/403");
			}
		});
	}

	//点击路由切换
	/*router.beforeEach(function(to, from, next) {
		checked(to, from, next);
		console.log(2)
	});*/

	//直接从url输入或者刷新进入
	router.beforeResolve(function(to, from, next) {
		checked(to, from, next);
	});
}