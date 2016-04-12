var path = require('path')

module.exports = function (source, map) {
    this.cacheable && this.cacheable()

    // 对于 node_modules 里面的文件不能做处理
    if (/node_modules/.test(this.resourcePath)) {
        this.callback(null, source, map)
        return false
    }

    // 找到入口文件绝对位置
    if (Object.prototype.toString.call(this.options.entry) === '[object Array]') {
        for (var value of this.options.entry) {
            if (/[a-zA-Z-\.\/]+(js|jsx)$/.test(value)) {
                var entryPath = path.resolve(this.options.context + path.sep + value)
                if (entryPath === this.resourcePath) {
                    this.callback(null, source, map)
                    return false;
                }
            }
        }
    }

    // 得到了入口文件的绝对位置
    var entryAbsolutePath = this.options.context + path.sep

    // 得到入口文件文件夹路径
    var entryAbsoluteFolderPathArray = entryAbsolutePath.split(path.sep)
    entryAbsoluteFolderPathArray.pop()

    var namespace = this.resourcePath.replace(entryAbsoluteFolderPathArray.join(path.sep) + path.sep, '').replace(/\.(js|jsx)/, '')

    var nameArray = namespace.split(path.sep)
    nameArray.pop()
    for(var i=0; i<nameArray.length; i++) {
        nameArray[i] = nameArray[i].replace('-' , '_')
    }
    var nameStr = nameArray.join('-')

    // 匹配 namespace
    source = source.replace(/(_namespace)/g, function (text, $1) {
        return nameStr
    })

    this.callback(null, source, map)
}