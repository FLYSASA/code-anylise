var config = require('../config')
var express = require('express')
var app = express()
var mockRoutes = require('../mock/routes')
var port = process.env.PORT || config.dev.port
var serverIPs = getIPAdress()

function getIPAdress () {
    var interfaces = require('os').networkInterfaces()
    var ips = []

    for (var devName in interfaces) {
        var iface = interfaces[devName]
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i]
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                ips.push(alias.address)
            }
        }
    }

    return ips
}

// 注册mock路由 /mock
app.use('/mock', mockRoutes)

console.log('> Starting api mock server: \n')
serverIPs.forEach(function (ip) {
    console.log('> Listening at http://' + ip + ':' + port + '\n')
})

app.listen(port)