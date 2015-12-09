module.exports = function (source, map) {
    this.cacheable && this.cacheable()

    // 得到了入口文件的绝对位置
    var entryAbsolutePath = this.options.context + '/'

    // 得到入口文件文件夹路径
    var entryAbsoluteFolderPathArray = entryAbsolutePath.split('/')
    entryAbsoluteFolderPathArray.pop()

    var namespace = this.resourcePath.replace(entryAbsoluteFolderPathArray.join('/') + '/', '').replace(/\.(js|jsx)/, '')

    var nameArray = namespace.split('/')
    nameArray.pop()
    var nameStr = nameArray.join('-')

    // 匹配 namespace
    source = source.replace(/(_namespace)/g, function (text, $1) {
        return nameStr
    })

    this.callback(null, source, map)
}