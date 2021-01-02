// 引入 react react-dom 包
// 1.  在 React 学习中，需要安装 两个包 react react-dom
import React from 'react' // 创建组件、虚拟DOM、生命周期
import ReactDOM from 'react-dom' // 渲染创建好的组件、虚拟DOM

console.log('ok')

ReactDOM.render(
  <div>
    <h1>this is a h1</h1>
  </div>,
  document.querySelector('#demo')
)
