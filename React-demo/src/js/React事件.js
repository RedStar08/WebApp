// 引入 react react-dom 包
// 1.  在 React 学习中，需要安装 两个包 react react-dom
import React from 'react' // 创建组件、虚拟DOM、生命周期
import ReactDOM from 'react-dom' // 渲染创建好的组件、虚拟DOM

console.log('ok')

// 引入评论列表组件
import CommentList from '@/components/CommentList'
// 引入 css 样式
import cssObj from '@/css/comment.less'
// 引入第三方的样式文件
// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
// console.log(bootstrap)
// console.log(cssObj)

ReactDOM.render(
  <div className={cssObj.comment}>
    <h1 className={cssObj.title}>this is a Comment component.</h1>
    <CommentList></CommentList>
  </div>,
  document.querySelector('#demo')
)

//
class Clock extends React.Component {
  // 重写构造函数
  constructor(props) {
    super(props)
    // 构造函数是唯一可以给 this.state 赋值的地方
    this.state = { msg: 'Hello, world!', date: new Date() }
  }
  // 组件挂载完成钩子函数
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }
  // 组件注销完成钩子函数
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  // 更新当前 state 中的数据
  tick() {
    // #region state的几点说明
    // 不要直接修改 State 这样数据没有响应式
    // this.state.date = new Date()
    // State 的更新可能是异步的
    // 出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
    // 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
    // 数据是向下流动的 单向数据流 区别于 vue 的双向数据绑定
    // #endregion
    this.setState({
      date: new Date()
    })
  }
  //#region 关于事件的几点说明
  // e 是一个合成事件 SyntheticEvent 实例将被传递给你的事件处理函数，它是浏览器的原生事件的跨浏览器包装器。
  // SyntheticEvent 拥有和浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()
  // SyntheticEvent 可以通过 e.nativeEvent 属性拿到原生的 DOM 事件
  // 在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault
  // 从 v17 开始，e.persist() 将不再生效，因为 SyntheticEvent 不再放入事件池中。
  //#endregion
  // 处理点击事件
  handleClick(arg1, arg2) {
    // 拿到传递的参数
    // console.log(arg1, arg2)
    // 通过 this.setState() 进行赋值
    this.setState({ msg: arg1 + arg2 })
    // 以下代码输出的可能是旧的值 (this.setState()是异步执行的)
    console.log(this.state)
  }
  // 处理文本框改变事件
  handleInputChanged(e) {
    // e 是一个合成事件 SyntheticBaseEvent
    console.log(e)
    // console.log(e.target)
    // 或者通过 this.refs 引用拿到 input
    this.setState({ msg: e.target.value })
  }
  render() {
    return (
      <div className={cssObj.comment}>
        <h1>{this.state.msg}</h1>
        <h2>现在是： {this.state.date.toString()}.</h2>
        <button onClick={() => this.handleClick('Hello,', ' RedStar!')}>点击</button>
        {/* input 不绑定 onChange 事件时，会变成只读文本框(相当于设置了readOnly)  */}
        {/* You provided a `value` prop to a form field without an `onChange` handler. 
        This will render a read-only field. If the field should be mutable use `defaultValue`.
        Otherwise, set either `onChange` or `readOnly`. */}
        <input type="text" value={this.state.msg} onChange={(e) => this.handleInputChanged(e)} />
      </div>
    )
  }
}
// 渲染出当前本地时间的组件
ReactDOM.render(<Clock />, document.getElementById('app'))
