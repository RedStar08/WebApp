// 引入 react react-dom 包
// 1.  在 React 学习中，需要安装 两个包 react react-dom
import React from 'react' // 创建组件、虚拟DOM、生命周期
import ReactDOM from 'react-dom' // 渲染创建好的组件、虚拟DOM

console.log('ok')
//#region 组件的生命周期
/** 组件的生命周期
 概念：组件从创建、到运行、再到销毁，这期间总是伴随着各种各样的事件，这些事件统称为组件的生命周期函数
 组件生命周期分为三部分：
    1.组件创建阶段：创建阶段的生命周期函数只会执行1次
      static defaultProps = {}
      constructor() 初始化 props state
      componentWillMount() 已弃用 
      render() 创建 虚拟DOM
      componentDidMount() 完成页面挂载
    2.组件运行阶段：根据 属性props 和 状态state 的改变，有选择性的触发0次或多次
      componentWillReceiveProps() 已弃用
      shouldComponentUpdate() 根据 属性props 和 状态state 是否改变 返回 bool 类型
      componentWillUpdate() 已弃用
      render() 通过 diff 算法重新更新 虚拟DOM树
      componentDidUpdate() 组件新的 虚拟DOM 已经更新完毕，开始挂载阶段
    3.组件销毁阶段：销毁阶段的生命周期函数只会执行1次
      componentWillUnmount() 卸载组件 此时不能使用 state 中的数据
 */
//#endregion
import PropTypes from 'prop-types'
let step = 0
class Hello extends React.Component {
  // 默认的启动参数
  static defaultProps = {
    name: 'redstar08'
  }
  // 自 React v15.5 起，React.PropTypes 已移入另一个包中
  // 外部属性 props 类型校验 需要安装 prop-type 包校验(v15.x之后抽离出该模块)
  static propTypes = {
    name: PropTypes.string
  }
  // 构造函数
  constructor(props) {
    super(props)
    this.state = {
      msg: 'Hello, World'
    }
    console.log(++step, 'constructor() 执行 初始化 props state')
  }
  // render 方法中会创建 虚拟DOM
  render() {
    console.log(++step, 'render() 执行')
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>{this.state.msg}</h1>
        <h2>{this.props.name}</h2>
        <button
          onClick={async () => {
            await this.setState({ msg: 'Welcome!' })
            console.log('2 秒之后卸载组件')
            setTimeout(() => {
              ReactDOM.unmountComponentAtNode(document.querySelector('#demo'))
            }, 2000)
          }}
        >
          点击更新数据
        </button>
      </div>
    )
  }
  // =======================创建阶段=======================
  // 组件将要挂载，但是还没有挂载，此时 虚拟DOM 还没创建好
  // componentWillMount() {
  //   // componentWillMount has been renamed, and is not recommended for use.
  //   console.log(++step, 'componentWillMount() 已弃用')
  // }
  // 组件的 虚拟DOM 已经挂载完毕，创建阶段结束
  componentDidMount() {
    console.log(++step, 'componentDidMount() 执行 组件的 虚拟DOM 已经挂载完毕，创建阶段结束')
  }

  // =======================运行阶段=======================
  // 组件将要接收数据 此时数据是旧的
  // componentWillReceiveProps() {
  //   console.log(++step, 'componentWillReceiveProps() 已弃用')
  // }
  // 根据 属性props 和 状态state 是否改变 返回 bool 类型
  // shouldComponentUpdate() {
  //   console.log(++step, 'shouldComponentUpdate()')
  // }
  // 组件将要更新，但是还没有更新，此时新的 虚拟DOM 还没创建好
  // componentWillUpdate() {
  //   console.log(++step, 'componentWillUpdate() 已弃用')
  // }
  // render() 通过 diff 算法重新更新 虚拟DOM树
  // 组件新的 虚拟DOM 已经更新完毕，开始挂载阶段
  componentDidUpdate() {
    console.log(++step, 'componentDidUpdate() 组件新的 虚拟DOM 已经更新完毕')
  }
  // =======================卸载阶段=======================
  // 卸载组件 此时不能使用 state 中的数据
  componentWillUnmount() {
    console.log(++step, 'componentWillUnmount() 卸载组件')
  }
}

ReactDOM.render(<Hello />, document.querySelector('#demo'))
