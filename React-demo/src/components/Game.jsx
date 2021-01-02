// 创建组件、虚拟DOM、生命周期
import React from 'react'
// 棋盘组件
import Board from '@/components/Board'
// 引入样式
import gameCss from '@/css/game.less'

// 游戏控制
export default class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      stepNumber: 0
    }
  }
  // 点击棋子
  handleBorderClick(i) {
    // 当前的步数
    const stepNumber = this.state.stepNumber
    // 取出记录
    const history = this.state.history.slice(0, stepNumber + 1)
    // 获取当前的记录
    const current = history[history.length - 1]
    // 调用了 slice() 方法创建了 squares 数组的一个副本
    // 而不是直接在现有的数组上进行修改 方便进行回溯悔棋
    const squares = current.squares.slice()
    // 当有玩家胜出或者当前位置已经被填充 直接返回
    if (this.calculateWinner(squares) || squares[i]) return
    // 判断下一位玩家
    const xIsNext = this.state.xIsNext
    squares[i] = xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !xIsNext,
      stepNumber: stepNumber + 1
    })
  }
  // 判断胜负
  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }
  // 悔棋，回到步数
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }
  render() {
    // 当前的步数
    const stepNumber = this.state.stepNumber
    // 取出记录
    const history = this.state.history
    // 获取当前的记录
    const current = history[stepNumber]
    // 判断胜负状态
    const winner = this.calculateWinner(current.squares)
    let status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    // 渲染出历史记录
    const moves = history.map((item, index) => {
      // 第一步提示为开始游戏 其他则提示当前的步数
      const desc = index ? 'Go to move #' + index : 'Go to game start!'
      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      )
    })
    // console.log(moves)
    return (
      <div className={gameCss['game']}>
        <div className={gameCss['game-board']}>
          <Board
            squares={current.squares}
            handlerSquareClick={(i) => {
              this.handleBorderClick(i)
            }}
            status={status}
          />
        </div>
        <div className={gameCss['game-info']}>
          <div>Game control: </div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}
