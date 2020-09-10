const path = require('path')
const glob = require('glob')
const child_process = require('child_process')

module.exports = {
  getDistName: function (name = 'dist') {
    return `${name}${Math.ceil(Math.random() * 10000)}`
  },
  getDistChunks: function (dir) {
    const chunks = []
    const files = glob.sync(`${__dirname}/${dir}/*.js`)
    files.forEach(file => {
      chunks.push(path.basename(file, '.js'))
    })
    return chunks
  },
  cleanDist: function (name = 'dist') {
    const dirs = glob.sync(`${__dirname}/${name}**/`)
    dirs.forEach(dir => {
      child_process.exec(`rm -rf ${dir}`)
    })
  }
}
