# dev-on-demand-webpack-plugin

webpack多入口按需构建插件，可在多入口时指定页面运行，提升开发阶段编译速度

# 安装

```shell
npm install dev-on-demand-webpack-plugin --save-dev
```

# 使用

webpack.config.js配置

```js
const DevOnDemand = require('dev-on-demand-webpack-plugin')
module.exports = {
  plugins: {
    new DevOnDemand()
  },
}
```

命令行运行，其中一个

```shell
npm run dev -p=keyword
npm run dev --page=keyword
npm run dev -- -p=keyword
npm run dev -- --page=keyword
npm run dev keyword
npm run dev -p=keyword1,keyword2
```

# 参数

## defaultKeywords

类型：`Array` 默认值：`[]`

默认关键字数组，用于多页面必须启动的页面

webpack.config.js配置
```js
module.exports = {
  plugins: {
    new DevOnDemand({
      defaultKeywords: ['index', 'login']
    })
  },
}
```

## separator
类型: `String` 默认值：`,`

关键字分隔符

webpack.config.js配置
```js
module.exports = {
  plugins: {
    new DevOnDemand({
      separator: '|'
    })
  },
}
```

运行命令行
```shell
npm run dev -p=keyword1|keyword2
```

## command

类型：`Object` 默认值：`{ key: 'p', alias: 'page' }`

CLI命令行参数与别名

webpack.config.js配置
```js
module.exports = {
  plugins: {
    new DevOnDemand({
      command: {
        key: 'o',
        alias: 'options'
      }
    })
  },
}
```

运行命令行
```shell
npm run dev -o=keyword
npm run dev --options=keyword
```
