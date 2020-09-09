const utils = {
  isString (value) {
    return value && typeof value === 'string'
  },
  isObject (value) {
    return value && typeof value === 'object'
  },
  isFunction (value) {
    return value && typeof value === 'function'
  },
  isArray (value) {
    return Array.isArray(value)
  },
  // 文件夹或者文件路径 模糊匹配到关键字
  isChunkOrPathMatchKeyWords (chunkOrPath, keys) {
    let isMatch = false
    keys.forEach(key => {
      if (chunkOrPath.indexOf(key) !== -1) {
        isMatch = true
      }
    })
    return isMatch
  }
}

module.exports = utils