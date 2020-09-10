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

class DevOnDemandWebpackPlugin {

  constructor (options) {
    this.options = Object.assign({}, DefaultOptions, options)
  }

  apply (compiler) {
    // entry String | Array | Object | Function
    // entryOption为SyncBailHook
    // 返回undefined，则走「EntryOptionPlugin」的默认处理
    // 返回true，则中断webpack内置「EntryOptionPlugin」对entry的处理，由插件进行处理
    const entryOptionHook = (context, entry) => {
      const { defaultKeywords, separator, command } = this.options
      const argv = getCLIArgv(command.key, command.alias)
      if (!argv || !Utils.isObject(entry)) {
        return undefined
      }
      const keywords = argv.split(separator).concat(defaultKeywords)
      const filterEntry = Utils.getFilterEntry(entry, keywords)
      const filterKeys = Object.keys(filterEntry)
      if (filterKeys.length === 0) {
        return undefined
      }
      filterKeys.forEach(chunk => {
        itemToPlugin(context, filterEntry[chunk], chunk).apply(compiler)
      })
      // TODO 过滤「html-webpack-plugin」，预计构建速度可以提升1-2秒
      return true
    }

    if (compiler.hooks && compiler.hooks.entryOption) {
      compiler.hooks.entryOption.tap(this.constructor.name, (context, entry) => {
        return entryOptionHook(context, entry)
      })
    } else {
      compiler.plugin('entry-option', (context, entry) => {
        return entryOptionHook(context, entry)
      })
    }
  }
}

module.exports = DevOnDemandWebpackPlugin
