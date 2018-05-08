import helper from './helper'
import glob from 'glob'
import path from 'path'

const itsConfig = []
var files = glob.sync('./test/api/**/*.spec.js')

files.map(function (file) {
    var its = require(path.resolve(__dirname, '../../' + file))
    itsConfig.push.apply(itsConfig, its.default)
})

helper.test(itsConfig)
