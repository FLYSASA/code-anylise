var express = require('express')
var router = express.Router()

router.use('/', require('./corsApi.js'))

module.exports = router
