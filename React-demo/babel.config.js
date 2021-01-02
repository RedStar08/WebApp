// 配置 babel 语法加载器的 语法和插件
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
}
// 1.需要安装 babel 系列的包
// A.安装 babel 转换器
//      npm install babel-loader @babel/core @babel/runtime -D
// B.安装 babel 语法插件包
//      npm install @babel/preset-env @babel/preset-react -D
// C.安装 babel 运行插件包
//      npm install @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D
// 2. 在项目根目录创建并配置babel.config.js文件
// module.exports = {
//   presets: ['@babel/preset-env', '@babel/preset-react'],
//   plugins: [
//     '@babel/plugin-transform-runtime',
//     '@babel/plugin-proposal-class-properties'
//   ]
// }
// 3. 配置规则：更改webpack.config.js的module中的rules数组
// { test: /\.js|jsx$/, use: 'babel-loader', exclude: 'node_modules' }
// 4. 几点说明：
// presets 指的是高级语法和低级语法之间的对应关系，可以理解为字典
// loader  指的是转换器，单纯将高级语法转换为低级语法，不知道高级语法与低级语法之间的对应关系
