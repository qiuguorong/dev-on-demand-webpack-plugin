// ESLint中文注释：
// https://gist.github.com/rswanderer/29dc65efc421b3b5b0442f1bd3dcd046

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2017,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'prettier'
  ],
  rules: {}
}
