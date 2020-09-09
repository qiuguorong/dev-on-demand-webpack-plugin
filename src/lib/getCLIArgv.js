const yargs = require('yargs')
const argv = yargs.argv

// 兼容npm run dev:part -- --page=keyword
// 兼容npm run dev:part -- -p=keyword
// 兼容npm run dev:part -p=keyword
// 兼容npm run dev:part keyword
const getCLIArgv = function (key, alias) {
  yargs.alias(alias, key)
  let _argvPage = ''
  if (typeof(argv[key]) === 'string') {
    _argvPage = argv[key]
  } else if(argv._.length > 0) {
    _argvPage = argv._[0]
  } else if(argv['=']) {
    _argvPage = argv['=']
  }
  return _argvPage
}

module.exports = getCLIArgv