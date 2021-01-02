// 创建组件、虚拟DOM、生命周期
import React from 'react'
// 棋子组件
import Square from '@/components/Square'
// 引入样式
import gameCss from '@/css/game.less'

// 棋盘组件
export default class Board extends React.Component {
  // 渲染棋子
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.handlerSquareClick(i)
        }}
      />
    )
  }

  // 渲染组件
  render() {
    return (
      <div>
        <div className={gameCss['status']}>{this.props.status}</div>
        <div className={gameCss['board-row']}>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className={gameCss['board-row']}>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className={gameCss['board-row']}>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}
