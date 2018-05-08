// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var prodEnv = require('./prod.env')
if (process && process.argv && process.argv.length > 2 && process.argv[2] === 'mock') {
    prodEnv.BUILD_MOCK = '"true"'
}

module.exports = {
    build: {
        env: prodEnv,
        index: path.resolve(__dirname, '../dist/index.html'),
        srcPath: path.resolve(__dirname, '../src'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionHtmlMinify: false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
        // 执行npm run build:mock命令后mock接口指向该地址
        mockApiUrl: 'http://172.56.10.62:8087'
    },
    dev: {
        env: require('./dev.env'),
        port: 8087,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            // 拦截api路径到指定目标服务
            // '/mock/Authorize': {
            //     target: 'http://172.56.10.62:8040',
            //     pathRewrite: {
            //         '^/mock': ''
            //     }
            // },
            // '/mock/api/roles': {
            //     target: 'http://172.56.10.62:8040',
            //     pathRewrite: {
            //         '^/mock': ''
            //     }
            // }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
