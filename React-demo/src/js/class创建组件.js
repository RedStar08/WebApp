// 引入 react react-dom 包
// 1.  在 React 学习中，需要安装 两个包 react react-dom
import React from 'react' // 创建组件、虚拟DOM、生命周期
import ReactDOM from 'react-dom' // 渲染创建好的组件、虚拟DOM

console.log('ok')

// 通过 class 关键字声明组件
class Hello extends React.Component {
  // 重写 constructor 构造函数
  constructor() {
    // 必须先调用 super() ES6规范
    super()
    // 可以定义组件自身的可修改的数据
    this.state = {
      msg: '我是 class 创建出来的组件，可以自定义数据 state (有状态组件)'
    }
  }
  render() {
    // Cannot assign to read only property 'name' of object
    // 外部传递的数据为只读，不能直接修改
    // this.props.name = 'not a dog'
    this.state.msg = '自定义数据 state 可以修改'
    return (
      <div>
        <h2>{this.state.msg}</h2>
        <h3>this is a class Component name --- {this.props.name}</h3>
        <h3>this is a class Component age --- {this.props.age}</h3>
        <h3>this is a class Component gender --- {this.props.gender}</h3>
        <h3>this is a class Component type --- {this.props.type}</h3>
      </div>
    )
  }
}
// 构造函数 function(不常用) 和 类 class 创建的组件之间的区别
// 在 function 定义的组件中，如果想要使用 props，必须先定义，否则无法直接使用
// 在 class 定义的组件中，可以直接使用 this.props 来直接访问，不需要预先接收 props
// 相对 function 创建的组件 class 可以包含 组件实例的 状态(state) 类似于 vue 的 data
// 用 function 创建出来的组件：专业的名字叫做 无状态组件 没有生命周期函数
// 用 class 创建出来的组件：专业的名字叫做 有状态组件 有生命周期函数

const dog = {
  name: 'dog',
  age: 3,
  gender: 'male',
  type: '金毛'
}

ReactDOM.render(
  <div>
    <h1>this is a h1</h1>
    <Hello {...dog}></Hello>
  </div>,
  document.querySelector('#demo')
)

// 可以通过非 ES6 的语法创建组件
// var createReactClass = require('create-react-class')
// var Greeting = createReactClass({
//   render: function () {
//     return <h1>Hello, {this.props.name}</h1>
//   }
// })
// console.log(new Greeting('Greeting'))
