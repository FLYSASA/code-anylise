
var getResData = function (data, code, msg) {
    return {
        Code: code || 0,
        Data: data,
        Message: msg || ''
    }
}

exports.getResData = getResData

exports.getPageData = function (req, data) {
    data = data || []

    var dataLen = data.length
    var pageSize = parseInt(req.query.pageSize, 10)
    var pageIndex = parseInt(req.query.pageIndex, 10)
    var start = pageIndex === 1 ? 0 : (pageIndex - 1) * pageSize

    // 取最后一页
    if (start > dataLen) {
        pageIndex = Math.ceil(dataLen / pageSize)
        start = (pageIndex - 1) * pageSize
    }

    var end = pageIndex * pageSize

    if (end > dataLen) {
        end = dataLen
    }

    return getResData({
        FinalPageIndex: Math.ceil(dataLen / pageSize),
        Rows: data.slice(start, end),
        Total: dataLen
    }, 0, '获取数据成功')
}
