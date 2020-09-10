const path = require('path')
const webpack = require('webpack')
const { cloneDeep } = require('lodash')
const yargs = require('yargs')
const configBase = require('./webpack.config.base')
const DevOnDemand = require('../src/index')
const { getDistName, getDistChunks, cleanDist } = require('./shared')

const createCompiler = function (options = {}) {
  const outputDir = getDistName()
  const config = cloneDeep(configBase)
  config.output.path = path.resolve(__dirname, outputDir)
  config.plugins.push(new DevOnDemand(options))
  const compiler = webpack(config)
  return { outputDir, compiler }
}

afterAll(() => {
  cleanDist()
})

test('npm run test', done => {
  const { compiler, outputDir } = createCompiler()
  compiler.run(() => {
    const chunks = getDistChunks(outputDir)
    expect(chunks).toEqual(['debug', 'index', 'login'])
    done()
  })
})

test('npm run test --page=login', done => {
  yargs.parse(['--page', 'login'])
  const { compiler, outputDir } = createCompiler()
  compiler.run(() => {
    const chunks = getDistChunks(outputDir)
    expect(chunks).toEqual(['login'])
    done()
  })
})

test('npm run test -p=login', done => {
  yargs.parse(['-p', 'login'])
  const { compiler, outputDir } = createCompiler()
  compiler.run(() => {
    const chunks = getDistChunks(outputDir)
    expect(chunks).toEqual(['login'])
    done()
  })
})

test('npm run test login', done => {
  yargs.parse(['login'])
  const { compiler, outputDir } = createCompiler()
  compiler.run(() => {
    const chunks = getDistChunks(outputDir)
    expect(chunks).toEqual(['login'])
    done()
  })
})

