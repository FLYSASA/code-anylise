var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var utils = require('../../utils')

// 获取个人信息
router.get('/:userid', function (req, res) {
    var users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../json/example/user.json')))
    if (req.query.hasOwnProperty('pageIndex') && req.query.hasOwnProperty('pageSize')) {
        return res.json(utils.getPageData(req, users))
    } else {
        var user = users.filter(function (user) {
            return req.params.userid === user.UserId
        })
    }

    if (user.length === 0) {
        return res.json(utils.getResData(null, -1, '不存在当前用户'))
    } else {
        return res.json(utils.getResData(user[0], 0, '获取数据成功'))
    }
})

// 更新用户
router.put('/:userid', function (req, res) {
    var users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../json/example/user.json')))
    var user = users.filter(function (user) {
        return req.params.userid === user.UserId
    })

    if (user.length === 0) {
        return res.json(utils.getResData(null, -1, '不存在当前用户'))
    } else {
        return res.json(utils.getResData(req.body, 0, '更新用户成功'))
    }
})

router.delete('/:userid', function (req, res) {
    var users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../json/example/user.json')))
    var user = users.filter(function (user) {
        return req.params.userid === user.UserId
    })

    if (user.length === 0) {
        return res.json(utils.getResData(null, -1, '不存在当前用户'))
    } else {
        return res.json(utils.getResData({}, 0, '删除用户成功'))
    }
})

module.exports = router
