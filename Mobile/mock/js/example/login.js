
module.exports = function (req, res, nowrap) {
    var utils = require('../../utils.js')
    // 获取请求头信息
    var auth = req.get('authorization')
    // 简单效验：判断是否带authorization请求头
    if (!auth) {
        return res.status(403).send('未授权访问').end()
    }

    // req.body 获取请求主体信息（经过'body-parser'处理，默认会将json转成对象）
    if (req.body.username === 'demo' && req.body.password === '123456') {
        return res.json({
            access_token: 'uL_W8c0ifhWeFqoDCuc0QrjWzYVZdXp62zgsxJwq7iFzr1cM32FbITmBxrtm_Q8jF18ZdvY-ZL9f7EHuwB76Woqsy0axtLNgZYNSO9fs3EvNgAxsEEnprr2fa1kXn0Tidtml5mSuNIVjCFHYwddk1LXYKxc27Mi0yMuIEpTtgdXTaaYAuMZl2huCLvZzJgpLVqKIcD29P134fErhvi9YguYs5iZigrPUEHlr2bUV5KCe6FNj5STYDvZAwABn3iEMMyermAy9N1kJrGRU2bjTGLxn_z86UpMX9jUDbMQVpJd3C5gzBgY9itgiD_nbW3TwxTbg0zs1yaHhjSocasj0D9ys23XEh6KQyfg7EOvo9oWig1Dz79T8TlRArb-bNppoIGg5LOFdhtT0isSvPagiIw',
            expires_in: 17999,
            token_type: 'bearer',
            userId: 'demo'
        })
    } else {
        return res.json(utils.getResData(null, -1, '账号或密码错误'))
    }
}
