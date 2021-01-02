// 引入路径模块
const path = require('path')
// 引入 html 插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入自动清理 dist 目录的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development', // 'development' or 'production'
  entry: './src/index.js',
  output: {
    // 进行强缓存时，可以通过文件名 name + contenthash 值来区分版本
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, 'dist')
  },
  /* 
  source-map:一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误)
  开发环境一般用 'eval-source-map'
  生产环境一般用 'cheap-module-source-map'
  */
  devtool: 'eval-source-map',
  // 配置 webpack-dev-server
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist')
    // compress: true
    // 将托管的公共资源路径由 '/' 改为 '/assets/'
    // publicPath: '/assets/'
  },
  // 配置打包文件对应的 loader
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                compileType: 'module',
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          },
          { loader: 'less-loader' }
        ]
      },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  // 配置打包需要用到的 plugins
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html'
    })
  ],
  resolve: {
    // 表示以下几种后缀的文件会自动补全(按顺序查找)
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }
}
/**
 * webpack 优化
 * 1.树摇
 * tree shaking:去除无用代码
 * 前提 - 必须使用ES6模块化 - 开启production环境
 * 作用:减少代码体积
 * // 通过 sideEffects 过滤不需要检查的文件
 * 'sideEffects': ['*.css']
 * 'sideEffects': false 表示全部进行树摇
 *
 * 2.配置 webpack-dev-server
 * webpack-dev-server 在编译之后不会写入到任何输出文件。
 * 而是将 bundle 文件保留在内存中，然后将它们 serve 到 server 中(托管到内存中)
 * 就好像它们是挂载在 server 根路径上的真实文件一样。
 * 默认为：http://localhost:8080/
 * 可以设置 publicPath: '/assets/' 修改为：http://localhost:8080/assets/
 *
 * HMR(hot module replacement) 模块热更新功能
 *   样式文件：可以开启热更新
 *   JS文件：默认不能使用热更新 (只能处理非入口文件)
 *       解决方法：
 *       if(module.hot) {
 *          module.hot.accept('./demo.js', () => {
 *            // 监听 demo.js 并执行回调函数
 *          })
 *       }
 *   HTML文件：默认不能使用热更新 (不需要开启热更新)
 *       解决方法：修改entry入口文件，用数组添加需要热更新的HTML文件
 *
 * 3.拆分大文件(类似 vue 的路由懒加载)
 * // 单文件入口
 * entry: './src/index.js',
 * 单入口文件可以通过 import 动态导入语法 将某个文件单独打包
 * import('/* webpackChunkName: 'test'* /' ./test')
 * .then((result) =>{
 *   //文件加载成功~
 *   console.log(result);
 * }).catch((error) => {
 *   console.log('文件加载失败~');
 * });
 *
 * // 多文件入口
 * entry: {
 *   main: './src/index.js',
 *   demo: './src/demo.js'
 * },
 * // 多入口文件可以将打包之后的文件进行拆分 (多页面应用)
 * // 可以将node_modules中代码单独打包一个chunk最终输出
 * optimization: {
 *   splitChunks: {
 *     chunks: 'all'
 *   }
 * },
 *
 * 4.缓存 (需服务器开启缓存)
 * hash -> chunckhash -> contenthash
 * hash: 每次打包都会有一个 hash
 * chunckhash: 同一个入口属于同一个 chunck
 * contenthash: 类似于文件的 hash 内容不同那么 hash 就不同(推荐)
 * output: {
 *   // 进行强缓存时，可以通过文件名 name + contenthash 内容hash值来区分版本
 *   filename: 'js/[name].[contenthash:10].js',
 *   path: path.resolve(__dirname, 'dist')
 * },
 *
 * 5.增强调试
 * source-map:一种提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误)
 * 开发环境一般用 'eval-source-map'
 * 生产环境一般用 'cheap-module-source-map'
 * devtool: 'eval-source-map',
 *
 * 6.开启 oneOf 规则 (只匹配一个 loader)
 * webpack 打包文件时会依次匹配 loader 进行打包处理
 * rules: [
 *    {
 *      // 只会加载 以下 loder 的其中一个 (不能配置相同的匹配规则)
 *      oneOf: [
 *        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
 *        { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
 *        { test: /\.js$/, use: 'babel-loader', exclude: '/node_modules' }
 *      ]
 *    }
 *  ]
 *
 * 7.PWA(Progressive Web App)技术
 * PWA全称Progressive Web App，即渐进式WEB应用。
 * 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏
 * 实现离线缓存功能，即使用户手机没有网络，依然可以使用一些离线功能
 * 实现了消息推送
 * 通过 workbox-webpack-plugin 插件实现
 *
 * 8.多线程打包(安装 thread-loader 并结合 babel-loader 使用)
 *
 * 9. externals 配置 忽略打包的文件
 * externals: {
 *  // 可利用CDN 'jQuery'为包名
 *  jquery: 'jQuery'
 * }
 *
 */
