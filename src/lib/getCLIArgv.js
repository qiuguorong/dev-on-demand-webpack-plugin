const yargs = require('yargs')

// 兼容npm run dev -- --page=keyword
// 兼容npm run dev -- -p=keyword
// 兼容npm run dev -p=keyword
// 兼容npm run dev keyword
const getCLIArgv = function (key, alias) {
  const argv = yargs.alias(key, alias).argv
  let _argvPage = ''
  if (typeof(argv[key]) === 'string' || typeof(argv[key]) === 'number') {
    _argvPage = argv[key]
  } else if(argv._.length > 0) {
    _argvPage = argv._[0]
  } else if(argv['=']) {
    _argvPage = argv['=']
  }
  return _argvPage + ''
}

module.exports = getCLIArgv
