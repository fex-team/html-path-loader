module.exports = function (source, map) {
    this.cacheable && this.cacheable()

    // 找到入口文件绝对位置
    var entryRelativePath = ''
    if (Object.prototype.toString.call(this.options.entry) === '[object Array]') {
        for (var value of this.options.entry) {
            if (value.indexOf('webpack') === -1) {
                entryRelativePath = value
            }
        }
    } else {
        entryRelativePath = this.options.entry
    }

    // 得到了入口文件的绝对位置
    var entryAbsolutePath = this.options.context + entryRelativePath.replace(/^\./g, '')

    // 得到入口文件文件夹路径
    var entryAbsoluteFolderPathArray = entryAbsolutePath.split('/')
    entryAbsoluteFolderPathArray.pop()

    var namespace = this.resourcePath.replace(entryAbsoluteFolderPathArray.join('/') + '/', '').replace(/\.(js|jsx)/, '')

    var nameArray = namespace.split('/')
    nameArray.pop()
    var nameStr = nameArray.join('-')

    // 匹配 namespace
    source = source.replace(/(_namespace)/g, function (text, $1) {
        return 'className="' + nameStr + '"'
    })

    this.callback(null, source, map)
}