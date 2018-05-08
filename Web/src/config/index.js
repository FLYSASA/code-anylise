var path = require('path')
function excludeFile(){
	if(process.env.NODE_ENV === 'production'){
		return ["demo","integrate","../static/external/gojs"];
	}
	
	return [];
}

module.exports = {
    build: {
        // 需要编译的页面key（发布时不需要配置，一般在开发时配置，实现更快速编译和调试页面）
        includePages: [/* 'pom/plan' */],
        // 不编译和发布的目录（pages的子目录，一般用于按需发布）
        excludeDirs: [].concat(excludeFile()),
        favicon: path.resolve(__dirname, '../static/images/favicon.ico')
    }
}
