var webpack = require('webpack')
var path = require('path')
var devEnv = require('../config/test.env')
var webpackConfig = {
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, '..', 'src') // resolve('src')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': devEnv
        })
    ],
    devtool: '#inline-source-map'
}

// shared config for all unit tests
module.exports = {
    frameworks: ['jasmine'],
    files: [
        '../test/unit/index.js'
    ],
    preprocessors: {
        '../test/unit/index.js': ['webpack', 'sourcemap', 'coverage']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
        noInfo: true
    },
    plugins: [
        'karma-jasmine',
        'karma-jasmine-ajax',
        'karma-mocha-reporter',
        'karma-coverage',
        'karma-sourcemap-loader',
        'karma-webpack'
    ]
}
