// 引入 react react-dom 包
// 1.  在 React 学习中，需要安装 两个包 react react-dom
import React from 'react' // 创建组件、虚拟DOM、生命周期
import ReactDOM from 'react-dom' // 渲染创建好的组件、虚拟DOM

console.log('ok')
//#region 条件渲染
// 1.通过 if语句 实现
// 2.通过绑定 state 内部数据实现
// 3.通过 && 实现
// 在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false
// 4.通过 三目运算符实现 ? :
// return isLoggedIn ? <UserGreeting /> : <GuestGreeting />
// 5.隐藏不渲染
// render 方法直接返回 null，而不进行任何渲染
//#endregion
// 用户组件
function UserGreeting(props) {
  return <h3>Welcome back!</h3>
}
// 游客组件
function GuestGreeting(props) {
  return <h3>Please sign up.</h3>
}
// 问候组件
function Greeting(props) {
  // if (props.isLoggedIn) {
  //   return <UserGreeting />
  // }
  // return <GuestGreeting />
  return props.isLoggedIn ? <UserGreeting /> : <GuestGreeting />
}
// 控制登录组件
class LoginControl extends React.Component {
  constructor(props) {
    super(props)
    // 初始赋值
    this.state = { isLoggedIn: true }
  }
  // 点击控制登录状态
  handleLoginControl() {
    const isLoggedIn = this.state.isLoggedIn
    this.setState({ isLoggedIn: !isLoggedIn })
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {/* 绑定切换登录事件 */}
        <button onClick={() => this.handleLoginControl()}>Toggle Login</button>
      </div>
    )
  }
}

// 渲染 demo
ReactDOM.render(
  <div>
    <h1>this is a h1</h1>
    {/* 无状态组件通过 props 控制 */}
    {/*  Try changing to isLoggedIn={true}: */}
    {/* <Greeting isLoggedIn={true} /> */}
    {/* 有状态组件通过 state 进行控制 */}
    <LoginControl />
  </div>,
  document.querySelector('#demo')
)
