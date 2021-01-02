// 引入 react react-dom 包
// 1.  在 React 学习中，需要安装 两个包 react react-dom
import React from 'react' // 创建组件、虚拟DOM、生命周期
import ReactDOM from 'react-dom' // 渲染创建好的组件、虚拟DOM

console.log('ok')

// 2. 在 react 中，只能使用 React 提供的 JS API 来创建创建 DOM 元素，不能直接像 Vue 中那样，手写 HTML 元素
// React.createElement(元素类型, 属性对象, 元素子节点, 其他子节点) 方法，用于创建 虚拟DOM 对象，它接收 3个及以上的参数
// 参数1： 是个字符串类型的参数，表示要创建的元素类型
// 参数2： 是一个属性对象，表示 创建的这个元素上，有哪些属性
// 参数3： 从第三个参数的位置开始，后面可以放好多的虚拟DOM对象，这写参数，表示当前元素的子节点
let h1 = React.createElement('h1', null, 'this is a h1')
let div = React.createElement('div', { className: 'demo', id: 'mydiv' }, 'this is a div', h1)
// 上述两行代码创建了如下的 DOM
// <div class="demo" id="mydiv">
//   this is a div
//   <h1>this is a h1</h1>
// </div>

// ReactDOM.render('要渲染的虚拟DOM元素', '要渲染到的位置')
// 注意：ReactDOM.render() 方法的第二个参数，和vue不一样，不接受 "#app" 这样的字符串，而是需要传递一个原生的 DOM 对象
ReactDOM.render(div, document.querySelector('#app'))
// 由于React官方发现，手写 JS 代码创建元素，十分的繁琐，于是提出了一套 JSX 语法规范(XML in JS)
// JSX 语法规范可以在 JS 文件中，书写类似于 HTML 那样的代码，快速定义虚拟DOM结构
// 但是 JSX 内部在运行的时候，也是先把类似于 HTML 这样的标签代码，转换为了 React.createElement() 的形式
// JSX 本质是一个对程序员友好的语法糖，不是直接把 HTML 标签渲染到页面上
// 而是先转换成 React.createElement() 这样的JS代码，再渲染到页面中；

// 如果要直接使用 React JSX 语法，需要先安装 babel 语法转换工具 步骤参考 babel.config.js
const title = '999'
const name = 'redstar08'
// 直接把 <h1></h1>当成一个对象看待 本质上是 React.createElement() 产生的
// 将 h 看成是对象数组
const h_arr = ['this is a jsx h2', 'this is a jsx h3', 'this is a jsx h4', 'this is a jsx h5']
// 通过 {} 对变量进行赋值 同时 {} 可以包含代码块
// 在 JSX 语法中，可以在大括号内放置任何有效的 JavaScript 表达式
// JSX 里的 class 变成了 className，for 变成了 htmlFor，而 tabindex 则变为 tabIndex 同时标签必须闭合
const jsx_div = (
  <div className="jsx_div" id="jsx_div">
    Hello, {name}. this is a jsx div
    <h1 title={title}>this is a jsx h1</h1>
    {/* 建议单行写注释 */}
    {h_arr.map((item, index) => (
      <h3 key={index}>{item}</h3>
    ))}
  </div>
)
ReactDOM.render(jsx_div, document.querySelector('#demo'))

// 在 React 中，构造函数，就是一个最基本的组件(当成对象来看)
// 把构造函数的名称，当作组件的名称，以 HTML 标签形式引入页面中即可
// 注意：React 在解析所有的标签的时候，是以标签的首字母来区分的
//    - 如果标签的首字母是小写，那么就按照普通的 HTML 标签来解析
//    - 如果首字母是大写，则按照组件的形式去解析渲染
// 注意： 组件名称必须以大写字母开头。
// React 会将以小写字母开头的组件视为原生 DOM 标签。
// 例如，<div /> 代表 HTML 的 div 标签，而 <Welcome /> 则代表一个组件，并且需在作用域内使用 Welcome。
// 定义组件最简单的方式就是编写 JavaScript 函数
// function Hello(props) {
//   // 外部传递过来的数据组件通过，定义 props 属性来接收；
//   // 所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
//   // 通过 props 得到的任何数据都是只读的，不能重新赋值
//   console.log(props)
//   return (
//     <div>
//       <h3>这是在 Hello 组件中定义的元素</h3>
//       <h5>通过 props 拿到只读的外部数据 name --- {props.name}</h5>
//       <h5>通过 props 拿到只读的外部数据 age --- {props.age}</h5>
//       <h5>通过 props 拿到只读的外部数据 gender --- {props.gender}</h5>
//     </div>
//   )
// }

// 没有配置不能省略 .jsx 后缀名 (否则会默认为 .js)
import Hello from '@/components/Hello'

const dog = {
  name: 'dog',
  age: 3,
  gender: 'male'
}

ReactDOM.render(
  <div>
    <Hello {...dog} dog={dog}></Hello>
    {/* 或者采用以下的闭合写法 */}
    <Hello {...dog} />
  </div>,
  document.querySelector('#component')
)
