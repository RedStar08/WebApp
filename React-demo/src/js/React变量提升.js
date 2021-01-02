// 引入 react react-dom 包
// 1.  在 React 学习中，需要安装 两个包 react react-dom
import React from 'react' // 创建组件、虚拟DOM、生命周期
import ReactDOM from 'react-dom' // 渲染创建好的组件、虚拟DOM

console.log('ok')

// 判断是否沸腾组件
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>
  }
  return <p>The water would not boil.</p>
}
// 到目前为止, 两个 TemperatureInput 组件均在各自内部的 state 中相互独立地保存着各自的数据
// 温度输入组件
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const scale = this.props.scale
    const temperature = this.props.temperature
    return (
      <fieldset>
        <legend>Enter temperature in {scale}:</legend>
        <input value={temperature} onChange={(e) => this.props.onTemperatureChange(e)} />
      </fieldset>
    )
  }
}
// 温度计算器
class Calculator extends React.Component {
  constructor(props) {
    super(props)
    // 状态提升 将数据尽可能的提升到 父组件中
    this.state = { temperature: '', scale: 'Celsius' }
    // 通过 bind 可以返回一个绑定自身 this 的函数
    // this.handleChange = this.handleChange.bind(this)
  }
  // 修改 state
  handleChange(e, scale) {
    this.setState({ temperature: e.target.value, scale: scale })
  }
  // 摄氏度-华氏度 相互转换
  toCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5) / 9
  }
  toFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32
  }
  // tryConvert('abc', toCelsius) 返回一个空字符串，而 tryConvert('10.22', toFahrenheit) 返回 '50.396'
  tryConvert(temperature, convert) {
    const input = parseFloat(temperature)
    // 不合法的浮点数 直接返回 空字符串
    if (Number.isNaN(input)) {
      return ''
    }
    // 调用转换函数得出 浮点数保留3为小数的 字符串
    const output = convert(input)
    const rounded = Math.round(output * 1000) / 1000
    return rounded.toString()
  }
  render() {
    const { temperature, scale } = this.state
    let celsius = temperature
    let fahrenheit = temperature
    if (scale === 'Celsius') {
      fahrenheit = this.tryConvert(temperature, this.toFahrenheit)
    } else {
      celsius = this.tryConvert(temperature, this.toCelsius)
    }
    return (
      <fieldset>
        <TemperatureInput
          scale="Celsius"
          temperature={celsius}
          onTemperatureChange={(e) => this.handleChange(e, 'Celsius')}
        />
        <TemperatureInput
          scale="Fahrenheit"
          temperature={fahrenheit}
          onTemperatureChange={(e) => this.handleChange(e, 'Fahrenheit')}
        />
        <BoilingVerdict celsius={celsius} />
      </fieldset>
    )
  }
}

ReactDOM.render(<Calculator />, document.querySelector('#demo'))
