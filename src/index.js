const SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin')
const MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin')
const Utils = require('./lib/utils')
const DefaultOptions = require('./lib/default-options')
const getCLIArgv = require('./lib/getCLIArgv')

const itemToPlugin = (context, item, name) => {
	if (Utils.isArray(item)) {
		return new MultiEntryPlugin(context, item, name)
	}
	return new SingleEntryPlugin(context, item, name)
}

const getFilterEntry = (entry, keywords) => {
  const filterEntry = {}
  Object.keys(entry).forEach(chunk => {
    if (Utils.isChunkOrPathMatchKeyWords(chunk, keywords)) {
      filterEntry[chunk] = entry[chunk]
    }
  })
  return filterEntry
}

class devOnDemandWebpackPlugin {

  constructor (options) {
    this.options = Object.assign({}, DefaultOptions, options)
  }

  apply (compiler) {
    // entry String | Array | Object | Function
    // entryOption为SyncBailHook
    // 返回undefined，则走「EntryOptionPlugin」的默认处理
    // 返回true，则中断webpack内置「EntryOptionPlugin」对entry的处理，由插件进行处理
    compiler.hooks.entryOption.tap('devOnDemandWebpackPlugin', (context, entry) => {
      const { defaultKeywords, separator, command } = this.options
      const argv = getCLIArgv(command.argv, command.alias)
      if (!argv || !Utils.isObject(entry)) {
        return undefined
      }
      const keywords = argv.split(separator).concat(defaultKeywords)
      const filterEntry = getFilterEntry(entry, keywords)
      const filterKeys = Object.keys(filterEntry)
      if (filterKeys.length === 0) {
        return undefined
      }
      filterKeys.forEach(chunk => {
        itemToPlugin(context, filterEntry[chunk], chunk).apply(compiler)
      })
      // TODO 过滤「html-webpack-plugin」，预计构建速度可以提升1-2秒
      return true
    })
  }
}

module.exports = devOnDemandWebpackPlugin
