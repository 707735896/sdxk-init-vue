## 环境准备

安装node 安装cnpm

``` bash
cnpm install
```

## 开发环境

``` bash
npm run dev
```

## 正式环境

``` bash
npm run build
```


## 打包
### 内网打包
 `router.js` `mode` 使用 `history` 模式

 `webpack.prod.condig.js` 中的 `publicPath` 改为 `/`s

### 教育局打包
  `router.js` `mode` 注释掉

  `webpack.prod.condig.js` 中的 `publicPath` 改为 `/dist/`
