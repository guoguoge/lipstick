const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const vuxLoader = require("vux-loader");

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production' ?
  './' :
  '/'

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const Version = new Date().getTime();

module.exports = {

  css: { // 配置css模块
    loaderOptions: { // 向预处理器 Loader 传递配置选项
      less: { // 配置less（其他样式解析用法一致）
        javascriptEnabled: true // 设置为true
      }
    }
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('#', resolve('src/components'))
      .set('$', resolve('src/assets'))
      .set('~', resolve('src/mixins'))
  },

  configureWebpack: config => {
    vuxLoader.merge(config, {
      plugins: [{
          name: 'vux-ui'
        },
        {
          name: 'duplicate-style'
        },
        {
          name: 'less-theme',
          path: 'src/style/theme.less'
        }
      ]
    })

    {
      [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, //console
              drop_debugger: false,
              pure_funcs: ["console.log"] //移除console
            }
          }
        })
      ];
    }

    if (IS_PROD) {
      const plugins = [];
      plugins.push(
        new CompressionWebpackPlugin({
          filename: `[path].${Version}.gz[query]`,
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
      config.plugins = [
        ...config.plugins,
        ...plugins
      ];
      // config.output = {
      //   filename: `[path].[chunkhash].${Version}.js`,
      //   chunkFilename: `[path].[chunkhash].${Version}.js`,
      // }
    }

    // config.output = {
    //   path: path.resolve(__dirname, './assets'),
    //   filename: `[path].[chunkhash].${Version}.js`,
    //   publicPath: '../assets',
    // }
  },
  css: {
    extract: {
      filename: 'assets/css/[name].[chunkhash].' + Version + '.css',
      chunkFilename: 'assets/css/[id].[chunkhash].' + Version + '.css'
    }
  },
  devServer: {
    port: 1314, // 端口号
    // host: 'localhost',
    // https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      '/devApi': { //测试环境API 已经做过跨域处理
        target: 'http://129.28.67.91/Hmzk/public/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/devApi': ''
        },
        emulateJSON: true,
        // headers: {
        //   'content-type': 'formData'
        // }
      },
      // '/foo': {
      //   target: '<other_url>'
      // }
    }, // 配置多个代理
  },
  // productionSourceMap: true,

  baseUrl: BASE_URL,
  lintOnSave: false,
  // outputDir: path.resolve(__dirname, '../lipstick/assets'),
  outputDir: 'lipstick',
  // assetsDir: 'assets',
  pluginOptions: { // 第三方插件配置

  },
  runtimeCompiler: true,
  productionSourceMap: false,
}
