const path = require('path')
module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
    login: path.resolve(__dirname, 'src/login.js'),
    debug: path.resolve(__dirname, 'src/debug.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: []
}
