// 引入 react react-dom 包
// 1.  在 React 学习中，需要安装 两个包 react react-dom
import React from 'react' // 创建组件、虚拟DOM、生命周期
import ReactDOM from 'react-dom' // 渲染创建好的组件、虚拟DOM

console.log('ok')
//#region React 表单
/** React 表单
  1.受控组件 概念
  在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）通常自己维护 state，并根据用户输入进行更新。
  而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。
  在受控组件上指定 value 的 prop 会阻止用户更改输入(因为 props 是 readOnly 的)
  如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。
  渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。
  被 React 以这种方式控制取值的表单输入元素就叫做 受控组件。
  因此 React 的 state 可以作为 私有数据 唯一数据源
  缺点：明显发现维护多个受控组件较为繁琐 
  解决：处理多个输入可以绑定同一个事件处理函数通过 event.target 事件源中的 name 属性进行区分
  对于受控组件来说，输入的值始终由 React 的 state 驱动。
  你也可以将 value 传递给其他 UI 元素，或者通过其他事件处理函数重置，但这意味着你需要编写更多的代码。
  2. input 和 textarea 组件都是 受控组件
  在 React 中，<textarea> 使用 value 属性代替。
  这样，可以使得使用 <textarea> 的表单和使用单行 input 的表单非常类似
  3. select 组件
  由于 selected 属性的缘故，椰子选项默认被选中。
  React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性
  4.非受控组件
  要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以 使用 ref 来从 DOM 节点中获取表单数据。
  5.可以通过 defaultValue 设置组件的默认值。
  6.在 React 中，<input type="file" /> 始终是一个非受控组件
  因为它的值只能由用户设置，而不能通过代码控制
  包含验证、追踪访问字段以及处理表单提交的完整解决方案，使用 Formik 
 */
//#endregion
class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'redstar08',
      password: '123456',
      textarea: `[HMR] Waiting for update signal from WDS...
      [WDS] Hot Module Replacement enabled.
      [WDS] Live Reloading enabled.`,
      select: 'mango'
    }
    // 处理非受控组件
    this.input = React.createRef()
    this.fileInput = React.createRef()
  }
  // 此为受控组件，必须通过 setState() 进行状态维护
  // 可以通过事件源的 name 属性区分
  handleChange(event) {
    // console.log(event)
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({ [name]: value })
  }
  // handleChangeUsername(event) {
  //   this.setState({ password: event.target.value })
  // }
  // handleChangePassword(event) {
  //   this.setState({ password: event.target.value })
  // }
  // handleChangeTextarea(event) {
  //   this.setState({ textarea: event.target.value })
  // }
  // handleChangeSelect(event) {
  //   this.setState({ select: event.target.value })
  // }
  // 提交表单
  handleSubmit(event) {
    const { username, password, textarea, select } = this.state
    console.log(this.fileInput.current.files)
    alert(`
    提交的用户名: ${username}
    提交的密码: ${password}
    提交的文本框: ${textarea}
    提交的 select : ${select}
    非受控组件: ${this.input.current.value}
    文件上传非受控组件: 参考控制台
    `)
    // 必须显示的通过 组合事件的API 阻止默认事件 不能用 return
    event.preventDefault()
  }

  render() {
    const formCSS = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }
    return (
      <form style={formCSS} onSubmit={(event) => this.handleSubmit(event)}>
        {/* 受控组件 */}
        <label>
          用户名:
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <label>
          密码:
          <input
            type="text"
            name="password"
            value={this.state.password}
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <label>
          文章:
          <textarea
            name="textarea"
            value={this.state.textarea}
            onChange={(event) => this.handleChange(event)}
          />
        </label>
        <label>
          选择你喜欢的风味:
          <select
            name="select"
            value={this.state.select}
            onChange={(event) => this.handleChange(event)}
          >
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        {/* 非受控组件
        非受控组件通过 ref 引用的 current.value 拿到值
         */}
        <label>
          非受控组件:
          <input type="text" ref={this.input} />
        </label>
        {/* 文件始终是非受控组件 */}
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} multiple />
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}

ReactDOM.render(<NameForm />, document.querySelector('#demo'))
