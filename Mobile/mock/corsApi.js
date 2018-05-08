var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var uitls = require('./utils')
var bodyParser = require('body-parser')
var Mock = require('mockjs')
// var multer = require('multer')

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(multer()) // for parsing multipart/form-data

// 该路由使用的中间件
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS') {
        return res.send(200).end()
    }

    // mock参数处理
    if (req.query.hasOwnProperty('mock')) {
        var mockUrl = path.resolve(__dirname, '../' + req.query.mock)
        var reg = /(\.json|\.js)(\?nowrap)?$/
        var result = mockUrl.match(reg)
        var isNoWrap = false
        if (result) {
            isNoWrap = !!result[2]
            if (isNoWrap) {
                mockUrl = mockUrl.replace('?nowrap', '')
            }
        }

        if (fs.existsSync(mockUrl)) {
            var isPageReq = req.query.hasOwnProperty('pageSize') && req.query.hasOwnProperty('pageIndex')
            if (result.length > 0) {
                var resData
                if (result[1] === '.json') {
                    resData = JSON.parse(fs.readFileSync(mockUrl))
                } else {
                    var dataModel = require(mockUrl)
                    try {
                        if (typeof dataModel === 'function') {
                            dataModel = dataModel(req, res, isNoWrap)

                            if (typeof dataModel === 'undefined') {
                                return res.status(500).json(uitls.getResData(null, -1, mockUrl + '返回值必须是mock数据或者res对象'))
                            } else if (dataModel === res && res.headersSent) {
                                return res
                            }
                        }

                        resData = Mock.mock(dataModel)

                        if (resData.hasOwnProperty('Data')) {
                            resData = resData.Data
                        }
                    } catch (err) {
                        return res.status(500).json(uitls.getResData(err, -1, mockUrl + '：mock生成数据出现异常，请检查mock占位符是否正确'))
                    }
                }

                if (isPageReq) {
                    return res.json(uitls.getPageData(req, resData)).end()
                } else {
                    return res.json(isNoWrap ? resData : uitls.getResData(resData, 0, '请求成功')).end()
                }
            } else {
                return res.status(404).json(uitls.getResData(null, -1, '暂时只支持js和json文件'))
            }
        } else {
            return res.status(404).json(uitls.getResData(null, -1, '不存在指定json或js')).end()
        }
    }

    next()
})

// example路由
router.use('/example', require('./routes/example'))

module.exports = router
