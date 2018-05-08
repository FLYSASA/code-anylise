var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var webpackTool = require('./webpack.tool')
var vueLoaderConfig = require('./vue-loader.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: webpackTool.entries,
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        chunkFilename: '[name]-[id].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': config.build.srcPath,
            // 2. 定义别名和插件位置
      		'jquery': 'jquery' 
        }
    },
    module: {
        rules: [
           /* {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [config.build.srcPath],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },*/
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [config.build.srcPath]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('images/[name].[hash:8].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
                }
            },
            {
				test: /\.less/,
				loader: [
					'style-loader',
					'css-loader',
					/*{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer({
									browsers: ['iOS >= 7', 'Android >= 4.0'],
									remove: false
								})
							]
						}
					},*/
					'less-loader'
				],
			}
        ]
    },
    plugins: [
        ...webpackTool.commons.map(conf => new webpack.optimize.CommonsChunkPlugin(conf)),
        ...webpackTool.htmls.map(conf => new HtmlWebpackPlugin(conf)),
        // 3. 配置全局使用 jquery
    	new webpack.ProvidePlugin({
	        $: "jquery",
	        jQuery: "jquery",
	        jquery: "jquery",
	        "window.jQuery": "jquery"
	    })
    ]
}
