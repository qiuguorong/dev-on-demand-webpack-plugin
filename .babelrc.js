module.exports = function(api) {
  api.cache(false)

  const presets = [
    [
      '@babel/preset-env', {
        targets: {
          node: '8.0.0'
        }
      }
    ]
  ]

  const plugins = []

  return {
    presets,
    plugins,
    comments: false
  }
}
